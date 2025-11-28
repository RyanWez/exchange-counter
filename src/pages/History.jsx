import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Input } from '../components/UI/Input';
import { Modal } from '../components/UI/Modal';
import { Voucher } from '../components/UI/Voucher';

export function History() {
    const { appData, formatNum } = useApp();
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTx, setSelectedTx] = useState(null);

    const filteredTransactions = appData.transactions
        .filter(tx => tx.timestamp.startsWith(filterDate))
        .reverse();

    return (
        <div className="tab-content animate-fadeInUp">
            <Card className="rounded-3xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">📋 မှတ်တမ်း</h2>
                    <Input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="w-auto text-sm px-3 py-2"
                    />
                </div>
                <div className="space-y-3">
                    {filteredTransactions.length === 0 ? (
                        <p className="text-gray-500 text-center py-6 text-sm">မှတ်တမ်း မရှိသေးပါ</p>
                    ) : (
                        filteredTransactions.map(tx => {
                            const date = new Date(tx.timestamp);
                            const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                            return (
                                <div
                                    key={tx.id}
                                    className="list-item cursor-pointer"
                                    onClick={() => setSelectedTx(tx)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${tx.type === 'exchange' ? 'bg-teal-500/20 text-teal-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                                {tx.type === 'exchange' ? '💱 ငွေလဲ' : '📤 ငွေလွှဲ'}
                                            </span>
                                            <p className="font-bold text-white mt-1">{tx.customerName}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">{timeStr}</p>
                                            <p className="text-xs text-gray-500">{tx.id.slice(-8)}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-300">{formatNum(tx.fromAmount)} {tx.fromCurrency}</span>
                                        <span className="text-gray-500">→</span>
                                        <span className="font-bold text-amber-400">{formatNum(tx.toAmount)} {tx.toCurrency}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </Card>

            <Modal isOpen={!!selectedTx} onClose={() => setSelectedTx(null)}>
                <Voucher transaction={selectedTx} onClose={() => setSelectedTx(null)} />
            </Modal>
        </div>
    );
}
