import React, { useState, useEffect } from 'react';
import { ArrowRight, Phone, Calendar, CheckCircle2, Calculator, Menu, X } from 'lucide-react';
import '../styles/Landing.css';
import FAQ from '../components/FAQ';
import TrustBadges from '../components/TrustBadges';
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
          <h2 className="section-title">Preizkusite v živo</h2>
          <div className="demo-box">
            <Phone className="demo-icon" />
            <p className="demo-text">Pokliči in preizkusi AI tajnico</p>
            <a href="tel:+38618285739" className="demo-phone">+386 18 285 739</a>
            <p className="demo-subtext">Izkusite kako AI obravnava klice vaših strank</p>
          </div>
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

      {/* Solution Section */}
      <section className="solution-section" id="section-solution">
        <div className={`solution-content ${isVisible['section-solution'] ? 'visible' : ''}`}>
          <h2 className="section-title">Rešitev</h2>
          
          <div className="solution-graphic">
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-secretary-22/artifacts/rqfusj80_RM-grafika.png" 
              alt="Asistent RM delovanje" 
              className="graphic-image"
            />
          </div>

          <div className="solution-steps">
            <div className="solution-step step-1">
              <div className="step-number">1</div>
              <div className="step-text">AI dvigne klic.</div>
            </div>
            <div className="solution-step step-2">
              <div className="step-number">2</div>
              <div className="step-text">Govori s stranko.</div>
            </div>
            <div className="solution-step step-3">
              <div className="step-number">3</div>
              <div className="step-text">Rezervira termin.</div>
            </div>
            <div className="solution-step step-4">
              <div className="step-number">4</div>
              <div className="step-text">Vpiše v koledar.</div>
            </div>
          </div>
          <p className="solution-tagline">To je to.</p>
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

      {/* Trust Badges */}
      <TrustBadges />

      {/* Use Cases Section */}
      <UseCases />

      {/* FAQ Section */}
      <FAQ />

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
