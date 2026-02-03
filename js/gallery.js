/**
 * Gallery Controls
 * - Left/Right buttons to scroll by one photo
 * - Optional auto "flick" (one photo at a time) that pauses on interaction
 */

(function () {
  'use strict';

  const initGallery = () => {
    const wrap = document.querySelector('.hero__gallery-wrap');
    if (!wrap) return;
    const gallery = wrap.querySelector('.hero__gallery');
    const track = wrap.querySelector('.hero__gallery-track');
    if (!gallery || !track) return;

    const btnLeft = wrap.querySelector('.hero__gallery-btn--left');
    const btnRight = wrap.querySelector('.hero__gallery-btn--right');

    const getStep = () => {
      const firstImg = track.querySelector('img');
      if (!firstImg) return 280;
      const gap = parseFloat(window.getComputedStyle(track).gap || '0') || 0;
      const w = firstImg.getBoundingClientRect().width || 0;
      return w + gap;
    };

    let autoTimer = null;
    let resumeTimer = null;

    const stopAuto = () => {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = null;
    };

    const startAuto = () => {
      stopAuto();
      autoTimer = setInterval(() => {
        const step = getStep();
        // loop back when close to end
        if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 4) {
          gallery.scrollTo({ left: 0, behavior: 'smooth' });
          return;
        }
        gallery.scrollBy({ left: step, behavior: 'smooth' });
      }, 2200); // flick speed
    };

    const pauseThenResumeAuto = () => {
      stopAuto();
      resumeTimer = setTimeout(startAuto, 4000);
    };

    const scrollByStep = (dir) => {
      const step = getStep();
      gallery.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        scrollByStep(-1);
        pauseThenResumeAuto();
      });
    }

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        scrollByStep(1);
        pauseThenResumeAuto();
      });
    }

    // If user scrolls manually (trackpad/touch), pause auto briefly
    gallery.addEventListener('scroll', () => {
      pauseThenResumeAuto();
    }, { passive: true });

    startAuto();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
