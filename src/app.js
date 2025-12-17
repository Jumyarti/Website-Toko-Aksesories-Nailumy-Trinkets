document.addEventListener("alpine:init", () => {
  Alpine.store("search", {
    query: "",
  });
  Alpine.store("modal", {
    open: false,
    item: null,
  });

  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Jedai Kupu-kupu",
        img: "11.jpg",
        price: 15000,
        rating: 4,
        desc: "Jedai rambut pastel lucu, ringan dan nyaman dipakai seharian.",
      },
      {
        id: 2,
        name: "Kalung",
        img: "12.1.jpg",
        price: 20000,
        desc: "Kalung bunga kristal dengan kilau elegan dan manis.",
      },
      {
        id: 3,
        name: "Gelang",
        img: "13.1.jpg",
        price: 17000,
        desc: "Gelang manik imut dengan warna pastel yang ceria.",
      },
      {
        id: 4,
        name: "Anting",
        img: "14.jpg",
        price: 15000,
        desc: "Anting ringan, tidak bikin telinga sakit, cocok daily look.",
      },
      {
        id: 5,
        name: "Bando",
        img: "17.jpg",
        price: 24000,
        desc: "Bando simple dengan desain clean dan estetik.",
      },
      {
        id: 6,
        name: "Cincin",
        img: "16.1.jpg",
        price: 5000,
        desc: "Cincin lucu dengan detail unik, bikin tampilan makin manis.",
      },
      {
        id: 7,
        name: "Jepit Rambut",
        img: "15.1.jpg",
        price: 23000,
        desc: "Jepit Rambut lucu dengan detail unik, bikin tampilan makin manis.",
      },
      {
        id: 8,
        name: "Kaca Mata",
        img: "18.jpg",
        price: 25000,
        desc: "Jepit Rambut lucu dengan detail unik, bikin tampilan makin manis.",
      },
      {
        id: 9,
        name: "Jedai",
        img: "21.jpg",
        price: 15000,
        desc: "Jedai Rambut lucu dengan detail unik, bikin tampilan makin manis.",
      },
    ],
    get filteredItems() {
      const q = this.$store.search.query.toLowerCase();

      if (!q) return this.items;

      return this.items.filter((item) => item.name.toLowerCase().includes(q));
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda  atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika sudah ada , tambah quantity dan ditotalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol chekout diklik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMassage(objData);
  // window.open("http://wa.me/6285208579227?text=" + encodeURIComponent(message));
  // console.log(objData);

  // minta transsaction token menggunakan ajak/fetch
  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });

    const token = await response.text();

    window.snap.pay(token, {
      onSuccess: function (result) {
        showSuccessOverlay();
        setTimeout(() => {
          window.location.href = "success.html";
        }, 10000);
      },
      onPending: function () {
        window.location.href = "pending.html";
      },
      onError: function () {
        window.location.href = "error.html";
      },
      onClose: function () {
        alert("Pembayaran dibatalkan");
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

// format pesan whatshapp
const formatMassage = (obj) => {
  return `Data Customer
Nama   : ${obj.name}
Email  : ${obj.email}
No Hp : ${obj.phone}
Alamat : ${obj.address}

Data Pesanan
${JSON.parse(obj.items)
  .map((item) => `- ${item.name} (${item.quantity} x ${rupiah(item.price)})`)
  .join("\n")}

Total : ${rupiah(obj.total)}

Terima Kasih.`;
};

// konversi kerupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
