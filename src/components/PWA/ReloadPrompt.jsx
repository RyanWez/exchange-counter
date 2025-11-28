import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '../UI/Button';

export function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (!offlineReady && !needRefresh) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-[60] max-w-lg mx-auto">
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 animate-fadeInUp">
                <div className="flex items-start gap-3">
                    <div className="text-2xl">
                        {offlineReady ? '✅' : '🚀'}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white text-sm">
                            {offlineReady ? 'အော့ဖ်လိုင်း အသုံးပြုနိုင်ပါပြီ' : 'ဗားရှင်းအသစ် ရနိုင်ပါပြီ'}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                            {offlineReady
                                ? 'အင်တာနက် မရှိလည်း အသုံးပြုနိုင်ပါပြီ။'
                                : 'ပိုမိုကောင်းမွန်သော လုပ်ဆောင်ချက်များအတွက် Update လုပ်ပါ။'}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={close}
                        className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition"
                    >
                        ပိတ်မည်
                    </button>
                    {needRefresh && (
                        <Button
                            variant="gold"
                            onClick={() => updateServiceWorker(true)}
                            className="!py-2 !px-4 !text-xs !rounded-lg"
                        >
                            Update လုပ်မည်
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
