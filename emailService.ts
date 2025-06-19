import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendChatNotificationEmail(chatHistory: string) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: "elisaul@batistack.com",
    subject: "📩 New Batistack AI Chat",
    html: `<h3>New Chat with AI:</h3><pre style="white-space: pre-wrap;">${chatHistory}</pre>`,
  };

  await transporter.sendMail(mailOptions);
}
