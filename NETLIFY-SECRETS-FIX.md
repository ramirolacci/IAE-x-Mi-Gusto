# 🔐 Solución: Error de Secret Scanning en Netlify

## ❌ Problema

Netlify está bloqueando el deploy porque detecta las variables `VITE_*` como "secretos" en el código compilado.

## ✅ Solución

He creado el archivo `netlify.toml` que le dice a Netlify que estas son **claves públicas** diseñadas para estar en el cliente.

### ¿Por qué son seguras?

- **`VITE_SUPABASE_ANON_KEY`**: Es la clave **anónima** de Supabase, diseñada específicamente para estar en el cliente. Está protegida por Row Level Security (RLS) de Supabase.
- **`VITE_SUPABASE_URL`**: Es la URL pública de tu proyecto, no es secreta.
- **`VITE_EMAILJS_*`**: Son claves públicas de EmailJS diseñadas para estar en el cliente.

### ¿Qué hace el archivo netlify.toml?

Le dice a Netlify que **NO escanee** estas variables como secretos, porque son públicas por diseño.

## 📝 Próximos Pasos

1. **Commit el archivo `netlify.toml`** al repositorio:
   ```bash
   git add netlify.toml
   git commit -m "Configurar Netlify para omitir claves públicas del secret scanning"
   git push
   ```

2. **Netlify detectará automáticamente el cambio** y hará un nuevo deploy.

3. **Verifica el deploy** en Netlify - debería pasar sin errores.

## 🔒 Seguridad

**IMPORTANTE:** Si alguna vez necesitas agregar una clave REALMENTE secreta:
- ❌ NO la uses con `VITE_` (se incluirá en el cliente)
- ✅ Úsala en Netlify Functions (server-side)
- ✅ O úsala en un backend separado

Las claves actuales (`VITE_*`) son públicas por diseño y están bien en el cliente.

## ✅ Verificación

Después del deploy:
- El build debería completarse exitosamente
- No debería aparecer el error de secret scanning
- La app debería funcionar correctamente

