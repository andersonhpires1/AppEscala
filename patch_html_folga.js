const fs = require('fs');
let code = fs.readFileSync('src/app/app.html', 'utf8');

code = code.replace(
  /@let selObj = getNextMonthCalendarDays\(\)\.find\(d => !d\.empty && d\.day === folgaModalSelectedDay\(\)\);/g,
  `@let selObj = getSelectedFolgaDayObj();`
);

fs.writeFileSync('src/app/app.html', code, 'utf8');
