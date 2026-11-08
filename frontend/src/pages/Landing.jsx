import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Phone, CheckCircle2, Menu, X, XCircle, Clock, RefreshCw, Frown, Smile, Zap, BarChart, Play, Pause, MapPin, Mail, Building2, ShieldCheck } from 'lucide-react';
import '../styles/Landing.css';
import '../styles/SEOContent.css';
import '../styles/Trust.css';
import UseCases from '../components/UseCases';
import SEOContent from '../components/SEOContent';
import Pricing from '../components/Pricing';
import ContactModal from '../components/ContactModal';
import SiteFooter from '../components/SiteFooter';
import { company, plans, facts } from '../data/site';
import { getIndustryById } from '../data/industries';
import { initAllAnimations } from '../utils/animations';

const SAMPLE_CALL = getIndustryById('zdravstveni-domovi');

// Ocena: povprečen klic traja 3 minute.
const AVG_CALL_MIN = 3;

const SampleCall = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (!SAMPLE_CALL?.audioDemo) return null;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play().catch(() => setPlaying(false)); } else { a.pause(); }
  };

  return (
    <div className="sample-call">
      <button type="button" className="sample-call-btn" onClick={toggle} aria-label={playing ? 'Ustavi posnetek' : 'Predvajaj posnetek klica'}>
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <div className="sample-call-text">
        <strong>Poslušajte pravi klic</strong>
        <span>Primer: naročanje na pregled v ambulanti</span>
      </div>
      <audio
        ref={audioRef}
        src={SAMPLE_CALL.audioDemo}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
};

