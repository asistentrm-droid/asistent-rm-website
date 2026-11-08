import React from 'react';
import PageMeta from '../components/layout/PageMeta';
import { PageHero, Section, CtaBand } from '../components/layout/Blocks';
import FaqList from '../components/FaqList';
import { faqs } from '../data/site';

const FaqPage = () => (
  <>
    <PageMeta path="/pogosta-vprasanja" />
    <PageHero
      crumbs={[{ label: 'Pogosta vprašanja' }]}
      eyebrow="Pomoč"
      title="Pogosta vprašanja"
      lead="Ne najdete odgovora? Vprašajte našega spletnega asistenta (spodaj desno) ali nam pišite."
    />
    <Section narrow>
      <FaqList items={faqs} idPrefix="faq" />
    </Section>
    <CtaBand />
  </>
);

export default FaqPage;
