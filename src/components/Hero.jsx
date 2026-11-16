import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Instagram, Mail } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/raja6294",
    title: "GitHub Profile",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/rajabanerjee46",
    title: "LinkedIn Profile",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/banerjee._06/",
    title: "Instagram Profile",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:rajapalpai2022@gmail.com",
    title: "Email Raja",
  },
];

export function Hero() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white dark:bg-[#050505] text-[#111111] dark:text-white px-4 sm:px-6 lg:px-8 py-20 overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 sm:mb-10"
        >
          <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-[180px] md:h-[180px] rounded-full overflow-hidden border border-[#E5E5E5] dark:border-[#252525] bg-[#F8F8F8] dark:bg-[#0A0A0A] shadow-lg dark:shadow-2xl transition-transform duration-500 hover:scale-105">
            <img
              src={profilePhoto}
              alt="Raja Banerjee"
              className="w-full h-full object-cover object-top select-none"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Greeting & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-6 sm:mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] dark:text-white">
            Hi, I'm Raja Banerjee
          </h1>
        </motion.div>

        {/* Professional Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#555555] dark:text-[#A0A0A0] max-w-[650px] leading-relaxed mb-8 sm:mb-10 text-balance font-normal"
        >
          MERN Stack Developer building modern, scalable web applications,
          exploring AI-powered solutions .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-10 sm:mb-12"
        >
          {/* Primary CTA */}
          <motion.a
            href="#projects"
            onClick={handleScrollToProjects}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-semibold text-sm transition-colors duration-200 shadow-sm"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="/resume/Raja_Banerjee_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#555555] hover:bg-neutral-100 dark:hover:bg-white/[0.04] text-[#111111] dark:text-white font-medium text-sm transition-all duration-200"
          >
            <span>View Resume</span>
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6 text-[#777777]"
        >
          {socialLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              aria-label={item.name}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
            >
              <item.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
