"use client";

import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[100] flex items-center space-x-2 rounded-lg bg-black px-4 py-3 text-white shadow-lg transition-opacity duration-300 animate-fade-in-up">
            <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                />
            </svg>
            <span className="font-medium text-sm">{message}</span>
        </div>
    );
}
