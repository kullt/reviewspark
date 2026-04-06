import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Validate key format - should be JWT format (eyJ...) not the new sb_publishable format
if (supabaseAnonKey.startsWith("sb_")) {
  console.error("[Supabase] WARNING: Using new API key format (sb_*). Auth may not work correctly.");
  console.error("[Supabase] Please use the legacy JWT format anon key (starts with eyJ) from your Supabase dashboard.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce"
  }
});
