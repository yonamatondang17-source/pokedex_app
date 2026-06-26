# 📱 Pokédex App

Aplikasi **Pokédex** mobile berbasis **React Native (Expo)** yang memungkinkan pengguna menjelajahi data Pokémon lengkap — mulai dari daftar, detail stats, hingga tipe elemen — dengan tampilan yang bersih dan responsif.

---

## 🌐 API yang Dipakai

| API | Kegunaan | Dokumentasi |
|-----|----------|-------------|
| **PokéAPI** | Mengambil data Pokémon (nama, tipe, stats, gambar, kemampuan) | [pokeapi.co](https://pokeapi.co) |

> PokéAPI adalah REST API gratis dan terbuka yang menyediakan data lengkap dari seluruh generasi Pokémon. Tidak memerlukan API key.

---

## ✅ Daftar Fitur

### 🔵 Level 2 — Fitur yang Dipilih

- [x] **Daftar Pokémon** — menampilkan seluruh daftar Pokémon dengan gambar sprite dan nama
- [x] **Halaman Detail Pokémon** — informasi lengkap: tipe, base stats (HP, Attack, Defense, Speed), kemampuan (abilities), dan tinggi/berat badan
- [x] **Navigasi antar layar** — berpindah dari list ke detail menggunakan React Navigation
- [x] **Infinite scroll / pagination** — memuat lebih banyak Pokémon saat pengguna scroll ke bawah
- [x] **Indikator tipe warna** — setiap tipe Pokémon (Fire, Water, Grass, dst.) ditampilkan dengan warna yang berbeda
- [x] **Loading & Error state** — tampilan khusus saat data sedang dimuat atau gagal diambil

---

## 📸 Screenshot dari Expo Go

### 1. Loading Screen
![Loading Screen](./assets/Screenshot%202026-06-26%20181407.png)

### 2. Success Screen
![Success Screen](./assets/Screenshot%202026-06-26%20181418.png)

### 3. Error Screen
![Error Screen](./assets/Screenshot%202026-06-26%20181541.png)

---

## 🚀 Cara Menjalankan

### Prasyarat

- **Node.js** v18 atau lebih baru → [nodejs.org](https://nodejs.org)
- **npm** (sudah termasuk bersama Node.js)
- **Expo Go** di HP:
  - [iOS – App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android – Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Langkah Instalasi

```bash
# 1. Clone repositori ini
git clone https://github.com/yonamatondang17-source/pokedex_app.git
cd pokedex_app

# 2. Instal semua dependensi
npm install

# 3. Jalankan aplikasi
npm start
```

Setelah QR code muncul, scan dengan **Expo Go** di HP kamu.

### Perintah Lainnya

```bash
npm run android   # Android Emulator
npm run ios       # iOS Simulator (macOS only)
npm run web       # Browser
```

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **React Native** | 0.81.5 | Framework utama mobile |
| **Expo SDK** | ~54.0.34 | Platform, tooling, dan build |
| **JavaScript** | ES2022 | Bahasa pemrograman utama |
| **React** | 19.1.0 | Library UI |
| **react-native-screens** | ^4.25.2 | Optimasi performa navigasi layar |
| **react-native-safe-area-context** | ^5.8.0 | Handling safe area (notch, home bar) |
| **expo-status-bar** | ~3.0.9 | Kontrol tampilan status bar |
| **PokéAPI** | REST v2 | Sumber data Pokémon (gratis, tanpa key) |

---

## 📁 Struktur Proyek
