import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const About: React.FC = () => {
  const navigate = useNavigate();

  const developers = [
    {
      name: "Developer Alpha",
      role: "Frontend Architect",
      responsibilities: "Responsible for routing, core UX components, styling, animations, dashboard layout, and integration of Maps APIs.",
      status: "Task: Complete UI/UX foundations"
    },
    {
      name: "Developer Beta",
      role: "AI & ML Specialist",
      responsibilities: "Responsible for voice trigger keywords models, accelerometer crash detection telemetry, and biometric sync API hooks.",
      status: "Task: Model optimization & Edge WebAssembly"
    },
    {
      name: "Developer Gamma",
      role: "Backend & Database Engineer",
      responsibilities: "Responsible for Express servers, WebSocket live coordinates broadasting, MongoDB schema models, and Twilio SMS APIs.",
      status: "Task: Node server boilerplate setup"
    }
  ];

  return (
    <div className="bg-brand-dark-950 text-slate-100 min-h-screen flex flex-col justify-between relative overflow-hidden grid-bg">
      <Navbar />

      {/* Decorative Orbs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-purple-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-blue-500/5 blur-[120px] pointer-events-none" />

      {/* Main Body */}
      <main className="max-w-5xl mx-auto w-full px-6 pt-32 pb-20 relative z-10 text-left space-y-16">
        
        {/* Breadcrumb back */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>

        {/* About Info Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple-500/10 border border-brand-purple-500/20 text-xs font-bold text-brand-purple-400">
            <Users className="w-4 h-4" />
            <span>Hackathon Team Core Draft</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Meet the SafeCircle AI Architect Team
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-3xl">
            This repository is structured under **Clean Architecture** guidelines so that a team of 3 developers can collaborate concurrently. Below is the project layout responsibilities split map.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developers.map((dev, i) => (
            <div key={i} className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-850 flex items-center justify-center font-bold text-brand-purple-400 text-base">
                  {dev.name.split(' ')[1]?.charAt(0) || 'D'}
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-base">{dev.name}</h3>
                  <p className="text-xs text-brand-blue-400 font-semibold">{dev.role}</p>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed">{dev.responsibilities}</p>
              </div>

              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-slate-950 text-[10px] font-mono text-slate-500 border border-slate-850">
                  <span className="font-bold text-brand-purple-400">Status:</span> {dev.status}
                </div>
                <div className="flex gap-3 text-slate-500">
                  <a href="#github" className="hover:text-white transition-colors" title="GitHub">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                  <a href="#linkedin" className="hover:text-white transition-colors" title="LinkedIn">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#mail" className="hover:text-white transition-colors" title="Mail"><Mail className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Goals Section */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Starter Kit Project Blueprint</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The frontend leverages React, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons. Folder separation ensures Developer Alpha can push UI designs without blocking Developer Beta's local AI model compiles (Voice Assistant/Biometrics) or Developer Gamma's database routes configurations under the `/server` directory.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
};
export default About;
