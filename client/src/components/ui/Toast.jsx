import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

let toastIdCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, message, duration = 4000 }) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, type, message }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = (message) => addToast({ type: 'success', message });
  const error = (message) => addToast({ type: 'error', message });
  const warning = (message) => addToast({ type: 'warning', message });
  const info = (message) => addToast({ type: 'info', message });

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#1A7971]" />,
    error: <XCircle className="w-5 h-5 text-[#EB2026]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#FF7F3F]" />,
    info: <Info className="w-5 h-5 text-[#008CFF]" />
  };

  const borders = {
    success: 'border-l-4 border-l-[#1A7971]',
    error: 'border-l-4 border-l-[#EB2026]',
    warning: 'border-l-4 border-l-[#FF7F3F]',
    info: 'border-l-4 border-l-[#008CFF]'
  };

  const toastContainer = (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start p-4 bg-white shadow-lg rounded-lg border border-gray-100 min-w-[300px] max-w-sm ${borders[toast.type]}`}
          >
            <div className="flex-shrink-0 mr-3">
              {icons[toast.type]}
            </div>
            <div className="flex-1 mr-4 mt-0.5">
              <p className="text-sm font-medium text-[#031021]">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <ToastContext.Provider value={{ success, error, warning, info }}>
      {children}
      {typeof document !== 'undefined' && createPortal(toastContainer, document.body)}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
