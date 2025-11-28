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
        <nav className="tab-bar fixed bottom-0 left-0 right-0 z-40 px-2 pb-6 pt-2 max-w-lg mx-auto">
            <div className="flex justify-around">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}
