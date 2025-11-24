import { google } from "googleapis";

export async function getSheetsClient() {
  // Verificar que las variables de entorno estén configuradas
  const missing = [];
  
  if (!process.env.GOOGLE_PROJECT_ID) missing.push('GOOGLE_PROJECT_ID');
  if (!process.env.GOOGLE_PRIVATE_KEY) missing.push('GOOGLE_PRIVATE_KEY');
  if (!process.env.GOOGLE_CLIENT_EMAIL) missing.push('GOOGLE_CLIENT_EMAIL');
  
  if (missing.length > 0) {
    const errorMessage = `Google Sheets credentials not configured. Missing: ${missing.join(', ')}. ` +
      `Please set these environment variables in Vercel Dashboard → Settings → Environment Variables.`;
    console.error('❌', errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        // Reemplazar \n escapados por saltos de línea reales
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    return sheets;
  } catch (error) {
    console.error("❌ Error al crear cliente de Google Sheets:", error.message);
    // Re-lanzar el error para que el llamador pueda manejarlo
    throw error;
  }
}

export async function addProfile(data) {
  try {
    if (!process.env.GOOGLE_SHEETS_ID) {
      const errorMessage = "GOOGLE_SHEETS_ID environment variable is not set. " +
        "Please configure it in Vercel Dashboard → Settings → Environment Variables.";
      console.error('❌', errorMessage);
      throw new Error(errorMessage);
    }

    const sheets = await getSheetsClient();
    
    const row = [
      data.id,
      data.name,
      data.lastname,
      data.bio,
      data.photoUrl,
      data.instagram || "",
      data.facebook || "",
      data.linkedin || "",
      data.phone || "",
      data.email || "",
      data.createdAt || new Date().toISOString(),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "profiles!A:K",
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });

    return true;
  } catch (error) {
    console.error("Error al agregar perfil:", error);
    throw error;
  }
}

export async function getProfileById(id) {
  try {
    // Validar entrada
    if (!id || typeof id !== 'string') {
      console.warn("getProfileById: ID inválido", id);
      return null;
    }

    if (!process.env.GOOGLE_SHEETS_ID) {
      console.error("❌ GOOGLE_SHEETS_ID environment variable is not set. " +
        "Please configure it in Vercel Dashboard → Settings → Environment Variables.");
      return null;
    }

    // Intentar obtener el cliente de Sheets
    // Si falla por credenciales, devolvemos null en lugar de lanzar error
    let sheets;
    try {
      sheets = await getSheetsClient();
    } catch (authError) {
      console.error("❌ Error de autenticación con Google Sheets:", authError.message);
      // En producción, no queremos que esto cause un 500, devolvemos null
      return null;
    }

    // Obtener datos del sheet
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "profiles!A2:K999",
    });

    const rows = res.data.values || [];
    
    // Buscar el perfil por ID (columna 0)
    const profile = rows.find((row) => row && row[0] === id);

    if (!profile) {
      console.log(`Perfil con ID ${id} no encontrado en el sheet`);
      return null;
    }

    // Validar que el perfil tenga al menos los campos mínimos
    if (!profile[0] || !profile[1] || !profile[2]) {
      console.warn(`Perfil ${id} tiene datos incompletos`);
      return null;
    }

    return {
      id: profile[0],
      name: profile[1],
      lastname: profile[2],
      bio: profile[3] || "",
      photoUrl: profile[4] || "",
      instagram: profile[5] || "",
      facebook: profile[6] || "",
      linkedin: profile[7] || "",
      phone: profile[8] || "",
      email: profile[9] || "",
      createdAt: profile[10] || new Date().toISOString(),
    };
  } catch (error) {
    // Capturar todos los errores posibles y devolver null
    // Esto previene que errores de Sheets causen 500 en la página
    console.error("❌ Error al obtener perfil:", error.message || error);
    
    // Log detallado solo en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.error("Stack trace:", error.stack);
    }
    
    return null;
  }
}

