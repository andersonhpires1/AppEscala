const fs = require('fs');
const code = fs.readFileSync('src/app/app.ts', 'utf8');

const replacement = `  isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }

  // Swipe navigation for Portal do Colaborador
  touchStartX = 0;
  touchEndX = 0;

  onPortalTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onPortalTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handlePortalSwipe();
  }

  handlePortalSwipe() {
    const minSwipeDistance = 60; // Minimum distance to trigger swipe
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (!this.isMobile()) return;

      const portalTabs = ['portal', 'escala', 'perfil', 'equipe', 'indicadores'];
      const currentTab = this.activeSubTab();
      const idx = portalTabs.indexOf(currentTab);
      if (idx === -1) return;

      if (swipeDistance < 0) {
        // Swiped left, go to next tab
        if (idx < portalTabs.length - 1) {
          this.activeSubTab.set(portalTabs[idx + 1]);
        }
      } else {
        // Swiped right, go to previous tab
        if (idx > 0) {
          this.activeSubTab.set(portalTabs[idx - 1]);
        }
      }
    }
  }`;

const patched = code.replace(/  isMobile\(\): boolean \{\n    return typeof window !== 'undefined' && window\.innerWidth < 768;\n  \}/g, replacement);
fs.writeFileSync('src/app/app.ts', patched);
