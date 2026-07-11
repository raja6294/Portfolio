import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Rocket, Heart } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "2nd Year B.Tech student in Information Technology",
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
    description: "Creating clean, efficient, and user-friendly solutions",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="section-container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="mono-text text-sm text-primary">// About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-2xl">👨‍💻</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Raja Banerjee</h3>
                  <p className="text-sm text-muted-foreground mono-text">@rajabanerjee</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                I'm a 2nd year B.Tech student pursuing Information Technology at{" "}
                <span className="text-foreground font-medium">JIS College of Engineering</span>.
                My journey in programming started with curiosity about how websites work,
                and it has evolved into a deep passion for building full-stack web applications.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I specialize in the <span className="text-primary font-medium">MERN Stack</span> (MongoDB, Express.js, React.js, Node.js)
                and have strong foundations in <span className="text-primary font-medium">C, C++, and Python</span>.
                I'm always excited to learn new technologies and contribute to innovative projects.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["Problem Solver", "Quick Learner", "Team Player", "Detail Oriented"].map((trait) => (
                  <span key={trait} className="tech-badge">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="glass-card p-6 card-3d glow-hover group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
