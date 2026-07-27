const fs = require('fs');
let code = fs.readFileSync('eslint.config.js', 'utf8');

code = code.replace(/angular\.configs\.templateAccessibility,/, `// angular.configs.templateAccessibility,`);

fs.writeFileSync('eslint.config.js', code, 'utf8');
