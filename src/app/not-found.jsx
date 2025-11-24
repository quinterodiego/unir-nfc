export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0F16] flex items-center justify-center p-4">
      <div className="text-center bg-[#111722] rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5 max-w-md">
        <h1 className="text-4xl font-semibold text-white mb-4 tracking-tight">404</h1>
        <p className="text-lg text-[#C8D3E0]/80 mb-6">Página no encontrada</p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-[#2A3A4F] text-white font-medium hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

