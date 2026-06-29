import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout
import { DashboardLayout } from './layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

// Dashboard Pages
import { Dashboard } from './pages/dashboard/Dashboard';
import { SOSDashboard } from './pages/dashboard/SOSDashboard';
import { LiveMap } from './pages/dashboard/LiveMap';
import { SafeRoute } from './pages/dashboard/SafeRoute';
import { EmergencyContacts } from './pages/dashboard/EmergencyContacts';
import { FakeCallGenerator } from './pages/dashboard/FakeCallGenerator';
import { VoiceAssistant } from './pages/dashboard/VoiceAssistant';
import { PanicDetection } from './pages/dashboard/PanicDetection';
import { SafetyAnalytics } from './pages/dashboard/SafetyAnalytics';
import { Profile } from './pages/dashboard/Profile';
import { SettingsPage } from './pages/dashboard/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<About />} />

        {/* Dashboard Console Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="sos" element={<SOSDashboard />} />
          <Route path="map" element={<LiveMap />} />
          <Route path="route" element={<SafeRoute />} />
          <Route path="contacts" element={<EmergencyContacts />} />
          <Route path="fake-call" element={<FakeCallGenerator />} />
          <Route path="voice" element={<VoiceAssistant />} />
          <Route path="panic" element={<PanicDetection />} />
          <Route path="analytics" element={<SafetyAnalytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
