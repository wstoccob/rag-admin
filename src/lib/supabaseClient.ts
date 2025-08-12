import { createClient } from '@supabase/supabase-js';
import { config, validateConfig } from './config';

// Validate configuration on import
validateConfig();

export const supabaseClient = createClient(
  config.supabase.url!,
  config.supabase.serviceKey!
);

// Type for Supabase error
export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any): SupabaseError {
  if (error?.message) {
    return {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    };
  }
  
  return {
    message: 'An unexpected error occurred',
  };
}