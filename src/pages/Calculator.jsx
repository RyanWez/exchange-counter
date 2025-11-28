import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Input, Select } from '../components/UI/Input';
import { Modal } from '../components/UI/Modal';
import { Voucher } from '../components/UI/Voucher';

export function Calculator() {
    const { appData, getRate, formatNum, formatNumAuto, addTransaction, showToast } = useApp();

    const [mode, setMode] = useState('exchange');
    const [fromCurrency, setFromCurrency] = useState('MMK');
    const [toCurrency, setToCurrency] = useState('THB');
    const [amount, setAmount] = useState('');
    const [serviceFee, setServiceFee] = useState('');
    const [payment, setPayment] = useState('cash');
    const [customerId, setCustomerId] = useState('');
    const [recipient, setRecipient] = useState({ name: '', phone: '', location: '' });

    const [result, setResult] = useState(0);
    const [rateDisplay, setRateDisplay] = useState('');
    const [showVoucher, setShowVoucher] = useState(false);
    const [lastTransaction, setLastTransaction] = useState(null);

    useEffect(() => {
        calculate();
    }, [fromCurrency, toCurrency, amount, appData.rates]);

    const calculate = () => {
        const val = parseFloat(amount.replace(/,/g, '')) || 0;
        const rate = getRate(fromCurrency, toCurrency);
        setResult(val * rate);

        if (fromCurrency === 'MMK' && toCurrency !== 'MMK') {
            const sellRate = appData.rates[toCurrency.toLowerCase()]?.sell || 1;
            setRateDisplay(`1 ${toCurrency} = ${formatNumAuto(sellRate)} MMK`);
        } else if (fromCurrency !== 'MMK' && toCurrency === 'MMK') {
            const buyRate = appData.rates[fromCurrency.toLowerCase()]?.buy || 1;
            setRateDisplay(`1 ${fromCurrency} = ${formatNumAuto(buyRate)} MMK`);
        } else {
            setRateDisplay(`1 ${fromCurrency} = ${formatNumAuto(rate)} ${toCurrency}`);
        }
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleAmountChange = (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        setAmount(val ? parseInt(val).toLocaleString('en-US') : '');
    };

    const handleFeeChange = (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        setServiceFee(val ? parseInt(val).toLocaleString('en-US') : '');
    };

    const handleSave = () => {
        const val = parseFloat(amount.replace(/,/g, '')) || 0;
        const fee = parseFloat(serviceFee.replace(/,/g, '')) || 0;

        if (val <= 0) {
            showToast('ပမာဏ ထည့်ပါ!');
            return;
        }

        const rate = getRate(fromCurrency, toCurrency);
        const resultVal = val * rate;

        const transaction = {
            id: 'TXN' + Date.now(),
            type: mode,
            fromCurrency,
            toCurrency,
            fromAmount: val,
            toAmount: resultVal,
            rate: rate,
            serviceFee: fee,
            payment,
            customerId,
            customerName: customerId ? appData.customers.find(c => c.id === customerId)?.name : 'Walk-in',
            recipient: mode === 'transfer' ? recipient : null,
            rateSnapshot: { ...appData.rates },
            timestamp: new Date().toISOString()
        };

        addTransaction(transaction);
        setLastTransaction(transaction);
        setShowVoucher(true);

        // Reset form
        setAmount('');
        setServiceFee('');
        setRecipient({ name: '', phone: '', location: '' });
    };

    return (
        <div className="tab-content animate-fadeInUp">
            {/* Mode Selection */}
            <div className="segmented-control flex mb-4">
                <button
                    onClick={() => setMode('exchange')}
                    className={`segment-btn flex-1 ${mode === 'exchange' ? 'active' : ''}`}
                >
                    💱 ငွေလဲမည်
                </button>
                <button
                    onClick={() => setMode('transfer')}
                    className={`segment-btn flex-1 ${mode === 'transfer' ? 'active' : ''}`}
                >
                    📤 ငွေလွှဲမည်
                </button>
            </div>

            <Card className="rounded-3xl p-5">
                {/* Currency Pair Selection */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-5">
                    <Select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="w-full md:flex-1 text-center"
                    >
                        <option value="MMK">🇲🇲 MMK ကျပ်</option>
                        <option value="THB">🇹🇭 THB ဘတ်</option>
                        <option value="USD">🇺🇸 USD ဒေါ်လာ</option>
                        <option value="CNY">🇨🇳 CNY ယွမ်</option>
                    </Select>
                    <button
                        onClick={handleSwap}
                        className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-90 hover:rotate-180 rotate-90 md:rotate-0 shrink-0"
                    >
                        <span className="text-2xl">⇄</span>
                    </button>
                    <Select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="w-full md:flex-1 text-center"
                    >
                        <option value="THB">🇹🇭 THB ဘတ်</option>
                        <option value="MMK">🇲🇲 MMK ကျပ်</option>
                        <option value="USD">🇺🇸 USD ဒေါ်လာ</option>
                        <option value="CNY">🇨🇳 CNY ယွမ်</option>
                    </Select>
                </div>

                {/* Amount Input */}
                <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-2 block">ပမာဏ</label>
                    <Input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="text-center text-3xl font-bold"
                        placeholder="0"
                    />
                </div>

                {/* Exchange Rate Display */}
                <div className="text-center py-3 bg-white/5 rounded-xl mb-4">
                    <p className="text-xs text-gray-500">လက်ရှိ ဈေးနှုန်း</p>
                    <p className="text-base font-bold text-teal-400">{rateDisplay}</p>
                </div>

                {/* Result Display */}
                <div className="result-display mb-5 text-center">
                    <p className="text-sm text-amber-900/70 mb-1">ရရှိမည့် ပမာဏ</p>
                    <p className="text-4xl font-bold text-gray-900">
                        {formatNumAuto(result)} {toCurrency}
                    </p>
                </div>

                {/* Service Fee */}
                <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-2 block">ဝန်ဆောင်ခ (ကျပ်)</label>
                    <Input
                        type="text"
                        value={serviceFee}
                        onChange={handleFeeChange}
                        className="text-center font-bold"
                        placeholder="0"
                    />
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-2 block">ငွေပေးချေပုံ</label>
                    <div className="grid grid-cols-4 gap-2">
                        {['cash', 'kpay', 'wave', 'bank'].map(m => (
                            <button
                                key={m}
                                onClick={() => setPayment(m)}
                                className={`payment-btn ${payment === m ? 'selected' : ''}`}
                            >
                                {m === 'cash' ? '💵 Cash' : m === 'kpay' ? '📱 KPay' : m === 'wave' ? '🌊 Wave' : '🏦 Bank'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Customer Selection */}
                <div className="mb-5">
                    <label className="text-xs text-gray-400 mb-2 block">ဖောက်သည်</label>
                    <Select
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        className="w-full"
                    >
                        <option value="">-- ဖောက်သည် ရွေးပါ --</option>
                        {appData.customers.map(c => (
                            <option key={c.id} value={c.id}>{c.name} ({c.phone || '-'})</option>
                        ))}
                    </Select>
                </div>

                {/* Transfer Mode - Recipient Info */}
                {mode === 'transfer' && (
                    <div className="mb-5 p-4 card-green rounded-2xl animate-fadeInUp">
                        <h4 className="font-bold text-teal-300 mb-3 flex items-center gap-2">
                            <span>📍</span> လက်ခံမည့်သူ
                        </h4>
                        <Input
                            value={recipient.name}
                            onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                            className="mb-2"
                            placeholder="အမည်"
                        />
                        <Input
                            value={recipient.phone}
                            onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                            className="mb-2"
                            placeholder="ဖုန်းနံပါတ်"
                        />
                        <Input
                            value={recipient.location}
                            onChange={(e) => setRecipient({ ...recipient, location: e.target.value })}
                            placeholder="နေရပ်လိပ်စာ"
                        />
                    </div>
                )}

                {/* Confirm Button */}
                <Button onClick={handleSave} className="w-full text-lg">
                    ✓ အတည်ပြုမည်
                </Button>
            </Card>

            <Modal isOpen={showVoucher} onClose={() => setShowVoucher(false)}>
                <Voucher transaction={lastTransaction} onClose={() => setShowVoucher(false)} />
            </Modal>
        </div>
    );
}
