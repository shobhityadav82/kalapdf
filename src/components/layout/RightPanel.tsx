import { Folder, Settings, CreditCard, HelpCircle, LogOut, Crown, BarChart3 } from 'lucide-react'

export default function RightPanel() {
  return (
    <aside className="h-full bg-navy-800 border-l border-slate-800/50 flex flex-col">
      {/* Account */}
      <div className="p-5 border-b border-slate-800/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold">
            U
          </div>
          <div>
            <p className="text-xs text-slate-400">Your Account</p>
            <p className="font-semibold">User</p>
            <span className="inline-flex items-center gap-1 text-[10px] bg-purple-600/30 text-purple-300 px-2 py-0.5 rounded-full mt-0.5">
              <Crown className="w-3 h-3" /> Free
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/50 hover:text-white transition">
            <Folder className="w-4 h-4" /> My Files
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/50 hover:text-white transition">
            <Settings className="w-4 h-4" /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/50 hover:text-white transition">
            <CreditCard className="w-4 h-4" /> Billing
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/50 hover:text-white transition">
            <HelpCircle className="w-4 h-4" /> Help & Support
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800/50 hover:text-white transition">
            <LogOut className="w-4 h-4" /> Logout
          </a>
        </nav>
      </div>

      {/* Upgrade */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-xl">🚀</div>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold text-sm">Upgrade to Premium</span>
          </div>
          <ul className="text-[11px] text-slate-300 space-y-1 mb-3">
            <li className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Unlimited downloads</li>
            <li className="flex items-center gap-1.5"><span className="text-green-400">✓</span> No ads</li>
            <li className="flex items-center gap-1.5"><span className="text-green-400">✓</span> More features</li>
          </ul>
          <button className="w-full btn-primary text-sm py-2">
            Go Premium →
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 mt-auto">
        <div className="bg-navy-700 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-sm">Quick Stats</span>
          </div>
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-green-400" /> Tools Available
              </span>
              <span className="font-medium">15+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-400" /> Happy Users
              </span>
              <span className="font-medium">50K+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /> Files Processed
              </span>
              <span className="font-medium">1M+</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
