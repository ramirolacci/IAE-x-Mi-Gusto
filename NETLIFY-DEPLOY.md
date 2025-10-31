# 🚀 Despliegue en Netlify

Guía para desplegar la aplicación IAE x Mi Gusto en Netlify.

## 📋 Pasos para Desplegar

### 1. Preparar el repositorio

1. Asegúrate de que tu código esté en GitHub, GitLab o Bitbucket
2. Verifica que tengas un archivo `package.json` con el script `build`

### 2. Conectar con Netlify

1. Ve a https://app.netlify.com/
2. Inicia sesión o crea una cuenta
3. Haz clic en **"Add new site"** → **"Import an existing project"**
4. Conecta tu repositorio (GitHub, GitLab, etc.)
5. Selecciona el repositorio de tu proyecto

### 3. Configurar Build Settings

Netlify detectará automáticamente Vite, pero verifica:

**Build command:**
```
npm run build
```

**Publish directory:**
```
dist
```

### 4. ⚠️ CONFIGURAR VARIABLES DE ENTORNO (CRÍTICO)

**Esto es lo más importante:** Debes configurar todas las variables de entorno en Netlify.

1. En la configuración de tu sitio en Netlify, ve a:
   **Site settings** → **Environment variables** → **Add variable**

2. Agrega las siguientes variables **una por una**:

#### Variables Requeridas:

```
VITE_GA_ID = G-2ZLW066ZLD
```

```
VITE_SUPABASE_URL = https://cqvcpqddhnqrziybzwgt.supabase.co
```

```
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdmNwcWRkaG5xcnppeWJ6d2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MjcyNDksImV4cCI6MjA3NzEwMzI0OX0.i7ADiA-jNvxaIIWa1wuEVARdAvEVNrCDSF7DIuoGo8E
```

```
VITE_EMAILJS_SERVICE_ID = service_vroveb8
```

```
VITE_EMAILJS_TEMPLATE_ID = template_vejol1l
```

```
VITE_EMAILJS_PUBLIC_KEY = 2muZYDfZaoXaOzlBc
```

**Importante:** 
- NO incluyas espacios alrededor del `=`
- Copia los valores exactamente como están
- Cada variable debe estar en una línea separada

### 5. Desplegar

1. Después de agregar todas las variables de entorno
2. Ve a **Deploys** en Netlify
3. Si ya había un deploy anterior, haz clic en **"Trigger deploy"** → **"Clear cache and deploy site"**
4. Espera a que termine el build (puede tardar 2-5 minutos)

### 6. Verificar el Despliegue

1. Una vez completado el build, haz clic en la URL del sitio
2. Verifica que la página cargue correctamente
3. Abre la consola del navegador (F12) y verifica que:
   - ✅ No aparezcan errores de variables de entorno
   - ✅ La app funcione correctamente

## 🔧 Solución de Problemas

### Error: Variables de entorno faltantes

Si ves este error en la consola:
```
❌ Faltan variables de entorno de Supabase
```

**Solución:**
1. Ve a **Site settings** → **Environment variables**
2. Verifica que todas las variables estén agregadas
3. Asegúrate de que los nombres sean exactos (con `VITE_` al inicio)
4. Haz un nuevo deploy después de agregar las variables

### La página aparece en negro

**Causas posibles:**
1. Variables de entorno no configuradas
2. Error en el build
3. Problema con el código

**Solución:**
1. Verifica los logs del build en Netlify
2. Revisa la consola del navegador para ver errores
3. Asegúrate de que todas las variables estén configuradas

### Build falla

**Solución:**
1. Ve a **Deploys** → Revisa los logs del build
2. Verifica que el comando de build sea `npm run build`
3. Asegúrate de que `package.json` tenga el script `build`

## 📝 Configuración Avanzada

### Redirects para SPA

Si tienes rutas en el futuro, crea un archivo `public/_redirects` o `netlify.toml`:

**netlify.toml:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Dominio Personalizado

1. Ve a **Domain settings**
2. Agrega tu dominio personalizado
3. Sigue las instrucciones de Netlify para configurar DNS

## ✅ Checklist Pre-Deploy

- [ ] Código está en un repositorio Git
- [ ] `package.json` tiene script `build`
- [ ] Todas las variables de entorno están en `.env.local` localmente
- [ ] Variables de entorno configuradas en Netlify
- [ ] Build funciona localmente (`npm run build`)
- [ ] `dist/` se genera correctamente

## 🎉 Después del Deploy

Una vez desplegado:
1. Prueba que la app funcione
2. Verifica que los emails se envíen correctamente
3. Prueba en diferentes dispositivos (móvil, tablet, desktop)
4. Revisa que los códigos se obtengan de Supabase correctamente

