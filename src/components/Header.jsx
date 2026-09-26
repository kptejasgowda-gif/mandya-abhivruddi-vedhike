import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  BarChart3, 
  PlusCircle, 
  ShieldCheck, 
  Globe, 
  UserCheck, 
  LogOut, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

export const Header = ({ activeTab, setActiveTab }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { user, role, isLoggedIn, logout, setIsLoginModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Building2 },
    { id: 'explorer', label: t('navExplorer'), icon: MapPin },
    { id: 'tracker', label: t('navWorkTracker'), icon: BarChart3 },
    { id: 'submit', label: t('navSubmitWork'), icon: PlusCircle },
    { id: 'admin', label: t('navAdminQueue'), icon: ShieldCheck, adminOnly: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#6B1E23] text-white border-b-4 border-[#A67C3D] gazette-header-shadow">
      {/* Top Gazette Announcement Bar */}
      <div className="bg-[#4A1317] border-b border-[#8E2B32] text-xs py-1 px-4 text-[#F4EFE2] flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="font-medium">
            {lang === 'en' 
              ? "Official Mandya Constituency Development Tracking Portal"
              : "ಮಂಡ್ಯ ಕ್ಷೇತ್ರ ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗಳ ಅಧಿಕೃತ ಮಾಹಿತಿಗೂಡ"}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Role Status Indicator */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-[#6B1E23] px-2.5 py-0.5 rounded text-[11px] border border-[#A67C3D]/40">
            <UserCheck className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-[#FAF7F0] font-medium">
              {role === 'admin' ? t('adminRole') : role === 'leader' ? t('leaderRole') : t('guestRole')}
            </span>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            id="lang-toggle-btn"
            className="flex items-center space-x-1 bg-[#A67C3D] hover:bg-[#B88D4E] text-[#FFFDF7] px-2.5 py-0.5 rounded text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Switch Language / ಭಾಷೆ ಬದಲಾಯಿಸಿ"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}</span>
          </button>
        </div>
      </div>

      {/* Main Gazette Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand & MLA Identity */}
        <div 
          className="flex items-center space-x-3.5 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          {/* MLA Profile Image Badge */}
          <div className="relative">
            <div className="w-13 h-13 rounded-full border-2 border-[#D4AF37] p-0.5 bg-[#FAF7F0] shadow-md overflow-hidden flex-shrink-0">
              <img 
                src="ganiga_ravi_mla.png" 
                alt="Ravikumar Gowda (Ganiga Ravi)"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#A67C3D] text-[#FFFDF7] p-0.5 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide font-gazette text-[#FFFDF7] group-hover:text-[#F5E6BE] transition-colors">
              {t('appTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#E2C799] font-medium tracking-normal mt-0.5">
              {t('appSubtitle')}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#A67C3D] text-[#FFFDF7] shadow-inner font-semibold border-b-2 border-white'
                    : 'text-[#FAF7F0] hover:bg-[#8E2B32] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E2C799]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Auth Button */}
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 ml-2 px-3 py-1.5 rounded bg-[#4A1317] hover:bg-[#360B0E] text-[#F4EFE2] border border-[#A67C3D]/50 text-xs font-semibold transition"
            >
              <LogOut className="w-3.5 h-3.5 text-[#E2C799]" />
              <span>{t('logoutButton')}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center space-x-1.5 ml-2 px-3.5 py-2 rounded-md bg-[#A67C3D] hover:bg-[#B88D4E] text-[#FFFDF7] text-xs font-bold transition shadow"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('loginButton')}</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-[#FAF7F0] hover:bg-[#8E2B32] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#4A1317] border-t border-[#8E2B32] px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive ? 'bg-[#A67C3D] text-white font-bold' : 'text-[#FAF7F0] hover:bg-[#6B1E23]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#E2C799]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#8E2B32]">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded bg-[#6B1E23] text-white text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('logoutButton')} ({user.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded bg-[#A67C3D] text-white text-sm font-bold"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t('loginButton')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
