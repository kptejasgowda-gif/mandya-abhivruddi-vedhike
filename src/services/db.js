// Local Data Service with LocalStorage persistence
import { INITIAL_WORK_ITEMS, HOBLIS_AND_CITY } from '../data/constituencyData';

const DB_KEY = 'mandya_abhivruddi_works_v1';

export const dbService = {
  // Initialize DB with seed data if empty
  init: () => {
    const existing = localStorage.getItem(DB_KEY);
    if (!existing) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_WORK_ITEMS));
    }
  },

  // Get all work items
  getWorks: () => {
    try {
      const data = localStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : INITIAL_WORK_ITEMS;
    } catch (e) {
      console.error("Error loading works from storage", e);
      return INITIAL_WORK_ITEMS;
    }
  },

  // Get single work item
  getWorkById: (id) => {
    const works = dbService.getWorks();
    return works.find(w => w.id === id);
  },

  // Create new work request
  createWork: (workData) => {
    const works = dbService.getWorks();
    const area = HOBLIS_AND_CITY.find(a => a.id === workData.areaId);
    
    // Find location object
    let locObj = null;
    if (area) {
      locObj = area.locations.find(l => l.id === workData.locationId);
    }

    const year = new Date().getFullYear();
    const count = works.length + 1;
    const newId = `WORK-${year}-${String(count).padStart(3, '0')}`;

    const newWork = {
      id: newId,
      titleEn: workData.titleEn || workData.title,
      titleKn: workData.titleKn || workData.title,
      areaId: workData.areaId,
      locationId: workData.locationId,
      locationNameEn: locObj ? locObj.nameEn : workData.locationId,
      locationNameKn: locObj ? locObj.nameKn : workData.locationId,
      category: workData.category,
      categoryEn: workData.categoryEn || getCategoryName(workData.category, 'en'),
      categoryKn: workData.categoryKn || getCategoryName(workData.category, 'kn'),
      status: "Reported", // Default initial status
      priority: workData.priority || "Medium",
      budget: workData.budget ? `₹ ${workData.budget}` : "Under Estimate",
      descriptionEn: workData.description,
      descriptionKn: workData.description,
      reportedByEn: workData.reportedByEn || "Citizen / Hobli Representative",
      reportedByKn: workData.reportedByKn || "ನಾಗರಿಕರು / ಹೋಬಳಿ ಪ್ರತಿನಿಧಿ",
      dateReported: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      adminNotesEn: "Awaiting MLA office review and engineering estimate.",
      adminNotesKn: "ಶಾಸಕರ ಕಚೇರಿಯ ಪರಿಶೀಲನೆ ಮತ್ತು ಇಂಜಿನಿಯರಿಂಗ್ ಅಂದಾಜು ಪತ್ರಿಕೆಗೆ ಕಾಯಲಾಗುತ್ತಿದೆ.",
      photoUrl: workData.photoUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800"
    };

    const updatedWorks = [newWork, ...works];
    localStorage.setItem(DB_KEY, JSON.stringify(updatedWorks));
    return newWork;
  },

  // Update work status and admin notes
  updateWork: (id, updates) => {
    const works = dbService.getWorks();
    const index = works.findIndex(w => w.id === id);
    if (index !== -1) {
      works[index] = {
        ...works[index],
        ...updates,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(DB_KEY, JSON.stringify(works));
      return works[index];
    }
    return null;
  },

  // Reset to initial seed data
  resetData: () => {
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_WORK_ITEMS));
    return INITIAL_WORK_ITEMS;
  }
};

// Helper for category names
function getCategoryName(catKey, lang) {
  const map = {
    road: { en: "Roads & Highways", kn: "ರಸ್ತೆ ಮತ್ತು ಹೆದ್ದಾರಿ" },
    water: { en: "Drinking Water", kn: "ಕುಡಿಯುವ ನೀರು" },
    drainage: { en: "Sanitation & Drainage", kn: "ನೈರ್ಮಲ್ಯ ಮತ್ತು ಒಳಚರಂಡಿ" },
    electricity: { en: "Street Lighting", kn: "ಬೀದಿ ದೀಪಗಳು" },
    education: { en: "Education & Schools", kn: "ಶಿಕ್ಷಣ ಮತ್ತು ಶಾಲೆಗಳು" },
    health: { en: "Healthcare & PHC", kn: "ಆರೋಗ್ಯ ಮತ್ತು ಚಿಕಿತ್ಸಾಲಯ" },
    community: { en: "Community & Sports", kn: "ಸಮುದಾಯ ಮತ್ತು ಕ್ರೀಡೆ" }
  };
  return map[catKey] ? map[catKey][lang] : catKey;
}
