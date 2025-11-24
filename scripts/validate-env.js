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

// Separar variables en build-time (críticas para el build) y runtime (solo necesarias cuando la app corre)
// En este proyecto, ninguna variable es crítica para el build (todas se usan en runtime)
const buildTimeVars = [
  // Variables que se usan durante el build (ej: en next.config.js, en código que se ejecuta en build)
  // Actualmente no hay variables críticas para el build en este proyecto
];

const runtimeVars = [
  // Variables que solo se necesitan cuando la app se ejecuta (runtime)
  // Estas son necesarias para que la app funcione, pero no bloquean el build
  'GOOGLE_PROJECT_ID',
  'GOOGLE_PRIVATE_KEY',
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_SHEETS_ID',
  'NEXT_PUBLIC_BASE_URL', // Se usa en componentes cliente, no crítico para build
];

// Determinar el ambiente
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const isVercel = !!process.env.VERCEL;

// Variables críticas para el build (si faltan, el build falla)
// Actualmente no hay variables críticas - todas se usan en runtime
const required = buildTimeVars;

// Variables de runtime (recomendadas pero no bloquean el build)
// Se validan pero solo generan advertencias, no errores
const recommendedRuntime = runtimeVars;

// Validar variables build-time (críticas - harán fallar el build)
const missing = [];
const invalid = [];

// Validar variables runtime (recomendadas - solo advertirán)
const missingRuntime = [];

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

// Validar variables runtime recomendadas (solo advertir, no fallar)
for (const key of recommendedRuntime) {
  if (!required.includes(key) && !process.env[key]) {
    missingRuntime.push(key);
  }
}

// Mostrar advertencias de runtime (no bloquean el build)
if (missingRuntime.length > 0) {
  console.warn('\n⚠️  Advertencia: Variables de runtime recomendadas faltantes\n');
  console.warn('Estas variables no son necesarias para el build, pero son requeridas en runtime:');
  missingRuntime.forEach(key => {
    console.warn(`  - ${key}`);
  });
  console.warn('\n💡 La aplicación puede fallar en runtime si estas variables no están configuradas.');
  console.warn('   Configúralas en Vercel Dashboard → Settings → Environment Variables\n');
}

// Mostrar errores críticos (bloquean el build)
if (missing.length > 0 || invalid.length > 0) {
  console.error('\n❌ Error: Variables de entorno críticas faltantes o inválidas\n');
  
  if (missing.length > 0) {
    console.error('Variables críticas faltantes (necesarias para el build):');
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
  console.error('  1. Configura las variables en Vercel Dashboard → Settings → Environment Variables');
  console.error('  2. Asegúrate de que estén configuradas para Production, Preview y Development');
  console.error('  3. Haz un nuevo deployment después de configurar las variables\n');
  
  if (isVercel) {
    console.error('⚠️  Estás en Vercel. El build fallará hasta que configures estas variables.\n');
  }
  
  process.exit(1);
}

// Éxito
console.log('✅ Variables de entorno críticas configuradas correctamente');
console.log(`   Ambiente: ${nodeEnv}`);
console.log(`   Variables build-time validadas: ${buildTimeVars.length}`);
if (isVercel) {
  console.log(`   Variables runtime validadas: ${runtimeVars.length}`);
}
console.log('');

