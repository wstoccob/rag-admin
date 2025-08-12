import { createClient } from '@supabase/supabase-js';
import { config, validateConfig } from './config';
import { SupabaseError, PossibleError } from '@/types/supabase';

// Validate configuration on import
validateConfig();

export const supabaseClient = createClient(
  config.supabase.url!,
  config.supabase.serviceKey!
);

// Helper function to handle Supabase errors
export function handleSupabaseError(error: PossibleError): SupabaseError {
  if (error && typeof error === 'object' && 'message' in error) {
    const e = error as { message?: string; details?: string; hint?: string; code?: string };
    return {
      message: e.message ?? 'An unexpected error occurred',
      details: e.details,
      hint: e.hint,
      code: e.code,
    };
  }

  return {
    message: 'An unexpected error occurred',
  };
}