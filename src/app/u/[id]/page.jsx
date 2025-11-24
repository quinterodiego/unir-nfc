import { getProfileById } from "@/lib/googleSheets";
import ProfileCard from "@/components/ProfileCard";
import QRCodeBlock from "@/components/QRCodeBlock";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }) {
  // En Next.js 16+, params es una Promise
  const { id } = await params;
  
  // Validar que el ID existe
  if (!id || typeof id !== 'string') {
    notFound();
  }

  const profile = await getProfileById(id);

  // Usar notFound() de Next.js para manejar 404 correctamente
  // Esto evita errores 500 y devuelve un 404 apropiado
  if (!profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0F16] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Perfil */}
          <div className="lg:col-span-2">
            <ProfileCard profile={profile} />
          </div>

          {/* QR Code */}
          <div className="lg:col-span-1">
            <QRCodeBlock id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

