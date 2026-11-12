import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg border border-[#E5E5E5] dark:border-[#252525] bg-[#F8F8F8] dark:bg-[#0A0A0A] hover:bg-[#EFEFEF] dark:hover:bg-[#141414] text-[#111111] dark:text-[#A0A0A0] hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center justify-center ${className}`}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#A0A0A0] hover:text-white transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-[#111111] hover:text-black transition-colors" />
      )}
    </motion.button>
  );
}
