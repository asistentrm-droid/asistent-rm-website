import React from 'react';
import { Phone } from 'lucide-react';
import { company } from '../data/site';

// Temen blok z demo številko (osebnost prvotne strani).
const DemoBlock = () => (
  <section className="demo-section" id="demo">
    <div className="demo-content visible">
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
          <p className="demo-label">Brezplačen demo klic</p>
          <a href={company.demoPhoneHref} className="demo-phone-v2">{company.demoPhone}</a>
        </div>
      </div>

      <p className="demo-honest-note">
        Demo je splošna različica. Vaš asistent bo prilagojen vašemu podjetju: storitve, cene, delovni čas, ton, glas in koledar.
      </p>
    </div>
  </section>
);

export default DemoBlock;
