const fs = require('fs');
let content = fs.readFileSync('src/app/app.html', 'utf8');

const target = '<span class="material-icons text-lg font-bold">calendar_month</span>';
const replacement = '<span class="material-icons text-lg font-bold" [style.color]="activeSubTab() === \'escala\' ? \'#ffffff\' : \'\'">calendar_month</span>';

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/app/app.html', content, 'utf8');
  console.log('Successfully patched Escala icon color');
} else {
  console.log('Target not found');
}
