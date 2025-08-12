import React from 'react';
import { ClipLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = '#3B82F6',
  className = '',
}) => (
  <div className={`flex items-center justify-center ${className}`}>
    <ClipLoader size={size} color={color} />
  </div>
);

interface LoadingStateProps {
  message?: string;
  size?: number;
  color?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  size = 40,
  color = '#3B82F6',
}) => (
  <div className="flex flex-col items-center gap-4">
    <LoadingSpinner size={size} color={color} />
    <p className="text-gray-600 text-lg">{message}</p>
  </div>
);
