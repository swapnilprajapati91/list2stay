/**
 * About Section JavaScript
 * Handles scroll animations and interactions
 */

(function () {
  "use strict";

  // Intersection Observer for fade-in animations
  var observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  function initAnimations() {
    var elements = document.querySelectorAll(".fade-in");
    elements.forEach(function (el) {
      // Remove fade-in class initially so CSS can handle the animation
      el.classList.remove("fade-in");
      observer.observe(el);
    });
  }

  // Gallery image click handler (optional - can open lightbox or navigate)
  function initGalleryInteractions() {
    var galleryItems = document.querySelectorAll(".about-gallery__image-wrap");
    
    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        // Optional: Add lightbox or navigation functionality here
        console.log("Gallery item clicked:", index);
      });
    });
  }

  // Parallax effect for gallery on scroll (optional enhancement)
  function initParallax() {
    var gallery = document.querySelector(".about-gallery");
    if (!gallery) return;

    window.addEventListener("scroll", function () {
      var rect = gallery.getBoundingClientRect();
      var scrollY = window.scrollY;
      var windowHeight = window.innerHeight;

      // Only apply parallax when gallery is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        var parallaxValue = (windowHeight - rect.top) * 0.1;
        gallery.style.transform = "translateY(" + parallaxValue + "px)";
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initAnimations();
      initGalleryInteractions();
      // Uncomment if you want parallax effect
      // initParallax();
    });
  } else {
    initAnimations();
    initGalleryInteractions();
    // Uncomment if you want parallax effect
    // initParallax();
  }

  // Re-initialize animations if content is dynamically loaded
  window.addEventListener("load", function () {
    initAnimations();
  });
})();
