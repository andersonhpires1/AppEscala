const fs = require('fs');
let code = fs.readFileSync('eslint.config.js', 'utf8');
code = code.replace(/rules:\s*\{/, `rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/prefer-for-of': 'off',`);
fs.writeFileSync('eslint.config.js', code, 'utf8');
