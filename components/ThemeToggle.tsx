"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-between w-14 h-7 rounded-full px-1 transition-colors duration-300 
                 bg-gray-300 dark:bg-gray-700"
    >
      <div
        className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      />
      <Sun className="h-4 w-4 text-yellow-500" />
      <Moon className="h-4 w-4 text-gray-200" />
    </button>
  );
}
