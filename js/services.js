/**
 * Services Section JavaScript
 * Handles scroll animations, hover effects, and interactive features
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
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initialize animations
  function initAnimations() {
    // Observe service cards
    var cards = document.querySelectorAll(".service-card");
    cards.forEach(function (card) {
      card.classList.remove("fade-in");
      observer.observe(card);
    });

    // Observe header elements
    var title = document.querySelector(".services-title");
    var subtitle = document.querySelector(".services-subtitle");

    if (title) {
      title.classList.remove("fade-in");
      observer.observe(title);
    }

    if (subtitle) {
      subtitle.classList.remove("fade-in");
      observer.observe(subtitle);
    }
  }

  // Add parallax effect to cards on scroll
  function initParallaxCards() {
    var cards = document.querySelectorAll(".service-card");
    if (cards.length === 0) return;

    var ticking = false;

    function updateParallax() {
      cards.forEach(function (card, index) {
        var rect = card.getBoundingClientRect();
        var windowHeight = window.innerHeight;
        var cardCenter = rect.top + rect.height / 2;
        var viewportCenter = windowHeight / 2;
        var distance = (cardCenter - viewportCenter) / windowHeight;
        var parallaxValue = distance * 20; // Adjust intensity

        // Only apply parallax when card is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          card.style.transform = "translateY(" + parallaxValue + "px)";
        }
      });

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // Add mouse move effect to cards
  function initMouseMoveEffect() {
    var cards = document.querySelectorAll(".service-card");

    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var moveX = (x - centerX) / 10;
        var moveY = (y - centerY) / 10;

        card.style.transform = "translateY(-8px) translateX(" + moveX + "px) translateY(" + moveY + "px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  // Add click ripple effect
  function initRippleEffect() {
    var cards = document.querySelectorAll(".service-card");

    cards.forEach(function (card) {
      card.addEventListener("click", function (e) {
        var ripple = document.createElement("div");
        var rect = card.getBoundingClientRect();
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
          "background: rgba(109, 94, 246, 0.3)",
          "transform: scale(0)",
          "animation: ripple 0.6s ease-out",
          "pointer-events: none",
          "z-index: 10"
        ].join("; ");

        card.appendChild(ripple);

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

  // Initialize all features
  function init() {
    initAnimations();
    // Uncomment if you want parallax effect (may conflict with hover)
    // initParallaxCards();
    // Uncomment if you want mouse move effect
    // initMouseMoveEffect();
    initRippleEffect();
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Re-initialize on page load
  window.addEventListener("load", function () {
    initAnimations();
  });
})();
