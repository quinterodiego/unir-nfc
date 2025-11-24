# Guía: Configurar Google Sheets API

Esta guía te ayudará a obtener el ID del Sheet y las credenciales de la cuenta de servicio.

## Paso 1: Obtener el ID del Google Sheet

1. Abre tu Google Sheet en el navegador
2. Mira la URL en la barra de direcciones. Se verá algo así:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz789DEF456ghi012jkl345mno678pqr/edit
   ```
3. El **ID del Sheet** es la parte larga entre `/d/` y `/edit`:
   - En el ejemplo: `1ABC123xyz789DEF456ghi012jkl345mno678pqr`
4. Copia este ID y guárdalo para usarlo en `.env.local`

---

## Paso 2: Crear una Cuenta de Servicio en Google Cloud

### 2.1. Crear o seleccionar un proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Si no tienes un proyecto, crea uno:
   - Click en el selector de proyectos (arriba a la izquierda)
   - Click en "NUEVO PROYECTO"
   - Ingresa un nombre (ej: "Pulsera Profile")
   - Click en "CREAR"
3. Selecciona el proyecto que acabas de crear

### 2.2. Habilitar Google Sheets API

1. En el menú lateral, ve a **"APIs y servicios"** > **"Biblioteca"**
2. Busca "Google Sheets API"
3. Click en "Google Sheets API"
4. Click en **"HABILITAR"**

### 2.3. Crear una Cuenta de Servicio

1. En el menú lateral, ve a **"APIs y servicios"** > **"Credenciales"**
2. Click en **"+ CREAR CREDENCIALES"** (arriba)
3. Selecciona **"Cuenta de servicio"**
4. Completa el formulario:
   - **Nombre de la cuenta de servicio**: `pulsera-profile-service` (o el que prefieras)
   - **ID de cuenta de servicio**: Se genera automáticamente
   - **Descripción**: (opcional) "Cuenta de servicio para acceso a Google Sheets"
5. Click en **"CREAR Y CONTINUAR"**
6. En "Conceder a esta cuenta de servicio acceso al proyecto":
   - Selecciona el rol: **"Editor"** (o "Propietario" si prefieres)
   - Click en **"CONTINUAR"**
7. Click en **"LISTO"** (puedes saltar el paso de usuarios)

### 2.4. Generar la clave JSON

1. En la lista de cuentas de servicio, busca la que acabas de crear
2. Click en el **email de la cuenta de servicio** (termina en `@...iam.gserviceaccount.com`)
3. Ve a la pestaña **"CLAVES"**
4. Click en **"AGREGAR CLAVE"** > **"Crear nueva clave"**
5. Selecciona el formato **"JSON"**
6. Click en **"CREAR"**
7. Se descargará un archivo JSON automáticamente. **¡GUÁRDALO EN UN LUGAR SEGURO!**

### 2.5. Extraer información del JSON

Abre el archivo JSON descargado. Se verá algo así:

```json
{
  "type": "service_account",
  "project_id": "mi-proyecto-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "pulsera-profile-service@mi-proyecto-123456.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

Necesitas estos valores:
- `project_id` → `GOOGLE_PROJECT_ID`
- `client_email` → `GOOGLE_CLIENT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`

---

## Paso 3: Compartir el Google Sheet con la cuenta de servicio

**IMPORTANTE**: La cuenta de servicio necesita acceso al Sheet.

1. Abre tu Google Sheet
2. Click en el botón **"Compartir"** (arriba a la derecha)
3. En el campo de correo, pega el **`client_email`** de la cuenta de servicio
   - Ejemplo: `pulsera-profile-service@mi-proyecto-123456.iam.gserviceaccount.com`
4. Asigna el permiso: **"Editor"** (o "Lector" si solo vas a leer)
5. **Desmarca** la casilla "Notificar a las personas" (no es necesario)
6. Click en **"Compartir"**

---

## Paso 4: Configurar el archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto `pulsera-profile` con el siguiente contenido:

```env
SHEET_ID=tu_id_del_sheet_aqui
GOOGLE_PROJECT_ID=tu_project_id_del_json
GOOGLE_CLIENT_EMAIL=tu_client_email_del_json
GOOGLE_PRIVATE_KEY="tu_private_key_del_json_completa"
```

**Ejemplo real:**

```env
SHEET_ID=1ABC123xyz789DEF456ghi012jkl345mno678pqr
GOOGLE_PROJECT_ID=mi-proyecto-123456
GOOGLE_CLIENT_EMAIL=pulsera-profile-service@mi-proyecto-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**⚠️ IMPORTANTE sobre GOOGLE_PRIVATE_KEY:**
- Debe estar entre comillas dobles `"`
- Debe incluir los `\n` (saltos de línea) tal como aparecen en el JSON
- O puedes copiar la clave completa del JSON y el código la procesará correctamente

---

## Paso 5: Verificar que todo funciona

1. Asegúrate de que tu Google Sheet tiene:
   - Una pestaña llamada **`usuarios`**
   - La fila 1 con los encabezados: `username`, `nombre`, `bio`, `foto`, `instagram`, `tiktok`, `linkedin`, `whatsapp`
   - Al menos una fila de datos de ejemplo

2. Ejecuta el proyecto:
   ```bash
   cd pulsera-profile
   npm run dev
   ```

3. Visita: `http://localhost:3000/u/tu-username` (reemplaza `tu-username` con un username que exista en tu Sheet)

---

## Resumen de valores necesarios

| Variable | Dónde obtenerla |
|----------|----------------|
| `SHEET_ID` | URL del Google Sheet (entre `/d/` y `/edit`) |
| `GOOGLE_PROJECT_ID` | Archivo JSON descargado, campo `project_id` |
| `GOOGLE_CLIENT_EMAIL` | Archivo JSON descargado, campo `client_email` |
| `GOOGLE_PRIVATE_KEY` | Archivo JSON descargado, campo `private_key` |

---

## Troubleshooting

### Error: "The caller does not have permission"
- Verifica que compartiste el Sheet con el `client_email` de la cuenta de servicio
- Verifica que la cuenta de servicio tiene permisos de "Editor" o "Lector"

### Error: "Requested entity was not found"
- Verifica que el `SHEET_ID` es correcto
- Verifica que el Sheet existe y está accesible

### Error: "Invalid credentials"
- Verifica que copiaste correctamente el `GOOGLE_PRIVATE_KEY` con todos los `\n`
- Verifica que está entre comillas dobles en el `.env.local`

