import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ThankYou from "./pages/ThankYou";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import GeneralTerms from "./pages/GeneralTerms";
import IndustryPage from "./pages/IndustryPage";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
