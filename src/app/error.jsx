"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log del error para debugging
    console.error("Error en la aplicación:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0A0F16] flex items-center justify-center p-4">
      <div className="text-center bg-[#111722] rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5 max-w-md">
        <h1 className="text-4xl font-semibold text-white mb-4 tracking-tight">Error</h1>
        <p className="text-lg text-[#C8D3E0]/80 mb-2">Algo salió mal</p>
        <p className="text-sm text-[#C8D3E0]/60 mb-6">
          {error?.message || "Ocurrió un error inesperado. Por favor, revisa los logs del servidor en Vercel."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-[#2A3A4F] text-white font-medium hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#1A2332] text-white font-medium hover:brightness-110 transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

