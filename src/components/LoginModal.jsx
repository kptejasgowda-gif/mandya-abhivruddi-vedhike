import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, UserCheck, Shield, Users, Lock, Key, AlertCircle } from 'lucide-react';
import { HOBLIS_AND_CITY } from '../data/constituencyData';

export const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const { lang, t } = useLanguage();

  const [selectedRole, setSelectedRole] = useState('admin'); // admin | leader | citizen
  const [selectedHobli, setSelectedHobli] = useState('kasaba');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('mla2026');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setError('');
    if (role === 'admin') {
      setUsername('admin');
      setPassword('mla2026');
    } else if (role === 'leader') {
      setUsername(`leader_${selectedHobli}`);
      setPassword('leader123');
    } else {
      setUsername('');
      setPassword('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (selectedRole === 'admin') {
      if (username === 'admin' && password === 'mla2026') {
        login('admin');
      } else {
        setError(lang === 'en' ? 'Invalid Admin Credentials (use admin / mla2026)' : 'ಅಮಾನ್ಯ ಅಡ್ಮಿನ್ ಲಾಗಿನ್ (admin / mla2026 ಬಳಸಿ)');
      }
    } else if (selectedRole === 'leader') {
      login('leader', { hobliId: selectedHobli });
    } else {
      login('citizen');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#6B1E23] text-white p-4 flex justify-between items-center border-b-2 border-[#A67C3D]">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-gazette font-bold text-lg text-[#FFFDF7]">
              {t('loginModalTitle')}
            </h3>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="text-[#FAF7F0] hover:text-[#D4AF37] p-1 rounded-md transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#F4EFE2] p-1 rounded-lg mb-5 border border-[#A67C3D]/30">
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`py-2 text-xs font-semibold rounded-md flex flex-col items-center justify-center space-y-1 transition ${
                selectedRole === 'admin'
                  ? 'bg-[#6B1E23] text-white shadow'
                  : 'text-[#6B1E23] hover:bg-[#FAF7F0]'
              }`}
            >
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('adminRole')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('leader')}
              className={`py-2 text-xs font-semibold rounded-md flex flex-col items-center justify-center space-y-1 transition ${
                selectedRole === 'leader'
                  ? 'bg-[#6B1E23] text-white shadow'
                  : 'text-[#6B1E23] hover:bg-[#FAF7F0]'
              }`}
            >
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('leaderRole')}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('citizen')}
              className={`py-2 text-xs font-semibold rounded-md flex flex-col items-center justify-center space-y-1 transition ${
                selectedRole === 'citizen'
                  ? 'bg-[#6B1E23] text-white shadow'
                  : 'text-[#6B1E23] hover:bg-[#FAF7F0]'
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{t('guestRole')}</span>
            </button>
          </div>

          {/* Description banner */}
          <div className="bg-[#FAF7F0] p-3 rounded border-l-4 border-[#A67C3D] text-xs text-[#4A1317] mb-4">
            {selectedRole === 'admin' && t('roleAdminDesc')}
            {selectedRole === 'leader' && t('roleLeaderDesc')}
            {selectedRole === 'citizen' && t('roleCitizenDesc')}
          </div>

          {error && (
            <div className="mb-4 p-2.5 bg-red-100 border border-red-300 rounded text-xs text-red-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedRole === 'leader' && (
              <div>
                <label className="block text-xs font-semibold text-[#6B1E23] mb-1">
                  {lang === 'en' ? "Select Your Hobli / Area *" : "ನಿಮ್ಮ ಹೋಬಳಿ / ಕ್ಷೇತ್ರ ಆಯ್ಕೆಮಾಡಿ *"}
                </label>
                <select
                  value={selectedHobli}
                  onChange={(e) => setSelectedHobli(e.target.value)}
                  className="w-full text-xs p-2.5 rounded border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
                >
                  {HOBLIS_AND_CITY.map(h => (
                    <option key={h.id} value={h.id}>
                      {lang === 'en' ? h.nameEn : h.nameKn}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedRole !== 'citizen' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[#6B1E23] mb-1">
                    {t('usernameLabel')}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#A67C3D] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full text-xs pl-9 pr-3 py-2 rounded border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B1E23] mb-1">
                    {t('passwordLabel')}
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-[#A67C3D] absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full text-xs pl-9 pr-3 py-2 rounded border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Quick Demo Credentials Box */}
            <div className="p-2.5 bg-[#F4EFE2] rounded text-[11px] text-[#6B1E23] font-medium border border-[#A67C3D]/30">
              💡 {t('loginHintText')}
            </div>

            <div className="pt-2 flex space-x-2">
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                className="w-1/3 py-2 text-xs font-semibold text-[#6B1E23] bg-[#EFEAD8] hover:bg-[#E2C799] rounded transition"
              >
                {lang === 'en' ? "Cancel" : "ರದ್ದುಮಾಡಿ"}
              </button>
              <button
                type="submit"
                className="w-2/3 py-2 text-xs font-bold text-white bg-[#6B1E23] hover:bg-[#8E2B32] rounded border border-[#A67C3D] shadow transition cursor-pointer"
              >
                {t('loginSubmitBtn')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
