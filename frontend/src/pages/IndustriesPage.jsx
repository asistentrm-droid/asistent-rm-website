import React from 'react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section, CtaBand } from '../components/layout/Blocks';
import IndustryGrid from '../components/IndustryGrid';

const IndustriesPage = () => (
  <>
    <PageMeta path="/panoge" />
    <PageHero
      crumbs={[{ label: 'Panoge' }]}
      eyebrow="Panoge"
      title="AI receptorka za vašo dejavnost."
      lead="Izberite svojo panogo in poslušajte primer pravega klica."
    />
    <Section>
      <IndustryGrid />
    </Section>
    <CtaBand title="Vaše panoge ni na seznamu?" text="Asistenta prilagodimo vsaki dejavnosti, ki dobiva klice. Pišite nam." />
  </>
);

export default IndustriesPage;
