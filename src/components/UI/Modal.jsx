import React from 'react';

export function Modal({ isOpen, onClose, children, className = '' }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 modal-overlay backdrop-blur-sm bg-black/50" onClick={onClose}></div>
            <div className={`absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto animate-scaleIn ${className}`}>
                {children}
            </div>
        </div>
    );
}
