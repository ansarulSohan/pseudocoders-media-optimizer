# 🎨 PseudoCoders Media Optimizer

A free, secure, and powerful media optimization tool built with Next.js. Compress images and videos by up to 90% while maintaining exceptional quality - all processed directly in your browser for complete privacy.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

- **🔒 100% Private** - All processing happens in your browser, files never leave your device
- **⚡ Lightning Fast** - Instant optimization with no server uploads or waiting
- **🎯 Smart Compression** - Advanced algorithms maintain quality while reducing file size
- **📱 Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **🆓 Completely Free** - No subscriptions, no limits, unlimited optimizations
- **🎨 Multiple Formats** - Support for JPG, PNG, WebP, GIF, MP4, and more

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/pseudocoders/media-optimizer.git
cd media-optimizer
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
pseudocoders-media-optimizer/
├── app/
│   ├── components/
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Hero.tsx           # Hero section with CTA
│   │   ├── Features.tsx       # Feature showcase
│   │   ├── MediaOptimizer.tsx # Main optimizer tool
│   │   ├── About.tsx          # About section
│   │   └── Footer.tsx         # Footer with links
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/
│   └── pseudocoders-logo.png  # Brand logo
└── package.json
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI:** React 19
- **Font:** Geist Sans & Geist Mono

## 📦 Components

### Header

Responsive navigation with logo and menu links. Includes mobile hamburger menu.

### Hero

Eye-catching landing section with CTA buttons and key statistics.

### Features

Grid layout showcasing 6 key features with icons and descriptions.

### MediaOptimizer

Main tool interface with:

- Drag & drop file upload
- Quality slider
- File preview
- Optimization controls

### About

Information about the tool and PseudoCoders mission.

### Footer

Links, social media, and copyright information.

## 🎨 Customization

### Colors

The design uses a neutral gray palette with accent colors. Modify in `app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Branding

Replace `/public/pseudocoders-logo.png` with your own logo and update the brand name in components.

## 📝 Future Enhancements

- [ ] Implement actual image compression with Canvas API
- [ ] Add video compression with FFmpeg.wasm
- [ ] Support batch processing
- [ ] Add format conversion (JPG ↔ PNG ↔ WebP)
- [ ] Show before/after comparison
- [ ] Add compression statistics
- [ ] Implement download functionality
- [ ] Add image resizing options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 About PseudoCoders

Built with ❤️ by [PseudoCoders](https://pseudocoders.io) - A team of passionate developers creating tools and solutions for the web.

**Team:**

- Ricky Francis Rozario - Co-Founder & Developer
- G. M. Ansarul Kabir Sohan - Co-Founder & Developer

## 📞 Contact

- Website: [pseudocoders.io](https://pseudocoders.io)
- GitHub: [@pseudocoders](https://github.com/pseudocoders)
- Email: info@pseudocoders.io

---

Made with Next.js and Tailwind CSS
