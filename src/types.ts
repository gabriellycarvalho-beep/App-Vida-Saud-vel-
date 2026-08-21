export type DietType = 'low_carb' | 'high_carb';

export type MealType = 'cafe' | 'almoco' | 'lanche' | 'jantar';

export interface MealBuilderCategory {
  title: string;
  items: string[];
}

export interface MealOption {
  id: string;
  label: string;
  title?: string;
  ingredients?: string[];
  instructions?: string;
  tag?: string;
  isCustom?: boolean;
  isBuilder?: boolean;
  builderCategories?: MealBuilderCategory[];
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
  selectedCarb?: string;
  selectedProtein?: string;
}

export interface DayState {
  dayNumber: number;
  completed: boolean;
  meals: Record<MealType, MealState>;
  waterCups?: number; // Each cup ~250ml
  exerciseCompleted?: boolean;
  notes?: string;
}

export interface UserChallengeState {
  version: number;
  activeDietType: DietType;
  days: Record<number, DayState>;
  lastUpdated: string;
}

