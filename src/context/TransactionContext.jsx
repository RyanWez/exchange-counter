import { createContext, useContext, useState, useEffect } from 'react';
import { useUI } from './UIContext';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
    const { showToast } = useUI();
    
    const [transactionData, setTransactionData] = useState(() => {
        const saved = localStorage.getItem('exchangeTransactionData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse transaction data", e);
            }
        }
        
        // Migration
        const oldSaved = localStorage.getItem('exchangeCounterData');
        if (oldSaved) {
            try {
                const oldData = JSON.parse(oldSaved);
                return {
                    transactions: oldData.transactions || [],
                    dailyClosing: oldData.dailyClosing || []
                };
            } catch (e) {
                console.error("Failed to migrate transaction data", e);
            }
        }

        return {
            transactions: [],
            dailyClosing: []
        };
    });

    // Save data
    useEffect(() => {
        localStorage.setItem('exchangeTransactionData', JSON.stringify(transactionData));
    }, [transactionData]);

    const addTransaction = (transaction) => {
        setTransactionData(prev => ({
            ...prev,
            transactions: [...prev.transactions, transaction]
        }));
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    const saveDailyClosing = (closingData) => {
        setTransactionData(prev => ({
            ...prev,
            dailyClosing: [...prev.dailyClosing, closingData]
        }));
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    return (
        <TransactionContext.Provider value={{
            transactions: transactionData.transactions,
            dailyClosing: transactionData.dailyClosing,
            addTransaction,
            saveDailyClosing
        }}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    return useContext(TransactionContext);
}
