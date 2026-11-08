import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { company } from '../data/site';

const SiteFooter = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-top">
        <div className="footer-section">
          <Link to="/" aria-label="Asistent RM — domov"><img src="/logo-white.png" alt="Asistent RM" className="footer-logo-image" width="96" height="72" /></Link>
          <p className="footer-tagline">AI receptorka za slovenska podjetja.</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Asistent RM</h4>
          <div className="footer-links-column">
            <Link to="/kako-deluje" className="footer-link">Kako deluje</Link>
            <Link to="/panoge" className="footer-link">Panoge</Link>
            <Link to="/cenik" className="footer-link">Cenik</Link>
            <Link to="/pogosta-vprasanja" className="footer-link">Pogosta vprašanja</Link>
            <Link to="/enterprise" className="footer-link">Enterprise</Link>
            <Link to="/o-nas" className="footer-link">O nas</Link>
            <Link to="/kontakt" className="footer-link">Kontakt</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Pravno</h4>
          <div className="footer-links-column">
            <Link to="/splosni-pogoji" className="footer-link">Splošni pogoji</Link>
            <Link to="/pogoji" className="footer-link">Pogoji uporabe</Link>
            <Link to="/zasebnost" className="footer-link">Zasebnost</Link>
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
