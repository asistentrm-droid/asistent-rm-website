import React from 'react';
import { Check } from 'lucide-react';
import { plans, pricingTerms, company } from '../data/site';

const Pricing = ({ onChoose }) => (
  <section className="pricing-section" id="cenik" aria-labelledby="cenik-naslov">
    <div className="section-inner">
      <p className="section-eyebrow">Cenik 2026</p>
      <h2 className="section-title" id="cenik-naslov">Pregledne cene. Brez presenečenj.</h2>
      <p className="section-lead">
        Izberite paket glede na število minut pogovorov. Paket lahko kadar koli zamenjate.
      </p>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article key={plan.id} className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}>
            {plan.popular && <span className="pricing-badge">Najbolj priljubljen</span>}
            <h3 className="pricing-name">{plan.name}</h3>
            <p className="pricing-price">
              <span className="pricing-amount">{plan.price} €</span>
              <span className="pricing-period">/ mesec + DDV</span>
            </p>
            <p className="pricing-minutes">
              {plan.minutes} min / mesec <span>≈ {plan.perMinute} €/min</span>
            </p>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}><Check size={18} aria-hidden="true" /> <span>{f}</span></li>
              ))}
            </ul>
            <button
              type="button"
              className={plan.popular ? 'pricing-cta pricing-cta-primary' : 'pricing-cta'}
              onClick={() => onChoose(plan.name)}
            >
              Izberi {plan.name}
            </button>
          </article>
        ))}
      </div>

      <div className="pricing-extras">
        <div className="pricing-extra">
          <h3>Vzpostavitev — enkratno {pricingTerms.setupFee} € + DDV</h3>
          <p>Vključuje {pricingTerms.setupIncludes}.</p>
        </div>
        <div className="pricing-extra">
          <h3>Dodatne minute — {pricingTerms.extraMinute} €/min + DDV</h3>
          <p>{pricingTerms.billing} {pricingTerms.planChange}</p>
        </div>
      </div>

      <p className="pricing-footnote">
        {pricingTerms.enterprise}{' '}
        <a href={`mailto:${company.email}?subject=Enterprise%20paket`}>{company.email}</a>
        <br />
        {pricingTerms.vat} Za storitev veljajo <a href="/splosni-pogoji">Splošni pogoji uporabe</a>.
      </p>
    </div>
  </section>
);

export default Pricing;
