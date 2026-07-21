import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/services/api";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rajapalpai2022@gmail.com",
    href: "rajapalpai2022@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kolkata, India",
    href: null,
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/raja6294", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rajabanerjee46", label: "LinkedIn" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      await submitContactForm({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      });

      toast.success("Message sent!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      const serverMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to send message. Please try again.";
      toast.error("Error", { description: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Background radial glow */}
      <div className="absolute left-1/4 top-0 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="section-container relative" ref={ref}>
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="premium-card p-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold tracking-wide">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`bg-background/40 border-border/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 rounded-xl py-5 ${errors.name ? "border-destructive focus:ring-destructive" : ""}`}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold tracking-wide">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`bg-background/40 border-border/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 rounded-xl py-5 ${errors.email ? "border-destructive focus:ring-destructive" : ""}`}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold tracking-wide">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`bg-background/40 border-border/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 rounded-xl resize-none ${errors.message ? "border-destructive focus:ring-destructive" : ""}`}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] shimmer-button rounded-xl py-6 transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="premium-card p-6 flex items-center gap-4 glow-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center border border-border/40">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-0.5">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href.startsWith("mailto:") ? info.href : `mailto:${info.href}`}
                        className="font-semibold text-sm hover:text-primary transition-colors animated-underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-sm">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="premium-card p-6"
            >
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-secondary/30 hover:bg-primary/10 border border-border/60 hover:border-primary/40 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="premium-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-sm tracking-wide">Available for opportunities</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm currently open for internships and freelance projects. Let's build something amazing together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
