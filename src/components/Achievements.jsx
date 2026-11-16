import { motion } from "framer-motion";
import { Trophy, Award, Calendar, GraduationCap } from "lucide-react";

const achievements = [
  {
    title: "1st Position – CRAZY BUILD Hackathon",
    badge: "1st Place Winner",
    date: "2026",
    organization: "Hackathon Circuit",
    description:
      "Awarded 1st place for architectural design and rapid end-to-end full-stack development of an interactive software prototype under strict 24-hour sprint conditions.",
  },

  {
    title: "3rd Position – College Technical Fest",
    badge: "3rd Place Winner",
    date: "2026",
    organization: "JIS College of Engineering",
    description:
      "Won 3rd place for RakshaNetra, an AI-powered smart surveillance platform utilizing computer vision models for automated intrusion detection and alert dispatch.",
  },
  {
    title: "NPTEL Elite Certification – 83% (Programming in Java)",
    badge: "Elite Distinction",
    date: "2026",
    organization: "NPTEL / IIT",
    description:
      "Earned Elite status with an 83% score in Java programming, covering advanced object-oriented paradigms, concurrency, and algorithmic problem-solving.",
  },
];

const educationTimeline = [
  {
    degree: "B.Tech in Information Technology",
    institution: "JIS College of Engineering",
    period: "2024 — 2028",
    score: "GPA: 8.56 / 10",
    details:
      "Rigorous coursework covering Data Structures & Algorithms, Database Management Systems, Computer Networks, and Full-Stack Web Technologies.",
  },
  {
    degree: "Higher Secondary (WBCHSE)",
    institution: "Nakrakonda High School",
    period: "2021 — 2023",
    score: "88% Aggregate",
    details:
      "Specialized in the Science stream with primary focus on Mathematics, Physics, Chemistry, and Computer Science.",
  },
];

export function Achievements() {
  return (
    <section
      id="achievements"
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
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] dark:text-white mb-4">
            Achievements & Education
          </h2>
          <p className="text-[#555555] dark:text-[#A0A0A0] text-base sm:text-lg max-w-2xl leading-relaxed">
            Honors, hackathon placements, certifications, and academic background.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column: Achievements (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-[#111111] dark:text-white" />
              <h3 className="text-base font-semibold text-[#111111] dark:text-white uppercase tracking-wider font-mono text-xs">
                Recognitions & Hackathons
              </h3>
            </div>

            <div className="space-y-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-6 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#404040] transition-colors duration-200 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#252525] text-[#555555] dark:text-[#A0A0A0] mb-2">
                        {item.badge}
                      </span>
                      <h4 className="text-base font-semibold text-[#111111] dark:text-white tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#777777] shrink-0 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#777777] mb-2.5">
                    {item.organization}
                  </p>
                  <p className="text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Education Timeline (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-[#111111] dark:text-white" />
              <h3 className="text-base font-semibold text-[#111111] dark:text-white uppercase tracking-wider font-mono text-xs">
                Education
              </h3>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l border-[#E5E5E5] dark:border-[#252525] space-y-8 ml-2">
              {educationTimeline.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline bullet */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-white dark:bg-[#050505] border-2 border-[#111111] dark:border-white group-hover:bg-[#111111] dark:group-hover:bg-white transition-colors duration-200" />

                  <div className="p-5 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#404040] transition-colors duration-200 shadow-sm">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-[#777777]">
                        {edu.period}
                      </span>
                      <span className="text-xs font-mono text-[#111111] dark:text-white px-2 py-0.5 rounded bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#252525]">
                        {edu.score}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-semibold text-[#111111] dark:text-white tracking-tight mb-1">
                      {edu.degree}
                    </h4>

                    <p className="text-xs font-mono text-[#777777] mb-3">
                      {edu.institution}
                    </p>

                    <p className="text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
