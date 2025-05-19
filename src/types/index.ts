export interface Team {
  id: string;
  name: string;
  score: number;
  members: string[];
}

export interface Question {
  id: string;
  type: 'fix-code' | 'implement-feature' | 'explain-concept';
  content: string;
  correctAnswer: string;
  points: number;
  timeLimit: number; // in seconds
}

export interface GameState {
  currentQuestion: number;
  timeRemaining: number;
  isBreak: boolean;
  isCoachSession: boolean;
}

export interface AIOpponent {
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
} 