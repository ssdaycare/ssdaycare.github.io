import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY environment variable is required" });
    }

    // Initialize the Gemini SDK
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const context = `
      ABOUT: Sparkling Stars Daycare is a licensed child care home that provides care and supervision for up to 12 children between the ages of 0-12 years. Operated in the provider's private residence, we strive to create a safe and stimulating environment for all children. We may be able to accommodate children with delays and differing needs. Please contact us for further information.
      LOCATION: 715 Pohorecky Crescent, Saskatoon SK S7W 0J4.
      PROVIDER: Nalini Ghai.
      CONTACT: Phone: 306-850-4790, Email: nalinighai04@gmail.com.
      HOURS: Monday - Friday, 7:30 am - 5:00 pm.
      PHILOSOPHY: 
      - Nurturing Environment: Creates a warm, safe, and inclusive space where every child feels valued and supported.
      - Holistic Development: Focuses on the overall growth of each child – socially, emotionally, physically, and cognitively – through engaging and play-based learning.
      - Individualized Care: Recognizes and adapts to the unique needs and interests of each child, fostering their curiosity and independence.
      - Community Engagement: Builds strong relationships with families and the community to promote collaboration and open communication.
      - Lifelong Learning: Encourages a love for learning by providing diverse experiences and opportunities that inspire creativity and exploration.
      PROGRAMS:
      - Creative Arts and Crafts: Engaging children in hands-on activities like painting, drawing, and crafting to foster creativity and fine motor skills.
      - Outdoor Play and Exploration: Providing structured outdoor activities, such as nature walks and games, to promote physical health and social interaction.
      - Storytime and Language Development: Offering daily story time sessions to enhance language skills, comprehension, and a love for reading.
      - Sensory Play: Incorporating activities with sand, water, and other sensory materials to stimulate exploration and sensory development.
      - Music and Movement: Introducing songs, dance, and movement activities to encourage physical activity, rhythm, and coordination.
      NUTRITION:
      - Balanced Meals: Provides nutritious, well-rounded meals that include a variety of fruits, vegetables, whole grains, and protein sources to support healthy growth.
      - Allergy Awareness: Maintains a careful approach to accommodate food allergies and dietary restrictions, ensuring all meals are safe for every child.
      - Healthy Snacks: Offers nutritious snacks, such as fresh fruit, yogurt, and whole-grain options, to keep energy levels stable throughout the day.
      ACCESSIBILITY: Wide doorways, adaptive play equipment with soft flooring, accessible restrooms with grab bars, child-sized furniture. We prioritize safety with gates, offer diverse learning materials, and ensure accessible outdoor paths. Clear emergency exits and staff training on inclusivity.
      ELIGIBILITY: Ages 0-12 years. May accommodate delays/differing needs.
      FEES: Contact us directly for current fees.
    `;

    const systemPrompt = `
      You are Sparky, a friendly and helpful AI assistant for Sparkling Stars Daycare.
      Your goal is to answer user questions concisely based ONLY on the provided website information.
      Do not make up information. Be helpful, polite, and keep your answers brief and to the point.
      If you cannot find the answer in the provided text, or if the user is asking to enroll, schedule a tour, or has a very specific question that requires personal attention, respond with ONLY the exact text: "NEEDS_EMAIL".
      Here is the website information: --- ${context} ---
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3
      }
    });

    let reply = response.text || "I'm sorry, I couldn't process that request right now.";
    reply = reply.trim();

    if (reply === "NEEDS_EMAIL") {
      const paraphrasePrompt = `
        You are helping a parent write a polite, professional, and warm inquiry email to Sparkling Stars Daycare.
        The parent's original question or inquiry was: "${message}"

        Please generate a professional, nice subject line and a beautifully written, polite, and respectful email body.
        The email body should be clear, warm, and highly professional, expanding appropriately on the user's inquiry intent.
        Include a generic warm sign-off like "Warm regards,\n[Your Name]" or similar at the end.
      `;

      try {
        const paraphraseResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: paraphrasePrompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                subject: { type: "STRING" },
                body: { type: "STRING" }
              },
              required: ["subject", "body"]
            },
            temperature: 0.7
          }
        });

        if (paraphraseResponse.text) {
          const parsed = JSON.parse(paraphraseResponse.text);
          return res.status(200).json({
            reply: "NEEDS_EMAIL",
            paraphrasedSubject: parsed.subject,
            paraphrasedBody: parsed.body
          });
        }
      } catch (err) {
        console.error("Error generating paraphrased email:", err);
      }

      // Fallback if paraphrase fails
      return res.status(200).json({
        reply: "NEEDS_EMAIL",
        paraphrasedSubject: `Inquiry about Sparkling Stars Daycare`,
        paraphrasedBody: `Dear Sparkling Stars Daycare,\n\nI am reaching out regarding the following inquiry:\n\n"${message}"\n\nCould you please provide me with more information?\n\nThank you,\n[Your Name]`,
      });
    }

    return res.status(200).json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error in Vercel function /api/chat:", error);
    return res.status(500).json({ error: error.message || "An error occurred with Gemini chatbot" });
  }
}
