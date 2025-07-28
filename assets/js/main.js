/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== Menu Show =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabsContents.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");
  });
});

  // Get DOM elements








const products = Array.from(document.querySelectorAll(".product__item"));
const brandFilter = document.getElementById("brand");
const typeFilter = document.getElementById("type");
const priceFilter = document.getElementById("price");
const applyBtn = document.querySelector(".apply-btn");
const resetBtn = document.querySelector(".reset-btn");
const totalDisplay = document.querySelector(".total__products span");

const productsPerPage = 12;
let filteredProducts = [...products];

// Parse price range string into number range
function parsePrice(priceRange) {
  if (!priceRange) return [0, Infinity];
  const [min, max] = priceRange.split("-").map(Number);
  return [min, max];
}

// Get the filtered list of products
function getFiltered() {
  const brand = brandFilter.value;
  const type = typeFilter.value;
  const [min, max] = parsePrice(priceFilter.value);

  return products.filter(p => {
    const pBrand = p.dataset.brand;
    const pType = p.dataset.type;
    const pPrice = parseInt(p.dataset.price);

    const matchBrand = !brand || brand === pBrand;
    const matchType = !type || type === pType;
    const matchPrice = pPrice >= min && pPrice <= max;

    return matchBrand && matchType && matchPrice;
  });
}

// Display first 12 filtered products, hide others
function showProducts(productList) {
  products.forEach(p => p.style.display = "none");

  productList.slice(0, productsPerPage).forEach(p => {
    p.style.display = "block";
  });

  if (totalDisplay) {
    totalDisplay.textContent = productList.length;
  }
}

// Event listeners
applyBtn.addEventListener("click", () => {
  filteredProducts = getFiltered();
  showProducts(filteredProducts);
});

resetBtn.addEventListener("click", () => {
  brandFilter.value = "";
  typeFilter.value = "";
  priceFilter.value = "";

  filteredProducts = [...products];
  showProducts(filteredProducts);
});

// Initial display
showProducts(filteredProducts);




// ========== ADD TO CART ==========
// document.querySelectorAll('.cart__btn').forEach((btn, index) => {
//   btn.addEventListener('click', function (e) {
//     e.preventDefault();

//     const product = btn.closest('.product__item');
//     const productTitle = product.querySelector('.product__title').textContent.trim();
//     const productImage = product.querySelector('.product__img.default').getAttribute('src');
//     const productPrice = parseInt(product.dataset.price);
//     const productId = `${productTitle}-${index}`; // simple unique ID

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     const existing = cart.find(item => item.id === productId);
//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       cart.push({
//         id: productId,
//         title: productTitle,
//         image: productImage,
//         price: productPrice,
//         quantity: 1
//       });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     alert(`${productTitle} added to cart`);
//   });
// });

// Add to cart functionality
document.querySelectorAll('.cart__btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const product = btn.closest('.product__item');
    const productData = {
      name: product.querySelector('.product__title').textContent,
      price: product.getAttribute('data-price'),
      image: product.querySelector('.product__img.default').getAttribute('src'),
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productData);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart!');
  });
});


  