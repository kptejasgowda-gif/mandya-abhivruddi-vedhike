import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, MapPin, Phone, Mail, CheckCircle2, Clock, FileText, IndianRupee, ShieldCheck } from 'lucide-react';
import { HOBLIS_AND_CITY } from '../data/constituencyData';

export const VillageDetailModal = ({ locationId, areaId, works, onClose }) => {
  const { lang, t } = useLanguage();

  if (!locationId || !areaId) return null;

  // Find area and location
  const area = HOBLIS_AND_CITY.find(a => a.id === areaId);
  const location = area ? area.locations.find(l => l.id === locationId) : null;
  const leader = area ? area.leader : null;

  // Filter works for this specific village/ward
  const locationWorks = works.filter(w => w.locationId === locationId || w.locationNameEn.toLowerCase().includes(location?.nameEn.toLowerCase() || ''));

  const statusBadges = {
    "Reported": "bg-amber-100 text-amber-900 border-amber-400",
    "Approved": "bg-blue-100 text-blue-900 border-blue-400",
    "In Progress": "bg-purple-100 text-purple-900 border-purple-400",
    "Completed": "bg-emerald-100 text-emerald-900 border-emerald-400"
  };

  const statusTranslations = {
    "Reported": t('statusReported'),
    "Approved": t('statusApproved'),
    "In Progress": t('statusInProgress'),
    "Completed": t('statusCompleted')
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#6B1E23] text-white p-4 flex justify-between items-center border-b-2 border-[#A67C3D] flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#A67C3D] rounded-md">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs text-[#E2C799] uppercase font-semibold">
                {lang === 'en' ? area?.nameEn : area?.nameKn}
              </span>
              <h3 className="font-gazette font-bold text-xl text-[#FFFDF7]">
                {lang === 'en' ? location?.nameEn : location?.nameKn}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#FAF7F0] hover:text-[#D4AF37] p-1.5 rounded-md hover:bg-[#8E2B32] transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Leader Card */}
          {leader && (
            <div className="bg-[#FAF7F0] border border-[#A67C3D]/40 rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-16 h-16 rounded-full border-2 border-[#A67C3D] overflow-hidden flex-shrink-0 bg-white shadow-sm">
                <img src={leader.avatar} alt={leader.nameEn} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A67C3D] bg-[#FFF8E7] px-2 py-0.5 rounded border border-[#A67C3D]/30 inline-block mb-1">
                  {t('leaderAssigned')}
                </span>
                <h4 className="font-gazette font-bold text-base text-[#6B1E23]">
                  {lang === 'en' ? leader.nameEn : leader.nameKn}
                </h4>
                <p className="text-xs text-[#6B1E23]/80 font-medium">
                  {lang === 'en' ? leader.roleEn : leader.roleKn}
                </p>

                <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-[#2D2319]">
                  <a href={`tel:${leader.phone}`} className="flex items-center space-x-1 text-[#6B1E23] hover:underline font-semibold">
                    <Phone className="w-3.5 h-3.5 text-[#A67C3D]" />
                    <span>{leader.phone}</span>
                  </a>
                  <span className="text-gray-300">•</span>
                  <a href={`mailto:${leader.email}`} className="flex items-center space-x-1 text-[#6B1E23] hover:underline">
                    <Mail className="w-3.5 h-3.5 text-[#A67C3D]" />
                    <span>{leader.email}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Works Section Header */}
          <div>
            <div className="flex justify-between items-center mb-3 border-b border-[#A67C3D]/30 pb-2">
              <h4 className="font-gazette font-bold text-lg text-[#6B1E23] flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#A67C3D]" />
                <span>{t('workItemsForLocation')}</span>
              </h4>
              <span className="text-xs font-bold bg-[#6B1E23] text-white px-2.5 py-0.5 rounded-full">
                {locationWorks.length} {t('workItemsText')}
              </span>
            </div>

            {locationWorks.length === 0 ? (
              <div className="text-center py-10 bg-[#FAF7F0] rounded-xl border border-dashed border-[#A67C3D]/40">
                <FileText className="w-10 h-10 text-[#A67C3D]/40 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">
                  {t('noWorksFoundLocation')}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {locationWorks.map(work => (
                  <div 
                    key={work.id}
                    className="bg-white border-2 border-[#EFEAD8] hover:border-[#A67C3D] rounded-xl p-4 shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold bg-[#6B1E23]/10 text-[#6B1E23] px-2 py-0.5 rounded border border-[#6B1E23]/20">
                          {work.id}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {lang === 'en' ? work.categoryEn : work.categoryKn}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-xs inline-flex items-center space-x-1 ${statusBadges[work.status] || 'bg-gray-100'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{statusTranslations[work.status] || work.status}</span>
                      </span>
                    </div>

                    <h5 className="font-gazette font-bold text-base text-[#2D2319] mb-1.5">
                      {lang === 'en' ? work.titleEn : work.titleKn}
                    </h5>

                    <p className="text-xs text-gray-700 leading-relaxed mb-3">
                      {lang === 'en' ? work.descriptionEn : work.descriptionKn}
                    </p>

                    {/* Metadata strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="w-3.5 h-3.5 text-[#A67C3D]" />
                        <span className="font-bold text-[#6B1E23]">{work.budget}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#A67C3D]" />
                        <span>{lang === 'en' ? "Updated:" : "ನವೀಕರಣ:"} {work.lastUpdated}</span>
                      </div>

                      <div className="flex items-center space-x-1 text-right sm:justify-end">
                        <span className="text-[11px] text-gray-500">
                          {lang === 'en' ? "By:" : "ವರದಿ ಮಾಡಿದವರು:"} {lang === 'en' ? work.reportedByEn : work.reportedByKn}
                        </span>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    {work.adminNotesEn && (
                      <div className="mt-3 p-2.5 bg-[#FFF8E7] border-l-3 border-[#A67C3D] rounded text-xs text-[#5C4116]">
                        <span className="font-bold block mb-0.5 flex items-center space-x-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#A67C3D]" />
                          <span>{lang === 'en' ? "MLA Office Progress Note:" : "ಶಾಸಕರ ಕಚೇರಿಯ ನವೀಕರಣ:"}</span>
                        </span>
                        <span>{lang === 'en' ? work.adminNotesEn : work.adminNotesKn}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF7F0] p-4 border-t border-[#A67C3D]/30 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#6B1E23] hover:bg-[#8E2B32] text-white text-xs font-bold rounded-lg transition"
          >
            {lang === 'en' ? "Close View" : "ಮುಚ್ಚಿ"}
          </button>
        </div>

      </div>
    </div>
  );
};
