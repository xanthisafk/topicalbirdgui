import { useEffect, useState } from "react";
import { ThemeProviderContext } from "@/hooks/useTheme";

export function ThemeProvider({
  children,
  defaultTheme = "theme-minty-night-dark",
  storageKey = "topicalbird-preferred-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.className = '';

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "theme-minty-nights-dark"
        : "theme-mint-light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      window.document.documentElement.classList.add(`theme-${theme}`);
      localStorage.setItem(storageKey, `theme-${theme}`)
      setTheme(`theme-${theme}`)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}