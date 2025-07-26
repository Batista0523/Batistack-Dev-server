import axios from "axios";

const openaiApiKey = process.env.OPENAI_API_KEY;
const speedApiKey = process.env.PAGESPEED_API_KEY;

const batistackContext = `
Batistack Development is a modern, high-performance web development company helping small businesses, startups, and entrepreneurs grow online.

We specialize in custom websites that look great, load fast, and convert visitors into clients. Our work spans across various industries including HVAC, barbershops, real estate, construction, e-commerce, and more.

Batistack isn’t just a tech company — we’re your digital partner, focused on helping you stand out online and generate results. Whether you’re just starting or scaling up, we tailor every project to your goals and your audience.

💼 Core services include:
- Custom website design (mobile-first, SEO-optimized, visually impressive)
- Booking system integration (Calendly, Square, custom forms)
- Secure payment setup with Stripe or Clover (minimized fees)
- Built-in marketing tools (SEO, Google Analytics, email capture)
- Service tiers: Starter, Growth, Premium, and Enterprise
- AI assistants and admin dashboards to monitor traffic, leads, and engagement
- Branding, animations, and calls-to-action that actually drive action

🚀 Every project follows our proven process: discovery → demo → design → development → launch → ongoing support.

🧠 If the user asks about pricing, kindly direct them to our contact form at /contact — we offer flexible packages based on each business’s needs.

📞 Contact us at: info@batistack.com | support@batistack.com | 929-733-1600
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
       content: `
You are a friendly, persuasive assistant for Batistack Development.

Respond in a short, professional tone — maximum 2 to 3 sentences.

You're chatting with a user who is already on the Batistack website, so do NOT direct them to the contact page right away unless it's absolutely necessary.

Ask follow-up questions to understand their goals and build engagement. Make the conversation feel human and helpful, like a smart assistant who listens before suggesting anything.

Only mention the contact form or email (batistack.com/contact or info@batistack.com) when:
- The user asks directly about pricing
- They’re ready to start or request a quote
- The conversation is clearly near closing

Use the following context to explain our services and how we help businesses grow online:

Context:
${batistackContext}
`.trim(),

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
    console.error("OpenAI Chat Error:", error);
    throw new Error("Failed to get chatbot response.");
  }
}

export async function getVoiceResponse(userMessage: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
       
        messages: [
          {
            role: "system",
       content: `
You are a friendly, persuasive assistant for Batistack Development.

Respond in a short, professional tone — maximum 2 to 3 sentences.

You're chatting with a user who is already on the Batistack website, so do NOT direct them to the contact page right away unless it's absolutely necessary.

Ask follow-up questions to understand their goals and build engagement. Make the conversation feel human and helpful, like a smart assistant who listens before suggesting anything.

Only mention the contact form or email (batistack.com/contact or info@batistack.com) when:
- The user asks directly about pricing
- They’re ready to start or request a quote
- The conversation is clearly near closing

Use the following context to explain our services and how we help businesses grow online:

Context:
${batistackContext}
`.trim(),

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
    console.error("OpenAI Chat Error:", error);
    throw new Error("Failed to get chatbot response.");
  }
}



export async function analyzeWebsiteAndGetRecommendations(domain: string) {
  try {
    const getCategoryScore = async (category: string) => {
      const response = await axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`,
        {
          params: {
            url: domain,
            category,
            strategy: "desktop",
            key: speedApiKey,
          },
        }
      );
      return {
        category,
        data: response.data.lighthouseResult,
      };
    };

    const [performanceRes, accessibilityRes, seoRes, bestPracticesRes] =
      await Promise.all([
        getCategoryScore("performance"),
        getCategoryScore("accessibility"),
        getCategoryScore("seo"),
        getCategoryScore("best-practices"),
      ]);

    const performanceScore = Math.round(
      (performanceRes.data.categories["performance"]?.score || 0) * 100
    );
    const accessibilityScore = Math.round(
      (accessibilityRes.data.categories["accessibility"]?.score || 0) * 100
    );
    const seoScore = Math.round(
      (seoRes.data.categories["seo"]?.score || 0) * 100
    );
    const bestPracticesScore = Math.round(
      (bestPracticesRes.data.categories["best-practices"]?.score || 0) * 100
    );

    const audits = performanceRes.data.audits;

    const summary = `
Performance: ${performanceScore}
Accessibility: ${accessibilityScore}
SEO: ${seoScore}
Best Practices: ${bestPracticesScore}

Key Metrics:
- First Contentful Paint: ${
      audits["first-contentful-paint"]?.displayValue || "N/A"
    }
- Speed Index: ${audits["speed-index"]?.displayValue || "N/A"}
- Largest Contentful Paint: ${
      audits["largest-contentful-paint"]?.displayValue || "N/A"
    }
- Time to Interactive: ${audits["interactive"]?.displayValue || "N/A"}
- Total Blocking Time: ${audits["total-blocking-time"]?.displayValue || "N/A"}
- Cumulative Layout Shift: ${
      audits["cumulative-layout-shift"]?.displayValue || "N/A"
    }
    `;
    const persuasivePrompt = `
You are a senior strategist at Batistack Development, a premium web development company.

You’ve just audited a client’s website using Google PageSpeed and now you must deliver a confident, clear, and persuasive diagnosis based on the audit scores.

🔢 Begin by presenting the audit **scores in the following order**:
1. Performance Score
2. Accessibility Score
3. SEO Score
4. Best Practices Score

📉 For each **low or weak score**, explain the direct negative impact it has on the business. Focus on consequences like:
- Lost traffic
- Poor user experience
- Low conversion rates
- Bad branding or credibility

🛠️ Then clearly explain how Batistack Development can fix or improve those issues using its services.

🎯 Tone must be:
- Strategic and confident
- Respectful and solution-focused
- Direct and actionable — NOT small talk, NOT casual, NOT like an email
- Make the client feel they’re already part of the Batistack family

📞 At the end, strongly encourage the business owner to take action by contacting Batistack via:
- Email: info@batistack.com
- Phone: 929-733-1600

Keep the structure sharp and the insights valuable. Do not skip any score. Avoid repeating general statements — make your recommendations specific to the results provided.

Use this format every time. Be professional and impactful.
---
PageSpeed Data:
${summary}
`;
    const gptResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: persuasivePrompt },
          {
            role: "user",
            content: "Please analyze and provide improvement suggestions.",
          },
        ],
        temperature: 0.7,
        max_tokens: 700,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const recommendations = gptResponse.data.choices[0].message.content;

    return {
      scores: {
        Performance: performanceScore,
        Accessibility: accessibilityScore,
        SEO: seoScore,
        BestPractices: bestPracticesScore,
      },
      recommendations,
    };
  } catch (error: any) {
    console.error(
      "Error in analyzeWebsiteAndGetRecommendations:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to analyze website.");
  }
}
