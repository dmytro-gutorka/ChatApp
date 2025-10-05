import { createContext, useContext } from 'react';

export const ModalContext = createContext(null);

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) throw new Error('useModalContext must be used within a ModalProvider');

  return context;
}
