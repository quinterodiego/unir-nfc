export default function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F16] via-[#111722] to-[#0A0F16] opacity-100"></div>
      
      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-6">
          Pulsera NFC
        </h1>
        <p className="text-xl md:text-2xl text-[#C8D3E0]/80 font-light mb-8 max-w-2xl mx-auto">
          Crea tu perfil público y compártelo con un simple toque
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/create"
            className="px-8 py-4 rounded-xl bg-[#2A3A4F] text-white font-medium hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
          >
            Crear Perfil
          </a>
          <a
            href="#como-funciona"
            className="px-8 py-4 rounded-xl bg-[#111722] text-[#C8D3E0] font-medium border border-white/5 hover:bg-[#1a2330] transition-all"
          >
            Cómo funciona
          </a>
        </div>
      </div>
      
      {/* Efecto de luz ambiental */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  );
}

