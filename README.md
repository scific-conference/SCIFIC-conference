# SCIFiC – International Student Conference on Cybersecurity

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://scific-conference.github.io/SCIFIC-conference/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**SCIFiC** (Student Conference on Information, Functional and Cyber Security) is an annual international online conference organised by the **National Aerospace University "Kharkiv Aviation Institute" (KhAI)**. The event brings together students, young researchers, and professionals to share knowledge and innovations in cybersecurity, functional safety, and legal aspects of information protection.

This repository contains the complete source code of the official SCIFiC conference website – a modern, responsive, bilingual (English / Ukrainian) static site hosted on **GitHub Pages**.

---

## 🌐 Live Website

[https://scific-conference.github.io/SCIFIC-conference/](https://scific-conference.github.io/SCIFIC-conference/)

---

## 📁 Repository Structure

```
SCIFIC-conference/
├── en/                          # English version
│   ├── index.html
│   ├── materials.html
│   ├── schedule.html
│   ├── sections.html
│   ├── archive.html
│   ├── contacts.html
│   └── certificate-verification.html
├── uk/                          # Ukrainian version (identical structure)
│   └── ...
├── assets/
│   ├── css/
│   │   └── styles.css           # main stylesheet (cyberpunk theme)
│   ├── js/
│   │   └── script.js            # common JS (digital rain, mobile menu, countdown, FAQ)
│   └── images/                  # all images, logos, and archive thumbnails
│       ├── image_archive/       # proceedings covers (2021–2025)
│       └── ...
├── sitemap.xml                  # SEO sitemap for both languages
├── robots.txt                   # crawl instructions
└── README.md                    # this file
```

---

## ✨ Features

- **Bilingual support** – seamless switching between English and Ukrainian.
- **Fully responsive** – works on desktops, tablets, and smartphones.
- **Cyberpunk visual theme** – neon glitches, digital rain, lock‑loading animation.
- **Interactive elements**:
  - Countdown timer to the next conference.
  - Live FAQ accordion.
  - Certificate verification tool (Google Sheets API integration).
  - Mobile‑friendly hamburger menu.
- **SEO / GEO ready**:
  - Unique meta tags and Open Graph / Twitter Card data for each page.
  - Structured data (JSON‑LD) – Event, FAQPage, Schedule, CollectionPage, ContactPage.
  - `sitemap.xml` and `robots.txt` included.
- **No external dependencies** – pure HTML/CSS/JS, easily deployable on any static hosting.

---

## 🛠️ Technologies Used

- HTML5 / CSS3 (Flexbox, Grid, CSS animations)
- JavaScript (ES6+)
- [Google Fonts](https://fonts.google.com/) (Orbitron, Rajdhani)
- [IonIcons](https://ionic.io/ionicons) for vector icons
- Google Sheets API (for certificate verification)
- GitHub Pages (hosting)

---

## 🚀 Local Development

To run the site locally:

```bash
git clone https://github.com/scific-conference/SCIFIC-conference.git
cd SCIFIC-conference
```

Then open any `.html` file (e.g., `en/index.html`) in your browser.  
For a better experience, use a local static server:

```bash
npx serve .
# or
python3 -m http.server
```

---

## 📄 License

This project is open‑source and available under the **MIT License**.  
You are free to use, modify, and distribute the code with proper attribution.

---

## 👥 Authors & Contact

- **Heorhii Zemlianko** – [GitHub](https://github.com/HeorhiiZemlianko)
- Organising Committee: [scific@csn.khai.edu](mailto:scific@csn.khai.edu)

---

## 🙏 Acknowledgements

- National Aerospace University "KhAI" – for continuous support.
- All past and future participants, reviewers, and partners of SCIFiC.

---

*Made with 💚 for the global cybersecurity community.*
