import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Phone } from 'lucide-react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section } from '../components/layout/Blocks';
import { company } from '../data/site';

const ThankYou = () => (
  <>
    <PageMeta path="/hvala" />
    <PageHero title="Hvala za povpraševanje!" lead="Sporočilo smo prejeli in se vam kmalu oglasimo.">
      <div className="ph-icon"><CheckCircle2 size={56} strokeWidth={1.5} aria-hidden="true" /></div>
    </PageHero>
    <Section title="Medtem lahko" narrow>
      <div className="card-grid card-grid-2">
        <a href={company.demoPhoneHref} className="card card-link">
          <span className="card-icon"><Phone size={22} aria-hidden="true" /></span>
          <h3>Pokličete demo</h3>
          <p>{company.demoPhone} — pogovorite se z AI receptorko.</p>
        </a>
        <Link to="/cenik#kalkulator" className="card card-link">
          <span className="card-icon">€</span>
          <h3>Izračunate prihranek</h3>
          <p>Kalkulator pokaže, koliko vas stanejo zamujeni klici.</p>
        </Link>
      </div>
    </Section>
  </>
);

export default ThankYou;
