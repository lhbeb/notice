import 'server-only';
import { createClient } from '@supabase/supabase-js';

let supabaseAdminInstance: ReturnType<typeof createClient> | null = null;
let initializationError: Error | null = null;

function initializeSupabaseAdmin() {
  // Return cached instance if available
  if (supabaseAdminInstance) {
    return supabaseAdminInstance;
  }

  // Return cached error if initialization already failed
  if (initializationError) {
    throw initializationError;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    initializationError = new Error(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    );
    throw initializationError;
  }

  try {
    supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    return supabaseAdminInstance;
  } catch (error) {
    initializationError = error as Error;
    throw error;
  }
}

// Create a proxy that lazily initializes Supabase only when properties are accessed
// This prevents initialization on module load - the Proxy object itself is safe to create
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    try {
      const instance = initializeSupabaseAdmin();
      const value = (instance as any)[prop];
      // Bind functions to the instance to preserve 'this' context
      if (typeof value === 'function') {
        return value.bind(instance);
      }
      return value;
    } catch (error) {
      // If initialization fails, throw a more helpful error
      throw new Error(
        `Failed to access Supabase admin client: ${error instanceof Error ? error.message : 'Unknown error'}. ` +
        'Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your environment variables.'
      );
    }
  }
});

// Also export the function for cases where direct access is needed
export function getSupabaseAdmin() {
  return initializeSupabaseAdmin();
}

