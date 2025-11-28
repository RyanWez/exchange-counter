import React from 'react';

export function TabBar({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'rate', icon: '📊', label: 'ပေါက်ဈေး' },
        { id: 'calc', icon: '🧮', label: 'တွက်ချက်' },
        { id: 'customer', icon: '👥', label: 'ဖောက်သည်' },
        { id: 'history', icon: '📋', label: 'မှတ်တမ်း' },
        { id: 'closing', icon: '📈', label: 'စာရင်းချုပ်' },
    ];

    return (
        <div className="fixed bottom-6 left-4 right-4 z-50 max-w-[480px] mx-auto">
            <nav className="bg-[#1a1a2e]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-2 shadow-2xl shadow-black/50">
                <div className="flex justify-between items-center px-1">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                                    relative flex flex-col items-center justify-center
                                    w-[18%] aspect-square rounded-2xl transition-all duration-300
                                    ${isActive
                                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-[#1a1a2e] shadow-lg shadow-amber-500/20 -translate-y-1'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                    }
                                `}
                            >
                                <span className={`text-2xl mb-1 transition-transform duration-300 ${isActive ? 'scale-105' : ''}`}>
                                    {tab.icon}
                                </span>
                                <span className={`text-[9px] font-bold transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
