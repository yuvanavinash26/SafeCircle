import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  Volume2, 
  Activity, 
  PhoneCall, 
  Lock, 
  Brain,
  HelpCircle,
  Eye,
  CheckCircle2,
  Users,
  Award,
  Zap,
  ChevronDown
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import FloatingSOSButton from '../components/FloatingSOSButton';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      title: "One-Tap SOS Dispatch",
      description: "Instantly alert close contacts, local emergency police services, and regional nodal safety centres in under 5 seconds.",
      icon: Shield,
      badge: "Critical"
    },
    {
      title: "AI Voice Panic Assistant",
      description: "Passive acoustic listener triggers security broadcasts on detection of whispered emergency phrases, even in sleep mode.",
      icon: Volume2,
      badge: "AI Powered"
    },
    {
      title: "Live Safety Map Tracking",
      description: "View real-time, crowd-sourced safety scoring indices of local neighborhoods, lanes, and cities across metropolitan India.",
      icon: MapPin,
      badge: "Realtime"
    },
    {
      title: "AI Biometric Panic Monitor",
      description: "Detects sudden heart-rate escalations or abrupt G-force deceleration impact anomalies suggesting potential fall risks.",
      icon: Activity,
      badge: "Hardware Sync"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Build Your Circle",
      description: "Setup designated family members and police contacts in your Emergency Guardian pool."
    },
    {
      step: "02",
      title: "Activate AI Listeners",
      description: "Select custom vocal keywords and biometric panic triggers tailored to your devices."
    },
    {
      step: "03",
      title: "Stay Connected & Protected",
      description: "Gain live, real-time geofence tracking and localized safety index maps on your commutes."
    }
  ];

  const stats = [
    { value: "4.8s", label: "Average Response Time" },
    { value: "10K+", label: "Commuters Guided Daily" },
    { value: "98.7%", label: "GPS Nodal Accuracy" },
    { value: "100%", label: "Encrypted Data Transmission" }
  ];

  const futureConcepts = [
    { title: "Smart Glasses HUD Integration", desc: "Project safe routes directly on smart glasses lens overlays." },
    { title: "Wearable IoT Emergency Bands", desc: "Physical alert button wristbands for offline satellite coordinate sync." },
    { title: "Drone Emergency Assistance", desc: "Autonomously dispatch local emergency tracking drone nodes." }
  ];

  const testimonials = [
    {
      quote: "SafeCircle AI gives me absolute peace of mind during late-night commutes back home from office. The voice trigger feature is a lifesaver.",
      author: "Aditi Rao",
      role: "Software Engineer, Bengaluru"
    },
    {
      quote: "The live safety map score is incredibly accurate. It helped our family map safer jogging routes around our colony in South Delhi.",
      author: "Vikram Malhotra",
      role: "Resident association coordinator, Delhi"
    }
  ];

  const faqs = [
    {
      q: "Does SafeCircle AI require a continuous internet connection?",
      a: "No. The system uses compressed local databases for offline map scores and triggers SMS coordinates directly over cellular band frequencies when internet is unavailable."
    },
    {
      q: "How does the AI Voice Assistant protect my privacy?",
      a: "All voice analysis is processed directly on your local device (Edge AI model). No recording streams are sent to external cloud servers unless an SOS alert is active."
    },
    {
      q: "Can this integrate with local emergency helplines in India?",
      a: "Yes. SafeCircle connects to national portals (112, 1091 Women Helpline) to dispatch automated coordinates and alert regional nodal police officers."
    }
  ];

  return (
    <div className="bg-brand-dark-950 text-slate-100 min-h-screen relative overflow-hidden grid-bg">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Grid Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-purple-400">Core Capabilities</span>
          <h2 className="text-3xl md:text-5xl font-black text-white">Equipped with Smart Guard Systems</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Explore state-of-the-art safety protocols designed to keep you and your circle connected, no matter where you travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFeatures.map((feat, i) => (
            <FeatureCard 
              key={i} 
              title={feat.title} 
              description={feat.description} 
              icon={feat.icon} 
              badge={feat.badge} 
            />
          ))}
        </div>
      </section>

      {/* How it Works Timeline Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-950/40 border-y border-slate-900 max-w-full text-center relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-blue-400">Process Flow</span>
            <h2 className="text-3xl md:text-5xl font-black text-white">How SafeCircle Protects You</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Get set up in less than 3 minutes. Easy configuration, built for swift action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => (
              <div key={i} className="p-6 rounded-2xl glass-panel text-left space-y-4 relative">
                <div className="text-4xl font-black text-brand-purple-500/30 font-mono absolute top-4 right-6">
                  {step.step}
                </div>
                <div className="w-10 h-10 rounded-lg bg-brand-purple-500/10 border border-brand-purple-500/20 flex items-center justify-center text-brand-purple-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 glass-panel rounded-2xl border border-white/5 space-y-2">
              <div className="text-3xl md:text-5xl font-black gradient-text-blue-purple">{stat.value}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-950/40 border-y border-slate-900 max-w-full text-center relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-purple-400">Roadmap Vision</span>
            <h2 className="text-3xl md:text-5xl font-black text-white">Future Safety Integration Concepts</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Our continuous research works to unify decentralized hardware, IoT, and AI smart drones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {futureConcepts.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl glass-panel border border-slate-800 text-left space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center text-brand-blue-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-4 mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-blue-400">User Reviews</span>
          <h2 className="text-3xl md:text-5xl font-black text-white">Loved by Thousands of Circles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((test, i) => (
            <div key={i} className="p-6 rounded-2xl glass-panel border border-white/5 text-left flex flex-col justify-between space-y-4 relative">
              <div className="text-4xl text-slate-700 font-serif absolute top-4 right-6 font-black">&ldquo;</div>
              <p className="text-sm text-slate-300 italic leading-relaxed relative z-10">&ldquo;{test.quote}&rdquo;</p>
              <div>
                <div className="font-bold text-white text-sm">{test.author}</div>
                <div className="text-[10px] text-slate-400">{test.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-950/40 border-y border-slate-900 max-w-full text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-purple-400">Common Questions</span>
            <h2 className="text-3xl md:text-5xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-2">
                <div className="flex gap-2 items-center text-sm font-bold text-white">
                  <HelpCircle className="w-4 h-4 text-brand-blue-400 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating emergency trigger persistent on Landing page */}
      <FloatingSOSButton />

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default LandingPage;
