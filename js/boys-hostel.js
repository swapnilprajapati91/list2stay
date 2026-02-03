// Set current year in footer
document.getElementById("year").textContent = String(new Date().getFullYear());

// Simple client-side filtering for boys hostel products
(function () {
  var input = document.getElementById("boysHostelSearch");
  var list = document.getElementById("boysHostelList");
  var paginationContainer = document.getElementById("boysHostelPagination");
  if (!input || !list) return;

  var cards = [];
  var sharingFilters = Array.prototype.slice.call(document.querySelectorAll(".filter-sharing"));
  var priceFilters = Array.prototype.slice.call(document.querySelectorAll(".filter-price"));
  var filterToggle = document.getElementById("filterDropdownToggle");
  var filterPanel = document.getElementById("filterDropdownPanel");
  var PAGE_SIZE = 6;
  var currentPage = 1;

  function createCard(room) {
    var article = document.createElement("article");
    article.className = "card product-card";
    article.setAttribute("data-name", room.name);
    article.setAttribute("data-area", room.area);
    article.setAttribute("data-price", String(room.price));
    article.setAttribute("data-sharing", String(room.sharing));

    var imgWrap = document.createElement("div");
    imgWrap.className = "product-card__image-wrap";

    var img = document.createElement("img");
    img.className = "product-card__image";
    img.src = "../assets/logo.png"; // placeholder; replace with real photo path later
    img.alt = room.name;

    imgWrap.appendChild(img);

    var body = document.createElement("div");
    body.className = "product-card__body";

    var title = document.createElement("h2");
    title.className = "product-card__title";
    title.textContent = room.name;

    var subtitle = document.createElement("p");
    subtitle.className = "muted product-card__subtitle";
    subtitle.textContent = room.subtitle;

    var featuresList = document.createElement("ul");
    featuresList.className = "product-card__features";
    (room.features || []).forEach(function (feat) {
      var li = document.createElement("li");
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    var meta = document.createElement("div");
    meta.className = "product-card__meta";

    var priceSpan = document.createElement("span");
    priceSpan.className = "product-card__price";
    priceSpan.textContent = "₹" + room.price.toLocaleString("en-IN") + " / month";

    var tagSpan = document.createElement("span");
    tagSpan.className = "product-card__tag";
    tagSpan.textContent = room.tag || "";

    meta.appendChild(priceSpan);
    meta.appendChild(tagSpan);

    var actions = document.createElement("div");
    actions.className = "product-card__actions";

    var bookBtn = document.createElement("button");
    bookBtn.className = "btn btn--primary";
    bookBtn.textContent = "Book now";

    var wishBtn = document.createElement("button");
    wishBtn.className = "btn btn--ghost";
    wishBtn.textContent = "Add to wishlist";
    
    // Wishlist functionality
    var roomId = room.name + "_" + room.area + "_" + room.price;
    var isInWishlist = window.wishlistUtils && window.wishlistUtils.has(roomId);
    if (isInWishlist) {
      wishBtn.textContent = "Remove from wishlist";
      wishBtn.classList.add("btn--active");
    }
    
    wishBtn.addEventListener("click", function () {
      if (window.wishlistUtils) {
        if (isInWishlist) {
          window.wishlistUtils.remove(roomId);
          wishBtn.textContent = "Add to wishlist";
          wishBtn.classList.remove("btn--active");
          isInWishlist = false;
        } else {
          var wishlistItem = {
            id: roomId,
            name: room.name,
            subtitle: room.subtitle,
            area: room.area,
            price: room.price,
            sharing: room.sharing,
            features: room.features || [],
            tag: room.tag || "",
            image: "../assets/logo.png"
          };
          if (window.wishlistUtils.add(wishlistItem)) {
            wishBtn.textContent = "Remove from wishlist";
            wishBtn.classList.add("btn--active");
            isInWishlist = true;
          }
        }
      } else {
        alert("Wishlist feature not available. Please refresh the page.");
      }
    });

    actions.appendChild(bookBtn);
    actions.appendChild(wishBtn);

    body.appendChild(title);
    body.appendChild(subtitle);
    body.appendChild(featuresList);
    body.appendChild(meta);
    body.appendChild(actions);

    article.appendChild(imgWrap);
    article.appendChild(body);

    return article;
  }

  function renderRooms(rooms) {
    list.innerHTML = "";
    cards = [];
    rooms.forEach(function (room) {
      var card = createCard(room);
      list.appendChild(card);
      cards.push(card);
    });
  }

  function getFilteredCards() {
    return cards.filter(function (card) {
      return card.__matchesFilter !== false; // default is true if not set
    });
  }

  function showPage(page) {
    var filtered = getFilteredCards();
    var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;

    // hide all, then show only current page items (from filtered set)
    cards.forEach(function (card) {
      if (card.__matchesFilter === false) {
        card.style.display = "none"; // not matching filter
      } else {
        card.style.display = "none"; // matching but may be on another page
      }
    });

    var start = (currentPage - 1) * PAGE_SIZE;
    var end = start + PAGE_SIZE;
    filtered.slice(start, end).forEach(function (card) {
      card.style.display = "";
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = "";

    if (totalPages <= 1) {
      return; // no need to show pagination
    }

    var listEl = document.createElement("div");
    listEl.className = "pagination__list";

    function createBtn(label, page, options) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.className = "pagination__btn";
      if (options && options.active) {
        btn.className += " pagination__btn--active";
      }
      if (options && options.disabled) {
        btn.className += " pagination__btn--disabled";
        return btn;
      }
      btn.addEventListener("click", function () {
        if (page === currentPage) return;
        showPage(page);
      });
      return btn;
    }

    // Prev
    var prevDisabled = currentPage === 1;
    var prevBtn = createBtn("‹", currentPage - 1, { disabled: prevDisabled });
    listEl.appendChild(prevBtn);

    // Page numbers
    for (var i = 1; i <= totalPages; i++) {
      var isActive = i === currentPage;
      var pageBtn = createBtn(String(i), i, { active: isActive });
      listEl.appendChild(pageBtn);
    }

    // Next
    var nextDisabled = currentPage === totalPages;
    var nextBtn = createBtn("›", currentPage + 1, { disabled: nextDisabled });
    listEl.appendChild(nextBtn);

    paginationContainer.appendChild(listEl);
  }

  function applyFilters() {
    var q = input.value.toLowerCase().trim();

    // collect selected sharing types
    var selectedSharing = sharingFilters
      .filter(function (cb) {
        return cb.checked;
      })
      .map(function (cb) {
        return cb.value;
      });

    // selected price range (without using Array.prototype.find for compatibility)
    var selectedPrice = "all";
    for (var i = 0; i < priceFilters.length; i++) {
      if (priceFilters[i].checked) {
        selectedPrice = priceFilters[i].value;
        break;
      }
    }

    cards.forEach(function (card) {
      var name = (card.getAttribute("data-name") || "").toLowerCase();
      var area = (card.getAttribute("data-area") || "").toLowerCase();
      var priceStr = card.getAttribute("data-price") || "";
      var priceNum = parseInt(priceStr, 10) || 0;
      var sharing = card.getAttribute("data-sharing") || "";
      var text = card.textContent.toLowerCase();

      // text match
      var textMatch = !q || name.includes(q) || area.includes(q) || priceStr.includes(q) || text.includes(q);

      // sharing match
      var sharingMatch = !selectedSharing.length || selectedSharing.indexOf(sharing) !== -1;

      // price match
      var priceMatch = true;
      if (selectedPrice === "lt6000") priceMatch = priceNum < 6000;
      else if (selectedPrice === "6000to8000") priceMatch = priceNum >= 6000 && priceNum <= 8000;
      else if (selectedPrice === "gt8000") priceMatch = priceNum > 8000;

      var match = textMatch && sharingMatch && priceMatch;
      card.__matchesFilter = match;
    });

    // reset to first page whenever filters/search change
    currentPage = 1;
    showPage(currentPage);
  }

  input.addEventListener("input", applyFilters);
  sharingFilters.forEach(function (cb) {
    cb.addEventListener("change", applyFilters);
  });
  priceFilters.forEach(function (r) {
    r.addEventListener("change", applyFilters);
  });

  // dropdown toggle behaviour
  if (filterToggle && filterPanel) {
    filterToggle.addEventListener("click", function () {
      var isOpen = filterPanel.style.display === "block";
      filterPanel.style.display = isOpen ? "none" : "block";
    });

    document.addEventListener("click", function (e) {
      if (!filterPanel || !filterToggle) return;
      if (filterPanel.contains(e.target) || filterToggle.contains(e.target)) return;
      filterPanel.style.display = "none";
    });
  }

  // Load wishlist utilities if not already loaded
  if (typeof window.wishlistUtils === "undefined") {
    var script = document.createElement("script");
    script.src = "../js/wishlist.js";
    script.async = false; // Load synchronously so wishlistUtils is available immediately
    document.head.appendChild(script);
  }

  // initial render – fetch rooms data then apply filters + pagination
  var dataUrl = list.getAttribute("data-rooms-url") || "../data/boys-hostel-rooms.json";
  fetch(dataUrl)
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load rooms");
      return res.json();
    })
    .then(function (rooms) {
      renderRooms(rooms || []);
      applyFilters();
    })
    .catch(function () {
      // if fetch fails, keep any static cards (if present)
      cards = Array.prototype.slice.call(list.querySelectorAll(".product-card"));
      applyFilters();
    });
})();

// Horizontal room suggestions scroller
(function () {
  var scroller = document.getElementById("roomSuggestionsScroller");
  if (!scroller) return;

  var prev = document.getElementById("roomSuggestionsPrev");
  var next = document.getElementById("roomSuggestionsNext");
  var items = scroller.getElementsByClassName("room-suggestion");

  function scrollByItem(direction) {
    var firstItem = items.length ? items[0] : null;
    var delta = firstItem ? firstItem.offsetWidth + 10 : 240; // 10 = gap
    scroller.scrollBy({
      left: direction * delta,
      behavior: "smooth"
    });
  }

  if (prev) {
    prev.addEventListener("click", function () {
      scrollByItem(-1);
    });
  }

  if (next) {
    next.addEventListener("click", function () {
      scrollByItem(1);
    });
  }
})();

