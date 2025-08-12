import { useState, useCallback } from 'react';
import { RagSource } from '@/types/ragSource';
import { apiClient } from '@/lib/api';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';
import { toast } from 'react-hot-toast';

interface UseSourcesReturn {
  sources: RagSource[];
  loading: boolean;
  updateLoading: boolean;
  error: string | null;
  fetchSources: () => Promise<void>;
  updateSource: (id: string, data: Partial<RagSource>) => Promise<void>;
  clearError: () => void;
}

export function useSources(): UseSourcesReturn {
  const [sources, setSources] = useState<RagSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSources = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiClient.getSources();
      setSources(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.FETCH_FAILED;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSource = useCallback(async (id: string, data: Partial<RagSource>) => {
    setUpdateLoading(true);
    const loadingToast = toast.loading('Updating source...');

    try {
      await apiClient.updateSource(id, data);
      await fetchSources(); // Refresh the list
      toast.success(SUCCESS_MESSAGES.SOURCE_UPDATED, { id: loadingToast });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.UPDATE_FAILED;
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setUpdateLoading(false);
    }
  }, [fetchSources]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    sources,
    loading,
    updateLoading,
    error,
    fetchSources,
    updateSource,
    clearError,
  };
}
