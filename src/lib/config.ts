export const config = {
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
  },
  app: {
    name: 'RAG Sources Admin Panel',
    version: '1.0.0',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  },
} as const;

// Validate required environment variables
export function validateConfig() {
  const requiredEnvVars = {
    SUPABASE_URL: config.supabase.url,
    SUPABASE_SERVICE_KEY: config.supabase.serviceKey,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}
