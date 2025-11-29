import React from 'react';
import { useUI } from '../../context/UIContext';
import { useRates } from '../../context/RateContext';
import { Card } from '../UI/Card';

export function QuickRates() {
    const { formatNum, formatNumAuto } = useUI();
    const { rates } = useRates();

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
