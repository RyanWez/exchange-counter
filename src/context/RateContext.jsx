import { createContext, useContext, useState, useEffect } from 'react';
import { useUI } from './UIContext';

const RateContext = createContext();

export function RateProvider({ children }) {
    const { showToast } = useUI();
    
    const [rates, setRates] = useState({
        thb: { buy: 122.7, sell: 125.79 },
        usd: { buy: 3945, sell: 4045 },
        cny: { buy: 558, sell: 572 }
    });

    // Load data
    useEffect(() => {
        const saved = localStorage.getItem('exchangeRates');
        if (saved) {
            try {
                setRates(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse rates", e);
            }
        } else {
            // Migration
            const oldSaved = localStorage.getItem('exchangeCounterData');
            if (oldSaved) {
                try {
                    const oldData = JSON.parse(oldSaved);
                    if (oldData.rates) setRates(oldData.rates);
                } catch (e) {
                    console.error("Failed to migrate rates", e);
                }
            }
        }
    }, []);

    // Save data
    useEffect(() => {
        localStorage.setItem('exchangeRates', JSON.stringify(rates));
    }, [rates]);

    const updateRates = (newRates) => {
        setRates(newRates);
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    const getRate = (from, to) => {
        if (from === to) return 1;

        if (from === 'MMK') {
            if (to === 'THB') return 1 / rates.thb.sell;
            if (to === 'USD') return 1 / rates.usd.sell;
            if (to === 'CNY') return 1 / rates.cny.sell;
        }
        if (to === 'MMK') {
            if (from === 'THB') return rates.thb.buy;
            if (from === 'USD') return rates.usd.buy;
            if (from === 'CNY') return rates.cny.buy;
        }
        // Recursive calculation for cross rates (e.g. USD -> THB)
        // Note: This simple recursion assumes intermediate is MMK.
        // To avoid infinite recursion if logic is wrong, be careful.
        // But here it splits into (from->MMK) * (MMK->to).
        // (from->MMK) calls getRate(from, 'MMK') which hits the second block.
        // (MMK->to) calls getRate('MMK', to) which hits the first block.
        // So depth is 1. Safe.
        
        // However, we need to access the function itself? No, it's in scope.
        // But wait, if I call getRate inside getRate, it works.
        
        const fromToMmk = getRate(from, 'MMK');
        const mmkToTo = getRate('MMK', to);
        return fromToMmk * mmkToTo;
    };

    return (
        <RateContext.Provider value={{
            rates,
            updateRates,
            getRate
        }}>
            {children}
        </RateContext.Provider>
    );
}

export function useRates() {
    return useContext(RateContext);
}
