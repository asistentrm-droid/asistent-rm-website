import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Play, FileText, Phone } from 'lucide-react';
import { getIndustryById } from '../data/industries';
import { company, plans, SITE_URL } from '../data/site';
import ContactModal from '../components/ContactModal';
import SiteFooter from '../components/SiteFooter';
import '../styles/Landing.css';
import '../styles/Trust.css';
import '../styles/IndustryPage.css';

const IndustryPage = () => {
  const { industryId } = useParams();
  const industry = getIndustryById(industryId);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);
  const closeContact = useCallback(() => setContactModalOpen(false), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [industryId]);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    // Wait for audio element to render, then play
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);
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
        <link rel="canonical" href={`${SITE_URL}/panoge/${industry.id}`} />
      </Helmet>

      <div className="industry-page">
        {/* Navigation */}
        <nav className="industry-nav">
          <Link to="/" className="industry-logo">
            <img 
              src="/logo.png"
              width="64"
              height="48"
              alt="Asistent RM"
              className="nav-logo-img"
            />
          </Link>
          <div className="industry-nav-links">
            <a href="/#cenik" className="industry-nav-link">Cenik</a>
            <a href={company.demoPhoneHref} className="industry-nav-link">Demo: {company.demoPhone}</a>
            <button className="btn-primary" onClick={() => setContactModalOpen(true)}>
              Kontakt
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="industry-hero">
          <div className="industry-hero-content">
            <div className="industry-breadcrumb">
              <Link to="/">Domov</Link> / <a href="/#section-use-cases">Panoge</a> / <span>{industry.name}</span>
            </div>
            <h1 className="industry-h1">{industry.h1}</h1>
            <p className="industry-subtitle">{industry.subtitle_hero}</p>
            <button className="btn-hero-cta" onClick={() => setContactModalOpen(true)}>
              <span className="btn-hero-cta-text">Pogovorimo se</span>
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

            {/* Prepis pogovora — vedno viden (za obiskovalce, iskalnike in AI orodja) */}
            <div className="audio-transcript">
                <div className="transcript-header">
                  <FileText size={24} aria-hidden="true" />
                  <span>Prepis pogovora</span>
                </div>
                <div className="transcript-content">
                  {industry.transcript.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="transcript-paragraph">{paragraph}</p>
                  ))}
                </div>
            </div>
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
                <h3>Povzetek vsakega klica</h3>
                <p>Obvestilo po e-mailu ali SMS; v paketu BUSINESS tudi prepis pogovora</p>
              </div>
              <div className="benefit-card">
                <ArrowRight size={32} />
                <h3>Integracija</h3>
                <p>Povezava z vašim koledarjem in telefonsko številko je del vzpostavitve</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="industry-final-cta">
          <div className="industry-container">
            <h2 className="industry-cta-title">
              Najprej pokličite demo. Potem se pogovorimo.
            </h2>
            <p className="industry-cta-subtitle">
              Demo linija: <a href={company.demoPhoneHref}>{company.demoPhone}</a> · Paketi od {plans[0].price} €/mesec + DDV · <a href="/#cenik">Celoten cenik</a>
            </p>
            <button className="btn-primary-large" onClick={() => setContactModalOpen(true)}>
              Dogovorimo se za uvodni pogovor
              <ArrowRight size={20} />
            </button>
          </div>
        </section>

        <ContactModal
          open={contactModalOpen}
          onClose={closeContact}
          endpoint="https://formspree.io/f/mjkvogok"
          source={`panoga/${industry.id}`}
          industry={industry.name}
        />
      </div>
      <SiteFooter />
    </>
  );
};

export default IndustryPage;
