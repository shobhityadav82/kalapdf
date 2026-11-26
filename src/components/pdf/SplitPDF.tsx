import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Upload, Scissors, Download, Loader2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [ranges, setRanges] = useState('1')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (f: File | null) => {
    if (!f || f.type !== 'application/pdf') {
      setError('Please select a PDF file')
      return
    }
    setError('')
    setFile(f)
    try {
      const bytes = await f.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      setPageCount(pdf.getPageCount())
      setRanges(`1-${pdf.getPageCount()}`)
    } catch {
      setError('Could not read PDF')
    }
  }

  const splitPDF = async () => {
    if (!file) return
    setProcessing(true)
    setError('')
    try {
      const bytes = await file.arrayBuffer()
      const srcPdf = await PDFDocument.load(bytes)
      const total = srcPdf.getPageCount()

      // Parse ranges like "1-3,5,7-9"
      const pageSets: number[][] = []
      ranges.split(',').forEach(part => {
        part = part.trim()
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim()))
          const pages: number[] = []
          for (let i = Math.max(1, start); i <= Math.min(total, end); i++) {
            pages.push(i - 1)
          }
          if (pages.length) pageSets.push(pages)
        } else {
          const p = parseInt(part)
          if (p >= 1 && p <= total) pageSets.push([p - 1])
        }
      })

      if (pageSets.length === 0) {
        setError('Invalid page ranges')
        setProcessing(false)
        return
      }

      for (let i = 0; i < pageSets.length; i++) {
        const newPdf = await PDFDocument.create()
        const pages = await newPdf.copyPages(srcPdf, pageSets[i])
        pages.forEach(p => newPdf.addPage(p))
        const outBytes = await newPdf.save()
        const blob = new Blob([outBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `split-${i + 1}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      setError('Failed to split PDF')
      console.error(err)
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
        <h1 className="text-2xl font-bold mb-1">Split PDF</h1>
        <p className="text-slate-400 text-sm">Extract pages or split into multiple files</p>
      </div>

      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl p-10 text-center cursor-pointer transition bg-navy-700/50 mb-6"
      >
        <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
        <p className="font-medium mb-1">{file ? file.name : 'Drop PDF here or click to browse'}</p>
        <p className="text-xs text-slate-500">{pageCount > 0 ? `${pageCount} pages` : 'Select a PDF file'}</p>
        <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={e => handleFile(e.target.files?.[0] || null)} />
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">{error}</div>}

      {file && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Page ranges (e.g. 1-3, 5, 7-9)</label>
          <input
            type="text"
            value={ranges}
            onChange={e => setRanges(e.target.value)}
            className="w-full bg-navy-700 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="1-3,5,7-9"
          />
        </div>
      )}

      <button
        onClick={splitPDF}
        disabled={!file || processing}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Splitting...</> : <><Download className="w-5 h-5" /> Split & Download</>}
      </button>
    </div>
  )
}
