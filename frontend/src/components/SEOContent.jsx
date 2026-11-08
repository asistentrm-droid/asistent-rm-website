import React, { useState } from 'react';
import { faqs, pricingTerms } from '../data/site';
import { ChevronDown, Calendar, Zap, CheckCircle2, ArrowRight, Phone, Clock, TrendingUp, X, Check } from 'lucide-react';

const SEOContent = ({ onOpenContact }) => {
  const [activeFAQ, setActiveFAQ] = useState(null);


  return (
    <div className="seo-content-wrapper">
      {/* Kako deluje sekcija */}
      <section className="seo-section" id="kako-deluje">
        <div className="seo-container">
          <h2 className="seo-title">Kako deluje AI receptorka?</h2>
          
          <div className="seo-steps-grid">
            <div className="seo-step-card">
              <div className="step-number-badge">1</div>
              <Phone size={32} className="step-icon" />
              <h3 className="step-title">Stranka pokliče</h3>
              <ArrowRight className="step-arrow" size={24} />
              <p className="step-desc">Asistent takoj dvigne in začne pogovor v slovenščini</p>
            </div>

            <div className="seo-step-card">
              <div className="step-number-badge">2</div>
              <Calendar size={32} className="step-icon" />
              <h3 className="step-title">Rezervira termin</h3>
              <ArrowRight className="step-arrow" size={24} />
              <p className="step-desc">Preveri vaš koledar in vpiše termin — ali klic preusmeri na pravo osebo</p>
            </div>

            <div className="seo-step-card">
              <div className="step-number-badge">3</div>
              <Zap size={32} className="step-icon" />
              <h3 className="step-title">Obvesti vas</h3>
              <ArrowRight className="step-arrow" size={24} />
              <p className="step-desc">Po klicu prejmete e-mail ali SMS s podatki in povzetkom pogovora</p>
            </div>

            <div className="seo-step-card">
              <div className="step-number-badge">4</div>
              <TrendingUp size={32} className="step-icon" />
              <h3 className="step-title">Deluje 24/7</h3>
              <ArrowRight className="step-arrow step-arrow-hidden" size={24} />
              <p className="step-desc">Ponoči, med vikendi in med prazniki — tudi ko ste sredi dela</p>
            </div>
          </div>

          <div className="seo-features-list">
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Odgovarja na vprašanja o delovnem času, storitvah in cenah</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Po vsakem klicu vas obvesti, kdo je klical in kaj je želel</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Pri vzpostavitvi ga povežemo z vašo telefonsko številko in koledarjem</span>
            </div>
          </div>
        </div>
      </section>

      {/* Integracija sekcija */}
      <section className="seo-section seo-section-gray">
        <div className="seo-container">
          <h2 className="seo-title">Integracija koledarja</h2>
          <p className="seo-intro-text">Asistent dela z orodji, ki jih že uporabljate</p>
          
          <div className="integration-grid">
            <div className="integration-card">
              <div className="integration-icon-wrapper">
                <Calendar size={40} />
              </div>
              <h3 className="integration-card-title">Koledarji</h3>
              <p className="integration-card-desc">
                Povezava s koledarjem, kot sta <strong>Google Calendar</strong> in <strong>Outlook</strong>, je del
                vzpostavitve. Asistent vidi proste termine in nove vpiše sam.
              </p>
            </div>

            <div className="integration-card">
              <div className="integration-icon-wrapper">
                <Zap size={40} />
              </div>
              <h3 className="integration-card-title">Obvestila</h3>
              <p className="integration-card-desc">
                Po vsakem klicu prejmete <strong>e-mail</strong> (PRO in BUSINESS tudi <strong>SMS</strong>) s podatki
                o klicatelju. PRO doda povzetek klica, BUSINESS še celoten prepis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primerjava sekcija */}
      <section className="seo-section">
        <div className="seo-container">
          <h2 className="seo-title">AI tajnica proti človeški tajnici</h2>
          <div className="comparison-table">
            <div className="comparison-column comparison-old">
              <h3 className="comparison-header comparison-header-old">Človeška tajnica</h3>
              <ul className="comparison-list">
                <li className="comparison-item comparison-negative">
                  <X className="comparison-icon" size={20} />
                  <span>Delovni čas 9-17h</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <X className="comparison-icon" size={20} />
                  <span>Strošek plače: več kot 1.500 €/mesec</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <X className="comparison-icon" size={20} />
                  <span>Bolniške in počitnice</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <X className="comparison-icon" size={20} />
                  <span>Čakalne vrste</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <X className="comparison-icon" size={20} />
                  <span>En klic naenkrat</span>
                </li>
                <li className="comparison-item comparison-negative">
                  <X className="comparison-icon" size={20} />
                  <span>Potrebno usposabljanje</span>
                </li>
              </ul>
            </div>
            <div className="comparison-column comparison-new">
              <h3 className="comparison-header comparison-header-new">AI Tajnica</h3>
              <ul className="comparison-list">
                <li className="comparison-item comparison-positive">
                  <Check className="comparison-icon" size={20} />
                  <span>Dosegljiva 24/7, vse dni v letu</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <Check className="comparison-icon" size={20} />
                  <span>Brez odsotnosti</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <Check className="comparison-icon" size={20} />
                  <span>Od 99 €/mesec + DDV</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <Check className="comparison-icon" size={20} />
                  <span>Takojšen odziv, brez čakanja</span>
                </li>
                <li className="comparison-item comparison-positive">
                  <Check className="comparison-icon" size={20} />
                  <span>Povzetek vsakega klica v vašem e-mailu</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ sekcija */}
      <section className="seo-section seo-section-gray" id="vprasanja">
        <div className="seo-container">
          <h2 className="seo-title">Pogosta vprašanja</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const open = activeFAQ === index;
              return (
                <div key={faq.question} className={`faq-item ${open ? 'faq-active' : ''}`}>
                  <h3 className="faq-question-heading">
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={open}
                      aria-controls={`faq-odgovor-${index}`}
                      onClick={() => setActiveFAQ(open ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`faq-icon ${open ? 'faq-icon-rotated' : ''}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq-answer" id={`faq-odgovor-${index}`} hidden={!open}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
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
              <p className="final-cta-subtitle">Najprej pokličite demo. Ko ste prepričani, vašega asistenta vzpostavimo skupaj.</p>
              <div className="final-cta-features">
                <span className="cta-feature">✓ Brezplačen demo klic</span>
                <span className="cta-feature">✓ Od 99 €/mesec + DDV</span>
                <span className="cta-feature">✓ Vzpostavitev {pricingTerms.setupFee} € enkratno</span>
              </div>
              <a href="#section-contact" className="btn-final-cta" onClick={(e) => { e.preventDefault(); onOpenContact(); }}>
                Dogovorimo se za uvodni pogovor
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
