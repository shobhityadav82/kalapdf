import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Upload, FilePlus, X, Download, Loader2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface FileItem {
  id: string
  file: File
  name: string
  size: string
}

export default function MergePDF() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const newFiles: FileItem[] = []
    Array.from(fileList).forEach(file => {
      if (file.type === 'application/pdf') {
        newFiles.push({
          id: Math.random().toString(36).slice(2),
          file,
          name: file.name,
          size: formatSize(file.size)
        })
      }
    })
    if (newFiles.length === 0) {
      setError('Please select PDF files only')
      return
    }
    setError('')
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files]
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= files.length) return
    ;[newFiles[index], newFiles[target]] = [newFiles[target], newFiles[index]]
    setFiles(newFiles)
  }

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files')
      return
    }
    setProcessing(true)
    setError('')
    try {
      const mergedPdf = await PDFDocument.create()
      for (const item of files) {
        const bytes = await item.file.arrayBuffer()
        const pdf = await PDFDocument.load(bytes)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(page => mergedPdf.addPage(page))
      }
      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'merged.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError('Failed to merge PDFs. Please try again.')
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
        <h1 className="text-2xl font-bold mb-1">Merge PDF</h1>
        <p className="text-slate-400 text-sm">Combine multiple PDF files into one document</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl p-10 text-center cursor-pointer transition bg-navy-700/50 mb-6"
      >
        <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
        <p className="font-medium mb-1">Drop PDF files here or click to browse</p>
        <p className="text-xs text-slate-500">Select multiple PDFs to merge</p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2 mb-6">
          {files.map((item, index) => (
            <div key={item.id} className="flex items-center gap-3 bg-navy-700 border border-slate-800 rounded-lg p-3">
              <FilePlus className="w-5 h-5 text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-slate-500">{item.size}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveFile(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded hover:bg-slate-700 text-slate-400 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveFile(index, 'down')}
                  disabled={index === files.length - 1}
                  className="p-1.5 rounded hover:bg-slate-700 text-slate-400 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeFile(item.id)}
                  className="p-1.5 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action */}
      <button
        onClick={mergePDFs}
        disabled={files.length < 2 || processing}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Merging...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Merge {files.length} PDFs & Download
          </>
        )}
      </button>
    </div>
  )
}
