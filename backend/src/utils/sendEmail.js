// src/utils/sendEmail.js
const axios = require("axios");

const sendEmail = async ({ to, subject, text, html, attachments }) => {
  const payload = {
    sender: {
      name: process.env.BREVO_SENDER_NAME,
      email: process.env.BREVO_SENDER_EMAIL,
    },
    to: [{ email: to }],
    subject,
    textContent: text,
    htmlContent:
      html ||
      `<pre style="font-family: inherit; white-space: pre-wrap;">${text}</pre>`,
  };

  if (attachments && attachments.length > 0) {
    payload.attachment = attachments.map((a) => ({
      name: a.filename,
      content: a.content.toString("base64"),
    }));
  }

  await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

module.exports = sendEmail;
