
// NAVBAR MEGA MENUS
const megaMenu = document.getElementById("megaMenu");
const megaMain = document.getElementById("megaMain");
const megaQuick = document.getElementById("megaQuick");
const megaShop = document.getElementById("megaShop");

const menuData = {
  Store: {
    main: ["Shop the Latest", "Mac", "iPad", "iPhone", "Apple Watch"],
    quick: ["Find a Store", "Order Status", "Ways to Buy"],
    shop: ["Shop Accessories", "Apple Trade In", "Financing"]
  },
  Mac: {
    main: ["Explore All Mac", "MacBook Air", "MacBook Pro", "iMac", "Mac mini"],
    quick: ["Compare Mac", "Switch to Mac", "Why Mac"],
    shop: ["Shop Mac", "Mac Accessories", "Apple Trade In"]
  },
  iPhone: {
    main: ["Explore All iPhone", "iPhone Duo", "iPhone 18 Pro", "iPhone 18"],
    quick: ["Compare iPhone", "Switch from Android", "iPhone Accessories"],
    shop: ["Shop iPhone", "iPhone Support", "Apple Trade In"]
  },
  iPad: {
    main: ["Explore All iPad", "iPad Pro", "iPad Air", "iPad", "iPad mini"],
    quick: ["Compare iPad", "Why iPad", "iPadOS"],
    shop: ["Shop iPad", "iPad Accessories", "Apple Pencil"]
  },
  Watch: {
    main: ["Explore All Apple Watch", "Apple Watch Series 12", "Apple Watch Ultra", "Apple Watch SE"],
    quick: ["Compare Watch", "Why Apple Watch", "watchOS"],
    shop: ["Shop Apple Watch", "Watch Bands", "Apple Watch Support"]
  },
  AirPods: {
    main: ["Explore All AirPods", "AirPods Pro 3", "AirPods 4", "AirPods Max"],
    quick: ["Compare AirPods", "AirPods Features", "Audio"],
    shop: ["Shop AirPods", "AirPods Accessories", "Apple Music"]
  },
  "TV & Home": {
    main: ["Explore TV & Home", "Apple TV 4K", "Apple HomeView", "HomePod"],
    quick: ["Apple TV App", "Home App", "Home Accessories"],
    shop: ["Shop TV & Home", "TV Accessories", "HomePod Support"]
  },
  Entertainment: {
    main: ["Explore Entertainment", "Apple TV", "Apple Music", "Apple Arcade"],
    quick: ["Apple One", "Apple Podcasts", "Apple Books"],
    shop: ["Explore All Services", "Manage Subscriptions", "Support"]
  },
  Accessories: {
    main: ["Shop All Accessories", "Cases & Protection", "Chargers", "Audio"],
    quick: ["Made by Apple", "Beats", "New Accessories"],
    shop: ["Shop Accessories", "Find Accessories", "Order Status"]
  },
  Support: {
    main: ["iPhone Support", "Mac Support", "iPad Support", "Watch Support"],
    quick: ["AppleCare+", "Contact Apple", "Apple Support App"],
    shop: ["Check Coverage", "Repair Options", "User Guides"]
  }
};

function fillMenu(container, items) {
  container.innerHTML = "";

  items.forEach(item => {
    const link = document.createElement("a");
    link.href = "#products";
    link.textContent = item;
    container.appendChild(link);
  });
}

function openMegaMenu(name) {
  const data = menuData[name];
  if (!data) return;

  fillMenu(megaMain, data.main);
  fillMenu(megaQuick, data.quick);
  fillMenu(megaShop, data.shop);
  megaMenu.classList.add("open");
}

document.querySelectorAll(".nav-links a[data-menu]").forEach(link => {
  link.addEventListener("mouseenter", () => {
    if (window.innerWidth > 700) {
      openMegaMenu(link.dataset.menu);
    }
  });

  link.addEventListener("click", event => {
    if (window.innerWidth > 700) {
      event.preventDefault();
      openMegaMenu(link.dataset.menu);
    }
  });
});

megaMenu.addEventListener("mouseleave", () => {
  megaMenu.classList.remove("open");
});

document.querySelector(".navbar").addEventListener("mouseleave", () => {
  if (!megaMenu.matches(":hover")) {
    megaMenu.classList.remove("open");
  }
});


// SEARCH PANEL
const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const siteSearch = document.getElementById("siteSearch");
const bagPanel = document.getElementById("bagPanel");

