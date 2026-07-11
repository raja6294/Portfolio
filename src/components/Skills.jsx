import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "MERN Stack",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Express.js", level: 88 },
      { name: "React.js", level: 90 },
      { name: "Node.js", level: 85 },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 80 },
      { name: "Python", level: 78 },
      { name: "C/C++", level: 75 },
    ],
  },
  {
    title: "Other Technologies",
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Git & GitHub", level: 85 },
      { name: "REST APIs", level: 88 },
    ],
  },
];

const techStack = [
  "MongoDB", "Express", "React", "Node.js", "JavaScript", "TypeScript",
  "Python", "C++", "Git", "Tailwind CSS", "REST APIs", "PostgreSQL"
];

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground mono-text">{level}%</span>
      </div>
      <div className="skill-progress">
        <motion.div
          className="skill-progress-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute left-0 top-1/2 w-1/3 h-1/2 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

      <div className="section-container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="mono-text text-sm text-primary">// Skills & Technologies</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 space-y-6"
            >
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.3 + categoryIndex * 0.1 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative overflow-hidden py-6"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-4 animate-[slide_30s_linear_infinite] hover:pause">
            {[...techStack, ...techStack].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium whitespace-nowrap border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
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
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
