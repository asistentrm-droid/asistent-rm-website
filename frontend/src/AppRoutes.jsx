import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import PricingPage from './pages/PricingPage';
import IndustriesPage from './pages/IndustriesPage';
import IndustryPage from './pages/IndustryPage';
import About from './pages/About';
import Enterprise from './pages/Enterprise';
import Contact from './pages/Contact';
import FaqPage from './pages/FaqPage';
import ThankYou from './pages/ThankYou';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import GeneralTerms from './pages/GeneralTerms';
import AdminSetup from './pages/AdminSetup';
import AdminChats from './pages/AdminChats';
import './styles/Landing.css';
import './styles/SEOContent.css';
import './styles/Trust.css';
import './styles/site.css';
import './styles/home.css';

// Poti strani — uporablja jih App (brskalnik) in scripts/prerender.cjs (statični HTML).
const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/kako-deluje" element={<HowItWorks />} />
      <Route path="/cenik" element={<PricingPage />} />
      <Route path="/panoge" element={<IndustriesPage />} />
      <Route path="/panoge/:industryId" element={<IndustryPage />} />
      <Route path="/enterprise" element={<Enterprise />} />
      <Route path="/o-nas" element={<About />} />
      <Route path="/kontakt" element={<Contact />} />
      <Route path="/pogosta-vprasanja" element={<FaqPage />} />
      <Route path="/hvala" element={<ThankYou />} />
      <Route path="/pogoji" element={<Terms />} />
      <Route path="/zasebnost" element={<Privacy />} />
      <Route path="/splosni-pogoji" element={<GeneralTerms />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="/admin/setup" element={<AdminSetup />} />
    <Route path="/admin/chats" element={<AdminChats />} />
  </Routes>
);

export default AppRoutes;
