import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
  import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends contact form messages directly from the browser using EmailJS SDK.
 * No backend or Node server is required.
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

  // Exact template parameters requested
  const templateParams = {
    from_name: name.trim(),
    from_email: email.trim(),
    message: message.trim(),
    to_email: "rajapalpai2022@gmail.com",
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
        message: "Message delivered successfully. I will get back to you soon.",
      };
    } else {
      throw new Error(
        `EmailJS responded with non-200 status: ${response.status} (${response.text || "Unknown"})`
      );
    }
  } catch (err) {
    console.error("[EmailJS Submission Error]", err);
    let errorMessage = err?.text || err?.message || "Failed to send message.";

    // Actionable error for Gmail OAuth token expiry/invalid grant
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
