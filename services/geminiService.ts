import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePostSummary = async (content: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock summary.");
    return "API Key is missing. Please provide a valid Gemini API Key to generate a summary.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following blog post content in 2-3 concise sentences. Capture the main insight. \n\n Content: ${content}`,
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate summary due to an error.";
  }
};

export const suggestComment = async (content: string): Promise<string> => {
    if (!apiKey) {
      return "Great post! Thanks for sharing.";
    }
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on the following blog post, suggest a thoughtful and positive comment a reader might leave. Keep it under 30 words.\n\n Post: ${content}`,
      });
      return response.text || "Great read!";
    } catch (error) {
      return "Interesting perspective!";
    }
  };