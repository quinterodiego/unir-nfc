import { NextResponse } from "next/server";
import { addProfile } from "@/lib/googleSheets";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, lastname, bio, photoUrl, instagram, facebook, linkedin, phone, email } = body;

    // Validaciones básicas
    if (!name || !lastname || !bio || !photoUrl) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: name, lastname, bio, photoUrl" },
        { status: 400 }
      );
    }

    // Generar ID único
    const id = Date.now().toString();

    // Crear objeto de perfil
    const profileData = {
      id,
      name,
      lastname,
      bio,
      photoUrl,
      instagram: instagram || "",
      facebook: facebook || "",
      linkedin: linkedin || "",
      phone: phone || "",
      email: email || "",
      createdAt: new Date().toISOString(),
    };

    // Guardar en Google Sheets
    await addProfile(profileData);

    return NextResponse.json(
      { id, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en create-profile:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

