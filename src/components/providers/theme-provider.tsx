"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    // Default to dark if no preference has been explicitly set by the user
    if (stored === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
