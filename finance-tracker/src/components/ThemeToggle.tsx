'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button onClick={toggleTheme} className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}