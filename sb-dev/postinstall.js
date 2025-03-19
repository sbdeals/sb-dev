// This script runs after npm/bun install
// It's used to set up any necessary configurations for deployment

const fs = require('fs');
const path = require('path');

console.log('Running postinstall script...');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Creating directory: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Create .env.local from environment variables if it doesn't exist
// This is particularly useful for Vercel deployment
if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
  console.log('Creating .env.local from environment variables');

  const envVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_VERCEL_ENV',
  ];

  const envContent = envVars
    .filter(key => process.env[key])
    .map(key => `${key}=${process.env[key]}`)
    .join('\n');

  if (envContent) {
    fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent);
    console.log('.env.local created successfully');
  } else {
    console.log('No environment variables found to create .env.local');
  }
}

// Ensure that the public directory exists
ensureDirectoryExists(path.join(process.cwd(), 'public'));

console.log('Postinstall script completed successfully');
