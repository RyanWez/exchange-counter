import React, { useState, useEffect } from 'react';
import { useUI } from '../context/UIContext';
import { useRates } from '../context/RateContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import Decimal from 'decimal.js';

export function RateBoard() {
    const { formatNum, formatNumAuto } = useUI();
    const { rates: currentRates, updateRates } = useRates();
    const [rates, setRates] = useState(currentRates);

    useEffect(() => {
        setRates(currentRates);
    }, [currentRates]);

    const handleChange = (currency, type, value) => {
        setRates(prev => ({
            ...prev,
            [currency]: { ...prev[currency], [type]: parseFloat(value) || 0 }
        }));
    };

    const calculateProfit = (currency) => {
        return new Decimal(rates[currency].sell).minus(rates[currency].buy).toNumber();
    };

    const handleSave = () => {
        updateRates(rates);
    };

    return (
        <div className="tab-content animate-fadeInUp">
            <Card className="rounded-3xl p-5">
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                    📊 ယနေ့ ပေါက်ဈေး
                </h2>

                {/* THB Rate */}
                <div className="mb-4 p-4 rate-card-thb rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇹🇭</span>
                        <span className="font-bold text-white">ထိုင်းဘတ် (THB)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-teal-200 mb-1 block">ဝယ် (1 ဘတ် = ? ကျပ်)</label>
                            <Input
                                type="number" step="0.01"
                                value={rates.thb.buy}
                                onChange={(e) => handleChange('thb', 'buy', e.target.value)}
                                className="text-center font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-teal-200 mb-1 block">ရောင်း (1 ဘတ် = ? ကျပ်)</label>
                            <Input
                                type="number" step="0.01"
                                value={rates.thb.sell}
                                onChange={(e) => handleChange('thb', 'sell', e.target.value)}
                                className="text-center font-bold"
                            />
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-teal-300">
                        💰 အမြတ်: <span className="font-bold text-white">{formatNumAuto(calculateProfit('thb'))}</span> ကျပ်/ဘတ်
                    </p>
                </div>

                {/* USD Rate */}
                <div className="mb-4 p-4 rate-card-usd rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇺🇸</span>
                        <span className="font-bold text-white">ဒေါ်လာ (USD)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-purple-200 mb-1 block">ဝယ် (1$ = ? ကျပ်)</label>
                            <Input
                                type="number" step="1"
                                value={rates.usd.buy}
                                onChange={(e) => handleChange('usd', 'buy', e.target.value)}
                                className="text-center font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-purple-200 mb-1 block">ရောင်း (1$ = ? ကျပ်)</label>
                            <Input
                                type="number" step="1"
                                value={rates.usd.sell}
                                onChange={(e) => handleChange('usd', 'sell', e.target.value)}
                                className="text-center font-bold"
                            />
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-purple-300">
                        💰 အမြတ်: <span className="font-bold text-white">{formatNum(calculateProfit('usd'))}</span> ကျပ်/$
                    </p>
                </div>

                {/* CNY Rate */}
                <div className="mb-6 p-4 rate-card-cny rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇨🇳</span>
                        <span className="font-bold text-white">ယွမ် (CNY)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-red-200 mb-1 block">ဝယ် (1¥ = ? ကျပ်)</label>
                            <Input
                                type="number" step="1"
                                value={rates.cny.buy}
                                onChange={(e) => handleChange('cny', 'buy', e.target.value)}
                                className="text-center font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-red-200 mb-1 block">ရောင်း (1¥ = ? ကျပ်)</label>
                            <Input
                                type="number" step="1"
                                value={rates.cny.sell}
                                onChange={(e) => handleChange('cny', 'sell', e.target.value)}
                                className="text-center font-bold"
                            />
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-red-300">
                        💰 အမြတ်: <span className="font-bold text-white">{formatNum(calculateProfit('cny'))}</span> ကျပ်/¥
                    </p>
                </div>

                <Button variant="gold" onClick={handleSave} className="w-full text-lg">
                    ✓ ဈေးနှုန်း သိမ်းမည်
                </Button>
            </Card>
        </div>
    );
}
