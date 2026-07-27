const fs = require('fs');
let code = fs.readFileSync('src/app/scale.service.ts', 'utf8');

code = code.replace(/const importMetaUrl = \(import\.meta as any\)\.env\?\.\['SUPABASE_URL'\] \|\| \(import\.meta as any\)\.env\?\.\['NG_APP_SUPABASE_URL'\] \|\| \(import\.meta as any\)\.env\?\.\['VITE_SUPABASE_URL'\];/g, 'const importMetaUrl = "";');
code = code.replace(/const importMetaKey = \(import\.meta as any\)\.env\?\.\['SUPABASE_KEY'\] \|\| \(import\.meta as any\)\.env\?\.\['NG_APP_SUPABASE_KEY'\] \|\| \(import\.meta as any\)\.env\?\.\['VITE_SUPABASE_KEY'\];/g, 'const importMetaKey = "";');

fs.writeFileSync('src/app/scale.service.ts', code);
