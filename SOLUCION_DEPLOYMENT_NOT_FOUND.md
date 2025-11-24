# Solución: Error DEPLOYMENT_NOT_FOUND en Vercel

## 1. 🔧 Solución Propuesta

### Paso 1: Verificar el Estado del Deployment

1. **Ve al Dashboard de Vercel**: https://vercel.com/dashboard
2. **Selecciona tu proyecto**
3. **Ve a la pestaña "Deployments"**
4. **Revisa el estado del último deployment**:
   - ✅ Si está en "Ready" (verde) → El deployment existe, el problema es otro
   - ❌ Si está en "Error" (rojo) → El build falló, por eso no existe el deployment
   - ⏳ Si está en "Building" → Espera a que termine

### Paso 2: Verificar Variables de Entorno

El error más común es que **falten variables de entorno** o estén **mal configuradas**, causando que el build falle y el deployment nunca se complete.

**Verifica en Vercel Dashboard → Settings → Environment Variables:**

```env
✅ NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app
✅ GOOGLE_PROJECT_ID=tu_project_id
✅ GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
✅ GOOGLE_CLIENT_EMAIL=tu_email@proyecto.iam.gserviceaccount.com
✅ GOOGLE_SHEETS_ID=tu_sheet_id
```

**⚠️ IMPORTANTE:**
- Las variables deben estar configuradas para **Production**, **Preview** y **Development**
- `GOOGLE_PRIVATE_KEY` debe estar entre comillas dobles y con los `\n` intactos
- `NEXT_PUBLIC_BASE_URL` debe usar `https://` (no `http://`)

### Paso 3: Revisar Logs de Build

1. En el Dashboard de Vercel, ve a **Deployments**
2. Click en el deployment fallido
3. Revisa los **Build Logs** para ver el error específico
4. Busca errores como:
   - `Environment variable not found`
   - `Build failed`
   - `Module not found`
   - `Syntax error`

### Paso 4: Hacer un Nuevo Deployment

Si el deployment anterior falló:

1. **Opción A: Redeploy**
   - Ve a Deployments
   - Click en los tres puntos (⋯) del último deployment
   - Selecciona **Redeploy**

2. **Opción B: Push nuevo commit**
   ```bash
   git commit --allow-empty -m "Trigger new deployment"
   git push
   ```

3. **Opción C: Desconectar y reconectar el proyecto**
   - Settings → General → Disconnect Project
   - Vuelve a conectar el repositorio

### Paso 5: Verificar Configuración del Proyecto

Asegúrate de que:
- ✅ El proyecto está conectado al repositorio correcto
- ✅ La rama principal está configurada (generalmente `main` o `master`)
- ✅ El framework está detectado correctamente (Next.js)
- ✅ El comando de build es correcto (`next build`)

---

## 2. 🔍 Causa Raíz

### ¿Qué estaba haciendo el código vs. qué necesitaba hacer?

**Lo que estaba pasando:**
- Vercel intentaba crear un deployment de tu aplicación Next.js
- Durante el proceso de build, algo falló (variables de entorno faltantes, errores de sintaxis, dependencias, etc.)
- El deployment nunca se completó exitosamente
- Cuando intentas acceder al deployment, Vercel responde con `DEPLOYMENT_NOT_FOUND` porque el deployment no existe o fue eliminado

**Lo que necesitaba hacer:**
- El build debe completarse sin errores
- Todas las variables de entorno deben estar configuradas antes del build
- El código debe ser válido y sin errores de sintaxis
- Las dependencias deben instalarse correctamente

### ¿Qué condiciones desencadenaron este error específico?

1. **Variables de entorno faltantes o incorrectas**:
   - Si `GOOGLE_PROJECT_ID`, `GOOGLE_PRIVATE_KEY`, o `GOOGLE_CLIENT_EMAIL` no están configuradas
   - El código en `src/lib/googleSheets.js` lanza un error durante el build
   - El build falla y el deployment nunca se crea

2. **Build fallido por errores de código**:
   - Errores de sintaxis en TypeScript/JavaScript
   - Imports incorrectos
   - Dependencias faltantes

3. **Deployment eliminado manualmente**:
   - Si alguien eliminó el deployment desde el dashboard
   - Si el proyecto fue desconectado y reconectado

4. **Problemas de permisos**:
   - Si no tienes permisos para acceder al deployment
   - Si el proyecto fue transferido a otra cuenta

