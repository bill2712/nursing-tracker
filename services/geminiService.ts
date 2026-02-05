import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from '../constants';
import { LogEntry } from '../types';
import { format } from 'date-fns';

export const getGeminiInsights = async (logs: LogEntry[]): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please configure the environment.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Filter for last 48 hours to be relevant
  const now = Date.now();
  const twoDaysAgo = now - (48 * 60 * 60 * 1000);
  const recentLogs = logs.filter(l => l.startTime > twoDaysAgo);

  if (recentLogs.length === 0) {
    return "Not enough data in the last 48 hours to generate insights. Please log more activities.";
  }

  // Format data for the prompt
  const dataSummary = recentLogs.map(l => {
    return `- ${l.type.toUpperCase()} at ${format(new Date(l.startTime), 'PP p')}. Duration: ${l.durationSeconds ? Math.round(l.durationSeconds / 60) + ' mins' : 'N/A'}. Details: ${JSON.stringify(l.details)}`;
  }).join('\n');

  const prompt = `
    You are a helpful, empathetic pediatric nurse assistant. 
    Analyze the following baby activity logs for the past 48 hours.
    
    Logs:
    ${dataSummary}

    Please provide:
    1. A summary of the sleep and feeding patterns.
    2. Any observations about rhythm (e.g., is the baby feeding frequently? long naps?).
    3. A gentle, encouraging tip for the parents based on this data.
    
    Keep the tone supportive and concise. Use bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    return response.text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error analyzing the data. Please try again later.";
  }
};