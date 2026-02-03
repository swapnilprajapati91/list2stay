/**
 * Mobile Menu Handler
 * Handles mobile menu toggle and responsive behavior
 */

(function() {
  'use strict';

  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menu = document.querySelector('.mobile-menu');

    if (!menuToggle || !menuOverlay) return;

    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
      menuOverlay.classList.toggle('active');
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
      }
    });

    // Close menu on window resize (desktop)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        if (overlay) overlay.classList.remove('active');
        if (menu) menu.classList.remove('active');
      }
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
