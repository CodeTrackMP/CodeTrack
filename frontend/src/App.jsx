import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard"; // example existing route

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Default Route → Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Existing Routes (unchanged) */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}