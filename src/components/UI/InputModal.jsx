import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';

export function InputModal({ isOpen, onClose, onConfirm, title, defaultValue = '', placeholder = '' }) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (isOpen) {
            setValue(defaultValue);
        }
    }, [isOpen, defaultValue]);

    const handleConfirm = () => {
        onConfirm(value);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Card className="rounded-3xl p-6 bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="text-center mb-4">
                    <div className="w-16 h-16 gold-gradient rounded-full mx-auto flex items-center justify-center mb-3">
                        <span className="text-3xl">✏️</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="text-center mb-4"
                    placeholder={placeholder}
                    autoFocus
                />
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={onClose} className="flex-1">
                        မလုပ်ပါ
                    </Button>
                    <Button variant="gold" onClick={handleConfirm} className="flex-1">
                        အိုကေ
                    </Button>
                </div>
            </Card>
        </Modal>
    );
}
