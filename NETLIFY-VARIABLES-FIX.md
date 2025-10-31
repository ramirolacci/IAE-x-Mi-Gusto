# 🔧 Solución: Variables de Entorno no Funcionan en Netlify

Si configuraste las variables en Netlify pero la app sigue mostrando que faltan, sigue estos pasos:

## ✅ Pasos para Solucionar

### 1. Verificar que las Variables Estén Correctamente Escritas

Ve a Netlify → Tu sitio → **Site settings** → **Environment variables**

**Verifica que:**
- Los nombres sean EXACTAMENTE así (con `VITE_` al inicio):
  - `VITE_GA_ID`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

- NO debe haber espacios extra
- Los valores deben estar completos (sin cortes)

### 2. **CRÍTICO: Redesplegar DESPUÉS de Agregar Variables**

**Esto es lo más importante:** Después de agregar o modificar variables de entorno en Netlify, DEBES hacer un nuevo deploy.

1. Ve a **Deploys** en Netlify
2. Haz clic en **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Espera a que termine el build

**Sin un nuevo deploy, las variables no se aplicarán al build.**

### 3. Verificar el Build en Netlify

1. Ve a **Deploys** → Selecciona el último deploy
2. Revisa los **Build logs**
3. Busca si hay errores relacionados con variables de entorno
4. Verifica que el build se completó exitosamente

### 4. Verificar Variables en el Deploy

En Netlify, las variables están disponibles SOLO en el build. Para verificar:

1. En el build log, busca si aparece alguna referencia a las variables
2. Verifica que el build se completó sin errores

### 5. Limpiar Cache del Navegador

Después de redespelgar:
1. Abre la URL de tu sitio en modo incógnito
2. O limpia la caché del navegador (Ctrl+Shift+Delete)
3. Recarga la página (Ctrl+F5)

### 6. Verificar que las Variables Estén en el Build Correcto

Asegúrate de que:
- Las variables estén en **Production** (no solo en Branch deploys)
- Si usas branches, verifica que las variables estén en el branch correcto

## 🔍 Cómo Verificar que las Variables Están Cargadas

Después de redespelgar, en la consola del navegador deberías ver:
- ✅ NO debería aparecer el error de variables faltantes
- Si ves el error, significa que las variables NO se cargaron correctamente

## 📋 Checklist de Verificación

- [ ] Variables agregadas en Netlify con nombres exactos (incluyendo `VITE_`)
- [ ] Valores completos y sin espacios extra
- [ ] **NUEVO DEPLOY realizado después de agregar variables**
- [ ] Build completado exitosamente
- [ ] Cache del navegador limpiado
- [ ] Probar en modo incógnito

## 🆘 Si Aún No Funciona

### Opción 1: Verificar en Netlify Dashboard

1. Ve a **Site settings** → **Environment variables**
2. Verifica que aparezcan TODAS las variables listadas
3. Haz clic en cada una para verificar que el valor esté correcto

### Opción 2: Recrear las Variables

1. Elimina todas las variables
2. Agrega cada una nuevamente
3. Haz un nuevo deploy con cache limpio

### Opción 3: Verificar Formato

Las variables deben estar así en Netlify:

**Nombre:** `VITE_SUPABASE_URL`
**Valor:** `https://cqvcpqddhnqrziybzwgt.supabase.co`

**NO deben tener:**
- Espacios al inicio o final
- Comillas extra
- Caracteres especiales incorrectos

### Opción 4: Ver Build Logs

En los build logs de Netlify, busca si hay algún mensaje sobre variables de entorno. A veces Netlify muestra advertencias si las variables no se pueden usar.

## ⚠️ Nota Importante

Las variables de entorno de Vite (las que empiezan con `VITE_`) se inyectan en el código **durante el build**, no en runtime. Por eso es crítico:
1. Agregar las variables ANTES del build
2. O hacer un NUEVO build después de agregarlas

Si agregas las variables pero no redespelgas, el código ya compilado no las tendrá.

## 🎯 Solución Rápida

1. Ve a Netlify → Environment variables
2. Verifica que TODAS las 6 variables estén ahí
3. Ve a Deploys
4. Click en "Trigger deploy" → "Clear cache and deploy site"
5. Espera el build
6. Prueba en modo incógnito

