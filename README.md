# Navi Bank Simulator

> **⚠️ Educational UI Simulator Only** — Not affiliated with or endorsed by Navi. This app does **not** perform any real financial transactions.

A fully functional **banking UI simulator** built with React + Vite + Capacitor, packaged as a native Android APK.

## ✨ Features

- 🔐 **PIN Authentication** (default PIN: `1234`) + Reset PIN
- 🏠 **Home Dashboard** — Quick Actions, Account Balances, Featured Services, Credit Score Gauge
- 📜 **Transaction History** — Search, filter by Deposits/Withdrawals/Payments, date-grouped
- 📄 **Statements** — Quick Receipt generator, Document categories (ATM, Bank, Wire Transfer, etc.)
- ⚙️ **Settings** — Theme switcher (Navy/Green/Purple/Orange), Currency (₹/$€£), Scenario Presets, Change PIN
- 👤 **Profile** — Editable personal & contact information

## 📱 Download APK

After pushing to GitHub, the APK is automatically built by GitHub Actions:

1. Go to **Actions** tab in your GitHub repository
2. Click on the latest **"Build Android APK"** workflow run
3. Scroll down to **Artifacts**
4. Download **`navi-bank-simulator-apk`**

## 🚀 Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in browser. Use mobile view (F12 → Toggle device toolbar).

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 + Vite |
| Routing | React Router DOM |
| Icons | Lucide React |
| Android Packaging | Capacitor |
| CI/CD | GitHub Actions |
