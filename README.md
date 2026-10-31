# Dompetku

Aplikasi pencatat keuangan pribadi (PWA). Satu file `index.html`, tanpa build, bisa dipasang di layar utama Chrome Android.

## Isi proyek
| File | Fungsi |
|---|---|
| `index.html` | seluruh aplikasi |
| `manifest.webmanifest` | metadata PWA (nama, ikon, warna) |
| `sw.js` | service worker, agar app tetap terbuka saat offline |
| `icons/` | ikon 192, 512, maskable, apple-touch, favicon |
| `vercel.json` | header untuk Vercel (opsional) |

## Jalankan lokal
```bash
python3 -m http.server 8080   # lalu buka http://localhost:8080
```
Service worker hanya aktif lewat `https://` atau `localhost`, bukan lewat `file://`.

## Deploy
- **GitHub Pages:** Settings > Pages > Deploy from branch (`main`, folder `/root`). Semua path relatif, jadi aman dipakai di subfolder.
- **Vercel / Netlify:** impor repo, tanpa build command, output directory `.`

## Pasang di Chrome Android
Buka alamat situs di Chrome, lalu menu (tiga titik) > **Instal aplikasi** / **Tambahkan ke layar utama**. Di app, menu Profil juga menampilkan tombol **Pasang di layar utama** saat Chrome mengizinkan.

## Login Google
Firebase Web config sudah diisi di konstanta `FB_DEFAULT` pada `index.html`. Tombol Google pada halaman **Daftar** dan **Masuk** menggunakan Firebase Auth; `GCID` hanya diperlukan untuk mengaktifkan Google One Tap.
Isi `GCID` dengan Web client ID dari Firebase Console > Authentication > Sign-in method > Google hanya jika ingin mengaktifkan Google One Tap.

Aktifkan provider Google dan tambahkan domain situs ke **Authorized domains** di Firebase Authentication. Pendaftaran Google membuat atau memakai akun Firebase secara otomatis, menyimpan profil pengguna, menyinkronkan data ke Firestore, lalu membuka halaman utama. Firebase Web config digunakan di browser dan bukan kredensial rahasia; jangan menaruh service-account key di aplikasi.

## Memperbarui
Setelah mengubah `index.html`, naikkan nomor `V` di `sw.js` supaya pengguna menerima versi baru.
