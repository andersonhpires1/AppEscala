const fs = require('fs');
let code = fs.readFileSync('src/app/app.ts', 'utf8');

code = code.replace(
`  touchStartX = 0;
  touchEndX = 0;

  onPortalTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onPortalTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handlePortalSwipe();
  }`,
`  touchStartX = 0;
  touchEndX = 0;
  touchStartY = 0;
  touchEndY = 0;

  onPortalTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  onPortalTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handlePortalSwipe();
  }`
);

code = code.replace(
`  handlePortalSwipe() {
    const minSwipeDistance = 60; // Minimum distance to trigger swipe
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) > minSwipeDistance) {`,
`  handlePortalSwipe() {
    const minSwipeDistance = 50; // Minimum distance to trigger swipe
    const maxVerticalRatio = 0.6; // Avoid triggering on vertical scrolling
    
    const xDiff = this.touchEndX - this.touchStartX;
    const yDiff = this.touchEndY - this.touchStartY;
    
    // Only trigger if horizontal swipe distance is met, and vertical distance is proportionally smaller (not a diagonal/vertical scroll)
    if (Math.abs(xDiff) > minSwipeDistance && Math.abs(yDiff) < Math.abs(xDiff) * maxVerticalRatio) {`
);

// We need to also rename swipeDistance to xDiff inside the if block.
code = code.replace(
`      if (swipeDistance < 0) {
        // Swiped left, go to next tab`,
`      if (xDiff < 0) {
        // Swiped left, go to next tab`
);

fs.writeFileSync('src/app/app.ts', code);
