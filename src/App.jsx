import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LockScreen } from './components/Layout/LockScreen';
import { Header } from './components/Layout/Header';
import { QuickRates } from './components/Layout/QuickRates';
import { TabBar } from './components/Layout/TabBar';
import { RateBoard } from './pages/RateBoard';
import { Calculator } from './pages/Calculator';
import { CustomerManager } from './pages/CustomerManager';
import { History } from './pages/History';
import { DailyClosing } from './pages/DailyClosing';

function MainApp() {
  const { toast } = useApp();
  const [isLocked, setIsLocked] = useState(true);
  const [activeTab, setActiveTab] = useState('calc');

  return (
    <div className="max-w-lg mx-auto h-screen bg-[#1a1a2e] shadow-2xl relative flex flex-col overflow-hidden">
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}

      <div className="flex-none z-30 relative">
        <Header />
        <QuickRates />
      </div>

      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-28">
        {activeTab === 'rate' && <RateBoard />}
        {activeTab === 'calc' && <Calculator />}
        {activeTab === 'customer' && <CustomerManager />}
        {activeTab === 'history' && <History />}
        {activeTab === 'closing' && <DailyClosing />}
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Toast */}
      <div className={`fixed bottom-28 left-0 right-0 mx-auto w-fit max-w-xs z-50 text-center pointer-events-none`}>
        <div className={`bg-gray-900/95 text-white px-6 py-3 rounded-full shadow-2xl border border-white/10 text-sm font-medium transition-all duration-300 ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {toast.message}
        </div>
      </div>
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
