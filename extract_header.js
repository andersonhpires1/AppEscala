const fs = require('fs');
const html = fs.readFileSync('src/app/app.html', 'utf8');

const lines = html.split('\n');
let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('id="global_master_header"')) {
        startIdx = i;
        break;
    }
}

let divDepth = 0;
for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    
    // Count tags
    const opens = (line.match(/<header/g) || []).length;
    const closes = (line.match(/<\/header>/g) || []).length;
    
    divDepth += opens;
    divDepth -= closes;
    
    if (divDepth === 0 && opens === 0 && closes > 0) { // To handle cases where they are on the same line or multiple tags
        // Actually, this simple parsing might fail if there are nested <header> (which shouldn't be).
    }
    
    // Better logic:
}
