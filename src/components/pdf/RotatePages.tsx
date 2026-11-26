
import { useState, useRef } from 'react'
import { PDFDocument, degrees } from 'pdf-lib'
import { Upload, Download, Loader2, ArrowLeft, RotateCw } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RotatePages() {
  const [file, setFile] = useState<File | null>(null)
  const [angle, setAngle] = useState(90)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const process = async () => {
    if (!file) return

    setProcessing(true)
    setError('')

    try {
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const pages = pdf.getPages()

      pages.forEach(page => {
        page.setRotation(
          degrees((page.getRotation().angle + angle) % 360)
        )
      })

      const out = await pdf.save()

      const blob = new Blob(
        [new Uint8Array(out).buffer as ArrayBuffer],
        { type: 'application/pdf' }
      )

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = 'rotated.pdf'
      a.click()

      URL.revokeObjectURL(url)
    } catch (e) {
      setError('Failed to rotate PDF. Please try again.')
      console.error(e)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <RotateCw className="w-6 h-6 text-orange-400" />
          Rotate Pages
        </h1>
        <p className="text-slate-400 text-sm">
          Rotate all pages of a PDF
        </p>
      </div>

      <div
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault()
          const f = e.dataTransfer.files[0]
          if (f?.type === 'application/pdf') {
            setFile(f)
            setError('')
          } else {
            setError('Please select a PDF file')
          }
        }}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-xl p-10 text-center cursor-pointer transition bg-navy-700/50 mb-6"
      >
        <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
        <p className="font-medium">
          {file ? file.name : 'Drop PDF or click to browse'}
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0] || null
            setFile(f)
            setError('')
          }}
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      {file && (
        <div className="mb-6">
          <label className="block text-sm mb-2">
            Rotation angle
          </label>

          <div className="flex gap-3">
            {[90, 180, 270].map(a => (
              <button
                key={a}
                onClick={() => setAngle(a)}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  angle === a
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-slate-700'
                }`}
              >
                {a}°
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={process}
        disabled={!file || processing}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Rotating...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Rotate & Download
          </>
        )}
      </button>
    </div>
  )
}
