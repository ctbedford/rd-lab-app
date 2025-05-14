import 'react-native-url-polyfill/auto'; // Required for Supabase to work in React Native
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('Supabase URL is not defined. Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_URL is set.');
  // You might want to throw an error here or handle it differently
}

if (!supabaseAnonKey) {
  console.error('Supabase Anon Key is not defined. Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_ANON_KEY is set.');
  // You might want to throw an error here or handle it differently
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    // Supabase specific-config for React Native
    // autoRefreshToken: true, // Handled by Supabase client by default
    // persistSession: true, // Handled by Supabase client by default
    // detectSessionInUrl: false, // Typically not needed for React Native
  },
});
