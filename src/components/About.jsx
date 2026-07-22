import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Rocket, Heart, Download } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "3rd Year B.Tech student in Information Technology",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Passionate about full-stack web development",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Always learning new technologies and frameworks",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Full-Stack Development\nArtificial Intelligence\nUI/UX Design\nPlaying Guitar",
  },
];

function DownloadCVButton() {
  const buttonRef = useRef(null);

  const createRipple = (e) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      animation: cv-ripple 0.65s linear;
      pointer-events: none;
      z-index: 10;
    `;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 750);
  };

  return (
    <>
      <motion.a
        ref={buttonRef}
        href="/resume/Raja_Banerjee_Resume.pdf"
        download="Raja_Banerjee_Resume.pdf"
        onClick={createRipple}
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        aria-label="Download resume PDF"
        className="group cv-download-btn relative overflow-hidden inline-flex items-center justify-center gap-2.5 font-semibold px-8 py-3.5 rounded-xl text-sm text-white mt-2 border border-white/20 bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(14,165,233,0.28)] transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/40 via-sky-400/20 to-violet-500/40 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500" />
        <span className="cv-shimmer absolute inset-0 rounded-xl z-0" />
        <span className="relative z-10 inline-flex items-center gap-2.5 tracking-wide">
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </span>
      </motion.a>

      <style>{`
        @keyframes cv-ripple {
          to { transform: scale(4); opacity: 0; }
        }
        .cv-download-btn {
          box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 10px 30px rgba(14,165,233,0.28);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cv-download-btn:hover {
          box-shadow: 0 0 30px rgba(34,211,238,0.35), 0 12px 40px rgba(139,92,246,0.3);
        }
        .cv-shimmer {
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 60%
          );
          background-size: 200% 200%;
          animation: shimmer-slide 2.5s infinite linear;
          border-radius: inherit;
        }
        @keyframes shimmer-slide {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="section-container relative" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Bio Card + Download CV */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="premium-card p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <span className="text-xl">👨‍💻</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl tracking-wide">Raja Banerjee</h3>
                  <p className="text-xs text-muted-foreground mono-text">@raja6294</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                I'm a 3rd year B.Tech student pursuing Information Technology at{" "}
                <span className="text-foreground font-semibold">JIS College of Engineering</span>.
                My journey in programming started with curiosity about how web technologies interact,
                which blossomed into a deep passion for building high-performance full-stack web applications.
              </p>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                I specialize in the <span className="text-cyan-400 font-semibold">MERN Stack</span> (MongoDB, Express.js, React.js, Node.js)
                and possess a strong foundation in <span className="text-purple-400 font-semibold">C, C++, and Python</span>.
                I am highly motivated to explore emerging architectures and construct robust digital products.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Problem Solver", "Quick Learner", "Team Player", "Detail Oriented"].map((trait) => (
                  <span key={trait} className="tech-badge text-[11px] font-semibold">
                    {trait}
                  </span>
                ))}
              </div>

              {/* Download CV Button */}
              <div className="pt-2">
                <DownloadCVButton />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Highlight Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => {
              const borderColors = [
                "border-l-cyan-500",
                "border-l-purple-500",
                "border-l-indigo-500",
                "border-l-emerald-500",
              ];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`premium-card p-6 card-3d glow-hover group border-l-4 ${borderColors[index % borderColors.length]}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 border border-border/40 transition-colors">
                    <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
