/* eslint-disable no-console */
/**
 * Pred-generiranje (prerender) po `craco build`.
 *
 * Zakaj: AI orodja (ChatGPT, Claude, Perplexity …) in mnogi iskalniki ne izvajajo JavaScripta,
 * zato so pri čisti React aplikaciji videli prazno stran. Ta skripta za vsako pot izriše iste
 * React komponente v statični HTML (z enakimi CSS razredi), doda meta oznake in strukturirane
 * podatke (JSON-LD) ter ustvari sitemap.xml, llms.txt in llms-full.txt.
 *
 * React v brskalniku nato vsebino #root zamenja z interaktivno različico (createRoot).
 */
const fs = require('fs');
const path = require('path');
const Module = require('module');
const babel = require('@babel/core');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const BUILD = path.join(ROOT, 'build');

// --- Node naj razume JSX, ESM in uvoze CSS iz src/ -------------------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const origResolve = Module._resolveFilename;
Module._resolveFilename = function resolve(request, ...rest) {
  if (request.startsWith('@/')) request = path.join(SRC, request.slice(2));
  return origResolve.call(this, request, ...rest);
};
const noop = () => {};
['.css', '.png', '.svg', '.jpg', '.mp3'].forEach((ext) => { Module._extensions[ext] = noop; });
const compile = (module, filename) => {
  const code = fs.readFileSync(filename, 'utf8');
  const out = babel.transformSync(code, {
    filename,
    babelrc: false,
    configFile: false,
    presets: [
      [require.resolve('@babel/preset-env'), { targets: { node: 'current' }, modules: 'commonjs' }],
      [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
    ],
  });
  module._compile(out.code, filename);
};
const origJs = Module._extensions['.js'];
Module._extensions['.js'] = (module, filename) => (filename.startsWith(SRC) ? compile(module, filename) : origJs(module, filename));
Module._extensions['.jsx'] = compile;

// Minimalno brskalniško okolje za kodo, ki se izvede ob uvozu.
global.window = global.window || { location: { href: '' }, addEventListener: noop, removeEventListener: noop };

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { StaticRouter, Routes, Route } = require('react-router');
const { Helmet } = require('react-helmet');

const { SITE_URL, company, plans, pricingTerms, faqs, shortDescription, tagline, howItWorks } = require(path.join(SRC, 'data/site.js'));
const { industries } = require(path.join(SRC, 'data/industries.js'));
const Landing = require(path.join(SRC, 'pages/Landing.jsx')).default;
const IndustryPage = require(path.join(SRC, 'pages/IndustryPage.jsx')).default;
const Terms = require(path.join(SRC, 'pages/Terms.jsx')).default;
const Privacy = require(path.join(SRC, 'pages/Privacy.jsx')).default;
const GeneralTerms = require(path.join(SRC, 'pages/GeneralTerms.jsx')).default;

const h = React.createElement;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);

// --- Strukturirani podatki --------------------------------------------------------------------
const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organizacija`,
  name: company.brand,
  legalName: company.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  email: company.email,
  vatID: company.vatId,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: 'SI',
  },
  contactPoint: [{ '@type': 'ContactPoint', telephone: '+38659790410', contactType: 'sales', areaServed: 'SI', availableLanguage: ['sl'] }],
  sameAs: Object.values(company.social),
};

const service = {
  '@type': 'Service',
  '@id': `${SITE_URL}/#storitev`,
  name: 'Asistent RM — AI receptorka',
  serviceType: 'AI telefonska receptorka / virtualna tajnica',
  description: shortDescription,
  provider: { '@id': `${SITE_URL}/#organizacija` },
  areaServed: { '@type': 'Country', name: 'Slovenija' },
  availableLanguage: ['sl'],
  offers: plans.map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: String(p.price),
    priceCurrency: 'EUR',
    description: `${p.minutes} minut pogovorov na mesec. ${p.features.join(', ')}.`,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(p.price),
      priceCurrency: 'EUR',
      unitText: 'MONTH',
      valueAddedTaxIncluded: false,
    },
  })),
};

const faqPage = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

const jsonLd = (graph) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;

// --- Poti ---------------------------------------------------------------------------------------
const DEFAULT_TITLE = 'Asistent RM | AI receptorka za slovenska podjetja';
const DEFAULT_DESC = 'AI receptorka, ki 24/7 v slovenščini sprejema klice, odgovarja strankam in vpisuje termine v vaš koledar. Paketi od 99 €/mesec. Brezplačen demo klic: 059 790 410.';

const routes = [
  { url: '/', title: DEFAULT_TITLE, description: DEFAULT_DESC, priority: '1.0', graph: [organization, service, faqPage] },
  ...industries.map((ind) => ({
    url: `/panoge/${ind.id}`,
    title: `${ind.metaTitle} | Asistent RM`,
    description: ind.metaDescription,
    priority: '0.8',
    graph: [
      organization,
      { ...service, '@id': `${SITE_URL}/panoge/${ind.id}#storitev`, name: `AI receptorka za: ${ind.name}`, description: ind.problemDesc },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Domov', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: ind.name, item: `${SITE_URL}/panoge/${ind.id}` },
        ],
      },
    ],
  })),
  { url: '/splosni-pogoji', title: 'Splošni pogoji | Asistent RM', description: 'Splošni pogoji uporabe storitve Asistent RM.', priority: '0.3', graph: [organization] },
  { url: '/pogoji', title: 'Pogoji uporabe | Asistent RM', description: 'Pogoji uporabe spletne strani Asistent RM.', priority: '0.3', graph: [organization] },
  { url: '/zasebnost', title: 'Politika zasebnosti | Asistent RM', description: 'Kako Asistent RM obdeluje in varuje osebne podatke.', priority: '0.3', graph: [organization] },
];

