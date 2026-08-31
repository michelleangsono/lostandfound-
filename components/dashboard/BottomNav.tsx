"use client"

import { Home, Flag, CheckCircle, User } from "lucide-react"

type View = "home" | "claims" | "report" | "detail"

export function BottomNav({
  view,
  setView,
}: {
  view: View
  setView: (view: View) => void
}) {
  return (
    <nav className="flex-none bg-[#0a0a0a] border-t border-zinc-900 px-8 py-3 pb-6 flex justify-between items-center z-20">
      <button
        onClick={() => setView("home")}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          view === "home" ? "text-[#3b82f6]" : "text-zinc-500 hover:text-zinc-400"
        }`}
      >
        <Home size={22} />
        <span className="text-[11px] font-medium">Browse</span>
      </button>
      <button
        onClick={() => setView("report")}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          view === "report" ? "text-[#3b82f6]" : "text-zinc-500 hover:text-zinc-400"
        }`}
      >
        <Flag size={22} />
        <span className="text-[11px] font-medium">Report</span>
      </button>
      <button
        onClick={() => setView("claims")}
        className={`flex flex-col items-center gap-1.5 transition-colors ${
          view === "claims" ? "text-[#3b82f6]" : "text-zinc-500 hover:text-zinc-400"
        }`}
      >
        <CheckCircle size={22} />
        <span className="text-[11px] font-medium">Claims</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-400 transition-colors">
        <User size={22} />
        <span className="text-[11px] font-medium">Profile</span>
      </button>
    </nav>
  )
}
