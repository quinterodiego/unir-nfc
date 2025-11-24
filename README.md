# Pulsera NFC - MVP

Perfil público con NFC usando Next.js 15, TailwindCSS y Google Sheets.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GOOGLE_PROJECT_ID=tu_project_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=tu_email@proyecto.iam.gserviceaccount.com
GOOGLE_SHEETS_ID=tu_sheet_id
```

### 3. Configurar Google Sheet

1. Crea un Google Sheet con una pestaña llamada **`profiles`**
2. En la fila 1, agrega los encabezados (en este orden):
   - `id` | `name` | `lastname` | `bio` | `photoUrl` | `instagram` | `facebook` | `linkedin` | `phone` | `email` | `createdAt`
3. Comparte el Sheet con el email de la cuenta de servicio (`GOOGLE_CLIENT_EMAIL`) con permisos de **"Editor"**

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📋 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── create-profile/
│   │       └── route.js          # API para crear perfiles
│   ├── u/
│   │   └── [id]/
│   │       └── page.jsx           # Página pública del perfil
│   ├── create/
│   │   └── page.jsx               # Página del formulario
│   └── page.jsx                   # Página principal
├── components/
│   ├── ProfileForm.jsx            # Formulario de creación
│   ├── ProfileCard.jsx             # Tarjeta de perfil
│   └── QRCodeBlock.jsx             # Componente QR
└── lib/
    └── googleSheets.js             # Conexión a Google Sheets
```

---

## 🔧 Cómo usar

### Crear un perfil

1. Visita: `http://localhost:3000/create`
2. Completa el formulario con tus datos
3. Haz clic en "Crear Perfil"
4. Serás redirigido a tu perfil: `/u/[id]`

### Ver un perfil

Accede a: `http://localhost:3000/u/[id]`

Donde `[id]` es el ID generado automáticamente (ej: `1732550902849`)

---

## 📝 Formato de Datos en Google Sheets

| id | name | lastname | bio | photoUrl | instagram | facebook | linkedin | phone | email | createdAt |
|----|------|----------|-----|----------|-----------|----------|----------|-------|-------|------------|
| 1732550902849 | Juan | Pérez | Mi descripción | https://... | https://ig.com/juan | | https://linkedin.com/in/juan | +5491123456789 | juan@email.com | 2024-01-01T00:00:00.000Z |

**Notas:**
- `id` se genera automáticamente con `Date.now()`
- Los campos opcionales pueden dejarse vacíos
- `photoUrl` debe ser una URL de imagen válida

---

## 🔑 Configurar Google Sheets API

### Paso 1: Obtener el ID del Sheet

1. Abre tu Google Sheet
2. El ID está en la URL entre `/d/` y `/edit`
3. Ejemplo: `https://docs.google.com/spreadsheets/d/1ABC123.../edit`
4. El ID es: `1ABC123...`

### Paso 2: Crear cuenta de servicio

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto o selecciona uno existente
3. Habilita **Google Sheets API**
4. Crea una **Cuenta de servicio**:
   - "APIs y servicios" > "Credenciales" > "+ CREAR CREDENCIALES" > "Cuenta de servicio"
5. Genera una clave **JSON**
6. Extrae del JSON:
   - `project_id` → `GOOGLE_PROJECT_ID`
   - `client_email` → `GOOGLE_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

### Paso 3: Compartir el Sheet

1. Abre tu Google Sheet
2. Click en "Compartir"
3. Pega el `GOOGLE_CLIENT_EMAIL`
4. Asigna permiso **"Editor"**
5. Click en "Compartir"

---

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno en la configuración
3. Actualiza `NEXT_PUBLIC_BASE_URL` con tu dominio de Vercel
4. Deploy automático en cada push

### Variables de entorno en producción

```env
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app
GOOGLE_PROJECT_ID=tu_project_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=tu_email@proyecto.iam.gserviceaccount.com
GOOGLE_SHEETS_ID=tu_sheet_id
```

---

## 📱 Programar Pulsera NFC

1. Descarga **NFC Tools** (Android/iOS)
2. Abre la app
3. Selecciona "Escribir"
4. Elige "Añadir un registro" > "URL/URI"
5. Ingresa: `https://tu-dominio.com/u/[tu-id]`
6. Acerca la pulsera NFC al teléfono
7. ¡Listo! Al acercar cualquier dispositivo NFC a la pulsera, abrirá tu perfil

---

## 🐛 Solución de Problemas

### Error: "Perfil no encontrado"
- Verifica que el ID existe en tu Google Sheet
- Verifica que la pestaña se llama exactamente `profiles`

### Error: "The caller does not have permission"
- Verifica que compartiste el Sheet con el `GOOGLE_CLIENT_EMAIL`
- Verifica que la cuenta de servicio tiene permisos de "Editor"

### Error: "Invalid credentials"
- Verifica que copiaste correctamente el `GOOGLE_PRIVATE_KEY` con todos los `\n`
- Verifica que está entre comillas dobles en el `.env.local`

### El QR no se genera
- Verifica que `NEXT_PUBLIC_BASE_URL` está configurado correctamente
- En desarrollo, usa `http://localhost:3000`
- En producción, usa tu dominio completo con `https://`

---

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

---

## 📄 Licencia

Este proyecto es un MVP de código abierto.
