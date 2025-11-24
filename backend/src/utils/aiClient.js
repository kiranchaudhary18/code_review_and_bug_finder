import OpenAI from "openai";

let client;

const getClient = () => {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    throw new Error("AI_API_KEY is not defined in environment variables");
  }

  if (!client) {
    client = new OpenAI({
      apiKey,
      baseURL: process.env.AI_BASE_URL || "https://api.groq.com/openai/v1",
    });
  }

  return client;
};

export const generateCodeReview = async (code, language) => {
  try {
    const systemPrompt = `
You are an advanced AI Code Reviewer.
Analyze the given code and return a thorough review.

Return a JSON object with the following shape:

{
 "errors": [],
 "improvements": [],
 "security_issues": [],
 "clean_code": [],
 "complexity": "",
 "refactor_code": "",
 "summary": ""
}

- "errors": list of bugs, logical errors, or runtime issues
- "improvements": list of suggestions for better structure, readability, and performance
- "security_issues": list of possible vulnerabilities or unsafe patterns
- "clean_code": list of suggestions based on clean code principles
- "complexity": brief time and space complexity analysis if the code is algorithmic
- "refactor_code": a fully corrected and refactored version of the input code (NO markdown)
- "summary": short summary of the overall code quality
`.trim();

    const userContent = `Language: ${language}\n\nCode:\n${code}`;

    const aiClient = getClient();

    // ---------------------------
    // FIX: Replace deprecated Groq model
    // ---------------------------
    const rawModel = process.env.AI_MODEL;
    let model;

    // If user has set a model manually
    if (rawModel) {
      model = rawModel;
    } else {
      // Default recommended Groq model (NOT deprecated)
      model = "llama3-8b"; // stable version
    }

    // Fallback if someone used old deprecated model name
    if (model === "llama3-8b-8192") {
      console.warn("⚠️ Deprecated model detected — switching to llama3-8b");
      model = "llama3-8b";
    }

    console.log("🚀 Using AI model:", model);

    const completion = await aiClient.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const messageContent = completion.choices[0]?.message?.content;

    if (!messageContent) {
      throw new Error("AI API returned empty response");
    }

    let parsed;
    try {
      parsed = JSON.parse(messageContent);
    } catch (err) {
      console.error("❌ Failed to parse AI JSON:", messageContent);
      throw new Error("Failed to parse AI response as JSON");
    }

    return {
      errors: parsed.errors || [],
      improvements: parsed.improvements || [],
      security_issues: parsed.security_issues || [],
      clean_code: parsed.clean_code || [],
      complexity: parsed.complexity || "",
      refactor_code: parsed.refactor_code || "",
      summary: parsed.summary || "",
    };
  } catch (error) {
    console.error("❌ Error in generateCodeReview:", error);
    throw error;
  }
};
