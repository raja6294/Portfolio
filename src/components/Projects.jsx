import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Folder, Brain, Shield, Map, BarChart3, Bot, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Static "hardcoded" projects ───────────────────────────────────────────────
const STATIC_PROJECTS = [
  {
    id: "static-1",
    title: "QueryAI – Business Intelligence Dashboard",
    subtitle: "Agentic AI Powered BI",
    description:
      "An intelligent, agentic AI-driven Business Intelligence dashboard that lets you query your data in plain English. Powered by Groq API for blazing-fast inference, it translates natural language into SQL, runs it on SQLite, and renders interactive Plotly charts—turning raw data into actionable insights instantly.",
    tech_stack: ["Python", "Pandas", "NumPy", "SQLite3", "Plotly", "Groq API"],
    github_link: "https://github.com/raja6294/Querry_V2",
    live_link: null,
    featured: true,
    icon: "brain",
    image: "/project-queryai.jpg",
    gradient: "from-cyan-500/20 via-blue-500/10 to-purple-500/20",
    accent: "#06b6d4",
    display_order: 0,
  },
  {
    id: "static-2",
    title: "RakshaNetra – Smart Surveillance System",
    subtitle: "AI-Powered Theft Detection",
    description:
      "A real-time AI-powered theft detection and surveillance platform. Combines computer vision models with a sleek React + Tailwind frontend and a Python backend to detect suspicious activity, send instant alerts, and provide a live monitoring dashboard for security operators.",
    tech_stack: ["React", "Tailwind CSS", "Python", "OpenCV", "TensorFlow", "SQLite"],
    github_link: "https://github.com/raja6294/raksha-netra",
    live_link: null,
    featured: true,
    icon: "shield",
    image: "/project-rakshanetra.jpg",
    gradient: "from-rose-500/20 via-orange-500/10 to-yellow-500/20",
    accent: "#f43f5e",
    display_order: 1,
  },
  {
    id: "static-3",
    title: "JourneyPal – AI Travel Planner",
    subtitle: "Blockchain-Backed Trip Management",
    description:
      "A full-stack AI travel planning platform that crafts personalized itineraries, manages bookings, and records trip data on a Hyperledger Fabric blockchain for tamper-proof travel history. Features a React frontend, Node.js REST API, and MongoDB database.",
    tech_stack: ["React", "Node.js", "Hyperledger Fabric", "MongoDB", "Express", "AI/ML"],
    github_link: "https://github.com/raja6294/Journypal2",
    live_link: null,
    featured: true,
    icon: "map",
    image: "/project-journeypal.jpg",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    accent: "#10b981",
    display_order: 2,
  },
];

// ─── Icon resolver ──────────────────────────────────────────────────────────────
function ProjectIcon({ iconName, style, className }) {
  const icons = {
    brain: Brain,
    shield: Shield,
    map: Map,
    chart: BarChart3,
    bot: Bot,
    globe: Globe,
    folder: Folder,
  };
  const Icon = icons[iconName] || Folder;
  return <Icon className={className} style={style} />;
}

