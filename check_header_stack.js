const fs = require('fs');

const content = fs.readFileSync('src/app/app.html', 'utf8');
const lines = content.split('\n');

let stack = [];

for (let i = 110; i < 140; i++) {
  const line = lines[i];
  const lineNum = i + 1;
  console.log(`${lineNum}: ${line.trim()}`);
}
