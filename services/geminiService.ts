
import { GoogleGenAI, Type } from "@google/genai";
import { Pillar, Question, Language } from "../types";
import { BHOJPURI_SHAYARIS, LOCAL_QUESTION_POOL } from "../constants";

// Global set to track used questions across the session to prevent repeats
const usedQuestionIds = new Set<string>();

const USER_QUESTIONS_KEY = 'vardi_user_questions';

/**
 * Shuffles options for a single question and updates the correctOptionIndex accordingly.
 * This prevents patterns where the correct answer might always be the same index.
 */
const shuffleOptions = (question: Question): Question => {
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const correctValue = question.options[Language.HINDI][question.correctOptionIndex];
  
  const shuffledOptions: any = {
    [Language.HINDI]: indices.map(i => question.options[Language.HINDI][i]),
    [Language.ENGLISH]: indices.map(i => question.options[Language.ENGLISH][i]),
    [Language.BHOJPURI]: indices.map(i => question.options[Language.BHOJPURI][i]),
  };

  const newCorrectIndex = indices.indexOf(question.correctOptionIndex);

  return {
    ...question,
    options: shuffledOptions,
    correctOptionIndex: newCorrectIndex
  };
};

export const getUserQuestions = (): Question[] => {
  try {
    const stored = localStorage.getItem(USER_QUESTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveUserQuestions = (questions: Question[]) => {
  const current = getUserQuestions();
  const updated = [...current, ...questions];
  // De-duplicate by text to keep the bank clean
  const unique = Array.from(new Map(updated.map(q => [q.text[Language.ENGLISH], q])).values());
  localStorage.setItem(USER_QUESTIONS_KEY, JSON.stringify(unique));
};

export const generateQuestions = async (pillar: Pillar | string, count: number = 20): Promise<Question[]> => {
  try {
    let pool: Question[] = [];
    
    // 1. Check User-Uploaded Questions first
    const userQuestions = getUserQuestions().filter(q => {
      const matchesPillar = typeof pillar === 'string' && (pillar.includes('Mixed') || pillar.includes('Full')) ? true : q.pillar === pillar;
      return matchesPillar && !usedQuestionIds.has(q.id);
    });

    // 2. Check Local Pool
    const localAvailable = LOCAL_QUESTION_POOL.filter(q => {
      const matchesPillar = typeof pillar === 'string' && (pillar.includes('Mixed') || pillar.includes('Full')) ? true : q.pillar === pillar;
      return matchesPillar && !usedQuestionIds.has(q.id);
    });

    const combinedLocal = [...userQuestions, ...localAvailable];

    // If we have enough unique questions locally, return them shuffled
    if (combinedLocal.length >= count) {
      pool = combinedLocal.sort(() => Math.random() - 0.5).slice(0, count);
      pool.forEach(q => usedQuestionIds.add(q.id));
      return pool.map(shuffleOptions);
    }

    // 3. Fallback to Gemini for the gap
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const remainingCount = count - combinedLocal.length;

    let apiQuestions: Question[] = [];
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate exactly ${remainingCount} unique, fact-based exam questions for UP Homeguard. Topic: ${pillar}. 
        CRITICAL RULES:
        - NO generic 'Option A/B/C/D' text. Use real choices.
        - NO placeholders.
        - NO Math or Hindi Language questions.
        - Focus on UP History, Geography, Constitution, Police Ethics, and General Science.
        - Provide translations for Hindi, English, and Bhojpuri.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                pillar: { type: Type.STRING },
                text: { type: Type.OBJECT, properties: { [Language.ENGLISH]: { type: Type.STRING }, [Language.HINDI]: { type: Type.STRING }, [Language.BHOJPURI]: { type: Type.STRING } } },
                options: { type: Type.OBJECT, properties: { [Language.ENGLISH]: { type: Type.ARRAY, items: { type: Type.STRING } }, [Language.HINDI]: { type: Type.ARRAY, items: { type: Type.STRING } }, [Language.BHOJPURI]: { type: Type.ARRAY, items: { type: Type.STRING } } } },
                correctOptionIndex: { type: Type.INTEGER },
                explanation: { type: Type.OBJECT, properties: { [Language.ENGLISH]: { type: Type.STRING }, [Language.HINDI]: { type: Type.STRING }, [Language.BHOJPURI]: { type: Type.STRING } } },
                difficulty: { type: Type.STRING, enum: ['EASY', 'MEDIUM', 'HARD'] }
              },
              required: ["id", "pillar", "text", "options", "correctOptionIndex", "explanation"]
            }
          }
        }
      });
      apiQuestions = JSON.parse(response.text || "[]");
    } catch (apiErr) {
      console.error("API Fetch failed, using local recycling logic", apiErr);
    }

    let finalResult = [...combinedLocal, ...apiQuestions];
    finalResult.forEach(q => usedQuestionIds.add(q.id));

    // 4. GUARANTEE THE COUNT: If we still don't have enough (e.g., API failed and local pool < 100)
    // We must recycle local questions with unique IDs and re-shuffled options to fulfill the marathon requirement.
    if (finalResult.length < count) {
      const gap = count - finalResult.length;
      const recyclePool = [...LOCAL_QUESTION_POOL].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < gap; i++) {
        const baseQ = recyclePool[i % recyclePool.length];
        const recycledQ = {
          ...baseQ,
          id: `${baseQ.id}-recycled-${i}-${Math.random().toString(36).substr(2, 5)}`
        };
        finalResult.push(recycledQ);
      }
    }

    return finalResult.slice(0, count).map(shuffleOptions);
  } catch (error) {
    console.error("Critical error in generateQuestions:", error);
    // Absolute fallback: cycle local pool until count is met
    const fallback = [];
    for(let i=0; i<count; i++) {
      const q = LOCAL_QUESTION_POOL[i % LOCAL_QUESTION_POOL.length];
      fallback.push(shuffleOptions({...q, id: `fallback-${i}-${Math.random()}`}));
    }
    return fallback;
  }
};

export const processBulkContent = async (rawContent: string): Promise<Question[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform this text into structured JSON questions. No Math/Hindi. Professional content only. 
      Raw: ${rawContent.substring(0, 10000)}`,
      config: { responseMimeType: "application/json" }
    });
    const questions: Question[] = JSON.parse(response.text || "[]");
    saveUserQuestions(questions);
    return questions;
  } catch (error) {
    return [];
  }
};

export const getBhojpuriShayari = async (): Promise<string> => {
  return BHOJPURI_SHAYARIS[Math.floor(Math.random() * BHOJPURI_SHAYARIS.length)];
};

export const performOCRQuestionExtraction = async (base64Image: string): Promise<Question[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
        { text: "Extract questions to JSON. Real data only, no placeholders. Skip Math/Hindi." }
      ],
      config: { responseMimeType: "application/json" }
    });
    const questions = JSON.parse(response.text);
    saveUserQuestions(questions);
    return questions;
  } catch (error) {
    return [];
  }
};
