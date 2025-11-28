import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Card } from './Card';

export function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'လုပ်မည်', cancelText = 'မလုပ်ပါ', isDangerous = false }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Card className="rounded-3xl p-6">
                <div className="text-center mb-5">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-full mx-auto flex items-center justify-center mb-3">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="text-gray-400 mt-2 text-sm">{message}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={onClose} className="flex-1">
                        {cancelText}
                    </Button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`flex-1 font-bold rounded-xl py-3 transition ${isDangerous ? 'bg-red-500 text-white hover:bg-red-600' : 'btn-primary'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </Card>
        </Modal>
    );
}
