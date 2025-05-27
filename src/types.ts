export type Category = 'Python' | 'Scratch' | 'HTML/CSS/Javascript';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  type: 'implement' | 'fix' | 'explain';
  content: string;
  correctAnswer: string;
  points: number;
  timeLimit: number;
  category: Category;
  difficulty: Difficulty;
  choices: string[];
}

export interface GameState {
  category: Category;
  currentDifficulty: Difficulty;
  currentQuestionIndex: number;
  score: number;
  showAnswer: string | null;
  timeLeft: number;
  usedQuestions: number[];
  isBreak: boolean;
  mainTimeRemaining: number;
  mainTimerPaused: boolean;
} 