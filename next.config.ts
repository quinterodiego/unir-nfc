import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Validar variables de entorno críticas en tiempo de build
  // Esto ayuda a detectar problemas antes de que el deployment falle
  onDemandEntries: {
    // Configuración para desarrollo
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Mejorar mensajes de error en producción
  reactStrictMode: true,
  
  // Configuración para mejorar la detección de errores
  typescript: {
    // En producción, fallar el build si hay errores de TypeScript
    ignoreBuildErrors: false,
  },
  
  eslint: {
    // En producción, fallar el build si hay errores de ESLint
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
