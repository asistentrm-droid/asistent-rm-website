import React from 'react';
import { Mail, Phone, Youtube, Facebook, Instagram } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section } from '../components/layout/Blocks';
import ContactForm from '../components/ContactForm';
import { company } from '../data/site';

const Contact = () => (
  <>
    <PageMeta path="/kontakt" />
    <PageHero
      crumbs={[{ label: 'Kontakt' }]}
      eyebrow="Kontakt"
      title="Pogovorimo se."
      lead="Pustite podatke in poklicali vas bomo za kratek uvodni pogovor. Brez obveznosti."
    />

    <Section>
      <div className="contact-layout">
        <div className="contact-form-card">
          <h2>Pošljite povpraševanje</h2>
          <ContactForm source="kontakt" idPrefix="kontakt" />
        </div>

        <aside className="contact-info">
          <div className="contact-info-item">
            <span className="card-icon"><Phone size={22} aria-hidden="true" /></span>
            <div>
              <h3>Brezplačna demo linija</h3>
              <a href={company.demoPhoneHref}>{company.demoPhone}</a>
              <p>Pogovorite se z AI receptorko — kadar koli.</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="card-icon"><Mail size={22} aria-hidden="true" /></span>
            <div>
              <h3>E-mail</h3>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <p>Za ponudbe, Enterprise pakete in vprašanja.</p>
            </div>
          </div>
          <div className="contact-social">
            <a href={company.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={20} /></a>
            <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
            <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </aside>
      </div>
    </Section>
  </>
);

export default Contact;
