import React, { useState } from 'react';
import SettingsCard from '../../components/SettingsCard';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';
import { Settings, Shield, Bell, Eye, Lock, Smartphone } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Settings States
  const [secSMS, setSecSMS] = useState(true);
  const [secPolice, setSecPolice] = useState(false);
  const [secAudio, setSecAudio] = useState(true);

  const [notifVoice, setNotifVoice] = useState(true);
  const [notifBPM, setNotifBPM] = useState(true);
  const [notifGeofence, setNotifGeofence] = useState(true);

  const [privEdge, setPrivEdge] = useState(true);
  const [privTelemetry, setPrivTelemetry] = useState(false);

  const showToast = (message: string) => {
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'success',
      message
    }]);
  };

  const handleToggle = (id: string) => {
    switch (id) {
      case 'sec-sms':
        setSecSMS(!secSMS);
        showToast(`SMS broadcasts ${!secSMS ? 'enabled' : 'disabled'}`);
        break;
      case 'sec-police':
        setSecPolice(!secPolice);
        showToast(`PCR Police dispatches ${!secPolice ? 'linked' : 'unlinked'}`);
        break;
      case 'sec-audio':
        setSecAudio(!secAudio);
        showToast(`Ambience recording streams ${!secAudio ? 'allowed' : 'blocked'}`);
        break;
      case 'notif-voice':
        setNotifVoice(!notifVoice);
        showToast(`Voice assistant listening state ${!notifVoice ? 'audited' : 'muted'}`);
        break;
      case 'notif-bpm':
        setNotifBPM(!notifBPM);
        showToast(`BPM watch indicators alerts ${!notifBPM ? 'syncing' : 'paused'}`);
        break;
      case 'notif-geo':
        setNotifGeofence(!notifGeofence);
        showToast(`Geofence boundary alerts ${!notifGeofence ? 'enabled' : 'disabled'}`);
        break;
      case 'priv-edge':
        setPrivEdge(!privEdge);
        showToast(`Edge processing ${!privEdge ? 'locked' : 'unlocked'}`);
        break;
      case 'priv-telemetry':
        setPrivTelemetry(!privTelemetry);
        showToast(`Anonymous developer telemetry ${!privTelemetry ? 'sharing' : 'disabled'}`);
        break;
      default:
        break;
    }
  };

  const securitySettings = [
    {
      id: 'sec-sms',
      label: 'Broadcast SMS Coordinates',
      description: 'Sends automated maps coordinates to your circle via cellular SMS alerts.',
      checked: secSMS,
      onToggle: handleToggle
    },
    {
      id: 'sec-police',
      label: 'PCR Police Nodal Dispatches',
      description: 'Direct alerts to closest PCR police vans on SOS confirmation triggers.',
      checked: secPolice,
      onToggle: handleToggle
    },
    {
      id: 'sec-audio',
      label: 'Emergency Microphone Recording',
      description: 'Records and relays ambient mic audio snippets (15s loops) during active emergencies.',
      checked: secAudio,
      onToggle: handleToggle
    }
  ];

  const notificationSettings = [
    {
      id: 'notif-voice',
      label: 'Voice Assistant Ambient Listeners',
      description: 'Continuous wake-up listener checking audio threads for panic vocal prompts.',
      checked: notifVoice,
      onToggle: handleToggle
    },
    {
      id: 'notif-bpm',
      label: 'Biometric Watch Threshold Alerts',
      description: 'Rings confirmations when companion watch registers BPM exceeding 130 during drops.',
      checked: notifBPM,
      onToggle: handleToggle
    },
    {
      id: 'notif-geo',
      label: 'Geofence Boundary Breaches',
      description: 'Shows prompt alerts on leaving defined safe boundary coordinates.',
      checked: notifGeofence,
      onToggle: handleToggle
    }
  ];

  const privacySettings = [
    {
      id: 'priv-edge',
      label: 'Local Edge AI Processing Only',
      description: 'Enforce local speech models execution, blocking voice database transmissions to servers.',
      checked: privEdge,
      onToggle: handleToggle
    },
    {
      id: 'priv-telemetry',
      label: 'Share Developer Telemetry',
      description: 'Share anonymous usage ratings logs to improve route planning calculations.',
      checked: privTelemetry,
      onToggle: handleToggle
    }
  ];

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 text-left relative">
      
      {/* Header */}
      <div className="space-y-1">
        <h3 className="font-bold text-white text-base">Companion Settings</h3>
        <p className="text-xs text-slate-400">Configure safety thresholds, voice assistants, and hardware configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security parameters */}
        <SettingsCard 
          title="Crisis & Dispatch Protocols" 
          description="Manage dispatches, SMS relays, and recording thresholds." 
          icon={Shield} 
          settings={securitySettings} 
        />

        {/* Listeners parameters */}
        <SettingsCard 
          title="Sensor & Listener Triggers" 
          description="Configure voice models and watch pulse thresholds." 
          icon={Smartphone} 
          settings={notificationSettings} 
        />

        {/* Privacy parameters */}
        <div className="lg:col-span-2">
          <SettingsCard 
            title="Privacy & Data Control" 
            description="Manage localized data encryptions and server sync configs." 
            icon={Lock} 
            settings={privacySettings} 
          />
        </div>
      </div>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
export default SettingsPage;
