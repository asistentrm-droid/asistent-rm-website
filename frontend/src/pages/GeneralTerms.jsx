import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../styles/Legal.css';

const GeneralTerms = () => {
  return (
    <div className="legal-container">
      <div className="legal-content">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Nazaj na domov</span>
        </Link>
        
        <h1 className="legal-title">Splošni pogoji uporabe storitve Asistent RM</h1>
        <p className="legal-updated">Veljajo od: 1. 7. 2026</p>
        
        <section className="legal-section">
          <p>Ti splošni pogoji so objavljeni na asistentrm.org in so sestavni del vsake ponudbe, predračuna in naročniškega razmerja za storitev Asistent RM.</p>
        </section>
        
        <section className="legal-section">
          <h2>1. Uvodne določbe</h2>
          <p><strong>1.1</strong> Ponudnik storitve je <strong>Plan Plus, medijske rešitve, d.o.o.</strong>, Kopališko nabrežje 4, 6000 Koper, ID za DDV: SI15855520, matična številka: 3648265000 (v nadaljevanju: ponudnik).</p>
          <p><strong>1.2</strong> Naročnik je pravna ali fizična oseba, ki opravlja dejavnost in ki potrdi ponudbo ali predračun ponudnika oziroma začne uporabljati storitev (v nadaljevanju: naročnik).</p>
          <p><strong>1.3</strong> Ti pogoji urejajo vzpostavitev, uporabo, obračun in prenehanje storitve Asistent RM. Sestavni del razmerja so tudi ponudba oziroma predračun in veljavni cenik.</p>
          <p><strong>1.4</strong> S potrditvijo ponudbe, s podpisom naročilnice ali z začetkom uporabe storitve naročnik potrjuje, da je s temi pogoji seznanjen in da z njimi soglaša.</p>
        </section>
        
        <section className="legal-section">
          <h2>2. Pomen izrazov</h2>
          <p><strong>2.1</strong> <strong>Storitev</strong> pomeni AI telefonsko tajnico Asistent RM, ki sprejema telefonske klice naročnika, se z njimi pogovarja, posreduje informacije, rezervira ali prestavlja termine in o klicih obvešča naročnika.</p>
          <p><strong>2.2</strong> <strong>Vzpostavitev</strong> pomeni enkratno pripravo rešitve po meri naročnika: analizo klicev, izdelavo scenarija pogovora, nastavitev glasu in jezika, povezavo s telefonsko številko in koledarjem, testiranje in predajo v uporabo.</p>
          <p><strong>2.3</strong> <strong>Paket</strong> pomeni mesečni naročniški paket z določenim obsegom vključenih minut (Basic in Pro).</p>
          <p><strong>2.4</strong> <strong>Vključene minute</strong> so minute pogovorov, ki so zajete v mesečni ceni paketa.</p>
          <p><strong>2.5</strong> <strong>Dodatna minuta</strong> je vsaka začeta minuta pogovora nad obsegom vključenih minut v posameznem obračunskem obdobju.</p>
          <p><strong>2.6</strong> <strong>Cenik</strong> je veljavni cenik storitve Asistent RM, objavljen na asistentrm.org.</p>
          <p><strong>2.7</strong> <strong>Obračunsko obdobje</strong> je koledarski mesec, razen če je v ponudbi dogovorjeno drugače.</p>
        </section>
        
        <section className="legal-section">
          <h2>3. Sklenitev in trajanje naročniškega razmerja</h2>
          <p><strong>3.1</strong> Naročniško razmerje je sklenjeno, ko naročnik plača znesek vzpostavitve po ponudbi ali predračunu ponudnika oziroma ko začne uporabljati storitev. Plačilo se šteje za sprejem ponudbe in za soglasje s temi pogoji. Razmerje se sklene za nedoločen čas.</p>
          <p><strong>3.2</strong> Ločena pisna pogodba se ne sklepa. Ponudba oziroma predračun, ti splošni pogoji in veljavni cenik skupaj predstavljajo celoto pogodbenega razmerja med ponudnikom in naročnikom.</p>
          <p><strong>3.3</strong> Za sklenitev razmerja, za spremembo paketa in za uveljavitev sprememb po 7. členu teh pogojev ni potreben aneks ali druga posebna pisna listina.</p>
          <p><strong>3.4</strong> Storitev se začne obračunavati z dnem, ko je vzpostavljena in predana v uporabo naročniku.</p>
          <p><strong>3.5</strong> Vsaka stranka lahko razmerje odpove pisno ali po e-pošti z odpovednim rokom 30 dni, ki teče od prvega dne naslednjega obračunskega obdobja.</p>
          <p><strong>3.6</strong> Ponudnik lahko razmerje odpove brez odpovednega roka, če naročnik zamuja s plačilom več kot 30 dni ali če storitev uporablja v nasprotju s temi pogoji ali veljavnimi predpisi.</p>
        </section>
        
        <section className="legal-section">
          <h2>4. Vzpostavitev storitve</h2>
          <p><strong>4.1</strong> Vzpostavitev se obračuna enkratno po ceni iz ponudbe oziroma veljavnega cenika in je plačljiva pred začetkom izvedbe, razen če je dogovorjeno drugače.</p>
          <p><strong>4.2</strong> S plačilom vzpostavitve je naročilo dokončno potrjeno. Ponudnik z izvedbo začne po prejemu plačila.</p>
          <p><strong>4.3</strong> Naročnik ponudniku pravočasno zagotovi podatke in dostope, potrebne za vzpostavitev: opis storitev in delovnega časa, najpogostejša vprašanja strank, telefonsko številko za preusmeritev in dostop do koledarja.</p>
          <p><strong>4.4</strong> Rok vzpostavitve je praviloma 10 delovnih dni od prejema vseh potrebnih podatkov in dostopov. Če naročnik podatkov ne zagotovi pravočasno, se rok ustrezno podaljša.</p>
          <p><strong>4.5</strong> Znesek vzpostavitve se ob odpovedi naročniškega razmerja ne vrača, saj gre za že opravljeno delo po meri naročnika.</p>
        </section>
        
        <section className="legal-section">
          <h2>5. Paketi in obseg storitve</h2>
          <p><strong>5.1</strong> Paket Basic vključuje 200 minut pogovorov na obračunsko obdobje, paket Pro pa 450 minut pogovorov na obračunsko obdobje.</p>
          <p><strong>5.2</strong> Trajanje pogovora se meri od trenutka, ko asistent sprejme klic, do konca klica, in se obračunava po začeti minuti.</p>
          <p><strong>5.3</strong> Neporabljene vključene minute se ne prenašajo v naslednje obračunsko obdobje in se ne izplačujejo.</p>
          <p><strong>5.4</strong> Naročnik lahko paket kadar koli zamenja. Sprememba paketa začne veljati s prvim dnem naslednjega obračunskega obdobja.</p>
          <p><strong>5.5</strong> Če naročnik v posameznem obračunskem obdobju vključene minute preseže, se presežene minute obračunajo kot dodatne minute po ceniku, veljavnem za njegov paket.</p>
        </section>
        
        <section className="legal-section">
          <h2>6. Cene, obračun in plačilo</h2>
          <p><strong>6.1</strong> Vse cene so izražene v EUR brez DDV, če ni izrecno navedeno drugače. DDV se obračuna po vsakokrat veljavni stopnji.</p>
          <p><strong>6.2</strong> Mesečna naročnina se obračuna vnaprej za tekoče obračunsko obdobje, dodatne minute pa za nazaj, po zaključku obračunskega obdobja, v katerem so nastale.</p>
          <p><strong>6.3</strong> Rok plačila je 8 dni od datuma izdaje računa, razen če je na računu naveden drugačen rok.</p>
          <p><strong>6.4</strong> V primeru zamude s plačilom ponudnik zaračuna zakonske zamudne obresti in lahko po predhodnem opozorilu začasno onemogoči storitev do poravnave obveznosti. Za čas začasnega onemogočanja se naročnina obračunava naprej.</p>
          <p><strong>6.5</strong> Morebitni ugovor na račun mora naročnik podati pisno v 8 dneh od prejema računa; ugovor ne zadrži plačila nespornega dela.</p>
        </section>
        
        <section className="legal-section">
          <h2>7. Spremembe cenika in teh pogojev</h2>
          <p><strong>7.1</strong> Ponudnik lahko spremeni cenik in te splošne pogoje, zlasti zaradi sprememb stroškov tehnološke infrastrukture in storitev tretjih ponudnikov, sprememb obsega storitve ali sprememb predpisov.</p>
          <p><strong>7.2</strong> O spremembi cenika ali teh pogojev ponudnik naročnika obvesti po e-pošti na zadnji sporočeni naslov in z objavo na asistentrm.org, najmanj 30 dni pred uveljavitvijo spremembe.</p>
          <p><strong>7.3</strong> Spremenjene cene se uporabljajo od prvega obračunskega obdobja, ki se začne po uveljavitvi spremembe. Že izdani in plačani računi se ne spreminjajo.</p>
          <p><strong>7.4</strong> Če naročnik s spremembo ne soglaša, lahko naročniško razmerje odpove brez odpovednega roka in brez stroškov odpovedi, in sicer najpozneje do dneva uveljavitve spremembe. Če naročnik storitev po tem dnevu uporablja naprej, se šteje, da s spremembo soglaša.</p>
          <p><strong>7.5</strong> Sprememba davčne stopnje ali drugih obveznih dajatev se v cene prenese takoj ob njeni uveljavitvi in ne šteje za spremembo cenika po tem členu.</p>
          <p><strong>7.6</strong> Za uveljavitev spremenjenih cen ali spremenjenih pogojev ni potreben aneks k pogodbi niti izrecna pisna potrditev naročnika; zadošča obvestilo po tem členu.</p>
          <p><strong>7.7</strong> Če je v ponudbi za določeno obdobje izrecno dogovorjena fiksna cena, ta velja do izteka dogovorjenega obdobja.</p>
        </section>
        
        <section className="legal-section">
          <h2>8. Obveznosti naročnika</h2>
          <p><strong>8.1</strong> Naročnik zagotavlja, da so podatki, ki jih posreduje ponudniku, točni in popolni, ter da ima pravico do njihove uporabe.</p>
          <p><strong>8.2</strong> Naročnik storitve ne sme uporabljati za nezakonite namene, zavajanje klicateljev, neželeno oglaševanje ali na način, ki bi lahko škodoval ponudniku ali tretjim osebam.</p>
          <p><strong>8.3</strong> Naročnik je odgovoren za vsebino, ki jo asistent v njegovem imenu sporoča strankam, in za pravila, ki jih v scenariju pogovora določi sam.</p>
          <p><strong>8.4</strong> Naročnik ponudnika nemudoma obvesti o spremembi delovnega časa, storitev, cen ali drugih podatkov, ki vplivajo na delovanje asistenta.</p>
        </section>
        
        <section className="legal-section">
          <h2>9. Razpoložljivost in podpora</h2>
          <p><strong>9.1</strong> Ponudnik si prizadeva za nemoteno delovanje storitve 24 ur na dan, vse dni v letu, ter za mesečno razpoložljivost najmanj 99%, pri čemer se v ta odstotek ne štejejo napovedana vzdrževalna dela in izpadi na strani tretjih ponudnikov.</p>
          <p><strong>9.2</strong> Napovedana vzdrževalna dela ponudnik praviloma izvaja izven običajnega delovnega časa in o njih naročnika predhodno obvesti.</p>
          <p><strong>9.3</strong> Podpora je naročniku na voljo po e-pošti na info@asistentrm.org vsak delovni dan med 9. in 17. uro. Ponudnik se na sporočila praviloma odzove v enem delovnem dnevu.</p>
        </section>
        
        <section className="legal-section">
          <h2>10. Omejitev odgovornosti</h2>
          <p><strong>10.1</strong> Storitev temelji na tehnologiji umetne inteligence. Ponudnik si prizadeva za čim višjo kakovost pogovorov, vendar ne jamči, da bo vsak odgovor asistenta popoln ali brez napake.</p>
          <p><strong>10.2</strong> Storitev ni namenjena sprejemanju klicev v sili in ne nadomešča klica na številko 112 ali 113 ali druge nujne pomoči. Naročnik mora klicatelje na to ustrezno opozoriti, kadar je to glede na njegovo dejavnost potrebno.</p>
          <p><strong>10.3</strong> Ponudnik ne odgovarja za izpade ali napake, ki izvirajo iz storitev tretjih oseb, kot so telefonski operaterji, ponudniki koledarjev, oblačne storitve in ponudniki modelov umetne inteligence, ter za napake, nastale zaradi netočnih podatkov naročnika.</p>
          <p><strong>10.4</strong> Ponudnik ne odgovarja za posredno škodo, izgubljeni dobiček, izgubo poslov ali izgubo podatkov. Skupna odgovornost ponudnika iz naročniškega razmerja je omejena na znesek treh mesečnih naročnin, ki jih je naročnik plačal v zadnjih dvanajstih mesecih.</p>
        </section>
        
        <section className="legal-section">
          <h2>11. Varstvo osebnih podatkov</h2>
          <p><strong>11.1</strong> Pri izvajanju storitve ponudnik osebne podatke klicateljev obdeluje kot pogodbeni obdelovalec po navodilih naročnika, ki je upravljavec teh podatkov. Stranki za ta namen skleneta pogodbo o obdelavi osebnih podatkov skladno z veljavno zakonodajo.</p>
          <p><strong>11.2</strong> Za delovanje storitve se lahko klici snemajo in prepisujejo v besedilo. Naročnik zagotovi ustrezno pravno podlago in poskrbi, da so klicatelji na začetku klica obveščeni, da se pogovarjajo z digitalnim asistentom in da se klic snema.</p>
          <p><strong>11.3</strong> Posnetki in prepisi klicev se hranijo največ 12 mesecev, razen če se stranki pisno dogovorita drugače ali če daljšo hrambo zahteva zakon.</p>
          <p><strong>11.4</strong> Podrobnejše informacije o obdelavi osebnih podatkov so na voljo v <Link to="/zasebnost" className="legal-link">politiki zasebnosti</Link>, objavljeni na asistentrm.org.</p>
        </section>
        
        <section className="legal-section">
          <h2>12. Zaupnost in intelektualna lastnina</h2>
          <p><strong>12.1</strong> Stranki se zavezujeta, da bosta vse poslovne podatke, ki jih izvesta v okviru sodelovanja, varovali kot zaupne, tudi po prenehanju razmerja.</p>
          <p><strong>12.2</strong> Vse pravice intelektualne lastnine na storitvi, programski opremi, scenarijih in metodologiji ostanejo ponudniku. Naročnik za čas trajanja naročniškega razmerja pridobi neizključno, neprenosljivo pravico do uporabe storitve.</p>
          <p><strong>12.3</strong> Ponudnik lahko naročnika navede kot referenco z imenom in logotipom, dokler naročnik temu pisno ne ugovarja.</p>
        </section>
        
        <section className="legal-section">
          <h2>13. Prenehanje in izbris podatkov</h2>
          <p><strong>13.1</strong> Ob prenehanju naročniškega razmerja ponudnik storitev izklopi in na zahtevo naročnika izbriše osebne podatke, ki jih je obdeloval v njegovem imenu, najpozneje v 30 dneh, razen podatkov, ki jih mora hraniti po zakonu.</p>
          <p><strong>13.2</strong> Naročnik lahko pred prenehanjem zahteva izvoz povzetkov in prepisov klicev v strojno berljivi obliki.</p>
        </section>
        
        <section className="legal-section">
          <h2>14. Višja sila</h2>
          <p><strong>14.1</strong> Nobena od strank ni odgovorna za neizpolnitev obveznosti zaradi dogodkov, na katere ne more vplivati, kot so izpadi elektrike ali telekomunikacijskih omrežij, kibernetski napadi, naravne nesreče, stavke in ukrepi državnih organov.</p>
        </section>
        
        <section className="legal-section">
          <h2>15. Končne določbe</h2>
          <p><strong>15.1</strong> Za razmerja, ki niso urejena s temi pogoji, se uporablja pravo Republike Slovenije.</p>
          <p><strong>15.2</strong> Stranki si bosta morebitna nesoglasja prizadevali rešiti sporazumno. Če to ni mogoče, je za reševanje sporov pristojno stvarno pristojno sodišče v Kopru.</p>
          <p><strong>15.3</strong> Ti pogoji veljajo od 1. 7. 2026 in se uporabljajo do preklica oziroma do objave novejše različice.</p>
        </section>
        
        <section className="legal-section">
          <h2>Kontakt</h2>
          <p>
            <strong>Plan Plus, medijske rešitve, d.o.o.</strong><br/>
            Kopališko nabrežje 4<br/>
            6000 Koper<br/>
            <br/>
            Email: <a href="mailto:info@asistentrm.org" className="legal-link">info@asistentrm.org</a><br/>
            Telefon: 068 660 690 ali 041 438 869<br/>
            ID za DDV: SI15855520<br/>
            Matična številka: 3648265000
          </p>
        </section>
      </div>
    </div>
  );
};

export default GeneralTerms;
