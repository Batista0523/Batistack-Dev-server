import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,    
    pass: process.env.EMAIL_PASSWORD  
  },
});

export const sendLeadNotification = async (lead: {
  name: string;
  email: string;
  message?: string;
  source?: string;
}) => {
  const mailOptions = {
    from: lead.email,        
    to: process.env.EMAIL,           
    subject: "New Lead - Batistack Development",
    html: `
      <h3>New Lead Received 🚀</h3>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Message:</strong> ${lead.message || "No message provided"}</p>
      <p><strong>Source:</strong> ${lead.source || "Direct"}</p>
      <p>Date: ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent: ", info.response);
  } catch (error: any) {
    console.error("❌ Error sending email:", error.message);
    console.error("❌ Error Details:", error);
  }
};
