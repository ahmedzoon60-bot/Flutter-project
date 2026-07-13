export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  time: string;
  ingredients: string[];
  instructions?: string[];
  isEaten?: boolean;
}

export interface DailyPlan {
  dayNumber: number;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
  tip: string;
}

export interface CuratedProgram {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'loss' | 'gain' | 'wellness' | 'endurance';
  durationWeeks: number;
  dailyCalories: number;
  macros: {
    protein: number; // percentage
    carbs: number;   // percentage
    fat: number;     // percentage
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviewsCount: number;
  author: string;
  tags: string[];
  days: DailyPlan[];
  imageColor: string; // for high-contrast card themes
  emoji: string;
}

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface LoggedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: string;
}

export interface UserProfile {
  name: string;
  email: string;
  targetCalories: number;
  targetProtein: number; // grams
  targetCarbs: number;   // grams
  targetFat: number;     // grams
  activeProgramId: string | null;
  activeProgramDay: number;
  waterIntake: number; // in ml
  waterGoal: number; // in ml
  weightHistory: WeightRecord[];
  loggedMeals: LoggedMeal[];
}