### ¿Qué malentendido u omisión llevó a esto?

**Malentendido común:**
- Asumir que las variables de entorno se configuran automáticamente
- Pensar que el deployment existe solo porque el código está en GitHub
- No revisar los logs de build cuando algo falla

**Omisiones típicas:**
- No configurar variables de entorno antes del primer deployment
- No verificar que el build funciona localmente antes de hacer push
- No revisar los logs de Vercel cuando hay errores

---

## 3. 📚 Concepto: ¿Por qué existe este error?

### ¿Por qué existe este error y qué te protege?

El error `DEPLOYMENT_NOT_FOUND` existe para:

1. **Prevenir acceso a recursos inexistentes**: 
   - Evita que intentes acceder a deployments que no existen
   - Protege contra URLs incorrectas o deployments eliminados

2. **Indicar problemas en el proceso de build**:
   - Si ves este error, es una señal de que algo falló en el proceso de deployment
   - Te obliga a revisar los logs y encontrar el problema real

3. **Mantener la integridad del sistema**:
   - Vercel solo permite acceso a deployments válidos y completos
   - Previene accesos a deployments parciales o corruptos

### Modelo mental correcto

**Piensa en el deployment como un proceso de 3 pasos:**

```
1. Build (Compilación)
   ↓
   [Si falla aquí → No hay deployment]
   ↓
2. Deployment (Despliegue)
   ↓
   [Si falla aquí → Deployment existe pero no está disponible]
   ↓
3. Runtime (Ejecución)
   ↓
   [Tu aplicación está corriendo]
```

**El error `DEPLOYMENT_NOT_FOUND` significa que el paso 1 o 2 falló.**

### ¿Cómo encaja esto en el framework/lenguaje?

**En Next.js y Vercel:**

- **Next.js** necesita compilar tu código durante el build
- Si hay errores en tiempo de build (variables faltantes, errores de sintaxis), el proceso falla
- **Vercel** solo crea un deployment si el build es exitoso
- Si el build falla, no hay deployment que mostrar

**Flujo típico:**
```
Push a GitHub
  ↓
Vercel detecta el push
  ↓
Inicia el build (`next build`)
  ↓
[Si hay errores → Build falla → No hay deployment]
  ↓
[Si no hay errores → Build exitoso → Deployment creado]
```

---

## 4. ⚠️ Señales de Advertencia

### ¿Qué buscar para evitar esto en el futuro?

**Señales de que el deployment puede fallar:**

1. **Build local falla**:
   ```bash
   npm run build
   # Si esto falla, el deployment en Vercel también fallará
   ```

2. **Variables de entorno no configuradas**:
   - Si tu código usa `process.env.VARIABLE` pero no está en `.env.local`
   - El build puede fallar o la app puede no funcionar

3. **Errores de TypeScript/ESLint**:
   - Si hay errores de tipos o linting
   - Vercel puede fallar el build si está configurado para ser estricto

4. **Dependencias faltantes**:
   - Si `package.json` no incluye todas las dependencias necesarias
   - El build fallará al intentar importar módulos inexistentes

### Patrones similares que pueden causar problemas:

1. **Variables de entorno con formato incorrecto**:
   ```env
   # ❌ Mal
   GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
   
   # ✅ Bien
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

2. **URLs incorrectas en variables públicas**:
   ```env
   # ❌ Mal
   NEXT_PUBLIC_BASE_URL=http://localhost:3000  # En producción
   
   # ✅ Bien
   NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app  # En producción
   ```

3. **No verificar el build localmente antes de hacer push**:
   ```bash
   # Siempre haz esto antes de push
   npm run build
   npm run start  # Verifica que funciona
   ```

### Code smells que indican este problema:

1. **Código que accede a `process.env` sin validación**:
   ```javascript
   // ❌ Mal - puede fallar silenciosamente
   const apiKey = process.env.API_KEY;
   
   // ✅ Bien - falla explícitamente si falta
   if (!process.env.API_KEY) {
     throw new Error("API_KEY is required");
   }
   ```

2. **Imports que pueden no existir**:
   ```javascript
   // Si el módulo no existe, el build falla
   import { something } from './non-existent-file';
   ```

3. **Uso de APIs del navegador en código del servidor**:
   ```javascript
   // ❌ Esto fallará en el build si se ejecuta en el servidor
   const data = localStorage.getItem('key');
   ```

---

## 5. 🔄 Alternativas y Trade-offs

### Enfoque 1: Validación temprana de variables de entorno

**Implementación:**
Crear un script que valide las variables antes del build:

```javascript
// scripts/validate-env.js
const required = [
  'GOOGLE_PROJECT_ID',
  'GOOGLE_PRIVATE_KEY',
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_SHEETS_ID',
  'NEXT_PUBLIC_BASE_URL'
];

