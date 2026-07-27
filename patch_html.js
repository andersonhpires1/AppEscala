const fs = require('fs');
let html = fs.readFileSync('src/app/app.html', 'utf8');

// Replace the portal container opening to add touch events
html = html.replace(
  '<div class="p-2 sm:p-3 lg:p-4 space-y-3 animate-fade-in font-sans w-full flex-1 overflow-y-auto scrollbar-thin max-w-full" id="portal_tab_content" [class.bg-[#fafffe]]="isLightTheme()">',
  '<div class="p-2 sm:p-3 lg:p-4 space-y-3 animate-fade-in font-sans w-full flex-1 overflow-y-auto scrollbar-thin max-w-full" id="portal_tab_content" [class.bg-[#fafffe]]="isLightTheme()" (touchstart)="onPortalTouchStart($event)" (touchend)="onPortalTouchEnd($event)">'
);

// Add Desktop Tab Bar
const desktopTabBar = `
          <!-- DESKTOP SUB-NAVIGATION BAR (Hidden on mobile where bottom nav is used) -->
          <div class="hidden md:flex items-center gap-2 mb-4 p-1.5 rounded-xl border transition-all duration-300" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#0F172A] border-[#334155]'">
            <button (click)="activeSubTab.set('portal')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'portal' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Início</button>
            <button (click)="activeSubTab.set('escala')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'escala' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Escala</button>
            <button (click)="activeSubTab.set('perfil')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'perfil' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Perfil</button>
            <button (click)="activeSubTab.set('equipe')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'equipe' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Equipe</button>
            <button (click)="activeSubTab.set('indicadores')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'indicadores' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Indicadores</button>
          </div>
`;

html = html.replace(
  '          @if (!getLoggedCollab()) {',
  desktopTabBar + '\n          @if (!getLoggedCollab()) {'
);

fs.writeFileSync('src/app/app.html', html);
