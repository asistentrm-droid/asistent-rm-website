// Osrednji podatki o podjetju, ceniku in pogostih vprašanjih.
// Iz te datoteke berejo: glavna stran, podstrani panog in skripta
// scripts/prerender.mjs, ki ustvari statični HTML, llms.txt in llms-full.txt
// za iskalnike in AI orodja. Ko spremenite ceno ali podatek, ga spremenite tukaj.
// (Chatbot ima svojo kopijo v api/_knowledge.js — ob spremembi cenika posodobite tudi njo.)

export const SITE_URL = 'https://asistentrm.com';

export const company = {
  brand: 'Asistent RM',
  legalName: 'Plan Plus, medijske rešitve, d.o.o.',
  street: 'Kopališko nabrežje 4',
  postalCode: '6000',
  city: 'Koper',
  country: 'Slovenija',
  vatId: 'SI15855520',
  registrationNumber: '3648265000',
  email: 'info@asistentrm.com',
  demoPhone: '+386 59 790 410',
  demoPhoneHref: 'tel:+38659790410',
  social: {
    youtube: 'https://www.youtube.com/@RMASISTENT',
    facebook: 'https://www.facebook.com/profile.php?id=61584933238897&locale=sl_SI',
    instagram: 'https://www.instagram.com/rmasistent/',
  },
};

export const tagline = 'Klic, ki ga ne zamudite.';

export const shortDescription =
  'Asistent RM je AI receptorka (AI telefonska tajnica) za slovenska podjetja. ' +
  'Sprejema klice 24/7 v slovenščini, odgovarja na vprašanja strank, rezervira termine ' +
  'v vašem koledarju, preusmeri klic na pravo osebo in vas po vsakem klicu obvesti.';

