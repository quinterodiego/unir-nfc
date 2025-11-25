# Solución: Error "Unable to parse range: profiles!A:K"

## 🔴 Problema Identificado

El error `Unable to parse range: profiles!A:K` significa que:

1. **La pestaña "profiles" no existe** en tu Google Sheet, O
2. **El nombre de la pestaña está mal escrito** (mayúsculas/minúsculas, espacios, etc.)

## ✅ Solución

### Paso 1: Verificar el Google Sheet

1. Abre tu Google Sheet (el que configuraste en `GOOGLE_SHEETS_ID`)
2. Mira las pestañas en la parte inferior
3. **Verifica el nombre exacto de la pestaña:**
   - Debe llamarse exactamente **`profiles`** (en minúsculas)
   - NO debe tener espacios antes o después
   - NO debe tener mayúsculas (no "Profiles" ni "PROFILES")

### Paso 2: Crear o Renombrar la Pestaña

**Si la pestaña NO existe:**

1. Click en el botón **"+"** en la parte inferior para crear una nueva pestaña
2. Click derecho en la nueva pestaña
3. Selecciona **"Renombrar"**
4. Escribe exactamente: **`profiles`** (todo en minúsculas, sin espacios)
5. Presiona Enter

**Si la pestaña existe pero tiene otro nombre:**

1. Click derecho en la pestaña
2. Selecciona **"Renombrar"**
3. Cambia el nombre a exactamente: **`profiles`** (todo en minúsculas)
4. Presiona Enter

### Paso 3: Configurar los Encabezados

En la **fila 1** de la pestaña "profiles", agrega estos encabezados (en este orden exacto):

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| id | name | lastname | bio | photoUrl | instagram | facebook | linkedin | phone | email | createdAt |

**O simplemente copia y pega esto en la fila 1:**
```
id	name	lastname	bio	photoUrl	instagram	facebook	linkedin	phone	email	createdAt
```

### Paso 4: Verificar Permisos

1. Click en el botón **"Compartir"** (arriba a la derecha)
2. Verifica que el email de tu cuenta de servicio (`GOOGLE_CLIENT_EMAIL`) esté en la lista
3. Si no está, agrégalo con permisos de **"Editor"**

### Paso 5: Reiniciar el Servidor

Después de configurar el Sheet:

1. Detén el servidor (Ctrl+C)
2. Reinícialo:
   ```bash
   npm run dev
   ```

## 🔍 Verificación

Después de hacer los cambios, intenta crear un perfil nuevamente. El error debería desaparecer.

## 📋 Checklist

- [ ] La pestaña se llama exactamente **`profiles`** (minúsculas, sin espacios)
- [ ] La fila 1 tiene los encabezados correctos (id, name, lastname, bio, photoUrl, instagram, facebook, linkedin, phone, email, createdAt)
- [ ] La cuenta de servicio tiene permisos de "Editor" en el Sheet
- [ ] El servidor fue reiniciado después de los cambios

## 🆘 Si Sigue Fallando

### Verificar que el Sheet ID es Correcto

1. Abre tu Google Sheet
2. Mira la URL en el navegador
3. El ID está entre `/d/` y `/edit`
   - Ejemplo: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit`
   - El ID es: `1ABC123xyz`
4. Verifica que este ID esté en tu `.env.local` como `GOOGLE_SHEETS_ID`

### Verificar que la Cuenta de Servicio Tiene Acceso

1. En el Sheet, click en "Compartir"
2. Verifica que el email de la cuenta de servicio (`GOOGLE_CLIENT_EMAIL`) esté listado
3. Si no está, agrégalo con permisos de "Editor"

### Probar con un Rango Más Específico

Si el problema persiste, el código puede necesitar un ajuste. Pero primero verifica que:
- La pestaña existe y se llama "profiles"
- Los encabezados están en la fila 1
- La cuenta de servicio tiene acceso

## 💡 Nota

El error "Unable to parse range" también puede ocurrir si:
- El Sheet está en una ubicación diferente (no en "My Drive")
- Hay problemas de permisos
- El Sheet fue eliminado o movido

Verifica que el Sheet existe y es accesible con la cuenta de servicio.

