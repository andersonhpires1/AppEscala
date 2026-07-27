import re

with open('src/app/app.html', 'r') as f:
    html = f.read()

# Replace PORTAL GRID start
html = html.replace(
    '              <!-- PORTAL GRID -->\n              <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full">',
    '              <!-- PORTAL GRID -->\n              <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full">'
)

# Block 1
html = html.replace(
    '<div class="lg:col-span-4 space-y-3.5" [class.hidden]="isMobile() && activeSubTab() !== \'portal\' && activeSubTab() !== \'indicadores\'">',
    '''@if (activeSubTab() === 'portal' || activeSubTab() === 'indicadores') {
                <div class="lg:col-span-4 space-y-3.5">'''
)
html = html.replace(
    '                  <!-- CARD 2: INDICADORES DE JORNADA -->',
    '                  <!-- CARD 2: INDICADORES DE JORNADA -->'
)

# Block 1 end (Line 3230)
# We know Block 2 starts at 3233: <div class="lg:col-span-8 space-y-3" [class.hidden]="activeSubTab() !== 'escala' && activeSubTab() !== 'portal'">
html = html.replace(
    '                </div>\n\n                <!-- ESCALA MENSAL DO COLABORADOR -->',
    '                </div>\n              }\n\n                <!-- ESCALA MENSAL DO COLABORADOR -->'
)

# Block 2
html = html.replace(
    '<div class="lg:col-span-8 space-y-3" [class.hidden]="activeSubTab() !== \'escala\' && activeSubTab() !== \'portal\'">',
    '''@if (activeSubTab() === 'portal' || activeSubTab() === 'escala') {
                <div class="lg:col-span-8 space-y-3">'''
)

# Block 2 end
html = html.replace(
    '                </div>\n\n                <!-- PERFIL - INFORMAÇÕES PESSOAIS -->',
    '                </div>\n              }\n\n                <!-- PERFIL - INFORMAÇÕES PESSOAIS -->'
)

# Block 3
html = html.replace(
    '<div class="lg:col-span-4 space-y-3.5" [class.hidden]="isMobile() && activeSubTab() !== \'perfil\'">',
    '''@if (activeSubTab() === 'perfil') {
                <div class="lg:col-span-12 lg:col-span-8 lg:col-start-3 space-y-3.5">'''
)

# Block 3 end
html = html.replace(
    '                </div>\n\n              <!-- RIGHT COLUMN: MONTHLY CALENDAR -->',
    '                </div>\n              }\n\n              <!-- RIGHT COLUMN: MONTHLY CALENDAR -->'
)

# Block 4
html = html.replace(
    '<div class="lg:col-span-8 space-y-3" [class.hidden]="isMobile() && activeSubTab() !== \'escala\'">',
    '''@if (activeSubTab() === 'escala') {
              <div class="lg:col-span-12 space-y-3">'''
)

# Block 4 end
html = html.replace(
    '              </div>\n\n              <!-- SECTION: FERRAMENTA DIÁRIA (TRABALHO E FOLGA NO MESMO DIA) -->',
    '              </div>\n              }\n\n              <!-- SECTION: FERRAMENTA DIÁRIA (TRABALHO E FOLGA NO MESMO DIA) -->'
)

# Block 5 & 6
html = html.replace(
    '<div id="team-daily-schedule-tool"\n                   [class.hidden]="!isMobile() || activeSubTab() !== \'equipe\'"',
    '''@if (activeSubTab() === 'equipe') {
              <div class="lg:col-span-12 space-y-4">
              <div id="team-daily-schedule-tool"'''
)

html = html.replace(
    '<div [class.hidden]="!isMobile() || activeSubTab() !== \'equipe\'"\n                   [class]="\'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 \' + (isLightTheme() ? \'bg-white border-slate-200 text-slate-900 shadow-md\' : \'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg\')">',
    '''<div [class]="\'w-full border rounded-[16px] flex flex-col p-4 gap-3.5 transition-all duration-300 \' + (isLightTheme() ? \'bg-white border-slate-200 text-slate-900 shadow-md\' : \'bg-[#0F172A] border-[#334155] text-[#F8FAFC] shadow-lg\')">'''
)

# At the very end of Block 6 (Minha Equipe do Turno), we need to close the `@if` wrapper
# Let's find: `<!-- End of Minha Equipe do Turno -->` or the end of the grid.
# The grid ends at `              </div>\n            </div>\n          }\n        </div>\n      }`
# We will inject `</div> }` right before `</div>\n            </div>\n          }\n        </div>`

html = html.replace(
    '                  }\n                </div>\n              </div>\n            </div>\n          }\n        </div>\n      }\n    </div>\n  </div>',
    '                  }\n                </div>\n              </div>\n              </div>\n              }\n            </div>\n          }\n        </div>\n      }\n    </div>\n  </div>'
)


with open('src/app/app.html', 'w') as f:
    f.write(html)
print("Done")
