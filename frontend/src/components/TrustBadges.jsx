import React from 'react';
import { Shield, Clock, CheckCircle2, Zap } from 'lucide-react';

const TrustBadges = () => {
  return (
    <section className="trust-badges-section">
      <div className="trust-badges-container">
        <div className="trust-badge">
          <Shield className="trust-icon" />
          <div className="trust-text">
            <div className="trust-title">GDPR skladno</div>
            <div className="trust-desc">Varnost podatkov</div>
          </div>
        </div>

        <div className="trust-badge">
          <Clock className="trust-icon" />
          <div className="trust-text">
            <div className="trust-title">7 dni brezplačno</div>
            <div className="trust-desc">Preizkusite brez obveznosti</div>
          </div>
        </div>

        <div className="trust-badge">
          <Zap className="trust-icon" />
          <div className="trust-text">
            <div className="trust-title">Nastavitev v 5 min</div>
            <div className="trust-desc">Brez tehnične nastavitve</div>
          </div>
        </div>

        <div className="trust-badge">
          <CheckCircle2 className="trust-icon" />
          <div className="trust-text">
            <div className="trust-title">24/7 Dosegljivost</div>
            <div className="trust-desc">AI nikoli ne spi</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
