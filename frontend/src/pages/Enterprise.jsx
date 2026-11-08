import React from 'react';
import { Building2, SlidersHorizontal, Languages, Headphones } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section } from '../components/layout/Blocks';
import ContactForm from '../components/ContactForm';
import { company } from '../data/site';

// Osnovna stran za večja podjetja — vsebino lahko kasneje razširite.
const POINTS = [
  { icon: SlidersHorizontal, title: 'Paket po meri', text: 'Več kot 800 minut na mesec ali posebni pogoji — dogovorimo se glede na vaš obseg klicev.' },
  { icon: Building2, title: 'Več lokacij in ekip', text: 'Pametna preusmeritev klicev na pravo osebo ali oddelek.' },
  { icon: Languages, title: 'Več jezikov', text: 'Slovenščina in dodatni jeziki za tuje stranke.' },
  { icon: Headphones, title: 'Podpora', text: 'Prepisi klicev in podpora 24/7, kot v paketu BUSINESS.' },
];

const Enterprise = () => (
  <>
    <PageMeta path="/enterprise" />
    <PageHero
      crumbs={[{ label: 'Enterprise' }]}
      eyebrow="Enterprise"
      title="Za podjetja z veliko klici."
      lead="Ko vam paket BUSINESS ni dovolj, pripravimo rešitev po meri."
    />

    <Section>
      <div className="card-grid card-grid-4">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <div className="card card-sm" key={title}>
            <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section tone="gray" title="Pogovorimo se" lead={`Pustite podatke ali pišite na ${company.email}.`} narrow>
      <div className="contact-form-card enterprise-form">
        <ContactForm source="enterprise" defaultPlan="ENTERPRISE" idPrefix="ent" />
      </div>
    </Section>
  </>
);

export default Enterprise;
