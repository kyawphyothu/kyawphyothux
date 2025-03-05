"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  // After mounting, we can access the theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 flex items-center justify-center" />
  }

  // Use resolvedTheme to determine the actual theme (including system preference)
  const isCurrentlyDark = resolvedTheme === 'dark'

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 flex items-center justify-center"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isCurrentlyDark ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative flex items-center justify-center w-5 h-5"
      >
        <motion.div
          initial={false}
          animate={{ 
            opacity: isCurrentlyDark ? 1 : 0,
            scale: isCurrentlyDark ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <Moon className="h-5 w-5" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: isCurrentlyDark ? 0 : 1,
            scale: isCurrentlyDark ? 0 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <Sun className="h-5 w-5" />
        </motion.div>
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}