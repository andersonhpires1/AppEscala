const fs = require('fs');

let content = fs.readFileSync('src/app/app.html', 'utf8');

// We want to replace:
//          }
//       </div>
// with:
//       </div>
//          }
// around lines 241-244.
// Let's split content into lines, verify, and swap lines 242 and 243 (0-indexed).

const lines = content.split('\n');
console.log('Line 241 (0-indexed 240):', JSON.stringify(lines[240]));
console.log('Line 242 (0-indexed 241):', JSON.stringify(lines[241]));
console.log('Line 243 (0-indexed 242):', JSON.stringify(lines[242]));
console.log('Line 244 (0-indexed 243):', JSON.stringify(lines[243]));

if (lines[242].trim() === '}' && lines[243].trim() === '</div>') {
  console.log('Swapping...');
  const temp = lines[242];
  lines[242] = lines[243];
  lines[243] = temp;
  
  fs.writeFileSync('src/app/app.html', lines.join('\n'), 'utf8');
  console.log('Successfully swapped!');
} else {
  console.log('Mismatch, did not swap!');
}
