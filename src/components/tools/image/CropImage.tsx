import { useState, useRef } from 'react'
import { Upload, Download, Loader2, ArrowLeft, Crop } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CropImage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [processing, setProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  // Simple center crop for demo (advanced crop needs canvas interaction)
  const process = async () => {
    if (!file || !preview) return
    setProcessing(true)
    try {
      const img = new Image()
      img.src = preview
      await new Promise(r => { img.onload = r })
      const size = Math.min(img.width, img.height)
      const sx = (img.width - size) / 2
      const sy = (img.height - size) / 2
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size)
      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, file.type, 0.92))
      if (!blob) throw new Error('fail')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cropped-${file.name}`
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
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><Crop className="w-6 h-6 text-orange-400" /> Crop Image</h1>
        <p className="text-slate-400 text-sm">Crop image to square (center crop)</p>
      </div>

      <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }} onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl p-8 text-center cursor-pointer transition bg-navy-700/50 mb-6">
        {preview ? <img src={preview} alt="" className="max-h-48 mx-auto rounded-lg mb-3" /> : <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />}
        <p className="font-medium">{file ? file.name : 'Drop image or click to browse'}</p>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files?.[0] || null)} />
      </div>

      <button onClick={process} disabled={!file || processing} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Cropping...</> : <><Download className="w-5 h-5" /> Crop & Download</>}
      </button>
    </div>
  )
}
