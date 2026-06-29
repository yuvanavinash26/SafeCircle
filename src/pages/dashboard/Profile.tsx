import React from 'react';
import { User, Shield, MapPin, Mail, Phone, Heart, Star } from 'lucide-react';
import StatCard from '../../components/StatCard';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left relative">
      
      {/* Header Profile Title */}
      <div className="space-y-1">
        <h3 className="font-bold text-white text-base">User Security Profile</h3>
        <p className="text-xs text-slate-400">Manage your credentials, bio-telemetry profiles, and secure safety metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Profile Card Summary */}
        <div className="md:col-span-5 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col items-center text-center space-y-4">
          
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-brand-purple-500/50 shadow-lg shadow-brand-purple-500/10">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" 
              alt="Kavya Sharma" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <h4 className="font-black text-xl text-white">Kavya Sharma</h4>
            <p className="text-xs text-brand-blue-400 font-semibold flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>SafeCircle Guard Premium</span>
            </p>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed px-4">
            Daily commuter in Delhi NCR region. Primary travel channels: Metro Line yellow & Sector 62 road conduits.
          </p>

          <div className="h-px bg-slate-800/80 w-full" />

          {/* Details list */}
          <div className="w-full text-left space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Phone:</span>
              <span className="font-semibold text-slate-200">+91 99887 76655</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-semibold text-slate-200">kavya.sharma@domain.in</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Blood Type:</span>
              <span className="font-semibold text-brand-red-400">O+ (Positive)</span>
            </div>
          </div>

        </div>

        {/* Detailed configs details */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Section: Medical / Trauma profile */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-red-500" />
              <h4 className="font-bold text-sm text-white">Emergency Trauma Profile</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              These details are encrypted locally. In critical situations, they are automatically shared with regional hospitals to fast-track emergency room dispatches.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block mb-1">Medication Allergies</span>
                <div className="font-semibold text-slate-200">Penicillin, Sulfa</div>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl">
                <span className="text-[10px] text-slate-500 font-bold block mb-1">Medical Conditions</span>
                <div className="font-semibold text-slate-200">Asthma (Inhaler equipped)</div>
              </div>
            </div>
          </div>

          {/* Section: Travel statistics summaries */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-blue-400" />
              <h4 className="font-bold text-sm text-white">Primary Geofence Coordinates</h4>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200 text-xs">Home Perimeter</div>
                  <div className="text-[10px] text-slate-500">Radius: 200m around Connaught Place</div>
                </div>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200 text-xs">Workplace Perimeter</div>
                  <div className="text-[10px] text-slate-500">Radius: 500m around Sector 62 Noida</div>
                </div>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default Profile;
