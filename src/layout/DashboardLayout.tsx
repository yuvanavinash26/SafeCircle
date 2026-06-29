import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  Route, 
  Phone, 
  Volume2, 
  Activity, 
  BarChart3, 
  User, 
  Settings, 
  Bell, 
  Menu, 
  X, 
  LogOut,
  AlertTriangle,
  Info,
  PhoneCall,
  InfoIcon,
  LayoutGrid
} from 'lucide-react';
import { mockNotifications } from '../mock/dummyData';

export const DashboardLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Overview Console', path: '/dashboard', icon: LayoutGrid, color: 'text-brand-purple-400' },
    { name: 'SOS Dashboard', path: '/dashboard/sos', icon: Shield, color: 'text-brand-red-500' },
    { name: 'Live Map', path: '/dashboard/map', icon: MapPin, color: 'text-brand-blue-500' },
    { name: 'Safe Route Planner', path: '/dashboard/route', icon: Route, color: 'text-teal-400' },
    { name: 'Emergency Contacts', path: '/dashboard/contacts', icon: Phone, color: 'text-emerald-400' },
    { name: 'Fake Call Simulator', path: '/dashboard/fake-call', icon: PhoneCall, color: 'text-amber-400' },
    { name: 'Voice Assistant', path: '/dashboard/voice', icon: Volume2, color: 'text-brand-purple-400' },
    { name: 'AI Panic Detection', path: '/dashboard/panic', icon: Activity, color: 'text-pink-500' },
    { name: 'Safety Analytics', path: '/dashboard/analytics', icon: BarChart3, color: 'text-indigo-400' },
  ];

  const secondaryMenuItems = [
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getPageTitle = () => {
    const allItems = [...menuItems, ...secondaryMenuItems];
    const current = allItems.find(item => item.path === location.pathname);
    return current ? current.name : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-brand-dark-950 text-slate-100 flex relative overflow-hidden grid-bg">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 glass-panel border-r border-slate-800/80 sticky top-0 h-screen z-20">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="p-2 rounded-lg bg-gradient-to-br from-brand-blue-500 to-brand-purple-600 shadow-md">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              SafeCircle <span className="text-xs bg-brand-red-500/20 text-brand-red-400 px-1.5 py-0.5 rounded font-mono font-bold border border-brand-red-500/30">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">India Safety Companion</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">Safety Suite</div>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-brand-purple-600/20 to-brand-blue-500/10 border border-brand-purple-500/30 text-white font-medium shadow-md shadow-brand-purple-500/5'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 border border-transparent'
                }`
              }
            >
              <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105`} />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="h-px bg-slate-800/80 my-4" />
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">Preferences</div>

          {secondaryMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-slate-800/50 to-slate-800/30 border border-slate-700/60 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 border border-transparent'
                }`
              }
            >
              <item.icon className="w-5 h-5 group-hover:scale-105" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer / Log out */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/20">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-400 hover:text-brand-red-400 hover:bg-brand-red-500/10 rounded-xl transition-all border border-transparent"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Top Header / Navigation Bar */}
        <header className="sticky top-0 z-10 glass-panel border-b border-slate-800/80 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button 
              className="lg:hidden p-2 rounded-lg bg-slate-800/60 border border-slate-700 hover:bg-slate-800 text-white transition-colors"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {getPageTitle()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            {/* Quick Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red-500/10 border border-brand-red-500/30 text-xs font-semibold text-brand-red-400 animate-pulse-slow">
              <span className="w-2 h-2 rounded-full bg-brand-red-500 animate-ping-slow" />
              AI Guard Active
            </div>

            {/* Notification Icon and Trigger */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2.5 rounded-xl border transition-all relative ${
                  showNotifications 
                    ? 'bg-brand-purple-600/20 border-brand-purple-500 text-white' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-brand-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-brand-dark-950 animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Container */}
              <AnimatePresence>
                {showNotifications && (
                  <>
                    {/* Overlay to click off */}
                    <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-80 glass-panel border border-slate-800 rounded-2xl shadow-xl z-40 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                        <h3 className="font-semibold text-sm text-white">Live Notifications</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-xs text-brand-purple-400 hover:text-brand-purple-300 transition-colors font-medium">
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-800/60">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-500 text-sm">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id} 
                              className={`p-4 flex gap-3 transition-colors ${notif.isRead ? 'bg-transparent' : 'bg-brand-purple-600/5'}`}
                            >
                              <div className="mt-0.5">
                                {notif.type === 'alert' ? (
                                  <AlertTriangle className="w-5 h-5 text-brand-red-500" />
                                ) : notif.type === 'success' ? (
                                  <Shield className="w-5 h-5 text-emerald-400" />
                                ) : (
                                  <Info className="w-5 h-5 text-brand-blue-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className={`text-xs font-bold text-slate-200 ${!notif.isRead && 'text-white'}`}>{notif.title}</h4>
                                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{notif.description}</p>
                                <span className="text-[9px] text-slate-500 mt-1 block">{notif.timestamp}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar trigger */}
            <button 
              onClick={() => navigate('/dashboard/profile')}
              className="w-10 h-10 rounded-xl overflow-hidden border border-slate-800 hover:border-brand-purple-500 transition-all shadow-inner"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
                alt="Profile Avatar"
                className="w-full h-full object-cover" 
              />
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Navigation (Slide-in) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 glass-panel border-r border-slate-800 z-50 flex flex-col lg:hidden"
            >
              {/* Brand Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-brand-blue-500 to-brand-purple-600">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1">
                      SafeCircle <span className="text-[10px] bg-brand-red-500/20 text-brand-red-400 px-1 py-0.5 rounded font-mono font-bold">AI</span>
                    </h1>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                        isActive 
                          ? 'bg-brand-purple-600/20 border border-brand-purple-500/30 text-white font-medium'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 border border-transparent'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}

                <div className="h-px bg-slate-800 my-4" />

                {secondaryMenuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                        isActive 
                          ? 'bg-slate-800/60 border border-slate-700 text-white font-medium'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30 border border-transparent'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-800">
                <button 
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate('/');
                  }} 
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-400 hover:text-brand-red-400 hover:bg-brand-red-500/10 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium text-sm">Exit Dashboard</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
