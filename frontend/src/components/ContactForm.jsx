import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { company, plans } from '../data/site';

const DEFAULT_ENDPOINT = 'https://formspree.io/f/mkovjydg';

// Kontaktni obrazec (uporablja ga stran Kontakt in okno ContactModal).
const ContactForm = ({ defaultPlan = '', source = 'spletna-stran', endpoint = DEFAULT_ENDPOINT, industry = '', idPrefix = 'cf' }) => {
  const [status, setStatus] = useState('idle'); // idle | sending | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      window.location.href = '/hvala';
    } catch (err) {
      setStatus('error');
    }
  };

  const id = (n) => `${idPrefix}-${n}`;

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <input type="hidden" name="vir" value={source} />
      {industry && <input type="hidden" name="panoga" value={industry} />}
      <label className="sr-only" htmlFor={id('name')}>Ime in priimek</label>
      <input id={id('name')} type="text" name="name" placeholder="Ime in priimek" className="modal-input" autoComplete="name" required />
      <label className="sr-only" htmlFor={id('email')}>E-mail</label>
      <input id={id('email')} type="email" name="email" placeholder="E-mail" className="modal-input" autoComplete="email" required />
      <label className="sr-only" htmlFor={id('phone')}>Telefonska številka</label>
      <input id={id('phone')} type="tel" name="phone" placeholder="Telefonska številka" className="modal-input" autoComplete="tel" required />
      <label className="sr-only" htmlFor={id('company')}>Podjetje</label>
      <input id={id('company')} type="text" name="company" placeholder="Podjetje (neobvezno)" className="modal-input" autoComplete="organization" />
      <label className="sr-only" htmlFor={id('plan')}>Paket</label>
      <select id={id('plan')} name="paket" className="modal-input" defaultValue={defaultPlan}>
        <option value="">Paket — še ne vem</option>
        {plans.map((p) => (
          <option key={p.id} value={p.name}>{p.name} — {p.price} €/mesec</option>
        ))}
        <option value="ENTERPRISE">Enterprise — po dogovoru</option>
      </select>
      <label className="sr-only" htmlFor={id('msg')}>Sporočilo</label>
      <textarea id={id('msg')} name="message" rows="3" placeholder="Sporočilo (neobvezno)" className="modal-input modal-textarea" />
      <button type="submit" className="btn-modal-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Pošiljam …' : 'Pošlji povpraševanje'}
        {status !== 'sending' && <ArrowRight size={20} />}
      </button>
      {status === 'error' && (
        <p className="modal-error" role="alert">
          Sporočila ni bilo mogoče poslati. Pišite nam na <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      )}
      <p className="modal-note">
        Brez obveznosti. Podatke uporabimo samo za odgovor na povpraševanje — <a href="/zasebnost">politika zasebnosti</a>.
      </p>
    </form>
  );
};

export default ContactForm;
