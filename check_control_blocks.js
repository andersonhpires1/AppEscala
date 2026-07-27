const fs = require('fs');

const content = fs.readFileSync('src/app/app.html', 'utf8');

function checkControlBlocks(content) {
  // Remove all {{ ... }} (interpolation)
  let cleanContent = content.replace(/\{\{[\s\S]*?\}\}/g, ' ');
  // Remove all HTML comments <!-- ... -->
  cleanContent = cleanContent.replace(/<!--[\s\S]*?-->/g, ' ');

  const lines = cleanContent.split('\n');
  let stack = [];
  
  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];
    
    // Find all '{' and '}' on this line
    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx];
      
      if (char === '{') {
        // Find what started this block by looking backwards on the line or preceding lines
        // For simplicity, let's look at the current line or just record it
        stack.push({ line: lineNum, charIdx });
      } else if (char === '}') {
        if (stack.length > 0) {
          stack.pop();
        } else {
          console.log(`[Line ${lineNum}, Col ${charIdx + 1}] Error: Unmatched closing brace '}'`);
        }
      }
    }
  }
  
  console.log('--- Unclosed Braces ---');
  stack.forEach(b => {
    console.log(`Opening brace '{' at line ${b.line}`);
  });
}

checkControlBlocks(content);
