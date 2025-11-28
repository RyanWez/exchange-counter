import React from 'react';

export function Input({ className = '', ...props }) {
    return (
        <input
            className={`input-dark ${className}`}
            {...props}
        />
    );
}

export function Select({ children, className = '', ...props }) {
    return (
        <select
            className={`select-dark ${className}`}
            {...props}
        >
            {children}
        </select>
    );
}
