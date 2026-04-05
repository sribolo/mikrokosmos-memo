let state = {
    owned: {},
    wishlist: {},
    favorites: {},
    activity: [],
    search: "",
    era: "All",
    version: "All",
    member: "All",
    status: "all",
    type: "All",
    wishlistMode: false
  };
  
let newsIndex = 0;
let serverSaveTimer = null;
let canSyncStateToServer = true;
let cardsCatalog = Array.isArray(CARDS) ? [...CARDS] : [];
let newsItemsCatalog = Array.isArray(NEWS_ITEMS) ? [...NEWS_ITEMS] : [];

  function staticAsset(path) {
    const base = window.STATIC_URL || "/static/";
    const normalized = String(path || "");
    if (!normalized) return "";
    if (/^(https?:)?\/\//.test(normalized) || normalized.startsWith("/media/")) {
      return normalized;
    }
    return `${base}${normalized.replace(/^\/+/, "")}`;
  }

  function getCsrfToken() {
    if (window.CSRF_TOKEN) return window.CSRF_TOKEN;
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    return cookieValue || "";
  }

  function applyProfilePhoto(photoDataUrl) {
    const profileIcons = document.querySelectorAll(".profile-icon");
    const bannerAvatar = document.getElementById("profileBannerAvatarImage");

    profileIcons.forEach((icon) => {
      if (!photoDataUrl) {
        icon.classList.remove("has-photo");
        const fallback = icon.dataset.fallback;
        if (fallback) {
          icon.textContent = fallback;
        }
        return;
      }

      if (!icon.dataset.fallback) {
        icon.dataset.fallback = icon.textContent.trim();
      }
      icon.classList.add("has-photo");
      icon.innerHTML = `<img src="${photoDataUrl}" alt="Profile picture">`;
    });

    if (bannerAvatar && photoDataUrl) {
      bannerAvatar.src = photoDataUrl;
    }
  }

  function applyHeaderPhoto(photoDataUrl) {
    const headerImage = document.getElementById("profileHeaderImage");
    if (headerImage && photoDataUrl) {
      headerImage.src = photoDataUrl;
    }
  }

  async function loadProfilePhotoFromServer() {
    try {
      const response = await fetch("/accounts/profile/photo/", {
        method: "GET",
        credentials: "same-origin"
      });
      if (response.status === 401 || !response.ok) return;

      const payload = await response.json();
      if (!payload) return;
      if (payload.photo_url) applyProfilePhoto(payload.photo_url);
      if (payload.header_photo_url) applyHeaderPhoto(payload.header_photo_url);
    } catch (error) {
      console.error("Failed to load profile photo:", error);
    }
  }

  async function uploadProfileMedia(kind, file) {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("kind", kind);

    const response = await fetch("/accounts/profile/photo/upload/", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": getCsrfToken()
      },
      body: formData
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Could not upload media.");
    }
    if (payload.photo_url) applyProfilePhoto(payload.photo_url);
    if (payload.header_photo_url) applyHeaderPhoto(payload.header_photo_url);
  }

  async function removeProfileMedia(kind) {
    const formData = new FormData();
    formData.append("kind", kind);
    formData.append("remove", "1");

    const response = await fetch("/accounts/profile/photo/upload/", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "X-CSRFToken": getCsrfToken()
      },
      body: formData
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Could not remove media.");
    }
    if (kind === "photo") {
      window.location.reload();
      return;
    }
    window.location.reload();
  }

  function setupProfilePhotoUpload() {
    const headerTrigger = document.getElementById("headerPhotoTrigger");
    const editMenu = document.getElementById("profileEditMenu");
    const chooseHeaderPhotoBtn = document.getElementById("chooseHeaderPhotoBtn");
    const chooseProfilePhotoBtn = document.getElementById("chooseProfilePhotoBtn");
    const photoInput = document.getElementById("profilePhotoInput");
    const headerInput = document.getElementById("headerPhotoInput");
    if (!photoInput || !headerInput) return;

    if (headerTrigger) {
      headerTrigger.onclick = (event) => {
        event.stopPropagation();
        if (!editMenu) {
          headerInput.click();
          return;
        }
        editMenu.classList.toggle("hidden");
      };
    }

    if (chooseHeaderPhotoBtn) {
      chooseHeaderPhotoBtn.onclick = () => {
        if (editMenu) editMenu.classList.add("hidden");
        headerInput.click();
      };
    }

    if (chooseProfilePhotoBtn) {
      chooseProfilePhotoBtn.onclick = () => {
        if (editMenu) editMenu.classList.add("hidden");
        photoInput.click();
      };
    }

    document.addEventListener("click", (event) => {
      if (!editMenu || editMenu.classList.contains("hidden")) return;
      const target = event.target;
      if (target === headerTrigger || editMenu.contains(target)) return;
      editMenu.classList.add("hidden");
    });

    photoInput.onchange = (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      uploadProfileMedia("photo", file).catch((error) => {
        console.error("Failed to upload profile photo:", error);
        window.alert(error.message || "Could not upload profile photo.");
      });
      event.target.value = "";
    };

    headerInput.onchange = (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      uploadProfileMedia("header", file).catch((error) => {
        console.error("Failed to upload header photo:", error);
        window.alert(error.message || "Could not upload header photo.");
      });
      event.target.value = "";
    };
  }

  function sanitizeState(payload) {
    if (!payload || typeof payload !== "object") return { ...state };

    return {
      ...state,
      ...payload,
      owned: payload.owned && typeof payload.owned === "object" ? payload.owned : {},
      favorites:
        payload.favorites && typeof payload.favorites === "object" ? payload.favorites : {},
      wishlist:
        payload.wishlist && typeof payload.wishlist === "object" ? payload.wishlist : {},
      activity: Array.isArray(payload.activity) ? payload.activity.slice(0, 12) : []
    };
  }

  function hasCollectionData(candidateState) {
    const ownedCount = Object.keys(candidateState.owned || {}).length;
    const wishlistCount = Object.keys(candidateState.wishlist || {}).length;
    return ownedCount > 0 || wishlistCount > 0;
  }
  
  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      state = sanitizeState(JSON.parse(saved));
    } catch (error) {
      console.error("Failed to load state:", error);
    }
  }

  async function loadStateFromServer() {
    try {
      const response = await fetch("/api/state/", {
        method: "GET",
        credentials: "same-origin"
      });
      if (response.status === 401) {
        canSyncStateToServer = false;
        return;
      }
      if (!response.ok) return;

      const payload = await response.json();
      const serverState = sanitizeState(payload.state);
      if (hasCollectionData(serverState)) {
        state = serverState;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        renderCurrentPage();
        return;
      }

      if (hasCollectionData(state)) {
        saveStateToServer();
      }
    } catch (error) {
      console.error("Failed to sync state from server:", error);
    }
  }

  function sanitizeCard(card) {
    return {
      id: card.id,
      era: card.era || "",
      version: card.version || "",
      member: card.member || "",
      image: card.image || "",
      type: card.type || "",
    };
  }

  async function loadCardsFromServer() {
    try {
      const response = await fetch("/api/cards/", {
        method: "GET",
        credentials: "same-origin",
      });
      if (!response.ok) return;

      const payload = await response.json();
      if (!payload || !Array.isArray(payload.cards) || payload.cards.length === 0) return;

      cardsCatalog = payload.cards
        .filter((card) => card && typeof card === "object" && card.id)
        .map(sanitizeCard);
      renderCurrentPage();
    } catch (error) {
      console.error("Failed to load cards from server:", error);
    }
  }

  async function loadNewsFromServer() {
    try {
      const response = await fetch("/api/news/", {
        method: "GET",
        credentials: "same-origin",
      });
      if (!response.ok) return;

      const payload = await response.json();
      if (!payload || !Array.isArray(payload.news) || payload.news.length === 0) return;

      newsItemsCatalog = payload.news.filter(
        (item) => item && item.title && item.text && item.link
      );

      if (newsIndex >= newsItemsCatalog.length) {
        newsIndex = 0;
      }
      renderCurrentPage();
    } catch (error) {
      console.error("Failed to load news from server:", error);
    }
  }

  function queueServerSave() {
    if (serverSaveTimer) clearTimeout(serverSaveTimer);
    serverSaveTimer = setTimeout(saveStateToServer, 250);
  }

  async function saveStateToServer() {
    if (!canSyncStateToServer) return;

    try {
      const response = await fetch("/api/state/", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken()
        },
        body: JSON.stringify({ state })
      });

      if (response.status === 401) {
        canSyncStateToServer = false;
      }
    } catch (error) {
      console.error("Failed to sync state to server:", error);
    }
  }
  
  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    queueServerSave();
  }

  function isOwned(id) {
    return !!state.owned[id];
  }
  
  function isWishlisted(id) {
    return !!state.wishlist[id];
  }

  function isFavorite(id) {
    return !!state.favorites[id];
  }
  
  function isSoloAlbum(card) {
    return SOLO_ALBUMS.includes(card.era);
  }

  function findCardById(id) {
    return cardsCatalog.find((card) => card.id === id) || null;
  }

  function recordActivity(action, card) {
    if (!card) return;

    const labels = {
      owned_added: "Marked as owned",
      owned_removed: "Removed from owned",
      wishlist_added: "Added to wishlist",
      wishlist_removed: "Removed from wishlist",
      favorite_added: "Added to favorites",
      favorite_removed: "Removed from favorites"
    };

    state.activity = [
      {
        action,
        label: labels[action] || "Updated collection",
        cardId: card.id,
        member: card.member || "",
        era: card.era || "",
        version: card.version || "",
        at: new Date().toISOString()
      },
      ...(Array.isArray(state.activity) ? state.activity : [])
    ].slice(0, 12);
  }

  function toggleOwned(id) {
    const card = findCardById(id);
    if (isOwned(id)) {
      delete state.owned[id];
      recordActivity("owned_removed", card);
    } else {
      state.owned[id] = true;
      delete state.wishlist[id];
      recordActivity("owned_added", card);
    }
    saveState();
    renderCurrentPage();
  }
  
  function toggleWishlist(id) {
    const card = findCardById(id);
    if (isWishlisted(id)) {
      delete state.wishlist[id];
      recordActivity("wishlist_removed", card);
    } else {
      state.wishlist[id] = true;
      delete state.owned[id];
      recordActivity("wishlist_added", card);
    }
    saveState();
    renderCurrentPage();
  }

  function toggleFavorite(id) {
    const card = findCardById(id);
    if (isFavorite(id)) {
      delete state.favorites[id];
      recordActivity("favorite_removed", card);
    } else {
      state.favorites[id] = true;
      recordActivity("favorite_added", card);
    }
    saveState();
    renderCurrentPage();
  }

  function applyCardClick(id) {
    if (state.wishlistMode) {
      toggleWishlist(id);
    } else {
      toggleOwned(id);
    }
  }
  
  function getUniqueValues(key) {
      const values = [...new Set(cardsCatalog.map(card => card[key]))];
    
      if (key === "era") {
        const group = values.filter(v => !SOLO_ALBUMS.includes(v));
        const solo = values.filter(v => SOLO_ALBUMS.includes(v));
    
        return [
          "All",
          ...group,
          "──────────",
          ...solo
        ];
      }
    
      return ["All", ...values];
  }
  
  function fillSelect(selectId, values, selectedValue) {
    const el = document.getElementById(selectId);
    if (!el) return;
  
    el.innerHTML = values
      .map(value => `<option value="${value}">${value}</option>`)
      .join("");
    el.value = selectedValue;
  }
  
  function renderCounts() {
    const ownedCount = Object.keys(state.owned).length;
    const wishlistCount = Object.keys(state.wishlist).length;
    const totalCount = cardsCatalog.length;
    const missingCount = totalCount - ownedCount - wishlistCount;
    const completionPct = totalCount ? Math.round((ownedCount / totalCount) * 100) : 0;
  
    document.querySelectorAll("#ownedCount").forEach(el => el.textContent = ownedCount);
    document.querySelectorAll("#wishlistCount").forEach(el => el.textContent = wishlistCount);
    document.querySelectorAll("#totalCount").forEach(el => el.textContent = totalCount);
    document.querySelectorAll("#missingCount").forEach(el => el.textContent = missingCount);
    document.querySelectorAll("#completionPct").forEach(el => el.textContent = `${completionPct}%`);
  
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    if (progressFill) progressFill.style.width = `${completionPct}%`;
    if (progressText) progressText.textContent = `${ownedCount} of ${totalCount} cards collected`;
  }

  function toggleFromButton(event, action, id) {
    event.stopPropagation();
    if (action === "owned") toggleOwned(id);
    if (action === "wishlist") toggleWishlist(id);
    if (action === "favorite") toggleFavorite(id);
  }
  
  function createCardHTML(card) {
    const owned = isOwned(card.id);
    const wishlisted = isWishlisted(card.id);
    const favorite = isFavorite(card.id);
  
    const currentPage = document.body.dataset.page;
    const isOwnedPage = currentPage === "owned";
    const isWishlistPage = currentPage === "wishlist";
  
    const visual = card.image
      ? `<img src="${staticAsset(card.image)}" alt="${card.member} ${card.era}${card.version ? ` ${card.version}` : ""} photocard">`
      : `
        <div class="visual-fallback">
          <div>
            <span>${card.member.charAt(0)}</span>
            <p class="card-subtext">${card.member}</p>
          </div>
        </div>
      `;
  
    const versionLine =
      card.version && card.era !== "All"
        ? `<br>${card.version}`
        : "";
  
    let actionsHTML = `
      <div class="photocard-actions">
        <button type="button" class="mini-btn ${owned ? "active-owned" : ""}" onclick="toggleFromButton(event, 'owned', '${card.id}')">
          ${owned ? "Owned ✓" : "Owned"}
        </button>
        <button type="button" class="mini-btn ${wishlisted ? "active-wishlist" : ""}" onclick="toggleFromButton(event, 'wishlist', '${card.id}')">
          ${wishlisted ? "Wishlisted ♥" : "Wishlist"}
        </button>
      </div>
    `;

    let visualClick = `onclick="applyCardClick('${card.id}')"`;

    if (isOwnedPage) {
      visualClick = "";
      actionsHTML = `
        <div class="photocard-actions">
          <button type="button" class="mini-btn active-owned" onclick="toggleFromButton(event, 'owned', '${card.id}')">
            Remove Owned
          </button>
        </div>
      `;
    }
  
    if (isWishlistPage) {
      visualClick = "";
      actionsHTML = `
        <div class="photocard-actions">
          <button type="button" class="mini-btn active-wishlist" onclick="toggleFromButton(event, 'wishlist', '${card.id}')">
            Remove Wishlist
          </button>
        </div>
      `;
    }
  
    return `
      <article class="photocard">
        <div class="photocard-visual" ${visualClick}>
          ${visual}
          <div class="badge-wrap">
            ${isSoloAlbum(card) ? `<span class="badge badge-solo">Solo</span>` : ""}
            ${owned ? `<span class="badge badge-owned">Owned</span>` : ""}
            ${wishlisted ? `<span class="badge badge-wishlist">Wishlist</span>` : ""}
          </div>
        </div>
  
        <div class="photocard-body">
          <h4 class="photocard-title">${card.member}</h4>
          <p class="photocard-meta">${card.era}${versionLine}</p>
          ${actionsHTML}
        </div>
      </article>
    `;
  }

  function getAlbumOrderIndex(era) {
    const index = ALBUM_ORDER.indexOf(era);
    return index === -1 ? ALBUM_ORDER.length + 100 : index;
  }

  function getMemberOrderIndex(member) {
    const index = MEMBER_ORDER.indexOf(member);
    return index === -1 ? MEMBER_ORDER.length + 100 : index;
  }
  
  function sortCardsChronologically(cards) {
    return [...cards].sort((a, b) => {
      const eraA = getAlbumOrderIndex(a.era);
      const eraB = getAlbumOrderIndex(b.era);
  
      if (eraA !== eraB) return eraA - eraB;

      if (a.era !== b.era) {
        return a.era.localeCompare(b.era);
      }

      const versionA = a.version || "";
      const versionB = b.version || "";
  
      if (versionA !== versionB) {
        return versionA.localeCompare(versionB, undefined, { numeric: true });
      }

      const memberA = getMemberOrderIndex(a.member);
      const memberB = getMemberOrderIndex(b.member);

      if (memberA !== memberB) return memberA - memberB;
  
      return a.member.localeCompare(b.member);
    });
  }

  function filteredCards() {
    return cardsCatalog.filter(card => {
      const searchMatch =
        !state.search ||
        `${card.era} ${card.version} ${card.member}`.toLowerCase().includes(state.search.toLowerCase());
  
      const eraMatch = state.era === "All" || card.era === state.era;
      const versionMatch = state.version === "All" || card.version === state.version;
      const memberMatch = state.member === "All" || card.member === state.member;
  
      let statusMatch = true;
      if (state.status === "owned") statusMatch = isOwned(card.id);
      if (state.status === "wishlist") statusMatch = isWishlisted(card.id);
      if (state.status === "missing") statusMatch = !isOwned(card.id) && !isWishlisted(card.id);
  
      const typeMatch =
      state.type === "All" ||
      (state.type === "Solo" && isSoloAlbum(card)) ||
      (state.type === "BTS" && !isSoloAlbum(card));

    return searchMatch && eraMatch && versionMatch && memberMatch && statusMatch && typeMatch;
  });
  }
  
  function renderHomePage() {
    const featuredEl = document.getElementById("featuredNewsCard");
    const gridEl = document.getElementById("newsGrid");
    if (!featuredEl || !gridEl) return;

    if (!newsItemsCatalog.length) {
      featuredEl.innerHTML = `
        <span class="tag">Update</span>
        <h4>No news yet</h4>
        <p>Add news items in admin to populate this section.</p>
      `;
      gridEl.innerHTML = "";
      return;
    }
  
    const featured = newsItemsCatalog[newsIndex];
    const others = newsItemsCatalog.filter((_, index) => index !== newsIndex);
  
    featuredEl.innerHTML = `
      <span class="tag">${featured.tag}</span>
      <h4>${featured.title}</h4>
      <p>${featured.text}</p>
      <a href="${featured.link}" class="news-link">Read more</a>
    `;
  
    gridEl.innerHTML = others.map(item => `
      <article class="news-card">
        <span class="tag">${item.tag}</span>
        <h4>${item.title}</h4>
        <p>${item.text}</p>
        <a href="${item.link}" class="news-link">Open story</a>
      </article>
    `).join("");
  
    const prevBtn = document.getElementById("prevNewsBtn");
    const nextBtn = document.getElementById("nextNewsBtn");
  
    if (prevBtn) {
      prevBtn.onclick = () => {
        newsIndex = (newsIndex - 1 + newsItemsCatalog.length) % newsItemsCatalog.length;
        renderHomePage();
      };
    }
  
    if (nextBtn) {
      nextBtn.onclick = () => {
        newsIndex = (newsIndex + 1) % newsItemsCatalog.length;
        renderHomePage();
      };
    }
  }

  function renderOwnedPage() {
    const grid = document.getElementById("ownedGrid");
    if (!grid) return;
  
    const cards = sortCardsChronologically(
      cardsCatalog.filter(card => isOwned(card.id))
    );
  
    grid.innerHTML = cards.length
      ? cards.map(createCardHTML).join("")
      : `
        <div class="empty-state">
          <h3>No owned cards yet</h3>
          <p>Mark cards as owned from the collection page.</p>
        </div>
      `;

  }
  
  function getVersionsForEra(selectedEra) {
    if (selectedEra === "All") return ["All"];
  
    const versions = cardsCatalog
      .filter(card => card.era === selectedEra && card.version)
      .map(card => card.version);
  
    return ["All", ...new Set(versions)];
  }
  
  function getMembersForEra(selectedEra) {
    if (selectedEra === "All") return MEMBERS;
  
    const members = cardsCatalog
      .filter(card => card.era === selectedEra)
      .map(card => card.member);
  
    return ["All", ...new Set(members)];
  }

  function setupCollectionFilters() {
    fillSelect("eraFilter", getUniqueValues("era"), state.era);
    fillSelect("versionFilter", getVersionsForEra(state.era), state.version);
    fillSelect("memberFilter", getMembersForEra(state.era), state.member);

    const searchInput = document.getElementById("searchInput");
    const eraFilter = document.getElementById("eraFilter");
    const versionFilter = document.getElementById("versionFilter");
    const memberFilter = document.getElementById("memberFilter");
    const statusFilter = document.getElementById("statusFilter");
    const typeFilter = document.getElementById("typeFilter");
    const toggleWishlistModeBtn = document.getElementById("toggleWishlistModeBtn");
  
    if (searchInput) {
      searchInput.value = state.search;
      searchInput.oninput = (e) => {
        state.search = e.target.value;
        saveState();
        renderCurrentPage();
      };
    }
  
    if (eraFilter) {
      eraFilter.onchange = (e) => {
        state.era = e.target.value;
        state.version = "All";
        state.member = "All";
        saveState();
        renderCurrentPage();
      };
    }
  
    if (versionFilter) {
      versionFilter.onchange = (e) => {
        state.version = e.target.value;
        versionFilter.disabled = state.era === "All";
        saveState();
        renderCurrentPage();
      };
    }
  
    if (memberFilter) {
      memberFilter.onchange = (e) => {
        state.member = e.target.value;
        saveState();
        renderCurrentPage();
      };
    }
  
    if (statusFilter) {
      statusFilter.value = state.status;
      statusFilter.onchange = (e) => {
        state.status = e.target.value;
        saveState();
        renderCurrentPage();
      };
    }

    if (typeFilter) {
      typeFilter.value = state.type;
      typeFilter.onchange = (e) => {
        state.type = e.target.value;
        saveState();
        renderCurrentPage();
      };
    }

    if (toggleWishlistModeBtn) {
      toggleWishlistModeBtn.textContent = `Wishlist Mode: ${state.wishlistMode ? "On" : "Off"}`;
      toggleWishlistModeBtn.onclick = () => {
        state.wishlistMode = !state.wishlistMode;
        saveState();
        renderCurrentPage();
      };
    }
  }
  
  function renderCollectionPage() {
    setupCollectionFilters();
  
    const grid = document.getElementById("collectionGrid");
    if (!grid) return;
  
    const cards = sortCardsChronologically(filteredCards());
  
    grid.innerHTML = cards.length
      ? cards.map(createCardHTML).join("")
      : `
        <div class="empty-state">
          <h3>No cards found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      `;
  
  }
  
  function renderWishlistPage() {
    const grid = document.getElementById("wishlistGrid");
    if (!grid) return;
  
    const cards = sortCardsChronologically(
      cardsCatalog.filter(card => isWishlisted(card.id))
    );
  
    grid.innerHTML = cards.length
      ? cards.map(createCardHTML).join("")
      : `
        <div class="empty-state">
          <h3>Your wishlist is empty</h3>
          <p>Add cards from the collection page.</p>
        </div>
      `;

  }
  
  function renderStatsPage() {
    const memberStatsGrid = document.getElementById("memberStatsGrid");
    if (!memberStatsGrid) return;
  
    const membersOnly = MEMBERS.filter(member => member !== "All");
  
    memberStatsGrid.innerHTML = membersOnly.map(member => {
      const memberCards = cardsCatalog.filter(card => card.member === member);
      const owned = memberCards.filter(card => isOwned(card.id)).length;
      const total = memberCards.length;
      const pct = total ? Math.round((owned / total) * 100) : 0;
  
      return `
        <div class="member-stat">
          <h4>${member}</h4>
          <p class="card-subtext">${owned}/${total} collected</p>
          <p class="card-subtext">${pct}% complete</p>
        </div>
      `;
    }).join("");
  }
  
  function exportData() {
    const payload = {
      exportedAt: new Date().toISOString(),
      state
    };
  
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });
  
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bts-hub-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function renderCurrentPage() {
    renderCounts();
  
    const page = document.body.dataset.page;
  
    if (page === "home") renderHomePage();
    if (page === "collection") renderCollectionPage();
    if (page === "owned") renderOwnedPage();
    if (page === "wishlist") renderWishlistPage();
    if (page === "stats") renderStatsPage();
  }
  
  loadState();
  initTheme();
  renderCurrentPage();
  setupProfilePhotoUpload();
  loadProfilePhotoFromServer();
  loadCardsFromServer();
  loadNewsFromServer();
  loadStateFromServer();
