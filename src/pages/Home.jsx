import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONSTITUENCY_INFO, HOBLIS_AND_CITY } from '../data/constituencyData';
import mlaPhoto from '../assets/ganiga_ravi_mla.png';
import { 
  Building2, 
  MapPin, 
  BarChart3, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  UserCheck, 
  IndianRupee,
  Award
} from 'lucide-react';

export const Home = ({ setActiveTab, works, onSelectLocation }) => {
  const { lang, t } = useLanguage();

  // Statistics calculation
  const totalWorks = works.length;
  const completedWorks = works.filter(w => w.status === 'Completed').length;
  const inProgressWorks = works.filter(w => w.status === 'In Progress').length;
  const pendingWorks = works.filter(w => w.status === 'Reported' || w.status === 'Approved').length;

  const recentWorks = [...works].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)).slice(0, 4);

  return (
    <div className="space-y-12 animate-fade-in pb-10">
      
      {/* Gazette Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#4A1317] via-[#6B1E23] to-[#360B0E] text-white rounded-2xl border-2 border-[#A67C3D] overflow-hidden shadow-2xl p-6 sm:p-10">
        {/* Background Decorative Pattern */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#A67C3D]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text & CTAs */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[#A67C3D]/30 border border-[#D4AF37]/50 px-3 py-1 rounded-full text-xs font-semibold text-[#F5E6BE]">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {lang === 'en' ? "Office of MLA Ravikumar Gowda (Ganiga Ravi)" : "ಶಾಸಕ ರವಿ ಕುಮಾರ್ ಗೌಡ (ಗಣಿಗ ರವಿ) ಅವರ ಕಚೇರಿ"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-gazette text-[#FFFDF7] leading-tight">
              {t('heroHeadline')}
            </h2>

            <p className="text-sm sm:text-base text-[#EFEAD8] max-w-2xl leading-relaxed">
              {t('heroSubheadline')}
            </p>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('explorer')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#A67C3D] hover:bg-[#B88D4E] text-white font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-lg border border-[#D4AF37] cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('exploreAreasCTA')}</span>
              </button>

              <button
                onClick={() => setActiveTab('tracker')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#FFFDF7] hover:bg-[#F4EFE2] text-[#6B1E23] font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-lg cursor-pointer"
              >
                <BarChart3 className="w-4 h-4" />
                <span>{t('trackWorksCTA')}</span>
              </button>

              <button
                onClick={() => setActiveTab('submit')}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#4A1317] hover:bg-[#360B0E] text-[#F5E6BE] font-bold text-xs sm:text-sm transition-transform active:scale-95 border border-[#A67C3D]/60 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('submitWorkCTA')}</span>
              </button>
            </div>
          </div>

          {/* MLA Profile Gazette Seal */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative">
              {/* Gold Ornament Ring */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full border-4 border-[#D4AF37] p-1 bg-gradient-to-tr from-[#A67C3D] to-[#FAF7F0] shadow-2xl flex items-center justify-center">
                <img 
                  src={mlaPhoto} 
                  alt="Ravikumar Gowda (Ganiga Ravi), MLA"
                  className="w-full h-full object-cover rounded-full shadow-inner"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#6B1E23] text-[#F5E6BE] text-center px-4 py-1 rounded-full border-2 border-[#D4AF37] text-xs font-bold whitespace-nowrap shadow-md">
                {lang === 'en' ? "Ravikumar Gowda (Ganiga Ravi)" : "ರವಿ ಕುಮಾರ್ ಗೌಡ (ಗಣಿಗ ರವಿ)"}
              </div>
            </div>
            <p className="text-center text-xs text-[#E2C799] mt-5 font-semibold">
              {lang === 'en' ? "MLA, Mandya Constituency" : "ಶಾಸಕರು, ಮಂಡ್ಯ ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ"}
            </p>
          </div>

        </div>
      </section>

      {/* Gazette Statistics Bar */}
      <section className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl p-6 shadow-md">
        <h3 className="font-gazette text-center text-[#6B1E23] font-bold text-sm uppercase tracking-wider mb-6 pb-2 border-b border-[#A67C3D]/30">
          {lang === 'en' ? "Mandya Constituency Governance Overview" : "ಮಂಡ್ಯ ಕ್ಷೇತ್ರದ ಆಡಳಿತ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ಅವಲೋಕನ"}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          
          {/* Taluk */}
          <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#A67C3D]/30 text-center">
            <Building2 className="w-5 h-5 text-[#6B1E23] mx-auto mb-1" />
            <span className="text-base font-extrabold text-[#6B1E23] block">1</span>
            <span className="text-[11px] font-semibold text-[#A67C3D] uppercase">{t('statTaluk')}</span>
          </div>

          {/* Hoblis */}
          <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#A67C3D]/30 text-center">
            <Layers className="w-5 h-5 text-[#6B1E23] mx-auto mb-1" />
            <span className="text-base font-extrabold text-[#6B1E23] block">3 + 1</span>
            <span className="text-[11px] font-semibold text-[#A67C3D] uppercase">{t('statHoblis')}</span>
          </div>

          {/* Wards */}
          <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#A67C3D]/30 text-center">
            <MapPin className="w-5 h-5 text-[#6B1E23] mx-auto mb-1" />
            <span className="text-base font-extrabold text-[#6B1E23] block">35</span>
            <span className="text-[11px] font-semibold text-[#A67C3D] uppercase">{t('statWards')}</span>
          </div>

          {/* Total Works */}
          <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#A67C3D]/30 text-center">
            <BarChart3 className="w-5 h-5 text-[#6B1E23] mx-auto mb-1" />
            <span className="text-xl font-black text-[#6B1E23] block">{totalWorks}</span>
            <span className="text-[11px] font-semibold text-gray-700 uppercase">{t('statTotalWorks')}</span>
          </div>

          {/* Completed */}
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <span className="text-xl font-black text-emerald-800 block">{completedWorks}</span>
            <span className="text-[11px] font-semibold text-emerald-800 uppercase">{t('statCompletedWorks')}</span>
          </div>

          {/* In Progress */}
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
            <Clock className="w-5 h-5 text-purple-700 mx-auto mb-1" />
            <span className="text-xl font-black text-purple-800 block">{inProgressWorks}</span>
            <span className="text-[11px] font-semibold text-purple-800 uppercase">{t('statInProgressWorks')}</span>
          </div>

          {/* Pending */}
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-center col-span-2 sm:col-span-1">
            <Clock className="w-5 h-5 text-amber-700 mx-auto mb-1" />
            <span className="text-xl font-black text-amber-800 block">{pendingWorks}</span>
            <span className="text-[11px] font-semibold text-amber-800 uppercase">{t('statPendingWorks')}</span>
          </div>

        </div>
      </section>

      {/* Hobli & City Leadership Cards */}
      <section className="space-y-4">
        <div className="flex justify-between items-end border-b-2 border-[#A67C3D] pb-2">
          <div>
            <h3 className="font-gazette text-xl font-bold text-[#6B1E23]">
              {lang === 'en' ? "Hobli & City Coordinators" : "ಹೋಬಳಿ ಮತ್ತು ನಗರ ಸಂಯೋಜಕರು"}
            </h3>
            <p className="text-xs text-gray-600">
              {lang === 'en' ? "Dedicated area leaders responsible for local work requests and field supervision" : "ಕ್ಷೇತ್ರ ಕಾಮಗಾರಿಗಳ ಉಸ್ತುವಾರಿ ವಹಿಸಿಕೊಂಡಿರುವ ನಿಯೋಜಿತ ಹೋಬಳಿ ನಾಯಕರು"}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('explorer')}
            className="text-xs font-bold text-[#A67C3D] hover:text-[#6B1E23] flex items-center space-x-1"
          >
            <span>{t('exploreAreasCTA')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOBLIS_AND_CITY.map(area => (
            <div 
              key={area.id}
              className="bg-[#FFFDF7] border-2 border-[#EFEAD8] hover:border-[#A67C3D] rounded-xl p-4 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={area.leader.avatar} 
                  alt={area.leader.nameEn}
                  className="w-12 h-12 rounded-full border border-[#A67C3D] object-cover"
                />
                <div>
                  <h4 className="font-gazette font-bold text-sm text-[#6B1E23] group-hover:text-[#A67C3D] transition-colors">
                    {lang === 'en' ? area.leader.nameEn : area.leader.nameKn}
                  </h4>
                  <p className="text-[11px] text-[#A67C3D] font-semibold">
                    {lang === 'en' ? area.nameEn : area.nameKn}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1 bg-[#FAF7F0] p-2.5 rounded border border-[#A67C3D]/20 mb-3">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? "Locations:" : "ಸ್ಥಳಗಳು:"}</span>
                  <span className="font-bold text-[#6B1E23]">{area.locations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? "Phone:" : "ದೂರವಾಣಿ:"}</span>
                  <a href={`tel:${area.leader.phone}`} className="font-semibold text-[#6B1E23] hover:underline">
                    {area.leader.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('explorer')}
                className="w-full py-1.5 bg-[#FAF7F0] hover:bg-[#6B1E23] hover:text-white text-[#6B1E23] text-xs font-bold rounded border border-[#A67C3D]/40 transition text-center cursor-pointer"
              >
                {lang === 'en' ? `Explore ${area.nameEn}` : `${area.nameKn} ವೀಕ್ಷಿಸಿ`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Constituency Highlights */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b-2 border-[#A67C3D] pb-2">
          <h3 className="font-gazette text-xl font-bold text-[#6B1E23] flex items-center space-x-2">
            <Clock className="w-5 h-5 text-[#A67C3D]" />
            <span>{t('recentHighlightsTitle')}</span>
          </h3>

          <button
            onClick={() => setActiveTab('tracker')}
            className="text-xs font-bold text-[#6B1E23] hover:text-[#A67C3D] transition flex items-center space-x-1"
          >
            <span>{t('viewAllWorks')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentWorks.map(work => (
            <div 
              key={work.id}
              className="bg-white border-2 border-[#EFEAD8] hover:border-[#A67C3D] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-mono font-bold bg-[#6B1E23] text-white px-2 py-0.5 rounded">
                    {work.id}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    work.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    work.status === 'In Progress' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                    'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {work.status}
                  </span>
                </div>

                <h4 className="font-gazette font-bold text-base text-[#2D2319] mb-1">
                  {lang === 'en' ? work.titleEn : work.titleKn}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                  {lang === 'en' ? work.descriptionEn : work.descriptionKn}
                </p>

                <div className="flex items-center space-x-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span className="font-semibold text-[#6B1E23]">{work.locationNameEn}</span>
                  <span>•</span>
                  <span className="text-[#A67C3D] font-bold">{work.budget}</span>
                </div>
              </div>

              <div className="bg-[#FAF7F0] px-4 py-2 border-t border-[#EFEAD8] flex justify-between items-center text-[11px]">
                <span className="text-gray-500">
                  {lang === 'en' ? "Updated:" : "ನವೀಕರಣ:"} {work.lastUpdated}
                </span>
                <button
                  onClick={() => onSelectLocation(work.locationId, work.areaId)}
                  className="text-[#6B1E23] font-bold hover:underline cursor-pointer"
                >
                  {t('viewVillageDetails')} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
