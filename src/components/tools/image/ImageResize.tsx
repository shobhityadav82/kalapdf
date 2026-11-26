import { useState, useRef } from 'react'
import { Upload, Download, Loader2, ArrowLeft, Maximize2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ImageResize() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [keepRatio, setKeepRatio] = useState(true)
  const [quality, setQuality] = useState(0.9)
  const [processing, setProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState('')
  const [resultSize, setResultSize] = useState('')
  const [origW, setOrigW] = useState(0)
  const [origH, setOrigH] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const ratioRef = useRef(1)

  const formatSize = (b: number) => b < 1024 ? b + ' B' : b < 1048576 ? (b/1024).toFixed(1)+' KB' : (b/1048576).toFixed(1)+' MB'

  const handleFile = (f: File | null) => {
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setOriginalSize(formatSize(f.size))
    const url = URL.createObjectURL(f)
    setPreview(url)
    const img = new Image()
    img.onload = () => {
      setOrigW(img.width)
      setOrigH(img.height)
      setWidth(img.width)
      setHeight(img.height)
      ratioRef.current = img.width / img.height
    }
    img.src = url
  }

  const onWidthChange = (w: number) => {
    setWidth(w)
    if (keepRatio) setHeight(Math.round(w / ratioRef.current))
  }

  const onHeightChange = (h: number) => {
    setHeight(h)
    if (keepRatio) setWidth(Math.round(h * ratioRef.current))
  }

  const process = async () => {
    if (!file || !preview) return
    setProcessing(true)
    try {
      const img = new Image()
      img.src = preview
      await new Promise(r => { img.onload = r })

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      
      // White background for JPG
      if (file.type === 'image/jpeg' || file.type.includes('jpg')) {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)
      }
      ctx.drawImage(img, 0, 0, width, height)

      const mime = file.type.includes('png') ? 'image/png' : 'image/jpeg'
      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, mime, quality))
      if (!blob) throw new Error('Failed')

      setResultSize(formatSize(blob.size))
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resized-${width}x${height}.${mime === 'image/png' ? 'png' : 'jpg'}`
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
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Maximize2 className="w-6 h-6 text-blue-400" /> Image Resize
        </h1>
        <p className="text-slate-400 text-sm">Resize images by dimensions or quality</p>
      </div>

      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl p-8 text-center cursor-pointer transition bg-navy-700/50 mb-6"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-3" />
        ) : (
          <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
        )}
        <p className="font-medium mb-1">{file ? file.name : 'Drop image here or click to browse'}</p>
        <p className="text-xs text-slate-500">{originalSize || 'JPG, PNG, WEBP supported'}</p>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0] || null)} />
      </div>

      {file && (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Width (px)</label>
              <input type="number" value={width} onChange={e => onWidthChange(+e.target.value)} className="w-full bg-navy-700 border border-slate-700 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1">Height (px)</label>
              <input type="number" value={height} onChange={e => onHeightChange(+e.target.value)} className="w-full bg-navy-700 border border-slate-700 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)} className="rounded" />
            Maintain aspect ratio
          </label>

          <div>
            <label className="block text-sm mb-1">Quality: {Math.round(quality * 100)}%</label>
            <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full" />
          </div>

          <div className="flex gap-4 text-sm text-slate-400">
            <span>Original: {origW}×{origH} ({originalSize})</span>
            {resultSize && <span className="text-green-400">Result: {resultSize}</span>}
          </div>
        </div>
      )}

      <button onClick={process} disabled={!file || processing} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Download className="w-5 h-5" /> Resize & Download</>}
      </button>
    </div>
  )
}
