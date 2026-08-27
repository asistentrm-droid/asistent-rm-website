import React, { useState } from 'react';
import { ChevronDown, Calendar, Zap, Users, CheckCircle2 } from 'lucide-react';

const SEOContent = () => {
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
          <div className="seo-content-grid">
            <div className="seo-text">
              <p>Ko stranka pokliče, AI asistent dvigne v nekaj sekundah in začne pogovor v tekoči slovenščini.</p>
              <ul className="seo-list">
                <li><CheckCircle2 size={18} /> <strong>Odgovarja</strong> na vprašanja o delovnem času, storitvah in cenah</li>
                <li><CheckCircle2 size={18} /> <strong>Rezervira termine</strong> v vašem Google Calendar ali Outlook</li>
                <li><CheckCircle2 size={18} /> <strong>Obvešča vas</strong> takoj po SMS ali e-pošti o vsakem klicu</li>
                <li><CheckCircle2 size={18} /> <strong>Beleži</strong> vse pogovore za popoln pregled</li>
              </ul>
              <p>Sistem deluje 24/7 brez počitka ali bolniške odsotnosti.</p>
            </div>
            <div className="seo-visual">
              <div className="seo-card">
                <Zap size={32} className="seo-icon" />
                <h3>Takojšen odziv</h3>
                <p>Vsak klic sprejet v manj kot 3 sekundah.</p>
              </div>
              <div className="seo-card">
                <Calendar size={32} className="seo-icon" />
                <h3>Avtomatske rezervacije</h3>
                <p>Termini se samodejno vpisujejo v vaš koledar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integracija sekcija */}
      <section className="seo-section seo-section-gray">
        <div className="seo-container">
          <h2 className="seo-title">Integracije CRM in Koledar</h2>
          <div className="seo-content-grid">
            <div className="seo-text">
              <p>AI tajnica se brezhibno povezuje z orodji, ki jih že uporabljate:</p>
              
              <h3 className="seo-subtitle">Koledarji in CRM</h3>
              <p>Integracija z <strong>Google Calendar</strong>, <strong>Outlook</strong> in CRM sistemi (Salesforce, HubSpot) omogoča samodejno rezervacijo terminov in beleženje klicev. Vsaka komunikacija se zabeleži v pravo stranko.</p>
              
              <h3 className="seo-subtitle">Obvestila</h3>
              <p>Po vsakem klicu prejmete e-pošto ali SMS z zapisom pogovora in podatki o stranki.</p>
            </div>
            <div className="seo-integration-list">
              <div className="integration-badge">Google Calendar</div>
              <div className="integration-badge">Microsoft Outlook</div>
              <div className="integration-badge">Salesforce CRM</div>
              <div className="integration-badge">HubSpot</div>
              <div className="integration-badge">Gmail</div>
              <div className="integration-badge">Zapier</div>
            </div>
          </div>
        </div>
      </section>

      {/* Primerjava sekcija */}
      <section className="seo-section">
        <div className="seo-container">
          <h2 className="seo-title">AI Tajnica vs. Klasična Tajnica</h2>
          <div className="comparison-table">
            <div className="comparison-column">
              <h3 className="comparison-header comparison-header-old">Klasična tajnica</h3>
              <ul className="comparison-list">
                <li className="comparison-item comparison-negative">❌ Delovni čas 9-17h</li>
                <li className="comparison-item comparison-negative">❌ Strošek: 1.500-3.000€/mesec</li>
                <li className="comparison-item comparison-negative">❌ Bolniške in počitnice</li>
                <li className="comparison-item comparison-negative">❌ Čakalne vrste v konicah</li>
                <li className="comparison-item comparison-negative">❌ Človeška napaka pri beleženju</li>
                <li className="comparison-item comparison-negative">❌ Potrebno usposabljanje</li>
              </ul>
            </div>
            <div className="comparison-column">
              <h3 className="comparison-header comparison-header-new">AI Tajnica</h3>
              <ul className="comparison-list">
                <li className="comparison-item comparison-positive">✅ Dosegljiva 24/7/365</li>
                <li className="comparison-item comparison-positive">✅ Od 99€/mesec</li>
                <li className="comparison-item comparison-positive">✅ Brez odsotnosti</li>
                <li className="comparison-item comparison-positive">✅ Takojšen odziv na vsak klic</li>
                <li className="comparison-item comparison-positive">✅ 100% natančno beleženje</li>
                <li className="comparison-item comparison-positive">✅ Takojšnja nastavitev</li>
              </ul>
            </div>
          </div>
          <div className="seo-cta-box">
            <Users size={40} />
            <h3>Privarčujte do 90% stroškov za sprejem klicev</h3>
            <p>AI tajnica stane manj kot 3€ na dan, medtem ko klasična tajnica stane preko 50€ na dan.</p>
            <a href="#section-contact" className="btn-primary">Pridobite ponudbo</a>
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
    </div>
  );
};

export default SEOContent;
