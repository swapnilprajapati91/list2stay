/**
 * Search Bar Handler
 * Handles search bar expand/collapse on mobile
 */

(function() {
  'use strict';

  const initSearchBar = () => {
    const searchBar = document.getElementById('searchBar');
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');

    if (!searchBar || !searchToggle || !searchInput) return;

    // Only enable mobile behavior on mobile devices
    if (window.innerWidth <= 760) {
      // Toggle search bar on icon click
      searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (searchBar.classList.contains('expanded')) {
          searchBar.classList.remove('expanded');
          searchInput.blur();
        } else {
          searchBar.classList.add('expanded');
          searchInput.focus();
        }
      });

      // Close search when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && searchBar.classList.contains('expanded')) {
          searchBar.classList.remove('expanded');
          searchInput.blur();
        }
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchBar);
  } else {
    initSearchBar();
  }
})();
