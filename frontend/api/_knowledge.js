// Znanje chatbota (Vercel funkcija /api/chat). Datoteke s podčrtajem Vercel ne objavi kot poti.
// Ob spremembi cenika posodobite tudi src/data/site.js.

const KNOWLEDGE = `PODJETJE
- Asistent RM je AI receptorka (AI telefonska tajnica) za slovenska podjetja.
- Razvija in upravlja jo Plan Plus, medijske rešitve, d.o.o., Kopališko nabrežje 4, 6000 Koper.
  ID za DDV: SI15855520, matična številka: 3648265000.
- Spletna stran: asistentrm.com · E-mail: info@asistentrm.com
- Brezplačna demo linija (pogovor z AI receptorko): +386 59 790 410

KAJ DELA
- Sprejema klice 24/7 v slovenščini z naravnim glasom.
- Odgovarja na vprašanja strank (delovni čas, storitve, cene ...).
- Rezervira, prestavi ali odpove termine v koledarju (npr. Google Calendar, Outlook).
- Pametna preusmeritev klica na pravo osebo (paketa PRO in BUSINESS).
- Po klicu pošlje obvestilo po e-mailu (PRO in BUSINESS tudi SMS), s povzetkom (PRO) ali povzetkom in prepisom (BUSINESS).
- Filtrira neželene klice (PRO in BUSINESS).

CENIK 2026 (cene v EUR, brez DDV 22 %)
- BASIC: 99 €/mesec, 120 minut pogovorov (≈ 0,83 €/min). 24/7, e-mail obvestila, slovenščina, 1 sočasni klic, podpora.
- PRO (najbolj priljubljen): 169 €/mesec, 400 minut (≈ 0,45 €/min). 24/7, e-mail ali SMS obvestila, povzetki klicev,
  filtriranje neželenih klicev, slovenščina + do 2 dodatna jezika, 2 sočasna klica, pametna preusmeritev na osebo,
  raznovrstne integracije, prednostna podpora.
- BUSINESS: 279 €/mesec, 800 minut (≈ 0,35 €/min). Vse iz PRO, plus prepisi klicev, slovenščina + do 5 dodatnih jezikov, podpora 24/7.
- ENTERPRISE: več kot 800 minut ali paket po meri — po dogovoru (info@asistentrm.com).
- Dodatne minute nad zakupljenimi: 0,45 €/min, obračun po začeti minuti, enkrat mesečno za nazaj.
- Neporabljene minute se ne prenašajo v naslednji mesec.
- Paket lahko kadar koli zamenjate; sprememba velja od naslednjega meseca.
- Vzpostavitev (enkratno): 99 €. Vključuje uvodni pogovor in analizo klicev, scenarij pogovora in ton komunikacije,
  nastavitev glasu in jezika, povezavo s telefonsko številko in koledarjem, testiranje ter predajo v uporabo.

ZA KOGA
- Ambulante in klinike, frizerski in kozmetični saloni, avtomehanične delavnice, restavracije, odvetniške in
  računovodske pisarne, nepremičninske agencije, fitnes centri, veterinarji, gradbena podjetja, trgovine,
  turistične agencije in druge storitvene dejavnosti.

KAKO ZAČETI
1. Pokličite brezplačno demo linijo +386 59 790 410 in preizkusite asistenta.
2. Pišite na info@asistentrm.com ali oddajte obrazec "Kontakt" na asistentrm.com.
3. Dogovorimo se za uvodni pogovor in vzpostavitev.`;

const SYSTEM_PROMPT = `Si prijazen spletni asistent na strani asistentrm.com. Obiskovalcem pomagaš razumeti storitev Asistent RM.

Odgovarjaj v slovenščini; če obiskovalec piše v drugem jeziku, odgovori v njegovem. Odgovori naj bodo kratki — en do štirje stavki ali kratek seznam z oznakami "•" — ker se prikažejo v majhnem oknu klepeta, ki ne prikazuje markdowna.

Uporabljaj samo spodnje podatke. Če odgovora ne najdeš v njih, povej, da bo natančen odgovor dala ekipa na info@asistentrm.com, ali predlagaj klic na demo linijo — izmišljeni podatki bi obiskovalca zavedli. Ne obljubljaj brezplačnega preizkusa, popustov, rokov ali funkcij, ki niso navedene. Cene navajaj brez DDV in to povej. Ko je primerno, povabi k preizkusu demo linije ali k oddaji kontaktnega obrazca.

<podatki>
${KNOWLEDGE}
</podatki>`;

const norm = (text) => text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

// Rezervni odgovori, ko jezikovni model ni na voljo (manjka ključ, napaka ponudnika ...).
const FALLBACK_RULES = [
  [/cen|stan|kosta|placa|paket|eur|€|price|cost/, 'Paketi (cene brez DDV):\n• BASIC 99 €/mesec – 120 minut\n• PRO 169 €/mesec – 400 minut (najbolj priljubljen)\n• BUSINESS 279 €/mesec – 800 minut\nVzpostavitev je enkratno 99 €, dodatne minute 0,45 €/min. Celoten cenik je na strani v razdelku »Cenik«.'],
  [/minut|prenes|porab/, 'Dodatne minute nad zakupljenimi stanejo 0,45 €/min (brez DDV), obračun po začeti minuti enkrat mesečno za nazaj. Neporabljene minute se ne prenašajo v naslednji mesec.'],
  [/vzpostav|nastav|zacet|zacn|setup/, 'Vzpostavitev stane enkratno 99 € (brez DDV): uvodni pogovor in analiza klicev, scenarij pogovora, nastavitev glasu in jezika, povezava s telefonsko številko in koledarjem, testiranje in predaja v uporabo. Pišite nam na info@asistentrm.com.'],
  [/demo|preizk|test|poskus/, 'Asistenta lahko brezplačno preizkusite: pokličite demo linijo +386 59 790 410 in se z njim pogovorite.'],
  [/slovensk|jezik|anglesk|language/, 'Asistent RM govori slovensko z naravnim glasom. Paket PRO doda do 2, BUSINESS pa do 5 dodatnih jezikov.'],
  [/koledar|calendar|outlook|termin|rezerv/, 'Asistenta pri vzpostavitvi povežemo z vašim koledarjem (npr. Google Calendar ali Outlook), da sam preverja proste termine in jih vpisuje.'],
  [/preusmer|clovek|oseb/, 'V paketih PRO in BUSINESS asistent klic po potrebi pametno preusmeri na vas ali sodelavca.'],
  [/menjav|zamenj|odpov|vezav|pogodb/, 'Paket lahko kadar koli zamenjate, sprememba velja od naslednjega meseca. Za ostala pogodbena vprašanja pišite na info@asistentrm.com.'],
  [/kontakt|mail|telefon|klic|poklic|kdo|podjet|naslov/, 'Asistent RM upravlja Plan Plus, medijske rešitve, d.o.o., Kopališko nabrežje 4, Koper. Pišite na info@asistentrm.com ali pokličite demo linijo +386 59 790 410.'],
];

const FALLBACK_DEFAULT =
  'Asistent RM je AI receptorka, ki 24/7 v slovenščini sprejema klice, odgovarja strankam in vpisuje termine v vaš koledar. ' +
  'Paketi so od 99 €/mesec (brez DDV). Preizkusite jo na demo liniji +386 59 790 410 ali nam pišite na info@asistentrm.com.';

function fallbackAnswer(message) {
  const text = norm(message);
  const rule = FALLBACK_RULES.find(([re]) => re.test(text));
  return rule ? rule[1] : FALLBACK_DEFAULT;
}

module.exports = { SYSTEM_PROMPT, fallbackAnswer };
