import { GoogleGenerativeAI } from '@google/generative-ai';
import { useChatStore } from '../store/chatStore';

// Fallback dummy responses
const delays = [1500, 2000, 2500, 3000];
const dummyResponses = [
  "That's a very interesting perspective. Can you expand on that?",
  "I've analyzed your input, and it seems you're asking about something I'm well-equipped to discuss.",
  "Here is a detailed breakdown of the topic you requested: \n\n1. First point.\n2. Second point.\n3. Third point.",
  "I understand what you mean. The complexities of this issue are fascinating.",
  "Could you provide more context? That would help me give you a more accurate answer.",
  "Based on my knowledge base, the optimal approach would be to divide the problem into smaller, manageable chunks.",
  "As an AI, I don't have personal feelings, but I can certainly appreciate the logic in your statement.",
];

export const generateAIResponse = async (userMessage, model) => {
  const apiKey = useChatStore.getState().apiKey;
  
  if (!apiKey) {
    // Fallback mode if no API key is set
    const randomDelay = delays[Math.floor(Math.random() * delays.length)];
    await new Promise((resolve) => setTimeout(resolve, randomDelay));

    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      return `Hello there! I am ${model}, your AI assistant. (Please add a Gemini API Key in Settings to use real AI).`;
    }
    
    if (userMessage.toLowerCase().includes('code')) {
      return "Sure! I can write code. Here is a simple example in React:\n\n```jsx\nexport default function App() {\n  return <div>Hello AI</div>;\n}\n```";
    }

    const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
    return `[Fallback] ${randomResponse}`;
  }

  // Real Gemini implementation using standard fetch with auto-discovery
  try {
    // 1. Fetch available models for this specific API key
    const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelsData = await modelsResponse.json();

    if (!modelsResponse.ok) {
      throw new Error(modelsData.error?.message || "Failed to list models");
    }

    // 2. Find the first model that supports generateContent (usually gemini-something)
    const validModel = modelsData.models?.find(m => 
      m.supportedGenerationMethods?.includes("generateContent") && 
      m.name.includes("gemini")
    );

    if (!validModel) {
      throw new Error("No compatible Gemini models found for this API Key. Ensure your key has access to the Generative Language API.");
    }

    // 3. Make the generation request using the exact discovered model name
    // validModel.name already includes "models/" (e.g., "models/gemini-1.0-pro")
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/${validModel.name}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userMessage }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to generate response");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message);
  }
};
