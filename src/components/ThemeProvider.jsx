import { useEffect, useState } from "react";
import { ThemeProviderContext } from "@/hooks/useTheme";

export function ThemeProvider({
  children,
  defaultTheme = "theme-minty-night-dark",
  storageKey = "topicalbird-preferred-theme",
  ...props
}) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = document.documentElement;
    root.className = '';

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "theme-minty-night-dark"
        : "theme-mint-light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setTheme = (value) => {
    const applyTheme = () => {
      const newTheme = `theme-${value}`;
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    document.documentElement.dataset.transitionType = "theme";
    document.startViewTransition(() => {
      applyTheme();
    });
  };

  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
