import { google } from "googleapis";

export async function getSheetsClient() {
  // Verificar que las variables de entorno estén configuradas
  if (!process.env.GOOGLE_PROJECT_ID || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL) {
    throw new Error("Google Sheets credentials not configured. Please set GOOGLE_PROJECT_ID, GOOGLE_PRIVATE_KEY, and GOOGLE_CLIENT_EMAIL environment variables.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

export async function addProfile(data) {
  try {
    if (!process.env.GOOGLE_SHEETS_ID) {
      throw new Error("GOOGLE_SHEETS_ID environment variable is not set");
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
    if (!process.env.GOOGLE_SHEETS_ID) {
      console.error("GOOGLE_SHEETS_ID environment variable is not set");
      return null;
    }

    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "profiles!A2:K999",
    });

    const rows = res.data.values || [];
    const profile = rows.find((row) => row[0] === id);

    if (!profile) return null;

    return {
      id: profile[0],
      name: profile[1],
      lastname: profile[2],
      bio: profile[3],
      photoUrl: profile[4],
      instagram: profile[5],
      facebook: profile[6],
      linkedin: profile[7],
      phone: profile[8],
      email: profile[9],
      createdAt: profile[10],
    };
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return null;
  }
}

