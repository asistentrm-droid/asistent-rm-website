import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from '../SiteFooter';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const Layout = () => (
  <div className="site">
    <a href="#vsebina" className="skip-link">Preskoči na vsebino</a>
    <ScrollToTop />
    <SiteHeader />
    <main id="vsebina">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);

export default Layout;
