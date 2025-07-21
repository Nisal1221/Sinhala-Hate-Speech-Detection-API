
const mailjet = require('node-mailjet');
require('dotenv').config();

const sendEmail = async (formData) => {
  const mj = mailjet.apiConnect(
    process.env.MJ_API_KEY,
    process.env.MJ_API_SECRET
  );

  await mj.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: process.env.MJ_FROM_EMAIL,
          Name: "HariWachana Contact",
        },
        To: [
          {
            Email: process.env.MJ_TO_EMAIL,
            Name: "Admin",
          },
        ],
        Subject: `Contact Form: ${formData.subject}`,
        TextPart: `
From: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
        `,
      },
    ],
  });
};

module.exports = sendEmail;
