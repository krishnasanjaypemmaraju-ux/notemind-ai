import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Placeholder Pages
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CreateNotebook from "./pages/CreateNotebook";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Audio from "./pages/Audio";
import MindMap from "./pages/MindMap";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateNotebook />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Layout>
    </Router>
  );
}
