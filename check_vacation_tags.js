const fs = require('fs');

const content = fs.readFileSync('src/app/app.html', 'utf8');
const lines = content.split('\n');

let htmlStack = [];
const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
const inlineTags = ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a', 'strong', 'b', 'i', 'svg', 'path', 'defs', 'line', 'circle', 'text', 'rect', 'g', 'option', 'select', 'label'];

for (let i = 3311; i < 3412; i++) {
  const line = lines[i];
  if (!line) continue;
  const lineNum = i + 1;
  
  let cleanLine = line.replace(/\{\{[\s\S]*?\}\}/g, ' ');
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
        if (tagName && !selfClosingTags.includes(tagName) && !inlineTags.includes(tagName)) {
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
        const isSelfClosing = tagContent.endsWith('/') || selfClosingTags.includes(tagName);
        if (tagName && !isSelfClosing && !tagName.startsWith('!') && !tagName.startsWith('@')) {
          if (!inlineTags.includes(tagName)) {
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

console.log('--- Unclosed tags in Vacation Tab ---');
console.log(htmlStack);
