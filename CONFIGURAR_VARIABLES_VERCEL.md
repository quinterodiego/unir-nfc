# Configurar Variables de Entorno en Vercel

## ⚠️ Error Actual

El build está fallando porque faltan variables de entorno. Sigue estos pasos para configurarlas:

## 📋 Pasos Rápidos

### 1. Ir al Dashboard de Vercel

1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `unir-nfc`
3. Click en **Settings** (Configuración)
4. Click en **Environment Variables** (Variables de Entorno)

### 2. Agregar las Variables

Agrega las siguientes variables **una por una**:

#### Variable 1: `GOOGLE_PROJECT_ID`
- **Key:** `GOOGLE_PROJECT_ID`
- **Value:** Tu project ID de Google Cloud (ej: `mi-proyecto-123456`)
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### Variable 2: `GOOGLE_CLIENT_EMAIL`
- **Key:** `GOOGLE_CLIENT_EMAIL`
- **Value:** El email de tu cuenta de servicio (ej: `service@mi-proyecto.iam.gserviceaccount.com`)
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### Variable 3: `GOOGLE_PRIVATE_KEY`
- **Key:** `GOOGLE_PRIVATE_KEY`
- **Value:** La clave privada completa del JSON de la cuenta de servicio
  - **IMPORTANTE:** Pega el valor **SIN comillas dobles**
  - Debe incluir los saltos de línea `\n` tal como aparecen en el JSON
  - Ejemplo: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### Variable 4: `GOOGLE_SHEETS_ID`
- **Key:** `GOOGLE_SHEETS_ID`
- **Value:** El ID de tu Google Sheet (está en la URL entre `/d/` y `/edit`)
  - Ejemplo: Si la URL es `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
  - El ID es: `1ABC123xyz`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### Variable 5: `NEXT_PUBLIC_BASE_URL`
- **Key:** `NEXT_PUBLIC_BASE_URL`
- **Value:** Tu dominio de Vercel (ej: `https://unir-nfc.vercel.app`)
  - **IMPORTANTE:** Usa `https://` (no `http://`)
  - Reemplaza `unir-nfc.vercel.app` con tu dominio real
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

### 3. Guardar y Redeploy

Después de agregar todas las variables:

1. **Guarda** cada variable (click en "Save")
2. Ve a la pestaña **Deployments**
3. Click en los **tres puntos (⋯)** del último deployment
4. Selecciona **Redeploy**
5. Espera a que el build termine

## 🔍 ¿Dónde Obtener los Valores?

### GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY

Estos valores vienen del archivo JSON de la cuenta de servicio de Google Cloud:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **APIs y servicios** → **Credenciales**
4. Busca tu cuenta de servicio y descarga el JSON
5. Del JSON, extrae:
   - `project_id` → `GOOGLE_PROJECT_ID`
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

### GOOGLE_SHEETS_ID

1. Abre tu Google Sheet
2. Mira la URL en el navegador
3. El ID está entre `/d/` y `/edit`
   - Ejemplo: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
   - El ID es: `1ABC123xyz`

### NEXT_PUBLIC_BASE_URL

1. Ve a tu proyecto en Vercel Dashboard
2. En la pestaña **Settings** → **Domains**
3. Copia el dominio de producción (ej: `unir-nfc.vercel.app`)
4. Agrega `https://` al inicio: `https://unir-nfc.vercel.app`

## ✅ Verificar que Funciona

Después del redeploy:

1. Espera a que el build termine (debe estar en estado "Ready")
2. Visita tu dominio: `https://tu-dominio.vercel.app`
3. Deberías ver la página principal
4. Intenta crear un perfil en `/create`
5. Verifica que puedas acceder a un perfil en `/u/[id]`

## 🐛 Si Sigue Fallando

### Error: "Variables de entorno faltantes"

1. Verifica que agregaste **todas** las variables
2. Verifica que están configuradas para **Production, Preview y Development**
3. Verifica que no hay espacios extra al copiar/pegar
4. Para `GOOGLE_PRIVATE_KEY`, asegúrate de pegar el valor completo con los `\n`

### Error: "Build failed"

1. Revisa los **Build Logs** en Vercel
2. Busca el error específico
3. Verifica que todas las variables estén correctamente configuradas

### Error en Runtime: "Google Sheets credentials not configured"

1. Verifica que las variables de Google están configuradas
2. Verifica que `GOOGLE_PRIVATE_KEY` tiene el formato correcto (con `\n`)
3. Verifica que la cuenta de servicio tiene permisos en el Google Sheet

## 📝 Notas Importantes

- ⚠️ **NUNCA** commitees el archivo JSON de la cuenta de servicio
- ⚠️ Las variables de entorno son **sensibles** - no las compartas públicamente
- ✅ El script de validación ahora solo valida variables críticas para el build
- ✅ Las variables de runtime generan advertencias pero no bloquean el build
- ✅ Sin embargo, la app **fallará en runtime** si no están configuradas

## 🎯 Resumen

1. Ve a Vercel Dashboard → Tu Proyecto → Settings → Environment Variables
2. Agrega las 5 variables con sus valores
3. Configúralas para Production, Preview y Development
4. Haz Redeploy
5. ¡Listo!

