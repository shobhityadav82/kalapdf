import { Search, Bell, Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [dark, setDark] = useState(true)

  const toggleTheme = () => {
    setDark(!dark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-4 lg:px-6 shrink-0 bg-navy-900/80 backdrop-blur">
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search any tool..." 
              className="w-full bg-navy-600 border border-slate-700/50 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          title="Toggle theme"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-navy-600 rounded-full pl-1 pr-3 py-1 border border-slate-700/50 ml-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
            U
          </div>
          <span className="text-sm">Welcome, User</span>
        </div>
      </div>
    </header>
  )
}
