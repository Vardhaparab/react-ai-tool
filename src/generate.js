export default async function handler(req, res) {
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: userPrompt }] }
          ]
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    console.error("Serverless function error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
