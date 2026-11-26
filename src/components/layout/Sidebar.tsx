import { NavLink } from 'react-router-dom'
import { 
  Home, FilePlus, Scissors, RotateCw, Trash2, 
  Maximize2, FileText, Image, Search, Camera,
  Hash, Droplets, Lock, Crop, RefreshCw, Package,
  Crown, X
} from 'lucide-react'

interface SidebarProps {
  onClose?: () => void
}

const pdfTools = [
  { name: 'Merge PDF', path: '/merge-pdf', icon: FilePlus },
  { name: 'Split PDF', path: '/split-pdf', icon: Scissors },
  { name: 'Rotate Pages', path: '/rotate-pages', icon: RotateCw },
  { name: 'Protect PDF', path: '/protect-pdf', icon: Lock },
  { name: 'Image to PDF', path: '/image-to-pdf', icon: Image },
]

const imageTools = [
  { name: 'Image Resize', path: '/image-resize', icon: Maximize2, isNew: true },
  { name: 'Image Converter', path: '/image-converter', icon: RefreshCw },
  { name: 'Image Compressor', path: '/image-compressor', icon: Package },
  { name: 'Crop Image', path: '/crop-image', icon: Crop },
]

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="h-full bg-navy-800 border-r border-slate-800/50 flex flex-col">
      {/* Logo */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">KalaPDF</h1>
            <p className="text-[10px] text-slate-400">All-in-One PDF & Image Tools</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Home */}
      <div className="px-3 mb-2">
        <NavLink 
          to="/" 
          end
          onClick={onClose}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Home className="w-5 h-5" />
          Home
        </NavLink>
      </div>

      {/* PDF Tools */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-3">
          PDF Tools
        </p>
        <nav className="space-y-0.5">
          {pdfTools.map(tool => (
            <NavLink
              key={tool.path}
              to={tool.path}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <tool.icon className="w-5 h-5" />
              {tool.name}
            </NavLink>
          ))}
        </nav>

        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2 mt-5">
          Image Tools
        </p>
        <nav className="space-y-0.5">
          {imageTools.map(tool => (
            <NavLink
              key={tool.path}
              to={tool.path}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <tool.icon className="w-5 h-5" />
              {tool.name}
              {tool.isNew && (
                <span className="ml-auto text-[10px] bg-purple-600 text-white px-1.5 py-0.5 rounded font-medium">
                  New
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Premium Banner */}
      <div className="p-3">
        <div className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold text-sm">Go Premium</span>
          </div>
          <p className="text-[11px] text-slate-300 mb-3">
            Unlock more features & enjoy unlimited usage!
          </p>
          <button className="w-full btn-primary text-sm py-2">
            Upgrade Now →
          </button>
        </div>
      </div>
    </aside>
  )
}
