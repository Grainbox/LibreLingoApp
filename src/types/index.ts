/**
 * Type definitions for LibreLingo
 *
 * Shared types and interfaces used throughout the app
 */

// Course and challenge data types (from JSON contract)
export interface CourseData {
  languageName: string;
  languageCode: string;
  uiLanguage: string;
  specialCharacters: string[];
  repositoryURL: string;
  license: {
    name: {
      short: string;
      full: string;
    };
    link: string;
  };
  modules: Module[];
}

export interface Module {
  title: string;
  skills: SkillSummary[];
}

export interface SkillSummary {
  id: string;
  title: string;
  summary: string[];
  levels: number;
  practiceHref: string;
  introduction?: string;
  imageSet?: string[];
}

export interface SkillData {
  id: string;
  levels: number;
  challenges: Challenge[];
}

// Challenge types (from JSON contract)
export type ChallengeType =
  | "cards"
  | "shortInput"
  | "listeningExercise"
  | "options"
  | "chips";

export interface BaseChallenge {
  id: string;
  type: ChallengeType;
  group: string;
  priority: 0 | 1 | 2;
}

export interface CardsChallenge extends BaseChallenge {
  type: "cards";
  pictures: string[] | null;
  formInTargetLanguage: string;
  meaningInSourceLanguage: string;
}

export interface ShortInputChallenge extends BaseChallenge {
  type: "shortInput";
  pictures: string[] | null;
  formInTargetLanguage: string[];
  phrase: Definition[];
}

export interface ListeningChallenge extends BaseChallenge {
  type: "listeningExercise";
  answer: string;
  meaning: string;
  audio: string;
}

export interface OptionsChallenge extends BaseChallenge {
  type: "options";
  formInTargetLanguage: string;
  meaningInSourceLanguage: string;
  distractors: string[];
}

export interface ChipsChallenge extends BaseChallenge {
  type: "chips";
  translatesToSourceLanguage: boolean;
  chips: string[];
  phrase: Definition[];
  solutions: string[][];
  formattedSolution: string;
}

export type Challenge =
  | CardsChallenge
  | ShortInputChallenge
  | ListeningChallenge
  | OptionsChallenge
  | ChipsChallenge;

export interface Definition {
  word: string;
  definition: string;
}

// User progress types
export interface UserProgress {
  skillId: string;
  levelCompleted: number;
  xpEarned: number;
  lastPracticedAt: number;
}

export interface UserStats {
  totalXP: number;
  streakDays: number;
  lastPracticeDate: number;
}
