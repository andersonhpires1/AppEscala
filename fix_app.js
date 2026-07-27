const fs = require('fs');
let lines = fs.readFileSync('src/app/app.html', 'utf8').split('\n');

lines.splice(4092, 0, '    }'); // Add } before </section>
fs.writeFileSync('src/app/app.html', lines.join('\n'), 'utf8');
