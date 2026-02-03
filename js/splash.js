/**
 * Splash/Intro Video Handler
 * Handles intro video playback and redirect to home page
 */

(function() {
  'use strict';

  const initSplash = () => {
    const video = document.getElementById('introVideo');
    if (!video) return;

    const goHome = () => {
      // Avoid multiple redirects
      if (goHome._did) return;
      goHome._did = true;
      window.location.href = './pages/home.html';
    };

    // When video ends, open main site
    video.addEventListener('ended', goHome);

    // If video cannot load, fallback after short delay
    video.addEventListener('error', () => {
      setTimeout(goHome, 800);
    });

    // Ensure muted autoplay
    window.addEventListener('load', () => {
      video.muted = true;
      video.play().catch(() => {
        // If autoplay is blocked, still show video frame;
        // user can press native browser play button.
      });
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplash);
  } else {
    initSplash();
  }
})();
