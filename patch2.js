const fs = require('fs');
let code = fs.readFileSync('src/app/app.ts', 'utf8');

code = code.replace(
  "this.activeSubTab.set(portalTabs[idx + 1]);",
  "this.activeSubTab.set(portalTabs[idx + 1] as any);"
);
code = code.replace(
  "this.activeSubTab.set(portalTabs[idx - 1]);",
  "this.activeSubTab.set(portalTabs[idx - 1] as any);"
);
code = code.replace(
  "const idx = portalTabs.indexOf(currentTab);",
  "const idx = portalTabs.indexOf(currentTab as any);"
);

fs.writeFileSync('src/app/app.ts', code);
