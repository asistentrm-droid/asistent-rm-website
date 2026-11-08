import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { company } from '../../data/site';
import { pages, mainNav } from '../../data/pages';

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sh">
      <div className="sh-top">
        <div className="sh-inner sh-top-inner">
          <span className="sh-top-text">AI receptorka za slovenska podjetja</span>
          <div className="sh-top-links">
            <a href={company.demoPhoneHref}><Phone size={14} aria-hidden="true" /> Demo linija {company.demoPhone}</a>
            <a href={`mailto:${company.email}`}><Mail size={14} aria-hidden="true" /> {company.email}</a>
          </div>
        </div>
      </div>

      <div className="sh-main">
        <div className="sh-inner sh-main-inner">
          <Link to="/" className="sh-logo" aria-label="Asistent RM — domov">
            <img src="/logo.png" alt="" width="52" height="39" />
            <span>Asistent RM</span>
          </Link>

          <nav className="sh-nav" aria-label="Glavni meni">
            {mainNav.map((p) => (
              <NavLink key={p} to={p} className={({ isActive }) => `sh-link${isActive ? ' is-active' : ''}`}>
                {pages[p].nav}
              </NavLink>
            ))}
          </nav>

          <a href={company.demoPhoneHref} className="sh-cta">
            <Phone size={16} aria-hidden="true" /> Pokliči demo
          </a>

          <button
            type="button"
            className="sh-burger hamburger-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Zapri meni' : 'Odpri meni'}
            aria-expanded={open}
            aria-controls="sh-mobile"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <nav className="sh-mobile" id="sh-mobile" aria-label="Mobilni meni">
            {['/', ...mainNav, '/pogosta-vprasanja'].map((p) => (
              <NavLink key={p} to={p} end className={({ isActive }) => `sh-mobile-link${isActive ? ' is-active' : ''}`}>
                {pages[p].nav}
              </NavLink>
            ))}
            <a href={company.demoPhoneHref} className="sh-mobile-cta">
              <Phone size={18} aria-hidden="true" /> Pokliči demo: {company.demoPhone}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
