const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 100,
  email: 255,
  message: 1000,
};

function validateContactInput(body) {
  const errors = [];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) {
    errors.push("Name is required");
  } else if (name.length > LIMITS.name) {
    errors.push(`Name must be less than ${LIMITS.name} characters`);
  }

  if (!email) {
    errors.push("Email is required");
  } else if (email.length > LIMITS.email) {
    errors.push(`Email must be less than ${LIMITS.email} characters`);
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push("Invalid email address");
  }

  if (!message) {
    errors.push("Message is required");
  } else if (message.length > LIMITS.message) {
    errors.push(`Message must be less than ${LIMITS.message} characters`);
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: { name, email, message },
  };
}

module.exports = { validateContactInput };
