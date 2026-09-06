import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Play, FileText, Phone } from 'lucide-react';
import { getIndustryById } from '../data/industries';
import '../styles/IndustryPage.css';

const IndustryPage = () => {
  const { industryId } = useParams();
  const [industry, setIndustry] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const industryData = getIndustryById(industryId);
    setIndustry(industryData);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [industryId]);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    setShowTranscript(true);
    // Wait for audio element to render, then play
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await fetch('https://formspree.io/f/mjkvogok', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      window.location.href = '/zahvala';
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (!industry) {
    return (
      <div className="industry-not-found">
        <h1>Panoga ne obstaja</h1>
        <Link to="/" className="btn-primary">Nazaj na domačo stran</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{industry.metaTitle}</title>
        <meta name="description" content={industry.metaDescription} />
        <meta property="og:title" content={industry.metaTitle} />
        <meta property="og:description" content={industry.metaDescription} />
      </Helmet>

      <div className="industry-page">
        {/* Navigation */}
        <nav className="industry-nav">
          <Link to="/" className="industry-logo">
            <img 
              src="https://customer-assets-7cd3h4nn.emergentagent.net/job_ai-secretary-22/artifacts/odsnkb1u_Rm-logo-removebg-preview.png"
              alt="Asistent RM"
              className="nav-logo-img"
            />
          </Link>
          <div className="industry-nav-links">
            <Link to="/#section-calculator" className="industry-nav-link">Kalkulator</Link>
            <button className="btn-primary" onClick={() => setContactModalOpen(true)}>
              Kontakt
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="industry-hero">
          <div className="industry-hero-content">
            <div className="industry-breadcrumb">
              <Link to="/">Domov</Link> / <Link to="/#section-use-cases">Panoge</Link> / <span>{industry.name}</span>
            </div>
            <h1 className="industry-h1">{industry.h1}</h1>
            <p className="industry-subtitle">{industry.subtitle_hero}</p>
            <button className="btn-hero-cta" onClick={() => setContactModalOpen(true)}>
              <span className="btn-hero-cta-text">Preizkusi brezplačno</span>
              <ArrowRight size={20} className="btn-hero-cta-arrow" />
            </button>
          </div>
        </section>

        {/* Audio Demo Section - NAJPOMEMBNEJŠA */}
        <section className="industry-audio-demo">
          <div className="industry-container">
            <h2 className="industry-section-title">Poslušaj, kako AI obravnava tvoje stranke</h2>
            
            {/* Audio Player - Apple Style */}
            <div className="audio-player-container-new">
              {!isPlaying ? (
                <div className="audio-big-play-wrapper" onClick={handlePlayAudio}>
                  <div className="audio-big-play-button">
                    <Play size={64} className="audio-big-play-icon" />
                  </div>
                  <p className="audio-play-hint">Klikni za predvajanje demo scenarija</p>
                </div>
              ) : (
                <div className="audio-player-active">
                  <audio 
                    ref={audioRef}
                    controls 
                    className="audio-element-new"
                    preload="metadata"
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={industry.audioDemo} type="audio/mpeg" />
                    Vaš brskalnik ne podpira audio predvajanja.
                  </audio>
                </div>
              )}
            </div>

            {/* Transcript - KRITIČNO ZA SEO */}
            {showTranscript && (
              <div className="audio-transcript audio-transcript-animated">
                <div className="transcript-header">
                  <FileText size={24} />
                </div>
                <div className="transcript-content">
                  {industry.transcript.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="transcript-paragraph">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="industry-problem-solution">
          <div className="industry-container">
            <h2 className="industry-section-title">{industry.problemTitle}</h2>
            <p className="industry-problem-desc">{industry.problemDesc}</p>
            
            <div className="industry-benefits">
              <div className="benefit-card">
                <Phone size={32} />
                <h3>24/7 Dostopnost</h3>
                <p>Vsak klic sprejet, ne glede na uro ali dan</p>
              </div>
              <div className="benefit-card">
                <FileText size={32} />
                <h3>Beleženje klicev</h3>
                <p>Transkripti vseh pogovorov v realnem času</p>
              </div>
              <div className="benefit-card">
                <ArrowRight size={32} />
                <h3>Integracija</h3>
                <p>Povezava z Google Calendar in CRM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="industry-final-cta">
          <div className="industry-container">
            <h2 className="industry-cta-title">
              Začni 7-dnevni brezplačni preizkus
            </h2>
            <p className="industry-cta-subtitle">
              Brez obveznosti. Brez kreditne kartice. Nastavitev v enem dnevu.
            </p>
            <button className="btn-primary-large" onClick={() => setContactModalOpen(true)}>
              Preizkusi zdaj
              <ArrowRight size={20} />
            </button>
          </div>
        </section>

        {/* Contact Modal */}
        {contactModalOpen && (
          <div className="modal-overlay" onClick={() => setContactModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setContactModalOpen(false)}>
                ×
              </button>
              <div className="modal-header">
                <h2 className="modal-title">Začnite brezplačno</h2>
                <p className="modal-subtitle">Izpolnite obrazec in začnite 7-dnevni brezplačni preizkus</p>
              </div>
              <form onSubmit={handleFormSubmit} className="modal-form">
                <input 
                  type="hidden" 
                  name="panoga" 
                  value={industry.name}
                />
                <input 
                  type="text" 
                  name="name"
                  placeholder="Ime in priimek" 
                  className="modal-input"
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  className="modal-input"
                  required
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Telefonska številka" 
                  className="modal-input"
                  required
                />
                <input 
                  type="text" 
                  name="company"
                  placeholder="Podjetje" 
                  className="modal-input"
                />
                <button type="submit" className="btn-modal-submit">
                  Začni brezplačni preizkus
                  <ArrowRight size={20} />
                </button>
                <p className="modal-note">✓ Brezplačen preizkus 7 dni • ✓ Brez obveznosti • ✓ Nastavitev v enem dnevu</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IndustryPage;
