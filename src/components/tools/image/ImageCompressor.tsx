import { useState, useRef } from 'react'
import { Upload, Download, Loader2, ArrowLeft, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import imageCompression from 'browser-image-compression'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [maxSizeMB, setMaxSizeMB] = useState(0.5)
  const [processing, setProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState('')
  const [resultSize, setResultSize] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const formatSize = (b: number) => b < 1024 ? b + ' B' : b < 1048576 ? (b/1024).toFixed(1)+' KB' : (b/1048576).toFixed(1)+' MB'

  const handleFile = (f: File | null) => {
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setOriginalSize(formatSize(f.size))
    setPreview(URL.createObjectURL(f))
    setResultSize('')
  }

  const compress = async () => {
    if (!file) return
    setProcessing(true)
    try {
      const options = {
        maxSizeMB,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      const compressed = await imageCompression(file, options)
      setResultSize(formatSize(compressed.size))
      const url = URL.createObjectURL(compressed)
      const a = document.createElement('a')
      a.href = url
      a.download = `compressed-${file.name}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Package className="w-6 h-6 text-green-400" /> Image Compressor</h1>
        <p className="text-slate-400 text-sm">Reduce image file size with quality control</p>
      </div>

      <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }} onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl p-8 text-center cursor-pointer transition bg-navy-700/50 mb-6">
        {preview ? <img src={preview} alt="" className="max-h-40 mx-auto rounded-lg mb-3" /> : <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />}
        <p className="font-medium">{file ? file.name : 'Drop image or click to browse'}</p>
        <p className="text-xs text-slate-500 mt-1">{originalSize || 'JPG, PNG, WEBP'}</p>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0] || null)} />
      </div>

      {file && (
        <div className="mb-6 space-y-3">
          <div>
            <label className="block text-sm mb-1">Target max size: {maxSizeMB} MB</label>
            <input type="range" min="0.05" max="2" step="0.05" value={maxSizeMB} onChange={e => setMaxSizeMB(+e.target.value)} className="w-full" />
          </div>
          <div className="text-sm text-slate-400">
            Original: {originalSize} {resultSize && <span className="text-green-400 ml-3">Compressed: {resultSize}</span>}
          </div>
        </div>
      )}

      <button onClick={compress} disabled={!file || processing} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Compressing...</> : <><Download className="w-5 h-5" /> Compress & Download</>}
      </button>
    </div>
  )
}
