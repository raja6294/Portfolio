import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.png";

// ─── Particle Canvas Background Component ──────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 160 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.density = Math.random() * 20 + 5;
      }

      draw() {
        // Detect light/dark mode dynamically
        const isDark = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDark
          ? "rgba(6, 182, 212, 0.45)" // Cyber Cyan
          : "rgba(109, 40, 217, 0.35)"; // Royal Purple
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Natural floating
        this.x += this.vx;
        this.y += this.vy;

        // Boundary bounce
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Interactive mouse repulsion
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density * 0.7;
            let directionY = forceDirectionY * force * this.density * 0.7;
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 120);
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const drawLines = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = isDark ? "6, 182, 212" : "109, 40, 217";

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const alpha = (1 - distance / 110) * 0.15;
            ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform bindings
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.25]" />
      <ParticleCanvas />

      {/* Aurora Radial Glow Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="section-container relative z-10 py-20 text-center">
        <motion.div style={{ y: yParallax, opacity: opacityParallax }} className="space-y-8">
          
          {/* Avatar / Profile photo with glowing dynamic accent rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <div className="relative group p-1.5 rounded-full overflow-hidden">
              {/* Pulsing Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-purple-500 to-indigo-600 rounded-full animate-spin" style={{ animationDuration: "12s" }} />
              
              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-background z-10 bg-secondary/80">
                <img
                  src={profilePhoto}
                  alt="Raja Banerjee"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Greeting Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2"
          >
            <span className="mono-text text-xs tracking-widest text-primary px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              SYSTEM STATUS: ONLINE
            </span>
          </motion.div>

          {/* Name Header */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
          >
            <span className="gradient-text">Raja Banerjee</span>
          </motion.h1>

          {/* Role (Clean typography, no < /> tags) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-3 text-base md:text-lg text-muted-foreground tracking-wide font-medium"
          >
            <span className="text-foreground">MERN Stack Developer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <span className="text-foreground">IT Student</span>
          </motion.div>

          {/* Tagline / Bio statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed font-normal"
          >
            Architecting high-performance web applications using robust engineering workflows.
            Currently studying Information Technology at JIS College of Engineering.
          </motion.p>

          {/* CTA Buttons with shimmers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <Button
              asChild
              size="lg"
              className="shimmer-button relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] px-8 py-6 rounded-xl transition-all"
            >
              <a href="#projects">Explore Work</a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border/60 hover:bg-secondary/40 hover:text-foreground backdrop-blur-md px-8 py-6 rounded-xl text-muted-foreground font-semibold"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center justify-center gap-4 pt-6"
          >
            {[
              { icon: Github, href: "https://github.com/raja6294", label: "GitHub", accent: "#06b6d4" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/rajabanerjee46", label: "LinkedIn", accent: "#a855f7" },
              { icon: Mail, href: "mailto:rajapalpai2022@gmail.com", label: "Email", accent: "#6366f1" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-border/40 bg-secondary/20 hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3, boxShadow: `0 0 15px ${social.accent}25` }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground/60">Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/60" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
