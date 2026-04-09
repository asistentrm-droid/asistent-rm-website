# PRD: Asistent RM - AI Virtualna Telefonska Tajnica

## Original Problem Statement
Narediti Apple-style landing page za AI virtualno telefonsko tajnico z interaktivnim kalkulatorjem, ki izračuna mesečne izgube zaradi neodgovorjenih klicev. Stran mora biti ultra minimalističen, conversion-focused, razumljiv v 5 sekundah.

## Architecture & Tech Stack
- **Frontend**: React, Lucide Icons
- **Styling**: Custom CSS (Apple-style minimalism)
- **Design**: Black/White, minimal, huge whitespace
- **Deployment**: GitHub Pages (static)
- **Form Integration**: Formspree (placeholder)

## User Personas
1. **Mali podjetniki** - solo frizerji, zobozdravniki, delavnice
2. **Storitveni ponudniki** - servisi, popravila, svetovalci
3. **Lokalne storitve** - kozmetični saloni, masaže, veterinarji

## Core Requirements (Static)
1. ✅ Ultra minimalistična Apple-style landing page
2. ✅ Interaktivni kalkulator izgube prihodkov
3. ✅ Conversion-focused design z jasnimi CTA
4. ✅ Smooth scroll in fade-in animacije
5. ✅ Mobile responsive design
6. ✅ Glassmorphism navigacija

## What's Been Implemented (2025-04-09)

### ✅ Phase 1: Frontend Landing Page
**Datum**: 9. april 2025

**Implementirane sekcije**:
1. **Hero Section** - Full screen, center aligned
   - Glavni naslov: "AI tajnica, ki sprejema klice namesto vas"
   - Podnaslov z vrednostno ponudbo
   - 2 CTA gumba (Poglej demo, Preizkusi)
   - Fade-in animacija

2. **Problem Section** - Emotivno sporočilo
   - 3 vrstice ki se pojavijo zaporedno
   - "Telefon zvoni. Ne dvignete. Stranka gre drugam."
   - Zadnja vrstica poudarjena v črni barvi

3. **Solution Section** - Step-by-step
   - 4 koraki z številčnimi oznakami
   - Smooth appear animacija
   - Tagline: "To je to."

4. **Value Section** - Velike številke
   - Črno ozadje z belim tekstom
   - 3 value kartice (+30%, 0, 100%)
   - Stagger animacija

5. **INTERACTIVE CALCULATOR** 🔥 (KLJUČNA FUNKCIJA)
   - 3 sliderji za vnos podatkov:
     * Število klicev na dan (1-100)
     * % zamujenih klicev (0-100%)
     * Povprečna vrednost stranke (10-500€)
   - Live izračun mesečne izgube
   - Velika prikazana številka rezultata
   - CTA gumb "Ustavi izgubo"

6. **Demo Section**
   - Phone ikona
   - Placeholder telefonska številka
   - CTA za povpraševanje

7. **Final CTA Section**
   - Kontaktni obrazec (4 polja)
   - Formspree placeholder
   - "Brezplačen preizkus 14 dni" messaging

8. **Footer**
   - Minimal z linki
   - Copyright notice

**Design Implementation**:
- Inter font (Apple SF Pro alternative)
- Black (#000) / White (#FFF) paleta
- Subtilen accent (#007AFF)
- Huge whitespace (80-120px sekcije)
- Smooth transitions (cubic-bezier)
- Intersection Observer za scroll animacije

**Technical Details**:
- `/app/frontend/src/pages/Landing.jsx` - Main component
- `/app/frontend/src/styles/Landing.css` - All styles
- Mobile-first responsive design
- Glassmorphism na navigaciji (backdrop-blur)

## Prioritized Backlog

### P0 - Critical (Not Implemented)
Vse implementirano za MVP landing page ✅

### P1 - Important (Optional Enhancements)
1. **Formspree Integration**
   - Zamenjati placeholder z dejanskim Formspree endpoint
   - Dodati validacijo in success/error stanja

2. **Real Assets**
   - Dodati logo-rm.png
   - Dodati grafika1.png v ustrezne sekcije

3. **Demo Video/Audio**
   - Placeholder za 30s demo video
   - Ali povezava do dejanske demo številke

4. **Enhanced Animations**
   - Parallax efekti na scroll
   - Micro-interactions na hover
   - Custom cursor

### P2 - Nice to Have
1. **Analytics Integration**
   - Google Analytics
   - Conversion tracking
   
2. **A/B Testing**
   - Različne verzije copy-ja
   - CTA button variations

3. **Multi-language Support**
   - English version
   - German version

4. **SEO Optimization**
   - Meta tags
   - Open Graph
   - Structured data

## Next Tasks
1. ✅ Pregled z screenshoti
2. ✅ Testiranje responsive design
3. 📋 Dodati prave grafične elemente (ko jih ima uporabnik)
4. 📋 Konfigurirati Formspree
5. 📋 Dodati pravo telefonsko številko za demo

## Notes
- Stran je 100% frontend-only (GitHub Pages ready)
- Kalkulator deluje s pure JavaScript (brez backend)
- Form submit trenutno samo console.log (ready za Formspree)
- Uporabljene samo Lucide React ikone (brez emoji)
