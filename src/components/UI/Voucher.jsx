import React, { useRef, useState } from 'react';
import { useUI } from '../../context/UIContext';
import { useUser } from '../../context/UserContext';
import { Button } from './Button';
import { generateVoucherImage, downloadImage } from '../../utils/voucherGenerator';

export function Voucher({ transaction, onClose }) {
    const { formatNum, formatNumAuto, showToast } = useUI();
    const { settings } = useUser();
    const voucherRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

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
            showToast('စာသား ကူးပြီးပါပြီ 📋');
        });
    };

    const handleSaveImage = async () => {
        if (!voucherRef.current) return;
        setIsGenerating(true);
        const dataUrl = await generateVoucherImage(voucherRef.current);
        if (dataUrl) {
            downloadImage(dataUrl, `voucher-${transaction.id}.png`);
            showToast('ဓာတ်ပုံ သိမ်းပြီးပါပြီ 💾');
        } else {
            showToast('ဓာတ်ပုံ ထုတ်မရပါ ❌');
        }
        setIsGenerating(false);
    };

    const handleShare = async () => {
        if (navigator.share) {
            // Try to share image if possible, else text
            // For simplicity, let's share text for now as image sharing varies by browser
            // Or we can try to generate blob and share.
            // Let's stick to text for Share button, and Image for Save button.
            // Or ask user?
            // The request implies "Messenger/Viber ... image". This usually means sending the saved image.
            // So "Save Image" is the key feature.
            navigator.share({
                title: 'Shwe Hundi Voucher',
                text: voucherText
            }).catch(console.error);
        } else {
            handleCopy();
        }
    };

    return (
        <>
            <div ref={voucherRef} className="voucher-card p-6 rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="flex flex-col items-center text-center border-b pb-4 mb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mb-2 shadow-lg">
                        <span className="text-2xl">💰</span>
                    </div>
                    <h2 className="text-xl font-bold" style={{ color: '#ffffff' }}>{settings.shopName}</h2>
                    <p className="text-sm" style={{ color: '#9ca3af' }}>{transaction.type === 'exchange' ? 'ငွေလဲပြေစာ' : 'ငွေလွှဲပြေစာ'}</p>
                </div>

                <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                        <span style={{ color: '#9ca3af' }}>ID:</span>
                        <span className="font-medium" style={{ color: '#2dd4bf' }}>{transaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span style={{ color: '#9ca3af' }}>နေ့စွဲ:</span>
                        <span className="font-medium" style={{ color: '#ffffff' }}>{formattedDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span style={{ color: '#9ca3af' }}>ဖောက်သည်:</span>
                        <span className="font-medium" style={{ color: '#ffffff' }}>{transaction.customerName}</span>
                    </div>
                </div>

                <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex justify-between items-center mb-2">
                        <span style={{ color: '#9ca3af' }}>ပေးငွေ:</span>
                        <span className="text-xl font-bold" style={{ color: '#ffffff' }}>{formatNum(transaction.fromAmount)} {transaction.fromCurrency}</span>
                    </div>
                    <div className="text-center text-xs my-2" style={{ color: '#6b7280' }}>Rate: 1 {transaction.fromCurrency} = {transaction.rate.toFixed(4)} {transaction.toCurrency}</div>
                    <div className="flex justify-between items-center">
                        <span style={{ color: '#9ca3af' }}>ရငွေ:</span>
                        <span className="text-xl font-bold" style={{ color: '#fbbf24' }}>{formatNumAuto(transaction.toAmount)} {transaction.toCurrency}</span>
                    </div>
                </div>

                <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: '#9ca3af' }}>ဝန်ဆောင်ခ:</span>
                    <span className="font-medium" style={{ color: '#ffffff' }}>{formatNum(transaction.serviceFee)} Ks</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                    <span style={{ color: '#9ca3af' }}>ငွေပေးချေပုံ:</span>
                    <span className="font-medium" style={{ color: '#ffffff' }}>{transaction.payment.toUpperCase()}</span>
                </div>

                {transaction.recipient && transaction.recipient.name && (
                    <div className="rounded-2xl p-4 mb-4 border" style={{ backgroundColor: 'rgba(20, 184, 166, 0.2)', borderColor: 'rgba(20, 184, 166, 0.3)' }}>
                        <p className="font-bold mb-2" style={{ color: '#5eead4' }}>📍 လက်ခံမည့်သူ</p>
                        <p className="text-sm" style={{ color: '#ffffff' }}>{transaction.recipient.name}</p>
                        <p className="text-sm" style={{ color: '#9ca3af' }}>{transaction.recipient.phone}</p>
                        <p className="text-sm" style={{ color: '#9ca3af' }}>{transaction.recipient.location}</p>
                    </div>
                )}

                <div className="text-center text-xs border-t pt-4" style={{ color: '#6b7280', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <p>ကျေးဇူးတင်ပါသည် 🙏</p>
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <Button variant="secondary" onClick={handleSaveImage} disabled={isGenerating} className="flex-1">
                    {isGenerating ? 'Saving...' : '💾 Save Img'}
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
