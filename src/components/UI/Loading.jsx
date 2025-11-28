import React from 'react';

export function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-amber-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl">💰</span>
                </div>
            </div>
            <p className="text-gray-400 text-sm animate-pulse">Loading...</p>
        </div>
    );
}
