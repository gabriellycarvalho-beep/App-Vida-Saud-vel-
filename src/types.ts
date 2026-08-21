export type DietType = 'low_carb' | 'high_carb';

export type MealType = 'cafe' | 'lanche' | 'almoco' | 'jantar';

export interface MealOption {
  id: string;
  label: string;
  isCustom?: boolean;
  tag?: string;
}

export interface MealConfig {
  type: MealType;
  title: string;
  subtitle: string;
  timeHint: string;
  iconName: 'Coffee' | 'Apple' | 'Utensils' | 'Moon';
}

export interface MealState {
  completed: boolean;
  selectedOptionId: string;
  customText: string;
}

export interface DayState {
  dayNumber: number;
  completed: boolean;
  meals: Record<MealType, MealState>;
  waterCups?: number; // Each cup ~250ml (e.g. 0 to 12)
  notes?: string;
}

export interface UserChallengeState {
  version: number;
  activeDietType: DietType;
  days: Record<number, DayState>;
  lastUpdated: string;
}
