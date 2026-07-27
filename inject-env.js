const fs = require('fs');
const path = require('path');
const targetPath = path.join(__dirname, 'src', 'app', 'supabase-env.ts');
const envFile = `export const supabaseEnv = {
  url: '${process.env.SUPABASE_URL || ''}',
  key: '${process.env.SUPABASE_KEY || ''}'
};`;
fs.writeFileSync(targetPath, envFile);
console.log('Successfully injected Supabase environment variables into src/app/supabase-env.ts');
