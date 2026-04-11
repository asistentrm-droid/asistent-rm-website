import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Kako hitro lahko začnem uporabljati Asistent RM?",
      answer: "Nastavitev traja manj kot 5 minut. Preprosto nam posredujete vaše podatke, mi nastavimo AI tajnico in že lahko začnete sprejemati klice. Brez tehnične nastavitve s vaše strani."
    },
    {
      question: "Koliko stane storitev?",
      answer: "Ponujamo fleksibilne pakete glede na število klicev. Prvi 14 dni so popolnoma brezplačni brez vezave na kreditno kartico. Nato se cena prilagodi vašim potrebam - kontaktirajte nas za ponudbo."
    },
    {
      question: "Ali AI razume slovenščino?",
      answer: "Da! Naša AI tajnica je posebej trenirana za slovenski jezik in razume različne dialekte ter načine govora. Brez težav se prilagaja različnim strankam."
    },
    {
      question: "Kaj se zgodi, če AI ne razume vprašanja?",
      answer: "AI je trenirana za večino situacij, ampak če pride do nejasnosti, lahko klic preusmeri na vas ali pa zapiše sporočilo za kasnejši odziv. Vedno imate nadzor."
    },
    {
      question: "Ali lahko prilagodim odgovore AI tajnice?",
      answer: "Seveda! AI se prilagodi vašemu podjetju - definiramo delovni čas, storitve, cene, in specifične odgovore. Vsaka implementacija je personalizirana."
    },
    {
      question: "Kako vem, kdo je klical?",
      answer: "Po vsakem klicu prejmete SMS ali email z vsemi podatki - ime stranke, razlog klica, rezerviran termin. Vse informacije so shranjene v vašem računu."
    },
    {
      question: "Potrebujem novo telefonsko številko?",
      answer: "Ne! AI tajnica deluje z vašo obstoječo številko. Enostavno preusmerjate klice na našo AI ko ste nedosegljivi ali zasedeni."
    },
    {
      question: "Je storitev varna? Kaj z GDPR?",
      answer: "Absolutno. Vsi podatki so shranjeni v Sloveniji, v skladu z GDPR in slovensko zakonodajo. Vaši podatki so šifrirani in varni."
    }
  ];

  return (
    <section className="faq-section" id="section-faq">
      <div className="faq-container">
        <h2 className="faq-title">Pogosta vprašanja</h2>
        <p className="faq-subtitle">Vse kar morate vedeti o Asistent RM</p>
        
        <Accordion type="single" collapsible className="faq-accordion">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="faq-question">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="faq-answer">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
