# 🛍️ Nailumy Trinkets – Web Store with Midtrans Payment

Nailumy Trinkets adalah website toko aksesoris berbasis web yang menyediakan katalog produk, keranjang belanja, dan sistem pembayaran online menggunakan **Midtrans Snap**.

Project ini dibuat sebagai web store sederhana namun fungsional dengan pendekatan **frontend ringan (HTML, CSS, AlpineJS)** dan **backend PHP** untuk proses checkout & payment gateway.

---

## ✨ Fitur Utama

- Landing page & katalog produk
- Pencarian produk (real-time search)
- Shopping cart (add / remove / update quantity)
- Modal detail produk
- Form checkout (Nama, Email, Alamat, Telepon)
- Integrasi **Midtrans Snap**
- Handling status pembayaran:
  - Success
  - Pending
  - Error
  - Cancel
- Tampilan responsif (Desktop & Mobile)

---

## 🛠️ Teknologi yang Digunakan

### 🔹 Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- **Alpine.js v3**
- Feather Icons
- Google Fonts

### 🔹 Backend
- PHP >= 8.0
- Midtrans PHP SDK
- Fetch API (AJAX)

---

## 📁 Struktur Folder Project

tokoaksesories/
│
├── index.html
│
├── css/
│ └── style.css
│
├── js/
│ └── script.js
│
├── src/
│ └── app.js
│
├── php/
│ ├── midtrans-php-master/
│ └── placeOrder.php
│
├── images/
│ ├── finance/
│ ├── products/
│ ├── koleksi/
│ ├── review/
│ ├── system/
│ ├── about.jpg
│ └── bg.jpg
│
├── README.md
└── requirements.txt


---

## 🚀 Cara Menjalankan Project (Local)

### 1️⃣ Persiapan Environment

Pastikan sudah terinstall:
- **XAMPP + PHP**
- PHP versi **8.0 atau lebih baru**

Letakkan project di folder:
htdocs/tokoaksesories/


Akses melalui browser:
http://localhost/tokoaksesories/

---

### 2️⃣ Konfigurasi Midtrans (Sandbox)

#### Ambil Key Midtrans
1. Login ke Midtrans Dashboard  
   👉 https://dashboard.midtrans.com
2. Pilih mode **Sandbox**
3. Salin:
   - **Client Key**
   - **Server Key**

---

### 3️⃣ Setting Client Key (Frontend)

Di file `index.html`:

```html
<script
      type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="Mid-client-EWrVtbveULVCuyIS"
    ></script>

---

4️⃣ Setting Server Key (Backend)

Di file php/placeOrder.php:

\Midtrans\Config::$serverKey = 'Mid-server-NS1uGnx1QgfZRWAELhsal8fX';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

Alur Checkout & Pembayaran
User memilih produk
Produk masuk ke keranjang
User mengisi form checkout
Sistem mengirim data ke placeOrder.php
Server meminta Snap Token ke Midtrans
Popup Midtrans Snap muncul
Pilih metode pembayaran GoPay
Midtrans menampilkan QR / Payment Link
QR / Link disalin (Copy)
Lakukan simulasi pembayaran GoPay
Cek status transaksi di Dashboard Midtrans (Sandbox)