searchBtn.addEventListener("click", () => {
  searchPanel.classList.toggle("open");
  bagPanel.classList.remove("open");
  megaMenu.classList.remove("open");

  if (searchPanel.classList.contains("open")) {
    siteSearch.focus();
  }
});

closeSearch.addEventListener("click", () => {
  searchPanel.classList.remove("open");
});

siteSearch.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const value = siteSearch.value.toLowerCase().trim();

    const targets = {
      iphone: "#iphone",
      duo: "#iphone",
      gifts: "#store",
      ipad: "#ipad",
      watch: "#watch",
      airpods: "#airpods",
      entertainment: "#entertainment"
    };

    const match = Object.keys(targets).find(key => value.includes(key));

    if (match) {
      window.location.hash = targets[match];
      searchPanel.classList.remove("open");
    }
  }
});


// BAG PANEL
const bagBtn = document.getElementById("bagBtn");
const closeBag = document.getElementById("closeBag");

bagBtn.addEventListener("click", () => {
  bagPanel.classList.toggle("open");
  searchPanel.classList.remove("open");
  megaMenu.classList.remove("open");
});

closeBag.addEventListener("click", () => {
  bagPanel.classList.remove("open");
});


// MOBILE MENU
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-open");

  mobileMenuBtn.textContent =
    navLinks.classList.contains("mobile-open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 700) {
      navLinks.classList.remove("mobile-open");
      mobileMenuBtn.textContent = "☰";
    }
  });
});


// CLOSE PANELS WHEN CLICKING OUTSIDE
document.addEventListener("click", event => {
  const insideNavbar = event.target.closest(".navbar");
  const insideSearch = event.target.closest("#searchPanel");
  const insideBag = event.target.closest("#bagPanel");
  const insideMenu = event.target.closest("#megaMenu");

  if (!insideNavbar && !insideSearch && !insideBag && !insideMenu) {
    searchPanel.classList.remove("open");
    bagPanel.classList.remove("open");
    megaMenu.classList.remove("open");
  }
});


// ENTERTAINMENT CAROUSEL
const track = document.getElementById("carouselTrack");
const cards = Array.from(track.querySelectorAll(".ent-card"));
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("carouselDots");

let currentSlide = 0;
let carouselTimer;

function getSlideStep() {
  if (!cards.length) return 0;

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

  return cardWidth + gap;
}

function getMaxSlide() {
  const visibleWidth = track.parentElement.clientWidth;
  const fullWidth = track.scrollWidth;

  return Math.max(
    0,
    Math.ceil((fullWidth - visibleWidth) / getSlideStep())
  );
}

function createDots() {
  dotsContainer.innerHTML = "";

  const count = getMaxSlide() + 1;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

    dot.addEventListener("click", () => {
      currentSlide = i;
      updateCarousel();
      restartCarousel();
    });

    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  const maxSlide = getMaxSlide();
  currentSlide = Math.min(currentSlide, maxSlide);

  track.style.transform =
    `translateX(-${currentSlide * getSlideStep()}px)`;

  dotsContainer.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  const maxSlide = getMaxSlide();

  currentSlide =
    currentSlide >= maxSlide ? 0 : currentSlide + 1;

  updateCarousel();
}

function previousSlide() {
  const maxSlide = getMaxSlide();

  currentSlide =
    currentSlide <= 0 ? maxSlide : currentSlide - 1;

  updateCarousel();
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 3500);
}

function restartCarousel() {
  startCarousel();
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  restartCarousel();
});

prevBtn.addEventListener("click", () => {
  previousSlide();
  restartCarousel();
});

const carouselWrap = document.querySelector(".carousel-wrap");

carouselWrap.addEventListener("mouseenter", () => {
  clearInterval(carouselTimer);
});

carouselWrap.addEventListener("mouseleave", startCarousel);

window.addEventListener("resize", () => {
  createDots();
  updateCarousel();
});

createDots();
updateCarousel();
startCarousel();


// SCROLL REVEAL
const revealItems = document.querySelectorAll(
  ".product-card, .entertainment, .footer-columns"
);

revealItems.forEach(item => {
  item.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealItems.forEach(item => {
  revealObserver.observe(item);
});


// ESC KEY
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    megaMenu.classList.remove("open");
    searchPanel.classList.remove("open");
    bagPanel.classList.remove("open");
    navLinks.classList.remove("mobile-open");
    mobileMenuBtn.textContent = "☰";
  }
});
