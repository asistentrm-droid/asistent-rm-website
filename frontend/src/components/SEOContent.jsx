import React, { useState } from 'react';
import { ChevronDown, Calendar, Zap, Users, CheckCircle2, ArrowRight, Phone, Clock, TrendingUp } from 'lucide-react';

const SEOContent = ({ onOpenContact }) => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "Kaj je AI tajnica?",
      answer: "AI tajnica je programska rešitev, ki s pomočjo umetne inteligence sprejema klice 24/7. Govori tekoče slovenščino, odgovarja na vprašanja, rezervira termine in vas obvešča o vsakem klicu."
    },
    {
      question: "Ali AI tajnica tekoče govori slovensko?",
      answer: "Da, govori tekoče slovenščino z naravnim glasom. Razume slovenski jezik in lokalne izraze. Stranke pogosto ne opazijo, da se pogovarjajo z AI."
    },
    {
      question: "Kako se AI tajnica povezuje z mojim koledarjem?",
      answer: "Enostavno se integrira z Google Calendar, Outlook in drugimi koledarji. Ko stranka kliče za termin, AI preverja vaše proste termine v realnem času in takoj rezervira. Prejmete avtomatsko obvestilo."
    },
    {
      question: "Za katera podjetja je AI tajnica primerna?",
      answer: "Idealna za vse storitve, ki temeljijo na terminih: zdravstveni domovi, saloni, delavnice, pravne pisarne, računovodstvo, nepremičnine in druge storitvene dejavnosti. Primerna za mala in srednje velika podjetja."
    }
  ];

  return (
    <div className="seo-content-wrapper">
      {/* Kako deluje sekcija */}
      <section className="seo-section">
        <div className="seo-container">
          <h2 className="seo-title">Kako deluje AI tajnica?</h2>
          
          <div className="seo-steps-grid">
            <div className="seo-step-card">
              <div className="step-number-badge">1</div>
              <Phone size={32} className="step-icon" />
              <h3 className="step-title">Stranka pokliče</h3>
              <ArrowRight className="step-arrow" size={24} />
              <p className="step-desc">AI dvigne v 3 sekundah in začne pogovor v tekoči slovenščini</p>
            </div>

            <div className="seo-step-card">
              <div className="step-number-badge">2</div>
              <Calendar size={32} className="step-icon" />
              <h3 className="step-title">Rezervira termin</h3>
              <ArrowRight className="step-arrow" size={24} />
              <p className="step-desc">Preverja vaš koledar in samodejno zabeleži rezervacijo</p>
            </div>

            <div className="seo-step-card">
              <div className="step-number-badge">3</div>
              <Zap size={32} className="step-icon" />
              <h3 className="step-title">Obvesti vas</h3>
              <ArrowRight className="step-arrow" size={24} />
              <p className="step-desc">Prejmete SMS ali e-pošto s celotnim zapisom pogovora</p>
            </div>

            <div className="seo-step-card">
              <div className="step-number-badge">4</div>
              <TrendingUp size={32} className="step-icon" />
              <h3 className="step-title">Raste z vami</h3>
              <ArrowRight className="step-arrow step-arrow-hidden" size={24} />
              <p className="step-desc">Deluje 24/7 brez počitka ali bolniške odsotnosti</p>
            </div>
          </div>

          <div className="seo-features-list">
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Odgovarja na vprašanja o delovnem času, storitvah in cenah</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Beleži vse pogovore za popoln pregled komunikacije</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Integrira se z Google Calendar, Outlook in CRM sistemi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Integracija sekcija */}
      <section className="seo-section seo-section-gray">
        <div className="seo-container">
          <h2 className="seo-title">Integracija koledarja</h2>
          <p className="seo-intro-text">AI tajnica se brezhibno povezuje z orodji, ki jih že uporabljate</p>
          
          <div className="integration-grid">
            <div className="integration-card">
              <div className="integration-icon-wrapper">
                <Calendar size={40} />
              </div>
              <h3 className="integration-card-title">Koledarji in CRM</h3>
              <p className="integration-card-desc">
                Integracija z <strong>Google Calendar</strong> in <strong>Outlook</strong> omogoča 
                samodejno rezervacijo terminov in beleženje klicev.
              </p>
            </div>

            <div className="integration-card">
              <div className="integration-icon-wrapper">
                <Zap size={40} />
              </div>
              <h3 className="integration-card-title">Obvestila</h3>
              <p className="integration-card-desc">
                Po vsakem klicu prejmete <strong>e-pošto</strong> ali <strong>SMS</strong> z zapisom 
                pogovora in podatki o stranki. Ostanite vedno obveščeni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primerjava sekcija */}
      <section className="seo-section">
        <div className="seo-container">
          <h2 className="seo-title">AI Tajnica vs. Klasična Tajnica</h2>
          <div className="comparison-table">
            <div className="comparison-column comparison-old">
              <h3 className="comparison-header comparison-header-old">Klasična tajnica</h3>
              <ul className="comparison-list">
                <li className="comparison-item comparison-negative">
                  <span className="comparison-icon">❌</span>
                  <span>Delovni čas 9-17h</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <span className="comparison-icon">❌</span>
                  <span>Strošek: 1.500-3.000€/mesec</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <span className="comparison-icon">❌</span>
                  <span>Bolniške in počitnice</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <span className="comparison-icon">❌</span>
                  <span>Čakalne vrste</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <span className="comparison-icon">❌</span>
                  <span>Človeška napaka pri beleženju</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <span className="comparison-icon">❌</span>
                  <span>Potrebno usposabljanje</span>
                </li>
              </ul>
            </div>
            <div className="comparison-column comparison-new">
              <h3 className="comparison-header comparison-header-new">AI Tajnica</h3>
              <ul className="comparison-list">
                <li className="comparison-item comparison-positive">
                  <span className="comparison-icon">✅</span>
                  <span>Dosegljiva 24/7/365</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <span className="comparison-icon">✅</span>
                  <span>Od 99€/mesec</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <span className="comparison-icon">✅</span>
                  <span>Brez odsotnosti</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <span className="comparison-icon">✅</span>
                  <span>Takojšen odziv na vsak klic</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <span className="comparison-icon">✅</span>
                  <span>100% natančno beleženje</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <span className="comparison-icon">✅</span>
                  <span>Takojšnja nastavitev</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ sekcija */}
      <section className="seo-section seo-section-gray">
        <div className="seo-container">
          <h2 className="seo-title">Pogosta vprašanja</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFAQ === index ? 'faq-active' : ''}`}
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <ChevronDown className={`faq-icon ${activeFAQ === index ? 'faq-icon-rotated' : ''}`} />
                </div>
                {activeFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Below FAQ */}
      <section className="seo-section">
        <div className="seo-container">
          <div className="final-cta-banner">
            <div className="final-cta-content">
              <Clock size={48} className="final-cta-icon" />
              <h2 className="final-cta-title">Nikoli več ne zamudite klica</h2>
              <p className="final-cta-subtitle">Začnite test danes</p>
              <div className="final-cta-features">
                <span className="cta-feature">✓ Brezplačen preizkus 7 dni</span>
                <span className="cta-feature">✓ Brez obveznosti</span>
                <span className="cta-feature">✓ Nastavitev v enem dnevu</span>
              </div>
              <a href="#section-contact" className="btn-final-cta" onClick={(e) => { e.preventDefault(); onOpenContact(); }}>
                Začni brezplačno
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOContent;
