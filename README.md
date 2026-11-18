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

## Sinkronisasi antarperangkat
Transaksi, target, hutang, anggaran, dompet, chat, tampilan, serta pengaturan URL/kode rahasia backup Spreadsheet disimpan pada dokumen Firestore milik UID yang sedang login. Sebelum mengaktifkan sinkronisasi, terapkan isi `firestore.rules` pada Firebase Console > Firestore Database > Rules lalu publikasikan. Aturan ini hanya mengizinkan pengguna membaca dan menulis dokumen di bawah UID-nya sendiri; jangan gunakan aturan publik.

Kode Google Apps Script disertakan dalam versi aplikasi yang sama, sehingga salinan dari desktop dan ponsel identik selama keduanya memakai versi aplikasi yang sama. Proyek Apps Script tetap dikelola di akun Google pengguna dan tidak dipublikasikan ulang otomatis oleh aplikasi.

## Memperbarui
Setelah mengubah `index.html`, naikkan nomor `V` di `sw.js` supaya pengguna menerima versi baru.
