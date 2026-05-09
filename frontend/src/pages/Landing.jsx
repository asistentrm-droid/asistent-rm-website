import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, Calendar, CheckCircle2, Calculator, Menu, X, XCircle, Clock, RefreshCw, Frown, Smile, Zap, BarChart, Youtube, Facebook, Instagram, Mail, PhoneIcon } from 'lucide-react';
import '../styles/Landing.css';
import UseCases from '../components/UseCases';

const Landing = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callsPerDay, setCallsPerDay] = useState(20);
  const [missedPercentage, setMissedPercentage] = useState(30);
  const [customerValue, setCustomerValue] = useState(50);
  const [animatedLoss, setAnimatedLoss] = useState(0);
  const [animatedTime, setAnimatedTime] = useState(0);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    document.querySelectorAll('[id^="section-"], #demo').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const calculateLoss = () => {
    const dailyLoss = callsPerDay * (missedPercentage / 100) * customerValue;
    const monthlyLoss = dailyLoss * 30;
    return monthlyLoss.toFixed(0);
  };

  const calculateTimeSaved = () => {
    // Povprečen klic traja 3 minute
    const dailyMissedCalls = callsPerDay * (missedPercentage / 100);
    const monthlyMinutes = dailyMissedCalls * 30 * 3;
    const hours = (monthlyMinutes / 60).toFixed(0);
    return hours;
  };

  // Animated counter effect
  useEffect(() => {
    const dailyLoss = callsPerDay * (missedPercentage / 100) * customerValue;
    const targetLoss = dailyLoss * 30;
    
    const dailyMissedCalls = callsPerDay * (missedPercentage / 100);
    const monthlyMinutes = dailyMissedCalls * 30 * 3;
    const targetTime = monthlyMinutes / 60;
    
    const duration = 1000;
    const steps = 60;
    const increment = targetLoss / steps;
    const timeIncrement = targetTime / steps;
    let current = 0;
    let currentTime = 0;

    const timer = setInterval(() => {
      current += increment;
      currentTime += timeIncrement;
      if (current >= targetLoss) {
        setAnimatedLoss(Math.floor(targetLoss));
        setAnimatedTime(Math.floor(targetTime));
        clearInterval(timer);
      } else {
        setAnimatedLoss(Math.floor(current));
        setAnimatedTime(Math.floor(currentTime));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [callsPerDay, missedPercentage, customerValue]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mkovjydg', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Redirect to thank you page
        window.location.href = '/hvala';
      } else {
        alert('Prišlo je do napake. Prosimo, poskusite znova.');
      }
    } catch (error) {
      alert('Prišlo je do napake. Prosimo, poskusite znova.');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-content">
          <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-secretary-22/artifacts/taeyavvy_Rm-logo.png" 
              alt="Asistent RM Logo" 
              className="logo-image"
            />
          </a>
          
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a href="#section-calculator" className="nav-link">Kalkulator</a>
            <a href="#section-contact" className="nav-link">Kontakt</a>
            <a href="#demo" className="nav-link-cta">Preizkusi Demo</a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#section-calculator" className="mobile-nav-link" onClick={closeMobileMenu}>Kalkulator</a>
            <a href="#section-contact" className="mobile-nav-link" onClick={closeMobileMenu}>Kontakt</a>
            <a href="#demo" className="mobile-nav-link-cta" onClick={closeMobileMenu}>Preizkusi Demo</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="section-hero">
        <div className="hero-content fade-in-up">
          <h1 className="hero-title">
            AI tajnica, ki sprejema<br />klice namesto vas.
          </h1>
          <p className="hero-subtitle">
            Rezervira termine. Odgovarja strankam. Vedno dosegljiva.
          </p>
          <div className="hero-cta">
            <a href="#demo" className="btn-primary">
              Poglej demo
              <ArrowRight className="btn-icon" />
            </a>
            <a href="#section-contact" className="btn-secondary">
              Kontakt
            </a>
          </div>
        </div>
      </section>

      {/* Demo Section - MOVED UP (Priority!) */}
      <section className="demo-section" id="demo">
        <div className={`demo-content ${isVisible['demo'] ? 'visible' : ''}`}>
          <div className="demo-badge">🎙️ POSKUSI V ŽIVO</div>
          <h2 className="demo-title-main">Govori z AI tajnico. Zdaj.</h2>
          <p className="demo-subtitle">Pokliči in prepričaj se kako AI obravnava tvoje stranke</p>
          
          {/* Beta Disclaimer */}
          <div className="beta-disclaimer">
            <div className="beta-icon">✨</div>
            <div className="beta-text">
              <strong>Early Access verzija</strong>
              <p>AI tajnica je v fazi razvoja. Demo klic omogoča testiranje osnovnih funkcij. 
              Aktivno delamo na izboljšavah in dodatnih funkcionalnostih za polno izkušnjo.</p>
            </div>
          </div>

          <div className="demo-box-v2">
            <div className="demo-phone-wrapper">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <Phone className="demo-icon-v2" />
            </div>
            
            <div className="demo-number-section">
              <p className="demo-label">Pokliči in testiraj AI</p>
              <a href="tel:+38618285739" className="demo-phone-v2">
                +386 18 285 739
              </a>
              <p className="demo-free-badge">100% BREZPLAČEN TEST</p>
            </div>

            <div className="demo-steps">
              <div className="demo-step">
                <span className="step-num">1</span>
                <span className="step-text">Pokliči številko</span>
              </div>
              <div className="demo-step">
                <span className="step-num">2</span>
                <span className="step-text">Govori z AI kot s stranko</span>
              </div>
              <div className="demo-step">
                <span className="step-num">3</span>
                <span className="step-text">Prepričaj se v učinkovitost</span>
              </div>
            </div>
          </div>

          <p className="demo-note">
            <span className="note-icon">💡</span>
            Res AI odgovori. Res razume slovenščino. Poskusi zdaj.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section" id="section-problem">
        <div className={`problem-content ${isVisible['section-problem'] ? 'visible' : ''}`}>
          <div className="problem-line delay-1">Telefon zvoni.</div>
          <div className="problem-line delay-2">Ne dvignete.</div>
          <div className="problem-line delay-3">Stranka gre drugam.</div>
        </div>
      </section>

      {/* Problem → Solution Section - EXACT COPY of Use Cases */}
      <section className="problem-solution-section" id="section-solution" style={{paddingBottom: 'var(--spacing-xxl)'}}>
        <div className="problem-solution-container" style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
          <h2 className="problem-solution-title" style={{fontSize: '56px', fontWeight: '700'}}>Vaši izzivi. Naše rešitve.</h2>
          <p className="problem-solution-subtitle">Klikni na problem in poglej rešitev</p>
          
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

      {/* Value Section */}
      <section className="value-section" id="section-value">
        <div className={`value-content ${isVisible['section-value'] ? 'visible' : ''}`}>
          <div className="value-grid">
            <div className="value-card">
              <div className="value-number">+30%</div>
              <div className="value-label">več rezervacij</div>
            </div>
            <div className="value-card">
              <div className="value-number">0</div>
              <div className="value-label">zamujenih klicev</div>
            </div>
            <div className="value-card">
              <div className="value-number">100%</div>
              <div className="value-label">dosegljivost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section - KEY FEATURE */}
      <section className="calculator-section" id="section-calculator">
        <div className={`calculator-content ${isVisible['section-calculator'] ? 'visible' : ''}`}>
          <h2 className="calculator-title">
            Koliko denarja izgubljate zaradi<br />neodgovorjenih klicev?
          </h2>
          
          <div className="calculator-box">
            <div className="calculator-inputs">
              <div className="input-group">
                <label className="input-label">Število klicev na dan</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="slider"
                  />
                  <span className="slider-value">{callsPerDay}</span>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">% klicev, ki jih zamudite</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={missedPercentage}
                    onChange={(e) => setMissedPercentage(Number(e.target.value))}
                    className="slider"
                  />
                  <span className="slider-value">{missedPercentage}%</span>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Povprečna vrednost stranke (€)</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={customerValue}
                    onChange={(e) => setCustomerValue(Number(e.target.value))}
                    className="slider"
                  />
                  <span className="slider-value">{customerValue}€</span>
                </div>
              </div>
            </div>

            <div className="calculator-result">
              <div className="result-row">
                <div className="result-item">
                  <div className="result-label">Mesečna izguba</div>
                  <div className="result-amount">{animatedLoss}€</div>
                  <div className="result-subtext">izgubljeni prihodki</div>
                </div>
                <div className="result-divider"></div>
                <div className="result-item">
                  <div className="result-label">Prihranjen čas</div>
                  <div className="result-amount-time">{animatedTime}h</div>
                  <div className="result-subtext">vsak mesec</div>
                </div>
              </div>
            </div>
          </div>

          <div className="calculator-cta">
            <a href="#demo" className="btn-primary-large">
              Preizkusi Demo
            </a>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <UseCases />

      {/* Final CTA Section */}
      <section className="final-cta-section" id="section-contact">
        <div className={`final-cta-content ${isVisible['section-contact'] ? 'visible' : ''}`}>
          <h2 className="final-cta-title">
            Nikoli več ne zamudite klica.
          </h2>
          <form onSubmit={handleFormSubmit} className="contact-form">
            <input 
              type="text" 
              name="name"
              placeholder="Ime in priimek" 
              className="form-input"
              required
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className="form-input"
              required
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Telefonska številka" 
              className="form-input"
              required
            />
            <input 
              type="text" 
              name="company"
              placeholder="Podjetje" 
              className="form-input"
            />
            <button type="submit" className="btn-primary-large">
              Začni test
            </button>
          </form>
          <p className="form-note">Brezplačen preizkus 7 dni. Brez obveznosti.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-section">
              <img 
                src="https://customer-assets.emergentagent.com/job_ai-secretary-22/artifacts/taeyavvy_Rm-logo.png" 
                alt="Asistent RM" 
                className="footer-logo-image"
              />
              <p className="footer-tagline">AI tajnica, ki sprejema klice namesto vas.</p>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Pravno</h4>
              <div className="footer-links-column">
                <a href="/pogoji" className="footer-link">Pogoji uporabe</a>
                <a href="/zasebnost" className="footer-link">Zasebnost</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Kontakt</h4>
              <div className="footer-contact">
                <a href="mailto:info@asistentrm.org" className="footer-contact-item">
                  <Mail size={16} />
                  <span>info@asistentrm.org</span>
                </a>
                <a href="tel:+38668660690" className="footer-contact-item">
                  <PhoneIcon size={16} />
                  <span>068 660 690</span>
                </a>
                <a href="tel:+38641438869" className="footer-contact-item">
                  <PhoneIcon size={16} />
                  <span>041 438 869</span>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Sledite nam</h4>
              <div className="footer-social">
                <a href="https://www.youtube.com/@RMASISTENT" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61584933238897&locale=sl_SI" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/rmasistent/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Asistent RM. Vse pravice pridržane.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
