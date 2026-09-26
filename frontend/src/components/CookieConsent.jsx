import React, { useState, useEffect } from 'react';
import '../styles/CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after 1 second delay
      setTimeout(() => setShowBanner(true), 1000);
    } else if (consent === 'accepted') {
      // Load analytics if previously accepted
      loadGoogleAnalytics();
    }
  }, []);

  const loadGoogleAnalytics = () => {
    // Google Analytics 4 tracking code
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your actual GA4 ID
    
    // Load gtag.js
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize GA4
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure'
    });

    console.log('✅ Google Analytics loaded');
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    loadGoogleAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-content">
        <div className="cookie-icon">🍪</div>
        <div className="cookie-text">
          <p className="cookie-title">Piškotki</p>
          <p className="cookie-description">
            Uporabljamo piškotke za analitiko obiska in izboljšanje uporabniške izkušnje. 
            <a href="/privacy" className="cookie-link">Politika zasebnosti</a>
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
