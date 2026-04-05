'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-3 border border-black/20 dark:border-white/20 rounded-full px-4 py-2 transition hover:bg-black/5 dark:hover:bg-white/5"
    >
      {/* Toggle pill */}
      <div className="relative w-10 h-5 rounded-full bg-black/10 dark:bg-white/20 transition-colors">
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${
            isDark
              ? "left-[calc(100%-18px)] bg-white"
              : "left-0.5 bg-black"
          }`}
        />
      </div>
      {/* Label */}
      <span className="text-xs tracking-widest font-light dark:text-white text-black uppercase">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  )
}