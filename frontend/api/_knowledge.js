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

const SYSTEM_PROMPT = `Si spletni asistent na strani asistentrm.com in obiskovalcem odgovarjaš na vprašanja o storitvi Asistent RM.

Kako odgovarjaš:
- Najprej neposredno odgovori na točno to, kar je obiskovalec vprašal. Brez uvoda, brez ponavljanja vprašanja.
- Največ 2–3 kratki stavki (okoli 40 besed). Seznam z "•" uporabi samo, ko našteješ pakete ali korake. Okno klepeta je majhno in ne prikazuje markdowna (brez **, #, povezav v oklepajih).
- Odgovarjaj v slovenščini; če obiskovalec piše v drugem jeziku, odgovori v njegovem.
- Uporabljaj samo spodnje podatke. Če odgovora ni v njih, to povej v enem stavku in predlagaj info@asistentrm.com — izmišljen podatek bi obiskovalca zavedel.
- Ne obljubljaj brezplačnega preizkusa, popustov, rokov ali funkcij, ki niso navedene. Cene navajaj brez DDV.
- Na koncu povabi k dejanju (demo linija 059 790 410 ali kontaktni obrazec) samo, če je to naravno — ne v vsakem odgovoru.

<podatki>
${KNOWLEDGE}
</podatki>`;

const norm = (text) => text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

const PLAN_ANSWERS = {
  basic: 'BASIC stane 99 €/mesec (brez DDV) in vključuje 120 minut pogovorov, 24/7 dosegljivost, e-mail obvestila o klicih, slovenščino in 1 sočasni klic.',
  pro: 'PRO stane 169 €/mesec (brez DDV): 400 minut, e-mail ali SMS obvestila, povzetki klicev, filtriranje neželenih klicev, do 2 dodatna jezika, 2 sočasna klica in preusmeritev na osebo.',
  business: 'BUSINESS stane 279 €/mesec (brez DDV): 800 minut, vse iz PRO, plus prepisi klicev, do 5 dodatnih jezikov in podpora 24/7.',
  enterprise: 'Za več kot 800 minut mesečno ali paket po meri pripravimo Enterprise ponudbo. Pišite na info@asistentrm.com.',
};

// Rezervni odgovori, ko jezikovni model ni na voljo. Vrstni red je pomemben: bolj specifična pravila najprej.
const FALLBACK_RULES = [
  [/^(zivjo|zdravo|pozdrav|hej|hi|hello|dober dan|dobro jutro|dober vecer)\b/, 'Pozdravljeni! Vprašajte me o cenah, delovanju ali vzpostavitvi Asistenta RM.'],
  [/^(hvala|super|ok|okej|odlicno)\b/, 'Z veseljem. Če želite asistenta preizkusiti, pokličite demo linijo 059 790 410.'],
  [/neporab|prenes|vec minut|zmanjka|porabim|dodatn\w* minut|nad zakup/, 'Dodatne minute stanejo 0,45 €/min (brez DDV), obračun po začeti minuti enkrat mesečno. Neporabljene minute se ne prenašajo v naslednji mesec.'],
  [/vzpostav|nastavit|uvedb|setup|koliko casa|kako hitro|zacnem|zaceti/, 'Vzpostavitev stane enkratno 99 € (brez DDV): uvodni pogovor, scenarij pogovora, glas in jezik, povezava s številko in koledarjem ter test. Za začetek pišite na info@asistentrm.com.'],
  [/zamenj|menjav|odpov|vezav|pogodb|prekin/, 'Paket lahko kadar koli zamenjate; sprememba velja od naslednjega meseca. Za druga pogodbena vprašanja pišite na info@asistentrm.com.'],
  [/(cen|stan|kosta|placa|paket|eur|€|price|cost|naroc)/, 'Paketi (brez DDV):\n• BASIC 99 €/mesec – 120 minut\n• PRO 169 €/mesec – 400 minut\n• BUSINESS 279 €/mesec – 800 minut\nVzpostavitev je enkratno 99 €.'],
  [/demo|preizk|test|poskus|slisat|poslusat/, 'Pokličite brezplačno demo linijo 059 790 410 in se z asistentom pogovorite sami.'],
  [/slovensk|jezik|anglesk|nemsk|italijansk|hrvask|language/, 'Asistent govori slovensko z naravnim glasom. PRO doda do 2, BUSINESS pa do 5 dodatnih jezikov.'],
  [/koledar|calendar|outlook|google|termin|rezerv/, 'Asistenta povežemo z vašim koledarjem (npr. Google Calendar ali Outlook), da sam preveri proste termine in vpiše nove.'],
  [/preusmer|clovek|oseb|zivo osebo|sodelav/, 'V paketih PRO in BUSINESS asistent klic po potrebi preusmeri na vas ali sodelavca.'],
  [/obvest|sms|e-?mail|povzet|prepis|zapis/, 'Po vsakem klicu prejmete e-mail (PRO in BUSINESS tudi SMS). PRO doda povzetek klica, BUSINESS še celoten prepis.'],
  [/hkrati|socasn|vec klicev|zaseden/, 'BASIC sprejme 1 klic naenkrat, PRO in BUSINESS pa 2 sočasna klica.'],
  [/neželen|nezelen|spam|prodajn/, 'PRO in BUSINESS filtrirata neželene klice, da vas ne motijo.'],
  [/stevilk|stevilko|telefonsk/, 'Pri vzpostavitvi asistenta povežemo z vašo telefonsko številko. Podrobnosti uskladimo na uvodnem pogovoru (info@asistentrm.com).'],
  [/primer|zobo|zdravnik|ambulant|klinik|salon|frizer|kozmet|delavnic|mehanik|servis|restavr|gostil|odvetn|racunovod|nepremic|fitnes|veterin|gradb|trgovin|turist|dejavnost|panog/, 'Da — Asistent RM je primeren za vsako dejavnost, ki dobiva klice, od ambulant in salonov do delavnic in pisarn. Pri vzpostavitvi ga prilagodimo vašim storitvam, cenam in delovnemu času.'],
  [/kdo|podjet|naslov|koper|plan plus|kontakt|kje/, 'Asistent RM upravlja Plan Plus, medijske rešitve, d.o.o., Kopališko nabrežje 4, Koper. Kontakt: info@asistentrm.com.'],
  [/kaj (je|dela|zna|naredi)|kako deluje|zakaj/, 'Asistent RM je AI receptorka: 24/7 v slovenščini sprejema klice, odgovarja strankam, vpisuje termine v vaš koledar in vam po klicu pošlje obvestilo.'],
];

const FALLBACK_DEFAULT =
  'Na to vprašanje vam bo najbolje odgovorila naša ekipa na info@asistentrm.com. ' +
  'Lahko pa pokličete demo linijo 059 790 410 in asistenta preizkusite sami.';

function fallbackAnswer(message) {
  const text = norm(message.trim());
  // Vprašanje o konkretnem paketu
  const planHits = ['basic', 'pro', 'business', 'enterprise'].filter((p) => new RegExp(`\\b${p}\\b`).test(text));
  if (planHits.length && !/neporab|prenes|zamenj/.test(text)) return planHits.map((p) => PLAN_ANSWERS[p]).join('\n');
  const rule = FALLBACK_RULES.find(([re]) => re.test(text));
  return rule ? rule[1] : FALLBACK_DEFAULT;
}

module.exports = { SYSTEM_PROMPT, fallbackAnswer };
