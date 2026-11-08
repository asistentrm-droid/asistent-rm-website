import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE_URL } from '../../data/site';
import { pages } from '../../data/pages';

// Naslov, opis in kanonični URL strani. Za statične poti vzame podatke iz data/pages.js.
const PageMeta = ({ path, title, description }) => {
  const meta = pages[path] || {};
  const t = title || meta.title;
  const d = description || meta.description;
  return (
    <Helmet>
      {t && <title>{t}</title>}
      {d && <meta name="description" content={d} />}
      <link rel="canonical" href={`${SITE_URL}${path}`} />
      {meta.noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
};

export default PageMeta;
