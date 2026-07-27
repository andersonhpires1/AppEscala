const fs = require('fs');
let html = fs.readFileSync('src/app/app.html', 'utf8');

// Replace the start of PORTAL GRID
html = html.replace(
  '              <!-- PORTAL GRID -->\n              <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full">',
  `              <!-- PORTAL TABS CONTENT -->
              <div class="w-full">`
);

// We need to replace the individual classes. Let's use regex or just direct string replace.
html = html.replace(
  '<div class="lg:col-span-4 space-y-3.5" [class.hidden]="isMobile() && activeSubTab() !== \'portal\' && activeSubTab() !== \'indicadores\'">',
  `@if (activeSubTab() === 'portal' || activeSubTab() === 'indicadores') {
  <div class="space-y-3.5 w-full">`
);

html = html.replace(
  '<div class="lg:col-span-8 space-y-3" [class.hidden]="activeSubTab() !== \'escala\' && activeSubTab() !== \'portal\'">',
  `@if (activeSubTab() === 'portal') {
    </div>
  }
  @if (activeSubTab() === 'escala' || activeSubTab() === 'portal') {
  <div class="space-y-3 w-full">`
);

// Wait, the previous block (lg:col-span-4) was closed somewhere. Let's find out where it ends.
