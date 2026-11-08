import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from '../SiteFooter';

// Ob menjavi strani skoči takoj na vrh (ali na #sidro), brez animiranega "odvijanja".
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'instant', block: 'start' }); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
};

// Klik na povezavo do strani, na kateri že ste (npr. logotip na domači strani), nežno zapelje na vrh.
const SamePageScroll = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank') return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;
      if (url.pathname.replace(/\/$/, '') === pathname.replace(/\/$/, '')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    // Faza zajema: steče pred Reactovim <Link>, ki bi sicer znova naložil isto stran.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);
  return null;
};

const Layout = () => (
  <div className="site">
    <a href="#vsebina" className="skip-link">Preskoči na vsebino</a>
    <ScrollToTop />
    <SamePageScroll />
    <SiteHeader />
    <main id="vsebina">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);

export default Layout;
