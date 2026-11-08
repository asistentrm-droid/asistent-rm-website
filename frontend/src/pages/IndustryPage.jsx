import React, { useCallback, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, FileText, PhoneIncoming, CalendarCheck, BellRing } from 'lucide-react';
import { getIndustryById, industries } from '../data/industries';
import { company, plans } from '../data/site';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section, CtaBand, MoreLink } from '../components/layout/Blocks';
import IndustryGrid from '../components/IndustryGrid';
import ContactModal from '../components/ContactModal';

const IndustryPage = () => {
  const { industryId } = useParams();
  const industry = getIndustryById(industryId);
  const [contactOpen, setContactOpen] = useState(false);
  const close = useCallback(() => setContactOpen(false), []);

  if (!industry) {
    return (
      <>
        <PageMeta path={`/panoge/${industryId}`} title="Panoga ne obstaja | Asistent RM" />
        <PageHero crumbs={[{ label: 'Panoge', to: '/panoge' }, { label: 'Ni najdeno' }]} title="Te panoge ne najdemo." lead="Poglejte seznam vseh panog.">
          <div className="ph-actions"><MoreLink to="/panoge">Vse panoge</MoreLink></div>
        </PageHero>
      </>
    );
  }

  const others = industries.filter((i) => i.id !== industry.id).slice(0, 3).map((i) => i.id);

  return (
    <>
      <PageMeta path={`/panoge/${industry.id}`} title={`${industry.metaTitle} | Asistent RM`} description={industry.metaDescription} />

      <PageHero
        crumbs={[{ label: 'Panoge', to: '/panoge' }, { label: industry.name }]}
        eyebrow={industry.name}
        title={industry.problemTitle}
        lead={industry.problemDesc}
      >
        <div className="ph-actions">
          <a href={company.demoPhoneHref} className="btn-primary"><Phone size={18} aria-hidden="true" /> Pokliči demo</a>
          <button type="button" className="btn-secondary" onClick={() => setContactOpen(true)}>Pogovorimo se</button>
        </div>
      </PageHero>

      <Section title="Poslušajte primer klica" narrow>
        <div className="call-sample">
          <audio controls preload="none" className="call-audio">
            <source src={industry.audioDemo} type="audio/mpeg" />
            Vaš brskalnik ne podpira predvajanja zvoka.
          </audio>
          <div className="call-transcript">
            <h3><FileText size={18} aria-hidden="true" /> Prepis pogovora</h3>
            {industry.transcript.split('\n\n').map((line, i) => (
              <p key={i} className={i % 2 === 0 ? 'turn-ai' : 'turn-caller'}>
                <span>{i % 2 === 0 ? 'Asistent' : 'Klicatelj'}</span>
                {line.trim()}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="gray" title="Kaj dobi vaše podjetje">
        <div className="card-grid card-grid-3">
          <div className="card"><span className="card-icon"><PhoneIncoming size={24} aria-hidden="true" /></span><h3>Vsak klic sprejet</h3><p>24/7, tudi ko ste sredi dela ali je zunaj delovnega časa.</p></div>
          <div className="card"><span className="card-icon"><CalendarCheck size={24} aria-hidden="true" /></span><h3>{industry.subtitle}</h3><p>Asistent uredi zadevo in jo vpiše v vaš koledar.</p></div>
          <div className="card"><span className="card-icon"><BellRing size={24} aria-hidden="true" /></span><h3>Povzetek po klicu</h3><p>E-mail ali SMS s podatki klicatelja in dogovorom.</p></div>
        </div>
        <p className="sec-note">Paketi od {plans[0].price} €/mesec + DDV. <Link to="/cenik">Celoten cenik</Link></p>
      </Section>

      <Section title="Druge panoge">
        <IndustryGrid only={others} />
        <div className="sec-more"><MoreLink to="/panoge">Vse panoge</MoreLink></div>
      </Section>

      <CtaBand />

      <ContactModal
        open={contactOpen}
        onClose={close}
        endpoint="https://formspree.io/f/mjkvogok"
        source={`panoga/${industry.id}`}
        industry={industry.name}
      />
    </>
  );
};

export default IndustryPage;
