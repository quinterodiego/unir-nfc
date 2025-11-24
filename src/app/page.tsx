import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F16]">
      <Hero />
      
      <section id="como-funciona" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-12 text-center tracking-tight">
            ¿Cómo funciona?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#111722] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
              <div className="text-3xl font-semibold text-white mb-2">1</div>
              <h3 className="text-lg font-medium text-white mb-2">Completa el formulario</h3>
              <p className="text-[#C8D3E0]/80">Ingresa tus datos personales y redes sociales</p>
            </div>
            
            <div className="bg-[#111722] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
              <div className="text-3xl font-semibold text-white mb-2">2</div>
              <h3 className="text-lg font-medium text-white mb-2">Obtén tu URL única</h3>
              <p className="text-[#C8D3E0]/80">Recibe un enlace personalizado tipo <code className="text-[#2A3A4F]">/u/[id]</code></p>
            </div>
            
            <div className="bg-[#111722] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
              <div className="text-3xl font-semibold text-white mb-2">3</div>
              <h3 className="text-lg font-medium text-white mb-2">Programa tu pulsera</h3>
              <p className="text-[#C8D3E0]/80">Usa NFC Tools para escribir la URL en tu pulsera NFC</p>
            </div>
            
            <div className="bg-[#111722] rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
              <div className="text-3xl font-semibold text-white mb-2">4</div>
              <h3 className="text-lg font-medium text-white mb-2">Comparte tu perfil</h3>
              <p className="text-[#C8D3E0]/80">Al tocar tu pulsera, se abre tu perfil con QR para compartir</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="/create"
              className="inline-block px-8 py-4 rounded-xl bg-[#2A3A4F] text-white font-medium hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
            >
              Crear mi Perfil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
