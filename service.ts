import axios from "axios";

const openaiApiKey = process.env.OPENAI_API_KEY;

const batistackContext = `
Batistack Development is a web development company specializing in modern, high-performance websites for small businesses and entrepreneurs.

They proudly serve a wide range of industries, including:

• Barbershops → /industries/barbershop  
• HVAC → /industries/hvac  
• Electricians → /industries/electrician  
• Real Estate → /industries/real-estate  
• E-commerce → /industries/ecommerce  
• Fitness Trainers → /industries/fitness  
• Law Firms → /industries/lawfirms  
• Restaurants & Cafes → /industries/restaurant  
• Salons → /industries/salon  
• Plumbing Services → /industries/plumber  

Batistack works with all types of clients—from solo entrepreneurs and local startups to well-established businesses—offering tailored solutions to meet their unique needs.

Core services include:

- Custom website design (mobile-first, SEO-optimized, lightning-fast)
- Booking integrations (Calendly, Square, custom-built forms)
- Stripe and Clover payment integration with reduced fees
- Built-in marketing tools (SEO setup, Google Analytics, email capture)
- Service packages: Starter, Growth, Premium, and Enterprise
- Admin dashboards to monitor traffic, leads, and engagement
- Clean, modern branding with animations and strong calls-to-action

The development process includes: discovery, demo, design, development, launch, and ongoing support.

📌 If users ask about pricing, invite them to visit the contact page at /contact — pricing varies depending on each project.

📌 If users mention a specific industry, provide a helpful answer and recommend they visit the relevant industry page for more tailored information.
Batistack more information are:
information: info@batistack.com
support: support@batistack.com
phone: 929-733-1600
`;


export async function getChatResponse(userMessage: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant for Batistack Development. Use the following context to answer user questions. At the end, guide users to the relevant industry page if need it or the contact form if appropriate:\n\n${batistackContext}`,
          },

          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.6,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get response from AI.");
  }
}
