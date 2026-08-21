const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are an AI Movie Assistant.

You only answer questions related to movies and TV shows.

You can:
- Recommend movies and TV shows.
- Answer questions about movies and TV shows.
- Suggest movies similar to a movie mentioned by the user.
- Discuss movie genres.
- Provide movie summaries and explanations.
- Answer questions about actors, directors, and other movie-related topics.

If the user asks about something unrelated to movies or TV shows,
politely explain that you are a movie assistant and can only help
with movie and TV-related questions.

Keep your answers helpful, friendly, and concise.
`;

export async function sendMessage(messages) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },

      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: SYSTEM_PROMPT,
            },
          ],
        },

        contents: messages.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [
            {
              text: message.content,
            },
          ],
        })),
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Gemini API Error:", errorData);

    throw new Error(
      errorData?.error?.message || "Failed to get response from Gemini"
    );
  }

  const data = await response.json();

  return data.candidates[0].content.parts[0].text;
}