import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';

export function DailyClosing() {
    const { appData, formatNum, saveDailyClosing } = useApp();
    const [stock, setStock] = useState({ mmk: '', thb: '', usd: '', cny: '' });
    const [summary, setSummary] = useState({
        count: 0,
        serviceFee: 0,
        flow: { mmk: { in: 0, out: 0 }, thb: { in: 0, out: 0 }, usd: { in: 0, out: 0 } }
    });

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const todayTx = appData.transactions.filter(tx => tx.timestamp.startsWith(today));

        let flow = { mmk: { in: 0, out: 0 }, thb: { in: 0, out: 0 }, usd: { in: 0, out: 0 } };

        todayTx.forEach(tx => {
            const fromKey = tx.fromCurrency.toLowerCase();
            const toKey = tx.toCurrency.toLowerCase();

            if (flow[fromKey]) flow[fromKey].in += tx.fromAmount;
            if (flow[toKey]) flow[toKey].out += tx.toAmount;
        });

        setSummary({
            count: todayTx.length,
            serviceFee: todayTx.reduce((sum, tx) => sum + tx.serviceFee, 0),
            flow
        });
    }, [appData.transactions]);

    const handleStockChange = (currency, value) => {
        const val = value.replace(/[^0-9]/g, '');
        setStock(prev => ({
            ...prev,
            [currency]: val ? parseInt(val).toLocaleString('en-US') : ''
        }));
    };

    const handleSave = () => {
        const closing = {
            date: new Date().toISOString().split('T')[0],
            stock: {
                mmk: parseFloat(stock.mmk.replace(/,/g, '')) || 0,
                thb: parseFloat(stock.thb.replace(/,/g, '')) || 0,
                usd: parseFloat(stock.usd.replace(/,/g, '')) || 0,
                cny: parseFloat(stock.cny.replace(/,/g, '')) || 0
            },
            timestamp: new Date().toISOString()
        };
        saveDailyClosing(closing);
        setStock({ mmk: '', thb: '', usd: '', cny: '' });
    };

    return (
        <div className="tab-content animate-fadeInUp">
            <Card className="rounded-3xl p-5 mb-4">
                <h2 className="text-xl font-bold text-white mb-5">📈 ယနေ့ စာရင်းချုပ်</h2>

                {/* Transaction Summary */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="stat-card-green rounded-2xl text-center p-4">
                        <p className="text-xs text-teal-200 mb-1">အကြိမ်ရေ</p>
                        <p className="text-3xl font-bold text-white">{summary.count}</p>
                    </div>
                    <div className="stat-card-gold rounded-2xl text-center p-4">
                        <p className="text-xs text-amber-200 mb-1">ဝန်ဆောင်ခ</p>
                        <p className="text-xl font-bold text-white">{formatNum(summary.serviceFee)}</p>
                    </div>
                </div>

                {/* Money Flow */}
                <h3 className="font-bold text-gray-300 mb-3">💰 ငွေစီးဆင်းမှု</h3>

                <div className="space-y-3 mb-5">
                    <div className="p-4 stat-card rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-white">🇲🇲 MMK</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">ဝင်:</span><span className="font-bold text-green-400">{formatNum(summary.flow.mmk.in)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">ထွက်:</span><span className="font-bold text-red-400">{formatNum(summary.flow.mmk.out)}</span></div>
                        </div>
                    </div>

                    <div className="p-4 stat-card rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-white">🇹🇭 THB</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">ဝင်:</span><span className="font-bold text-green-400">{formatNum(summary.flow.thb.in)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">ထွက်:</span><span className="font-bold text-red-400">{formatNum(summary.flow.thb.out)}</span></div>
                        </div>
                    </div>

                    <div className="p-4 stat-card rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-white">🇺🇸 USD</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">ဝင်:</span><span className="font-bold text-green-400">{formatNum(summary.flow.usd.in)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">ထွက်:</span><span className="font-bold text-red-400">{formatNum(summary.flow.usd.out)}</span></div>
                        </div>
                    </div>
                </div>

                {/* Current Stock */}
                <h3 className="font-bold text-gray-300 mb-3">🏦 လက်ကျန်</h3>
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">MMK</label>
                        <Input
                            value={stock.mmk}
                            onChange={(e) => handleStockChange('mmk', e.target.value)}
                            className="text-right font-bold"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">THB</label>
                        <Input
                            value={stock.thb}
                            onChange={(e) => handleStockChange('thb', e.target.value)}
                            className="text-right font-bold"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">USD</label>
                        <Input
                            value={stock.usd}
                            onChange={(e) => handleStockChange('usd', e.target.value)}
                            className="text-right font-bold"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">CNY</label>
                        <Input
                            value={stock.cny}
                            onChange={(e) => handleStockChange('cny', e.target.value)}
                            className="text-right font-bold"
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Profit Summary */}
                <div className="result-display text-center mb-5">
                    <p className="text-sm text-amber-900/70 mb-1">ခန့်မှန်း အမြတ်</p>
                    <p className="text-3xl font-bold text-gray-900">{formatNum(summary.serviceFee)} Ks+</p>
                </div>

                <Button variant="gold" onClick={handleSave} className="w-full">
                    💾 သိမ်းမည်
                </Button>
            </Card>
        </div>
    );
}
