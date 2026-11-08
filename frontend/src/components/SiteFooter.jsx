import React from 'react';
import { Youtube, Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { company } from '../data/site';

const SiteFooter = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-top">
        <div className="footer-section">
          <img src="/logo-white.png" alt="Asistent RM" className="footer-logo-image" width="96" height="72" loading="lazy" />
          <p className="footer-tagline">AI receptorka za slovenska podjetja.</p>
          <address className="footer-company">
            {company.legalName}<br />
            {company.street}, {company.postalCode} {company.city}<br />
            ID za DDV: {company.vatId} · MŠ: {company.registrationNumber}
          </address>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Stran</h4>
          <div className="footer-links-column">
            <a href="/#kako-deluje" className="footer-link">Kako deluje</a>
            <a href="/#cenik" className="footer-link">Cenik</a>
            <a href="/#section-calculator" className="footer-link">Kalkulator</a>
            <a href="/#vprasanja" className="footer-link">Pogosta vprašanja</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Pravno</h4>
          <div className="footer-links-column">
            <a href="/splosni-pogoji" className="footer-link">Splošni pogoji</a>
            <a href="/pogoji" className="footer-link">Pogoji uporabe</a>
            <a href="/zasebnost" className="footer-link">Zasebnost</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Kontakt</h4>
          <div className="footer-contact">
            <a href={`mailto:${company.email}`} className="footer-contact-item">
              <Mail size={16} />
              <span>{company.email}</span>
            </a>
            <a href={company.demoPhoneHref} className="footer-contact-item">
              <Phone size={16} />
              <span>{company.demoPhone} (demo)</span>
            </a>
          </div>
          <div className="footer-social">
            <a href={company.social.youtube} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
              <Youtube size={20} />
            </a>
            <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© {new Date().getFullYear()} {company.brand} · {company.legalName}</div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
