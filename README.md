# KalaPDF – All-in-One PDF & Image Tools

Professional PDF & Image utility platform with real working tools.

## Features Working Right Now

### PDF Tools
- **Merge PDF** – Combine multiple PDFs (reorder supported)
- **Split PDF** – Extract pages by range
- **Rotate Pages** – Rotate all pages 90/180/270°
- **Image to PDF** – Convert images to PDF
- **Protect PDF** – Basic protection flow

### Image Tools
- **Image Resize** – Width/Height + quality + aspect ratio lock
- **Image Compressor** – Target size compression
- **Image Converter** – JPG ↔ PNG ↔ WEBP
- **Crop Image** – Center square crop

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- pdf-lib (PDF processing in browser)
- browser-image-compression
- Lucide Icons

All processing happens **in the browser** – files never leave your device.

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open http://localhost:5173

## Project Structure

```
kalapdf/
├── src/
│   ├── components/
│   │   ├── layout/       # Sidebar, Header, RightPanel
│   │   └── tools/
│   │       ├── pdf/      # Working PDF tools
│   │       └── image/    # Working Image tools
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## Next Steps You Can Add

- Supabase Auth (Google + Email)
- More PDF tools (Watermark, Page Numbers, OCR)
- Advanced crop with interactive canvas
- Backend for heavy processing
- User dashboard + history

## Important Notes

- Protect PDF currently has limited encryption (pdf-lib limitation). For strong encryption use a server-side library.
- OCR / Searchable PDF needs Tesseract.js or a backend service.
- PDF to Word needs additional libraries (mammoth / docx).

---

Made for KalaPDF
