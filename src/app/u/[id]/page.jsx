import { getProfileById } from "@/lib/googleSheets";
import ProfileCard from "@/components/ProfileCard";
import QRCodeBlock from "@/components/QRCodeBlock";

export default async function ProfilePage({ params }) {
  const { id } = params;
  const profile = await getProfileById(id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0A0F16] flex items-center justify-center p-4">
        <div className="text-center bg-[#111722] rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
          <h1 className="text-2xl font-semibold text-white mb-2">Perfil no encontrado</h1>
          <p className="text-[#C8D3E0]/80">El perfil que buscas no existe.</p>
        </div>
      </div>
    );
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

