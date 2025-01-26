import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./constants";

const getGeminiModel = () => {
  try {
    console.log("Initializing Gemini model..."); // Debug log
    
    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not configured");
      return null;
    }

    console.log("API Key available, creating GenAI instance..."); // Debug log
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    console.log("Creating model instance..."); // Debug log
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });
    
    console.log("Model initialized successfully"); // Debug log
    return model;
  } catch (error) {
    console.error("Error initializing Gemini model:", error);
    return null;
  }
};

export default getGeminiModel;

