import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { company, plans } from '../data/site';

const DEFAULT_ENDPOINT = 'https://formspree.io/f/mkovjydg';

// Kontaktni obrazec (uporablja ga stran Kontakt in okno ContactModal).
const ContactForm = ({ defaultPlan = '', source = 'spletna-stran', endpoint = DEFAULT_ENDPOINT, industry = '', idPrefix = 'cf' }) => {
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [errorText, setErrorText] = useState('');
  const [mailto, setMailto] = useState('');
  const errorRef = useRef(null);

  // Ob napaki zapelji do sporočila, da ga obiskovalec zagotovo vidi.
  useEffect(() => {
    if (status === 'error' && errorRef.current) errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    data.append('_subject', `Povpraševanje Asistent RM (${source})`);

    // Rezervna pot: e-pošta z že izpolnjenimi podatki, če spletno pošiljanje ne uspe.
    const lines = ['name', 'email', 'phone', 'company', 'paket', 'panoga', 'message']
      .map((k) => [k, data.get(k)])
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`);
    setMailto(`mailto:${company.email}?subject=${encodeURIComponent('Povpraševanje Asistent RM')}&body=${encodeURIComponent(lines.join('\n'))}`);

    setStatus('sending');
    setErrorText('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) {
        let detail = `HTTP ${response.status}`;
        try {
          const json = await response.json();
          const msgs = (json.errors || []).map((x) => x.message).filter(Boolean);
          if (msgs.length) detail = msgs.join(' ');
          else if (json.error) detail = json.error;
        } catch { /* ni JSON */ }
        throw new Error(detail);
      }
      window.location.href = '/hvala';
    } catch (err) {
      console.error('Pošiljanje obrazca ni uspelo:', err);
      setErrorText(err && err.message ? err.message : 'neznana napaka');
      setStatus('error');
    }
  };

  const id = (n) => `${idPrefix}-${n}`;

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <input type="hidden" name="vir" value={source} />
      {/* Past za spam-robote: ljudje tega polja ne vidijo. */}
      <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="sr-only" aria-hidden="true" />
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
        <div className="modal-error" role="alert" ref={errorRef}>
          <p>Sporočila ni bilo mogoče poslati ({errorText}).</p>
          <a href={mailto || `mailto:${company.email}`} className="modal-error-btn">Pošlji po e-pošti</a>
        </div>
      )}
      <p className="modal-note">
        Brez obveznosti. Podatke uporabimo samo za odgovor na povpraševanje — <a href="/zasebnost">politika zasebnosti</a>.
      </p>
    </form>
  );
};

export default ContactForm;
