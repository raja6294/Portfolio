import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
  import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Sends a portfolio contact inquiry notification directly to the owner's Gmail via EmailJS.
 *
 * Parameters passed to EmailJS template:
 * - name: Name entered by the visitor
 * - email: Email entered by the visitor
 * - message: Message entered by the visitor
 * - reply_to: Visitor's email (for direct reply from Gmail)
 * - from_name: Visitor's name
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

  // Exact parameters for the professional portfolio notification template
  const templateParams = {
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    to_email: "rajapalpai2022@gmail.com",
    to_name: "Raja Banerjee",
    // Header helper aliases for EmailJS Reply-To and From Name
    reply_to: trimmedEmail,
    from_name: trimmedName,
  };

  // Safe diagnostic log without exposing sensitive credentials
  console.log("[EmailJS Dispatch Diagnostics]", {
    serviceId: SERVICE_ID ? `${SERVICE_ID.slice(0, 10)}...` : "MISSING",
    templateId: TEMPLATE_ID ? `${TEMPLATE_ID.slice(0, 11)}...` : "MISSING",
    publicKeyPrefix: PUBLIC_KEY ? `${PUBLIC_KEY.slice(0, 4)}***` : "MISSING",
    recipientConfigured: Boolean(templateParams.to_email),
  });

  try {
    // Only ONE email dispatch is executed
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Your message has been sent successfully. I'll get back to you soon!",
      };
    } else {
      throw new Error(
        `EmailJS responded with non-200 status: ${response.status} (${response.text || "Unknown"})`
      );
    }
  } catch (err) {
    console.error("[EmailJS Submission Error Details]", {
      status: err?.status,
      text: err?.text,
      message: err?.message,
    });
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
