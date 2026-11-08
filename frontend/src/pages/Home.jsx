import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Check, CalendarCheck } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { CtaBand } from '../components/layout/Blocks';
import { industries } from '../data/industries';
import { company, plans } from '../data/site';

const STEPS = [
  { n: '01', title: 'Oglasi se', text: 'Takoj, 24/7. Tudi ponoči in med vikendi.' },
  { n: '02', title: 'Uredi zadevo', text: 'Odgovori, naroči stranko ali preusmeri klic.' },
  { n: '03', title: 'Vas obvesti', text: 'Po klicu prejmete kratek povzetek.' },
];

const CHIPS = ['zdravstveni-domovi', 'frizerski-kozmeticni-saloni', 'avtomobilske-delavnice', 'restavracije-gostinstvo', 'pravne-pisarne-odvetniki', 'fitnes-centri'];

// Ilustracija pogovora (ni posnetek resničnega klica).
const PhoneMock = () => (
  <div className="pm" aria-hidden="true">
    <div className="pm-screen">
      <div className="pm-head">
        <span className="pm-dot" />
        <div>
          <strong>Asistent RM</strong>
          <span>v klicu · 00:24</span>
        </div>
      </div>
      <div className="pm-chat">
        <p className="pm-b pm-in">Dober dan, bi se lahko naročila za jutri?</p>
        <p className="pm-b pm-out">Seveda. Imam prosto ob 10.00 ali 14.30.</p>
        <p className="pm-b pm-in">Ob 10.00, prosim.</p>
        <p className="pm-b pm-out">Vpisano. Potrditev vam pošljem po SMS.</p>
      </div>
      <div className="pm-event">
        <CalendarCheck size={18} />
        <div><strong>Jutri, 10.00</strong><span>Nov termin v koledarju</span></div>
        <Check size={18} className="pm-ok" />
      </div>
    </div>
  </div>
);

const Home = () => (
  <>
    <PageMeta path="/" />

    <section className="hx">
      <div className="sh-inner hx-inner">
        <div className="hx-text">
          <p className="hx-eyebrow">AI receptorka · 24/7 · v slovenščini</p>
          <h1 className="hx-title">
            <span className="hero-word hero-word-1">Vaša</span>{' '}
            <span className="hero-word hero-word-2">24/7</span>{' '}
            <span className="hero-word hero-word-3">AI Receptorka</span>
          </h1>
          <p className="hx-lead">Sprejema klice in naroča stranke — tudi ko vi ne morete dvigniti.</p>
          <div className="hx-actions">
            <a href={company.demoPhoneHref} className="hx-btn hx-btn-dark"><Phone size={18} aria-hidden="true" /> Pokliči demo</a>
            <Link to="/cenik" className="hx-btn hx-btn-light">Cenik</Link>
          </div>
          <p className="hx-note">Brezplačna demo linija: <a href={company.demoPhoneHref}>{company.demoPhone}</a></p>
        </div>
        <PhoneMock />
      </div>
    </section>

    <section className="problem-section">
      <div className="problem-content visible">
        <div className="problem-line delay-1">Telefon zvoni.</div>
        <div className="problem-line delay-2">Ne dvignete.</div>
        <div className="problem-line delay-3">Stranka gre drugam.</div>
      </div>
    </section>

    <section className="hs">
      <div className="sh-inner">
        <h2 className="hs-title">Vi delate. Asistent se oglasi.</h2>
        <ol className="hs-steps">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="hs-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="hs-more"><Link to="/kako-deluje" className="more-link">Kako deluje <ArrowRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <section className="hd">
      <div className="sh-inner hd-inner">
        <p className="hd-label">Poskusi v živo</p>
        <h2>Govori z AI receptorko. Zdaj.</h2>
        <a href={company.demoPhoneHref} className="hd-number">{company.demoPhone}</a>
        <p className="hd-sub">Brezplačen demo klic</p>
      </div>
    </section>

    <section className="hs hs-gray">
      <div className="sh-inner">
        <h2 className="hs-title">Od 99 € na mesec.</h2>
        <div className="plan-strip">
          {plans.map((p) => (
            <Link to="/cenik" key={p.id} className={`plan-mini${p.popular ? ' plan-mini-popular' : ''}`}>
              <span className="plan-mini-name">{p.name}{p.popular && <em>Priljubljen</em>}</span>
              <span className="plan-mini-price">{p.price} €<small>/mesec</small></span>
              <span className="plan-mini-min"><Check size={16} aria-hidden="true" /> {p.minutes} minut</span>
            </Link>
          ))}
        </div>
        <p className="hs-foot">Cene brez DDV.</p>
      </div>
    </section>

    <section className="hs">
      <div className="sh-inner">
        <h2 className="hs-title">Za vsako dejavnost, ki dobiva klice.</h2>
        <div className="chips">
          {CHIPS.map((id) => {
            const ind = industries.find((i) => i.id === id);
            return <Link key={id} to={`/panoge/${id}`} className="chip">{ind.name}</Link>;
          })}
          <Link to="/panoge" className="chip chip-dark">Vse panoge <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <CtaBand />
  </>
);

export default Home;
