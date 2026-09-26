import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONSTITUENCY_INFO } from '../data/constituencyData';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-[#4A1317] text-[#FAF7F0] border-t-4 border-[#A67C3D] mt-16 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#6B1E23]">
          
          {/* MLA Office Info */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] p-0.5 bg-white overflow-hidden">
                <img 
                  src="ganiga_ravi_mla.png" 
                  alt="Ganiga Ravi" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-gazette font-bold text-lg text-[#F5E6BE]">
                  {lang === 'en' ? CONSTITUENCY_INFO.mlaNameEn : CONSTITUENCY_INFO.mlaNameKn}
                </h3>
                <p className="text-xs text-[#E2C799]">
                  {lang === 'en' ? CONSTITUENCY_INFO.mlaTitleEn : CONSTITUENCY_INFO.mlaTitleKn}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#EFEAD8] leading-relaxed mt-2">
              {t('mlaMessageText')}
            </p>
          </div>

          {/* Office Contact Info */}
          <div className="space-y-2 text-xs">
            <h4 className="font-gazette font-bold text-[#F5E6BE] text-sm uppercase tracking-wider mb-2 border-b border-[#A67C3D]/40 pb-1">
              {lang === 'en' ? "MLA Office Contact" : "ಶಾಸಕರ ಕಚೇರಿ ಸಂಪರ್ಕ"}
            </h4>

            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span className="text-[#FAF7F0]">
                {lang === 'en' ? CONSTITUENCY_INFO.officeAddressEn : CONSTITUENCY_INFO.officeAddressKn}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>{CONSTITUENCY_INFO.helpline}</span>
            </div>

            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>WhatsApp: {CONSTITUENCY_INFO.whatsapp}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>{CONSTITUENCY_INFO.email}</span>
            </div>
          </div>

          {/* Quick Links & Scope */}
          <div>
            <h4 className="font-gazette font-bold text-[#F5E6BE] text-sm uppercase tracking-wider mb-2 border-b border-[#A67C3D]/40 pb-1">
              {lang === 'en' ? "Constituency Scope" : "ಕ್ಷೇತ್ರದ ವ್ಯಾಪ್ತಿ"}
            </h4>

            <ul className="text-xs space-y-1.5 text-[#EFEAD8]">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>Kasaba Hobli (ಕಸಬಾ)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>Keragodu Hobli (ಕೆರಗೋಡು)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>Basaralu Hobli (ಬಸರಾಳು)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>Mandya City (೩೫ Wards)</span>
              </li>
            </ul>

            <div className="mt-4 pt-2 flex space-x-3 text-xs">
              <button onClick={() => setActiveTab('explorer')} className="text-[#D4AF37] hover:underline">
                {t('navExplorer')}
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('tracker')} className="text-[#D4AF37] hover:underline">
                {t('navWorkTracker')}
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('submit')} className="text-[#D4AF37] hover:underline">
                {t('navSubmitWork')}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#E2C799]">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>{t('footerRights')}</span>
          </div>
          <p className="mt-2 sm:mt-0 font-medium">
            © {new Date().getFullYear()} {t('footerMLAOffice')}
          </p>
        </div>
      </div>
    </footer>
  );
};
