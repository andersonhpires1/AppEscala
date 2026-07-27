const fs = require('fs');
const html = fs.readFileSync('src/app/app.html', 'utf8');

function extractDivById(id) {
    const lines = html.split('\n');
    let startIdx = -1;
    let endIdx = -1;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`id="${id}"`)) {
            startIdx = i;
            break;
        }
    }
    
    if (startIdx === -1) return null;
    
    // Naive HTML extraction based on block depth
    let divDepth = 0;
    let inAngularBlock = 0;
    
    for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];
        
        // Count divs
        const divOpens = (line.match(/<header|<div|<main|<section|<ul/g) || []).length;
        const divCloses = (line.match(/<\/header>|<\/div>|<\/main>|<\/section>|<\/ul>/g) || []).length;
        
        divDepth += divOpens;
        divDepth -= divCloses;
        
        if (divDepth === 0) {
            endIdx = i;
            break;
        }
    }
    
    if (endIdx !== -1) {
        return lines.slice(startIdx, endIdx + 1).join('\n');
    }
    return null;
}

const headerHtml = extractDivById('global_master_header');
const portalHtml = extractDivById('portal_tab_content');

fs.writeFileSync('Recriacao_Divs_Selecionadas.html', `
<!-- HEADER (global_master_header) -->
${headerHtml}

<!-- PORTAL DO COLABORADOR (portal_tab_content) -->
${portalHtml}
`, 'utf8');
