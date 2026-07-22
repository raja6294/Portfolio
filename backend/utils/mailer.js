const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are not configured");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

function getProfilePhotoAttachment() {
  const imagePath = path.resolve(__dirname, "../../src/assets/profile-photo.png");

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Profile photo not found at ${imagePath}`);
  }

  return {
    filename: "profile-photo.png",
    path: imagePath,
    cid: "profilePhoto",
    contentType: "image/png",
  };
}

async function sendEmail({ to, subject, html, attachments = [] }) {
  const mailTransporter = getTransporter();

  return mailTransporter.sendMail({
    from: `"Raja Banerjee" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
}

module.exports = { sendEmail, getProfilePhotoAttachment };
