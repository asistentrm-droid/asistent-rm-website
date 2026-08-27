import React, { useState } from 'react';
import { ChevronDown, Calendar, Zap, Users, CheckCircle2 } from 'lucide-react';

const SEOContent = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "Kaj je AI tajnica?",
      answer: "AI tajnica je napredna programska rešitev, ki s pomočjo umetne inteligence sprejema telefonske klice vaših strank 24/7. Deluje kot pravi telefonski asistent – govori tekoče slovenščino, odgovarja na vprašanja, rezervira termine v vašem koledarju in vas obvešča o vsakem klicu."
    },
    {
      question: "Ali AI tajnica tekoče govori slovensko?",
      answer: "Da, naša AI tajnica govori tekoče slovenščino z naravnim glasom. Razume slovenski jezik, lokalne izraze in zna prilagoditi komunikacijo vašemu področju dela. Stranke pogosto ne opazijo, da se pogovarjajo z AI asistentom."
    },
    {
      question: "Kako se AI tajnica povezuje z mojim koledarjem?",
      answer: "AI tajnica se enostavno integrira z Google Calendar, Outlook in drugimi koledarskimi sistemi. Ko stranka kliče za termin, AI preverja vaše proste termine v realnem času in takoj rezervira ustrezno časovno okno. Prejeli boste avtomatsko obvestilo o vsaki rezervaciji."
    },
    {
      question: "Za katera podjetja je AI tajnica primerna?",
      answer: "AI tajnica je idealna za vse storitve, ki temeljijo na terminih: zdravstveni domovi, frizerski saloni, avtomehanične delavnice, pravne pisarne, računovodske servise, nepremičninske agencije in druge storitvene dejavnosti. Primerna je za mala in srednje velika podjetja, ki želijo profesionalen sprejem klicev brez dodatnih stroškov za osebje."
    }
  ];

  return (
    <div className="seo-content-wrapper">
      {/* Kako deluje sekcija */}
      <section className="seo-section">
        <div className="seo-container">
          <h2 className="seo-title">Kako deluje AI telefonska tajnica?</h2>
          <div className="seo-content-grid">
            <div className="seo-text">
              <p>AI telefonska tajnica deluje na preprost način: ko vaša stranka pokliče, AI asistent dvigne klic, pozdravi v vašem imenu in začne pogovor v tekoči slovenščini. Asistent lahko:</p>
              <ul className="seo-list">
                <li><CheckCircle2 size={18} /> <strong>Odgovarja na pogosta vprašanja</strong> o delovnem času, lokaciji, storitvah in cenah</li>
                <li><CheckCircle2 size={18} /> <strong>Rezervira termine</strong> v vašem Google Calendar ali Outlook koledarju</li>
                <li><CheckCircle2 size={18} /> <strong>Beleži sporočila</strong> in vas takoj obvesti po SMS ali e-pošti</li>
                <li><CheckCircle2 size={18} /> <strong>Preusmerja klice</strong> na vašo mobilno številko, kadar je to potrebno</li>
              </ul>
              <p>Vse klice beleži in shranjuje, zato imate popoln pregled nad komunikacijo s strankami. Sistem deluje 24/7 brez počitka ali bolniške odsotnosti.</p>
            </div>
            <div className="seo-visual">
              <div className="seo-card">
                <Zap size={32} className="seo-icon" />
                <h3>Takojšen odziv</h3>
                <p>Vsak klic je sprejet v manj kot 3 sekundah, brez čakalnih vrst.</p>
              </div>
              <div className="seo-card">
                <Calendar size={32} className="seo-icon" />
                <h3>Avtomatske rezervacije</h3>
                <p>Termini se samodejno vpisujejo v vaš koledar v realnem času.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integracija sekcija */}
      <section className="seo-section seo-section-gray">
        <div className="seo-container">
          <h2 className="seo-title">Integracija z vašim CRM, Google Calendar in e-pošto</h2>
          <div className="seo-content-grid">
            <div className="seo-text">
              <p>AI tajnica se brezhibno povezuje z orodji, ki jih že uporabljate:</p>
              <h3 className="seo-subtitle">Koledarski sistemi</h3>
              <p>Integracija z <strong>Google Calendar</strong> in <strong>Microsoft Outlook</strong> omogoča, da AI tajnica v realnem času preveri vaše proste termine in rezervira nove sestanke. Vsaka rezervacija se takoj prikaže v vašem koledarju z vsemi potrebnimi podatki o stranki.</p>
              
              <h3 className="seo-subtitle">CRM sistemi</h3>
              <p>Povezava z vašim CRM sistemom (kot so Salesforce, HubSpot ali Pipedrive) omogoča samodejno beleženje klicev, ustvarjanje nalog in posodabljanje kontaktov. AI asistent samodejno doda vse pomembne informacije v ustrezno kartico stranke.</p>
              
              <h3 className="seo-subtitle">E-pošta in SMS obvestila</h3>
              <p>Po vsakem klicu prejmete e-poštno sporočilo ali SMS z zapisom pogovora, podatki o stranki in naslednjimi koraki. Nikoli več ne boste zamudili pomembnega klica.</p>
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
          <h2 className="seo-title">Pogosta vprašanja o AI tajnici</h2>
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
