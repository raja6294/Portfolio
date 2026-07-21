import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Sparkles } from "lucide-react";

// ─── Icon CDN Bases ───────────────────────────────────────────────────────────
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";

// ─── Inline SVG Icons (guaranteed dark-mode visibility) ──────────────────────
const ChatGPTIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.313-3.089 10.079 10.079 0 0 0-10.474 4.978 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.313 3.088 10.079 10.079 0 0 0 10.474-4.978 9.967 9.967 0 0 0 6.664-4.834 10.079 10.079 0 0 0-1.24-11.816zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5V18z"
      fill="currentColor"
    />
  </svg>
);

const AdobeXDIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.966 1.429H4.357A2.928 2.928 0 001.43 4.357v15.286a2.928 2.928 0 002.928 2.928h15.285a2.928 2.928 0 002.929-2.928V9.608zm-.358 11.01l-2.732-4.114-2.76 4.114H6.39l3.664-5.22-3.397-4.828h1.814l2.494 3.815 2.467-3.815h1.697l-3.383 4.8 3.678 5.248zm3.287 0l-1.131-2.886-.524-1.436-.516 1.436-1.117 2.886h-1.48l2.479-5.22-2.354-4.828h1.47l.994 2.76.413 1.155.399-1.155.98-2.76h1.47l-2.34 4.8 2.494 5.248z"
      fill="#FF61F6"
    />
  </svg>
);

// ─── Skill Categories Data ────────────────────────────────────────────────────
const skillCategories = [
  {
    title: "Frontend",
    accentColor: "#06b6d4",
    skills: [
      { name: "HTML5",       iconUrl: `${DI}/html5/html5-original.svg` },
      { name: "CSS3",        iconUrl: `${DI}/css3/css3-original.svg` },
      { name: "JavaScript",  iconUrl: `${DI}/javascript/javascript-original.svg` },
      { name: "React.js",    iconUrl: `${DI}/react/react-original.svg` },
      { name: "Tailwind CSS",iconUrl: `${DI}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    title: "UI/UX",
    accentColor: "#ec4899",
    skills: [
      { name: "Figma",    iconUrl: `${DI}/figma/figma-original.svg` },
      { name: "Adobe XD", InlineSVG: AdobeXDIcon },
    ],
  },
  {
    title: "Backend",
    accentColor: "#10b981",
    skills: [
      { name: "Node.js",    iconUrl: `${DI}/nodejs/nodejs-original.svg` },
      { name: "Express.js", iconUrl: `${DI}/express/express-original.svg`, darkInvert: true },
      { name: "MongoDB",    iconUrl: `${DI}/mongodb/mongodb-original.svg` },
      { name: "REST APIs",  LucideIcon: Globe, iconColor: "#06b6d4" },
    ],
  },
  {
    title: "Programming Languages",
    accentColor: "#3b82f6",
    skills: [
      { name: "Java",       iconUrl: `${DI}/java/java-original.svg` },
      { name: "Python",     iconUrl: `${DI}/python/python-original.svg` },
      { name: "C",          iconUrl: `${DI}/c/c-original.svg` },
      { name: "C++",        iconUrl: `${DI}/cplusplus/cplusplus-original.svg` },
      { name: "JavaScript", iconUrl: `${DI}/javascript/javascript-original.svg` },
    ],
  },
  {
    title: "Tools & Others",
    accentColor: "#6366f1",
    skills: [
      { name: "Git",     iconUrl: `${DI}/git/git-original.svg` },
      { name: "GitHub",  iconUrl: `${DI}/github/github-original.svg`, darkInvert: true },
      { name: "VS Code", iconUrl: `${DI}/vscode/vscode-original.svg` },
      { name: "Postman", iconUrl: `${SI}/postman/FF6C37` },
    ],
  },
  {
    title: "AI Tools",
    accentColor: "#8b5cf6",
    skills: [
      { name: "ChatGPT",       InlineSVG: ChatGPTIcon, iconColor: "#10A37F" },
      { name: "Antigravity",   LucideIcon: Sparkles,   iconColor: "#8b5cf6" },
      { name: "Cursor",        iconUrl: `${SI}/cursor/00A67E` },
      { name: "GitHub Copilot",iconUrl: `${SI}/githubcopilot/8957E5` },
      { name: "Claude",        iconUrl: `${SI}/anthropic/D4A27F` },
    ],
  },
];

// Scrolling tech banner items
const techBanner = [
  "HTML5","CSS3","JavaScript","React","Tailwind CSS",
  "Node.js","Express","MongoDB","Java","Python","C++",
  "Git","Figma","ChatGPT","VS Code","GitHub Copilot",
];

// ─── Skill Chip (2-col grid item) ─────────────────────────────────────────────
function SkillChip({ skill, accentColor, index }) {
  const InlineSVGIcon = skill.InlineSVG || null;
  const LucideIconComp = skill.LucideIcon || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: 0.08 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -3,
        boxShadow: `0 0 18px ${accentColor}28, 0 6px 18px rgba(0,0,0,0.22)`,
        borderColor: `${accentColor}55`,
        transition: { duration: 0.22 },
      }}
      whileTap={{ scale: 0.96 }}
      className="skill-chip group cursor-default"
    >
      {/* Icon */}
      <span className="skill-chip-icon">
        {skill.iconUrl ? (
          <img
            src={skill.iconUrl}
            alt={skill.name}
            className={`w-[22px] h-[22px] object-contain transition-transform duration-300 group-hover:scale-110 ${
              skill.darkInvert ? "dark:invert dark:brightness-200" : ""
            }`}
            loading="lazy"
            draggable="false"
          />
        ) : InlineSVGIcon ? (
          <span
            className="transition-transform duration-300 group-hover:scale-110 inline-flex"
            style={{ color: skill.iconColor || accentColor }}
          >
            <InlineSVGIcon size={22} />
          </span>
        ) : LucideIconComp ? (
          <LucideIconComp
            className="w-[22px] h-[22px] transition-transform duration-300 group-hover:scale-110"
            style={{ color: skill.iconColor || accentColor }}
          />
        ) : null}
      </span>

      {/* Label */}
      <span className="skill-chip-label">{skill.name}</span>
    </motion.div>
  );
}

// ─── Main Skills Section ──────────────────────────────────────────────────────
export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Ambient glow blobs */}
      <div className="absolute left-0 top-1/2 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[90px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[80px] translate-x-1/3 pointer-events-none" />
      <div className="absolute right-1/4 top-1/4 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="section-container relative" ref={ref}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-lg mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* ── Categories Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: catIndex * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="skill-category-card group/card"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: category.accentColor,
                    boxShadow: `0 0 8px ${category.accentColor}80`,
                  }}
                />
                <h3 className="font-bold text-sm md:text-base tracking-wide text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* 2-column chip grid */}
              <div className="grid grid-cols-2 gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillChip
                    key={`${category.title}-${skill.name}`}
                    skill={skill}
                    accentColor={category.accentColor}
                    index={skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Scrolling Tech Banner ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative overflow-hidden py-6 rounded-2xl border border-border/40 bg-secondary/15 backdrop-blur-md"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-3 animate-[slide_38s_linear_infinite] hover:[animation-play-state:paused]">
            {[...techBanner, ...techBanner].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="px-5 py-2 rounded-full bg-background border border-border/60 hover:border-primary/50 text-sm font-semibold hover:bg-primary/5 transition-all duration-300 cursor-default shadow-sm whitespace-nowrap text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
