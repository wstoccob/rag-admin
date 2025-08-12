'use client';

import React, { useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { LoadingState } from '@/components/ui/LoadingSpinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useSources } from '@/hooks/useSources';
import { config } from '@/lib/config';
import { CONSTANTS } from '@/lib/constants';
import { Toaster } from 'react-hot-toast';

export default function HomePage() {
  const {
    sources,
    loading,
    updateLoading,
    error,
    fetchSources,
    updateSource,
  } = useSources();

  useEffect(() => {
    void fetchSources();
  }, [fetchSources]);

  if (loading) {
    return (
      <main className="p-6 flex items-center justify-center min-h-64">
        <LoadingState message="Loading sources..." />
      </main>
    );
  }

  if (error && sources.length === 0) {
    return (
      <>
        <main className="p-6">
          <ErrorState 
            error={error} 
            onRetry={fetchSources} 
            loading={loading} 
          />
        </main>
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <>
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {config.app.name}
          </h1>
          {updateLoading && (
            <div className="flex items-center gap-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
              <LoadingSpinner size={20} color="#3B82F6" />
              <span className="font-medium">Updating...</span>
            </div>
          )}
        </div>

        <DataTable 
          data={sources} 
          onUpdate={updateSource} 
          disabled={updateLoading} 
        />

        {sources.length === 0 && !loading && (
          <EmptyState />
        )}
      </main>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: CONSTANTS.UI.TOAST_DURATION,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}