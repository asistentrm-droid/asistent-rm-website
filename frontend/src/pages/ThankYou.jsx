import React from 'react';
import { CheckCircle2, ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <div className="success-icon">
          <CheckCircle2 size={80} strokeWidth={1.5} />
        </div>
        
        <h1 className="thank-you-title">Hvala za vaše povpraševanje!</h1>
        
        <p className="thank-you-message">
          Vaše sporočilo smo prejeli. Naša ekipa vas bo kontaktirala v roku 24 ur.
        </p>

        <div className="thank-you-next">
          <h2 className="next-title">Medtem lahko:</h2>
          <div className="next-actions">
            <a href="/#demo" className="action-card">
              <Phone size={32} />
              <h3>Preizkusite Demo</h3>
              <p>Pokliči in testiraj AI tajnico v živo</p>
            </a>
            
            <a href="/#section-calculator" className="action-card">
              <h3>Poglejte Kalkulator</h3>
              <p>Izračunajte vašo mesečno izgubo</p>
            </a>
          </div>
        </div>

        <Link to="/" className="back-home">
          <ArrowLeft size={20} />
          Nazaj na domačo stran
        </Link>
      </div>

      <footer className="thank-you-footer">
        <div className="footer-logo">
          <img 
            src="https://customer-assets.emergentagent.com/job_ai-secretary-22/artifacts/taeyavvy_Rm-logo.png" 
            alt="Asistent RM Logo" 
            className="footer-logo-image"
          />
        </div>
        <p>© 2025 Asistent RM. Vse pravice pridržane.</p>
      </footer>
    </div>
  );
};

export default ThankYou;
