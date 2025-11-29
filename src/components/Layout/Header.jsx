import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { InputModal } from '../UI/InputModal';

export function Header() {
    const { settings, updateSettings } = useUser();
    const [dateStr, setDateStr] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        setDateStr(now.toLocaleDateString('en-US', options));
    }, []);

    const handleSettingsSave = (newName) => {
        if (newName && newName.trim()) {
            updateSettings({ shopName: newName.trim() });
        }
    };

    return (
        <>
            <header className="app-header sticky top-0 z-40 px-4 py-4">
                <div className="flex items-center justify-between">
                    <div
                        className="flex items-center gap-3 cursor-pointer active:opacity-80 transition group"
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition duration-300">
                            <img src="/images/logo.svg" alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-xl group-hover:text-amber-400 transition">{settings.shopName}</h1>
                            <p className="text-gray-400 text-xs">{dateStr}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition active:scale-90 active:rotate-90 duration-300"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </header>

            <InputModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onConfirm={handleSettingsSave}
                title="ဆိုင်နာမည် ပြောင်းမည်"
                defaultValue={settings.shopName}
                placeholder="ဆိုင်နာမည် ရိုက်ထည့်ပါ"
            />
        </>
    );
}
