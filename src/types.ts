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
  currentQuestion: number;
  timeRemaining: number;
  isBreak: boolean;
  mainTimerPaused: boolean;
  mainTimeRemaining: number;
  currentDifficulty: 'easy' | 'medium' | 'hard';
  correctAnswers: number;
} 