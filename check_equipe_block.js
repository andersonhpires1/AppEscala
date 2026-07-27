const fs = require('fs');

const content = fs.readFileSync('src/app/app.html', 'utf8');
const lines = content.split('\n');

let htmlStack = [];
let blockStack = [];

for (let i = 4171; i < 4403; i++) {
  const line = lines[i];
  if (!line) continue;
  const lineNum = i + 1;
  
  // Clean interpolations
  let cleanLine = line.replace(/\{\{[\s\S]*?\}\}/g, ' ');
  
  // Parse blocks
  let trim = cleanLine.trim();
  if (trim.startsWith('@if') || trim.startsWith('@for')) {
    let braceIdx = trim.indexOf('{');
    blockStack.push({ name: trim.substring(0, braceIdx !== -1 ? braceIdx : trim.length), line: lineNum });
  } else if (trim === '}' || trim.startsWith('}') && !trim.includes('{')) {
    if (blockStack.length > 0) {
      blockStack.pop();
    } else {
      console.log(`[Line ${lineNum}] Block Error: Extra closing brace '}'`);
    }
  }

  // Parse tags
  let pos = 0;
  while ((pos = cleanLine.indexOf('<', pos)) !== -1) {
    if (cleanLine.substr(pos, 4) === '<!--') {
      pos = cleanLine.indexOf('-->', pos);
      if (pos === -1) break;
      pos += 3;
      continue;
    }
    
    if (cleanLine[pos + 1] === '/') {
      let end = cleanLine.indexOf('>', pos);
      if (end !== -1) {
        let tagName = cleanLine.substring(pos + 2, end).trim().split(' ')[0].replace('>', '').toLowerCase();
        if (tagName && !['img', 'input', 'br', 'hr', 'meta', 'link', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a'].includes(tagName)) {
          if (htmlStack.length > 0) {
            let popped = htmlStack.pop();
            if (popped.name !== tagName) {
              console.log(`[Line ${lineNum}] Tag Mismatch: Closed </${tagName}>, expected </${popped.name}> (opened at line ${popped.line})`);
              htmlStack.push(popped);
            }
          } else {
            console.log(`[Line ${lineNum}] Tag Error: Closed </${tagName}> but stack was empty`);
          }
        }
        pos = end + 1;
      } else {
        break;
      }
    } else {
      let end = cleanLine.indexOf('>', pos);
      if (end !== -1) {
        let tagContent = cleanLine.substring(pos + 1, end).trim();
        let tagName = tagContent.split(' ')[0].replace('>', '').toLowerCase();
        const isSelfClosing = tagContent.endsWith('/') || ['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName);
        if (tagName && !isSelfClosing && !tagName.startsWith('!') && !tagName.startsWith('@')) {
          if (!['img', 'input', 'br', 'hr', 'meta', 'link', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a'].includes(tagName)) {
            htmlStack.push({ name: tagName, line: lineNum });
          }
        }
        pos = end + 1;
      } else {
        break;
      }
    }
  }
}

console.log('--- Remainder in Equipe ---');
console.log('HTML Stack:', htmlStack);
console.log('Block Stack:', blockStack);
