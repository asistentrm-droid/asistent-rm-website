import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { company } from '../../data/site';
import { navGroups } from '../../data/pages';

// Spustni meni (npr. "Mala podjetja"): odpre se ob kliku ali lebdenju, zapre ob kliku drugam ali Esc.
const Dropdown = ({ group, pathname }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const closeTimer = useRef(null);
  const active = group.items.some((i) => pathname.startsWith(i.to));

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const enter = () => { clearTimeout(closeTimer.current); setOpen(true); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div className={`sh-dd ${open ? 'is-open' : ''}`} ref={ref} onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className={`sh-link sh-dd-btn hamburger-btn${active ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {group.label} <ChevronDown size={16} aria-hidden="true" className="sh-dd-chev" />
      </button>
      <div className="sh-dd-panel" role="menu">
        {group.items.map((item) => (
          <Link key={item.to} to={item.to} className="sh-dd-item" role="menuitem">
            <strong>{item.text}</strong>
            <span>{item.hint}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="sh">
      <div className="sh-main">
        <div className="sh-inner sh-main-inner">
          <Link to="/" className="sh-logo" aria-label="Asistent RM — domov">
            <img src="/logo.png" alt="" width="52" height="39" />
            <span>Asistent RM</span>
          </Link>

          <nav className="sh-nav" aria-label="Glavni meni">
            {navGroups.map((g) => (g.items
              ? <Dropdown key={g.label} group={g} pathname={pathname} />
              : (
                <NavLink key={g.to} to={g.to} className={({ isActive }) => `sh-link${isActive ? ' is-active' : ''}`}>
                  {g.text}
                </NavLink>
              )))}
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
            {navGroups.map((g) => (g.items ? (
              <div className="sh-mobile-group" key={g.label}>
                <p className="sh-mobile-label">{g.label}</p>
                {g.items.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `sh-mobile-link sh-mobile-sub${isActive ? ' is-active' : ''}`}>
                    {item.text}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink key={g.to} to={g.to} className={({ isActive }) => `sh-mobile-link${isActive ? ' is-active' : ''}`}>
                {g.text}
              </NavLink>
            )))}
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