const Landing = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [callsPerDay, setCallsPerDay] = useState(20);
  const [missedPercentage, setMissedPercentage] = useState(30);
  const [customerValue, setCustomerValue] = useState(50);
  const [animatedLoss, setAnimatedLoss] = useState(0);
  const [animatedTime, setAnimatedTime] = useState(0);

  useEffect(() => {
    const cleanup = initAllAnimations();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[id^="section-"], #demo').forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
      if (cleanup) cleanup();
    };
  }, []);

  // Izračuni za kalkulator
  const dailyMissed = callsPerDay * (missedPercentage / 100);
  const monthlyLoss = Math.round(dailyMissed * customerValue * 30);
  const monthlyMinutes = Math.round(dailyMissed * 30 * AVG_CALL_MIN);
  const recommendedPlan = plans.find(p => p.minutes >= monthlyMinutes) || plans[plans.length - 1];
  const netGain = monthlyLoss - recommendedPlan.price;

  // Animirani števec
  useEffect(() => {
    const targetLoss = monthlyLoss;
    const targetTime = (monthlyMinutes) / 60;
    const steps = 60;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      if (i >= steps) {
        setAnimatedLoss(targetLoss);
        setAnimatedTime(Math.round(targetTime));
        clearInterval(timer);
      } else {
        setAnimatedLoss(Math.floor((targetLoss * i) / steps));
        setAnimatedTime(Math.floor((targetTime * i) / steps));
      }
    }, 1000 / steps);
    return () => clearInterval(timer);
  }, [monthlyLoss, monthlyMinutes]);

  const openContact = useCallback((plan = '') => {
    setSelectedPlan(plan);
    setContactModalOpen(true);
  }, []);
  const closeContact = useCallback(() => setContactModalOpen(false), []);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const fmt = (n) => n.toLocaleString('sl-SI');

  return (
    <div className="landing-container">
      <a href="#vsebina" className="skip-link">Preskoči na vsebino</a>

      {/* Navigation */}
      <nav className="navigation" aria-label="Glavna navigacija">
        <div className="nav-content">
          <a href="/" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="/logo.png" alt="Asistent RM" className="logo-image" width="64" height="48" />
            <span className="nav-brand">Asistent RM</span>
          </a>

          <div className="nav-links desktop-nav">
            <a href="#kako-deluje" className="nav-link">Kako deluje</a>
            <a href="#cenik" className="nav-link">Cenik</a>
            <a href="#section-calculator" className="nav-link">Kalkulator</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); openContact(); }}>Kontakt</a>
            <a href={company.demoPhoneHref} className="nav-link-cta"><Phone size={16} aria-hidden="true" /> Pokliči demo</a>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Zapri meni' : 'Odpri meni'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#kako-deluje" className="mobile-nav-link" onClick={closeMobileMenu}>Kako deluje</a>
            <a href="#cenik" className="mobile-nav-link" onClick={closeMobileMenu}>Cenik</a>
            <a href="#section-calculator" className="mobile-nav-link" onClick={closeMobileMenu}>Kalkulator</a>
            <a href="#" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); closeMobileMenu(); openContact(); }}>Kontakt</a>
            <a href={company.demoPhoneHref} className="mobile-nav-link-cta" onClick={closeMobileMenu}>Pokliči demo: {company.demoPhone}</a>
          </div>
        )}
      </nav>

      <main id="vsebina">
        {/* Hero */}
        <section className="hero-section" id="section-hero">
          <div className="hero-bg-animation" aria-hidden="true">
            <div className="gradient-orb gradient-orb-1"></div>
            <div className="gradient-orb gradient-orb-2"></div>
          </div>

          <div className="hero-content fade-in-up">
            <p className="hero-eyebrow">AI receptorka za slovenska podjetja</p>
            <h1 className="hero-title hero-title-animated">
              <span className="hero-word hero-word-1">Vaša</span>{' '}
              <span className="hero-word hero-word-2">24/7</span>{' '}
              <span className="hero-word hero-word-3">AI Receptorka</span>
            </h1>
            <p className="hero-subtitle hero-subtitle-reveal">
              Sprejema klice, odgovarja na vprašanja, naroča stranke in vpisuje termine v vaš koledar — v slovenščini, tudi ko vi ne morete dvigniti.
            </p>
            <div className="hero-cta">
              <a href={company.demoPhoneHref} className="btn-primary">
                <Phone className="btn-icon" aria-hidden="true" />
                Pokliči demo: {company.demoPhone}
              </a>
              <a href="#cenik" className="btn-secondary">
                Cenik od 99 €
              </a>
            </div>

            <SampleCall />

            <ul className="hero-trust" aria-label="Zakaj nam lahko zaupate">
              <li><CheckCircle2 size={16} aria-hidden="true" /> Slovensko podjetje iz Kopra</li>
              <li><CheckCircle2 size={16} aria-hidden="true" /> Javno objavljene cene</li>
              <li><CheckCircle2 size={16} aria-hidden="true" /> Paket zamenjate kadar koli</li>
            </ul>
          </div>
        </section>

        {/* Demo */}
        <section className="demo-section" id="demo">
          <div className={`demo-content ${isVisible['demo'] ? 'visible' : ''}`}>
            <div className="demo-badge">Poskusi v živo</div>
            <h2 className="demo-title-main">Govori z AI receptorko. Zdaj.</h2>
            <p className="demo-subtitle">Pokliči in se prepričaj, kako AI obravnava tvoje stranke.</p>

            <div className="demo-box-v2">
              <div className="demo-phone-wrapper" aria-hidden="true">
                <div className="pulse-ring"></div>
                <div className="pulse-ring delay-1"></div>
                <Phone className="demo-icon-v2" />
              </div>

              <div className="demo-number-section">
                <p className="demo-label">Pokliči in testiraj AI</p>
                <a href={company.demoPhoneHref} className="demo-phone-v2">{company.demoPhone}</a>
                <p className="demo-free-badge">Brezplačen demo klic</p>
              </div>

              <div className="demo-steps">
                <div className="demo-step"><span className="step-num">1</span><span className="step-text">Pokliči številko</span></div>
                <div className="demo-step"><span className="step-num">2</span><span className="step-text">Vprašaj karkoli ali se naroči</span></div>
                <div className="demo-step"><span className="step-num">3</span><span className="step-text">Presodi sam</span></div>
              </div>
            </div>

            <p className="demo-honest-note">
              Demo je splošna različica. Vaš asistent bo pri vzpostavitvi prilagojen vašemu podjetju: storitve, cene, delovni čas, ton pogovora, glas in koledar.
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="problem-section" id="section-problem">
          <div className={`problem-content ${isVisible['section-problem'] ? 'visible' : ''}`}>
            <div className="problem-line delay-1">Telefon zvoni.</div>
            <div className="problem-line delay-2">Ne dvignete.</div>
            <div className="problem-line delay-3">Stranka gre drugam.</div>
          </div>
        </section>

        {/* Izzivi → rešitve */}
        <section className="problem-solution-section" id="section-solution" style={{paddingBottom: 'var(--spacing-xxl)'}}>
          <div className="problem-solution-container" style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '90px'}}>
            <h2 className="problem-solution-title" style={{fontSize: '56px', fontWeight: '700'}}>Vaši izzivi. Naše rešitve.</h2>
          
            <div className="problem-solution-grid">
              {[
                {
                  problemIcon: XCircle,
                  problemTitle: "Zamujeni klici",
                  problemShort: "Izgubljene priložnosti",
                  solutionIcon: CheckCircle2,
                  solutionTitle: "AI odgovori 24/7",
                  solutionFull: "Vsak klic sprejet. Vsaka stranka obravnavana. AI tajnica ne spi nikoli. Brez zamujenih priložnosti, brez izgubljenih strank.",
                  example: "Stranka pokliče ob 22h → AI sprejme klic, rezervira termin in pošlje potrditev."
                },
                {
                  problemIcon: Clock,
                  problemTitle: "Izgubljen čas",
                  problemShort: "Ure na telefonu",
                  solutionIcon: Zap,
                  solutionTitle: "Popolna avtomatizacija",
                  solutionFull: "AI upravlja vse klice medtem ko vi delate tisto kar znate najboljše. Ni več prekinitev, ni več izgubljenega časa.",
                  example: "Med delom pride 5 klicev → AI vse obravnava, vi ostanete osredotočeni."
                },
                {
                  problemIcon: RefreshCw,
                  problemTitle: "Kaos v koledarju",
                  problemShort: "Podvojene rezervacije",
                  solutionIcon: BarChart,
                  solutionTitle: "Samodejno urejanje",
                  solutionFull: "AI vpiše vse termine v vaš koledar, obvešča stranke in poskrbi da ni prekrivanj. Organizacija brez napora.",
                  example: "Stranka želi premakniti termin → AI najde nov termin in posodobi koledar."
                },
                {
                  problemIcon: Frown,
                  problemTitle: "Razočarane stranke",
                  problemShort: "Dolge čakalne dobe",
                  solutionIcon: Smile,
                  solutionTitle: "Takojšen odziv",
                  solutionFull: "AI odgovori v 3 sekundah. Stranke dobijo informacije takoj, ne čakajo, so zadovoljne. Vi pridobite zaupanje.",
                  example: "Stranka ima vprašanje → AI takoj odgovori z točnimi informacijami."
                }
              ].map((item, index) => {
                const ProblemIcon = item.problemIcon;
                const SolutionIcon = item.solutionIcon;
                const isActive = isVisible[`ps-${index}`];
              
                return (
                  <div 
                    key={index}
                    className={`use-case-card-v2 ${isActive ? 'active' : ''}`}
                    onClick={() => setIsVisible(prev => ({ ...prev, [`ps-${index}`]: !prev[`ps-${index}`] }))}
                  >
                    <div className="use-case-header">
                      <div className="use-case-icon-wrapper-v2">
                        <ProblemIcon className="use-case-icon-v2" />
                      </div>
                      <div className="use-case-title-wrapper">
                        <h3 className="use-case-title-v2">{item.problemTitle}</h3>
                        <p className="use-case-short-desc">{item.problemShort}</p>
                      </div>
                      <ArrowRight className={`chevron-icon ${isActive ? 'rotated' : ''}`} />
                    </div>
                  
                    {isActive && (
                      <div className="use-case-expanded">
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'flex-start' }}>
                          <div className="use-case-icon-wrapper-v2">
                            <SolutionIcon className="use-case-icon-v2" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-black)', marginBottom: '8px' }}>{item.solutionTitle}</h4>
                            <p className="use-case-full-desc">{item.solutionFull}</p>
                            <div className="use-case-example-v2">
                              <span className="example-label-v2">Primer:</span>
                              <p className="example-text-v2">{item.example}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* Dejstva */}
        <section className="value-section" id="section-value">
          <div className={`value-content ${isVisible['section-value'] ? 'visible' : ''}`}>
            <div className="value-grid">
              {facts.map((f) => (
                <div className="value-card" key={f.value}>
                  <div className="value-number">{f.value}</div>
                  <div className="value-label">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kalkulator */}
        <section className="calculator-section" id="section-calculator">
          <div className={`calculator-content ${isVisible['section-calculator'] ? 'visible' : ''}`}>
            <h2 className="calculator-title">
              Koliko denarja izgubljate zaradi<br />neodgovorjenih klicev?
            </h2>

            <div className="calculator-box">
              <div className="calculator-inputs">
                <div className="input-group">
                  <label className="input-label" htmlFor="calc-calls">Število klicev na dan</label>
                  <div className="slider-container">
                    <input id="calc-calls" type="range" min="1" max="100" value={callsPerDay}
                      onChange={(e) => setCallsPerDay(Number(e.target.value))} className="slider" />
                    <span className="slider-value">{callsPerDay}</span>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="calc-missed">% klicev, ki jih zamudite</label>
                  <div className="slider-container">
                    <input id="calc-missed" type="range" min="0" max="100" value={missedPercentage}
                      onChange={(e) => setMissedPercentage(Number(e.target.value))} className="slider" />
                    <span className="slider-value">{missedPercentage}%</span>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="calc-value">Povprečna vrednost stranke (€)</label>
                  <div className="slider-container">
                    <input id="calc-value" type="range" min="10" max="500" step="10" value={customerValue}
                      onChange={(e) => setCustomerValue(Number(e.target.value))} className="slider" />
                    <span className="slider-value">{customerValue}€</span>
                  </div>
                </div>
              </div>

              <div className="calculator-result">
                <div className="result-row">
                  <div className="result-item">
                    <div className="result-label">Mesečna izguba</div>
                    <div className="result-amount">{fmt(animatedLoss)}€</div>
                    <div className="result-subtext">izgubljeni prihodki</div>
                  </div>
                  <div className="result-divider"></div>
                  <div className="result-item">
                    <div className="result-label">Čas na telefonu</div>
                    <div className="result-amount-time">{animatedTime}h</div>
                    <div className="result-subtext">vsak mesec</div>
                  </div>
                </div>
              </div>

              <div className="calc-recommend">
                <div>
                  <span className="calc-recommend-label">Priporočen paket</span>
                  <strong>{recommendedPlan.name} — {recommendedPlan.price} €/mesec</strong>
                  <span className="calc-recommend-sub">
                    ≈ {fmt(monthlyMinutes)} min zamujenih klicev mesečno · paket vključuje {recommendedPlan.minutes} min
                  </span>
                </div>
                {netGain > 0 && (
                  <div className="calc-net">
                    <span className="calc-recommend-label">Ocenjena razlika</span>
                    <strong>+{fmt(netGain)} € / mesec</strong>
                  </div>
                )}
              </div>
              <p className="calc-disclaimer">
                Ocena predpostavlja, da povprečen klic traja {AVG_CALL_MIN} minute in da bi vsak zamujeni klic postal stranka. Cene brez DDV.
              </p>
            </div>

            <div className="calculator-cta">
              <a href="#cenik" className="btn-primary-large">Oglej si cenik</a>
            </div>
          </div>
        </section>

        <Pricing onChoose={openContact} />

        <UseCases />

        <SEOContent onOpenContact={() => openContact()} />

        {/* Kdo smo */}
        <section className="company-section" id="o-nas" aria-labelledby="o-nas-naslov">
          <div className="section-inner company-inner">
            <div>
              <p className="section-eyebrow">Kdo stoji za Asistentom RM</p>
              <h2 className="section-title section-title-left" id="o-nas-naslov">Slovensko podjetje. Pravi naslov. Dosegljivi smo.</h2>
              <p className="section-lead section-lead-left">
                Asistent RM razvija in upravlja podjetje {company.legalName} iz Kopra. Pri vzpostavitvi se z vami osebno
                pogovorimo, pripravimo scenarij pogovora za vaše podjetje in asistenta preizkusimo, preden ga predamo v uporabo.
              </p>
            </div>
            <dl className="company-card">
              <div><dt><Building2 size={18} aria-hidden="true" /> Podjetje</dt><dd>{company.legalName}</dd></div>
              <div><dt><MapPin size={18} aria-hidden="true" /> Naslov</dt><dd>{company.street}, {company.postalCode} {company.city}</dd></div>
              <div><dt><ShieldCheck size={18} aria-hidden="true" /> ID za DDV</dt><dd>{company.vatId} · MŠ {company.registrationNumber}</dd></div>
              <div><dt><Mail size={18} aria-hidden="true" /> E-mail</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
              <div><dt><Phone size={18} aria-hidden="true" /> Demo linija</dt><dd><a href={company.demoPhoneHref}>{company.demoPhone}</a></dd></div>
            </dl>
          </div>
        </section>
      </main>

      <ContactModal open={contactModalOpen} onClose={closeContact} defaultPlan={selectedPlan} />

      <SiteFooter />
    </div>
  );
};

export default Landing;
