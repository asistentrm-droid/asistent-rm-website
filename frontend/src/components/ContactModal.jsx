import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactModal = ({ open, onClose, ...formProps }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Zapri">
          <X size={24} />
        </button>
        <div className="modal-header">
          <h2 className="modal-title" id="contact-modal-title">Pogovorimo se</h2>
          <p className="modal-subtitle">Pustite podatke in poklicali vas bomo za kratek uvodni pogovor.</p>
        </div>
        <ContactForm idPrefix="cm" {...formProps} />
      </div>
    </div>
  );
};

export default ContactModal;
