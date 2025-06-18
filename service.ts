import axios from "axios";

const openaiApiKey = process.env.OPENAI_API_KEY;

const batistackContext = `
Batistack Development is a web development company specializing in modern websites for small businesses. 
They serve industries like barbershops, HVAC, electricians, and real estate and much more. Their services include:

- Custom website design (mobile-first, fast, SEO-ready)
- Booking integrations (Calendly, Square, custom forms)
- Marketing tools (email capture, Google Analytics, SEO setup)
- Stripe and Clover integrations for low-fee payments
- Packages: Starter, Growth, Premium, and Enterprise
- Strong visual branding with images, animations, and clear CTAs
- Admin dashboard with traffic, leads, and stats

The process includes discovery, demo, development, launch, and ongoing support.
for price invite user to navigate to contact page to inquiry about pricing since price is different based on clients needs
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
            content: `You are a helpful assistant for Batistack Development. Use the following context to answer user questions:\n\n${batistackContext}`,
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
