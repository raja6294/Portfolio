import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Instagram, Linkedin, Mail } from "lucide-react";
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
        const isDark = document.documentElement.classList.contains("dark");
        ctx.fillStyle = isDark
          ? "rgba(6, 182, 212, 0.45)"
          : "rgba(109, 40, 217, 0.35)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

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

// ─── Typing Animation Hook ──────────────────────────────────────────────────────
function useTypingAnimation(roles, speed = 80, deleteSpeed = 50, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? currentRole.slice(0, displayText.length - 1)
        : currentRole.slice(0, displayText.length + 1);
      timeout = setTimeout(() => setDisplayText(nextText), isDeleting ? deleteSpeed : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles, speed, deleteSpeed, pause]);

  return displayText;
}

// ─── Ripple Button Component ────────────────────────────────────────────────────
function RippleButton({ children, href, variant = "primary", className = "", ...props }) {
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
      background: rgba(255,255,255,0.25);
      transform: scale(0);
      animation: ripple-anim 0.6s linear;
      pointer-events: none;
      z-index: 10;
    `;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 px-8 py-3.5 text-sm cursor-pointer select-none";

  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:-translate-y-1 hover:scale-[1.02]",
    outline: "bg-white/5 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1",
    download: "bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:-translate-y-1.5 hover:scale-[1.03]",
  };

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={buttonRef}
      href={href}
      onClick={createRipple}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ─── Main Hero Component ────────────────────────────────────────────────────────
export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const typingRoles = ["Frontend Developer", "UI/UX Designer", "MERN Stack Developer"];
  const typedText = useTypingAnimation(typingRoles);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Dynamic Background - UNCHANGED */}
      <div className="absolute inset-0 grid-pattern opacity-[0.25]" />
      <ParticleCanvas />

      {/* Aurora Radial Glow Blurs - UNCHANGED */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="section-container relative z-10 py-20 w-full">
        <motion.div style={{ y: yParallax, opacity: opacityParallax }}>

          {/* ── Two-Column Hero Layout ── */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

            {/* LEFT: Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 flex justify-center"
            >
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-60 blur-md animate-pulse-glow" />
                {/* Spinning gradient border */}
                <div className="relative p-1 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-purple-500 to-indigo-600 rounded-full animate-spin" style={{ animationDuration: "10s" }} />
                  <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-background z-10 bg-secondary/80">
                    <img
                      src={profilePhoto}
                      alt="Raja Banerjee"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                {/* Decorative floating dots */}
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-3.5 h-3.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </motion.div>

            {/* RIGHT: Text Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 max-w-xl">

              {/* Hi, I'm */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide"
              >
                Hi, I'm
              </motion.p>

              {/* Name — large gradient */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none"
              >
                <span className="hero-name-gradient">Raja Banerjee</span>
              </motion.h1>

              {/* Typing Animation */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="h-9 flex items-center"
              >
                <span className="text-xl md:text-2xl font-bold text-cyan-400 mono-text tracking-wide">
                  {typedText}
                  <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-0.5 animate-blink" />
                </span>
              </motion.div>

              {/* Role tags */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="flex items-center gap-3 text-sm md:text-base text-muted-foreground tracking-wide font-medium"
              >
                <span className="text-foreground font-semibold">MERN Stack Developer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 flex-shrink-0" />
                <span className="text-foreground font-semibold">IT Student</span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="text-muted-foreground text-sm md:text-base leading-relaxed"
              >
                Passionate about building modern, responsive, and AI-powered web applications using the MERN stack while continuously learning new technologies and solving real-world problems.
                Currently pursuing a B.Tech in Information Technology at JIS College of Engineering.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <RippleButton href="#projects" variant="primary">
                  Explore Work
                </RippleButton>
                <RippleButton href="#contact" variant="outline">
                  Get in Touch
                </RippleButton>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-4 pt-2"
              >
                {[
                  { icon: Github, href: "https://github.com/raja6294", label: "GitHub", accent: "#06b6d4", glow: "0 0 15px rgba(6,182,212,0.25)" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/rajabanerjee46", label: "LinkedIn", accent: "#a855f7", glow: "0 0 15px rgba(168,85,247,0.25)" },
                  { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=rajapalpai2022@gmail.com&su=Portfolio%20Contact&body=Hi%20Raja,", label: "Email", accent: "#6366f1", glow: "0 0 15px rgba(99,102,241,0.25)" },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/banerjee._06?igsh=MWt2a2lxZXkxY283Zw==",
                    label: "Instagram",
                    accent: "#ec4899",
                    glow: "0 0 20px rgba(236,72,153,0.45), 0 0 40px rgba(168,85,247,0.25), 0 0 60px rgba(249,115,22,0.2)",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3.5 rounded-xl border border-border/40 bg-white/5 backdrop-blur-md hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-300 ${
                      social.label === "Instagram"
                        ? "hover:bg-gradient-to-br hover:from-pink-500/20 hover:via-purple-500/20 hover:to-orange-400/20"
                        : ""
                    }`}
                    whileHover={{ scale: 1.1, y: -3, boxShadow: social.glow }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label === "Email" ? "Send Email" : social.label}
                    title={social.label === "Email" ? "Send me an Email" : undefined}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
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

      <style>{`
        @keyframes ripple-anim {
          to { transform: scale(4); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .hero-name-gradient {
          background: linear-gradient(135deg, #06b6d4 0%, #38bdf8 35%, #a855f7 70%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(6,182,212,0.3));
        }
      `}</style>
    </section>
  );
}
