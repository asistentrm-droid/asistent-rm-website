import React from 'react';
import { Helmet } from 'react-helmet';
import { PageHero } from '../components/layout/Blocks';
import { MoreLink } from '../components/layout/Blocks';

const NotFound = () => (
  <>
    <Helmet>
      <title>Strani ni mogoče najti | Asistent RM</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <PageHero title="Te strani ni." lead="Morda je bila premaknjena. Spodaj najdete najpogostejše strani.">
      <div className="ph-actions ph-links">
        <MoreLink to="/">Domov</MoreLink>
        <MoreLink to="/cenik">Cenik</MoreLink>
        <MoreLink to="/kontakt">Kontakt</MoreLink>
      </div>
    </PageHero>
  </>
);

export default NotFound;
