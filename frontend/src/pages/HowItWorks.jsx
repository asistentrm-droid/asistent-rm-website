import React from 'react';
import { Check, X, PhoneIncoming, MessageSquareText, CalendarCheck, PhoneForwarded, Mail, ShieldBan, Languages, Users } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section, CtaBand } from '../components/layout/Blocks';
import DemoBlock from '../components/DemoBlock';
import { pricingTerms } from '../data/site';

const STEPS = [
  { title: 'Stranka pokliče', text: 'Asistent se takoj oglasi z imenom vašega podjetja in pozdravom, ki ga izberete.' },
  { title: 'Asistent uredi zadevo', text: 'Odgovori na vprašanje, naroči stranko na prosti termin ali klic preusmeri na pravo osebo.' },
  { title: 'Vi prejmete povzetek', text: 'Po klicu dobite e-mail ali SMS: kdo je klical, kaj želi in kaj je bilo dogovorjeno.' },
];

const FEATURES = [
  { icon: PhoneIncoming, title: 'Sprejem klicev 24/7', text: 'Vsak klic, vsak dan v letu.', plan: 'Vsi paketi' },
  { icon: MessageSquareText, title: 'Odgovori na vprašanja', text: 'Delovni čas, storitve, cene, lokacija.', plan: 'Vsi paketi' },
  { icon: CalendarCheck, title: 'Naročanje v koledar', text: 'Google Calendar, Outlook in drugi.', plan: 'Vsi paketi' },
  { icon: Mail, title: 'Obvestila in povzetki', text: 'E-mail, SMS, povzetek ali celoten prepis.', plan: 'Povzetki od PRO' },
  { icon: PhoneForwarded, title: 'Preusmeritev na osebo', text: 'Ko je treba, preda klic vam ali sodelavcu.', plan: 'PRO in BUSINESS' },
  { icon: ShieldBan, title: 'Filtriranje neželenih klicev', text: 'Prodajni in neželeni klici vas ne motijo.', plan: 'PRO in BUSINESS' },
  { icon: Languages, title: 'Več jezikov', text: 'Slovenščina + do 2 (PRO) ali 5 (BUSINESS) jezikov.', plan: 'PRO in BUSINESS' },
  { icon: Users, title: 'Sočasni klici', text: 'Do 2 klica hkrati — brez zasedene linije.', plan: 'PRO in BUSINESS' },
];

const ONBOARDING = [
  { title: 'Uvodni pogovor', text: 'Pogledamo, kdo vas kliče in zakaj.' },
  { title: 'Scenarij in glas', text: 'Pripravimo pogovor, ton, glas in jezik.' },
  { title: 'Povezava', text: 'Povežemo telefonsko številko in koledar.' },
  { title: 'Test in predaja', text: 'Skupaj preizkusimo in asistenta predamo v uporabo.' },
];

const HUMAN = ['Delovni čas 8–16', 'Plača več kot 1.500 €/mesec', 'Dopusti in bolniške', 'En klic naenkrat'];
const AI = ['Dosegljiv 24/7, vse dni v letu', 'Od 99 €/mesec + DDV', 'Brez odsotnosti', 'Povzetek vsakega klica'];

const HowItWorks = () => (
  <>
    <PageMeta path="/kako-deluje" />
    <PageHero
      crumbs={[{ label: 'Kako deluje' }]}
      eyebrow="Kako deluje"
      title="Stranka pokliče. Asistent uredi. Vi ste obveščeni."
      lead="Asistent RM se oglasi namesto vas, se s stranko pogovori v slovenščini in vam pošlje povzetek."
    />

    <Section title="V treh korakih">
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.title} className="step">
            <span className="step-n">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>

    <Section tone="gray" eyebrow="Funkcije" title="Kaj zna asistent">
      <div className="card-grid card-grid-4">
        {FEATURES.map(({ icon: Icon, title, text, plan }) => (
          <div className="card card-sm" key={title}>
            <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="card-tag">{plan}</span>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="Uvedba" title="Od pogovora do delujočega asistenta" lead={`Vzpostavitev stane enkratno ${pricingTerms.setupFee} € + DDV in vključuje vse spodnje korake.`}>
      <ol className="timeline">
        {ONBOARDING.map((s, i) => (
          <li key={s.title}>
            <span className="timeline-n">{i + 1}</span>
            <div><h3>{s.title}</h3><p>{s.text}</p></div>
          </li>
        ))}
      </ol>
    </Section>

    <Section tone="gray" title="AI receptorka ali zaposlena receptorka?">
      <div className="compare">
        <div className="compare-col">
          <h3>Zaposlena receptorka</h3>
          <ul>{HUMAN.map((t) => <li key={t}><X size={18} aria-hidden="true" /> {t}</li>)}</ul>
        </div>
        <div className="compare-col compare-col-ai">
          <h3>Asistent RM</h3>
          <ul>{AI.map((t) => <li key={t}><Check size={18} aria-hidden="true" /> {t}</li>)}</ul>
        </div>
      </div>
    </Section>

    <DemoBlock />
    <CtaBand />
  </>
);

export default HowItWorks;
