import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ToastContainer from "../ToastContainer";


const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const remove = useCallback((id) => {
        setToasts(toast => toast.filter(t => t.id !== id));
    }, []);

    const push = useCallback((toast) => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => {
            const next = [...prev, { id, ...toast }];
            return next.slice(-5);
        });
        const ttl = toast.ttl ?? 3000;
        if (ttl > 0) setTimeout(() => remove(id), ttl);
        return id;
    }, [remove]);

    const make = useCallback((type) => (text, ttl) => push({ type, text, ttl }), [push]);

    const value = useMemo(() => ({
        toasts, push, remove,
        success: make('success'),
        info: make('info'),
        warning: make('warning'),
        error: make('error'),
    }), [toasts, push, remove, make]);

    return (
        <ToastCtx.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onClose={remove} />
        </ToastCtx.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastCtx);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}
