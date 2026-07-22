const Contact = require("../models/Contact");
const { validateContactInput } = require("../utils/contactValidation");
const { sendEmail, getProfilePhotoAttachment } = require("../utils/mailer");
const {
  buildOwnerNotificationEmail,
  buildVisitorConfirmationEmail,
} = require("../templates/emailTemplates");

exports.sendMessage = async (req, res) => {
  try {
    const validation = validateContactInput(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.errors[0],
        errors: validation.errors,
      });
    }

    const { name, email, message } = validation.data;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const ownerEmail = buildOwnerNotificationEmail({
      name,
      email,
      message,
      createdAt: newContact.createdAt,
    });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: ownerEmail.subject,
      html: ownerEmail.html,
      attachments: [getProfilePhotoAttachment()],
    });

    const visitorEmail = buildVisitorConfirmationEmail({ name, message });

    await sendEmail({
      to: email,
      subject: visitorEmail.subject,
      html: visitorEmail.html,
      attachments: [getProfilePhotoAttachment()],
    });

    return res.status(200).json({
      success: true,
      message:
        "Message sent successfully. Please check your email for confirmation.",
    });
  } catch (err) {
    console.error("Contact form error:", err);

    if (err.message === "Email credentials are not configured") {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
