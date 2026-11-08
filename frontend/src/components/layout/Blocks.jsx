import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { company } from '../../data/site';

// Uvodni del podstrani.
export const PageHero = ({ eyebrow, title, lead, crumbs, children, dark = false }) => (
  <section className={`ph${dark ? ' ph-dark' : ''}`}>
    <div className="sh-inner ph-inner">
      {crumbs && (
        <nav className="ph-crumbs" aria-label="Drobtine">
          <Link to="/">Domov</Link>
          {crumbs.map((c) => (
            <React.Fragment key={c.label}>
              <span aria-hidden="true">/</span>
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </React.Fragment>
          ))}
        </nav>
      )}
      {eyebrow && <p className="ph-eyebrow">{eyebrow}</p>}
      <h1 className="ph-title">{title}</h1>
      {lead && <p className="ph-lead">{lead}</p>}
      {children}
    </div>
  </section>
);

// Razdelek s (neobveznim) naslovom.
export const Section = ({ id, eyebrow, title, lead, children, tone = 'white', narrow = false, center = true }) => (
  <section id={id} className={`sec sec-${tone}`}>
    <div className={`sh-inner${narrow ? ' sec-narrow' : ''}`}>
      {(eyebrow || title || lead) && (
        <div className={`sec-head${center ? '' : ' sec-head-left'}`}>
          {eyebrow && <p className="sec-eyebrow">{eyebrow}</p>}
          {title && <h2 className="sec-title">{title}</h2>}
          {lead && <p className="sec-lead">{lead}</p>}
        </div>
      )}
      {children}
    </div>
  </section>
);

export const MoreLink = ({ to, children }) => (
  <Link to={to} className="more-link">
    {children} <ArrowRight size={18} aria-hidden="true" />
  </Link>
);

// Zaključni poziv na dnu strani.
export const CtaBand = ({ title = 'Nikoli več ne zamudite klica.', text = 'Pokličite demo in se v dveh minutah prepričajte sami.' }) => (
  <section className="cta-band">
    <div className="sh-inner cta-band-inner">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-band-actions">
        <a href={company.demoPhoneHref} className="btn-light">
          <Phone size={18} aria-hidden="true" /> {company.demoPhone}
        </a>
        <Link to="/kontakt" className="btn-outline-light">Pogovorimo se</Link>
      </div>
    </div>
  </section>
);