// ─── Tech badge color mapping ───────────────────────────────────────────────────
const TECH_COLORS = {
  Python: { bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/30" },
  React: { bg: "bg-cyan-500/15", text: "text-cyan-400", border: "border-cyan-500/30" },
  "Node.js": { bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/30" },
  MongoDB: { bg: "bg-green-600/15", text: "text-green-500", border: "border-green-600/30" },
  "Tailwind CSS": { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/30" },
  "Groq API": { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30" },
  Plotly: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/30" },
  SQLite3: { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/30" },
  Pandas: { bg: "bg-indigo-500/15", text: "text-indigo-400", border: "border-indigo-500/30" },
  NumPy: { bg: "bg-blue-600/15", text: "text-blue-500", border: "border-blue-600/30" },
  OpenCV: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30" },
  TensorFlow: { bg: "bg-orange-600/15", text: "text-orange-500", border: "border-orange-600/30" },
  "Hyperledger Fabric": { bg: "bg-teal-500/15", text: "text-teal-400", border: "border-teal-500/30" },
  "AI/ML": { bg: "bg-violet-500/15", text: "text-violet-400", border: "border-violet-500/30" },
  SQLite: { bg: "bg-yellow-600/15", text: "text-yellow-500", border: "border-yellow-600/30" },
  Express: { bg: "bg-gray-500/15", text: "text-gray-400", border: "border-gray-500/30" },
};

function TechBadge({ tech }) {
  const colors = TECH_COLORS[tech] || {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border
        ${colors.bg} ${colors.text} ${colors.border}
        transition-all duration-200 hover:scale-105 cursor-default`}
    >
      {tech}
    </span>
  );
}

// ─── Project Card ───────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const gradient = project.gradient || "from-primary/20 via-accent/10 to-primary/5";
  const accentColor = project.accent || "hsl(var(--primary))";
  const iconName = project.icon || "folder";

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Outer glow ring on hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentColor}60, transparent 60%, ${accentColor}30)`,
        }}
      />

      <div
        className="relative rounded-2xl overflow-hidden h-full flex flex-col"
        style={{
          background: "hsl(var(--glass-bg))",
          border: "1px solid hsl(var(--glass-border))",
          backdropFilter: "blur(20px)",
          boxShadow: hovered
            ? `0 20px 60px ${accentColor}25, 0 4px 16px hsl(0,0%,0%/0.3)`
            : "0 4px 24px hsl(0,0%,0%/0.15)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Mouse-follow spotlight */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${accentColor}40 0%, transparent 60%)`,
            }}
          />
        )}

        {/* ── Header Banner ── */}
        <div
          className={`relative h-44 overflow-hidden flex items-center justify-center flex-shrink-0`}
          style={{
            background: project.image ? undefined : `linear-gradient(135deg, ${accentColor}18, transparent)`,
          }}
        >
          {/* Screenshot background image */}
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Always-on dim overlay so content stays legible */}
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
              {/* Accent colour vignette at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-16"
                style={{ background: `linear-gradient(to top, ${accentColor}30, transparent)` }}
              />
            </>
          ) : (
            <>
              {/* Animated grid lines (fallback) */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
              {/* Floating glow circle (fallback) */}
              <motion.div
                className="absolute w-32 h-32 rounded-full"
                style={{ background: accentColor, filter: "blur(30px)", opacity: 0.1 }}
                animate={hovered ? { scale: 1.5, opacity: 0.18 } : { scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.5 }}
              />
            </>
          )}

          {/* Central icon — always visible (semi-transparent when image is present) */}
          <motion.div
            className="relative z-10 p-4 rounded-2xl"
            style={{
              background: project.image ? `${accentColor}25` : `${accentColor}20`,
              border: `1px solid ${accentColor}55`,
              boxShadow: `0 0 30px ${accentColor}40`,
              backdropFilter: "blur(6px)",
            }}
            animate={hovered ? { scale: 1.15, rotate: 6, opacity: project.image ? 0 : 1 } : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ProjectIcon
              iconName={iconName}
              className="w-9 h-9"
              style={{ color: accentColor }}
            />
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              className="absolute top-3 right-3 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 + 0.3 }}
            >
              <span
                className="px-3 py-1 text-[11px] font-bold rounded-full tracking-wider uppercase"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`,
                  color: "#fff",
                  boxShadow: `0 2px 12px ${accentColor}60`,
                }}
              >
                Featured
              </span>
            </motion.div>
          )}

          {/* Hover overlay with links */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-20 flex items-center justify-center gap-4"
                style={{ background: "hsl(var(--background)/0.85)", backdropFilter: "blur(4px)" }}
              >
                {project.github_link && (
                  <motion.a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
                    style={{
                      background: `${accentColor}20`,
                      border: `1px solid ${accentColor}50`,
                      color: accentColor,
                    }}
                    whileHover={{ scale: 1.08, boxShadow: `0 0 20px ${accentColor}50` }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </motion.a>
                )}
                {project.live_link && (
                  <motion.a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
                    style={{
                      background: accentColor,
                      color: "#fff",
                      boxShadow: `0 4px 16px ${accentColor}60`,
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 p-6 space-y-3 flex flex-col flex-1">
          {/* Subtitle */}
          {project.subtitle && (
            <p
              className="text-[11px] font-bold uppercase tracking-widest mono-text"
              style={{ color: accentColor }}
            >
              {project.subtitle}
            </p>
          )}

          {/* Title */}
          <h3
            className="font-bold text-lg leading-snug transition-colors duration-300"
            style={{ color: hovered ? accentColor : undefined }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.tech_stack || []).slice(0, 5).map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {(project.tech_stack || []).length > 5 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-muted text-muted-foreground border border-border">
                +{project.tech_stack.length - 5} more
              </span>
            )}
          </div>

          {/* Bottom action row */}
          <div className="flex items-center gap-3 pt-2 border-t border-border/50">
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors animated-underline"
              >
                <Github className="w-3.5 h-3.5" />
                View Source
              </a>
            )}
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium ml-auto"
                style={{ color: accentColor }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────────
export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Use static projects — no backend fetch needed for portfolio display
  const allProjects = STATIC_PROJECTS;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <div className="section-container relative" ref={ref}>
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            A curated selection of projects spanning agentic AI, computer vision, blockchain, and
            full-stack development — built to solve real-world problems.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Button asChild variant="outline" size="lg" className="gap-2 group">
            <a
              href="https://github.com/raja6294"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              View All on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