export const plans = [
  {
    id: 'basic',
    name: 'BASIC',
    price: 99,
    minutes: 120,
    perMinute: '0,83',
    concurrentCalls: 1,
    popular: false,
    features: [
      '120 vključenih minut pogovorov',
      '24/7 dosegljivost',
      'E-mail obvestila o novih klicih',
      'Slovenščina',
      '1 sočasni klic',
      'Podpora',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 169,
    minutes: 400,
    perMinute: '0,45',
    concurrentCalls: 2,
    popular: true,
    features: [
      '400 vključenih minut pogovorov',
      '24/7 dosegljivost',
      'E-mail ali SMS obvestila o novih klicih',
      'Povzetki klicev',
      'Filtriranje neželenih klicev',
      'Slovenščina + do 2 dodatna jezika',
      '2 sočasna klica',
      'Pametna preusmeritev na osebo',
      'Raznovrstne integracije',
      'Prednostna podpora',
    ],
  },
  {
    id: 'business',
    name: 'BUSINESS',
    price: 279,
    minutes: 800,
    perMinute: '0,35',
    concurrentCalls: 2,
    popular: false,
    features: [
      '800 vključenih minut pogovorov',
      '24/7 dosegljivost',
      'E-mail ali SMS obvestila o novih klicih',
      'Povzetki in prepisi klicev',
      'Filtriranje neželenih klicev',
      'Slovenščina + do 5 dodatnih jezikov',
      '2 sočasna klica',
      'Pametna preusmeritev na osebo',
      'Raznovrstne integracije',
      'Podpora 24/7',
    ],
  },
];

export const pricingTerms = {
  setupFee: 99,
  setupIncludes:
    'uvodni pogovor in analiza klicev, scenarij pogovora in ton komunikacije, nastavitev glasu in jezika, ' +
    'povezava s telefonsko številko in koledarjem, testiranje ter predaja v uporabo',
  extraMinute: '0,45',
  billing:
    'Dodatne minute se obračunajo po začeti minuti, enkrat mesečno za nazaj. ' +
    'Neporabljene minute se ne prenašajo v naslednji mesec.',
  planChange: 'Paket lahko kadar koli zamenjate — sprememba velja od naslednjega meseca.',
  enterprise: 'Potrebujete več kot 800 minut mesečno ali paket po meri? Enterprise paket po dogovoru.',
  vat: 'Vse cene so v EUR in ne vključujejo DDV (22 %).',
};

export const faqs = [
  {
    question: 'Kaj je AI receptorka?',
    answer:
      'AI receptorka je telefonski asistent z umetno inteligenco, ki namesto vas sprejema klice. Asistent RM govori slovensko, ' +
      'odgovarja na vprašanja strank, rezervira termine v vašem koledarju, po potrebi preusmeri klic na pravo osebo ' +
      'in vas po vsakem klicu obvesti. Na voljo je 24 ur na dan, vse dni v letu.',
  },
  {
    question: 'Koliko stane Asistent RM?',
    answer:
      'Paketi se začnejo pri 99 € na mesec (BASIC, 120 minut pogovorov). PRO stane 169 € na mesec (400 minut), ' +
      'BUSINESS pa 279 € na mesec (800 minut). Enkratna vzpostavitev stane 99 €. Cene ne vključujejo DDV.',
  },
  {
    question: 'Ali AI receptorka res govori slovensko?',
    answer:
      'Da. Asistent RM je narejen za slovenski trg in se z vašimi strankami pogovarja v slovenščini z naravnim glasom. ' +
      'Paketa PRO in BUSINESS podpirata tudi dodatne jezike. Najlažje se prepričate sami — pokličite brezplačno demo številko 059 790 410.',
  },
  {
    question: 'Kaj se zgodi, če porabim vse minute?',
    answer:
      'Asistent deluje naprej. Dodatne minute nad zakupljenimi se obračunajo po 0,45 € na minuto (+ DDV), po začeti minuti, ' +
      'enkrat mesečno za nazaj. Neporabljene minute se ne prenašajo v naslednji mesec.',
  },
  {
    question: 'Ali lahko zamenjam paket?',
    answer: 'Da, paket lahko kadar koli zamenjate. Sprememba velja od naslednjega meseca.',
  },
  {
    question: 'Kako poteka vzpostavitev?',
    answer:
      'Začnemo z uvodnim pogovorom in analizo vaših klicev. Nato pripravimo scenarij pogovora in ton komunikacije, nastavimo glas in jezik, ' +
      'asistenta povežemo z vašo telefonsko številko in koledarjem, vse skupaj preizkusimo in vam ga predamo v uporabo. Vzpostavitev stane enkratno 99 €.',
  },
  {
    question: 'Kaj, če stranka želi govoriti s človekom?',
    answer:
      'V paketih PRO in BUSINESS je vključena pametna preusmeritev: asistent prepozna, kdaj je klic treba predati osebi, in ga preusmeri na vas ali sodelavca.',
  },
  {
    question: 'Kako se AI receptorka poveže z mojim koledarjem?',
    answer:
      'Pri vzpostavitvi asistenta povežemo z vašim koledarjem (na primer Google Calendar ali Outlook). Ko stranka želi termin, asistent preveri proste termine ' +
      'in ga vpiše v koledar, vi pa prejmete obvestilo.',
  },
  {
    question: 'Za katera podjetja je Asistent RM primeren?',
    answer:
      'Za vsa podjetja, ki veliko komunicirajo po telefonu: ambulante in klinike, frizerske in kozmetične salone, avtomehanične delavnice, restavracije, ' +
      'odvetniške in računovodske pisarne, nepremičninske agencije, fitnes centre, veterinarje in druge storitvene dejavnosti.',
  },
];

// Pošteni, preverljivi podatki namesto marketinških številk brez vira.
export const facts = [
  { value: '24/7', label: 'dosegljivost, tudi ob praznikih' },
  { value: 'SLO', label: 'slovenščina z naravnim glasom' },
  { value: '99 €', label: 'mesečno za začetek (+ DDV)' },
];

export const howItWorks = [
  { title: 'Stranka pokliče', text: 'Asistent takoj dvigne in začne pogovor v slovenščini.' },
  { title: 'Uredi zadevo', text: 'Odgovori na vprašanja, rezervira termin ali klic preusmeri na pravo osebo.' },
  { title: 'Vi ste obveščeni', text: 'Po klicu prejmete e-mail ali SMS s povzetkom pogovora.' },
];
