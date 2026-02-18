
import { GoogleGenAI, Type } from "@google/genai";
import { Pillar, Question, Language } from "../types";
import { BHOJPURI_SHAYARIS, LOCAL_QUESTION_POOL } from "../constants";

// Global set to track used questions across the session to prevent repeats
const usedQuestionIds = new Set<string>();

const USER_QUESTIONS_KEY = 'vardi_user_questions';

/**
 * Decodes HTML entities commonly found in external API responses
 */
const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/**
 * Shuffles options for a single question and updates the correctOptionIndex accordingly.
 * This ensures the correct answer is randomly placed (A, B, C, or D) every time.
 */
const shuffleOptions = (question: Question): Question => {
  const originalOptions = [...question.options[Language.HINDI]];
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  
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

/**
 * Fetches the specific "Today Quiz" from RapidAPI and formats it with Gemini.
 */
const fetchTodayQuizQuestions = async (count: number): Promise<Question[]> => {
  try {
    const response = await fetch('https://current-affairs-of-india.p.rapidapi.com/today-quiz', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '3b407fa5afmshd6c50ce5dfc2a24p150202jsn71afa0c895c7',
        'x-rapidapi-host': 'current-affairs-of-india.p.rapidapi.com'
      }
    });
    
    const rawQuizData = await response.json();
    if (!rawQuizData) return [];

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const prompt = `Convert this 'Today Quiz' raw data into a structured JSON array of ${count} exam questions for the UP Homeguard exam.
    
    Raw Data: ${JSON.stringify(rawQuizData).substring(0, 5000)}
    
    Requirements:
    - Translate questions, options, and explanations into Hindi, English, and Bhojpuri.
    - Assign appropriate 'Pillar' categories.
    - Strictly follow our JSON schema.
    - Ensure options are realistic.`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
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

    return JSON.parse(result.text || "[]");
  } catch (error) {
    console.error("RapidAPI Today Quiz fetch failed:", error);
    return [];
  }
};

/**
 * Fetches "Today in History" facts from RapidAPI.
 */
const fetchHistoryQuestions = async (count: number): Promise<Question[]> => {
  try {
    const response = await fetch('https://current-affairs-of-india.p.rapidapi.com/history-of-today', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '3b407fa5afmshd6c50ce5dfc2a24p150202jsn71afa0c895c7',
        'x-rapidapi-host': 'current-affairs-of-india.p.rapidapi.com'
      }
    });
    
    const historyData = await response.json();
    if (!historyData || (Array.isArray(historyData) && historyData.length === 0)) return [];

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const prompt = `Generate ${count} History questions based on this 'History of Today' data: ${JSON.stringify(historyData).substring(0, 4000)}.
    Rules: Multilingual (Hindi/English/Bhojpuri), JSON format.`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
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

    return JSON.parse(result.text || "[]");
  } catch (error) {
    return [];
  }
};

/**
 * Fetches international news.
 */
const fetchCurrentAffairsQuestions = async (count: number): Promise<Question[]> => {
  try {
    const response = await fetch('https://current-affairs-of-india.p.rapidapi.com/international-today', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '3b407fa5afmshd6c50ce5dfc2a24p150202jsn71afa0c895c7',
        'x-rapidapi-host': 'current-affairs-of-india.p.rapidapi.com'
      }
    });
    
    const newsData = await response.json();
    if (!newsData || (Array.isArray(newsData) && newsData.length === 0)) return [];

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const prompt = `Generate ${count} Current Affairs questions for the UP Homeguard exam based on this data: ${JSON.stringify(newsData).substring(0, 4000)}.`;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
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

    return JSON.parse(result.text || "[]");
  } catch (error) {
    return [];
  }
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
  const unique = Array.from(new Map(updated.map(q => [q.text[Language.ENGLISH], q])).values());
  localStorage.setItem(USER_QUESTIONS_KEY, JSON.stringify(unique));
};

export const generateQuestions = async (pillar: Pillar | string, count: number = 20): Promise<Question[]> => {
  try {
    let pool: Question[] = [];
    
    // 1. Check User-Provided Bank
    const userQuestions = getUserQuestions().filter(q => {
      const matchesPillar = typeof pillar === 'string' && (pillar.includes('Mixed') || pillar.includes('Full') || pillar === 'Daily Challenge') ? true : q.pillar === pillar;
      return matchesPillar && !usedQuestionIds.has(q.id);
    });

    // 2. Check Local Question Bank
    const localAvailable = LOCAL_QUESTION_POOL.filter(q => {
      const matchesPillar = typeof pillar === 'string' && (pillar.includes('Mixed') || pillar.includes('Full') || pillar === 'Daily Challenge') ? true : q.pillar === pillar;
      return matchesPillar && !usedQuestionIds.has(q.id);
    });

    pool = [...userQuestions, ...localAvailable];

    // 3. specialized API Routing
    if (pillar === 'Daily Challenge') {
      const dailyQuiz = await fetchTodayQuizQuestions(Math.min(count, 20));
      pool = [...dailyQuiz, ...pool];
    } else if (pillar === Pillar.HISTORY) {
      const liveHistory = await fetchHistoryQuestions(Math.min(count, 10));
      pool = [...liveHistory, ...pool];
    } else if (pillar === Pillar.CURRENT_AFFAIRS) {
      const liveCA = await fetchCurrentAffairsQuestions(Math.min(count, 15));
      pool = [...liveCA, ...pool];
    }

    // 4. Fill Gap with Gemini Generation
    if (pool.length < count) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const remainingCount = count - pool.length;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Generate ${remainingCount} unique exam questions for UP Homeguard. Topic: ${pillar}. 
          STRICT: No placeholders. All options must be shuffled and correct answers must be diverse. No Math.`,
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
        const apiQs = JSON.parse(response.text || "[]");
        pool = [...pool, ...apiQs];
      } catch (err) {}
    }

    // Final Deduplication
    const uniquePool = Array.from(new Map(pool.map(q => [q.text[Language.ENGLISH], q])).values());
    let finalResult = uniquePool.sort(() => Math.random() - 0.5).slice(0, count);

    // Guaranteed Backfill from local bank if needed
    if (finalResult.length < count) {
      const gap = count - finalResult.length;
      for (let i = 0; i < gap; i++) {
        const base = LOCAL_QUESTION_POOL[i % LOCAL_QUESTION_POOL.length];
        finalResult.push({ ...base, id: `${base.id}-auto-${i}-${Math.random()}` });
      }
    }

    // Mark as used in this session to prevent duplicates
    finalResult.forEach(q => usedQuestionIds.add(q.id));
    
    // MANDATORY: Shuffle options for every single question before returning
    return finalResult.map(shuffleOptions);
  } catch (error) {
    console.error("Critical error in generateQuestions:", error);
    return LOCAL_QUESTION_POOL.sort(() => Math.random() - 0.5).slice(0, count).map(shuffleOptions);
  }
};

export const processBulkContent = async (rawContent: string): Promise<Question[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform this text into structured JSON questions. No Math.
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
        { text: "Extract questions to JSON. Real data only." }
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
