import React from 'react';
import { Building2, MapPin, ShieldCheck, Mail, Phone, Eye, HeartHandshake, Languages } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section, CtaBand } from '../components/layout/Blocks';
import { company } from '../data/site';

const VALUES = [
  { icon: Eye, title: 'Odkrito', text: 'Cene so javne. Demo lahko pokliče vsak, brez obrazca in brez obveznosti.' },
  { icon: HeartHandshake, title: 'Osebno', text: 'Vsakega asistenta nastavimo skupaj z vami in ga preizkusimo, preden ga predamo.' },
  { icon: Languages, title: 'Slovensko', text: 'Narejeno za slovenska podjetja in njihove stranke — v slovenščini.' },
];

const About = () => (
  <>
    <PageMeta path="/o-nas" />
    <PageHero
      crumbs={[{ label: 'O nas' }]}
      eyebrow="O nas"
      title="Da noben klic ne ostane neodgovorjen."
      lead={`Asistent RM razvija ${company.legalName}, slovensko podjetje iz Kopra.`}
    />

    <Section narrow center={false}>
      <div className="prose">
        <p>
          Mala in srednja podjetja izgubijo veliko strank samo zato, ker ob pravem trenutku ne morejo dvigniti telefona —
          frizerka ima škarje v roki, mehanik je pod avtom, zdravnik je pri pacientu.
        </p>
        <p>
          Zato smo naredili Asistenta RM: AI receptorko, ki se oglasi namesto vas, govori slovensko in stranko
          naroči ali vam posreduje sporočilo. Vi pa delate tisto, kar znate najbolje.
        </p>
      </div>
    </Section>

    <Section tone="gray" title="Kako delamo">
      <div className="card-grid card-grid-3">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div className="card" key={title}>
            <span className="card-icon"><Icon size={24} aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section title="Podatki o podjetju" narrow>
      <dl className="company-card">
        <div><dt><Building2 size={18} aria-hidden="true" /> Podjetje</dt><dd>{company.legalName}</dd></div>
        <div><dt><MapPin size={18} aria-hidden="true" /> Naslov</dt><dd>{company.street}, {company.postalCode} {company.city}</dd></div>
        <div><dt><ShieldCheck size={18} aria-hidden="true" /> ID za DDV</dt><dd>{company.vatId}</dd></div>
        <div><dt><ShieldCheck size={18} aria-hidden="true" /> Matična št.</dt><dd>{company.registrationNumber}</dd></div>
        <div><dt><Mail size={18} aria-hidden="true" /> E-mail</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
        <div><dt><Phone size={18} aria-hidden="true" /> Demo linija</dt><dd><a href={company.demoPhoneHref}>{company.demoPhone}</a></dd></div>
      </dl>
    </Section>

    <CtaBand />
  </>
);

export default About;
