import { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Filter,
  Maximize2,
  Minimize2,
  Award,
  ChevronRight,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { DayState, DietType, MealState, MealType, UserChallengeState } from './types';
import {
  calculateChallengeStats,
  createDefaultState,
  loadUserChallengeState,
  saveUserChallengeState,
} from './utils/storage';
import { Header } from './components/Header';
import { DayCard } from './components/DayCard';
import { DietGuideModal } from './components/DietGuideModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';

type FilterType = 'all' | 'pending' | 'completed';
type WeekFilter = 'all' | 'w1' | 'w2' | 'w3' | 'w4' | 'w5';

export default function App() {
  const [challengeState, setChallengeState] = useState<UserChallengeState>(() =>
    loadUserChallengeState()
  );
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true, // Default expand day 1
  });
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [weekFilter, setWeekFilter] = useState<WeekFilter>('all');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Sync state to localStorage whenever state changes
  useEffect(() => {
    saveUserChallengeState(challengeState);
  }, [challengeState]);

  const activeDiet = challengeState.activeDietType;

  // Calculate overall stats
  const stats = useMemo(() => {
    return calculateChallengeStats(challengeState.days);
  }, [challengeState.days]);

  // Handler: Change active diet
  const handleDietChange = (diet: DietType) => {
    setChallengeState((prev) => ({
      ...prev,
      activeDietType: diet,
    }));
  };

  // Handler: Toggle single day expansion
  const handleToggleExpand = (dayNumber: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNumber]: !prev[dayNumber],
    }));
  };

  // Handler: Expand/Collapse all
  const handleExpandAll = (expand: boolean) => {
    const nextExpanded: Record<number, boolean> = {};
    for (let i = 1; i <= 30; i++) {
      nextExpanded[i] = expand;
    }
    setExpandedDays(nextExpanded);
  };

  // Handler: Toggle day completed checkbox
  const handleToggleDayCompleted = (dayNumber: number, forceState?: boolean) => {
    setChallengeState((prev) => {
      const currentDay = prev.days[dayNumber];
      const isCurrentlyCompleted =
        forceState !== undefined ? !forceState : currentDay.completed;
      const nextCompleted = !isCurrentlyCompleted;

      // If marking day as completed, also mark all 4 meals as completed
      const mealTypes: MealType[] = ['cafe', 'lanche', 'almoco', 'jantar'];
      const updatedMeals = { ...currentDay.meals };

      if (nextCompleted) {
        mealTypes.forEach((m) => {
          updatedMeals[m] = {
            ...updatedMeals[m],
            completed: true,
          };
        });
      }

      return {
        ...prev,
        days: {
          ...prev.days,
          [dayNumber]: {
            ...currentDay,
            completed: nextCompleted,
            meals: updatedMeals,
          },
        },
      };
    });
  };

  // Handler: Update a single meal in a day
  const handleUpdateMeal = (
    dayNumber: number,
    mealType: MealType,
    updated: Partial<MealState>
  ) => {
    setChallengeState((prev) => {
      const currentDay = prev.days[dayNumber];
      const currentMeal = currentDay.meals[mealType];

      const newMeal = {
        ...currentMeal,
        ...updated,
      };

      const newMeals = {
        ...currentDay.meals,
        [mealType]: newMeal,
      };

      // Check if all 4 meals are completed
      const mealKeys: MealType[] = ['cafe', 'lanche', 'almoco', 'jantar'];
      const allDone = mealKeys.every((k) => newMeals[k].completed);

      return {
        ...prev,
        days: {
          ...prev.days,
          [dayNumber]: {
            ...currentDay,
            completed: allDone ? true : currentDay.completed,
            meals: newMeals,
          },
        },
      };
    });
  };

  // Handler: Update water cups for a day
  const handleUpdateWater = (dayNumber: number, count: number) => {
    setChallengeState((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [dayNumber]: {
          ...prev.days[dayNumber],
          waterCups: count,
        },
      },
    }));
  };

  // Handler: Reset challenge state
  const handleResetChallenge = () => {
    const newState = createDefaultState(challengeState.activeDietType);
    setChallengeState(newState);
    saveUserChallengeState(newState);
    setExpandedDays({ 1: true });
  };

  // Share summary handler
  const handleShareProgress = () => {
    const text = `🏆 Desafio Vida Saudável: completei ${stats.completedDaysCount} de 30 dias (${stats.percentage}%) e ${stats.totalMealsCompleted}/120 refeições saudáveis! 🥗💧`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  // Filter 30 days
  const filteredDays: DayState[] = useMemo(() => {
    const daysArray = (Object.values(challengeState.days) as DayState[]).sort(
      (a: DayState, b: DayState) => a.dayNumber - b.dayNumber
    );

    return daysArray.filter((day: DayState) => {
      // Week filter
      if (weekFilter === 'w1' && (day.dayNumber < 1 || day.dayNumber > 7)) return false;
      if (weekFilter === 'w2' && (day.dayNumber < 8 || day.dayNumber > 14)) return false;
      if (weekFilter === 'w3' && (day.dayNumber < 15 || day.dayNumber > 21)) return false;
      if (weekFilter === 'w4' && (day.dayNumber < 22 || day.dayNumber > 28)) return false;
      if (weekFilter === 'w5' && (day.dayNumber < 29 || day.dayNumber > 30)) return false;

      // Status filter
      const mealKeys: MealType[] = ['cafe', 'lanche', 'almoco', 'jantar'];
      const completedMealsCount = mealKeys.filter((m) => day.meals[m]?.completed).length;
      const isDone = day.completed || completedMealsCount === 4;

      if (filterType === 'pending') return !isDone;
      if (filterType === 'completed') return isDone;

      return true;
    });
  }, [challengeState.days, filterType, weekFilter]);

  // Grand celebration if 30 days reached
  useEffect(() => {
    if (stats.completedDaysCount === 30) {
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [stats.completedDaysCount]);

  return (
    <div className="min-h-screen bg-[#070A11] flex items-center justify-center p-0 sm:p-4 text-slate-100 selection:bg-[#FF6B8B] selection:text-white">
      {/* Mobile-first centered phone container with sleek Night Theme */}
      <main className="w-full max-w-sm sm:max-w-md h-screen sm:h-[844px] bg-[#0F172A] rounded-none sm:rounded-[44px] shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-0 sm:border-[10px] border-[#1E293B] flex flex-col overflow-hidden relative">
        {/* Phone Notch (visible on desktop mockup) */}
        <div className="hidden sm:block w-24 h-3.5 bg-[#070A11] rounded-b-xl mx-auto -mt-0.5 mb-1 z-30 flex-shrink-0" />

        {/* Scrollable Content Container */}
        <div className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Header with Title & Diet Selector */}
          <Header
            activeDiet={activeDiet}
            onChangeDiet={handleDietChange}
            stats={stats}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenReset={() => setIsResetModalOpen(true)}
          />

          {/* Milestone / Encouragement Banner */}
          {stats.completedDaysCount === 30 ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-500/20 text-center space-y-1 border border-emerald-400/40">
              <div className="w-10 h-10 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-1">
                <Award className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="font-extrabold text-base">
                🎉 Parabéns! Você completou os 30 Dias!
              </h3>
              <p className="text-xs text-emerald-100">
                Uma grande vitória para sua saúde, disciplina e bem-estar.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#1E293B] border border-slate-800 text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FF6B8B] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-pink-500/20">
                  {stats.completedDaysCount + 1}
                </div>
                <span className="font-semibold text-slate-200">
                  Próximo objetivo: Dia {Math.min(stats.completedDaysCount + 1, 30)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const target = Math.min(stats.completedDaysCount + 1, 30);
                  setExpandedDays((prev) => ({ ...prev, [target]: true }));
                  const el = document.getElementById(`card-day-${target}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-0.5"
              >
                <span>Ir ao dia</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Week & Status Filter Tabs */}
          <div className="space-y-2">
            {/* Week Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                type="button"
                id="btn-filter-all-weeks"
                onClick={() => setWeekFilter('all')}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  weekFilter === 'all'
                    ? 'bg-slate-100 text-slate-900 shadow-md'
                    : 'bg-[#1E293B] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                Todos (30 Dias)
              </button>
              <button
                type="button"
                id="btn-filter-w1"
                onClick={() => setWeekFilter('w1')}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  weekFilter === 'w1'
                    ? 'bg-slate-100 text-slate-900 shadow-md'
                    : 'bg-[#1E293B] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                Semana 1
              </button>
              <button
                type="button"
                id="btn-filter-w2"
                onClick={() => setWeekFilter('w2')}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  weekFilter === 'w2'
                    ? 'bg-slate-100 text-slate-900 shadow-md'
                    : 'bg-[#1E293B] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                Semana 2
              </button>
              <button
                type="button"
                id="btn-filter-w3"
                onClick={() => setWeekFilter('w3')}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  weekFilter === 'w3'
                    ? 'bg-slate-100 text-slate-900 shadow-md'
                    : 'bg-[#1E293B] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                Semana 3
              </button>
              <button
                type="button"
                id="btn-filter-w4"
                onClick={() => setWeekFilter('w4')}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  weekFilter === 'w4'
                    ? 'bg-slate-100 text-slate-900 shadow-md'
                    : 'bg-[#1E293B] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                Semana 4
              </button>
              <button
                type="button"
                id="btn-filter-w5"
                onClick={() => setWeekFilter('w5')}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  weekFilter === 'w5'
                    ? 'bg-slate-100 text-slate-900 shadow-md'
                    : 'bg-[#1E293B] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                Reta Final
              </button>
            </div>

            {/* Sub-bar: Status Filter and Expand/Collapse buttons */}
            <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-800">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  id="btn-status-all"
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    filterType === 'all'
                      ? 'bg-[#FF6B8B] text-white shadow-md shadow-pink-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  type="button"
                  id="btn-status-pending"
                  onClick={() => setFilterType('pending')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    filterType === 'pending'
                      ? 'bg-[#FF6B8B] text-white shadow-md shadow-pink-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Pendentes
                </button>
                <button
                  type="button"
                  id="btn-status-completed"
                  onClick={() => setFilterType('completed')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                    filterType === 'completed'
                      ? 'bg-[#FF6B8B] text-white shadow-md shadow-pink-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Concluídos
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  id="btn-expand-all"
                  onClick={() => handleExpandAll(true)}
                  title="Expandir todos os dias"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  id="btn-collapse-all"
                  onClick={() => handleExpandAll(false)}
                  title="Recolher todos os dias"
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Days List (1 to 30) */}
          <div className="space-y-2.5 pb-6">
            {filteredDays.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-2xl bg-[#1E293B] border border-slate-800 space-y-2">
                <div className="w-9 h-9 mx-auto rounded-full bg-[#0F172A] border border-slate-700 flex items-center justify-center text-slate-400">
                  <Filter className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-slate-200">
                  Nenhum dia encontrado neste filtro
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilterType('all');
                    setWeekFilter('all');
                  }}
                  className="mt-1 text-xs font-bold text-[#FF8E9E] hover:underline"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              filteredDays.map((day) => (
                <DayCard
                  key={day.dayNumber}
                  day={day}
                  activeDiet={activeDiet}
                  isExpanded={Boolean(expandedDays[day.dayNumber])}
                  onToggleExpand={() => handleToggleExpand(day.dayNumber)}
                  onToggleDayCompleted={handleToggleDayCompleted}
                  onUpdateMeal={handleUpdateMeal}
                  onUpdateWater={handleUpdateWater}
                />
              ))
            )}
          </div>
        </div>

        {/* Floating Quick Action / Bottom Bar */}
        <footer className="bg-[#1E293B] border-t border-slate-800 px-4 py-2.5 flex items-center justify-between gap-2 z-20 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#831843]/40 border border-[#FF6B8B]/40 text-[#FF8E9E] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-slate-200">
                {stats.completedDaysCount}/30 Dias Concluídos
              </span>
              <p className="text-slate-400 text-[10px]">Progresso salvo no dispositivo</p>
            </div>
          </div>

          <button
            type="button"
            id="btn-share-progress"
            onClick={handleShareProgress}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FF6B8B] hover:bg-[#FF8E9E] text-white text-xs font-bold shadow-md shadow-pink-500/20 transition-colors"
          >
            <Share2 className="w-3 h-3" />
            <span>Compartilhar</span>
          </button>
        </footer>

        {/* Bottom Home Indicator Bar (Mobile look) */}
        <div className="hidden sm:block pb-1 bg-[#1E293B]">
          <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto my-1" />
        </div>

        {/* Share Toast Notification */}
        {shareToast && (
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-full shadow-2xl border border-slate-700 animate-in fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Resumo copiado para a área de transferência!</span>
          </div>
        )}

        {/* Diet Guide Modal */}
        <DietGuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />

        {/* Reset Confirmation Modal */}
        <ResetConfirmModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirmReset={handleResetChallenge}
        />
      </main>
    </div>
  );
}
