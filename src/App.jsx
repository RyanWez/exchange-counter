import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LockScreen } from './components/Layout/LockScreen';
import { Header } from './components/Layout/Header';
import { QuickRates } from './components/Layout/QuickRates';
import { TabBar } from './components/Layout/TabBar';
import { Loading } from './components/UI/Loading';
// import { ReloadPrompt } from './components/PWA/ReloadPrompt';

// Lazy load page components
import { lazy, Suspense } from 'react';
const RateBoard = lazy(() => import('./pages/RateBoard').then(module => ({ default: module.RateBoard })));
const Calculator = lazy(() => import('./pages/Calculator').then(module => ({ default: module.Calculator })));
const CustomerManager = lazy(() => import('./pages/CustomerManager').then(module => ({ default: module.CustomerManager })));
const History = lazy(() => import('./pages/History').then(module => ({ default: module.History })));
const DailyClosing = lazy(() => import('./pages/DailyClosing').then(module => ({ default: module.DailyClosing })));

function MainApp() {
  const { toast } = useApp();
  const [isLocked, setIsLocked] = useState(true);
  const [activeTab, setActiveTab] = useState('calc');

  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <div className="max-w-lg mx-auto h-screen bg-[#1a1a2e] shadow-2xl relative flex flex-col overflow-hidden">
      {isLocked && <LockScreen onUnlock={handleUnlock} />}

      <div className="flex-none z-30 relative">
        <Header />
        <QuickRates />
      </div>

      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-28 no-scrollbar">
        <Suspense fallback={<div className="h-full flex items-center justify-center"><Loading /></div>}>
          {activeTab === 'rate' && <RateBoard />}
          {activeTab === 'calc' && <Calculator />}
          {activeTab === 'customer' && <CustomerManager />}
          {activeTab === 'history' && <History />}
          {activeTab === 'closing' && <DailyClosing />}
        </Suspense>
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Toast */}
      <div className={`fixed bottom-28 left-0 right-0 mx-auto w-fit max-w-xs z-50 text-center pointer-events-none`}>
        <div className={`bg-gray-900/95 text-white px-6 py-3 rounded-full shadow-2xl border border-white/10 text-sm font-medium transition-all duration-300 ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {toast.message}
        </div>
      </div>

      {/* PWA Reload Prompt - Uncomment after server restart */}
      {/* <ReloadPrompt /> */}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
