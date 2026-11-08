import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Legal.css';
import PageMeta from '../components/layout/PageMeta';

const Terms = () => {
  return (
    <div className="legal-container">
      <PageMeta path="/pogoji" />
      <div className="legal-content">
        
        <h1 className="legal-title">Pogoji uporabe</h1>
        <p className="legal-updated">Zadnja posodobitev: Januar 2025</p>
        
        <section className="legal-section">
          <h2>1. Sprejem pogojev</h2>
          <p>Z dostopom in uporabo spletne strani Asistent RM se strinjate s temi pogoji uporabe. Če se ne strinjate s katerim koli delom teh pogojev, ne smete uporabljati naših storitev.</p>
        </section>
        
        <section className="legal-section">
          <h2>2. Opis storitev</h2>
          <p>Asistent RM ponuja AI virtualno telefonsko tajnico, ki avtomatizira sprejem telefonskih klicev, rezervacijo terminov in komunikacijo s strankami. Storitev deluje 24/7 in se integrira z vašim poslovnim koledarjem.</p>
        </section>
        
        <section className="legal-section">
          <h2>3. Uporaba storitev</h2>
          <h3>3.1 Dovoljenja</h3>
          <p>Dovolimo vam uporabo naših storitev v skladu s temi pogoji. Uporaba mora biti v zakonite poslovne namene.</p>
          
          <h3>3.2 Omejitve</h3>
          <p>Ne smete:</p>
          <ul>
            <li>Uporabljati storitev za nezakonite dejavnosti</li>
            <li>Poskušati dostopati do sistemov brez dovoljenja</li>
            <li>Motiti delovanja storitve ali strežnikov</li>
            <li>Posredovati lažnih ali zavajajoči informacij</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>4. Zasebnost in varnost podatkov</h2>
          <p>Vaša zasebnost je nam pomembna. Podrobnosti o tem, kako zbiramo, uporabljamo in varujemo vaše osebne podatke, najdete v našem <Link to="/zasebnost" className="legal-link">Pravilniku o zasebnosti</Link>.</p>
        </section>
        
        <section className="legal-section">
          <h2>5. Omejitev odgovornosti</h2>
          <p>Asistent RM si prizadeva zagotoviti nemoteno delovanje storitev, vendar ne moremo zagotoviti popolne razpoložljivosti. Storitve se zagotavljajo "takšne kot so" brez jamstev katerekoli vrste.</p>
          <p>V največji meri, ki jo dovoljuje zakonodaja, Asistent RM ne odgovarja za:</p>
          <ul>
            <li>Posredne ali posledične škode</li>
            <li>Izgubo dobička ali podatkov</li>
            <li>Prekinitve storitev</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>6. Spremembe pogojev</h2>
          <p>Pridržujemo si pravico do spremembe teh pogojev kadarkoli. O pomembnih spremembah vas bomo obvestili po elektronski pošti ali preko naše spletne strani. Nadaljnja uporaba storitev po spremembah pomeni sprejem novih pogojev.</p>
        </section>
        
        <section className="legal-section">
          <h2>7. Prekinitev uporabe</h2>
          <p>Pridržujemo si pravico do prekinitve ali omejevanja dostopa do naših storitev v primeru kršitve teh pogojev.</p>
        </section>
        
        <section className="legal-section">
          <h2>8. Intelektualna lastnina</h2>
          <p>Vsa vsebina, logotipi, dizajn in programska oprema Asistent RM so zaščiteni z zakonodajo o intelektualni lastnini. Prepovedana je uporaba brez predhodnega pisnega dovoljenja.</p>
        </section>
        
        <section className="legal-section">
          <h2>9. Veljavno pravo</h2>
          <p>Ti pogoji se urejajo v skladu z zakonodajo Republike Slovenije. Morebitni spori se rešujejo na pristojnem sodišču v Sloveniji.</p>
        </section>
        
        <section className="legal-section">
          <h2>10. Kontakt</h2>
          <p>Za vprašanja o teh pogojih nas kontaktirajte:</p>
          <p>
            Email: <a href="mailto:info@asistentrm.com" className="legal-link">info@asistentrm.com</a><br/>
            Telefon: 068 660 690 ali 041 438 869
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
