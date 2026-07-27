# Recriação do App - Escala Easy VIBRA

Este documento contém os blocos HTML específicos solicitados e, em seguida, **todo o código-fonte** necessário para recriar e montar o projeto do zero em um novo ambiente do Google AI Studio.

---

## 1. Blocos HTML Selecionados

### 1.1. Cabeçalho Principal (Header)
\`\`\`html
  <header class="flex flex-row items-center justify-between gap-2 md:gap-3.5 select-none px-3 md:px-4 py-2 border-b border-[#10213b] shadow-xl relative z-[60]" 
          [class.bg-[#030a14]/80]="!isLightTheme()" [class.backdrop-blur-md]="!isLightTheme()" [class.bg-white]="isLightTheme()" id="global_master_header">
    <div class="flex items-center gap-2 md:gap-4 select-none">
      <!-- Logo Square Emblem -->
      <div class="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
        <span class="material-icons text-xl text-white-force" style="color: #ffffff !important;">calendar_month</span>
      </div>
      <div class="flex flex-col select-none">
        <span class="flex items-center gap-1.5">
          <span class="text-[12px] font-black tracking-tight leading-none" [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">ESCALA<span class="text-[#10b981]">.</span>EASY</span>
        </span>
        

      </div>
    </div>

    <!-- CENTER PORTAL PROFILE HEADER IN MAIN HEADER -->
    @if (getLoggedCollab()) {
      @let loggedH = getLoggedCollab()!;
      
      <div class="hidden md:flex items-center gap-3 relative z-10 select-none" id="header_portal_profile">
        <!-- Avatar Container -->
        <div class="relative shrink-0 group cursor-pointer">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg blur opacity-35"></div>
          @if (loggedH.photoUrl || loggedH.photo) {
            <img [src]="getCollabPhoto(loggedH)" 
                 alt="Foto de {{ loggedH.name }}"
                 class="w-10 h-10 rounded-lg object-cover border border-emerald-500/20 shadow-lg bg-slate-900 relative z-10">
          } @else {
            <div class="w-10 h-10 rounded-lg border border-emerald-500/20 shadow-lg bg-slate-900 relative z-10 flex items-center justify-center text-slate-400 font-black text-sm uppercase">
              {{ loggedH.name.charAt(0) }}
            </div>
          }
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity rounded-lg z-20">
            <span class="material-icons text-[10px] mb-0.5">add_a_photo</span>
            <span class="text-[5px] font-black uppercase tracking-wider">Alt</span>
          </div>
          <input type="file"
                 (change)="onPortalPhotoSelected($event)"
                 accept="image/*"
                 class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-30"
                 title="Alterar foto">
        </div>

        <div class="flex flex-row items-center divide-x divide-slate-700/50 light-theme-border-divide-override select-none">
          <!-- Coluna 1: Nome & Função -->
          <div class="flex flex-col pr-4">
            <span class="text-xs font-black uppercase tracking-tight leading-none mb-1"
                  [class.text-white]="!isLightTheme()"
                  [class.text-slate-800]="isLightTheme()">
              {{ loggedH.name }}
            </span>
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-none">
              {{ loggedH.role === 'LIDER' ? 'Líder' : loggedH.role === 'SUPERVISOR' ? 'Supervisor' : 'Operador' }}
            </span>
          </div>

          <!-- Coluna 2: Setor -->
          <div class="flex flex-col px-4">
            <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Setor
            </span>
            <span class="text-[10px] font-black uppercase tracking-wide leading-none"
                  [class.text-white]="!isLightTheme()"
                  [class.text-slate-800]="isLightTheme()">
              {{ loggedH.sector || 'Geral' }}
            </span>
          </div>

          <!-- Coluna 3: Turno -->
          <div class="flex flex-col pl-4">
            <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Turno
            </span>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-wide leading-none font-mono">
              {{ loggedH.shift }}
            </span>
          </div>
        </div>
      </div>
    }

    <!-- RIGHT UTILITIES ROW -->
    <div class="flex flex-nowrap items-center gap-1 md:gap-2.5 justify-end">
      <!-- FULLSCREEN (TELA CHEIA) TOGGLE -->
      <button (click)="toggleFullscreen()"
              class="hidden md:flex relative p-2.5 h-[40px] w-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all items-center justify-center cursor-pointer shadow-sm select-none border-none outline-none"
              title="Tela Cheia">
        <span class="material-icons text-lg">{{ isFullscreen() ? 'fullscreen_exit' : 'fullscreen' }}</span>
      </button>

      <!-- THEME (CLARO / ESCURO) TOGGLE -->
      <button (click)="toggleTheme()"
              class="flex relative p-2.5 h-[40px] w-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all items-center justify-center cursor-pointer shadow-sm select-none border-none outline-none"
              title="Alternar Tema">
        <span class="material-icons text-lg" style="color: #e8e22f !important;" [class.text-amber-500]="isLightTheme()">{{ isLightTheme() ? 'light_mode' : 'dark_mode' }}</span>
      </button>

      <!-- Notification Bell with unread badge -->
      <div class="relative inline-block text-left">
         <button (click)="toggleNotificationMenu($event)"
                 class="relative p-2.5 h-[40px] w-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all flex items-center justify-center cursor-pointer shadow-sm select-none border-none outline-none"
                 id="notification_bell_btn">
            <span class="material-icons text-lg" style="color: #10B981;">notifications</span>
            @if (unreadNotificationsCount() > 0) {
              <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white ring-2 ring-[#020813] animate-pulse"
                    style="background-color: #347660 !important;">
                {{ unreadNotificationsCount() }}
              </span>
            }
         </button>

         @if (isNotificationOpen()) {
           <div (click)="$event.stopPropagation()" class="absolute right-0 mt-2 w-80 rounded-lg bg-[#071426] border border-[#10213b] shadow-2xl z-50 divide-y divide-[#10213b] animate-fade-in max-h-[400px] overflow-y-auto"
                id="notification_dropdown">
              <div class="p-3 flex items-center justify-between bg-[#030a14] rounded-t-lg border-b border-[#10213b]">
                 <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Notificações Recentes</span>
                 <button (click)="markAllNotificationsAsRead(); $event.stopPropagation()" class="text-[8px] font-bold uppercase tracking-widest text-[#10b981] hover:text-emerald-400 bg-transparent border-none cursor-pointer">
                    Marcar todas
                 </button>
              </div>
              <div class="divide-y divide-[#10213b]">
                 @if (notifications().length === 0) {
                   <div class="p-6 text-center text-[11px] text-slate-500 italic">
                      Nenhuma notificação encontrada.
                   </div>
                 } @else {
                   @for (notif of notifications(); track notif.id) {
                     <div class="p-3 hover:bg-[#0b1e36]/50 transition-colors flex gap-2.5 items-start" [ngClass]="{ 'bg-[#0e1628]': !notif.read }">
                        <div class="p-1 rounded text-xs"
                             [class.bg-blue-950]="notif.type === 'publish'" [class.text-blue-400]="notif.type === 'publish'"
                             [class.bg-amber-950]="notif.type === 'alert'" [class.text-amber-400]="notif.type === 'alert'"
                             [class.bg-emerald-950]="notif.type === 'trade'" [class.text-emerald-400]="notif.type === 'trade'">
                           <span class="material-icons text-base">{{ notif.type === 'publish' ? 'publish' : (notif.type === 'alert' ? 'warning' : 'swap_horiz') }}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                           <p class="text-[10px] text-slate-300 leading-relaxed font-semibold" [class.font-bold]="!notif.read">{{ notif.message }}</p>
                           <span class="text-[8px] text-slate-500 font-mono mt-1 block">{{ notif.timestamp }}</span>
                        </div>
                        @if (!notif.read) {
                          <button (click)="markNotificationAsRead(notif.id); $event.stopPropagation()" class="text-slate-500 hover:text-blue-400 bg-transparent border-none cursor-pointer">
                             <span class="material-icons text-[14px]">done</span>
                          </button>
                        }
                     </div>
                   }
                 }
              </div>
           </div>
         }
      </div>

<!-- SETTINGS DROPDOWN OPTIONS BUTTON (Moved Up) -->

      <div class="relative inline-block text-left" id="options_dropdown_container">
        <button (click)="toggleDropdownMenu($event)"
                class="relative p-2.5 md:px-3.5 h-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm select-none border-none outline-none text-[10px] font-black tracking-wider uppercase overflow-hidden"
                [class.max-md:p-0]="getLoggedCollab()"
                [class.max-md:w-[40px]]="getLoggedCollab()"
                id="btn_options_dropdown">
          @if (getLoggedCollab()) {
            @let loggedH = getLoggedCollab()!;
            <div class="md:hidden w-full h-full bg-slate-800 flex items-center justify-center text-emerald-500 font-bold text-xs overflow-hidden shrink-0">
               @if (loggedH.photoUrl || loggedH.photo) {
                 <img [src]="getCollabPhoto(loggedH)" class="w-full h-full object-cover">
               } @else {
                 {{ loggedH.name.charAt(0) }}
               }
            </div>
            <span class="hidden md:inline-flex material-icons text-lg">settings</span>
            <span class="hidden md:inline-block">Opções</span>
          } @else {
            <span class="material-icons text-lg">settings</span>
            <span class="hidden md:inline-block">Opções</span>
          }
          <span class="hidden md:inline-block material-icons text-xs transition-transform duration-200" [class.rotate-180]="isDropdownOpen()">expand_more</span>
        </button>

        @if (isDropdownOpen()) {
          <div (click)="$event.stopPropagation()" class="absolute right-0 mt-2 w-56 rounded-lg bg-[#071426] border border-[#10213b] shadow-2xl z-50 divide-y divide-[#10213b] animate-fade-in" id="dropdown_options_menu">
            <!-- Account Info / Login Simulation -->
            <div class="py-1.5 rounded-t-lg bg-[#071426]">
              <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Conta de Acesso</span>
              
              @if (getLoggedCollab()) {
                @let logCol = getLoggedCollab()!;
                <div class="mx-3 my-1.5 px-3 py-2 border border-[#10213b] bg-[#030a14]/60 rounded-lg flex flex-col gap-2 select-none">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded bg-[#10b981] text-white flex items-center justify-center font-bold text-[10px] font-mono shrink-0">
                      {{ logCol.name | slice:0:2 | uppercase }}
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-[9px] font-black uppercase text-white leading-tight tracking-wider truncate">{{ logCol.name }}</span>
                      <span class="text-[7px] font-bold text-slate-400 uppercase leading-tight tracking-widest truncate">{{ logCol.role === 'SUPERVISOR' ? 'ADMIN' : logCol.role === 'LIDER' ? 'LÍDER DE TURNO' : 'COLABORADOR' }}</span>
                    </div>
                  </div>
                  <!-- Mobile only Sector and Turno info -->
                  <div class="flex md:hidden justify-between mt-1 pt-1 border-t border-[#10213b]/50">
                     <div class="flex flex-col">
                        <span class="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Setor</span>
                        <span class="text-[8px] font-black uppercase tracking-wide leading-none text-slate-300">{{ logCol.sector || 'Geral' }}</span>
                     </div>
                     <div class="flex flex-col items-end">
                        <span class="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Turno</span>
                        <span class="text-[8px] font-black text-emerald-500 uppercase tracking-wide leading-none font-mono">{{ logCol.shift }}</span>
                     </div>
                  </div>
                </div>
              }


              
              @if (!scaleService.selectedCollabName()) {
                <button (click)="openAuthModal('LOGIN'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer text-slate-300 hover:bg-[#0b1e36] border-none outline-none">
                  <span class="material-icons text-slate-400 text-sm">login</span>
                  Fazer Login (Admin/LT)
                </button>
              } @else {
                <button (click)="logout(); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer text-rose-400 hover:bg-[#0b1e36] border-none outline-none">
                  <span class="material-icons text-rose-400 text-sm">logout</span>
                  Sair do Perfil
                </button>
              }
            </div>

            <!-- Seções -->
            @if (isAdmin(getLoggedCollab())) {
              <div class="py-1.5 bg-[#030a14] border-t border-[#10213b]" id="dropdown_sections_category">
                <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Seções</span>
                
                <button (click)="activeSubTab.set('matrix'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'matrix' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'matrix' ? 'text-emerald-400' : 'text-slate-400'">calendar_month</span>
                  Escala Geral
                </button>


                <button (click)="activeSubTab.set('portal'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'portal' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'portal' ? 'text-emerald-400' : 'text-slate-400'">contact_page</span>
                  Meu Portal
                </button>
              </div>

              <!-- Gerenciamento (Turnos & Siglas) -->
              <div class="py-1.5 bg-[#030a14] border-t border-[#10213b]">
                <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Gerenciamento</span>
                
                <button (click)="activeSubTab.set('ger.turnos'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'ger.turnos' ? 'text-blue-400 bg-blue-950/20 font-bold' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'ger.turnos' ? 'text-blue-400' : 'text-slate-400'">tune</span>
                  Turnos
                </button>

                <button (click)="activeSubTab.set('siglas'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'siglas' ? 'text-blue-400 bg-blue-950/20 font-bold' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'siglas' ? 'text-blue-400' : 'text-slate-400'">label</span>
                  Siglas
                </button>

                <button (click)="activeSubTab.set('team'); teamViewMode.set('mgmt'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'team' && teamViewMode() === 'mgmt' ? 'text-blue-400 bg-blue-950/20 font-bold' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'team' && teamViewMode() === 'mgmt' ? 'text-blue-400' : 'text-slate-400'">manage_accounts</span>
                  Ger. de Colaboradores
                </button>
              </div>

              <!-- Modo de Apresentação (Restringir Escalas) -->
              <div class="py-2.5 px-4 bg-[#091526] border-t border-[#10213b]" id="presentation_mode_dropdown_section">
                <span class="block text-[8px] font-black uppercase text-slate-500 tracking-wider mb-2 select-none">Apresentação</span>
                @if (onlyNightShift()) {
                  <div class="space-y-1.5" id="presentation_restricted_box">
                    <div class="text-[9px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <span class="material-icons text-[10px] animate-pulse">visibility_off</span> Foco Turno Noite
                    </div>
                    <p class="text-[8px] text-slate-400 leading-normal">Outras escalas ocultas por padrão.</p>
                    
                    <div class="flex items-center gap-1.5 mt-1" id="presentation_unlock_form">
                      <input type="password" #pinInput placeholder="PIN de Acesso" (keyup.enter)="unlockAllShifts(pinInput.value); pinInput.value=''"
                             class="bg-[#020813] border border-[#10213b] text-white text-[9px] px-2 py-1.5 rounded-md w-full outline-none focus:border-emerald-500 placeholder:text-slate-600 font-mono">
                      <button (click)="unlockAllShifts(pinInput.value); pinInput.value=''"
                              class="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-[9px] uppercase rounded-md cursor-pointer transition-colors border-none outline-none">
                        Ok
                      </button>
                    </div>
                  </div>
                } @else {
                  <div class="space-y-1.5" id="presentation_unlocked_box">
                    <div class="text-[9px] font-black text-amber-500 uppercase tracking-wider flex items-center gap-1">
                      <span class="material-icons text-[10px]">visibility</span> Todos Visíveis
                    </div>
                    <p class="text-[8px] text-slate-400 leading-normal font-sans">Todos os turnos de escalas estão liberados para exibição.</p>
                    <button (click)="lockToNightShift()"
                            class="w-full text-center py-1.5 bg-[#030a14] hover:bg-slate-800 text-amber-400 hover:text-white border border-[#10213b] font-black text-[9px] uppercase rounded-md cursor-pointer transition-colors outline-none">
                      Restringir à Noite
                    </button>
                  </div>
                }
              </div>

              <!-- Management Tools (Admin only) -->
              <div class="py-1.5 bg-[#071426] border-t border-[#10213b] rounded-b-lg hidden md:block">
                <button (click)="openDbConfigModal(); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-blue-400 hover:bg-blue-950/20 transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none">
                  <span class="material-icons text-blue-400 text-sm">storage</span>
                  Configurar Banco de Dados
                </button>
              </div>
            } @else {
              <!-- Menu de Navegação para Colaborador Comum (Mesmas opções do rodapé mobile, sem 'Portal do Colaborador') -->
              <div class="py-1.5 bg-[#030a14] border-t border-[#10213b]" id="dropdown_sections_category">
                <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Navegação</span>
                
                <!-- INÍCIO / PORTAL -->
                <button (click)="activeSubTab.set('portal'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'portal' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'portal' ? 'text-emerald-400' : 'text-slate-400'">home</span>
                  Início
                </button>

                <!-- ESCALA -->
                <button (click)="activeSubTab.set('escala'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'escala' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'escala' ? 'text-emerald-400' : 'text-slate-400'">calendar_month</span>
                  Escala
                </button>

                <!-- PERFIL -->
                <button (click)="activeSubTab.set('perfil'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'perfil' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'perfil' ? 'text-emerald-400' : 'text-slate-400'">account_circle</span>
                  Perfil
                </button>

                <!-- EQUIPE -->
                <button (click)="activeSubTab.set('equipe'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="(activeSubTab() === 'equipe' || activeSubTab() === 'team') ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="(activeSubTab() === 'equipe' || activeSubTab() === 'team') ? 'text-emerald-400' : 'text-slate-400'">groups</span>
                  Equipe
                </button>

                <!-- INDICADORES -->
                <button (click)="activeSubTab.set('indicadores'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'indicadores' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'indicadores' ? 'text-emerald-400' : 'text-slate-400'">analytics</span>
                  Indicadores
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  </header>

```


### 1.2. Conteúdo do Portal (Portal Tab Content)
\`\`\`html
        <div class="p-2 sm:p-3 lg:p-4 space-y-3 animate-fade-in font-sans w-full flex-1 overflow-y-auto scrollbar-thin max-w-full touch-pan-y" id="portal_tab_content" [class.bg-[#fafffe]]="isLightTheme()" (touchstart)="onPortalTouchStart($event)" (touchend)="onPortalTouchEnd($event)" (touchcancel)="onPortalTouchEnd($event)">
          <!-- SIMULATION BAR & QUICK SWITCH -->

          <!-- DESKTOP SUB-NAVIGATION BAR (Hidden on mobile where bottom nav is used) -->
          <div class="hidden md:flex items-center gap-2 mb-4 p-1.5 rounded-xl border transition-all duration-300" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#0F172A] border-[#334155]'">
            <button (click)="activeSubTab.set('portal')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'portal' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Início</button>
            <button (click)="activeSubTab.set('escala')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'escala' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Escala</button>
            <button (click)="activeSubTab.set('perfil')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'perfil' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Perfil</button>
            <button (click)="activeSubTab.set('equipe')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'equipe' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Equipe</button>
            <button (click)="activeSubTab.set('indicadores')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'indicadores' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Indicadores</button>
          </div>

          @if (!getLoggedCollab()) {
            <div [class]="'border rounded-lg p-3.5 shadow-md space-y-3 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#030a14] border-[#10213b] text-white')">
              <div [class]="'flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ' + (isLightTheme() ? 'border-slate-100' : 'border-[#10213b]/60')">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 [class]="'font-black text-sm uppercase tracking-wider ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">Sessão do Colaborador</h3>
                  </div>
                  <p [class]="'text-[10px] mt-1 ' + (isLightTheme() ? 'text-slate-600' : 'text-slate-400')">
                    Selecione qualquer colaborador cadastrado na base para simular sua seção pessoal e realizar escolhas de folgas.
                  </p>
                </div>
              </div>

              <!-- Operators Cards Grid -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <span class="material-icons text-xs text-emerald-500">people</span>
                    Quadro de Colaboradores
                  </span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                  @for (c of loginCollaborators(); track c.id) {
                    <div (click)="loginAsCollab(c.id)"
                         [class]="'border group p-3 rounded-xl cursor-pointer transition-all flex flex-col justify-between gap-2.5 select-none text-left relative overflow-hidden ' + (isLightTheme() ? 'border-slate-200 bg-slate-50 hover:border-slate-400 hover:bg-slate-100' : 'border-[#10213b] bg-[#071426]/40 hover:border-slate-700 hover:bg-[#071426]')">

                      <div class="flex items-center gap-2 min-w-0">
                        <!-- Avatar -->
                        <img [src]="getCollabPhoto(c)" alt="Avatar" referrerpolicy="no-referrer" 
                             [class]="'w-8 h-8 rounded-full object-cover border shrink-0 ' + (isLightTheme() ? 'border-slate-200 group-hover:border-slate-300' : 'border-[#10213b] group-hover:border-slate-500/20')">
                        
                        <!-- Info -->
                        <div class="min-w-0">
                          <p [class]="'text-[11px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                            {{ c.name }}
                          </p>
                          <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                            {{ c.role }}
                          </p>
                        </div>
                      </div>

                      <!-- Footer -->
                      <div [class]="'flex items-center justify-between border-t pt-1.5 ' + (isLightTheme() ? 'border-slate-200' : 'border-[#10213b]/60')">
                        <span [class]="'text-[7.5px] font-black font-mono px-1 py-0.5 rounded uppercase border ' + (isLightTheme() ? 'text-slate-600 bg-slate-150 border-slate-200' : 'text-slate-400 bg-[#030a14] border-[#10213b]/40')">
                          {{ c.shift }}
                        </span>
                        <span [class]="'text-[7.5px] font-black font-mono px-1 py-0.5 rounded uppercase border ' + (isLightTheme() ? 'text-slate-600 bg-slate-150 border-slate-200' : 'text-slate-400 bg-[#030a14] border-[#10213b]/40')">
                          {{ c.sector }}
                        </span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          } @else {
            @let logged = getLoggedCollab()!;
            @let loggedStats = calculateStatsForCollab(logged);
            @let seqStats = getConsecutiveWorkStats(logged);
            @let offStats = getDaysUntilNextOff(logged);
            @let cdState = getFolgaCountdownState(logged);
            
            <div class="space-y-3 w-full">
              <!-- SEÇÃO DE PREVISÃO DO TEMPO (CLIMA TEMPO • GUARULHOS BASE) -->
              @if (getLoggedCollab() && activeSubTab() === 'indicadores') {
                <div id="weather_subheader_bar"
                     class="w-full border rounded-[16px] p-4 transition-all duration-300 select-none shadow-md space-y-3"
                     [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg'">
                  
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-2.5 border-b"
                       [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                    <!-- Info Principal Guarulhos & Turno -->
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <span class="material-icons text-emerald-400 text-lg">{{ currentWeatherOverview().icon }}</span>
                      </div>
                      
                      <div class="flex flex-col min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-black uppercase tracking-wide text-emerald-500 flex items-center gap-0.5">
                            <span class="material-icons text-xs">location_on</span> Previsão do Tempo • Guarulhos (Base)
                          </span>
                          <span class="text-xs font-black font-mono" [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">
                            {{ currentWeatherOverview().temp }}
                          </span>
                          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            • {{ currentWeatherOverview().condition }}
                          </span>
                          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-0.5">
                            <span class="material-icons text-[10px]">water_drop</span> {{ currentWeatherOverview().rainProb }}% Chuva
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Filtros de Turno & Botões de Ação -->
                    <div class="flex items-center gap-1.5 overflow-x-auto py-1 md:py-0 shrink-0">
                      <!-- Primary Selector Tabs: Meu Turno & Hoje -->
                      <button (click)="weatherSelectedShift.set('AUTO'); selectedWeatherHourIdx.set(null)"
                              [class]="weatherSelectedShift() === 'AUTO' ? 'bg-emerald-500 text-white font-black border-emerald-400 shadow-sm' : (isLightTheme() ? 'bg-white text-slate-600 border-slate-200 hover:text-slate-900' : 'bg-[#071426] text-slate-400 border-[#10213b] hover:text-white')"
                              class="px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer outline-none whitespace-nowrap shadow-xs flex items-center gap-1">
                        <span class="material-icons text-[11px]">schedule</span>
                        Meu Turno
                      </button>

                      <button (click)="weatherSelectedShift.set('HOJE'); selectedWeatherHourIdx.set(null)"
                              [class]="weatherSelectedShift() === 'HOJE' ? 'bg-emerald-500 text-white font-black border-emerald-400 shadow-sm' : (isLightTheme() ? 'bg-white text-slate-600 border-slate-200 hover:text-slate-900' : 'bg-[#071426] text-slate-400 border-[#10213b] hover:text-white')"
                              class="px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer outline-none whitespace-nowrap shadow-xs flex items-center gap-1">
                        <span class="material-icons text-[11px]">today</span>
                        Hoje
                      </button>

                      <div class="h-4 w-px bg-[#10213b] mx-1"></div>

                      <!-- Refresh button -->
                      <button (click)="fetchWeatherForecast()"
                              [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900' : 'bg-[#071426] border-[#10213b] text-slate-400 hover:text-white'"
                              class="p-1 h-7 w-7 rounded-md border flex items-center justify-center cursor-pointer transition-all outline-none"
                              title="Atualizar Previsão">
                        <span class="material-icons text-xs" [class.animate-spin]="weatherLoading()">refresh</span>
                      </button>

                      <!-- Toggle Expand/Collapse -->
                      <button (click)="weatherExpanded.set(!weatherExpanded())"
                              [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900' : 'bg-[#071426] border-[#10213b] text-slate-400 hover:text-white'"
                              class="p-1 h-7 w-7 rounded-md border flex items-center justify-center cursor-pointer transition-all outline-none"
                              title="Expandir/Recolher Previsão Hora a Hora">
                        <span class="material-icons text-xs transition-transform" [class.rotate-180]="!weatherExpanded()">expand_less</span>
                      </button>
                    </div>
                  </div>

                  <!-- PAINEL DE PREVISÃO HORA A HORA DO TURNO (DE HORA EM HORA) -->
                  @if (weatherExpanded()) {
                    <div class="pt-2 border-t border-[#10213b]/60 animate-fade-in animate-duration-300">
                      @if (weatherLoading() && rawHourlyWeather().length === 0) {
                        <div class="flex items-center justify-center gap-2 py-4 text-xs text-slate-400 italic">
                          <span class="material-icons text-sm animate-spin text-emerald-400">sync</span>
                          Carregando previsão do tempo hora a hora para Guarulhos...
                        </div>
                      } @else {
                        <div class="flex flex-col gap-4 items-stretch">
                          
                          <!-- CARD DE DETALHES DE CLIMA NEON INTERATIVO -->
                          <div class="flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 relative overflow-hidden"
                               [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#040c1a] border-[#0f1d3a] text-slate-200 shadow-[0_0_15px_rgba(236,72,153,0.05)]'">
                            
                            @if (activeWeatherItem(); as active) {
                              <div>
                                <!-- Header do Card -->
                                <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-700/20">
                                  <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Previsão Detalhada</span>
                                  <span class="w-1.5 h-1.5 rounded-full bg-[#ff007f] animate-ping"></span>
                                </div>

                                <!-- Grid de 2 Colunas (Esquerda: Data/Hora | Direita: Temperatura/Legenda) -->
                                <div class="grid grid-cols-2 gap-3 items-center py-1">
                                  
                                  <!-- Coluna da Esquerda: Data (24/07) e Hora (22:08) no tamanho da temperatura -->
                                  <div class="flex flex-col min-w-0">
                                    <span class="text-2xl font-black font-mono tracking-tighter text-cyan-400">
                                      {{ active.dateLabel.slice(0, 5) }}
                                    </span>
                                    <span class="text-2xl font-black font-mono tracking-tighter text-[#ff007f]">
                                      {{ active.timeLabel }}
                                    </span>
                                  </div>

                                  <!-- Coluna da Direita: Conjunto de Temperatura (Ícone, 14°C, Legenda) -->
                                  <div class="flex flex-col items-end justify-center text-right border-l border-slate-700/20 pl-3">
                                    <div class="flex items-center gap-2 justify-end">
                                      <!-- Ícone Animado Neon -->
                                      <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border relative transition-all duration-300"
                                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-gradient-to-br from-[#06152a] to-[#040c1a] border-[#0f1d3a] shadow-[0_0_10px_rgba(6,182,212,0.15)]'">
                                        <span class="material-icons text-lg relative z-10 animate-pulse"
                                              [class.text-amber-400]="active.icon === 'wb_sunny'"
                                              [class.text-indigo-300]="active.icon === 'nights_stay'"
                                              [class.text-slate-400]="active.icon === 'cloud' || active.icon === 'partly_cloudy_day'"
                                              [class.text-cyan-400]="active.icon === 'water_drop' || active.icon === 'umbrella' || active.icon === 'grain'"
                                              [class.text-amber-500]="active.icon === 'thunderstorm'">
                                          {{ active.icon }}
                                        </span>
                                        <!-- Neon Ring Background Glow -->
                                        <span class="absolute inset-0 rounded-xl opacity-20 blur-xs animate-pulse"
                                              [class.bg-amber-400]="active.icon === 'wb_sunny'"
                                              [class.bg-indigo-400]="active.icon === 'nights_stay'"
                                              [class.bg-cyan-400]="active.icon === 'water_drop' || active.icon === 'umbrella' || active.icon === 'grain'"></span>
                                      </div>

                                      <span class="text-2xl font-black font-mono tracking-tighter" [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">
                                        {{ active.temp }}°C
                                      </span>
                                    </div>

                                    <span class="text-xs font-black uppercase tracking-wide text-[#34d399] truncate mt-0.5">
                                      {{ active.conditionText }}
                                    </span>
                                  </div>

                                </div>
                              </div>
                            } @else {
                              <div class="flex flex-col items-center justify-center py-6 text-xs text-slate-500 italic">
                                Nenhuma previsão selecionada
                              </div>
                            }

                          </div>

                          <!-- GRÁFICO ESTILO CLIMA TEMPO COM CORES VIVAS NEON -->
                          <div class="flex flex-col justify-between p-3 rounded-2xl border transition-all duration-300 relative overflow-hidden"
                               [class]="isLightTheme() ? 'bg-slate-50/50 border-slate-200' : 'bg-[#030914] border-[#0f1d3a] shadow-[0_0_15px_rgba(6,182,212,0.05)]'">
                            
                            <!-- Header do Gráfico -->
                            <div class="flex items-center justify-between mb-2">
                              <div class="flex items-center gap-2">
                                <span class="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Tendência do Clima (Guarulhos Base)</span>
                              </div>
                              <div class="flex items-center gap-3 text-[8px] font-bold uppercase tracking-wider text-slate-500">
                                <span class="flex items-center gap-1">
                                  <span class="w-2.5 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 inline-block rounded"></span> Temperatura
                                </span>
                                <span class="flex items-center gap-1">
                                  <span class="w-2.5 h-2 bg-gradient-to-t from-blue-600 to-cyan-400 inline-block rounded-xs"></span> Chuva %
                                </span>
                              </div>
                            </div>

                            <!-- Container do SVG com Scroll Lateral se necessário no mobile -->
                            <div class="w-full overflow-x-auto pb-1 custom-scrollbar">
                              <div class="min-w-[800px] xl:min-w-full">
                                <svg viewBox="0 0 1000 110" class="w-full h-auto select-none overflow-visible">
                                  <defs>
                                    <!-- Filtros de Neon Glow -->
                                    <filter id="neon-glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                                      <feGaussianBlur stdDeviation="3" result="blur" />
                                      <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                      </feMerge>
                                    </filter>
                                    <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                                      <feGaussianBlur stdDeviation="3" result="blur" />
                                      <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                      </feMerge>
                                    </filter>
                                    <!-- Gradientes -->
                                    <linearGradient id="temp-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stop-color="#ff7a00" />
                                      <stop offset="50%" stop-color="#ff007f" />
                                      <stop offset="100%" stop-color="#00f0ff" />
                                    </linearGradient>
                                    <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#ff007f" stop-opacity="0.1" />
                                      <stop offset="100%" stop-color="#00f0ff" stop-opacity="0" />
                                    </linearGradient>
                                    <linearGradient id="rain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.7" />
                                      <stop offset="100%" stop-color="#0066ff" stop-opacity="0.1" />
                                    </linearGradient>
                                  </defs>

                                  <!-- Linha Grid horizontal sutil -->
                                  <line x1="40" y1="90" x2="960" y2="90" [attr.stroke]="isLightTheme() ? '#e2e8f0' : '#1e293b'" stroke-width="1" />
                                  <line x1="40" y1="55" x2="960" y2="55" [attr.stroke]="isLightTheme() ? '#f1f5f9' : '#0f172a'" stroke-width="1" stroke-dasharray="4,4" />

                                  <!-- Gráfico de Área para Temperatura -->
                                  @if (weatherChartData().areaPath) {
                                    <path [attr.d]="weatherChartData().areaPath" fill="url(#area-grad)" />
                                  }

                                  <!-- Barras de Probabilidade de Chuva -->
                                  @for (pt of weatherChartData().points; track pt.index) {
                                    @if (pt.rainHeight > 1) {
                                      <rect [attr.x]="pt.x - 6"
                                            [attr.y]="pt.rainY"
                                            width="12"
                                            [attr.height]="pt.rainHeight"
                                            fill="url(#rain-grad)"
                                            rx="3"
                                            class="transition-all duration-300 hover:opacity-100 cursor-pointer"
                                            (mouseenter)="selectedWeatherHourIdx.set(pt.index)"
                                            (click)="selectedWeatherHourIdx.set(pt.index)" />
                                    }
                                  }

                                  <!-- Linha do Gráfico de Temperatura -->
                                  @if (weatherChartData().linePath) {
                                    <path [attr.d]="weatherChartData().linePath"
                                          fill="none"
                                          stroke="url(#temp-line-grad)"
                                          stroke-width="3"
                                          stroke-linecap="round"
                                          [attr.filter]="isLightTheme() ? 'none' : 'url(#neon-glow-orange)'" />
                                  }

                                  <!-- Linha Vertical de Guia Sutil no Hover / Seleção -->
                                  @if (selectedWeatherHourIdx() !== null) {
                                    <line [attr.x1]="weatherChartData().points[selectedWeatherHourIdx()!].x"
                                          y1="10"
                                          [attr.x2]="weatherChartData().points[selectedWeatherHourIdx()!].x"
                                          y2="90"
                                          [attr.stroke]="isLightTheme() ? '#cbd5e1' : '#00f0ff'"
                                          stroke-dasharray="3,3"
                                          stroke-width="1" />
                                  }

                                  <!-- Nós Interativos e Rótulos -->
                                  @for (pt of weatherChartData().points; track pt.index) {
                                    <!-- Círculo do Nó -->
                                    <circle [attr.cx]="pt.x"
                                            [attr.cy]="pt.y"
                                            [attr.r]="selectedWeatherHourIdx() === pt.index ? 5 : 3.5"
                                            [attr.fill]="selectedWeatherHourIdx() === pt.index ? '#ffffff' : '#ff007f'"
                                            [attr.stroke]="selectedWeatherHourIdx() === pt.index ? '#00f0ff' : '#ffffff'"
                                            [attr.stroke-width]="selectedWeatherHourIdx() === pt.index ? 2 : 1"
                                            class="cursor-pointer transition-all duration-200"
                                            (mouseenter)="selectedWeatherHourIdx.set(pt.index)"
                                            (click)="selectedWeatherHourIdx.set(pt.index)" />

                                    <!-- Texto da Temperatura acima do Nó -->
                                    <text [attr.x]="pt.x"
                                          [attr.y]="pt.y - 7"
                                          text-anchor="middle"
                                          class="text-[9px] font-black font-mono transition-all duration-300"
                                          [attr.fill]="selectedWeatherHourIdx() === pt.index ? (isLightTheme() ? '#0f172a' : '#00f0ff') : (isLightTheme() ? '#475569' : '#94a3b8')">
                                      {{ pt.temp }}°C
                                    </text>

                                    <!-- Ícone do Tempo no Meio -->
                                    <text [attr.x]="pt.x"
                                          y="18"
                                          text-anchor="middle"
                                          class="material-icons select-none font-normal cursor-pointer text-[15px]"
                                          style="font-family: 'Material Icons';"
                                          [attr.fill]="pt.item.icon === 'wb_sunny' ? '#ff9f00' : 
                                                       (pt.item.icon === 'nights_stay' ? '#818cf8' : 
                                                        (pt.item.icon === 'cloud' || pt.item.icon === 'partly_cloudy_day' ? '#22d3ee' : 
                                                         (pt.item.icon === 'water_drop' || pt.item.icon === 'umbrella' || pt.item.icon === 'grain' ? '#00f0ff' : 
                                                          (pt.item.icon === 'thunderstorm' ? '#f59e0b' : '#38bdf8'))))"
                                          (mouseenter)="selectedWeatherHourIdx.set(pt.index)"
                                          (click)="selectedWeatherHourIdx.set(pt.index)">
                                      {{ pt.item.icon }}
                                    </text>

                                    <!-- Horário na Base -->
                                    <text [attr.x]="pt.x"
                                          y="102"
                                          text-anchor="middle"
                                          class="text-[9px] font-black font-mono tracking-tighter"
                                          [attr.fill]="selectedWeatherHourIdx() === pt.index ? '#34d399' : (isLightTheme() ? '#64748b' : '#64748b')">
                                      {{ pt.item.timeLabel }}
                                    </text>
                                  }
                                </svg>
                              </div>
                            </div>

                            <!-- Rodapé de Instrução do Gráfico -->
                            <div class="mt-2 pt-1.5 border-t border-[#10213b]/40 flex items-center justify-between text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                              <span>Clique nos nós do gráfico para explorar as horas</span>
                              <span class="material-icons text-[10px] animate-pulse text-[#ff007f]">ads_click</span>
                            </div>
                          </div>

                        </div>
                      }
                    </div>
                  }
                </div>
              }

              </div>
              <!-- PORTAL GRID -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full">
                
                <!-- LEFT SIDEBAR: PROFILE MONITOR & STATS -->
                @if (activeSubTab() === 'portal' || activeSubTab() === 'indicadores') {
                <div class="lg:col-span-4 space-y-3.5">

                  <!-- CARD 1: MONITOR DE ESCALA -->
                  <div [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')">
                    <!-- HEADER -->
                    <div class="flex items-center pb-2 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                      <div class="flex items-center gap-2">
                        <span class="material-icons text-emerald-400 text-sm">query_stats</span>
                        <span [class]="'text-[13px] font-bold tracking-wide uppercase ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                          Status
                        </span>
                      </div>
                    </div>

                    <!-- STATUS DO DIA (100% WIDTH) -->
                    <div [class]="'rounded-xl p-3.5 flex items-center justify-between border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                      @if (seqStats.isWorking) {
                        <div class="flex items-center gap-2">
                          <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]"></span>
                          </span>
                          <span [class]="'text-[10px] font-black tracking-wider uppercase ' + (isLightTheme() ? 'text-slate-700' : 'text-[#F8FAFC]')">
                            TRABALHANDO HOJE
                          </span>
                        </div>
                        <span class="text-[10px] font-black px-2 py-0.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] uppercase tracking-wide font-mono">
                          ATIVO
                        </span>
                      } @else {
                        <div class="flex items-center gap-2">
                          <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                          <span [class]="'text-[10px] font-black tracking-wider uppercase ' + (isLightTheme() ? 'text-slate-700' : 'text-[#F8FAFC]')">
                            DE FOLGA HOJE
                          </span>
                        </div>
                        <span class="text-[10px] font-black px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 uppercase tracking-wide font-mono">
                          DESCANSO
                        </span>
                      }
                    </div>

                    <!-- FEEDBACK COGNITIVO -->
                    <div [class]="'rounded-xl border p-3.5 flex gap-2.5 items-start transition-all duration-300 shadow-sm ' + getFeedbackCardClass(seqStats)">
                      @if (!seqStats.isWorking) {
                        <span class="material-icons text-base shrink-0 text-emerald-500 animate-bounce">celebration</span>
                      } @else if (seqStats.streak <= 2) {
                        <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      } @else {
                        <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                      }

                      <div class="flex flex-col min-w-0">
                        <span class="text-[11px] font-black uppercase tracking-wide font-sans leading-tight">
                          @if (!seqStats.isWorking) {
                            Boa Folga! 🎉
                          } @else if (seqStats.streak === 1) {
                            Bom Retorno
                          } @else if (seqStats.streak === 2) {
                            Bom Trabalho
                          } @else if (seqStats.streak === 3) {
                            Atenção
                          } @else if (seqStats.streak === 4) {
                            Alerta de Fadiga
                          } @else {
                            Alerta Máxima
                          }
                        </span>
                        <p class="text-[10px] opacity-90 leading-relaxed font-sans mt-0.5">
                          @if (!seqStats.isWorking) {
                            {{ getDescansoChargingState(logged).descText }}
                          } @else if (seqStats.streak === 1) {
                            Primeiro dia de retorno pós-folga. Energias renovadas!
                          } @else if (seqStats.streak === 2) {
                            Segundo dia de jornada. Ritmo produtivo e seguro.
                          } @else if (seqStats.streak === 3) {
                            Terceiro dia consecutivo. Fique atento aos sinais de cansaço.
                          } @else if (seqStats.streak === 4) {
                            Quarto dia consecutivo. Evite acúmulo de esforço.
                          } @else {
                            Ciclo estendido de trabalho de {{ seqStats.streak }} dias consecutivos. Redobre os cuidados!
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- CARD 2: INDICADORES DE JORNADA -->
                  <div [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')">
                    <!-- HEADER -->
                    <div class="flex items-center pb-2 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                      <div class="flex items-center gap-2">
                        <span class="material-icons text-emerald-400 text-sm">speed</span>
                        <span [class]="'text-[13px] font-bold tracking-wide uppercase ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                          Indicadores de Jornada
                        </span>
                      </div>
                    </div>

                    <!-- ENERGIA & CICLO (GRID DE 2 COLUNAS) -->
                    <div class="grid grid-cols-2 gap-3 w-full">
                      <!-- LADO ESQUERDO: SCORE DE ENERGIA -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col items-center justify-between text-center gap-1.5 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        <span class="text-[10px] font-bold tracking-wider uppercase text-slate-500 font-sans">Energia</span>
                        
                        <!-- Semicircular Gauge SVG -->
                        <div class="relative w-[90px] h-[45px] flex items-center justify-center shrink-0 mt-1">
                          <svg class="w-full h-full" viewBox="0 0 100 52">
                            <path d="M 12 48 A 38 38 0 0 1 20 28"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(1, logged)" />
                            <path d="M 22 26 A 38 38 0 0 1 38 15"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(2, logged)" />
                            <path d="M 41 14 A 38 38 0 0 1 59 14"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(3, logged)" />
                            <path d="M 62 15 A 38 38 0 0 1 78 26"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(4, logged)" />
                            <path d="M 80 28 A 38 38 0 0 1 87 48"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(5, logged)" />
                          </svg>
                          <div class="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end">
                            <span [class]="'text-[14px] font-black font-mono leading-none ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                              {{ getEnergyPercent(seqStats, logged) }}%
                            </span>
                          </div>
                        </div>

                        <span class="text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider leading-none truncate max-w-full"
                              [class]="!seqStats.isWorking ? 
                                       (isLightTheme() ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/10') :
                                       (seqStats.streak === 1 ? (isLightTheme() ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/10') :
                                       (seqStats.streak === 2 ? (isLightTheme() ? 'text-blue-700 bg-blue-50 border border-blue-100' : 'text-blue-400 bg-blue-950/30 border border-blue-500/10') :
                                       (seqStats.streak === 3 ? (isLightTheme() ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-amber-400 bg-amber-950/30 border border-amber-500/10') :
                                       (seqStats.streak === 4 ? (isLightTheme() ? 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25' : 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25') :
                                       (isLightTheme() ? 'text-rose-700 bg-rose-50 border border-rose-100' : 'text-rose-400 bg-rose-950/30 border border-rose-500/10')))))">
                          {{ seqStats.isWorking ? seqStats.fatigueLevel : getDescansoChargingState(logged).statusLabel }}
                        </span>
                      </div>

                      <!-- LADO DIREITO: RASTREADOR DE CICLO -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col items-center justify-between text-center gap-1.5 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        <span class="text-[10px] font-bold tracking-wider uppercase text-slate-500 font-sans">Ciclo</span>
                        
                        <div class="flex flex-col items-center justify-center my-0.5">
                          <div class="flex items-baseline gap-0.5">
                            <span [class]="'text-2xl font-black font-mono leading-none ' + 
                                           (!seqStats.isWorking ? 'text-emerald-400' : 
                                           (seqStats.streak === 1 ? 'text-emerald-400' :
                                           (seqStats.streak === 2 ? 'text-blue-400' :
                                           (seqStats.streak === 3 ? 'text-amber-400' :
                                           (seqStats.streak === 4 ? 'text-orange-500' : 'text-rose-500')))))">
                              {{ seqStats.isWorking ? seqStats.streak : 0 }}
                            </span>
                            <span class="text-[10px] text-slate-500 font-bold font-mono">/{{ seqStats.totalStreak || 0 }}</span>
                          </div>
                          <span class="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1 font-sans">DIAS TRAB.</span>
                        </div>

                        <!-- Progress Dots -->
                        <div class="flex items-center justify-center gap-1 w-full px-0.5 py-0.5">
                          @for (i of getArray(seqStats.totalStreak); track i) {
                            <div class="h-1 w-2.5 rounded-full transition-all duration-300"
                                 [style.background-color]="getBarColor(i, seqStats.streak, seqStats.isWorking)"></div>
                          }
                        </div>
                      </div>
                    </div>

                    <!-- RADAR & PROXIMA FOLGA (GRID DE 2 COLUNAS) -->
                    <div class="grid grid-cols-2 gap-3 w-full">
                      <!-- LADO ESQUERDO: RADAR DE FOLGAS -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col items-center justify-center text-center gap-1 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        @if (cdState.showCountdown && !offStats.isOffToday) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-amber-500 font-sans">Folga em</span>
                          <span class="text-[14px] font-black text-amber-500 tracking-tight leading-none font-mono my-0.5 animate-pulse">
                            {{ cdState.countdownText }}
                          </span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Resta no turno</span>
                        } @else if (offStats.isOffToday) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-emerald-500/70 font-sans">Hoje</span>
                          <span class="text-[14px] font-black text-emerald-500 tracking-tight leading-none my-0.5 animate-pulse">Folgando</span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Aproveite!</span>
                        } @else if (offStats.days === 999) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans">Escala</span>
                          <span class="text-[13px] font-black text-rose-500 tracking-tight leading-none my-0.5">Sem Folga</span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Neste mês</span>
                        } @else {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans">
                            {{ offStats.days === 1 ? 'Falta' : 'Faltam' }}
                          </span>
                          <span class="text-[14px] font-black text-[#F59E0B] tracking-tight leading-none font-mono my-0.5">
                            {{ offStats.days === 1 ? '1 dia' : offStats.days + ' dias' }}
                          </span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Até a folga</span>
                        }
                      </div>

                      <!-- LADO DIREITO: PROXIMAS FOLGAS -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col justify-between gap-1 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        @if (offStats.isOffToday) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans text-center">RETORNO</span>
                          
                          <div class="flex items-center justify-center my-0.5">
                            <span [class]="'font-mono font-black px-1 py-0.5 rounded text-[10px] leading-none min-w-[18px] h-[18px] flex items-center justify-center border ' + 
                                          (isLightTheme() ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30')">
                              {{ getReturnDayNumber(logged) }}
                            </span>
                          </div>

                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase truncate leading-none text-center block mt-0.5">
                            {{ currentMonthName() | uppercase }}
                          </span>
                        } @else {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans text-center">PRÓXIMAS FOLGAS</span>
                          
                          <div class="flex items-center justify-center gap-1 my-0.5">
                            @if (offStats.nextOffDays.length > 0) {
                              <div class="flex flex-wrap justify-center gap-1">
                                @for (day of offStats.nextOffDays.slice(0, 3); track day) {
                                  <span class="font-mono font-black text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-1 py-0.5 rounded text-[10px] leading-none min-w-[18px] h-[18px] flex items-center justify-center">
                                    {{ day }}
                                  </span>
                                }
                              </div>
                            } @else {
                              <span class="text-[9px] text-slate-500 italic">Nenhuma</span>
                            }
                          </div>

                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase truncate leading-none text-center block mt-0.5">
                            {{ currentMonthName() | uppercase }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                }
                
                <!-- MIDDLE/RIGHT CONTENT (8 COLUMNS) -->
                @if (activeSubTab() === 'portal' || activeSubTab() === 'escala') {
                <div class="lg:col-span-8 space-y-3">
                  
                  <div id="panel-trabalho-folga" [class]="'w-full border rounded-[16px] p-5 space-y-5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')" [class.hidden]="activeSubTab() !== 'escala'">
                  
                  <!-- HEADER / TABS (SPLIT 50% / 50%) -->
                  <div id="trabalho-folga-header" class="w-full pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-emerald-500 text-lg">calendar_today</span>
                      <h3 class="text-sm sm:text-base font-black uppercase tracking-wider" [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">Minha Escala</h3>
                    </div>
                    <div class="grid grid-cols-2 w-full sm:max-w-xs p-1.5 rounded-2xl" [class]="isLightTheme() ? 'bg-slate-100' : 'bg-[#0b1329]'">
                      <button id="btn-tab-trabalho" (click)="setTurnVacationTab('work')"
                              class="w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                              [class]="turnVacationTab() === 'work' ? (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 shadow-lg') : (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                        <span class="material-icons text-sm font-bold">calendar_month</span>
                        Trabalho
                      </button>
                      <button id="btn-tab-folga" (click)="setTurnVacationTab('vacation')"
                              class="w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                              [class]="turnVacationTab() === 'vacation' ? (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-amber-500 text-amber-950 shadow-lg') : (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                        <span class="material-icons text-sm">beach_access</span>
                        Folgas
                      </button>
                    </div>
                  </div>

                  <!-- Tab: Dias de Trabalho -->
                  @if (turnVacationTab() === 'work') {
                    <div class="space-y-5">
                      
                      <!-- GRID OF WORK DAYS -->
                      <div id="section-calendar-work" class="p-4 border rounded-xl transition-all duration-300" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#071426]/40 border-[#10213b]'">
                        <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/10 mb-3" [class.border-slate-200]="isLightTheme()">
                          <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Minha Escala Selecionada</span>
                            @if (getLoggedCollab()) {
                              <span class="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm"
                                    [class]="isLightTheme() ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'">
                                {{ getLoggedCollab()!.shift }}
                              </span>
                            }
                          </div>
                          <div class="flex items-center gap-2">
                            <!-- Toggle button -->
                            <button (click)="hidePastDays.set(!hidePastDays())"
                                    class="flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                    [class]="!hidePastDays() ? 
                                             (isLightTheme() ? 'bg-emerald-600 text-white border-emerald-600 font-bold' : 'bg-emerald-500 text-emerald-950 border-emerald-500 font-black') : 
                                             (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-[#F8FAFC]')">
                              <span class="material-icons text-[10px]">{{ !hidePastDays() ? 'visibility' : 'visibility_off' }}</span>
                              Concluídos
                            </button>
                            <span class="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">{{ getFilteredCollabWorkDays(logged).length }} Ativos</span>
                          </div>
                        </div>
                        <div class="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                          @for (day of getFilteredCollabWorkDays(logged); track day) {
                            @let isSel = day === selectedCalendarDay();
                            <div (click)="selectedCalendarDay.set(day)"
                                 [id]="'work-day-' + day"
                                 class="p-2 border rounded-lg text-center select-none cursor-pointer transition-all hover:scale-105 shadow-sm"
                                 [class]="isSel ? (isLightTheme() ? 'bg-emerald-600 border-emerald-600 text-white font-bold ring-2 ring-emerald-500/20' : 'bg-emerald-500 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400/30') : 
                                                 (isPastDay(day) ? (isLightTheme() ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40' : 'bg-slate-900/30 border-slate-800/40 text-slate-600 opacity-40') : 
                                                                   (isToday(day) ? 'bg-emerald-500/40 border-emerald-400 text-white font-bold' : (isLightTheme() ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300' : 'bg-emerald-950/10 border-emerald-500/10 text-emerald-300 hover:border-emerald-500/30')))">
                              <span class="text-[11px] font-mono font-black block leading-none">{{ day < 10 ? '0' + day : day }}</span>
                              <span class="text-[6.5px] font-black uppercase tracking-wider block mt-1 opacity-70">{{ getDayOfWeekLabel(day) }}</span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  }

                  <!-- Tab: Folgas -->
                  @if (turnVacationTab() === 'vacation') {
                    <div class="space-y-5">
                      
                      <!-- GRID OF VACATION DAYS -->
                      <div id="section-calendar-vacation" class="p-4 border rounded-xl transition-all duration-300" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#071426]/40 border-[#10213b]'">
                        <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/10 mb-3" [class.border-slate-200]="isLightTheme()">
                          <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Meus Dias de Folga</span>
                          <div class="flex items-center gap-2">
                            <!-- Toggle button -->
                            <button (click)="hidePastDays.set(!hidePastDays())"
                                    class="flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                    [class]="!hidePastDays() ? 
                                             (isLightTheme() ? 'bg-amber-600 text-white border-amber-600 font-bold' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                             (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-[#F8FAFC]')">
                              <span class="material-icons text-[10px]">{{ !hidePastDays() ? 'visibility' : 'visibility_off' }}</span>
                              Concluídos
                            </button>
                            <span class="text-[9px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">{{ getFilteredCollabOffDays(logged).length }} Folgas</span>
                          </div>
                        </div>
                        <div class="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                          @for (day of getFilteredCollabOffDays(logged); track day) {
                            @let isSel = day === selectedCalendarDay();
                            <div (click)="selectedCalendarDay.set(day)"
                                 [id]="'vacation-day-' + day"
                                 class="p-2 border rounded-lg text-center select-none cursor-pointer transition-all hover:scale-105 shadow-sm"
                                 [class]="isSel ? (isLightTheme() ? 'bg-amber-600 border-amber-600 text-white font-bold ring-2 ring-amber-500/20' : 'bg-amber-500 border-amber-500 text-amber-950 font-black ring-2 ring-amber-400/30') : 
                                                 (isPastDay(day) ? (isLightTheme() ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40' : 'bg-slate-900/30 border-slate-800/40 text-slate-600 opacity-40') : 
                                                                   (isToday(day) ? 'bg-amber-500/40 border-amber-400 text-white font-bold' : (isLightTheme() ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300' : 'bg-amber-950/10 border-amber-500/10 text-amber-300 hover:border-amber-500/30')))">
                              <span class="text-[11px] font-mono font-black block leading-none">{{ day < 10 ? '0' + day : day }}</span>
                              <span class="text-[6.5px] font-black uppercase tracking-wider block mt-1 opacity-70">{{ getDayOfWeekLabel(day) }}</span>
                            </div>
                          }
                        </div>
                      </div>

                      <!-- CO-WORKERS ON VACATION IN GRID (QUADRADINHO) -->
                      <div id="section-coworkers-vacation" class="p-4 border rounded-xl transition-all" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#071426]/40 border-[#10213b]'">
                        <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/10 mb-3" [class.border-slate-200]="isLightTheme()">
                          <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Colegas de Folga Hoje / Dia {{ selectedCalendarDay() }}</span>
                          <span class="text-[9px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">{{ getCollaboratorsOnVacationForDay(selectedCalendarDay()).length }} Folgas</span>
                        </div>

                        <!-- FILTER SELECTOR PILLS -->
                        <div class="flex flex-wrap items-center gap-1.5 mb-3.5">
                          <button (click)="coworkersFilter.set('MEU_TURNO')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'MEU_TURNO' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Meu Turno ({{ logged.shift || 'N/A' }})
                          </button>
                          <button (click)="coworkersFilter.set('OUTROS')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'OUTROS' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Outros Turnos
                          </button>
                          <button (click)="coworkersFilter.set('MANHA_TARDE')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'MANHA_TARDE' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Manhã e Tarde
                          </button>
                          <button (click)="coworkersFilter.set('TODOS')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'TODOS' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Todos
                          </button>
                        </div>

                        @let vacs = getCollaboratorsOnVacationForDay(selectedCalendarDay());
                        @if (vacs.length > 0) {
                          <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 gap-2">
                            @for (col of vacs; track col.id) {
                              <div [id]="'coworker-vacation-' + col.id"
                                   class="flex flex-col items-center p-1.5 rounded-[14px] border transition-all duration-300 shadow-sm text-center select-none"
                                   [class]="isLightTheme() ? 'bg-white border-slate-200/80 text-slate-800' : 'bg-[#0b1329]/70 border-[#10213b] text-[#F8FAFC]'">
                                
                                <div class="w-full aspect-square rounded-[10px] overflow-hidden border shrink-0 transition-all duration-300"
                                     [class]="isLightTheme() ? 'border-slate-200/60 bg-slate-50' : 'border-[#10213b] bg-slate-900/40'">
                                  <img [src]="getCollabPhoto(col)" [alt]="col.name" referrerpolicy="no-referrer" class="w-full h-full object-cover">
                                </div>

                                <div class="text-[9px] font-black tracking-wide truncate w-full mt-1.5 leading-tight"
                                     [class]="col.id === logged.id ? (isLightTheme() ? 'text-emerald-650' : 'text-emerald-400') : (isLightTheme() ? 'text-slate-700' : 'text-slate-300')">
                                  {{ col.name }}
                                </div>
                              </div>
                            }
                          </div>
                        } @else {
                          <div class="text-center py-4 text-[10px] text-slate-500 uppercase tracking-wider">Ninguém em folga neste dia</div>
                        }
                      </div>
                    </div>
                  }

                </div>
              </div>
                }

                <!-- LEFT COLUMN: FOLGAS SOLICITADAS & DATAS IMPORTANTES -->
                @if (activeSubTab() === 'perfil') {
                <div class="lg:col-span-12 lg:col-span-8 lg:col-start-3 space-y-3.5">

                  <!-- SECTION: INFORMAÇÕES DO PERFIL -->
                  <div class="rounded-[16px] p-4 space-y-4 transition-colors border"
                       [class]="isLightTheme() ? 'bg-white border-slate-200 shadow-md text-slate-900' : 'bg-[#030a14] border-[#10213b]/60 shadow-lg text-white'">
                    <div class="flex items-center justify-between pb-1.5 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#10213b]/30'">
                      <h4 class="font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
                          [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                        <span class="material-icons text-emerald-400 text-sm">person</span>
                        Meu Perfil
                      </h4>
                      <span class="text-[7.5px] font-black font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 transition-colors"
                            [class]="isLightTheme() ? 'text-slate-650 bg-slate-100 border-slate-200' : 'text-slate-300 bg-[#071426] border-[#10213b]/40'">
                        {{ logged.id }}
                      </span>
                    </div>

                    <!-- Profile Photo & Header Details -->
                    <div class="flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="relative w-14 h-14 rounded-full overflow-hidden border shrink-0 shadow-sm"
                             [class]="isLightTheme() ? 'border-slate-200 bg-slate-50' : 'border-[#10213b]/40 bg-slate-900'">
                          <img [src]="getCollabPhoto(logged)"
                               [alt]="logged.name"
                               class="w-full h-full object-cover"
                               referrerpolicy="no-referrer">
                        </div>
                        <div class="min-w-0 flex-1">
                          <h3 class="text-xs font-black uppercase tracking-wide truncate"
                              [class]="isLightTheme() ? 'text-slate-850' : 'text-slate-100'">
                            {{ logged.name }}
                          </h3>
                          <span class="inline-block mt-0.5 px-2 py-0.5 rounded text-[7.5px] font-black uppercase tracking-wider leading-none border"
                                [class]="isLightTheme() ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-emerald-950/30 text-emerald-400 border-emerald-500/25'">
                            {{ logged.role === 'SUPERVISOR' ? 'ADMIN' : logged.role === 'LIDER' ? 'LÍDER DE TURNO' : 'COLABORADOR' }}
                          </span>
                        </div>
                      </div>

                      <!-- Edit Profile Trigger Button (Moved here to save space) -->
                      <button (click)="isProfileEditOpen.set(!isProfileEditOpen())"
                              class="px-2.5 py-1.5 font-black text-[9px] uppercase rounded-lg cursor-pointer transition-all duration-200 border-none outline-none flex items-center justify-center gap-1 shadow-sm active:scale-95 shrink-0"
                              [class]="isProfileEditOpen() ? 
                                       (isLightTheme() ? 'bg-slate-150 text-slate-750 hover:bg-slate-200' : 'bg-[#10213b]/80 text-slate-300 hover:bg-[#10213b]') : 
                                       (isLightTheme() ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950')">
                        <span class="material-icons text-[10px]">{{ isProfileEditOpen() ? 'close' : 'edit' }}</span>
                        <span>{{ isProfileEditOpen() ? 'Fechar' : 'Editar' }}</span>
                      </button>
                    </div>

                    <!-- Profile Details Grid -->
                    <div class="grid grid-cols-2 gap-2 text-[9px] font-sans">
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Setor</span>
                        <span class="font-black uppercase truncate">
                          {{ logged.sector || 'Geral' }}
                        </span>
                      </div>
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Turno</span>
                        <span class="font-black uppercase truncate text-emerald-500">
                          {{ logged.shift }}
                        </span>
                      </div>
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Nascimento</span>
                        <span class="font-black font-mono truncate">
                          {{ formatBirthday(logged.birthday) }}
                        </span>
                      </div>
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Telefone</span>
                        <span class="font-black font-mono truncate font-sans">
                          {{ logged.phone || 'Não informado' }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- SECTION: FOLGAS SOLICITADAS -->
                <div class="rounded-[16px] p-4 space-y-3 transition-colors"
                     [class]="isLightTheme() ? 'bg-white border border-slate-200 shadow-md' : 'bg-[#030a14] border border-[#10213b] shadow-lg'">
                  <div class="flex items-center justify-between pb-1 border-b border-[#10213b]/40">
                    <h4 class="font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
                        [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                      <span class="material-icons text-[#10b981] text-[13px]">nights_stay</span>
                      Folgas Solicitadas
                    </h4>
                    <span class="text-[8px] font-bold font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0">
                      {{ getRequestedFolgasForCollab(logged).length }}/3
                    </span>
                  </div>
                  <p class="text-[9px] text-slate-500 leading-tight">
                    Próximo mês "{{ monthsList[(selectedMonthIndex() + 1) % 12].name }}"
                  </p>

                  <div class="grid grid-cols-1 gap-2">
                    @for (item of getFolgaRequestSlots(logged); track item.id) {
                      @if (!item.isEmpty) {
                        <div class="h-[42px] px-2 border rounded-lg flex justify-center items-center gap-1.5 transition-all duration-200"
                             [class.bg-[#030a14]/60]="!isLightTheme()"
                             [class.border-[#10213b]]="!isLightTheme()"
                             [class.bg-white]="isLightTheme()"
                             [class.border-slate-200]="isLightTheme()">
                          <span class="text-[10px] font-black text-slate-500 uppercase tracking-wide leading-none">
                            {{ getDayOfWeekLabel(item.day) }} -
                          </span>
                          <span class="text-[12px] font-black uppercase tracking-wide leading-none"
                                [class]="isLightTheme() ? 'text-slate-900' : 'text-slate-100'">
                            {{ item.formattedDate }}
                          </span>
                        </div>
                      } @else {
                        <button (click)="openSolicitarFolgaModal()" class="h-[42px] px-2 border border-dashed border-[#10213b]/60 rounded-lg flex justify-center items-center gap-1.5 transition-all duration-200 hover:bg-[#10213b]/30 cursor-pointer w-full"
                             [class.bg-slate-900/10]="!isLightTheme()"
                             [class.bg-slate-50]="isLightTheme()">
                          <span class="material-icons text-[14px] text-slate-500">add</span>
                          <span class="text-[10px] font-black text-slate-500 uppercase tracking-wide leading-none">
                            Solicitar
                          </span>
                        </button>
                      }
                    }
                  </div>
                </div>

                <!-- SECTION: TROCAS DE TURNO (PERMUTAS) -->
                <div class="rounded-[16px] p-4 space-y-3 transition-colors"
                     [class]="isLightTheme() ? 'bg-white border border-slate-200 shadow-md' : 'bg-[#030a14] border border-[#10213b] shadow-lg'">
                  <div class="flex items-center gap-1.5 pb-1 border-b border-[#10213b]/40">
                    <span class="material-icons text-blue-400 text-sm">swap_horiz</span>
                    <h4 class="font-black text-xs uppercase tracking-wider"
                        [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                      Trocas de Turno (Permutas)
                    </h4>
                  </div>
                  
                  <p class="text-[9px] text-slate-500 leading-tight">
                    Deseja trocar um dia de trabalho com um colega? Escolha uma data no calendário de escala para propor uma troca.
                  </p>

                  <button (click)="activeSubTab.set('escala')" 
                          class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 transition-all cursor-pointer text-[10px] font-black uppercase tracking-wider">
                    <span class="material-icons text-xs">calendar_today</span>
                    Ver Calendário para Troca
                  </button>
                </div>

                <!-- SECTION: MINHAS DATAS IMPORTANTES -->
                <div (click)="openEditSpecialDates()" [class.hidden]="isMobile() && activeSubTab() !== 'perfil'"
                     class="rounded-[16px] p-4 space-y-3 cursor-pointer select-none hover:border-rose-500/30 transition-colors relative group"
                     [class]="isLightTheme() ? 'bg-white border border-slate-200 shadow-md' : 'bg-[#030a14] border border-[#10213b] shadow-xl'"
                     title="Clique para editar suas datas importantes">
                  <div class="absolute inset-0 bg-rose-500/0 group-active:bg-rose-500/5 transition-colors duration-300 rounded-lg pointer-events-none"></div>
                  <div class="flex items-center justify-between pb-1 border-b border-[#10213b]/40">
                    <h4 class="font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
                        [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                      <span class="material-icons text-rose-500 text-sm">favorite</span>
                      Minhas Datas Importantes
                    </h4>
                    <div class="flex items-center gap-1.5">
                      <span class="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded shrink-0 transition-colors"
                            [class]="isLightTheme() ? 'text-rose-600 bg-rose-100 border border-rose-200' : 'text-rose-400 bg-rose-950/40 border border-rose-500/20'">
                        {{ getImportantDatesForCollab(logged).length }} Registros
                      </span>
                      <span class="material-icons text-xs text-slate-400 group-hover:text-rose-400 transition-colors">edit</span>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 gap-2">
                    @for (item of getImportantDatesForCollab(logged); track item.rawDate) {
                      <div class="pl-3 border rounded-lg flex items-stretch justify-between transition-all duration-200 overflow-hidden"
                           [class]="isLightTheme() ? 'border-slate-200 bg-white' : 'border-[#10213b]/60 bg-[#030a14]/60'"
                           [class.border-rose-500/30]="item.isBirthday"
                           [class.bg-rose-950/10]="item.isBirthday && !isLightTheme()"
                           [class.bg-rose-50/60]="item.isBirthday && isLightTheme()"
                           [class.shadow-[inset_0_0_15px_rgba(244,63,94,0.05)]]="item.isBirthday">
                        
                        <!-- Left Part (~70% width): Icon and text labels -->
                        <div class="flex items-center gap-2.5 flex-1 min-w-0 py-2.5 pr-3">
                          <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border" [class]="item.color">
                            <span class="material-icons text-[14px]">{{ item.icon }}</span>
                          </div>
                          
                          <div class="flex-1 min-w-0 flex flex-col justify-center text-left">
                            <div class="flex items-center justify-between gap-1.5 mb-0.5 w-full">
                              <span class="text-[10px] font-black truncate leading-none uppercase tracking-wide"
                                    [class]="isLightTheme() ? 'text-slate-900' : 'text-slate-100'">
                                {{ item.label }}
                              </span>
                              @if (item.priorityLabel) {
                                <span class="px-1.5 py-0.5 rounded-md text-[8px] font-black font-mono leading-none tracking-wide shrink-0 shadow-sm border"
                                      [class]="isLightTheme() ? 'bg-slate-100 text-slate-800 border-slate-200/80' : 'bg-[#1e293b]/80 text-[#F8FAFC] border-[#334155]/60'">
                                  {{ item.priorityLabel }}
                                </span>
                              }
                            </div>
                            <span class="text-[7.5px] block truncate leading-none mt-1"
                                  [class]="isLightTheme() ? 'text-slate-500' : 'text-slate-400'">
                              {{ item.details }}
                            </span>
                          </div>
                        </div>
                        
                        <!-- Right Part (~30% width): Day on top, Month name below with custom styling -->
                        <div class="w-[30%] max-w-[62px] flex flex-col items-center justify-center shrink-0 py-2 px-1 text-center"
                             [class]="item.isBirthday ? 
                                      (isLightTheme() ? 'bg-rose-50/60 border-l border-rose-100' : 'bg-rose-500/10 border-l border-rose-500/10') : 
                                      (isLightTheme() ? 'bg-slate-50/60 border-l border-slate-200/60' : 'bg-[#10213b]/30 border-l border-[#10213b]/20')">
                          <span class="text-[14px] font-black tracking-tighter leading-none"
                                [class]="item.isBirthday ? 
                                         (isLightTheme() ? 'text-rose-600' : 'text-rose-400') : 
                                         (isLightTheme() ? 'text-slate-800' : 'text-white')">
                            {{ item.day }}
                          </span>
                          <span class="text-[8px] font-black uppercase tracking-wider mt-1 leading-none"
                                [class]="item.isBirthday ? 
                                         (isLightTheme() ? 'text-rose-600' : 'text-rose-400') : 
                                         (isLightTheme() ? 'text-emerald-600' : 'text-emerald-400')">
                            {{ item.monthLabel }}
                          </span>
                        </div>
                        
                      </div>
                    } @empty {
                      <div class="py-4 text-center rounded-lg border border-dashed border-[#10213b]/40 bg-slate-900/10 flex flex-col items-center justify-center gap-1 w-full">
                        <span class="material-icons text-base text-slate-500">cake</span>
                        <span class="text-[8px] font-bold uppercase tracking-wider text-slate-500">Nenhuma data especial cadastrada</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- SECTION: EDITAR PERFIL -->
                <div [class.hidden]="(isMobile() && activeSubTab() !== 'perfil') || !isProfileEditOpen()"
                     [class]="'rounded-lg p-3.5 space-y-3 transition-colors border ' + (isLightTheme() ? 'bg-white border-slate-200 shadow-sm text-slate-900' : 'bg-[#030a14] border-[#10213b]/60 shadow-xl text-white')">
                  <div class="flex items-center pb-2 border-b border-[#10213b]/30">
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-emerald-400 text-sm">manage_accounts</span>
                      <h4 class="font-black text-xs uppercase tracking-wider"
                          [class]="isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]'">
                        Editar Perfil
                      </h4>
                    </div>
                  </div>

                  <div class="space-y-3">
                    <!-- Foto de Perfil com Crop Trigger -->
                    <div class="flex flex-col items-center justify-center pb-2">
                      <div (click)="profilePhotoCropInput.click()"
                           title="Clique para alterar e recortar sua foto de perfil"
                           class="relative w-16 h-16 rounded-full overflow-hidden border-2 shrink-0 shadow-md cursor-pointer group transition-all duration-200 hover:scale-105 active:scale-95 border-emerald-500/60 bg-slate-100 hover:border-emerald-600">
                        
                        <img [src]="getCollabPhoto(logged)"
                             [alt]="logged.name"
                             class="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-200"
                             referrerpolicy="no-referrer">

                        <!-- Overlay Hover -->
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200">
                          <span class="material-icons text-base">photo_camera</span>
                          <span class="text-[8px] font-black uppercase tracking-tight">Alterar</span>
                        </div>

                        <!-- Borda inferior indicando crop -->
                        <div class="absolute bottom-0 inset-x-0 bg-emerald-600/90 py-0.5 text-center text-white text-[8px] font-bold flex items-center justify-center gap-0.5">
                          <span class="material-icons text-[10px]">crop</span>
                        </div>
                      </div>

                      <!-- Input File Oculto -->
                      <input type="file" #profilePhotoCropInput class="hidden" accept="image/*" (change)="onProfilePhotoSelectedForCrop($event)">
                      <span class="text-[9px] font-medium text-slate-400 mt-1">Clique para recortar e alterar foto</span>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Nome Completo</label>
                      <input type="text" [value]="logged.name" #newNameInput
                             class="bg-[#030a14] border border-[#10213b]/40 text-white text-[11px] px-3 py-2 rounded-lg w-full outline-none focus:border-emerald-500 font-sans"
                             [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()" [class.text-slate-900]="isLightTheme()">
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Data de Nascimento</label>
                      <input type="date" [value]="logged.birthday" #newBirthdayInput
                             class="bg-[#030a14] border border-[#10213b]/40 text-white text-[11px] px-3 py-2 rounded-lg w-full outline-none focus:border-emerald-500 font-mono"
                             [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()" [class.text-slate-900]="isLightTheme()">
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Telefone de Contato</label>
                      <input type="text" [value]="logged.phone || ''" #newPhoneInput placeholder="(00) 00000-0000"
                             class="bg-[#030a14] border border-[#10213b]/40 text-white text-[11px] px-3 py-2 rounded-lg w-full outline-none focus:border-emerald-500 font-mono"
                             [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()" [class.text-slate-900]="isLightTheme()">
                    </div>

                    <button (click)="saveProfileChanges(logged, newNameInput.value, newBirthdayInput.value, newPhoneInput.value)"
                            class="w-full text-center py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-[10px] uppercase rounded-lg cursor-pointer transition-colors border-none outline-none flex items-center justify-center gap-1.5 shadow-md active:scale-95">
                      <span class="material-icons text-xs">save</span>
                      Salvar Alterações
                    </button>
                  </div>
                </div>

              </div>
                }

              <!-- RIGHT COLUMN: MONTHLY CALENDAR -->
              @if (activeSubTab() === 'escala') {
              <div class="lg:col-span-12 space-y-3">
                
                <!-- PORTAL COLLABORATOR OFFICIAL REPORT & MONTHLY SCALE (Prontuário) -->
                <div [class]="'border rounded-xl p-2 sm:p-3.5 shadow-md space-y-3 sm:space-y-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#030a14] border-[#10213b] text-white shadow-lg')">

                    <!-- Calendário de Escala de Folgas -->
                    <div class="space-y-4">
                      <div class="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <h4 class="font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
                              [class]="isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]'">
                            <span class="material-icons text-[#10b981] text-sm">calendar_month</span>
                            Escala de Folgas do Mês
                          </h4>
                          <p class="text-[9px] text-slate-500 mt-1" [class.text-slate-500]="isLightTheme()">
                            Legenda: Verde (FOLGA), Vermelho (AUSENTE), Azul (TRABALHO).
                          </p>
                        </div>
                        
                        <!-- Month Navigator -->
                        <div class="flex items-center gap-1 bg-[#071426] border border-[#10213b] rounded-lg p-1"
                             [class.bg-slate-100]="isLightTheme()"
                             [class.border-slate-200]="isLightTheme()">
                          <button (click)="prevMonth()" class="w-8 h-8 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                                  [class.hover:bg-white]="isLightTheme()"
                                  title="Mês Anterior">
                            <span class="material-icons text-sm">chevron_left</span>
                          </button>
                          <div class="flex flex-col items-center justify-center min-w-[100px]">
                            <span class="text-[9px] font-black uppercase text-slate-300 leading-tight"
                                  [class.text-slate-700]="isLightTheme()">
                              {{ currentMonthName() }}
                            </span>
                            <span class="text-[7px] font-bold text-slate-500 font-mono leading-tight">
                              {{ currentYear() }}
                            </span>
                          </div>
                          <button (click)="nextMonth()" class="w-8 h-8 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                                  [class.hover:bg-white]="isLightTheme()"
                                  title="Próximo Mês">
                            <span class="material-icons text-sm">chevron_right</span>
                          </button>
                        </div>
                      </div>

                      <!-- Grade de Dias do Calendário -->
                      <div class="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs">
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Dom</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Seg</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Ter</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Qua</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Qui</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Sex</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Sáb</div>

                        @for (offset of getOffsetDaysArray(); track offset) {
                          <div class="bg-transparent border border-transparent p-1.5 sm:p-2"></div>
                        }

                        @for (day of daysInMonth(); track day) {
                          @let events = getSpecialEventsForDay(logged, day);
                          @let dayInfo = getCollaboratorDayScheduleInfo(logged, day);
                          @let count = getFolgaRequestCount(day);

                          <div [class]="getCollaboratorCalendarDayStaticClass(logged, day, count)"
                               [class.opacity-45]="isPastDay(day)"
                               [class.saturate-[0.45]]="isPastDay(day)"
                               class="transition-all duration-300">
                            
                            <div class="flex items-center justify-between w-full shrink-0">
                              <span class="font-extrabold font-mono text-[10px] sm:text-[12px] h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full"
                                    [class.bg-emerald-500]="isToday(day)"
                                    [class.text-white]="isToday(day)"
                                    [class.bg-emerald-500/20]="dayInfo.status === 'folga' && !isToday(day)"
                                    [class.text-emerald-400]="dayInfo.status === 'folga' && !isLightTheme() && !isToday(day)"
                                    [class.text-emerald-800]="dayInfo.status === 'folga' && isLightTheme() && !isToday(day)"
                                    [class.bg-rose-500/20]="dayInfo.status === 'licenca' && !isToday(day)"
                                    [class.text-rose-400]="dayInfo.status === 'licenca' && !isLightTheme() && !isToday(day)"
                                    [class.text-rose-800]="dayInfo.status === 'licenca' && isLightTheme() && !isToday(day)"
                                    [class.bg-slate-700/30]="dayInfo.status === 'trabalho' && !isLightTheme() && !isToday(day)"
                                    [class.bg-slate-200/50]="dayInfo.status === 'trabalho' && isLightTheme() && !isToday(day)"
                                    [class.text-slate-300]="dayInfo.status === 'trabalho' && !isLightTheme() && !isToday(day)"
                                    [class.text-slate-700]="dayInfo.status === 'trabalho' && isLightTheme() && !isToday(day)">
                                {{ day }}
                              </span>
                              @if (events.length > 0) {
                                <div class="flex items-center gap-0.5">
                                  @for (ev of events; track ev.tooltip) {
                                    <span class="material-icons text-[9px] sm:text-[11px] select-none" [style.color]="ev.color" [title]="ev.tooltip">{{ ev.icon }}</span>
                                  }
                                </div>
                              }
                            </div>

                            <div class="flex flex-col items-start w-full gap-0.5 shrink-0 select-none mt-0.5 sm:mt-1 leading-none">
                              <span class="text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-tight block max-w-full truncate leading-none"
                                    [class.text-emerald-300]="isToday(day) && !isLightTheme()"
                                    [class.text-emerald-950]="isToday(day) && isLightTheme()"
                                    [class.text-emerald-400]="dayInfo.status === 'folga' && !isToday(day)"
                                    [class.text-rose-400]="dayInfo.status === 'licenca' && !isToday(day)"
                                    [class.text-slate-300]="dayInfo.status === 'trabalho' && !isLightTheme() && !isToday(day)"
                                    [class.text-slate-700]="dayInfo.status === 'trabalho' && isLightTheme() && !isToday(day)">
                                <span class="hidden sm:inline">{{ dayInfo.status === 'folga' ? 'FOLGA' : (dayInfo.status === 'licenca' || dayInfo.status === 'afastamento' ? 'AUSENTE' : 'TRABALHO') }}</span>
                                <span class="inline sm:hidden">{{ dayInfo.status === 'folga' ? 'FOLGA' : (dayInfo.status === 'licenca' || dayInfo.status === 'afastamento' ? 'AUSENTE' : 'TRABALHO') }}</span>
                              </span>
                            </div>

                            <div class="w-full text-left pt-1 border-t shrink-0 select-none mt-1 leading-none hidden sm:flex items-center justify-between"
                                 [class.border-[#10213b]/20]="!isToday(day)"
                                 [class.border-emerald-500/30]="isToday(day) && !isLightTheme()"
                                 [class.border-emerald-300/40]="isToday(day) && isLightTheme()">
                              <span class="text-[8.5px] font-bold font-mono"
                                    [class.text-slate-400]="!isToday(day)"
                                    [class.text-emerald-300/85]="isToday(day) && !isLightTheme()"
                                    [class.text-emerald-900/90]="isToday(day) && isLightTheme()">{{ dayInfo.subLabel }}</span>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

              </div>
              }

              <!-- SECTION: FERRAMENTA DIÁRIA (TRABALHO E FOLGA NO MESMO DIA) -->
              @if (activeSubTab() === 'equipe') {
              <div class="lg:col-span-12 space-y-4">
              <div id="team-daily-schedule-tool"
                   [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-4 transition-all duration-300 mb-4 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#030a14] border-[#10213b] text-white shadow-lg')">
                
                <!-- HEADER WITH TITLE AND DAY SWITCHER -->
                <div id="team-daily-header" class="flex items-center justify-between pb-2 border-b" [class]="isLightTheme() ? 'border-slate-150' : 'border-[#10213b]/30'">
                  <div class="flex items-center gap-1.5">
                    <span class="material-icons text-emerald-400 text-sm">event_note</span>
                    <span [class]="'text-[12px] font-black uppercase tracking-wide ' + (isLightTheme() ? 'text-slate-850' : 'text-[#F8FAFC]')">
                      Escala Diária do Time
                    </span>
                  </div>

                  <!-- Quick Day Switcher -->
                  <div id="team-day-switcher" class="flex items-center gap-1.5 bg-[#071426] border border-[#10213b]/40 rounded-lg p-0.5"
                       [class.bg-slate-50]="isLightTheme()"
                       [class.border-slate-200]="isLightTheme()">
                    <button id="btn-team-day-prev" (click)="prevCalendarDay()" 
                            class="w-6 h-6 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                            [class.hover:bg-white]="isLightTheme()"
                            [class.opacity-30]="selectedCalendarDay() <= 1"
                            [disabled]="selectedCalendarDay() <= 1"
                            title="Dia Anterior">
                      <span class="material-icons text-xs">chevron_left</span>
                    </button>
                    <div id="team-day-display" class="flex items-center justify-center min-w-[50px]">
                      <span class="text-[10px] font-black font-mono text-slate-300"
                            [class.text-slate-700]="isLightTheme()">
                        Dia {{ selectedCalendarDay() < 10 ? '0' + selectedCalendarDay() : selectedCalendarDay() }}
                      </span>
                    </div>
                    <button id="btn-team-day-next" (click)="nextCalendarDay()" 
                            class="w-6 h-6 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                            [class.hover:bg-white]="isLightTheme()"
                            [class.opacity-30]="selectedCalendarDay() >= daysInMonth().length"
                            [disabled]="selectedCalendarDay() >= daysInMonth().length"
                            title="Próximo Dia">
                      <span class="material-icons text-xs">chevron_right</span>
                    </button>
                  </div>
                </div>

                <!-- FILTER SELECTOR TABS -->
                <div id="team-filter-container" class="grid grid-cols-2 sm:grid-cols-4 p-1 rounded-xl gap-1" [class]="isLightTheme() ? 'bg-slate-100' : 'bg-[#071426]'">
                  <button id="btn-filter-meu-turno" (click)="coworkersFilter.set('MEU_TURNO')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'MEU_TURNO' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">person_pin</span>
                    <span class="truncate">Meu Turno ({{ logged.shift || 'N/A' }})</span>
                  </button>
                  <button id="btn-filter-anterior" (click)="coworkersFilter.set('TURNO_ANTERIOR')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'TURNO_ANTERIOR' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">history</span>
                    <span class="truncate">Anterior ({{ getPreviousShiftLabel() }})</span>
                  </button>
                  <button id="btn-filter-posterior" (click)="coworkersFilter.set('TURNO_POSTERIOR')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'TURNO_POSTERIOR' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">update</span>
                    <span class="truncate">Posterior ({{ getPosteriorShiftLabel() }})</span>
                  </button>
                  <button id="btn-filter-todos" (click)="coworkersFilter.set('TODOS')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'TODOS' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">groups</span>
                    <span class="truncate">Todos</span>
                  </button>
                </div>

                <!-- SUB TABS: TRABALHANDO vs FOLGANDO -->
                <div id="team-subtabs-container" class="grid grid-cols-2 p-1 rounded-xl" [class]="isLightTheme() ? 'bg-slate-100' : 'bg-[#071426]'">
                  <button id="btn-team-tab-trabalhando" (click)="teamDailyTab.set('trabalhando')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-sm active:scale-95"
                          [class]="teamDailyTab() === 'trabalhando' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-sm border-b border-slate-200' : 'bg-emerald-500 text-emerald-950') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-xs">work</span>
                    Trabalhando ({{ getTodayTeamCollaborators().length }})
                  </button>
                  <button id="btn-team-tab-folgando" (click)="teamDailyTab.set('folgando')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-sm active:scale-95"
                          [class]="teamDailyTab() === 'folgando' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-sm border-b border-slate-200' : 'bg-amber-500 text-amber-950') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-xs">beach_access</span>
                    Folgando ({{ getCollaboratorsOnVacationForDay(selectedCalendarDay()).length }})
                  </button>
                </div>

                <!-- LIST / GRID OF COLLABORATORS FOR ACTIVE SUB-TAB -->
                <div id="team-daily-list-wrapper">
                  @if (teamDailyTab() === 'trabalhando') {
                    @let activeCollabs = getTodayTeamCollaborators();
                    @if (activeCollabs.length > 0) {
                      <div id="team-active-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                        @for (col of activeCollabs; track col.id) {
                          <div [id]="'active-collab-' + col.id" 
                               class="flex items-center justify-between gap-2.5 p-2.5 border rounded-xl"
                               [class]="isLightTheme() ? 'border-slate-150 bg-slate-50/50' : 'border-[#10213b]/60 bg-[#071426]/30'">
                            <div class="flex items-center gap-2.5 min-w-0">
                              <img [src]="getCollabPhoto(col)" alt="Avatar" referrerpolicy="no-referrer"
                                   class="w-8 h-8 rounded-full object-cover border shrink-0"
                                   [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]'">
                              <div class="min-w-0">
                                <p [class]="'text-[10px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                                  {{ col.name }}
                                </p>
                                <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                                  {{ col.role }} &bull; {{ col.sector || 'Geral' }}
                                </p>
                              </div>
                            </div>
                            <span class="text-[7px] font-black font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 transition-colors"
                                  [class]="isLightTheme() ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-emerald-400 bg-emerald-950/20 border-emerald-500/20'">
                              {{ getCollabShiftOnDay(col, selectedCalendarDay()) }}
                            </span>
                          </div>
                        }
                      </div>
                    } @else {
                      <div id="team-active-empty" class="text-center py-6 text-[10px] text-slate-500 uppercase tracking-wider border border-dashed rounded-xl"
                           [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]/40'">
                        Nenhum colaborador trabalhando neste dia
                      </div>
                    }
                  }

                  @if (teamDailyTab() === 'folgando') {
                    @let offCollabs = getCollaboratorsOnVacationForDay(selectedCalendarDay());
                    @if (offCollabs.length > 0) {
                      <div id="team-off-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                        @for (col of offCollabs; track col.id) {
                          <div [id]="'off-collab-' + col.id"
                               class="flex items-center justify-between gap-2.5 p-2.5 border rounded-xl"
                               [class]="isLightTheme() ? 'border-slate-150 bg-slate-50/50' : 'border-[#10213b]/60 bg-[#071426]/30'">
                            <div class="flex items-center gap-2.5 min-w-0">
                              <img [src]="getCollabPhoto(col)" alt="Avatar" referrerpolicy="no-referrer"
                                   class="w-8 h-8 rounded-full object-cover border shrink-0"
                                   [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]'">
                              <div class="min-w-0">
                                <p [class]="'text-[10px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                                  {{ col.name }}
                                </p>
                                <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                                  {{ col.role }} &bull; {{ col.sector || 'Geral' }}
                                </p>
                              </div>
                            </div>
                            <span class="text-[7px] font-black font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 transition-colors"
                                  [class]="isLightTheme() ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-amber-400 bg-amber-950/20 border-amber-500/20'">
                              FOLGA
                            </span>
                          </div>
                        }
                      </div>
                    } @else {
                      <div id="team-off-empty" class="text-center py-6 text-[10px] text-slate-500 uppercase tracking-wider border border-dashed rounded-xl"
                           [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]/40'">
                        Nenhum colaborador de folga neste dia
                      </div>
                    }
                  }
                </div>

              </div>

              <!-- SECTION: MINHA EQUIPE DO TURNO -->
              <div [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')">
                <!-- HEADER -->
                <div class="flex items-center pb-2 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                  <div class="flex items-center gap-2">
                    <span class="material-icons text-emerald-400 text-sm">groups</span>
                    <span [class]="'text-[13px] font-bold tracking-wide uppercase ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                      Minha Equipe (Turno {{ getBaseShift(logged.shift) }})
                    </span>
                  </div>
                </div>

                <p [class]="'text-[10px] ' + (isLightTheme() ? 'text-slate-600' : 'text-slate-400')">
                  Abaixo estão listados todos os colaboradores pertencentes ao turno base <strong class="text-emerald-500 font-bold uppercase">{{ getBaseShift(logged.shift) }}</strong>.
                </p>

                <!-- Members list -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  @for (member of getCollabTeamMembers(); track member.id) {
                    <div [class]="'flex items-center gap-3 p-3 border rounded-xl transition-all ' + (isLightTheme() ? 'border-slate-150 bg-slate-50/50 hover:bg-slate-100/50' : 'border-[#10213b] bg-[#071426]/30 hover:bg-[#071426]')">
                      <!-- Photo -->
                      <img [src]="getCollabPhoto(member)" alt="Avatar" referrerpolicy="no-referrer"
                           class="w-10 h-10 rounded-full object-cover border shrink-0"
                           [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]'">

                      <!-- Information -->
                      <div class="min-w-0 flex-1">
                        <p [class]="'text-[11px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                          {{ member.name }}
                        </p>
                        <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                          {{ member.role }} &bull; {{ member.sector }}
                        </p>
                        <!-- Specific sub-shift -->
                        <span class="text-[7.5px] font-black font-mono px-1 py-0.5 rounded uppercase border mt-1 inline-block"
                              [class]="isLightTheme() ? 'text-slate-600 bg-slate-150 border-slate-200' : 'text-slate-400 bg-[#030a14] border-[#10213b]/40'">
                          {{ member.shift }}
                        </span>
                      </div>

                      <!-- Today status dot -->
                      @let mStats = getConsecutiveWorkStats(member);
                      <div class="flex flex-col items-end gap-1 select-none shrink-0">
                        <span [class]="'text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ' + 
                                       (mStats.isWorking ? 
                                        'text-amber-500 bg-amber-500/10 border-amber-500/20' : 
                                        'text-emerald-500 bg-emerald-500/10 border-emerald-500/20')">
                          {{ mStats.isWorking ? 'ATIVO' : 'FOLGA' }}
                        </span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
      </div>
    }
      </div>

```



---

## 2. Códigos para Montagem Completa (Recriação do Zero)

Se você desejar recriar todo o projeto, utilize os códigos completos abaixo para os respectivos arquivos.

### Arquivo: `src/app/app.html`

```html
<!-- MAIN WRAPPER: PREMIUM WORK SCALE MANAGEMENT DARK MODE -->
<div class="h-screen bg-[#020813] font-sans flex flex-col antialiased selection:bg-emerald-600 selection:text-white overflow-hidden" id="main_app_layout" [class.light-theme]="isLightTheme()" [class.text-slate-900]="isLightTheme()" [class.text-slate-100]="!isLightTheme()">



  @if (!getLoggedCollab()) {
    <!-- TELA DE LOGIN SIMPLICADA - SEM AVIAÇÃO - EM PORTUGUÊS BRASIL -->
    <div class="flex-1 flex flex-col items-center justify-center p-4 bg-[#020813] select-none text-slate-100 w-full h-full">
      <div class="w-full max-w-xs p-6 bg-[#030a14] border border-[#10213b] rounded-xl shadow-2xl flex flex-col gap-4 animate-fade-in animate-duration-200" id="login_card_container">
        
        <!-- Cabeçalho Minimalista -->
        <div class="flex flex-col items-center text-center gap-1">
          <h2 class="text-lg font-black tracking-wider text-white uppercase">ESCALA EASY</h2>
          <p class="text-[10px] text-slate-400 font-medium">
            Gestão de Escala de Trabalho Mensal
          </p>
        </div>

        <hr class="border-[#10213b]/50">

        <!-- Mensagens de Erro -->
        @if (loginError()) {
          <div class="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-start gap-2 text-left text-rose-400" id="login_error_box">
            <span class="material-icons text-sm leading-none shrink-0 mt-0.5">error</span>
            <span class="text-[10px] font-bold leading-normal">{{ loginError() }}</span>
          </div>
        }

        <!-- FORM UNIFICADO: Nome e Senha juntos -->
        <div class="flex flex-col gap-3.5 text-left animate-fade-in">
          
          <!-- Nome de Usuário -->
          <div class="flex flex-col gap-1">
            <label for="login_name" class="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Nome do Colaborador</label>
            <input type="text"
                   id="login_name"
                   [value]="loginNameInput()"
                   (input)="loginNameInput.set($any($event.target).value)"
                   (keydown.enter)="handleLoginSubmit()"
                   placeholder="Digite seu nome"
                   class="w-full px-3 py-2 bg-[#051124] border border-[#10213b] rounded-lg text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-sans uppercase" />
          </div>

          <!-- Senha (sempre visível abaixo) -->
          <div class="flex flex-col gap-1">
            <label for="login_password" class="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
              {{ isFirstAccess() ? 'Crie sua senha de 4 dígitos' : 'Senha de acesso (4 dígitos)' }}
            </label>
            <input type="password"
                   id="login_password"
                   [value]="loginPasswordInput()"
                   (input)="loginPasswordInput.set($any($event.target).value)"
                   (keydown.enter)="handleLoginSubmit()"
                   maxlength="4"
                   placeholder="Digite sua senha"
                   class="w-full px-3 py-2 bg-[#051124] border border-[#10213b] rounded-lg text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-sans" />
          </div>

          <!-- Confirmar Senha (Aparece dinamicamente se for Primeiro Acesso) -->
          @if (isFirstAccess()) {
            <div class="flex flex-col gap-1 animate-slide-up">
              <label for="confirm_password" class="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Confirme sua nova senha</label>
              <input type="password"
                     id="confirm_password"
                     [value]="confirmPasswordInput()"
                     (input)="confirmPasswordInput.set($any($event.target).value)"
                     (keydown.enter)="handleLoginSubmit()"
                     maxlength="4"
                     placeholder="Confirme sua senha"
                     class="w-full px-3 py-2 bg-[#051124] border border-[#10213b] rounded-lg text-xs font-bold text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all font-sans" />
              <p class="text-[8px] text-emerald-400 font-bold leading-normal mt-0.5 uppercase tracking-wide">
                Primeiro acesso detectado! Digite e confirme uma senha de 4 dígitos para cadastrar.
              </p>
            </div>
          }

          <button (click)="handleLoginSubmit()"
                  id="btn_login_submit"
                  class="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer border-none outline-none mt-1">
            {{ isFirstAccess() ? 'Confirmar e Entrar' : 'Entrar' }}
            <span class="material-icons text-xs leading-none">login</span>
          </button>
        </div>
      </div>
      
      <!-- Rodapé discreto -->
      <span class="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-4">
        Escala Easy VIBRA • 100% Corporativo
      </span>
    </div>
  } @else {

  <!-- GLOBAL UNIFIED TABS BAR (home / matrix / staff + dropdown options) -->
  <header class="flex flex-row items-center justify-between gap-2 md:gap-3.5 select-none px-3 md:px-4 py-2 border-b border-[#10213b] shadow-xl relative z-[60]" 
          [class.bg-[#030a14]/80]="!isLightTheme()" [class.backdrop-blur-md]="!isLightTheme()" [class.bg-white]="isLightTheme()" id="global_master_header">
    <div class="flex items-center gap-2 md:gap-4 select-none">
      <!-- Logo Square Emblem -->
      <div class="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
        <span class="material-icons text-xl text-white-force" style="color: #ffffff !important;">calendar_month</span>
      </div>
      <div class="flex flex-col select-none">
        <span class="flex items-center gap-1.5">
          <span class="text-[12px] font-black tracking-tight leading-none" [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">ESCALA<span class="text-[#10b981]">.</span>EASY</span>
        </span>
        

      </div>
    </div>

    <!-- CENTER PORTAL PROFILE HEADER IN MAIN HEADER -->
    @if (getLoggedCollab()) {
      @let loggedH = getLoggedCollab()!;
      
      <div class="hidden md:flex items-center gap-3 relative z-10 select-none" id="header_portal_profile">
        <!-- Avatar Container -->
        <div class="relative shrink-0 group cursor-pointer">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg blur opacity-35"></div>
          @if (loggedH.photoUrl || loggedH.photo) {
            <img [src]="getCollabPhoto(loggedH)" 
                 alt="Foto de {{ loggedH.name }}"
                 class="w-10 h-10 rounded-lg object-cover border border-emerald-500/20 shadow-lg bg-slate-900 relative z-10">
          } @else {
            <div class="w-10 h-10 rounded-lg border border-emerald-500/20 shadow-lg bg-slate-900 relative z-10 flex items-center justify-center text-slate-400 font-black text-sm uppercase">
              {{ loggedH.name.charAt(0) }}
            </div>
          }
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity rounded-lg z-20">
            <span class="material-icons text-[10px] mb-0.5">add_a_photo</span>
            <span class="text-[5px] font-black uppercase tracking-wider">Alt</span>
          </div>
          <input type="file"
                 (change)="onPortalPhotoSelected($event)"
                 accept="image/*"
                 class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-30"
                 title="Alterar foto">
        </div>

        <div class="flex flex-row items-center divide-x divide-slate-700/50 light-theme-border-divide-override select-none">
          <!-- Coluna 1: Nome & Função -->
          <div class="flex flex-col pr-4">
            <span class="text-xs font-black uppercase tracking-tight leading-none mb-1"
                  [class.text-white]="!isLightTheme()"
                  [class.text-slate-800]="isLightTheme()">
              {{ loggedH.name }}
            </span>
            <span class="text-[8px] font-bold text-slate-400 uppercase tracking-wider leading-none">
              {{ loggedH.role === 'LIDER' ? 'Líder' : loggedH.role === 'SUPERVISOR' ? 'Supervisor' : 'Operador' }}
            </span>
          </div>

          <!-- Coluna 2: Setor -->
          <div class="flex flex-col px-4">
            <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Setor
            </span>
            <span class="text-[10px] font-black uppercase tracking-wide leading-none"
                  [class.text-white]="!isLightTheme()"
                  [class.text-slate-800]="isLightTheme()">
              {{ loggedH.sector || 'Geral' }}
            </span>
          </div>

          <!-- Coluna 3: Turno -->
          <div class="flex flex-col pl-4">
            <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Turno
            </span>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-wide leading-none font-mono">
              {{ loggedH.shift }}
            </span>
          </div>
        </div>
      </div>
    }

    <!-- RIGHT UTILITIES ROW -->
    <div class="flex flex-nowrap items-center gap-1 md:gap-2.5 justify-end">
      <!-- FULLSCREEN (TELA CHEIA) TOGGLE -->
      <button (click)="toggleFullscreen()"
              class="hidden md:flex relative p-2.5 h-[40px] w-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all items-center justify-center cursor-pointer shadow-sm select-none border-none outline-none"
              title="Tela Cheia">
        <span class="material-icons text-lg">{{ isFullscreen() ? 'fullscreen_exit' : 'fullscreen' }}</span>
      </button>

      <!-- THEME (CLARO / ESCURO) TOGGLE -->
      <button (click)="toggleTheme()"
              class="flex relative p-2.5 h-[40px] w-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all items-center justify-center cursor-pointer shadow-sm select-none border-none outline-none"
              title="Alternar Tema">
        <span class="material-icons text-lg" style="color: #e8e22f !important;" [class.text-amber-500]="isLightTheme()">{{ isLightTheme() ? 'light_mode' : 'dark_mode' }}</span>
      </button>

      <!-- Notification Bell with unread badge -->
      <div class="relative inline-block text-left">
         <button (click)="toggleNotificationMenu($event)"
                 class="relative p-2.5 h-[40px] w-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all flex items-center justify-center cursor-pointer shadow-sm select-none border-none outline-none"
                 id="notification_bell_btn">
            <span class="material-icons text-lg" style="color: #10B981;">notifications</span>
            @if (unreadNotificationsCount() > 0) {
              <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white ring-2 ring-[#020813] animate-pulse"
                    style="background-color: #347660 !important;">
                {{ unreadNotificationsCount() }}
              </span>
            }
         </button>

         @if (isNotificationOpen()) {
           <div (click)="$event.stopPropagation()" class="absolute right-0 mt-2 w-80 rounded-lg bg-[#071426] border border-[#10213b] shadow-2xl z-50 divide-y divide-[#10213b] animate-fade-in max-h-[400px] overflow-y-auto"
                id="notification_dropdown">
              <div class="p-3 flex items-center justify-between bg-[#030a14] rounded-t-lg border-b border-[#10213b]">
                 <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Notificações Recentes</span>
                 <button (click)="markAllNotificationsAsRead(); $event.stopPropagation()" class="text-[8px] font-bold uppercase tracking-widest text-[#10b981] hover:text-emerald-400 bg-transparent border-none cursor-pointer">
                    Marcar todas
                 </button>
              </div>
              <div class="divide-y divide-[#10213b]">
                 @if (notifications().length === 0) {
                   <div class="p-6 text-center text-[11px] text-slate-500 italic">
                      Nenhuma notificação encontrada.
                   </div>
                 } @else {
                   @for (notif of notifications(); track notif.id) {
                     <div class="p-3 hover:bg-[#0b1e36]/50 transition-colors flex gap-2.5 items-start" [ngClass]="{ 'bg-[#0e1628]': !notif.read }">
                        <div class="p-1 rounded text-xs"
                             [class.bg-blue-950]="notif.type === 'publish'" [class.text-blue-400]="notif.type === 'publish'"
                             [class.bg-amber-950]="notif.type === 'alert'" [class.text-amber-400]="notif.type === 'alert'"
                             [class.bg-emerald-950]="notif.type === 'trade'" [class.text-emerald-400]="notif.type === 'trade'">
                           <span class="material-icons text-base">{{ notif.type === 'publish' ? 'publish' : (notif.type === 'alert' ? 'warning' : 'swap_horiz') }}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                           <p class="text-[10px] text-slate-300 leading-relaxed font-semibold" [class.font-bold]="!notif.read">{{ notif.message }}</p>
                           <span class="text-[8px] text-slate-500 font-mono mt-1 block">{{ notif.timestamp }}</span>
                        </div>
                        @if (!notif.read) {
                          <button (click)="markNotificationAsRead(notif.id); $event.stopPropagation()" class="text-slate-500 hover:text-blue-400 bg-transparent border-none cursor-pointer">
                             <span class="material-icons text-[14px]">done</span>
                          </button>
                        }
                     </div>
                   }
                 }
              </div>
           </div>
         }
      </div>

<!-- SETTINGS DROPDOWN OPTIONS BUTTON (Moved Up) -->

      <div class="relative inline-block text-left" id="options_dropdown_container">
        <button (click)="toggleDropdownMenu($event)"
                class="relative p-2.5 md:px-3.5 h-[40px] bg-[#071426] border border-[#10213b] text-slate-400 hover:text-white hover:bg-[#0b1e36] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm select-none border-none outline-none text-[10px] font-black tracking-wider uppercase overflow-hidden"
                [class.max-md:p-0]="getLoggedCollab()"
                [class.max-md:w-[40px]]="getLoggedCollab()"
                id="btn_options_dropdown">
          @if (getLoggedCollab()) {
            @let loggedH = getLoggedCollab()!;
            <div class="md:hidden w-full h-full bg-slate-800 flex items-center justify-center text-emerald-500 font-bold text-xs overflow-hidden shrink-0">
               @if (loggedH.photoUrl || loggedH.photo) {
                 <img [src]="getCollabPhoto(loggedH)" class="w-full h-full object-cover">
               } @else {
                 {{ loggedH.name.charAt(0) }}
               }
            </div>
            <span class="hidden md:inline-flex material-icons text-lg">settings</span>
            <span class="hidden md:inline-block">Opções</span>
          } @else {
            <span class="material-icons text-lg">settings</span>
            <span class="hidden md:inline-block">Opções</span>
          }
          <span class="hidden md:inline-block material-icons text-xs transition-transform duration-200" [class.rotate-180]="isDropdownOpen()">expand_more</span>
        </button>

        @if (isDropdownOpen()) {
          <div (click)="$event.stopPropagation()" class="absolute right-0 mt-2 w-56 rounded-lg bg-[#071426] border border-[#10213b] shadow-2xl z-50 divide-y divide-[#10213b] animate-fade-in" id="dropdown_options_menu">
            <!-- Account Info / Login Simulation -->
            <div class="py-1.5 rounded-t-lg bg-[#071426]">
              <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Conta de Acesso</span>
              
              @if (getLoggedCollab()) {
                @let logCol = getLoggedCollab()!;
                <div class="mx-3 my-1.5 px-3 py-2 border border-[#10213b] bg-[#030a14]/60 rounded-lg flex flex-col gap-2 select-none">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded bg-[#10b981] text-white flex items-center justify-center font-bold text-[10px] font-mono shrink-0">
                      {{ logCol.name | slice:0:2 | uppercase }}
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-[9px] font-black uppercase text-white leading-tight tracking-wider truncate">{{ logCol.name }}</span>
                      <span class="text-[7px] font-bold text-slate-400 uppercase leading-tight tracking-widest truncate">{{ logCol.role === 'SUPERVISOR' ? 'ADMIN' : logCol.role === 'LIDER' ? 'LÍDER DE TURNO' : 'COLABORADOR' }}</span>
                    </div>
                  </div>
                  <!-- Mobile only Sector and Turno info -->
                  <div class="flex md:hidden justify-between mt-1 pt-1 border-t border-[#10213b]/50">
                     <div class="flex flex-col">
                        <span class="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Setor</span>
                        <span class="text-[8px] font-black uppercase tracking-wide leading-none text-slate-300">{{ logCol.sector || 'Geral' }}</span>
                     </div>
                     <div class="flex flex-col items-end">
                        <span class="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Turno</span>
                        <span class="text-[8px] font-black text-emerald-500 uppercase tracking-wide leading-none font-mono">{{ logCol.shift }}</span>
                     </div>
                  </div>
                </div>
              }


              
              @if (!scaleService.selectedCollabName()) {
                <button (click)="openAuthModal('LOGIN'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer text-slate-300 hover:bg-[#0b1e36] border-none outline-none">
                  <span class="material-icons text-slate-400 text-sm">login</span>
                  Fazer Login (Admin/LT)
                </button>
              } @else {
                <button (click)="logout(); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer text-rose-400 hover:bg-[#0b1e36] border-none outline-none">
                  <span class="material-icons text-rose-400 text-sm">logout</span>
                  Sair do Perfil
                </button>
              }
            </div>

            <!-- Seções -->
            @if (isAdmin(getLoggedCollab())) {
              <div class="py-1.5 bg-[#030a14] border-t border-[#10213b]" id="dropdown_sections_category">
                <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Seções</span>
                
                <button (click)="activeSubTab.set('matrix'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'matrix' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'matrix' ? 'text-emerald-400' : 'text-slate-400'">calendar_month</span>
                  Escala Geral
                </button>


                <button (click)="activeSubTab.set('portal'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'portal' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'portal' ? 'text-emerald-400' : 'text-slate-400'">contact_page</span>
                  Meu Portal
                </button>
              </div>

              <!-- Gerenciamento (Turnos & Siglas) -->
              <div class="py-1.5 bg-[#030a14] border-t border-[#10213b]">
                <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Gerenciamento</span>
                
                <button (click)="activeSubTab.set('ger.turnos'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'ger.turnos' ? 'text-blue-400 bg-blue-950/20 font-bold' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'ger.turnos' ? 'text-blue-400' : 'text-slate-400'">tune</span>
                  Turnos
                </button>

                <button (click)="activeSubTab.set('siglas'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'siglas' ? 'text-blue-400 bg-blue-950/20 font-bold' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'siglas' ? 'text-blue-400' : 'text-slate-400'">label</span>
                  Siglas
                </button>

                <button (click)="activeSubTab.set('team'); teamViewMode.set('mgmt'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'team' && teamViewMode() === 'mgmt' ? 'text-blue-400 bg-blue-950/20 font-bold' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'team' && teamViewMode() === 'mgmt' ? 'text-blue-400' : 'text-slate-400'">manage_accounts</span>
                  Ger. de Colaboradores
                </button>
              </div>

              <!-- Modo de Apresentação (Restringir Escalas) -->
              <div class="py-2.5 px-4 bg-[#091526] border-t border-[#10213b]" id="presentation_mode_dropdown_section">
                <span class="block text-[8px] font-black uppercase text-slate-500 tracking-wider mb-2 select-none">Apresentação</span>
                @if (onlyNightShift()) {
                  <div class="space-y-1.5" id="presentation_restricted_box">
                    <div class="text-[9px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <span class="material-icons text-[10px] animate-pulse">visibility_off</span> Foco Turno Noite
                    </div>
                    <p class="text-[8px] text-slate-400 leading-normal">Outras escalas ocultas por padrão.</p>
                    
                    <div class="flex items-center gap-1.5 mt-1" id="presentation_unlock_form">
                      <input type="password" #pinInput placeholder="PIN de Acesso" (keyup.enter)="unlockAllShifts(pinInput.value); pinInput.value=''"
                             class="bg-[#020813] border border-[#10213b] text-white text-[9px] px-2 py-1.5 rounded-md w-full outline-none focus:border-emerald-500 placeholder:text-slate-600 font-mono">
                      <button (click)="unlockAllShifts(pinInput.value); pinInput.value=''"
                              class="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-[9px] uppercase rounded-md cursor-pointer transition-colors border-none outline-none">
                        Ok
                      </button>
                    </div>
                  </div>
                } @else {
                  <div class="space-y-1.5" id="presentation_unlocked_box">
                    <div class="text-[9px] font-black text-amber-500 uppercase tracking-wider flex items-center gap-1">
                      <span class="material-icons text-[10px]">visibility</span> Todos Visíveis
                    </div>
                    <p class="text-[8px] text-slate-400 leading-normal font-sans">Todos os turnos de escalas estão liberados para exibição.</p>
                    <button (click)="lockToNightShift()"
                            class="w-full text-center py-1.5 bg-[#030a14] hover:bg-slate-800 text-amber-400 hover:text-white border border-[#10213b] font-black text-[9px] uppercase rounded-md cursor-pointer transition-colors outline-none">
                      Restringir à Noite
                    </button>
                  </div>
                }
              </div>

              <!-- Management Tools (Admin only) -->
              <div class="py-1.5 bg-[#071426] border-t border-[#10213b] rounded-b-lg hidden md:block">
                <button (click)="openDbConfigModal(); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-blue-400 hover:bg-blue-950/20 transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none">
                  <span class="material-icons text-blue-400 text-sm">storage</span>
                  Configurar Banco de Dados
                </button>
              </div>
            } @else {
              <!-- Menu de Navegação para Colaborador Comum (Mesmas opções do rodapé mobile, sem 'Portal do Colaborador') -->
              <div class="py-1.5 bg-[#030a14] border-t border-[#10213b]" id="dropdown_sections_category">
                <span class="block px-4 py-1 text-[8px] font-black uppercase text-slate-500 tracking-wider select-none">Navegação</span>
                
                <!-- INÍCIO / PORTAL -->
                <button (click)="activeSubTab.set('portal'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'portal' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'portal' ? 'text-emerald-400' : 'text-slate-400'">home</span>
                  Início
                </button>

                <!-- ESCALA -->
                <button (click)="activeSubTab.set('escala'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'escala' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'escala' ? 'text-emerald-400' : 'text-slate-400'">calendar_month</span>
                  Escala
                </button>

                <!-- PERFIL -->
                <button (click)="activeSubTab.set('perfil'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'perfil' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'perfil' ? 'text-emerald-400' : 'text-slate-400'">account_circle</span>
                  Perfil
                </button>

                <!-- EQUIPE -->
                <button (click)="activeSubTab.set('equipe'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="(activeSubTab() === 'equipe' || activeSubTab() === 'team') ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="(activeSubTab() === 'equipe' || activeSubTab() === 'team') ? 'text-emerald-400' : 'text-slate-400'">groups</span>
                  Equipe
                </button>

                <!-- INDICADORES -->
                <button (click)="activeSubTab.set('indicadores'); isDropdownOpen.set(false)"
                        class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                        [class]="activeSubTab() === 'indicadores' ? 'text-emerald-400 font-extrabold bg-[#0b1e36]/30' : 'text-slate-300 hover:bg-[#0b1e36]'">
                  <span class="material-icons text-sm" [class]="activeSubTab() === 'indicadores' ? 'text-emerald-400' : 'text-slate-400'">analytics</span>
                  Indicadores
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  </header>



  <!-- MAIN OPERATIONAL WORKSPACE -->
  <main class="flex-1 flex flex-col overflow-hidden p-0">

    <!-- PRIMARY WORKSPACE WORKSPACE (FULL WIDTH) -->
    <section class="w-full flex-1 flex flex-col overflow-hidden gap-0" id="primary_workspace_tabs">
      
      <!-- SUB-TAB 1: MATRIX GERAL WORKSPACE -->
      @if (activeSubTab() === 'matrix') {
        <div class="flex-1 flex flex-col w-full gap-0 overflow-hidden animate-fade-in" id="matrix_general_card">
          
          <!-- SEARCH & FILTER TOOLBAR -->
          <div id="matrix_search_toolbar" class="flex flex-col gap-2 border-b border-[#10213b] px-3 md:px-4 py-2.5"
               [class.bg-[#030a14]]="!isLightTheme()" [class.bg-white]="isLightTheme()">
            <!-- Main header row -->
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <!-- Month Controller & Title -->
              <div class="flex items-center gap-2 select-none">
                <!-- Previous month button -->
                <button (click)="prevMonth()"
                        class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#10213b] bg-[#030a14] hover:bg-[#0b1e36] text-slate-400 hover:text-white cursor-pointer transition-all border-none outline-none"
                        title="Mês Anterior">
                  <span class="material-icons text-sm">chevron_left</span>
                </button>

                <!-- Center Month Button with Calendar Icon -->
                <div class="relative">
                  <button (click)="toggleMonthPickerMenu($event)"
                          id="btn_month_picker_trigger"
                          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-[#071426] hover:bg-[#0b1e36] hover:border-emerald-500/40 text-white cursor-pointer transition-all border-none outline-none">
                    <span class="material-icons text-base select-none" [style.color]="isLightTheme() ? '#347660' : '#BAF5CE'">calendar_month</span>
                    <span id="txt_month_picker_label" class="font-black text-xs uppercase tracking-wider" [style.color]="isLightTheme() ? '#347660' : '#BAF5CE'" [style.background-color]="isLightTheme() ? '#ffffff' : 'transparent'">{{ currentMonthName() }} {{ currentYear() }}</span>
                    <span class="material-icons text-[10px] transition-transform duration-200" [class.rotate-180]="isMonthPickerOpen()" [style.color]="isLightTheme() ? '#347660' : '#BAF5CE'">expand_more</span>
                  </button>

                  <!-- Month Selection Grid Dropdown -->
                  @if (isMonthPickerOpen()) {
                    <div (click)="$event.stopPropagation()" class="absolute left-0 mt-2 w-64 rounded-xl bg-[#071426] border border-[#10213b] p-3 shadow-2xl z-50 animate-fade-in" id="month_picker_dropdown">
                      <div class="text-[9px] font-black uppercase text-slate-400 tracking-wider mb-2.5 px-1">Selecione o Mês da Escala ({{ currentYear() }})</div>
                      <div class="grid grid-cols-3 gap-1.5">
                        @for (m of monthsList; track m.name; let idx = $index) {
                          <button (click)="selectMonth(idx)"
                                  [class]="selectedMonthIndex() === idx ? 'bg-[#10b981] text-white border-emerald-400 font-black' : 'bg-[#030a14] text-slate-300 border-[#10213b] hover:bg-[#0b1e36] hover:text-white'"
                                  class="py-1.5 rounded-lg border text-[10px] font-bold text-center cursor-pointer transition-all uppercase select-none outline-none">
                            {{ m.shortName }}
                          </button>
                        }
                      </div>
                    </div>
                  }
                </div>

                <!-- Next month button -->
                <button (click)="nextMonth()"
                        class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#10213b] bg-[#030a14] hover:bg-[#0b1e36] text-slate-400 hover:text-white cursor-pointer transition-all border-none outline-none"
                        title="Próximo Mês">
                  <span class="material-icons text-sm">chevron_right</span>
                </button>
              </div>

              <!-- 3 Indicadores de Contagem de Colaboradores (Operadores, LTs, VIP) -->
              <div class="flex items-center gap-3 select-none transition-all">
                <!-- Operadores -->
                <div class="flex flex-col items-center justify-center min-w-[85px] px-3.5 py-2 rounded-[5px] border transition-all duration-300 hover:scale-[1.02]"
                     [style.background-color]="isLightTheme() ? '#ffffff' : '#071426'"
                     [style.border-color]="isLightTheme() ? '#cbd5e1' : '#10213b'"
                     [style.box-shadow]="isLightTheme() ? '0 1px 3px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.2)'">
                  <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1 leading-none text-center">Operadores</span>
                  <span class="font-mono text-lg font-black transition-all leading-none text-center"
                        [class.text-slate-800]="isLightTheme()"
                        [class.text-emerald-400]="!isLightTheme()">{{ filteredCounts().operadores }}</span>
                </div>

                <!-- LTs -->
                <div class="flex flex-col items-center justify-center min-w-[85px] px-3.5 py-2 rounded-[5px] border transition-all duration-300 hover:scale-[1.02]"
                     [style.background-color]="isLightTheme() ? '#ffffff' : '#071426'"
                     [style.border-color]="isLightTheme() ? '#cbd5e1' : '#10213b'"
                     [style.box-shadow]="isLightTheme() ? '0 1px 3px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.2)'">
                  <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1 leading-none text-center">Lideres-LT</span>
                  <span class="font-mono text-lg font-black transition-all leading-none text-center"
                        [class.text-amber-600]="isLightTheme()"
                        [class.text-amber-400]="!isLightTheme()">{{ filteredCounts().lts }}</span>
                </div>

                <!-- VIP -->
                <div class="flex flex-col items-center justify-center min-w-[85px] px-3.5 py-2 rounded-[5px] border transition-all duration-300 hover:scale-[1.02]"
                     [style.background-color]="isLightTheme() ? '#ffffff' : '#071426'"
                     [style.border-color]="isLightTheme() ? '#cbd5e1' : '#10213b'"
                     [style.box-shadow]="isLightTheme() ? '0 1px 3px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.2)'">
                  <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1 leading-none text-center">VIP</span>
                  <span class="font-mono text-lg font-black transition-all leading-none text-center"
                        [class.text-cyan-600]="isLightTheme()"
                        [class.text-cyan-400]="!isLightTheme()">{{ filteredCounts().vips }}</span>
                </div>
              </div>

              <!-- Sub-header Actions: Collapsible filters trigger and Options -->
              <div class="flex items-center gap-2.5">
                <!-- Search query input -->
                <div class="relative">
                  <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm select-none">search</span>
                  <input type="text"
                         [value]="collabSearchQuery()"
                         (input)="collabSearchQuery.set($any($event.target).value)"
                         placeholder="Buscar colaborador..."
                         class="bg-[#030a14] border border-[#10213b] text-white text-xs px-3 py-1.5 pl-8 pr-8 rounded-lg outline-none focus:border-emerald-500 placeholder:text-slate-600 font-semibold font-sans w-48">
                  @if (collabSearchQuery()) {
                    <button (click)="collabSearchQuery.set('')"
                            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400 transition-colors flex items-center justify-center cursor-pointer p-0.5 rounded-full hover:bg-red-500/10"
                            title="Limpar busca">
                      <span class="material-icons text-xs font-bold">close</span>
                    </button>
                  }
                </div>

                <!-- Collapsible Filters Toggle Button -->
                <button (click)="showFilters.set(!showFilters())"
                        [class]="showFilters() ? 'bg-[#10b981] text-white border-emerald-500/30' : (activeFiltersCount() > 0 ? 'bg-[#071426] text-amber-400 border-amber-500/20' : 'bg-[#030a14] text-slate-300 border-[#10213b] hover:bg-[#0b1e36] hover:text-white')"
                        class="px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer select-none transition-all outline-none">
                  <span class="material-icons text-sm">filter_alt</span>
                  <span>Filtros</span>
                  @if (activeFiltersCount() > 0) {
                    <span class="bg-amber-500 text-amber-950 font-black rounded-full px-1.5 py-0.2 text-[8px] ml-0.5">{{ activeFiltersCount() }}</span>
                  } @else {
                    <span class="material-icons text-[10px] transition-transform duration-200" [class.rotate-180]="showFilters()">expand_more</span>
                  }
                </button>

                <!-- Specific Section Options Dropdown Button -->
                <div class="relative inline-block text-left" id="matrix_options_container">
                  <button (click)="toggleMatrixOptionsMenu($event)"
                          class="bg-[#030a14] border border-[#10213b] text-slate-300 hover:text-white px-3 py-1.5 rounded-lg outline-none focus:border-emerald-500 hover:border-emerald-500 font-bold text-xs flex items-center gap-1.5 cursor-pointer select-none"
                          id="btn_matrix_options_dropdown">
                    <span class="material-icons text-sm text-slate-400">tune</span>
                    Opções de Escala
                    <span class="material-icons text-[10px] transition-transform duration-200" [class.rotate-180]="isMatrixOptionsOpen()">expand_more</span>
                  </button>

                  @if (isMatrixOptionsOpen()) {
                    <div (click)="$event.stopPropagation()" class="absolute right-0 mt-2 w-52 rounded-lg bg-[#071426] border border-[#10213b] shadow-2xl z-50 divide-y divide-[#10213b] animate-fade-in" id="matrix_options_dropdown_menu">
                      @if (canEdit()) {
                        <div class="py-1">
                          <!-- Editar em massa -->
                          <button (click)="togglePaintbrushPanel(); isMatrixOptionsOpen.set(false)"
                                  class="w-full text-left px-4 py-2 text-[10px] font-black uppercase transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent"
                                  [class]="showPaintbrushPanel() ? 'text-amber-500 hover:bg-emerald-950/40' : 'text-slate-300 hover:bg-[#0b1e36]'">
                            <span class="material-icons text-sm" [class]="showPaintbrushPanel() ? 'text-amber-400' : 'text-slate-400'">edit_calendar</span>
                            {{ showPaintbrushPanel() ? 'Fechar Edição em Massa' : 'Editar em Massa' }}
                          </button>
                          
                          <!-- Gerar Dobradinhas -->
                          <button (click)="scaleService.generateDobradinhas(); isMatrixOptionsOpen.set(false)"
                                  class="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-purple-400 hover:bg-[#0b1e36] transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent">
                            <span class="material-icons text-purple-400 text-sm">weekend</span>
                            Gerar Dobradinhas
                          </button>

                          <!-- Gerar Sábados -->
                          <button (click)="scaleService.generateSabados(); isMatrixOptionsOpen.set(false)"
                                  class="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-purple-400 hover:bg-[#0b1e36] transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent">
                            <span class="material-icons text-purple-400 text-sm">calendar_view_week</span>
                            Gerar Sábados
                          </button>

                          <!-- Gerar Domingos -->
                          <button (click)="scaleService.generateDomingos(); isMatrixOptionsOpen.set(false)"
                                  class="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-purple-400 hover:bg-[#0b1e36] transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent">
                            <span class="material-icons text-purple-400 text-sm">event</span>
                            Gerar Domingos
                          </button>

                          <!-- Importar -->
                          <button (click)="openImportModal(); isMatrixOptionsOpen.set(false)"
                                  class="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-emerald-400 hover:bg-emerald-950/20 transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent">
                            <span class="material-icons text-emerald-400 text-sm">document_scanner</span>
                            Importar
                          </button>
                        </div>

                      <!-- Resetar Escala -->
                      <div class="py-1">
                        <button (click)="scaleService.clearAllScales(); isMatrixOptionsOpen.set(false)"
                                class="w-full text-left px-4 py-2 text-[10px] font-black uppercase text-red-500 hover:bg-red-950/20 transition-colors tracking-wider flex items-center gap-2 cursor-pointer border-none outline-none bg-transparent">
                          <span class="material-icons text-red-400 text-sm">cleaning_services</span>
                          Resetar Escala
                        </button>
                      </div>
                    } @else {
                      <div class="p-4 text-center text-[10px] text-slate-500 italic">
                        Opções restritas para Administradores
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Collapsible Filters Tray -->
            @if (showFilters()) {
              <div class="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#10213b] animate-fade-in" id="collapsible_filters_tray">
                <!-- Role filter -->
                <select [value]="selectedFilterRole()"
                        (change)="selectedFilterRole.set($any($event.target).value)"
                        class="bg-[#030a14] border border-[#10213b] text-white text-xs pl-2 pr-5 py-2 rounded-lg outline-none focus:border-emerald-500 hover:border-emerald-500 font-bold cursor-pointer transition-colors w-[140px]">
                  <option value="TODOS">Função</option>
                  @for (role of availableRoles(); track role) {
                    <option [value]="role" [selected]="editingCollab()?.role?.trim() === role">{{ role }}</option>
                  }
                </select>

                <!-- Sector filter -->
                <select [value]="selectedFilterSector()"
                        (change)="selectedFilterSector.set($any($event.target).value)"
                        class="bg-[#030a14] border border-[#10213b] text-white text-xs pl-2 pr-5 py-2 rounded-lg outline-none focus:border-emerald-500 hover:border-emerald-500 font-bold cursor-pointer transition-colors w-[140px]">
                  <option value="TODOS">Setores</option>
                  @for (sector of availableSectors(); track sector) {
                    <option [value]="sector" [selected]="editingCollab()?.sector?.trim() === sector">{{ sector }}</option>
                  }
                </select>

                <!-- Shift filter -->
                <select [value]="selectedFilterShift()"
                        (change)="selectedFilterShift.set($any($event.target).value)"
                        class="bg-[#030a14] border border-[#10213b] text-white text-xs pl-2 pr-5 py-2 rounded-lg outline-none focus:border-emerald-500 hover:border-emerald-500 font-bold cursor-pointer transition-colors w-[140px]">
                  <option value="TODOS">Turnos</option>
                  @for (shift of availableShifts(); track shift.code) {
                    <option [value]="shift.code">{{ shift.label }}</option>
                  }
                </select>

                <!-- Clear filters button if any is active -->
                @if (activeFiltersCount() > 0) {
                  <button (click)="collabSearchQuery.set(''); selectedFilterRole.set('TODOS'); selectedFilterSector.set('TODOS'); selectedFilterShift.set('TODOS')"
                          class="px-2.5 py-2 text-[10px] font-black uppercase text-amber-500 hover:text-white transition-colors tracking-wider flex items-center gap-1 bg-[#1c1810]/40 hover:bg-[#2c2211]/60 border border-amber-500/20 rounded-lg cursor-pointer outline-none">
                    <span class="material-icons text-xs">filter_alt_off</span>
                    Limpar Filtros
                  </button>
                }
              </div>
            }
          </div>

          <!-- PAINTBRUSH MASS-EDIT PANEL (UX OPTIMIZED FOR LAPTOPS - ULTRA-THIN SINGLE ROW) -->
          @if (showPaintbrushPanel()) {
            <div class="mx-4 md:mx-6 my-2 p-2 bg-[#091524] border border-amber-500/20 rounded flex items-center justify-between gap-4 animate-fade-in select-none" id="paintbrush_laptop_optimized_panel">
              <!-- Left: Small indicator and instructions -->
              <div class="flex items-center gap-2 shrink-0">
                <span class="material-icons text-amber-500 text-xs animate-pulse">brush</span>
                <span class="text-[9px] font-black uppercase text-amber-500 tracking-wider">Modo Pintura:</span>
                <span class="text-[8px] text-slate-400 hidden xl:inline">Escolha uma sigla e clique nas células</span>
              </div>

              <!-- Center: Single continuous horizontal list of ALL codes side-by-side -->
              <div class="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar flex-1 justify-start">
                <!-- Shift types -->
                @for (shift of scaleService.shiftTypes(); track shift.code) {
                  <button (click)="selectPaintbrush(shift.code)"
                          class="px-2 py-1 rounded text-[9px] font-black cursor-pointer transition-all hover:scale-105 shrink-0 flex items-center gap-0.5 border transition-all"
                          [style.background-color]="getShiftOrSiglaColor(shift.code)"
                          [style.color]="getShiftOrSiglaTextColor(shift.code)"
                          [style.border-color]="isShiftOrSiglaTransparent(shift.code) ? getShiftOrSiglaBorderColor(shift.code) : (isLightTheme() ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')"
                          [style.border-width]="isShiftOrSiglaTransparent(shift.code) ? '1.5px' : '1px'"
                          [style.outline]="activePaintbrush() === shift.code ? '2px solid #ffffff' : 'none'"
                          [style.outline-offset]="activePaintbrush() === shift.code ? '1px' : '0px'"
                          [title]="shift.label + ' (' + shift.hours + ')'">
                    <span>{{ shift.code }}</span>
                  </button>
                }

                <!-- Separation bar -->
                <div class="h-4 w-[1px] bg-slate-700 shrink-0 mx-1"></div>

                <!-- Siglas/Afastamentos -->
                @for (sigla of scaleService.siglaTypes(); track sigla.code) {
                  <button (click)="selectPaintbrush(sigla.code)"
                          class="px-2 py-1 rounded text-[9px] font-black cursor-pointer transition-all hover:scale-105 shrink-0 border transition-all"
                          [style.background-color]="getShiftOrSiglaColor(sigla.code)"
                          [style.color]="getShiftOrSiglaTextColor(sigla.code)"
                          [style.border-color]="isShiftOrSiglaTransparent(sigla.code) ? getShiftOrSiglaBorderColor(sigla.code) : (isLightTheme() ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')"
                          [style.border-width]="isShiftOrSiglaTransparent(sigla.code) ? '1.5px' : '1px'"
                          [style.outline]="activePaintbrush() === sigla.code ? '2px solid #ffffff' : 'none'"
                          [style.outline-offset]="activePaintbrush() === sigla.code ? '1px' : '0px'"
                          [title]="sigla.label">
                    <span>{{ sigla.code }}</span>
                  </button>
                }

                <!-- Separation bar -->
                <div class="h-4 w-[1px] bg-slate-700 shrink-0 mx-1"></div>

                <!-- Botão de Apagar/Limpar (Vassourinha) -->
                <button (click)="selectPaintbrush('-')"
                        class="px-2 py-1 cursor-pointer transition-all hover:scale-105 shrink-0 flex items-center justify-center text-red-400 bg-transparent rounded border border-black/15 dark:border-white/15"
                        [style.outline]="activePaintbrush() === '-' ? '2px solid #ffffff' : 'none'"
                        [style.outline-offset]="activePaintbrush() === '-' ? '1px' : '0px'"
                        title="Limpar Célula (Define como '-')">
                  <span class="material-icons text-[11px] text-red-400">cleaning_services</span>
                </button>
              </div>

              <!-- Right: Clean Actions -->
              <div class="flex items-center gap-2 shrink-0">
                @if (activePaintbrush()) {
                  <div class="flex items-center gap-1.5 bg-[#0b1a30] border border-[#10213b] px-2 py-1 rounded">
                    <span class="text-[8px] font-bold text-slate-400 uppercase">Ativo:</span>
                    <span class="text-[9px] font-black px-1.5 py-0.5 rounded transition-colors border"
                          [style.background-color]="activePaintbrush() === '-' ? '#b91c1c' : getShiftOrSiglaColor(activePaintbrush() || '')"
                          [style.color]="activePaintbrush() === '-' ? '#ffffff' : getShiftOrSiglaTextColor(activePaintbrush() || '')"
                          [style.border-color]="isShiftOrSiglaTransparent(activePaintbrush() || '') ? getShiftOrSiglaBorderColor(activePaintbrush() || '') : 'transparent'"
                          [style.border-width]="isShiftOrSiglaTransparent(activePaintbrush() || '') ? '1.5px' : '0px'">
                      {{ activePaintbrush() === '-' ? 'LIMPAR' : activePaintbrush() }}
                    </span>
                  </div>
                }
                
                <button (click)="togglePaintbrushPanel()"
                        class="text-[8px] px-2 py-1 rounded font-black uppercase transition-all cursor-pointer border-none"
                        style="background-color: #bababa; color: #000000;">
                  Fechar
                </button>
              </div>
            </div>
          }


          <!-- MATRIX TABULAR GRID -->
          <div class="flex-1 overflow-auto w-full bg-[#020813] border-b border-[#10213b]" id="matrix_table_scroll_container" [class.bg-white]="isLightTheme()">
            <table class="w-full min-h-full text-left border-collapse select-none">
              <thead>
                <!-- Months & Header Days Row -->
                <tr class="border-b border-[#10213b] bg-[#071426] text-slate-400 text-[8px] font-black tracking-widest uppercase select-none sticky top-0 z-30">
                  <th class="py-2.5 px-3 w-[240px] min-w-[240px] max-w-[240px] md:w-[280px] md:min-w-[280px] md:max-w-[280px] sticky top-0 left-0 bg-[#071426] border-r border-[#10213b] z-40 shadow-md">
                    <div class="grid grid-cols-12 gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400 w-full items-center">
                      <span class="col-span-6 text-left">Colaborador</span>
                      <span class="col-span-3 text-center">Função</span>
                      <span class="col-span-3 text-center">Turno</span>
                    </div>
                  </th>
                  @for (day of daysInMonth(); track day) {
                    <th class="p-0 text-center w-[40px] min-w-[40px] max-w-[40px] h-[40px] border-r border-[#10213b] sticky top-0 z-30 day-header-cell transition-all"
                        [class.special-day]="isDaySpecial(day)"
                        [class.text-slate-200]="isDaySpecial(day)"
                        [class.bg-[#0d2e1f]]="isToday(day)"
                        [class.bg-[#071426]]="!isToday(day)"
                        [class.border-x-2]="isToday(day)"
                        [class.border-x-emerald-500]="isToday(day)">
                      <div class="flex flex-col items-center justify-center w-full h-full">
                        @if (isToday(day)) {
                          <span class="text-[7px] font-black uppercase tracking-wider text-emerald-400 leading-none mb-1">Hoje</span>
                        }
                        <span [class.text-emerald-400]="isToday(day)" [class.font-black]="isToday(day)">{{ day | number:'2.0-0' }}</span>
                        <span class="text-[7px] font-bold mt-0.5" 
                              [class.text-[#10b981]]="isDaySpecial(day)"
                              [class.special-label]="isDaySpecial(day)"
                              [class.text-emerald-400]="isToday(day)">{{ getDayOfWeekLabel(day) }}</span>
                      </div>
                    </th>
                  }
                  <th class="py-2 px-0.5 text-center w-12 min-w-[44px] sticky top-0 right-0 bg-[#071426] border-l border-[#10213b] z-40 shadow-md text-[8px]">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#10213b] font-mono text-[10px]">
                @if (filteredCollaborators().length === 0) {
                  <tr>
                    <td [attr.colspan]="daysInMonth().length + 2" class="py-10 text-center text-slate-500 italic">
                      Nenhum colaborador corresponde aos filtros selecionados.
                    </td>
                  </tr>
                  <!-- Spacer row for empty state to keep layout structure stretched -->
                  <tr class="h-full pointer-events-none select-none border-none">
                    <td [attr.colspan]="daysInMonth().length + 2" class="p-0 border-none bg-transparent"></td>
                  </tr>
                } @else {
                  @for (collab of filteredCollaborators(); track collab.id) {
                    <tr class="hover:bg-emerald-950/40 transition-colors" [class.bg-amber-950]="editingRowCollabId() === collab.id">
                      <!-- Collab details sticky col -->
                      <td class="py-1.5 px-3 sticky left-0 bg-[#030a14] border-r border-[#10213b] z-10 shadow-sm w-[240px] min-w-[240px] max-w-[240px] md:w-[280px] md:min-w-[280px] md:max-w-[280px]"
                          [class.border-t-2]="editingRowCollabId() === collab.id"
                          [class.border-b-2]="editingRowCollabId() === collab.id"
                          [class.border-l-2]="editingRowCollabId() === collab.id"
                          [class.border-amber-500]="editingRowCollabId() === collab.id">
                        <div class="grid grid-cols-12 gap-2 w-full items-center">
                          <!-- 1. COLABORADOR -->
                          <div class="col-span-6 flex items-center gap-2 min-w-0">
                            <div (click)="navigateToCollabPortal(collab.id)"
                                 class="relative shrink-0 cursor-pointer hover:opacity-80 transition-all"
                                 title="Ir para o Portal do Colaborador">
                              <img [src]="getCollabPhoto(collab)" 
                                   alt="Avatar"
                                   referrerpolicy="no-referrer"
                                   class="w-7 h-7 rounded-full object-cover border border-emerald-500/20 bg-slate-900 shadow-sm">
                            </div>
                            
                            <div class="flex flex-col min-w-0 text-left">
                              <span (click)="navigateToCollabPortal(collab.id)"
                                    class="font-sans font-extrabold text-white hover:text-emerald-400 hover:underline cursor-pointer truncate text-[11.5px] tracking-wide transition-all"
                                    title="Ir para o Portal do Colaborador">
                                {{ collab.name }}
                              </span>
                            </div>
                          </div>

                          <!-- 2. FUNÇÃO -->
                          <div class="col-span-3 text-center">
                            <span class="text-[8px] font-black tracking-wider uppercase inline-block font-sans text-center transition-all"
                                  [class]="getFunctionBadgeClass(collab)">
                              {{ getCollabFunction(collab) }}
                            </span>
                          </div>

                          <!-- 3. TURNO (with tooltip hover) -->
                          <div class="col-span-3 flex justify-center">
                            <div class="relative group cursor-pointer shrink-0 text-center min-w-[54px] font-mono text-[9px] font-black px-1.5 py-0.5 text-emerald-400 transition-all">
                              <span>{{ getShiftLabel(collab) }}</span>
                              <!-- Floating Tooltip Box -->
                              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#071426] border border-emerald-500/30 text-white text-[9px] font-black rounded px-2 py-1 shadow-2xl whitespace-nowrap z-50 pointer-events-none transition-all">
                                <div class="flex items-center gap-1">
                                  <span class="material-icons text-[10px] text-emerald-400">schedule</span>
                                  <span>Horário: {{ getCollabHours(collab) }}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          
                        </div>
                      </td>

                      <!-- Month Calendar cells -->
                      @for (day of daysInMonth(); track day) {
                        @let cellValRaw = editingRowCollabId() === collab.id ? (editingRowScaleDraft()[day] || '-') : (collab.scale[day] || '-');
                        @let cellVal = (cellValRaw === '-') ? getShiftCode(collab.shift) : cellValRaw;
                        @let events = getSpecialEventsForDay(collab, day);
                        <td class="p-0 text-center w-[40px] min-w-[40px] max-w-[40px] h-[40px] border-r border-[#10213b] relative cursor-pointer group-cell day-grid-cell transition-all"
                            [class.special-day]="isDaySpecial(day)"
                            [class.bg-emerald-500/10]="isToday(day)"
                            [class.border-x-2]="isToday(day)"
                            [class.border-x-emerald-500/40]="isToday(day)"
                            [class.border-t-2]="editingRowCollabId() === collab.id"
                            [class.border-b-2]="editingRowCollabId() === collab.id"
                            [class.border-t-amber-500]="editingRowCollabId() === collab.id"
                            [class.border-b-amber-500]="editingRowCollabId() === collab.id"
                            (click)="editingRowCollabId() === collab.id ? paintDraftCell(day) : (editingRowCollabId() !== null ? null : applyPaintbrush(collab.id, day))"
                            [ngClass]="{ 'bg-[#10b981]/5': isDaySpecial(day) && (cellValRaw === 'X' || cellValRaw === '-') && !isToday(day) }">
                          
                          <!-- Event tiny absolute top-right markers -->
                          @if (events.length > 0) {
                            <div class="absolute top-0.5 right-0.5 flex gap-0.5 z-20 pointer-events-auto">
                              @for (ev of events; track ev.tooltip) {
                                <span class="material-icons text-[8px] leading-none select-none cursor-help" 
                                      [style.color]="ev.color" 
                                      [title]="ev.tooltip">{{ ev.icon }}</span>
                              }
                            </div>
                          }

                          <!-- Render dynamic cell colors based on values (either draft or saved) -->
                          <div class="w-full h-full flex items-center justify-center font-bold text-[9px] transition-transform border"
                               [style.background-color]="getShiftOrSiglaColor(cellVal, day)"
                               [style.color]="getShiftOrSiglaTextColor(cellVal)"
                               [style.border-color]="isShiftOrSiglaTransparent(cellVal) ? getShiftOrSiglaBorderColor(cellVal) : (isLightTheme() ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')"
                               [style.border-width]="isShiftOrSiglaTransparent(cellVal) ? '1.5px' : '1px'">
                            @if (cellVal === 'X') {
                              <span class="material-icons text-[12px] font-black flex items-center justify-center select-none" 
                                    [style.color]="isLightTheme() ? '#059669' : '#10b981'" 
                                    style="font-weight: 900 !important;">close</span>
                            } @else {
                              {{ cellVal }}
                            }
                          </div>
                        </td>
                      }

                      <!-- Direct Row Actions Column sticky to right -->
                      <td class="py-1 px-0.5 sticky right-0 bg-[#030a14] border-l border-[#10213b] z-10 shadow-sm text-center w-12 min-w-[44px]"
                          [class.border-t-2]="editingRowCollabId() === collab.id"
                          [class.border-b-2]="editingRowCollabId() === collab.id"
                          [class.border-r-2]="editingRowCollabId() === collab.id"
                          [class.border-amber-500]="editingRowCollabId() === collab.id">
                        @if (editingRowCollabId() === collab.id) {
                          <div class="flex items-center justify-center gap-1">
                            <!-- SAVE BUTTON -->
                            <button (click)="saveRowScale(collab)" 
                                    class="w-4 h-4 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center cursor-pointer transition-colors"
                                    title="Salvar alterações desta linha">
                              <span class="material-icons text-[8px]">check</span>
                            </button>
                            <!-- CANCEL BUTTON -->
                            <button (click)="cancelRowScale()" 
                                    class="w-4 h-4 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 flex items-center justify-center cursor-pointer transition-colors"
                                    title="Descartar alterações">
                              <span class="material-icons text-[8px]">close</span>
                            </button>
                          </div>
                        } @else {
                          <div class="flex items-center justify-center">
                            <!-- EDIT BUTTON -->
                            <button (click)="startRowScaleEdit(collab)" 
                                    [disabled]="!canEdit()"
                                    [class.opacity-40]="!canEdit()"
                                    class="w-4 h-4 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 flex items-center justify-center cursor-pointer transition-colors"
                                    title="Editar escala desta linha">
                              <span class="material-icons text-[8px]">edit</span>
                            </button>
                          </div>
                        }
                      </td>
                    </tr>
                  }

                  <!-- Spacer row to absorb extra vertical space and push summary row to the bottom -->
                  <tr class="h-full pointer-events-none select-none border-none">
                    <td [attr.colspan]="daysInMonth().length + 2" class="p-0 border-none bg-transparent"></td>
                  </tr>

                  <!-- SUMMARY RESUME ROW: EFETIVO DO DIA -->
                  <tr class="transition-colors font-mono font-black select-none sticky bottom-0 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.3)]"
                      [class.bg-[#051122]]="!isLightTheme()"
                      [class.bg-emerald-50/60]="isLightTheme()"
                      id="matrix_summary_row">
                    <!-- Column 1: Header / Title -->
                    <td class="py-2.5 px-3 sticky left-0 bottom-0 z-40 shadow-md w-[240px] min-w-[240px] max-w-[240px] md:w-[280px] md:min-w-[280px] md:max-w-[280px]"
                        [class.bg-[#07172e]]="!isLightTheme()"
                        [class.border-r]="true"
                        [class.border-[#10213b]]="!isLightTheme()"
                        [class.border-t-2]="true"
                        [class.border-[#10b981]/40]="!isLightTheme()"
                        [class.bg-emerald-100/70]="isLightTheme()"
                        [class.border-slate-200]="isLightTheme()"
                        [class.border-t-emerald-500]="isLightTheme()">
                      <div class="flex items-center justify-between"
                           [class.text-slate-200]="!isLightTheme()"
                           [class.text-emerald-900]="isLightTheme()">
                        <span class="font-black text-[9px] uppercase tracking-wider flex items-center gap-1.5"
                              [class.text-[#10b981]]="!isLightTheme()"
                              [class.text-emerald-700]="isLightTheme()">
                          <span class="material-icons text-[11px] font-black"
                                [class.text-[#10b981]]="!isLightTheme()"
                                [class.text-emerald-700]="isLightTheme()">group</span>
                          Efetivo do Dia
                        </span>
                        <span class="text-[8px] font-bold"
                              [class.text-slate-400]="!isLightTheme()"
                              [class.text-emerald-600]="isLightTheme()">OPERADORES</span>
                      </div>
                    </td>
                    
                    <!-- Month Calendar Cells with Daily Working Counts -->
                    @for (day of daysInMonth(); track day) {
                      @let currentCount = dailyWorkingCounts()[day] || 0;
                      <td class="p-0 text-center w-[40px] min-w-[40px] max-w-[40px] h-[40px] sticky bottom-0 z-30 border-r"
                          [class.border-[#10213b]]="!isLightTheme() && !isToday(day)"
                          [class.border-t-2]="true"
                          [class.border-[#10b981]/40]="!isLightTheme()"
                          [class.bg-[#051122]]="!isLightTheme() && !isToday(day)"
                          [class.bg-emerald-50/60]="isLightTheme() && !isToday(day)"
                          [class.border-slate-100]="isLightTheme() && !isToday(day)"
                          [class.border-t-emerald-300]="isLightTheme()"
                          [class.text-[#10b981]]="!isLightTheme() && currentCount > 0 && !isToday(day)"
                          [class.text-emerald-600]="isLightTheme() && currentCount > 0 && !isToday(day)"
                          [class.text-slate-500]="!isLightTheme() && currentCount === 0 && !isToday(day)"
                          [class.text-slate-300]="isLightTheme() && currentCount === 0 && !isToday(day)"
                          [class.bg-[#0a2f1d]]="isToday(day) && !isLightTheme()"
                          [class.bg-emerald-100]="isToday(day) && isLightTheme()"
                          [class.text-emerald-400]="isToday(day) && !isLightTheme()"
                          [class.text-emerald-800]="isToday(day) && isLightTheme()"
                          [class.border-x-2]="isToday(day)"
                          [class.border-x-emerald-500]="isToday(day)"
                          [title]="'Dia ' + day + ': ' + currentCount + ' colaboradores efetivos (T / horários)'">
                        <div class="w-full h-full flex items-center justify-center text-[10px] font-black">
                          {{ currentCount }}
                        </div>
                      </td>
                    }
                    
                    <!-- Column Sticky Right: Actions placeholder -->
                    <td class="py-1 px-0.5 sticky right-0 bottom-0 z-40 shadow-md text-center w-12 min-w-[44px]"
                        [class.bg-[#07172e]]="!isLightTheme()"
                        [class.border-l]="true"
                        [class.border-[#10213b]]="!isLightTheme()"
                        [class.border-t-2]="true"
                        [class.border-[#10b981]/40]="!isLightTheme()"
                        [class.bg-emerald-100/70]="isLightTheme()"
                        [class.border-slate-200]="isLightTheme()"
                        [class.border-t-emerald-500]="isLightTheme()">
                      <span class="material-icons text-[11px] font-black"
                            [class.text-[#10b981]]="!isLightTheme()"
                            [class.text-emerald-700]="isLightTheme()">done_all</span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
      <!-- SUB-TAB 2: GERENCIAMENTO DE TURNOS OPERACIONAIS -->
      @if (activeSubTab() === 'ger.turnos') {
        <div class="flex flex-col h-full overflow-hidden animate-fade-in font-sans w-full flex-1" id="shifts_tab_content">
          <!-- FIXED HEADER -->
          <div class="px-3 md:px-4 py-2 border-b border-[#10213b] flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0" style="height: 44px; background-color: #10B981; color: #ffffff;">
            <div>
              <h3 class="font-black text-sm uppercase tracking-tight text-white flex items-center gap-1.5">
                <span class="material-icons text-white">tune</span>
                Painel de Gerenciamento de Turnos
              </h3>
            </div>
            <div class="flex items-center gap-2 text-xs bg-blue-500/10 border border-blue-500/25 px-3 py-1.5 rounded-lg font-mono font-bold" style="color: #ffffff;">
              <span class="material-icons text-xs" style="color: #ffffff;">info</span>
              <span style="color: #ffffff;">Total de Turnos: {{ scaleService.shiftTypes().length }}</span>
            </div>
          </div>

          <!-- FIXED BODY WRAPPER -->
          <div class="flex-1 min-h-0 flex flex-col overflow-hidden p-2 md:p-3 space-y-3 relative">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0 items-stretch">
              <!-- SHIFTS TABLE LIST (Span 2) -->
              <div class="lg:col-span-2 flex flex-col h-full min-h-0 space-y-3">
                <div class="border border-[#10213b] rounded-lg overflow-hidden bg-[#030a14] flex flex-col flex-1 min-h-0">
                  <div class="bg-[#071426] px-4 py-3 border-b border-[#10213b] flex items-center justify-between shrink-0">
                    <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <span class="material-icons text-xs text-blue-500">list</span>
                      Dicionário de Turnos Cadastrados
                    </span>
                    <span class="text-[9px] text-slate-500 font-bold uppercase">* Clique no ícone de edição para alterar</span>
                  </div>
                  <div class="overflow-y-auto scrollbar-thin flex-1">
                    <table class="w-full text-left border-collapse select-none">
                      <thead class="sticky top-0 z-10 shadow-sm">
                        <tr class="border-b border-[#10213b] bg-[#071426] text-slate-400 uppercase text-[9px] font-black tracking-wider">
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b]" style="background-color: #d8fff8; color: #071426;">Sigla / Código</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b]" style="background-color: #d8fff8; color: #071426;">Identificação</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b] text-center" style="background-color: #d8fff8; color: #071426;">Entrada / Saída</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b] text-center" style="background-color: #d8fff8; color: #071426;">Carga Diária</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b] text-center" style="background-color: #d8fff8; color: #071426;">Estatísticas</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b] text-center" style="background-color: #d8fff8; color: #071426;">Ações</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-[#10213b] text-xs">
                        @for (shift of scaleService.shiftTypes(); track shift.code) {
                          <tr class="hover:bg-emerald-950/40 transition-colors">
                            <td class="py-3 px-4 font-mono">
                              <span class="inline-flex items-center justify-center w-11 py-1 rounded font-black text-xs shadow-md border"
                                    [style.background-color]="getShiftOrSiglaColor(shift.code)"
                                    [style.color]="getShiftOrSiglaTextColor(shift.code)"
                                    [style.border-color]="isShiftOrSiglaTransparent(shift.code) ? getShiftOrSiglaBorderColor(shift.code) : (isLightTheme() ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')"
                                    [style.border-width]="isShiftOrSiglaTransparent(shift.code) ? '1.5px' : '1px'">
                                {{ shift.code }}
                              </span>
                            </td>
                            <td class="py-3 px-4">
                              <div class="flex flex-col">
                                <span class="text-white font-bold text-xs">{{ shift.label }}</span>
                                <span class="text-[9px] text-slate-500 mt-0.5">Base regulatória de escala VIBRA</span>
                              </div>
                            </td>
                            <td class="py-3 px-4 text-center">
                              @if (shift.startTime && shift.endTime) {
                                <span class="inline-flex items-center gap-1 font-mono font-bold px-2 py-1 rounded border text-[11px] transition-all"
                                      [style.background-color]="isLightTheme() ? '#F1F5F9' : '#0b1e36'"
                                      [style.border-color]="isLightTheme() ? '#cbd5e1' : '#1d3557'"
                                      [class.text-blue-800]="isLightTheme()"
                                      [class.text-blue-300]="!isLightTheme()">
                                  <span class="material-icons text-[10px]" [class.text-blue-600]="isLightTheme()" [class.text-blue-400]="!isLightTheme()">schedule</span>
                                  {{ shift.startTime }} ➔ {{ shift.endTime }}
                                </span>
                              } @else {
                                <span class="text-slate-500 font-mono italic text-[10px]">Não definido</span>
                              }
                            </td>
                            <td class="py-3 px-4 text-center font-mono font-black text-slate-300">
                              <span class="px-2 py-0.5 rounded border transition-all"
                                    [style.background-color]="isLightTheme() ? '#F1F5F9' : '#0f172a'"
                                    [style.border-color]="isLightTheme() ? '#cbd5e1' : '#1e293b'"
                                    [class.text-slate-800]="isLightTheme()"
                                    [class.text-slate-300]="!isLightTheme()">
                                {{ shift.hours }}
                              </span>
                            </td>
                            
                            <!-- Real-time Shift Allocation Stats -->
                            <td class="py-3 px-4">
                              <div class="flex flex-col gap-1 items-center justify-center">
                                <span class="px-2 py-0.5 rounded text-[9px] font-black font-sans uppercase inline-flex items-center gap-1 border transition-all"
                                      [style.background-color]="isLightTheme() ? '#F1F5F9' : 'rgba(5, 46, 22, 0.4)'"
                                      [style.border-color]="isLightTheme() ? '#cbd5e1' : 'rgba(16, 185, 129, 0.2)'"
                                      [class.text-emerald-700]="isLightTheme()"
                                      [class.text-emerald-400]="!isLightTheme()"
                                      title="Colaboradores que pertencem a este turno como padrão">
                                  <span class="material-icons text-[10px]">people</span>
                                  {{ getCollaboratorCountForShift(shift.code) }} ativo(s)
                                </span>
                                <span class="text-[8px] text-slate-500 font-mono font-bold" title="Total de ocorrências programadas neste código na escala de {{ currentMonthName() }}">
                                  Escalas: {{ getScheduledDaysCountForShift(shift.code) }} dias
                                </span>
                              </div>
                            </td>
   
                            <!-- Actions: Edit & Delete -->
                            <td class="py-3 px-4 text-center">
                              <div class="flex items-center justify-center gap-2">
                                <button (click)="startEditingShift(shift)"
                                        class="p-1.5 text-blue-400 hover:text-white hover:bg-blue-950/40 rounded transition-all cursor-pointer border-none outline-none"
                                        title="Editar Turno">
                                  <span class="material-icons text-sm">edit</span>
                                </button>
                                
                                <button (click)="removeShiftType(shift.code)"
                                        class="p-1.5 text-red-500 hover:text-white hover:bg-red-950/40 rounded transition-all cursor-pointer border-none outline-none"
                                        title="Excluir Turno">
                                  <span class="material-icons text-sm">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
   
                <!-- Quick Explanation Note -->
                <div class="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 flex gap-3 shrink-0">
                  <span class="material-icons text-blue-400">psychology</span>
                  <div class="text-[10px] text-slate-400 leading-relaxed">
                    <span class="text-white font-bold block mb-0.5">Automação de Alocação de Pista:</span>
                    Quando você cria ou edita um turno, ele se torna imediatamente elegível para alocação de equipe. Se você mover um colaborador de turno, o sistema recalculará sua escala de {{ currentMonthName() }} {{ currentYear() }}, convertendo suas antigas jornadas para o novo turno em lote.
                  </div>
                </div>
              </div>
   
              <!-- RIGHT COLUMN: SHIFT FORM -->
              <div class="space-y-6 overflow-y-auto scrollbar-thin h-full pr-1 shrink-0">
                <!-- SHIFT CREATION / EDITING CARD -->
                <div class="bg-[#030a14] border border-[#10213b] rounded-lg p-5 shadow-xl">
                  <div class="flex items-center justify-between pb-2 border-b border-[#10213b] mb-4">
                    <h4 class="font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span class="material-icons text-blue-500 text-sm">
                        {{ editingShiftCode() ? 'edit_note' : 'library_add' }}
                      </span>
                      {{ editingShiftCode() ? 'Editor de Siglas de Turno' : 'Criar Novo Turno' }}
                    </h4>
                    @if (editingShiftCode()) {
                      <span class="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/25 px-1.5 py-0.5 rounded font-mono font-black uppercase">
                        Modo Edição
                      </span>
                    }
                  </div>

                  <div class="space-y-4 text-xs">
                    <!-- Code & Label Row -->
                    <div class="flex gap-4">
                      <!-- Code (40%) -->
                      <div class="flex flex-col gap-1 w-[40%] shrink-0">
                        <label for="shift_code_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Código / Sigla</label>
                        <input id="shift_code_input"
                               type="text"
                               [value]="newShiftCode()"
                               (input)="newShiftCode.set($any($event.target).value)"
                               [disabled]="editingShiftCode() !== null"
                               placeholder="Ex: M"
                               style="height: 25px;"
                               class="bg-[#071426] border border-[#10213b] rounded px-3 py-0.5 text-white outline-none focus:border-blue-500 font-mono font-bold uppercase w-full disabled:opacity-50">
                      </div>

                      <!-- Label (60%) -->
                      <div class="flex flex-col gap-1 flex-1">
                        <label for="shift_label_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Identificação / Nome</label>
                        <input id="shift_label_input"
                               type="text"
                               [value]="newShiftLabel()"
                               (input)="newShiftLabel.set($any($event.target).value)"
                               placeholder="Ex: Turno Manhã"
                               style="height: 25px;"
                               class="bg-[#071426] border border-[#10213b] rounded px-3 py-0.5 text-white outline-none focus:border-blue-500 font-bold w-full">
                      </div>
                    </div>

                    <!-- Horários Row -->
                    <div class="grid grid-cols-2 gap-3">
                      <!-- Bloco de Entrada -->
                      <div class="flex flex-col gap-1">
                        <label class="font-black text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          <span class="material-icons text-[10px] text-emerald-400">login</span>
                          Horário Entrada
                        </label>
                        <div class="flex items-center bg-[#071426] border border-[#10213b] rounded px-2 py-0.5 focus-within:border-blue-500 transition-all" style="height: 25px;">
                          <!-- Hour select -->
                          <select [value]="startHour()"
                                  (change)="startHour.set($any($event.target).value)"
                                  class="w-1/2 bg-transparent text-white text-center font-bold font-mono outline-none border-none cursor-pointer appearance-none text-xs">
                            @for (h of hoursList; track h) {
                              <option [value]="h" class="bg-[#071426] text-white">{{ h }}h</option>
                            }
                          </select>
                          <span class="text-slate-500 font-bold font-mono select-none px-1">:</span>
                          <!-- Minute select -->
                          <select [value]="startMinute()"
                                  (change)="startMinute.set($any($event.target).value)"
                                  class="w-1/2 bg-transparent text-white text-center font-bold font-mono outline-none border-none cursor-pointer appearance-none text-xs">
                            @for (m of minutesList; track m) {
                              <option [value]="m" class="bg-[#071426] text-white">{{ m }}m</option>
                            }
                          </select>
                        </div>
                      </div>

                      <!-- Bloco de Saída -->
                      <div class="flex flex-col gap-1">
                        <label class="font-black text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          <span class="material-icons text-[10px] text-red-400">logout</span>
                          Horário Saída
                        </label>
                        <div class="flex items-center bg-[#071426] border border-[#10213b] rounded px-2 py-0.5 focus-within:border-blue-500 transition-all" style="height: 25px;">
                          <!-- Hour select -->
                          <select [value]="endHour()"
                                  (change)="endHour.set($any($event.target).value)"
                                  class="w-1/2 bg-transparent text-white text-center font-bold font-mono outline-none border-none cursor-pointer appearance-none text-xs">
                            @for (h of hoursList; track h) {
                              <option [value]="h" class="bg-[#071426] text-white">{{ h }}h</option>
                            }
                          </select>
                          <span class="text-slate-500 font-bold font-mono select-none px-1">:</span>
                          <!-- Minute select -->
                          <select [value]="endMinute()"
                                  (change)="endMinute.set($any($event.target).value)"
                                  class="w-1/2 bg-transparent text-white text-center font-bold font-mono outline-none border-none cursor-pointer appearance-none text-xs">
                            @for (m of minutesList; track m) {
                              <option [value]="m" class="bg-[#071426] text-white">{{ m }}m</option>
                            }
                          </select>
                        </div>
                      </div>
                    </div>

                    <!-- Calculated Hours row -->
                    <div class="flex flex-col gap-1">
                      <label class="font-black text-[9px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <span class="material-icons text-[10px] text-blue-400">schedule</span>
                        Carga Calculada
                      </label>
                      <div class="rounded px-3 py-1 font-mono font-black text-center text-xs shadow-inner flex items-center justify-center gap-1 transition-all"
                           [style.background-color]="isLightTheme() ? '#ffffff' : '#0c1e35'"
                           [style.border]="isLightTheme() ? '1px solid #cbd5e1' : '1px solid #1a3458'"
                           [class.text-slate-800]="isLightTheme()"
                           [class.text-blue-300]="!isLightTheme()"
                           style="height: 25px;">
                        <span class="material-icons text-[10px]" [class.text-blue-600]="isLightTheme()" [class.text-blue-400]="!isLightTheme()">timelapse</span>
                        <span>{{ calculatedShiftHours() }}</span>
                      </div>
                    </div>

                    <!-- Division of Theme Tabs -->
                    <div class="flex border-b border-[#10213b] mb-4 gap-1 select-none">
                      <button type="button" 
                              (click)="activeShiftThemeTab.set('light')"
                              class="flex-1 py-1.5 px-3 text-center text-[10px] font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer outline-none flex items-center justify-center gap-1.5"
                              [class.border-emerald-500]="activeShiftThemeTab() === 'light'"
                              [class.text-emerald-400]="activeShiftThemeTab() === 'light'"
                              [class.border-transparent]="activeShiftThemeTab() !== 'light'"
                              [class.text-slate-400]="activeShiftThemeTab() !== 'light'"
                              [class.hover:text-white]="activeShiftThemeTab() !== 'light'">
                        <span class="material-icons text-xs">light_mode</span>
                        Tema Claro
                      </button>
                      <button type="button" 
                              (click)="activeShiftThemeTab.set('dark')"
                              class="flex-1 py-1.5 px-3 text-center text-[10px] font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer outline-none flex items-center justify-center gap-1.5"
                              [class.border-emerald-500]="activeShiftThemeTab() === 'dark'"
                              [class.text-emerald-400]="activeShiftThemeTab() === 'dark'"
                              [class.border-transparent]="activeShiftThemeTab() !== 'dark'"
                              [class.text-slate-400]="activeShiftThemeTab() !== 'dark'"
                              [class.hover:text-white]="activeShiftThemeTab() !== 'dark'">
                        <span class="material-icons text-xs">dark_mode</span>
                        Tema Escuro
                      </button>
                    </div>

                    <!-- TAB CONTENTS: LIGHT THEME -->
                    @if (activeShiftThemeTab() === 'light') {
                      <div class="space-y-4 animate-fade-in">
                        <!-- Fundo Transparente Toggle (Light) -->
                        <div class="flex items-center gap-3 bg-[#071426] px-3 rounded border border-[#10213b]" style="height: 45px;">
                          <input id="shift_transparent_bg_input"
                                 type="checkbox"
                                 [checked]="newShiftTransparentBg()"
                                 (change)="newShiftTransparentBg.set($any($event.target).checked)"
                                 class="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-[#030a14] border-[#10213b] cursor-pointer">
                          <div class="flex flex-col">
                            <label for="shift_transparent_bg_input" class="font-black text-[10px] uppercase tracking-wider text-white cursor-pointer select-none">
                              Fundo Transparente (Claro)
                            </label>
                            <span class="text-[8px] text-slate-400 leading-tight">
                              Se ativado, exibe fundo transparente com borda e fonte coloridas no tema claro.
                            </span>
                          </div>
                        </div>

                        <!-- Color pickers (Light) -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="flex flex-col gap-1">
                            <label for="shift_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fundo (Claro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="shift_color_input"
                                     type="color"
                                     [value]="newShiftColor()"
                                     (input)="newShiftColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newShiftColor() }}</span>
                            </div>
                          </div>
                          
                          <div class="flex flex-col gap-1">
                            <label for="shift_text_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fonte (Claro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="shift_text_color_input"
                                     type="color"
                                     [value]="newShiftTextColor()"
                                     (input)="newShiftTextColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newShiftTextColor() }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- TAB CONTENTS: DARK THEME -->
                    @if (activeShiftThemeTab() === 'dark') {
                      <div class="space-y-4 animate-fade-in">
                        <!-- Fundo Transparente Toggle (Dark) -->
                        <div class="flex items-center gap-3 bg-[#071426] px-3 rounded border border-[#10213b]" style="height: 45px;">
                          <input id="shift_dark_transparent_bg_input"
                                 type="checkbox"
                                 [checked]="newShiftDarkTransparentBg()"
                                 (change)="newShiftDarkTransparentBg.set($any($event.target).checked)"
                                 class="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-[#030a14] border-[#10213b] cursor-pointer">
                          <div class="flex flex-col">
                            <label for="shift_dark_transparent_bg_input" class="font-black text-[10px] uppercase tracking-wider text-white cursor-pointer select-none">
                              Fundo Transparente (Escuro)
                            </label>
                            <span class="text-[8px] text-slate-400 leading-tight">
                              Se ativado, exibe fundo transparente com borda e fonte coloridas no tema escuro.
                            </span>
                          </div>
                        </div>

                        <!-- Color pickers (Dark) -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="flex flex-col gap-1">
                            <label for="shift_dark_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fundo (Escuro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="shift_dark_color_input"
                                     type="color"
                                     [value]="newShiftDarkColor()"
                                     (input)="newShiftDarkColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newShiftDarkColor() }}</span>
                            </div>
                          </div>
                          
                          <div class="flex flex-col gap-1">
                            <label for="shift_dark_text_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fonte (Escuro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="shift_dark_text_color_input"
                                     type="color"
                                     [value]="newShiftDarkTextColor()"
                                     (input)="newShiftDarkTextColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newShiftDarkTextColor() }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- REAL-TIME PARITY PREVIEW -->
                    <div class="bg-[#071426] border border-[#10213b] rounded-lg p-3 flex flex-col gap-3 min-h-[140px]">
                      <div class="flex flex-col gap-0.5 pb-2 border-b border-[#10213b]/50">
                        <span class="font-black text-[9px] uppercase tracking-wider text-slate-300 flex items-center gap-1">
                          <span class="material-icons text-[10px] text-emerald-400">visibility</span>
                          Visualização em Tempo Real (Paridade de Temas)
                        </span>
                        <span class="text-[8px] text-slate-400 font-medium">Veja o comportamento da sigla do turno em ambos os ambientes</span>
                      </div>
                      
                      <div class="grid grid-cols-2 gap-3">
                        <!-- LIGHT THEME PREVIEW COLUMN -->
                        <div class="bg-[#0c192d] p-2 rounded border border-[#10213b] flex flex-col items-center gap-2">
                          <span class="text-[7px] text-emerald-400 font-black uppercase tracking-wider flex items-center gap-0.5">
                            <span class="material-icons text-[8px]">light_mode</span> Tema Claro
                          </span>
                          <!-- Preview Badge -->
                          <div class="w-8 h-8 rounded flex items-center justify-center font-bold font-mono text-[11px] shadow border"
                               [style.backgroundColor]="newShiftTransparentBg() ? 'transparent' : newShiftColor()"
                               [style.borderColor]="newShiftColor()"
                               [style.color]="newShiftTransparentBg() ? (newShiftTextColor() || newShiftColor()) : newShiftTextColor()">
                            {{ (newShiftCode() || '?').substring(0, 3).toUpperCase() }}
                          </div>
                          <!-- Full panel preview -->
                          <div class="px-2 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold border"
                               [style.backgroundColor]="newShiftTransparentBg() ? 'transparent' : newShiftColor() + '15'"
                               [style.borderColor]="newShiftColor() + '30'"
                               [style.color]="newShiftTransparentBg() ? (newShiftTextColor() || newShiftColor()) : newShiftTextColor()">
                            <span class="w-4 h-4 rounded flex items-center justify-center font-bold font-mono text-[8px] border"
                                  [style.backgroundColor]="newShiftTransparentBg() ? 'transparent' : newShiftColor()"
                                  [style.borderColor]="newShiftColor()"
                                  [style.color]="newShiftTransparentBg() ? (newShiftTextColor() || newShiftColor()) : newShiftTextColor()">
                              {{ (newShiftCode() || '?').substring(0, 3).toUpperCase() }}
                            </span>
                            <span class="max-w-[50px] truncate text-slate-200 text-[8px]">{{ newShiftLabel() || 'Turno' }}</span>
                          </div>
                        </div>

                        <!-- DARK THEME PREVIEW COLUMN -->
                        <div class="bg-[#050d18] p-2 rounded border border-[#10213b] flex flex-col items-center gap-2">
                          <span class="text-[7px] text-purple-400 font-black uppercase tracking-wider flex items-center gap-0.5">
                            <span class="material-icons text-[8px]">dark_mode</span> Tema Escuro
                          </span>
                          <!-- Preview Badge -->
                          <div class="w-8 h-8 rounded flex items-center justify-center font-bold font-mono text-[11px] shadow border"
                               [style.backgroundColor]="newShiftDarkTransparentBg() ? 'transparent' : newShiftDarkColor()"
                               [style.borderColor]="newShiftDarkColor()"
                               [style.color]="newShiftDarkTransparentBg() ? (newShiftDarkTextColor() || newShiftDarkColor()) : newShiftDarkTextColor()">
                            {{ (newShiftCode() || '?').substring(0, 3).toUpperCase() }}
                          </div>
                          <!-- Full panel preview -->
                          <div class="px-2 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold border"
                               [style.backgroundColor]="newShiftDarkTransparentBg() ? 'transparent' : newShiftDarkColor() + '15'"
                               [style.borderColor]="newShiftDarkColor() + '30'"
                               [style.color]="newShiftDarkTransparentBg() ? (newShiftDarkTextColor() || newShiftDarkColor()) : newShiftDarkTextColor()">
                            <span class="w-4 h-4 rounded flex items-center justify-center font-bold font-mono text-[8px] border"
                                  [style.backgroundColor]="newShiftDarkTransparentBg() ? 'transparent' : newShiftDarkColor()"
                                  [style.borderColor]="newShiftDarkColor()"
                                  [style.color]="newShiftDarkTransparentBg() ? (newShiftDarkTextColor() || newShiftDarkColor()) : newShiftDarkTextColor()">
                              {{ (newShiftCode() || '?').substring(0, 3).toUpperCase() }}
                            </span>
                            <span class="max-w-[50px] truncate text-slate-400 text-[8px]">{{ newShiftLabel() || 'Turno' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2" style="padding-top: 0px;">
                      <button (click)="saveShiftType()"
                              class="flex-1 bg-[#10b981] hover:bg-emerald-600 text-white font-black py-2.5 rounded uppercase tracking-wider transition-all cursor-pointer border-none shadow-md outline-none">
                        {{ editingShiftCode() ? 'Salvar Alterações' : 'Criar Turno' }}
                      </button>
                      
                      @if (editingShiftCode()) {
                        <button (click)="cancelEditingShift()"
                                class="px-4 rounded uppercase tracking-wider transition-all cursor-pointer border text-xs outline-none font-black"
                                [class.bg-slate-100]="isLightTheme()"
                                [class.text-slate-800]="isLightTheme()"
                                [class.border-slate-300]="isLightTheme()"
                                [class.hover:bg-slate-200]="isLightTheme()"
                                [class.bg-slate-800]="!isLightTheme()"
                                [class.text-slate-200]="!isLightTheme()"
                                [class.border-slate-700]="!isLightTheme()"
                                [class.hover:bg-slate-700]="!isLightTheme()">
                          Cancelar
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- SUB-TAB: GERENCIAMENTO DE SIGLAS -->
      @if (activeSubTab() === 'siglas') {
        <div class="flex flex-col h-full overflow-hidden animate-fade-in font-sans w-full flex-1" id="siglas_tab_content">
          <!-- FIXED HEADER -->
          <div class="px-3 md:px-4 py-2 border-b border-[#10213b] flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0" style="height: 44px; background-color: #10B981; color: #ffffff;">
            <div>
              <h3 class="font-black text-sm uppercase tracking-tight text-white flex items-center gap-1.5">
                <span class="material-icons text-blue-400" style="color: #ffffff;">label</span>
                Gerenciamento de Siglas da Escala
              </h3>
            </div>
            <div class="flex items-center gap-2 text-xs bg-blue-500/10 border border-blue-500/25 px-3 py-1.5 rounded-lg font-mono font-bold" style="color: #ffffff;">
              <span class="material-icons text-xs" style="color: #ffffff;">info</span>
              <span style="color: #ffffff;">Total de Siglas: {{ scaleService.siglaTypes().length }}</span>
            </div>
          </div>

          <!-- FIXED BODY WRAPPER -->
          <div class="flex-1 min-h-0 flex flex-col overflow-hidden p-2 md:p-3 space-y-3 relative">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 min-h-0 items-stretch">
              <!-- SIGLAS TABLE LIST (Span 2) -->
              <div class="lg:col-span-2 flex flex-col h-full min-h-0 space-y-3">
                <div class="border border-[#10213b] rounded-lg overflow-hidden bg-[#030a14] flex flex-col flex-1 min-h-0">
                  <div class="bg-[#071426] px-4 py-3 border-b border-[#10213b] flex items-center justify-between shrink-0">
                    <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                      <span class="material-icons text-xs text-blue-500">list</span>
                      Dicionário de Siglas Cadastradas
                    </span>
                    <span class="text-[9px] text-slate-500 font-bold uppercase">* Clique no ícone de edição para alterar</span>
                  </div>
                  <div class="overflow-y-auto scrollbar-thin flex-1">
                    <table class="w-full text-left border-collapse select-none">
                      <thead class="sticky top-0 z-10 shadow-sm">
                        <tr class="border-b border-[#10213b] bg-[#071426] text-slate-400 uppercase text-[9px] font-black tracking-wider">
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b]" style="background-color: #d8fff8; color: #071426;">Sigla / Código</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b]" style="background-color: #d8fff8; color: #071426;">Identificação / Nome</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b]" style="background-color: #d8fff8; color: #071426;">Descrição detalhada</th>
                          <th class="py-3 px-4 sticky top-0 z-10 border-b border-[#10213b] text-center" style="background-color: #d8fff8; color: #071426;">Ações</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-[#10213b] text-xs">
                        @for (sigla of scaleService.siglaTypes(); track sigla.code) {
                          <tr class="hover:bg-emerald-950/40 transition-colors">
                            <td class="py-3 px-4 font-mono">
                              <span class="inline-flex items-center justify-center w-11 py-1 rounded font-black text-xs shadow-md border"
                                    [style.background-color]="getShiftOrSiglaColor(sigla.code)"
                                    [style.color]="getShiftOrSiglaTextColor(sigla.code)"
                                    [style.border-color]="isShiftOrSiglaTransparent(sigla.code) ? getShiftOrSiglaBorderColor(sigla.code) : (isLightTheme() ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)')"
                                    [style.border-width]="isShiftOrSiglaTransparent(sigla.code) ? '1.5px' : '1px'">
                                {{ sigla.code }}
                              </span>
                            </td>
                            <td class="py-3 px-4">
                              <div class="flex flex-col">
                                <div class="flex items-center gap-2">
                                  <span class="text-white font-bold text-xs">{{ sigla.label }}</span>
                                  @if (sigla.computaAusencia) {
                                    <span class="text-[8px] bg-red-500/10 text-red-400 border border-red-500/25 px-1 py-0.5 rounded font-black uppercase">
                                      Ausência
                                    </span>
                                  }
                                </div>
                                <span class="text-[9px] text-slate-500 mt-0.5">Base regulatória operacional</span>
                              </div>
                            </td>
                            <td class="py-3 px-4 text-slate-400 text-[11px]">
                              {{ sigla.description || 'Não especificada' }}
                            </td>

                            <!-- Actions: Edit & Delete -->
                            <td class="py-3 px-4 text-center">
                              <div class="flex items-center justify-center gap-2">
                                <button (click)="startEditingSigla(sigla)"
                                        class="p-1.5 text-blue-400 hover:text-white hover:bg-blue-950/40 rounded transition-all cursor-pointer border-none outline-none"
                                        title="Editar Sigla">
                                  <span class="material-icons text-sm">edit</span>
                                </button>
                                
                                <button (click)="removeSiglaType(sigla.code)"
                                        class="p-1.5 text-red-500 hover:text-white hover:bg-red-950/40 rounded transition-all cursor-pointer border-none outline-none"
                                        title="Excluir Sigla">
                                  <span class="material-icons text-sm">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              <!-- RIGHT COLUMN: SIGLA FORM -->
              <div class="space-y-6 overflow-y-auto scrollbar-thin h-full pr-1 shrink-0">
                <!-- SIGLA CREATION / EDITING CARD -->
                <div class="bg-[#030a14] border border-[#10213b] rounded-lg p-5 shadow-xl">
                  <div class="flex items-center justify-between pb-2 border-b border-[#10213b] mb-4">
                    <h4 class="font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span class="material-icons text-blue-500 text-sm">
                        {{ editingSiglaCode() ? 'edit_note' : 'library_add' }}
                      </span>
                      {{ editingSiglaCode() ? 'Editor de Siglas de Escala' : 'Criar Nova Sigla' }}
                    </h4>
                    @if (editingSiglaCode()) {
                      <span class="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/25 px-1.5 py-0.5 rounded font-mono font-black uppercase">
                        Modo Edição
                      </span>
                    }
                  </div>

                  <div class="space-y-4 text-xs">
                    <!-- Code & Label Row -->
                    <div class="flex gap-4">
                      <!-- Code (40%) -->
                      <div class="flex flex-col gap-1 w-[40%] shrink-0">
                        <label for="sigla_code_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Sigla / Código (Ex: TR, OU)</label>
                        <input id="sigla_code_input"
                               type="text"
                               [value]="newSiglaCode()"
                               (input)="newSiglaCode.set($any($event.target).value)"
                               placeholder="Ex: TR"
                               style="height: 25px;"
                               class="bg-[#071426] border border-[#10213b] rounded px-3 py-0.5 text-white outline-none focus:border-blue-500 font-mono font-bold uppercase w-full">
                      </div>

                      <!-- Label (60% / Remaining) -->
                      <div class="flex flex-col gap-1 flex-1">
                        <label for="sigla_label_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Identificação</label>
                        <input id="sigla_label_input"
                               type="text"
                               [value]="newSiglaLabel()"
                               (input)="newSiglaLabel.set($any($event.target).value)"
                               placeholder="Ex: Treinamento"
                               style="height: 25px;"
                               class="bg-[#071426] border border-[#10213b] rounded px-3 py-0.5 text-white outline-none focus:border-blue-500 font-bold w-full">
                      </div>
                    </div>

                    @if (editingSiglaCode()) {
                      <div class="text-[8px] text-amber-400 font-bold leading-normal mt-0.5">
                        * Ao alterar o código da sigla, todos os lançamentos existentes na escala diária serão atualizados automaticamente no banco de dados.
                      </div>
                    }

                    <!-- Description -->
                    <div class="flex flex-col gap-1">
                      <label for="sigla_desc_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Descrição detalhada</label>
                      <textarea id="sigla_desc_input"
                                [value]="newSiglaDescription()"
                                (input)="newSiglaDescription.set($any($event.target).value)"
                                placeholder="Ex: Utilizada para indicar afastamentos devido a treinamentos..."
                                rows="3"
                                style="height: 50px;"
                                class="bg-[#071426] border border-[#10213b] rounded px-3 py-1 text-white outline-none focus:border-blue-500 font-bold resize-none"></textarea>
                    </div>

                    <!-- Computa Ausência Toggle -->
                    <div class="flex items-center gap-3 bg-[#071426] px-3 rounded border border-[#10213b]" style="height: 45px;">
                      <input id="sigla_computa_ausencia_input"
                             type="checkbox"
                             [checked]="newSiglaComputaAusencia()"
                             (change)="newSiglaComputaAusencia.set($any($event.target).checked)"
                             class="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-[#030a14] border-[#10213b] cursor-pointer">
                      <div class="flex flex-col">
                        <label for="sigla_computa_ausencia_input" class="font-black text-[10px] uppercase tracking-wider text-white cursor-pointer select-none">
                          Computa Ausência
                        </label>
                        <span class="text-[8px] text-slate-400 leading-tight">
                          Se ativado, esta sigla contará como dia de ausência (não computa presença).
                        </span>
                      </div>
                    </div>

                    <!-- Division of Theme Tabs -->
                    <div class="flex border-b border-[#10213b] mb-4 gap-1 select-none">
                      <button type="button" 
                              (click)="activeSiglaThemeTab.set('light')"
                              class="flex-1 py-1.5 px-3 text-center text-[10px] font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer outline-none flex items-center justify-center gap-1.5"
                              [class.border-emerald-500]="activeSiglaThemeTab() === 'light'"
                              [class.text-emerald-400]="activeSiglaThemeTab() === 'light'"
                              [class.border-transparent]="activeSiglaThemeTab() !== 'light'"
                              [class.text-slate-400]="activeSiglaThemeTab() !== 'light'"
                              [class.hover:text-white]="activeSiglaThemeTab() !== 'light'">
                        <span class="material-icons text-xs">light_mode</span>
                        Tema Claro
                      </button>
                      <button type="button" 
                              (click)="activeSiglaThemeTab.set('dark')"
                              class="flex-1 py-1.5 px-3 text-center text-[10px] font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer outline-none flex items-center justify-center gap-1.5"
                              [class.border-emerald-500]="activeSiglaThemeTab() === 'dark'"
                              [class.text-emerald-400]="activeSiglaThemeTab() === 'dark'"
                              [class.border-transparent]="activeSiglaThemeTab() !== 'dark'"
                              [class.text-slate-400]="activeSiglaThemeTab() !== 'dark'"
                              [class.hover:text-white]="activeSiglaThemeTab() !== 'dark'">
                        <span class="material-icons text-xs">dark_mode</span>
                        Tema Escuro
                      </button>
                    </div>

                    <!-- TAB CONTENTS: LIGHT THEME -->
                    @if (activeSiglaThemeTab() === 'light') {
                      <div class="space-y-4 animate-fade-in">
                        <!-- Fundo Transparente Toggle (Light) -->
                        <div class="flex items-center gap-3 bg-[#071426] px-3 rounded border border-[#10213b]" style="height: 45px;">
                          <input id="sigla_transparent_bg_input"
                                 type="checkbox"
                                 [checked]="newSiglaTransparentBg()"
                                 (change)="newSiglaTransparentBg.set($any($event.target).checked)"
                                 class="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-[#030a14] border-[#10213b] cursor-pointer">
                          <div class="flex flex-col">
                            <label for="sigla_transparent_bg_input" class="font-black text-[10px] uppercase tracking-wider text-white cursor-pointer select-none">
                              Fundo Transparente (Claro)
                            </label>
                            <span class="text-[8px] text-slate-400 leading-tight">
                              Se ativado, exibe fundo transparente com borda e fonte coloridas no tema claro.
                            </span>
                          </div>
                        </div>

                        <!-- Color pickers (Light) -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="flex flex-col gap-1">
                            <label for="sigla_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fundo (Claro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="sigla_color_input"
                                     type="color"
                                     [value]="newSiglaColor()"
                                     (input)="newSiglaColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newSiglaColor() }}</span>
                            </div>
                          </div>
                          
                          <div class="flex flex-col gap-1">
                            <label for="sigla_text_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fonte (Claro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="sigla_text_color_input"
                                     type="color"
                                     [value]="newSiglaTextColor()"
                                     (input)="newSiglaTextColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newSiglaTextColor() }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- TAB CONTENTS: DARK THEME -->
                    @if (activeSiglaThemeTab() === 'dark') {
                      <div class="space-y-4 animate-fade-in">
                        <!-- Fundo Transparente Toggle (Dark) -->
                        <div class="flex items-center gap-3 bg-[#071426] px-3 rounded border border-[#10213b]" style="height: 45px;">
                          <input id="sigla_dark_transparent_bg_input"
                                 type="checkbox"
                                 [checked]="newSiglaDarkTransparentBg()"
                                 (change)="newSiglaDarkTransparentBg.set($any($event.target).checked)"
                                 class="w-4 h-4 rounded text-blue-500 focus:ring-blue-500 bg-[#030a14] border-[#10213b] cursor-pointer">
                          <div class="flex flex-col">
                            <label for="sigla_dark_transparent_bg_input" class="font-black text-[10px] uppercase tracking-wider text-white cursor-pointer select-none">
                              Fundo Transparente (Escuro)
                            </label>
                            <span class="text-[8px] text-slate-400 leading-tight">
                              Se ativado, exibe fundo transparente com borda e fonte coloridas no tema escuro.
                            </span>
                          </div>
                        </div>

                        <!-- Color pickers (Dark) -->
                        <div class="grid grid-cols-2 gap-4">
                          <div class="flex flex-col gap-1">
                            <label for="sigla_dark_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fundo (Escuro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="sigla_dark_color_input"
                                     type="color"
                                     [value]="newSiglaDarkColor()"
                                     (input)="newSiglaDarkColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newSiglaDarkColor() }}</span>
                            </div>
                          </div>
                          
                          <div class="flex flex-col gap-1">
                            <label for="sigla_dark_text_color_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Cor Fonte (Escuro)</label>
                            <div class="flex gap-2 items-center h-9">
                              <input id="sigla_dark_text_color_input"
                                     type="color"
                                     [value]="newSiglaDarkTextColor()"
                                     (input)="newSiglaDarkTextColor.set($any($event.target).value)"
                                     class="bg-transparent border-none w-8 h-8 rounded cursor-pointer outline-none">
                              <span class="text-[9px] font-mono text-slate-400 font-bold">{{ newSiglaDarkTextColor() }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <!-- REAL-TIME PARITY PREVIEW -->
                    <div class="bg-[#071426] border border-[#10213b] rounded-lg p-3 flex flex-col gap-3 min-h-[140px]">
                      <div class="flex flex-col gap-0.5 pb-2 border-b border-[#10213b]/50">
                        <span class="font-black text-[9px] uppercase tracking-wider text-slate-300 flex items-center gap-1">
                          <span class="material-icons text-[10px] text-emerald-400">visibility</span>
                          Visualização em Tempo Real (Paridade de Temas)
                        </span>
                        <span class="text-[8px] text-slate-400 font-medium">Veja o comportamento da sigla em ambos os ambientes</span>
                      </div>
                      
                      <div class="grid grid-cols-2 gap-3">
                        <!-- LIGHT THEME PREVIEW COLUMN -->
                        <div class="bg-[#0c192d] p-2 rounded border border-[#10213b] flex flex-col items-center gap-2">
                          <span class="text-[7px] text-emerald-400 font-black uppercase tracking-wider flex items-center gap-0.5">
                            <span class="material-icons text-[8px]">light_mode</span> Tema Claro
                          </span>
                          <!-- Preview Badge -->
                          <div class="w-8 h-8 rounded flex items-center justify-center font-bold font-mono text-[11px] shadow border"
                               [style.backgroundColor]="newSiglaTransparentBg() ? 'transparent' : newSiglaColor()"
                               [style.borderColor]="newSiglaColor()"
                               [style.color]="newSiglaTransparentBg() ? (newSiglaTextColor() || newSiglaColor()) : newSiglaTextColor()">
                            {{ (newSiglaCode() || '?').substring(0, 3).toUpperCase() }}
                          </div>
                          <!-- Full panel preview -->
                          <div class="px-2 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold border"
                               [style.backgroundColor]="newSiglaTransparentBg() ? 'transparent' : newSiglaColor() + '15'"
                               [style.borderColor]="newSiglaColor() + '30'"
                               [style.color]="newSiglaTransparentBg() ? (newSiglaTextColor() || newSiglaColor()) : newSiglaTextColor()">
                            <span class="w-4 h-4 rounded flex items-center justify-center font-bold font-mono text-[8px] border"
                                  [style.backgroundColor]="newSiglaTransparentBg() ? 'transparent' : newSiglaColor()"
                                  [style.borderColor]="newSiglaColor()"
                                  [style.color]="newSiglaTransparentBg() ? (newSiglaTextColor() || newSiglaColor()) : newSiglaTextColor()">
                              {{ (newSiglaCode() || '?').substring(0, 3).toUpperCase() }}
                            </span>
                            <span class="max-w-[50px] truncate text-slate-200 text-[8px]">{{ newSiglaLabel() || 'Sigla' }}</span>
                          </div>
                        </div>

                        <!-- DARK THEME PREVIEW COLUMN -->
                        <div class="bg-[#050d18] p-2 rounded border border-[#10213b] flex flex-col items-center gap-2">
                          <span class="text-[7px] text-purple-400 font-black uppercase tracking-wider flex items-center gap-0.5">
                            <span class="material-icons text-[8px]">dark_mode</span> Tema Escuro
                          </span>
                          <!-- Preview Badge -->
                          <div class="w-8 h-8 rounded flex items-center justify-center font-bold font-mono text-[11px] shadow border"
                               [style.backgroundColor]="newSiglaDarkTransparentBg() ? 'transparent' : newSiglaDarkColor()"
                               [style.borderColor]="newSiglaDarkColor()"
                               [style.color]="newSiglaDarkTransparentBg() ? (newSiglaDarkTextColor() || newSiglaDarkColor()) : newSiglaDarkTextColor()">
                            {{ (newSiglaCode() || '?').substring(0, 3).toUpperCase() }}
                          </div>
                          <!-- Full panel preview -->
                          <div class="px-2 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold border"
                               [style.backgroundColor]="newSiglaDarkTransparentBg() ? 'transparent' : newSiglaDarkColor() + '15'"
                               [style.borderColor]="newSiglaDarkColor() + '30'"
                               [style.color]="newSiglaDarkTransparentBg() ? (newSiglaDarkTextColor() || newSiglaDarkColor()) : newSiglaDarkTextColor()">
                            <span class="w-4 h-4 rounded flex items-center justify-center font-bold font-mono text-[8px] border"
                                  [style.backgroundColor]="newSiglaDarkTransparentBg() ? 'transparent' : newSiglaDarkColor()"
                                  [style.borderColor]="newSiglaDarkColor()"
                                  [style.color]="newSiglaDarkTransparentBg() ? (newSiglaDarkTextColor() || newSiglaDarkColor()) : newSiglaDarkTextColor()">
                              {{ (newSiglaCode() || '?').substring(0, 3).toUpperCase() }}
                            </span>
                            <span class="max-w-[50px] truncate text-slate-400 text-[8px]">{{ newSiglaLabel() || 'Sigla' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2" style="padding-top: 0px;">
                      <button (click)="saveSiglaType()"
                              class="flex-1 bg-[#10b981] hover:bg-emerald-600 text-white font-black py-2.5 rounded uppercase tracking-wider transition-all cursor-pointer border-none shadow-md outline-none">
                        {{ editingSiglaCode() ? 'Salvar Alterações' : 'Criar Sigla' }}
                      </button>
                      
                      @if (editingSiglaCode()) {
                        <button (click)="cancelEditingSigla()"
                                class="px-4 rounded uppercase tracking-wider transition-all cursor-pointer border text-xs outline-none font-black"
                                [class.bg-slate-100]="isLightTheme()"
                                [class.text-slate-800]="isLightTheme()"
                                [class.border-slate-300]="isLightTheme()"
                                [class.hover:bg-slate-200]="isLightTheme()"
                                [class.bg-slate-800]="!isLightTheme()"
                                [class.text-slate-200]="!isLightTheme()"
                                [class.border-slate-700]="!isLightTheme()"
                                [class.hover:bg-slate-700]="!isLightTheme()">
                          Cancelar
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
           <!-- SUB-TAB 4: PAINEL OPERACIONAL DE COLABORADORES -->
      @if (activeSubTab() === 'team') {
        <div class="flex-1 flex flex-col w-full gap-0 overflow-hidden animate-fade-in font-sans" id="team_gallery_tab_content">
          <!-- Page Header -->
          <div class="px-3 md:px-4 py-2 border-b border-[#10213b] flex flex-row items-center justify-between gap-4 select-none"
               [class.bg-[#030a14]]="!isLightTheme()" [class.bg-white]="isLightTheme()">
            <div>
              <h3 class="font-black text-sm uppercase tracking-tight text-white flex items-center gap-1.5">
                <span class="material-icons text-[#10b981] font-bold">group</span>
                Quadro de Colaboradores
              </h3>
            </div>
          </div>

          @if (teamViewMode() === 'gallery') {
            <!-- Master-Detail Grid -->
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-3 p-2 md:p-3 flex-1 overflow-hidden min-h-0 h-[calc(100vh-130px)]">
            
             <!-- LEFT COLUMN: CARDS GALLERY (1/3 Width on desktop) -->
             <div class="xl:col-span-1 flex flex-col gap-2 h-full min-h-0 overflow-hidden">
               <div class="bg-[#030a14] border border-[#10213b] rounded-lg p-3 space-y-2 shrink-0">
                 <span class="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Filtro de Seleção Rápida</span>
                 
                 <!-- Search within tab -->
                 <div class="relative">
                   <span class="material-icons absolute left-3 top-2 text-slate-500 text-sm select-none">search</span>
                   <input type="text"
                          [value]="collabSearchQuery()"
                          (input)="collabSearchQuery.set($any($event.target).value)"
                          placeholder="Filtrar por nome..."
                          class="w-full bg-[#071426] border border-[#10213b] text-white text-xs px-3 py-2 pl-8 rounded-lg outline-none focus:border-blue-500 placeholder:text-slate-600 font-semibold font-sans">
                 </div>
               </div>

               <!-- List of Cards -->
               <div class="space-y-3 overflow-y-auto flex-1 pr-1 scrollbar-thin">
                 @let filteredList = filteredCollaborators();
                 @if (filteredList.length === 0) {
                   <div class="py-8 text-center text-xs text-slate-500 italic bg-[#030a14]/50 border border-dashed border-[#10213b] rounded-lg">
                     Nenhum colaborador corresponde aos filtros ativos.
                   </div>
                 } @else {
                   @for (collab of filteredList; track collab.id) {
                     @let isSelected = selectedProfileCollabId() === collab.id || (!selectedProfileCollabId() && filteredList[0].id === collab.id);
                     
                     <div (click)="selectedProfileCollabId.set(collab.id)"
                          class="p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 text-left relative overflow-hidden group select-none shadow-sm"
                          [ngClass]="isLightTheme() ? 
                            (isSelected ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50') : 
                            (isSelected ? 'bg-gradient-to-r from-emerald-950/40 to-[#071426] border-[#10b981] shadow-lg' : 'bg-[#030a14]/80 border-[#10213b] hover:border-slate-700 hover:bg-[#071426]')">
                       
                       <!-- Ambient overlay indicator -->
                       @if (isSelected) {
                         <div class="absolute left-0 top-0 bottom-0 w-1 bg-[#10b981]"></div>
                       }

                       <!-- Left side: Avatar + Name / Role info -->
                       <div class="flex items-center gap-3 col-span-2">
                         <div class="relative">
                           <img [src]="getCollabPhoto(collab)" 
                                alt="Foto de {{ collab.name }}"
                                referrerpolicy="no-referrer"
                                class="w-10 h-10 rounded-lg object-cover border border-[#10213b] shadow-md bg-slate-900">
                           
                           <!-- Pulse indicator for online status simulation or shift badge -->
                           <span class="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-950 border border-[#10213b] text-[8px] font-bold font-mono"
                                 [style.color]="getShiftOrSiglaColor(collab.shift)"
                                 title="Turno: {{ getShiftLabel(collab) }}">
                             {{ getShiftLabel(collab) | slice:0:1 }}
                           </span>
                         </div>
                         
                         <div class="flex flex-col min-w-0">
                           <span class="font-black text-xs text-white uppercase tracking-tight block truncate">{{ collab.name }}</span>
                           <span class="text-[9px] text-slate-400 font-bold tracking-widest uppercase font-mono mt-0.5">{{ collab.role }} · {{ collab.sector }}</span>
                           
                           <!-- Badges row -->
                           <div class="flex items-center gap-1.5 mt-1">
                             <span class="text-[8px] bg-[#0b1e36] text-blue-400 px-1 py-0.5 rounded font-black font-mono">{{ collab.group }}</span>
                           </div>
                         </div>
                       </div>

                       <!-- Right side: Score / Indicators -->
                       <div class="flex flex-col items-end gap-1 shrink-0">
                         <!-- Mini indicator -->
                         <span class="w-2.5 h-2.5 rounded-full"
                               [style.background-color]="getShiftOrSiglaColor(collab.shift)"
                               [title]="'Alocado no turno ' + getShiftLabel(collab)"></span>
                       </div>
                     </div>
                   }
                 }
               </div>
             </div>

             <!-- RIGHT COLUMN: DETAILED VIEW (2/3 Width on desktop) -->
             <div class="xl:col-span-2 h-full min-h-0 overflow-y-auto scrollbar-thin pr-1 pb-16 space-y-3">
               @let stats = collabStats();
               
               @if (selectedProfileCollab()) {
                 @let selectedCol = selectedProfileCollab()!;
                  <!-- SECTION: EQUIPE DO DIA (Hoje, Amanhã, outros dias) -->
                    <div class="bg-[#071426] border border-[#10213b] rounded-lg p-5 space-y-4">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#10213b]/40">
                        <div>
                          <h4 class="font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                            <span class="material-icons text-emerald-400 text-sm">group</span>
                            Equipe de Trabalho
                          </h4>
                          <p class="text-[8px] text-slate-500 mt-0.5 leading-relaxed">
                            Colegas de turno escalados para o mesmo período de serviço.
                          </p>
                        </div>

                        <!-- Tab Selectors: Hoje, Amanhã, Outro Dia -->
                        <div class="flex items-center bg-[#030a14] border border-[#10213b] rounded-lg p-0.5 select-none self-start sm:self-auto shrink-0">
                          <button (click)="selectedCollabTeamDayTab.set('today')"
                                  [class.bg-emerald-600]="selectedCollabTeamDayTab() === 'today'"
                                  [class.text-white]="selectedCollabTeamDayTab() === 'today'"
                                  [class.text-slate-400]="selectedCollabTeamDayTab() !== 'today'"
                                  class="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded transition-all duration-150">
                            Hoje
                          </button>
                          <button (click)="selectedCollabTeamDayTab.set('tomorrow')"
                                  [class.bg-emerald-600]="selectedCollabTeamDayTab() === 'tomorrow'"
                                  [class.text-white]="selectedCollabTeamDayTab() === 'tomorrow'"
                                  [class.text-slate-400]="selectedCollabTeamDayTab() !== 'tomorrow'"
                                  class="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded transition-all duration-150">
                            Amanhã
                          </button>
                          <button (click)="selectedCollabTeamDayTab.set('other')"
                                  [class.bg-emerald-600]="selectedCollabTeamDayTab() === 'other'"
                                  [class.text-white]="selectedCollabTeamDayTab() === 'other'"
                                  [class.text-slate-400]="selectedCollabTeamDayTab() !== 'other'"
                                  class="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded transition-all duration-150">
                            Outro Dia
                          </button>
                        </div>
                      </div>

                      <!-- If "Outro Dia" is selected, show day selector -->
                      @if (selectedCollabTeamDayTab() === 'other') {
                        <div class="p-3 border border-[#10213b]/50 rounded-lg bg-[#030a14]/60 flex items-center justify-between gap-4 animate-fade-in">
                          <span class="text-[9.5px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <span class="material-icons text-xs text-amber-500 font-bold">calendar_month</span>
                            Selecione o Dia de Referência:
                          </span>
                          
                          <div class="flex items-center gap-2">
                            <button (click)="selectedCollabTeamDayOther.set(selectedCollabTeamDayOther() > 1 ? selectedCollabTeamDayOther() - 1 : 1)"
                                    class="w-7 h-7 rounded border border-[#10213b] hover:border-emerald-500/50 flex items-center justify-center text-white font-black transition-colors">
                              -
                            </button>
                            <span class="text-xs font-mono font-black text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1 rounded">
                              Dia {{ selectedCollabTeamDayOther() < 10 ? '0' + selectedCollabTeamDayOther() : selectedCollabTeamDayOther() }}
                            </span>
                            <button (click)="selectedCollabTeamDayOther.set(selectedCollabTeamDayOther() < daysInMonth().length ? selectedCollabTeamDayOther() + 1 : daysInMonth().length)"
                                    class="w-7 h-7 rounded border border-[#10213b] hover:border-emerald-500/50 flex items-center justify-center text-white font-black transition-colors">
                              +
                            </button>
                          </div>
                        </div>
                      }

                      <!-- Selected Day Header with Shift Label and count -->
                      @let activeDayOffset = selectedCollabTeamDayTab() === 'today' ? 0 : (selectedCollabTeamDayTab() === 'tomorrow' ? 1 : 'other');
                      @let activeTeamList = getCollabTeamForDay(selectedCol, activeDayOffset);
                      @let activeShiftLabel = getCollabTeamShiftLabelForDay(selectedCol, activeDayOffset);
                      
                      <div class="flex items-center justify-between pb-1">
                        <span class="text-[9px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                          <span class="material-icons text-[11px] text-emerald-400">label</span>
                          Turno Associado: <span class="text-emerald-400 font-extrabold">{{ activeShiftLabel }}</span>
                        </span>
                        <span class="text-[8px] font-bold font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                          {{ activeTeamList.length }} Membros
                        </span>
                      </div>

                      <!-- Team grid -->
                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        @for (member of activeTeamList; track member.id) {
                          <div class="p-2.5 border rounded-lg transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 select-none h-[135px]"
                               [class.bg-[#030a14]]="!isLightTheme()"
                               [class.border-[#10213b]]="!isLightTheme() && member.id !== selectedCol.id"
                               [class.border-emerald-500/40]="!isLightTheme() && member.id === selectedCol.id"
                               [class.bg-emerald-950/15]="!isLightTheme() && member.id === selectedCol.id"
                               
                               [class.bg-white]="isLightTheme()"
                               [class.border-slate-200]="isLightTheme() && member.id !== selectedCol.id"
                               [class.border-emerald-500/60]="isLightTheme() && member.id === selectedCol.id"
                               [class.bg-emerald-50/40]="isLightTheme() && member.id === selectedCol.id">
                            
                            <!-- Square Photo Wrapper -->
                            <div class="w-14 h-14 relative shrink-0 border overflow-hidden rounded-none"
                                 [class.border-[#10213b]]="!isLightTheme() && member.id !== selectedCol.id"
                                 [class.border-emerald-500]="member.id === selectedCol.id"
                                 [class.border-slate-200]="isLightTheme() && member.id !== selectedCol.id">
                              <img [src]="getCollabPhoto(member)" [alt]="member.name" referrerpolicy="no-referrer"
                                   class="w-full h-full object-cover">
                              @if (member.id === selectedCol.id) {
                                <div class="absolute bottom-0 inset-x-0 bg-emerald-600 text-[6.5px] font-black uppercase text-white py-0.5 tracking-wider text-center">
                                  Selecionado
                                </div>
                              }
                            </div>

                            <!-- Collaborator Info -->
                            <div class="w-full min-w-0">
                              <h6 class="text-[9.5px] font-black truncate leading-tight"
                                  [class.text-white]="!isLightTheme()"
                                  [class.text-slate-800]="isLightTheme()">
                                {{ member.name }}
                              </h6>
                              <p class="text-[7.5px] font-mono mt-1 font-bold uppercase tracking-widest truncate"
                                 [class.text-slate-500]="member.id !== selectedCol.id"
                                 [class.text-emerald-400]="!isLightTheme() && member.id === selectedCol.id"
                                 [class.text-emerald-700]="isLightTheme() && member.id === selectedCol.id">
                                {{ member.role }}
                              </p>
                            </div>
                          </div>
                        } @empty {
                          <div class="col-span-full py-8 text-center rounded-lg border border-dashed border-[#10213b]/40 bg-slate-900/10 flex flex-col items-center justify-center gap-1.5">
                            <span class="material-icons text-lg text-slate-500">sentiment_neutral</span>
                            <span class="text-[9px] font-bold uppercase tracking-wider text-slate-400">Nenhum colega escalado para este dia</span>
                          </div>
                        }
                      </div>
                    </div>

              } @else {
                <div class="py-24 text-center text-xs text-slate-500 italic bg-[#030a14] border border-dashed border-[#10213b] rounded-lg">
                  Selecione um colaborador à esquerda para carregar o prontuário e análises de escala.
                </div>
              }
            </div> <!-- Closes Right Column xl:col-span-2 -->
          </div> <!-- Closes Master-Detail Grid container div -->
        } @else {
          <!-- SEARCH & FILTER CONTROLS BAR -->
          <div class="flex flex-row items-center justify-between gap-3 px-4 py-1.5 border-b border-[#10213b] w-full flex-wrap xl:flex-nowrap min-h-[44px]" [class.bg-[#030a14]]="!isLightTheme()" [class.bg-white]="isLightTheme()">
                  <!-- Search & Turnos Group (Left Side) -->
                  <div class="flex items-center gap-3.5 flex-wrap md:flex-nowrap">
                    <!-- Search Input -->
                    <div class="relative">
                      <span class="material-icons absolute left-2.5 top-2 text-slate-400 text-xs select-none">search</span>
                      <input type="text"
                             [value]="adminSearchQuery()"
                             (input)="adminSearchQuery.set($any($event.target).value)"
                             placeholder="Busca por digitação..."
                             class="w-[180px] md:w-[220px] bg-[#030a14] text-white border border-[#10213b] focus:border-[#10b981] outline-none rounded-md pl-7 pr-2 py-1 text-[11px] font-semibold placeholder:text-slate-500">
                    </div>

                    <!-- Thin divider -->
                    <div class="hidden md:block w-[1px] h-4 bg-[#10213b]"></div>

                    <!-- Colaboradores por Turno (Compact Next to Search) -->
                    <div class="flex items-center text-[11px] font-semibold text-slate-400 select-none">
                      <span class="font-mono flex items-center gap-1" title="Manhã">
                        M: <span class="text-emerald-400 font-black text-xs md:text-sm">{{ collaboratorsCountByShift()['MANHÃ'] }}</span>
                      </span>
                      
                      <span class="text-[#10213b] text-[10px] font-light mx-2">|</span>
                      
                      <span class="font-mono flex items-center gap-1" title="Tarde">
                        T: <span class="text-emerald-400 font-black text-xs md:text-sm">{{ collaboratorsCountByShift()['TARDE'] }}</span>
                      </span>
                      
                      <span class="text-[#10213b] text-[10px] font-light mx-2">|</span>
                      
                      <span class="font-mono flex items-center gap-1" title="Noite">
                        N: <span class="text-emerald-400 font-black text-xs md:text-sm">{{ collaboratorsCountByShift()['MADRUGADA'] + collaboratorsCountByShift()['NOITE'] }}</span>
                      </span>

                      <span class="w-8 hidden md:block"></span>
                      <span class="text-[#10213b] text-[10px] font-light mx-2 md:hidden">|</span>

                      <span class="font-mono flex items-center gap-1 text-slate-300" title="Total">
                        Total: <span class="text-emerald-400 font-black text-xs md:text-sm">{{ scaleService.collaborators().length }}</span>
                      </span>
                    </div>
                  </div>

                  <!-- Filters & Total Grid (Right Side) -->
                  <div class="flex items-center gap-2.5 ml-auto xl:ml-0 flex-wrap md:flex-nowrap">
                    <!-- Filter by Cargo -->
                    <div class="flex items-center gap-1 bg-[#030a14] border border-[#10213b] rounded-md px-2 py-0.5">
                      <span class="material-icons text-[11px] text-[#10b981]">badge</span>
                      <select [value]="adminFilterRole()"
                              (change)="adminFilterRole.set($any($event.target).value)"
                              class="bg-transparent text-slate-300 outline-none text-[11px] font-bold border-none cursor-pointer py-0.5 pl-0.5 pr-2">
                        <option value="TODOS">Cargos</option>
                        @for (role of availableRoles(); track role) {
                          <option [value]="role" [selected]="editingCollab()?.role?.trim() === role">{{ role }}</option>
                        }
                      </select>
                    </div>

                    <!-- Filter by Turno -->
                    <div class="flex items-center gap-1 bg-[#030a14] border border-[#10213b] rounded-md px-2 py-0.5">
                      <span class="material-icons text-[11px] text-[#10b981]">schedule</span>
                      <select [value]="adminFilterShift()"
                              (change)="adminFilterShift.set($any($event.target).value)"
                              class="bg-transparent text-slate-300 outline-none text-[11px] font-bold border-none cursor-pointer py-0.5 pl-0.5 pr-2">
                        <option value="TODOS">Turnos</option>
                        @for (shift of availableShifts(); track shift.code) {
                          <option [value]="shift.code">{{ shift.label }}</option>
                        }
                      </select>
                    </div>

                    <!-- Sort A-Z Button -->
                    <button (click)="adminSortOrder.set(adminSortOrder() === 'asc' ? 'desc' : 'asc')"
                            class="flex items-center gap-1 bg-[#030a14] hover:bg-[#10213b] border border-[#10213b] hover:border-[#10b981] text-slate-300 hover:text-white rounded-md px-2 py-1 text-[11px] font-bold cursor-pointer transition-all">
                      <span class="material-icons text-[12px]">
                        {{ adminSortOrder() === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                      </span>
                      <span>Ordenar A-Z</span>
                    </button>

                    @if (canEdit()) {
                      <button (click)="openCreateCollabModal()"
                              class="bg-[#10b981] hover:bg-emerald-600 text-white font-black text-[10px] px-2.5 py-1 ml-1.5 rounded-md uppercase tracking-wider cursor-pointer border-none shadow-md flex items-center gap-1 transition-all outline-none h-[22px]"
                              id="btn_cadastrar_colaborador">
                        <span class="material-icons text-xs">person_add</span>
                        <span>Colaborador</span>
                      </button>
                    }
                  </div>
                </div>

                <!-- TABLE WITH STICKY HEADER -->
                <div class="flex-1 overflow-auto w-full bg-[#020813]" [class.bg-white]="isLightTheme()">
                  <table class="w-full text-left border-collapse select-none text-slate-300">
                    <thead class="sticky top-0 bg-[#071426] z-10 shadow-md">
                      <tr class="border-b border-[#10213b] text-slate-400 uppercase text-[9px] font-black tracking-wider">
                        <th class="py-3 px-4 md:px-6 bg-[#071426]">Colaborador</th>
                        <th class="py-3 px-4 md:px-6 bg-[#071426]">Função</th>
                        <th class="py-3 px-4 md:px-6 bg-[#071426]">Setor</th>
                        <th class="py-3 px-4 md:px-6 bg-[#071426]">Turno</th>
                        <th class="py-3 px-4 md:px-6 bg-[#071426]">Nível de Acesso</th>
                        
                        <th class="py-3 px-4 md:px-6 bg-[#071426] text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#10213b]">
                      @for (collab of adminCollaborators(); track collab.id) {
                        <tr class="hover:bg-emerald-950/40 transition-colors text-xs font-medium">
                          <!-- Colaborador Nome -->
                          <td class="py-3.5 px-4 md:px-6">
                            <div class="flex items-center gap-3">
                              <img [src]="getCollabPhoto(collab)" 
                                   alt="Avatar"
                                   referrerpolicy="no-referrer"
                                   class="w-7 h-7 rounded-full object-cover border border-emerald-500/20 bg-slate-900 shadow-sm shrink-0">
                              <div class="flex flex-col">
                                <span class="font-bold text-white block whitespace-nowrap">{{ collab.name }}</span>
                                <span class="text-[8px] text-slate-500 font-mono block">ID: {{ collab.id }}</span>
                              </div>
                            </div>
                          </td>

                          <!-- Função / Cargo -->
                          <td class="py-3.5 px-4 md:px-6">
                            <span class="text-[9px] font-black tracking-wider uppercase inline-block font-sans"
                                  [class]="isLightTheme() ? 
                                    (collab.role === 'SUPERVISOR' ? 'text-purple-700' : collab.role === 'LIDER' ? 'text-amber-700' : 'text-emerald-700') : 
                                    (collab.role === 'SUPERVISOR' ? 'text-purple-400' : collab.role === 'LIDER' ? 'text-amber-400' : 'text-emerald-400')">
                              {{ collab.role === 'LIDER' ? 'LÍDER DE TURNO' : collab.role }}
                            </span>
                          </td>

                          <!-- Setor -->
                          <td class="py-3.5 px-4 md:px-6">
                            <span class="px-1.5 py-0.5 rounded text-[9px] font-bold inline-block"
                                  [class]="isLightTheme() ?
                                    (collab.sector === 'AERÓDROMO' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : collab.sector === 'VIP' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-blue-50 text-blue-700 border border-blue-200') :
                                    (collab.sector === 'AERÓDROMO' ? 'bg-[#0f172a] text-[#10b981]' : collab.sector === 'VIP' ? 'bg-[#1e1b4b] text-indigo-400' : 'bg-emerald-950 text-emerald-400')">
                              {{ collab.sector }}
                            </span>
                          </td>

                          <!-- Turno -->
                          <td class="py-3.5 px-4 md:px-6 font-mono uppercase text-slate-400 font-bold">{{ getShiftLabel(collab) }}</td>

                          <!-- Nível de Acesso -->
                          <td class="py-3.5 px-4 md:px-6">
                            <select [value]="collab.isAdmin ? 'true' : 'false'"
                                    (change)="toggleCollabAdmin(collab, $any($event.target).value === 'true')"
                                    [disabled]="!canEdit()"
                                    class="bg-[#030a14] text-[11px] font-bold border border-[#10213b] text-slate-300 rounded px-2.5 py-1 outline-none focus:border-emerald-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                              <option value="false">Usuário</option>
                              <option value="true">Administrador</option>
                            </select>
                          </td>

                          

                          <!-- Ações -->
                          <td class="py-3.5 px-4 md:px-6 text-center flex items-center justify-center gap-1.5">
                            @if (canEdit()) {
                              <!-- Edit Button -->
                              <button (click)="startEditingCollab(collab)"
                                      class="p-1.5 bg-blue-950/20 hover:bg-blue-950 text-blue-400 hover:text-white rounded transition-all cursor-pointer border-none outline-none flex items-center justify-center"
                                      title="Editar Colaborador">
                                <span class="material-icons text-sm">edit</span>
                              </button>

                              <!-- Delete Button -->
                              <button (click)="scaleService.removeCollaborator(collab.id)"
                                      class="p-1.5 bg-red-950/20 hover:bg-red-950 text-red-400 hover:text-white rounded transition-all cursor-pointer border-none outline-none flex items-center justify-center"
                                      title="Remover Colaborador">
                                <span class="material-icons text-sm">delete</span>
                              </button>
                            } @else {
                              <span class="text-[9px] text-slate-500 italic">LT Requerido</span>
                            }
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>

              <!-- MODAL: CADASTRAR/EDITAR COLABORADOR -->
              @if (isCollabModalOpen()) {
                  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in" id="modal_collab_overlay">
                    <div class="bg-[#030a14] border border-[#10213b] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up" id="modal_collab_content">
                      
                      <!-- Header -->
                      <div class="p-5 border-b border-[#10213b] flex items-center justify-between bg-[#071426]">
                        <div class="flex items-center gap-2">
                          <span class="material-icons" [class.text-blue-500]="editingCollab()" [class.text-emerald-500]="!editingCollab()">
                            {{ editingCollab() ? 'edit' : 'person_add' }}
                          </span>
                          <h3 class="font-black text-sm uppercase tracking-wider text-white" id="modal_collab_title">
                            {{ editingCollab() ? 'Editar Colaborador' : 'Cadastrar Colaborador' }}
                          </h3>
                        </div>
                        <button (click)="cancelEditingCollab()" class="text-slate-400 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-1" id="btn_close_collab_modal">
                          <span class="material-icons">close</span>
                        </button>
                      </div>

                      <!-- Body -->
                      <div class="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
                        
                        <!-- Form Fields Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                          
                          <!-- Linha 1: Foto, Nome, Aniversário -->
                          <div class="col-span-1 md:col-span-2 flex flex-col gap-1.5 items-center justify-center">
                            <label class="font-black text-[9px] uppercase tracking-wider text-slate-400">Foto</label>
                            <div class="relative group rounded-full overflow-hidden w-10 h-10 cursor-pointer shrink-0 border border-emerald-500/20 bg-slate-900 shadow-sm">
                              @if (newCollabPhotoData()) {
                                <img [src]="newCollabPhotoData()" 
                                     alt="Prévia da foto" 
                                     class="w-full h-full object-cover">
                                <button (click)="newCollabPhotoData.set(null); $event.stopPropagation()"
                                        class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity border-none cursor-pointer"
                                        title="Remover foto">
                                  <span class="material-icons text-base">delete</span>
                                </button>
                              } @else {
                                <img [src]="editingCollab() ? getCollabPhoto(editingCollab()) : getCollabPhoto({id: 'new', name: editCollabName.value || 'Novo'})" 
                                     alt="Avatar"
                                     referrerpolicy="no-referrer"
                                     class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                  <span class="material-icons text-xs">add_a_photo</span>
                                </div>
                                <input type="file"
                                       (change)="onCollabPhotoSelected($event)"
                                       accept="image/*"
                                       class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                       title="Alterar foto">
                              }
                            </div>
                          </div>

                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-7 justify-center">
                            <label for="modal_collab_name" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Nome Completo</label>
                            <input id="modal_collab_name"
                                   #editCollabName
                                   [value]="editingCollab() ? editingCollab()!.name : ''"
                                   placeholder="Ex: João Silva"
                                   class="bg-[#071426] text-white border border-[#10213b] focus:border-blue-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-slate-600">
                          </div>

                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-3 justify-center">
                            <label for="modal_collab_birthday" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Data de Aniv.</label>
                            <input id="modal_collab_birthday"
                                   #editCollabBirthday
                                   type="date"
                                   [value]="editingCollab() ? editingCollab()!.birthday : ''"
                                   class="bg-[#071426] text-white border border-[#10213b] focus:border-blue-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold">
                          </div>

                          <!-- Linha 2: Função, Setor, Turno -->
                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-4 relative">
  <div class="flex items-center justify-between">
    <label for="modal_collab_role" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Função / Cargo</label>
    <button type="button" (click)="isNewRoleMode.set(!isNewRoleMode())" class="text-[8.5px] font-bold text-emerald-400 hover:text-emerald-300">
      {{ isNewRoleMode() ? 'Selecionar da lista' : '+ Nova Função' }}
    </button>
  </div>
  <select id="modal_collab_role_select"
         #editCollabRoleSelect
         [value]="(editingCollab()?.role || 'OPERADOR').trim()"
         [class.hidden]="isNewRoleMode()"
         class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold w-full">
    @for (role of availableRoles(); track role) {
      <option [value]="role" [selected]="editingCollab()?.role?.trim() === role">{{ role }}</option>
    }
  </select>
  <input id="modal_collab_role_input"
         #editCollabRoleInput
         type="text"
         [value]="editingCollab() ? editingCollab()!.role : ''"
         [class.hidden]="!isNewRoleMode()"
         placeholder="Digite a nova função..."
         class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-slate-600 w-full">
</div>

                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-4 relative">
  <div class="flex items-center justify-between">
    <label for="modal_collab_sector" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Setor Logístico</label>
    <button type="button" (click)="isNewSectorMode.set(!isNewSectorMode())" class="text-[8.5px] font-bold text-emerald-400 hover:text-emerald-300">
      {{ isNewSectorMode() ? 'Selecionar da lista' : '+ Novo Setor' }}
    </button>
  </div>
  <select id="modal_collab_sector_select"
          #editCollabSectorSelect
          [value]="(editingCollab()?.sector || availableSectors()[0]).trim()"
          [class.hidden]="isNewSectorMode()"
          class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold w-full">
    @for (sector of availableSectors(); track sector) {
      <option [value]="sector" [selected]="editingCollab()?.sector?.trim() === sector">{{ sector }}</option>
    }
  </select>
  <input id="modal_collab_sector_input"
         #editCollabSectorInput
         type="text"
         [value]="editingCollab() ? editingCollab()!.sector : ''"
         [class.hidden]="!isNewSectorMode()"
         placeholder="Digite o novo setor..."
         class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold placeholder:text-slate-600 w-full">
</div>

                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-4">
                            <label for="modal_collab_shift" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Turno</label>
                            <select id="modal_collab_shift"
                                    #editCollabShift
                                    [value]="editingCollab() ? getShiftLabel(editingCollab()) : (scaleService.shiftTypes()[0]?.label || 'M')"
                                    class="bg-[#071426] text-white border border-[#10213b] focus:border-blue-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold">
                              @for (shiftType of scaleService.shiftTypes(); track shiftType.code) {
                                <option [value]="shiftType.label" [selected]="editingCollab()?.shift?.trim() === shiftType.label.trim() || editingCollab()?.shift?.trim() === shiftType.code.trim()">{{ shiftType.label }}</option>
                              }
                            </select>
                          </div>

                          <!-- Grupo de Trabalho (Ocultado) -->
                          <div class="hidden">
                            <select id="modal_collab_group"
                                    #editCollabGroup
                                    [value]="editingCollab() ? editingCollab()!.group : 'Corporativo'">
                              <option value="Corporativo">Corporativo</option>
                            </select>
                          </div>

                          <!-- Score (%) -->
                          <div class="hidden flex-col gap-1.5">
                            <label for="modal_collab_score" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Score (%)</label>
                            <input id="modal_collab_score"
                                   #editCollabScore
                                   type="number"
                                   [value]="editingCollab() ? editingCollab()!.score : 100"
                                   class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold font-mono">
                          </div>

                          <!-- Nível de Acesso (Administrador ou Usuário Comum) -->
                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-12">
                            <label for="modal_collab_is_admin" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Nível de Acesso (Administrador ou Usuário)</label>
                            <select id="modal_collab_is_admin"
                                    #editCollabIsAdmin
                                    class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold w-full">
                              <option value="false" [selected]="!editingCollab()?.isAdmin">Usuário Comum (Acesso exclusivo ao Portal do Colaborador)</option>
                              <option value="true" [selected]="editingCollab()?.isAdmin">Administrador (Acesso total às seções e edição da escala)</option>
                            </select>
                          </div>

                          <!-- Apelido Amigável (Nickname) -->
                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-12">
                            <label for="modal_collab_nickname" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Apelido Amigável (Usado pelo chatbot Bob)</label>
                            <input id="modal_collab_nickname"
                                   #editCollabNickname
                                   [value]="editingCollab() ? (editingCollab()!.nickname || '') : ''"
                                   placeholder="Ex: Paulinho, Carlinhos"
                                   class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold w-full placeholder:text-slate-600">
                          </div>

                          <!-- Lista de Gafes (Gaffes) -->
                          <div class="flex flex-col gap-1.5 col-span-1 md:col-span-12">
                            <label for="modal_collab_gafes" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Lista de Gafes (Digite uma gafe por linha)</label>
                            <textarea id="modal_collab_gafes"
                                      #editCollabGafes
                                      rows="3"
                                      placeholder="Ex: Esqueceu o crachá na segunda-feira&#10;Derrubou café no teclado do setor"
                                      class="bg-[#071426] text-white border border-[#10213b] focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-xs font-semibold w-full placeholder:text-slate-600 resize-none font-sans">{{ editingCollab() ? (editingCollab()!.gafes || []).join('\n') : '' }}</textarea>
                          </div>

                        </div>

                        <!-- Seção de Datas Especiais foi movida para o Portal do Colaborador -->
                      </div>

                      <!-- Footer Buttons -->
                      <div class="p-5 border-t border-[#10213b] bg-[#071426] flex items-center justify-end gap-3">
                        <button (click)="cancelEditingCollab()"
                                [style.color]="'#ffffff'"
                                class="bg-slate-800 hover:bg-slate-700 text-white font-black text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider cursor-pointer border-none transition-all outline-none">
                          Cancelar
                        </button>
                        
                        @if (editingCollab()) {
                          <button (click)="saveEditedCollaborator(editingCollab()!.id, editCollabName.value, $any(isNewRoleMode() ? editCollabRoleInput.value : editCollabRoleSelect.value), $any(editCollabGroup.value), $any(editCollabShift.value), $any(isNewSectorMode() ? editCollabSectorInput.value : editCollabSectorSelect.value), 0, +editCollabScore.value || 100, newCollabPhotoData(), editCollabBirthday.value, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, editCollabIsAdmin.value === 'true', editCollabNickname.value, editCollabGafes.value)"
                                  class="bg-[#10b981] hover:bg-emerald-600 text-white font-black text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider cursor-pointer border-none shadow-lg shadow-emerald-500/15 flex items-center gap-1.5 select-none transition-all outline-none">
                            <span class="material-icons text-sm">save</span>
                            Salvar Alterações
                          </button>
                        } @else {
                          <button (click)="registerCollaborator(editCollabName.value, $any(isNewRoleMode() ? editCollabRoleInput.value : editCollabRoleSelect.value), $any(editCollabGroup.value), $any(editCollabShift.value), $any(isNewSectorMode() ? editCollabSectorInput.value : editCollabSectorSelect.value), 0, +editCollabScore.value || 100, newCollabPhotoData() || undefined, editCollabBirthday.value, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, editCollabIsAdmin.value === 'true', editCollabNickname.value, editCollabGafes.value); editCollabName.value = ''; editCollabBirthday.value = ''; editCollabNickname.value = ''; editCollabGafes.value = ''; newCollabPhotoData.set(null)"
                                  class="bg-[#10b981] hover:bg-emerald-600 text-white font-black text-xs px-5 py-2.5 rounded-lg uppercase tracking-wider cursor-pointer border-none shadow-lg shadow-emerald-500/15 flex items-center gap-1.5 select-none transition-all outline-none">
                            <span class="material-icons text-sm">person_add_alt</span>
                            Cadastrar Colaborador
                          </button>
                        }
                      </div>

                    </div>
                  </div>
                }
              }
        </div>
      }

      <!-- SECTION C: PORTAL DO COLABORADOR -->
      @if (activeSubTab() === 'portal' || activeSubTab() === 'escala' || activeSubTab() === 'perfil' || activeSubTab() === 'equipe' || activeSubTab() === 'indicadores' || activeSubTab() === 'solicitacoes') {
        <div class="p-2 sm:p-3 lg:p-4 space-y-3 animate-fade-in font-sans w-full flex-1 overflow-y-auto scrollbar-thin max-w-full touch-pan-y" id="portal_tab_content" [class.bg-[#fafffe]]="isLightTheme()" (touchstart)="onPortalTouchStart($event)" (touchend)="onPortalTouchEnd($event)" (touchcancel)="onPortalTouchEnd($event)">
          <!-- SIMULATION BAR & QUICK SWITCH -->

          <!-- DESKTOP SUB-NAVIGATION BAR (Hidden on mobile where bottom nav is used) -->
          <div class="hidden md:flex items-center gap-2 mb-4 p-1.5 rounded-xl border transition-all duration-300" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#0F172A] border-[#334155]'">
            <button (click)="activeSubTab.set('portal')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'portal' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Início</button>
            <button (click)="activeSubTab.set('escala')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'escala' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Escala</button>
            <button (click)="activeSubTab.set('perfil')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'perfil' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Perfil</button>
            <button (click)="activeSubTab.set('equipe')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'equipe' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Equipe</button>
            <button (click)="activeSubTab.set('indicadores')" class="flex-1 py-2 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all" [class]="activeSubTab() === 'indicadores' ? 'bg-emerald-500 text-white shadow-md' : (isLightTheme() ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-[#1E293B]')">Indicadores</button>
          </div>

          @if (!getLoggedCollab()) {
            <div [class]="'border rounded-lg p-3.5 shadow-md space-y-3 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#030a14] border-[#10213b] text-white')">
              <div [class]="'flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b ' + (isLightTheme() ? 'border-slate-100' : 'border-[#10213b]/60')">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 [class]="'font-black text-sm uppercase tracking-wider ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">Sessão do Colaborador</h3>
                  </div>
                  <p [class]="'text-[10px] mt-1 ' + (isLightTheme() ? 'text-slate-600' : 'text-slate-400')">
                    Selecione qualquer colaborador cadastrado na base para simular sua seção pessoal e realizar escolhas de folgas.
                  </p>
                </div>
              </div>

              <!-- Operators Cards Grid -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <span class="material-icons text-xs text-emerald-500">people</span>
                    Quadro de Colaboradores
                  </span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                  @for (c of loginCollaborators(); track c.id) {
                    <div (click)="loginAsCollab(c.id)"
                         [class]="'border group p-3 rounded-xl cursor-pointer transition-all flex flex-col justify-between gap-2.5 select-none text-left relative overflow-hidden ' + (isLightTheme() ? 'border-slate-200 bg-slate-50 hover:border-slate-400 hover:bg-slate-100' : 'border-[#10213b] bg-[#071426]/40 hover:border-slate-700 hover:bg-[#071426]')">

                      <div class="flex items-center gap-2 min-w-0">
                        <!-- Avatar -->
                        <img [src]="getCollabPhoto(c)" alt="Avatar" referrerpolicy="no-referrer" 
                             [class]="'w-8 h-8 rounded-full object-cover border shrink-0 ' + (isLightTheme() ? 'border-slate-200 group-hover:border-slate-300' : 'border-[#10213b] group-hover:border-slate-500/20')">
                        
                        <!-- Info -->
                        <div class="min-w-0">
                          <p [class]="'text-[11px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                            {{ c.name }}
                          </p>
                          <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                            {{ c.role }}
                          </p>
                        </div>
                      </div>

                      <!-- Footer -->
                      <div [class]="'flex items-center justify-between border-t pt-1.5 ' + (isLightTheme() ? 'border-slate-200' : 'border-[#10213b]/60')">
                        <span [class]="'text-[7.5px] font-black font-mono px-1 py-0.5 rounded uppercase border ' + (isLightTheme() ? 'text-slate-600 bg-slate-150 border-slate-200' : 'text-slate-400 bg-[#030a14] border-[#10213b]/40')">
                          {{ c.shift }}
                        </span>
                        <span [class]="'text-[7.5px] font-black font-mono px-1 py-0.5 rounded uppercase border ' + (isLightTheme() ? 'text-slate-600 bg-slate-150 border-slate-200' : 'text-slate-400 bg-[#030a14] border-[#10213b]/40')">
                          {{ c.sector }}
                        </span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          } @else {
            @let logged = getLoggedCollab()!;
            @let loggedStats = calculateStatsForCollab(logged);
            @let seqStats = getConsecutiveWorkStats(logged);
            @let offStats = getDaysUntilNextOff(logged);
            @let cdState = getFolgaCountdownState(logged);
            
            <div class="space-y-3 w-full">
              <!-- SEÇÃO DE PREVISÃO DO TEMPO (CLIMA TEMPO • GUARULHOS BASE) -->
              @if (getLoggedCollab() && activeSubTab() === 'indicadores') {
                <div id="weather_subheader_bar"
                     class="w-full border rounded-[16px] p-4 transition-all duration-300 select-none shadow-md space-y-3"
                     [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg'">
                  
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-2.5 border-b"
                       [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                    <!-- Info Principal Guarulhos & Turno -->
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <span class="material-icons text-emerald-400 text-lg">{{ currentWeatherOverview().icon }}</span>
                      </div>
                      
                      <div class="flex flex-col min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-black uppercase tracking-wide text-emerald-500 flex items-center gap-0.5">
                            <span class="material-icons text-xs">location_on</span> Previsão do Tempo • Guarulhos (Base)
                          </span>
                          <span class="text-xs font-black font-mono" [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">
                            {{ currentWeatherOverview().temp }}
                          </span>
                          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            • {{ currentWeatherOverview().condition }}
                          </span>
                          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-0.5">
                            <span class="material-icons text-[10px]">water_drop</span> {{ currentWeatherOverview().rainProb }}% Chuva
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Filtros de Turno & Botões de Ação -->
                    <div class="flex items-center gap-1.5 overflow-x-auto py-1 md:py-0 shrink-0">
                      <!-- Primary Selector Tabs: Meu Turno & Hoje -->
                      <button (click)="weatherSelectedShift.set('AUTO'); selectedWeatherHourIdx.set(null)"
                              [class]="weatherSelectedShift() === 'AUTO' ? 'bg-emerald-500 text-white font-black border-emerald-400 shadow-sm' : (isLightTheme() ? 'bg-white text-slate-600 border-slate-200 hover:text-slate-900' : 'bg-[#071426] text-slate-400 border-[#10213b] hover:text-white')"
                              class="px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer outline-none whitespace-nowrap shadow-xs flex items-center gap-1">
                        <span class="material-icons text-[11px]">schedule</span>
                        Meu Turno
                      </button>

                      <button (click)="weatherSelectedShift.set('HOJE'); selectedWeatherHourIdx.set(null)"
                              [class]="weatherSelectedShift() === 'HOJE' ? 'bg-emerald-500 text-white font-black border-emerald-400 shadow-sm' : (isLightTheme() ? 'bg-white text-slate-600 border-slate-200 hover:text-slate-900' : 'bg-[#071426] text-slate-400 border-[#10213b] hover:text-white')"
                              class="px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer outline-none whitespace-nowrap shadow-xs flex items-center gap-1">
                        <span class="material-icons text-[11px]">today</span>
                        Hoje
                      </button>

                      <div class="h-4 w-px bg-[#10213b] mx-1"></div>

                      <!-- Refresh button -->
                      <button (click)="fetchWeatherForecast()"
                              [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900' : 'bg-[#071426] border-[#10213b] text-slate-400 hover:text-white'"
                              class="p-1 h-7 w-7 rounded-md border flex items-center justify-center cursor-pointer transition-all outline-none"
                              title="Atualizar Previsão">
                        <span class="material-icons text-xs" [class.animate-spin]="weatherLoading()">refresh</span>
                      </button>

                      <!-- Toggle Expand/Collapse -->
                      <button (click)="weatherExpanded.set(!weatherExpanded())"
                              [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900' : 'bg-[#071426] border-[#10213b] text-slate-400 hover:text-white'"
                              class="p-1 h-7 w-7 rounded-md border flex items-center justify-center cursor-pointer transition-all outline-none"
                              title="Expandir/Recolher Previsão Hora a Hora">
                        <span class="material-icons text-xs transition-transform" [class.rotate-180]="!weatherExpanded()">expand_less</span>
                      </button>
                    </div>
                  </div>

                  <!-- PAINEL DE PREVISÃO HORA A HORA DO TURNO (DE HORA EM HORA) -->
                  @if (weatherExpanded()) {
                    <div class="pt-2 border-t border-[#10213b]/60 animate-fade-in animate-duration-300">
                      @if (weatherLoading() && rawHourlyWeather().length === 0) {
                        <div class="flex items-center justify-center gap-2 py-4 text-xs text-slate-400 italic">
                          <span class="material-icons text-sm animate-spin text-emerald-400">sync</span>
                          Carregando previsão do tempo hora a hora para Guarulhos...
                        </div>
                      } @else {
                        <div class="flex flex-col gap-4 items-stretch">
                          
                          <!-- CARD DE DETALHES DE CLIMA NEON INTERATIVO -->
                          <div class="flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 relative overflow-hidden"
                               [class]="isLightTheme() ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#040c1a] border-[#0f1d3a] text-slate-200 shadow-[0_0_15px_rgba(236,72,153,0.05)]'">
                            
                            @if (activeWeatherItem(); as active) {
                              <div>
                                <!-- Header do Card -->
                                <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-700/20">
                                  <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Previsão Detalhada</span>
                                  <span class="w-1.5 h-1.5 rounded-full bg-[#ff007f] animate-ping"></span>
                                </div>

                                <!-- Grid de 2 Colunas (Esquerda: Data/Hora | Direita: Temperatura/Legenda) -->
                                <div class="grid grid-cols-2 gap-3 items-center py-1">
                                  
                                  <!-- Coluna da Esquerda: Data (24/07) e Hora (22:08) no tamanho da temperatura -->
                                  <div class="flex flex-col min-w-0">
                                    <span class="text-2xl font-black font-mono tracking-tighter text-cyan-400">
                                      {{ active.dateLabel.slice(0, 5) }}
                                    </span>
                                    <span class="text-2xl font-black font-mono tracking-tighter text-[#ff007f]">
                                      {{ active.timeLabel }}
                                    </span>
                                  </div>

                                  <!-- Coluna da Direita: Conjunto de Temperatura (Ícone, 14°C, Legenda) -->
                                  <div class="flex flex-col items-end justify-center text-right border-l border-slate-700/20 pl-3">
                                    <div class="flex items-center gap-2 justify-end">
                                      <!-- Ícone Animado Neon -->
                                      <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border relative transition-all duration-300"
                                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-gradient-to-br from-[#06152a] to-[#040c1a] border-[#0f1d3a] shadow-[0_0_10px_rgba(6,182,212,0.15)]'">
                                        <span class="material-icons text-lg relative z-10 animate-pulse"
                                              [class.text-amber-400]="active.icon === 'wb_sunny'"
                                              [class.text-indigo-300]="active.icon === 'nights_stay'"
                                              [class.text-slate-400]="active.icon === 'cloud' || active.icon === 'partly_cloudy_day'"
                                              [class.text-cyan-400]="active.icon === 'water_drop' || active.icon === 'umbrella' || active.icon === 'grain'"
                                              [class.text-amber-500]="active.icon === 'thunderstorm'">
                                          {{ active.icon }}
                                        </span>
                                        <!-- Neon Ring Background Glow -->
                                        <span class="absolute inset-0 rounded-xl opacity-20 blur-xs animate-pulse"
                                              [class.bg-amber-400]="active.icon === 'wb_sunny'"
                                              [class.bg-indigo-400]="active.icon === 'nights_stay'"
                                              [class.bg-cyan-400]="active.icon === 'water_drop' || active.icon === 'umbrella' || active.icon === 'grain'"></span>
                                      </div>

                                      <span class="text-2xl font-black font-mono tracking-tighter" [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">
                                        {{ active.temp }}°C
                                      </span>
                                    </div>

                                    <span class="text-xs font-black uppercase tracking-wide text-[#34d399] truncate mt-0.5">
                                      {{ active.conditionText }}
                                    </span>
                                  </div>

                                </div>
                              </div>
                            } @else {
                              <div class="flex flex-col items-center justify-center py-6 text-xs text-slate-500 italic">
                                Nenhuma previsão selecionada
                              </div>
                            }

                          </div>

                          <!-- GRÁFICO ESTILO CLIMA TEMPO COM CORES VIVAS NEON -->
                          <div class="flex flex-col justify-between p-3 rounded-2xl border transition-all duration-300 relative overflow-hidden"
                               [class]="isLightTheme() ? 'bg-slate-50/50 border-slate-200' : 'bg-[#030914] border-[#0f1d3a] shadow-[0_0_15px_rgba(6,182,212,0.05)]'">
                            
                            <!-- Header do Gráfico -->
                            <div class="flex items-center justify-between mb-2">
                              <div class="flex items-center gap-2">
                                <span class="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
                                <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Tendência do Clima (Guarulhos Base)</span>
                              </div>
                              <div class="flex items-center gap-3 text-[8px] font-bold uppercase tracking-wider text-slate-500">
                                <span class="flex items-center gap-1">
                                  <span class="w-2.5 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 inline-block rounded"></span> Temperatura
                                </span>
                                <span class="flex items-center gap-1">
                                  <span class="w-2.5 h-2 bg-gradient-to-t from-blue-600 to-cyan-400 inline-block rounded-xs"></span> Chuva %
                                </span>
                              </div>
                            </div>

                            <!-- Container do SVG com Scroll Lateral se necessário no mobile -->
                            <div class="w-full overflow-x-auto pb-1 custom-scrollbar">
                              <div class="min-w-[800px] xl:min-w-full">
                                <svg viewBox="0 0 1000 110" class="w-full h-auto select-none overflow-visible">
                                  <defs>
                                    <!-- Filtros de Neon Glow -->
                                    <filter id="neon-glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                                      <feGaussianBlur stdDeviation="3" result="blur" />
                                      <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                      </feMerge>
                                    </filter>
                                    <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                                      <feGaussianBlur stdDeviation="3" result="blur" />
                                      <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                      </feMerge>
                                    </filter>
                                    <!-- Gradientes -->
                                    <linearGradient id="temp-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stop-color="#ff7a00" />
                                      <stop offset="50%" stop-color="#ff007f" />
                                      <stop offset="100%" stop-color="#00f0ff" />
                                    </linearGradient>
                                    <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#ff007f" stop-opacity="0.1" />
                                      <stop offset="100%" stop-color="#00f0ff" stop-opacity="0" />
                                    </linearGradient>
                                    <linearGradient id="rain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.7" />
                                      <stop offset="100%" stop-color="#0066ff" stop-opacity="0.1" />
                                    </linearGradient>
                                  </defs>

                                  <!-- Linha Grid horizontal sutil -->
                                  <line x1="40" y1="90" x2="960" y2="90" [attr.stroke]="isLightTheme() ? '#e2e8f0' : '#1e293b'" stroke-width="1" />
                                  <line x1="40" y1="55" x2="960" y2="55" [attr.stroke]="isLightTheme() ? '#f1f5f9' : '#0f172a'" stroke-width="1" stroke-dasharray="4,4" />

                                  <!-- Gráfico de Área para Temperatura -->
                                  @if (weatherChartData().areaPath) {
                                    <path [attr.d]="weatherChartData().areaPath" fill="url(#area-grad)" />
                                  }

                                  <!-- Barras de Probabilidade de Chuva -->
                                  @for (pt of weatherChartData().points; track pt.index) {
                                    @if (pt.rainHeight > 1) {
                                      <rect [attr.x]="pt.x - 6"
                                            [attr.y]="pt.rainY"
                                            width="12"
                                            [attr.height]="pt.rainHeight"
                                            fill="url(#rain-grad)"
                                            rx="3"
                                            class="transition-all duration-300 hover:opacity-100 cursor-pointer"
                                            (mouseenter)="selectedWeatherHourIdx.set(pt.index)"
                                            (click)="selectedWeatherHourIdx.set(pt.index)" />
                                    }
                                  }

                                  <!-- Linha do Gráfico de Temperatura -->
                                  @if (weatherChartData().linePath) {
                                    <path [attr.d]="weatherChartData().linePath"
                                          fill="none"
                                          stroke="url(#temp-line-grad)"
                                          stroke-width="3"
                                          stroke-linecap="round"
                                          [attr.filter]="isLightTheme() ? 'none' : 'url(#neon-glow-orange)'" />
                                  }

                                  <!-- Linha Vertical de Guia Sutil no Hover / Seleção -->
                                  @if (selectedWeatherHourIdx() !== null) {
                                    <line [attr.x1]="weatherChartData().points[selectedWeatherHourIdx()!].x"
                                          y1="10"
                                          [attr.x2]="weatherChartData().points[selectedWeatherHourIdx()!].x"
                                          y2="90"
                                          [attr.stroke]="isLightTheme() ? '#cbd5e1' : '#00f0ff'"
                                          stroke-dasharray="3,3"
                                          stroke-width="1" />
                                  }

                                  <!-- Nós Interativos e Rótulos -->
                                  @for (pt of weatherChartData().points; track pt.index) {
                                    <!-- Círculo do Nó -->
                                    <circle [attr.cx]="pt.x"
                                            [attr.cy]="pt.y"
                                            [attr.r]="selectedWeatherHourIdx() === pt.index ? 5 : 3.5"
                                            [attr.fill]="selectedWeatherHourIdx() === pt.index ? '#ffffff' : '#ff007f'"
                                            [attr.stroke]="selectedWeatherHourIdx() === pt.index ? '#00f0ff' : '#ffffff'"
                                            [attr.stroke-width]="selectedWeatherHourIdx() === pt.index ? 2 : 1"
                                            class="cursor-pointer transition-all duration-200"
                                            (mouseenter)="selectedWeatherHourIdx.set(pt.index)"
                                            (click)="selectedWeatherHourIdx.set(pt.index)" />

                                    <!-- Texto da Temperatura acima do Nó -->
                                    <text [attr.x]="pt.x"
                                          [attr.y]="pt.y - 7"
                                          text-anchor="middle"
                                          class="text-[9px] font-black font-mono transition-all duration-300"
                                          [attr.fill]="selectedWeatherHourIdx() === pt.index ? (isLightTheme() ? '#0f172a' : '#00f0ff') : (isLightTheme() ? '#475569' : '#94a3b8')">
                                      {{ pt.temp }}°C
                                    </text>

                                    <!-- Ícone do Tempo no Meio -->
                                    <text [attr.x]="pt.x"
                                          y="18"
                                          text-anchor="middle"
                                          class="material-icons select-none font-normal cursor-pointer text-[15px]"
                                          style="font-family: 'Material Icons';"
                                          [attr.fill]="pt.item.icon === 'wb_sunny' ? '#ff9f00' : 
                                                       (pt.item.icon === 'nights_stay' ? '#818cf8' : 
                                                        (pt.item.icon === 'cloud' || pt.item.icon === 'partly_cloudy_day' ? '#22d3ee' : 
                                                         (pt.item.icon === 'water_drop' || pt.item.icon === 'umbrella' || pt.item.icon === 'grain' ? '#00f0ff' : 
                                                          (pt.item.icon === 'thunderstorm' ? '#f59e0b' : '#38bdf8'))))"
                                          (mouseenter)="selectedWeatherHourIdx.set(pt.index)"
                                          (click)="selectedWeatherHourIdx.set(pt.index)">
                                      {{ pt.item.icon }}
                                    </text>

                                    <!-- Horário na Base -->
                                    <text [attr.x]="pt.x"
                                          y="102"
                                          text-anchor="middle"
                                          class="text-[9px] font-black font-mono tracking-tighter"
                                          [attr.fill]="selectedWeatherHourIdx() === pt.index ? '#34d399' : (isLightTheme() ? '#64748b' : '#64748b')">
                                      {{ pt.item.timeLabel }}
                                    </text>
                                  }
                                </svg>
                              </div>
                            </div>

                            <!-- Rodapé de Instrução do Gráfico -->
                            <div class="mt-2 pt-1.5 border-t border-[#10213b]/40 flex items-center justify-between text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                              <span>Clique nos nós do gráfico para explorar as horas</span>
                              <span class="material-icons text-[10px] animate-pulse text-[#ff007f]">ads_click</span>
                            </div>
                          </div>

                        </div>
                      }
                    </div>
                  }
                </div>
              }

              </div>
              <!-- PORTAL GRID -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full">
                
                <!-- LEFT SIDEBAR: PROFILE MONITOR & STATS -->
                @if (activeSubTab() === 'portal' || activeSubTab() === 'indicadores') {
                <div class="lg:col-span-4 space-y-3.5">

                  <!-- CARD 1: MONITOR DE ESCALA -->
                  <div [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')">
                    <!-- HEADER -->
                    <div class="flex items-center pb-2 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                      <div class="flex items-center gap-2">
                        <span class="material-icons text-emerald-400 text-sm">query_stats</span>
                        <span [class]="'text-[13px] font-bold tracking-wide uppercase ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                          Status
                        </span>
                      </div>
                    </div>

                    <!-- STATUS DO DIA (100% WIDTH) -->
                    <div [class]="'rounded-xl p-3.5 flex items-center justify-between border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                      @if (seqStats.isWorking) {
                        <div class="flex items-center gap-2">
                          <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]"></span>
                          </span>
                          <span [class]="'text-[10px] font-black tracking-wider uppercase ' + (isLightTheme() ? 'text-slate-700' : 'text-[#F8FAFC]')">
                            TRABALHANDO HOJE
                          </span>
                        </div>
                        <span class="text-[10px] font-black px-2 py-0.5 rounded border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] uppercase tracking-wide font-mono">
                          ATIVO
                        </span>
                      } @else {
                        <div class="flex items-center gap-2">
                          <span class="relative flex h-2.5 w-2.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                          </span>
                          <span [class]="'text-[10px] font-black tracking-wider uppercase ' + (isLightTheme() ? 'text-slate-700' : 'text-[#F8FAFC]')">
                            DE FOLGA HOJE
                          </span>
                        </div>
                        <span class="text-[10px] font-black px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 uppercase tracking-wide font-mono">
                          DESCANSO
                        </span>
                      }
                    </div>

                    <!-- FEEDBACK COGNITIVO -->
                    <div [class]="'rounded-xl border p-3.5 flex gap-2.5 items-start transition-all duration-300 shadow-sm ' + getFeedbackCardClass(seqStats)">
                      @if (!seqStats.isWorking) {
                        <span class="material-icons text-base shrink-0 text-emerald-500 animate-bounce">celebration</span>
                      } @else if (seqStats.streak <= 2) {
                        <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      } @else {
                        <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                      }

                      <div class="flex flex-col min-w-0">
                        <span class="text-[11px] font-black uppercase tracking-wide font-sans leading-tight">
                          @if (!seqStats.isWorking) {
                            Boa Folga! 🎉
                          } @else if (seqStats.streak === 1) {
                            Bom Retorno
                          } @else if (seqStats.streak === 2) {
                            Bom Trabalho
                          } @else if (seqStats.streak === 3) {
                            Atenção
                          } @else if (seqStats.streak === 4) {
                            Alerta de Fadiga
                          } @else {
                            Alerta Máxima
                          }
                        </span>
                        <p class="text-[10px] opacity-90 leading-relaxed font-sans mt-0.5">
                          @if (!seqStats.isWorking) {
                            {{ getDescansoChargingState(logged).descText }}
                          } @else if (seqStats.streak === 1) {
                            Primeiro dia de retorno pós-folga. Energias renovadas!
                          } @else if (seqStats.streak === 2) {
                            Segundo dia de jornada. Ritmo produtivo e seguro.
                          } @else if (seqStats.streak === 3) {
                            Terceiro dia consecutivo. Fique atento aos sinais de cansaço.
                          } @else if (seqStats.streak === 4) {
                            Quarto dia consecutivo. Evite acúmulo de esforço.
                          } @else {
                            Ciclo estendido de trabalho de {{ seqStats.streak }} dias consecutivos. Redobre os cuidados!
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- CARD 2: INDICADORES DE JORNADA -->
                  <div [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')">
                    <!-- HEADER -->
                    <div class="flex items-center pb-2 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                      <div class="flex items-center gap-2">
                        <span class="material-icons text-emerald-400 text-sm">speed</span>
                        <span [class]="'text-[13px] font-bold tracking-wide uppercase ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                          Indicadores de Jornada
                        </span>
                      </div>
                    </div>

                    <!-- ENERGIA & CICLO (GRID DE 2 COLUNAS) -->
                    <div class="grid grid-cols-2 gap-3 w-full">
                      <!-- LADO ESQUERDO: SCORE DE ENERGIA -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col items-center justify-between text-center gap-1.5 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        <span class="text-[10px] font-bold tracking-wider uppercase text-slate-500 font-sans">Energia</span>
                        
                        <!-- Semicircular Gauge SVG -->
                        <div class="relative w-[90px] h-[45px] flex items-center justify-center shrink-0 mt-1">
                          <svg class="w-full h-full" viewBox="0 0 100 52">
                            <path d="M 12 48 A 38 38 0 0 1 20 28"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(1, logged)" />
                            <path d="M 22 26 A 38 38 0 0 1 38 15"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(2, logged)" />
                            <path d="M 41 14 A 38 38 0 0 1 59 14"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(3, logged)" />
                            <path d="M 62 15 A 38 38 0 0 1 78 26"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(4, logged)" />
                            <path d="M 80 28 A 38 38 0 0 1 87 48"
                                  fill="none"
                                  stroke-width="6"
                                  stroke-linecap="round"
                                  [style.stroke]="getArcStrokeColor(5, logged)" />
                          </svg>
                          <div class="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end">
                            <span [class]="'text-[14px] font-black font-mono leading-none ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                              {{ getEnergyPercent(seqStats, logged) }}%
                            </span>
                          </div>
                        </div>

                        <span class="text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider leading-none truncate max-w-full"
                              [class]="!seqStats.isWorking ? 
                                       (isLightTheme() ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/10') :
                                       (seqStats.streak === 1 ? (isLightTheme() ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/10') :
                                       (seqStats.streak === 2 ? (isLightTheme() ? 'text-blue-700 bg-blue-50 border border-blue-100' : 'text-blue-400 bg-blue-950/30 border border-blue-500/10') :
                                       (seqStats.streak === 3 ? (isLightTheme() ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-amber-400 bg-amber-950/30 border border-amber-500/10') :
                                       (seqStats.streak === 4 ? (isLightTheme() ? 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25' : 'text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/25') :
                                       (isLightTheme() ? 'text-rose-700 bg-rose-50 border border-rose-100' : 'text-rose-400 bg-rose-950/30 border border-rose-500/10')))))">
                          {{ seqStats.isWorking ? seqStats.fatigueLevel : getDescansoChargingState(logged).statusLabel }}
                        </span>
                      </div>

                      <!-- LADO DIREITO: RASTREADOR DE CICLO -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col items-center justify-between text-center gap-1.5 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        <span class="text-[10px] font-bold tracking-wider uppercase text-slate-500 font-sans">Ciclo</span>
                        
                        <div class="flex flex-col items-center justify-center my-0.5">
                          <div class="flex items-baseline gap-0.5">
                            <span [class]="'text-2xl font-black font-mono leading-none ' + 
                                           (!seqStats.isWorking ? 'text-emerald-400' : 
                                           (seqStats.streak === 1 ? 'text-emerald-400' :
                                           (seqStats.streak === 2 ? 'text-blue-400' :
                                           (seqStats.streak === 3 ? 'text-amber-400' :
                                           (seqStats.streak === 4 ? 'text-orange-500' : 'text-rose-500')))))">
                              {{ seqStats.isWorking ? seqStats.streak : 0 }}
                            </span>
                            <span class="text-[10px] text-slate-500 font-bold font-mono">/{{ seqStats.totalStreak || 0 }}</span>
                          </div>
                          <span class="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-1 font-sans">DIAS TRAB.</span>
                        </div>

                        <!-- Progress Dots -->
                        <div class="flex items-center justify-center gap-1 w-full px-0.5 py-0.5">
                          @for (i of getArray(seqStats.totalStreak); track i) {
                            <div class="h-1 w-2.5 rounded-full transition-all duration-300"
                                 [style.background-color]="getBarColor(i, seqStats.streak, seqStats.isWorking)"></div>
                          }
                        </div>
                      </div>
                    </div>

                    <!-- RADAR & PROXIMA FOLGA (GRID DE 2 COLUNAS) -->
                    <div class="grid grid-cols-2 gap-3 w-full">
                      <!-- LADO ESQUERDO: RADAR DE FOLGAS -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col items-center justify-center text-center gap-1 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        @if (cdState.showCountdown && !offStats.isOffToday) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-amber-500 font-sans">Folga em</span>
                          <span class="text-[14px] font-black text-amber-500 tracking-tight leading-none font-mono my-0.5 animate-pulse">
                            {{ cdState.countdownText }}
                          </span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Resta no turno</span>
                        } @else if (offStats.isOffToday) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-emerald-500/70 font-sans">Hoje</span>
                          <span class="text-[14px] font-black text-emerald-500 tracking-tight leading-none my-0.5 animate-pulse">Folgando</span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Aproveite!</span>
                        } @else if (offStats.days === 999) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans">Escala</span>
                          <span class="text-[13px] font-black text-rose-500 tracking-tight leading-none my-0.5">Sem Folga</span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Neste mês</span>
                        } @else {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans">
                            {{ offStats.days === 1 ? 'Falta' : 'Faltam' }}
                          </span>
                          <span class="text-[14px] font-black text-[#F59E0B] tracking-tight leading-none font-mono my-0.5">
                            {{ offStats.days === 1 ? '1 dia' : offStats.days + ' dias' }}
                          </span>
                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase leading-none">Até a folga</span>
                        }
                      </div>

                      <!-- LADO DIREITO: PROXIMAS FOLGAS -->
                      <div [class]="'rounded-[12px] p-3 flex flex-col justify-between gap-1 border transition-all duration-300 ' + (isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#1E293B] border-[#334155]')">
                        @if (offStats.isOffToday) {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans text-center">RETORNO</span>
                          
                          <div class="flex items-center justify-center my-0.5">
                            <span [class]="'font-mono font-black px-1 py-0.5 rounded text-[10px] leading-none min-w-[18px] h-[18px] flex items-center justify-center border ' + 
                                          (isLightTheme() ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30')">
                              {{ getReturnDayNumber(logged) }}
                            </span>
                          </div>

                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase truncate leading-none text-center block mt-0.5">
                            {{ currentMonthName() | uppercase }}
                          </span>
                        } @else {
                          <span class="text-[9px] font-bold tracking-wider uppercase text-slate-500 font-sans text-center">PRÓXIMAS FOLGAS</span>
                          
                          <div class="flex items-center justify-center gap-1 my-0.5">
                            @if (offStats.nextOffDays.length > 0) {
                              <div class="flex flex-wrap justify-center gap-1">
                                @for (day of offStats.nextOffDays.slice(0, 3); track day) {
                                  <span class="font-mono font-black text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-1 py-0.5 rounded text-[10px] leading-none min-w-[18px] h-[18px] flex items-center justify-center">
                                    {{ day }}
                                  </span>
                                }
                              </div>
                            } @else {
                              <span class="text-[9px] text-slate-500 italic">Nenhuma</span>
                            }
                          </div>

                          <span class="text-[8px] text-slate-500 font-bold tracking-wider uppercase truncate leading-none text-center block mt-0.5">
                            {{ currentMonthName() | uppercase }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                }
                
                <!-- MIDDLE/RIGHT CONTENT (8 COLUMNS) -->
                @if (activeSubTab() === 'portal' || activeSubTab() === 'escala') {
                <div class="lg:col-span-8 space-y-3">
                  
                  <div id="panel-trabalho-folga" [class]="'w-full border rounded-[16px] p-5 space-y-5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')" [class.hidden]="activeSubTab() !== 'escala'">
                  
                  <!-- HEADER / TABS (SPLIT 50% / 50%) -->
                  <div id="trabalho-folga-header" class="w-full pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-emerald-500 text-lg">calendar_today</span>
                      <h3 class="text-sm sm:text-base font-black uppercase tracking-wider" [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">Minha Escala</h3>
                    </div>
                    <div class="grid grid-cols-2 w-full sm:max-w-xs p-1.5 rounded-2xl" [class]="isLightTheme() ? 'bg-slate-100' : 'bg-[#0b1329]'">
                      <button id="btn-tab-trabalho" (click)="setTurnVacationTab('work')"
                              class="w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                              [class]="turnVacationTab() === 'work' ? (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 shadow-lg') : (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                        <span class="material-icons text-sm font-bold">calendar_month</span>
                        Trabalho
                      </button>
                      <button id="btn-tab-folga" (click)="setTurnVacationTab('vacation')"
                              class="w-full py-3.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                              [class]="turnVacationTab() === 'vacation' ? (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-amber-500 text-amber-950 shadow-lg') : (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                        <span class="material-icons text-sm">beach_access</span>
                        Folgas
                      </button>
                    </div>
                  </div>

                  <!-- Tab: Dias de Trabalho -->
                  @if (turnVacationTab() === 'work') {
                    <div class="space-y-5">
                      
                      <!-- GRID OF WORK DAYS -->
                      <div id="section-calendar-work" class="p-4 border rounded-xl transition-all duration-300" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#071426]/40 border-[#10213b]'">
                        <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/10 mb-3" [class.border-slate-200]="isLightTheme()">
                          <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Minha Escala Selecionada</span>
                            @if (getLoggedCollab()) {
                              <span class="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm"
                                    [class]="isLightTheme() ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'">
                                {{ getLoggedCollab()!.shift }}
                              </span>
                            }
                          </div>
                          <div class="flex items-center gap-2">
                            <!-- Toggle button -->
                            <button (click)="hidePastDays.set(!hidePastDays())"
                                    class="flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                    [class]="!hidePastDays() ? 
                                             (isLightTheme() ? 'bg-emerald-600 text-white border-emerald-600 font-bold' : 'bg-emerald-500 text-emerald-950 border-emerald-500 font-black') : 
                                             (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-[#F8FAFC]')">
                              <span class="material-icons text-[10px]">{{ !hidePastDays() ? 'visibility' : 'visibility_off' }}</span>
                              Concluídos
                            </button>
                            <span class="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">{{ getFilteredCollabWorkDays(logged).length }} Ativos</span>
                          </div>
                        </div>
                        <div class="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                          @for (day of getFilteredCollabWorkDays(logged); track day) {
                            @let isSel = day === selectedCalendarDay();
                            <div (click)="selectedCalendarDay.set(day)"
                                 [id]="'work-day-' + day"
                                 class="p-2 border rounded-lg text-center select-none cursor-pointer transition-all hover:scale-105 shadow-sm"
                                 [class]="isSel ? (isLightTheme() ? 'bg-emerald-600 border-emerald-600 text-white font-bold ring-2 ring-emerald-500/20' : 'bg-emerald-500 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400/30') : 
                                                 (isPastDay(day) ? (isLightTheme() ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40' : 'bg-slate-900/30 border-slate-800/40 text-slate-600 opacity-40') : 
                                                                   (isToday(day) ? 'bg-emerald-500/40 border-emerald-400 text-white font-bold' : (isLightTheme() ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300' : 'bg-emerald-950/10 border-emerald-500/10 text-emerald-300 hover:border-emerald-500/30')))">
                              <span class="text-[11px] font-mono font-black block leading-none">{{ day < 10 ? '0' + day : day }}</span>
                              <span class="text-[6.5px] font-black uppercase tracking-wider block mt-1 opacity-70">{{ getDayOfWeekLabel(day) }}</span>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  }

                  <!-- Tab: Folgas -->
                  @if (turnVacationTab() === 'vacation') {
                    <div class="space-y-5">
                      
                      <!-- GRID OF VACATION DAYS -->
                      <div id="section-calendar-vacation" class="p-4 border rounded-xl transition-all duration-300" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#071426]/40 border-[#10213b]'">
                        <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/10 mb-3" [class.border-slate-200]="isLightTheme()">
                          <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Meus Dias de Folga</span>
                          <div class="flex items-center gap-2">
                            <!-- Toggle button -->
                            <button (click)="hidePastDays.set(!hidePastDays())"
                                    class="flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                    [class]="!hidePastDays() ? 
                                             (isLightTheme() ? 'bg-amber-600 text-white border-amber-600 font-bold' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                             (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-[#F8FAFC]')">
                              <span class="material-icons text-[10px]">{{ !hidePastDays() ? 'visibility' : 'visibility_off' }}</span>
                              Concluídos
                            </button>
                            <span class="text-[9px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">{{ getFilteredCollabOffDays(logged).length }} Folgas</span>
                          </div>
                        </div>
                        <div class="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                          @for (day of getFilteredCollabOffDays(logged); track day) {
                            @let isSel = day === selectedCalendarDay();
                            <div (click)="selectedCalendarDay.set(day)"
                                 [id]="'vacation-day-' + day"
                                 class="p-2 border rounded-lg text-center select-none cursor-pointer transition-all hover:scale-105 shadow-sm"
                                 [class]="isSel ? (isLightTheme() ? 'bg-amber-600 border-amber-600 text-white font-bold ring-2 ring-amber-500/20' : 'bg-amber-500 border-amber-500 text-amber-950 font-black ring-2 ring-amber-400/30') : 
                                                 (isPastDay(day) ? (isLightTheme() ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40' : 'bg-slate-900/30 border-slate-800/40 text-slate-600 opacity-40') : 
                                                                   (isToday(day) ? 'bg-amber-500/40 border-amber-400 text-white font-bold' : (isLightTheme() ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300' : 'bg-amber-950/10 border-amber-500/10 text-amber-300 hover:border-amber-500/30')))">
                              <span class="text-[11px] font-mono font-black block leading-none">{{ day < 10 ? '0' + day : day }}</span>
                              <span class="text-[6.5px] font-black uppercase tracking-wider block mt-1 opacity-70">{{ getDayOfWeekLabel(day) }}</span>
                            </div>
                          }
                        </div>
                      </div>

                      <!-- CO-WORKERS ON VACATION IN GRID (QUADRADINHO) -->
                      <div id="section-coworkers-vacation" class="p-4 border rounded-xl transition-all" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200' : 'bg-[#071426]/40 border-[#10213b]'">
                        <div class="flex items-center justify-between pb-2.5 border-b border-slate-100/10 mb-3" [class.border-slate-200]="isLightTheme()">
                          <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Colegas de Folga Hoje / Dia {{ selectedCalendarDay() }}</span>
                          <span class="text-[9px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">{{ getCollaboratorsOnVacationForDay(selectedCalendarDay()).length }} Folgas</span>
                        </div>

                        <!-- FILTER SELECTOR PILLS -->
                        <div class="flex flex-wrap items-center gap-1.5 mb-3.5">
                          <button (click)="coworkersFilter.set('MEU_TURNO')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'MEU_TURNO' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Meu Turno ({{ logged.shift || 'N/A' }})
                          </button>
                          <button (click)="coworkersFilter.set('OUTROS')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'OUTROS' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Outros Turnos
                          </button>
                          <button (click)="coworkersFilter.set('MANHA_TARDE')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'MANHA_TARDE' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Manhã e Tarde
                          </button>
                          <button (click)="coworkersFilter.set('TODOS')"
                                  class="px-2.5 py-1 rounded border text-[8.5px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm select-none"
                                  [class]="coworkersFilter() === 'TODOS' ? 
                                           (isLightTheme() ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-500 text-amber-950 border-amber-500 font-black') : 
                                           (isLightTheme() ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-800' : 'bg-[#0b1329]/40 border-[#10213b] text-slate-400 hover:text-white')">
                            Todos
                          </button>
                        </div>

                        @let vacs = getCollaboratorsOnVacationForDay(selectedCalendarDay());
                        @if (vacs.length > 0) {
                          <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 gap-2">
                            @for (col of vacs; track col.id) {
                              <div [id]="'coworker-vacation-' + col.id"
                                   class="flex flex-col items-center p-1.5 rounded-[14px] border transition-all duration-300 shadow-sm text-center select-none"
                                   [class]="isLightTheme() ? 'bg-white border-slate-200/80 text-slate-800' : 'bg-[#0b1329]/70 border-[#10213b] text-[#F8FAFC]'">
                                
                                <div class="w-full aspect-square rounded-[10px] overflow-hidden border shrink-0 transition-all duration-300"
                                     [class]="isLightTheme() ? 'border-slate-200/60 bg-slate-50' : 'border-[#10213b] bg-slate-900/40'">
                                  <img [src]="getCollabPhoto(col)" [alt]="col.name" referrerpolicy="no-referrer" class="w-full h-full object-cover">
                                </div>

                                <div class="text-[9px] font-black tracking-wide truncate w-full mt-1.5 leading-tight"
                                     [class]="col.id === logged.id ? (isLightTheme() ? 'text-emerald-650' : 'text-emerald-400') : (isLightTheme() ? 'text-slate-700' : 'text-slate-300')">
                                  {{ col.name }}
                                </div>
                              </div>
                            }
                          </div>
                        } @else {
                          <div class="text-center py-4 text-[10px] text-slate-500 uppercase tracking-wider">Ninguém em folga neste dia</div>
                        }
                      </div>
                    </div>
                  }

                </div>
              </div>
                }

                <!-- LEFT COLUMN: FOLGAS SOLICITADAS & DATAS IMPORTANTES -->
                @if (activeSubTab() === 'perfil') {
                <div class="lg:col-span-12 lg:col-span-8 lg:col-start-3 space-y-3.5">

                  <!-- SECTION: INFORMAÇÕES DO PERFIL -->
                  <div class="rounded-[16px] p-4 space-y-4 transition-colors border"
                       [class]="isLightTheme() ? 'bg-white border-slate-200 shadow-md text-slate-900' : 'bg-[#030a14] border-[#10213b]/60 shadow-lg text-white'">
                    <div class="flex items-center justify-between pb-1.5 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#10213b]/30'">
                      <h4 class="font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
                          [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                        <span class="material-icons text-emerald-400 text-sm">person</span>
                        Meu Perfil
                      </h4>
                      <span class="text-[7.5px] font-black font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 transition-colors"
                            [class]="isLightTheme() ? 'text-slate-650 bg-slate-100 border-slate-200' : 'text-slate-300 bg-[#071426] border-[#10213b]/40'">
                        {{ logged.id }}
                      </span>
                    </div>

                    <!-- Profile Photo & Header Details -->
                    <div class="flex items-center justify-between gap-3">
                      <div class="flex items-center gap-3 min-w-0 flex-1">
                        <div class="relative w-14 h-14 rounded-full overflow-hidden border shrink-0 shadow-sm"
                             [class]="isLightTheme() ? 'border-slate-200 bg-slate-50' : 'border-[#10213b]/40 bg-slate-900'">
                          <img [src]="getCollabPhoto(logged)"
                               [alt]="logged.name"
                               class="w-full h-full object-cover"
                               referrerpolicy="no-referrer">
                        </div>
                        <div class="min-w-0 flex-1">
                          <h3 class="text-xs font-black uppercase tracking-wide truncate"
                              [class]="isLightTheme() ? 'text-slate-850' : 'text-slate-100'">
                            {{ logged.name }}
                          </h3>
                          <span class="inline-block mt-0.5 px-2 py-0.5 rounded text-[7.5px] font-black uppercase tracking-wider leading-none border"
                                [class]="isLightTheme() ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-emerald-950/30 text-emerald-400 border-emerald-500/25'">
                            {{ logged.role === 'SUPERVISOR' ? 'ADMIN' : logged.role === 'LIDER' ? 'LÍDER DE TURNO' : 'COLABORADOR' }}
                          </span>
                        </div>
                      </div>

                      <!-- Edit Profile Trigger Button (Moved here to save space) -->
                      <button (click)="isProfileEditOpen.set(!isProfileEditOpen())"
                              class="px-2.5 py-1.5 font-black text-[9px] uppercase rounded-lg cursor-pointer transition-all duration-200 border-none outline-none flex items-center justify-center gap-1 shadow-sm active:scale-95 shrink-0"
                              [class]="isProfileEditOpen() ? 
                                       (isLightTheme() ? 'bg-slate-150 text-slate-750 hover:bg-slate-200' : 'bg-[#10213b]/80 text-slate-300 hover:bg-[#10213b]') : 
                                       (isLightTheme() ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950')">
                        <span class="material-icons text-[10px]">{{ isProfileEditOpen() ? 'close' : 'edit' }}</span>
                        <span>{{ isProfileEditOpen() ? 'Fechar' : 'Editar' }}</span>
                      </button>
                    </div>

                    <!-- Profile Details Grid -->
                    <div class="grid grid-cols-2 gap-2 text-[9px] font-sans">
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Setor</span>
                        <span class="font-black uppercase truncate">
                          {{ logged.sector || 'Geral' }}
                        </span>
                      </div>
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Turno</span>
                        <span class="font-black uppercase truncate text-emerald-500">
                          {{ logged.shift }}
                        </span>
                      </div>
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Nascimento</span>
                        <span class="font-black font-mono truncate">
                          {{ formatBirthday(logged.birthday) }}
                        </span>
                      </div>
                      <div class="p-2.5 rounded-lg border flex flex-col justify-between"
                           [class]="isLightTheme() ? 'bg-slate-50 border-slate-100/60 text-slate-800' : 'bg-[#071426]/30 border-[#10213b]/20 text-slate-200'">
                        <span class="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Telefone</span>
                        <span class="font-black font-mono truncate font-sans">
                          {{ logged.phone || 'Não informado' }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- SECTION: FOLGAS SOLICITADAS -->
                <div class="rounded-[16px] p-4 space-y-3 transition-colors"
                     [class]="isLightTheme() ? 'bg-white border border-slate-200 shadow-md' : 'bg-[#030a14] border border-[#10213b] shadow-lg'">
                  <div class="flex items-center justify-between pb-1 border-b border-[#10213b]/40">
                    <h4 class="font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
                        [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                      <span class="material-icons text-[#10b981] text-[13px]">nights_stay</span>
                      Folgas Solicitadas
                    </h4>
                    <span class="text-[8px] font-bold font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0">
                      {{ getRequestedFolgasForCollab(logged).length }}/3
                    </span>
                  </div>
                  <p class="text-[9px] text-slate-500 leading-tight">
                    Próximo mês "{{ monthsList[(selectedMonthIndex() + 1) % 12].name }}"
                  </p>

                  <div class="grid grid-cols-1 gap-2">
                    @for (item of getFolgaRequestSlots(logged); track item.id) {
                      @if (!item.isEmpty) {
                        <div class="h-[42px] px-2 border rounded-lg flex justify-center items-center gap-1.5 transition-all duration-200"
                             [class.bg-[#030a14]/60]="!isLightTheme()"
                             [class.border-[#10213b]]="!isLightTheme()"
                             [class.bg-white]="isLightTheme()"
                             [class.border-slate-200]="isLightTheme()">
                          <span class="text-[10px] font-black text-slate-500 uppercase tracking-wide leading-none">
                            {{ getDayOfWeekLabel(item.day) }} -
                          </span>
                          <span class="text-[12px] font-black uppercase tracking-wide leading-none"
                                [class]="isLightTheme() ? 'text-slate-900' : 'text-slate-100'">
                            {{ item.formattedDate }}
                          </span>
                        </div>
                      } @else {
                        <button (click)="openSolicitarFolgaModal()" class="h-[42px] px-2 border border-dashed border-[#10213b]/60 rounded-lg flex justify-center items-center gap-1.5 transition-all duration-200 hover:bg-[#10213b]/30 cursor-pointer w-full"
                             [class.bg-slate-900/10]="!isLightTheme()"
                             [class.bg-slate-50]="isLightTheme()">
                          <span class="material-icons text-[14px] text-slate-500">add</span>
                          <span class="text-[10px] font-black text-slate-500 uppercase tracking-wide leading-none">
                            Solicitar
                          </span>
                        </button>
                      }
                    }
                  </div>
                </div>

                <!-- SECTION: TROCAS DE TURNO (PERMUTAS) -->
                <div class="rounded-[16px] p-4 space-y-3 transition-colors"
                     [class]="isLightTheme() ? 'bg-white border border-slate-200 shadow-md' : 'bg-[#030a14] border border-[#10213b] shadow-lg'">
                  <div class="flex items-center gap-1.5 pb-1 border-b border-[#10213b]/40">
                    <span class="material-icons text-blue-400 text-sm">swap_horiz</span>
                    <h4 class="font-black text-xs uppercase tracking-wider"
                        [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                      Trocas de Turno (Permutas)
                    </h4>
                  </div>
                  
                  <p class="text-[9px] text-slate-500 leading-tight">
                    Deseja trocar um dia de trabalho com um colega? Escolha uma data no calendário de escala para propor uma troca.
                  </p>

                  <button (click)="activeSubTab.set('escala')" 
                          class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 transition-all cursor-pointer text-[10px] font-black uppercase tracking-wider">
                    <span class="material-icons text-xs">calendar_today</span>
                    Ver Calendário para Troca
                  </button>
                </div>

                <!-- SECTION: MINHAS DATAS IMPORTANTES -->
                <div (click)="openEditSpecialDates()" [class.hidden]="isMobile() && activeSubTab() !== 'perfil'"
                     class="rounded-[16px] p-4 space-y-3 cursor-pointer select-none hover:border-rose-500/30 transition-colors relative group"
                     [class]="isLightTheme() ? 'bg-white border border-slate-200 shadow-md' : 'bg-[#030a14] border border-[#10213b] shadow-xl'"
                     title="Clique para editar suas datas importantes">
                  <div class="absolute inset-0 bg-rose-500/0 group-active:bg-rose-500/5 transition-colors duration-300 rounded-lg pointer-events-none"></div>
                  <div class="flex items-center justify-between pb-1 border-b border-[#10213b]/40">
                    <h4 class="font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
                        [class]="isLightTheme() ? 'text-slate-800' : 'text-slate-100'">
                      <span class="material-icons text-rose-500 text-sm">favorite</span>
                      Minhas Datas Importantes
                    </h4>
                    <div class="flex items-center gap-1.5">
                      <span class="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded shrink-0 transition-colors"
                            [class]="isLightTheme() ? 'text-rose-600 bg-rose-100 border border-rose-200' : 'text-rose-400 bg-rose-950/40 border border-rose-500/20'">
                        {{ getImportantDatesForCollab(logged).length }} Registros
                      </span>
                      <span class="material-icons text-xs text-slate-400 group-hover:text-rose-400 transition-colors">edit</span>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 gap-2">
                    @for (item of getImportantDatesForCollab(logged); track item.rawDate) {
                      <div class="pl-3 border rounded-lg flex items-stretch justify-between transition-all duration-200 overflow-hidden"
                           [class]="isLightTheme() ? 'border-slate-200 bg-white' : 'border-[#10213b]/60 bg-[#030a14]/60'"
                           [class.border-rose-500/30]="item.isBirthday"
                           [class.bg-rose-950/10]="item.isBirthday && !isLightTheme()"
                           [class.bg-rose-50/60]="item.isBirthday && isLightTheme()"
                           [class.shadow-[inset_0_0_15px_rgba(244,63,94,0.05)]]="item.isBirthday">
                        
                        <!-- Left Part (~70% width): Icon and text labels -->
                        <div class="flex items-center gap-2.5 flex-1 min-w-0 py-2.5 pr-3">
                          <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border" [class]="item.color">
                            <span class="material-icons text-[14px]">{{ item.icon }}</span>
                          </div>
                          
                          <div class="flex-1 min-w-0 flex flex-col justify-center text-left">
                            <div class="flex items-center justify-between gap-1.5 mb-0.5 w-full">
                              <span class="text-[10px] font-black truncate leading-none uppercase tracking-wide"
                                    [class]="isLightTheme() ? 'text-slate-900' : 'text-slate-100'">
                                {{ item.label }}
                              </span>
                              @if (item.priorityLabel) {
                                <span class="px-1.5 py-0.5 rounded-md text-[8px] font-black font-mono leading-none tracking-wide shrink-0 shadow-sm border"
                                      [class]="isLightTheme() ? 'bg-slate-100 text-slate-800 border-slate-200/80' : 'bg-[#1e293b]/80 text-[#F8FAFC] border-[#334155]/60'">
                                  {{ item.priorityLabel }}
                                </span>
                              }
                            </div>
                            <span class="text-[7.5px] block truncate leading-none mt-1"
                                  [class]="isLightTheme() ? 'text-slate-500' : 'text-slate-400'">
                              {{ item.details }}
                            </span>
                          </div>
                        </div>
                        
                        <!-- Right Part (~30% width): Day on top, Month name below with custom styling -->
                        <div class="w-[30%] max-w-[62px] flex flex-col items-center justify-center shrink-0 py-2 px-1 text-center"
                             [class]="item.isBirthday ? 
                                      (isLightTheme() ? 'bg-rose-50/60 border-l border-rose-100' : 'bg-rose-500/10 border-l border-rose-500/10') : 
                                      (isLightTheme() ? 'bg-slate-50/60 border-l border-slate-200/60' : 'bg-[#10213b]/30 border-l border-[#10213b]/20')">
                          <span class="text-[14px] font-black tracking-tighter leading-none"
                                [class]="item.isBirthday ? 
                                         (isLightTheme() ? 'text-rose-600' : 'text-rose-400') : 
                                         (isLightTheme() ? 'text-slate-800' : 'text-white')">
                            {{ item.day }}
                          </span>
                          <span class="text-[8px] font-black uppercase tracking-wider mt-1 leading-none"
                                [class]="item.isBirthday ? 
                                         (isLightTheme() ? 'text-rose-600' : 'text-rose-400') : 
                                         (isLightTheme() ? 'text-emerald-600' : 'text-emerald-400')">
                            {{ item.monthLabel }}
                          </span>
                        </div>
                        
                      </div>
                    } @empty {
                      <div class="py-4 text-center rounded-lg border border-dashed border-[#10213b]/40 bg-slate-900/10 flex flex-col items-center justify-center gap-1 w-full">
                        <span class="material-icons text-base text-slate-500">cake</span>
                        <span class="text-[8px] font-bold uppercase tracking-wider text-slate-500">Nenhuma data especial cadastrada</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- SECTION: EDITAR PERFIL -->
                <div [class.hidden]="(isMobile() && activeSubTab() !== 'perfil') || !isProfileEditOpen()"
                     [class]="'rounded-lg p-3.5 space-y-3 transition-colors border ' + (isLightTheme() ? 'bg-white border-slate-200 shadow-sm text-slate-900' : 'bg-[#030a14] border-[#10213b]/60 shadow-xl text-white')">
                  <div class="flex items-center pb-2 border-b border-[#10213b]/30">
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-emerald-400 text-sm">manage_accounts</span>
                      <h4 class="font-black text-xs uppercase tracking-wider"
                          [class]="isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]'">
                        Editar Perfil
                      </h4>
                    </div>
                  </div>

                  <div class="space-y-3">
                    <!-- Foto de Perfil com Crop Trigger -->
                    <div class="flex flex-col items-center justify-center pb-2">
                      <div (click)="profilePhotoCropInput.click()"
                           title="Clique para alterar e recortar sua foto de perfil"
                           class="relative w-16 h-16 rounded-full overflow-hidden border-2 shrink-0 shadow-md cursor-pointer group transition-all duration-200 hover:scale-105 active:scale-95 border-emerald-500/60 bg-slate-100 hover:border-emerald-600">
                        
                        <img [src]="getCollabPhoto(logged)"
                             [alt]="logged.name"
                             class="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-200"
                             referrerpolicy="no-referrer">

                        <!-- Overlay Hover -->
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200">
                          <span class="material-icons text-base">photo_camera</span>
                          <span class="text-[8px] font-black uppercase tracking-tight">Alterar</span>
                        </div>

                        <!-- Borda inferior indicando crop -->
                        <div class="absolute bottom-0 inset-x-0 bg-emerald-600/90 py-0.5 text-center text-white text-[8px] font-bold flex items-center justify-center gap-0.5">
                          <span class="material-icons text-[10px]">crop</span>
                        </div>
                      </div>

                      <!-- Input File Oculto -->
                      <input type="file" #profilePhotoCropInput class="hidden" accept="image/*" (change)="onProfilePhotoSelectedForCrop($event)">
                      <span class="text-[9px] font-medium text-slate-400 mt-1">Clique para recortar e alterar foto</span>
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Nome Completo</label>
                      <input type="text" [value]="logged.name" #newNameInput
                             class="bg-[#030a14] border border-[#10213b]/40 text-white text-[11px] px-3 py-2 rounded-lg w-full outline-none focus:border-emerald-500 font-sans"
                             [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()" [class.text-slate-900]="isLightTheme()">
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Data de Nascimento</label>
                      <input type="date" [value]="logged.birthday" #newBirthdayInput
                             class="bg-[#030a14] border border-[#10213b]/40 text-white text-[11px] px-3 py-2 rounded-lg w-full outline-none focus:border-emerald-500 font-mono"
                             [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()" [class.text-slate-900]="isLightTheme()">
                    </div>

                    <div class="flex flex-col gap-1">
                      <label class="text-[9px] font-black uppercase text-slate-400 tracking-wider">Telefone de Contato</label>
                      <input type="text" [value]="logged.phone || ''" #newPhoneInput placeholder="(00) 00000-0000"
                             class="bg-[#030a14] border border-[#10213b]/40 text-white text-[11px] px-3 py-2 rounded-lg w-full outline-none focus:border-emerald-500 font-mono"
                             [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()" [class.text-slate-900]="isLightTheme()">
                    </div>

                    <button (click)="saveProfileChanges(logged, newNameInput.value, newBirthdayInput.value, newPhoneInput.value)"
                            class="w-full text-center py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-[10px] uppercase rounded-lg cursor-pointer transition-colors border-none outline-none flex items-center justify-center gap-1.5 shadow-md active:scale-95">
                      <span class="material-icons text-xs">save</span>
                      Salvar Alterações
                    </button>
                  </div>
                </div>

              </div>
                }

              <!-- RIGHT COLUMN: MONTHLY CALENDAR -->
              @if (activeSubTab() === 'escala') {
              <div class="lg:col-span-12 space-y-3">
                
                <!-- PORTAL COLLABORATOR OFFICIAL REPORT & MONTHLY SCALE (Prontuário) -->
                <div [class]="'border rounded-xl p-2 sm:p-3.5 shadow-md space-y-3 sm:space-y-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#030a14] border-[#10213b] text-white shadow-lg')">

                    <!-- Calendário de Escala de Folgas -->
                    <div class="space-y-4">
                      <div class="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <h4 class="font-black text-xs uppercase tracking-wider flex items-center gap-1.5"
                              [class]="isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]'">
                            <span class="material-icons text-[#10b981] text-sm">calendar_month</span>
                            Escala de Folgas do Mês
                          </h4>
                          <p class="text-[9px] text-slate-500 mt-1" [class.text-slate-500]="isLightTheme()">
                            Legenda: Verde (FOLGA), Vermelho (AUSENTE), Azul (TRABALHO).
                          </p>
                        </div>
                        
                        <!-- Month Navigator -->
                        <div class="flex items-center gap-1 bg-[#071426] border border-[#10213b] rounded-lg p-1"
                             [class.bg-slate-100]="isLightTheme()"
                             [class.border-slate-200]="isLightTheme()">
                          <button (click)="prevMonth()" class="w-8 h-8 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                                  [class.hover:bg-white]="isLightTheme()"
                                  title="Mês Anterior">
                            <span class="material-icons text-sm">chevron_left</span>
                          </button>
                          <div class="flex flex-col items-center justify-center min-w-[100px]">
                            <span class="text-[9px] font-black uppercase text-slate-300 leading-tight"
                                  [class.text-slate-700]="isLightTheme()">
                              {{ currentMonthName() }}
                            </span>
                            <span class="text-[7px] font-bold text-slate-500 font-mono leading-tight">
                              {{ currentYear() }}
                            </span>
                          </div>
                          <button (click)="nextMonth()" class="w-8 h-8 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                                  [class.hover:bg-white]="isLightTheme()"
                                  title="Próximo Mês">
                            <span class="material-icons text-sm">chevron_right</span>
                          </button>
                        </div>
                      </div>

                      <!-- Grade de Dias do Calendário -->
                      <div class="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs">
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Dom</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Seg</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Ter</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Qua</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Qui</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Sex</div>
                        <div class="font-black text-slate-500 text-[7px] sm:text-[8px] uppercase tracking-wider">Sáb</div>

                        @for (offset of getOffsetDaysArray(); track offset) {
                          <div class="bg-transparent border border-transparent p-1.5 sm:p-2"></div>
                        }

                        @for (day of daysInMonth(); track day) {
                          @let events = getSpecialEventsForDay(logged, day);
                          @let dayInfo = getCollaboratorDayScheduleInfo(logged, day);
                          @let count = getFolgaRequestCount(day);

                          <div [class]="getCollaboratorCalendarDayStaticClass(logged, day, count)"
                               [class.opacity-45]="isPastDay(day)"
                               [class.saturate-[0.45]]="isPastDay(day)"
                               class="transition-all duration-300">
                            
                            <div class="flex items-center justify-between w-full shrink-0">
                              <span class="font-extrabold font-mono text-[10px] sm:text-[12px] h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center rounded-full"
                                    [class.bg-emerald-500]="isToday(day)"
                                    [class.text-white]="isToday(day)"
                                    [class.bg-emerald-500/20]="dayInfo.status === 'folga' && !isToday(day)"
                                    [class.text-emerald-400]="dayInfo.status === 'folga' && !isLightTheme() && !isToday(day)"
                                    [class.text-emerald-800]="dayInfo.status === 'folga' && isLightTheme() && !isToday(day)"
                                    [class.bg-rose-500/20]="dayInfo.status === 'licenca' && !isToday(day)"
                                    [class.text-rose-400]="dayInfo.status === 'licenca' && !isLightTheme() && !isToday(day)"
                                    [class.text-rose-800]="dayInfo.status === 'licenca' && isLightTheme() && !isToday(day)"
                                    [class.bg-slate-700/30]="dayInfo.status === 'trabalho' && !isLightTheme() && !isToday(day)"
                                    [class.bg-slate-200/50]="dayInfo.status === 'trabalho' && isLightTheme() && !isToday(day)"
                                    [class.text-slate-300]="dayInfo.status === 'trabalho' && !isLightTheme() && !isToday(day)"
                                    [class.text-slate-700]="dayInfo.status === 'trabalho' && isLightTheme() && !isToday(day)">
                                {{ day }}
                              </span>
                              @if (events.length > 0) {
                                <div class="flex items-center gap-0.5">
                                  @for (ev of events; track ev.tooltip) {
                                    <span class="material-icons text-[9px] sm:text-[11px] select-none" [style.color]="ev.color" [title]="ev.tooltip">{{ ev.icon }}</span>
                                  }
                                </div>
                              }
                            </div>

                            <div class="flex flex-col items-start w-full gap-0.5 shrink-0 select-none mt-0.5 sm:mt-1 leading-none">
                              <span class="text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-tight block max-w-full truncate leading-none"
                                    [class.text-emerald-300]="isToday(day) && !isLightTheme()"
                                    [class.text-emerald-950]="isToday(day) && isLightTheme()"
                                    [class.text-emerald-400]="dayInfo.status === 'folga' && !isToday(day)"
                                    [class.text-rose-400]="dayInfo.status === 'licenca' && !isToday(day)"
                                    [class.text-slate-300]="dayInfo.status === 'trabalho' && !isLightTheme() && !isToday(day)"
                                    [class.text-slate-700]="dayInfo.status === 'trabalho' && isLightTheme() && !isToday(day)">
                                <span class="hidden sm:inline">{{ dayInfo.status === 'folga' ? 'FOLGA' : (dayInfo.status === 'licenca' || dayInfo.status === 'afastamento' ? 'AUSENTE' : 'TRABALHO') }}</span>
                                <span class="inline sm:hidden">{{ dayInfo.status === 'folga' ? 'FOLGA' : (dayInfo.status === 'licenca' || dayInfo.status === 'afastamento' ? 'AUSENTE' : 'TRABALHO') }}</span>
                              </span>
                            </div>

                            <div class="w-full text-left pt-1 border-t shrink-0 select-none mt-1 leading-none hidden sm:flex items-center justify-between"
                                 [class.border-[#10213b]/20]="!isToday(day)"
                                 [class.border-emerald-500/30]="isToday(day) && !isLightTheme()"
                                 [class.border-emerald-300/40]="isToday(day) && isLightTheme()">
                              <span class="text-[8.5px] font-bold font-mono"
                                    [class.text-slate-400]="!isToday(day)"
                                    [class.text-emerald-300/85]="isToday(day) && !isLightTheme()"
                                    [class.text-emerald-900/90]="isToday(day) && isLightTheme()">{{ dayInfo.subLabel }}</span>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

              </div>
              }

              <!-- SECTION: FERRAMENTA DIÁRIA (TRABALHO E FOLGA NO MESMO DIA) -->
              @if (activeSubTab() === 'equipe') {
              <div class="lg:col-span-12 space-y-4">
              <div id="team-daily-schedule-tool"
                   [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-4 transition-all duration-300 mb-4 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#030a14] border-[#10213b] text-white shadow-lg')">
                
                <!-- HEADER WITH TITLE AND DAY SWITCHER -->
                <div id="team-daily-header" class="flex items-center justify-between pb-2 border-b" [class]="isLightTheme() ? 'border-slate-150' : 'border-[#10213b]/30'">
                  <div class="flex items-center gap-1.5">
                    <span class="material-icons text-emerald-400 text-sm">event_note</span>
                    <span [class]="'text-[12px] font-black uppercase tracking-wide ' + (isLightTheme() ? 'text-slate-850' : 'text-[#F8FAFC]')">
                      Escala Diária do Time
                    </span>
                  </div>

                  <!-- Quick Day Switcher -->
                  <div id="team-day-switcher" class="flex items-center gap-1.5 bg-[#071426] border border-[#10213b]/40 rounded-lg p-0.5"
                       [class.bg-slate-50]="isLightTheme()"
                       [class.border-slate-200]="isLightTheme()">
                    <button id="btn-team-day-prev" (click)="prevCalendarDay()" 
                            class="w-6 h-6 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                            [class.hover:bg-white]="isLightTheme()"
                            [class.opacity-30]="selectedCalendarDay() <= 1"
                            [disabled]="selectedCalendarDay() <= 1"
                            title="Dia Anterior">
                      <span class="material-icons text-xs">chevron_left</span>
                    </button>
                    <div id="team-day-display" class="flex items-center justify-center min-w-[50px]">
                      <span class="text-[10px] font-black font-mono text-slate-300"
                            [class.text-slate-700]="isLightTheme()">
                        Dia {{ selectedCalendarDay() < 10 ? '0' + selectedCalendarDay() : selectedCalendarDay() }}
                      </span>
                    </div>
                    <button id="btn-team-day-next" (click)="nextCalendarDay()" 
                            class="w-6 h-6 flex items-center justify-center rounded cursor-pointer text-slate-500 hover:text-emerald-400 hover:bg-[#0b1e36] transition-colors border-none outline-none"
                            [class.hover:bg-white]="isLightTheme()"
                            [class.opacity-30]="selectedCalendarDay() >= daysInMonth().length"
                            [disabled]="selectedCalendarDay() >= daysInMonth().length"
                            title="Próximo Dia">
                      <span class="material-icons text-xs">chevron_right</span>
                    </button>
                  </div>
                </div>

                <!-- FILTER SELECTOR TABS -->
                <div id="team-filter-container" class="grid grid-cols-2 sm:grid-cols-4 p-1 rounded-xl gap-1" [class]="isLightTheme() ? 'bg-slate-100' : 'bg-[#071426]'">
                  <button id="btn-filter-meu-turno" (click)="coworkersFilter.set('MEU_TURNO')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'MEU_TURNO' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">person_pin</span>
                    <span class="truncate">Meu Turno ({{ logged.shift || 'N/A' }})</span>
                  </button>
                  <button id="btn-filter-anterior" (click)="coworkersFilter.set('TURNO_ANTERIOR')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'TURNO_ANTERIOR' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">history</span>
                    <span class="truncate">Anterior ({{ getPreviousShiftLabel() }})</span>
                  </button>
                  <button id="btn-filter-posterior" (click)="coworkersFilter.set('TURNO_POSTERIOR')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'TURNO_POSTERIOR' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">update</span>
                    <span class="truncate">Posterior ({{ getPosteriorShiftLabel() }})</span>
                  </button>
                  <button id="btn-filter-todos" (click)="coworkersFilter.set('TODOS')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-xs active:scale-95"
                          [class]="coworkersFilter() === 'TODOS' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-md border-b border-slate-200' : 'bg-emerald-500 text-emerald-950 font-black') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-[11px]">groups</span>
                    <span class="truncate">Todos</span>
                  </button>
                </div>

                <!-- SUB TABS: TRABALHANDO vs FOLGANDO -->
                <div id="team-subtabs-container" class="grid grid-cols-2 p-1 rounded-xl" [class]="isLightTheme() ? 'bg-slate-100' : 'bg-[#071426]'">
                  <button id="btn-team-tab-trabalhando" (click)="teamDailyTab.set('trabalhando')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-sm active:scale-95"
                          [class]="teamDailyTab() === 'trabalhando' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-sm border-b border-slate-200' : 'bg-emerald-500 text-emerald-950') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-xs">work</span>
                    Trabalhando ({{ getTodayTeamCollaborators().length }})
                  </button>
                  <button id="btn-team-tab-folgando" (click)="teamDailyTab.set('folgando')"
                          class="py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 border-none outline-none shadow-sm active:scale-95"
                          [class]="teamDailyTab() === 'folgando' ? 
                                   (isLightTheme() ? 'bg-white text-slate-850 shadow-sm border-b border-slate-200' : 'bg-amber-500 text-amber-950') : 
                                   (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
                    <span class="material-icons text-xs">beach_access</span>
                    Folgando ({{ getCollaboratorsOnVacationForDay(selectedCalendarDay()).length }})
                  </button>
                </div>

                <!-- LIST / GRID OF COLLABORATORS FOR ACTIVE SUB-TAB -->
                <div id="team-daily-list-wrapper">
                  @if (teamDailyTab() === 'trabalhando') {
                    @let activeCollabs = getTodayTeamCollaborators();
                    @if (activeCollabs.length > 0) {
                      <div id="team-active-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                        @for (col of activeCollabs; track col.id) {
                          <div [id]="'active-collab-' + col.id" 
                               class="flex items-center justify-between gap-2.5 p-2.5 border rounded-xl"
                               [class]="isLightTheme() ? 'border-slate-150 bg-slate-50/50' : 'border-[#10213b]/60 bg-[#071426]/30'">
                            <div class="flex items-center gap-2.5 min-w-0">
                              <img [src]="getCollabPhoto(col)" alt="Avatar" referrerpolicy="no-referrer"
                                   class="w-8 h-8 rounded-full object-cover border shrink-0"
                                   [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]'">
                              <div class="min-w-0">
                                <p [class]="'text-[10px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                                  {{ col.name }}
                                </p>
                                <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                                  {{ col.role }} &bull; {{ col.sector || 'Geral' }}
                                </p>
                              </div>
                            </div>
                            <span class="text-[7px] font-black font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 transition-colors"
                                  [class]="isLightTheme() ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-emerald-400 bg-emerald-950/20 border-emerald-500/20'">
                              {{ getCollabShiftOnDay(col, selectedCalendarDay()) }}
                            </span>
                          </div>
                        }
                      </div>
                    } @else {
                      <div id="team-active-empty" class="text-center py-6 text-[10px] text-slate-500 uppercase tracking-wider border border-dashed rounded-xl"
                           [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]/40'">
                        Nenhum colaborador trabalhando neste dia
                      </div>
                    }
                  }

                  @if (teamDailyTab() === 'folgando') {
                    @let offCollabs = getCollaboratorsOnVacationForDay(selectedCalendarDay());
                    @if (offCollabs.length > 0) {
                      <div id="team-off-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                        @for (col of offCollabs; track col.id) {
                          <div [id]="'off-collab-' + col.id"
                               class="flex items-center justify-between gap-2.5 p-2.5 border rounded-xl"
                               [class]="isLightTheme() ? 'border-slate-150 bg-slate-50/50' : 'border-[#10213b]/60 bg-[#071426]/30'">
                            <div class="flex items-center gap-2.5 min-w-0">
                              <img [src]="getCollabPhoto(col)" alt="Avatar" referrerpolicy="no-referrer"
                                   class="w-8 h-8 rounded-full object-cover border shrink-0"
                                   [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]'">
                              <div class="min-w-0">
                                <p [class]="'text-[10px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                                  {{ col.name }}
                                </p>
                                <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                                  {{ col.role }} &bull; {{ col.sector || 'Geral' }}
                                </p>
                              </div>
                            </div>
                            <span class="text-[7px] font-black font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 transition-colors"
                                  [class]="isLightTheme() ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-amber-400 bg-amber-950/20 border-amber-500/20'">
                              FOLGA
                            </span>
                          </div>
                        }
                      </div>
                    } @else {
                      <div id="team-off-empty" class="text-center py-6 text-[10px] text-slate-500 uppercase tracking-wider border border-dashed rounded-xl"
                           [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]/40'">
                        Nenhum colaborador de folga neste dia
                      </div>
                    }
                  }
                </div>

              </div>

              <!-- SECTION: MINHA EQUIPE DO TURNO -->
              <div [class]="'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 ' + (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-md' : 'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg')">
                <!-- HEADER -->
                <div class="flex items-center pb-2 border-b" [class]="isLightTheme() ? 'border-slate-100' : 'border-[#334155]'">
                  <div class="flex items-center gap-2">
                    <span class="material-icons text-emerald-400 text-sm">groups</span>
                    <span [class]="'text-[13px] font-bold tracking-wide uppercase ' + (isLightTheme() ? 'text-slate-800' : 'text-[#F8FAFC]')">
                      Minha Equipe (Turno {{ getBaseShift(logged.shift) }})
                    </span>
                  </div>
                </div>

                <p [class]="'text-[10px] ' + (isLightTheme() ? 'text-slate-600' : 'text-slate-400')">
                  Abaixo estão listados todos os colaboradores pertencentes ao turno base <strong class="text-emerald-500 font-bold uppercase">{{ getBaseShift(logged.shift) }}</strong>.
                </p>

                <!-- Members list -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  @for (member of getCollabTeamMembers(); track member.id) {
                    <div [class]="'flex items-center gap-3 p-3 border rounded-xl transition-all ' + (isLightTheme() ? 'border-slate-150 bg-slate-50/50 hover:bg-slate-100/50' : 'border-[#10213b] bg-[#071426]/30 hover:bg-[#071426]')">
                      <!-- Photo -->
                      <img [src]="getCollabPhoto(member)" alt="Avatar" referrerpolicy="no-referrer"
                           class="w-10 h-10 rounded-full object-cover border shrink-0"
                           [class]="isLightTheme() ? 'border-slate-200' : 'border-[#10213b]'">

                      <!-- Information -->
                      <div class="min-w-0 flex-1">
                        <p [class]="'text-[11px] font-black truncate ' + (isLightTheme() ? 'text-slate-800' : 'text-white')">
                          {{ member.name }}
                        </p>
                        <p [class]="'text-[8px] font-bold uppercase tracking-wider truncate ' + (isLightTheme() ? 'text-slate-500' : 'text-slate-400')">
                          {{ member.role }} &bull; {{ member.sector }}
                        </p>
                        <!-- Specific sub-shift -->
                        <span class="text-[7.5px] font-black font-mono px-1 py-0.5 rounded uppercase border mt-1 inline-block"
                              [class]="isLightTheme() ? 'text-slate-600 bg-slate-150 border-slate-200' : 'text-slate-400 bg-[#030a14] border-[#10213b]/40'">
                          {{ member.shift }}
                        </span>
                      </div>

                      <!-- Today status dot -->
                      @let mStats = getConsecutiveWorkStats(member);
                      <div class="flex flex-col items-end gap-1 select-none shrink-0">
                        <span [class]="'text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ' + 
                                       (mStats.isWorking ? 
                                        'text-amber-500 bg-amber-500/10 border-amber-500/20' : 
                                        'text-emerald-500 bg-emerald-500/10 border-emerald-500/20')">
                          {{ mStats.isWorking ? 'ATIVO' : 'FOLGA' }}
                        </span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
      </div>
    }
      </div>
    }
    </section>
  </main>

  <!-- MOBILE BOTTOM NAVIGATION MENU -->
  @if (getLoggedCollab()) {
    <nav class="md:hidden flex items-center justify-around bg-[#030a14] border-t border-[#10213b] px-1 py-1 pb-[max(env(safe-area-inset-bottom),0.5rem)] shrink-0 relative z-[60] shadow-[0_-4px_15px_rgba(0,0,0,0.5)]"
         [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()" [class.shadow-[0_-4px_15px_rgba(0,0,0,0.05)]]="isLightTheme()">
      
      <!-- INÍCIO -->
      <button (click)="activeSubTab.set('portal')"
              class="flex flex-col items-center justify-center p-1 flex-1 gap-0.5 rounded-lg transition-all border-none outline-none bg-transparent cursor-pointer active:scale-95 active:bg-slate-500/10"
              [class]="activeSubTab() === 'portal' ? 
                       (isLightTheme() ? 'text-emerald-650 font-bold bg-emerald-50/60' : 'text-emerald-400 font-bold bg-emerald-500/10') : 
                       (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
        <span class="material-icons text-base">home</span>
        <span class="text-[8px] font-black uppercase tracking-wider">Início</span>
      </button>

      <!-- ESCALA -->
      <button (click)="activeSubTab.set('escala')"
              class="flex flex-col items-center justify-center p-1 flex-1 gap-0.5 rounded-lg transition-all border-none outline-none bg-transparent cursor-pointer active:scale-95 active:bg-slate-500/10"
              [class]="activeSubTab() === 'escala' ? 
                       (isLightTheme() ? 'text-emerald-650 font-bold bg-emerald-50/60' : 'text-emerald-400 font-bold bg-emerald-500/10') : 
                       (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
        <span class="material-icons text-base font-bold">calendar_month</span>
        <span class="text-[8px] font-black uppercase tracking-wider">Escala</span>
      </button>

      <!-- PERFIL -->
      <button (click)="activeSubTab.set('perfil')"
              class="flex flex-col items-center justify-center p-1 flex-1 gap-0.5 rounded-lg transition-all border-none outline-none bg-transparent cursor-pointer active:scale-95 active:bg-slate-500/10"
              [class]="activeSubTab() === 'perfil' ? 
                       (isLightTheme() ? 'text-emerald-650 font-bold bg-emerald-50/60' : 'text-emerald-400 font-bold bg-emerald-500/10') : 
                       (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
        <span class="material-icons text-base">account_circle</span>
        <span class="text-[8px] font-black uppercase tracking-wider">Perfil</span>
      </button>

      <!-- EQUIPE -->
      <button (click)="activeSubTab.set('equipe')"
              class="flex flex-col items-center justify-center p-1 flex-1 gap-0.5 rounded-lg transition-all border-none outline-none bg-transparent cursor-pointer active:scale-95 active:bg-slate-500/10"
              [class]="(activeSubTab() === 'equipe' || activeSubTab() === 'team') ? 
                       (isLightTheme() ? 'text-emerald-650 font-bold bg-emerald-50/60' : 'text-emerald-400 font-bold bg-emerald-500/10') : 
                       (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
        <span class="material-icons text-base">groups</span>
        <span class="text-[8px] font-black uppercase tracking-wider">Equipe</span>
      </button>

      <!-- INDICADORES -->
      <button (click)="activeSubTab.set('indicadores')"
              class="flex flex-col items-center justify-center p-1 flex-1 gap-0.5 rounded-lg transition-all border-none outline-none bg-transparent cursor-pointer active:scale-95 active:bg-slate-500/10"
              [class]="activeSubTab() === 'indicadores' ? 
                       (isLightTheme() ? 'text-emerald-650 font-bold bg-emerald-50/60' : 'text-emerald-400 font-bold bg-emerald-500/10') : 
                       (isLightTheme() ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-slate-200')">
        <span class="material-icons text-base">analytics</span>
        <span class="text-[8px] font-black uppercase tracking-wider">Indicadores</span>
      </button>

    </nav>
  }

  <!-- AUTHENTICATION DIALOG / LOGIN SIMULATION MODAL -->
  @if (isAuthModalOpen()) {
    <div class="fixed inset-0 bg-[#020813]/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div class="bg-[#071426] border border-[#10213b] w-full max-w-sm rounded-lg p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-[#10213b]">
          <h3 class="font-black text-sm text-white uppercase tracking-tight flex items-center gap-1.5">
            <span class="material-icons text-blue-500">security</span>
            {{ authMode() === 'LOGIN' ? 'Autenticação do Sistema' : 'Cadastrar Líder/Supervisor' }}
          </h3>
          <button (click)="isAuthModalOpen.set(false)" class="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer outline-none">
            <span class="material-icons text-sm">close</span>
          </button>
        </div>

        <div class="space-y-3 text-xs">
          <div class="flex flex-col gap-1">
            <label for="auth_name_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Nome Completo</label>
            <input id="auth_name_input" #authNameInput type="text" placeholder="Ex: Anderson Pires" class="bg-[#030a14] border border-[#10213b] text-white rounded px-3 py-2 outline-none focus:border-blue-500 font-bold">
          </div>
          <div class="flex flex-col gap-1">
            <label for="auth_email_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">E-mail Corporativo</label>
            <input id="auth_email_input" #authEmailInput type="email" placeholder="Ex: anderson.pires@vibra.com.br" class="bg-[#030a14] border border-[#10213b] text-white rounded px-3 py-2 outline-none focus:border-blue-500 font-semibold">
          </div>
          <div class="flex flex-col gap-1">
            <label for="auth_pwd_input" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Senha / Assinatura Digital</label>
            <input id="auth_pwd_input" type="password" placeholder="••••••••" class="bg-[#030a14] border border-[#10213b] text-white rounded px-3 py-2 outline-none focus:border-emerald-500 font-mono">
          </div>
        </div>

        <button (click)="submitAuth(authNameInput.value, authEmailInput.value)"
                class="w-full bg-[#10b981] hover:bg-emerald-600 text-white font-black py-2.5 rounded uppercase tracking-wider transition-all cursor-pointer border-none shadow-lg outline-none">
          {{ authMode() === 'LOGIN' ? 'Acessar Sistema' : 'Salvar Registro' }}
        </button>
      </div>
    </div>
  }

  <!-- PERMUTA REQUEST MODAL (Frente C) -->
  @if (isPermutaModalOpen()) {
    <div class="fixed inset-0 bg-[#020813]/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div class="bg-[#071426] border border-[#10213b] w-full max-w-md rounded-lg p-6 shadow-2xl space-y-4">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-2 border-b border-[#10213b]">
          <h3 class="font-black text-sm text-white uppercase tracking-tight flex items-center gap-1.5">
            <span class="material-icons text-emerald-500">swap_horiz</span>
            Proposta de Permuta de Escala
          </h3>
          <button (click)="isPermutaModalOpen.set(false)" class="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer outline-none">
            <span class="material-icons text-sm">close</span>
          </button>
        </div>

        @let logC = getLoggedCollab()!;
        <!-- Details -->
        <div class="text-xs space-y-3 select-none">
          <p class="text-[10px] text-slate-400 leading-relaxed">
            Você está propondo uma permuta de turno para o dia <span class="text-white font-black font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/30 px-1.5 py-0.5 rounded">{{ permutaSelectedDay() }}/{{ (selectedMonthIndex() + 1).toString().padStart(2, "0") }}/{{ currentYear() }}</span>.
            Seu turno atual é: <span class="text-white font-black font-mono bg-[#10b981] px-1 py-0.5 rounded ml-1">{{ logC.scale[permutaSelectedDay()] || 'X' }}</span>.
          </p>

          <!-- Select target coworker -->
          <div class="flex flex-col gap-1.5">
            <label for="permuta_target_select" class="font-black text-[9px] uppercase tracking-wider text-slate-400">Escolha o Colega de Trabalho:</label>
            <select id="permuta_target_select"
                    [(ngModel)]="permutaTargetCollabId"
                    class="bg-[#030a14] text-white border border-[#10213b] rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-emerald-500">
              <option value="">-- Selecionar Colega --</option>
              @for (cand of getPermutaCandidates(); track cand.id) {
                <option [value]="cand.id">{{ cand.name }} (Turno: {{ cand.scale[permutaSelectedDay()] || 'X' }})</option>
              }
            </select>
          </div>

          <!-- Status Message -->
          @if (permutaStatusMessage()) {
            <p class="text-rose-400 font-bold text-[10px] bg-rose-950/20 p-2 rounded border border-rose-900/30 font-sans">
              {{ permutaStatusMessage() }}
            </p>
          }
        </div>

        <!-- Action Button -->
        <button (click)="requestPermuta()"
                class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 rounded uppercase tracking-wider cursor-pointer border-none shadow-lg shadow-emerald-500/10 outline-none">
          Enviar Solicitação de Troca
        </button>
      </div>
    </div>
  }

  <!-- IMPORT MODAL DIALOG (GEMINI EXTRACTION SIMULATOR) -->
  @if (isImportModalOpen()) {
    <div class="fixed inset-0 bg-[#020813]/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div [class.max-w-lg]="importingState() !== 'done'"
           [class.max-w-3xl]="importingState() === 'done'"
           class="bg-[#071426] border border-[#10213b] w-full rounded-lg p-6 shadow-2xl space-y-4 animate-scale-up transition-all duration-300">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-2 border-b border-[#10213b]">
          <h3 class="font-black text-sm text-white uppercase tracking-tight flex items-center gap-1.5">
            <span class="material-icons text-purple-400 animate-pulse">auto_awesome</span>
            Leitura Inteligente de Escala via IA
          </h3>
          <button (click)="isImportModalOpen.set(false)" class="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer outline-none">
            <span class="material-icons text-sm">close</span>
          </button>
        </div>

        <p class="text-[10px] text-slate-400 leading-relaxed">
          Tire uma foto ou suba um arquivo PDF do quadro impresso de escala de trabalho. Nossa Inteligência Artificial estruturará os dados e cadastrará os colaboradores automaticamente.
        </p>

        <!-- STATE 1: IDLE / NOT UPLOADED -->
        @if (importingState() === 'idle') {
          <div class="border-2 border-dashed border-[#10213b] hover:border-[#10b981] rounded-lg p-10 flex flex-col items-center justify-center gap-3 transition-colors bg-[#030a14] cursor-pointer relative group">
            <input type="file"
                   (change)="triggerAIScan($event)"
                   accept="image/*,application/pdf"
                   class="absolute inset-0 opacity-0 cursor-pointer">
            <span class="material-icons text-slate-500 text-3xl group-hover:text-emerald-500 group-hover:scale-110 transition-transform">cloud_upload</span>
            <div class="text-center">
              <span class="text-xs font-black uppercase text-slate-300 block">Clique para enviar escala</span>
              <span class="text-[9px] text-slate-500">Suporta PNG, JPG, JPEG ou PDF</span>
            </div>
          </div>
        }

        <!-- STATE 2: SCANNING PROGRESS BAR -->
        @if (importingState() === 'processing') {
          <div class="p-8 border border-[#10213b] bg-[#030a14] rounded-lg flex flex-col items-center justify-center gap-4 text-center">
            <div class="w-12 h-12 rounded-full border-4 border-t-emerald-500 border-r-transparent border-[#10213b] animate-spin"></div>
            <div>
              <span class="text-xs font-black uppercase tracking-wider text-white block">Processamento Ativo Gemini AI</span>
              <span class="text-[9px] text-slate-500 mt-1 block">Executando OCR, filtragem de redundância e mapeamento da escala de colaboradores...</span>
            </div>
          </div>
        }

        <!-- STATE 3: PARSED RESULTS READY TO REVIEW -->
        @if (importingState() === 'done') {
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Left Column: OCR Log & Warnings -->
            <div class="space-y-4">
              <div class="p-3 bg-[#030a14] border border-[#10213b] rounded-lg">
                <span class="text-[8px] font-black uppercase text-purple-400 tracking-wider font-mono block">Log do Processamento (OCR)</span>
                <pre class="text-[8px] font-mono text-slate-400 leading-relaxed max-h-[80px] overflow-y-auto mt-1">{{ scannedTextResult() }}</pre>
              </div>

              @if (unrecognizedCodes().length > 0) {
                <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-2">
                  <div class="flex items-start gap-2">
                    <span class="material-icons text-amber-500 text-sm shrink-0 mt-0.5">warning</span>
                    <div class="flex-1">
                      <span class="text-[10px] font-black text-amber-400 block uppercase tracking-wider">Siglas Não Cadastradas Detectadas!</span>
                      <p class="text-[9px] text-slate-300 mt-0.5 leading-relaxed">
                        Identificamos siglas no arquivo que não existem no dicionário: 
                        <strong class="text-amber-300 font-mono text-[10px] bg-[#030a14] border border-[#10213b] px-1.5 py-0.5 rounded ml-1">{{ unrecognizedCodes().join(', ') }}</strong>
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between gap-4 pt-1.5 border-t border-amber-500/20">
                    <span class="text-[8px] text-slate-400 leading-snug">
                      Se não cadastrar, estas siglas serão convertidas para interrogação (?) no sistema.
                    </span>
                    <button (click)="registerUnrecognizedCodes()"
                            class="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer border-none outline-none flex items-center gap-1 shrink-0 shadow-lg shadow-amber-500/10">
                      <span class="material-icons text-xs">add_box</span>
                      Criar Automaticamente
                    </button>
                  </div>
                </div>
              }
            </div>

            <!-- Right Column: Reviewed Members & Action Buttons -->
            <div class="space-y-4 flex flex-col justify-between">
              <div class="space-y-2">
                <span class="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Integrantes Mapeados (Review):</span>
                <div class="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  @for (usr of scannedDataParsed(); track usr.collab.id) {
                    <div class="flex items-center justify-between bg-[#030a14] border border-[#10213b] p-2.5 rounded-lg text-xs font-bold text-white">
                      <div class="flex items-center gap-2">
                        <span class="material-icons text-xs text-[#10b981]">person</span>
                        <span class="truncate max-w-[120px]">{{ usr.collab.name }}</span>
                      </div>
                      <div class="flex items-center gap-2 shrink-0">
                        <span class="text-[8px] bg-[#10213b] text-slate-400 px-1 py-0.5 rounded font-mono">{{ usr.collab.role }}</span>
                        <span class="text-[8px] bg-emerald-950 text-emerald-400 px-1 py-0.5 rounded font-mono">{{ getShiftLabel(usr.collab) }}</span>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div class="flex gap-3">
                <button (click)="isImportModalOpen.set(false)"
                        class="flex-1 rounded uppercase tracking-wider cursor-pointer border text-xs outline-none font-black py-2.5"
                        [class.bg-slate-100]="isLightTheme()"
                        [class.text-slate-800]="isLightTheme()"
                        [class.border-slate-300]="isLightTheme()"
                        [class.hover:bg-slate-200]="isLightTheme()"
                        [class.bg-slate-800]="!isLightTheme()"
                        [class.text-slate-200]="!isLightTheme()"
                        [class.border-slate-700]="!isLightTheme()"
                        [class.hover:bg-slate-700]="!isLightTheme()">
                  Descartar
                </button>
                <button (click)="commitAIScannedUsers()"
                        [disabled]="scannedDataParsed().length === 0"
                        [class.opacity-50]="scannedDataParsed().length === 0"
                        [class.cursor-not-allowed]="scannedDataParsed().length === 0"
                        class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 rounded uppercase tracking-wider cursor-pointer border-none text-xs shadow-lg shadow-emerald-500/10 outline-none">
                  Importar e Salvar Escala
                </button>
              </div>
            </div>

          </div>
        }
      </div>
    </div>
  }

  <!-- DATABASE CONFIGURATION MODAL -->
  @if (isDbModalOpen()) {
    <div class="fixed inset-0 bg-[#020813]/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" id="db_config_modal">
      <div class="bg-[#071426] border border-[#10213b] w-full max-w-lg rounded-lg p-6 shadow-2xl space-y-4 animate-scale-up">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-2 border-b border-[#10213b]">
          <h3 class="font-black text-sm text-white uppercase tracking-tight flex items-center gap-1.5">
            <span class="material-icons text-blue-500">storage</span>
            Configuração do Provedor de Banco de Dados
          </h3>
          <button (click)="isDbModalOpen.set(false)" class="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer outline-none">
            <span class="material-icons text-sm">close</span>
          </button>
        </div>

        <p class="text-[10px] text-slate-400 leading-relaxed">
          Selecione o provedor de banco de dados ativo para o sistema de gestão de escala. Toda a sincronização de dados ocorrerá de forma isolada de acordo com o provedor selecionado.
        </p>

        <!-- Database Provider Toggles -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Firebase Option -->
          <button (click)="scaleService.setDatabaseProvider('firebase'); showToast('Conectado ao Firebase!')"
                  [class]="scaleService.activeDb() === 'firebase' ? 'border-2 border-blue-500 bg-blue-950/10 text-white' : 'border border-[#10213b] bg-[#030a14] text-slate-400'"
                  class="p-4 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 border-none outline-none">
            <span class="material-icons text-2xl text-amber-500">local_fire_department</span>
            <div class="text-center">
              <span class="text-xs font-black uppercase tracking-wider block">Firebase Firestore</span>
              <span class="text-[8px] text-slate-500 block">Sincronização em Tempo Real</span>
            </div>
          </button>

          <!-- Supabase Option -->
          <button (click)="scaleService.setDatabaseProvider('supabase'); showToast('Conectado ao Supabase!')"
                  [class]="scaleService.activeDb() === 'supabase' ? 'border-2 border-emerald-500 bg-emerald-950/10 text-white' : 'border border-[#10213b] bg-[#030a14] text-slate-400'"
                  class="p-4 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 border-none outline-none">
            <span class="material-icons text-2xl text-emerald-500">bolt</span>
            <div class="text-center">
              <span class="text-xs font-black uppercase tracking-wider block">Supabase Postgres</span>
              <span class="text-[8px] text-slate-500 block">Relacional & Escalável</span>
            </div>
          </button>
        </div>

        <!-- Connection Details & Configuration inputs -->
        <div class="space-y-3">
          @if (scaleService.activeDb() === 'supabase') {
            <!-- Supabase inputs -->
            <div class="p-4 bg-[#030a14] border border-[#10213b] rounded-lg space-y-3">
              <span class="block text-[9px] font-black uppercase tracking-wider text-emerald-400">Credenciais de Acesso Supabase</span>
              
              <div class="flex flex-col gap-1">
                <label for="db_supabase_url" class="text-[8px] font-black uppercase text-slate-400 tracking-wider">SUPABASE_URL:</label>
                <input id="db_supabase_url" type="text"
                       [value]="scaleService.supabaseUrl()"
                       #supaUrlInput
                       placeholder="https://your-project.supabase.co"
                       class="bg-[#071426] text-white border border-[#10213b] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500">
              </div>

              <div class="flex flex-col gap-1">
                <label for="db_supabase_key" class="text-[8px] font-black uppercase text-slate-400 tracking-wider">SUPABASE_ANON_KEY (Chave Pública):</label>
                <input id="db_supabase_key" type="password"
                       [value]="scaleService.supabaseKey()"
                       #supaKeyInput
                       placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                       class="bg-[#071426] text-white border border-[#10213b] rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500">
              </div>

              <button (click)="scaleService.setSupabaseConfig(supaUrlInput.value, supaKeyInput.value); showToast('Configurações do Supabase salvas!')"
                      class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2 rounded text-xs uppercase tracking-wider cursor-pointer border-none shadow-lg shadow-emerald-500/10 outline-none">
                Conectar e Sincronizar
              </button>

              <div class="mt-4 p-3 bg-slate-950/40 border border-slate-800 rounded-lg space-y-2" id="db_sql_helper_panel">
                <span class="block text-[8px] font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Estrutura SQL de Criação das Tabelas</span>
                  <span class="text-[7px] text-emerald-400 font-bold uppercase">SQL Editor do Supabase</span>
                </span>
                <p class="text-[9px] text-slate-400 leading-normal">
                  Para que o Supabase sincronize corretamente, você deve criar as tabelas executando o script SQL no painel do seu Supabase. Copie o script abaixo:
                </p>
                <textarea readonly class="w-full h-24 bg-[#01050a] text-slate-300 font-mono text-[8px] p-2 rounded border border-slate-800 outline-none resize-none cursor-text select-all" id="sql_schema_textarea">-- Copie e cole no SQL Editor do Supabase para criar as tabelas:
CREATE TABLE IF NOT EXISTS public.colaboradores (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  schedule VARCHAR(50) NOT NULL,
  grupo VARCHAR(100) NOT NULL,
  shift VARCHAR(100) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  bh_balance INT DEFAULT 0,
  score INT DEFAULT 90,
  birthday DATE,
  special_dates JSONB,
  folga_requests JSONB,
  password VARCHAR(100),
  photo_url TEXT,
  is_admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.escala_diaria (
  collaborator_id VARCHAR(100) REFERENCES public.colaboradores(id) ON DELETE CASCADE,
  day INT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  value VARCHAR(50) NOT NULL,
  PRIMARY KEY (collaborator_id, day, month, year)
);

CREATE TABLE IF NOT EXISTS public.sigla_types (
  code VARCHAR(50) PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.shift_types (
  code VARCHAR(50) PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  hours VARCHAR(50) NOT NULL,
  color VARCHAR(255) NOT NULL,
  "startTime" VARCHAR(50),
  "endTime" VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS public.audit_history (
  id VARCHAR(100) PRIMARY KEY,
  timestamp VARCHAR(100) NOT NULL,
  author VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);</textarea>
              </div>
            </div>
          } @else {
            <!-- Firebase Firestore Details -->
            <div class="p-4 bg-[#030a14] border border-[#10213b] rounded-lg space-y-2">
              <span class="block text-[9px] font-black uppercase tracking-wider text-amber-400">Status do Firebase Firestore</span>
              <div class="text-[10px] space-y-1 text-slate-400">
                <div>Provedor Ativo: <span class="text-white font-mono">Firebase Realtime (SDK v12)</span></div>
                <div>ID do Projeto: <span class="text-white font-mono">gen-lang-client-0347186096</span></div>
                <div>Conexão: <span class="text-emerald-500 font-bold">● OPERACIONAL (Long Polling Ativo)</span></div>
              </div>
            </div>
          }

          <!-- Connection Status Alerts / Error Logs -->
          @if (scaleService.databaseError()) {
            <div class="p-3 bg-rose-950/20 border border-rose-900/30 rounded-lg flex items-start gap-2 text-rose-400 font-sans">
              <span class="material-icons text-sm mt-0.5">warning</span>
              <div class="text-[9px] font-bold leading-relaxed">
                <span class="block text-white uppercase font-black">Atenção sobre Conexão:</span>
                {{ scaleService.databaseError() }}
              </div>
            </div>
          } @else {
            <div class="p-3 bg-emerald-950/10 border border-emerald-900/20 rounded-lg flex items-center gap-2 text-emerald-400 font-sans">
              <span class="material-icons text-sm">check_circle</span>
              <span class="text-[9px] font-bold">Sincronização ativa e operando sem erros com o provedor selecionado.</span>
            </div>
          }
        </div>

        <!-- Footer Actions -->
        <button (click)="isDbModalOpen.set(false)"
                class="w-full rounded uppercase tracking-wider cursor-pointer border text-xs outline-none font-black py-2.5"
                [class.bg-slate-100]="isLightTheme()"
                [class.text-slate-800]="isLightTheme()"
                [class.border-slate-300]="isLightTheme()"
                [class.hover:bg-slate-200]="isLightTheme()"
                [class.bg-slate-800]="!isLightTheme()"
                [class.text-slate-200]="!isLightTheme()"
                [class.border-slate-700]="!isLightTheme()"
                [class.hover:bg-slate-700]="!isLightTheme()">
          Fechar Configurações
        </button>
      </div>
    </div>
  }

  <!-- PROCESSING OVERLAY WITH SPINNING ANIMATION -->
  @if (scaleService.isProcessing()) {
    <div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm" id="processing_overlay">
      <div class="flex flex-col items-center gap-4">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-[#10213b]"></div>
          <div class="absolute inset-0 rounded-full border-4 border-[#10b981] border-t-transparent animate-spin"></div>
        </div>
        <div class="text-center">
          <h3 class="text-white font-black text-lg uppercase tracking-widest animate-pulse">Processando...</h3>
          <p class="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider">Aguarde, atualizando os registros no banco de dados</p>
        </div>
      </div>
    </div>
  }

  <!-- MODAL: EDITAR DATAS IMPORTANTES -->
  @if (isPortalEditingDates()) {
    <div class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="modal_editing_dates_overlay">
      <div class="bg-[#030a14] border border-[#10213b] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col animate-slide-up" 
           [class.bg-[#030a14]]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()"
           [class.bg-white]="isLightTheme()" [class.border-slate-300]="isLightTheme()"
           id="modal_editing_dates_content">
        <div class="p-4 border-b border-[#10213b] flex items-center justify-between shrink-0 bg-slate-900/30"
             [class.border-[#10213b]]="!isLightTheme()" [class.bg-slate-900/30]="!isLightTheme()"
             [class.border-slate-200]="isLightTheme()" [class.bg-slate-50]="isLightTheme()">
          <div>
            <h3 class="font-black text-sm uppercase tracking-wider text-white"
                [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">Editar Datas Importantes</h3>
            <span class="text-[10px] font-bold text-slate-400 block uppercase mt-0.5">
              Personalize suas datas (Aniversários, Casamento, etc.)
            </span>
          </div>
          <button (click)="isPortalEditingDates.set(false)" class="text-slate-400 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-1">
            <span class="material-icons text-xl">close</span>
          </button>
        </div>
        <div class="p-4 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin">
           @for (date of editingSpecialDates(); track $index) {
             <div class="flex items-center gap-2">
                <!-- Seleção de Dia e Mês (Sem Ano) -->
                <div class="flex items-center gap-1 shrink-0">
                  <div class="relative">
                    <button (click)="openDaySelectorForIndex.set(openDaySelectorForIndex() === $index ? null : $index); openMonthSelectorForIndex.set(null)"
                            class="border hover:border-emerald-500 rounded-lg px-2 text-[11px] font-mono h-8 w-10 flex items-center justify-center cursor-pointer"
                            [class.bg-[#071426]]="!isLightTheme()" [class.text-white]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()"
                            [class.bg-white]="isLightTheme()" [class.text-slate-800]="isLightTheme()" [class.border-slate-300]="isLightTheme()">
                      {{ getDayFromDate(date.date) }}
                    </button>
                    @if (openDaySelectorForIndex() === $index) {
                      <div class="absolute top-full mt-1 left-0 z-50 border rounded-xl shadow-2xl p-2 w-[240px] grid grid-cols-7 gap-1 animate-fade-in"
                           [class.bg-[#030a14]]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()"
                           [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()">
                        @for (d of daysOptions; track d) {
                          <button (click)="updateSpecialDateDay($index, d)"
                                  [class.bg-emerald-500]="d === getDayFromDate(date.date)"
                                  [class.text-white]="d === getDayFromDate(date.date)"
                                  [class.bg-[#071426]]="!isLightTheme() && d !== getDayFromDate(date.date)"
                                  [class.text-slate-300]="!isLightTheme() && d !== getDayFromDate(date.date)"
                                  [class.bg-slate-100]="isLightTheme() && d !== getDayFromDate(date.date)"
                                  [class.text-slate-700]="isLightTheme() && d !== getDayFromDate(date.date)"
                                  [class.border-[#10213b]]="!isLightTheme()" [class.border-slate-200]="isLightTheme()"
                                  class="h-8 rounded flex items-center justify-center text-[10px] font-mono font-bold hover:bg-emerald-500/20 hover:text-emerald-500 transition-colors cursor-pointer border">
                            {{ d }}
                          </button>
                        }
                      </div>
                    }
                  </div>
                  <span class="text-slate-500 text-xs font-bold">/</span>
                  <div class="relative">
                    <button (click)="openMonthSelectorForIndex.set(openMonthSelectorForIndex() === $index ? null : $index); openDaySelectorForIndex.set(null)"
                            class="border hover:border-emerald-500 rounded-lg px-2 text-[11px] font-mono h-8 w-14 flex items-center justify-center cursor-pointer"
                            [class.bg-[#071426]]="!isLightTheme()" [class.text-white]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()"
                            [class.bg-white]="isLightTheme()" [class.text-slate-800]="isLightTheme()" [class.border-slate-300]="isLightTheme()">
                      {{ monthsOptions[(+getMonthFromDate(date.date)) - 1]?.name.substring(0, 3).toUpperCase() || 'JAN' }}
                    </button>
                    @if (openMonthSelectorForIndex() === $index) {
                      <div class="absolute top-full mt-1 left-0 z-50 border rounded-xl shadow-2xl p-2 w-[240px] grid grid-cols-4 gap-1 animate-fade-in"
                           [class.bg-[#030a14]]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()"
                           [class.bg-white]="isLightTheme()" [class.border-slate-200]="isLightTheme()">
                        @for (m of monthsOptions; track m.value) {
                          @let disabled = isMonthDisabled(m.value, getDayFromDate(date.date));
                          <button (click)="!disabled && updateSpecialDateMonth($index, m.value)"
                                  [disabled]="disabled"
                                  [class.bg-emerald-500]="m.value === getMonthFromDate(date.date) && !disabled"
                                  [class.text-white]="m.value === getMonthFromDate(date.date) && !disabled"
                                  [class.bg-[#071426]]="!isLightTheme() && m.value !== getMonthFromDate(date.date) && !disabled"
                                  [class.text-slate-300]="!isLightTheme() && m.value !== getMonthFromDate(date.date) && !disabled"
                                  [class.bg-slate-100]="isLightTheme() && m.value !== getMonthFromDate(date.date) && !disabled"
                                  [class.text-slate-700]="isLightTheme() && m.value !== getMonthFromDate(date.date) && !disabled"
                                  [class.opacity-30]="disabled"
                                  [class.cursor-not-allowed]="disabled"
                                  [class.hover:bg-emerald-500/20]="!disabled"
                                  [class.hover:text-emerald-500]="!disabled"
                                  [class.border-[#10213b]]="!isLightTheme()" [class.border-slate-200]="isLightTheme()"
                                  class="h-8 rounded flex items-center justify-center text-[10px] font-mono font-bold transition-colors border">
                            {{ m.name.substring(0, 3).toUpperCase() }}
                          </button>
                        }
                      </div>
                    }
                  </div>
                </div>
                <input type="text" [value]="date.description" (input)="updateSpecialDateRow($index, 'description', $any($event.target).value)" placeholder="Descrição (ex: Casamento)" 
                       class="flex-1 max-sm:w-[100px] max-sm:min-w-[100px] border focus:border-emerald-500 outline-none rounded-lg px-2 py-1.5 text-xs h-8"
                       [class.bg-[#071426]]="!isLightTheme()" [class.text-white]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()"
                       [class.bg-white]="isLightTheme()" [class.text-slate-800]="isLightTheme()" [class.border-slate-300]="isLightTheme()">
                <button (click)="removeSpecialDateRow($index)" class="w-8 h-8 rounded flex items-center justify-center bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20 cursor-pointer shrink-0">
                  <span class="material-icons text-sm leading-none">delete</span>
                </button>
             </div>
           } @empty {
              <div class="text-center py-4 border border-dashed rounded-lg"
                   [class.border-[#10213b]/60]="!isLightTheme()" [class.bg-slate-900/30]="!isLightTheme()"
                   [class.border-slate-300]="isLightTheme()" [class.bg-slate-50]="isLightTheme()">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nenhuma data adicionada.</span>
              </div>
           }
           <button (click)="addSpecialDateRow()" class="w-full py-2 border border-dashed text-[10px] font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                   [class.bg-[#071426]]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()" [class.text-slate-400]="!isLightTheme()" [class.hover:bg-[#10213b]]="!isLightTheme()" [class.hover:border-emerald-500/40]="!isLightTheme()" [class.hover:text-emerald-400]="!isLightTheme()"
                   [class.bg-white]="isLightTheme()" [class.border-slate-300]="isLightTheme()" [class.text-slate-500]="isLightTheme()" [class.hover:bg-slate-50]="isLightTheme()" [class.hover:border-emerald-500]="isLightTheme()" [class.hover:text-emerald-600]="isLightTheme()">
             <span class="material-icons text-xs">add</span> Adicionar Data Especial
           </button>
        </div>
        <div class="p-4 border-t flex items-center gap-2"
             [class.border-[#10213b]]="!isLightTheme()" [class.bg-slate-900/30]="!isLightTheme()"
             [class.border-slate-200]="isLightTheme()" [class.bg-slate-50]="isLightTheme()">
          <button (click)="clearSpecialDates()" class="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 font-black text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer">
            Limpar
          </button>
          <button (click)="isPortalEditingDates.set(false)" class="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 font-black text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer">
            Cancelar
          </button>
          <button (click)="saveSpecialDates()" class="flex-[2] py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer">
            Salvar
          </button>
        </div>
      </div>
    </div>
  }

  <!-- CONFIRM DELETE SPECIAL DATE MODAL -->
  @if (specialDateToDeleteIndex() !== null) {
    <div class="fixed inset-0 z-[260] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div class="border rounded-xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col animate-slide-up"
           [class.bg-[#030a14]]="!isLightTheme()" [class.border-[#10213b]]="!isLightTheme()"
           [class.bg-white]="isLightTheme()" [class.border-slate-300]="isLightTheme()">
        <div class="p-4 flex flex-col items-center justify-center text-center space-y-3">
          <div class="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-2">
            <span class="material-icons text-2xl">delete_outline</span>
          </div>
          <h3 class="font-black text-sm uppercase tracking-wider" [class.text-white]="!isLightTheme()" [class.text-slate-800]="isLightTheme()">Excluir data especial?</h3>
          <p class="text-xs text-slate-500">Tem certeza que deseja excluir esta data? A ação será concluída ao Salvar.</p>
        </div>
        <div class="p-3 border-t flex items-center gap-2"
             [class.border-[#10213b]]="!isLightTheme()" [class.bg-slate-900/30]="!isLightTheme()"
             [class.border-slate-200]="isLightTheme()" [class.bg-slate-50]="isLightTheme()">
          <button (click)="cancelDeleteSpecialDate()" class="flex-1 py-2 bg-transparent hover:bg-slate-800 text-slate-400 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  [class.hover:bg-slate-800]="!isLightTheme()" [class.hover:bg-slate-200]="isLightTheme()">
            Cancelar
          </button>
          <button (click)="confirmDeleteSpecialDate()" class="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer">
            Excluir
          </button>
        </div>
      </div>
    </div>
  }

  <!-- MODAL: SOLICITAR FOLGA GENERICO -->
  @if (isSolicitarFolgaModalOpen()) {
    <div class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="modal_solicitar_folga_overlay">
      <div class="bg-[#030a14] border border-[#10213b] rounded-xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col animate-slide-up" id="modal_solicitar_folga_content">
        <!-- Header -->
        <div class="px-5 py-4 border-b border-[#10213b]/60 flex justify-between items-center bg-[#071426]">
          <h3 class="font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
            <span class="material-icons text-emerald-500 text-lg">calendar_month</span>
            Solicitar Folga
          </h3>
          <button (click)="isSolicitarFolgaModalOpen.set(false)" class="text-slate-400 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-1">
            <span class="material-icons text-base">close</span>
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 bg-[#030a14] flex flex-col gap-4">
          @if (!isFolgaRequestPeriodOpen()) {
            <div class="text-center p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
              <span class="material-icons text-rose-500 text-3xl mb-2">lock</span>
              <h4 class="text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">Período Fechado</h4>
              <p class="text-slate-400 text-[10px] leading-relaxed">
                As solicitações de folga só podem ser feitas do dia 1 ao dia 10 do mês.
              </p>
            </div>
            <button (click)="isSolicitarFolgaModalOpen.set(false)" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-black text-[10px] uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer">
              Fechar
            </button>
          } @else {
            <div class="flex items-center justify-between">
              <h4 class="text-white font-bold text-xs uppercase tracking-wider">
                {{ monthsList[getNextMonthIndex()].name }} {{ getNextMonthYear() }}
              </h4>
              <span class="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                Dias 1 a 10
              </span>
            </div>
            
            <!-- Simple Calendar Grid -->
            <div class="grid grid-cols-7 gap-1">
              <!-- Weekdays -->
              <div class="text-center text-[9px] font-black uppercase text-slate-500 pb-1">Dom</div>
              <div class="text-center text-[9px] font-black uppercase text-slate-500 pb-1">Seg</div>
              <div class="text-center text-[9px] font-black uppercase text-slate-500 pb-1">Ter</div>
              <div class="text-center text-[9px] font-black uppercase text-slate-500 pb-1">Qua</div>
              <div class="text-center text-[9px] font-black uppercase text-slate-500 pb-1">Qui</div>
              <div class="text-center text-[9px] font-black uppercase text-slate-500 pb-1">Sex</div>
              <div class="text-center text-[9px] font-black uppercase text-slate-500 pb-1">Sáb</div>

              @for (dayObj of getNextMonthCalendarDays(); track $index) {
                @if (dayObj.empty) {
                  <div class="aspect-square"></div>
                } @else {
                  <button (click)="dayObj.isFull && !dayObj.hasRequested ? null : folgaModalSelectedDay.set(dayObj.day)"
                          [class.cursor-not-allowed]="dayObj.isFull && !dayObj.hasRequested"
                          [class.opacity-50]="dayObj.isFull && !dayObj.hasRequested"
                          [class.bg-[#071426]]="folgaModalSelectedDay() !== dayObj.day"
                          [class.bg-emerald-500]="folgaModalSelectedDay() === dayObj.day"
                          [class.text-white]="folgaModalSelectedDay() === dayObj.day"
                          [class.text-slate-300]="folgaModalSelectedDay() !== dayObj.day"
                          [class.ring-2]="folgaModalSelectedDay() === dayObj.day"
                          [class.ring-emerald-400]="folgaModalSelectedDay() === dayObj.day"
                          [class.border-emerald-500]="dayObj.hasRequested"
                          class="aspect-square rounded border border-[#10213b] flex flex-col items-center justify-center relative hover:bg-[#10213b] transition-all group">
                    <span class="text-xs font-bold font-mono">{{ dayObj.day }}</span>
                    
                    @if (dayObj.hasRequested) {
                      <span class="text-[7px] font-black text-emerald-400 uppercase tracking-tighter leading-none mt-1">Sua</span>
                    } @else if (dayObj.isFull) {
                      <span class="text-[7px] font-black text-rose-400 uppercase tracking-tighter leading-none mt-1">Cheio</span>
                    } @else if (dayObj.count > 0) {
                      <span class="text-[7px] font-bold text-slate-400 uppercase tracking-tighter leading-none mt-1">{{ dayObj.count }}/3</span>
                    }
                  </button>
                }
              }
            </div>
            
            <!-- Selected Day Info -->
            @if (folgaModalSelectedDay() !== null) {
              @let selObj = getNextMonthCalendarDays().find(d => !d.empty && d.day === folgaModalSelectedDay());
              <div class="p-3 bg-[#071426] border border-[#10213b] rounded-lg text-left mt-2 animate-fade-in">
                <div class="flex justify-between items-start mb-2">
                  <span class="text-[10px] font-black uppercase text-slate-300">
                    Dia {{ selObj.day }} de {{ monthsList[getNextMonthIndex()].name }}
                  </span>
                  <span class="text-[9px] font-mono" [class.text-rose-400]="selObj.isFull" [class.text-emerald-400]="!selObj.isFull">
                    {{ selObj.count }}/3 Vagas
                  </span>
                </div>
                
                @if (selObj.count > 0) {
                  <div class="mb-3">
                    <span class="text-[8px] font-bold text-slate-500 uppercase block mb-1">Solicitado por:</span>
                    <div class="flex flex-wrap gap-1">
                      @for (r of selObj.requesters; track r.id) {
                        <div class="flex items-center gap-1 bg-[#10213b] px-1.5 py-0.5 rounded" title="{{ r.name }}">
                          @if (r.photo) {
                            <img [src]="r.photo" alt="" class="w-3 h-3 rounded-full object-cover" referrerpolicy="no-referrer">
                          } @else {
                            <div class="w-3 h-3 rounded-full bg-slate-700 text-[6px] flex items-center justify-center font-bold text-white">{{ r.name.charAt(0) }}</div>
                          }
                          <span class="text-[8px] font-bold text-slate-300 truncate max-w-[60px]">{{ r.name }}</span>
                        </div>
                      }
                    </div>
                  </div>
                }
                
                @let logged = getLoggedCollab();
                @if (selObj.hasRequested && logged) {
                  <button (click)="removeCollabFolgaDayFromNextMonth(logged, selObj.day); isSolicitarFolgaModalOpen.set(false)" class="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-black text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer">
                    Cancelar Solicitação
                  </button>
                } @else if (!selObj.isFull && logged) {
                  <button (click)="requestCollabFolgaDayForNextMonth(logged, selObj.day); isSolicitarFolgaModalOpen.set(false)" class="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer">
                    Confirmar Solicitação
                  </button>
                }
              </div>
            } @else {
              <div class="text-center p-3 text-slate-500 text-[9px] uppercase font-bold tracking-wider mt-2 border border-dashed border-[#10213b]/60 rounded-lg">
                Selecione um dia no calendário
              </div>
            }
          }
        </div>
      </div>
    </div>
  }

  <!-- MODAL: DETALHES DO DIA E COLABORADORES ESCALADOS -->
  @if (isDayDetailsModalOpen() && selectedDetailDay() !== null && selectedDetailCollab()) {
    @let detailDay = selectedDetailDay();
    @let detailCol = selectedDetailCollab();
    @let isChosen = isChosenByCollab(detailCol, detailDay);
    @let isPre = isPreSelectedByCollab(detailCol, detailDay);
    @let dayInfo = getCollaboratorDayScheduleInfo(detailCol, detailDay);

    <div class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="modal_day_details_overlay">
      <div class="bg-[#030a14] border border-[#10213b] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up" id="modal_day_details_content">
        
        <!-- Header -->
        <div class="p-4 border-b border-[#10213b] flex items-center justify-between shrink-0 bg-slate-900/30">
          <div>
            <h3 class="font-black text-sm uppercase tracking-wider text-white">Detalhes do Dia</h3>
            <span class="text-[10px] font-bold text-emerald-400 font-mono block uppercase mt-0.5">
              {{ detailDay }} de {{ currentMonthName() | uppercase }} de {{ currentYear() }}
            </span>
          </div>
          <button (click)="isDayDetailsModalOpen.set(false)" 
                  class="text-slate-400 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-1">
            <span class="material-icons text-xl leading-none">close</span>
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 flex-1 overflow-y-auto space-y-6">
          
          <!-- Card de Escala do Colaborador Selecionado -->
          <div class="p-4 rounded-xl border"
               [class.bg-emerald-950/20]="dayInfo.status === 'folga'"
               [class.border-emerald-500/30]="dayInfo.status === 'folga'"
               [class.bg-rose-950/20]="dayInfo.status === 'licenca'"
               [class.border-rose-500/30]="dayInfo.status === 'licenca'"
               [class.bg-[#041021]/80]="dayInfo.status === 'trabalho'"
               [class.border-[#10213b]]="dayInfo.status === 'trabalho'">
            
            <div class="flex items-start gap-3">
              <!-- Avatar -->
              @if (detailCol.photo) {
                <img (click)="navigateToCollabPortal(detailCol.id)"
                     [src]="detailCol.photo" 
                     alt="Colaborador" 
                     class="w-10 h-10 rounded-full object-cover border border-[#10213b] cursor-pointer hover:opacity-85 transition-all" 
                     title="Colega de trabalho"
                     referrerpolicy="no-referrer" />
              } @else {
                <div (click)="navigateToCollabPortal(detailCol.id)"
                     class="w-10 h-10 rounded-full bg-[#10213b] text-slate-300 flex items-center justify-center font-black text-sm cursor-pointer hover:opacity-85 transition-all"
                     title="Colega de trabalho">
                  {{ detailCol.name.slice(0, 2).toUpperCase() }}
                </div>
              }

              <div class="flex-1">
                <span (click)="navigateToCollabPortal(detailCol.id)"
                      class="text-xs font-black text-white block cursor-pointer hover:text-emerald-400 hover:underline transition-all"
                      title="Colega de trabalho">{{ detailCol.name }}</span>
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  {{ detailCol.role }} • {{ detailCol.sector }}
                </span>

                <!-- Schedule Details -->
                <div class="mt-3 flex items-center gap-2">
                  <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest font-mono border"
                        [style.background-color]="getShiftOrSiglaColor(dayInfo.label, detailDay)"
                        [style.color]="getShiftOrSiglaTextColor(dayInfo.label)"
                        [style.border-color]="isShiftOrSiglaTransparent(dayInfo.label) ? getShiftOrSiglaBorderColor(dayInfo.label) : 'transparent'"
                        [style.border-width]="isShiftOrSiglaTransparent(dayInfo.label) ? '1.5px' : '0px'">
                    {{ dayInfo.label || 'N/A' }}
                  </span>
                  <div class="flex flex-col">
                    <span class="text-[10px] font-bold text-white">{{ dayInfo.subLabel }}</span>
                    <span class="text-[8px] font-semibold text-slate-400 font-mono mt-0.5">{{ dayInfo.hours }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botões de Solicitacao de Folga -->
            <div class="mt-4 pt-3 border-t border-[#10213b]/40 flex items-center justify-end">
              @if (detailCol.id === logged.id) {
                <button (click)="openSolicitarFolgaModal()"
                        class="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all rounded cursor-pointer border border-emerald-500/20">
                  <span class="material-icons text-xs leading-none">add_circle</span>
                  Solicitar Folgas
                </button>
              }
            </div>

          </div>

          <!-- Tabs Selector -->
          <div class="flex border-b border-[#10213b]/60 gap-1 shrink-0">
            <button (click)="dayDetailsActiveTab.set('seu_turno')"
                    class="px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent outline-none flex items-center gap-1"
                    [class.text-emerald-400]="dayDetailsActiveTab() === 'seu_turno'"
                    [class.border-b-2]="dayDetailsActiveTab() === 'seu_turno'"
                    [class.border-emerald-500]="dayDetailsActiveTab() === 'seu_turno'"
                    [class.text-slate-400]="dayDetailsActiveTab() !== 'seu_turno'"
                    [class.hover:text-white]="dayDetailsActiveTab() !== 'seu_turno'">
              <span class="material-icons text-xs leading-none">groups</span>
              Seu Turno ({{ getCollaboratorsForDetailTab('seu_turno').length }})
            </button>
            <button (click)="dayDetailsActiveTab.set('turno_posterior')"
                    class="px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent outline-none flex items-center gap-1"
                    [class.text-emerald-400]="dayDetailsActiveTab() === 'turno_posterior'"
                    [class.border-b-2]="dayDetailsActiveTab() === 'turno_posterior'"
                    [class.border-emerald-500]="dayDetailsActiveTab() === 'turno_posterior'"
                    [class.text-slate-400]="dayDetailsActiveTab() !== 'turno_posterior'"
                    [class.hover:text-white]="dayDetailsActiveTab() !== 'turno_posterior'">
              <span class="material-icons text-xs leading-none">arrow_forward</span>
              Posterior ({{ getCollaboratorsForDetailTab('turno_posterior').length }})
            </button>
            <button (click)="dayDetailsActiveTab.set('geral')"
                    class="px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border-none bg-transparent outline-none flex items-center gap-1"
                    [class.text-emerald-400]="dayDetailsActiveTab() === 'geral'"
                    [class.border-b-2]="dayDetailsActiveTab() === 'geral'"
                    [class.border-emerald-500]="dayDetailsActiveTab() === 'geral'"
                    [class.text-slate-400]="dayDetailsActiveTab() !== 'geral'"
                    [class.hover:text-white]="dayDetailsActiveTab() !== 'geral'">
              <span class="material-icons text-xs leading-none">public</span>
              Geral ({{ getCollaboratorsForDetailTab('geral').length }})
            </button>
          </div>

          <!-- Lista de Colaboradores Filtrados -->
          <div>
            <div class="flex items-center justify-between mb-3 shrink-0">
              <h4 class="font-black text-[10px] uppercase tracking-wider text-slate-400">
                @if (dayDetailsActiveTab() === 'seu_turno') {
                  Colaboradores no Mesmo Turno
                } @else if (dayDetailsActiveTab() === 'turno_posterior') {
                  Colaboradores no Turno Posterior
                } @else {
                  Colaboradores Escalados no Dia
                }
              </h4>
              <span class="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Total: {{ getCollaboratorsForDetailTab(dayDetailsActiveTab()).length }}
              </span>
            </div>

            <div class="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              @for (col of getCollaboratorsForDetailTab(dayDetailsActiveTab()); track col.id) {
                @let shiftCode = getCollabShiftOnDay(col, detailDay);
                <div class="flex items-center justify-between p-2.5 bg-slate-900/40 border border-[#10213b] rounded-lg">
                  <div class="flex items-center gap-2.5">
                    <!-- Photo -->
                    @if (col.photo) {
                      <img (click)="navigateToCollabPortal(col.id)"
                           [src]="col.photo" 
                           alt="Avatar" 
                           class="w-8 h-8 rounded-full object-cover border border-[#10213b] cursor-pointer hover:opacity-85 transition-all" 
                           title="Colega de trabalho"
                           referrerpolicy="no-referrer" />
                    } @else {
                      <div (click)="navigateToCollabPortal(col.id)"
                           class="w-8 h-8 rounded-full bg-[#10213b] text-slate-300 flex items-center justify-center font-bold text-xs cursor-pointer hover:opacity-85 transition-all"
                           title="Colega de trabalho">
                        {{ col.name.slice(0, 2).toUpperCase() }}
                      </div>
                    }
                    
                    <div>
                      <span (click)="navigateToCollabPortal(col.id)"
                            class="block text-xs font-extrabold text-white leading-tight cursor-pointer hover:text-emerald-400 hover:underline transition-all"
                            title="Colega de trabalho">{{ col.name }}</span>
                      <span class="text-[8px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        {{ col.role }} • {{ col.sector }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Shift Badge -->
                  <span class="text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest font-mono border"
                        [style.background-color]="getShiftOrSiglaColor(shiftCode, detailDay)"
                        [style.color]="getShiftOrSiglaTextColor(shiftCode)"
                        [style.border-color]="isShiftOrSiglaTransparent(shiftCode) ? getShiftOrSiglaBorderColor(shiftCode) : 'transparent'"
                        [style.border-width]="isShiftOrSiglaTransparent(shiftCode) ? '1.5px' : '0px'">
                    {{ shiftCode }}
                  </span>
                </div>
              } @empty {
                <div class="text-center py-8 text-slate-500">
                  <span class="material-icons text-3xl block mb-1">sentiment_dissatisfied</span>
                  <span class="text-[10px] font-bold uppercase tracking-wider block">Nenhum colaborador encontrado</span>
                </div>
              }
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-[#10213b] bg-slate-900/30 flex items-center justify-end">
          <button (click)="isDayDetailsModalOpen.set(false)"
                  class="rounded uppercase tracking-wider cursor-pointer border text-[10px] outline-none font-black py-2 px-4"
                  [class.bg-slate-100]="isLightTheme()"
                  [class.text-slate-800]="isLightTheme()"
                  [class.border-slate-300]="isLightTheme()"
                  [class.hover:bg-slate-200]="isLightTheme()"
                  [class.bg-slate-800]="!isLightTheme()"
                  [class.text-slate-200]="!isLightTheme()"
                  [class.border-slate-700]="!isLightTheme()"
                  [class.hover:bg-slate-700]="!isLightTheme()">
            Fechar
          </button>
        </div>

      </div>
    </div>
  }

  <!-- MODAL: SELECIONAR ESCALA DO DIA NO PORTAL DO COLABORADOR -->
  @if (isPortalDayEditModalOpen()) {
    @let logged = getLoggedCollab();
    @if (logged) {
      <div class="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" id="modal_portal_day_edit_overlay">
        <div class="bg-[#030a14] border border-[#10213b] rounded-xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-slide-up" id="modal_portal_day_edit_content">
          <!-- Header -->
          <div class="px-5 py-4 border-b border-[#10213b]/60 flex justify-between items-center bg-[#071426]">
            <div>
              <h3 class="font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
                <span class="material-icons text-emerald-500 text-lg">edit_calendar</span>
                Escala do Dia {{ portalEditSelectedDay() }}
              </h3>
              <span class="text-[9px] font-bold text-slate-400 block uppercase mt-0.5">
                Altere seu status de trabalho, folga ou ausência para este dia
              </span>
            </div>
            <button (click)="isPortalDayEditModalOpen.set(false)" class="text-slate-400 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-1">
              <span class="material-icons text-base">close</span>
            </button>
          </div>

          <!-- Body -->
          <div class="p-5 bg-[#030a14] flex flex-col gap-4">
            <!-- Turno Base -->
            <div>
              <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Turno Regular de Trabalho</h4>
              <div class="grid grid-cols-2 gap-2">
                <button (click)="setPortalDayScale(getShiftCode(logged.shift))" 
                        class="flex items-center justify-between p-3 rounded-lg border border-[#10213b] bg-[#071426] hover:border-emerald-500/50 hover:bg-[#10213b] transition-all cursor-pointer text-left w-full">
                  <div>
                    <span class="block text-xs font-bold text-white uppercase">{{ getShiftCode(logged.shift) }}</span>
                    <span class="text-[9px] text-slate-400">Regular</span>
                  </div>
                  <span class="material-icons text-sm text-emerald-400">work</span>
                </button>
              </div>
            </div>

            <!-- Folga -->
            <div>
              <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Folga ou DSR</h4>
              <div class="grid grid-cols-2 gap-2">
                <button (click)="setPortalDayScale('F')" 
                        class="flex items-center justify-between p-3 rounded-lg border border-[#10213b] bg-[#071426] hover:border-emerald-500/50 hover:bg-[#10213b] transition-all cursor-pointer text-left w-full">
                  <div>
                    <span class="block text-xs font-bold text-white uppercase">F</span>
                    <span class="text-[9px] text-slate-400">Folga Escala</span>
                  </div>
                  <span class="material-icons text-sm text-emerald-400">event_available</span>
                </button>
              </div>
            </div>

            <!-- Afastamentos / Siglas cadastrados -->
            <div>
              <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Ausências / Afastamentos / Licenças</h4>
              <div class="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin">
                @for (sigla of scaleService.siglaTypes(); track sigla.code) {
                  <!-- Skip regular shifts or basic work codes if any -->
                  <button (click)="setPortalDayScale(sigla.code)" 
                          class="flex items-center justify-between p-3 rounded-lg border border-[#10213b] bg-[#071426] hover:border-emerald-500/50 hover:bg-[#10213b] transition-all cursor-pointer text-left w-full">
                    <div class="truncate">
                      <span class="block text-xs font-bold text-white uppercase truncate">{{ sigla.code }}</span>
                      <span class="text-[9px] text-slate-400 block truncate" [title]="sigla.label">{{ sigla.label }}</span>
                    </div>
                    <span class="material-icons text-sm text-rose-400 shrink-0">badge</span>
                  </button>
                }
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-5 py-4 border-t border-[#10213b]/60 bg-[#071426] flex justify-end">
            <button (click)="isPortalDayEditModalOpen.set(false)" 
                    class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer border-none">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    }
  }

  <!-- INICIO DO SISTEMA / ANNOUNCEMENT MODAL -->
  @if (showWelcomeModal()) {
    <div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-all duration-300">
      <div [class]="'w-full max-w-sm rounded-2xl border p-5 flex flex-col gap-4 shadow-2xl relative ' + 
                   (isLightTheme() ? 'bg-white border-slate-200 text-slate-900 shadow-slate-100/40' : 'bg-[#030a14] border-[#10213b] text-[#F8FAFC] shadow-black/25')"
           id="welcome_modal_container">
        
        <!-- Icon / Header -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <span class="material-icons text-lg">campaign</span>
          </div>
          <div class="text-left">
            <h3 class="text-xs font-black uppercase tracking-wider text-emerald-500">Comunicado aos Colaboradores</h3>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Atualização do Sistema Mobile</p>
          </div>
        </div>

        <!-- Content Message -->
        <div class="text-left text-xs space-y-2.5 leading-relaxed">
          <p class="font-medium" [class.text-slate-800]="isLightTheme()">
            Aplicativo disponibilizado para uso dos colaboradores (versão mobile) e em constante aperfeiçoamento.
          </p>
          <p class="text-slate-400 font-normal">
            A funcionalidade de solicitação de folgas está sendo implantada e pode apresentar oscilações momentâneas.
          </p>
          
          <div class="p-2.5 rounded-xl border flex items-start gap-2.5"
               [class]="isLightTheme() ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-200'">
            <span class="material-icons text-emerald-400 text-base shrink-0 mt-0.5">wb_sunny</span>
            <div class="text-[11px] leading-snug">
              <span class="font-bold block mb-0.5 text-emerald-400">Previsão do Tempo Inteligente</span>
              Novo sistema com previsão hora a hora para o aeroporto de Guarulhos (ideia desenvolvida com o <strong>Caio do setor de testes</strong>).
            </div>
          </div>
        </div>

        <!-- Signature & Button -->
        <div class="flex flex-col gap-3 mt-1 border-t pt-3.5 border-[#10213b]/60" [class.border-slate-200]="isLightTheme()">
          <div class="flex items-center justify-between">
            <div class="text-left">
              <span class="text-xs font-black text-white uppercase tracking-wide" [class.text-slate-800]="isLightTheme()">Anderson Horácio</span>
            </div>
            
            <button (click)="closeWelcomeModal()" 
                    class="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-[10px] uppercase tracking-widest rounded-lg transition-all cursor-pointer border-none shadow-md shadow-emerald-500/20"
                    id="btn_welcome_modal_ok">
              Ciente
            </button>
          </div>
        </div>

      </div>
    </div>
  }

  <!-- PRINT / SCREENSHOT PREVENTION WARNING MODAL -->
  @if (showPrintWarningModal()) {
    <div class="fixed inset-0 bg-[#020813]/85 backdrop-blur-sm flex items-center justify-center z-[110] animate-fade-in" id="print_warning_modal">
      <div class="bg-[#071426] border border-rose-500/30 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 animate-scale-up" [class.bg-white]="isLightTheme()" [class.border-rose-200]="isLightTheme()">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-2 border-b border-rose-500/20" [class.border-rose-100]="isLightTheme()">
          <h3 class="font-black text-xs text-rose-400 uppercase tracking-tight flex items-center gap-1.5" [class.text-rose-600]="isLightTheme()">
            <span class="material-icons text-rose-500 text-sm">warning</span>
            Captura de Tela / Impressão Detectada
          </h3>
          <button (click)="cancelPrintWarning()" class="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer outline-none" [class.hover:text-slate-900]="isLightTheme()">
            <span class="material-icons text-sm">close</span>
          </button>
        </div>

        <div class="space-y-3 text-left">
          <p class="text-[11px] text-slate-300 leading-relaxed font-sans" [class.text-slate-700]="isLightTheme()">
            A ação de impressão ou captura de tela (print) <strong class="text-rose-400" [class.text-rose-600]="isLightTheme()">não é recomendada</strong> enquanto o aplicativo está em estado de desenvolvimento.
          </p>
          <p class="text-[11px] text-slate-400 leading-relaxed font-sans" [class.text-slate-600]="isLightTheme()">
            Para garantir a segurança das informações corporativas e do design do nosso aplicativo, se você decidir continuar, <span class="text-amber-400 font-bold" [class.text-amber-600]="isLightTheme()">esta ação será registrada permanentemente no banco de dados</span> de auditoria para fins de ciência do desenvolvedor.
          </p>
          <div class="text-[9px] font-mono p-2 rounded border" [class]="isLightTheme() ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-[#030a14] border-[#10213b] text-slate-500'">
            Método detectado: {{ printWarningSource() }}
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-2.5 pt-3.5 border-t border-[#10213b]" [class.border-slate-100]="isLightTheme()">
          <button (click)="cancelPrintWarning()" 
                  class="px-4 py-2 border font-black text-[9px] uppercase rounded-lg cursor-pointer transition-colors outline-none"
                  [class]="isLightTheme() ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600' : 'border-[#10213b] bg-[#030a14] hover:bg-slate-800 text-slate-300'">
            Cancelar (Descartar)
          </button>
          <button (click)="confirmPrintWarning()" 
                  class="px-4 py-2 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-[9px] uppercase rounded-lg cursor-pointer transition-colors border-none outline-none">
            OK (Entendi e Registrar)
          </button>
        </div>

      </div>
    </div>
  }

  <!-- MODAL DE RECORTE E ZOOM DE FOTO DE PERFIL (CROP) -->
  @if (isCropModalOpen()) {
    <div class="fixed inset-0 z-[1200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn" id="crop_photo_modal_overlay">
      <div class="w-full max-w-md rounded-2xl p-5 shadow-2xl border transition-all duration-200 space-y-4 bg-white border-slate-200 text-slate-900" id="crop_photo_modal_card">
        
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-200 gap-2">
          <div class="flex items-center gap-2">
            <span class="material-icons text-emerald-500 text-lg">crop</span>
            <h3 class="font-black text-xs sm:text-sm uppercase tracking-wider text-slate-800">
              Recortar e Ajustar Foto
            </h3>
          </div>
          <button (click)="closeCropModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer border-none bg-transparent outline-none transition-colors">
            <span class="material-icons text-base">close</span>
          </button>
        </div>

        <!-- Área Interativa de Preview e Arrasto -->
        <div class="flex flex-col items-center justify-center gap-2">
          <p class="text-[10px] font-medium text-center text-slate-500">
            Arraste a imagem para reposicionar e use o zoom para ajustar dentro da moldura
          </p>

          <div class="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-slate-300 bg-black select-none cursor-grab active:cursor-grabbing shadow-inner flex items-center justify-center touch-none"
               (mousedown)="startCropDrag($event)"
               (mousemove)="onCropDrag($event)"
               (mouseup)="endCropDrag()"
               (mouseleave)="endCropDrag()"
               (touchstart)="startCropDrag($event)"
               (touchmove)="onCropDrag($event)"
               (touchend)="endCropDrag()">
            
            <!-- Imagem em edição -->
            <img [src]="cropImageSrc() || ''"
                 alt="Foto em edição"
                 class="max-w-none pointer-events-none transition-transform duration-75"
                 [style.transform]="'translate(' + cropOffsetX() + 'px, ' + cropOffsetY() + 'px) scale(' + cropZoom() + ')'"
                 referrerpolicy="no-referrer">

            <!-- Moldura circular com escurecimento das bordas -->
            <div class="absolute inset-0 pointer-events-none rounded-full border-2 border-emerald-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"></div>
          </div>
        </div>

        <!-- Controle de Zoom e Controles -->
        <div class="space-y-2 p-3 rounded-xl border bg-slate-50 border-slate-200">
          <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600">
            <span class="flex items-center gap-1">
              <span class="material-icons text-xs text-emerald-500">zoom_in</span>
              Zoom
            </span>
            <span class="font-mono text-emerald-500">{{ (cropZoom() * 100).toFixed(0) }}%</span>
          </div>

          <div class="flex items-center gap-3">
            <button (click)="zoomOutCrop()" title="Diminuir Zoom" class="p-1 rounded bg-slate-200 text-slate-700 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer border-none outline-none">
              <span class="material-icons text-sm">zoom_out</span>
            </button>

            <input type="range" min="0.5" max="3.5" step="0.05" [value]="cropZoom()" (input)="cropZoom.set(+$any($event.target).value)" class="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg outline-none">

            <button (click)="zoomInCrop()" title="Aumentar Zoom" class="p-1 rounded bg-slate-200 text-slate-700 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer border-none outline-none">
              <span class="material-icons text-sm">zoom_in</span>
            </button>

            <button (click)="resetCrop()" title="Centralizar e Resetar" class="p-1 px-2 text-[9px] font-bold rounded bg-slate-200 text-slate-700 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer border-none outline-none flex items-center gap-1">
              <span class="material-icons text-xs">center_focus_strong</span>
              Reset
            </button>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button (click)="closeCropModal()" class="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer transition-colors outline-none">
            Cancelar
          </button>
          <button (click)="applyPhotoCrop()" class="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 active:scale-95 font-bold text-xs uppercase tracking-wider text-white rounded-lg cursor-pointer transition-all border-none outline-none flex items-center gap-1.5 shadow-md">
            <span class="material-icons text-sm">check_circle</span>
            Aplicar e Salvar Foto
          </button>
        </div>

      </div>
    </div>
  }

}
</div>

```

### Arquivo: `src/app/app.ts`

```typescript
import { Component, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScaleService, Collaborator, ShiftType, SpecialDate, FolgaRequest } from './scale.service';
import * as pdfjsLib from 'pdfjs-dist';

if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

// Safe localStorage helper to prevent SecurityError/DOMException crashes in iframe/webview environments
function safeGetLocalStorage(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage !== null) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`localStorage.getItem blocked for ${key}:`, e);
  }
  return null;
}

function safeSetLocalStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage !== null) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn(`localStorage.setItem blocked for ${key}:`, e);
  }
}

// Safe localStorage helper to prevent SecurityError/DOMException crashes in iframe/webview environments
function safeRemoveLocalStorage(key: string): void {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage !== null) {
      window.localStorage.removeItem(key);
    }
  } catch (e) {
    console.warn(`localStorage.removeItem blocked for ${key}:`, e);
  }
}

// Safe sessionStorage helpers
function safeGetSessionStorage(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && 'sessionStorage' in window && window.sessionStorage !== null) {
      return window.sessionStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`sessionStorage.getItem blocked for ${key}:`, e);
  }
  return null;
}

function safeSetSessionStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && 'sessionStorage' in window && window.sessionStorage !== null) {
      window.sessionStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn(`sessionStorage.setItem blocked for ${key}:`, e);
  }
}

function safeRemoveSessionStorage(key: string): void {
  try {
    if (typeof window !== 'undefined' && 'sessionStorage' in window && window.sessionStorage !== null) {
      window.sessionStorage.removeItem(key);
    }
  } catch (e) {
    console.warn(`sessionStorage.removeItem blocked for ${key}:`, e);
  }
}

interface AppNotification {
  id: string;
  type: 'publish' | 'alert' | 'trade';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface HourlyWeatherItem {
  timeIso: string;
  timeLabel: string;
  dateLabel: string;
  hour: number;
  temp: number;
  rainProb: number;
  humidity: number;
  wind: number;
  weatherCode: number;
  conditionText: string;
  icon: string;
  isNight: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  host: {
    '(document:fullscreenchange)': 'onFullscreenChange()',
    '(document:click)': 'onDocumentClick($event)',
    '(window:resize)': 'onResize()'
  }
})
export class App {

  onResize() {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      if (this.activeSubTab() !== 'portal') {
        this.activeSubTab.set('portal');
      }
    }
  }
  public scaleService = inject(ScaleService);

  // Theme & Fullscreen states
  public isLightTheme = signal<boolean>(true);
  public isFullscreen = signal<boolean>(false);
  public portalSequenceTab = signal<'weeks' | 'stretches'>('weeks');
  public portalWidgetTab = signal<'trabalho' | 'semanas'>('trabalho');
  public turnVacationTab = signal<'work' | 'vacation'>('work');

  public setPortalSequenceTab(tab: 'weeks' | 'stretches'): void {
    this.portalSequenceTab.set(tab);
  }

  public setPortalWidgetTab(tab: 'trabalho' | 'semanas'): void {
    this.portalWidgetTab.set(tab);
  }

  public setTurnVacationTab(tab: 'work' | 'vacation'): void {
    this.turnVacationTab.set(tab);
    const logged = this.getLoggedCollab();
    if (logged) {
      const currentDay = this.selectedCalendarDay();
      if (tab === 'work') {
        const workDays = this.getCollabWorkDays(logged);
        if (workDays.length > 0 && !workDays.includes(currentDay)) {
          this.selectedCalendarDay.set(workDays[0]);
        }
      } else {
        const vacationDays = this.getCollabOffDays(logged);
        if (vacationDays.length > 0 && !vacationDays.includes(currentDay)) {
          this.selectedCalendarDay.set(vacationDays[0]);
        }
      }
    }
  }

  public toggleTheme(): void {
    const val = !this.isLightTheme();
    this.isLightTheme.set(val);
    if (val) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  public onFullscreenChange(): void {
    this.isFullscreen.set(!!document.fullscreenElement);
  }

  public onDocumentClick(event: MouseEvent): void {
    this.isDropdownOpen.set(false);
    this.isMonthPickerOpen.set(false);
    this.isMatrixOptionsOpen.set(false);
    this.isNotificationOpen.set(false);
  }

  public toggleNotificationMenu(event: MouseEvent): void {
    event.stopPropagation();
    const current = this.isNotificationOpen();
    this.isDropdownOpen.set(false);
    this.isMonthPickerOpen.set(false);
    this.isMatrixOptionsOpen.set(false);
    this.isNotificationOpen.set(!current);
  }

  public toggleDropdownMenu(event: MouseEvent): void {
    event.stopPropagation();
    const current = this.isDropdownOpen();
    this.isMonthPickerOpen.set(false);
    this.isMatrixOptionsOpen.set(false);
    this.isNotificationOpen.set(false);
    this.isDropdownOpen.set(!current);
  }

  public toggleMonthPickerMenu(event: MouseEvent): void {
    event.stopPropagation();
    const current = this.isMonthPickerOpen();
    this.isDropdownOpen.set(false);
    this.isMatrixOptionsOpen.set(false);
    this.isNotificationOpen.set(false);
    this.isMonthPickerOpen.set(!current);
  }

  public toggleMatrixOptionsMenu(event: MouseEvent): void {
    event.stopPropagation();
    const current = this.isMatrixOptionsOpen();
    this.isDropdownOpen.set(false);
    this.isMonthPickerOpen.set(false);
    this.isNotificationOpen.set(false);
    this.isMatrixOptionsOpen.set(!current);
  }

  public toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
        // Fallback toggle
        this.isFullscreen.set(!this.isFullscreen());
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  }

  // Sub tab navigation: 'matrix' | 'ger.turnos' | 'siglas' | 'team' | 'team-mgmt' | 'portal' | 'dashboard' | 'escala' | 'perfil' | 'equipe' | 'indicadores'
  public activeSubTab = signal<'matrix' | 'ger.turnos' | 'siglas' | 'team' | 'team-mgmt' | 'portal' | 'dashboard' | 'escala' | 'perfil' | 'equipe' | 'indicadores' | 'solicitacoes'>('portal');
  
  public teamViewMode = signal<'gallery' | 'mgmt'>('gallery');
  public editingCollab = signal<Collaborator | null>(null);
  public isPortalCollabListOpen = signal<boolean>(false);
  public isPortalRulesOpen = signal<boolean>(false);
  public isPortalEditingDates = signal<boolean>(false);
  public isProfileEditOpen = signal<boolean>(false);
  public teamDailyTab = signal<'trabalhando' | 'folgando'>('trabalhando');

  // Login e Fluxo de Primeiro Acesso
  public loginNameInput = signal<string>('');
  public loginPasswordInput = signal<string>('');
  public confirmPasswordInput = signal<string>('');
  public loginError = signal<string | null>(null);
  public matchedCollab = signal<Collaborator | null>(null);
  public isFirstAccess = signal<boolean>(false);
  
  public daysArray = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  public monthsArray = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Fev' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Abr' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Ago' },
    { value: '09', label: 'Set' },
    { value: '10', label: 'Out' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dez' }
  ];

  public getDayFromDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return parts[2];
    } else if (parts.length === 2) {
      return parts[1];
    }
    return '';
  }

  public getMonthFromDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return parts[1];
    } else if (parts.length === 2) {
      return parts[0];
    }
    return '';
  }
  public isCollabModalOpen = signal<boolean>(false);
  public isNewSectorMode = signal<boolean>(false);
  public isNewRoleMode = signal<boolean>(false);
  public newCollabPhotoData = signal<string | null>(null);

  public openCreateCollabModal(): void {
    this.editingCollab.set(null);
    this.newCollabPhotoData.set(null);
    this.isCollabModalOpen.set(true);
    this.isNewSectorMode.set(false);
    this.isNewRoleMode.set(false);
  }

  // Simulated Day of Month (1 to 31) for Folga request window check. Defaults to today's date.
  simulatedDayOfMonth = signal<number>(new Date().getDate());

  // New Collaborator Registration Fields
  newCollabBirthday = signal<string>('');
  newCollabSpecialDates = signal<SpecialDate[]>([
    { description: '', date: '', priority: 1 },
    { description: '', date: '', priority: 2 },
    { description: '', date: '', priority: 3 },
    { description: '', date: '', priority: 4 },
    { description: '', date: '', priority: 5 }
  ]);

  // Selected collaborator for detailed profile view
  selectedProfileCollabId = signal<string | null>(null);

  // Modal for day details and scheduled list
  public isDayDetailsModalOpen = signal<boolean>(false);
  public selectedDetailDay = signal<number | null>(null);
  public selectedDetailCollab = signal<any | null>(null);
  public dayDetailsActiveTab = signal<'seu_turno' | 'turno_posterior' | 'geral'>('seu_turno');
  public selectedCalendarDay = signal<number>(new Date().getDate());
  public hidePastDays = signal<boolean>(true);
  public coworkersFilter = signal<'MEU_TURNO' | 'TURNO_ANTERIOR' | 'TURNO_POSTERIOR' | 'TODOS'>('MEU_TURNO');

  // Weather Sub-Header Signals & Methods (Guarulhos Base)
  public rawHourlyWeather = signal<HourlyWeatherItem[]>([]);
  public weatherLoading = signal<boolean>(false);
  public weatherError = signal<string | null>(null);
  public weatherSelectedShift = signal<'AUTO' | 'HOJE'>('AUTO');
  public weatherExpanded = signal<boolean>(true);
  public selectedWeatherHourIdx = signal<number | null>(null);

  public weatherChartData = computed(() => {
    const list = this.shiftWeatherList();
    if (list.length === 0) {
      return {
        points: [],
        linePath: '',
        areaPath: '',
        minTemp: 0,
        maxTemp: 0
      };
    }

    const temps = list.map(item => item.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempDiff = maxTemp - minTemp;

    // Expand bounds for visual padding
    const tempMinLimit = minTemp - (tempDiff > 0 ? tempDiff * 0.25 : 4);
    const tempMaxLimit = maxTemp + (tempDiff > 0 ? tempDiff * 0.25 : 4);
    const limitDiff = tempMaxLimit - tempMinLimit || 1;

    const points = list.map((item, i) => {
      // 1000px width total, 40px margin on each side, so 920px usable span
      const x = (list.length > 1) ? (i / (list.length - 1)) * 920 + 40 : 500;
      // 110px height total. We'll map temperatures to y-values between 45 (top) and 80 (bottom)
      const y = 80 - ((item.temp - tempMinLimit) / limitDiff) * 35;
      
      const rainHeight = (item.rainProb / 100) * 25;
      const rainY = 90 - rainHeight;

      return {
        item,
        index: i,
        x,
        y,
        temp: item.temp,
        rainHeight,
        rainY
      };
    });

    let linePath = '';
    let areaPath = '';
    if (points.length > 0) {
      linePath = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const cpX1 = p0.x + (p1.x - p0.x) / 2;
        const cpY1 = p0.y;
        const cpX2 = p0.x + (p1.x - p0.x) / 2;
        const cpY2 = p1.y;
        linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
      }
      areaPath = linePath + ` L ${points[points.length - 1].x} 90 L ${points[0].x} 90 Z`;
    }

    return {
      points,
      linePath,
      areaPath,
      minTemp,
      maxTemp
    };
  });

  public activeWeatherItem = computed(() => {
    this.currentTimeString(); // Trigger reactivity on clock updates
    const list = this.shiftWeatherList();
    const raw = this.rawHourlyWeather();
    if (list.length === 0 && raw.length === 0) return null;

    const idx = this.selectedWeatherHourIdx();
    if (idx !== null && idx >= 0 && idx < list.length) {
      return list[idx];
    }

    // Default state: real-time current date and time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const timeLabel = `${String(currentHour).padStart(2, '0')}:${currentMinutes}`;
    const dateLabel = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Find weather forecast item for current hour
    let currentMatch = list.find(item => item.hour === currentHour);
    if (!currentMatch && raw.length > 0) {
      currentMatch = raw.find(item => item.hour === currentHour);
    }
    if (!currentMatch) {
      currentMatch = list[0] || raw[0];
    }

    return {
      ...currentMatch,
      timeLabel,
      dateLabel
    };
  });

  public async fetchWeatherForecast(): Promise<void> {
    this.weatherLoading.set(true);
    this.weatherError.set(null);
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-23.4356&longitude=-46.4731&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&forecast_days=2&timezone=America%2FSao_Paulo');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      if (data && data.hourly && Array.isArray(data.hourly.time)) {
        const times: string[] = data.hourly.time;
        const temps: number[] = data.hourly.temperature_2m || [];
        const humidities: number[] = data.hourly.relative_humidity_2m || [];
        const rainProbs: number[] = data.hourly.precipitation_probability || [];
        const codes: number[] = data.hourly.weather_code || [];
        const winds: number[] = data.hourly.wind_speed_10m || [];

        const items: HourlyWeatherItem[] = times.map((t, idx) => {
          const dateObj = new Date(t);
          const hour = dateObj.getHours();
          const timeLabel = `${String(hour).padStart(2, '0')}:00`;
          const dateLabel = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
          
          const code = codes[idx] ?? 0;
          const { text, icon } = this.getWmoWeatherDetails(code, hour);

          return {
            timeIso: t,
            timeLabel,
            dateLabel,
            hour,
            temp: Math.round(temps[idx] ?? 20),
            rainProb: Math.round(rainProbs[idx] ?? 0),
            humidity: Math.round(humidities[idx] ?? 50),
            wind: Math.round(winds[idx] ?? 10),
            weatherCode: code,
            conditionText: text,
            icon,
            isNight: hour < 6 || hour >= 18
          };
        });

        this.rawHourlyWeather.set(items);
      } else {
        throw new Error('Formato de resposta inválido');
      }
    } catch (err: unknown) {
      console.warn('Weather fetch warning, falling back to simulated weather:', err);
      this.rawHourlyWeather.set(this.generateFallbackWeather());
    } finally {
      this.weatherLoading.set(false);
    }
  }

  public getWmoWeatherDetails(code: number, hour: number): { text: string; icon: string } {
    const isNightTime = hour < 6 || hour >= 18;
    switch (code) {
      case 0:
        return { text: 'Céu Limpo', icon: isNightTime ? 'nights_stay' : 'wb_sunny' };
      case 1:
        return { text: 'Predominantemente Limpo', icon: isNightTime ? 'nights_stay' : 'wb_sunny' };
      case 2:
        return { text: 'Parcialmente Nublado', icon: isNightTime ? 'nights_stay' : 'partly_cloudy_day' };
      case 3:
        return { text: 'Nublado', icon: 'cloud' };
      case 45:
      case 48:
        return { text: 'Nevoeiro', icon: 'foggy' };
      case 51:
      case 53:
      case 55:
        return { text: 'Garoa Leve', icon: 'grain' };
      case 61:
      case 63:
        return { text: 'Chuva', icon: 'water_drop' };
      case 65:
        return { text: 'Chuva Forte', icon: 'water_drop' };
      case 80:
      case 81:
      case 82:
        return { text: 'Pancadas de Chuva', icon: 'umbrella' };
      case 95:
      case 96:
      case 99:
        return { text: 'Tempestade com Raios', icon: 'thunderstorm' };
      default:
        return { text: 'Parcialmente Nublado', icon: isNightTime ? 'nights_stay' : 'partly_cloudy_day' };
    }
  }

  public generateFallbackWeather(): HourlyWeatherItem[] {
    const items: HourlyWeatherItem[] = [];
    const now = new Date();
    for (let i = 0; i < 48; i++) {
      const d = new Date(now.getTime() + i * 3600000);
      const hour = d.getHours();
      const isNight = hour < 6 || hour >= 18;
      const temp = isNight ? 16 + (i % 3) : 22 + (i % 5);
      const rainProb = (hour >= 14 && hour <= 18) ? 30 : 5;
      const { text, icon } = this.getWmoWeatherDetails(rainProb > 25 ? 61 : 1, hour);
      items.push({
        timeIso: d.toISOString(),
        timeLabel: `${String(hour).padStart(2, '0')}:00`,
        dateLabel: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
        hour,
        temp,
        rainProb,
        humidity: 60,
        wind: 12,
        weatherCode: rainProb > 25 ? 61 : 1,
        conditionText: text,
        icon,
        isNight
      });
    }
    return items;
  }

  public getShiftHoursInfo(shiftStr?: string): { startHour: number; endHour: number; label: string } {
    const norm = (shiftStr || '').toUpperCase().trim();
    if (norm.includes('NOITE') || norm.includes('3ª') || norm.includes('3º') || norm.includes('NIGHT') || norm === 'N1' || norm === 'N2') {
      return { startHour: 21, endHour: 6, label: 'Turno Noite (21h00 às 06h00)' };
    }
    if (norm.includes('MANHÃ') || norm.includes('MANHA') || norm.includes('1ª') || norm.includes('1º') || norm === 'T1' || norm === 'M1') {
      return { startHour: 6, endHour: 15, label: 'Turno Manhã (06h00 às 15h00)' };
    }
    if (norm.includes('TARDE') || norm.includes('2ª') || norm.includes('2º') || norm === 'T2') {
      return { startHour: 15, endHour: 0, label: 'Turno Tarde (15h00 às 00h00)' };
    }
    if (norm.includes('ADM') || norm.includes('ADMIN') || norm.includes('7H20')) {
      return { startHour: 8, endHour: 17, label: 'Turno ADM (08h00 às 17h00)' };
    }
    return { startHour: 21, endHour: 6, label: 'Turno Operacional (21h00 às 06h00)' };
  }

  public shiftWeatherList = computed(() => {
    const raw = this.rawHourlyWeather();
    if (raw.length === 0) return [];

    const mode = this.weatherSelectedShift();

    if (mode === 'HOJE') {
      const now = new Date();
      const currentHour = now.getHours();
      const todayDateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;

      // Filter raw forecast items for today starting from current hour up to 23
      const todayItems = raw.filter(item => {
        return item.dateLabel === todayDateStr && item.hour >= currentHour;
      });

      if (todayItems.length > 0) {
        return todayItems;
      } else {
        // Fallback: slice from current hour up to remaining hours of the day
        let startIdx = raw.findIndex(item => item.hour === currentHour);
        if (startIdx === -1) startIdx = 0;
        const remainingHoursInDay = Math.max(1, 24 - currentHour);
        return raw.slice(startIdx, startIdx + remainingHoursInDay);
      }
    }

    const logged = this.getLoggedCollab();
    const shiftStr = logged ? logged.shift : '';
    const parsed = this.getShiftHoursInfo(shiftStr);
    const startHour = parsed.startHour;
    const endHour = parsed.endHour;

    let startIdx = raw.findIndex(item => item.hour === startHour);
    if (startIdx === -1) startIdx = 0;

    let totalItems = 10;
    if (startHour > endHour) {
      totalItems = (24 - startHour) + endHour + 1;
    } else if (endHour === 0) {
      totalItems = (24 - startHour) + 1;
    } else {
      totalItems = (endHour - startHour) + 1;
    }

    return raw.slice(startIdx, startIdx + totalItems);
  });

  public currentWeatherOverview = computed(() => {
    const list = this.shiftWeatherList();
    if (list.length === 0) {
      return { temp: '--', condition: 'Carregando...', icon: 'cloud', rainProb: 0, humidity: 0, wind: 0 };
    }
    const first = list[0];
    return {
      temp: `${first.temp}°C`,
      condition: first.conditionText,
      icon: first.icon,
      rainProb: first.rainProb,
      humidity: first.humidity,
      wind: first.wind
    };
  });

  public getLoggedCollabShiftLabel(): string {
    const logged = this.getLoggedCollab();
    const mode = this.weatherSelectedShift();
    if (mode === 'HOJE') {
      const currentHour = new Date().getHours();
      return `Visão: Hoje (${String(currentHour).padStart(2, '0')}h00 às 23h59)`;
    }
    if (logged) {
      const parsed = this.getShiftHoursInfo(logged.shift);
      return `Seu Turno: ${logged.shift || 'Operacional'} (${parsed.startHour.toString().padStart(2, '0')}h00 às ${parsed.endHour.toString().padStart(2, '0')}h00)`;
    }
    return 'Seu Turno: Operacional (21h00 às 06h00)';
  }

  // Chatbot Bob Signals & Methods
  public isBobChatOpen = signal<boolean>(false);
  public bobChatMessages = signal<{ sender: 'user' | 'bob'; text: string; timestamp: Date }[]>([]);
  public bobChatInput = signal<string>('');
  public isBobTyping = signal<boolean>(false);

  public scrollBobChatToBottom() {
    const scroll = () => {
      const chatEl = document.getElementById('bob_chat_body');
      if (chatEl) {
        chatEl.scrollTop = chatEl.scrollHeight;
        const lastMsg = chatEl.lastElementChild;
        if (lastMsg) {
          lastMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    };
    scroll();
    setTimeout(scroll, 30);
    setTimeout(scroll, 100);
    setTimeout(scroll, 250);
    setTimeout(scroll, 500);
  }

  public toggleBobChat() {
    const nextVal = !this.isBobChatOpen();
    this.isBobChatOpen.set(nextVal);
    if (nextVal) {
      if (this.bobChatMessages().length === 0) {
        const logged = this.getLoggedCollab();
        const welcomeText = logged
          ? `Olá, **${logged.name}**! Eu sou o **Bob**, o seu assistente de escala inteligente do Escala Easy VIBRA. 🤖🗓️\n\nComo posso te ajudar hoje? Você pode me perguntar sobre as suas folgas, com quem você trabalha hoje, ou pedir folga para o próximo mês!`
          : `Olá! Eu sou o **Bob**, o assistente de escala do Escala Easy VIBRA. Por favor, faça login para conversarmos!`;
        this.bobChatMessages.set([{ sender: 'bob', text: welcomeText, timestamp: new Date() }]);
      }
      this.scrollBobChatToBottom();
    }
  }

  async sendChatMessageToBob() {
    const text = this.bobChatInput().trim();
    if (!text) return;

    this.bobChatInput.set('');

    const timestamp = new Date();
    this.bobChatMessages.update(msgs => [...msgs, { sender: 'user', text, timestamp }]);
    this.scrollBobChatToBottom();
    
    this.isBobTyping.set(true);
    this.scrollBobChatToBottom();

    try {
      const logged = this.getLoggedCollab();
      const payload = {
        message: text,
        collabId: logged ? logged.id : null,
        simulatedDay: this.simulatedDayOfMonth(),
        activeMonth: this.scaleService.activeMonth(),
        activeYear: this.scaleService.activeYear()
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o Bob.');
      }

      const data = await response.json();
      
      this.bobChatMessages.update(msgs => [...msgs, { 
        sender: 'bob', 
        text: data.reply || 'Desculpe, tive um probleminha para processar sua mensagem.', 
        timestamp: new Date() 
      }]);
      this.scrollBobChatToBottom();

      if (data.action) {
        console.log('Bob executed an action on Supabase:', data.action);
        this.showToast(`Bob: Ação executada com sucesso!`);
        await this.scaleService.syncSupabase();
      }

    } catch (error) {
      console.error(error);
      this.bobChatMessages.update(msgs => [...msgs, { 
        sender: 'bob', 
        text: 'Ocorreu um erro ao falar com o Bob. Por favor, verifique sua conexão ou a chave de API.', 
        timestamp: new Date() 
      }]);
      this.scrollBobChatToBottom();
    } finally {
      this.isBobTyping.set(false);
      this.scrollBobChatToBottom();
    }
  }

  formatMarkdown(text: string): string {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^\s*-[\s]+(.*?)$/gm, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  public openCollabProfile(id: string): void {
    this.selectedProfileCollabId.set(id);
    this.teamViewMode.set('gallery');
    this.activeSubTab.set('team');
  }

  // Computes the active collaborator, falling back to the first one in the list
  selectedProfileCollab = computed<any>(() => {
    const list = this.scaleService.collaborators();
    if (list.length === 0) return null;
    const id = this.selectedProfileCollabId();
    if (id) {
      const found = list.find(c => c.id === id);
      if (found) return found;
    }
    return list[0]; // fallback to first
  });

  // Dynamically computes stats, fatigue indexes, and shift hours for the selected collaborator
  collabStats = computed(() => {
    return this.calculateStatsForCollab(this.selectedProfileCollab());
  });

  // Dynamically computes team-wide fatigue and energy statistics for the entire organization
  teamStats = computed(() => {
    const list = this.scaleService.collaborators();
    if (list.length === 0) {
      return {
        avgEnergy: 0,
        critCount: 0,
        limitCount: 0,
        totalHours: 0
      };
    }
    
    let totalEnergy = 0;
    let critCount = 0;
    let limitCount = 0;
    let totalHours = 0;
    
    list.forEach(collab => {
      const data = this.scaleService.calculateEnergyAndFatigue(collab);
      totalEnergy += data.energy;
      totalHours += data.totalHoursWorked;
      if (data.energy < 30) {
        critCount++;
      }
      if (data.alertaLimite) {
        limitCount++;
      }
    });
    
    return {
      avgEnergy: Math.round(totalEnergy / list.length),
      critCount,
      limitCount,
      totalHours: parseFloat(totalHours.toFixed(1))
    };
  });

  isSiglaAbsence(val: string): boolean {
    const upper = (val || '').toUpperCase().trim();
    if (!upper || upper === '-' || upper === '?') return false;
    
    // Base standard rest codes
    if (upper === 'X' || upper === 'BH' || upper === 'F' || upper === 'LM' || upper === 'CP' || upper === 'AT' || upper === 'W' || upper === 'FO' || upper === 'P' || upper === 'R' || upper === 'EX') {
      return true;
    }
    
    // Dynamic check
    const sigla = this.scaleService.siglaTypes().find(s => s.code.toUpperCase().trim() === upper);
    if (sigla && sigla.computaAusencia) {
      return true;
    }
    
    return false;
  }

  // Reusable method to calculate stats for any collaborator
  calculateStatsForCollab(collab: Collaborator | null) {
    if (!collab) return null;

    const scale = collab.scale || {};
    let workDays = 0;
    let offDays = 0;
    
    // Calculate sequences
    let currentWorkStreak = 0;
    let maxWorkStreak = 0;
    
    let currentOffStreak = 0;
    let maxOffStreak = 0;

    const defaultCode = this.getShiftCode(collab.shift);
    for (let d = 1; d <= 30; d++) {
      const rawVal = scale[d] || '-';
      const val = (rawVal === '-') ? defaultCode : rawVal;
      
      // Use dynamic absence check
      const isRest = this.isSiglaAbsence(val);
      
      if (!isRest) {
        workDays++;
        currentWorkStreak++;
        maxWorkStreak = Math.max(maxWorkStreak, currentWorkStreak);
        
        currentOffStreak = 0;
      } else {
        offDays++;
        currentOffStreak++;
        maxOffStreak = Math.max(maxOffStreak, currentOffStreak);
        
        currentWorkStreak = 0;
      }
    }

    // Fatigue classification
    let fatigueRisk: 'Baixo' | 'Moderado' | 'Crítico' = 'Baixo';
    let fatigueColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    let fatigueDescription = 'Ciclo de descanso balanceado. Excelente recuperação biológica.';

    if (maxWorkStreak >= 6) {
      fatigueRisk = 'Crítico';
      fatigueColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20 animate-pulse';
      fatigueDescription = 'Risco elevado de fadiga acumulada. Sequência contínua de ' + maxWorkStreak + ' dias no pátio. Recomenda-se escala de folga imediata para evitar incidentes operacionais.';
    } else if (maxWorkStreak === 5) {
      fatigueRisk = 'Moderado';
      fatigueColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      fatigueDescription = 'Atenção. Sequência de 5 dias trabalhados. Nível de alerta operacional intermediário.';
    }

    // Map shift to times dynamically
    let entryTime = '07:00';
    let exitTime = '15:20';
    const sCode = (collab.shift || '').trim().toUpperCase();
    const shiftType = this.scaleService.shiftTypes().find(s => 
      s.code.trim().toUpperCase() === sCode || 
      s.label.trim().toUpperCase() === sCode
    );
    if (shiftType && shiftType.startTime && shiftType.endTime) {
      entryTime = shiftType.startTime;
      exitTime = shiftType.endTime;
    } else {
      if (sCode === 'MANHÃ' || sCode === 'M') {
        entryTime = '06:00';
        exitTime = '14:00';
      } else if (sCode === 'TARDE' || sCode === 'T') {
        entryTime = '14:00';
        exitTime = '22:00';
      } else if (sCode === 'MADRUGADA' || sCode === 'NOITE' || sCode === 'N') {
        entryTime = '22:00';
        exitTime = '06:00';
      } else if (sCode === 'ADMINISTRATIVO' || sCode === 'ADM') {
        entryTime = '08:00';
        exitTime = '17:00';
      }
    }

    return {
      workDays,
      offDays,
      maxWorkStreak,
      maxOffStreak,
      fatigueRisk,
      fatigueColor,
      fatigueDescription,
      entryTime,
      exitTime
    };
  }

  getShiftCode(s: string): string {
    const norm = (s || '').toUpperCase().trim();
    const foundByCode = this.scaleService.shiftTypes().find(st => st.code.toUpperCase().trim() === norm);
    if (foundByCode) return foundByCode.code;

    const foundByLabel = this.scaleService.shiftTypes().find(st => st.label.toUpperCase().trim() === norm);
    if (foundByLabel) return foundByLabel.code;

    return norm;
  }

    getShiftLabel(collab: any): string {
    if (!collab || !collab.shift) return '-';
    const sCode = collab.shift.trim().toUpperCase();
    const shiftType = this.scaleService.shiftTypes().find(s => 
      s.code.trim().toUpperCase() === sCode || 
      s.label.trim().toUpperCase() === sCode
    );
    return shiftType ? shiftType.label : collab.shift;
  }

  getCollabHours(collab: any): string {
    if (collab && collab.hours) {
      return collab.hours;
    }
    if (!collab) return '07:00-15:20';
    const sCode = (collab.shift || '').trim().toUpperCase();
    const shiftType = this.scaleService.shiftTypes().find(s => 
      s.code.trim().toUpperCase() === sCode || 
      s.label.trim().toUpperCase() === sCode
    );
    if (shiftType && shiftType.startTime && shiftType.endTime) {
      return `${shiftType.startTime}-${shiftType.endTime}`;
    }
    
    if (sCode === 'MANHÃ' || sCode === 'M') {
      return '06:00-14:00';
    } else if (sCode === 'TARDE' || sCode === 'T') {
      return '14:00-22:00';
    } else if (sCode === 'MADRUGADA' || sCode === 'NOITE' || sCode === 'N') {
      return '22:00-06:00';
    } else if (sCode === 'ADMINISTRATIVO' || sCode === 'ADM') {
      return '08:00-17:00';
    }
    return '07:00-15:20';
  }

  getCollabScheduleRange(collab: any): string {
    if (!collab) return '';
    const hours = collab.hours || '';
    if (hours.includes('-')) {
      return hours.replace('-', 'às');
    }
    return hours;
  }

  getCollabPhoto(collab: unknown): string {
    const c = collab as { photoUrl?: string; photo?: string } | null;
    if (c && c.photoUrl) return c.photoUrl;
    if (c && c.photo) return c.photo;

    const isLight = this.isLightTheme();

    const delicateAvatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="softBgLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="softBgDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="avatarGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
    <linearGradient id="avatarGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="${isLight ? 'url(#softBgLight)' : 'url(#softBgDark)'}"/>
  <rect x="1" y="1" width="98" height="98" fill="none" stroke="${isLight ? '#CBD5E1' : '#1E293B'}" stroke-width="1.5" opacity="0.6"/>
  <g opacity="0.88">
    <circle cx="50" cy="37" r="14.5" fill="${isLight ? 'url(#avatarGradLight)' : 'url(#avatarGradDark)'}"/>
    <path d="M 50 53 C 32 53, 21 68, 21 84 C 21 86, 23 88, 25 88 L 75 88 C 77 88, 79 86, 79 84 C 79 68, 68 53, 50 53 Z" fill="${isLight ? 'url(#avatarGradLight)' : 'url(#avatarGradDark)'}"/>
  </g>
</svg>`;

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(delicateAvatarSvg);
  }

  // Signal & Estado do Modal de Recorte de Foto (Crop)
  public isCropModalOpen = signal<boolean>(false);
  public cropImageSrc = signal<string | null>(null);
  public cropZoom = signal<number>(1);
  public cropOffsetX = signal<number>(0);
  public cropOffsetY = signal<number>(0);

  private isDraggingCrop = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragStartOffsetX = 0;
  private dragStartOffsetY = 0;

  // Método de seleção de arquivo
  onProfilePhotoSelectedForCrop(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        this.cropImageSrc.set(e.target.result as string);
        this.cropZoom.set(1);
        this.cropOffsetX.set(0);
        this.cropOffsetY.set(0);
        this.isCropModalOpen.set(true);
      }
      if (input) input.value = '';
    };
    reader.readAsDataURL(file);
  }

  closeCropModal() {
    this.isCropModalOpen.set(false);
    this.cropImageSrc.set(null);
    this.cropZoom.set(1);
    this.cropOffsetX.set(0);
    this.cropOffsetY.set(0);
  }

  zoomInCrop() {
    this.cropZoom.update(z => Math.min(3.5, +(z + 0.15).toFixed(2)));
  }

  zoomOutCrop() {
    this.cropZoom.update(z => Math.max(0.5, +(z - 0.15).toFixed(2)));
  }

  resetCrop() {
    this.cropZoom.set(1);
    this.cropOffsetX.set(0);
    this.cropOffsetY.set(0);
  }

  // Drag / Arrasto da Foto
  startCropDrag(event: MouseEvent | TouchEvent) {
    this.isDraggingCrop = true;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
    this.dragStartOffsetX = this.cropOffsetX();
    this.dragStartOffsetY = this.cropOffsetY();
  }

  onCropDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDraggingCrop) return;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const deltaX = clientX - this.dragStartX;
    const deltaY = clientY - this.dragStartY;
    this.cropOffsetX.set(this.dragStartOffsetX + deltaX);
    this.cropOffsetY.set(this.dragStartOffsetY + deltaY);
  }

  endCropDrag() {
    this.isDraggingCrop = false;
  }

  // Aplica o recorte e gera imagem em alta resolução num Canvas
  applyPhotoCrop() {
    const imgSrc = this.cropImageSrc();
    if (!imgSrc) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const CROP_SIZE = 240;
      canvas.width = CROP_SIZE;
      canvas.height = CROP_SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, CROP_SIZE, CROP_SIZE);

      const baseScale = Math.max(CROP_SIZE / img.width, CROP_SIZE / img.height);
      const scale = baseScale * this.cropZoom();

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const centerX = CROP_SIZE / 2 + this.cropOffsetX();
      const centerY = CROP_SIZE / 2 + this.cropOffsetY();

      const drawX = centerX - drawWidth / 2;
      const drawY = centerY - drawHeight / 2;

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.88);

      const logged = this.getLoggedCollab();
      if (logged) {
        const updatedCollab: Collaborator = {
          ...logged,
          photo: croppedDataUrl,
          photoUrl: croppedDataUrl
        };
        this.scaleService.updateCollaborator(updatedCollab);
        this.showToast('Foto de perfil atualizada e recortada com sucesso!');
      }

      this.closeCropModal();
    };
    img.src = imgSrc;
  }

  // Real-time aviation clock
  currentTimeString = signal<string>('');

  // Dropdowns & Modals states
  public isDropdownOpen = signal<boolean>(false);
  public isMatrixOptionsOpen = signal<boolean>(false);
  public isNotificationOpen = signal<boolean>(false);
  public isAuthModalOpen = signal<boolean>(false);
  public authMode = signal<'LOGIN' | 'SIGNUP'>('LOGIN');
  public isImportModalOpen = signal<boolean>(false);
  public isDbModalOpen = signal<boolean>(false);
  public isSolicitarFolgaModalOpen = signal<boolean>(false);
  public folgaModalSelectedDay = signal<number | null>(null);
  public showWelcomeModal = signal<boolean>(!safeGetLocalStorage('welcome_modal_dismissed'));

  // Print prevention states
  public showPrintWarningModal = signal<boolean>(false);
  public printWarningSource = signal<string>('');

  public triggerPrintWarning(source: string) {
    this.printWarningSource.set(source);
    this.showPrintWarningModal.set(true);
  }

  public async confirmPrintWarning() {
    this.showPrintWarningModal.set(false);
    const source = this.printWarningSource() || 'Captura de tela/Impressão';
    const logged = this.getLoggedCollab();
    const userName = logged ? logged.name : 'USUÁRIO NÃO LOGADO';
    const description = `Usuário ${userName} confirmou tentativa de print/impressão via: ${source}.`;
    await this.scaleService.addAuditHistory('TENTATIVA_PRINT', description);
    this.showToast('Tentativa registrada no histórico de auditoria com sucesso!');
  }

  public cancelPrintWarning() {
    this.showPrintWarningModal.set(false);
    this.showToast('Ação cancelada pelo usuário.');
  }

  public closeWelcomeModal() {
    safeSetLocalStorage('welcome_modal_dismissed', 'true');
    this.showWelcomeModal.set(false);
  }

  isFolgaRequestPeriodOpen(): boolean {
    const today = this.simulatedDayOfMonth();
    return today >= 1 && today <= 10;
  }

  getNextMonthIndex(): number {
    return (this.selectedMonthIndex() + 1) % 12;
  }

  getNextMonthYear(): number {
    return this.selectedMonthIndex() === 11 ? this.currentYear() + 1 : this.currentYear();
  }

  getNextMonthCalendarDays(): any[] {
    const year = this.getNextMonthYear();
    const month = this.getNextMonthIndex();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday
    
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ empty: true });
    }
    
    const dateStrPrefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
    const collabs = this.scaleService.collaborators();
    const logged = this.getLoggedCollab();
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = dateStrPrefix + String(d).padStart(2, '0');
      
      const requesters = collabs.filter(c => 
        (c.folgaRequests || []).some(r => r.date === dateStr)
      );
      
      const hasRequested = logged ? requesters.some(r => r.id === logged.id) : false;
      
      days.push({
        empty: false,
        day: d,
        dateStr: dateStr,
        requesters: requesters,
        hasRequested: hasRequested,
        isFull: requesters.length >= 3 && !hasRequested,
        count: requesters.length
      });
    }
    
    return days;
  }

  // Database Connection Indicator
  dbStatus = signal<'checking' | 'connected' | 'error'>('connected');

  // Toast System
  toastMessage = signal<string | null>(null);

  // Paintbrush Mass Edit Mode
  showPaintbrushPanel = signal<boolean>(false);
  activePaintbrush = signal<string | null>(null);

  // Row-level inline editing signals
  editingRowCollabId = signal<string | null>(null);
  editingRowScaleDraft = signal<Record<number, string>>({});

  // Filter systems
  collabSearchQuery = signal<string>('');
  selectedFilterRole = signal<string>('TODOS');
  selectedFilterSector = signal<string>('TODOS');
  selectedFilterShift = signal<string>('TODOS');

  // Dynamic database-driven filter options (Single Source of Truth)
  availableSectors = computed(() => {
    const collabs = this.scaleService.collaborators();
    const sectorsSet = new Set<string>(['Geral']);
    collabs.forEach(c => {
      if (c.sector) {
        const s = c.sector.trim();
        if (s) sectorsSet.add(s);
      }
    });
    return Array.from(sectorsSet).sort((a, b) => a.localeCompare(b));
  });

  availableRoles = computed(() => {
    const collabs = this.scaleService.collaborators();
    const rolesSet = new Set<string>(['OPERADOR', 'LIDER', 'SUPERVISOR']);
    collabs.forEach(c => {
      if (c.role) {
        const r = c.role.trim();
        if (r) rolesSet.add(r);
      }
    });
    return Array.from(rolesSet).sort((a, b) => a.localeCompare(b));
  });

  availableShifts = computed(() => {
    return this.scaleService.shiftTypes();
  });

  // Dedicated filters and sorting for "Quadro de Colaboradores" admin table
  adminSearchQuery = signal<string>('');
  adminFilterRole = signal<string>('TODOS');
  adminFilterShift = signal<string>('TODOS');
  adminSortOrder = signal<'asc' | 'desc'>('asc');

  // Computed stats counters
  collaboratorsCountByShift = computed(() => {
    const collabs = this.scaleService.collaborators();
    const counts: Record<string, number> = { 'MANHÃ': 0, 'TARDE': 0, 'MADRUGADA': 0, 'ADMINISTRATIVO': 0, 'NOITE': 0 };
    collabs.forEach(c => {
      const s = (c.shift || '').toUpperCase().trim();
      if (s.startsWith('MANHÃ') || s.startsWith('MANHA') || s === 'M') {
        counts['MANHÃ']++;
      } else if (s.startsWith('TARDE') || s === 'T') {
        counts['TARDE']++;
      } else if (s.startsWith('MADRUGADA') || s.startsWith('NOITE') || s === 'N') {
        counts['NOITE']++;
      } else if (s.startsWith('ADMINISTRATIVO') || s === 'ADM') {
        counts['ADMINISTRATIVO']++;
      } else {
        if (s in counts) {
          counts[s]++;
        } else {
          counts['MANHÃ']++;
        }
      }
    });
    return counts;
  });

  dailyAvailableCollaborators = computed(() => {
    const days = this.daysInMonth();
    const collabs = this.filteredCollaborators();
    
    const availableCountByDay: Record<number, number> = {};
    
    days.forEach(day => {
      let count = 0;
      collabs.forEach(c => {
        const val = c.scale[day] || '-';
        // Only count as available if it's NOT an absence AND NOT a blank day ('-')
        const isAbsence = this.isSiglaAbsence(val);
        const isBlank = val === '-';
        if (!isAbsence && !isBlank) {
          count++;
        }
      });
      availableCountByDay[day] = count;
    });
    
    return availableCountByDay;
  });

  public selectedDailyDashDay = signal<number>(new Date().getDate());

  dailyDashSummary = computed(() => {
    const day = this.selectedDailyDashDay();
    const collabs = this.scaleService.collaborators();
    const shifts = this.scaleService.shiftTypes();
    const siglas = this.scaleService.siglaTypes();
    
    // Grouping
    const working: {collab: any, shift: any, val: string, energy: number}[] = [];
    const absent: {collab: any, sigla: any, val: string}[] = [];
    const unknown: {collab: any, val: string}[] = [];

    const getEnergy = (collab: any, targetDay: number) => {
      let streak = 0;
      for (let d = targetDay; d >= 1; d--) {
        const v = collab.scale[d] || '-';
        if (!this.isSiglaAbsence(v) && v !== '-') {
          streak++;
        } else {
          break;
        }
      }
      return Math.max(10, 100 - ((streak - 1) * 20));
    };

    collabs.forEach(c => {
      const val = (c.scale[day] || '-').trim().toUpperCase();
      if (val === '-') {
        unknown.push({collab: c, val});
      } else if (this.isSiglaAbsence(val)) {
        const sigla = siglas.find(s => s.code.toUpperCase() === val) || null;
        absent.push({collab: c, sigla, val});
      } else {
        const shift = shifts.find(s => s.code.toUpperCase() === val) || null;
        working.push({collab: c, shift, val, energy: getEnergy(c, day)});
      }
    });

    const workingByShift: Record<string, { shift: any, items: typeof working }> = {};
    working.forEach(w => {
      const code = w.shift ? w.shift.code : w.val;
      if (!workingByShift[code]) {
        workingByShift[code] = { shift: w.shift, items: [] };
      }
      workingByShift[code].items.push(w);
    });

    const absentBySigla: Record<string, { sigla: any, items: typeof absent }> = {};
    absent.forEach(a => {
      const code = a.sigla ? a.sigla.code : a.val;
      if (!absentBySigla[code]) {
        absentBySigla[code] = { sigla: a.sigla, items: [] };
      }
      absentBySigla[code].items.push(a);
    });

    return {
      day,
      working,
      absent,
      unknown,
      workingByShift: Object.values(workingByShift).sort((a,b) => (a.shift?.code || '').localeCompare(b.shift?.code || '')),
      absentBySigla: Object.values(absentBySigla).sort((a,b) => (a.sigla?.code || '').localeCompare(b.sigla?.code || ''))
    };
  });

  collaboratorsCountBySector = computed(() => {
    const collabs = this.scaleService.collaborators();
    const counts: Record<string, number> = {
      'GERAL': 0,
      'GESTÃO': 0,
      'CENTRAL': 0,
      'AERÓDROMO': 0,
      'VIP': 0,
      'TESTE': 0,
      'MANUTENÇÃO': 0
    };
    collabs.forEach(c => {
      let s = (c.sector || '').toUpperCase().trim();
      if (s === 'GESTAO') s = 'GESTÃO';
      if (s === 'MANUTENCAO') s = 'MANUTENÇÃO';
      if (s === 'AERODROMO') s = 'AERÓDROMO';
      if (s) {
        if (s in counts) {
          counts[s]++;
        } else {
          counts[s] = 1;
        }
      }
    });
    return counts;
  });

  // Signals and helper methods for selected collaborator details (Important Dates, Folgas, Team of the Day)
  selectedCollabTeamDayTab = signal<'today' | 'tomorrow' | 'other'>('today');
  selectedCollabTeamDayOther = signal<number>(new Date().getDate());

  // --- Direct Edit Dates Logic ---
  public readonly daysOptions = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  public readonly monthsOptions = [
    { value: '01', name: 'Jan' },
    { value: '02', name: 'Fev' },
    { value: '03', name: 'Mar' },
    { value: '04', name: 'Abr' },
    { value: '05', name: 'Mai' },
    { value: '06', name: 'Jun' },
    { value: '07', name: 'Jul' },
    { value: '08', name: 'Ago' },
    { value: '09', name: 'Set' },
    { value: '10', name: 'Out' },
    { value: '11', name: 'Nov' },
    { value: '12', name: 'Dez' }
  ];

  public editingSpecialDates = signal<{date: string, description: string, priority: number}[]>([]);

  public openDaySelectorForIndex = signal<number | null>(null);
  public openMonthSelectorForIndex = signal<number | null>(null);
  public specialDateToDeleteIndex = signal<number | null>(null);

  isMonthDisabled(month: string, day: string): boolean {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    if (d === 31) {
      return [2, 4, 6, 9, 11].includes(m);
    }
    if (d === 30) {
      return m === 2;
    }
    return false;
  }

  clearSpecialDates() {
    this.editingSpecialDates.set([]);
  }

  openEditSpecialDates() {
    this.isPortalEditingDates.set(true);
    const logged = this.getLoggedCollab();
    if (logged) {
       const currentDates = JSON.parse(JSON.stringify(logged.specialDates || []))
         .filter((d: any) => d && d.description && !d.description.startsWith('BOB_METADATA:'));
       this.editingSpecialDates.set(currentDates);
    }
  }

  updateSpecialDateDay(index: number, dayValue: string) {
    this.editingSpecialDates.update(dates => {
      const newDates = [...dates];
      if (index >= 0 && index < newDates.length) {
        const currentVal = newDates[index].date || '2026-01-01';
        const parts = currentVal.split('-');
        const year = parts[0] || '2026';
        const month = parts[1] || '01';
        const newDay = dayValue.padStart(2, '0');
        // If we selected 31, but month doesn't support it, maybe change month? No, the rule is to disable months when 31 is selected.
        // Wait, if we change the day to 31, and current month is Feb, we should probably change the month to Jan so we don't have an invalid date.
        let newMonth = month;
        if (this.isMonthDisabled(month, newDay)) {
           newMonth = '01'; // Default to Jan if current month is disabled
        }

        newDates[index] = {
          ...newDates[index],
          date: `${year}-${newMonth}-${newDay}`
        };
      }
      this.openDaySelectorForIndex.set(null);
      return newDates;
    });
  }

  updateSpecialDateMonth(index: number, monthValue: string) {
    this.editingSpecialDates.update(dates => {
      const newDates = [...dates];
      if (index >= 0 && index < newDates.length) {
        const currentVal = newDates[index].date || '2026-01-01';
        const parts = currentVal.split('-');
        const year = parts[0] || '2026';
        const day = parts[2] || '01';
        
        if (this.isMonthDisabled(monthValue, day)) {
            // Cannot select this month! Wait, we disable it in UI so user can't click it. But just in case:
            return newDates;
        }

        newDates[index] = {
          ...newDates[index],
          date: `${year}-${monthValue.padStart(2, '0')}-${day}`
        };
      }
      this.openMonthSelectorForIndex.set(null);
      return newDates;
    });
  }

  updateSpecialDateRow(index: number, field: 'date' | 'description', value: string) {
    this.editingSpecialDates.update(dates => {
      const newDates = [...dates];
      newDates[index] = { ...newDates[index], [field]: value };
      return newDates;
    });
  }

  addSpecialDateRow() {
    this.editingSpecialDates.update(dates => [...dates, { date: '2026-01-01', description: '', priority: 1 }]);
  }

  removeSpecialDateRow(index: number) {
    this.specialDateToDeleteIndex.set(index);
  }

  confirmDeleteSpecialDate() {
    const index = this.specialDateToDeleteIndex();
    if (index !== null) {
      this.editingSpecialDates.update(dates => {
        const newDates = [...dates];
        newDates.splice(index, 1);
        return newDates;
      });
      this.specialDateToDeleteIndex.set(null);
    }
  }

  cancelDeleteSpecialDate() {
    this.specialDateToDeleteIndex.set(null);
  }

  saveSpecialDates() {
    const logged = this.getLoggedCollab();
    if (!logged) return;
    const validDates = this.editingSpecialDates().filter(d => d.date && d.description);
    const metaDates = (logged.specialDates || []).filter(d => d && d.description && d.description.startsWith('BOB_METADATA:'));
    const updated = {
       ...logged,
       specialDates: [...validDates, ...metaDates]
    };
    this.scaleService.updateCollaborator(updated);
    this.isPortalEditingDates.set(false);
    this.showToast('Datas importantes atualizadas com sucesso!');
  }

  getImportantDatesForCollab(collab: any): { dateLabel: string; day: string; monthLabel: string; label: string; icon: string; color: string; details: string; priorityLabel?: string; rawDate: string; isBirthday?: boolean; priorityValue?: number }[] {
    if (!collab) return [];
    const dates: { dateLabel: string; day: string; monthLabel: string; label: string; icon: string; color: string; details: string; priorityLabel?: string; rawDate: string; isBirthday?: boolean; priorityValue?: number }[] = [];
    
    // Birthday
    if (collab.birthday) {
      const parts = collab.birthday.split('-');
      if (parts.length === 3) {
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        
        dates.push({
          dateLabel: `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`,
          day: String(d).padStart(2, '0'),
          monthLabel: monthNames[m - 1],
          label: 'Aniversário',
          icon: 'cake',
          color: 'text-rose-500 bg-rose-500/10 border-rose-500/20 text-rose-500',
          details: 'Folga regulamentar assegurada',
          rawDate: collab.birthday,
          isBirthday: true,
          priorityValue: 0 // Highest priority
        });
      }
    }

    // Special dates
    if (collab.specialDates && Array.isArray(collab.specialDates)) {
      for (const sd of collab.specialDates) {
        if (!sd.date || !sd.description || sd.description.startsWith('BOB_METADATA:')) continue;
        const parts = sd.date.split('-');
        if (parts.length === 3) {
          const m = parseInt(parts[1], 10);
          const d = parseInt(parts[2], 10);
          const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
          
          const descLower = sd.description.toLowerCase();
          let icon = 'celebration';
          let color = 'text-amber-500 bg-amber-500/10 border-amber-500/20 text-amber-500';
          
          if (descLower.includes('casamento') || descLower.includes('aliança') || descLower.includes('alianca') || descLower.includes('wedding') || descLower.includes('bodas') || descLower.includes('marido') || descLower.includes('esposa') || descLower.includes('conjuge') || descLower.includes('cônjuge') || descLower.includes('noivado')) {
            icon = 'favorite';
            color = 'text-red-500 bg-red-500/10 border-red-500/20 text-red-500';
          } else if (descLower.includes('filho') || descLower.includes('filha') || descLower.includes('criança') || descLower.includes('crianca') || descLower.includes('bebe') || descLower.includes('bebê') || descLower.includes('nascimento') || descLower.includes('child') || descLower.includes('baby') || descLower.includes('maternidade') || descLower.includes('paternidade')) {
            icon = 'child_care';
            color = 'text-blue-500 bg-blue-500/10 border-blue-500/20 text-blue-500';
          }

          dates.push({
            dateLabel: `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`,
            day: String(d).padStart(2, '0'),
            monthLabel: monthNames[m - 1],
            label: sd.description,
            icon,
            color,
            details: 'Preferência de escala',
            priorityLabel: `P${sd.priority || 1}`,
            rawDate: sd.date,
            isBirthday: false,
            priorityValue: sd.priority || 1
          });
        }
      }
    }

    return dates.sort((a, b) => (a.priorityValue || 0) - (b.priorityValue || 0));
  }

  getRequestedFolgasForCollab(collab: any): { day: number; formattedDate: string; isApproved: boolean; count: number; details: string }[] {
    if (!collab || !collab.folgaRequests || !Array.isArray(collab.folgaRequests)) return [];
    
    const result: { day: number; formattedDate: string; isApproved: boolean; count: number; details: string }[] = [];
    
    for (const fr of collab.folgaRequests) {
      if (!fr.date) continue;
      const parts = fr.date.split('-');
      if (parts.length === 3) {
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        const count = this.getFolgaRequestCount(d);
        const scaleVal = collab.scale ? (collab.scale[d] || 'X') : 'X';
        const isApproved = scaleVal === 'F';
        
        if (isApproved) continue; // Do not show approved ones
        
        result.push({
          day: d,
          formattedDate: `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`,
          isApproved,
          count,
          details: 'Pendente'
        });
      }
    }
    
    return result.sort((a, b) => a.day - b.day);
  }

  getFolgaRequestSlots(collab: any) {
    const requests = this.getRequestedFolgasForCollab(collab);
    const slots = [];
    for (let i = 0; i < 3; i++) {
      if (i < requests.length) {
        slots.push({ ...requests[i], isEmpty: false, id: `req-${requests[i].day}` });
      } else {
        slots.push({ isEmpty: true, id: `empty-${i}` });
      }
    }
    return slots;
  }

  getCollabTeamForDay(collab: any, dayOffset: number | 'other'): any[] {
    if (!collab) return [];
    
    let targetDay = new Date().getDate();
    if (dayOffset === 'other') {
      targetDay = this.selectedCollabTeamDayOther();
    } else {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + dayOffset);
      targetDay = targetDate.getDate();
    }
    
    const myShiftCode = this.getCollabEffectiveShiftForDay(collab, targetDay);
    if (!myShiftCode || myShiftCode === 'FOLGA' || !this.isWorkDay(collab, targetDay)) {
      const baseShift = (collab.shift || '').trim().toUpperCase();
      return this.scaleService.collaborators().filter(c => {
        if (!this.isWorkDay(c, targetDay)) return false;
        return this.getCollabEffectiveShiftForDay(c, targetDay) === baseShift;
      });
    }
    
    return this.scaleService.collaborators().filter(c => {
      if (!this.isWorkDay(c, targetDay)) return false;
      return this.getCollabEffectiveShiftForDay(c, targetDay) === myShiftCode;
    });
  }

  getCollabTeamShiftLabelForDay(collab: any, dayOffset: number | 'other'): string {
    if (!collab) return '';
    let targetDay = new Date().getDate();
    if (dayOffset === 'other') {
      targetDay = this.selectedCollabTeamDayOther();
    } else {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + dayOffset);
      targetDay = targetDate.getDate();
    }
    
    const myShiftCode = this.getCollabEffectiveShiftForDay(collab, targetDay);
    const code = (myShiftCode && myShiftCode !== 'FOLGA') ? myShiftCode : (collab.shift || '').trim().toUpperCase();
    const shiftType = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === code);
    return shiftType ? `${shiftType.label} (${shiftType.code})` : code;
  }

  // Month Selection and Navigation System
  monthsList = [
    { name: 'Janeiro', shortName: 'JAN' },
    { name: 'Fevereiro', shortName: 'FEV' },
    { name: 'Março', shortName: 'MAR' },
    { name: 'Abril', shortName: 'ABR' },
    { name: 'Maio', shortName: 'MAI' },
    { name: 'Junho', shortName: 'JUN' },
    { name: 'Julho', shortName: 'JUL' },
    { name: 'Agosto', shortName: 'AGO' },
    { name: 'Setembro', shortName: 'SET' },
    { name: 'Outubro', shortName: 'OUT' },
    { name: 'Novembro', shortName: 'NOV' },
    { name: 'Dezembro', shortName: 'DEZ' }
  ];

  selectedMonthIndex = signal<number>(new Date().getMonth());
  currentYear = signal<number>(new Date().getFullYear());
  isMonthPickerOpen = signal<boolean>(false);
  showFilters = signal<boolean>(false);

  // Computed properties for the active month
  currentMonthName = computed(() => this.monthsList[this.selectedMonthIndex()].name);
  
  activeFiltersCount = computed(() => {
    let count = 0;
    if (this.collabSearchQuery().trim() !== '') count++;
    if (this.selectedFilterRole() !== 'TODOS') count++;
    if (this.selectedFilterSector() !== 'TODOS') count++;
    if (this.selectedFilterShift() !== 'TODOS') count++;
    return count;
  });

  // Days list for the selected month dynamically calculated as a signal
  daysInMonth = computed(() => {
    const year = this.currentYear();
    const month = this.selectedMonthIndex();
    const count = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => i + 1);
  });

  isWorkStatus(code: string | undefined | null): boolean {
    if (!code) return false;
    const upper = code.trim().toUpperCase();
    if (upper === '-' || upper === '' || upper === '?') return false;
    
    // If it is marked as an absence sigla, it is not a working status
    if (this.isSiglaAbsence(upper)) {
      return false;
    }
    
    // Numbers or shift abbreviations (e.g., M, T, N, ADM) are considered present
    return true;
  }

  dailyWorkingCounts = computed(() => {
    const collabs = this.filteredCollaborators();
    const days = this.daysInMonth();
    const counts: Record<number, number> = {};
    
    days.forEach(day => {
      let count = 0;
      collabs.forEach(collab => {
        const rawVal = collab.scale[day] || '-';
        const val = (rawVal === '-') ? this.getShiftCode(collab.shift) : rawVal;
        if (this.isWorkStatus(val)) {
          count++;
        }
      });
      counts[day] = count;
    });
    return counts;
  });

  prevMonth(): void {
    if (this.selectedMonthIndex() === 0) {
      this.selectedMonthIndex.set(11);
      this.currentYear.set(this.currentYear() - 1);
    } else {
      this.selectedMonthIndex.set(this.selectedMonthIndex() - 1);
    }
    this.isMonthPickerOpen.set(false);
  }

  nextMonth(): void {
    if (this.selectedMonthIndex() === 11) {
      this.selectedMonthIndex.set(0);
      this.currentYear.set(this.currentYear() + 1);
    } else {
      this.selectedMonthIndex.set(this.selectedMonthIndex() + 1);
    }
    this.isMonthPickerOpen.set(false);
  }

  selectMonth(index: number): void {
    this.selectedMonthIndex.set(index);
    this.isMonthPickerOpen.set(false);
  }

  // Notifications State
  notifications = signal<AppNotification[]>([
    {
      id: 'n_update_1',
      type: 'publish',
      message: 'Atualização de melhorias realizada em 23/07/2026 às 20:00: Novo visual do dashboard e otimização do gráfico de temperatura.',
      timestamp: '23/07/2026, 20:00',
      read: false
    }
  ]);

  // Unread notifications counter
  unreadNotificationsCount = computed(() => {
    return this.notifications().filter(n => !n.read).length;
  });

  // Shift manager editing state
  newShiftCode = signal<string>('');
  newShiftLabel = signal<string>('');
  newShiftHours = signal<string>('7h20');
  newShiftColor = signal<string>('#3b82f6');
  newShiftTextColor = signal<string>('#ffffff');
  newShiftTransparentBg = signal<boolean>(false);
  newShiftDarkColor = signal<string>('#3b82f6');
  newShiftDarkTextColor = signal<string>('#ffffff');
  newShiftDarkTransparentBg = signal<boolean>(false);
  editingShiftCode = signal<string | null>(null);
  activeShiftThemeTab = signal<'light' | 'dark'>('light');

  // Sigla manager editing state
  newSiglaCode = signal<string>('');
  newSiglaLabel = signal<string>('');
  newSiglaColor = signal<string>('#64748b');
  newSiglaTextColor = signal<string>('#ffffff');
  newSiglaDescription = signal<string>('');
  newSiglaComputaAusencia = signal<boolean>(false);
  newSiglaTransparentBg = signal<boolean>(false);
  newSiglaDarkColor = signal<string>('#64748b');
  newSiglaDarkTextColor = signal<string>('#ffffff');
  newSiglaDarkTransparentBg = signal<boolean>(false);
  editingSiglaCode = signal<string | null>(null);
  activeSiglaThemeTab = signal<'light' | 'dark'>('light');

  // Lists for hour and minute dropdowns
  hoursList = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  minutesList = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Hour/Minute selectors for shift creation/editing
  startHour = signal<string>('07');
  startMinute = signal<string>('00');
  endHour = signal<string>('16');
  endMinute = signal<string>('00');

  // Computed signal to calculate shift duration automatically (Entrance vs Exit)
  calculatedShiftHours = computed(() => {
    const sH = parseInt(this.startHour(), 10) || 0;
    const sM = parseInt(this.startMinute(), 10) || 0;
    const eH = parseInt(this.endHour(), 10) || 0;
    const eM = parseInt(this.endMinute(), 10) || 0;

    let totalMinutes = 0;
    const startTotal = sH * 60 + sM;
    const endTotal = eH * 60 + eM;

    if (endTotal >= startTotal) {
      totalMinutes = endTotal - startTotal;
    } else {
      // Crosses midnight (e.g. 22:00 to 06:00)
      totalMinutes = (24 * 60 - startTotal) + endTotal;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const padMin = minutes.toString().padStart(2, '0');
    return `${hours}h${padMin}`;
  });

  // Selected collaborator and target shift for quick reallocation
  assignmentCollabId = signal<string>('');
  assignmentShiftCode = signal<string>('');

  // Portal do Colaborador (Frente C)
  selectedSimulatedCollabId = signal<string | null>(null);
  hasInitiallyLogged = signal<boolean>(false);
  collaboratorProfileDarkMode = signal<boolean>(true);
  isPortalDayEditModalOpen = signal<boolean>(false);
  portalEditSelectedDay = signal<number>(1);

  // Permuta (Trade Shift) simulation state
  isPermutaModalOpen = signal<boolean>(false);
  permutaSelectedDay = signal<number>(1);
  permutaTargetCollabId = signal<string>('');
  permutaStatusMessage = signal<string>('');

  // Gemini Upload & Scan
  importingState = signal<'idle' | 'processing' | 'done'>('idle');
  scannedTextResult = signal<string>('');
  scannedDataParsed = signal<any[]>([]);
  unrecognizedCodes = signal<string[]>([]);

  public isHoracio(collab: Collaborator | null): boolean {
    if (!collab) return false;
    const nameNorm = collab.name
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
    const isHoracioName = nameNorm === 'HORACIO' || nameNorm.startsWith('HORACIO') || nameNorm.includes('HORACIO');
    const isAdminRole = collab.role.toUpperCase() === 'ADMINISTRADOR' || collab.role.toUpperCase() === 'ADMIN';
    return collab.id === '058' || isHoracioName || isAdminRole;
  }

  public isAdmin(collab: Collaborator | null): boolean {
    if (!collab) return false;
    return !!collab.isAdmin || this.isHoracio(collab);
  }

  public canEdit(): boolean {
    const logged = this.getLoggedCollab();
    if (logged && this.isAdmin(logged)) {
      return true;
    }
    return this.scaleService.currentRole() !== 'OPERADOR';
  }

  private inactivityTimeoutId: any = null;

  public resetInactivityTimer() {
    if (typeof window === 'undefined') return;
    
    const loggedId = this.selectedSimulatedCollabId();
    if (loggedId) {
      safeSetLocalStorage('lastActivityTime', Date.now().toString());

      if (this.inactivityTimeoutId) {
        clearTimeout(this.inactivityTimeoutId);
      }

      this.inactivityTimeoutId = setTimeout(() => {
        this.logoutDueToInactivity();
      }, 5 * 60 * 1000); // 5 minutes inactivity
    }
  }

  private logoutDueToInactivity() {
    if (this.selectedSimulatedCollabId()) {
      this.logout();
      this.showToast('Sessão encerrada por inatividade de 5 minutos.');
    }
  }

  constructor() {
    effect(() => {
      const loggedId = this.selectedSimulatedCollabId();
      this.scaleService.selectedSimulatedCollabId.set(loggedId);
    });

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      this.activeSubTab.set('portal');
    }
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.fetchWeatherForecast();
    this.showToast('Escala Easy VIBRA - Protótipo MVP Pronto');
    if (typeof document !== 'undefined') {
      document.body.classList.add('light-theme');
    }

    if (typeof window !== 'undefined') {
      const reset = () => this.resetInactivityTimer();
      ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
        window.addEventListener(event, reset, { passive: true });
      });
      this.resetInactivityTimer();

      // Interceptar atalhos de impressão/screenshot
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        // Ctrl+P ou Cmd+P
        if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
          event.preventDefault();
          this.triggerPrintWarning('Atalho de Impressão (Ctrl+P / Cmd+P)');
        }
        // PrintScreen key
        if (event.key === 'PrintScreen') {
          event.preventDefault();
          this.triggerPrintWarning('Tecla PrintScreen (Captura de Tela)');
        }
      });

      // Interceptar antes de imprimir
      window.addEventListener('beforeprint', () => {
        this.triggerPrintWarning('Diálogo de Impressão do Navegador');
      });
    }

    // Enforce permission limits for logged-in non-admin users
    effect(() => {
      const logged = this.getLoggedCollab();
      const currentTab = this.activeSubTab();
      if (logged && !this.isAdmin(logged)) {
        const adminTabs = ['matrix', 'ger.turnos', 'siglas', 'team', 'team-mgmt'];
        if (adminTabs.includes(currentTab)) {
          setTimeout(() => {
            this.activeSubTab.set('portal');
            this.showToast('Acesso restrito. Redirecionado para o seu Portal.');
          }, 0);
        }
      }
    });

    // Restore session from localStorage once collaborators are loaded
    effect(() => {
      const collabs = this.scaleService.collaborators();
      if (collabs.length > 0 && !this.selectedSimulatedCollabId() && !this.hasInitiallyLogged()) {
        this.hasInitiallyLogged.set(true); // Ensure this block runs only once
        
        // Detect if running in development mode (AI Studio, localhost, or inside an iframe)
        const isDevelopment = typeof window !== 'undefined' && (
          window.location.hostname === 'localhost' ||
          window.location.hostname.includes('127.0.0.1') ||
          window.location.hostname.includes('ais-dev') ||
          window.location.hostname.includes('aistudio') ||
          window.location.hostname.includes('googleusercontent') ||
          window.location.hostname.includes('cloudshell') ||
          window.location.hostname.includes('web-preview') ||
          (window.location.hostname.includes('run.app') && !window.location.hostname.includes('prod')) ||
          (window.location.hostname.includes('run.app') && window.location.hostname.includes('-dev-')) ||
          (window.self !== window.top) // If we are inside an iframe (AI Studio preview iframe)
        );
        
        const devLoggedOut = safeGetSessionStorage('dev_logged_out') === 'true';

        if (isDevelopment && !devLoggedOut) {
          // Dev Mode Auto-Login: Find first administrator/supervisor or fall back to first collaborator
          const devCollab = collabs.find(c => this.isAdmin(c)) || collabs[0];
          if (devCollab) {
            this.selectedSimulatedCollabId.set(devCollab.id);
            this.scaleService.selectedCollabName.set(devCollab.name);
            this.scaleService.currentRole.set(devCollab.role);
            safeSetLocalStorage('selectedSimulatedCollabId', devCollab.id);
            safeSetLocalStorage('lastActivityTime', Date.now().toString());
            safeSetSessionStorage('session_active', 'true');
            this.resetInactivityTimer();
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            if (this.isAdmin(devCollab) && !isMobile) {
              this.activeSubTab.set('matrix');
            } else {
              this.activeSubTab.set('portal');
              this.autoSelectTodayTabForLoggedCollab(devCollab);
            }
            this.showToast(`Modo Desenvolvimento: Auto-login como ${devCollab.name} (${devCollab.role})`);
            return;
          }
        }

        const restoredId = safeGetLocalStorage('selectedSimulatedCollabId');
        const lastActivity = safeGetLocalStorage('lastActivityTime');
        const sessionActive = safeGetSessionStorage('session_active');
        
        // Browser tab / window close check with modern, resilient fallback:
        // if sessionStorage does not have 'session_active' marker, but we have a restoredId from localStorage,
        // we check if the last activity was very recent (within 45 seconds). If it was, this is considered
        // a page reload, application code update, or quick container reboot, so we preserve the session
        // and re-initialize 'session_active'. If it was longer, the tab/browser was likely closed and reopened later,
        // so we clear the session.
        if (restoredId && !sessionActive) {
          const isRecentRefresh = lastActivity && (Date.now() - parseInt(lastActivity, 10) < 45 * 1000);
          if (isRecentRefresh) {
            safeSetSessionStorage('session_active', 'true');
          } else {
            safeRemoveLocalStorage('selectedSimulatedCollabId');
            safeRemoveLocalStorage('lastActivityTime');
            return;
          }
        }

        if (restoredId && lastActivity) {
          const elapsed = Date.now() - parseInt(lastActivity, 10);
          if (elapsed > 5 * 60 * 1000) {
            // Expired (5 minutes of inactivity)
            safeRemoveLocalStorage('selectedSimulatedCollabId');
            safeRemoveLocalStorage('lastActivityTime');
            safeRemoveSessionStorage('session_active');
          } else {
            const collab = collabs.find(c => c.id === restoredId);
            if (collab) {
              this.selectedSimulatedCollabId.set(restoredId);
              this.scaleService.selectedCollabName.set(collab.name);
              this.scaleService.currentRole.set(collab.role);
              this.resetInactivityTimer();
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              if (this.isAdmin(collab) && !isMobile) {
                this.activeSubTab.set('matrix');
              } else {
                this.activeSubTab.set('portal');
                this.autoSelectTodayTabForLoggedCollab(collab);
              }
            }
          }
        }
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const month = this.selectedMonthIndex() + 1;
      this.scaleService.activeMonth.set(month);
      this.scaleService.activeYear.set(this.currentYear()); // Standard this.currentYear() year for UI
      if (this.scaleService.activeDb() === 'supabase') {
        this.scaleService.syncSupabase();
      }
    }, { allowSignalWrites: true });

    // Auto-match collaborator for first access detection dynamically as they type
    effect(() => {
      const name = this.loginNameInput().trim();
      if (!name) {
        this.matchedCollab.set(null);
        this.isFirstAccess.set(false);
        return;
      }
      const typedName = name.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const collabs = this.scaleService.collaborators();
      const found = collabs.find(c => {
        const normName = c.name.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normName === typedName || normName.includes(typedName);
      });
      if (found) {
        this.matchedCollab.set(found);
        this.isFirstAccess.set(!found.password || found.password.trim() === '');
      } else {
        this.matchedCollab.set(null);
        this.isFirstAccess.set(false);
      }
    }, { allowSignalWrites: true });

    // Efeito para forçar o RBAC: Colaboradores normais ficam estritamente travados no Portal do Colaborador
    effect(() => {
      const logged = this.getLoggedCollab();
      if (logged && !this.isAdmin(logged)) {
        if (this.activeSubTab() !== 'portal') {
          this.activeSubTab.set('portal');
        }
      }
    });
  }

  // Clock Update Function
  private updateClock() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    this.currentTimeString.set(`${hh}:${mm}:${ss} BRT`);
  }

  // Toast Functionality
  showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 4000);
  }

  // Role Simulator
  

  changeRole(role: 'SUPERVISOR' | 'LIDER' | 'OPERADOR') {
    this.scaleService.currentRole.set(role);
    this.showToast(`Perfil alterado para: ${role === 'LIDER' ? 'LÍDER DE TURNO' : role}`);
  }

  // Presentation Mode: Focus only on Night Shift ("Noite / Madrugada / N")
  onlyNightShift = signal<boolean>(true);

  unlockAllShifts(pin: string) {
    const cleanPin = (pin || '').trim().toLowerCase();
    if (cleanPin === 'vibra' || cleanPin === 'admin' || cleanPin === '1234' || cleanPin === 'noite') {
      this.onlyNightShift.set(false);
      this.showToast('Sucesso: Escalas de todos os turnos liberadas!');
    } else {
      this.showToast('Erro: PIN incorreto. Dica: Tente "vibra", "admin" ou "1234".');
    }
  }

  lockToNightShift() {
    this.onlyNightShift.set(true);
    this.showToast('Visualização restrita ao turno da Noite.');
  }

  // Filters computed list with custom ordering: LTs, Aeródromo, VIP's
  filteredCollaborators = computed(() => {
    const query = this.collabSearchQuery().toLowerCase().trim();
    const role = this.selectedFilterRole();
    const sector = this.selectedFilterSector();
    const shift = this.selectedFilterShift();
    const onlyNight = this.onlyNightShift();

    const filtered = this.scaleService.collaborators().filter(c => {
      // If presentation mode is restricted, filter only Night Shift
      if (onlyNight) {
        const cShift = (c.shift || '').toUpperCase().trim();
        const isNight = cShift === 'MADRUGADA' || cShift === 'NOITE' || cShift === 'N';
        if (!isNight) return false;
      }

      const matchesSearch = c.name.toLowerCase().includes(query) || c.group.toLowerCase().includes(query);
      const matchesRole = role === 'TODOS' || 
        (c.role || '').toUpperCase().trim() === role.toUpperCase().trim();
      const normCollabSector = (c.sector || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      const normFilterSector = sector.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      const matchesSector = sector === 'TODOS' || normCollabSector === normFilterSector;
      const matchesShift = shift === 'TODOS' || 
        (c.shift || '').toUpperCase().trim() === shift.toUpperCase().trim();
      return matchesSearch && matchesRole && matchesSector && matchesShift;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const getWeight = (c: any) => {
        if (c.role === 'LIDER') return 1; // LTs first
        const sec = (c.sector || '').toUpperCase().trim();
        if (sec === 'GERAL') return 2;
        if (sec === 'GESTÃO' || sec === 'GESTAO') return 3;
        if (sec === 'CENTRAL') return 4;
        if (sec === 'AERÓDROMO' || sec === 'AERODROMO' || sec === 'OPERACIONAL') return 5;
        if (sec === 'VIP') return 6;
        if (sec === 'TESTE') return 7;
        if (sec === 'MANUTENÇÃO' || sec === 'MANUTENCAO') return 8;
        return 9; // Others
      };
      const wA = getWeight(a);
      const wB = getWeight(b);
      if (wA !== wB) return wA - wB;
      // Secondary sort alphabetically
      return a.name.localeCompare(b.name, 'pt-BR');
    });

    return sorted;
  });

  filteredCounts = computed(() => {
    const list = this.filteredCollaborators();
    const operadores = list.filter(c => c.role === 'OPERADOR').length;
    const lts = list.filter(c => c.role === 'LIDER').length;
    const vips = list.filter(c => {
      const sec = (c.sector || '').toUpperCase();
      return sec === 'VIP';
    }).length;
    return { operadores, lts, vips };
  });

  getCollabFunction(collab: any): string {
    if (!collab) return 'Operador';
    if (collab.role === 'LIDER') return 'LT';
    if (collab.role === 'SUPERVISOR') return 'Supervisor';
    if (collab.sector) {
      const sec = collab.sector.trim();
      if (sec.toUpperCase() === 'VIP') return 'VIP';
      return sec.charAt(0).toUpperCase() + sec.slice(1);
    }
    return collab.role || 'Operador';
  }

  getFunctionBadgeClass(collab: any): string {
    if (!collab) return 'text-slate-400';
    const isLight = this.isLightTheme();
    if (collab.role === 'LIDER') {
      return isLight ? 'text-amber-700' : 'text-amber-400';
    }
    if (collab.role === 'SUPERVISOR') {
      return isLight ? 'text-purple-700' : 'text-purple-400';
    }
    const sec = (collab.sector || '').toUpperCase().trim();
    if (sec === 'VIP') {
      return isLight ? 'text-cyan-700' : 'text-cyan-400';
    }
    if (sec === 'AERÓDROMO' || sec === 'AERODROMO' || sec === 'OPERACIONAL') {
      return isLight ? 'text-emerald-700' : 'text-emerald-400';
    }
    if (sec === 'GESTÃO' || sec === 'GESTAO') {
      return isLight ? 'text-blue-700' : 'text-blue-400';
    }
    if (sec === 'CENTRAL') {
      return isLight ? 'text-indigo-700' : 'text-indigo-400';
    }
    if (sec === 'GERAL') {
      return isLight ? 'text-teal-700' : 'text-teal-400';
    }
    if (sec === 'TESTE') {
      return isLight ? 'text-rose-700' : 'text-rose-400';
    }
    if (sec === 'MANUTENÇÃO' || sec === 'MANUTENCAO') {
      return isLight ? 'text-orange-700' : 'text-orange-400';
    }
    return isLight ? 'text-slate-700' : 'text-slate-300';
  }

  // Filters computed list for Login Selection
  loginCollaborators = computed(() => {
    const onlyNight = this.onlyNightShift();
    return this.scaleService.collaborators().filter(c => {
      if (onlyNight) {
        const cShift = (c.shift || '').toUpperCase().trim();
        return cShift === 'MADRUGADA' || cShift === 'NOITE' || cShift === 'N';
      }
      return true;
    });
  });

  // Filters computed list for Admin Management with sorting, searching, and custom filters
  adminCollaborators = computed(() => {
    const query = this.adminSearchQuery().toLowerCase().trim();
    const role = this.adminFilterRole();
    const shift = this.adminFilterShift();
    const sort = this.adminSortOrder();
    const onlyNight = this.onlyNightShift();

    const list = this.scaleService.collaborators().filter(c => {
      if (onlyNight) {
        const cShift = (c.shift || '').toUpperCase().trim();
        const isNight = cShift === 'MADRUGADA' || cShift === 'NOITE' || cShift === 'N';
        if (!isNight) return false;
      }

      const matchesSearch = !query || 
        c.name.toLowerCase().includes(query) || 
        c.role.toLowerCase().includes(query) || 
        c.shift.toLowerCase().includes(query) || 
        c.sector.toLowerCase().includes(query);

      const matchesRole = role === 'TODOS' || 
        (c.role || '').toUpperCase().trim() === role.toUpperCase().trim();
      const matchesShift = shift === 'TODOS' || 
        (c.shift || '').toUpperCase().trim() === shift.toUpperCase().trim();

      return matchesSearch && matchesRole && matchesShift;
    });

    list.sort((a, b) => {
      const nameA = a.name.localeCompare(b.name, 'pt-BR');
      return sort === 'asc' ? nameA : -nameA;
    });

    return list;
  });

  // Get Day of Week Name
  getDayOfWeekLabel(day: number): string {
    const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    const startDay = new Date(this.currentYear(), this.selectedMonthIndex(), 1).getDay();
    const index = (day - 1 + startDay) % 7; 
    return weekDays[index];
  }

  isDayWeekend(day: number): boolean {
    const startDay = new Date(this.currentYear(), this.selectedMonthIndex(), 1).getDay();
    const index = (day - 1 + startDay) % 7;
    return index === 6 || index === 0; // Saturday & Sunday
  }

  isDayHoliday(day: number): boolean {
    const month = this.selectedMonthIndex(); // 0-indexed (0 = Jan, 11 = Dec)
    if (month === 0 && day === 1) return true; // Ano Novo
    if (month === 3 && (day === 3 || day === 21)) return true; // Sexta-feira Santa, Tiradentes
    if (month === 4 && day === 1) return true; // Dia do Trabalho
    if (month === 5 && day === 4) return true; // Corpus Christi
    if (month === 8 && day === 7) return true; // Independência
    if (month === 9 && day === 12) return true; // Padroeira do Brasil
    if (month === 10 && (day === 2 || day === 15 || day === 20)) return true; // Finados, Proclamação da República, Consciência Negra
    if (month === 11 && day === 25) return true; // Natal
    return false;
  }

  isDaySpecial(day: number): boolean {
    return this.isDayWeekend(day) || this.isDayHoliday(day);
  }

  isToday(day: number): boolean {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === this.selectedMonthIndex() &&
           today.getFullYear() === this.currentYear();
  }

  isPastDay(day: number): boolean {
    const today = new Date();
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const calendarDate = new Date(this.currentYear(), this.selectedMonthIndex(), day);
    return calendarDate.getTime() < todayZero.getTime();
  }

  getLoggedCollabOffDays(): number[] {
    const collab = this.getLoggedCollab();
    if (!collab) return [];
    return this.daysInMonth().filter(day => !this.isWorkDay(collab, day));
  }

  getCollabOffDays(collab: any): number[] {
    if (!collab) return [];
    return this.daysInMonth().filter(day => !this.isWorkDay(collab, day));
  }

  getFilteredCollabOffDays(collab: any): number[] {
    const days = this.getCollabOffDays(collab);
    if (this.hidePastDays()) {
      return days.filter(day => !this.isPastDay(day));
    }
    return days;
  }

  getCollabWorkDays(collab: any): number[] {
    if (!collab) return [];
    return this.daysInMonth().filter(day => this.isWorkDay(collab, day));
  }

  getFilteredCollabWorkDays(collab: any): number[] {
    const days = this.getCollabWorkDays(collab);
    if (this.hidePastDays()) {
      return days.filter(day => !this.isPastDay(day));
    }
    return days;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getWeeklyWorkSequences(collab: any): any[] {
    if (!collab) return [];
    
    const weeks: any[] = [];
    const totalDays = this.daysInMonth().length;
    
    const weekBlocks = [
      { num: 1, start: 1, end: 7 },
      { num: 2, start: 8, end: 14 },
      { num: 3, start: 15, end: 21 },
      { num: 4, start: 22, end: 28 },
      { num: 5, start: 29, end: totalDays }
    ];
    
    for (const wb of weekBlocks) {
      if (wb.start > totalDays) continue;
      const endDay = Math.min(wb.end, totalDays);
      const daysList: any[] = [];
      let workCount = 0;
      const workedDaysNumbers: number[] = [];
      
      for (let d = wb.start; d <= endDay; d++) {
        const working = this.isWorkDay(collab, d);
        if (working) {
          workCount++;
          workedDaysNumbers.push(d);
        }
        daysList.push({
          day: d,
          isWork: working,
          label: working ? 'Trabalho' : 'Folga'
        });
      }
      
      let maxConsecInside = 0;
      let tempConsec = 0;
      for (let d = wb.start; d <= endDay; d++) {
        if (this.isWorkDay(collab, d)) {
          tempConsec++;
          if (tempConsec > maxConsecInside) {
            maxConsecInside = tempConsec;
          }
        } else {
          tempConsec = 0;
        }
      }
      
      let severity: 'normal' | 'warning' | 'critical' = 'normal';
      let severityColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20';
      let severityText = 'Estável';
      
      if (maxConsecInside >= 6 || workCount >= 6) {
        severity = 'critical';
        severityColor = 'text-rose-400 bg-rose-950/40 border-rose-500/20';
        severityText = 'Crítica';
      } else if (maxConsecInside === 5 || workCount === 5) {
        severity = 'warning';
        severityColor = 'text-amber-400 bg-amber-950/40 border-amber-500/20';
        severityText = 'Alerta';
      }
      
      const totalDaysInWeek = endDay - wb.start + 1;
      const percentage = Math.round((workCount / totalDaysInWeek) * 100);

      weeks.push({
        weekNum: wb.num,
        label: `${wb.num}ª Sem`,
        range: `Dias ${wb.start} a ${endDay}`,
        daysList,
        workCount,
        workedDaysNumbers,
        workedDaysStr: workedDaysNumbers.join(' '),
        maxConsecInside,
        severity,
        severityColor,
        severityText,
        totalDaysInWeek,
        percentage
      });
    }
    
    return weeks;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getContinuousWorkStretches(collab: any): any[] {
    if (!collab) return [];
    const stretches: any[] = [];
    const days = this.daysInMonth();
    let currentStretch: number[] = [];
    
    for (const d of days) {
      if (this.isWorkDay(collab, d)) {
        currentStretch.push(d);
      } else {
        if (currentStretch.length > 0) {
          stretches.push(this.createStretchObject(currentStretch, stretches.length + 1));
          currentStretch = [];
        }
      }
    }
    if (currentStretch.length > 0) {
      stretches.push(this.createStretchObject(currentStretch, stretches.length + 1));
    }
    return stretches;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private createStretchObject(daysList: number[], index: number): any {
    const daysCount = daysList.length;
    let severity: 'normal' | 'warning' | 'critical' = 'normal';
    let severityColor = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
    let severityText = 'Estável';
    let badgeClass = 'bg-emerald-600 text-white';

    if (daysCount >= 6) {
      severity = 'critical';
      severityColor = 'bg-rose-500/10 border-rose-500/20 text-rose-400 animate-pulse';
      severityText = 'Crítico (Fadiga)';
      badgeClass = 'bg-rose-600 text-white';
    } else if (daysCount === 5) {
      severity = 'warning';
      severityColor = 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      severityText = 'Fadiga Moderada';
      badgeClass = 'bg-amber-500 text-slate-900';
    }

    return {
      id: index,
      startDay: daysList[0],
      endDay: daysList[daysList.length - 1],
      daysCount,
      daysList,
      severity,
      severityColor,
      severityText,
      badgeClass
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMostCriticalWeek(collab: any): any {
    const weeks = this.getWeeklyWorkSequences(collab);
    if (weeks.length === 0) return null;
    return weeks.reduce((prev, current) => (current.workCount > prev.workCount) ? current : prev, weeks[0]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMostCriticalStretch(collab: any): any {
    const stretches = this.getContinuousWorkStretches(collab);
    if (stretches.length === 0) return null;
    return stretches.reduce((prev, current) => (current.daysCount > prev.daysCount) ? current : prev, stretches[0]);
  }

   
  getArray(n: number): number[] {
    return Array.from({length: Math.max(1, n)}, (_, i) => i + 1);
  }

  getBarColor(index: number, currentStreak: number, isWorking: boolean): string {
    if (!isWorking) return '#cbd5e1'; // cinza claro
    if (index > currentStreak) return '#cbd5e1'; // cinza claro quando não atingida ainda
    
    switch(index) {
      case 1: return '#10b981'; // emerald-500
      case 2: return '#3b82f6'; // blue-500
      case 3: return '#eab308'; // yellow-500
      case 4: return '#f97316'; // orange-500
      default: return '#ef4444'; // red-500
    }
  }

  getEnergyPercent(seqStats: any, collab?: any): number {
    if (!collab) {
      collab = this.getLoggedCollab();
    }
    if (collab) {
      const chargingState = this.getDescansoChargingState(collab);
      if (chargingState.isRecharging) {
        return chargingState.percent;
      }
    }
    if (!seqStats) return 100;
    if (!seqStats.isWorking) return 100;
    return Math.max(20, 100 - (seqStats.streak - 1) * 20);
  }

  parseCollaboratorShiftTimes(shiftCodeOrHours?: string | null, collab?: any): { startHour: number; startMinute: number; endHour: number; endMinute: number } {
    let entryTime = '08:00';
    let exitTime = '17:00';

    const hours = collab?.hours || (typeof shiftCodeOrHours === 'string' && shiftCodeOrHours.includes('-') ? shiftCodeOrHours : '');
    
    if (hours && hours.includes('-')) {
      const parts = hours.split('-');
      if (parts.length === 2) {
        entryTime = parts[0].trim();
        exitTime = parts[1].trim();
      }
    } else {
      const sCode = (collab?.shift || shiftCodeOrHours || '').trim().toUpperCase();
      const shiftType = this.scaleService.shiftTypes().find(s => 
        s.code.trim().toUpperCase() === sCode || 
        s.label.trim().toUpperCase() === sCode
      );
      if (shiftType && shiftType.startTime && shiftType.endTime) {
        entryTime = shiftType.startTime;
        exitTime = shiftType.endTime;
      } else {
        if (sCode === 'MANHÃ' || sCode === 'M') {
          entryTime = '06:00';
          exitTime = '14:00';
        } else if (sCode === 'TARDE' || sCode === 'T') {
          entryTime = '14:42';
          exitTime = '23:30';
        } else if (sCode === 'MADRUGADA' || sCode === 'NOITE' || sCode === 'N') {
          entryTime = '22:00';
          exitTime = '06:00';
        } else if (sCode === 'ADMINISTRATIVO' || sCode === 'ADM') {
          entryTime = '08:00';
          exitTime = '17:00';
        }
      }
    }

    const parseTime = (tStr: string, defaultH: number, defaultM: number) => {
      if (!tStr) return { h: defaultH, m: defaultM };
      const clean = tStr.replace('h', ':').replace('H', ':');
      const parts = clean.split(':').map(p => parseInt(p, 10));
      const h = !isNaN(parts[0]) ? parts[0] : defaultH;
      const m = parts.length > 1 && !isNaN(parts[1]) ? parts[1] : defaultM;
      return { h, m };
    };

    const start = parseTime(entryTime, 8, 0);
    const end = parseTime(exitTime, 17, 0);

    return {
      startHour: start.h,
      startMinute: start.m,
      endHour: end.h,
      endMinute: end.m
    };
  }

  getDescansoChargingState(collab: any): { isRecharging: boolean; percent: number; statusLabel: string; hoursToStart: number; descText: string } {
    if (!collab) {
      return { isRecharging: false, percent: 100, statusLabel: 'Carregada', hoursToStart: 0, descText: '' };
    }
    const seqStats = this.getConsecutiveWorkStats(collab);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Configured shift timing for collaborator
    const parsedShift = this.parseCollaboratorShiftTimes(collab.shift, collab);
    const startHour = parsedShift.startHour;
    const startMinute = parsedShift.startMinute;
    const endHour = parsedShift.endHour;
    const endMinute = parsedShift.endMinute;

    let nextShiftStart: Date | null = null;
    let lastShiftEnd: Date | null = null;

    const maxDay = this.daysInMonth().length;
    const currentDay = now.getDate();

    // 1. Find next shift start date and time
    for (let d = currentDay; d <= currentDay + 14; d++) {
      const targetDayNum = d > maxDay ? d - maxDay : d;
      const targetMonthOffset = d > maxDay ? 1 : 0;
      
      const targetYear = now.getFullYear();
      const targetMonth = now.getMonth() + targetMonthOffset;
      
      if (this.isWorkDay(collab, targetDayNum)) {
        if (d === currentDay) {
          const shiftStartToday = new Date(targetYear, targetMonth, targetDayNum, startHour, startMinute, 0, 0);
          if (now.getTime() >= shiftStartToday.getTime()) {
            continue; // Today's shift already started/ended, look for next
          }
        }
        
        nextShiftStart = new Date(targetYear, targetMonth, targetDayNum, startHour, startMinute, 0, 0);
        break;
      }
    }

    // 2. Find last shift end date and time
    for (let d = currentDay; d >= currentDay - 14; d--) {
      const targetDayNum = d <= 0 ? maxDay + d : d;
      const targetMonthOffset = d <= 0 ? -1 : 0;
      
      const targetYear = now.getFullYear();
      const targetMonth = now.getMonth() + targetMonthOffset;

      if (this.isWorkDay(collab, targetDayNum)) {
        const isOvernight = endHour < startHour;
        let shiftEndDateNum = targetDayNum;
        if (isOvernight) {
          shiftEndDateNum = targetDayNum + 1;
        }
        
        const candidateLastShiftEnd = new Date(targetYear, targetMonth, shiftEndDateNum, endHour, endMinute, 0, 0);
        
        if (now.getTime() < candidateLastShiftEnd.getTime() && d === currentDay) {
          continue; // Currently on shift today
        }
        
        lastShiftEnd = candidateLastShiftEnd;
        break;
      }
    }

    // Fallbacks
    if (!nextShiftStart) {
      nextShiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, startHour, startMinute, 0, 0);
    }
    if (!lastShiftEnd) {
      lastShiftEnd = new Date(now.getTime() - 24 * 3600 * 1000);
    }

    const diffMs = nextShiftStart.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // Check if collaborator is currently on shift right now
    let isCurrentlyOnShift = false;
    if (this.isWorkDay(collab, currentDay)) {
      const nowMs = now.getTime();
      const shiftTodayStart = new Date(now.getFullYear(), now.getMonth(), currentDay, startHour, startMinute, 0, 0).getTime();
      let shiftTodayEnd = new Date(now.getFullYear(), now.getMonth(), currentDay, endHour, endMinute, 0, 0).getTime();
      if (endHour < startHour) {
        shiftTodayEnd += 24 * 3600 * 1000; // Overnight
      }

      if (nowMs >= shiftTodayStart && nowMs < shiftTodayEnd) {
        isCurrentlyOnShift = true;
      }
    }

    if (isCurrentlyOnShift) {
      return {
        isRecharging: false,
        percent: Math.max(20, 100 - (seqStats.streak - 1) * 20),
        statusLabel: seqStats.fatigueLevel,
        hoursToStart: 0,
        descText: seqStats.alertMessage
      };
    }

    // Collaborator is OFF-DUTY / RESTING
    // Status 'Carregando' progresses up to 2 hours before the start of the next shift
    const targetTimeMs = nextShiftStart.getTime() - 2 * 3600 * 1000;
    const nowTimeMs = now.getTime();

    // Check for prolonged rest (folga de 2 dias consecutivos ou total rest >= 36h)
    const totalRestHours = (nextShiftStart.getTime() - lastShiftEnd.getTime()) / (1000 * 3600);
    const isExtendedRest = totalRestHours >= 36;

    let percent = 100;
    let statusLabel = 'Carregada';

    if (nowTimeMs >= targetTimeMs) {
      // 2 hours or less before shift start: charge reaches 100% (Carregada)
      percent = 100;
      statusLabel = 'Carregada';
    } else {
      const totalChargingWindowMs = targetTimeMs - lastShiftEnd.getTime();
      const elapsedMs = nowTimeMs - lastShiftEnd.getTime();

      if (totalChargingWindowMs > 0 && elapsedMs > 0) {
        const rawRatio = Math.max(0, Math.min(1, elapsedMs / totalChargingWindowMs));

        if (isExtendedRest) {
          // Prolonged rest (2 consecutive days off):
          // First sleep/rest (12h) recovers biological energy to ~70%.
          // Then progresses smoothly to 100% up to 2h before shift start.
          const initialPostShiftHours = Math.min(12, elapsedMs / (3600 * 1000));
          if (initialPostShiftHours < 12) {
            percent = Math.floor(40 + (initialPostShiftHours / 12) * 30);
          } else {
            percent = Math.floor(70 + rawRatio * 29);
          }
        } else {
          // Standard rest (1 day off):
          // Progresses smoothly from 50% to 99%
          percent = Math.floor(50 + rawRatio * 49);
        }
      } else {
        const hoursRemainingUntilTarget = Math.max(0, diffHours - 2);
        percent = Math.floor(Math.max(30, Math.min(99, 100 - (hoursRemainingUntilTarget / 24) * 50)));
      }

      percent = Math.max(20, Math.min(99, percent));
      statusLabel = `Carregando ${percent}%`;
    }

    const roundedHours = Math.max(0, Math.round(diffHours * 10) / 10);
    const descText = percent >= 100 
      ? `Descanso completo. Prontidão total para o turno (${roundedHours}h restantes).`
      : isExtendedRest
        ? `Descanso prolongado (Folga dupla). Bateria em recuperação biológica (${percent}%). Faltam ${roundedHours}h para o turno.`
        : `Bateria biológica em recuperação. Faltam ${roundedHours}h para o início do turno.`;

    return {
      isRecharging: true,
      percent,
      statusLabel,
      hoursToStart: diffHours,
      descText
    };
  }

  getArcStrokeColor(arcIndex: number, collab: any): string {
    if (!collab) return this.isLightTheme() ? '#e2e8f0' : '#223147';
    
    const seqStats = this.getConsecutiveWorkStats(collab);
    const chargingState = this.getDescansoChargingState(collab);
    
    if (chargingState.isRecharging) {
      const requiredPercent = arcIndex * 20;
      if (chargingState.percent >= requiredPercent) {
        return '#10b981'; // emerald-500
      } else {
        return this.isLightTheme() ? '#e2e8f0' : '#223147';
      }
    } else {
      if (arcIndex === 1) {
        return '#10b981';
      } else if (arcIndex === 2) {
        return (seqStats.streak >= 2) ? '#3b82f6' : (this.isLightTheme() ? '#e2e8f0' : '#223147');
      } else if (arcIndex === 3) {
        return (seqStats.streak >= 3) ? '#eab308' : (this.isLightTheme() ? '#e2e8f0' : '#223147');
      } else if (arcIndex === 4) {
        return (seqStats.streak >= 4) ? '#f97316' : (this.isLightTheme() ? '#e2e8f0' : '#223147');
      } else {
        return (seqStats.streak >= 5) ? '#ef4444' : (this.isLightTheme() ? '#e2e8f0' : '#223147');
      }
    }
  }

  getDonutColor(streak: number, isWorking: boolean): string {
    if (!isWorking) return '#10b981'; // emerald-500
    switch(streak) {
      case 1: return '#10b981'; // emerald-500
      case 2: return '#3b82f6'; // blue-500
      case 3: return '#eab308'; // yellow-500
      case 4: return '#f97316'; // orange-500
      default: return '#ef4444'; // red-500
    }
  }

  getFeedbackCardClass(seqStats: any): string {
    if (!seqStats) return '';
    const light = this.isLightTheme();
    if (!seqStats.isWorking) {
      return light ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' : 'bg-emerald-950/10 border-emerald-500/20 text-emerald-400';
    }
    switch(seqStats.streak) {
      case 1:
        return light ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800' : 'bg-emerald-950/10 border-emerald-500/20 text-emerald-400';
      case 2:
        return light ? 'bg-blue-50/70 border-blue-200 text-blue-800' : 'bg-blue-950/10 border-blue-500/20 text-blue-400';
      case 3:
        return light ? 'bg-amber-50/70 border-amber-200 text-amber-800' : 'bg-amber-950/10 border-amber-500/20 text-amber-400';
      case 4:
        return light ? 'bg-orange-50/70 border-[#F59E0B] text-orange-800' : 'bg-[#F59E0B]/5 border-[#F59E0B] text-[#F59E0B]';
      default:
        return light ? 'bg-rose-50/70 border-rose-200 text-rose-800' : 'bg-rose-950/10 border-rose-500/20 text-rose-400';
    }
  }

  getConsecutiveWorkStats(collab: any) {
    if (!collab) return { isWorking: false, currentDay: 1, streak: 0, totalStreak: 0, energyColor: 'text-emerald-400', energyBg: 'bg-emerald-500', borderCol: 'border-emerald-500/20', textCol: 'text-emerald-400', textBg: 'bg-emerald-950/40', fatigueLevel: 'Em Folga / Descanso', alertMessage: 'Aproveite para recarregar as energias!' };
    
    const today = new Date();
    let dayToAnalyze = today.getDate();
    
    const isCurrentMonth = today.getMonth() === this.selectedMonthIndex() && today.getFullYear() === this.currentYear();
    if (!isCurrentMonth) {
      const totalDays = this.daysInMonth().length;
      dayToAnalyze = Math.min(dayToAnalyze, totalDays);
    }
    
    const isTodayWorking = this.isWorkDay(collab, dayToAnalyze);
    
    let currentWorkStreak = 0;
    if (isTodayWorking) {
      for (let d = dayToAnalyze; d >= 1; d--) {
        if (this.isWorkDay(collab, d)) {
          currentWorkStreak++;
        } else {
          break;
        }
      }
    }
    
    let totalStreakLength = 0;
    if (isTodayWorking) {
      let startDay = dayToAnalyze;
      while (startDay > 1 && this.isWorkDay(collab, startDay - 1)) {
        startDay--;
      }
      let endDay = dayToAnalyze;
      const maxDay = this.daysInMonth().length;
      while (endDay < maxDay && this.isWorkDay(collab, endDay + 1)) {
        endDay++;
      }
      totalStreakLength = (endDay - startDay) + 1;
    }
    
    let energyColor = 'text-emerald-400';
    let energyBg = 'bg-emerald-500';
    let borderCol = 'border-emerald-500/20';
    let textCol = 'text-emerald-400';
    let textBg = 'bg-emerald-950/40';
    let fatigueLevel = 'Altamente Descansado';
    let alertMessage = 'Início de ciclo - Excelente nível de energia!';
    
    if (!isTodayWorking) {
      energyColor = 'text-emerald-400';
      energyBg = 'bg-emerald-500';
      borderCol = 'border-emerald-500/20';
      textCol = 'text-emerald-400';
      textBg = 'bg-emerald-950/40';
      fatigueLevel = 'Em Folga / Descanso';
      alertMessage = 'Aproveite para recarregar as energias!';
    } else {
      if (currentWorkStreak === 1) {
        energyColor = 'text-emerald-400';
        energyBg = 'bg-emerald-500';
        borderCol = 'border-emerald-500/20';
        textCol = 'text-emerald-400';
        textBg = 'bg-emerald-950/40';
        fatigueLevel = 'Energia Plena';
        alertMessage = 'Bom início de jornada! Bateria 100% recarregada.';
      } else if (currentWorkStreak === 2) {
        energyColor = 'text-sky-400';
        energyBg = 'bg-sky-500';
        borderCol = 'border-sky-500/20';
        textCol = 'text-sky-400';
        textBg = 'bg-sky-950/40';
        fatigueLevel = 'Bom Ritmo';
        alertMessage = 'Ritmo seguro e estável. Hidrate-se e mantenha o foco.';
      } else if (currentWorkStreak === 3) {
        energyColor = 'text-amber-400';
        energyBg = 'bg-amber-500';
        borderCol = 'border-amber-500/20';
        textCol = 'text-amber-400';
        textBg = 'bg-amber-950/40';
        fatigueLevel = 'Fadiga Leve';
        alertMessage = 'Atenção moderada. Metade do ciclo concluída.';
      } else {
        energyColor = 'text-red-400';
        energyBg = 'bg-red-500';
        borderCol = 'border-red-500/20';
        textCol = 'text-red-400';
        textBg = 'bg-red-950/40';
        fatigueLevel = 'Atenção Redobrada';
        alertMessage = 'Fadiga acumulada elevada! Risco de fadiga aumentado, redobre os cuidados.';
      }
    }
    
    return {
      isWorking: isTodayWorking,
      currentDay: dayToAnalyze,
      streak: currentWorkStreak,
      totalStreak: totalStreakLength,
      energyColor,
      energyBg,
      borderCol,
      textCol,
      textBg,
      fatigueLevel,
      alertMessage
    };
  }

  getFolgaLabel(count: number): string {
    if (count === 1) return 'FOLGA SECA! 🏖️';
    if (count === 2) return 'DOBRADINHA! 🏖️';
    if (count === 3) return 'TRINCA! 🏖️';
    if (count === 4) return 'QUADRA! 🏖️';
    if (count === 5) return 'QUINA! 🏖️';
    if (count === 6) return 'SENA! 🏖️';
    return 'FOLGA PROLONGADA! 🏖️';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDaysUntilNextOff(collab: any) {
    if (!collab) return { days: 0, isOffToday: false, nextOffDays: [] as number[], isDouble: false };
    
    const today = new Date();
    let dayToAnalyze = today.getDate();
    const isCurrentMonth = today.getMonth() === this.selectedMonthIndex() && today.getFullYear() === this.currentYear();
    if (!isCurrentMonth) {
      const totalDays = this.daysInMonth().length;
      dayToAnalyze = Math.min(dayToAnalyze, totalDays);
    }
    
    if (!this.isWorkDay(collab, dayToAnalyze)) {
      let startDay = dayToAnalyze;
      while (startDay > 1 && !this.isWorkDay(collab, startDay - 1)) {
        startDay--;
      }
      let endDay = dayToAnalyze;
      const maxDay = this.daysInMonth().length;
      while (endDay < maxDay && !this.isWorkDay(collab, endDay + 1)) {
        endDay++;
      }
      const currentOffBlock: number[] = [];
      for (let d = startDay; d <= endDay; d++) {
        currentOffBlock.push(d);
      }
      return {
        days: 0,
        isOffToday: true,
        nextOffDays: currentOffBlock,
        isDouble: currentOffBlock.length >= 2
      };
    }
    
    const maxDay = this.daysInMonth().length;
    let nextOffDay = -1;
    for (let d = dayToAnalyze + 1; d <= maxDay; d++) {
      if (!this.isWorkDay(collab, d)) {
        nextOffDay = d;
        break;
      }
    }
    
    if (nextOffDay === -1) {
      return { days: 999, isOffToday: false, nextOffDays: [] as number[], isDouble: false };
    }
    
    const daysRemaining = nextOffDay - dayToAnalyze;
    
    const nextOffBlock: number[] = [nextOffDay];
    let checkDay = nextOffDay + 1;
    while (checkDay <= maxDay && !this.isWorkDay(collab, checkDay)) {
      nextOffBlock.push(checkDay);
      checkDay++;
    }
    
    return {
      days: daysRemaining,
      isOffToday: false,
      nextOffDays: nextOffBlock,
      isDouble: nextOffBlock.length >= 2
    };
  }

  getOffsetDaysArray(): number[] {
    const startDay = new Date(this.currentYear(), this.selectedMonthIndex(), 1).getDay();
    return Array.from({ length: startDay }, (_, i) => i);
  }

  /**
   * Verifica eventos especiais como datas comemorativas ou aniversários.
   */
  getSpecialEventsForDay(collab: any, day: number): any[] {
    const events: any[] = [];
    if (!collab) return events;

    if (collab.birthday) {
      const parts = collab.birthday.split('-');
      if (parts.length === 3) {
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        if (m === (this.selectedMonthIndex() + 1) && d === day) {
          events.push({
            icon: 'cake',
            color: '#f43f5e',
            tooltip: `Aniversário de ${collab.name}`,
            shortLabel: 'Aniversário'
          });
        }
      }
    }
    if (collab.folgaRequests) {
      const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      if (collab.folgaRequests.some((r: any) => r.date === dateStr)) {
        events.push({
          icon: 'event_busy',
          color: '#10b981',
          tooltip: 'Intenção de folga',
          shortLabel: 'Folga'
        });
      }
    }
    return events;
  }

  // Notification methods
  markAllNotificationsAsRead() {
    this.notifications.set(this.notifications().map(n => ({ ...n, read: true })));
    this.showToast('Todas as notificações marcadas como lidas.');
  }

  markNotificationAsRead(id: string) {
    this.notifications.set(this.notifications().map(n => n.id === id ? { ...n, read: true } : n));
  }

  // Paintbrush logic
  togglePaintbrushPanel() {
    this.showPaintbrushPanel.set(!this.showPaintbrushPanel());
    if (!this.showPaintbrushPanel()) {
      this.activePaintbrush.set(null);
      if (this.editingRowCollabId() !== null) {
        this.cancelRowScale();
      }
    } else {
      this.showToast('Modo de Pintura Ativado: Clique em uma sigla e depois na célula da escala');
    }
  }

  selectPaintbrush(code: string) {
    this.activePaintbrush.set(code);
    if (code === '-') {
      this.showToast('Borracha ativada: Clique nas células da escala para limpar siglas ou turnos customizados.');
    } else {
      this.showToast(`Pincel ativo: ${code}. Clique nas células para aplicar.`);
    }
  }

  applyPaintbrush(collabId: string, day: number) {
    if (!this.canEdit()) {
      this.showToast('Acesso negado: Apenas Líder ou Supervisor pode alterar escalas.');
      return;
    }

    const brush = this.activePaintbrush();
    if (!brush) return;

    const collab = this.scaleService.collaborators().find(c => c.id === collabId);
    if (collab) {
      const updatedCollab = {
        ...collab,
        scale: { ...collab.scale, [day]: brush }
      };
      this.scaleService.updateCollaborator(updatedCollab);
    }
  }

  // Row-level inline scale editing methods
  startRowScaleEdit(collab: Collaborator) {
    if (!this.canEdit()) {
      this.showToast('Acesso negado: Apenas Líder ou Supervisor pode alterar escalas.');
      return;
    }
    // Automatically open the paintbrush panel so the user has the acronyms toolbar visible at the top
    this.showPaintbrushPanel.set(true);

    this.editingRowCollabId.set(collab.id);
    this.editingRowScaleDraft.set({ ...collab.scale });
    this.showToast(`Edição da linha de ${collab.name}. Selecione uma sigla no painel do topo e clique nos dias correspondentes.`);
  }

  cancelRowScale() {
    this.editingRowCollabId.set(null);
    this.editingRowScaleDraft.set({});
    this.showToast('Edição de linha cancelada.');
  }

  updateDraftCell(day: number, value: string) {
    this.editingRowScaleDraft.update(draft => ({ ...draft, [day]: value }));
  }

  paintDraftCell(day: number) {
    const active = this.activePaintbrush();
    if (!active) {
      this.showToast('Selecione um turno ou sigla no painel do topo para pintar.');
      return;
    }
    this.updateDraftCell(day, active);
  }

  saveRowScale(collab: Collaborator) {
    if (!this.canEdit()) {
      this.showToast('Acesso negado.');
      return;
    }

    const draft = this.editingRowScaleDraft();
    const updatedCollab = {
      ...collab,
      scale: draft
    };

    this.scaleService.updateCollaborator(updatedCollab);
    this.editingRowCollabId.set(null);
    this.editingRowScaleDraft.set({});
    this.showToast(`Escala da linha de ${collab.name} salva com sucesso!`);

    this.scaleService.addAuditHistory(
      'EDITAR_ESCALA_LINHA',
      `Escala mensal do colaborador ${collab.name} editada via controle de linha direta.`
    );
  }

  // Manage custom shifts
  startEditingShift(shift: ShiftType) {
    this.editingShiftCode.set(shift.code);
    this.newShiftCode.set(shift.code);
    this.newShiftLabel.set(shift.label);
    this.newShiftHours.set(shift.hours);
    this.newShiftColor.set(shift.color);
    this.newShiftTextColor.set(shift.textColor || '#ffffff');
    this.newShiftTransparentBg.set(!!shift.transparentBg);
    this.newShiftDarkColor.set(shift.darkColor || shift.color);
    this.newShiftDarkTextColor.set(shift.darkTextColor || shift.textColor || '#ffffff');
    this.newShiftDarkTransparentBg.set(shift.darkTransparentBg !== undefined ? !!shift.darkTransparentBg : !!shift.transparentBg);
    this.activeShiftThemeTab.set('light');
    
    // Parse startTime & endTime
    if (shift.startTime) {
      const parts = shift.startTime.split(':');
      if (parts.length === 2) {
        this.startHour.set(parts[0]);
        this.startMinute.set(parts[1]);
      }
    } else {
      this.startHour.set('07');
      this.startMinute.set('00');
    }

    if (shift.endTime) {
      const parts = shift.endTime.split(':');
      if (parts.length === 2) {
        this.endHour.set(parts[0]);
        this.endMinute.set(parts[1]);
      }
    } else {
      this.endHour.set('16');
      this.endMinute.set('00');
    }

    this.showToast(`Editando o turno "${shift.code}". Modifique os campos desejados.`);
  }

  cancelEditingShift() {
    this.editingShiftCode.set(null);
    this.newShiftCode.set('');
    this.newShiftLabel.set('');
    this.newShiftHours.set('7h20');
    this.newShiftColor.set('#3b82f6');
    this.newShiftTextColor.set('#ffffff');
    this.newShiftTransparentBg.set(false);
    this.newShiftDarkColor.set('#3b82f6');
    this.newShiftDarkTextColor.set('#ffffff');
    this.newShiftDarkTransparentBg.set(false);
    this.activeShiftThemeTab.set('light');
    this.startHour.set('07');
    this.startMinute.set('00');
    this.endHour.set('16');
    this.endMinute.set('00');
  }

  saveShiftType() {
    const code = this.newShiftCode().trim().toUpperCase();
    const label = this.newShiftLabel().trim();
    if (!code || !label) {
      this.showToast('Erro: Código e Nome do turno são obrigatórios.');
      return;
    }

    const calculatedHours = this.calculatedShiftHours();
    const sTime = `${this.startHour()}:${this.startMinute()}`;
    const eTime = `${this.endHour()}:${this.endMinute()}`;

    const editCode = this.editingShiftCode();
    if (editCode) {
      // Edit existing shift type
      const targetShift = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === editCode);
      if (targetShift) {
        const updatedShift: ShiftType = {
          ...targetShift,
          label,
          hours: calculatedHours,
          color: this.newShiftColor(),
          textColor: this.newShiftTextColor(),
          transparentBg: this.newShiftTransparentBg(),
          darkColor: this.newShiftDarkColor(),
          darkTextColor: this.newShiftDarkTextColor(),
          darkTransparentBg: this.newShiftDarkTransparentBg(),
          startTime: sTime,
          endTime: eTime
        };
        this.scaleService.saveShiftType(updatedShift);
      }
      this.cancelEditingShift();
      this.showToast(`Turno "${code}" atualizado com sucesso.`);
      this.scaleService.addAuditHistory('EDITAR_TURNO', `Turno "${code}" editado pelo gestor.`);
    } else {
      // Create new shift type
      const exists = this.scaleService.shiftTypes().some(s => s.code.trim().toUpperCase() === code);
      if (exists) {
        this.showToast('Erro: Código de turno já cadastrado.');
        return;
      }

      const newShift: ShiftType = {
        code,
        label,
        hours: calculatedHours,
        color: this.newShiftColor(),
        textColor: this.newShiftTextColor(),
        transparentBg: this.newShiftTransparentBg(),
        darkColor: this.newShiftDarkColor(),
        darkTextColor: this.newShiftDarkTextColor(),
        darkTransparentBg: this.newShiftDarkTransparentBg(),
        startTime: sTime,
        endTime: eTime
      };

      this.scaleService.saveShiftType(newShift);
      this.cancelEditingShift();
      this.showToast(`Novo turno "${code}" criado com sucesso.`);
      this.scaleService.addAuditHistory('CRIAR_TURNO', `Novo turno "${code}" criado pelo gestor.`);
    }
  }

  removeShiftType(code: string) {
    // Check if any collaborator is currently assigned to this shift as their primary default shift
    const assignedCollabCount = this.getCollaboratorCountForShift(code);
    if (assignedCollabCount > 0) {
      this.showToast(`Erro: Há ${assignedCollabCount} colaborador(es) alocado(s) neste turno. Realoque-os primeiro.`);
      return;
    }

    this.scaleService.removeShiftType(code);
    this.showToast(`Sigla "${code}" removida.`);
    this.scaleService.addAuditHistory('REMOCAO_TURNO', `Turno com código "${code}" removido.`);
  }

  // Get real-time statistics for shift types
  getCollaboratorCountForShift(shiftCode: string): number {
    return this.scaleService.collaborators().filter(c => c.shift === shiftCode).length;
  }

  getScheduledDaysCountForShift(shiftCode: string): number {
    let count = 0;
    const days = this.daysInMonth();
    this.scaleService.collaborators().forEach(c => {
      const defaultCode = this.getShiftCode(c.shift);
      days.forEach(day => {
        const rawVal = c.scale[day] || '-';
        const val = (rawVal === '-') ? defaultCode : rawVal;
        if (val.trim().toUpperCase() === shiftCode.trim().toUpperCase()) {
          count++;
        }
      });
    });
    return count;
  }

  // Sigla management methods
  startEditingSigla(sigla: any) {
    this.editingSiglaCode.set(sigla.code);
    this.newSiglaCode.set(sigla.code);
    this.newSiglaLabel.set(sigla.label);
    this.newSiglaColor.set(sigla.color);
    this.newSiglaTextColor.set(sigla.textColor || '#ffffff');
    this.newSiglaDescription.set(sigla.description || '');
    this.newSiglaComputaAusencia.set(!!sigla.computaAusencia);
    this.newSiglaTransparentBg.set(!!sigla.transparentBg);
    this.newSiglaDarkColor.set(sigla.darkColor || sigla.color);
    this.newSiglaDarkTextColor.set(sigla.darkTextColor || sigla.textColor || '#ffffff');
    this.newSiglaDarkTransparentBg.set(sigla.darkTransparentBg !== undefined ? !!sigla.darkTransparentBg : !!sigla.transparentBg);
    this.activeSiglaThemeTab.set('light');
    this.showToast(`Editando a sigla "${sigla.code}". Modifique os campos desejados.`);
  }

  cancelEditingSigla() {
    this.editingSiglaCode.set(null);
    this.newSiglaCode.set('');
    this.newSiglaLabel.set('');
    this.newSiglaColor.set('#64748b');
    this.newSiglaTextColor.set('#ffffff');
    this.newSiglaDescription.set('');
    this.newSiglaComputaAusencia.set(false);
    this.newSiglaTransparentBg.set(false);
    this.newSiglaDarkColor.set('#64748b');
    this.newSiglaDarkTextColor.set('#ffffff');
    this.newSiglaDarkTransparentBg.set(false);
    this.activeSiglaThemeTab.set('light');
  }

  async saveSiglaType() {
    const code = this.newSiglaCode().trim().toUpperCase();
    const label = this.newSiglaLabel().trim();
    const color = this.newSiglaColor();
    const textColor = this.newSiglaTextColor();
    const desc = this.newSiglaDescription().trim();
    const computaAusencia = this.newSiglaComputaAusencia();
    const transparentBg = this.newSiglaTransparentBg();
    const darkColor = this.newSiglaDarkColor();
    const darkTextColor = this.newSiglaDarkTextColor();
    const darkTransparentBg = this.newSiglaDarkTransparentBg();

    if (!code || !label) {
      this.showToast('Erro: Código e Nome da sigla são obrigatórios.');
      return;
    }

    const oldCode = this.editingSiglaCode();

    try {
      if (oldCode) {
        // Edit existing
        if (oldCode !== code) {
          // Code changed! Check if new code already exists
          const codeExists = this.scaleService.siglaTypes().some(s => s.code.trim().toUpperCase() === code) ||
                             this.scaleService.shiftTypes().some(sh => sh.code.trim().toUpperCase() === code);
          if (codeExists) {
            this.showToast(`Erro: O código "${code}" já está em uso por outra sigla ou turno.`);
            return;
          }

          this.scaleService.isProcessing.set(true);
          // Call service to rename the code and update all reference scales
          await this.scaleService.updateSiglaTypeCode(oldCode, { 
            code, 
            label, 
            color, 
            description: desc, 
            textColor, 
            computaAusencia, 
            transparentBg,
            darkColor,
            darkTextColor,
            darkTransparentBg
          });
          this.scaleService.addAuditHistory('EDICAO_SIGLA_CODIGO', `Sigla "${oldCode}" renomeada para "${code}" pelo gestor.`);
          this.showToast(`Sigla "${oldCode}" alterada para "${code}" com sucesso.`);
        } else {
          // Standard edit of existing sigla
          const updatedSigla = {
            code: code,
            label: label,
            color: color,
            description: desc,
            textColor: textColor,
            computaAusencia: computaAusencia,
            transparentBg: transparentBg,
            darkColor: darkColor,
            darkTextColor: darkTextColor,
            darkTransparentBg: darkTransparentBg
          };
          this.scaleService.isProcessing.set(true);
          await this.scaleService.saveSiglaType(updatedSigla);
          this.scaleService.addAuditHistory('EDICAO_SIGLA', `Sigla "${code}" editada pelo gestor.`);
          this.showToast(`Sigla "${code}" actualizada com sucesso.`);
        }
        this.cancelEditingSigla();
      } else {
        // Create new
        const codeExists = this.scaleService.siglaTypes().some(s => s.code.trim().toUpperCase() === code) ||
                           this.scaleService.shiftTypes().some(sh => sh.code.trim().toUpperCase() === code);
        if (codeExists) {
          this.showToast('Erro: Código de sigla já cadastrado ou em uso por um turno.');
          return;
        }
        const newSigla = {
          code: code,
          label: label,
          color: color,
          description: desc,
          textColor: textColor,
          computaAusencia: computaAusencia,
          transparentBg: transparentBg,
          darkColor: darkColor,
          darkTextColor: darkTextColor,
          darkTransparentBg: darkTransparentBg
        };
        this.scaleService.isProcessing.set(true);
        await this.scaleService.saveSiglaType(newSigla);
        this.scaleService.addAuditHistory('CADASTRO_SIGLA', `Nova sigla "${code}" cadastrada.`);
        this.cancelEditingSigla();
        this.showToast(`Sigla "${code}" criada com sucesso.`);
      }
    } catch (err: any) {
      console.error('Error in saveSiglaType:', err);
      this.showToast(`Erro ao salvar sigla: ${err.message || err}`);
    } finally {
      this.scaleService.isProcessing.set(false);
    }
  }

  async removeSiglaType(code: string) {
    // Check if any scheduled days contain this sigla
    let count = 0;
    this.scaleService.collaborators().forEach(c => {
      Object.values(c.scale).forEach(val => {
        if (val === code) count++;
      });
    });

    if (count > 0) {
      const confirmForce = window.confirm(
        `A sigla "${code}" está sendo usada em ${count} dia(s) na escala atual.\n\n` +
        `Se você confirmar a exclusão, todos esses dias serão redefinidos para "-" (vazio/escala comum) e a sigla será removida definitivamente.\n\n` +
        `Deseja continuar com a exclusão?`
      );
      if (!confirmForce) return;

      this.scaleService.isProcessing.set(true);
      try {
        // Remove the sigla type itself and clear all references in the DB
        await this.scaleService.removeSiglaType(code, true);

        // Also ensure local collaborator scale states are updated
        const updatedCollabs = this.scaleService.collaborators().map(collab => {
          const updatedScale = { ...collab.scale };
          let changed = false;
          for (let d = 1; d <= 31; d++) {
            if (updatedScale[d] === code) {
              updatedScale[d] = '-';
              changed = true;
            }
          }
          return changed ? { ...collab, scale: updatedScale } : collab;
        });
        this.scaleService.collaborators.set(updatedCollabs);

        this.scaleService.addAuditHistory('REMOCAO_SIGLA_EM_USO', `Sigla "${code}" excluída e ${count} referências limpas na escala.`);
        this.showToast(`Sigla "${code}" e suas ${count} referências na escala foram excluídas com sucesso.`);
      } catch (err: any) {
        console.error('Error removing sigla in use:', err);
        this.showToast(`Erro ao excluir sigla: ${err.message || err}`);
      } finally {
        this.scaleService.isProcessing.set(false);
      }
    } else {
      const confirmDelete = window.confirm(`Deseja realmente excluir a sigla "${code}"?`);
      if (!confirmDelete) return;

      this.scaleService.isProcessing.set(true);
      try {
        await this.scaleService.removeSiglaType(code, false);
        this.scaleService.addAuditHistory('REMOCAO_SIGLA', `Sigla "${code}" excluída do sistema.`);
        this.showToast(`Sigla "${code}" excluída com sucesso.`);
      } catch (err: any) {
        console.error('Error removing sigla:', err);
        this.showToast(`Erro ao excluir sigla: ${err.message || err}`);
      } finally {
        this.scaleService.isProcessing.set(false);
      }
    }
  }

  isShiftOrSiglaTransparent(code: string): boolean {
    const upperCode = (code || '-').toUpperCase().trim();
    if (upperCode === '-' || upperCode === '?') return false;

    const sigla = this.scaleService.siglaTypes().find(s => s.code.trim().toUpperCase() === upperCode);
    if (sigla) {
      if (this.isLightTheme()) {
        return !!sigla.transparentBg;
      } else {
        return sigla.darkTransparentBg !== undefined ? !!sigla.darkTransparentBg : !!sigla.transparentBg;
      }
    }

    const shift = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === upperCode || s.label.trim().toUpperCase() === upperCode);
    if (shift) {
      if (this.isLightTheme()) {
        return !!shift.transparentBg;
      } else {
        return shift.darkTransparentBg !== undefined ? !!shift.darkTransparentBg : !!shift.transparentBg;
      }
    }

    return false;
  }

  getShiftOrSiglaBorderColor(code: string): string {
    const upperCode = (code || '-').toUpperCase().trim();
    if (upperCode === '-' || upperCode === '?') return 'rgba(0, 0, 0, 0.1)';

    const sigla = this.scaleService.siglaTypes().find(s => s.code.trim().toUpperCase() === upperCode);
    if (sigla) {
      if (this.isLightTheme()) {
        return sigla.color;
      } else {
        return sigla.darkColor || sigla.color;
      }
    }

    const shift = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === upperCode || s.label.trim().toUpperCase() === upperCode);
    if (shift) {
      if (this.isLightTheme()) {
        return shift.color;
      } else {
        return shift.darkColor || shift.color;
      }
    }

    return this.isLightTheme() ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
  }

  // Dynamic colors for matrix rendering
  getShiftOrSiglaColor(code: string, day?: number): string {
    const upperCode = (code || '-').toUpperCase().trim();
    if (this.isShiftOrSiglaTransparent(upperCode)) {
      return 'transparent';
    }

    if (upperCode === '-' || upperCode === '?') {
      if (this.isLightTheme()) {
        return 'transparent';
      }
      return '#091524';
    }

    // Try finding in shiftTypes first
    const shift = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === upperCode || s.label.trim().toUpperCase() === upperCode);
    if (shift) {
      if (this.isLightTheme()) {
        return this.getLightVibrantColor(shift.color, upperCode);
      }
      return shift.darkColor || shift.color;
    }

    // Try finding in siglaTypes
    const sigla = this.scaleService.siglaTypes().find(s => s.code.trim().toUpperCase() === upperCode);
    if (sigla) {
      if (this.isLightTheme()) {
        return sigla.color;
      }
      return sigla.darkColor || sigla.color;
    }

    // Is it a numeric code like "7", "2", etc?
    const isNum = /^\d+$/.test(upperCode) || /^\d+[:.,hH]\d+$/.test(upperCode);
    if (isNum) {
      if (this.isLightTheme()) {
        return '#d1fae5'; // light emerald-100
      }
      return '#064e3b'; // dark emerald-900
    }

    // Standard Fallbacks if not registered in DB
    if (this.isLightTheme()) {
      if (upperCode === 'X') return '#ecfdf5';
      if (upperCode === 'F') return '#f59e0b';
      if (upperCode === 'LM') return '#ef4444';
      if (upperCode.startsWith('M')) return '#10b981';
      if (upperCode.startsWith('T')) return '#3b82f6';
      if (upperCode.startsWith('N')) return '#8b5cf6';
      if (upperCode === 'ADM') return '#06b6d4';
      return '#10b981';
    } else {
      if (upperCode === 'X') return '#061d15';
      if (upperCode === 'F') return '#a855f7';
      if (upperCode === 'LM') return '#ef4444';
      return '#1e293b';
    }
  }

  getLightVibrantColor(dbColor: string, code: string): string {
    const hex = dbColor.replace('#', '').trim();
    // If database color is too dark, generate a beautiful vibrant one based on code name
    if (hex === '020813' || hex === '030a14' || hex === '071426' || hex === '000000' || hex.startsWith('0') || hex.startsWith('1')) {
      const upper = code.toUpperCase().trim();
      if (upper.startsWith('M')) return '#10b981';
      if (upper.startsWith('T')) return '#3b82f6';
      if (upper.startsWith('N')) return '#8b5cf6';
      if (upper === 'ADM') return '#06b6d4';
      if (upper === 'F') return '#f59e0b';
      if (upper === 'LM') return '#ef4444';
      
      let hash = 0;
      for (let i = 0; i < code.length; i++) {
        hash = code.charCodeAt(i) + ((hash << 5) - hash);
      }
      const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#14b8a6', '#f43f5e'];
      return colors[Math.abs(hash) % colors.length];
    }
    return dbColor;
  }

  getShiftOrSiglaTextColor(code: string): string {
    const upperCode = (code || '-').toUpperCase().trim();
    if (upperCode === '-') {
      return '#475569';
    }
    if (upperCode === '?') {
      return '#ef4444';
    }

    if (this.isShiftOrSiglaTransparent(upperCode)) {
      const sigla = this.scaleService.siglaTypes().find(s => s.code.trim().toUpperCase() === upperCode);
      if (sigla) {
        if (this.isLightTheme()) {
          return sigla.textColor || sigla.color || '#ffffff';
        } else {
          return sigla.darkTextColor || sigla.darkColor || sigla.textColor || sigla.color || '#ffffff';
        }
      }
      const shift = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === upperCode || s.label.trim().toUpperCase() === upperCode);
      if (shift) {
        if (this.isLightTheme()) {
          return shift.textColor || shift.color || '#ffffff';
        } else {
          return shift.darkTextColor || shift.darkColor || shift.textColor || shift.color || '#ffffff';
        }
      }
    }

    // Try finding in shiftTypes first
    const shift = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === upperCode || s.label.trim().toUpperCase() === upperCode);
    if (shift) {
      if (this.isLightTheme()) {
        return shift.textColor || '#ffffff';
      }
      return shift.darkTextColor || shift.textColor || '#ffffff';
    }

    // Try finding in siglaTypes
    const sigla = this.scaleService.siglaTypes().find(s => s.code.trim().toUpperCase() === upperCode);
    if (sigla) {
      if (this.isLightTheme()) {
        return sigla.textColor || '#ffffff';
      }
      return sigla.darkTextColor || sigla.textColor || '#ffffff';
    }

    // Is it a numeric code?
    const isNum = /^\d+$/.test(upperCode) || /^\d+[:.,hH]\d+$/.test(upperCode);
    if (isNum) {
      if (this.isLightTheme()) {
        return '#065f46'; // dark emerald text
      }
      return '#34d399'; // bright emerald text
    }

    if (this.isLightTheme()) {
      if (!sigla && !shift && upperCode === 'X') return '#334155';
    }

    return '#ffffff';
  }

  // Multi-employee Assignment & Movement logic
  assignEmployeeToShift() {
    const collabId = this.assignmentCollabId();
    const shiftCode = this.assignmentShiftCode();

    if (!collabId || !shiftCode) {
      this.showToast('Erro: Selecione um colaborador e o novo turno.');
      return;
    }

    const collab = this.scaleService.collaborators().find(c => c.id === collabId);
    const shiftType = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === shiftCode);

    if (!collab || !shiftType) {
      this.showToast('Erro: Seleção inválida.');
      return;
    }

    const oldShiftCode = collab.shift;

    const updatedScale = { ...collab.scale };
    for (let day = 1; day <= 30; day++) {
      if (updatedScale[day] === oldShiftCode) {
        updatedScale[day] = shiftCode;
      }
    }
    const updatedCollab = {
      ...collab,
      shift: shiftCode,
      hours: shiftType.hours,
      scale: updatedScale
    };

    this.scaleService.updateCollaborator(updatedCollab);
    this.showToast(`Colaborador ${collab.name} foi movido com sucesso para o turno "${shiftType.label}"!`);

    // Log this action to the official audit history
    this.scaleService.addAuditHistory(
      'ALOCACAO_TURNO',
      `Colaborador ${collab.name} movido do turno "${oldShiftCode}" para o turno "${shiftCode}" (${shiftType.hours}).`
    );

    // Reset fields
    this.assignmentCollabId.set('');
    this.assignmentShiftCode.set('');
  }

  // Métodos de autenticação real integrada ao Supabase

  public checkLoginName() {
    this.loginError.set(null);
    const rawInput = this.loginNameInput().trim();
    if (!rawInput) {
      this.loginError.set('Por favor, insira o seu nome.');
      return;
    }
    const typedName = rawInput.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const collabs = this.scaleService.collaborators();
    // Procurar por correspondência de nome exato ou contido
    const found = collabs.find(c => {
      const normName = c.name.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normName === typedName || normName.includes(typedName);
    });

    if (!found) {
      this.loginError.set('Colaborador não encontrado. Por favor, digite seu nome exatamente como cadastrado no sistema.');
      return;
    }

    this.matchedCollab.set(found);
    if (!found.password || found.password.trim() === '') {
      this.isFirstAccess.set(true);
    } else {
      this.isFirstAccess.set(false);
    }
  }

  public handleLoginSubmit() {
    this.loginError.set(null);
    const collab = this.matchedCollab();
    if (!collab) return;

    const pin = this.loginPasswordInput().trim();
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      this.loginError.set('A senha de acesso deve possuir exatamente 4 dígitos numéricos.');
      return;
    }

    if (this.isFirstAccess()) {
      const confirmPin = this.confirmPasswordInput().trim();
      if (pin !== confirmPin) {
        this.loginError.set('As senhas digitadas não coincidem. Por favor, redigite e confirme.');
        return;
      }

      // Cadastrar nova senha de 4 dígitos no Supabase
      const updatedCollab = { ...collab, password: pin };
      this.scaleService.updateCollaborator(updatedCollab);
      
      // Realizar login oficial
      this.selectedSimulatedCollabId.set(collab.id);
      this.scaleService.selectedCollabName.set(collab.name);
      this.scaleService.currentRole.set(collab.role);
      
      safeSetLocalStorage('selectedSimulatedCollabId', collab.id);
      safeSetLocalStorage('lastActivityTime', Date.now().toString());
      safeSetSessionStorage('session_active', 'true');
      this.resetInactivityTimer();

      this.showToast(`Senha de 4 dígitos cadastrada com sucesso! Bem-vindo, ${collab.name}.`);
      this.clearLoginInputs();
      
      // Redirecionar dependendo de quem logou (Administradores para grid, restante para portal)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      if (this.isAdmin(collab) && !isMobile) {
        this.activeSubTab.set('matrix');
      } else {
        this.activeSubTab.set('portal');
        this.autoSelectTodayTabForLoggedCollab(collab);
      }
    } else {
      // Login com senha existente
      if (collab.password === pin) {
        this.selectedSimulatedCollabId.set(collab.id);
        this.scaleService.selectedCollabName.set(collab.name);
        this.scaleService.currentRole.set(collab.role);
        
        safeSetLocalStorage('selectedSimulatedCollabId', collab.id);
        safeSetLocalStorage('lastActivityTime', Date.now().toString());
        safeSetSessionStorage('session_active', 'true');
        this.resetInactivityTimer();

        this.showToast(`Bem-vindo de volta, ${collab.name}!`);
        this.clearLoginInputs();
        
        const isMobileLogin = typeof window !== 'undefined' && window.innerWidth < 768;
        if (this.isAdmin(collab) && !isMobileLogin) {
          this.activeSubTab.set('matrix');
        } else {
          this.activeSubTab.set('portal');
          this.autoSelectTodayTabForLoggedCollab(collab);
        }
      } else {
        this.loginError.set('Senha incorreta de 4 dígitos. Por favor, tente novamente.');
      }
    }
  }

  public resetLoginState() {
    this.matchedCollab.set(null);
    this.isFirstAccess.set(false);
    this.loginPasswordInput.set('');
    this.confirmPasswordInput.set('');
    this.loginError.set(null);
  }

  private clearLoginInputs() {
    this.loginNameInput.set('');
    this.loginPasswordInput.set('');
    this.confirmPasswordInput.set('');
    this.matchedCollab.set(null);
    this.isFirstAccess.set(false);
    this.loginError.set(null);
  }

  // Auth Portal Simulation legacy wrapper
  openAuthModal(mode: 'LOGIN' | 'SIGNUP') {
    this.resetLoginState();
  }

  logout() {
    this.scaleService.selectedCollabName.set(null);
    this.selectedSimulatedCollabId.set(null);
    safeRemoveLocalStorage('selectedSimulatedCollabId');
    safeRemoveLocalStorage('lastActivityTime');
    safeRemoveSessionStorage('session_active');
    safeSetSessionStorage('dev_logged_out', 'true');
    if (this.inactivityTimeoutId) {
      clearTimeout(this.inactivityTimeoutId);
    }
    this.showToast('Sessão encerrada.');
    this.resetLoginState();
  }

  loginAsCollab(id: string) {
    const currentLogged = this.getLoggedCollab();
    if (currentLogged && !this.isAdmin(currentLogged) && currentLogged.id !== id) {
      this.showToast('Os avatares dos colegas são apenas informativos. Acesso restrito à sessão de outros colaboradores.');
      return;
    }
    this.selectedSimulatedCollabId.set(id);
    const collab = this.scaleService.collaborators().find(c => c.id === id);
    if (collab) {
      this.scaleService.selectedCollabName.set(collab.name);
      this.scaleService.currentRole.set(collab.role);
      
      safeSetLocalStorage('selectedSimulatedCollabId', collab.id);
      safeSetLocalStorage('lastActivityTime', Date.now().toString());
      safeSetSessionStorage('session_active', 'true');
      this.resetInactivityTimer();

      this.showToast(`Sessão simulada como ${collab.name}!`);
      if (this.isAdmin(collab)) {
        this.activeSubTab.set('matrix');
      } else {
        this.activeSubTab.set('portal');
        this.autoSelectTodayTabForLoggedCollab(collab);
      }
    } else {
      this.selectedSimulatedCollabId.set(null);
      this.scaleService.selectedCollabName.set('');
      this.scaleService.currentRole.set('SUPERVISOR');
      safeRemoveLocalStorage('selectedSimulatedCollabId');
      safeRemoveLocalStorage('lastActivityTime');
      safeRemoveSessionStorage('session_active');
    }
  }

  navigateToCollabPortal(id: string): void {
    const logged = this.getLoggedCollab();
    if (logged && !this.isAdmin(logged) && logged.id !== id) {
      this.showToast('Os avatares dos colegas são apenas informativos. Acesso restrito à sessão de outros colaboradores.');
      return;
    }
    this.loginAsCollab(id);
    this.isDayDetailsModalOpen.set(false);
    this.activeSubTab.set('portal');
  }

  isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }

  // Swipe navigation for Portal do Colaborador
  touchStartX = 0;
  touchEndX = 0;
  touchStartY = 0;
  touchEndY = 0;

  onPortalTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
    this.touchStartY = event.changedTouches[0].clientY;
  }

  onPortalTouchEnd(event: TouchEvent) {
    if (event.changedTouches && event.changedTouches.length > 0) {
      this.touchEndX = event.changedTouches[0].clientX;
      this.touchEndY = event.changedTouches[0].clientY;
      this.handlePortalSwipe();
    }
  }

  handlePortalSwipe() {
    const minSwipeDistance = 40; // Minimum distance to trigger swipe
    const maxVerticalRatio = 0.6; // Avoid triggering on vertical scrolling
    
    const xDiff = this.touchEndX - this.touchStartX;
    const yDiff = this.touchEndY - this.touchStartY;
    
    // Only trigger if horizontal swipe distance is met, and vertical distance is proportionally smaller (not a diagonal/vertical scroll)
    if (Math.abs(xDiff) > minSwipeDistance && Math.abs(yDiff) < Math.abs(xDiff) * maxVerticalRatio) {
      if (!this.isMobile()) return;

      const portalTabs: ('portal' | 'escala' | 'perfil' | 'equipe' | 'indicadores')[] = ['portal', 'escala', 'perfil', 'equipe', 'indicadores'];
      const currentTab = this.activeSubTab();
      const idx = portalTabs.indexOf(currentTab as any);
      if (idx === -1) return;

      if (xDiff < 0) {
        // Swiped left, go to next tab
        if (idx < portalTabs.length - 1) {
          this.activeSubTab.set(portalTabs[idx + 1] as any);
        }
      } else {
        // Swiped right, go to previous tab
        if (idx > 0) {
          this.activeSubTab.set(portalTabs[idx - 1] as any);
        }
      }
    }
  }

  getBaseShift(shift: string): string {
    if (!shift) return '';
    const s = shift.toUpperCase();
    if (s.includes('MANHÃ') || s.includes('MANHA')) return 'MANHÃ';
    if (s.includes('TARDE')) return 'TARDE';
    if (s.includes('NOITE')) return 'NOITE';
    if (s.includes('MADRUGADA')) return 'MADRUGADA';
    if (s.includes('ADMINISTRATIVO')) return 'ADMINISTRATIVO';
    return s;
  }

  getCollabTeamMembers(): Collaborator[] {
    const logged = this.getLoggedCollab();
    if (!logged) return [];
    const baseShift = this.getBaseShift(logged.shift);
    return this.scaleService.collaborators().filter(c => {
      return this.getBaseShift(c.shift) === baseShift;
    });
  }

  saveProfileChanges(collab: Collaborator, name: string, birthday: string, phone: string, photoUrl?: string) {
    if (!name || !name.trim()) {
      this.showToast('O nome não pode estar vazio.');
      return;
    }
    const updated: Collaborator = {
      ...collab,
      name: name.trim(),
      birthday: birthday ? birthday : collab.birthday,
      phone: phone.trim() || undefined,
      photoUrl: photoUrl && photoUrl.trim() ? photoUrl.trim() : collab.photoUrl
    };
    this.scaleService.updateCollaborator(updated);
    this.isProfileEditOpen.set(false);
    this.showToast('Perfil atualizado com sucesso!');
  }

  formatBirthday(birthday?: string): string {
    if (!birthday) return 'Não informada';
    const parts = birthday.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return birthday;
  }

  prevCalendarDay(): void {
    const cur = this.selectedCalendarDay();
    if (cur > 1) {
      this.selectedCalendarDay.set(cur - 1);
    }
  }

  nextCalendarDay(): void {
    const cur = this.selectedCalendarDay();
    const max = this.daysInMonth().length;
    if (cur < max) {
      this.selectedCalendarDay.set(cur + 1);
    }
  }

  registerCollaborator(
    name: string,
    role: string,
    group: string,
    shift: string,
    sector: string,
    bh: number,
    score: number,
    photo?: string,
    birthday?: string,
    sd1Desc?: string, sd1Date?: string,
    sd2Desc?: string, sd2Date?: string,
    sd3Desc?: string, sd3Date?: string,
    sd4Desc?: string, sd4Date?: string,
    sd5Desc?: string, sd5Date?: string,
    isAdmin?: boolean,
    nickname?: string,
    gafesStr?: string
  ) {
    const specialDates: SpecialDate[] = [];
    if (sd1Desc && sd1Date) specialDates.push({ description: sd1Desc, date: sd1Date, priority: 1 });
    if (sd2Desc && sd2Date) specialDates.push({ description: sd2Desc, date: sd2Date, priority: 2 });
    if (sd3Desc && sd3Date) specialDates.push({ description: sd3Desc, date: sd3Date, priority: 3 });
    if (sd4Desc && sd4Date) specialDates.push({ description: sd4Desc, date: sd4Date, priority: 4 });
    if (sd5Desc && sd5Date) specialDates.push({ description: sd5Desc, date: sd5Date, priority: 5 });

    const getShiftCode = (s: string): string => {
      const norm = (s || '').toUpperCase().trim();
      const st = this.scaleService.shiftTypes().find(x => x.code.toUpperCase().trim() === norm || x.label.toUpperCase().trim() === norm);
      return st ? st.code : norm;
    };

    const newShiftCode = getShiftCode(shift);
    const shiftType = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === newShiftCode);
    const newHours = shiftType ? shiftType.hours : (newShiftCode === 'ADM' ? '8h00' : '7h20');

    const parsedGafes = gafesStr ? gafesStr.split('\n').map(g => g.trim()).filter(g => g.length > 0) : [];

    this.scaleService.addCollaborator(
      name,
      role,
      newHours,
      group,
      shift,
      sector,
      bh,
      score,
      photo,
      birthday,
      specialDates,
      undefined,
      isAdmin,
      nickname,
      parsedGafes
    );
    this.isCollabModalOpen.set(false);
    this.isNewSectorMode.set(false);
    this.isNewRoleMode.set(false);
  }

  getUnifiedAgenda(): {
    day: number;
    type: string;
    label: string;
    icon: string;
    color: string;
    details: string;
  }[] {
    const collab = this.getLoggedCollab();
    if (!collab) return [];

    const agenda: {
      day: number;
      type: string;
      label: string;
      icon: string;
      color: string;
      details: string;
    }[] = [];

    const monthNum = this.selectedMonthIndex() + 1;
    const year = this.currentYear();

    // 1. Check Birthday
    if (collab.birthday) {
      const parts = collab.birthday.split('-');
      if (parts.length === 3) {
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        if (m === monthNum) {
          agenda.push({
            day: d,
            type: 'birthday',
            label: 'Seu Aniversário',
            icon: 'cake',
            color: '#f43f5e',
            details: 'Folga Automática Garantida! 🎂'
          });
        }
      }
    }

    // 2. Check Special Dates
    if (collab.specialDates && Array.isArray(collab.specialDates)) {
      for (const sd of collab.specialDates) {
        if (!sd.date || !sd.description || sd.description.startsWith('BOB_METADATA:')) continue;
        const parts = sd.date.split('-');
        if (parts.length === 3) {
          const m = parseInt(parts[1], 10);
          const d = parseInt(parts[2], 10);
          if (m === monthNum) {
            const descLower = sd.description.toLowerCase();
            let icon = 'celebration';
            let color = '#f59e0b'; // amber
            
            if (descLower.includes('casamento') || descLower.includes('aliança') || descLower.includes('alianca') || descLower.includes('wedding') || descLower.includes('bodas') || descLower.includes('marido') || descLower.includes('esposa') || descLower.includes('conjuge') || descLower.includes('cônjuge') || descLower.includes('noivado')) {
              icon = 'favorite';
              color = '#e11d48'; // red
            } else if (descLower.includes('filho') || descLower.includes('filha') || descLower.includes('criança') || descLower.includes('crianca') || descLower.includes('bebe') || descLower.includes('bebê') || descLower.includes('nascimento') || descLower.includes('child') || descLower.includes('baby') || descLower.includes('maternidade') || descLower.includes('paternidade')) {
              icon = 'child_care';
              color = '#3b82f6'; // blue
            }

            agenda.push({
              day: d,
              type: 'special_date',
              label: sd.description,
              icon: icon,
              color: color,
              details: `Data Magna (Prioridade P${sd.priority})`
            });
          }
        }
      }
    }

    // 3. Check Folga Requests (Chosen Days Off)
    if (collab.folgaRequests && Array.isArray(collab.folgaRequests)) {
      for (const fr of collab.folgaRequests) {
        if (!fr.date) continue;
        const parts = fr.date.split('-');
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10);
          const d = parseInt(parts[2], 10);
          if (y === year && m === monthNum) {
            const count = this.getFolgaRequestCount(d);
            const scaleVal = collab.scale ? (collab.scale[d] || 'X') : 'X';
            const isApproved = scaleVal === 'F';
            
            agenda.push({
              day: d,
              type: isApproved ? 'folga_approved' : 'folga_requested',
              label: isApproved ? 'Folga Confirmada' : 'Folga Solicitada',
              icon: isApproved ? 'verified' : 'radio_button_checked',
              color: isApproved ? '#10b981' : '#10b981',
              details: isApproved ? 'Folga aprovada e confirmada na escala!' : `Status: Pendente (${count}/2 vagas ocupadas)`
            });
          }
        }
      }
    }

    // Sort chronologically by day
    agenda.sort((a, b) => a.day - b.day);

    return agenda;
  }

  savePortalSpecialDates(birthday: string, specialDates: SpecialDate[]) {
    const collab = this.getLoggedCollab();
    if (!collab) {
      this.showToast('Selecione um colaborador na simulação primeiro.');
      return;
    }

    const validDates = specialDates.filter(d => d.date && d.description.trim());

    const updatedCollab: Collaborator = {
      ...collab,
      birthday: birthday || '',
      specialDates: validDates
    };

    this.scaleService.updateCollaborator(updatedCollab);
    this.showToast('Datas especiais atualizadas com sucesso!');
  }

  requestPortalFolga(date: string) {
    const collab = this.getLoggedCollab();
    if (!collab) {
      this.showToast('Selecione um colaborador na simulação primeiro.');
      return;
    }
    const result = this.scaleService.requestFolga(collab.id, date, this.simulatedDayOfMonth());
    this.showToast(result.message);
  }

  removePortalFolga(date: string) {
    const collab = this.getLoggedCollab();
    if (!collab) {
      this.showToast('Selecione um colaborador na simulação primeiro.');
      return;
    }
    const result = this.scaleService.removeFolga(collab.id, date, this.simulatedDayOfMonth());
    this.showToast(result.message);
  }

  getFolgaRequestCount(day: number): number {
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    let count = 0;
    for (const collab of this.scaleService.collaborators()) {
      if (collab.folgaRequests) {
        if (collab.folgaRequests.some(r => r.date === dateStr)) {
          count++;
        }
      }
    }
    return count;
  }

  getCollaboratorsForFolga(day: number): string[] {
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const names: string[] = [];
    for (const collab of this.scaleService.collaborators()) {
      if (collab.folgaRequests && collab.folgaRequests.some(r => r.date === dateStr)) {
        names.push(collab.name);
      }
    }
    return names;
  }

  isChosenByLogged(day: number): boolean {
    const collab = this.getLoggedCollab();
    if (!collab || !collab.folgaRequests) return false;
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return collab.folgaRequests.some(r => r.date === dateStr);
  }

  isPreSelectedByLogged(day: number): boolean {
    const collab = this.getLoggedCollab();
    if (!collab || !collab.folgaRequests) return false;
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return collab.folgaRequests.some(r => r.date === dateStr && r.isPreSelected);
  }

  getCalendarDayClass(isChosenByMe: boolean, count: number): string {
    const base = 'p-2.5 border rounded-lg flex flex-col justify-between gap-1 transition-all cursor-pointer h-16 min-w-0 outline-none text-left shadow-sm';
    if (this.isLightTheme()) {
      if (isChosenByMe) {
        return `${base} bg-emerald-600 border-emerald-700 text-white shadow-md shadow-emerald-500/10`;
      } else if (count >= 2) {
        return `${base} bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100/70`;
      } else {
        return `${base} bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-700`;
      }
    } else {
      if (isChosenByMe) {
        return `${base} bg-emerald-950/40 border-emerald-500 text-white`;
      } else if (count >= 2) {
        return `${base} bg-red-950/20 border-red-950/50 text-slate-300`;
      } else {
        return `${base} bg-[#071426] border-[#10213b] hover:border-slate-400 text-slate-300`;
      }
    }
  }

  isWorkDay(collab: any, d: number): boolean {
    if (!collab) return false;
    const cellValRaw = collab.scale && collab.scale[d] !== undefined ? collab.scale[d] : '-';
    const cellVal = (cellValRaw === '-') ? this.getShiftCode(collab.shift) : cellValRaw;
    const upperCode = cellVal.toUpperCase().trim();
    
    if (upperCode === '' || upperCode === '-') return true; // Default shift is a work day
    
    // Is it a folga / leave / absence code?
    const offCodes = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X', 'LM', 'LMT', 'LA'];
    if (offCodes.includes(upperCode)) return false;
    
    // Check if it exists in siglaTypes
    const sigla = this.scaleService.siglaTypes().find(s => s.code.trim().toUpperCase() === upperCode);
    if (sigla) {
      return false; // Any registered sigla is generally an absence/folga/leave
    }
    
    return true;
  }

  getWorkSequenceString(collab: any, day: number): string {
    if (!this.isWorkDay(collab, day)) {
      return '';
    }
    
    let count = 0;
    for (let d = day; d >= 1; d--) {
      if (this.isWorkDay(collab, d)) {
        count++;
      } else {
        break;
      }
    }
    return `S${count}`;
  }

  openDayDetailsModal(collab: any, day: number) {
    this.selectedDetailCollab.set(collab);
    this.selectedDetailDay.set(day);
    this.dayDetailsActiveTab.set('seu_turno');
    this.isDayDetailsModalOpen.set(true);
  }

  getSortedShiftTypes(): ShiftType[] {
    return [...this.scaleService.shiftTypes()].sort((a, b) => {
      const timeA = a.startTime || '';
      const timeB = b.startTime || '';
      if (!timeA && !timeB) return a.code.localeCompare(b.code);
      if (!timeA) return 1;
      if (!timeB) return -1;
      return timeA.localeCompare(timeB);
    });
  }

  getNextShiftCode(currentShiftCode: string): string {
    const sortedShifts = this.getSortedShiftTypes();
    if (sortedShifts.length === 0) return '';
    const currentIndex = sortedShifts.findIndex(s => s.code.trim().toUpperCase() === currentShiftCode.trim().toUpperCase());
    if (currentIndex === -1) {
      return sortedShifts[0].code;
    }
    const nextIndex = (currentIndex + 1) % sortedShifts.length;
    return sortedShifts[nextIndex].code;
  }

  getCollabEffectiveShiftForDay(collab: any, day: number): string {
    if (!collab) return '';
    const code = this.getCollabShiftOnDay(collab, day);
    const upper = code.toUpperCase().trim();
    
    // If it's an off code (folga/absence/leave)
    const offCodes = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X', 'LM', 'LMT', 'LA'];
    const isOff = offCodes.includes(upper) || this.scaleService.siglaTypes().some(s => s.code.trim().toUpperCase() === upper);
    
    if (isOff) {
      return this.getShiftCode(collab.shift).toUpperCase().trim();
    }
    return upper;
  }

  selectCalendarDay(day: number): void {
    this.selectedCalendarDay.set(day);
  }

  onPortalCalendarDayClick(day: number): void {
    this.selectCalendarDay(day);
    this.openPortalDayEditModal(day);
  }

  openPortalDayEditModal(day: number): void {
    this.portalEditSelectedDay.set(day);
    this.isPortalDayEditModalOpen.set(true);
  }

  setPortalDayScale(code: string): void {
    const logged = this.getLoggedCollab();
    const day = this.portalEditSelectedDay();
    if (!logged || !day) return;

    const updatedScale = { ...logged.scale };
    const oldCode = updatedScale[day] || '-';
    updatedScale[day] = code;

    const updatedCollab = {
      ...logged,
      scale: updatedScale
    };

    this.scaleService.updateCollaborator(updatedCollab);
    
    // Find label for sigla or shift code
    const siglaObj = this.scaleService.siglaTypes().find(s => s.code.toUpperCase().trim() === code.toUpperCase().trim());
    const label = code === 'F' ? 'Folga' : (siglaObj?.label || code);
    const actionLabel = `Definida a escala do dia ${day} como "${label}" (${code}).`;
    this.showToast(actionLabel);

    // Register in audit history
    this.scaleService.addAuditHistory(
      'ALTERACAO_PORTAL',
      `Colaborador ${logged.name} alterou sua própria escala no dia ${day} via portal: de "${oldCode}" para "${code}"`
    );

    this.isPortalDayEditModalOpen.set(false);
  }

  togglePortalDayOff(day: number): void {
    const logged = this.getLoggedCollab();
    if (!logged) return;

    const dayInfo = this.getCollaboratorDayScheduleInfo(logged, day);
    const updatedScale = { ...logged.scale };

    let actionLabel = '';
    if (dayInfo.status === 'folga') {
      // Remove day off -> set to standard shift
      const shiftCode = logged.shift || 'ADM';
      updatedScale[day] = shiftCode;
      actionLabel = `Removida folga do dia ${day}. Definido turno de trabalho "${shiftCode}".`;
    } else {
      // Insert day off -> set to 'F'
      updatedScale[day] = 'F';
      actionLabel = `Inserida folga no dia ${day}.`;
    }

    const updatedCollab = {
      ...logged,
      scale: updatedScale
    };

    this.scaleService.updateCollaborator(updatedCollab);
    this.showToast(actionLabel);

    // Register in audit history
    this.scaleService.addAuditHistory(
      'ALTERACAO_PORTAL',
      `Colaborador ${logged.name} alterou sua própria escala no dia ${day} via portal: ${actionLabel}`
    );
  }

  sortCollaboratorsWithLoggedFirst(collabsList: any[]): any[] {
    const logged = this.getLoggedCollab();
    
    const getRank = (c: any) => {
      if (logged && c.id === logged.id) return 0;
      if (c.role === 'SUPERVISOR') return 1;
      if (c.role === 'LIDER') return 2;
      if (c.role === 'OPERADOR') return 3;
      return 4;
    };

    return [...collabsList].sort((a, b) => {
      const rA = getRank(a);
      const rB = getRank(b);
      if (rA !== rB) return rA - rB;
      return (a.name || '').localeCompare(b.name || '');
    });
  }

  getPreviousShiftLabel(): string {
    const logged = this.getLoggedCollab();
    if (!logged) return 'ANTERIOR';
    const shift = (logged.shift || '').trim().toUpperCase();
    if (shift === 'MANHÃ' || shift === 'MANHA') return 'NOITE';
    if (shift === 'TARDE') return 'MANHÃ';
    if (shift === 'NOITE') return 'TARDE';
    return 'MANHÃ'; // Fallback
  }

  getPosteriorShiftLabel(): string {
    const logged = this.getLoggedCollab();
    if (!logged) return 'POSTERIOR';
    const shift = (logged.shift || '').trim().toUpperCase();
    if (shift === 'MANHÃ' || shift === 'MANHA') return 'TARDE';
    if (shift === 'TARDE') return 'NOITE';
    if (shift === 'NOITE') return 'MANHÃ';
    return 'TARDE'; // Fallback
  }

  getTodayTeamCollaborators(): any[] {
    const logged = this.getLoggedCollab();
    if (!logged) return [];
    
    const day = this.selectedCalendarDay();
    const myShiftCode = this.getCollabEffectiveShiftForDay(logged, day);
    const filter = this.coworkersFilter();
    
    const filtered = this.scaleService.collaborators().filter(c => {
      // Must be scheduled to work on that day
      if (!this.isWorkDay(c, day)) return false;
      
      const cBaseShift = (c.shift || '').trim().toUpperCase();
      const loggedBaseShift = (logged.shift || '').trim().toUpperCase();

      if (filter === 'MEU_TURNO') {
        return cBaseShift === loggedBaseShift || (loggedBaseShift === 'MANHÃ' && cBaseShift === 'MANHA') || (loggedBaseShift === 'MANHA' && cBaseShift === 'MANHÃ');
      } else if (filter === 'TURNO_ANTERIOR') {
        const prevShift = this.getPreviousShiftLabel().toUpperCase();
        return cBaseShift === prevShift || (prevShift === 'MANHÃ' && cBaseShift === 'MANHA') || (prevShift === 'MANHA' && cBaseShift === 'MANHÃ');
      } else if (filter === 'TURNO_POSTERIOR') {
        const postShift = this.getPosteriorShiftLabel().toUpperCase();
        return cBaseShift === postShift || (postShift === 'MANHÃ' && cBaseShift === 'MANHA') || (postShift === 'MANHA' && cBaseShift === 'MANHÃ');
      }

      // 'TODOS'
      return true;
    });

    return this.sortCollaboratorsWithLoggedFirst(filtered);
  }

  getCollaboratorsOnVacationForDay(day: number): any[] {
    const logged = this.getLoggedCollab();
    if (!logged) return [];
    
    const filter = this.coworkersFilter();
    
    const filtered = this.scaleService.collaborators().filter(c => {
      // Must not be scheduled to work on that day
      if (this.isWorkDay(c, day)) return false;

      const cBaseShift = (c.shift || '').trim().toUpperCase();
      const loggedBaseShift = (logged.shift || '').trim().toUpperCase();

      if (filter === 'MEU_TURNO') {
        return cBaseShift === loggedBaseShift || (loggedBaseShift === 'MANHÃ' && cBaseShift === 'MANHA') || (loggedBaseShift === 'MANHA' && cBaseShift === 'MANHÃ');
      } else if (filter === 'TURNO_ANTERIOR') {
        const prevShift = this.getPreviousShiftLabel().toUpperCase();
        return cBaseShift === prevShift || (prevShift === 'MANHÃ' && cBaseShift === 'MANHA') || (prevShift === 'MANHA' && cBaseShift === 'MANHÃ');
      } else if (filter === 'TURNO_POSTERIOR') {
        const postShift = this.getPosteriorShiftLabel().toUpperCase();
        return cBaseShift === postShift || (postShift === 'MANHÃ' && cBaseShift === 'MANHA') || (postShift === 'MANHA' && cBaseShift === 'MANHÃ');
      }

      // 'TODOS'
      return true;
    });
    return this.sortCollaboratorsWithLoggedFirst(filtered);
  }

  getTodayTeamShiftLabel(): string {
    const logged = this.getLoggedCollab();
    if (!logged) return '';
    const day = this.selectedCalendarDay();
    const myShiftCode = this.getCollabEffectiveShiftForDay(logged, day);
    const shiftType = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === myShiftCode);
    return shiftType ? `${shiftType.label} (${shiftType.code})` : myShiftCode;
  }

  getTodayDay(): number {
    return new Date().getDate();
  }

  getCollaboratorsForDetailTab(tab: 'seu_turno' | 'turno_posterior' | 'geral'): any[] {
    const day = this.selectedDetailDay();
    const collab = this.selectedDetailCollab();
    if (day === null || !collab) return [];

    const allScheduled = this.getCollaboratorsScheduledForDay(day);
    if (tab === 'geral') {
      return this.sortCollaboratorsWithLoggedFirst(allScheduled);
    }

    const myShiftCode = this.getCollabEffectiveShiftForDay(collab, day);
    if (tab === 'seu_turno') {
      const filtered = allScheduled.filter(c => this.getCollabEffectiveShiftForDay(c, day) === myShiftCode);
      return this.sortCollaboratorsWithLoggedFirst(filtered);
    }

    if (tab === 'turno_posterior') {
      const nextShiftCode = this.getNextShiftCode(myShiftCode);
      if (!nextShiftCode) return [];
      const filtered = allScheduled.filter(c => this.getCollabEffectiveShiftForDay(c, day) === nextShiftCode);
      return this.sortCollaboratorsWithLoggedFirst(filtered);
    }

    return [];
  }

  getCollaboratorsScheduledForDay(day: number | null): any[] {
    if (day === null) return [];
    return this.scaleService.collaborators().filter(collab => this.isWorkDay(collab, day));
  }

  getCollabShiftOnDay(collab: any, day: number): string {
    if (!collab) return '';
    const cellValRaw = collab.scale && collab.scale[day] !== undefined ? collab.scale[day] : '-';
    const cellVal = (cellValRaw === '-') ? this.getShiftCode(collab.shift) : cellValRaw;
    return cellVal.toUpperCase().trim();
  }

  /**
   * Obtém informações detalhadas de status, rótulo e horários para um colaborador específico no dia selecionado.
   */
  getCollaboratorDayScheduleInfo(collab: any, day: number): {
    status: 'trabalho' | 'folga' | 'afastamento' | 'licenca';
    label: string;
    subLabel: string;
    hours: string;
    color: string;
    borderColor: string;
    textColor: string;
    icon: string;
  } {
    if (!collab) {
      return {
        status: 'trabalho',
        label: '-',
        subLabel: 'Sem escala',
        hours: '',
        color: 'bg-[#071426]',
        borderColor: 'border-[#10213b]',
        textColor: 'text-slate-400',
        icon: 'help_outline'
      };
    }

    const cellValRaw = collab.scale && collab.scale[day] !== undefined ? collab.scale[day] : '-';
    const cellVal = (cellValRaw === '-') ? (collab.shift || '-') : cellValRaw;
    const upperCode = cellVal.toUpperCase().trim();

    // Verifica siglas de afastamento ou folga oficiais
    const isFolgaCode = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X'].includes(upperCode);
    const isLicencaCode = ['LM', 'LMT', 'LA'].includes(upperCode);

    if (isFolgaCode || upperCode === 'X') {
      return {
        status: 'folga',
        label: upperCode,
        subLabel: 'Folga Escalonada',
        hours: 'Descanso Oficial',
        color: this.isLightTheme() ? 'bg-emerald-50/80' : 'bg-emerald-950/25',
        borderColor: 'border-emerald-500/80',
        textColor: 'text-emerald-400',
        icon: 'nights_stay'
      };
    } else if (isLicencaCode) {
      return {
        status: 'licenca',
        label: upperCode,
        subLabel: 'Afastamento Médico',
        hours: 'Afastado',
        color: this.isLightTheme() ? 'bg-rose-50' : 'bg-rose-950/20',
        borderColor: 'border-rose-500/60',
        textColor: 'text-rose-400',
        icon: 'medical_services'
      };
    }

    // Retorna dia letivo / de trabalho normal
    return {
      status: 'trabalho',
      label: upperCode,
      subLabel: 'Dia de Trabalho',
      hours: 'Escala Normal',
      color: this.isLightTheme() ? 'bg-slate-50' : 'bg-[#071426]/30',
      borderColor: this.isLightTheme() ? 'border-slate-200' : 'border-[#10213b]',
      textColor: this.isLightTheme() ? 'text-slate-700' : 'text-slate-300',
      icon: 'work'
    };
  }

  /**
   * Retorna as classes CSS do Tailwind de forma dinâmica para renderizar os cards do calendário (estático/apenas representativo).
   */
  getCollaboratorCalendarDayStaticClass(collab: any, day: number, count: number): string {
    const base = 'p-1.5 sm:p-3 border rounded-lg sm:rounded-xl flex flex-col justify-between gap-1 sm:gap-1.5 min-h-[54px] sm:min-h-[96px] w-full text-left shadow-sm duration-200 select-none relative overflow-hidden cursor-default';
    
    if (!collab) {
      return `${base} bg-slate-900/30 border-slate-800 text-slate-500`;
    }

    if (this.isToday(day)) {
      if (this.isLightTheme()) {
        return `${base} bg-emerald-100/95 border-emerald-600 border-2 text-emerald-950 shadow-[0_4px_16px_rgba(16,185,129,0.3)] z-10`;
      } else {
        return `${base} bg-[#032e18] border-emerald-400 border-2 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.55),_inset_0_0_10px_rgba(16,185,129,0.3)] z-10`;
      }
    }

    const cellValRaw = collab.scale && collab.scale[day] !== undefined ? collab.scale[day] : '-';
    const cellVal = (cellValRaw === '-') ? (collab.shift || '-') : cellValRaw;
    const upperCode = cellVal.toUpperCase().trim();

    const isFolga = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X'].includes(upperCode);
    const isAbsence = ['LM', 'LMT', 'LA'].includes(upperCode);

    if (isFolga) {
      if (this.isLightTheme()) {
        return `${base} bg-emerald-50/80 border-emerald-400 text-emerald-800 shadow-emerald-100/50`;
      } else {
        return `${base} bg-gradient-to-br from-emerald-950/20 to-[#030a14] border-emerald-500/50 text-emerald-200 shadow-emerald-950/10`;
      }
    } else if (isAbsence) {
      if (this.isLightTheme()) {
        return `${base} bg-rose-50 border-rose-300 text-rose-800`;
      } else {
        return `${base} bg-gradient-to-br from-red-950/20 to-[#030a14] border-rose-500/40 text-rose-200`;
      }
    } else {
      if (this.isLightTheme()) {
        return `${base} bg-white border-slate-200 text-slate-700`;
      } else {
        return `${base} bg-[#041021]/80 border-[#10213b] text-slate-300`;
      }
    }
  }

  /**
   * Retorna as classes CSS do Tailwind de forma dinâmica para renderizar os cards do calendário.
   */
  getCollaboratorCalendarDayClass(collab: any, day: number, count: number): string {
    const base = 'p-1.5 sm:p-3 border rounded-lg sm:rounded-xl flex flex-col justify-between gap-1 sm:gap-1.5 transition-all cursor-pointer min-h-[54px] sm:min-h-[96px] w-full text-left shadow-sm hover:scale-[1.02] hover:shadow-md duration-200 outline-none select-none relative overflow-hidden';
    
    if (!collab) {
      return `${base} bg-slate-900/30 border-slate-800 text-slate-500`;
    }

    const cellValRaw = collab.scale && collab.scale[day] !== undefined ? collab.scale[day] : '-';
    const cellVal = (cellValRaw === '-') ? (collab.shift || '-') : cellValRaw;
    const upperCode = cellVal.toUpperCase().trim();

    const isFolga = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X'].includes(upperCode);
    const isAbsence = ['LM', 'LMT', 'LA'].includes(upperCode);

    if (isFolga) {
      if (this.isLightTheme()) {
        return `${base} bg-emerald-50/80 border-emerald-400 hover:border-emerald-500 text-emerald-800 shadow-emerald-100/50`;
      } else {
        return `${base} bg-gradient-to-br from-emerald-950/20 to-[#030a14] border-emerald-500/50 hover:border-emerald-400 text-emerald-200 shadow-emerald-950/10`;
      }
    } else if (isAbsence) {
      if (this.isLightTheme()) {
        return `${base} bg-rose-50 border-rose-300 hover:border-rose-500 text-rose-800`;
      } else {
        return `${base} bg-gradient-to-br from-red-950/20 to-[#030a14] border-rose-500/40 hover:border-rose-400 text-rose-200`;
      }
    } else {
      if (this.isLightTheme()) {
        return `${base} bg-white border-slate-200 hover:border-slate-400 text-slate-700`;
      } else {
        return `${base} bg-[#041021]/80 border-[#10213b] hover:border-slate-500 text-slate-300`;
      }
    }
  }

  requestPortalFolgaDay(day: number) {
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    this.requestPortalFolga(dateStr);
  }

  removePortalFolgaDay(day: number) {
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    this.removePortalFolga(dateStr);
  }

  isChosenByCollab(collab: Collaborator, day: number): boolean {
    if (!collab || !collab.folgaRequests) return false;
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return collab.folgaRequests.some(r => r.date === dateStr);
  }

  isPreSelectedByCollab(collab: Collaborator, day: number): boolean {
    if (!collab || !collab.folgaRequests) return false;
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return collab.folgaRequests.some(r => r.date === dateStr && r.isPreSelected);
  }

  requestCollabFolgaDay(collab: Collaborator, day: number) {
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const result = this.scaleService.requestFolga(collab.id, dateStr, this.simulatedDayOfMonth());
    if (!result.success) {
      this.showToast(result.message);
    } else {
      this.showToast(`Folga adicionada para ${collab.name}!`);
      this.folgaModalSelectedDay.set(null);
    }
  }

  removeCollabFolgaDay(collab: Collaborator, day: number) {
    const dateStr = `${this.currentYear()}-${String(this.selectedMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const result = this.scaleService.removeFolga(collab.id, dateStr, this.simulatedDayOfMonth());
    if (!result.success) {
      this.showToast(result.message);
    } else {
      this.showToast(`Folga removida para ${collab.name}!`);
      this.folgaModalSelectedDay.set(null);
    }
  }

  requestCollabFolgaDayForNextMonth(collab: Collaborator, day: number) {
    const dateStr = `${this.getNextMonthYear()}-${String(this.getNextMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const result = this.scaleService.requestFolga(collab.id, dateStr, this.simulatedDayOfMonth());
    if (!result.success) {
      this.showToast(result.message);
    } else {
      this.showToast('Folga solicitada com sucesso!');
      this.folgaModalSelectedDay.set(null);
    }
  }

  removeCollabFolgaDayFromNextMonth(collab: Collaborator, day: number) {
    const dateStr = `${this.getNextMonthYear()}-${String(this.getNextMonthIndex() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const result = this.scaleService.removeFolga(collab.id, dateStr, this.simulatedDayOfMonth());
    if (!result.success) {
      this.showToast(result.message);
    } else {
      this.showToast('Solicitação cancelada.');
      this.folgaModalSelectedDay.set(null);
    }
  }

  assignPortalCollabShift(collabId: string, shiftCode: string) {
    if (!collabId || !shiftCode) {
      this.showToast('Erro: Selecione um novo turno.');
      return;
    }

    const collab = this.scaleService.collaborators().find(c => c.id === collabId);
    const shiftType = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === shiftCode);

    if (!collab || !shiftType) {
      this.showToast('Erro: Seleção de turno inválida.');
      return;
    }

    const oldShiftCode = collab.shift;
    if (oldShiftCode === shiftCode) {
      this.showToast(`O colaborador já está alocado no turno "${shiftCode}".`);
      return;
    }

    const updatedScale = { ...collab.scale };
    for (let day = 1; day <= 30; day++) {
      if (updatedScale[day] === oldShiftCode) {
        updatedScale[day] = shiftCode;
      }
    }
    const updatedCollab = {
      ...collab,
      shift: shiftCode,
      hours: shiftType.hours,
      scale: updatedScale
    };

    this.scaleService.updateCollaborator(updatedCollab);
    this.showToast(`Turno de ${collab.name} atualizado com sucesso para "${shiftType.label}"!`);

    this.scaleService.addAuditHistory(
      'ALOCACAO_TURNO',
      `Turno de ${collab.name} alterado de "${oldShiftCode}" para "${shiftCode}" (${shiftType.hours}) via Portal.`
    );
  }

  // Simulated Portal Collaborator Info
  getLoggedCollab(): Collaborator | null {
    const id = this.selectedSimulatedCollabId();
    if (id) {
      const found = this.scaleService.collaborators().find(c => c.id === id);
      if (found) return found;
    }

    // Fallback auto-login in development/preview environments to NEVER request login/password
    const isDevelopment = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname.includes('127.0.0.1') ||
      window.location.hostname.includes('ais-dev') ||
      window.location.hostname.includes('aistudio') ||
      window.location.hostname.includes('googleusercontent') ||
      window.location.hostname.includes('cloudshell') ||
      window.location.hostname.includes('web-preview') ||
      window.location.hostname.includes('run.app') || // Always treat run.app preview environments as dev for convenience
      (window.self !== window.top) // If inside an iframe (AI Studio preview iframe)
    );

    if (isDevelopment) {
      const collabs = this.scaleService.collaborators();
      if (collabs.length > 0) {
        const devCollab = collabs.find(c => this.isAdmin(c)) || collabs[0];
        if (devCollab) {
          setTimeout(() => {
            if (!this.selectedSimulatedCollabId()) {
              this.selectedSimulatedCollabId.set(devCollab.id);
              this.scaleService.selectedCollabName.set(devCollab.name);
              this.scaleService.currentRole.set(devCollab.role);
            }
          }, 0);
          return devCollab;
        }
      }
    }

    return null;
  }

  // Shift swaps / Permutas logic
  openPermutaModal(day: number) {
    this.permutaSelectedDay.set(day);
    this.permutaTargetCollabId.set('');
    this.permutaStatusMessage.set('');
    this.isPermutaModalOpen.set(true);
  }

  // Colleagues matching same day sector but maybe different shift
  getPermutaCandidates(): Collaborator[] {
    const current = this.getLoggedCollab();
    if (!current) return [];
    return this.scaleService.collaborators().filter(c => c.id !== current.id && c.sector === current.sector);
  }

  requestPermuta() {
    const current = this.getLoggedCollab();
    const targetId = this.permutaTargetCollabId();
    const day = this.permutaSelectedDay();

    if (!current || !targetId) {
      this.permutaStatusMessage.set('Selecione um colega para permuta.');
      return;
    }

    const target = this.scaleService.collaborators().find(c => c.id === targetId);
    if (!target) return;

    const currentShiftRaw = current.scale[day] || '-';
    const currentShift = (currentShiftRaw === '-') ? this.getShiftCode(current.shift) : currentShiftRaw;

    const targetShiftRaw = target.scale[day] || '-';
    const targetShift = (targetShiftRaw === '-') ? this.getShiftCode(target.shift) : targetShiftRaw;

    if (currentShift === targetShift) {
      this.permutaStatusMessage.set('Erro: Vocês já possuem a mesma escala neste dia.');
      return;
    }

    const updatedCurrent = { ...current, scale: { ...current.scale, [day]: targetShift } };
    const updatedTarget = { ...target, scale: { ...target.scale, [day]: currentShift } };

    this.scaleService.updateCollaborator(updatedCurrent);
    this.scaleService.updateCollaborator(updatedTarget);
    this.isPermutaModalOpen.set(false);
    this.showToast(`Permuta realizada! Você assumiu o turno "${targetShift}" e ${target.name} assumiu "${currentShift}".`);

    // Add audit logs & notification
    this.scaleService.addAuditHistory(
      'PERMUTA_TURNO',
      `Permuta de escala no dia ${day}/06: ${current.name} (${currentShift} ⇄ ${targetShift}) com ${target.name}.`
    );

    const newNotif: AppNotification = {
      id: 'n_permuta_' + Math.random().toString(36).substring(2, 6),
      type: 'trade',
      message: `Permuta concluída: ${current.name} trocou o dia ${day} com ${target.name}.`,
      timestamp: 'Agora mesmo',
      read: false
    };
    this.notifications.set([newNotif, ...this.notifications()]);
  }

  // Simulated peer workers on same shift & day
  getConcomitantColegues(day: number): Collaborator[] {
    const current = this.getLoggedCollab();
    if (!current) return [];
    
    const currentShiftRaw = current.scale[day] || '-';
    let currentShift = (currentShiftRaw === '-') ? this.getShiftCode(current.shift) : currentShiftRaw;
    if (this.isSiglaAbsence(currentShift)) {
      currentShift = this.getShiftCode(current.shift);
    }

    return this.scaleService.collaborators().filter(c => {
      if (c.id === current.id) return false;
      if (c.sector !== current.sector) return false;
      const cShiftRaw = c.scale[day] || '-';
      const cShift = (cShiftRaw === '-') ? this.getShiftCode(c.shift) : cShiftRaw;
      return cShift === currentShift;
    });
  }

  openDbConfigModal() {
    this.isDbModalOpen.set(true);
  }

  openSolicitarFolgaModal() {
    this.isSolicitarFolgaModalOpen.set(true);
  }

  // Gemini IA Image Scaling Import Simulation
  openImportModal() {
    this.isImportModalOpen.set(true);
    this.importingState.set('idle');
    this.scannedTextResult.set('');
    this.scannedDataParsed.set([]);
    this.unrecognizedCodes.set([]);
  }

  async triggerAIScan(event: any) {
    const file = event.target?.files?.[0];
    if (!file) return;

    this.importingState.set('processing');
    this.showToast('IA lendo o arquivo de escala...');

    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const text = e.target?.result as string || '';
      const parsed: any[] = [];
      const lines = text.split('\n');
      const rawLines: string[] = [];
      
      const collabs = this.scaleService.collaborators();
      const validSiglas = new Set(this.scaleService.siglaTypes().map(s => s.code.toUpperCase()));
      validSiglas.add('X');
      validSiglas.add('-');
      validSiglas.add('F');
      validSiglas.add('LM');
      
      const validShifts = new Set(this.scaleService.shiftTypes().map(s => s.code.toUpperCase()));
      const unrecognizedSet = new Set<string>();

      const isKnown = (token: string): boolean => {
        const u = token.toUpperCase().trim();
        return u === '-' || u === '' || u === '?' || validSiglas.has(u) || validShifts.has(u);
      };
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        rawLines.push(trimmed);

        const lowerLine = trimmed.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        let matchedCollab: Collaborator | null = null;
        for (const collab of collabs) {
          const collabLower = collab.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if (lowerLine.includes(collabLower)) {
            matchedCollab = collab;
            break;
          }
        }
        
        if (!matchedCollab) {
           for (const collab of collabs) {
             const parts = collab.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ');
             if (parts.length >= 2) {
               const first = parts[0];
               const last = parts[parts.length - 1];
               if (lowerLine.includes(first) && lowerLine.includes(last)) {
                 matchedCollab = collab;
                 break;
               }
             }
           }
        }

        if (matchedCollab) {
          const scaleUpdates: { day: number, value: string }[] = [];
          
          if (trimmed.includes('|')) {
             const tokens = trimmed.split('|').map(s => s.trim().toUpperCase());
             // tokens[0] is name info. tokens[1..31] are the days.
             for(let d = 1; d <= 31 && d < tokens.length; d++) {
                let token = tokens[d];
                if (token === '' || token === '-') {
                  token = this.getShiftCode(matchedCollab.shift);
                } else {
                  // Check parts of this token to see if they are unrecognized
                  const parts = token.split(/[\s/,\-]+/).filter((p: string) => p !== '');
                  parts.forEach((p: string) => {
                    const u = p.toUpperCase().trim();
                    const isNum = /^\d+$/.test(u) || /^\d+[:.,hH]\d+$/.test(u);
                    if (u !== '-' && u !== '' && u !== '?' && !isNum && !validSiglas.has(u) && !validShifts.has(u)) {
                      unrecognizedSet.add(u);
                    }
                  });
                }
                scaleUpdates.push({ day: d, value: token });
             }
          } else {
             const tokens = trimmed.split(/[,;\t|\s]+/);
             let day = 1;
             for (let i = 0; i < tokens.length; i++) {
               let token = tokens[i].toUpperCase();
               
               // Allow anything that is a valid sigla, OR any 1-4 letter string if it looks like a symbol, or numeric code
               const isNum = /^\d+$/.test(token) || /^\d+[:.,hH]\d+$/.test(token);
               if (validSiglas.has(token) || isNum || (token.length >= 1 && token.length <= 4 && /^[A-Z0-9\-]+$/.test(token))) {
                  // Only take up to 31 tokens. 
                  // Heuristic: scale values usually come after name.
                  if (day <= 31) {
                    if (token === '' || token === '-') {
                      token = this.getShiftCode(matchedCollab.shift);
                    }
                    const parts = token.split(/[\s/,\-]+/).filter((p: string) => p !== '');
                    parts.forEach((p: string) => {
                      const u = p.toUpperCase().trim();
                      const isPartNum = /^\d+$/.test(u) || /^\d+[:.,hH]\d+$/.test(u);
                      if (u !== '-' && u !== '' && u !== '?' && !isPartNum && !validSiglas.has(u) && !validShifts.has(u)) {
                        unrecognizedSet.add(u);
                      }
                    });
                    scaleUpdates.push({ day, value: token });
                    day++;
                  }
               }
             }
          }
          
          if (scaleUpdates.length > 0) {
            parsed.push({
              collab: matchedCollab,
              updates: scaleUpdates
            });
          }
        }
      });
      
      this.unrecognizedCodes.set(Array.from(unrecognizedSet).sort());
      
      if (parsed.length === 0) {
        const rawLog = `[PROCESSO DE LEITURA]
Arquivo carregado: ${file.name} (${Math.round(file.size / 1024)} KB)

Aviso: Nenhum colaborador cadastrado foi encontrado nas linhas do arquivo.
O leitor requer um arquivo contendo os nomes dos colaboradores já cadastrados no banco de dados e os dados da escala na mesma linha.
Verifique se os nomes no PDF correspondem aos nomes no sistema.`;

        this.scannedTextResult.set(rawLog);
        this.scannedDataParsed.set([]);
        this.showToast('Nenhum colaborador válido encontrado no arquivo.');
      } else {
        const summary = parsed.map(p => `- ${p.collab.name}: ${p.updates.length} dias lidos`).join('\n');
        this.scannedTextResult.set(
          `[LEITURA DINÂMICA CONCLUÍDA]:\nArquivo processado: ${file.name}\nTotal de linhas lidas: ${lines.length}\nColaboradores extraídos: ${parsed.length}\n\nResumo:\n${summary}`
        );
        this.scannedDataParsed.set(parsed);
      }
      
      this.importingState.set('done');
      this.showToast('Escala importada e processada com sucesso!');
    };
    
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      const arrayBufferReader = new FileReader();
      arrayBufferReader.onload = async (e) => {
        try {
          const buffer = e.target?.result as ArrayBuffer;
          const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
          let text = '';
          let dayXs: number[] = [];
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            
            const lineMap = new Map<number, any[]>();
            content.items.forEach((item: any) => {
              if (item.str && item.str.trim() !== '') {
                const y = Math.round(item.transform[5] / 2) * 2;
                if (!lineMap.has(y)) {
                  lineMap.set(y, []);
                }
                lineMap.get(y)!.push(item);
              }
            });

            const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);
            
            sortedYs.forEach(y => {
              const items = lineMap.get(y)!;
              items.sort((a, b) => a.transform[4] - b.transform[4]);
              const strs = items.map(i => i.str.trim()).filter(s => s !== '');
              
              if (strs.includes('1') && strs.includes('15') && strs.includes('31')) {
                 let currentDay = 1;
                 const tempXs: number[] = [];
                 for(let i=0; i<items.length; i++) {
                    if (items[i].str.trim() === currentDay.toString()) {
                       tempXs[currentDay] = items[i].transform[4];
                       currentDay++;
                    }
                 }
                 if (currentDay > 31) {
                    dayXs = tempXs; 
                 }
              }
            });

            sortedYs.forEach(y => {
              const itemsOnLine = lineMap.get(y)!;
              itemsOnLine.sort((a, b) => a.transform[4] - b.transform[4]);
              
              if (dayXs.length === 32) {
                 const infoItems = itemsOnLine.filter(item => item.transform[4] < dayXs[1] - 10);
                 const infoStr = infoItems.map(i => i.str.trim()).join(' ').trim();
                 
                 if (infoStr.length > 2) {
                    const dayValues: string[] = [];
                    for(let d=1; d<=31; d++) {
                       const targetX = dayXs[d];
                       const itemForDay = itemsOnLine.find(item => Math.abs(item.transform[4] - targetX) < 12);
                       if (itemForDay && itemForDay.str.trim() !== '') {
                         dayValues.push(itemForDay.str.trim());
                       } else {
                         dayValues.push('-');
                       }
                    }
                    text += infoStr + ' | ' + dayValues.join(' | ') + '\n';
                 } else {
                    text += itemsOnLine.map(item => item.str.trim()).join('   ') + '\n';
                 }
              } else {
                 text += itemsOnLine.map(item => item.str.trim()).join('   ') + '\n';
              }
            });
          }
          // Pass the extracted text to the existing reader logic
          reader.onload!({ target: { result: text } } as any);
        } catch (err) {
          console.error('Error reading PDF:', err);
          reader.onload!({ target: { result: '' } } as any);
        }
      };
      arrayBufferReader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain' || file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      setTimeout(() => {
        reader.onload!({ target: { result: '' } } as any);
      }, 1800);
    }
  }

  async commitAIScannedUsers() {
    const parsedData = this.scannedDataParsed();
    if (parsedData.length === 0) return;

    this.showToast(`Atualizando escala para ${parsedData.length} colaboradores...`);

    const registeredSiglas = new Set(this.scaleService.siglaTypes().map(s => s.code.toUpperCase()));
    registeredSiglas.add('X');
    registeredSiglas.add('-');
    registeredSiglas.add('F');
    registeredSiglas.add('LM');
    const registeredShifts = new Set(this.scaleService.shiftTypes().map(s => s.code.toUpperCase()));
    
    // We will collect the updated collabs and bulk save them
    const updatedCollabs = this.scaleService.collaborators().map(collab => {
      const match = parsedData.find(p => p.collab.id === collab.id);
      if (match) {
        const newScale = { ...collab.scale };
        match.updates.forEach((upd: any) => {
          let val = (upd.value || '').toUpperCase().trim();
          if (val === '-' || val === '') {
            val = this.getShiftCode(collab.shift);
          }
          if (val !== '-' && val !== '' && val !== '?') {
            const parts = val.split(/[\s/,\-]+/).filter((p: string) => p !== '');
            const allKnown = parts.every((p: string) => {
              const u = p.trim();
              const isNum = /^\d+$/.test(u) || /^\d+[:.,hH]\d+$/.test(u);
              return u === '-' || u === '' || u === '?' || isNum || registeredSiglas.has(u) || registeredShifts.has(u);
            });
            if (!allKnown) {
              val = '?';
            }
          }
          newScale[upd.day] = val;
        });
        return { ...collab, scale: newScale };
      }
      return collab;
    });

    await this.scaleService.saveUpdatedListToDb(updatedCollabs, 'IMPORTACAO_ESCALA', 'Importação em lote de arquivo da escala.');

    this.isImportModalOpen.set(false);
    this.showToast(`A escala de ${parsedData.length} colaboradores foi atualizada com sucesso!`);
  }

  async registerUnrecognizedCodes() {
    const codes = this.unrecognizedCodes();
    if (codes.length === 0) return;

    this.showToast(`Cadastrando ${codes.length} sigla(s) no dicionário...`);

    const colors = [
      '#ef4444', // Red
      '#ec4899', // Pink
      '#f59e0b', // Amber/Orange
      '#3b82f6', // Blue
      '#8b5cf6', // Violet
      '#06b6d4', // Cyan
      '#14b8a6', // Teal
      '#10b981', // Emerald
      '#a855f7'  // Purple
    ];

    try {
      for (const codeStr of codes) {
        const code = codeStr.toUpperCase().trim();
        // Generate a random pleasant color based on index or code
        let hash = 0;
        for (let j = 0; j < code.length; j++) {
          hash = code.charCodeAt(j) + ((hash << 5) - hash);
        }
        const color = colors[Math.abs(hash) % colors.length];

        const newSigla = {
          code: code,
          label: `Importada (${code})`,
          color: color,
          description: 'Gerada automaticamente via Leitor Inteligente de PDF.',
          textColor: '#ffffff'
        };

        await this.scaleService.saveSiglaType(newSigla);
      }

      this.unrecognizedCodes.set([]); // Clear unrecognized list
      this.showToast('Siglas cadastradas com sucesso! Dicionário de Siglas atualizado.');
    } catch (err: any) {
      console.error('Error auto-registering siglas:', err);
      this.showToast(`Falha ao cadastrar: ${err.message || err}`);
    }
  }

  startEditingCollab(collab: Collaborator) {
    this.editingCollab.set(collab);
    this.newCollabPhotoData.set(collab.photo || null);
    this.isCollabModalOpen.set(true);
    this.isNewSectorMode.set(false);
    this.isNewRoleMode.set(false);
    this.showToast(`Modo Edição: Editando ${collab.name}`);
  }

  cancelEditingCollab() {
    this.editingCollab.set(null);
    this.newCollabPhotoData.set(null);
    this.isCollabModalOpen.set(false);
    this.isNewSectorMode.set(false);
    this.isNewRoleMode.set(false);
  }

  saveEditedCollaborator(
    id: string,
    name: string,
    role: string,
    group: string,
    shift: string,
    sector: string,
    bh: number,
    score: number,
    photo?: string | null,
    birthday?: string,
    sd1Desc?: string, sd1Date?: string,
    sd2Desc?: string, sd2Date?: string,
    sd3Desc?: string, sd3Date?: string,
    sd4Desc?: string, sd4Date?: string,
    sd5Desc?: string, sd5Date?: string,
    isAdmin?: boolean,
    nickname?: string,
    gafesStr?: string
  ) {
    if (!name.trim()) {
      this.showToast('O nome completo do colaborador é obrigatório.');
      return;
    }

    const specialDates: SpecialDate[] = [];
    if (sd1Desc && sd1Date) specialDates.push({ description: sd1Desc, date: sd1Date, priority: 1 });
    if (sd2Desc && sd2Date) specialDates.push({ description: sd2Desc, date: sd2Date, priority: 2 });
    if (sd3Desc && sd3Date) specialDates.push({ description: sd3Desc, date: sd3Date, priority: 3 });
    if (sd4Desc && sd4Date) specialDates.push({ description: sd4Desc, date: sd4Date, priority: 4 });
    if (sd5Desc && sd5Date) specialDates.push({ description: sd5Desc, date: sd5Date, priority: 5 });

    const target = this.scaleService.collaborators().find(c => c.id === id);
    if (!target) {
      this.showToast('Erro: Colaborador não encontrado.');
      return;
    }

    const getShiftCode = (s: string): string => {
      const norm = (s || '').toUpperCase().trim();
      const st = this.scaleService.shiftTypes().find(x => x.code.toUpperCase().trim() === norm || x.label.toUpperCase().trim() === norm);
      return st ? st.code : norm;
    };

    const oldShiftCode = getShiftCode(target.shift);
    const newShiftCode = getShiftCode(shift);
    const shiftType = this.scaleService.shiftTypes().find(s => s.code.trim().toUpperCase() === newShiftCode);
    const newHours = shiftType ? shiftType.hours : (newShiftCode === 'ADM' ? '8h00' : '7h20');

    const updatedScale = { ...target.scale };
    let shiftReallocated = false;

    if (oldShiftCode !== newShiftCode) {
      shiftReallocated = true;
      for (let day = 1; day <= 31; day++) {
        if (updatedScale[day] === oldShiftCode) {
          updatedScale[day] = newShiftCode;
        }
      }
    }

    const parsedGafes = gafesStr ? gafesStr.split('\n').map(g => g.trim()).filter(g => g.length > 0) : [];

    const updatedCollab: Collaborator = {
      ...target,
      name,
      role,
      group,
      shift,
      hours: newHours,
      sector,
      bhBalance: bh,
      score,
      photo: photo || target.photo,
      birthday: birthday || '',
      specialDates,
      scale: updatedScale,
      isAdmin: isAdmin !== undefined ? isAdmin : target.isAdmin,
      nickname: nickname !== undefined ? nickname : target.nickname,
      gafes: gafesStr !== undefined ? parsedGafes : target.gafes
    };

    this.scaleService.updateCollaborator(updatedCollab);

    if (shiftReallocated) {
      this.scaleService.addAuditHistory(
        'ALOCACAO_TURNO',
        `Colaborador ${target.name} reallocado do turno "${target.shift}" para "${shift}" (${newHours}) via atualização cadastral.`
      );
      this.showToast(`Colaborador atualizado e reallocado para o turno "${shift}"!`);
    } else {
      this.showToast('Colaborador atualizado com sucesso!');
    }

    this.cancelEditingCollab();
  }

  public toggleCollabAdmin(collab: Collaborator, isAdmin: boolean) {
    const updatedCollab: Collaborator = {
      ...collab,
      isAdmin
    };
    this.scaleService.updateCollaborator(updatedCollab);
    this.showToast(`Nível de acesso de "${collab.name}" alterado para ${isAdmin ? 'Administrador' : 'Usuário'}.`);
  }

  onCollabPhotoSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 120;
        const MAX_HEIGHT = 120;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          this.newCollabPhotoData.set(dataUrl);
        } else {
          this.newCollabPhotoData.set(e.target.result);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onPortalPhotoSelected(event: Event) {
    this.onProfilePhotoSelectedForCrop(event);
  }

  getAbbreviatedName(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    const first = parts[0];
    const last = parts[parts.length - 1];
    return `${first} ${last[0]}.`;
  }

  getFolgaCountdownState(collab: Collaborator | null | undefined) {
    this.currentTimeString(); // Register reactivity dependency for signals!
    if (!collab) return { showCountdown: false, countdownText: '', isReady: false };

    // Only run if we are looking at the current month and year
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    if (this.selectedMonthIndex() !== currentMonth || this.currentYear() !== currentYear) {
      return { showCountdown: false, countdownText: '', isReady: false };
    }

    const dayToAnalyze = today.getDate();
    const isTodayWork = this.isWorkDay(collab, dayToAnalyze);
    const isTomorrowWork = dayToAnalyze < 31 ? this.isWorkDay(collab, dayToAnalyze + 1) : false;

    // Shift times
    let entryTime = '08:00';
    let exitTime = '17:00';
    
    const hours = collab.hours || '';
    if (hours.includes('-')) {
      const parts = hours.split('-');
      if (parts.length === 2) {
        entryTime = parts[0].trim();
        exitTime = parts[1].trim();
      }
    } else {
      const sCode = (collab.shift || '').trim().toUpperCase();
      const shiftType = this.scaleService.shiftTypes().find(s => 
        s.code.trim().toUpperCase() === sCode || 
        s.label.trim().toUpperCase() === sCode
      );
      if (shiftType && shiftType.startTime && shiftType.endTime) {
        entryTime = shiftType.startTime;
        exitTime = shiftType.endTime;
      } else {
        if (sCode === 'MANHÃ' || sCode === 'M') {
          entryTime = '06:00';
          exitTime = '14:00';
        } else if (sCode === 'TARDE' || sCode === 'T') {
          entryTime = '14:00';
          exitTime = '22:00';
        } else if (sCode === 'MADRUGADA' || sCode === 'NOITE' || sCode === 'N') {
          entryTime = '22:00';
          exitTime = '06:00';
        } else if (sCode === 'ADMINISTRATIVO' || sCode === 'ADM') {
          entryTime = '08:00';
          exitTime = '17:00';
        }
      }
    }

    const [entryHour, entryMin] = entryTime.split(':').map(Number);
    const [exitHour, exitMin] = exitTime.split(':').map(Number);

    const isOvernight = exitHour < entryHour;

    const shiftStart = new Date(today);
    let shiftEnd = new Date(today);

    if (isOvernight) {
      if (today.getHours() >= entryHour) {
        shiftStart.setHours(entryHour, entryMin, 0, 0);
        shiftEnd = new Date(today);
        shiftEnd.setDate(today.getDate() + 1);
        shiftEnd.setHours(exitHour, exitMin, 0, 0);
      } else if (today.getHours() < exitHour) {
        shiftStart.setDate(today.getDate() - 1);
        shiftStart.setHours(entryHour, entryMin, 0, 0);
        shiftEnd.setHours(exitHour, exitMin, 0, 0);
      } else {
        shiftStart.setHours(entryHour, entryMin, 0, 0);
        shiftEnd = new Date(today);
        shiftEnd.setDate(today.getDate() + 1);
        shiftEnd.setHours(exitHour, exitMin, 0, 0);
      }
    } else {
      shiftStart.setHours(entryHour, entryMin, 0, 0);
      shiftEnd.setHours(exitHour, exitMin, 0, 0);
    }

    let onFolga = false;
    let countdownText = '';
    let showCountdown = false;

    if (!isTodayWork) {
      if (isOvernight && today.getHours() < exitHour) {
        showCountdown = true;
        const diffMs = shiftEnd.getTime() - today.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        countdownText = `${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m`;
      } else {
        onFolga = true;
      }
    } else {
      if (!isTomorrowWork) {
        if (today.getTime() < shiftEnd.getTime()) {
          showCountdown = true;
          const diffMs = shiftEnd.getTime() - today.getTime();
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          countdownText = `${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m`;
        } else {
          onFolga = true;
        }
      }
    }

    return {
      showCountdown,
      countdownText,
      isReady: onFolga
    };
  }

  getReturnDay(collab: any): string {
    if (!collab) return '';
    const today = new Date();
    const dayToAnalyze = today.getDate();
    const maxDay = this.daysInMonth().length;
    
    // Find the end of the consecutive off days starting from today
    let endDay = dayToAnalyze;
    while (endDay < maxDay && !this.isWorkDay(collab, endDay + 1)) {
      endDay++;
    }
    
    const returnDay = endDay + 1;
    if (returnDay <= maxDay) {
      return `Dia ${returnDay}`;
    } else {
      return `Dia 1`;
    }
  }

  getReturnDayNumber(collab: any): number {
    if (!collab) return 1;
    const today = new Date();
    const dayToAnalyze = today.getDate();
    const maxDay = this.daysInMonth().length;
    
    let endDay = dayToAnalyze;
    while (endDay < maxDay && !this.isWorkDay(collab, endDay + 1)) {
      endDay++;
    }
    
    const returnDay = endDay + 1;
    return returnDay <= maxDay ? returnDay : 1;
  }

  autoSelectTodayTabForLoggedCollab(logged: Collaborator | null | undefined) {
    if (!logged) return;
    const today = new Date();
    const currentDayNum = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    if (this.selectedMonthIndex() === currentMonth && this.currentYear() === currentYear) {
      const isWork = this.isWorkDay(logged, currentDayNum);
      if (isWork) {
        this.turnVacationTab.set('work');
      } else {
        this.turnVacationTab.set('vacation');
      }
      this.selectedCalendarDay.set(currentDayNum);
    }
  }
}

```

### Arquivo: `src/app/scale.service.ts`

```typescript
import { Injectable, signal, WritableSignal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { initializeFirestore, getFirestore, collection, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';
import { createClient } from '@supabase/supabase-js';
import { supabaseEnv } from './supabase-env';

declare const process: any;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

export interface SpecialDate {
  description: string;
  date: string; // "YYYY-MM-DD" or "MM-DD"
  priority: number; // 1 (inegociável) to 5
}

export interface FolgaRequest {
  date: string; // "YYYY-MM-DD"
  isPreSelected?: boolean;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  hours: string;
  group: string;
  shift: string;
  sector: string;
  bhBalance: number;
  score: number;
  photoUrl?: string;
  phone?: string;
  scale: Record<number, string>; // Day 1 to 30 of June new Date().getFullYear()
  photo?: string;
  birthday?: string; // Format: "YYYY-MM-DD"
  specialDates?: SpecialDate[];
  folgaRequests?: FolgaRequest[];
  password?: string;
  isAdmin?: boolean;
  nickname?: string;
  gafes?: string[];
}

export interface ShiftType {
  code: string;
  label: string;
  hours: string;
  color: string;
  textColor?: string;
  startTime?: string;
  endTime?: string;
  transparentBg?: boolean;
  darkColor?: string;
  darkTextColor?: string;
  darkTransparentBg?: boolean;
}

export interface SiglaType {
  code: string;
  label: string;
  color: string;
  description?: string;
  textColor?: string;
  computaAusencia?: boolean;
  transparentBg?: boolean;
  darkColor?: string;
  darkTextColor?: string;
  darkTransparentBg?: boolean;
}

export interface BackupHistory {
  id: string;
  timestamp: string;
  author: string;
  action: string;
  description: string;
}

// Safe localStorage wrapper to prevent fatal crashes in iframes/WebViews/WAP
function safeGetLocalStorageItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`localStorage.getItem blocked for key ${key}:`, e);
  }
  return null;
}

function safeSetLocalStorageItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn(`localStorage.setItem blocked for key ${key}:`, e);
  }
}

function parsePackedColor(colorString: string, defaultBg: string, defaultFg: string) {
  let bg = defaultBg;
  let fg = defaultFg;
  let transparentBg = false;
  let darkColor = defaultBg;
  let darkTextColor = defaultFg;
  let darkTransparentBg = false;

  const rawColor = colorString || defaultBg;
  if (rawColor.includes('|')) {
    const parts = rawColor.split('|');
    bg = parts[0] || defaultBg;
    fg = parts[1] || defaultFg;
    transparentBg = parts[2] === 'transparent';
    darkColor = parts[3] || bg;
    darkTextColor = parts[4] || fg;
    if (parts[5] === 'transparent') {
      darkTransparentBg = true;
    } else if (parts[3]) {
      darkTransparentBg = false;
    } else {
      darkTransparentBg = transparentBg;
    }
  } else {
    bg = rawColor;
    darkColor = bg;
    darkTextColor = fg;
    darkTransparentBg = transparentBg;
  }

  return { bg, fg, transparentBg, darkColor, darkTextColor, darkTransparentBg };
}

function packColors(
  color: string,
  textColor: string | undefined,
  transparentBg: boolean,
  darkColor: string | undefined,
  darkTextColor: string | undefined,
  darkTransparentBg: boolean
): string {
  const lightBg = color || '#3b82f6';
  const lightFg = textColor || '#ffffff';
  const lightTrans = transparentBg ? 'transparent' : 'normal';
  const dColor = darkColor || lightBg;
  const dTextColor = darkTextColor || lightFg;
  const dTrans = darkTransparentBg ? 'transparent' : 'normal';

  return `${lightBg}|${lightFg}|${lightTrans}|${dColor}|${dTextColor}|${dTrans}`;
}

@Injectable({
  providedIn: 'root'
})
export class ScaleService {
  // Selected state signals
  selectedCollabName = signal<string | null>(null);
  currentRole = signal<string>('SUPERVISOR');
  selectedSimulatedCollabId = signal<string | null>(safeGetLocalStorageItem('selectedSimulatedCollabId'));

  // Real-time synchronization lists via signals
  _allCollaborators = (() => {
    const s = signal<Collaborator[]>([]);
    const originalSet = s.set.bind(s);
    const originalUpdate = s.update.bind(s);
    
    const normalize = (list: Collaborator[]): Collaborator[] => {
      return list.map(c => {
        return { ...c, sector: c.sector || 'Geral' };
      });
    };

    s.set = (val: Collaborator[]) => originalSet(normalize(val));
    s.update = (fn: (val: Collaborator[]) => Collaborator[]) => originalUpdate((val) => normalize(fn(val)));
    return s;
  })();

  collaborators: WritableSignal<Collaborator[]> = (() => {
    const fn = (() => this._allCollaborators()) as unknown as WritableSignal<Collaborator[]>;
    fn.set = (val: Collaborator[]) => this._allCollaborators.set(val);
    fn.update = (fnUpdate: (val: Collaborator[]) => Collaborator[]) => this._allCollaborators.update(fnUpdate);
    fn.asReadonly = () => this._allCollaborators;
    return fn;
  })();

  setCollaborators(list: Collaborator[]): void {
    this._allCollaborators.set(list);
  }
  shiftTypes = signal<ShiftType[]>([]);
  siglaTypes = signal<SiglaType[]>([]);
  auditHistory = signal<BackupHistory[]>([]);
  isProcessing = signal<boolean>(false);

  // Helper to resolve initial Supabase URL
  private getInitialSupabaseUrl(): string {
    const stored = safeGetLocalStorageItem('supabase_url');
    if (stored && stored !== 'undefined' && stored !== 'null' && stored.trim() !== '') {
      return stored.trim();
    }

    if (supabaseEnv && supabaseEnv.url && supabaseEnv.url.trim() !== '') {
      return supabaseEnv.url.trim();
    }

    const windowUrl = typeof window !== 'undefined' ? ((window as any)['SUPABASE_URL'] || (window as any)['env']?.['SUPABASE_URL']) : null;
    if (windowUrl && typeof windowUrl === 'string' && windowUrl.trim() !== '') {
      safeSetLocalStorageItem('supabase_url', windowUrl.trim());
      return windowUrl.trim();
    }

    const processUrl = typeof process !== 'undefined' ? process?.env?.['SUPABASE_URL'] || process?.env?.['NG_APP_SUPABASE_URL'] : '';
    if (processUrl && typeof processUrl === 'string' && processUrl.trim() !== '') {
      safeSetLocalStorageItem('supabase_url', processUrl.trim());
      return processUrl.trim();
    }

    const importMetaUrl = "" as string;
    if (importMetaUrl && typeof importMetaUrl === 'string' && importMetaUrl.trim() !== '') {
      safeSetLocalStorageItem('supabase_url', importMetaUrl.trim());
      return importMetaUrl.trim();
    }

    return 'https://vefyegxmvjficncbetyp.supabase.co';
  }

  // Helper to resolve initial Supabase Key
  private getInitialSupabaseKey(): string {
    const stored = safeGetLocalStorageItem('supabase_key');
    if (stored && stored !== 'undefined' && stored !== 'null' && stored.trim() !== '') {
      return stored.trim();
    }

    if (supabaseEnv && supabaseEnv.key && supabaseEnv.key.trim() !== '') {
      return supabaseEnv.key.trim();
    }

    const windowKey = typeof window !== 'undefined' ? ((window as any)['SUPABASE_KEY'] || (window as any)['env']?.['SUPABASE_KEY']) : null;
    if (windowKey && typeof windowKey === 'string' && windowKey.trim() !== '') {
      safeSetLocalStorageItem('supabase_key', windowKey.trim());
      return windowKey.trim();
    }

    const processKey = typeof process !== 'undefined' ? process?.env?.['SUPABASE_KEY'] || process?.env?.['NG_APP_SUPABASE_KEY'] : '';
    if (processKey && typeof processKey === 'string' && processKey.trim() !== '') {
      safeSetLocalStorageItem('supabase_key', processKey.trim());
      return processKey.trim();
    }

    const importMetaKey = "" as string;
    if (importMetaKey && typeof importMetaKey === 'string' && importMetaKey.trim() !== '') {
      safeSetLocalStorageItem('supabase_key', importMetaKey.trim());
      return importMetaKey.trim();
    }

    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZnllZ3htdmpmaWNuY2JldHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNjYwMjksImV4cCI6MjA5Nzg0MjAyOX0.ioaZkwS98123Jb2xw2l6vev3FgoLwIVwsitg7pTew7c';
  }

  // Database Connection Configuration
  activeDb = signal<'firebase' | 'supabase'>(
    (safeGetLocalStorageItem('active_db') as 'firebase' | 'supabase') || 'supabase'
  );
  activeMonth = signal<number>(7); // Default is July (7)
  activeYear = signal<number>(new Date().getFullYear()); // Default is new Date().getFullYear()
  supabaseUrl = signal<string>(this.getInitialSupabaseUrl());
  supabaseKey = signal<string>(this.getInitialSupabaseKey());
  databaseError = signal<string | null>(null);

  // Firebase Initialization - Defensive getFirestore to avoid any initialization or undefined databaseId crash
  private app = initializeApp(firebaseConfig);
  private db = (() => {
    try {
      if (firebaseConfig.databaseId) {
        return initializeFirestore(this.app, {
          experimentalForceLongPolling: true
        }, firebaseConfig.databaseId);
      } else {
        return initializeFirestore(this.app, {
          experimentalForceLongPolling: true
        });
      }
    } catch (e) {
      console.warn('Fallback to standard getFirestore:', e);
      return getFirestore(this.app);
    }
  })();

  // Supabase Client Reference
  private supabase: any = null;
  private firebaseUnsubscribes: (() => void)[] = [];

  constructor() {
    this.activeDb.set('supabase');
    safeSetLocalStorageItem('active_db', 'supabase');
    
    if (this.activeDb() === 'firebase') {
      this.initFirebaseSync();
    } else {
      this.initSupabase();
    }
  }

  setDatabaseProvider(provider: 'firebase' | 'supabase') {
    this.activeDb.set(provider);
    safeSetLocalStorageItem('active_db', provider);
    this.databaseError.set(null);
    if (provider === 'supabase') {
      this.clearFirebaseSync();
      this.initSupabase();
    } else {
      this.initFirebaseSync();
    }
  }

  setSupabaseConfig(url: string, key: string) {
    this.supabaseUrl.set(url);
    this.supabaseKey.set(key);
    safeSetLocalStorageItem('supabase_url', url);
    safeSetLocalStorageItem('supabase_key', key);
    this.setDatabaseProvider('supabase');
  }

  initSupabase() {
    const url = this.supabaseUrl();
    const key = this.supabaseKey();
    if (url && key) {
      try {
        this.supabase = createClient(url, key);
        this.databaseError.set(null);
        if (typeof window !== 'undefined') {
          this.syncSupabase();
        }
      } catch (err: any) {
        console.error('Erro ao inicializar Supabase:', err);
        this.databaseError.set(err.message || 'Erro ao inicializar cliente Supabase');
      }
    } else {
      this.supabase = null;
      if (this.activeDb() === 'supabase') {
        this.databaseError.set('URL ou Chave Anon do Supabase não configurados.');
        this.collaborators.set([]);
        this.shiftTypes.set([]);
        this.siglaTypes.set([]);
        this.auditHistory.set([]);
      }
    }
  }

  async fetchAllScaleRows(month: number, year: number): Promise<any[]> {
    if (!this.supabase) return [];
    let allRows: any[] = [];
    let from = 0;
    const step = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await this.supabase
        .from('escala_diaria')
        .select('*')
        .eq('month', month)
        .eq('year', year)
        .range(from, from + step - 1);

      if (error) {
        console.error('Error fetching paginated scale rows:', error?.message || JSON.stringify(error));
        throw error;
      }

      if (data && data.length > 0) {
        allRows = allRows.concat(data);
        if (data.length < step) {
          hasMore = false;
        } else {
          from += step;
        }
      } else {
        hasMore = false;
      }
    }

    return allRows;
  }

  async syncSupabase(): Promise<void> {
    if (!this.supabase) return;
    this.databaseError.set(null);

    try {
      // Fetch from table systems on Supabase (colaboradores, escala_diaria, sigla_types, shift_types, audit_history)
      const queryCollabs = this.supabase.from('colaboradores').select('*');
      const querySiglas = this.supabase.from('sigla_types').select('*');
      const queryShifts = this.supabase.from('shift_types').select('*');
      const queryAudit = this.supabase.from('audit_history').select('*');

      const [collabsResult, siglasResult, shiftsResult, auditResult, escalaData] = await Promise.all([
        queryCollabs,
        querySiglas,
        queryShifts,
        queryAudit,
        this.fetchAllScaleRows(this.activeMonth(), this.activeYear())
      ]);

      if (this.activeDb() !== 'supabase') return;

      const collabsError = collabsResult.error;
      const collabsData = collabsResult.data;

      if (collabsError) {
        console.error('Supabase colaboradores error:', collabsError);
        this.databaseError.set(`Erro ao carregar colaboradores do Supabase: ${collabsError.message}`);
        this.collaborators.set([]);
        return;
      }

      // 1. Sync Siglas
      const siglasError = siglasResult?.error;
      const siglasData = siglasResult?.data;
      if (siglasError) {
        console.error('Supabase sigla_types error:', siglasError);
        this.siglaTypes.set([]);
      } else {
        const parsedSiglas = (siglasData || []).map((s: any) => {
          let desc = s.description || '';
          let computaAusencia = false;
          let transparentBg = false;

          // Parse flags from description prefix in any order
          let hasFlag = true;
          while (hasFlag) {
            if (desc.startsWith('#COMPUTA_AUSENCIA#')) {
              computaAusencia = true;
              desc = desc.substring('#COMPUTA_AUSENCIA#'.length);
            } else if (desc.startsWith('#TRANSPARENT_BG#')) {
              transparentBg = true;
              desc = desc.substring('#TRANSPARENT_BG#'.length);
            } else {
              hasFlag = false;
            }
          }
          
          const unpacked = parsePackedColor(s.color || '', '#64748b', s.textColor || s.textcolor || s.text_color || '#ffffff');

          return {
            code: s.code,
            label: s.label,
            color: unpacked.bg,
            textColor: unpacked.fg,
            transparentBg: unpacked.transparentBg || transparentBg,
            darkColor: unpacked.darkColor,
            darkTextColor: unpacked.darkTextColor,
            darkTransparentBg: unpacked.darkTransparentBg,
            description: desc,
            computaAusencia
          };
        });
        this.siglaTypes.set(parsedSiglas);
      }

      // 2. Sync Shift Types
      const shiftsError = shiftsResult?.error;
      const shiftsData = shiftsResult?.data;
      if (shiftsError) {
        console.error('Supabase shift_types error:', shiftsError);
        this.shiftTypes.set([]);
      } else {
        const parsedShifts = (shiftsData || []).map((s: any) => {
          const unpacked = parsePackedColor(s.color || '', '#3b82f6', s.textColor || s.textcolor || s.text_color || '#ffffff');

          return {
            code: s.code,
            label: s.label,
            hours: s.hours,
            color: unpacked.bg,
            textColor: unpacked.fg,
            transparentBg: unpacked.transparentBg,
            darkColor: unpacked.darkColor,
            darkTextColor: unpacked.darkTextColor,
            darkTransparentBg: unpacked.darkTransparentBg,
            startTime: s.startTime || s.starttime || s.start_time,
            endTime: s.endTime || s.endtime || s.end_time
          };
        });
        this.shiftTypes.set(parsedShifts);
      }

      // 3. Sync Audit History
      const auditError = auditResult?.error;
      const auditData = auditResult?.data;
      if (auditError) {
        console.error('Supabase audit_history error:', auditError);
        this.auditHistory.set([]);
      } else {
        const sortedAudit = [...(auditData || [])];
        sortedAudit.sort((a: any, b: any) => b.timestamp.localeCompare(a.timestamp));
        this.auditHistory.set(sortedAudit);
      }

      // 4. Sync Collaborators & Daily Scales
      if (!collabsData || collabsData.length === 0) {
        this.collaborators.set([]);
      } else {
        // Group scales by collaborator_id
        const scaleMap: Record<string, Record<number, string>> = {};
        if (escalaData) {
          escalaData.forEach((row: any) => {
            if (!scaleMap[row.collaborator_id]) {
              scaleMap[row.collaborator_id] = {};
            }
            scaleMap[row.collaborator_id][row.day] = row.value || 'X';
          });
        }

        // Map database records to Collaborator interface
        const mappedCollabs: Collaborator[] = collabsData.map((row: any) => {
          // Ensure all 31 days are filled
          const scale = scaleMap[row.id] || {};
          for (let d = 1; d <= 31; d++) {
            if (scale[d] === undefined) {
              scale[d] = '-';
            }
          }

          return {
            id: row.id,
            name: row.name || 'Sem Nome',
            role: row.role || 'OPERADOR',
            hours: row.schedule || '7h20',
            group: row.grupo || (
              row.role === 'LIDER' ? 'Líderes' :
              row.sector === 'VIP' ? 'VIP' :
              row.sector === 'TREINAMENTO' ? 'Treinamento' :
              row.shift === 'MANHÃ' ? 'Manhã' :
              row.shift === 'TARDE' ? 'Tarde' :
              row.shift === 'MADRUGADA' || row.shift === 'NOITE' ? 'Noite' :
              row.shift === 'ADMINISTRATIVO' ? 'Administrativo' : 'Corporativo'
            ),
            shift: (row.shift === 'MADRUGADA' ? 'NOITE' : (row.shift || 'NOITE')),
            sector: row.sector || 'Geral',
            bhBalance: row.bh_balance || 0,
            score: row.score || 90,
            scale: scale,
            photoUrl: row.photo_url || row.photo || '',
            photo: row.photo_url || row.photo || '',
            birthday: row.birthday || '',
            specialDates: typeof row['special_dates'] === 'string' ? JSON.parse(row['special_dates']) : (row['special_dates'] || []),
            folgaRequests: typeof row['folga_requests'] === 'string' ? JSON.parse(row['folga_requests']) : (row['folga_requests'] || []),
            password: row.password || '',
            isAdmin: row.is_admin === true || row.is_admin === 'true' || row.is_admin === 1,
            nickname: row.nickname || '',
            gafes: row.gafes ? (Array.isArray(row.gafes) ? row.gafes : (typeof row.gafes === 'string' ? JSON.parse(row.gafes) : [])) : []
          };
        });

        mappedCollabs.sort((a, b) => a.id.localeCompare(b.id));
        console.log('Supabase sync loaded colaboradores count:', mappedCollabs.length);
        this.collaborators.set(mappedCollabs);
      }
    } catch (err: any) {
      console.error('Error syncing Supabase:', err?.message || JSON.stringify(err));
      
      const currentUrl = this.supabaseUrl();
      const currentKey = this.supabaseKey();
      const defaultUrl = supabaseEnv?.url || 'https://vefyegxmvjficncbetyp.supabase.co';
      const defaultKey = supabaseEnv?.key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZnllZ3htdmpmaWNuY2JldHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNjYwMjksImV4cCI6MjA5Nzg0MjAyOX0.ioaZkwS98123Jb2xw2l6vev3FgoLwIVwsitg7pTew7c';

      if (currentUrl !== defaultUrl || currentKey !== defaultKey) {
        console.warn('Supabase sync failed with custom/stored credentials. Performing self-healing rollback to default env credentials...');
        this.supabaseUrl.set(defaultUrl);
        this.supabaseKey.set(defaultKey);
        safeSetLocalStorageItem('supabase_url', defaultUrl);
        safeSetLocalStorageItem('supabase_key', defaultKey);
        try {
          this.supabase = createClient(defaultUrl, defaultKey);
          await this.syncSupabase();
          return;
        } catch (retryErr: any) {
          console.error('Self-healing retry with default credentials also failed:', retryErr);
        }
      }

      if (this.activeDb() === 'supabase') {
        const errMsg = err?.message || err?.details || err?.hint || (typeof err === 'object' ? JSON.stringify(err) : String(err));
        this.databaseError.set(`Erro de conexão com o Supabase: ${errMsg}`);
        this.collaborators.set([]);
        this.shiftTypes.set([]);
        this.siglaTypes.set([]);
        this.auditHistory.set([]);
      }
    }
  }

  private initFirebaseSync() {
    this.clearFirebaseSync();
    if (this.activeDb() !== 'firebase') return;

    // 1. Listen to Collaborators
    const collCollab = collection(this.db, 'collaborators');
    const unsubCollab = onSnapshot(collCollab, (snapshot) => {
      if (this.activeDb() !== 'firebase') return;
      const list: Collaborator[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Collaborator);
      });
      list.sort((a, b) => a.id.localeCompare(b.id));
      this.collaborators.set(list);
    }, (error) => {
      if (this.activeDb() === 'firebase') {
        handleFirestoreError(error, OperationType.GET, 'collaborators');
      }
    });
    this.firebaseUnsubscribes.push(unsubCollab);

    // 2. Listen to Shift Types
    const collShifts = collection(this.db, 'shiftTypes');
    const unsubShifts = onSnapshot(collShifts, (snapshot) => {
      if (this.activeDb() !== 'firebase') return;
      const list: ShiftType[] = [];
      snapshot.forEach((doc) => {
        const s = doc.data() as any;
        const unpacked = parsePackedColor(s.color || '', '#3b82f6', s.textColor || '#ffffff');
        list.push({
          ...s,
          color: unpacked.bg,
          textColor: unpacked.fg,
          transparentBg: unpacked.transparentBg,
          darkColor: unpacked.darkColor,
          darkTextColor: unpacked.darkTextColor,
          darkTransparentBg: unpacked.darkTransparentBg
        });
      });
      this.shiftTypes.set(list);
    }, (error) => {
      if (this.activeDb() === 'firebase') {
        handleFirestoreError(error, OperationType.GET, 'shiftTypes');
      }
    });
    this.firebaseUnsubscribes.push(unsubShifts);

    // 3. Listen to Sigla Types
    const collSiglas = collection(this.db, 'siglaTypes');
    const unsubSiglas = onSnapshot(collSiglas, (snapshot) => {
      if (this.activeDb() !== 'firebase') return;
      const list: SiglaType[] = [];
      snapshot.forEach((doc) => {
        const s = doc.data() as any;
        let desc = s.description || '';
        let computaAusencia = s.computaAusencia || false;
        let transparentBg = s.transparentBg || false;

        // Parse flags from description prefix in any order
        let hasFlag = true;
        while (hasFlag) {
          if (desc.startsWith('#COMPUTA_AUSENCIA#')) {
            computaAusencia = true;
            desc = desc.substring('#COMPUTA_AUSENCIA#'.length);
          } else if (desc.startsWith('#TRANSPARENT_BG#')) {
            transparentBg = true;
            desc = desc.substring('#TRANSPARENT_BG#'.length);
          } else {
            hasFlag = false;
          }
        }

        const unpacked = parsePackedColor(s.color || '', '#64748b', s.textColor || '#ffffff');

        list.push({
          ...s,
          color: unpacked.bg,
          textColor: unpacked.fg,
          transparentBg: unpacked.transparentBg || transparentBg,
          darkColor: unpacked.darkColor,
          darkTextColor: unpacked.darkTextColor,
          darkTransparentBg: unpacked.darkTransparentBg,
          description: desc,
          computaAusencia
        });
      });
      this.siglaTypes.set(list);
    }, (error) => {
      if (this.activeDb() === 'firebase') {
        handleFirestoreError(error, OperationType.GET, 'siglaTypes');
      }
    });
    this.firebaseUnsubscribes.push(unsubSiglas);

    // 4. Listen to Audit History
    const collAudit = collection(this.db, 'auditHistory');
    const unsubAudit = onSnapshot(collAudit, (snapshot) => {
      if (this.activeDb() !== 'firebase') return;
      const list: BackupHistory[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as BackupHistory);
      });
      list.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      this.auditHistory.set(list);
    }, (error) => {
      if (this.activeDb() === 'firebase') {
        handleFirestoreError(error, OperationType.GET, 'auditHistory');
      }
    });
    this.firebaseUnsubscribes.push(unsubAudit);
  }

  private clearFirebaseSync() {
    this.firebaseUnsubscribes.forEach(unsub => {
      try {
        unsub();
      } catch {
        // Ignored
      }
    });
    this.firebaseUnsubscribes = [];
  }

  // Database operations
  getAutoPreSelectedFolgas(collab: Collaborator): FolgaRequest[] {
    const preSelected: FolgaRequest[] = [];
    
    // 1. Check birthday (Active month)
    if (collab.birthday) {
      const parts = collab.birthday.split('-'); // YYYY-MM-DD
      if (parts.length === 3) {
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);
        if (m === this.activeMonth()) {
          preSelected.push({
            date: `${this.activeYear()}-${String(this.activeMonth()).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
            isPreSelected: true
          });
        }
      }
    }
    
    // 2. Check special dates (Active month)
    if (collab.specialDates && Array.isArray(collab.specialDates)) {
      const sorted = [...collab.specialDates].sort((a, b) => a.priority - b.priority);
      for (const sd of sorted) {
        if (!sd.date || (sd.description && sd.description.startsWith('BOB_METADATA:'))) continue;
        const parts = sd.date.split('-');
        if (parts.length === 3) {
          const m = parseInt(parts[1], 10);
          const d = parseInt(parts[2], 10);
          if (m === this.activeMonth()) {
            const dateStr = `${this.activeYear()}-${String(this.activeMonth()).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            if (!preSelected.some(p => p.date === dateStr)) {
              preSelected.push({
                date: dateStr,
                isPreSelected: true
              });
            }
          }
        }
      }
    }
    
    return preSelected.slice(0, 3);
  }

  refreshPreSelectedFolgas(collab: Collaborator, forceApplyToScale = false): Collaborator {
    const preSelected = this.getAutoPreSelectedFolgas(collab);
    const manualRequests = (collab.folgaRequests || []).filter(r => !r.isPreSelected);
    const newList: FolgaRequest[] = [...preSelected];
    
    for (const req of manualRequests) {
      if (newList.length < 3) {
        if (!newList.some(p => p.date === req.date)) {
          newList.push(req);
        }
      }
    }
    
    const updatedScale = { ...collab.scale };
    if (forceApplyToScale) {
      newList.forEach(req => {
        const parts = req.date.split('-');
        if (parts.length === 3) {
          const d = parseInt(parts[2], 10);
          updatedScale[d] = 'X';
        }
      });
    }

    return {
      ...collab,
      folgaRequests: newList,
      scale: updatedScale
    };
  }

  requestFolga(collabId: string, date: string, simulatedDay: number): { success: boolean, message: string } {
    if (simulatedDay > 10) {
      return { success: false, message: 'Escolha indisponível. Solicitações de folga são permitidas apenas do dia 1 ao dia 10 do mês anterior.' };
    }

    const collabs = this.collaborators();
    const targetCollab = collabs.find(c => c.id === collabId);
    if (!targetCollab) {
      return { success: false, message: 'Colaborador não encontrado.' };
    }

    const currentRequests = targetCollab.folgaRequests || [];
    
    if (currentRequests.some(r => r.date === date)) {
      return { success: false, message: 'Você já solicitou folga para este dia.' };
    }

    if (currentRequests.length >= 3) {
      return { success: false, message: 'Limite de 3 folgas mensais atingido.' };
    }

    // Check count of other collabs requesting the same day
    const count = collabs.filter(c => (c.folgaRequests || []).some(r => r.date === date)).length;
    if (count >= 3) {
      return { success: false, message: 'Data indisponível. O limite de 3 colaboradores para esta data já foi atingido.' };
    }

    const updatedRequests = [...currentRequests, { date, isPreSelected: false }];
    let updatedCollab: Collaborator = { ...targetCollab, folgaRequests: updatedRequests };

    const parts = date.split('-');
    if (parts.length === 3) {
      const dayNum = parseInt(parts[2], 10);
      updatedCollab.scale = { ...targetCollab.scale, [dayNum]: 'X' };
    }

    updatedCollab = this.refreshPreSelectedFolgas(updatedCollab);
    this.updateCollaborator(updatedCollab);
    this.addAuditHistory('SOLICITACAO_FOLGA', `Colaborador ${targetCollab.name} solicitou folga para o dia ${date}.`);
    
    return { success: true, message: 'Folga solicitada com sucesso!' };
  }

  removeFolga(collabId: string, date: string, simulatedDay: number): { success: boolean, message: string } {
    if (simulatedDay > 10) {
      return { success: false, message: 'Escolha indisponível. Solicitações de folga são permitidas apenas do dia 1 ao dia 10 do mês anterior.' };
    }

    const collabs = this.collaborators();
    const targetCollab = collabs.find(c => c.id === collabId);
    if (!targetCollab) {
      return { success: false, message: 'Colaborador não encontrado.' };
    }

    const currentRequests = targetCollab.folgaRequests || [];
    const targetRequest = currentRequests.find(r => r.date === date);
    if (!targetRequest) {
      return { success: false, message: 'Solicitação não encontrada.' };
    }

    if (targetRequest.isPreSelected) {
      return { success: false, message: 'Não é possível remover folga pré-selecionada de aniversário ou data magna.' };
    }

    const updatedRequests = currentRequests.filter(r => r.date !== date);
    let updatedCollab: Collaborator = { ...targetCollab, folgaRequests: updatedRequests };

    const parts = date.split('-');
    if (parts.length === 3) {
      const dayNum = parseInt(parts[2], 10);
      updatedCollab.scale = { ...targetCollab.scale, [dayNum]: '-' };
    }

    updatedCollab = this.refreshPreSelectedFolgas(updatedCollab);
    this.updateCollaborator(updatedCollab);
    this.addAuditHistory('SOLICITACAO_FOLGA_REMOVIDA', `Colaborador ${targetCollab.name} removeu folga de ${date}.`);
    
    return { success: true, message: 'Folga removida com sucesso!' };
  }

  async addCollaborator(
    name: string,
    role: string,
    hours: string,
    group: string,
    shift: string,
    sector: string,
    bh: number,
    score: number,
    photo?: string,
    birthday?: string,
    specialDates?: SpecialDate[],
    folgaRequests?: FolgaRequest[],
    isAdmin = false,
    nickname?: string,
    gafes?: string[]
  ) {
    if (!name.trim()) return;
    const id = 'collab_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    
    // Initialize standard scale (5 days work, 2 days off) dynamically for selected month and year
    const initialScale: Record<number, string> = {};
    for (let d = 1; d <= 31; d++) {
      const date = new Date(this.activeYear(), this.activeMonth() - 1, d);
      const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        initialScale[d] = 'X';
      } else {
        initialScale[d] = '-';
      }
    }

    let newCollab: Collaborator = {
      id,
      name,
      role,
      hours,
      group,
      shift,
      sector,
      bhBalance: bh,
      score,
      scale: initialScale,
      photo: photo || undefined,
      birthday: birthday || '',
      specialDates: specialDates || [],
      folgaRequests: folgaRequests || [],
      isAdmin: isAdmin,
      nickname: nickname || '',
      gafes: gafes || []
    };

    newCollab = this.refreshPreSelectedFolgas(newCollab, true);

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const dbRow = {
          id: newCollab.id,
          name: newCollab.name,
          role: newCollab.role,
          schedule: newCollab.hours,
          shift: newCollab.shift,
          sector: newCollab.sector,
          bh_balance: newCollab.bhBalance,
          score: newCollab.score,
          photo_url: newCollab.photoUrl || newCollab.photo || null,
          birthday: newCollab.birthday || null,
          special_dates: newCollab.specialDates || null,
          folga_requests: newCollab.folgaRequests || null,
          password: newCollab.password || null,
          is_admin: newCollab.isAdmin ?? false
        };
        const upRes = await this.supabase.from('colaboradores').upsert(dbRow);
        if (upRes.error) throw upRes.error;

        const scaleRows = [];
        for (let d = 1; d <= 31; d++) {
          scaleRows.push({
            collaborator_id: newCollab.id,
            day: d,
            month: this.activeMonth(),
            year: this.activeYear(),
            value: newCollab.scale[d] || 'X'
          });
        }
        const upScaleRes = await this.supabase.from('escala_diaria').upsert(scaleRows);
        if (upScaleRes.error) throw upScaleRes.error;

        this.syncSupabase();
        this.addAuditHistory('CADASTRO_COLABORADOR', `Colaborador ${name} cadastrado no Supabase.`);
      } catch (err: any) {
        console.error(err);
        this.databaseError.set(`Falha ao salvar no Supabase: ${err.message || err}`);
      }
    } else {
      setDoc(doc(this.db, 'collaborators', id), newCollab).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, `collaborators/${id}`);
      });
      this.addAuditHistory('CADASTRO_COLABORADOR', `Colaborador ${name} cadastrado no Firebase.`);
    }
  }

  async removeCollaborator(id: string) {
    const target = this.collaborators().find(c => c.id === id);
    if (!target) return;

    // Update local state optimistically
    const list = this.collaborators();
    this.collaborators.set(list.filter(c => c.id !== id));

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const delScaleRes = await this.supabase.from('escala_diaria').delete().eq('collaborator_id', id);
        if (delScaleRes.error) throw delScaleRes.error;

        const delCollabRes = await this.supabase.from('colaboradores').delete().eq('id', id);
        if (delCollabRes.error) throw delCollabRes.error;

        this.syncSupabase();
        this.addAuditHistory('REMOCAO_COLABORADOR', `Colaborador ${target.name} removido do Supabase.`);
      } catch (err: any) {
        console.error(err);
        // Rollback on error
        this.collaborators.set(list);
        this.databaseError.set(`Falha ao remover colaborador: ${err.message || err}`);
      }
    } else {
      deleteDoc(doc(this.db, 'collaborators', id))
        .then(() => {
          this.addAuditHistory('REMOCAO_COLABORADOR', `Colaborador ${target.name} removido do Firebase.`);
        })
        .catch((err) => {
          // Rollback on error
          this.collaborators.set(list);
          handleFirestoreError(err, OperationType.DELETE, `collaborators/${id}`);
        });
    }
  }

  async updateCollaborator(col: Collaborator) {
    const refreshedCol = this.refreshPreSelectedFolgas(col);

    // Optimistically update local state to make the UI instant and prevent concurrent click race conditions
    const list = this.collaborators();
    const index = list.findIndex(c => c.id === col.id);
    if (index !== -1) {
      const updated = [...list];
      updated[index] = refreshedCol;
      this.collaborators.set(updated);
    }

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const dbRow = {
          id: refreshedCol.id,
          name: refreshedCol.name,
          role: refreshedCol.role,
          schedule: refreshedCol.hours,
          shift: refreshedCol.shift,
          sector: refreshedCol.sector,
          bh_balance: refreshedCol.bhBalance,
          score: refreshedCol.score,
          photo_url: refreshedCol.photoUrl || refreshedCol.photo || null,
          birthday: refreshedCol.birthday || null,
          special_dates: refreshedCol.specialDates || null,
          folga_requests: refreshedCol.folgaRequests || null,
          password: refreshedCol.password || null,
          is_admin: refreshedCol.isAdmin ?? false
        };
        const upRes = await this.supabase.from('colaboradores').upsert(dbRow);
        if (upRes.error) throw upRes.error;

        // First delete any existing scale rows for this collaborator in this month/year to prevent duplicates
        const { error: delScaleRes } = await this.supabase
          .from('escala_diaria')
          .delete()
          .eq('collaborator_id', refreshedCol.id)
          .eq('month', this.activeMonth())
          .eq('year', this.activeYear());
        if (delScaleRes) throw delScaleRes;

        const scaleRows = [];
        for (let d = 1; d <= 31; d++) {
          scaleRows.push({
            collaborator_id: refreshedCol.id,
            day: d,
            month: this.activeMonth(),
            year: this.activeYear(),
            value: refreshedCol.scale[d] || 'X'
          });
        }
        const upScaleRes = await this.supabase.from('escala_diaria').insert(scaleRows);
        if (upScaleRes.error) throw upScaleRes.error;

        this.syncSupabase();
        this.addAuditHistory('ATUALIZACAO_COLABORADOR', `Dados do colaborador ${refreshedCol.name} atualizados no Supabase.`);
      } catch (err: any) {
        console.error('Error in updateCollaborator:', err);
        this.databaseError.set(`Falha ao atualizar colaborador: ${err.message || err.details || err.hint || JSON.stringify(err)}`);
        // Rollback state on error
        this.syncSupabase();
      }
    } else {
      setDoc(doc(this.db, 'collaborators', refreshedCol.id), refreshedCol)
        .then(() => {
          this.addAuditHistory('ATUALIZACAO_COLABORADOR', `Dados do colaborador ${refreshedCol.name} atualizados no Firebase.`);
        })
        .catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, `collaborators/${refreshedCol.id}`);
        });
    }
  }

  async clearAllScales() {
    const list = this.collaborators();
    if (!list || list.length === 0) return;

    this.isProcessing.set(true);

    const updatedList = list.map(collab => {
      const emptyScale: Record<number, string> = {};
      for (let d = 1; d <= 31; d++) {
        emptyScale[d] = '-';
      }
      return { ...collab, folgaRequests: [], scale: emptyScale };
    });
    this.collaborators.set(updatedList);

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const collabRows: any[] = [];
        
        updatedList.forEach(refreshed => {
          collabRows.push({
            id: refreshed.id,
            name: refreshed.name,
            role: refreshed.role,
            schedule: refreshed.hours,
            shift: refreshed.shift,
            sector: refreshed.sector,
            bh_balance: refreshed.bhBalance,
            score: refreshed.score,
            photo_url: refreshed.photoUrl || refreshed.photo || null,
            birthday: refreshed.birthday || null,
            special_dates: refreshed.specialDates || null,
            folga_requests: [],
            password: refreshed.password || null,
            is_admin: refreshed.isAdmin ?? false
          });
        });

        const COLLAB_CHUNK_SIZE = 100;
        for (let i = 0; i < collabRows.length; i += COLLAB_CHUNK_SIZE) {
          const chunk = collabRows.slice(i, i + COLLAB_CHUNK_SIZE);
          const { error: upErr } = await this.supabase.from('colaboradores').upsert(chunk);
          if (upErr) throw upErr;
        }

        // Delete all existing scale rows for these collaborators first to prevent duplication
        const collabIds = updatedList.map(c => c.id);
        const { error: delScaleRes } = await this.supabase
          .from('escala_diaria')
          .delete()
          .eq('month', this.activeMonth())
          .eq('year', this.activeYear())
          .in('collaborator_id', collabIds);
        if (delScaleRes) throw delScaleRes;

        const scaleRows: any[] = [];
        updatedList.forEach(refreshed => {
          for (let d = 1; d <= 31; d++) {
            scaleRows.push({
              collaborator_id: refreshed.id,
              day: d,
              month: this.activeMonth(),
              year: this.activeYear(),
              value: '-'
            });
          }
        });

        const SCALE_CHUNK_SIZE = 400;
        for (let i = 0; i < scaleRows.length; i += SCALE_CHUNK_SIZE) {
          const chunk = scaleRows.slice(i, i + SCALE_CHUNK_SIZE);
          const { error: scaleErr } = await this.supabase.from('escala_diaria').insert(chunk);
          if (scaleErr) throw scaleErr;
        }

        await this.syncSupabase();
        this.addAuditHistory('LIMPAR_ESCALA', 'Toda a escala mensal de trabalho foi redefinida para Sem Definição (-).');
      } catch (err: any) {
        console.error('Error in clearAllScales:', err);
        this.databaseError.set(`Falha ao limpar escala: ${err.message || err.details || err.hint || JSON.stringify(err)}`);
      } finally {
        this.isProcessing.set(false);
      }
    } else {
      const promises = updatedList.map(refreshed => {
        return setDoc(doc(this.db, 'collaborators', refreshed.id), refreshed);
      });

      Promise.all(promises)
        .then(() => {
          this.addAuditHistory('LIMPAR_ESCALA', 'Toda a escala mensal de trabalho foi redefinida para Sem Definição (-).');
        })
        .catch((err) => {
          console.error('Error clearing scales in Firebase:', err);
        })
        .finally(() => {
          this.isProcessing.set(false);
        });
    }
  }

  async saveUpdatedListToDb(updatedList: Collaborator[], action: string, description: string) {
    this.isProcessing.set(true);
    this.collaborators.set(updatedList);

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const scaleRows: any[] = [];
        const collabRows: any[] = [];
        
        updatedList.forEach(refreshed => {
          for (let d = 1; d <= 31; d++) {
            scaleRows.push({
              collaborator_id: refreshed.id,
              day: d,
              month: this.activeMonth(),
              year: this.activeYear(),
              value: refreshed.scale[d] || '-'
            });
          }
          
          collabRows.push({
            id: refreshed.id,
            name: refreshed.name,
            role: refreshed.role,
            schedule: refreshed.hours,
            shift: refreshed.shift,
            sector: refreshed.sector,
            bh_balance: refreshed.bhBalance,
            score: refreshed.score,
            photo_url: refreshed.photoUrl || refreshed.photo || null,
            birthday: refreshed.birthday || null,
            special_dates: refreshed.specialDates || null,
            folga_requests: refreshed.folgaRequests || null,
            password: refreshed.password || null,
            is_admin: refreshed.isAdmin ?? false
          });
        });

        // 1. Chunked saving of collaborators (100 in each chunk)
        const COLLAB_CHUNK_SIZE = 100;
        for (let i = 0; i < collabRows.length; i += COLLAB_CHUNK_SIZE) {
          const chunk = collabRows.slice(i, i + COLLAB_CHUNK_SIZE);
          const { error: collabErr } = await this.supabase.from('colaboradores').upsert(chunk);
          if (collabErr) throw collabErr;
        }

        // First delete any existing scale rows for these collaborators to avoid duplicates
        const collabIds = updatedList.map(c => c.id);
        const { error: delScaleRes } = await this.supabase
          .from('escala_diaria')
          .delete()
          .eq('month', this.activeMonth())
          .eq('year', this.activeYear())
          .in('collaborator_id', collabIds);
        if (delScaleRes) throw delScaleRes;

        // 2. Chunked saving of scale rows (400 in each chunk)
        const SCALE_CHUNK_SIZE = 400;
        for (let i = 0; i < scaleRows.length; i += SCALE_CHUNK_SIZE) {
          const chunk = scaleRows.slice(i, i + SCALE_CHUNK_SIZE);
          const { error: scaleErr } = await this.supabase.from('escala_diaria').insert(chunk);
          if (scaleErr) throw scaleErr;
        }

        // 3. Robust Verification Algorithm to ensure ALL collaborators are saved in Supabase with retry logic
        let attempts = 0;
        let missingCollabs: Collaborator[] = [];
        let incompleteCollabs: Collaborator[] = [];
        
        while (attempts < 3) {
          const { data: dbCollabs, error: verifyCollabErr } = await this.supabase
            .from('colaboradores')
            .select('id');
          if (verifyCollabErr) throw verifyCollabErr;

          const dbCollabIds = new Set(dbCollabs.map((c: any) => c.id));
          missingCollabs = updatedList.filter(c => !dbCollabIds.has(c.id));

          const dbScales = await this.fetchAllScaleRows(this.activeMonth(), this.activeYear());

          // Group scales by collaborator ID to verify they each have all 31 days
          const scaleCountMap = new Map<string, number>();
          dbScales.forEach((row: any) => {
            scaleCountMap.set(row.collaborator_id, (scaleCountMap.get(row.collaborator_id) || 0) + 1);
          });

          incompleteCollabs = updatedList.filter(c => (scaleCountMap.get(c.id) || 0) < 31);

          if (missingCollabs.length === 0 && incompleteCollabs.length === 0) {
            break; // Success! Verified perfectly
          }

          attempts++;
          if (attempts < 3) {
            // Wait 500ms for Supabase replication index to settle
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }

        if (missingCollabs.length > 0) {
          throw new Error(`Erro de verificação: ${missingCollabs.length} colaboradores não foram gravados no Supabase.`);
        }

        if (incompleteCollabs.length > 0) {
          throw new Error(`Erro de verificação: Escalas incompletas na base de dados para: ${incompleteCollabs.map(c => c.name).join(', ')}`);
        }

        await this.syncSupabase();
        this.addAuditHistory(action, description);
        this.databaseError.set(null); // Clear errors
        
        // Only release loading when successfully complete and completely verified
        this.isProcessing.set(false);
      } catch (err: any) {
        console.error(`Error in saveUpdatedListToDb for ${action}:`, err);
        this.databaseError.set(`Falha ao salvar alterações: ${err.message || err.details || err.hint || JSON.stringify(err)}`);
        // We do NOT set isProcessing to false to keep the screen locked in case of verify failures
      }
    } else {
      // Firebase Integration
      const promises = updatedList.map(refreshed => {
        return setDoc(doc(this.db, 'collaborators', refreshed.id), refreshed);
      });

      Promise.all(promises)
        .then(() => {
          this.addAuditHistory(action, description);
          this.isProcessing.set(false);
        })
        .catch((err) => {
          console.error(`Error saving to Firebase in ${action}:`, err);
        });
    }
  }

  async generateDobradinhas() {
    const list = this.collaborators();
    if (!list || list.length === 0) return;

    const weekends = [
      { sat: 4, sun: 5 },
      { sat: 11, sun: 12 },
      { sat: 18, sun: 19 },
      { sat: 25, sun: 26 }
    ];

    const updatedList = list.map((collab, index) => {
      const updatedScale = { ...collab.scale };
      if (collab.role === 'OPERADOR') {
        // Clear any previous Saturday/Sunday 'X' to generate a clean, single Dobradinha
        for (const w of weekends) {
          if (updatedScale[w.sat] === 'X') updatedScale[w.sat] = '-';
          if (updatedScale[w.sun] === 'X') updatedScale[w.sun] = '-';
        }
        
        const weekend = weekends[index % weekends.length];
        updatedScale[weekend.sat] = 'X';
        updatedScale[weekend.sun] = 'X';
      }
      return { ...collab, scale: updatedScale };
    });

    await this.saveUpdatedListToDb(
      updatedList,
      'GERAR_DOBRADINHAS',
      'Dobradinhas de Sábado e Domingo distribuídas com sucesso para os operadores.'
    );
  }

  async generateSabados() {
    const list = this.collaborators();
    if (!list || list.length === 0) return;

    const allSaturdays = [4, 11, 18, 25];
    const weekends = [
      { sat: 4, sun: 5 },
      { sat: 11, sun: 12 },
      { sat: 18, sun: 19 },
      { sat: 25, sun: 26 }
    ];

    const updatedList = list.map((collab, index) => {
      const updatedScale = { ...collab.scale };
      
      // Clean previously generated single Saturdays (keeping Dobradinhas intact)
      allSaturdays.forEach(sat => {
        const w = weekends.find(wk => wk.sat === sat);
        const isDobr = w && updatedScale[w.sat] === 'X' && updatedScale[w.sun] === 'X';
        if (!isDobr && updatedScale[sat] === 'X') {
          updatedScale[sat] = '-';
        }
      });

      // Avoid weekends that are already Dobradinhas
      const dobradinhaSats = new Set<number>();
      weekends.forEach(w => {
        if (updatedScale[w.sat] === 'X' && updatedScale[w.sun] === 'X') {
          dobradinhaSats.add(w.sat);
        }
      });

      const allowedSats = allSaturdays.filter(sat => {
        if (dobradinhaSats.has(sat)) return false;
        return updatedScale[sat] === '-';
      });
      
      if (allowedSats.length > 0) {
        // Distribute mathematically stable Saturdays using the index offset
        const chosenSat = allowedSats[index % allowedSats.length];
        updatedScale[chosenSat] = 'X';
      }

      return { ...collab, scale: updatedScale };
    });

    await this.saveUpdatedListToDb(
      updatedList,
      'GERAR_SABADOS',
      'Sábados adicionais distribuídos com sucesso, evitando as dobradinhas.'
    );
  }

  async generateDomingos() {
    const list = this.collaborators();
    if (!list || list.length === 0) return;

    const allSundays = [5, 12, 19, 26];
    const weekends = [
      { sat: 4, sun: 5 },
      { sat: 11, sun: 12 },
      { sat: 18, sun: 19 },
      { sat: 25, sun: 26 }
    ];

    const updatedList = list.map((collab, index) => {
      const updatedScale = { ...collab.scale };
      
      // Clean previously generated single Sundays (keeping Dobradinhas intact)
      allSundays.forEach(sun => {
        const w = weekends.find(wk => wk.sun === sun);
        const isDobr = w && updatedScale[w.sat] === 'X' && updatedScale[w.sun] === 'X';
        if (!isDobr && updatedScale[sun] === 'X') {
          updatedScale[sun] = '-';
        }
      });

      // Mathematically select a Sunday that is completely separate and distant from Saturdays off
      const allowedSuns = allSundays.filter(sun => {
        const w = weekends.find(wk => wk.sun === sun);
        if (!w) return false;

        const satVal = updatedScale[w.sat];
        const sunVal = updatedScale[w.sun];

        // 1. Saturday of this weekend cannot be off (to avoid creating any double dobradinha)
        const isSatOff = satVal === 'X' || satVal === 'LP' || satVal === 'F';
        if (isSatOff) return false;

        // 2. Sunday itself cannot already be off
        const isSunOff = sunVal === 'X' || sunVal === 'LP' || sunVal === 'F';
        if (isSunOff) return false;

        return true;
      });
      
      if (allowedSuns.length > 0) {
        // Distribute mathematically stable Sundays using the index offset
        const chosenSun = allowedSuns[index % allowedSuns.length];
        updatedScale[chosenSun] = 'X';
      }

      return { ...collab, scale: updatedScale };
    });

    await this.saveUpdatedListToDb(
      updatedList,
      'GERAR_DOMINGOS',
      'Domingos adicionais distribuídos com sucesso, evitando as dobradinhas.'
    );
  }

  async generateAutoScale() {
    const list = this.collaborators();
    if (!list || list.length === 0) return;

    this.isProcessing.set(true);
    try {
      const weekends = [
        { sat: 4, sun: 5 },
        { sat: 11, sun: 12 },
        { sat: 18, sun: 19 },
        { sat: 25, sun: 26 }
      ];

      // 1. Reset scale and generate Dobradinhas for Operators
      let updatedList = list.map((collab, index) => {
        const updatedScale: Record<number, string> = {};
        for (let d = 1; d <= 31; d++) {
          updatedScale[d] = '-';
        }
        if (collab.role === 'OPERADOR') {
          const weekend = weekends[index % weekends.length];
          updatedScale[weekend.sat] = 'X';
          updatedScale[weekend.sun] = 'X';
        }
        return { ...collab, scale: updatedScale };
      });

      // 2. Generate Saturdays for everyone
      const allSaturdays = [4, 11, 18, 25];
      updatedList = updatedList.map((collab, index) => {
        const updatedScale = { ...collab.scale };
        const dobradinhaSats = new Set<number>();
        weekends.forEach(w => {
          if (updatedScale[w.sat] === 'X' && updatedScale[w.sun] === 'X') {
            dobradinhaSats.add(w.sat);
          }
        });

        const allowedSats = allSaturdays.filter(sat => {
          if (dobradinhaSats.has(sat)) return false;
          return updatedScale[sat] === '-';
        });

        if (allowedSats.length > 0) {
          const chosenSat = allowedSats[index % allowedSats.length];
          updatedScale[chosenSat] = 'X';
        }
        return { ...collab, scale: updatedScale };
      });

      // 3. Generate Sundays for everyone (strictly non-overlapping)
      const allSundays = [5, 12, 19, 26];
      updatedList = updatedList.map((collab, index) => {
        const updatedScale = { ...collab.scale };
        const allowedSuns = allSundays.filter(sun => {
          const w = weekends.find(wk => wk.sun === sun);
          if (!w) return false;
          
          const satVal = updatedScale[w.sat];
          const sunVal = updatedScale[w.sun];

          const isSatOff = satVal === 'X' || satVal === 'LP' || satVal === 'F';
          if (isSatOff) return false;

          const isSunOff = sunVal === 'X' || sunVal === 'LP' || sunVal === 'F';
          if (isSunOff) return false;

          return true;
        });

        if (allowedSuns.length > 0) {
          const chosenSun = allowedSuns[index % allowedSuns.length];
          updatedScale[chosenSun] = 'X';
        }
        return { ...collab, scale: updatedScale };
      });

      // 4. Auto apply birthday and special holiday requests
      updatedList = updatedList.map(collab => {
        return this.refreshPreSelectedFolgas(collab, true);
      });

      await this.saveUpdatedListToDb(
        updatedList,
        'GERAR_AUTO',
        'Escala automatizada inteligente gerada para dobradinhas, sábados e domingos.'
      );
    } finally {
      this.isProcessing.set(false);
    }
  }

  getShiftDetails(code: string, collabShift: string): { hours: number, factor: number } {
    const shiftType = this.shiftTypes().find(s => s.code.trim().toUpperCase() === code);
    
    let hours = 9; // default 9h
    let startTime = '06:00'; // default daytime
    
    if (shiftType) {
      if (shiftType.hours) {
        const hStr = shiftType.hours.toString().toLowerCase().trim();
        if (hStr.includes('h')) {
          const parts = hStr.split('h');
          const hh = parseFloat(parts[0]) || 0;
          const mm = parseFloat(parts[1]) || 0;
          hours = hh + (mm / 60);
        } else {
          hours = parseFloat(hStr) || 9;
        }
      }
      if (shiftType.startTime) {
        startTime = shiftType.startTime;
      } else {
        if (shiftType.code === 'M') startTime = '06:00';
        else if (shiftType.code === 'T') startTime = '14:00';
        else if (shiftType.code === 'N') startTime = '22:00';
        else if (shiftType.code === 'ADM') startTime = '08:00';
      }
    } else {
      const normCode = code.toUpperCase().trim();
      if (normCode === 'M') {
        hours = 9;
        startTime = '06:00';
      } else if (normCode === 'T') {
        hours = 8.8;
        startTime = '14:42';
      } else if (normCode === 'N') {
        hours = 8;
        startTime = '22:00';
      } else if (normCode === 'ADM') {
        hours = 9;
        startTime = '08:00';
      } else {
        const baseShift = (collabShift || '').toUpperCase().trim();
        if (baseShift === 'MANHÃ') {
          hours = 9;
          startTime = '06:00';
        } else if (baseShift === 'TARDE') {
          hours = 8.8;
          startTime = '14:42';
        } else if (baseShift === 'NOITE' || baseShift === 'MADRUGADA') {
          hours = 8;
          startTime = '22:00';
        } else if (baseShift === 'ADMINISTRATIVO' || baseShift === 'ADM') {
          hours = 9;
          startTime = '08:00';
        }
      }
    }
    
    let factor = 1.0;
    const match = startTime.match(/^(\d+):(\d+)/);
    if (match) {
      const hr = parseInt(match[1]);
      if (hr >= 5 && hr <= 13) {
        factor = 1.0;
      } else if (hr >= 14 && hr <= 20) {
        factor = 1.15;
      } else {
        factor = 1.4;
      }
    }
    
    return { hours, factor };
  }

  isSiglaAbsence(val: string): boolean {
    const upper = (val || '').toUpperCase().trim();
    if (!upper || upper === '-' || upper === '?') return false;
    if (upper === 'X' || upper === 'BH' || upper === 'F' || upper === 'LM' || upper === 'CP' || upper === 'AT' || upper === 'W' || upper === 'FO' || upper === 'P' || upper === 'R' || upper === 'EX') {
      return true;
    }
    const sigla = this.siglaTypes().find(s => s.code.toUpperCase().trim() === upper);
    if (sigla && sigla.computaAusencia) {
      return true;
    }
    return false;
  }

  calculateEnergyAndFatigue(collab: Collaborator) {
    const scale = collab.scale || {};
    let energy = 100;
    let consecutiveWorkDays = 0;
    let maxConsecutiveWorkDays = 0;
    let totalHoursWorked = 0;
    let alertaLimite = false;
    const daysCount = 30; // Dynamic days
    
    for (let d = 1; d <= daysCount; d++) {
      const val = (scale[d] || '-').toUpperCase().trim();
      const isRest = this.isSiglaAbsence(val);
      
      if (isRest) {
        consecutiveWorkDays = 0;
        if (val === 'F') {
          energy = 100;
        } else {
          energy = Math.min(100, energy + 50);
        }
      } else {
        consecutiveWorkDays++;
        if (consecutiveWorkDays > maxConsecutiveWorkDays) {
          maxConsecutiveWorkDays = consecutiveWorkDays;
        }
        
        const { hours, factor } = this.getShiftDetails(val, collab.shift);
        totalHoursWorked += hours;
        
        const desgasteDia = (hours / 9) * 20 * factor;
        energy = energy - desgasteDia;
      }
      
      if (consecutiveWorkDays >= 5) {
        alertaLimite = true;
      }
    }
    
    const displayEnergy = Math.max(0, Math.round(energy));
    const isDeficit = energy < 0;
    const deficitValue = isDeficit ? Math.abs(Math.round(energy)) : 0;
    
    let colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    let badgeColor = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    let energyStatus: 'Excelente' | 'Bom' | 'Alerta' | 'Crítico' = 'Excelente';
    
    if (displayEnergy < 30) {
      colorClass = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      badgeColor = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
      energyStatus = 'Crítico';
    } else if (displayEnergy <= 60) {
      colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      badgeColor = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      energyStatus = 'Alerta';
    } else {
      if (displayEnergy >= 85) {
        energyStatus = 'Excelente';
      } else {
        energyStatus = 'Bom';
      }
    }
    
    return {
      energy: displayEnergy,
      energyRaw: energy,
      isDeficit,
      deficitValue,
      consecutiveWorkDays,
      maxConsecutiveWorkDays,
      totalHoursWorked: parseFloat(totalHoursWorked.toFixed(1)),
      alertaLimite,
      colorClass,
      badgeColor,
      energyStatus,
      bankHours: 0
    };
  }

  getDailyEnergyArray(collab: Collaborator): number[] {
    const scale = collab.scale || {};
    let energy = 100;
    const result: number[] = [];
    const daysCount = 30;
    
    for (let d = 1; d <= daysCount; d++) {
      const val = (scale[d] || '-').toUpperCase().trim();
      const isRest = this.isSiglaAbsence(val);
      
      if (isRest) {
        if (val === 'F') {
          energy = 100;
        } else {
          energy = Math.min(100, energy + 50);
        }
      } else {
        const { hours, factor } = this.getShiftDetails(val, collab.shift);
        const desgasteDia = (hours / 9) * 20 * factor;
        energy = energy - desgasteDia;
      }
      result.push(Math.max(0, Math.round(energy)));
    }
    return result;
  }

  ordenarPorAptidao(collabs: Collaborator[]): any[] {
    const collabsWithEnergy = collabs.map(collab => {
      const energyData = this.calculateEnergyAndFatigue(collab);
      
      let lastRestStreak = 0;
      const scale = collab.scale || {};
      for (let d = 30; d >= 1; d--) {
        const val = (scale[d] || '-').toUpperCase().trim();
        const isRest = this.isSiglaAbsence(val);
        if (isRest) {
          lastRestStreak++;
        } else {
          break;
        }
      }
      
      return {
        collab,
        energyData,
        lastRestStreak
      };
    });
    
    collabsWithEnergy.sort((a, b) => {
      if (b.energyData.energy !== a.energyData.energy) {
        return b.energyData.energy - a.energyData.energy;
      }
      if (b.lastRestStreak !== a.lastRestStreak) {
        return b.lastRestStreak - a.lastRestStreak;
      }
      return a.collab.name.localeCompare(b.collab.name);
    });
    
    return collabsWithEnergy;
  }

  async addSiglaType(code: string, label: string, color: string, description: string, textColor?: string, computaAusencia?: boolean, transparentBg?: boolean) {
    if (!code || !label) return;
    const upperCode = code.toUpperCase().trim();
    let finalDesc = description || '';
    if (computaAusencia) {
      finalDesc = '#COMPUTA_AUSENCIA#' + finalDesc;
    }
    if (transparentBg) {
      finalDesc = '#TRANSPARENT_BG#' + finalDesc;
    }
    const finalColor = transparentBg ? `${color}|${textColor || '#ffffff'}|transparent` : color;
    const newSigla: SiglaType = {
      code: upperCode,
      label,
      color: finalColor,
      description: finalDesc,
      ...(textColor ? { textColor } : {}),
      transparentBg
    };

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const payload: any = {
          code: newSigla.code,
          label: newSigla.label,
          color: newSigla.color,
          description: newSigla.description,
          textColor: newSigla.textColor
        };
        const res = await this.supabase.from('sigla_types').upsert(payload);
        if (res.error) {
          const errMsg = res.error.message || '';
          if (errMsg.toLowerCase().includes('textcolor') || res.error.code === 'PGRST204' || res.error.code === '42703') {
            const packedColor = `${color}|${textColor || '#ffffff'}${transparentBg ? '|transparent' : ''}`;
            const fallbackPayload = {
              code: newSigla.code,
              label: newSigla.label,
              color: packedColor,
              description: newSigla.description
            };
            const resFallback = await this.supabase.from('sigla_types').upsert(fallbackPayload);
            if (resFallback.error) throw resFallback.error;
          } else {
            throw res.error;
          }
        }
        this.syncSupabase();
        this.addAuditHistory('CADASTRO_SIGLA', `Nova sigla ${upperCode} cadastrada no Supabase.`);
      } catch (err: any) {
        console.error(err);
      }
    } else {
      setDoc(doc(this.db, 'siglaTypes', upperCode), {
        ...newSigla,
        transparentBg: !!transparentBg
      }).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, `siglaTypes/${upperCode}`);
      });
      this.addAuditHistory('CADASTRO_SIGLA', `Nova sigla ${upperCode} cadastrada no Firebase.`);
    }
  }

  async removeSiglaType(code: string, clearReferences = false) {
    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        if (clearReferences) {
          const updRes = await this.supabase
            .from('escala_diaria')
            .update({ value: '-' })
            .eq('value', code);
          if (updRes.error) throw updRes.error;
        }

        const res = await this.supabase.from('sigla_types').delete().eq('code', code);
        if (res.error) throw res.error;

        this.syncSupabase();
        this.addAuditHistory('REMOCAO_SIGLA', `Sigla ${code} removida do Supabase.`);
      } catch (err: any) {
        console.error(err);
        throw err;
      }
    } else {
      try {
        if (clearReferences) {
          const updatedCollabs = this.collaborators().map(collab => {
            const updatedScale = { ...collab.scale };
            let changed = false;
            for (let d = 1; d <= 31; d++) {
              if (updatedScale[d] === code) {
                updatedScale[d] = '-';
                changed = true;
              }
            }
            return changed ? { ...collab, scale: updatedScale } : collab;
          });
          this.collaborators.set(updatedCollabs);

          const promises = updatedCollabs.map(collab => {
            return setDoc(doc(this.db, 'collaborators', collab.id), collab);
          });
          await Promise.all(promises);
        }

        await deleteDoc(doc(this.db, 'siglaTypes', code));
        this.addAuditHistory('REMOCAO_SIGLA', `Sigla ${code} removida do Firebase.`);
      } catch (err: any) {
        console.error(err);
        throw err;
      }
    }
  }

  async saveSiglaType(sigla: SiglaType) {
    let finalDesc = sigla.description || '';
    if (sigla.computaAusencia) {
      finalDesc = '#COMPUTA_AUSENCIA#' + finalDesc;
    }
    if (sigla.transparentBg) {
      finalDesc = '#TRANSPARENT_BG#' + finalDesc;
    }
    const finalColor = packColors(
      sigla.color,
      sigla.textColor,
      !!sigla.transparentBg,
      sigla.darkColor,
      sigla.darkTextColor,
      !!sigla.darkTransparentBg
    );
    const dbSigla: any = {
      code: sigla.code,
      label: sigla.label,
      color: finalColor,
      description: finalDesc,
      textColor: sigla.textColor
    };

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const res = await this.supabase.from('sigla_types').upsert(dbSigla);
        if (res.error) {
          const errMsg = res.error.message || '';
          if (errMsg.toLowerCase().includes('textcolor') || res.error.code === 'PGRST204' || res.error.code === '42703') {
            const fallbackSigla = {
              code: sigla.code,
              label: sigla.label,
              color: finalColor,
              description: finalDesc
            };
            const resFallback = await this.supabase.from('sigla_types').upsert(fallbackSigla);
            if (resFallback.error) throw resFallback.error;
          } else {
            throw res.error;
          }
        }
        await this.syncSupabase();
        this.addAuditHistory('ATUALIZACAO_SIGLA', `Sigla ${sigla.code} (${sigla.label}) atualizada no Supabase.`);
      } catch (err: any) {
        console.error('Error in saveSiglaType (Supabase):', err);
        throw err;
      }
    } else {
      try {
        await setDoc(doc(this.db, 'siglaTypes', sigla.code), {
          ...dbSigla,
          transparentBg: !!sigla.transparentBg,
          darkColor: sigla.darkColor || null,
          darkTextColor: sigla.darkTextColor || null,
          darkTransparentBg: !!sigla.darkTransparentBg
        });
        this.addAuditHistory('ATUALIZACAO_SIGLA', `Sigla ${sigla.code} (${sigla.label}) atualizada no Firebase.`);
      } catch (err: any) {
        handleFirestoreError(err, OperationType.WRITE, `siglaTypes/${sigla.code}`);
        throw err;
      }
    }
  }

  async updateSiglaTypeCode(oldCode: string, newSigla: SiglaType) {
    const newCode = newSigla.code.toUpperCase().trim();
    let finalDesc = newSigla.description || '';
    if (newSigla.computaAusencia) {
      finalDesc = '#COMPUTA_AUSENCIA#' + finalDesc;
    }
    if (newSigla.transparentBg) {
      finalDesc = '#TRANSPARENT_BG#' + finalDesc;
    }
    const finalColor = packColors(
      newSigla.color,
      newSigla.textColor,
      !!newSigla.transparentBg,
      newSigla.darkColor,
      newSigla.darkTextColor,
      !!newSigla.darkTransparentBg
    );
    const dbSigla: any = {
      code: newSigla.code,
      label: newSigla.label,
      color: finalColor,
      description: finalDesc,
      textColor: newSigla.textColor
    };

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const insRes = await this.supabase.from('sigla_types').insert(dbSigla);
        if (insRes.error) {
          const errMsg = insRes.error.message || '';
          if (errMsg.toLowerCase().includes('textcolor') || insRes.error.code === 'PGRST204' || insRes.error.code === '42703') {
            const fallbackSigla = {
              code: newSigla.code,
              label: newSigla.label,
              color: finalColor,
              description: finalDesc
            };
            const insResFallback = await this.supabase.from('sigla_types').insert(fallbackSigla);
            if (insResFallback.error) throw insResFallback.error;
          } else {
            throw insRes.error;
          }
        }

        const updRes = await this.supabase
          .from('escala_diaria')
          .update({ value: newCode })
          .eq('value', oldCode);
        if (updRes.error) throw updRes.error;

        const delRes = await this.supabase
          .from('sigla_types')
          .delete()
          .eq('code', oldCode);
        if (delRes.error) throw delRes.error;

        const updatedCollabs = this.collaborators().map(collab => {
          const updatedScale = { ...collab.scale };
          let changed = false;
          for (let d = 1; d <= 31; d++) {
            if (updatedScale[d] === oldCode) {
              updatedScale[d] = newCode;
              changed = true;
            }
          }
          return changed ? { ...collab, scale: updatedScale } : collab;
        });
        this.collaborators.set(updatedCollabs);

        await this.syncSupabase();
        this.addAuditHistory('ATUALIZACAO_CODIGO_SIGLA', `Código de sigla ${oldCode} renomeado para ${newCode} no Supabase.`);
      } catch (err: any) {
        console.error('Error renaming sigla code in Supabase:', err);
        throw err;
      }
    } else {
      try {
        await setDoc(doc(this.db, 'siglaTypes', newCode), {
          ...dbSigla,
          transparentBg: !!newSigla.transparentBg,
          darkColor: newSigla.darkColor || null,
          darkTextColor: newSigla.darkTextColor || null,
          darkTransparentBg: !!newSigla.darkTransparentBg
        });

        const updatedCollabs = this.collaborators().map(collab => {
          const updatedScale = { ...collab.scale };
          let changed = false;
          for (let d = 1; d <= 31; d++) {
            if (updatedScale[d] === oldCode) {
              updatedScale[d] = newCode;
              changed = true;
            }
          }
          return changed ? { ...collab, scale: updatedScale } : collab;
        });

        const promises = updatedCollabs.map(collab => {
          return setDoc(doc(this.db, 'collaborators', collab.id), collab);
        });
        await Promise.all(promises);

        await deleteDoc(doc(this.db, 'siglaTypes', oldCode));

        this.collaborators.set(updatedCollabs);
        this.addAuditHistory('ATUALIZACAO_CODIGO_SIGLA', `Código de sigla ${oldCode} renomeado para ${newCode} no Firebase.`);
      } catch (err: any) {
        console.error('Error renaming sigla code in Firebase:', err);
        throw err;
      }
    }
  }

  async saveShiftType(shift: ShiftType) {
    const finalColor = packColors(
      shift.color,
      shift.textColor,
      !!shift.transparentBg,
      shift.darkColor,
      shift.darkTextColor,
      !!shift.darkTransparentBg
    );

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const payload: any = {
          code: shift.code,
          label: shift.label,
          hours: shift.hours,
          color: finalColor,
          textColor: shift.textColor,
          startTime: shift.startTime,
          endTime: shift.endTime
        };
        const res = await this.supabase.from('shift_types').upsert(payload);
        if (res.error) {
          const errMsg = res.error.message || '';
          if (errMsg.toLowerCase().includes('textcolor') || res.error.code === 'PGRST204' || res.error.code === '42703') {
            const fallbackShift = {
              code: shift.code,
              label: shift.label,
              hours: shift.hours,
              color: finalColor,
              startTime: shift.startTime,
              endTime: shift.endTime
            };
            const resFallback = await this.supabase.from('shift_types').upsert(fallbackShift);
            if (resFallback.error) throw resFallback.error;
          } else {
            throw res.error;
          }
        }
        this.syncSupabase();
        this.addAuditHistory('ATUALIZACAO_TURNO', `Turno ${shift.code} (${shift.label}) salvo/atualizado no Supabase.`);
      } catch (err: any) {
        console.error('Error in saveShiftType (Supabase):', err);
      }
    } else {
      setDoc(doc(this.db, 'shiftTypes', shift.code), {
        ...shift,
        color: finalColor
      })
        .then(() => {
          this.addAuditHistory('ATUALIZACAO_TURNO', `Turno ${shift.code} (${shift.label}) salvo/atualizado no Firebase.`);
        })
        .catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, `shiftTypes/${shift.code}`);
        });
    }
  }

  async removeShiftType(code: string) {
    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const res = await this.supabase.from('shift_types').delete().eq('code', code);
        if (res.error) throw res.error;
        this.syncSupabase();
        this.addAuditHistory('REMOCAO_TURNO', `Turno ${code} removido do Supabase.`);
      } catch (err: any) {
        console.error(err);
      }
    } else {
      deleteDoc(doc(this.db, 'shiftTypes', code))
        .then(() => {
          this.addAuditHistory('REMOCAO_TURNO', `Turno ${code} removido do Firebase.`);
        })
        .catch((err) => {
          handleFirestoreError(err, OperationType.DELETE, `shiftTypes/${code}`);
        });
    }
  }

  async addAuditHistory(action: string, description: string) {
    const now = new Date();
    const ts = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const id = 'bk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    const newHistory: BackupHistory = {
      id,
      timestamp: ts,
      author: this.selectedCollabName() || 'ADMINISTRADOR',
      action,
      description
    };

    if (this.activeDb() === 'supabase' && this.supabase) {
      try {
        const res = await this.supabase.from('audit_history').upsert(newHistory);
        if (res.error) throw res.error;
        this.syncSupabase();
      } catch (err: any) {
        console.error(err);
      }
    } else {
      setDoc(doc(this.db, 'auditHistory', id), newHistory).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, `auditHistory/${id}`);
      });
    }
  }

  async getCollaboratorsWorkingOnDate(dateStr: string): Promise<Collaborator[]> {
    try {
      const parts = dateStr.split('-');
      const year = parseInt(parts[0], 10) || 2026;
      const month = parseInt(parts[1], 10) || 7;
      const day = parseInt(parts[2], 10) || 1;

      interface SimpleCollab {
        id: string;
        shift: string;
      }

      if (this.activeDb() === 'supabase' && this.supabase) {
        // Try querying using scale->>day JSONB first as requested by the prompt (for the hypothetical collaborators/colaboradores JSONB column)
        try {
          const offCodes = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X', 'LM', 'LMT', 'LA', 'FJ', 'FO'];
          const { data: testData, error: testErr } = await this.supabase
            .from('colaboradores')
            .select('*')
            .not(`scale->>${day}`, 'in', `(${offCodes.map(c => `"${c}"`).join(',')})`);
          
          if (!testErr && testData && testData.length > 0) {
            const list = this.collaborators();
            const typedData = testData as { id: string }[];
            return list.filter(c => typedData.some((row) => row.id === c.id));
          }
        } catch (jsonbErr) {
          console.warn('JSONB scale column query failed, falling back to standard relational schema:', jsonbErr);
        }

        // Standard relational schema query fallback
        const { data: shiftData } = await this.supabase.from('shift_types').select('code, label');
        const { data: siglaData } = await this.supabase.from('sigla_types').select('code, label');
        const shiftTypes = (shiftData || []) as { code: string; label: string }[];
        const siglaTypes = (siglaData || []) as { code: string; label: string }[];

        const { data: collabsData, error: collabsError } = await this.supabase
          .from('colaboradores')
          .select('*');

        if (collabsError) {
          throw collabsError;
        }

        const { data: escalaData } = await this.supabase
          .from('escala_diaria')
          .select('collaborator_id, value')
          .eq('day', day)
          .eq('month', month)
          .eq('year', year);

        const scaleMap = new Map<string, string>();
        if (escalaData) {
          (escalaData as { collaborator_id: string; value: string }[]).forEach((row) => {
            scaleMap.set(row.collaborator_id, row.value);
          });
        }

        const offCodes = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X', 'LM', 'LMT', 'LA', 'FJ', 'FO'];
        const siglaCodes = siglaTypes.map((s) => (s.code || '').toUpperCase().trim());

        const getShiftCode = (s: string): string => {
          const norm = (s || '').toUpperCase().trim();
          const foundByCode = shiftTypes.find((st) => (st.code || '').toUpperCase().trim() === norm);
          if (foundByCode) return foundByCode.code;

          const foundByLabel = shiftTypes.find((st) => (st.label || '').toUpperCase().trim() === norm);
          if (foundByLabel) return foundByLabel.code;

          if (norm.includes('MANHÃ')) return 'M';
          if (norm.includes('TARDE')) return 'T';
          if (norm.includes('NOITE') || norm.includes('MADRUGADA')) return 'N';
          if (norm.includes('ADMINISTRATIVO') || norm.includes('ADM')) return 'ADM';

          return norm;
        };

        const list = this.collaborators();
        const typedCollabs = (collabsData || []) as SimpleCollab[];
        const workingCollabs = typedCollabs.filter((c) => {
          const rawVal = scaleMap.get(c.id) || '-';
          const resolvedCode = (rawVal === '-') ? getShiftCode(c.shift) : rawVal;
          const upperCode = resolvedCode.toUpperCase().trim();
          const isOff = offCodes.includes(upperCode) || siglaCodes.includes(upperCode);
          return !isOff;
        });

        return list.filter(c => workingCollabs.some((wc) => wc.id === c.id));
      } else {
        // Fallback or Firestore implementation
        const list = this.collaborators();
        const offCodes = ['F', 'FF', 'FE', 'FM', 'FT', 'FN', 'X', 'LM', 'LMT', 'LA', 'FJ', 'FO'];
        const siglaTypes = this.siglaTypes();
        const siglaCodes = siglaTypes.map((s) => (s.code || '').toUpperCase().trim());
        const shiftTypes = this.shiftTypes();

        const getShiftCode = (s: string): string => {
          const norm = (s || '').toUpperCase().trim();
          const foundByCode = shiftTypes.find((st) => (st.code || '').toUpperCase().trim() === norm);
          if (foundByCode) return foundByCode.code;

          const foundByLabel = shiftTypes.find((st) => (st.label || '').toUpperCase().trim() === norm);
          if (foundByLabel) return foundByLabel.code;

          if (norm.includes('MANHÃ')) return 'M';
          if (norm.includes('TARDE')) return 'T';
          if (norm.includes('NOITE') || norm.includes('MADRUGADA')) return 'N';
          if (norm.includes('ADMINISTRATIVO') || norm.includes('ADM')) return 'ADM';

          return norm;
        };

        return list.filter((c) => {
          const rawVal = c.scale[day] || '-';
          const resolvedCode = (rawVal === '-') ? getShiftCode(c.shift) : rawVal;
          const upperCode = resolvedCode.toUpperCase().trim();
          const isOff = offCodes.includes(upperCode) || siglaCodes.includes(upperCode);
          return !isOff;
        });
      }
    } catch (e) {
      console.error('Error in getCollaboratorsWorkingOnDate:', e);
      return [];
    }
  }

}

```

### Arquivo: `src/app/data.ts`

```typescript
export interface Training {
  id?: number;
  title: string;
  completion_date: string;
  expiration_date?: string | null;
  status: 'CONCLUÍDO' | 'EXPIRADO' | 'EM_CURSO';
}

export interface Course {
  id?: number;
  name: string;
  institution: string;
  issue_date: string;
  certificate_code?: string | null;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  schedule: string;
  group: 'Manhã' | 'Tarde' | 'Madrugada' | 'Líderes' | 'Treinamento' | 'VIP';
  shift: 'MANHÃ' | 'TARDE' | 'MADRUGADA' | 'ADMINISTRATIVO' | 'NOITE' | 'TESTE';
  sector: string;
  bhBalance: number;
  score: number;
  importantDates: { label: string; date: string; priority: number }[];
  trainings?: Training[];
  courses?: Course[];
  isAdmin?: boolean;
  birthday?: string;
  phone?: string;
  photoUrl?: string;
  photo?: string;
  scale?: Record<number, string>;
  specialDates?: { description: string; date: string; priority: number }[];
  folgaRequests?: { date: string; isPreSelected?: boolean }[];
}

export interface ShiftCell {
  collaboratorId: string;
  day: number;
  month: number;
  year: number;
  value: string;
}

export interface TradeRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requestedDay: number;
  targetId: string;
  targetName: string;
  targetDay: number;
  status: 'SOLICITADO' | 'COLEGA_ACEITOU' | 'LT_VALIDOU' | 'SUPERVISOR_HOMOLOGADO' | 'REJEITADO';
  timestamp: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

export interface ShiftType {
  code: string;
  label: string;
  color: string;
  discounts: boolean;
  category?: 'FOLGAS' | 'FERIAS' | 'CURSOS_TREINAMENTO' | 'REUNIOES' | 'AFASTAMENTO_SAUDE' | 'AUSENCIA_INJUSTIFICADA' | 'TURNO';
  cannotDelete?: boolean;
  colorName?: string;
  transparentBg?: boolean;
  darkColor?: string;
  darkTextColor?: string;
  darkTransparentBg?: boolean;
}

export function getSiglaColor(code: string, siglaTypes: ShiftType[] = []): string {
  if (!code) return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/50';
  if (code.includes(' ')) return 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 border-blue-300 font-bold';
  const found = siglaTypes.find(s => s.code === code);
  if (found) return found.color;
  if (!isNaN(Number(code))) return 'bg-violet-100 text-violet-800 border-violet-300 font-semibold';
  return 'bg-slate-100 text-slate-700 border-slate-300';
}

export function getSiglaLabel(code: string, siglaTypes: ShiftType[] = []): string {
  if (!code) return 'Trabalho Normal';
  if (code.includes(' ')) return `Histórico Duplo: ${code}`;
  const found = siglaTypes.find(s => s.code === code);
  if (found) return found.label;
  if (!isNaN(Number(code))) return `Troca de horário: Turno ${code}h`;
  return code;
}

export function generateInitialGrid(collaborators: Collaborator[], year = new Date().getFullYear(), month = new Date().getMonth() + 1): ShiftCell[] {
  const g: ShiftCell[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  collaborators.forEach(col => {
    for (let day = 1; day <= daysInMonth; day++) {
      g.push({
        collaboratorId: col.id,
        day,
        month,
        year,
        value: ''
      });
    }
  });
  return g;
}

export function isWeekday(day: number, month = new Date().getMonth() + 1, year = new Date().getFullYear()): boolean {
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek !== 0 && dayOfWeek !== 6; 
}

export function isHoliday(day: number, month = new Date().getMonth() + 1, _year?: number): boolean {
  if (month === 3) {
    const holidays = [6, 25]; 
    return holidays.includes(day);
  }
  return false;
}

export function getHolidayName(day: number, month = new Date().getMonth() + 1, _year?: number): string | null {
  if (month === 3) {
    if (day === 6) return 'Feriado: Data Magna (PE)';
    if (day === 25) return 'Feriado: Data Magna (CE)';
  }
  return null;
}

export function normalizeCellValue(value: string | null | undefined): string {
  return (value || '').trim().toUpperCase();
}

export function isAlternativeWorkHour(value: string | null | undefined): boolean {
  const val = normalizeCellValue(value);
  return ['5', '7', '21'].includes(val);
}

export function isRegularWork(value: string | null | undefined): boolean {
  const val = normalizeCellValue(value);
  return val === '' || val === 'T';
}

export function isActiveCellValue(value: string | null | undefined): boolean {
  const val = normalizeCellValue(value);
  if (val === '' || val === 'T') return true;
  if (['5', '7', '21'].includes(val)) return true;
  return false;
}

export function isFixedAbsenceValue(value: string | null | undefined): boolean {
  const val = normalizeCellValue(value);
  const fixed = ['F', 'AT', 'EX', 'FO', 'CP', 'TA', 'LI', 'W', 'CV'];
  if (fixed.includes(val)) return true;
  if (val.includes(' ')) return true;
  if (['5', '7', '21'].includes(val)) return true;
  return false;
}

export function isRestDayForTarget(value: string | null | undefined): boolean {
  const val = normalizeCellValue(value);
  if (['X', 'F', 'AT', 'FO', 'BH', 'EX'].includes(val)) return true;
  if (val.includes('X') || val.includes('FO') || val.includes('BH') || val.includes('AT') || val.includes('F')) return true;
  return false;
}

export function isWorkDayForFatigue(value: string | null | undefined): boolean {
  return isActiveCellValue(value);
}

export function checkContingentViolation(
  day: number,
  month: number,
  year: number,
  grid: ShiftCell[],
  collaborators: Collaborator[],
  shiftFilter = 'MANHÃ'
): { activeCount: number; required: number; isViolated: boolean } {
  let normalizedFilter = (shiftFilter || 'MANHÃ').toUpperCase();
  if (normalizedFilter === 'MADRUGADA') normalizedFilter = 'NOITE';
  if (normalizedFilter === 'ADMINISTRATIVO') normalizedFilter = 'TESTE';
  
  let targetCollabs = normalizedFilter === 'TODOS'
    ? collaborators
    : collaborators.filter(c => {
        const cShift = c.shift === 'MADRUGADA' ? 'NOITE' : (c.shift === 'ADMINISTRATIVO' ? 'TESTE' : c.shift);
        return cShift === normalizedFilter;
      });
      
  targetCollabs = targetCollabs.filter(c => c.role !== 'LIDER' && c.sector !== 'VIP');
      
  const targetCollabIds = new Set(targetCollabs.map(c => c.id));
  
  let activeCount = 0;
  grid.forEach(cell => {
    if (cell.day === day && cell.month === month && cell.year === year && targetCollabIds.has(cell.collaboratorId)) {
      if (isActiveCellValue(cell.value)) {
        activeCount++;
      }
    }
  });

  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay(); 
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  let required = 0;
  if (normalizedFilter === 'NOITE' || normalizedFilter === 'MADRUGADA') {
    required = (dayOfWeek === 6) ? 5 : 6;
  } else if (normalizedFilter === 'MANHÃ') {
    required = isWeekend ? 18 : 22;
  } else if (normalizedFilter === 'TARDE') {
    required = isWeekend ? 12 : 15;
  } else if (normalizedFilter === 'TESTE' || normalizedFilter === 'ADMINISTRATIVO') {
    required = isWeekend ? 0 : 2;
  } else {
    required = isWeekend ? 35 : 43;
  }
  
  const isViolated = activeCount < required;
  return { activeCount, required, isViolated };
}

```

### Arquivo: `src/app/app.css`

```css
app-root:nth-of-type(1) > div#main_app_layout:nth-of-type(1) > header#global_master_header:nth-of-type(1) > div:nth-of-type(1) {
  width: 205px;
  font-size: 10px;
}
app-root:nth-of-type(1) > div#main_app_layout:nth-of-type(1) > header#global_master_header:nth-of-type(1) > div:nth-of-type(3) {
  /* Using min-width instead of fixed width to avoid layout breaks on desktop, but keeping their intent */
  min-width: 120px;
}
app-root:nth-of-type(1) > div#main_app_layout:nth-of-type(1) > header#global_master_header:nth-of-type(1) {

}
app-root:nth-of-type(1) > div#main_app_layout:nth-of-type(1) > header#global_master_header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > span:nth-of-type(1) {
  font-size: 13px;
}
app-root:nth-of-type(1) > div#main_app_layout:nth-of-type(1) > header#global_master_header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div#database_sync_indicators:nth-of-type(2) > div:nth-of-type(1) {
  font-size: 8px;
}


@media print {
  body, #main_app_layout, app-root {
    display: none !important;
  }
}

```

### Arquivo: `database_schema.sql`

```sql
-- =====================================================================
-- MALHA - JETFUEL MANAGEMENT SYSTEM
-- SCRIPT DE RECRIAÇÃO DO BANCO DE DADOS - SUPABASE / POSTGRESQL
-- =====================================================================

-- Limpeza de tabelas antigas (Garante um recomeço limpo)
DROP TABLE IF EXISTS escala_diaria CASCADE;
DROP TABLE IF EXISTS cursos_certificacoes CASCADE;
DROP TABLE IF EXISTS treinamentos CASCADE;
DROP TABLE IF EXISTS datas_magnas CASCADE;
DROP TABLE IF EXISTS colaboradores CASCADE;

-- 1. Tabela Principal de Colaboradores
-- IDs sequenciais fixos, independentes de turno ou alocação (ex: '001', '002', ..., '082')
CREATE TABLE colaboradores (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('SUPERVISOR', 'LIDER', 'OPERADOR')),
    schedule VARCHAR(50) NOT NULL,
    grupo VARCHAR(50) NOT NULL, -- ex: 'Manhã', 'Tarde', 'Madrugada', 'VIP', 'Líderes'
    shift VARCHAR(50) NOT NULL CHECK (shift IN ('MANHÃ', 'TARDE', 'MADRUGADA', 'ADMINISTRATIVO')),
    sector VARCHAR(50) NOT NULL CHECK (sector IN ('AERÓDROMO', 'VIP', 'TREINAMENTO')),
    bh_balance INT DEFAULT 0,
    score INT DEFAULT 90
);

-- 2. Tabela de Datas Magnas (Eventos Especiais / Aniversários)
-- Vinculado diretamente ao Colaborador via ID imutável
CREATE TABLE datas_magnas (
    id SERIAL PRIMARY KEY,
    collaborator_id VARCHAR(50) NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    label VARCHAR(150) NOT NULL, -- ex: 'Aniversário', 'Casamento', 'Data Especial'
    day INT NOT NULL CHECK (day >= 1 AND day <= 31),
    month INT NOT NULL CHECK (month >= 1 AND month <= 12),
    year INT, -- Se for NULL, indica evento recorrente anual (ideal para Aniversários)!
    priority INT DEFAULT 1 CHECK (priority >= 1 AND priority <= 4), -- 1: Crítica, 2: Alta, 3: Média, 4: Baixa
    icon_type VARCHAR(50) DEFAULT 'star' CHECK (icon_type IN ('cake', 'star'))
);

-- 3. Tabela de Histórico de Treinamentos
-- Vinculado diretamente ao cadastro de cada Colaborador
CREATE TABLE treinamentos (
    id SERIAL PRIMARY KEY,
    collaborator_id VARCHAR(50) NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL, -- ex: 'Abastecimento sob Pressão', 'Segurança de Pátio e Pistas'
    completion_date DATE NOT NULL,
    expiration_date DATE, -- Data de vencimento (se aplicável para reciclagens)
    status VARCHAR(50) DEFAULT 'CONCLUÍDO' CHECK (status IN ('CONCLUÍDO', 'EXPIRADO', 'EM_CURSO'))
);

-- 4. Tabela de Cursos e Certificações Profissionais
-- Vinculado diretamente ao cadastro de cada Colaborador
CREATE TABLE cursos_certificacoes (
    id SERIAL PRIMARY KEY,
    collaborator_id VARCHAR(50) NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL, -- ex: 'Curso de Fatores Humanos', 'Direção Defensiva de Ativos VIP'
    institution VARCHAR(150) NOT NULL DEFAULT 'GOL', -- ex: 'GOL', 'ANAC', 'INFRAERO', 'MALHA ACADEMY'
    issue_date DATE NOT NULL,
    certificate_code VARCHAR(100) -- Código identificador da certificação
);

-- Criar índices para busca rápida por colaborador (Otimização de Performance)
CREATE INDEX idx_datas_magnas_colab ON datas_magnas(collaborator_id);
CREATE INDEX idx_treinamentos_colab ON treinamentos(collaborator_id);
CREATE INDEX idx_cursos_colab ON cursos_certificacoes(collaborator_id);

-- 5. Tabela de Escalas e Turnos Diários (Células da Grade)
-- Guarda em tempo real as folgas e turnos de cada colaborador por dia
CREATE TABLE escala_diaria (
    collaborator_id VARCHAR(50) NOT NULL REFERENCES colaboradores(id) ON DELETE CASCADE,
    day INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL,
    value VARCHAR(50) NOT NULL DEFAULT '', -- ex: 'F' (Folga), 'M' (Manhã), 'T' (Tarde), 'N' (Noite), 'BH', etc.
    PRIMARY KEY (collaborator_id, day, month, year)
);

CREATE INDEX idx_escala_diaria_colab ON escala_diaria(collaborator_id);


-- =====================================================================
-- POPULANDO O INVENTÁRIO COMPLETO DE COLABORADORES (82 ATIVOS)
-- IDs SEQUENCIAIS ESTÁVEIS ('001' a '082')
-- =====================================================================

INSERT INTO colaboradores (id, name, role, schedule, grupo, shift, sector, bh_balance, score) VALUES
-- 05:00 - 14:00 (Manhã / Aeródromo)
('001', 'MICHEL', 'OPERADOR', '05:00 - 14:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('002', 'JOAO', 'OPERADOR', '05:00 - 14:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('003', 'ADAUTO', 'OPERADOR', '05:00 - 14:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('004', 'PAULO', 'OPERADOR', '05:00 - 14:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('005', 'EWERTON', 'OPERADOR', '05:00 - 14:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),

-- 06:00 - 15:00 (Manhã / Aeródromo)
('006', 'ALEX BARBOSA', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('007', 'DOUGLAS', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('008', 'TAVARES', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('009', 'JULIO', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('010', 'SANDRO', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('011', 'CLEBER', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('012', 'JOSE', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('013', 'CALAZANS', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('014', 'SILVA', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('015', 'GUILHERME', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('016', 'ILDO', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('017', 'PETERSON', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('018', 'RENILSON', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('019', 'RAMOS', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('020', 'VAGNER', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('021', 'EVANDRO', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('022', 'BARBOSA', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('023', 'CESAR JC', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('024', 'FLAVIO', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('025', 'CARLOS', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('026', 'BELENTANI', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('027', 'EULES', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('028', 'SOUZA', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('029', 'LUNA', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),
('030', 'HUAN', 'OPERADOR', '06:00 - 15:00', 'Manhã', 'MANHÃ', 'AERÓDROMO', 0, 90),

-- 06:00 - 16:00 (Administrativo)
('031', 'LUIS', 'OPERADOR', '06:00 - 16:00', 'Manhã', 'ADMINISTRATIVO', 'AERÓDROMO', 0, 90),
('032', 'CAIO', 'OPERADOR', '06:00 - 16:00', 'Manhã', 'ADMINISTRATIVO', 'AERÓDROMO', 0, 90),
('033', 'IDENILSON', 'OPERADOR', '06:00 - 16:00', 'Manhã', 'ADMINISTRATIVO', 'AERÓDROMO', 0, 90),

-- 14:42 - 23:30 (Tarde / Aeródromo)
('034', 'RODOLFO', 'OPERADOR', '14:42 - 23:30', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('035', 'LEONARDO', 'OPERADOR', '14:42 - 23:30', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('036', 'GILVAN', 'OPERADOR', '14:42 - 23:30', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('037', 'VIEIRA', 'OPERADOR', '14:42 - 23:30', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('038', 'LUCAS', 'OPERADOR', '14:42 - 23:30', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('039', 'WESLEY', 'OPERADOR', '14:42 - 23:30', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('040', 'PETTINELLI', 'OPERADOR', '14:42 - 23:30', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),

-- 15:15 - 00:00 (Tarde / Aeródromo)
('041', 'FREDISON', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('042', 'ALVES', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('043', 'LEANDRO EUFRA', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('044', 'JOSE EDSON', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('045', 'FEITOSA', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('046', 'LOPES', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('047', 'GIVANI', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('048', 'RENATO', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('049', 'COSTA', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('050', 'MANOEL', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('051', 'RONALD', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('052', 'KLEYSSON', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('053', 'BASTOS', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('054', 'JUNIOR', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('055', 'MILTON', 'OPERADOR', '15:15 - 00:00', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),

-- 16:00 - 00:37 (Tarde / Aeródromo)
('056', 'MARQUES', 'OPERADOR', '16:00 - 00:37', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),
('057', 'LAERCIO', 'OPERADOR', '16:00 - 00:37', 'Tarde', 'TARDE', 'AERÓDROMO', 0, 90),

-- 21:12 - 06:00 (Madrugada / Aeródromo)
('058', 'HORACIO', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', 12, 98),
('059', 'NORMAN', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', -4, 92),
('060', 'RAFAEL', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', 6, 95),
('061', 'DOURADO', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', 0, 89),
('062', 'VENANCIO', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', -8, 90),
('063', 'DIOGO', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', 16, 97),
('064', 'WILLIAN', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', 2, 91),
('065', 'SILVERIO', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', 4, 93),
('066', 'REGIS', 'OPERADOR', '21:12 - 06:00', 'Madrugada', 'MADRUGADA', 'AERÓDROMO', -2, 87),

-- LÍDERES DE TURNO
('067', 'CESARIO', 'LIDER', '06:00 - 15:00', 'Líderes', 'MANHÃ', 'AERÓDROMO', 8, 94),
('068', 'MARTINEZ', 'LIDER', '06:00 - 15:00', 'Líderes', 'MANHÃ', 'AERÓDROMO', 0, 95),
('069', 'PASCHOAL', 'LIDER', '06:00 - 15:00', 'Líderes', 'MANHÃ', 'AERÓDROMO', 0, 95),
('070', 'SPEDINI', 'LIDER', '14:30 - 23:30', 'Líderes', 'TARDE', 'AERÓDROMO', 0, 95),
('071', 'MARCIO', 'LIDER', '14:30 - 23:30', 'Líderes', 'TARDE', 'AERÓDROMO', 0, 95),
('072', 'JONATAN', 'LIDER', '14:30 - 23:30', 'Líderes', 'TARDE', 'AERÓDROMO', 0, 95),
('073', 'PEREIRA', 'LIDER', '21:12 - 06:00', 'Líderes', 'MADRUGADA', 'AERÓDROMO', 0, 99),
('074', 'GUSTAVO', 'LIDER', '21:12 - 06:00', 'Líderes', 'MADRUGADA', 'AERÓDROMO', 2, 96),

-- PÁTIO VIP
('075', 'FERNANDO', 'OPERADOR', '07:00 - 16:00', 'VIP', 'MANHÃ', 'VIP', 0, 91),
('076', 'RENATA', 'OPERADOR', '06:00 - 15:00', 'VIP', 'MANHÃ', 'VIP', 0, 93),
('077', 'ZAGO', 'OPERADOR', '06:00 - 15:00', 'VIP', 'MANHÃ', 'VIP', 0, 93),
('078', 'TORRES', 'OPERADOR', '14:30 - 23:30', 'VIP', 'TARDE', 'VIP', 0, 93),
('079', 'SOLANGE', 'OPERADOR', '14:30 - 23:30', 'VIP', 'TARDE', 'VIP', 0, 93),
('080', 'LOYOLA', 'OPERADOR', '14:30 - 23:30', 'VIP', 'TARDE', 'VIP', 0, 93),
('081', 'NORIVAL', 'OPERADOR', '21:00 - 06:00', 'VIP', 'MADRUGADA', 'VIP', 2, 94),
('082', 'PIRES', 'OPERADOR', '22:00 - 06:00', 'VIP', 'MADRUGADA', 'VIP', 2, 94);


-- =====================================================================
-- SEED DE DATAS MAGNAS / ANIVERSÁRIOS DO CADASTRO DOS COLABORADORES
-- =====================================================================

INSERT INTO datas_magnas (collaborator_id, label, day, month, year, priority, icon_type) VALUES
-- Aniversário do Horácio ('058') em 5 de Março (Recorrente)
('058', 'Aniversário do Horácio', 5, 3, NULL, 1, 'cake'),
-- Aniversário do Michel ('001') em 12 de Outubro (Recorrente)
('001', 'Aniversário do Michel', 12, 10, NULL, 2, 'cake'),
-- Aniversário do Lider Cesario ('067') em 20 de Janeiro (Recorrente)
('067', 'Aniversário do Cesário', 20, 1, NULL, 1, 'cake'),
-- Outra Data Especial para o Norival ('081') do VIP
('081', 'Aniversário do Norival', 14, 7, NULL, 2, 'cake');


-- =====================================================================
-- SEED DE HISTÓRICO DE TREINAMENTOS (CONFORMIDADE OPERACIONAL GOL)
-- =====================================================================

INSERT INTO treinamentos (collaborator_id, title, completion_date, expiration_date, status) VALUES
-- Michel ('001')
('001', 'Abastecimento sob Pressão (Hidrantes e Pátio)', '2025-01-15', '2026-01-15', 'EXPIRADO'),
('001', 'Reciclagem de Abastecimento de Aeronaves B737-8', '2026-02-10', '2027-02-10', 'CONCLUÍDO'),
-- Douglas ('007')
('007', 'Segurança em Área de Manobra de Aeronaves (SAMA)', '2025-11-05', '2026-11-05', 'CONCLUÍDO'),
-- Horacio ('058')
('058', 'Operação Noturna sob Condição Adversa', '2026-01-20', '2027-01-20', 'CONCLUÍDO'),
-- Cesario ('067')
('067', 'Liderança e Gestão de Incidentes de Abastecimento', '2025-08-12', NULL, 'CONCLUÍDO'),
-- Fernando ('075')
('075', 'Procedimentos de Atendimento de Fretamento Executivo VIP', '2026-03-01', '2027-03-01', 'CONCLUÍDO');


-- =====================================================================
-- SEED DE CURSOS E CERTIFICAÇÕES
-- =====================================================================

INSERT INTO cursos_certificacoes (collaborator_id, name, institution, issue_date, certificate_code) VALUES
-- Michel ('001')
('001', 'SGIPA - Sistema de Gestão de Segurança Operacional', 'GOL Linhas Aéreas', '2025-06-20', 'SGIPA-99214-001'),
-- Horacio ('058')
('058', 'AVSEC - Segurança da Aviação Civil contra Atos de Interferência Ilícita', 'ANAC', '2024-10-15', 'AVSEC-ANAC-2810'),
-- Cesario ('067')
('067', 'Curso Avançado de Combate a Incêndio em Aeródromos', 'MALHA ACADEMY', '2025-02-28', 'CI-ACAD-2025-99'),
-- Renata ('076')
('076', 'Direção Defensiva de Caminhões Tanque Abastecedores (CTA)', 'SENAT', '2025-04-10', 'DIRDEF-99120-VIP');


-- =====================================================================
-- HABILITANDO REPLICAÇÃO EM TEMPO REAL (REALTIME) NO SUPABASE
-- Para que as alterações no banco reflitam instantaneamente no app!
-- =====================================================================

alter publication supabase_realtime add table colaboradores;
alter publication supabase_realtime add table datas_magnas;
alter publication supabase_realtime add table treinamentos;
alter publication supabase_realtime add table cursos_certificacoes;
alter publication supabase_realtime add table escala_diaria;


```

### Arquivo: `package.json`

```json
{
  "name": "ai-studio-angular-app",
  "version": "0.0.0",
  "description": "Escala Easy VIBRA - Gestão de escalas de operadores em pátios aeroportuários",
  "scripts": {
    "ng": "ng",
    "start": "npx node inject-env.js && ng serve --host 0.0.0.0 --port 3000 --allowed-hosts",
    "build": "npx node inject-env.js && ng build",
    "watch": "npx node inject-env.js && ng build --watch --configuration development",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/cdk": "^21.0.0",
    "@angular/common": "^21.0.0",
    "@angular/compiler": "^21.0.0",
    "@angular/core": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/material": "^21.0.0",
    "@angular/platform-browser": "^21.0.0",
    "@angular/platform-server": "^21.0.0",
    "@angular/router": "^21.0.0",
    "@angular/ssr": "^21.0.0",
    "@google/genai": "^2.4.0",
    "@supabase/supabase-js": "^2.108.2",
    "express": "^5.1.0",
    "motion": "^12.23.24",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "firebase": "^12.15.0",
    "pdfjs-dist": "^6.1.200"
  },
  "devDependencies": {
    "@angular/build": "^21.0.0",
    "@angular/cli": "^21.0.0",
    "@angular/compiler-cli": "^21.0.0",
    "@tailwindcss/postcss": "^4.1.12",
    "@types/express": "^5.0.1",
    "@types/node": "^20.17.19",
    "angular-eslint": "21.1.0",
    "cross-env": "^10.1.0",
    "eslint": "^9.39.1",
    "jsdom": "^27.0.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.12",
    "typescript": "~5.9.2",
    "typescript-eslint": "8.47.0",
    "vitest": "^4.0.0",
    "wrangler": "^4.103.0"
  }
}

```

### Arquivo: `AGENTS.md`

```md
# Sistema de Gestão de Escala - Escala Easy VIBRA

## Diretrizes de Negócio e Escopo
Este sistema foi projetado e desenvolvido estritamente para a **Gestão de Escala de Trabalho Mensal**.

**DIRETRIZ CRÍTICA:**
- O sistema **NÃO TEM QUALQUER RELAÇÃO** com aviação, aviões, aeronaves, voos, aeroportos ou combustíveis (como JetFuel, Vibra Combustíveis, etc.).
- Não utilize quaisquer termos, metadados, imagens ou recursos relacionados a aviões, combustível, voos ou telemetria aérea.
- Os colaboradores cadastrados representam trabalhadores de escala corporativa padrão (Operadores, Líderes e Supervisores) divididos em turnos (Manhã, Tarde, Noite, Administrativo) e setores de atuação da empresa.
- Todos os IDs de colaboradores devem possuir o prefixo limpo `collab_` (ex: `collab_12345`). É terminantemente proibido o uso de qualquer prefixo de aeronaves ou aviação.

## Estrutura do Banco de Dados (Supabase)
O banco de dados do sistema utiliza as seguintes tabelas em sua estrutura relacional:
1. `colaboradores`: Cadastro e informações pessoais de cada trabalhador.
2. `escala_diaria`: Dias de trabalho e folgas programadas para o mês.
3. `sigla_types`: Tipos de siglas de afastamento e folgas corporativas.
4. `shift_types`: Turnos base configurados para o planejamento.
5. `audit_history`: Registros de auditoria de alterações na escala.

Qualquer alteração ou sugestão de código futura deve respeitar estritamente estas definições.

## Fonte Única de Dados (Single Source of Truth)
* **PROIBIÇÃO DE MOCK/DADOS INVENTADOS:** O aplicativo não deve sob circunstância alguma utilizar listas estáticas de colaboradores, turnos inventados, ou siglas simuladas que estejam fora das tabelas oficiais acima.
* Toda a interface deve ser 100% dinâmica, lendo as siglas, os turnos e os colaboradores cadastrados unicamente a partir do banco de dados relacional.

## Diretrizes de Harmonia Cromática (Círculo Cromático)
* **DIRETRIZ DE DESIGN OBRIGATÓRIA:** É terminantemente proibido usar textos de contraste escuro sujo (como preto ou cinza escuro genéricos) sobre fundos coloridos vibrantes (como verde, esmeralda, âmbar ou vermelho).
* Toda a interface deve seguir estritamente o guia de cores estabelecido em `/DESIGN_CHROMATIC_GUIDELINES.md`. 
* Sempre que um fundo colorido for criado ou modificado (como botões, badges, cabeçalhos, indicações de dia ou status), aplique as regras de harmonia cromática de círculo cromático (ex: `text-white` ou um tom extremamente escuro análogo como `text-emerald-950` sobre fundos esmeralda).



```

### Arquivo: `GEMINI.md`

```md
# Instruções de Escopo e Conduta do Modelo - Escala Easy VIBRA

Estas diretrizes complementam as regras de desenvolvimento do projeto e devem ser lidas obrigatoriamente antes de qualquer tomada de decisão técnica ou visual.

---

## 🚨 REGRA DE OURO (GOLDEN RULE)
**NÃO ALTERE O LAYOUT OU A ESTRUTURA VISUAL SEM PERMISSÃO EXPLÍCITA DO USUÁRIO.**
A estrutura de componentes, designs de tela, classes Tailwind de layout, cores, espaçamento e templates HTML devem ser mantidos idênticos a menos que o usuário solicite explicitamente modificações no visual.

---

## 🧭 DIRETRIZES DE ACORDO COM O ASSUNTO (TRÍADE DE ESCOPO)

### 1. Assunto: PROGRAMAÇÃO (Programming)
*Se o assunto ou solicitação do usuário for sobre lógica, banco de dados, APIs, serviços ou backend:*
- Siga as regras detalhadas de programação em `/AGENT_ROLES.md` (Seção: MODO PROGRAMAÇÃO).
- Modifique apenas arquivos de lógica (`src/app/services/`, controladores TypeScript, regras de API).
- **Proibição:** É terminantemente proibido modificar o layout visual, estilos ou HTML dos componentes.

### 2. Assunto: LAYOUT
*Se o assunto ou solicitação do usuário for estritamente sobre aparência, design, CSS ou Tailwind:*
- Siga as regras em `/AGENT_ROLES.md` (Seção: MODO LAYOUT).
- Modifique apenas arquivos visuais (`.html`, `.css`, classes Tailwind).
- **Proibição:** É terminantemente proibido alterar lógicas de negócio, conexões de banco de dados, endpoints ou fluxos de dados.

### 3. Assunto: AUTOMAÇÃO (Automation)
*Se o assunto ou solicitação for automação, builders, scripts ou fluxos de trabalho adicionais:*
- Siga as regras em `/AGENT_ROLES.md` (Seção: MODO AUTOMAÇÃO).
- Altere apenas os scripts de automação ou o arquivo de skill correspondente.
- **Proibição:** É terminantemente proibido tocar na interface ou na lógica interna do aplicativo principal.

---

## 🏢 CONTEXTO DE NEGÓCIO EXCLUSIVO
O aplicativo lida unicamente com **escala de trabalho corporativa** (turnos de operadores, líderes e supervisores).
- **NÃO** possui qualquer relação com aviação, aeronaves, aeroportos ou malhas de voos.
- Evite absolutamente o termo "malha" ou qualquer conotação aérea.
- Siga as diretrizes de dados do arquivo `/AGENT_ROLES.md` para conexões dinamicas ao banco de dados relacional.
- **Harmonia Cromática OBRIGATÓRIA:** Consulte e aplique estritamente as diretrizes de `/DESIGN_CHROMATIC_GUIDELINES.md` para qualquer alteração ou criação de designs de tela e cores de componentes (evitando contrastes sem harmonia como texto preto/escuro sobre fundo verde ou âmbar).


```

### Arquivo: `DESIGN_CHROMATIC_GUIDELINES.md`

```md
# Diretrizes de Harmonia Cromática e Cores Complementares
## Escala Easy VIBRA - Guia de Design UI/UX de Alta Fidelidade

Este documento serve como a **especificação obrigatória de design cromático** do sistema Escala Easy VIBRA. Ele deve ser consultado antes de qualquer alteração ou criação de componentes, cartões, tabelas, modais ou painéis visuais no sistema.

---

### 1. O Problema do Contraste Sujo (Muddy Contrast)
O uso inadequado de cores sem harmonia cromática degrada a experiência do usuário e desvaloriza a interface de alta fidelidade do aplicativo.
* **O que evitar:** Combinar fundos de cores vibrantes (como verde esmeralda `bg-emerald-500`) com textos escuros/pretos genéricos (`text-slate-950`, `text-black` ou `#000000`). Essa combinação gera cansaço visual, falta de nitidez e ausência de harmonia cromática.
* **O que buscar:** Utilizar o círculo cromático para estabelecer **contrastes harmônicos**. Se uma cor vibrante for usada como fundo, o texto sobre ela deve ser ou **branco puro/esbranquiçado** (alta reflexão de luz) ou um **tom extremamente escuro derivado da própria cor de fundo** (analogia cromática escura), garantindo que não pareça "sujo".

---

### 2. Tabela de Combinações Recomendadas (Círculo Cromático & Contraste)

| Cor de Fundo | Classe Tailwind Fundo | Cor do Texto Recomendada (Clara) | Cor do Texto Recomendada (Escura/Análoga) | O que NUNCA usar |
| :--- | :--- | :--- | :--- | :--- |
| **Verde / Esmeralda** | `bg-emerald-500` ou `bg-emerald-600` | `text-white` (Branco Puro) ou `text-emerald-50` | `text-emerald-950` (Verde Escuro Profundo) | `text-slate-950`, `text-black` |
| **Âmbar / Amarelo** | `bg-amber-500` ou `bg-amber-400` | `text-white` (Branco Puro) | `text-amber-950` (Marrom Profundo/Quente) | `text-slate-900`, `text-slate-950` |
| **Vermelho / Rose** | `bg-rose-500` ou `bg-red-500` | `text-white` (Branco Puro) | `text-rose-950` (Vinho/Vermelho Profundo) | `text-slate-900`, `text-black` |
| **Azul / Índigo** | `bg-blue-600` ou `bg-indigo-600` | `text-white` (Branco Puro) | `text-blue-950` (Azul Escuro Profundo) | `text-slate-900`, `text-black` |

---

### 3. Aplicação em Cores Complementares e Análogas

#### A. Tons Verdes (Esmeralda - Emerald)
* **Design de Sucesso:**
  * Fundo: `bg-emerald-500`
  * Texto/Ícone: `text-white` ou `text-emerald-950` (nunca cinza escuro ou preto)
* **Badges de Status em Light Theme:**
  * Fundo pastel: `bg-emerald-100` ou `bg-emerald-50`
  * Texto: `text-emerald-800` ou `text-emerald-900`
* **Badges de Status em Dark Theme:**
  * Fundo suave: `bg-emerald-950/30`
  * Texto: `text-emerald-400` ou `text-emerald-300`

#### B. Tons Âmbar (Alerta - Amber)
* **Design de Sucesso:**
  * Fundo: `bg-amber-500`
  * Texto/Ícone: `text-white` ou `text-amber-950`
* **Badges de Status em Light Theme:**
  * Fundo pastel: `bg-amber-100` ou `bg-amber-50`
  * Texto: `text-amber-800` ou `text-amber-900`
* **Badges de Status em Dark Theme:**
  * Fundo suave: `bg-amber-950/30`
  * Texto: `text-amber-400` ou `text-amber-300`

#### C. Tons de Crise ou Crítico (Rose/Red)
* **Design de Sucesso:**
  * Fundo: `bg-rose-500`
  * Texto/Ícone: `text-white` ou `text-rose-950`
* **Badges de Status em Light Theme:**
  * Fundo pastel: `bg-rose-100` ou `bg-rose-50`
  * Texto: `text-rose-800` ou `text-rose-900`
* **Badges de Status em Dark Theme:**
  * Fundo suave: `bg-rose-950/30`
  * Texto: `text-rose-400` ou `text-rose-300`

---

### 4. Checklist de Validação Cromática
Antes de fechar qualquer edição de layout ou criar novas interfaces:
1. [ ] **Verificou o texto em botões com fundos coloridos?** Garantir que botões verdes tenham texto branco ou verde escuro profundo, nunca cinza médio ou preto.
2. [ ] **Verificou os badges e tags de siglas?** Certificar-se de que os textos das siglas herdem cores análogas de alto contraste em relação ao seu fundo específico.
3. [ ] **Evitou o cinza genérico sobre fundos de cor?** O "cinza sujo" (`text-slate-500` ou `text-slate-600`) nunca deve ser jogado em cima de fundos coloridos como verde ou âmbar. Se o fundo for colorido, use uma variação da própria cor de fundo (ex: `text-emerald-700` sobre `bg-emerald-50`).
4. [ ] **Verificou o Dark Mode?** Elementos brilhantes no modo escuro devem usar contraste invertido, mas mantendo a pureza cromática (ex: `bg-emerald-500` com `text-slate-950` pode ser substituído por `bg-emerald-500` com `text-emerald-950` ou `text-slate-900` de alta densidade).

```

