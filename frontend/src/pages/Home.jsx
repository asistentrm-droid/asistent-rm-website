import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ArrowDown, Check, CalendarCheck, PhoneIncoming, Mail, Moon } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { industries } from '../data/industries';
import { company, plans } from '../data/site';

/* ---------- Zasloni telefona (ilustracije, ne posnetki resničnih klicev) ---------- */

const ScreenCall = () => (
  <div className="ps ps-call">
    <span className="ps-time">22:47</span>
    <div className="ps-caller">
      <div className="ps-avatar">A</div>
      <strong>Ana K.</strong>
      <span>Dohodni klic</span>
    </div>
    <div className="ps-answering">
      <span className="ps-pulse" />
      Asistent RM se oglaša …
    </div>
  </div>
);

const ScreenChat = () => (
  <div className="ps ps-chat">
    <div className="ps-head">
      <span className="ps-live" />
      <div><strong>Asistent RM</strong><span>v klicu · 00:31</span></div>
    </div>
    <p className="ps-b ps-in">Dober večer, bi se lahko naročila na striženje?</p>
    <p className="ps-b ps-out">Seveda. Jutri imam prosto ob 10.00 ali 15.30.</p>
    <p className="ps-b ps-in">Ob 10.00, prosim.</p>
    <p className="ps-b ps-out">Vpisano. Se vidimo jutri ob 10.00!</p>
  </div>
);

const ScreenCalendar = () => (
  <div className="ps ps-cal">
    <div className="ps-cal-head"><strong>Jutri</strong><span>Sreda</span></div>
    {[['09.00', 'Prosto', ''], ['10.00', 'Ana K. — striženje', 'new'], ['11.30', 'Marko N. — barvanje', ''], ['13.00', 'Prosto', '']].map(([t, label, cls]) => (
      <div key={t} className={`ps-slot ${cls ? 'ps-slot-new' : ''} ${label === 'Prosto' ? 'ps-slot-free' : ''}`}>
        <span>{t}</span>
        <strong>{label}</strong>
        {cls && <em><Check size={14} /> Nov</em>}
      </div>
    ))}
  </div>
);

const ScreenMorning = () => (
  <div className="ps ps-lock">
    <span className="ps-lock-time">07:30</span>
    <span className="ps-lock-date">sreda</span>
    <div className="ps-note">
      <span className="ps-note-app"><CalendarCheck size={14} /> Asistent RM · zdaj</span>
      <strong>Nov termin: Ana K.</strong>
      <span>Jutri ob 10.00 — striženje</span>
    </div>
    <div className="ps-note">
      <span className="ps-note-app"><Mail size={14} /> Asistent RM · 6 ur nazaj</span>
      <strong>Ponoči: 3 klici, 0 zamujenih</strong>
      <span>Povzetek vas čaka v e-pošti.</span>
    </div>
  </div>
);

const SCREENS = [ScreenCall, ScreenChat, ScreenCalendar, ScreenMorning];

const Phone3D = ({ active, single }) => (
  <div className="pd" aria-hidden="true">
    <div className="pd-island" />
    <div className="pd-screen">
      {single !== undefined
        ? React.createElement(SCREENS[single])
        : SCREENS.map((S, i) => (
          <div key={i} className={`pd-layer ${i === active ? 'is-on' : ''}`}><S /></div>
        ))}
    </div>
  </div>
);

const STORY = [
  { icon: Moon, time: '22:47', title: 'Zaprto je. Telefon zvoni.', text: 'Stranka kliče po delovnem času. Pri večini podjetij bi zvonilo v prazno.' },
  { icon: PhoneIncoming, time: '22:47', title: 'Asistent se oglasi.', text: 'V slovenščini, prijazno in z imenom vašega podjetja. Odgovori na vprašanje in ponudi proste termine.' },
  { icon: CalendarCheck, time: '22:48', title: 'Termin je v koledarju.', text: 'Asistent preveri proste termine in vpiše novega. Brez listkov in brez klicanja nazaj.' },
  { icon: Mail, time: '07:30', title: 'Zjutraj ste na tekočem.', text: 'Kratek povzetek vseh klicev vas čaka v e-pošti ali SMS. Noben klic ni ostal neodgovorjen.' },
];

const CHIPS = ['zdravstveni-domovi', 'frizerski-kozmeticni-saloni', 'avtomobilske-delavnice', 'restavracije-gostinstvo', 'pravne-pisarne-odvetniki', 'fitnes-centri'];

/* ---------- Učinki ob drsenju ---------- */

// Elementi z razredom .rv se ob prihodu v zaslon nežno pojavijo.
const useReveal = (rootRef) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    root.classList.add('rv-ready');
    const els = root.querySelectorAll('.rv');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
};

// Napredek drsenja skozi visok razdelek (0–1).
const useScrollProgress = (ref) => {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.min(1, Math.max(0, -r.top / (total || 1))));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [ref]);
  return p;
};

