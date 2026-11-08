import React, { useState, useEffect } from 'react';
import '../styles/CookieConsent.css';

const GA_MEASUREMENT_ID = 'G-3546687QWX';
const CONSENT_KEY = 'cookieConsent';

const readConsent = () => {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
};
const saveConsent = (value) => {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* ignore */ }
};

// Google Analytics se naloži šele, ko obiskovalec piškotke sprejme.
const loadGoogleAnalytics = () => {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
};

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === 'accepted') {
      loadGoogleAnalytics();
      return undefined;
    }
    if (consent === 'declined') return undefined;
    const t = setTimeout(() => setShowBanner(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleAccept = () => {
    saveConsent('accepted');
    loadGoogleAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    saveConsent('declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner" role="region" aria-label="Soglasje za piškotke">
      <div className="cookie-content">
        <div className="cookie-icon" aria-hidden="true">🍪</div>
        <div className="cookie-text">
          <p className="cookie-title">Piškotki</p>
          <p className="cookie-description">
            Z vašim soglasjem uporabljamo analitične piškotke (Google Analytics), da vidimo, kako se stran uporablja.
            Brez soglasja jih ne naložimo.{' '}
            <a href="/zasebnost" className="cookie-link">Politika zasebnosti</a>
          </p>
        </div>
        <div className="cookie-actions">
          <button onClick={handleDecline} className="cookie-btn cookie-btn-decline">
            Zavrni
          </button>
          <button onClick={handleAccept} className="cookie-btn cookie-btn-accept">
            Sprejmi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
