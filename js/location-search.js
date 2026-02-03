/**
 * Location Search Handler
 * Handles location search functionality
 */

(function() {
  'use strict';

  const initLocationSearch = () => {
    const searchInput = document.getElementById('locationSearchInput');
    const searchBtn = document.getElementById('locationSearchBtn');
    
    if (!searchInput || !searchBtn) return;

    const handleSearch = () => {
      const location = searchInput.value.trim();
      
      if (!location) {
        // If empty, just focus the input
        searchInput.focus();
        return;
      }

      // TODO: Add your location search logic here
      // For example: redirect to search results page or filter listings
      console.log('Searching for location:', location);
      
      // Example: You can redirect to a search results page
      // window.location.href = `./search.html?location=${encodeURIComponent(location)}`;
      
      // Or filter listings on the same page
      // filterListingsByLocation(location);
    };

    // Search on button click
    searchBtn.addEventListener('click', handleSearch);

    // Search on Enter key press
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    });

    // Optional: Show suggestions dropdown (you can implement this later)
    // searchInput.addEventListener('input', handleInputChange);
  };

  // Filter button functionality
  const initFilterBtn = () => {
    const filterBtn = document.getElementById('filterBtn');
    
    if (!filterBtn) return;

    filterBtn.addEventListener('click', () => {
      // TODO: Add your filter logic here
      // For example: open a filter modal or dropdown
      console.log('Filter button clicked');
      
      // Example: Toggle filter panel
      // toggleFilterPanel();
    });
  };

  // Initialize filter button
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilterBtn);
  } else {
    initFilterBtn();
  }

  // Near by me button functionality
  //Browser geolocation API use karta hai to get the current location of the user
  const initNearbyBtn = () => {
    const nearbyBtn = document.getElementById('nearbyBtn');
    const searchInput = document.getElementById('locationSearchInput');
    
    if (!nearbyBtn) return;

    nearbyBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
      }

      // Show loading state
      nearbyBtn.disabled = true;
      const originalText = nearbyBtn.innerHTML;
      nearbyBtn.innerHTML = '<span>Getting location...</span>';

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          // TODO: Use reverse geocoding to get location name
          // For now, just show coordinates or use a geocoding service
          console.log('Current location:', latitude, longitude);
          
          // Example: You can use a reverse geocoding API here
          // Or directly use coordinates for search
          if (searchInput) {
            searchInput.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            searchInput.focus();
          }

          // TODO: Trigger search with current location
          // handleNearbySearch(latitude, longitude);

          // Reset button
          nearbyBtn.disabled = false;
          nearbyBtn.innerHTML = originalText;
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please allow location access or search manually.');
          
          // Reset button
          nearbyBtn.disabled = false;
          nearbyBtn.innerHTML = originalText;
        }
      );
    });
  };

  // Initialize near by me button
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNearbyBtn);
  } else {
    initNearbyBtn();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocationSearch);
  } else {
    initLocationSearch();
  }
})();
