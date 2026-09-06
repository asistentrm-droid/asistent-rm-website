import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Wrench, Heart, Home, Building2, Truck, UtensilsCrossed, Scale, Dumbbell, PawPrint, Calculator, Phone, Briefcase, ShoppingBag, Plane, ChevronDown, ArrowRight } from 'lucide-react';

const UseCases = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cases = [
    {
      icon: Heart,
      title: "Zdravstveni domovi & Klinike",
      shortDesc: "Rezervacija pregledov",
      fullDesc: "Avtomatsko potrjevanje pregledov, odpovedovanje in prelaganje terminov. AI obvešča paciente o pomembnih informacijah, zdravniških navodilih in preventivnih pregledih.",
      example: "\"Potrebujem termin za pregled\" → AI ponudi proste termine in rezervira."
    },
    {
      icon: Building2,
      title: "Banke & Finančne institucije",
      shortDesc: "Dogovarjanje sestankov",
      fullDesc: "Rezervacija sestankov za odpiranje računov, kredite, naložbe. AI pomaga strankam najti pravi termin za svetovanje in administrativne postopke.",
      example: "\"Zanima me posojilo za stanovanje\" → AI dogovori sestanek s svetovalcem."
    },
    {
      icon: Truck,
      title: "Logistika & Dostava",
      shortDesc: "Koordinacija dostav",
      fullDesc: "Dogovarjanje terminov prevzema in dostave, potrjevanje naslovov, obveščanje o zamudah. AI upravlja razpored in komunicira s strankami 24/7.",
      example: "\"Kdaj bo prispel paket?\" → AI preveri status in sporoči natančen čas dostave."
    },
    {
      icon: UtensilsCrossed,
      title: "Restavracije & Gostinstvo",
      shortDesc: "Rezervacije miz",
      fullDesc: "Sprejem rezervacij za mize, večje skupine, dogodke. AI beleži posebne zahteve (alergije, otroci) in obvešča o spremembah.",
      example: "\"Rezervacija za 6 oseb v petek zvečer\" → AI preveri razpoložljivost in potrdi."
    },
    {
      icon: Wrench,
      title: "Avtomobilske delavnice",
      shortDesc: "Servisi in popravila",
      fullDesc: "Beleženje okvar, dogovarjanje terminov za servis in obveščanje o statusu popravila. AI razume tehnične težave in ponudi proste termine.",
      example: "\"Motor dela čudno\" → AI zabeleži problem, dogovori ogled in pošlje potrditev."
    },
    {
      icon: Home,
      title: "Nepremičninske agencije",
      shortDesc: "Dogovarjanje ogledov",
      fullDesc: "Kvalifikacija potencialnih kupcev, dogovarjanje ogledov nepremičnin in zbiranje osnovnih informacij o željah kupcev.",
      example: "\"Želim ogledati stanovanje\" → AI dogovori termin ogleda in zabeleži želje."
    },
    {
      icon: Scissors,
      title: "Frizerski & Kozmetični saloni",
      shortDesc: "Rezervacije tretmajev",
      fullDesc: "AI sprejema rezervacije medtem ko delate s stranko. Potrjuje termine za striženje, barvanje, manikuro, pedikuro in druge tretmaje.",
      example: "\"Termin za striženje jutri ob 10h\" → AI preveri razpoložljivost in rezervira."
    },
    {
      icon: Scale,
      title: "Pravne pisarne & Odvetniki",
      shortDesc: "Prva posvetovanja",
      fullDesc: "Sprejem klicev novih strank, dogovarjanje prvega posvetovanja, zbiranje osnovnih podatkov o zadevi. AI diskretno obravnava občutljive informacije.",
      example: "\"Potrebujem pravno pomoč\" → AI dogovori sestanek in zabeleži področje prava."
    },
    {
      icon: Briefcase,
      title: "Gradbena podjetja",
      shortDesc: "Ponudbe in ogledi",
      fullDesc: "Dogovarjanje ogledov objektov, zbiranje zahtev za ponudbe, koordinacija z izvajalci. AI pomaga pri logistiki večjih projektov.",
      example: "\"Potrebujem ponudbo za prenovo\" → AI dogovori ogled in zabeleži zahteve."
    },
    {
      icon: Phone,
      title: "IT Support & Tech podjetja",
      shortDesc: "Tehnična podpora",
      fullDesc: "Prvi nivo podpore, zbiranje informacij o težavah, dogovarjanje servisov. AI lahko odgovori na osnovna vprašanja in eskalira kompleksne zadeve.",
      example: "\"Računalnik se ne vključi\" → AI zbere podatke in ustvari support ticket."
    },
    {
      icon: Dumbbell,
      title: "Fitnes centri & Telovadnice",
      shortDesc: "Vadbe in treningi",
      fullDesc: "Rezervacije skupinskih vadb, osebnih treningov, prostih terminov. AI obvešča o odpovedi ur in spremembah urnika.",
      example: "\"Želim rezervirati jogo ob 18h\" → AI preveri kapaciteto in potrdi rezervacijo."
    },
    {
      icon: PawPrint,
      title: "Veterinarske ambulante",
      shortDesc: "Pregledi hišnih ljubljenčkov",
      fullDesc: "Dogovarjanje pregledov, cepljenj, nujnih primerov. AI zabeleži vrsto živali, simptome in prednostno obravnava nujne primere.",
      example: "\"Moj pes šepa\" → AI oceni nujnost in dogovori najbližji možen termin."
    },
    {
      icon: Calculator,
      title: "Računovodski servisi",
      shortDesc: "Svetovanja in oddaje",
      fullDesc: "Dogovarjanje sestankov za davčne storitve, knjigovodstvo, letne zaključke. AI pomaga koordinirati roke za oddaje in svetovanja.",
      example: "\"Pomoč pri davčni napovedi\" → AI dogovori sestanek pred rokom za oddajo."
    },
    {
      icon: ShoppingBag,
      title: "Trgovine & E-commerce",
      shortDesc: "Poizvedbe in vračila",
      fullDesc: "Odgovarjanje na poizvedbe o izdelkih, razpoložljivosti, dogovarjanje terminov prevzema, procesiranje vračil. AI upravlja naročila 24/7.",
      example: "\"Ali imate na zalogi velikost M?\" → AI preveri in rezervira izdelek za prevzem."
    },
    {
      icon: Plane,
      title: "Turistične agencije",
      shortDesc: "Rezervacije potovanj",
      fullDesc: "Prva pomoč pri iskanju potovanj, dogovarjanje sestankov za podrobnosti, zbiranje želja o destinacijah. AI pomaga pri osnovnih informacijah.",
      example: "\"Želim dopust na Havajih\" → AI dogovori sestanek in zabeleži preference."
    }
  ];

  return (
    <section className="use-cases-section-v2" id="section-use-cases">
      <div className="use-cases-container-v2">
        <h2 className="use-cases-title-v2">Za koga je Asistent RM?</h2>
        <p className="use-cases-subtitle-v2">Klikni na industrijo in poglej kako ti lahko pomagamo</p>
        
        <div className="use-cases-grid-v2">
          {cases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            const isActive = activeCard === index;
            
            return (
              <div 
                key={index} 
                className={`use-case-card-v2 ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCard(isActive ? null : index)}
              >
                <div className="use-case-header">
                  <div className="use-case-icon-wrapper-v2">
                    <IconComponent className="use-case-icon-v2" />
                  </div>
                  <div className="use-case-title-wrapper">
                    <h3 className="use-case-title-v2">{useCase.title}</h3>
                    <p className="use-case-short-desc">{useCase.shortDesc}</p>
                  </div>
                  <ChevronDown className={`chevron-icon ${isActive ? 'rotated' : ''}`} />
                </div>
                
                {isActive && (
                  <div className="use-case-expanded">
                    <p className="use-case-full-desc">{useCase.fullDesc}</p>
                    <div className="use-case-example-v2">
                      <span className="example-label-v2">Primer uporabe:</span>
                      <p className="example-text-v2">{useCase.example}</p>
                    </div>
                    {useCase.id && (
                      <Link to={`/panoge/${useCase.id}`} className="use-case-learn-more">
                        Preberi več <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
