# Expo Starter Auth 🚀

Starter kit untuk membuat aplikasi React Native + Expo Router + Redux Toolkit + Auth dengan cepat.
Sudah termasuk:

- 🔐 Auth state management (Redux + redux-persist + AsyncStorage)
- 🗂️ Expo Router (folder based navigation)
- 🎨 Tailwind + NativeWind styling
- 🌗 Dark/Light theme switcher
- 🧪 Contoh struktur modular (store, hooks, utils, components)

## 📦 Prasyarat

Pastikan sudah terinstall:

- Node.js (LTS disarankan)
- Expo CLI
- Git

Git

## 🚀 Cara Install

### 1. Clone repo ini

```shell
git clone https://github.com/username/expo-starter-auth.git
cd expo-starter-auth
```

### 2. Install dependencies

```shell
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Setup environment variables

Buat file .env berdasarkan .env.example:

```shell
cp .env.example .env
```

Lalu isi sesuai kebutuhan, misalnya API base URL, dsb.

### 4. Jalankan project

```shell
npx expo start
```

Pilih target (Android, iOS simulator, atau Web).

## 🛠️ Build dengan EAS

Project ini mendukung EAS Build.
<br>
Karena ini starter kit, field `projectId` di `app.json` sengaja dikosongkan.
<br>
Saat pertama kali setup di project baru, jalankan:

```shell
eas build:configure
```

Perintah di atas akan:

Membuat `projectId` baru di akun Expo kamu.
<br>
Mengupdate `app.json` dengan ID tersebut.

Lalu kamu bisa build:

```shell
eas build -p android --profile preview
eas build -p ios --profile preview
```

## 📂 Struktur Folder
```
app/              # Routing berbasis folder (expo-router)
store/            # Redux slices & store setup
components/       # Reusable UI components
hooks/            # Custom hooks
utils/            # Helper utilities
theme/            # Theme config
```

## 🔑 Catatan

- Jangan lupa menyesuaikan `.env` sesuai backend API kamu.
- Kalau kamu fork repo ini, jalankan `eas build:configure` supaya punya `projectId` sendiri.

## License
See [LICENSE](https://github.com/alfaz86/expo-starter-auth?tab=MIT-1-ov-file) for more information.