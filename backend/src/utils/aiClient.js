import OpenAI from 'openai';

let client;

const getClient = () => {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    throw new Error('AI_API_KEY is not defined in environment variables');
  }

  if (!client) {
    client = new OpenAI({
      apiKey,
      // Groq provides an OpenAI-compatible API surface.
      // If you are using a pure OpenAI key, you can remove baseURL
      // or point it back to the default https://api.openai.com/v1.
      baseURL: process.env.AI_BASE_URL || 'https://api.groq.com/openai/v1',
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
- "refactor_code": a fully corrected and refactored version of the ENTIRE input code in the same language. This string must contain ONLY source code (no markdown, no JSON, no commentary) so the user can copy-paste it directly.
- "summary": short summary of the overall code quality
`.trim();

    const userContent = `Language: ${language}\n\nCode:\n${code}`;

    const aiClient = getClient();

    const rawModel = process.env.AI_MODEL || 'llama3-8b-8192';
    const model = rawModel;

    console.log('Making AI API call with model:', model);

    const completion = await aiClient.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      response_format: { type: 'json_object' },
    });

    const messageContent = completion.choices[0]?.message?.content;

    if (!messageContent) {
      throw new Error('AI API returned empty response');
    }

    let parsed;
    try {
      parsed = JSON.parse(messageContent);
    } catch (error) {
      console.error('Failed to parse AI response:', messageContent);
      throw new Error('Failed to parse AI response as JSON');
    }

    return {
      errors: parsed.errors || [],
      improvements: parsed.improvements || [],
      security_issues: parsed.security_issues || [],
      clean_code: parsed.clean_code || [],
      complexity: parsed.complexity || '',
      refactor_code: parsed.refactor_code || '',
      summary: parsed.summary || '',
    };
  } catch (error) {
    console.error('Error in generateCodeReview:', error);
    throw error;
  }
};
