import React from 'react';
import { Scissors, Stethoscope, Wrench, Briefcase } from 'lucide-react';

const UseCases = () => {
  const cases = [
    {
      icon: Scissors,
      title: "Frizerski saloni",
      description: "AI sprejema rezervacije med strižnjem, potrjuje termine in obvešča stranke o spremembah.",
      example: "»Želim termin za striženje jutri ob 10h« → AI preveri razpoložljivost in rezervira."
    },
    {
      icon: Stethoscope,
      title: "Zobozdravniki",
      description: "Avtomatsko potrjevanje pregledov, odpovedovanje in prelaganje terminov brez vašega posredovanja.",
      example: "»Moram premakniti termin« → AI ponudi proste termine in rezervira novega."
    },
    {
      icon: Wrench,
      title: "Servisi & Popravila",
      description: "Beleženje okvar, dogovarjanje terminov in obveščanje o statusu popravila.",
      example: "»Avto ne vžge« → AI zabeleži problem, dogovori ogled in pošlje potrditev."
    },
    {
      icon: Briefcase,
      title: "Svetovalci & Storitve",
      description: "Kvalifikacija potencialnih strank, dogovarjanje sestankov in zbiranje osnovnih informacij.",
      example: "»Potrebujem računovodsko svetovanje« → AI razume potrebo in rezervira posvet."
    }
  ];

  return (
    <section className="use-cases-section" id="section-use-cases">
      <div className="use-cases-container">
        <h2 className="use-cases-title">Kako Asistent RM pomaga različnim podjetjem</h2>
        <p className="use-cases-subtitle">Prilagojeno vašim potrebam - ne glede na panogo</p>
        
        <div className="use-cases-grid">
          {cases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div key={index} className="use-case-card">
                <div className="use-case-icon-wrapper">
                  <IconComponent className="use-case-icon" />
                </div>
                <h3 className="use-case-title">{useCase.title}</h3>
                <p className="use-case-description">{useCase.description}</p>
                <div className="use-case-example">
                  <span className="example-label">Primer:</span>
                  <p className="example-text">{useCase.example}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
