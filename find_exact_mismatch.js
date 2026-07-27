const fs = require('fs');

const content = fs.readFileSync('src/app/app.html', 'utf8');
const lines = content.split('\n');

let htmlStack = [];

for (let i = 3700; i < 4170; i++) {
  const line = lines[i];
  if (!line) continue;
  const lineNum = i + 1;
  
  // Clean interpolations
  let cleanLine = line.replace(/\{\{[\s\S]*?\}\}/g, ' ');
  
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
      // Closing tag
      let end = cleanLine.indexOf('>', pos);
      if (end !== -1) {
        let tagName = cleanLine.substring(pos + 2, end).trim().split(' ')[0].replace('>', '').toLowerCase();
        if (tagName && !['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'img', 'input', 'a', 'strong', 'b', 'i', 'hr', 'th', 'td', 'tr', 'thead', 'tbody', 'table', 'svg', 'path'].includes(tagName)) {
          if (htmlStack.length > 0) {
            let popped = htmlStack.pop();
            console.log(`[Line ${lineNum}] CLOSED: </${tagName}> matching <${popped.name}> opened at line ${popped.line}`);
          } else {
            console.log(`[Line ${lineNum}] ERROR: Closed </${tagName}> but stack was empty`);
          }
        }
        pos = end + 1;
      } else {
        break;
      }
    } else {
      // Opening tag
      let end = cleanLine.indexOf('>', pos);
      if (end !== -1) {
        let tagContent = cleanLine.substring(pos + 1, end).trim();
        let tagName = tagContent.split(' ')[0].replace('>', '').toLowerCase();
        const isSelfClosing = tagContent.endsWith('/') || 
                              ['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName);
        if (tagName && !isSelfClosing && !tagName.startsWith('!') && !tagName.startsWith('@')) {
          if (!['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'img', 'input', 'a', 'strong', 'b', 'i', 'hr', 'th', 'td', 'tr', 'thead', 'tbody', 'table', 'svg', 'path'].includes(tagName)) {
            htmlStack.push({ name: tagName, line: lineNum });
            console.log(`[Line ${lineNum}] OPENED: <${tagName}>`);
          }
        }
        pos = end + 1;
      } else {
        break;
      }
    }
  }
}

console.log('Final HTML stack status at 4170:', htmlStack);
