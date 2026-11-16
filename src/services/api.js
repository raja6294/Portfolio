import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
  import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Direct, permanent, publicly accessible HTTPS logo URL for email clients
const PUBLIC_LOGO_URL =
  "https://raw.githubusercontent.com/raja6294/Portfolio/main/public/logo-raja.jpg";

/**
 * Sends contact form messages directly from the browser using EmailJS SDK.
 * Dynamically passes all required template variables for both owner notification
 * and automatic confirmation emails (name, request, message, company name, logo).
 *
 * @param {{ name: string, email: string, message: string }} payload
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitContactForm({ name, email, message }) {
  // Guard against missing or placeholder configuration
  if (
    !SERVICE_ID ||
    !TEMPLATE_ID ||
    !PUBLIC_KEY ||
    SERVICE_ID.includes("your_service_id") ||
    SERVICE_ID.includes("xxxxxxx") ||
    TEMPLATE_ID.includes("your_template_id") ||
    TEMPLATE_ID.includes("xxxxxxx") ||
    PUBLIC_KEY.includes("your_public_key") ||
    PUBLIC_KEY.includes("xxxxxxx")
  ) {
    throw new Error(
      "EmailJS is not configured. Please set valid VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file."
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  // Comprehensive parameter mapping to ensure 100% compatibility with:
  // - Owner notification templates (from_name, from_email, message, to_email)
  // - EmailJS auto-reply confirmation templates (to_name, request, message, company_name, logo_url)
  const templateParams = {
    // 1. Recipient & sender name variants (fixes "Hi ,")
    name: trimmedName,
    to_name: trimmedName,
    from_name: trimmedName,
    user_name: trimmedName,
    client_name: trimmedName,

    // 2. Email & Reply-To variants
    email: trimmedEmail,
    from_email: trimmedEmail,
    user_email: trimmedEmail,
    reply_to: trimmedEmail,
    to_email: "rajapalpai2022@gmail.com",

    // 3. Message & Request variants (fixes `We have received your request: ""`)
    message: trimmedMessage,
    request: trimmedMessage,
    user_message: trimmedMessage,
    user_request: trimmedMessage,
    inquiry: trimmedMessage,

    // 4. Organization & Team naming (fixes `The [Company Name] Team`)
    company_name: "Raja Banerjee",
    team_name: "Raja Banerjee",
    sender_name: "Raja Banerjee",

    // 5. Publicly accessible HTTPS logo URL (fixes broken logo image)
    logo_url: PUBLIC_LOGO_URL,
    logo: PUBLIC_LOGO_URL,
    profile_photo_url: PUBLIC_LOGO_URL,

    // 6. Submission timestamp
    time: submittedAt,
    date: submittedAt,
    submitted_at: submittedAt,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Message delivered successfully. Please check your email for confirmation.",
      };
    } else {
      throw new Error(
        `EmailJS responded with non-200 status: ${response.status} (${response.text || "Unknown"})`
      );
    }
  } catch (err) {
    console.error("[EmailJS Submission Error]", err);
    let errorMessage = err?.text || err?.message || "Failed to send message.";

    if (
      errorMessage.toLowerCase().includes("invalid grant") ||
      errorMessage.toLowerCase().includes("gmail_api")
    ) {
      errorMessage =
        "Email delivery failed (Invalid Grant): The Gmail account connected to your EmailJS service needs to be reconnected. Please log in to https://dashboard.emailjs.com, navigate to 'Email Services', and click 'Reconnect' on your Gmail service.";
    }

    throw new Error(errorMessage);
  }
}
