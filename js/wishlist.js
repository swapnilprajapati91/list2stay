// Set current year in footer
if (document.getElementById("year")) {
  document.getElementById("year").textContent = String(new Date().getFullYear());
}

// Export functions for use in other pages (to add items to wishlist) - Define early so other scripts can use it
var WISHLIST_KEY = "list2stay_wishlist";
window.wishlistUtils = {
  add: function (room) {
    try {
      var items = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      // Check if already exists
      var exists = items.some(function (item) {
        return item.id === room.id;
      });
      if (!exists) {
        items.push(room);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
        // Trigger custom event for same-tab updates
        window.dispatchEvent(new Event("wishlistUpdated"));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to add to wishlist:", e);
      return false;
    }
  },
  remove: function (roomId) {
    try {
      var items = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      var filtered = items.filter(function (item) {
        return item.id !== roomId;
      });
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
      // Trigger custom event for same-tab updates
      window.dispatchEvent(new Event("wishlistUpdated"));
      return true;
    } catch (e) {
      console.error("Failed to remove from wishlist:", e);
      return false;
    }
  },
  has: function (roomId) {
    try {
      var items = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      return items.some(function (item) {
        return item.id === roomId;
      });
    } catch (e) {
      return false;
    }
  }
};

// Wishlist page functionality
(function () {
  var wishlistContainer = document.getElementById("wishlistItems");
  var emptyState = document.getElementById("wishlistEmpty");
  
  // If not on wishlist page, exit early
  if (!wishlistContainer) return;

  function getWishlist() {
    try {
      var stored = localStorage.getItem(WISHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(items) {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save wishlist:", e);
    }
  }

  function createWishlistCard(item) {
    var article = document.createElement("article");
    article.className = "card product-card";
    article.setAttribute("data-wishlist-id", item.id);

    var imgWrap = document.createElement("div");
    imgWrap.className = "product-card__image-wrap";

    var img = document.createElement("img");
    img.className = "product-card__image";
    img.src = item.image || "../assets/logo.png";
    img.alt = item.name;

    imgWrap.appendChild(img);

    var body = document.createElement("div");
    body.className = "product-card__body";

    var title = document.createElement("h2");
    title.className = "product-card__title";
    title.textContent = item.name;

    var subtitle = document.createElement("p");
    subtitle.className = "muted product-card__subtitle";
    subtitle.textContent = item.subtitle || "";

    var featuresList = document.createElement("ul");
    featuresList.className = "product-card__features";
    (item.features || []).forEach(function (feat) {
      var li = document.createElement("li");
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    var meta = document.createElement("div");
    meta.className = "product-card__meta";

    var priceSpan = document.createElement("span");
    priceSpan.className = "product-card__price";
    priceSpan.textContent = "₹" + (item.price || 0).toLocaleString("en-IN") + " / month";

    var tagSpan = document.createElement("span");
    tagSpan.className = "product-card__tag";
    tagSpan.textContent = item.tag || "";

    meta.appendChild(priceSpan);
    meta.appendChild(tagSpan);

    var actions = document.createElement("div");
    actions.className = "product-card__actions";

    var bookBtn = document.createElement("button");
    bookBtn.className = "btn btn--primary";
    bookBtn.textContent = "Book now";

    var removeBtn = document.createElement("button");
    removeBtn.className = "btn btn--ghost";
    removeBtn.textContent = "Remove from wishlist";
    removeBtn.addEventListener("click", function () {
      removeFromWishlist(item.id);
    });

    actions.appendChild(bookBtn);
    actions.appendChild(removeBtn);

    body.appendChild(title);
    body.appendChild(subtitle);
    body.appendChild(featuresList);
    body.appendChild(meta);
    body.appendChild(actions);

    article.appendChild(imgWrap);
    article.appendChild(body);

    return article;
  }

  function renderWishlist() {
    var items = getWishlist();
    wishlistContainer.innerHTML = "";

    if (items.length === 0) {
      emptyState.style.display = "block";
      wishlistContainer.style.display = "none";
    } else {
      emptyState.style.display = "none";
      wishlistContainer.style.display = "";
      items.forEach(function (item) {
        var card = createWishlistCard(item);
        wishlistContainer.appendChild(card);
      });
    }
  }

  function removeFromWishlist(itemId) {
    var items = getWishlist();
    var filtered = items.filter(function (item) {
      return item.id !== itemId;
    });
    saveWishlist(filtered);
    renderWishlist();
  }

  // Initial render
  renderWishlist();

  // Listen for storage changes (when wishlist is updated from other tabs/pages)
  window.addEventListener("storage", function (e) {
    if (e.key === WISHLIST_KEY) {
      renderWishlist();
    }
  });

  // Also listen for custom event (for same-tab updates)
  window.addEventListener("wishlistUpdated", function () {
    renderWishlist();
  });
})();
