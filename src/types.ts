export interface GameState {
  currentQuestion: number;
  timeRemaining: number;
  isBreak: boolean;
  mainTimerPaused: boolean;
  mainTimeRemaining: number;
  currentDifficulty: 'easy' | 'medium' | 'hard';
  correctAnswers: number;
} 