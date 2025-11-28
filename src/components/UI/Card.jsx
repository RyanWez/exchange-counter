import React from 'react';

export function Card({ children, variant = 'dark', className = '' }) {
    const baseClass = {
        dark: 'card-dark',
        gold: 'card-gold',
        green: 'card-green'
    }[variant] || 'card-dark';

    return (
        <div className={`${baseClass} rounded-3xl p-5 ${className}`}>
            {children}
        </div>
    );
}
