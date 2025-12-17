// Toggle( yang tadinya ngga ada jadi ga ada dan sebaliknya)Class Active
const navbarNav = document.querySelector(".navbar-nav");

// Ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  e.preventDefault(); // biar gak reload halaman
  shoppingCart.classList.toggle("active");
};

// Klik diluar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// modal box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");
const closeModal = document.querySelector(".close-icon");

// buka modal saat klik tombol detail
itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    itemDetailModal.style.display = "flex";
  };
});

// tutup modal saat klik tombol X
closeModal.onclick = (e) => {
  e.preventDefault();
  itemDetailModal.style.display = "none";
};

// tutup modal kalau klik di luar area modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".collection-item")];
  const btnLeft = document.querySelector(".slider-btn.left");
  const btnRight = document.querySelector(".slider-btn.right");

  let centerIndex = Math.floor(items.length / 2);

  function updateCarousel() {
    const total = items.length;

    // reset semua
    items.forEach((item) => {
      item.classList.remove("pos-0", "pos-1", "pos-2", "pos-3", "pos-4");
      item.style.opacity = "0";
    });

    // isi SELALU 5 slot
    for (let slot = -2; slot <= 2; slot++) {
      const itemIndex = (centerIndex + slot + total) % total;

      const posClass = `pos-${slot + 2}`;
      const item = items[itemIndex];

      item.classList.add(posClass);
      item.style.opacity = "";
    }
  }

  // function updateCarousel() {
  //   items.forEach((item, i) => {
  //     item.classList.remove("pos-0", "pos-1", "pos-2", "pos-3", "pos-4");

  //     const pos = i - centerIndex + 2;

  //     if (pos >= 0 && pos <= 4) {
  //       item.classList.add(`pos-${pos}`);
  //       item.style.opacity = "";
  //     } else {
  //       item.style.opacity = "0";
  //     }
  //   });
  // }

  // btnRight.addEventListener("click", () => {
  //   if (centerIndex < items.length - 3) {
  //     centerIndex++;
  //     updateCarousel();
  //   }
  // });

  // btnLeft.addEventListener("click", () => {
  //   if (centerIndex > 2) {
  //     centerIndex--;
  //     updateCarousel();
  //   }
  // });
  btnRight.addEventListener("click", () => {
    centerIndex = (centerIndex + 1) % items.length;
    updateCarousel();
  });

  btnLeft.addEventListener("click", () => {
    centerIndex = (centerIndex - 1 + items.length) % items.length;
    updateCarousel();
  });

  updateCarousel();
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("reviewContainer");

  let isDown = false;
  let startX;
  let scrollLeft;

  const SPEED = 0.5; // 🔥 SEMAKIN KECIL = SEMAKIN LAMBAT (0.3 – 0.6 ideal)

  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("dragging");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mouseup", () => {
    isDown = false;
    container.classList.remove("dragging");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * SPEED; // 🔥 DI SINI DIPERLAMBAT
    container.scrollLeft = scrollLeft - walk;
  });
});
