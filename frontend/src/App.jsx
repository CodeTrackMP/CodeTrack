import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard"; // example existing route
import Reminders from "./pages/Reminders";
import ConnectionPage from "./pages/ConnectionPage";
import ProfilePage from "./pages/ProfilPage";
import ChallengesPage from "./pages/ChallengesPage";


export default function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Default Route → Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Existing Routes (unchanged) */}
        <Route path="/connection" element={<ConnectionPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path="/battle" element={<ChallengesPage />} />
       

      </Routes>
    </Router>
  );
}