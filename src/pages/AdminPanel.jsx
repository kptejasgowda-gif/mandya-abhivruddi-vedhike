import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/db';
import { HOBLIS_AND_CITY } from '../data/constituencyData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Save, 
  IndianRupee, 
  Lock, 
  UserCheck, 
  Phone, 
  Mail,
  Building2,
  FileText
} from 'lucide-react';

export const AdminPanel = ({ works, onWorkUpdated, showToast }) => {
  const { lang, t } = useLanguage();
  const { isAdmin, setIsLoginModalOpen, login } = useAuth();

  const [activeTab, setActiveTab] = useState('queue'); // queue | all | leaders
  const [editingId, setEditingId] = useState(null);

  // Form states for editing item
  const [editStatus, setEditStatus] = useState('');
  const [editBudget, setEditBudget] = useState('');
  const [editNoteEn, setEditNoteEn] = useState('');
  const [editNoteKn, setEditNoteKn] = useState('');

  // Pending queue items
  const pendingQueue = works.filter(w => w.status === 'Reported' || w.status === 'Approved');

  // If user is not admin, show notice
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center animate-fade-in">
        <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-2xl p-8 shadow-xl space-y-4">
          <div className="w-16 h-16 bg-[#6B1E23]/10 border-2 border-[#6B1E23] text-[#6B1E23] rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-[#A67C3D]" />
          </div>

          <h3 className="font-gazette font-bold text-xl text-[#6B1E23]">
            {lang === 'en' ? "MLA Office Portal Access Restricted" : "ಶಾಸಕರ ಕಚೇರಿ ಅಡ್ಮಿನ್ ಲಾಗಿನ್ ಅಗತ್ಯವಿದೆ"}
          </h3>

          <p className="text-xs text-gray-600 leading-relaxed">
            {t('adminAccessOnlyMsg')}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                login('admin');
                showToast({
                  type: 'success',
                  title: 'Admin Session Activated',
                  message: 'Logged in as MLA Office Admin.'
                });
              }}
              className="px-6 py-3 bg-[#6B1E23] hover:bg-[#8E2B32] text-white text-xs font-bold rounded-xl border border-[#A67C3D] shadow transition cursor-pointer"
            >
              🔑 {t('quickLoginAsAdmin')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const startEdit = (work) => {
    setEditingId(work.id);
    setEditStatus(work.status);
    setEditBudget(work.budget || '');
    setEditNoteEn(work.adminNotesEn || '');
    setEditNoteKn(work.adminNotesKn || '');
  };

  const handleQuickApprove = (work) => {
    dbService.updateWork(work.id, {
      status: 'Approved',
      adminNotesEn: "Approved by MLA Office. Sanctioned for engineering execution.",
      adminNotesKn: "ಶಾಸಕರ ಕಚೇರಿಯಿಂದ ಅನುಮೋದಿಸಲಾಗಿದೆ. ಇಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಮಂಜೂರಾತಿ ನೀಡಲಾಗಿದೆ."
    });

    showToast({
      type: 'success',
      title: lang === 'en' ? 'Work Approved' : 'ಕಾಮಗಾರಿ ಅನುಮೋದಿಸಲಾಗಿದೆ',
      message: `${work.id} ${lang === 'en' ? 'has been approved for execution.' : 'ಅನುಮೋದನೆಗೊಂಡಿದೆ.'}`
    });

    if (onWorkUpdated) onWorkUpdated();
  };

  const handleSaveEdit = (workId) => {
    dbService.updateWork(workId, {
      status: editStatus,
      budget: editBudget.startsWith('₹') ? editBudget : `₹ ${editBudget}`,
      adminNotesEn: editNoteEn,
      adminNotesKn: editNoteKn || editNoteEn
    });

    setEditingId(null);

    showToast({
      type: 'success',
      title: lang === 'en' ? 'Status Updated' : 'ಸ್ಥಿತಿ ನವೀಕರಿಸಲಾಗಿದೆ',
      message: `${workId} ${lang === 'en' ? 'details updated successfully.' : 'ವಿವರಗಳು ನವೀಕರಣಗೊಂಡಿವೆ.'}`
    });

    if (onWorkUpdated) onWorkUpdated();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Admin Header */}
      <div className="bg-[#6B1E23] text-white border-2 border-[#A67C3D] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#A67C3D]/40 border border-[#D4AF37]/50 px-3 py-1 rounded-full text-xs font-semibold text-[#F5E6BE] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Authenticated MLA Office Session</span>
          </div>
          <h2 className="text-2xl font-black font-gazette text-[#FFFDF7]">
            {t('adminTitle')}
          </h2>
          <p className="text-xs text-[#E2C799] mt-0.5">
            {t('adminSubtitle')}
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex bg-[#4A1317] p-1 rounded-xl border border-[#A67C3D]/40 text-xs">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-2 rounded-lg font-bold transition ${
              activeTab === 'queue' ? 'bg-[#A67C3D] text-white shadow' : 'text-[#FAF7F0] hover:text-white'
            }`}
          >
            {t('adminQueueTab')} ({pendingQueue.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-2 rounded-lg font-bold transition ${
              activeTab === 'all' ? 'bg-[#A67C3D] text-white shadow' : 'text-[#FAF7F0] hover:text-white'
            }`}
          >
            {t('adminManageWorksTab')} ({works.length})
          </button>
          <button
            onClick={() => setActiveTab('leaders')}
            className={`px-3 py-2 rounded-lg font-bold transition ${
              activeTab === 'leaders' ? 'bg-[#A67C3D] text-white shadow' : 'text-[#FAF7F0] hover:text-white'
            }`}
          >
            {t('adminHobliLeadersTab')}
          </button>
        </div>
      </div>

      {/* Tab 1: Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <h3 className="font-gazette font-bold text-lg text-[#6B1E23] flex items-center space-x-2">
            <Clock className="w-5 h-5 text-[#A67C3D]" />
            <span>{t('adminQueueTab')}</span>
          </h3>

          {pendingQueue.length === 0 ? (
            <div className="bg-[#FFFDF7] border-2 border-dashed border-emerald-300 rounded-2xl py-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-gazette font-bold text-base text-emerald-900">
                {lang === 'en' ? "Queue Clear! All reported items reviewed." : "ಎಲ್ಲಾ ವರದಿಯಾದ ಕಾಮಗಾರಿಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ."}
              </h4>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingQueue.map(work => (
                <div 
                  key={work.id}
                  className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold bg-[#6B1E23] text-white px-2 py-0.5 rounded">
                        {work.id}
                      </span>
                      <span className="text-xs font-bold text-[#A67C3D]">
                        {lang === 'en' ? work.locationNameEn : work.locationNameKn}
                      </span>
                    </div>

                    <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {work.status}
                    </span>
                  </div>

                  <h4 className="font-gazette font-bold text-base text-[#2D2319]">
                    {lang === 'en' ? work.titleEn : work.titleKn}
                  </h4>

                  <p className="text-xs text-gray-700 leading-relaxed bg-[#FAF7F0] p-3 rounded border border-[#EFEAD8]">
                    {lang === 'en' ? work.descriptionEn : work.descriptionKn}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EFEAD8] text-xs">
                    <div className="text-gray-500">
                      {lang === 'en' ? "Reported By:" : "ವರದಿ ಮಾಡಿದವರು:"} <strong>{lang === 'en' ? work.reportedByEn : work.reportedByKn}</strong>
                    </div>

                    <div className="flex space-x-2">
                      {work.status === 'Reported' && (
                        <button
                          onClick={() => handleQuickApprove(work)}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition shadow cursor-pointer flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t('approveAction')}</span>
                        </button>
                      )}

                      <button
                        onClick={() => startEdit(work)}
                        className="px-4 py-2 bg-[#6B1E23] hover:bg-[#8E2B32] text-white font-bold rounded-lg text-xs transition shadow cursor-pointer flex items-center space-x-1"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>{t('updateStatusAction')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Inline Editor if active */}
                  {editingId === work.id && (
                    <div className="mt-4 p-4 bg-[#FFF8E7] border-2 border-[#A67C3D] rounded-xl space-y-3 animate-fade-in">
                      <h5 className="font-bold text-xs text-[#6B1E23] uppercase">
                        {lang === 'en' ? "MLA Office Status & Note Update" : "ಶಾಸಕರ ಕಚೇರಿ ನಿರ್ವಹಣೆ"}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#6B1E23]">New Execution Status</label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="w-full text-xs p-2 rounded border border-[#A67C3D] bg-white font-bold"
                          >
                            <option value="Reported">{t('statusReported')}</option>
                            <option value="Approved">{t('statusApproved')}</option>
                            <option value="In Progress">{t('statusInProgress')}</option>
                            <option value="Completed">{t('statusCompleted')}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#6B1E23]">Sanctioned Budget</label>
                          <input
                            type="text"
                            value={editBudget}
                            onChange={(e) => setEditBudget(e.target.value)}
                            placeholder="₹ 25,00,000"
                            className="w-full text-xs p-2 rounded border border-[#A67C3D] bg-white font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#6B1E23]">MLA Office Official Progress Note (English)</label>
                        <input
                          type="text"
                          value={editNoteEn}
                          onChange={(e) => setEditNoteEn(e.target.value)}
                          placeholder="Sanctioned under MLA Fund 2026. Execution started."
                          className="w-full text-xs p-2 rounded border border-[#A67C3D] bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#6B1E23]">ಅಧಿಕೃತ ಟಿಪ್ಪಣಿ (ಕನ್ನಡ)</label>
                        <input
                          type="text"
                          value={editNoteKn}
                          onChange={(e) => setEditNoteKn(e.target.value)}
                          placeholder="ಶಾಸಕರ ನಿಧಿಯಿಂದ ಮಂಜೂರಾಗಿದೆ. ಕಾಮಗಾರಿ ಪ್ರಗತಿಯಲ್ಲಿದೆ."
                          className="w-full text-xs p-2 rounded border border-[#A67C3D] bg-white"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(work.id)}
                          className="px-4 py-1.5 text-xs font-bold text-white bg-[#6B1E23] hover:bg-[#8E2B32] rounded flex items-center space-x-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{t('saveChanges')}</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: All Constituency Works */}
      {activeTab === 'all' && (
        <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-gazette font-bold text-lg text-[#6B1E23]">
            {t('adminManageWorksTab')}
          </h3>

          <div className="space-y-3">
            {works.map(work => (
              <div key={work.id} className="p-3.5 bg-white border border-[#EFEAD8] rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-[#6B1E23]">{work.id}</span>
                    <span className="text-xs font-bold text-gray-700">{work.locationNameEn}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 font-bold">{work.status}</span>
                  </div>
                  <h5 className="font-bold text-sm text-[#2D2319] mt-0.5">
                    {lang === 'en' ? work.titleEn : work.titleKn}
                  </h5>
                </div>

                <button
                  onClick={() => startEdit(work)}
                  className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#6B1E23] hover:text-white text-[#6B1E23] text-xs font-bold rounded border border-[#A67C3D]"
                >
                  {t('updateStatusAction')}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Hobli Leaders Directory */}
      {activeTab === 'leaders' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOBLIS_AND_CITY.map(area => (
            <div key={area.id} className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <img src={area.leader.avatar} alt={area.leader.nameEn} className="w-14 h-14 rounded-full border border-[#A67C3D] object-cover" />
                <div>
                  <h4 className="font-gazette font-bold text-base text-[#6B1E23]">
                    {lang === 'en' ? area.leader.nameEn : area.leader.nameKn}
                  </h4>
                  <p className="text-xs font-bold text-[#A67C3D]">
                    {lang === 'en' ? area.nameEn : area.nameKn}
                  </p>
                </div>
              </div>

              <div className="text-xs space-y-1 bg-[#FAF7F0] p-3 rounded border border-[#A67C3D]/30">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#A67C3D]" />
                  <a href={`tel:${area.leader.phone}`} className="font-bold text-[#6B1E23]">{area.leader.phone}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#A67C3D]" />
                  <span>{area.leader.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
