# Configuración en Vercel

## Variables de Entorno Requeridas

Para que la aplicación funcione correctamente en Vercel, debes configurar las siguientes variables de entorno en el dashboard de Vercel:

### 1. Ir a la configuración del proyecto en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **Settings** (Configuración)
3. Click en **Environment Variables** (Variables de Entorno)

### 2. Agregar las siguientes variables:

#### Variables obligatorias:

```
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app
GOOGLE_PROJECT_ID=tu_project_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=tu_email@proyecto.iam.gserviceaccount.com
GOOGLE_SHEETS_ID=tu_sheet_id
```

### 3. Importante sobre GOOGLE_PRIVATE_KEY:

- Debe estar entre comillas dobles `"`
- Debe incluir los `\n` (saltos de línea) tal como aparecen en el JSON
- Ejemplo completo:
  ```
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
  ```

### 4. NEXT_PUBLIC_BASE_URL:

- En desarrollo local: `http://localhost:3000`
- En producción: `https://tu-dominio.vercel.app` (reemplaza con tu dominio real de Vercel)

### 5. Ambientes (Environments):

Asegúrate de que las variables estén configuradas para:
- ✅ **Production**
- ✅ **Preview** (opcional, pero recomendado)
- ✅ **Development** (opcional)

### 6. Después de agregar las variables:

1. Ve a **Deployments**
2. Click en los tres puntos (⋯) del último deployment
3. Selecciona **Redeploy**
4. Esto aplicará las nuevas variables de entorno

---

## Verificar que funciona:

1. Visita tu dominio de Vercel
2. Deberías ver la página principal
3. Intenta crear un perfil en `/create`
4. Verifica que puedas acceder a un perfil en `/u/[id]`

---

## Troubleshooting

### Error 404:
- Verifica que todas las variables de entorno estén configuradas
- Verifica que `NEXT_PUBLIC_BASE_URL` tenga el dominio correcto
- Revisa los logs de Vercel para ver errores específicos

### Error al crear perfil:
- Verifica que `GOOGLE_SHEETS_ID` sea correcto
- Verifica que la cuenta de servicio tenga permisos de "Editor" en el Google Sheet
- Verifica que el Sheet tenga la pestaña "profiles" con los encabezados correctos

### Error al ver perfil:
- Verifica que el ID del perfil exista en el Google Sheet
- Revisa los logs de Vercel para ver el error específico

