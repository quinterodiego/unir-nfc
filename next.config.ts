import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mejorar mensajes de error en producción
  reactStrictMode: true,
  
  // Configuración para mejorar la detección de errores
  typescript: {
    // En producción, fallar el build si hay errores de TypeScript
    ignoreBuildErrors: false,
  },
  
  // Nota: ESLint ya no se configura en next.config.ts en Next.js 16+
  // Se ejecuta por separado con 'next lint' o 'npm run lint'
};

export default nextConfig;
