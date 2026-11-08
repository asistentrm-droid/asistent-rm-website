// Naslovi in opisi strani — uporabljajo jih strani (PageMeta) in scripts/prerender.cjs.
export const pages = {
  '/': {
    title: 'Asistent RM | AI receptorka za slovenska podjetja',
    description: 'AI receptorka, ki 24/7 v slovenščini sprejema klice, odgovarja strankam in vpisuje termine v vaš koledar. Paketi od 99 €/mesec. Brezplačen demo: 059 790 410.',
    nav: 'Domov',
    priority: '1.0',
  },
  '/kako-deluje': {
    title: 'Kako deluje AI receptorka | Asistent RM',
    description: 'Stranka pokliče, asistent odgovori, vpiše termin ali preusmeri klic, vi prejmete povzetek. Kako deluje Asistent RM in kako poteka uvedba.',
    nav: 'Kako deluje',
    priority: '0.9',
  },
  '/cenik': {
    title: 'Cenik | Asistent RM — od 99 €/mesec',
    description: 'Paketi BASIC 99 €, PRO 169 € in BUSINESS 279 € na mesec (brez DDV). Vzpostavitev 99 €, dodatne minute 0,45 €/min. Kalkulator izgube zaradi zamujenih klicev.',
    nav: 'Cenik',
    priority: '0.9',
  },
  '/panoge': {
    title: 'Panoge | AI receptorka za vašo dejavnost | Asistent RM',
    description: 'AI receptorka za ambulante, salone, delavnice, restavracije, odvetnike, računovodje, nepremičnine in druge dejavnosti. Primeri klicev za vsako panogo.',
    nav: 'Panoge',
    priority: '0.8',
  },
  '/o-nas': {
    title: 'O nas | Asistent RM',
    description: 'Asistent RM razvija slovensko podjetje Plan Plus, medijske rešitve, d.o.o. iz Kopra. Kdo smo, kako delamo in kako nas dosežete.',
    nav: 'O nas',
    priority: '0.7',
  },
  '/kontakt': {
    title: 'Kontakt | Asistent RM',
    description: 'Pišite nam na info@asistentrm.com, pokličite brezplačno demo linijo 059 790 410 ali oddajte povpraševanje za uvodni pogovor.',
    nav: 'Kontakt',
    priority: '0.7',
  },
  '/pogosta-vprasanja': {
    title: 'Pogosta vprašanja | Asistent RM',
    description: 'Odgovori na pogosta vprašanja o AI receptorki Asistent RM: cene, minute, vzpostavitev, jeziki, koledar in preusmeritev klicev.',
    nav: 'Vprašanja',
    priority: '0.7',
  },
  '/splosni-pogoji': { title: 'Splošni pogoji | Asistent RM', description: 'Splošni pogoji uporabe storitve Asistent RM.', priority: '0.3' },
  '/pogoji': { title: 'Pogoji uporabe | Asistent RM', description: 'Pogoji uporabe spletne strani Asistent RM.', priority: '0.3' },
  '/zasebnost': { title: 'Politika zasebnosti | Asistent RM', description: 'Kako Asistent RM obdeluje in varuje osebne podatke.', priority: '0.3' },
  '/hvala': { title: 'Hvala | Asistent RM', description: 'Vaše povpraševanje smo prejeli.', noindex: true },
};

export const mainNav = ['/kako-deluje', '/panoge', '/cenik', '/o-nas', '/kontakt'];
