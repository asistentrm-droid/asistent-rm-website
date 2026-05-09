import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../styles/Legal.css';

const Privacy = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Nazaj na domov</span>
        </Link>
        
        <h1 className="legal-title">Pravilnik o zasebnosti</h1>
        <p className="legal-updated">Zadnja posodobitev: Januar 2025</p>
        
        <section className="legal-section">
          <h2>1. Uvod</h2>
          <p>Asistent RM ("mi", "nas", "naš") spoštuje vašo zasebnost in se zavezuje k zaščiti vaših osebnih podatkov. Ta pravilnik opisuje, kako zbiramo, uporabljamo, razkrivamo in varujemo informacije, ki jih zberemo prek naše spletne strani in storitev.</p>
        </section>
        
        <section className="legal-section">
          <h2>2. Podatki, ki jih zbiramo</h2>
          
          <h3>2.1 Podatki, ki jih posredujete</h3>
          <ul>
            <li><strong>Kontaktni podatki:</strong> Ime, priimek, email naslov, telefonska številka</li>
            <li><strong>Poslovni podatki:</strong> Ime podjetja, davčna številka (če je potrebno)</li>
            <li><strong>Komunikacijski zapisi:</strong> Vsebina sporočil preko kontaktnega obrazca ali emaila</li>
          </ul>
          
          <h3>2.2 Samodejno zbrani podatki</h3>
          <ul>
            <li><strong>Tehnični podatki:</strong> IP naslov, tip brskalnika, operacijski sistem</li>
            <li><strong>Piškotki:</strong> Podatki o uporabi spletne strani (več o piškotkih spodaj)</li>
            <li><strong>Podatki o uporabi:</strong> Strani, ki jih obiskujete, čas dostopa, trajanje obiska</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>3. Namen zbiranja podatkov</h2>
          <p>Vaše osebne podatke uporabljamo za naslednje namene:</p>
          <ul>
            <li>Zagotavljanje in izboljšanje naših storitev AI virtualne tajnice</li>
            <li>Odgovarjanje na vaša vprašanja in prošnje</li>
            <li>Pošiljanje pomembnih obvestil o storitvah</li>
            <li>Analiza uporabe spletne strani za izboljšave uporabniške izkušnje</li>
            <li>Izpolnjevanje zakonskih obveznosti</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>4. Pravna podlaga za obdelavo</h2>
          <p>Osebne podatke obdelujemo na podlagi:</p>
          <ul>
            <li><strong>Privolitve:</strong> Ko nam posredujete podatke prostovoljno (kontaktni obrazec)</li>
            <li><strong>Pogodbe:</strong> Za zagotavljanje storitev, ki ste jih naročili</li>
            <li><strong>Zakonitih interesov:</strong> Izboljšanje storitev, varnost</li>
            <li><strong>Zakonskih obveznosti:</strong> Davčne in računovodske zahteve</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>5. Deljenje podatkov</h2>
          <p>Vaših osebnih podatkov ne prodajamo, ne izdajamo ali ne oddajamo tretjim osebam, razen v naslednjih primerih:</p>
          <ul>
            <li><strong>Ponudniki storitev:</strong> Zaupanja vredni partnerji, ki nam pomagajo pri delovanju (hosting, email)</li>
            <li><strong>Pravne zahteve:</strong> Ko to zahteva zakon ali sodni postopek</li>
            <li><strong>Vaša privolitev:</strong> Ko izrecno dovolite deljenje</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>6. Hramba podatkov</h2>
          <p>Vaše osebne podatke hranimo samo toliko časa, kot je potrebno za namene, za katere smo jih zbrali, ali dokler to zahteva zakon. Po izteku tega obdobja podatke varno izbrišemo.</p>
        </section>
        
        <section className="legal-section">
          <h2>7. Varnost podatkov</h2>
          <p>Uporabljamo sodobne tehnične in organizacijske ukrepe za zaščito vaših podatkov pred nepooblaščenim dostopom, izgubo ali zlorabo:</p>
          <ul>
            <li>SSL/TLS šifriranje za prenos podatkov</li>
            <li>Varne gostovalne storitve</li>
            <li>Redni varnostni pregledi</li>
            <li>Omejen dostop do podatkov samo pooblaščenemu osebju</li>
          </ul>
        </section>
        
        <section className="legal-section">
          <h2>8. Piškotki</h2>
          <p>Naša spletna stran uporablja piškotke za izboljšanje uporabniške izkušnje:</p>
          
          <h3>8.1 Vrste piškotkov</h3>
          <ul>
            <li><strong>Nujni piškotki:</strong> Potrebni za delovanje strani</li>
            <li><strong>Analitični piškotki:</strong> Pomagajo razumeti, kako obiskovalci uporabljajo stran</li>
            <li><strong>Funkcijski piškotki:</strong> Omogočajo dodatne funkcionalnosti</li>
          </ul>
          
          <h3>8.2 Upravljanje piškotkov</h3>
          <p>Piškotke lahko upravljate v nastavitvah svojega brskalnika. Upoštevajte, da onemogočenje nekaterih piškotkov lahko vpliva na funkcionalnost strani.</p>
        </section>
        
        <section className="legal-section">
          <h2>9. Vaše pravice</h2>
          <p>V skladu z GDPR imate naslednje pravice:</p>
          <ul>
            <li><strong>Pravica do dostopa:</strong> Zahtevajte kopijo svojih osebnih podatkov</li>
            <li><strong>Pravica do popravka:</strong> Popravite netočne podatke</li>
            <li><strong>Pravica do izbrisa:</strong> Zahtevajte izbris svojih podatkov ("pravica do pozabe")</li>
            <li><strong>Pravica do omejitve:</strong> Omejite obdelavo vaših podatkov</li>
            <li><strong>Pravica do prenosljivosti:</strong> Prejmite svoje podatke v strukturirani obliki</li>
            <li><strong>Pravica do ugovora:</strong> Ugovarjajte obdelavi podatkov</li>
            <li><strong>Pravica do umika privolitve:</strong> Kadarkoli umaknite privolitev</li>
          </ul>
          <p>Za uveljavljanje pravic nas kontaktirajte na <a href="mailto:info@asistentrm.org" className="legal-link">info@asistentrm.org</a></p>
        </section>
        
        <section className="legal-section">
          <h2>10. Otroci</h2>
          <p>Naše storitve niso namenjene otrokom, mlajšim od 16 let. Zavestno ne zbiramo osebnih podatkov otrok brez privolitve staršev.</p>
        </section>
        
        <section className="legal-section">
          <h2>11. Mednarodna prenošnja podatkov</h2>
          <p>Vaši podatki se lahko prenašajo in hranijo na strežnikih znotraj Evropskega gospodarskega prostora (EGP). Če pride do prenosa zunaj EGP, zagotavljamo ustrezne varnostne ukrepe.</p>
        </section>
        
        <section className="legal-section">
          <h2>12. Spremembe pravilnika</h2>
          <p>Ta pravilnik lahko občasno posodobimo. O pomembnih spremembah vas bomo obvestili preko emaila ali obvestila na spletni strani. Datum zadnje posodobitve je naveden na vrhu tega dokumenta.</p>
        </section>
        
        <section className="legal-section">
          <h2>13. Pritožbe</h2>
          <p>Če menite, da je prišlo do kršitve vaših pravic do zasebnosti, lahko vložite pritožbo pri Informacijskem pooblaščencu Republike Slovenije:</p>
          <p>
            Informacijski pooblaščenec<br/>
            Dunajska cesta 22, 1000 Ljubljana<br/>
            Telefon: 01 230 97 30<br/>
            Email: gp.ip@ip-rs.si<br/>
            Spletna stran: <a href="https://www.ip-rs.si" target="_blank" rel="noopener noreferrer" className="legal-link">www.ip-rs.si</a>
          </p>
        </section>
        
        <section className="legal-section">
          <h2>14. Kontakt</h2>
          <p>Za vprašanja o tem pravilniku ali svojih osebnih podatkih nas kontaktirajte:</p>
          <p>
            <strong>Asistent RM</strong><br/>
            Email: <a href="mailto:info@asistentrm.org" className="legal-link">info@asistentrm.org</a><br/>
            Telefon: 068 660 690 ali 041 438 869
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
