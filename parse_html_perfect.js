const fs = require('fs');

const content = fs.readFileSync('src/app/app.html', 'utf8');

function parseHTMLPerfect(content) {
  let cleanContent = content;
  // Replace all {{ ... }} with spaces of the same length to preserve line and column offsets
  cleanContent = cleanContent.replace(/\{\{[\s\S]*?\}\}/g, (match) => ' '.repeat(match.length));
  // Replace comments too
  cleanContent = cleanContent.replace(/<!--[\s\S]*?-->/g, (match) => ' '.repeat(match.length));

  let lines = cleanContent.split('\n');
  let htmlStack = [];
  let blockStack = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    
    // Parse @if, @for, @else, @empty, @switch, etc.
    let trimLine = line.trim();
    if (trimLine.startsWith('@if') || trimLine.startsWith('@for') || trimLine.startsWith('@switch')) {
      const braceIdx = line.indexOf('{');
      if (braceIdx !== -1) {
        blockStack.push({ name: trimLine.split('{')[0].trim(), line: lineNum });
        // console.log(`[Line ${lineNum}] Opened Block: ${trimLine.split('{')[0].trim()}`);
      }
    } else if (trimLine.includes('} @else if') || trimLine.includes('} @else {') || trimLine.includes('} @empty {')) {
      if (blockStack.length > 0) {
        blockStack.pop();
      }
      blockStack.push({ name: trimLine, line: lineNum });
    } else if (trimLine === '}' || trimLine.startsWith('}') && !trimLine.includes('{')) {
      if (blockStack.length > 0) {
        blockStack.pop();
        // console.log(`[Line ${lineNum}] Closed Block`);
      } else {
        console.log(`[Line ${lineNum}] Error: Unexpected '}' with no open block.`);
      }
    }

    // Parse HTML tags
    let pos = 0;
    while ((pos = line.indexOf('<', pos)) !== -1) {
      if (line[pos + 1] === '/') {
        // Closing tag
        let end = line.indexOf('>', pos);
        if (end !== -1) {
          let tagName = line.substring(pos + 2, end).trim().split(' ')[0].split('\n')[0].replace('>', '');
          tagName = tagName.toLowerCase();
          if (tagName && !['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName)) {
            if (htmlStack.length > 0) {
              let popped = htmlStack.pop();
              if (popped.name !== tagName) {
                console.log(`[Line ${lineNum}] HTML Tag Mismatch: Closed </${tagName}>, but expected </${popped.name}> (opened at line ${popped.line})`);
                // Put it back to trace
                htmlStack.push(popped);
              }
            } else {
              console.log(`[Line ${lineNum}] Error: Closed </${tagName}>, but stack was empty`);
            }
          }
          pos = end + 1;
        } else {
          break;
        }
      } else {
        // Opening tag
        let end = line.indexOf('>', pos);
        if (end !== -1) {
          let tagContent = line.substring(pos + 1, end).trim();
          let tagName = tagContent.split(' ')[0].split('\n')[0].replace('>', '');
          const isSelfClosing = tagContent.endsWith('/') || 
                                ['img', 'input', 'br', 'hr', 'meta', 'link'].includes(tagName.toLowerCase());
          tagName = tagName.toLowerCase();
          if (tagName && !isSelfClosing && !tagName.startsWith('!') && !tagName.startsWith('@')) {
            htmlStack.push({ name: tagName, line: lineNum });
          }
          pos = end + 1;
        } else {
          break;
        }
      }
    }
  }

  console.log('--- Unclosed HTML Tags ---');
  htmlStack.forEach(t => console.log(`<${t.name}> opened at line ${t.line}`));

  console.log('--- Unclosed Blocks ---');
  blockStack.forEach(b => console.log(`${b.name} opened at line ${b.line}`));
}

parseHTMLPerfect(content);
