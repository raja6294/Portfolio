import { motion } from "framer-motion";
import { GraduationCap, Code2, Cpu, Sparkles, FileText } from "lucide-react";

const aboutCards = [
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "B.Tech in Information Technology",
    description: "JIS College of Engineering (2024–2028) · GPA: 8.56/10",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    subtitle: "MERN Stack Specialist",
    description: "Building scalable web architectures with MongoDB, Express, React, and Node.js.",
  },
  {
    icon: Cpu,
    title: "AI & Innovation",
    subtitle: "Agentic Systems & Vision",
    description: "Integrating LLM workflows, computer vision, and machine learning into production apps.",
  },
  {
    icon: Sparkles,
    title: "Core Values",
    subtitle: "Execution & Craftsmanship",
    description: "Clean code, performance-driven design, and continuous technical exploration.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 bg-white dark:bg-[#050505] text-[#111111] dark:text-white border-t border-[#E5E5E5] dark:border-[#252525]/40 transition-colors duration-200"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-mono text-[#777777] mb-2 block">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] dark:text-white mb-6">
            Engineering scalable web apps with precision & purpose
          </h2>
          <div className="space-y-4 text-[#555555] dark:text-[#A0A0A0] text-base sm:text-lg leading-relaxed max-w-3xl">
            <p>
              I'm a 3rd-year Information Technology undergraduate at{" "}
              <span className="text-[#111111] dark:text-white font-medium">JIS College of Engineering</span> with a strong passion
              for constructing resilient, user-centric software.
            </p>
            <p>
              My expertise centers around the <span className="text-[#111111] dark:text-white font-medium">MERN stack</span>, complemented by
              solid fundamentals in Python, Java, C, and C++. Beyond full-stack development, I explore agentic AI workflows,
              computer vision pipelines, and blockchain-based systems.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {["MERN Stack", "Agentic AI", "Python", "Clean Code", "Problem Solving"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono border border-[#E5E5E5] dark:border-[#252525] bg-[#F8F8F8] dark:bg-[#0A0A0A] text-[#555555] dark:text-[#A0A0A0]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 2x2 Clean Minimalist Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#404040] transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl border border-[#E5E5E5] dark:border-[#252525] bg-white dark:bg-[#121212] flex items-center justify-center text-[#111111] dark:text-white mb-5 shadow-sm">
                <card.icon className="w-5 h-5 text-[#555555] dark:text-neutral-300" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] dark:text-white mb-1">{card.title}</h3>
              <p className="text-xs font-mono uppercase tracking-wider text-[#777777] mb-2.5">
                {card.subtitle}
              </p>
              <p className="text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center sm:text-left"
        >
          <a
            href="/resume/Raja_Banerjee_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] dark:text-white hover:text-[#555555] dark:hover:text-[#A0A0A0] transition-colors duration-200"
          >
            <FileText className="w-4 h-4" />
            <span>Read full resume / curriculum vitae →</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
