import { useState, useCallback } from 'react'

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? JSON.parse(saved) : false
  })

  const toggle = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev
      localStorage.setItem('theme', JSON.stringify(newValue))
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return newValue
    })
  }, [])

  return { isDark, toggle }
}
