const fs = require('fs');
const html = fs.readFileSync('src/app/app.html', 'utf8');
let lines = html.split('\n');

let blockDepth = 0;
let divDepth = 0;

let blockStack = [];
let divStack = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let stripped = line.trim();

    // ignore these weird interpolated braces
    if (stripped.includes('{{') && !stripped.includes('@')) {
        let clean = stripped.replace(/{{.*?}}/g, '');
        if (!clean.includes('}')) {
             // skip
        }
    }

    // very rough approximation
    let matches = line.match(/(@if|@for|@defer|\}@else\{|\}@empty\{|\}@else if)/g);
    if (matches) {
        for (let m of matches) {
            if (m.startsWith('}')) {
               blockDepth--;
               let popped = blockStack.pop();
            }
            blockDepth++;
            blockStack.push({line: i+1, type: m});
        }
    } else if (line.match(/@if|@for|@defer/)) {
        blockDepth++;
        blockStack.push({line: i+1, type: 'block'});
    } else if (line.match(/\} @else \{|\} @empty \{|\} @else if/)) {
        blockDepth--;
        blockStack.pop();
        blockDepth++;
        blockStack.push({line: i+1, type: 'else'});
    }

    let braces = line.match(/\}/g);
    if (braces) {
        let valid = 0;
        let isStyle = false;
        // Try to filter out template interpolations and inline objects
        let cleanLine = line.replace(/{{.*?}}/g, '').replace(/\{[^\}]*\}/g, function(match) {
            if (match.includes('@')) return match;
            if (match.trim() === '}') return match;
            return '';
        });
        
        let cBraces = cleanLine.match(/\}/g);
        if (cBraces && (!cleanLine.includes('isLightTheme') && !cleanLine.includes('class=') && !cleanLine.includes('style='))) {
            for (let b of cBraces) {
                 // heuristic: if it's a standalone } or right after a tag
                 if (cleanLine.trim() === '}' || cleanLine.trim().startsWith('}')) {
                     blockDepth--;
                     blockStack.pop();
                 }
            }
        }
    }
}
console.log("Remaining blocks:", blockStack);
