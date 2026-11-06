import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ThankYou from "./pages/ThankYou";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import GeneralTerms from "./pages/GeneralTerms";
import IndustryPage from "./pages/IndustryPage";
import CookieConsent from "./components/CookieConsent";
import ChatWidget from "./components/ChatWidget";
import AdminSetup from "./pages/AdminSetup";
import AdminChats from "./pages/AdminChats";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hvala" element={<ThankYou />} />
          <Route path="/pogoji" element={<Terms />} />
          <Route path="/zasebnost" element={<Privacy />} />
          <Route path="/splosni-pogoji" element={<GeneralTerms />} />
          <Route path="/panoge/:industryId" element={<IndustryPage />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/admin/chats" element={<AdminChats />} />
        </Routes>
        <CookieConsent />
        <ChatWidget />
      </BrowserRouter>
    </div>
  );
}

export default App;