const app = (url) =>
  h(StaticRouter, { location: url },
    h(Routes, null,
      h(Route, { path: '/', element: h(Landing) }),
      h(Route, { path: '/panoge/:industryId', element: h(IndustryPage) }),
      h(Route, { path: '/pogoji', element: h(Terms) }),
      h(Route, { path: '/zasebnost', element: h(Privacy) }),
      h(Route, { path: '/splosni-pogoji', element: h(GeneralTerms) })));

const template = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
fs.writeFileSync(path.join(BUILD, 'spa-shell.html'), template); // čista lupina za ostale poti

let count = 0;
for (const r of routes) {
  const body = renderToStaticMarkup(app(r.url));
  Helmet.renderStatic();
  const canonical = `${SITE_URL}${r.url === '/' ? '/' : r.url}`;
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="sl_SI" />`,
    `<meta property="og:site_name" content="Asistent RM" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    jsonLd(r.graph),
  ].join('\n        ');

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(r.description)}" />`)
    .replace('<!--prerender:head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  if (!html.includes(body.slice(0, 50))) throw new Error(`Prerender ni vstavil vsebine za ${r.url}`);

  const outDir = r.url === '/' ? BUILD : path.join(BUILD, r.url);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  count += 1;
}

// --- sitemap.xml --------------------------------------------------------------------------------
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r.url}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), sitemap);

// --- llms.txt in llms-full.txt (https://llmstxt.org) --------------------------------------------
const planLines = plans.map((p) => `- **${p.name}** — ${p.price} €/mesec + DDV, ${p.minutes} minut pogovorov (≈ ${p.perMinute} €/min)${p.popular ? ' — najbolj priljubljen' : ''}`).join('\n');

const llms = `# Asistent RM

> ${shortDescription} Paketi od ${plans[0].price} €/mesec (brez DDV). Brezplačna demo linija: ${company.demoPhone}.

${tagline} Asistent RM razvija in upravlja ${company.legalName}, ${company.street}, ${company.postalCode} ${company.city} (ID za DDV ${company.vatId}).

## Ključne informacije
- [Celoten opis, cenik in pogosta vprašanja](${SITE_URL}/llms-full.txt): vse informacije v eni datoteki
- [Glavna stran](${SITE_URL}/): kako deluje, kalkulator, cenik, pogosta vprašanja
- [Cenik](${SITE_URL}/#cenik): BASIC 99 €, PRO 169 €, BUSINESS 279 € na mesec + DDV; vzpostavitev ${pricingTerms.setupFee} €
- Kontakt: ${company.email} · demo linija ${company.demoPhone}

## Panoge
${industries.map((i) => `- [${i.name}](${SITE_URL}/panoge/${i.id}): ${i.subtitle}`).join('\n')}

## Pravno
- [Splošni pogoji](${SITE_URL}/splosni-pogoji)
- [Pogoji uporabe](${SITE_URL}/pogoji)
- [Politika zasebnosti](${SITE_URL}/zasebnost)
`;

const llmsFull = `# Asistent RM — AI receptorka za slovenska podjetja

> ${shortDescription}

Spletna stran: ${SITE_URL}
E-mail: ${company.email}
Brezplačna demo linija (pogovor z AI receptorko): ${company.demoPhone}
Podjetje: ${company.legalName}, ${company.street}, ${company.postalCode} ${company.city}, ${company.country}. ID za DDV: ${company.vatId}, matična številka: ${company.registrationNumber}.
Posodobljeno: ${today}

## Kako deluje
${howItWorks.map((s, i) => `${i + 1}. **${s.title}** — ${s.text}`).join('\n')}

## Cenik 2026
${pricingTerms.vat}

${planLines}

${plans.map((p) => `### ${p.name} — ${p.price} €/mesec\n${p.features.map((f) => `- ${f}`).join('\n')}`).join('\n\n')}

### Dodatno
- Vzpostavitev (enkratno): ${pricingTerms.setupFee} € + DDV. Vključuje ${pricingTerms.setupIncludes}.
- Dodatne minute nad zakupljenimi: ${pricingTerms.extraMinute} €/min + DDV. ${pricingTerms.billing}
- ${pricingTerms.planChange}
- ${pricingTerms.enterprise} Kontakt: ${company.email}

## Pogosta vprašanja
${faqs.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}

## Panoge in primeri klicev
${industries.map((i) => `### ${i.name}
Stran: ${SITE_URL}/panoge/${i.id}
${i.problemTitle} ${i.problemDesc}

Primer pogovora:
${i.transcript.split('\n\n').map((l) => `> ${l.trim()}`).join('\n>\n')}`).join('\n\n')}
`;

fs.writeFileSync(path.join(BUILD, 'llms.txt'), llms);
fs.writeFileSync(path.join(BUILD, 'llms-full.txt'), llmsFull);

console.log(`Prerender: ${count} strani, sitemap.xml, llms.txt in llms-full.txt ustvarjeni.`);
