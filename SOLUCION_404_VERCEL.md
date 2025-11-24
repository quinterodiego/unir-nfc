# Solución: Error 404 en Vercel

## 1. ¿Qué significa el 404 en Vercel?

El mensaje **404: NOT_FOUND** en Vercel puede indicar varias cosas:

### A) El build subió pero la ruta no existe
- La ruta que intentas acceder no se generó correctamente (ej: `/u/123` no existe)
- El archivo de ruta no está en la ubicación correcta

### B) No hay página de index en el root
- Falta `app/page.tsx` o `pages/index.js`
- El `output` está mal configurado en `next.config.ts`

### C) Error en runtime dentro de `getProfileById()`
- Uso de variables de entorno que fallan en producción
- Errores no manejados que provocan que la ruta devuelva 404

### D) App Router: faltan archivos de manejo de errores
- Falta `app/not-found.tsx` o `app/error.tsx`
- El servidor devuelve 404 por falla en SSR

### E) Configuración incorrecta
- `next.config.ts` o `vercel.json` mal configurados para rutas dinámicas/rewrites

---

## 2. Checklist Rápido (en este orden)

### ✅ Paso 1: Revisar Build Logs en Vercel
1. Ve a **Vercel Dashboard** → Tu proyecto → **Deployments**
2. Click en el deployment más reciente
3. Click en **"Build Logs"**
4. Busca errores de compilación, especialmente:
   - `Module not found`
   - `Environment variable not found`
   - `Syntax error`
   - `Type error`

### ✅ Paso 2: Revisar Runtime Logs
1. En el mismo deployment, click en **"Runtime Logs"**
2. Accede a la ruta que da 404 (ej: `https://tu-app.vercel.app/u/123`)
3. Mira la entrada del log para ese request
4. Busca errores como:
   - `Error: Google Sheets credentials not configured`
   - `Error: GOOGLE_SHEETS_ID is not set`
   - `Error: Cannot read property of undefined`

### ✅ Paso 3: Confirmar estructura de archivos
Verifica que tus archivos de rutas existan exactamente como en el proyecto:

**App Router (Next.js 13+):**
- ✅ `app/page.tsx` - Página principal
- ✅ `app/u/[id]/page.jsx` - Ruta dinámica de perfil
- ✅ `app/not-found.jsx` - Página 404 personalizada
- ✅ `app/error.jsx` - Página de error (opcional pero recomendado)

**Pages Router (Next.js 12 y anteriores):**
- ✅ `pages/index.js` - Página principal
- ✅ `pages/u/[id].js` - Ruta dinámica

### ✅ Paso 4: Verificar variables de entorno
En **Vercel Dashboard** → **Settings** → **Environment Variables**, confirma:

```
✅ GOOGLE_PROJECT_ID
✅ GOOGLE_CLIENT_EMAIL
✅ GOOGLE_PRIVATE_KEY (con saltos de línea \n correctos)
✅ GOOGLE_SHEETS_ID
✅ NEXT_PUBLIC_BASE_URL
```

**Importante:** Asegúrate de que estén configuradas para:
- ✅ **Production**
- ✅ **Preview** (recomendado)
- ✅ **Development** (opcional)

### ✅ Paso 5: Verificar página raíz
Confirma que tengas `app/page.tsx` o `pages/index.js` para no quedar sin ruta raíz.

### ✅ Paso 6: Verificar NEXT_PUBLIC_BASE_URL
Si la app usa `NEXT_PUBLIC_BASE_URL`, que esté seteada en Production con el dominio correcto:
```
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app
```

### ✅ Paso 7: Revisar configuración de rewrites
Si usas `vercel.json` o rewrites en `next.config.ts`, confirma que no haya una regla que interfiera con las rutas dinámicas.

---

## 3. Correcciones Implementadas

### ✅ A) `app/not-found.tsx` mejorado
Ya existe y está mejorado para:
- Mostrar mensaje claro de error
- Incluir link de vuelta al inicio
- Usar componentes de Next.js (`Link` en lugar de `<a>`)

### ✅ B) Ruta dinámica `app/u/[id]/page.jsx` mejorada
**Cambios implementados:**
- ✅ Manejo correcto de `params` como Promise (Next.js 16+)
- ✅ Uso de `notFound()` de Next.js en lugar de renderizar componente
- ✅ Validación del ID antes de buscar el perfil
- ✅ Esto evita errores 500 y devuelve 404 apropiado

**Código actualizado:**
```jsx
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }) {
  const { id } = await params; // Next.js 16+ requiere await
  
  if (!id || typeof id !== 'string') {
    notFound();
  }

  const profile = await getProfileById(id);

  if (!profile) {
    notFound(); // Devuelve 404 en lugar de renderizar componente
  }
  
  // ... resto del código
}
```

### ✅ C) `lib/googleSheets.js` con protección de errores mejorada
**Mejoras implementadas:**
- ✅ `getProfileById` atrapa TODOS los errores y devuelve `null`
- ✅ Validación de entrada (ID válido)
- ✅ Manejo de errores de autenticación sin causar 500
- ✅ Logs detallados solo en desarrollo
- ✅ Validación de datos del perfil antes de retornar

