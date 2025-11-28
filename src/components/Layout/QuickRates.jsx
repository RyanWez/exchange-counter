import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../UI/Card';

export function QuickRates() {
    const { appData, formatNum, formatNumAuto } = useApp();
    const { rates } = appData;

    return (
        <Card variant="gold" className="mx-4 mt-3 rounded-2xl p-4">
            <div className="flex justify-around text-center">
                <div>
                    <p className="text-xs text-amber-200 mb-1">🇹🇭 THB</p>
                    <p className="font-bold text-white text-sm">
                        {formatNumAuto(rates.thb.buy)} / {formatNumAuto(rates.thb.sell)}
                    </p>
                </div>
                <div className="w-px bg-amber-400/30"></div>
                <div>
                    <p className="text-xs text-amber-200 mb-1">🇺🇸 USD</p>
                    <p className="font-bold text-white text-sm">
                        {formatNum(rates.usd.buy)} / {formatNum(rates.usd.sell)}
                    </p>
                </div>
                <div className="w-px bg-amber-400/30"></div>
                <div>
                    <p className="text-xs text-amber-200 mb-1">🇨🇳 CNY</p>
                    <p className="font-bold text-white text-sm">
                        {formatNum(rates.cny.buy)} / {formatNum(rates.cny.sell)}
                    </p>
                </div>
            </div>
        </Card>
    );
}
