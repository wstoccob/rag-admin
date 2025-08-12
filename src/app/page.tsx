'use client';

import React, { useEffect, useState } from 'react';
import { RagSource } from '@/types/ragSource';
import { DataTable } from '@/components/DataTable';
import { Toaster, toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

export default function HomePage() {
  const [sources, setSources] = useState<RagSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/sources');
      if (!res.ok) throw new Error(`Failed to fetch sources: ${res.status} ${res.statusText}`);
      const data: RagSource[] = await res.json();
      setSources(data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load sources';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, updated: Partial<RagSource>) => {
    setUpdateLoading(true);

    const loadingToast = toast.loading('Updating source...');

    try {
      const res = await fetch(`/api/sources/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Update failed: ${res.status} ${res.statusText}`);
      }

      await fetchSources(); // refresh table
      toast.success('Source updated successfully!', { id: loadingToast });
    } catch (err: any) {
      const errorMessage = err.message || 'Update failed';
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
        <main className="p-6 flex items-center justify-center min-h-64">
          <div className="flex flex-col items-center gap-4">
            <ClipLoader size={40} color="#3B82F6" />
            <p className="text-gray-600 text-lg">Loading sources...</p>
          </div>
        </main>
    );
  }

  if (error && sources.length === 0) {
    return (
        <>
          <main className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-red-800">Error Loading Sources</h2>
              </div>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                  onClick={fetchSources}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <ClipLoader size={16} color="white" />}
                Try Again
              </button>
            </div>
          </main>
          <Toaster position="top-right" />
        </>
    );
  }

  return (
      <>
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">RAG Sources Admin Panel</h1>
            {updateLoading && (
                <div className="flex items-center gap-3 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  <ClipLoader size={20} color="#3B82F6" />
                  <span className="font-medium">Updating...</span>
                </div>
            )}
          </div>

          <DataTable data={sources} onUpdate={handleUpdate} disabled={updateLoading} />

          {sources.length === 0 && !loading && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg">No sources found</p>
              </div>
          )}
        </main>

        {/* Toast notifications */}
        <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
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