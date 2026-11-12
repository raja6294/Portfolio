import { motion } from "framer-motion";
import { Code, Server, Terminal, Wrench, Cpu } from "lucide-react";

// Clean devicon and simpleicon bases
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend Engineering",
    description: "Responsive, accessible, and fast web interfaces",
    skills: [
      { name: "React.js", icon: `${DI}/react/react-original.svg` },
      { name: "Tailwind CSS", icon: `${DI}/tailwindcss/tailwindcss-original.svg` },
      { name: "JavaScript (ES6+)", icon: `${DI}/javascript/javascript-original.svg` },
      { name: "HTML5", icon: `${DI}/html5/html5-original.svg` },
      { name: "CSS3", icon: `${DI}/css3/css3-original.svg` },
    ],
  },
  {
    icon: Server,
    title: "Backend & Databases",
    description: "RESTful APIs, microservices, and database modeling",
    skills: [
      { name: "Node.js", icon: `${DI}/nodejs/nodejs-original.svg` },
      { name: "Express.js", icon: `${DI}/express/express-original.svg`, invertDark: true },
      { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg` },
      { name: "SQLite3", icon: `${DI}/sqlite/sqlite-original.svg` },
      { name: "REST APIs", icon: null },
    ],
  },
  {
    icon: Terminal,
    title: "Programming Languages",
    description: "Strong data structures and algorithmic fundamentals",
    skills: [
      { name: "Java", icon: `${DI}/java/java-original.svg` },
      { name: "Python", icon: `${DI}/python/python-original.svg` },
      { name: "C++", icon: `${DI}/cplusplus/cplusplus-original.svg` },
      { name: "C", icon: `${DI}/c/c-original.svg` },
    ],
  },
  {
    icon: Cpu,
    title: "AI & Emerging Tech",
    description: "Agentic pipelines, computer vision, and distributed ledger",
    skills: [
      { name: "Groq API / LLMs", icon: null },
      { name: "OpenCV", icon: `${DI}/opencv/opencv-original.svg` },
      { name: "TensorFlow", icon: `${DI}/tensorflow/tensorflow-original.svg` },
      { name: "Hyperledger Fabric", icon: null },
    ],
  },
  {
    icon: Wrench,
    title: "Developer Tools",
    description: "Version control, API testing, and modern dev environments",
    skills: [
      { name: "Git", icon: `${DI}/git/git-original.svg` },
      { name: "GitHub", icon: `${DI}/github/github-original.svg`, invertDark: true },
      { name: "Postman", icon: `${SI}/postman/FF6C37` },
      { name: "VS Code", icon: `${DI}/vscode/vscode-original.svg` },
    ],
  },
];

const techMarquee = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Python",
  "Java",
  "C++",
  "Groq API",
  "OpenCV",
  "TensorFlow",
  "Hyperledger Fabric",
  "Git & GitHub",
  "Postman",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 sm:py-32 bg-white dark:bg-[#050505] text-[#111111] dark:text-white border-t border-[#E5E5E5] dark:border-[#252525]/40 transition-colors duration-200"
    >
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-mono text-[#777777] mb-2 block">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] dark:text-white mb-4">
            Tech Stack & Expertise
          </h2>
          <p className="text-[#555555] dark:text-[#A0A0A0] text-base sm:text-lg max-w-2xl leading-relaxed">
            The core tools, languages, and frameworks I use to build robust full-stack software and AI systems.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
              className="p-6 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#404040] transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg border border-[#E5E5E5] dark:border-[#252525] bg-white dark:bg-[#121212] flex items-center justify-center text-[#111111] dark:text-white shadow-sm">
                    <category.icon className="w-4 h-4 text-[#555555] dark:text-neutral-300" />
                  </div>
                  <h3 className="text-base font-semibold text-[#111111] dark:text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <p className="text-xs text-[#777777] leading-relaxed mb-5">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EAEAEA] dark:border-[#1C1C1C]">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white dark:bg-[#121212] border border-[#E5E5E5] dark:border-[#252525] text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white hover:border-[#CCCCCC] dark:hover:border-[#404040] transition-colors duration-150"
                  >
                    {skill.icon && (
                      <img
                        src={skill.icon}
                        alt=""
                        className={`w-3.5 h-3.5 object-contain opacity-85 group-hover:opacity-100 ${
                          skill.invertDark ? "dark:invert" : ""
                        }`}
                        loading="lazy"
                      />
                    )}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Marquee / Ticker */}
        <div className="relative overflow-hidden py-4 rounded-xl border border-[#E5E5E5] dark:border-[#252525] bg-[#F8F8F8]/60 dark:bg-[#0A0A0A]/60">
          <div className="flex gap-4 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-xs font-mono text-[#777777] tracking-wider uppercase flex items-center gap-3"
              >
                <span>{tech}</span>
                <span className="text-[#CCCCCC] dark:text-[#333333]">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
