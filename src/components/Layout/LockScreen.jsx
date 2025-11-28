import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

export function LockScreen({ onUnlock }) {
    const { appData, showToast } = useApp();
    const [pin, setPin] = useState('');

    const handleUnlock = () => {
        if (pin === appData.settings.pin) {
            onUnlock();
        } else {
            showToast('PIN မှားနေပါသည်! ❌');
            setPin('');
            // Shake animation logic could be added here if needed, 
            // but simple toast is fine for now.
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleUnlock();
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#1a1a2e]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
            <Card className="rounded-3xl p-8 mx-6 w-full max-w-sm animate-scaleIn relative">
                <div className="text-center mb-8">
                    <div className="w-24 h-24 gold-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-2xl animate-glow">
                        <span className="text-5xl">💰</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Exchange Counter</h1>
                    <p className="text-gray-400 text-sm mt-2">Money Changer Manager</p>
                </div>
                <div className="space-y-4">
                    <Input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="PIN ထည့်ပါ"
                        className="text-center text-2xl tracking-[0.5em]"
                        maxLength={4}
                    />
                    <Button variant="gold" onClick={handleUnlock} className="w-full text-lg">
                        🔓 ဝင်ရောက်မည်
                    </Button>
                    <p className="text-center text-gray-500 text-xs">Default PIN: 1234</p>
                </div>
            </Card>
        </div>
    );
}
