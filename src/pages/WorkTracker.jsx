import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HOBLIS_AND_CITY } from '../data/constituencyData';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  IndianRupee, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  ArrowUpDown,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const WorkTracker = ({ works, onSelectLocation }) => {
  const { lang, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest | oldest | budget

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

  // Filter and Sort logic
  const filteredWorks = useMemo(() => {
    return works.filter(work => {
      // Area Filter
      if (selectedArea !== 'all' && work.areaId !== selectedArea) {
        return false;
      }
      // Status Filter
      if (selectedStatus !== 'all' && work.status !== selectedStatus) {
        return false;
      }
      // Category Filter
      if (selectedCategory !== 'all' && work.category !== selectedCategory) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = (work.titleEn || '').toLowerCase().includes(query) || (work.titleKn || '').toLowerCase().includes(query);
        const matchLoc = (work.locationNameEn || '').toLowerCase().includes(query) || (work.locationNameKn || '').toLowerCase().includes(query);
        const matchId = (work.id || '').toLowerCase().includes(query);
        const matchDesc = (work.descriptionEn || '').toLowerCase().includes(query) || (work.descriptionKn || '').toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchId && !matchDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      } else if (sortBy === 'oldest') {
        return new Date(a.lastUpdated) - new Date(b.lastUpdated);
      } else if (sortBy === 'budget') {
        const getBudgetNum = str => parseInt((str || '0').replace(/[^0-9]/g, '')) || 0;
        return getBudgetNum(b.budget) - getBudgetNum(a.budget);
      }
      return 0;
    });
  }, [works, searchQuery, selectedArea, selectedStatus, selectedCategory, sortBy]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Page Header */}
      <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#A67C3D] text-xs font-bold uppercase tracking-wider mb-1">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Mandya Constituency Live Database</span>
            </div>
            <h2 className="text-2xl font-black font-gazette text-[#6B1E23]">
              {t('trackerTitle')}
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-2xl">
              {t('trackerSubtitle')}
            </p>
          </div>

          <div className="bg-[#FAF7F0] border border-[#A67C3D]/40 px-4 py-2 rounded-xl text-center">
            <span className="text-xs text-gray-500 font-medium block">{t('showingWorks')}</span>
            <span className="text-xl font-black text-[#6B1E23]">
              {filteredWorks.length} <span className="text-xs font-normal text-gray-600">/ {works.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Filter Bar */}
      <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl p-4 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-[#A67C3D] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchWorksPlaceholder')}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
            />
          </div>

          {/* Area Filter */}
          <div>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
            >
              <option value="all">{t('filterByArea')}</option>
              {HOBLIS_AND_CITY.map(h => (
                <option key={h.id} value={h.id}>
                  {lang === 'en' ? h.nameEn : h.nameKn}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
            >
              <option value="all">{t('filterByStatus')}</option>
              <option value="Reported">{t('statusReported')}</option>
              <option value="Approved">{t('statusApproved')}</option>
              <option value="In Progress">{t('statusInProgress')}</option>
              <option value="Completed">{t('statusCompleted')}</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-[#A67C3D] bg-[#FFF8E7] text-[#6B1E23] font-bold focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
            >
              <option value="newest">{t('sortNewest')}</option>
              <option value="oldest">{t('sortOldest')}</option>
              <option value="budget">{t('sortHighestBudget')}</option>
            </select>
          </div>

        </div>
      </div>

      {/* Works Data Grid / Table */}
      {filteredWorks.length === 0 ? (
        <div className="bg-[#FFFDF7] border-2 border-dashed border-[#A67C3D]/40 rounded-2xl py-16 text-center shadow-xs">
          <AlertCircle className="w-12 h-12 text-[#A67C3D]/40 mx-auto mb-3" />
          <h3 className="font-gazette font-bold text-base text-[#6B1E23]">
            {t('noWorksFoundTracker')}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'en' ? "Try adjusting your search keywords or resetting status filters." : "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಸರಿಹೊಂದಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedArea('all');
              setSelectedStatus('all');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-[#6B1E23] text-white text-xs font-bold rounded-lg hover:bg-[#8E2B32] transition"
          >
            {lang === 'en' ? "Reset All Filters" : "ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ"}
          </button>
        </div>
      ) : (
        <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#6B1E23] text-white text-xs font-gazette uppercase tracking-wider border-b-2 border-[#A67C3D]">
                  <th className="p-3.5 pl-4">{t('colWorkId')}</th>
                  <th className="p-3.5">{t('colTitleLocation')}</th>
                  <th className="p-3.5">{t('colArea')}</th>
                  <th className="p-3.5">{t('colStatus')}</th>
                  <th className="p-3.5">{t('colBudget')}</th>
                  <th className="p-3.5">{t('colDate')}</th>
                  <th className="p-3.5 pr-4 text-right">{t('colActions')}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EFEAD8] text-xs">
                {filteredWorks.map((work, index) => (
                  <tr 
                    key={work.id}
                    className={`hover:bg-[#FFF8E7] transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F0]'
                    }`}
                  >
                    {/* ID */}
                    <td className="p-3.5 pl-4 font-mono font-bold text-[#6B1E23]">
                      {work.id}
                    </td>

                    {/* Title & Location */}
                    <td className="p-3.5 max-w-xs sm:max-w-md">
                      <div className="font-bold text-[#2D2319] text-sm mb-0.5">
                        {lang === 'en' ? work.titleEn : work.titleKn}
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 text-[11px]">
                        <Building2 className="w-3.5 h-3.5 text-[#A67C3D]" />
                        <span>{lang === 'en' ? work.locationNameEn : work.locationNameKn}</span>
                      </div>
                    </td>

                    {/* Area */}
                    <td className="p-3.5">
                      <span className="font-semibold text-gray-700 bg-[#EFEAD8] px-2 py-1 rounded">
                        {HOBLIS_AND_CITY.find(h => h.id === work.areaId)?.nameEn || work.areaId}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border inline-flex items-center space-x-1 ${statusBadges[work.status] || 'bg-gray-100'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{statusTranslations[work.status] || work.status}</span>
                      </span>
                    </td>

                    {/* Budget */}
                    <td className="p-3.5 font-bold text-[#6B1E23]">
                      {work.budget}
                    </td>

                    {/* Date */}
                    <td className="p-3.5 text-gray-600 whitespace-nowrap">
                      {work.lastUpdated}
                    </td>

                    {/* Action Button */}
                    <td className="p-3.5 pr-4 text-right">
                      <button
                        onClick={() => onSelectLocation(work.locationId, work.areaId)}
                        className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#6B1E23] hover:text-white text-[#6B1E23] font-bold rounded border border-[#A67C3D]/50 transition text-[11px] cursor-pointer"
                      >
                        {t('viewVillageDetails')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
