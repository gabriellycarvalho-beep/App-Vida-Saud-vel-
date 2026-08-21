import { DayState, DietType, MealState, MealType, UserChallengeState } from '../types';

const STORAGE_KEY = 'desafio_vida_saudavel_state_v1';

export function createEmptyMealState(): MealState {
  return {
    completed: false,
    selectedOptionId: '',
    customText: '',
  };
}

export function createInitialDay(dayNumber: number): DayState {
  return {
    dayNumber,
    completed: false,
    meals: {
      cafe: createEmptyMealState(),
      almoco: createEmptyMealState(),
      lanche: createEmptyMealState(),
      jantar: createEmptyMealState(),
    },
    waterCups: 0,
    notes: '',
  };
}

export function createDefaultState(initialDiet: DietType = 'low_carb'): UserChallengeState {
  const days: Record<number, DayState> = {};
  for (let i = 1; i <= 30; i++) {
    days[i] = createInitialDay(i);
  }
  return {
    version: 1,
    activeDietType: initialDiet,
    days,
    lastUpdated: new Date().toISOString(),
  };
}

export function loadUserChallengeState(): UserChallengeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultState = createDefaultState();
      saveUserChallengeState(defaultState);
      return defaultState;
    }
    const parsed = JSON.parse(raw) as UserChallengeState;
    // Validate that all 30 days exist
    if (!parsed.days || Object.keys(parsed.days).length < 30) {
      const fullDefault = createDefaultState(parsed.activeDietType || 'low_carb');
      for (let i = 1; i <= 30; i++) {
        if (parsed.days && parsed.days[i]) {
          fullDefault.days[i] = {
            ...fullDefault.days[i],
            ...parsed.days[i],
            meals: {
              ...fullDefault.days[i].meals,
              ...(parsed.days[i].meals || {}),
            },
          };
        }
      }
      saveUserChallengeState(fullDefault);
      return fullDefault;
    }
    return parsed;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return createDefaultState();
  }
}

export function saveUserChallengeState(state: UserChallengeState): void {
  try {
    const updated = {
      ...state,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
}

export function calculateChallengeStats(days: Record<number, DayState>) {
  let completedDaysCount = 0;
  let totalMealsCompleted = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  const mealKeys: MealType[] = ['cafe', 'almoco', 'lanche', 'jantar'];

  for (let i = 1; i <= 30; i++) {
    const day = days[i];
    if (!day) continue;

    const mealsCount = mealKeys.reduce((acc, mealKey) => {
      return acc + (day.meals[mealKey]?.completed ? 1 : 0);
    }, 0);

    totalMealsCompleted += mealsCount;

    if (day.completed || mealsCount === 4) {
      completedDaysCount++;
      tempStreak++;
      if (tempStreak > currentStreak) {
        currentStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  const percentage = Math.round((completedDaysCount / 30) * 100);
  const mealsPercentage = Math.round((totalMealsCompleted / 120) * 100);

  return {
    completedDaysCount,
    totalMealsCompleted,
    percentage,
    mealsPercentage,
    currentStreak,
  };
}
