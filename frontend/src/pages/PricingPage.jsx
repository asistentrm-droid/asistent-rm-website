import React, { useCallback, useState } from 'react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section, CtaBand } from '../components/layout/Blocks';
import Pricing from '../components/Pricing';
import Calculator from '../components/Calculator';
import FaqList from '../components/FaqList';
import ContactModal from '../components/ContactModal';
import { faqs } from '../data/site';

const PRICING_FAQ = faqs.filter((f) => /stane|minute|zamenjam|vzpostavitev/i.test(f.question));

const PricingPage = () => {
  const [plan, setPlan] = useState(null);
  const close = useCallback(() => setPlan(null), []);

  return (
    <>
      <PageMeta path="/cenik" />
      <PageHero
        crumbs={[{ label: 'Cenik' }]}
        eyebrow="Cenik 2026"
        title="Pregledne cene. Brez presenečenj."
        lead="Izberite paket glede na število minut pogovorov. Paket lahko kadar koli zamenjate."
      />

      <Pricing onChoose={setPlan} showHeader={false} />

      <Section tone="gray" id="kalkulator" eyebrow="Kalkulator" title="Koliko vas stanejo zamujeni klici?">
        <Calculator />
      </Section>

      <Section title="Vprašanja o ceni" narrow>
        <FaqList items={PRICING_FAQ} idPrefix="cenik-faq" />
      </Section>

      <CtaBand title="Niste prepričani, kateri paket?" text="Pokličite demo ali nam pišite — svetujemo brez obveznosti." />

      <ContactModal open={Boolean(plan)} onClose={close} defaultPlan={plan || ''} source="cenik" />
    </>
  );
};

export default PricingPage;
