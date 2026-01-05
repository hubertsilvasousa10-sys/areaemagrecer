
export interface Exercise {
  id: number;
  name: string;
  reps: string;
  duration: string;
  category: 'Cardio' | 'Força' | 'Alongamento';
  videoUrl: string;
}

export interface WeightEntry {
  date: string;
  weight: number;
  waist?: number;
  bodyFat?: number;
}

export interface FoodLog {
  date: string;
  meals: {
    type: string;
    description: string;
    healthy: boolean;
  }[];
}

export interface UserProgress {
  name: string;
  email: string; // Added email field
  startDate: string; 
  completedDays: number[];
  completedExercises: number[];
  weightHistory: WeightEntry[];
  foodLog: FoodLog[];
  lastLogin: string;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  EBOOK = 'ebook',
  EXERCISES = 'exercises',
  TRACKING = 'tracking',
  BONUSES = 'bonuses',
  SUPPORT = 'support',
  RESULTS = 'results'
}
