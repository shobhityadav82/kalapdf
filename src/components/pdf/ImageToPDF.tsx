import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Upload, Download, Loader2, ArrowLeft, Image as ImageIcon, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (list: FileList | null) => {
    if (!list) return
    const imgs = Array.from(list).filter(f => f.type.startsWith('image/'))
    setFiles(prev => [...prev, ...imgs])
  }

  const process = async () => {
    if (files.length === 0) return
    setProcessing(true)
    try {
      const pdf = await PDFDocument.create()
      for (const file of files) {
        const bytes = await file.arrayBuffer()
        let image
        if (file.type.includes('png')) {
          image = await pdf.embedPng(bytes)
        } else {
          image = await pdf.embedJpg(bytes)
        }
        const page = pdf.addPage([image.width, image.height])
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
      }
      const out = await pdf.save()
      const blob = new Blob([out], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'images.pdf'
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
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2"><ImageIcon className="w-6 h-6 text-pink-400" /> Image to PDF</h1>
        <p className="text-slate-400 text-sm">Convert one or more images into a PDF</p>
      </div>

      <div onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }} onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl p-10 text-center cursor-pointer transition bg-navy-700/50 mb-6">
        <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
        <p className="font-medium">Drop images or click to browse</p>
        <p className="text-xs text-slate-500 mt-1">JPG, PNG supported</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div className="space-y-2 mb-6">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-navy-700 border border-slate-800 rounded-lg p-3">
              <ImageIcon className="w-5 h-5 text-pink-400" />
              <span className="flex-1 text-sm truncate">{f.name}</span>
              <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-red-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={process} disabled={files.length === 0 || processing} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
        {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating PDF...</> : <><Download className="w-5 h-5" /> Create PDF & Download</>}
      </button>
    </div>
  )
}
