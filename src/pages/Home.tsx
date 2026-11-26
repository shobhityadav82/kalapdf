import { Link } from 'react-router-dom'
import { 
  FilePlus, Scissors, RotateCw, Lock, Image, Maximize2, 
  RefreshCw, Package, Crop, Shield, Zap, Infinity, Headphones
} from 'lucide-react'

const pdfTools = [
  { name: 'Merge PDF', desc: 'Combine multiple PDFs', path: '/merge-pdf', icon: FilePlus, color: 'text-blue-400 bg-blue-500/20' },
  { name: 'Split PDF', desc: 'Split into multiple files', path: '/split-pdf', icon: Scissors, color: 'text-purple-400 bg-purple-500/20' },
  { name: 'Rotate Pages', desc: 'Rotate PDF pages', path: '/rotate-pages', icon: RotateCw, color: 'text-orange-400 bg-orange-500/20' },
  { name: 'Protect PDF', desc: 'Set password security', path: '/protect-pdf', icon: Lock, color: 'text-blue-400 bg-blue-500/20' },
  { name: 'Image to PDF', desc: 'Turn images into PDF', path: '/image-to-pdf', icon: Image, color: 'text-pink-400 bg-pink-500/20' },
]

const imageTools = [
  { name: 'Image Resize', desc: 'Resize by size, dimension or KB', path: '/image-resize', icon: Maximize2, color: 'text-blue-400 bg-blue-500/20', isNew: true },
  { name: 'Image Converter', desc: 'JPG ↔ PNG & more', path: '/image-converter', icon: RefreshCw, color: 'text-purple-400 bg-purple-500/20' },
  { name: 'Image Compressor', desc: 'Reduce image size', path: '/image-compressor', icon: Package, color: 'text-green-400 bg-green-500/20' },
  { name: 'Crop Image', desc: 'Crop your images', path: '/crop-image', icon: Crop, color: 'text-orange-400 bg-orange-500/20' },
]

export default function Home() {
  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 border border-purple-500/20">
        <div className="relative flex items-center justify-between p-6 lg:p-8">
          <div className="max-w-lg">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome to KalaPDF 👋</h2>
            <p className="text-slate-300 mb-4">Work with PDFs and Images, Faster. Smarter. Online.</p>
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Free to Use
              </span>
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                No Installation
              </span>
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Secure & Private
              </span>
            </div>
            <Link to="/merge-pdf" className="btn-primary inline-block">
              Explore Tools →
            </Link>
          </div>
        </div>
      </div>

      {/* PDF Tools */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">PDF Tools</h3>
            <p className="text-xs text-slate-400">Powerful tools to manage your PDFs</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {pdfTools.map(tool => (
            <Link key={tool.path} to={tool.path} className="tool-card">
              <div className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center mb-3`}>
                <tool.icon className="w-5 h-5" />
              </div>
              <h4 className="font-medium text-sm mb-0.5">{tool.name}</h4>
              <p className="text-[11px] text-slate-400">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Image Tools */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Image Tools</h3>
            <p className="text-xs text-slate-400">Edit and convert your images easily</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {imageTools.map(tool => (
            <Link key={tool.path} to={tool.path} className="tool-card relative">
              {tool.isNew && (
                <span className="absolute top-3 right-3 text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded font-medium">
                  New
                </span>
              )}
              <div className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center mb-3`}>
                <tool.icon className="w-5 h-5" />
              </div>
              <h4 className="font-medium text-sm mb-0.5">{tool.name}</h4>
              <p className="text-[11px] text-slate-400">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <div className="border-t border-slate-800/50 pt-6 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-1">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs font-medium">Your files are safe</span>
            <span className="text-[10px] text-slate-500">Processed in browser</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mb-1">
              <Zap className="w-4 h-4 text-yellow-400" />
            </div>
            <span className="text-xs font-medium">Lightning Fast</span>
            <span className="text-[10px] text-slate-500">Instant processing</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mb-1">
              <Infinity className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-xs font-medium">Unlimited Usage</span>
            <span className="text-[10px] text-slate-500">No hidden limits</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mb-1">
              <Headphones className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-xs font-medium">24/7 Support</span>
            <span className="text-[10px] text-slate-500">We're here to help</span>
          </div>
        </div>
        <p className="text-center text-[11px] text-slate-600 mt-6">Made with ❤️ by KalaPDF</p>
      </div>
    </div>
  )
}
