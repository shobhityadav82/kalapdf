
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// PDF Tools
import MergePDF from './components/pdf/MergePDF'
import SplitPDF from './components/pdf/SplitPDF'
import RotatePages from './components/pdf/RotatePages'
import ProtectPDF from './components/pdf/ProtectPDF'
import ImageToPDF from './components/pdf/ImageToPDF'

// Image Tools
import ImageResize from './components/tools/image/ImageResize'
import ImageCompressor from './components/tools/image/ImageCompressor'
import ImageConverter from './components/tools/image/ImageConverter'
import CropImage from './components/tools/image/CropImage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* PDF Routes */}
        <Route path="merge-pdf" element={<MergePDF />} />
        <Route path="split-pdf" element={<SplitPDF />} />
        <Route path="rotate-pages" element={<RotatePages />} />
        <Route path="protect-pdf" element={<ProtectPDF />} />
        <Route path="image-to-pdf" element={<ImageToPDF />} />

        {/* Image Routes */}
        <Route path="image-resize" element={<ImageResize />} />
        <Route path="image-compressor" element={<ImageCompressor />} />
        <Route path="image-converter" element={<ImageConverter />} />
        <Route path="crop-image" element={<CropImage />} />
      </Route>
    </Routes>
  )
}

export default App
