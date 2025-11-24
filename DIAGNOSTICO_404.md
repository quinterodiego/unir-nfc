# Diagnóstico: 404 Persistente en Vercel

## 🔍 Pasos de Diagnóstico

### 1. Verificar Estado del Deployment

1. Ve a **Vercel Dashboard** → Tu proyecto → **Deployments**
2. Verifica el estado del último deployment:
   - ✅ **Ready** (verde) = Deployment exitoso
   - ❌ **Error** (rojo) = Build falló
   - ⏳ **Building** = Aún en proceso

### 2. Revisar Build Logs

1. Click en el deployment más reciente
2. Click en **"Build Logs"**
3. Busca:
   - ✅ `✓ Compiled successfully` = Build exitoso
   - ❌ Errores de compilación
   - ⚠️ Advertencias (pueden ser normales)

**Si el build fue exitoso pero sigue dando 404, el problema es en runtime.**

### 3. Revisar Runtime Logs (CRÍTICO)

1. En el mismo deployment, click en **"Runtime Logs"**
2. Abre una nueva pestaña y accede a `https://unir-nfc.vercel.app`
3. Vuelve a los Runtime Logs
4. Busca la entrada más reciente para tu request
5. **Busca estos errores específicos:**

```
❌ Error: Cannot find module
❌ Error: Module not found
❌ Error: ENOENT: no such file or directory
❌ Error: Failed to load
❌ TypeError: Cannot read property
```

### 4. Verificar Variables de Entorno

Aunque el build pasó, las variables pueden estar faltando en runtime:

1. Ve a **Settings** → **Environment Variables**
2. Verifica que TODAS estas estén configuradas:
   - `GOOGLE_PROJECT_ID`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEETS_ID`
   - `NEXT_PUBLIC_BASE_URL`

3. **IMPORTANTE:** Verifica que estén configuradas para:
   - ✅ **Production** (crítico)
   - ✅ **Preview** (recomendado)
   - ✅ **Development** (opcional)

### 5. Verificar Estructura de Archivos

El proyecto usa `src/app/` en lugar de `app/`. Next.js debería detectarlo automáticamente, pero verifica:

1. La estructura debe ser:
   ```
   src/
     app/
       page.tsx        ← Página principal
       layout.tsx      ← Layout raíz
       not-found.jsx   ← Página 404
       error.jsx       ← Página de error
   ```

2. Verifica que `tsconfig.json` tenga:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

### 6. Probar Build Local

Para verificar que el problema no es del código:

```bash
# Limpiar cache
rm -rf .next
rm -rf node_modules/.cache

# Reinstalar dependencias
npm install

# Build local
npm run build

# Probar en producción local
npm run start
```

Si funciona localmente pero no en Vercel, el problema es de configuración en Vercel.

### 7. Verificar Configuración de Vercel

1. Ve a **Settings** → **General**
2. Verifica:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (o vacío, debería detectarse)
   - **Output Directory:** (vacío, Next.js lo maneja)
   - **Install Command:** `npm install` (o vacío)

### 8. Limpiar Cache y Redeploy

A veces el cache puede causar problemas:

1. Ve a **Deployments**
2. Click en los tres puntos (⋯) del último deployment
3. Selecciona **"Redeploy"**
4. O mejor aún, haz un nuevo commit vacío:
   ```bash
   git commit --allow-empty -m "Force redeploy"
   git push
   ```

### 9. Verificar Dominio

1. Ve a **Settings** → **Domains**
2. Verifica que `unir-nfc.vercel.app` esté configurado
3. Si usas un dominio personalizado, verifica que esté correctamente configurado

### 10. Probar Rutas Específicas

Prueba estas URLs para ver cuál funciona:

- `https://unir-nfc.vercel.app/` - Debe mostrar la página principal
- `https://unir-nfc.vercel.app/create` - Debe mostrar el formulario
- `https://unir-nfc.vercel.app/u/123` - Debe mostrar 404 (perfil no existe) o el perfil
- `https://unir-nfc.vercel.app/ruta-inexistente` - Debe mostrar 404 personalizado

**Si TODAS dan 404, el problema es que el deployment no se completó correctamente.**

## 🔧 Soluciones Comunes

### Solución 1: Error en Runtime que Causa 404

Si en Runtime Logs ves un error como:
```
Error: Cannot find module '@/components/Hero'
```

**Causa:** Problema con los paths de TypeScript o imports.

**Solución:** Verifica que todos los imports usen `@/` correctamente y que los archivos existan.

### Solución 2: Variables de Entorno Faltantes

Si en Runtime Logs ves:
```
Error: GOOGLE_SHEETS_ID environment variable is not set
```

**Causa:** Variables no configuradas en Vercel.

**Solución:** Configura todas las variables en Vercel Dashboard → Settings → Environment Variables.

### Solución 3: Deployment No Completado

Si el deployment está en estado "Building" o "Error":

**Solución:** Espera a que termine o corrige los errores de build.

### Solución 4: Cache Corrupto

**Solución:** 
1. Ve a Deployments
2. Click en los tres puntos (⋯)
3. Selecciona **"Redeploy"**
4. O haz un commit nuevo para forzar un nuevo build

### Solución 5: Configuración de Next.js Incorrecta

**Solución:** Simplifica `next.config.ts` (ya hecho) y asegúrate de que no haya configuraciones conflictivas.

## 📋 Checklist Final

- [ ] Build está en estado "Ready" (verde)
- [ ] Build Logs muestran "✓ Compiled successfully"
- [ ] Runtime Logs no muestran errores al acceder a `/`
- [ ] Todas las variables de entorno están configuradas para Production
- [ ] Estructura de archivos es correcta (`src/app/page.tsx` existe)
- [ ] `tsconfig.json` tiene la configuración de paths correcta
- [ ] Build local funciona (`npm run build && npm run start`)
- [ ] Se intentó redeploy después de configurar variables

## 🆘 Si Nada Funciona

1. **Crea un issue en GitHub** con:
   - Screenshot del error 404
   - Build Logs completos
   - Runtime Logs del request que falla
   - Configuración de variables (sin valores sensibles)

2. **Contacta a Vercel Support** con:
   - URL del deployment
   - Error ID del 404 (ej: `gru1:gru1::ggct4-1764003616241-d78e3e6bc6ea`)
   - Descripción del problema

3. **Prueba crear un proyecto mínimo** para verificar que Vercel funciona:
   ```bash
   mkdir test-nextjs
   cd test-nextjs
   npx create-next-app@latest .
   # Configura en Vercel y verifica que funciona
   ```

## 🎯 Próximos Pasos Inmediatos

1. **Revisa Runtime Logs** - Esto es lo más importante
2. **Verifica variables de entorno** - Asegúrate de que estén en Production
3. **Haz un redeploy** - Después de verificar todo lo anterior
4. **Prueba build local** - Para descartar problemas del código