**Código mejorado:**
```javascript
export async function getProfileById(id) {
  try {
    // Validar entrada
    if (!id || typeof id !== 'string') {
      return null;
    }

    // Manejar errores de autenticación sin causar 500
    let sheets;
    try {
      sheets = await getSheetsClient();
    } catch (authError) {
      console.error("Error de autenticación:", authError.message);
      return null; // No lanzar error, devolver null
    }

    // ... resto del código con manejo de errores
  } catch (error) {
    // Capturar TODOS los errores y devolver null
    console.error("Error al obtener perfil:", error.message);
    return null; // Previene 500, permite que notFound() maneje el 404
  }
}
```

### ✅ D) Variables de entorno validadas
El script `scripts/validate-env.js` verifica todas las variables antes del build.

### ✅ E) `app/page.tsx` existe
Ya existe y funciona correctamente.

### ✅ F) `next.config.ts` optimizado
Configuración mejorada para:
- Detectar errores de TypeScript
- Detectar errores de ESLint
- No usar `output: 'standalone'` a menos que sea necesario

---

## 4. Cómo Depurar Paso a Paso en Vercel

### Opción 1: Interfaz Web

1. **Build Logs:**
   - Vercel Dashboard → Tu proyecto → Deployments
   - Click en el deployment
   - Click en **"Build Logs"**
   - Busca errores de compilación

2. **Runtime Logs:**
   - Mismo deployment → **"Runtime Logs"**
   - Reproduce el 404 accediendo a la URL
   - Mira la traza del error

### Opción 2: CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Ver logs del deployment
vercel logs <deployment-url> --since 1h

# O ver logs en tiempo real
vercel logs --follow
```

### Opción 3: Build Local

```bash
# Validar variables de entorno
npm run validate-env

# Hacer build local (simula lo que hace Vercel)
npm run build

# Probar en producción local
npm run start
```

---

## 5. Si el Problema es la URL que Abriste

### Problema común:
Abriste el dominio raíz (`https://tu-app.vercel.app`) y no existe `app/page.tsx`, por lo que sale 404.

### Solución:
- ✅ Verifica que `app/page.tsx` existe (ya existe en tu proyecto)
- ✅ Asegúrate de abrir la ruta correcta (ej: `https://tu-app.vercel.app/u/1732550902849`)

### Rutas válidas en tu proyecto:
- ✅ `/` - Página principal (app/page.tsx)
- ✅ `/create` - Crear perfil
- ✅ `/u/[id]` - Ver perfil (ruta dinámica)
- ✅ Cualquier otra ruta → 404 (app/not-found.jsx)

---

## 6. Errores Comunes y Soluciones

### Error: "Module not found"
**Causa:** Import incorrecto o archivo no existe
**Solución:** Verifica que todos los imports sean correctos y los archivos existan

### Error: "Environment variable not found"
**Causa:** Variable de entorno no configurada en Vercel
**Solución:** Configura todas las variables en Vercel Dashboard → Settings → Environment Variables

### Error: "Cannot read property of undefined"
**Causa:** Datos del perfil incompletos o null
**Solución:** Ya implementado - `getProfileById` valida los datos antes de retornar

### Error: "Google Sheets credentials not configured"
**Causa:** Variables de Google Sheets faltantes
**Solución:** Configura `GOOGLE_PROJECT_ID`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CLIENT_EMAIL`

### Error: 500 en lugar de 404
**Causa:** Error no manejado en `getProfileById` o `getSheetsClient`
**Solución:** Ya implementado - todos los errores se capturan y devuelven `null`, luego `notFound()` maneja el 404

---

## 7. Próximos Pasos

1. **Haz un nuevo deployment:**
   ```bash
   git add .
   git commit -m "Fix: Mejorar manejo de errores y 404"
   git push
   ```

2. **Verifica en Vercel:**
   - Espera a que el build termine
   - Revisa Build Logs para asegurarte de que no hay errores
   - Prueba las rutas:
     - `/` - Debe funcionar
     - `/u/123` - Si el perfil no existe, debe mostrar 404 (no 500)
     - `/ruta-inexistente` - Debe mostrar 404

3. **Revisa Runtime Logs:**
   - Si aún hay problemas, revisa los logs en tiempo real
   - Busca errores específicos y corrígelos

---

## 8. Resumen de Cambios

✅ **Mejoras implementadas:**
- `app/u/[id]/page.jsx` - Usa `notFound()` correctamente
- `lib/googleSheets.js` - Manejo robusto de errores
- `app/not-found.jsx` - Mejorado con Link de Next.js
- Validación de variables de entorno antes del build
- Logs mejorados para debugging

✅ **Prevención de errores:**
- Todos los errores se capturan y devuelven `null`
- `notFound()` maneja 404 apropiadamente
- No se lanzan errores no manejados que causen 500

✅ **Debugging mejorado:**
- Logs claros y descriptivos
- Script de validación de variables
- Documentación completa

