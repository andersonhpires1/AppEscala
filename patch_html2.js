const fs = require('fs');
let code = fs.readFileSync('src/app/app.html', 'utf8');

code = code.split('@let selObj = getNextMonthCalendarDays().find(d => !d.empty && d.day === folgaModalSelectedDay());').join('@let selObj = getSelectedFolgaDayObj();');

fs.writeFileSync('src/app/app.html', code, 'utf8');
