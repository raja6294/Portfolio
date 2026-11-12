import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Instagram, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/services/api";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please provide a valid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rajapalpai2022@gmail.com",
    href: "mailto:rajapalpai2022@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kolkata, India",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/raja6294",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rajabanerjee46",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/banerjee._06/",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submissions

    setErrors({});
    setSubmitStatus(null);

    // Validate inputs
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
      const response = await submitContactForm({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
      });

      const successMessage =
        response.message ||
        "Message delivered successfully. I will get back to you soon.";

      setSubmitStatus({ type: "success", message: successMessage });
      toast.success(successMessage);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      const serverMsg =
        err?.message ||
        "Failed to send message. Please verify your EmailJS configuration or reach out at rajapalpai2022@gmail.com.";
      setSubmitStatus({ type: "error", message: serverMsg });
      toast.error(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
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
            Initiate Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] dark:text-white mb-4">
            Let's build something together
          </h2>
          <p className="text-[#555555] dark:text-[#A0A0A0] text-base sm:text-lg max-w-2xl leading-relaxed">
            Have a project in mind, an internship opportunity, or want to discuss full-stack & AI architecture? Send a message directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-7 sm:p-8 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] space-y-5 shadow-sm"
            >
              {submitStatus?.type === "success" && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-emerald-300 dark:border-neutral-700 bg-emerald-50 dark:bg-neutral-900 p-4 text-xs sm:text-sm text-emerald-800 dark:text-neutral-200"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-white" />
                  <p>{submitStatus.message}</p>
                </div>
              )}

              {submitStatus?.type === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-300 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-4 text-xs sm:text-sm text-red-800 dark:text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                  <p>{submitStatus.message}</p>
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-[#555555] dark:text-[#A0A0A0]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F3F4F6] dark:bg-[#151515] border text-sm text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#555555] transition-colors focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#E5E5E5] dark:border-[#252525] focus:border-[#111111] dark:focus:border-white"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[#555555] dark:text-[#A0A0A0]">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F3F4F6] dark:bg-[#151515] border text-sm text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#555555] transition-colors focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#E5E5E5] dark:border-[#252525] focus:border-[#111111] dark:focus:border-white"
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-[#555555] dark:text-[#A0A0A0]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or role..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#F3F4F6] dark:bg-[#151515] border text-sm text-[#111111] dark:text-white placeholder:text-[#888888] dark:placeholder:text-[#555555] transition-colors focus:outline-none resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#E5E5E5] dark:border-[#252525] focus:border-[#111111] dark:focus:border-white"
                  }`}
                />
                {errors.message && <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.message}</p>}
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-semibold text-sm transition-colors duration-200 disabled:opacity-50 shadow-sm cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                    Transmitting...
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right: Contact Information & Social (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Details */}
            <div className="p-6 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] space-y-4 shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777777] block">
                Direct Contact
              </span>

              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg border border-[#E5E5E5] dark:border-[#252525] bg-white dark:bg-[#121212] flex items-center justify-center shrink-0 text-[#111111] dark:text-white mt-0.5 shadow-sm">
                    <info.icon className="w-4 h-4 text-[#555555] dark:text-neutral-300" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#777777] uppercase">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium text-[#111111] dark:text-white hover:text-[#555555] dark:hover:text-neutral-300 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-[#111111] dark:text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] shadow-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-[#777777] block mb-4">
                Social Profiles
              </span>
              <div className="flex flex-col gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#050505] border border-[#E5E5E5] dark:border-[#252525] hover:border-[#CCCCCC] dark:hover:border-[#404040] text-[#555555] dark:text-[#A0A0A0] hover:text-[#111111] dark:hover:text-white transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#777777]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="p-6 rounded-2xl bg-[#F8F8F8] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#252525] shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-[#111111] dark:text-white">
                  Available for opportunities
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#555555] dark:text-[#A0A0A0] leading-relaxed">
                Currently open to software engineering internships, frontend/MERN roles, and freelance collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
