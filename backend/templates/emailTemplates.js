const SOCIAL_LINKS = {
  portfolio: process.env.PORTFOLIO_URL || "https://rajabanerjee.dev",
  github: "https://github.com/raja6294",
  linkedin: "https://www.linkedin.com/in/rajabanerjee46",
  instagram:
    "https://www.instagram.com/banerjee._06?igsh=MWt2a2lxZXkxY283Zw==",
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSubmissionDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function emailLayout({ title, bodyHtml, showSocialLinks = false }) {
  const socialButtons = showSocialLinks
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 32px auto 0;">
        <tr>
          <td style="padding: 0 6px;">
            <a href="${SOCIAL_LINKS.portfolio}" style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #06b6d4, #6366f1); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">Portfolio</a>
          </td>
          <td style="padding: 0 6px;">
            <a href="${SOCIAL_LINKS.github}" style="display: inline-block; padding: 12px 20px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">GitHub</a>
          </td>
          <td style="padding: 0 6px;">
            <a href="${SOCIAL_LINKS.linkedin}" style="display: inline-block; padding: 12px 20px; background: #0077b5; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">LinkedIn</a>
          </td>
          <td style="padding: 0 6px;">
            <a href="${SOCIAL_LINKS.instagram}" style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">Instagram</a>
          </td>
        </tr>
      </table>
    `
    : "";

  const footerText = showSocialLinks
    ? "This is an automated email. Please do not reply."
    : "Portfolio contact form notification";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f9ff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f9ff; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(6, 182, 212, 0.12);">
          <tr>
            <td style="background: linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #a855f7 100%); padding: 32px 24px; text-align: center;">
              <img src="cid:profilePhoto" alt="Raja Banerjee" width="100" height="100" style="display: block; margin: 0 auto 16px; border-radius: 50%; border: 3px solid #ffffff; object-fit: cover; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 28px;">
              ${bodyHtml}
              ${socialButtons}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">${footerText}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function buildOwnerNotificationEmail({ name, email, message, createdAt }) {
  const submittedAt = formatSubmissionDate(createdAt);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const bodyHtml = `
    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #334155;">You received a new message from your portfolio contact form.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <tr>
        <td style="padding: 14px 18px; background: #f8fafc; font-size: 13px; font-weight: 700; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em; width: 120px;">Name</td>
        <td style="padding: 14px 18px; font-size: 15px; color: #0f172a;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding: 14px 18px; background: #f8fafc; font-size: 13px; font-weight: 700; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
        <td style="padding: 14px 18px; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #6366f1; text-decoration: none;">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 14px 18px; background: #f8fafc; font-size: 13px; font-weight: 700; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td>
        <td style="padding: 14px 18px; font-size: 15px; line-height: 1.6; color: #334155;">${safeMessage}</td>
      </tr>
      <tr>
        <td style="padding: 14px 18px; background: #f8fafc; font-size: 13px; font-weight: 700; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em;">Submitted</td>
        <td style="padding: 14px 18px; font-size: 15px; color: #0f172a;">${escapeHtml(submittedAt)}</td>
      </tr>
    </table>
  `;

  return {
    subject: `New Portfolio Contact from ${name}`,
    html: emailLayout({
      title: "New Contact Message",
      bodyHtml,
      showSocialLinks: false,
    }),
  };
}

function buildVisitorConfirmationEmail({ name, message }) {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const bodyHtml = `
    <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #334155;">Hi ${safeName},</p>
    <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #334155;">Thank you for reaching out through my portfolio. I appreciate you taking the time to contact me and will reply as soon as possible.</p>
    <p style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.05em;">Your Message</p>
    <div style="padding: 18px 20px; background: #f0f9ff; border-left: 4px solid #06b6d4; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #334155;">${safeMessage}</div>
    <p style="margin: 24px 0 0; font-size: 15px; line-height: 1.6; color: #64748b;">In the meantime, feel free to explore my work and connect with me on the links below.</p>
  `;

  return {
    subject: "Thanks for contacting me — Raja Banerjee",
    html: emailLayout({
      title: "Message Received",
      bodyHtml,
      showSocialLinks: true,
    }),
  };
}

module.exports = {
  buildOwnerNotificationEmail,
  buildVisitorConfirmationEmail,
};
