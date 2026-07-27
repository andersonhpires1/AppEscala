const fs = require('fs');
let code = fs.readFileSync('src/app/app.ts', 'utf8');

code = code.replace(
  /public folgaModalSelectedDay = signal<number \| null>\(null\);/,
  `public folgaModalSelectedDay = signal<number | null>(null);

  public getSelectedFolgaDayObj() {
    const day = this.folgaModalSelectedDay();
    if (day === null) return null;
    return this.getNextMonthCalendarDays().find(d => !d.empty && d.day === day) || null;
  }`
);

fs.writeFileSync('src/app/app.ts', code, 'utf8');
