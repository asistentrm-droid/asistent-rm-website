import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, Calendar, CheckCircle2, Calculator, Menu, X } from 'lucide-react';
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
          <div className="nav-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-secretary-22/artifacts/taeyavvy_Rm-logo.png" 
              alt="Asistent RM Logo" 
              className="logo-image"
            />
          </div>
          
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

      {/* Problem → Solution Section */}
      <section className="problem-solution-section" id="section-solution">
        <div className="problem-solution-container">
          <h2 className="problem-solution-title">Od problema do rešitve</h2>
          <p className="problem-solution-subtitle">Preprosto. Učinkovito. Avtomatizirano.</p>

          <div className="problem-solution-grid">
            {/* Item 1 */}
            <div className="ps-item">
              <div className="problem-side">
                <div className="problem-icon">❌</div>
                <h3 className="problem-title">Zamujeni klici</h3>
                <p className="problem-desc">Vsak nezajet klic je izgubljena priložnost. Stranke gredo h konkurenci.</p>
              </div>
              <div className="arrow-divider">→</div>
              <div className="solution-side">
                <div className="solution-icon">✅</div>
                <h3 className="solution-title">AI odgovori 24/7</h3>
                <p className="solution-desc">Vsak klic sprejet. Vsaka stranka obravnavana. Brez izjem.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="ps-item">
              <div className="problem-side">
                <div className="problem-icon">⏰</div>
                <h3 className="problem-title">Izgubljen čas</h3>
                <p className="problem-desc">Ure na telefonu namesto osredotočenosti na delo in stranke pred vami.</p>
              </div>
              <div className="arrow-divider">→</div>
              <div className="solution-side">
                <div className="solution-icon">🚀</div>
                <h3 className="solution-title">Popolna avtomatizacija</h3>
                <p className="solution-desc">AI upravlja klice. Vi se osredotočite na delo ki ga počnete najboljše.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="ps-item">
              <div className="problem-side">
                <div className="problem-icon">📅</div>
                <h3 className="problem-title">Kaos v koledarju</h3>
                <p className="problem-desc">Pozabljeni termini, podvojene rezervacije, zmeda pri organizaciji.</p>
              </div>
              <div className="arrow-divider">→</div>
              <div className="solution-side">
                <div className="solution-icon">📊</div>
                <h3 className="solution-title">Samodejno urejanje</h3>
                <p className="solution-desc">AI vpiše, organizira in obvešča. Vse na enem mestu, brez napak.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="ps-item">
              <div className="problem-side">
                <div className="problem-icon">😤</div>
                <h3 className="problem-title">Razočarane stranke</h3>
                <p className="problem-desc">Dolge čakalne dobe, nedosegljivost, počasen odziv na vprašanja.</p>
              </div>
              <div className="arrow-divider">→</div>
              <div className="solution-side">
                <div className="solution-icon">😊</div>
                <h3 className="solution-title">Takojšen odziv</h3>
                <p className="solution-desc">AI odgovori v 3 sekundah. Stranke zadovoljne, vi brez stresa.</p>
              </div>
            </div>
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
          <div className="footer-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-secretary-22/artifacts/taeyavvy_Rm-logo.png" 
              alt="Asistent RM Logo" 
              className="footer-logo-image"
            />
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Pogoji uporabe</a>
            <a href="#" className="footer-link">Zasebnost</a>
            <a href="#" className="footer-link">Kontakt</a>
          </div>
          <div className="footer-copy">© 2025 Asistent RM. Vse pravice pridržane.</div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
