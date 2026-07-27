const tabs = ['portal', 'escala', 'perfil', 'equipe', 'indicadores'];
function getNextTab(current, direction) {
  const idx = tabs.indexOf(current);
  if (direction === 'left' && idx < tabs.length - 1) return tabs[idx + 1];
  if (direction === 'right' && idx > 0) return tabs[idx - 1];
  return current;
}
console.log(getNextTab('portal', 'left')); // escala
console.log(getNextTab('escala', 'right')); // portal
