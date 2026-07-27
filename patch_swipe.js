const fs = require('fs');
let code = fs.readFileSync('src/app/app.ts', 'utf8');

code = code.replace(
`  onPortalTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }`,
`  onPortalTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
    this.touchStartY = event.changedTouches[0].clientY;
  }`
);

code = code.replace(
`  onPortalTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handlePortalSwipe();
  }`,
`  onPortalTouchEnd(event: TouchEvent) {
    if (event.changedTouches && event.changedTouches.length > 0) {
      this.touchEndX = event.changedTouches[0].clientX;
      this.touchEndY = event.changedTouches[0].clientY;
      this.handlePortalSwipe();
    }
  }`
);

code = code.replace(
`    const minSwipeDistance = 50; // Minimum distance to trigger swipe`,
`    const minSwipeDistance = 40; // Minimum distance to trigger swipe`
);

fs.writeFileSync('src/app/app.ts', code);
