import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 bg-white dark:bg-[#050505] border-t border-[#E5E5E5] dark:border-[#252525]/60 text-[#111111] dark:text-white transition-colors duration-200">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-xs text-[#777777] font-mono text-center sm:text-left">
            © {currentYear} Raja Banerjee · Kolkata, India
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-[#777777]">
            <a
              href="https://github.com/raja6294"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/rajabanerjee46"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/banerjee._06/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:rajapalpai2022@gmail.com"
              aria-label="Email"
              className="hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#777777] hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
