import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Seznam vprašanj; odgovori so vedno v HTML (berljivi za iskalnike), prikažejo se ob kliku.
const FaqList = ({ items, idPrefix = 'faq' }) => {
  const [active, setActive] = useState(null);
  return (
    <div className="faq-list">
      {items.map((faq, index) => {
        const open = active === index;
        return (
          <div key={faq.question} className={`faq-item ${open ? 'faq-active' : ''}`}>
            <h3 className="faq-question-heading">
              <button
                type="button"
                className="faq-question"
                aria-expanded={open}
                aria-controls={`${idPrefix}-${index}`}
                onClick={() => setActive(open ? null : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`faq-icon ${open ? 'faq-icon-rotated' : ''}`} aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-answer" id={`${idPrefix}-${index}`} hidden={!open}>
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqList;
