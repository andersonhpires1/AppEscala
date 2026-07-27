const fs = require('fs');

let content = fs.readFileSync('src/app/app.html', 'utf8');
content = content.replace(/\{\{[\s\S]*?\}\}/g, ' ');
content = content.replace(/<!--[\s\S]*?-->/g, ' ');

const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
const inlineTags = ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a', 'strong', 'b', 'i', 'svg', 'path', 'defs', 'line', 'circle', 'text', 'rect', 'g', 'option', 'select', 'label'];

let pos = 0;
let lineNum = 1;
let tagStack = [];

let lineIndices = [];
for (let i = 0; i < content.length; i++) {
  if (content[i] === '\n') {
    lineNum++;
  }
  lineIndices.push(lineNum);
}

pos = 0;
while (pos < content.length) {
  const char = content[pos];
  const currentLine = lineIndices[pos];
  
  if (currentLine >= 4390 && currentLine <= 4415) {
    console.log(`[Line ${currentLine}] Before: ${JSON.stringify(tagStack.map(t => t.name + ':' + t.line))}`);
  }
  
  if (char === '<') {
    let nextChar = content[pos + 1];
    if (nextChar === '/') {
      let endTag = content.indexOf('>', pos);
      if (endTag === -1) break;
      let tagName = content.substring(pos + 2, endTag).trim().split(/\s+/)[0].toLowerCase();
      if (tagName && !selfClosingTags.includes(tagName) && !inlineTags.includes(tagName) && !tagName.startsWith('!')) {
        if (tagStack.length > 0) {
          let popped = tagStack.pop();
          if (currentLine >= 4390 && currentLine <= 4415) {
            console.log(`  POP </${tagName}> matched <${popped.name}> from line ${popped.line}`);
          }
        }
      }
      pos = endTag + 1;
      continue;
    } else if (/[a-zA-Z]/.test(nextChar)) {
      let endTag = content.indexOf('>', pos);
      if (endTag === -1) break;
      let tagContent = content.substring(pos + 1, endTag).trim();
      let tagName = tagContent.split(/\s+/)[0].toLowerCase();
      const isSelfClosing = tagContent.endsWith('/') || selfClosingTags.includes(tagName);
      if (tagName && !isSelfClosing && !tagName.startsWith('!') && !tagName.startsWith('@')) {
        if (!inlineTags.includes(tagName)) {
          tagStack.push({ name: tagName, line: currentLine });
          if (currentLine >= 4390 && currentLine <= 4415) {
            console.log(`  PUSH <${tagName}>`);
          }
        }
      }
      pos = endTag + 1;
      continue;
    }
  }
  pos++;
}
