import React, { createContext, useContext, useState } from 'react';
import ToastContainer from '../ToastContainer';

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function remove(id) {
    setToasts(toast => toast.filter(t => t.id !== id));
  }

  function push(toast) {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => {
      const next = [...prev, { id, ...toast }];
      return next.slice(-5);
    });
    const ttl = toast.ttl ?? 3000;
    if (ttl > 0) setTimeout(() => remove(id), ttl);
    return id;
  }

  const make = type => (text, ttl) => push({ type, text, ttl });

  const value = {
    toasts,
    push,
    remove,
    success: make('success'),
    info: make('info'),
    warning: make('warning'),
    error: make('error'),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={remove} />
    </ToastContext.Provider>
  );
}
