import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Solo mostrar warning en desarrollo, no en producción para no romper la app
if (import.meta.env.DEV) {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Variables de entorno de Supabase no encontradas en desarrollo');
    console.warn('  - VITE_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
    console.warn('  - VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌');
  }
}

// Crear cliente - usar valores por defecto vacíos si no hay variables para evitar errores
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
