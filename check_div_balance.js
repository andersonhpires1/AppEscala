const fs = require('fs');

let content = fs.readFileSync('src/app/app.html', 'utf8');

// Strip interpolations
content = content.replace(/\{\{[\s\S]*?\}\}/g, ' ');

// Strip comments
content = content.replace(/<!--[\s\S]*?-->/g, ' ');

const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link'];
const inlineTags = ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a', 'strong', 'b', 'i', 'svg', 'path', 'defs', 'line', 'circle', 'text', 'rect', 'g', 'option', 'select', 'label'];

let pos = 0;
let lineNum = 1;
let tagStack = [];

// Track line numbers in stripped content
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
  
  // Handle HTML tags
  if (char === '<') {
    let nextChar = content[pos + 1];
    
    if (nextChar === '/') {
      // Closing tag
      let endTag = content.indexOf('>', pos);
      if (endTag === -1) break;
      let tagName = content.substring(pos + 2, endTag).trim().split(/\s+/)[0].toLowerCase();
      
      if (tagName && !selfClosingTags.includes(tagName) && !inlineTags.includes(tagName) && !tagName.startsWith('!')) {
        if (tagStack.length > 0) {
          let popped = tagStack.pop();
          if (popped.name !== tagName) {
            console.log(`[Line ${currentLine}] TAG ERROR: Closed </${tagName}>, expected </${popped.name}> (opened at line ${popped.line})`);
            // Check if there is a match deeper in stack
            let foundIdx = -1;
            for (let j = tagStack.length - 1; j >= 0; j--) {
              if (tagStack[j].name === tagName) {
                foundIdx = j;
                break;
              }
            }
            if (foundIdx !== -1) {
              console.log(`  -> Self-correcting tag stack: popping unclosed tags up to line ${tagStack[foundIdx].line}`);
              tagStack = tagStack.slice(0, foundIdx);
            } else {
              tagStack.push(popped); // put back
            }
          }
        } else {
          console.log(`[Line ${currentLine}] TAG ERROR: Closed </${tagName}> but stack was empty`);
        }
      }
      pos = endTag + 1;
      continue;
    } else if (/[a-zA-Z]/.test(nextChar)) {
      // Opening tag
      let endTag = content.indexOf('>', pos);
      if (endTag === -1) break;
      let tagContent = content.substring(pos + 1, endTag).trim();
      let tagName = tagContent.split(/\s+/)[0].toLowerCase();
      
      const isSelfClosing = tagContent.endsWith('/') || selfClosingTags.includes(tagName);
      if (tagName && !isSelfClosing && !tagName.startsWith('!') && !tagName.startsWith('@')) {
        if (!inlineTags.includes(tagName)) {
          tagStack.push({ name: tagName, line: currentLine });
        }
      }
      pos = endTag + 1;
      continue;
    }
  }
  
  pos++;
}

console.log('--- FINAL UNCLOSED TAGS ---');
console.log(tagStack);