const Home = () => {
  const rootRef = useRef(null);
  const problemRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  const problem = useScrollProgress(problemRef);

  useReveal(rootRef);

  // Kateri korak zgodbe je na sredini zaslona.
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.step)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const lines = ['Telefon zvoni.', 'Ne dvignete.', 'Stranka gre drugam.'];

  return (
    <div className="pr" ref={rootRef}>
      <PageMeta path="/" />

      {/* 1 — Uvod */}
      <section className="pr-hero">
        <div className="pr-hero-glow" aria-hidden="true" />
        <div className="sh-inner pr-hero-inner">
          <p className="pr-kicker">AI receptorka · 24/7 · v slovenščini</p>
          <h1 className="pr-hero-title">
            <span className="hero-word hero-word-1">Vaša</span>{' '}
            <span className="hero-word hero-word-2">24/7</span><br />
            <span className="hero-word hero-word-3">AI Receptorka</span>
          </h1>
          <p className="pr-hero-lead">Oglasi se, ko vi ne morete.</p>
          <div className="pr-actions">
            <a href={company.demoPhoneHref} className="pr-btn pr-btn-dark"><Phone size={18} aria-hidden="true" /> Pokliči demo</a>
            <Link to="/cenik" className="pr-btn pr-btn-ghost">Cenik <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <a href="#zgodba" className="pr-scroll"><span>Poglejte, kako deluje</span><ArrowDown size={18} aria-hidden="true" /></a>
      </section>

      {/* 2 — Problem: stavki se prižigajo ob drsenju */}
      <section className="pr-problem" ref={problemRef}>
        <div className="pr-problem-sticky">
          {lines.map((t, i) => {
            const on = problem > (i + 0.35) / (lines.length + 0.6);
            return <p key={t} className={`pr-line ${on ? 'is-on' : ''} ${i === lines.length - 1 ? 'pr-line-last' : ''}`}>{t}</p>;
          })}
        </div>
      </section>

      {/* 3 — Zgodba z lepljivim telefonom */}
      <section className="pr-story" id="zgodba">
        <div className="sh-inner">
          <div className="pr-story-head rv">
            <p className="pr-kicker">Ena noč z Asistentom RM</p>
            <h2 className="pr-h2">Medtem ko vi počivate,<br />posel teče naprej.</h2>
          </div>
          <div className="pr-story-grid">
            <div className="pr-steps">
              {STORY.map((s, i) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title}
                    className={`pr-step ${active === i ? 'is-active' : ''}`}
                    data-step={i}
                    ref={(el) => { stepRefs.current[i] = el; }}
                  >
                    <span className="pr-step-time"><Icon size={16} aria-hidden="true" /> {s.time}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <div className="pr-step-phone"><Phone3D single={i} /></div>
                  </article>
                );
              })}
            </div>
            <div className="pr-sticky">
              <Phone3D active={active} />
              <div className="pr-dots" aria-hidden="true">
                {STORY.map((s, i) => <span key={s.title} className={i === active ? 'is-on' : ''} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Dejstva */}
      <section className="pr-facts">
        <div className="sh-inner pr-facts-grid">
          {[['24/7', 'vse dni v letu'], ['SLO', 'naraven slovenski glas'], ['99 €', 'na mesec za začetek']].map(([v, l], i) => (
            <div className="pr-fact rv" style={{ transitionDelay: `${i * 120}ms` }} key={v}>
              <strong>{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — Demo */}
      <section className="pr-demo">
        <div className="sh-inner pr-demo-inner rv">
          <p className="pr-kicker pr-kicker-light">Poskusite v živo</p>
          <h2 className="pr-h2">Ne verjemite nam na besedo.<br />Pokličite.</h2>
          <a href={company.demoPhoneHref} className="pr-demo-num">
            <span className="pr-demo-ring" aria-hidden="true" />
            {company.demoPhone}
          </a>
          <p className="pr-demo-sub">Brezplačna demo linija · odgovori takoj</p>
        </div>
      </section>

      {/* 6 — Paketi */}
      <section className="pr-plans">
        <div className="sh-inner">
          <div className="pr-center rv">
            <p className="pr-kicker">Cenik</p>
            <h2 className="pr-h2">Preprosto. Pregledno.</h2>
          </div>
          <div className="pr-plan-grid">
            {plans.map((p, i) => (
              <Link to="/cenik" key={p.id} className={`pr-plan rv ${p.popular ? 'pr-plan-pop' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="pr-plan-name">{p.name}{p.popular && <em>Priljubljen</em>}</span>
                <span className="pr-plan-price">{p.price} €<small>/mesec</small></span>
                <span className="pr-plan-min">{p.minutes} minut pogovorov</span>
                <span className="pr-plan-more">Podrobnosti <ArrowRight size={16} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <p className="pr-foot">Cene brez DDV · vzpostavitev enkratno 99 €</p>
        </div>
      </section>

      {/* 7 — Panoge */}
      <section className="pr-ind">
        <div className="sh-inner pr-center rv">
          <h2 className="pr-h2 pr-h2-sm">Za vsako dejavnost,<br />ki živi od telefona.</h2>
          <div className="chips">
            {CHIPS.map((id) => {
              const ind = industries.find((x) => x.id === id);
              return <Link key={id} to={`/panoge/${id}`} className="chip">{ind.name}</Link>;
            })}
            <Link to="/panoge" className="chip chip-dark">Vse panoge <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* 8 — Zaključek */}
      <section className="pr-final">
        <div className="sh-inner pr-center rv">
          <h2 className="pr-final-title">Noben klic več<br />ne ostane neodgovorjen.</h2>
          <div className="pr-actions pr-actions-center">
            <a href={company.demoPhoneHref} className="pr-btn pr-btn-light"><Phone size={18} aria-hidden="true" /> {company.demoPhone}</a>
            <Link to="/kontakt" className="pr-btn pr-btn-outline">Pogovorimo se</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
