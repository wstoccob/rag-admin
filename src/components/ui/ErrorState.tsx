import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  loading?: boolean;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  loading = false,
  className = '',
}) => (
  <div className={`bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto mt-8 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-shrink-0">
        <svg 
          className="w-6 h-6 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-red-800">Error Loading Sources</h2>
    </div>
    
    <p className="text-red-700 mb-4">{error}</p>
    
    {onRetry && (
      <button
        onClick={onRetry}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading && <LoadingSpinner size={16} color="white" />}
        Try Again
      </button>
    )}
  </div>
);
