const fs = require('fs');

let content = fs.readFileSync('src/app/app.html', 'utf8');
const lines = content.split('\n');

if (lines[243].trim() === '}' && lines[242].trim() === '</div>') {
  console.log('Swapping back...');
  const temp = lines[242];
  lines[242] = lines[243];
  lines[243] = temp;
  
  fs.writeFileSync('src/app/app.html', lines.join('\n'), 'utf8');
  console.log('Successfully swapped back!');
} else {
  console.log('No swap needed or already in correct state.');
}
