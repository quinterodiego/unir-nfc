# Configurar Variables de Entorno Localmente

## 🔴 Error Actual

Estás viendo este error en desarrollo local:
```
❌ GOOGLE_SHEETS_ID environment variable is not set
```

Esto es **normal** - necesitas configurar las variables de entorno localmente.

## ✅ Solución Rápida

### Paso 1: Crear archivo `.env.local`

En la raíz del proyecto (mismo nivel que `package.json`), crea un archivo llamado `.env.local`

### Paso 2: Agregar las variables

Copia este contenido y reemplaza los valores con tus credenciales reales:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

GOOGLE_PROJECT_ID=tu_project_id
GOOGLE_CLIENT_EMAIL=tu_email@proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

GOOGLE_SHEETS_ID=tu_sheet_id
```

### Paso 3: Reiniciar el servidor de desarrollo

Después de crear el archivo:

1. **Detén el servidor** (Ctrl+C en la terminal)
2. **Reinícialo:**
   ```bash
   npm run dev
   ```

## 📝 ¿Dónde Obtener los Valores?

### GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **APIs y servicios** → **Credenciales**
4. Busca tu cuenta de servicio y descarga el JSON
5. Del JSON, extrae:
   - `project_id` → `GOOGLE_PROJECT_ID`
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

**⚠️ IMPORTANTE sobre GOOGLE_PRIVATE_KEY:**
- Debe estar entre comillas dobles `"`
- Debe incluir los `\n` (saltos de línea) tal como aparecen en el JSON
- Ejemplo: `"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"`

### GOOGLE_SHEETS_ID

1. Abre tu Google Sheet
2. Mira la URL en el navegador
3. El ID está entre `/d/` y `/edit`
   - Ejemplo: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
   - El ID es: `1ABC123xyz`

### NEXT_PUBLIC_BASE_URL

Para desarrollo local, usa:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## ✅ Verificar que Funciona

Después de configurar `.env.local` y reiniciar el servidor:

1. El error `GOOGLE_SHEETS_ID environment variable is not set` debería desaparecer
2. Puedes acceder a `http://localhost:3000`
3. Puedes crear perfiles en `/create`

## 🔒 Seguridad

- ✅ El archivo `.env.local` está en `.gitignore` (no se sube a GitHub)
- ✅ **NUNCA** commitees el archivo `.env.local`
- ✅ **NUNCA** compartas tus credenciales públicamente

## 📋 Checklist

- [ ] Archivo `.env.local` creado en la raíz del proyecto
- [ ] Todas las variables configuradas con valores reales
- [ ] `GOOGLE_PRIVATE_KEY` tiene comillas dobles y `\n`
- [ ] Servidor de desarrollo reiniciado
- [ ] Error desapareció
- [ ] La aplicación funciona en `http://localhost:3000`

## 🆘 Si Sigue Fallando

1. **Verifica que el archivo se llama exactamente `.env.local`** (con el punto al inicio)
2. **Verifica que está en la raíz del proyecto** (mismo nivel que `package.json`)
3. **Reinicia el servidor** después de crear/modificar el archivo
4. **Verifica que no hay espacios extra** al copiar/pegar los valores
5. **Verifica que `GOOGLE_PRIVATE_KEY` tiene las comillas dobles** y los `\n`

## 💡 Nota sobre los Warnings de Source Maps

Los warnings sobre "Invalid source map" son **normales** en desarrollo y **no afectan** la funcionalidad. Puedes ignorarlos.

