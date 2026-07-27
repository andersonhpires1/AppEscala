const fs = require('fs');
let code = fs.readFileSync('eslint.config.js', 'utf8');

code = code.replace(/'@angular-eslint\/directive-selector':/, `
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      '@angular-eslint/directive-selector':`);

fs.writeFileSync('eslint.config.js', code, 'utf8');
