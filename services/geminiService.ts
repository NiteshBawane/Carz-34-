
import { GoogleGenAI } from "@google/genai";
import { Car } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCarRecommendation = async (userPreference: string, inventory: Car[]) => {
  try {
    const carContext = inventory.map(c => 
      `${c.brand} ${c.model} (${c.year}), ${c.fuelType}, Price: ₹${c.price}L, Type: ${c.bodyType}, Mileage: ${c.mileage}km. Description: ${c.description}`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [{
        parts: [{
          text: `You are the "Smart Consultant" for Carz-34, a premium pre-owned car dealer in Chandrapur. 
          Use your deep reasoning capabilities to provide a sophisticated and highly personalized recommendation based on the inventory and user query below.
          
          User Query: "${userPreference}"
          
          Current Inventory:
          ${carContext}
          
          Instructions:
          1. Think deeply about the user's implicit needs (safety, status, fuel economy, family size).
          2. Provide 1-2 expert recommendations.
          3. Use a tone that is professional, authoritative, and helpful.
          4. Format your response with clear headings or bullet points if necessary.
          5. If no car matches perfectly, suggest the closest alternative and explain why.`
        }]
      }],
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Our advanced consultant is currently busy with another client. Please browse our inventory or call us directly!";
  }
};
