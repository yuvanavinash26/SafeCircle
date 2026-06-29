import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import { DashboardLayout } from './layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

// Dashboard Pages
import { SOSDashboard } from './pages/dashboard/SOSDashboard';
import { LiveMap } from './pages/dashboard/LiveMap';
import { SafeRoute } from './pages/dashboard/SafeRoute';
import { EmergencyContacts } from './pages/dashboard/EmergencyContacts';
import { FakeCall } from './pages/dashboard/FakeCall';
import { VoiceAssistant } from './pages/dashboard/VoiceAssistant';
import { AIPanicDetection } from './pages/dashboard/AIPanicDetection';
import { SafetyAnalytics } from './pages/dashboard/SafetyAnalytics';
import { Profile } from './pages/dashboard/Profile';
import { SettingsPage } from './pages/dashboard/Settings';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<About />} />

        {/* Dashboard Console Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Default redirect to SOS */}
          <Route index element={<Navigate to="/dashboard/sos" replace />} />
          <Route path="sos" element={<SOSDashboard />} />
          <Route path="map" element={<LiveMap />} />
          <Route path="route" element={<SafeRoute />} />
          <Route path="contacts" element={<EmergencyContacts />} />
          <Route path="fake-call" element={<FakeCall />} />
          <Route path="voice" element={<VoiceAssistant />} />
          <Route path="panic" element={<AIPanicDetection />} />
          <Route path="analytics" element={<SafetyAnalytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
