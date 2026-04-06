import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jilhqlznhnchvmmvumxd.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbGhxbHpuaG5jaHZtbXZ1bXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMDQ2ODEsImV4cCI6MjA5MDg4MDY4MX0.1F8UAxddLFyKM5nd4Han8n7L11AeKdqQoINLs45TSH4";

// Log initialization info (only in development or if explicitly debugging)
if (typeof window !== 'undefined') {
  console.log('[Supabase] Initializing client...');
  console.log('[Supabase] URL configured:', !!supabaseUrl);
  console.log('[Supabase] Anon key configured:', !!supabaseAnonKey);
}

// Note: Supabase supports both legacy JWT format (eyJ...) and new publishable keys (sb_)
// Using legacy JWT format for maximum compatibility

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce"
  }
});

// Verify the client was created successfully
if (typeof window !== 'undefined') {
  console.log('[Supabase] Client created:', !!supabase);
  console.log('[Supabase] Auth module available:', !!(supabase && supabase.auth));
}
