const fs = require('fs');

const filesToInclude = [
  'src/app/app.html',
  'src/app/app.ts',
  'src/app/scale.service.ts',
  'src/app/data.ts',
  'src/app/app.css',
  'database_schema.sql',
  'package.json',
  'AGENTS.md',
  'GEMINI.md',
  'DESIGN_CHROMATIC_GUIDELINES.md'
];

let mdContent = `\n---\n\n## 2. Códigos para Montagem Completa (Recriação do Zero)\n\nSe você desejar recriar todo o projeto, utilize os códigos completos abaixo para os respectivos arquivos.\n\n`;

for (const file of filesToInclude) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let ext = file.split('.').pop();
    if (ext === 'ts') ext = 'typescript';
    if (ext === 'sql') ext = 'sql';
    
    mdContent += `### Arquivo: \`${file}\`\n\n`;
    mdContent += '```' + ext + '\n';
    mdContent += content;
    mdContent += '\n```\n\n';
  }
}

fs.appendFileSync('Recriaçãodoapp.md', mdContent, 'utf8');
console.log('Arquivo Recriaçãodoapp.md incrementado com sucesso!');
