import React from 'react';
import { useUI } from '../../context/UIContext';
import { useUser } from '../../context/UserContext';
import { Button } from './Button';

export function Voucher({ transaction, onClose }) {
    const { formatNum, formatNumAuto, showToast } = useUI();
    const { settings } = useUser();

    if (!transaction) return null;

    const date = new Date(transaction.timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    const voucherText = `
📋 ${settings.shopName} - ${transaction.type === 'exchange' ? 'ငွေလဲ' : 'ငွေလွှဲ'}
━━━━━━━━━━━━━━━
🆔 ${transaction.id}
📅 ${formattedDate}
👤 ${transaction.customerName}

💵 ပေးငွေ: ${formatNum(transaction.fromAmount)} ${transaction.fromCurrency}
💰 ရငွေ: ${formatNumAuto(transaction.toAmount)} ${transaction.toCurrency}
📊 Rate: 1 ${transaction.fromCurrency} = ${transaction.rate.toFixed(4)} ${transaction.toCurrency}
🏷️ ဝန်ဆောင်ခ: ${formatNum(transaction.serviceFee)} Ks
💳 ${transaction.payment.toUpperCase()}
${transaction.recipient?.name ? `\n📍 လက်ခံသူ: ${transaction.recipient.name} (${transaction.recipient.phone})` : ''}
━━━━━━━━━━━━━━━
ကျေးဇူးတင်ပါသည် 🙏
  `.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(voucherText).then(() => {
            showToast('ကူးပြီးပါပြီ 📋');
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Shwe Hundi Voucher',
                text: voucherText
            });
        } else {
            handleCopy();
        }
    };

    return (
        <>
            <div className="voucher-card p-6">
                <div className="text-center border-b border-white/20 pb-4 mb-4">
                    <div className="w-16 h-16 gold-gradient rounded-full mx-auto flex items-center justify-center mb-2 shadow-lg">
                        <span className="text-2xl">💰</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{settings.shopName}</h2>
                    <p className="text-sm text-gray-400">{transaction.type === 'exchange' ? 'ငွေလဲပြေစာ' : 'ငွေလွှဲပြေစာ'}</p>
                </div>

                <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                        <span className="text-gray-400">ID:</span>
                        <span className="font-medium text-teal-400">{transaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">နေ့စွဲ:</span>
                        <span className="font-medium text-white">{formattedDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">ဖောက်သည်:</span>
                        <span className="font-medium text-white">{transaction.customerName}</span>
                    </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">ပေးငွေ:</span>
                        <span className="text-xl font-bold text-white">{formatNum(transaction.fromAmount)} {transaction.fromCurrency}</span>
                    </div>
                    <div className="text-center text-gray-500 text-xs my-2">Rate: 1 {transaction.fromCurrency} = {transaction.rate.toFixed(4)} {transaction.toCurrency}</div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">ရငွေ:</span>
                        <span className="text-xl font-bold text-amber-400">{formatNumAuto(transaction.toAmount)} {transaction.toCurrency}</span>
                    </div>
                </div>

                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">ဝန်ဆောင်ခ:</span>
                    <span className="font-medium text-white">{formatNum(transaction.serviceFee)} Ks</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-400">ငွေပေးချေပုံ:</span>
                    <span className="font-medium text-white">{transaction.payment.toUpperCase()}</span>
                </div>

                {transaction.recipient && transaction.recipient.name && (
                    <div className="bg-teal-500/20 rounded-2xl p-4 mb-4 border border-teal-500/30">
                        <p className="font-bold text-teal-300 mb-2">📍 လက်ခံမည့်သူ</p>
                        <p className="text-sm text-white">{transaction.recipient.name}</p>
                        <p className="text-sm text-gray-400">{transaction.recipient.phone}</p>
                        <p className="text-sm text-gray-400">{transaction.recipient.location}</p>
                    </div>
                )}

                <div className="text-center text-xs text-gray-500 border-t border-white/10 pt-4">
                    <p>ကျေးဇူးတင်ပါသည် 🙏</p>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <Button variant="secondary" onClick={handleCopy} className="flex-1">
                    📋 Copy
                </Button>
                <Button variant="gold" onClick={handleShare} className="flex-1">
                    📤 Share
                </Button>
                <Button variant="secondary" onClick={onClose} className="flex-1">
                    ✕ ပိတ်မည်
                </Button>
            </div>
        </>
    );
}
