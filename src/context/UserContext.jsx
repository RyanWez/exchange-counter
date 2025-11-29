import { createContext, useContext, useState, useEffect } from 'react';
import { useUI } from './UIContext';

const UserContext = createContext();

export function UserProvider({ children }) {
    const { showToast } = useUI();
    
    const [userData, setUserData] = useState(() => {
        const saved = localStorage.getItem('exchangeUserData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
        
        // Migration from old data
        const oldSaved = localStorage.getItem('exchangeCounterData');
        if (oldSaved) {
            try {
                const oldData = JSON.parse(oldSaved);
                return {
                    customers: oldData.customers || [],
                    settings: oldData.settings || { shopName: 'Exchange Counter', pin: '1234' }
                };
            } catch (e) {
                console.error("Failed to migrate old data", e);
            }
        }

        return {
            customers: [],
            settings: { shopName: 'Exchange Counter', pin: '1234' }
        };
    });

    // Save data
    useEffect(() => {
        localStorage.setItem('exchangeUserData', JSON.stringify(userData));
    }, [userData]);

    const addCustomer = (customer) => {
        setUserData(prev => ({
            ...prev,
            customers: [...prev.customers, customer]
        }));
        showToast('ထည့်ပြီးပါပြီ ✓');
    };

    const deleteCustomer = (id) => {
        setUserData(prev => ({
            ...prev,
            customers: prev.customers.filter(c => c.id !== id)
        }));
        showToast('ဖျက်ပြီးပါပြီ');
    };

    const updateSettings = (newSettings) => {
        setUserData(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
        showToast('သိမ်းပြီးပါပြီ ✓');
    };

    return (
        <UserContext.Provider value={{
            customers: userData.customers,
            settings: userData.settings,
            addCustomer,
            deleteCustomer,
            updateSettings
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
