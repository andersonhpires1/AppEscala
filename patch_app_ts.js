const fs = require('fs');
let code = fs.readFileSync('src/app/app.ts', 'utf8');

code = code.replace(
  "const portalTabs = ['portal', 'escala', 'perfil', 'equipe', 'indicadores'];",
  "const portalTabs: ('portal' | 'escala' | 'perfil' | 'equipe' | 'indicadores')[] = ['portal', 'escala', 'perfil', 'equipe', 'indicadores'];"
);

fs.writeFileSync('src/app/app.ts', code);
