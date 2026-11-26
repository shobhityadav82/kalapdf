
import { useState, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { Upload, Download, Loader2, ArrowLeft, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const process = async () => {
    if (!file || !password) {
      setError('Please select a file and enter a password')
      return
    }

    setProcessing(true)
    setError('')

    try {
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      // pdf-lib does not support adding password encryption.
      // This currently saves a PDF without password protection.
      const out = await pdf.save()

      const blob = new Blob(
        [new Uint8Array(out).buffer as ArrayBuffer],
        { type: 'application/pdf' }
      )

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      a.href = url
      a.download = 'protected.pdf'
      a.click()

      URL.revokeObjectURL(url)

      setError(
        'Warning: PDF downloaded, but password encryption was not applied. Additional encryption support is required.'
      )
    } catch (e) {
      setError('Failed to process PDF')
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
          <Lock className="w-6 h-6 text-blue-400" />
          Protect PDF
        </h1>

        <p className="text-slate-400 text-sm">
          Add password protection to your PDF
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
            setFile(e.target.files?.[0] || null)
            setError('')
          }}
        />
      </div>

      {file && (
        <div className="mb-6">
          <label className="block text-sm mb-1">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-navy-700 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>
      )}

      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      <button
        onClick={process}
        disabled={!file || !password || processing}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Protect & Download
          </>
        )}
      </button>
    </div>
  )
}
