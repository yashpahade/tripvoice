import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an unexpected error while trying to process your request. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center bg-red-50/50 rounded-xl border border-red-100 ${className}`}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-[#EB2026]">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#031021] mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
