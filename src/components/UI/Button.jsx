import React from 'react';

export function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
    const baseClass = {
        primary: 'btn-primary',
        gold: 'btn-gold',
        secondary: 'btn-secondary'
    }[variant] || 'btn-primary';

    return (
        <button onClick={onClick} className={`${baseClass} ${className}`} {...props}>
            {children}
        </button>
    );
}
