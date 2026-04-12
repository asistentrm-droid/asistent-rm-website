import React, { useState } from 'react';
import { Scissors, Wrench, Heart, Home, ChevronDown } from 'lucide-react';

const UseCases = () => {
  const [activeCard, setActiveCard] = useState(null);

  const cases = [
    {
      icon: Scissors,
      title: "Frizerski in kozmetični saloni",
      shortDesc: "Rezervacije in pregledi",
      fullDesc: "AI sprejema rezervacije medtem ko delate s stranko. Potrjuje termine za frizerske storitve, kozmetične posege, manikuro, pedikuro in druge tretmaje. Obvešča o spremembah in upravlja vaš koledar.",
      example: "\"Želim termin za striženje in barvanje jutri ob 10h\" → AI preveri razpoložljivost in rezervira."
    },
    {
      icon: Wrench,
      title: "Avtomehaniki",
      shortDesc: "Servisi in popravila",
      fullDesc: "Beleženje okvar, dogovarjanje terminov za servis in obveščanje o statusu popravila. AI razume tehnične težave in ponudi proste termine.",
      example: "\"Avto ne vžge in curlja olje\" → AI zabeleži problem, dogovori ogled in pošlje potrditev."
    },
    {
      icon: Heart,
      title: "Zdravniki in zobozdravniki",
      shortDesc: "Potrjevanje pregledov",
      fullDesc: "Avtomatsko potrjevanje pregledov, odpovedovanje in prelaganje terminov. AI obvešča paciente o pomembnih informacijah, zdravniških navodilih in preventivnih pregledih.",
      example: "\"Moram premakniti termin za pregled\" → AI ponudi proste termine in rezervira novega."
    },
    {
      icon: Home,
      title: "Nepremičninski agenti",
      shortDesc: "Dogovarjanje ogledov",
      fullDesc: "Kvalifikacija potencialnih kupcev, dogovarjanje ogledov nepremičnin in zbiranje osnovnih informacij o željah.",
      example: "»Zanima me ogled hiše na Bledu« → AI dogovori termin ogleda in zabeleži želje."
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
