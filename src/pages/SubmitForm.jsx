import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { HOBLIS_AND_CITY } from '../data/constituencyData';
import { dbService } from '../services/db';
import { 
  PlusCircle, 
  MapPin, 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Tag, 
  IndianRupee,
  Image as ImageIcon
} from 'lucide-react';

export const SubmitForm = ({ onWorkSubmitted, showToast }) => {
  const { lang, t } = useLanguage();
  const { user, role } = useAuth();

  const [areaId, setAreaId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('road');
  const [priority, setPriority] = useState('Medium');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  // Form errors state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When area changes, update available locations
  const selectedAreaObj = HOBLIS_AND_CITY.find(a => a.id === areaId);
  const locationsList = selectedAreaObj ? selectedAreaObj.locations : [];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!areaId) newErrors.areaId = t('errAreaRequired');
    if (!locationId) newErrors.locationId = t('errLocationRequired');
    if (!title.trim()) newErrors.title = t('errTitleRequired');
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = t('errDescriptionRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast({
        type: 'error',
        title: lang === 'en' ? 'Validation Failed' : 'ವಿವರಗಳು ಪೂರ್ಣವಾಗಿಲ್ಲ',
        message: lang === 'en' ? 'Please fill in all required fields.' : 'ದಯವಿಟ್ಟು ಕೆಂಪು ಬಣ್ಣದ ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಜಾಗಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const newWork = dbService.createWork({
          areaId,
          locationId,
          title,
          category,
          priority,
          budget: budget ? budget : "Under Estimate",
          description,
          reportedByEn: user.name || "Hobli Representative",
          reportedByKn: user.name || "ಹೋಬಳಿ ಪ್ರತಿನಿಧಿ",
          photoUrl: photoPreview || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800"
        });

        setIsSubmitting(false);

        // Reset form
        setAreaId('');
        setLocationId('');
        setTitle('');
        setBudget('');
        setDescription('');
        setPhotoPreview(null);
        setErrors({});

        showToast({
          type: 'success',
          title: lang === 'en' ? 'Submission Successful' : 'ಸಲ್ಲಿಕೆ ಯಶಸ್ವಿಯಾಗಿದೆ',
          message: `${t('formSuccessMsg')} ${newWork.id}`
        });

        if (onWorkSubmitted) onWorkSubmitted();
      } catch (err) {
        setIsSubmitting(false);
        console.error("Error creating work", err);
      }
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      
      {/* Page Title */}
      <div className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-[#6B1E23] text-white rounded-xl shadow">
            <PlusCircle className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-gazette text-[#6B1E23]">
              {t('submitTitle')}
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              {t('submitSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} id="work-submit-form" className="bg-[#FFFDF7] border-2 border-[#A67C3D] rounded-2xl p-6 shadow-md space-y-5">
        
        {/* User context note */}
        <div className="bg-[#FAF7F0] border-l-4 border-[#A67C3D] p-3 rounded text-xs text-[#6B1E23] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-[#A67C3D]" />
            <span>
              {lang === 'en' ? `Logging request as: ` : `ಸಲ್ಲಿಸುತ್ತಿರುವವರು: `}
              <strong className="font-bold">{user.name}</strong> ({role === 'leader' ? t('leaderRole') : t('guestRole')})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Area Selection */}
          <div>
            <label className="block text-xs font-bold text-[#6B1E23] mb-1">
              {t('formArea')}
            </label>
            <select
              id="submit-area-select"
              value={areaId}
              onChange={(e) => {
                setAreaId(e.target.value);
                setLocationId('');
                if (errors.areaId) setErrors(prev => ({ ...prev, areaId: null }));
              }}
              className={`w-full text-xs p-2.5 rounded-lg border bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23] ${
                errors.areaId ? 'border-red-500 bg-red-50' : 'border-[#A67C3D]'
              }`}
            >
              <option value="">{lang === 'en' ? "-- Select Area / Hobli --" : "-- ಹೋಬಳಿ/ಪ್ರದೇಶ ಆಯ್ಕೆಮಾಡಿ --"}</option>
              {HOBLIS_AND_CITY.map(h => (
                <option key={h.id} value={h.id}>
                  {lang === 'en' ? h.nameEn : h.nameKn}
                </option>
              ))}
            </select>
            {errors.areaId && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.areaId}</p>}
          </div>

          {/* Village / Ward Selection */}
          <div>
            <label className="block text-xs font-bold text-[#6B1E23] mb-1">
              {t('formLocation')}
            </label>
            <select
              id="submit-location-select"
              value={locationId}
              disabled={!areaId}
              onChange={(e) => {
                setLocationId(e.target.value);
                if (errors.locationId) setErrors(prev => ({ ...prev, locationId: null }));
              }}
              className={`w-full text-xs p-2.5 rounded-lg border bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23] ${
                errors.locationId ? 'border-red-500 bg-red-50' : 'border-[#A67C3D]'
              } ${!areaId ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value="">{lang === 'en' ? "-- Select Village or Ward --" : "-- ಗ್ರಾಮ ಅಥವಾ ವಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ --"}</option>
              {locationsList.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {lang === 'en' ? loc.nameEn : loc.nameKn}
                </option>
              ))}
            </select>
            {errors.locationId && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.locationId}</p>}
          </div>

        </div>

        {/* Work Title */}
        <div>
          <label className="block text-xs font-bold text-[#6B1E23] mb-1">
            {t('formWorkTitle')}
          </label>
          <input
            type="text"
            id="submit-work-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors(prev => ({ ...prev, title: null }));
            }}
            placeholder={lang === 'en' ? "e.g. Asphalting of Main Connecting Road in Induvalu" : "ಉದಾ: ಗ್ರಾಮದ ಮುಖ್ಯ ರಸ್ತೆಯ ಡಾಂಬರೀಕರಣ ಕಾಮಗಾರಿ"}
            className={`w-full text-xs p-2.5 rounded-lg border bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23] ${
              errors.title ? 'border-red-500 bg-red-50' : 'border-[#A67C3D]'
            }`}
          />
          {errors.title && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-[#6B1E23] mb-1">
              {t('formCategory')}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
            >
              <option value="road">{t('catRoad')}</option>
              <option value="water">{t('catWater')}</option>
              <option value="drainage">{t('catDrainage')}</option>
              <option value="electricity">{t('catElectricity')}</option>
              <option value="education">{t('catEducation')}</option>
              <option value="health">{t('catHealth')}</option>
              <option value="community">{t('catCommunity')}</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold text-[#6B1E23] mb-1">
              {t('formPriority')}
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
            >
              <option value="High">{t('priorityHigh')}</option>
              <option value="Medium">{t('priorityMedium')}</option>
              <option value="Low">{t('priorityLow')}</option>
            </select>
          </div>

          {/* Estimated Budget */}
          <div>
            <label className="block text-xs font-bold text-[#6B1E23] mb-1">
              {lang === 'en' ? "Estimated Budget (Optional)" : "ಅಂದಾಜು ವೆಚ್ಚ (ಐಚ್ಛಿಕ)"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-[#A67C3D] font-bold">₹</span>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="25,00,000"
                className="w-full text-xs pl-7 pr-3 py-2.5 rounded-lg border border-[#A67C3D] bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23]"
              />
            </div>
          </div>

        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-xs font-bold text-[#6B1E23] mb-1">
            {t('formDescription')}
          </label>
          <textarea
            rows="4"
            id="submit-work-desc"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: null }));
            }}
            placeholder={lang === 'en' ? "Provide complete details of the issue, current condition, and scope of requested development..." : "ಸಮಸ್ಯೆಯ ವಿವರ, ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿ ಮತ್ತು ಕೈಗೊಳ್ಳಬೇಕಾದ ಕಾಮಗಾರಿಯ ವಿವರವಾದ ಮಾಹಿತಿ ನೀಡಿ..."}
            className={`w-full text-xs p-3 rounded-lg border bg-white text-[#2D2319] focus:outline-none focus:ring-2 focus:ring-[#6B1E23] ${
              errors.description ? 'border-red-500 bg-red-50' : 'border-[#A67C3D]'
            }`}
          ></textarea>
          {errors.description && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.description}</p>}
        </div>

        {/* Photo Upload Simulator */}
        <div>
          <label className="block text-xs font-bold text-[#6B1E23] mb-1">
            {t('formPhoto')}
          </label>
          <div className="border-2 border-dashed border-[#A67C3D]/50 rounded-xl p-4 bg-[#FAF7F0] text-center">
            {photoPreview ? (
              <div className="relative max-w-xs mx-auto">
                <img src={photoPreview} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-[#A67C3D]" />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs p-1 rounded-full shadow"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                <ImageIcon className="w-8 h-8 text-[#A67C3D]" />
                <span className="text-xs font-semibold text-[#6B1E23]">
                  {lang === 'en' ? "Click to attach photo or document" : "ಛಾಯಾಚಿತ್ರ ಅಥವಾ ದಾಖಲೆ ಲಗತ್ತಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ"}
                </span>
                <span className="text-[11px] text-gray-500">JPG, PNG up to 5MB</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="submit-work-btn"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#6B1E23] hover:bg-[#8E2B32] text-white font-bold text-sm rounded-xl border border-[#A67C3D] shadow-lg transition-all active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>{t('formSubmitting')}</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <span>{t('formSubmitBtn')}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
