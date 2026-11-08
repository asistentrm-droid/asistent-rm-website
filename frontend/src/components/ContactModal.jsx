import React, { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { company, plans } from '../data/site';

const DEFAULT_ENDPOINT = 'https://formspree.io/f/mkovjydg';

const ContactModal = ({ open, onClose, defaultPlan = '', source = 'glavna-stran', endpoint = DEFAULT_ENDPOINT, industry = '' }) => {
  const [status, setStatus] = useState('idle'); // idle | sending | error

  useEffect(() => {
    if (!open) return undefined;
    setStatus('idle');
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Zapri">
          <X size={24} />
        </button>
        <div className="modal-header">
          <h2 className="modal-title" id="contact-modal-title">Pogovorimo se</h2>
          <p className="modal-subtitle">
            Pustite podatke in poklicali vas bomo za kratek uvodni pogovor. Skupaj preverimo, ali je Asistent RM primeren za vaše podjetje.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="hidden" name="vir" value={source} />
          {industry && <input type="hidden" name="panoga" value={industry} />}
          <label className="sr-only" htmlFor="cm-name">Ime in priimek</label>
          <input id="cm-name" type="text" name="name" placeholder="Ime in priimek" className="modal-input" autoComplete="name" required />
          <label className="sr-only" htmlFor="cm-email">E-mail</label>
          <input id="cm-email" type="email" name="email" placeholder="E-mail" className="modal-input" autoComplete="email" required />
          <label className="sr-only" htmlFor="cm-phone">Telefonska številka</label>
          <input id="cm-phone" type="tel" name="phone" placeholder="Telefonska številka" className="modal-input" autoComplete="tel" required />
          <label className="sr-only" htmlFor="cm-company">Podjetje</label>
          <input id="cm-company" type="text" name="company" placeholder="Podjetje (neobvezno)" className="modal-input" autoComplete="organization" />
          <label className="sr-only" htmlFor="cm-plan">Paket</label>
          <select id="cm-plan" name="paket" className="modal-input" defaultValue={defaultPlan}>
            <option value="">Paket — še ne vem</option>
            {plans.map((p) => (
              <option key={p.id} value={p.name}>{p.name} — {p.price} €/mesec</option>
            ))}
            <option value="ENTERPRISE">Enterprise — po dogovoru</option>
          </select>
          <button type="submit" className="btn-modal-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Pošiljam …' : 'Pošlji'}
            {status !== 'sending' && <ArrowRight size={20} />}
          </button>
          {status === 'error' && (
            <p className="modal-error" role="alert">
              Sporočila ni bilo mogoče poslati. Pišite nam na <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>
          )}
          <p className="modal-note">
            Brez obveznosti. Vaše podatke uporabimo samo za odgovor na povpraševanje —{' '}
            <a href="/zasebnost">politika zasebnosti</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
