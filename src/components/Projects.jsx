import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "queryai",
    title: "QueryAI – Business Intelligence Dashboard",
    subtitle: "Agentic AI · Groq Inference · SQLite",
    description:
      "An intelligent, agentic AI-driven Business Intelligence dashboard that translates natural language inquiries into precision SQL queries, executes them against local databases, and automatically generates interactive Plotly visualizations.",
    tech: ["Python", "Groq API", "SQLite3", "Plotly", "Pandas"],
    github: "https://github.com/raja6294/Querry_V2",
    live: null,
    image: "/project-queryai.jpg",
  },
  {
    id: "rakshanetra",
    title: "RakshaNetra – Smart Surveillance System",
    subtitle: "Computer Vision · Alert Pipeline",
    description:
      "A real-time AI surveillance and theft detection platform combining computer vision models with a modern React interface. Monitors video feeds, identifies anomalous behavior, and triggers automated alerts.",
    tech: ["React", "Python", "OpenCV", "TensorFlow", "Tailwind CSS"],
    github: "https://github.com/raja6294/raksha-netra",
    live: null,
    image: "/project-rakshanetra.jpg",
  },
  {
    id: "journeypal",
    title: "JourneyPal – AI Travel Planner",
    subtitle: "Full-Stack MERN · Hyperledger Fabric",
    description:
      "A full-stack intelligent itinerary generation and travel management application backed by a Hyperledger Fabric distributed ledger for immutable, verified reservation logs.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Hyperledger Fabric"],
    github: "https://github.com/raja6294/Journypal2",
    live: null,
    image: "/project-journeypal.jpg",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
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
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-[#555555] dark:text-[#A0A0A0] text-base sm:text-lg max-w-2xl leading-relaxed">
            Production-ready applications and systems spanning agentic AI, computer vision, distributed ledgers, and full-stack web architectures.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#404040] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              <div>
                {/* Image Preview Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#EFEFEF] dark:bg-[#121212] border-b border-[#E5E5E5] dark:border-[#252525]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-[#0A0A0A] via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#777777] mb-2">
                    {project.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] dark:text-white mb-3 tracking-tight group-hover:text-black dark:group-hover:text-neutral-100">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed line-clamp-4 mb-5">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#252525] text-[#555555] dark:text-[#888888]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-[#EAEAEA] dark:border-[#1C1C1C] flex items-center justify-between mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#111111] dark:text-white hover:underline"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-[#888888] dark:text-[#555555]">Source verified</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/raja6294"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#555555] bg-[#F8F8F8] dark:bg-[#0A0A0A] hover:bg-[#EFEFEF] dark:hover:bg-[#121212] text-sm font-medium text-[#111111] dark:text-white transition-all duration-200 shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Explore all repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
