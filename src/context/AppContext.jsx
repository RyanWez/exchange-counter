import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [appData, setAppData] = useState({
        rates: {
            thb: { buy: 122.7, sell: 125.79 },
            usd: { buy: 3945, sell: 4045 },
            cny: { buy: 558, sell: 572 }
        },
        transactions: [],
        customers: [],
        dailyClosing: [],
        settings: { shopName: 'Shwe Hundi', pin: '1234' }
    });

    const [toast, setToast] = useState({ message: '', visible: false });

    // Load data from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('shweHundiData');
        if (saved) {
            try {
                setAppData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse saved data", e);
            }
        }
    }, []);

    // Save data to localStorage whenever appData changes
    useEffect(() => {
        localStorage.setItem('shweHundiData', JSON.stringify(appData));
    }, [appData]);

    const showToast = (message) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 2500);
    };

    const formatNum = (num, decimals = 0) => {
        if (num === null || num === undefined || isNaN(num)) return '0';
        return Number(num).toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    const formatNumAuto = (num) => {
        if (num === null || num === undefined || isNaN(num)) return '0';
        return Number(num).toLocaleString('en-US', { maximumFractionDigits: 2 });
    };

    const updateRates = (newRates) => {
        setAppData(prev => ({ ...prev, rates: newRates }));
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    const addTransaction = (transaction) => {
        setAppData(prev => ({
            ...prev,
            transactions: [...prev.transactions, transaction]
        }));
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    const addCustomer = (customer) => {
        setAppData(prev => ({
            ...prev,
            customers: [...prev.customers, customer]
        }));
        showToast('ထည့်ပြီးပါပြီ ✓');
    };

    const deleteCustomer = (id) => {
        setAppData(prev => ({
            ...prev,
            customers: prev.customers.filter(c => c.id !== id)
        }));
        showToast('ဖျက်ပြီးပါပြီ');
    };

    const saveDailyClosing = (closingData) => {
        setAppData(prev => ({
            ...prev,
            dailyClosing: [...prev.dailyClosing, closingData]
        }));
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    const updateSettings = (newSettings) => {
        setAppData(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    const getRate = (from, to) => {
        if (from === to) return 1;

        if (from === 'MMK') {
            if (to === 'THB') return 1 / appData.rates.thb.sell;
            if (to === 'USD') return 1 / appData.rates.usd.sell;
            if (to === 'CNY') return 1 / appData.rates.cny.sell;
        }
        if (to === 'MMK') {
            if (from === 'THB') return appData.rates.thb.buy;
            if (from === 'USD') return appData.rates.usd.buy;
            if (from === 'CNY') return appData.rates.cny.buy;
        }
        const fromToMmk = getRate(from, 'MMK');
        const mmkToTo = getRate('MMK', to);
        return fromToMmk * mmkToTo;
    };

    return (
        <AppContext.Provider value={{
            appData,
            setAppData,
            toast,
            showToast,
            formatNum,
            formatNumAuto,
            updateRates,
            addTransaction,
            addCustomer,
            deleteCustomer,
            saveDailyClosing,
            updateSettings,
            getRate
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
