const fs = require('fs');
const html = fs.readFileSync('src/app/app.html', 'utf8');

const lines = html.split('\n');
let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('id="global_master_header"')) {
        // Find the line that actually contains the <header tag (which might be the previous line)
        for (let j = i; j >= 0; j--) {
            if (lines[j].includes('<header')) {
                startIdx = j;
                break;
            }
        }
        break;
    }
}

if (startIdx !== -1) {
    let divDepth = 0;
    for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];
        
        // Count tags (crude but should work for this file)
        const opens = (line.match(/<header/g) || []).length;
        const closes = (line.match(/<\/header>/g) || []).length;
        
        divDepth += opens;
        divDepth -= closes;
        
        if (divDepth === 0 && opens === 0 && closes > 0) {
            endIdx = i;
            break;
        } else if (divDepth === 0 && opens > 0 && closes > 0) { // <header> and </header> on same line
            endIdx = i;
            break;
        } else if (divDepth === 0 && i > startIdx) {
           endIdx = i;
           break;
        }
    }
}

if (startIdx !== -1 && endIdx !== -1) {
    fs.writeFileSync('header_code.html', lines.slice(startIdx, endIdx + 1).join('\n'), 'utf8');
    console.log('Header extracted!');
} else {
    console.log('Failed to extract:', startIdx, endIdx);
}
