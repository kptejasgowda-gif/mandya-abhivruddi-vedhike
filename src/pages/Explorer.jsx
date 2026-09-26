import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HOBLIS_AND_CITY } from '../data/constituencyData';
import { 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Phone, 
  Mail, 
  FileText, 
  Building, 
  Users, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const Explorer = ({ works, onSelectLocation }) => {
  const { lang, t } = useLanguage();

  const [expandedAreas, setExpandedAreas] = useState({
    kasaba: true,
    keragodu: true,
    basaralu: true,
    'mandya-city': true
  });

  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id) => {
    setExpandedAreas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    setExpandedAreas({
      kasaba: true,
      keragodu: true,
      basaralu: true,
      'mandya-city': true
    });
  };

  const collapseAll = () => {
    setExpandedAreas({
      kasaba: false,
      keragodu: false,
      basaralu: false,
      'mandya-city': false
    });
  };

  // Calculate work counts per location
  const getLocationWorkCount = (locationId, locationNameEn) => {
    return works.filter(w => 
      w.locationId === locationId || 
      w.locationNameEn.toLowerCase().includes(locationNameEn.toLowerCase())
    ).length;
  };

  // Filter locations by search query
  const getFilteredLocations = (locations) => {
    if (!searchQuery.trim()) return locations;
    const query = searchQuery.toLowerCase();
    return locations.filter(loc => 
      loc.nameEn.toLowerCase().includes(query) || 
      loc.nameKn.toLowerCase().includes(query)
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Page Title Header */}
      <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-2xl p-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#A67C3D] text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>Mandya Constituency Map</span>
            </div>
            <h2 className="text-2xl font-black font-gazette text-[#6B1E23]">
              {t('explorerTitle')}
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-2xl">
              {t('explorerSubtitle')}
            </p>
          </div>

          {/* Search Bar & Controls */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#A67C3D] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchLocationPlaceholder')}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
              />
            </div>

            <div className="flex gap-1.5 text-xs">
              <button
                onClick={expandAll}
                className="px-3 py-2 bg-[#FAF7F0] hover:bg-[#6B1E23] hover:text-white text-[#6B1E23] font-semibold rounded-lg border border-[#A67C3D]/50 transition cursor-pointer"
              >
                {t('expandAll')}
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-2 bg-[#FAF7F0] hover:bg-[#6B1E23] hover:text-white text-[#6B1E23] font-semibold rounded-lg border border-[#A67C3D]/50 transition cursor-pointer"
              >
                {t('collapseAll')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hoblis & Mandya City Accordion Cards */}
      <div className="space-y-6">
        {HOBLIS_AND_CITY.map(area => {
          const isExpanded = expandedAreas[area.id];
          const filteredLocations = getFilteredLocations(area.locations);
          const leader = area.leader;
          const totalAreaWorks = works.filter(w => w.areaId === area.id).length;

          // Skip rendering area if search term doesn't match any location in this area
          if (searchQuery.trim() && filteredLocations.length === 0) return null;

          return (
            <div 
              key={area.id}
              className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl overflow-hidden shadow-md transition-all"
            >
              {/* Accordion Header Bar */}
              <div 
                onClick={() => toggleExpand(area.id)}
                className="bg-gradient-to-r from-[#6B1E23] via-[#8E2B32] to-[#6B1E23] text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer hover:bg-opacity-95 select-none"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-[#A67C3D] rounded-lg border border-[#D4AF37]">
                    {area.type === 'city' ? <Building className="w-5 h-5 text-white" /> : <MapPin className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold bg-[#A67C3D] text-white px-2 py-0.5 rounded font-mono">
                        {area.code}
                      </span>
                      <h3 className="font-gazette font-bold text-lg sm:text-xl text-[#FFFDF7]">
                        {lang === 'en' ? area.nameEn : area.nameKn}
                      </h3>
                    </div>
                    <p className="text-xs text-[#E2C799] mt-0.5">
                      {area.type === 'city' 
                        ? (lang === 'en' ? 'Mandya Municipal Corporation Wards' : 'ಮಂಡ್ಯ ನಗರಸಭೆ ವಾರ್ಡ್‌ಗಳು')
                        : (lang === 'en' ? 'Rural Panchayat Hobli' : 'ಗ್ರಾಮೀಣ ಪಂಚಾಯಿತಿ ಹೋಬಳಿ')}
                    </p>
                  </div>
                </div>

                {/* Right Summary Badges */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-white/20">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="bg-[#4A1317] border border-[#A67C3D]/60 px-3 py-1 rounded-full text-[#F5E6BE] font-semibold">
                      {filteredLocations.length} {area.type === 'city' ? (lang === 'en' ? 'Wards' : 'ವಾರ್ಡ್') : (lang === 'en' ? 'Villages' : 'ಗ್ರಾಮಗಳು')}
                    </span>
                    <span className="bg-[#D4AF37] text-[#4A1317] px-3 py-1 rounded-full font-bold">
                      {totalAreaWorks} {t('activeWorksCount')}
                    </span>
                  </div>

                  <div className="p-1.5 bg-[#4A1317] rounded-full text-[#D4AF37]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Body Content */}
              {isExpanded && (
                <div className="p-5 space-y-5 bg-[#FAF7F0]">
                  
                  {/* Leader Contact Banner */}
                  {leader && (
                    <div className="bg-white border border-[#A67C3D]/30 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={leader.avatar} 
                          alt={leader.nameEn}
                          className="w-11 h-11 rounded-full border border-[#A67C3D] object-cover"
                        />
                        <div>
                          <span className="text-[10px] text-[#A67C3D] uppercase font-bold tracking-wider">
                            {t('leaderAssigned')}
                          </span>
                          <h4 className="font-gazette font-bold text-sm text-[#6B1E23]">
                            {lang === 'en' ? leader.nameEn : leader.nameKn}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {lang === 'en' ? leader.roleEn : leader.roleKn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        <a 
                          href={`tel:${leader.phone}`}
                          className="flex items-center space-x-1 px-3 py-1.5 bg-[#FFF8E7] hover:bg-[#F5E6BE] text-[#6B1E23] font-bold rounded-lg border border-[#A67C3D]/40 transition"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#A67C3D]" />
                          <span>{leader.phone}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Grid of Villages / Wards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredLocations.map(loc => {
                      const count = getLocationWorkCount(loc.id, loc.nameEn);
                      return (
                        <div 
                          key={loc.id}
                          onClick={() => onSelectLocation(loc.id, area.id)}
                          className="bg-white hover:bg-[#FFF8E7] border-2 border-[#EFEAD8] hover:border-[#A67C3D] rounded-xl p-3.5 transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[11px] font-mono text-gray-500 font-bold bg-[#FAF7F0] px-2 py-0.5 rounded border">
                              {area.type === 'city' ? `Ward ${loc.wardNumber}` : 'Village'}
                            </span>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              count > 0 ? 'bg-[#6B1E23] text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {count} {lang === 'en' ? 'Works' : 'ಕಾಮಗಾರಿ'}
                            </span>
                          </div>

                          <h5 className="font-gazette font-bold text-sm text-[#2D2319] group-hover:text-[#6B1E23] transition-colors mb-2">
                            {lang === 'en' ? loc.nameEn : loc.nameKn}
                          </h5>

                          <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-[11px] text-[#A67C3D] font-bold group-hover:text-[#6B1E23]">
                            <span>{t('viewVillageDetails')}</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