const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Variables de entorno faltantes:', missing);
  process.exit(1);
}

console.log('✅ Todas las variables de entorno están configuradas');
```

**Trade-offs:**
- ✅ Previene deployments con variables faltantes
- ✅ Falla rápido y con mensaje claro
- ❌ Requiere mantener la lista de variables actualizada

### Enfoque 2: Valores por defecto para desarrollo

**Implementación:**
Usar valores por defecto en desarrollo pero requerirlos en producción:

```javascript
// src/lib/googleSheets.js
export async function getSheetsClient() {
  const projectId = process.env.GOOGLE_PROJECT_ID || 
    (process.env.NODE_ENV === 'development' ? 'dev-project' : null);
  
  if (!projectId) {
    throw new Error("GOOGLE_PROJECT_ID is required in production");
  }
  // ...
}
```

**Trade-offs:**
- ✅ Permite desarrollo local sin todas las variables
- ✅ Falla explícitamente en producción si faltan
- ❌ Puede ocultar problemas de configuración

### Enfoque 3: Configuración centralizada

**Implementación:**
Crear un módulo de configuración que valide todo:

```javascript
// src/config/env.js
export const config = {
  google: {
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  },
  sheets: {
    id: process.env.GOOGLE_SHEETS_ID,
  },
  app: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }
};

// Validar en tiempo de importación
if (process.env.NODE_ENV === 'production') {
  const missing = Object.entries(config)
    .flatMap(([key, value]) => 
      typeof value === 'object' 
        ? Object.entries(value).map(([k, v]) => v ? null : `${key}.${k}`)
        : value ? null : key
    )
    .filter(Boolean);
    
  if (missing.length > 0) {
    throw new Error(`Missing config: ${missing.join(', ')}`);
  }
}
```

**Trade-offs:**
- ✅ Configuración centralizada y fácil de mantener
- ✅ Validación automática
- ❌ Más complejo de implementar inicialmente

### Enfoque 4: Usar Vercel CLI para verificar antes de deploy

**Implementación:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Verificar configuración
vercel env ls

# Hacer build local con variables de Vercel
vercel build
```

**Trade-offs:**
- ✅ Prueba el build exactamente como Vercel lo hará
- ✅ Detecta problemas antes del push
- ❌ Requiere tener Vercel CLI instalado

### Recomendación

**Para tu proyecto, recomiendo combinar:**
1. **Validación temprana** (Enfoque 1) - Previene el problema
2. **Revisar logs siempre** - Detecta problemas rápidamente
3. **Build local antes de push** - `npm run build` antes de cada commit importante

---

## 📋 Checklist de Resolución

Usa este checklist cada vez que veas `DEPLOYMENT_NOT_FOUND`:

- [ ] Revisar estado del deployment en Vercel Dashboard
- [ ] Verificar logs de build para errores específicos
- [ ] Confirmar que todas las variables de entorno están configuradas
- [ ] Verificar que las variables están en los ambientes correctos (Production/Preview)
- [ ] Probar build local: `npm run build`
- [ ] Verificar que no hay errores de TypeScript/ESLint
- [ ] Confirmar que todas las dependencias están en `package.json`
- [ ] Hacer redeploy o push nuevo commit
- [ ] Verificar que el deployment nuevo está en estado "Ready"

---

## 🎯 Resumen

**El error `DEPLOYMENT_NOT_FOUND` ocurre cuando:**
- El build falla y el deployment nunca se completa
- El deployment fue eliminado
- Estás accediendo a una URL incorrecta

**La solución más común:**
- Configurar correctamente todas las variables de entorno
- Revisar los logs de build para encontrar el error real
- Hacer un nuevo deployment después de corregir el problema

**Prevención:**
- Siempre hacer `npm run build` localmente antes de push
- Validar variables de entorno antes del build
- Revisar logs de Vercel cuando algo falla

