import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { VillageDetailModal } from './components/VillageDetailModal';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { Explorer } from './pages/Explorer';
import { WorkTracker } from './pages/WorkTracker';
import { SubmitForm } from './pages/SubmitForm';
import { AdminPanel } from './pages/AdminPanel';

import { dbService } from './services/db';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [works, setWorks] = useState([]);
  const [toast, setToast] = useState(null);

  // Village Detail Modal state
  const [selectedLocation, setSelectedLocation] = useState(null); // { locationId, areaId }

  // Load works on mount & init DB
  useEffect(() => {
    dbService.init();
    refreshWorks();
  }, []);

  const refreshWorks = () => {
    setWorks(dbService.getWorks());
  };

  const handleOpenLocationDetail = (locationId, areaId) => {
    setSelectedLocation({ locationId, areaId });
  };

  const handleCloseLocationDetail = () => {
    setSelectedLocation(null);
  };

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#2D2319] selection:bg-[#6B1E23] selection:text-white">
      {/* Gazette Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            works={works} 
            onSelectLocation={handleOpenLocationDetail} 
          />
        )}

        {activeTab === 'explorer' && (
          <Explorer 
            works={works} 
            onSelectLocation={handleOpenLocationDetail} 
          />
        )}

        {activeTab === 'tracker' && (
          <WorkTracker 
            works={works} 
            onSelectLocation={handleOpenLocationDetail} 
          />
        )}

        {activeTab === 'submit' && (
          <SubmitForm 
            onWorkSubmitted={() => {
              refreshWorks();
              setActiveTab('tracker');
            }} 
            showToast={showToast} 
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            works={works} 
            onWorkUpdated={refreshWorks} 
            showToast={showToast} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Dialog Modals */}
      <LoginModal />

      {selectedLocation && (
        <VillageDetailModal
          locationId={selectedLocation.locationId}
          areaId={selectedLocation.areaId}
          works={works}
          onClose={handleCloseLocationDetail}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </LanguageProvider>
  );
}
