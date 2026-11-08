import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle2, PhoneIncoming, CalendarCheck, BellRing, Check, Building2 } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { Section, MoreLink, CtaBand } from '../components/layout/Blocks';
import SampleCall from '../components/SampleCall';
import DemoBlock from '../components/DemoBlock';
import IndustryGrid, { FEATURED } from '../components/IndustryGrid';
import FaqList from '../components/FaqList';
import { company, plans, faqs } from '../data/site';

const BENEFITS = [
  { icon: PhoneIncoming, title: 'Sprejme vsak klic', text: 'Takoj, 24/7 — tudi ponoči, med vikendi in ko ste sredi dela.' },
  { icon: CalendarCheck, title: 'Vpiše termin', text: 'Preveri vaš koledar in stranko naroči na prosti termin.' },
  { icon: BellRing, title: 'Vas obvesti', text: 'Po klicu prejmete e-mail ali SMS: kdo je klical in kaj želi.' },
];

const Home = () => (
  <>
    <PageMeta path="/" />

    {/* Uvod */}
    <section className="hero-section home-hero">
      <div className="hero-bg-animation" aria-hidden="true">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
      </div>
      <div className="hero-content">
        <p className="hero-eyebrow">AI receptorka za slovenska podjetja</p>
        <h1 className="hero-title hero-title-animated">
          <span className="hero-word hero-word-1">Vaša</span>{' '}
          <span className="hero-word hero-word-2">24/7</span>{' '}
          <span className="hero-word hero-word-3">AI Receptorka</span>
        </h1>
        <p className="hero-subtitle hero-subtitle-reveal">
          Sprejema klice in naroča stranke v slovenščini — tudi ko vi ne morete dvigniti.
        </p>
        <div className="hero-cta">
          <a href={company.demoPhoneHref} className="btn-primary">
            <Phone className="btn-icon" aria-hidden="true" /> Pokliči demo
          </a>
          <Link to="/cenik" className="btn-secondary">Cenik od 99 €</Link>
        </div>
        <SampleCall />
        <ul className="hero-trust" aria-label="Zakaj nam lahko zaupate">
          <li><CheckCircle2 size={16} aria-hidden="true" /> Slovensko podjetje iz Kopra</li>
          <li><CheckCircle2 size={16} aria-hidden="true" /> Javno objavljene cene</li>
          <li><CheckCircle2 size={16} aria-hidden="true" /> Paket zamenjate kadar koli</li>
        </ul>
      </div>
    </section>

    {/* Problem */}
    <section className="problem-section" id="section-problem">
      <div className="problem-content visible">
        <div className="problem-line delay-1">Telefon zvoni.</div>
        <div className="problem-line delay-2">Ne dvignete.</div>
        <div className="problem-line delay-3">Stranka gre drugam.</div>
      </div>
    </section>

    {/* Kaj naredi */}
    <Section eyebrow="Kaj naredi za vas" title="Vi delate. Asistent se oglasi.">
      <div className="card-grid card-grid-3">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div className="card" key={title}>
            <span className="card-icon"><Icon size={24} aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="sec-more"><MoreLink to="/kako-deluje">Kako deluje</MoreLink></div>
    </Section>

    <DemoBlock />

    {/* Panoge */}
    <Section tone="gray" eyebrow="Panoge" title="Za podjetja, ki živijo od telefona.">
      <IndustryGrid only={FEATURED} />
      <div className="sec-more"><MoreLink to="/panoge">Vseh 15 panog</MoreLink></div>
    </Section>

    {/* Cenik na kratko */}
    <Section eyebrow="Cenik" title="Od 99 € na mesec." lead="Cene brez DDV. Vzpostavitev enkratno 99 €.">
      <div className="plan-strip">
        {plans.map((p) => (
          <Link to="/cenik" key={p.id} className={`plan-mini${p.popular ? ' plan-mini-popular' : ''}`}>
            <span className="plan-mini-name">{p.name}{p.popular && <em>Priljubljen</em>}</span>
            <span className="plan-mini-price">{p.price} €<small>/mesec</small></span>
            <span className="plan-mini-min"><Check size={16} aria-hidden="true" /> {p.minutes} minut pogovorov</span>
          </Link>
        ))}
      </div>
      <div className="sec-more"><MoreLink to="/cenik">Celoten cenik in kalkulator</MoreLink></div>
    </Section>

    {/* Podjetje */}
    <Section tone="gray">
      <div className="trust-strip">
        <span className="card-icon"><Building2 size={24} aria-hidden="true" /></span>
        <p>
          <strong>Za Asistentom RM stoji {company.legalName}</strong> — slovensko podjetje s sedežem v Kopru.
          Pri uvedbi se z vami osebno pogovorimo in asistenta preizkusimo, preden ga predamo v uporabo.
        </p>
        <MoreLink to="/o-nas">O nas</MoreLink>
      </div>
    </Section>

    {/* Vprašanja */}
    <Section title="Pogosta vprašanja" narrow>
      <FaqList items={faqs.slice(0, 4)} idPrefix="home-faq" />
      <div className="sec-more"><MoreLink to="/pogosta-vprasanja">Vsa vprašanja</MoreLink></div>
    </Section>

    <CtaBand />
  </>
);

export default Home;
