/**
 * Global Animations JavaScript
 * Handles page-wide animations, scroll effects, and interactive features
 */

(function () {
  "use strict";

  // Scroll Progress Indicator
  function initScrollProgress() {
    var progressBar = document.getElementById("scrollProgress");
    if (!progressBar) return;

    function updateProgress() {
      var windowHeight = window.innerHeight;
      var documentHeight = document.documentElement.scrollHeight;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = scrollPercent + "%";
    }

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial update
  }

  // Back to Top Button
  function initBackToTop() {
    var backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    function toggleButton() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", toggleButton);
    toggleButton(); // Initial check
  }

  // Header Scroll Effect
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function handleScroll() {
      if (window.pageYOffset > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
  }

  // Intersection Observer for fade-in animations
  function initScrollAnimations() {
    var observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Unobserve after animation for performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in classes
    var fadeElements = document.querySelectorAll(".fade-in, .fade-in-up, .section");
    fadeElements.forEach(function (el) {
      // Remove visible class initially
      el.classList.remove("visible");
      observer.observe(el);
    });

    // Observe contact section elements
    var contactHeader = document.querySelector(".contact-header");
    var contactMethods = document.querySelector(".contact-methods");

    if (contactHeader) {
      contactHeader.classList.remove("fade-in");
      observer.observe(contactHeader);
    }

    if (contactMethods) {
      contactMethods.classList.remove("fade-in");
      observer.observe(contactMethods);
    }
  }

  // Hero Text Animation
  function initHeroAnimations() {
    var heroText = document.querySelector(".hero__text");
    if (heroText) {
      // Trigger animation on load
      setTimeout(function () {
        heroText.classList.add("fade-in-up");
      }, 100);
    }
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href");
        if (href === "#" || href === "") return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerOffset = 80;
          var elementPosition = target.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }

  // Parallax Effect for Sections
  function initParallax() {
    var sections = document.querySelectorAll(".section");
    if (sections.length === 0) return;

    var ticking = false;

    function updateParallax() {
      sections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        var windowHeight = window.innerHeight;
        var sectionCenter = rect.top + rect.height / 2;
        var viewportCenter = windowHeight / 2;
        var distance = (sectionCenter - viewportCenter) / windowHeight;
        
        // Only apply subtle parallax when section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          var parallaxValue = distance * 30;
          section.style.transform = "translateY(" + parallaxValue + "px)";
        }
      });

      ticking = false;
    }

    // Uncomment if you want parallax effect
    // window.addEventListener("scroll", function () {
    //   if (!ticking) {
    //     window.requestAnimationFrame(updateParallax);
    //     ticking = true;
    //   }
    // });
  }

  // Add ripple effect to buttons
  function initRippleEffect() {
    var buttons = document.querySelectorAll(".btn, .contact-method");

    buttons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        var ripple = document.createElement("span");
        var rect = button.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var x = e.clientX - rect.left - size / 2;
        var y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = [
          "position: absolute",
          "width: " + size + "px",
          "height: " + size + "px",
          "left: " + x + "px",
          "top: " + y + "px",
          "border-radius: 50%",
          "background: rgba(255, 255, 255, 0.3)",
          "transform: scale(0)",
          "animation: ripple 0.6s ease-out",
          "pointer-events: none",
          "z-index: 0"
        ].join("; ");

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(function () {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation CSS if not exists
    if (!document.getElementById("ripple-animation-style")) {
      var style = document.createElement("style");
      style.id = "ripple-animation-style";
      style.textContent = "@keyframes ripple { to { transform: scale(2); opacity: 0; } }";
      document.head.appendChild(style);
    }
  }

  // Page Load Animation
  function initPageLoad() {
    document.body.style.opacity = "0";
    window.addEventListener("load", function () {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "1";
    });
  }

  // Initialize all features
  function init() {
    initScrollProgress();
    initBackToTop();
    initHeaderScroll();
    initScrollAnimations();
    initHeroAnimations();
    initSmoothScroll();
    initParallax();
    initRippleEffect();
    initPageLoad();
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-initialize animations on page load
  window.addEventListener("load", function () {
    initScrollAnimations();
  });
})();
