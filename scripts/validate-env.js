#!/usr/bin/env node

/**
 * Script para validar que todas las variables de entorno requeridas estén configuradas.
 * 
 * Uso:
 *   node scripts/validate-env.js
 * 
 * Este script se ejecuta automáticamente antes del build si se agrega al package.json:
 *   "prebuild": "node scripts/validate-env.js"
 */

const requiredEnvVars = {
  // Variables requeridas para producción
  production: [
    'GOOGLE_PROJECT_ID',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_CLIENT_EMAIL',
    'GOOGLE_SHEETS_ID',
    'NEXT_PUBLIC_BASE_URL',
  ],
  // Variables requeridas para desarrollo (pueden ser opcionales)
  development: [
    'GOOGLE_PROJECT_ID',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_CLIENT_EMAIL',
    'GOOGLE_SHEETS_ID',
  ],
};

// Determinar el ambiente
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const isVercel = !!process.env.VERCEL;

// Seleccionar las variables requeridas según el ambiente
const required = isProduction || isVercel 
  ? requiredEnvVars.production 
  : requiredEnvVars.development;

// Validar variables
const missing = [];
const invalid = [];

for (const key of required) {
  const value = process.env[key];
  
  if (!value) {
    missing.push(key);
  } else if (key === 'GOOGLE_PRIVATE_KEY') {
    // Validar formato básico de la clave privada
    if (!value.includes('BEGIN PRIVATE KEY') || !value.includes('END PRIVATE KEY')) {
      invalid.push(`${key} (formato incorrecto: debe incluir BEGIN/END PRIVATE KEY)`);
    }
  } else if (key === 'NEXT_PUBLIC_BASE_URL') {
    // Validar que sea una URL válida
    try {
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol)) {
        invalid.push(`${key} (debe ser http:// o https://)`);
      }
    } catch {
      invalid.push(`${key} (no es una URL válida)`);
    }
  }
}

// Mostrar resultados
if (missing.length > 0 || invalid.length > 0) {
  console.error('\n❌ Error: Variables de entorno faltantes o inválidas\n');
  
  if (missing.length > 0) {
    console.error('Variables faltantes:');
    missing.forEach(key => {
      console.error(`  - ${key}`);
    });
    console.error('');
  }
  
  if (invalid.length > 0) {
    console.error('Variables inválidas:');
    invalid.forEach(msg => {
      console.error(`  - ${msg}`);
    });
    console.error('');
  }
  
  console.error('💡 Solución:');
  console.error('  1. Crea un archivo .env.local con las variables requeridas');
  console.error('  2. O configura las variables en Vercel Dashboard → Settings → Environment Variables');
  console.error('  3. Asegúrate de que estén configuradas para Production, Preview y Development\n');
  
  if (isVercel) {
    console.error('⚠️  Estás en Vercel. El build fallará si las variables no están configuradas.\n');
  }
  
  process.exit(1);
}

console.log('✅ Todas las variables de entorno están configuradas correctamente');
console.log(`   Ambiente: ${nodeEnv}`);
console.log(`   Variables validadas: ${required.length}\n`);

