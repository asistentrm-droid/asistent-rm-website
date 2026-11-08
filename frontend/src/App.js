import "@/App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import CookieConsent from "./components/CookieConsent";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
        <CookieConsent />
        <ChatWidget />
      </BrowserRouter>
    </div>
  );
}

export default App;
