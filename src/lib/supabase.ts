import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Faltan variables de entorno de Supabase:');
  console.error('  - VITE_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('  - VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌');
  
  // En producción, no lanzar error que rompa la app
  if (import.meta.env.PROD) {
    console.warn('⚠️ Variables de entorno faltantes en producción. La app puede no funcionar correctamente.');
  }
}

// Crear cliente solo si tenemos las variables necesarias
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('', ''); // Cliente dummy para evitar errores
