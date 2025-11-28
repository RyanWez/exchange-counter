import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { ConfirmModal } from '../components/UI/ConfirmModal';

export function CustomerManager() {
    const { appData, addCustomer, deleteCustomer, showToast } = useApp();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    const handleAdd = () => {
        if (!name.trim()) {
            showToast('အမည် ထည့်ပါ!');
            return;
        }

        const customer = {
            id: 'CUS' + Date.now(),
            name: name.trim(),
            phone: phone.trim(),
            note: note.trim(),
            createdAt: new Date().toISOString()
        };

        addCustomer(customer);
        setName('');
        setPhone('');
        setNote('');
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteCustomer(deleteId);
            setDeleteId(null);
        }
    };

    return (
        <div className="tab-content animate-fadeInUp">
            <Card className="rounded-3xl p-5 mb-4">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    👥 ဖောက်သည် အသစ်
                </h2>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-3"
                    placeholder="အမည်"
                />
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mb-3"
                    placeholder="ဖုန်းနံပါတ်"
                />
                <Input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mb-4"
                    placeholder="မှတ်ချက်"
                />
                <Button onClick={handleAdd} className="w-full">
                    + ဖောက်သည် ထည့်မည်
                </Button>
            </Card>

            <Card className="rounded-3xl p-5">
                <h2 className="text-lg font-bold text-white mb-4">📋 ဖောက်သည် စာရင်း</h2>
                <div className="space-y-3">
                    {appData.customers.length === 0 ? (
                        <p className="text-gray-500 text-center py-6 text-sm">ဖောက်သည် မရှိသေးပါ</p>
                    ) : (
                        appData.customers.map(c => (
                            <div key={c.id} className="list-item flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-white">{c.name}</p>
                                    <p className="text-sm text-gray-400">{c.phone || 'ဖုန်း မရှိ'}</p>
                                    {c.note && <p className="text-xs text-gray-500">{c.note}</p>}
                                </div>
                                <button
                                    onClick={() => setDeleteId(c.id)}
                                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </Card>

            <ConfirmModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="ဖောက်သည် ဖျက်မည်"
                message="ဤဖောက်သည်ကို ဖျက်မှာ သေချာပါသလား?"
                confirmText="ဖျက်မည်"
                isDangerous={true}
            />
        </div>
    );
}
