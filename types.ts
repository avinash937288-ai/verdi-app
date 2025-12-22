
export enum Language {
  HINDI = 'Hindi',
  ENGLISH = 'English',
  BHOJPURI = 'Bhojpuri'
}

export enum Pillar {
  SCIENCE = 'General Science',
  HISTORY = 'History',
  CONSTITUTION = 'Constitution',
  ECONOMY = 'Economy',
  GEOGRAPHY = 'Geography',
  CULTURE = 'Culture',
  ENVIRONMENT = 'Environment',
  UP_SPECIAL = 'UP Special GK',
  CURRENT_AFFAIRS = 'Current Affairs',
  POLICE_SECURITY = 'Police & Security',
  STATIC_GK = 'Static GK'
}

export interface Question {
  id: string;
  pillar: Pillar;
  text: {
    [Language.HINDI]: string;
    [Language.ENGLISH]: string;
    [Language.BHOJPURI]: string;
  };
  options: {
    [Language.HINDI]: string[];
    [Language.ENGLISH]: string[];
    [Language.BHOJPURI]: string[];
  };
  correctOptionIndex: number;
  explanation: {
    [Language.HINDI]: string;
    [Language.ENGLISH]: string;
    [Language.BHOJPURI]: string;
  };
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface MockTestMeta {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  durationMinutes: number;
}

export interface TestSession {
  id: string;
  type: 'MARATHON' | 'SPRINT' | 'MOCK';
  pillar?: Pillar;
  questions: Question[];
  userAnswers: (number | null)[];
  startTime: number;
  endTime?: number;
  score?: number;
  shayari?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  time: string;
}
