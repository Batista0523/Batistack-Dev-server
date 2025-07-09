import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendChatNotificationEmail(
  chatHistory: string,
  userDetails: { fullName: string; email: string; phoneNumber?: string }
) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: "elisaul@batistack.com", 
    subject: "📩 New Batistack AI Chat",
    html: `
      <h3>New Chat with AI:</h3>
      <p><strong>User Full Name:</strong> ${userDetails.fullName}</p>
      <p><strong>User Email:</strong> ${userDetails.email}</p>
      <p><strong>User Phone Number:</strong> ${userDetails.phoneNumber || "Not Provided"}</p>
      <h4>Chat History:</h4>
      <pre style="white-space: pre-wrap;">${chatHistory}</pre>
    `,
  };

  await transporter.sendMail(mailOptions);
}
