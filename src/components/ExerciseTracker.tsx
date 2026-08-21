import { useMemo } from 'react';
import {
  Dumbbell,
  Check,
  Flame,
  Award,
  Sparkles,
  CheckCheck,
  Target,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayState } from '../types';

interface ExerciseTrackerProps {
  days: Record<number, DayState>;
  onToggleExercise: (dayNumber: number) => void;
  onToggleWeekExercise?: (dayNumbers: number[], forceComplete: boolean) => void;
}

interface WeekGroup {
  id: string;
  name: string;
  days: number[];
  target: number;
}

const WEEKS_DATA: WeekGroup[] = [
  { id: 'w1', name: 'Semana 1', days: [1, 2, 3, 4, 5, 6, 7], target: 3 },
  { id: 'w2', name: 'Semana 2', days: [8, 9, 10, 11, 12, 13, 14], target: 3 },
  { id: 'w3', name: 'Semana 3', days: [15, 16, 17, 18, 19, 20, 21], target: 3 },
  { id: 'w4', name: 'Semana 4', days: [22, 23, 24, 25, 26, 27, 28], target: 3 },
  { id: 'w5', name: 'Semana 5 (Reta Final)', days: [29, 30], target: 2 },
];

export function ExerciseTracker({
  days,
  onToggleExercise,
  onToggleWeekExercise,
}: ExerciseTrackerProps) {
  // Calculate exercise statistics with the 3 workouts/week goal
  const stats = useMemo(() => {
    let totalCompleted = 0;
    let completedWeeksCount = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    for (let i = 1; i <= 30; i++) {
      const isDone = Boolean(days[i]?.exerciseCompleted);
      if (isDone) {
        totalCompleted++;
        tempStreak++;
        if (tempStreak > currentStreak) {
          currentStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    WEEKS_DATA.forEach((week) => {
      const doneInWeek = week.days.filter((d) => days[d]?.exerciseCompleted).length;
      if (doneInWeek >= week.target) {
        completedWeeksCount++;
      }
    });

    const totalTarget = 14; // 3 + 3 + 3 + 3 + 2
    const percentage = Math.min(Math.round((totalCompleted / totalTarget) * 100), 100);

    return {
      totalCompleted,
      completedWeeksCount,
      totalWeeks: WEEKS_DATA.length,
      percentage,
      currentStreak,
      allWeeksCompleted: completedWeeksCount === WEEKS_DATA.length,
    };
  }, [days]);

  const handleCircleClick = (dayNumber: number, week: WeekGroup) => {
    const isDone = Boolean(days[dayNumber]?.exerciseCompleted);
    const nextState = !isDone;

    if (nextState) {
      const doneInWeekBefore = week.days.filter((d) => days[d]?.exerciseCompleted).length;
      // If this click hits the goal (e.g. reaches 3)
      if (doneInWeekBefore + 1 === week.target) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#38BDF8', '#34D399', '#FF6B8B', '#FBBF24'],
          });
        } catch {
          // ignore
        }
      } else {
        try {
          confetti({
            particleCount: 20,
            spread: 35,
            origin: { y: 0.65 },
            colors: ['#38BDF8', '#FF6B8B'],
          });
        } catch {
          // ignore
        }
      }
    }
    onToggleExercise(dayNumber);
  };

  const handleQuickGoalWeek = (week: WeekGroup, isGoalMet: boolean) => {
    if (!onToggleWeekExercise) return;

    if (isGoalMet) {
      // Uncheck all days in this week
      onToggleWeekExercise(week.days, false);
    } else {
      // Check the first 'target' days of this week to complete the goal
      const targetDays = week.days.slice(0, week.target);
      onToggleWeekExercise(targetDays, true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#34D399', '#38BDF8', '#FF6B8B'],
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Exercise Summary Card */}
      <div className="bg-[#1E293B] rounded-2xl p-4 border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-[#38BDF8]">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Treinos Semanais
                </h2>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  Meta: 3x/semana
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Marque 3 treinos em cada semana para concluir</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#0F172A] px-2.5 py-1 rounded-full border border-slate-800 text-[11px] font-bold text-sky-400">
            <Flame className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span>{stats.currentStreak} {stats.currentStreak === 1 ? 'dia' : 'dias'}</span>
          </div>
        </div>

        {/* Quick Stats 3-column bar */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2 rounded-xl bg-[#0F172A] border border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">
              Semanas
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#FF8E9E]">
              {stats.completedWeeksCount}/{stats.totalWeeks} concluídas
            </span>
          </div>
          <div className="p-2 rounded-xl bg-[#0F172A] border border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">
              Treinos Feitos
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-100">
              {stats.totalCompleted} no mês
            </span>
          </div>
          <div className="p-2 rounded-xl bg-[#0F172A] border border-slate-800">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">
              Meta Geral
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#38BDF8]">
              {stats.percentage}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-bold tracking-wider">
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3 text-sky-400" />
              <span>META GERAL DO DESAFIO</span>
            </span>
            <span className={stats.completedWeeksCount > 0 ? 'text-[#FF8E9E] font-bold' : 'text-slate-400'}>
              {stats.completedWeeksCount === stats.totalWeeks
                ? 'TODAS AS METAS BATIDAS! 🏆'
                : `${stats.completedWeeksCount} DE 5 SEMANAS BATIDAS`}
            </span>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-[#818CF8] to-[#FF6B8B] rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${Math.max((stats.completedWeeksCount / stats.totalWeeks) * 100, 4)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grand milestone card if all weeks completed */}
      {stats.allWeeksCompleted && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#BE185D] to-[#9D174D] text-white shadow-lg shadow-pink-500/20 text-center space-y-1 border border-pink-400/40 animate-in fade-in">
          <div className="w-9 h-9 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-1">
            <Award className="w-5 h-5 text-yellow-300" />
          </div>
          <h3 className="font-extrabold text-sm">
            🏆 Meta Mensal de Exercícios Concluída!
          </h3>
          <p className="text-[11px] text-pink-100">
            Você bateu a meta de 3 treinos em todas as semanas do desafio!
          </p>
        </div>
      )}

      {/* Weeks List */}
      <div className="space-y-3">
        {WEEKS_DATA.map((week, weekIdx) => {
          const completedInWeek = week.days.filter((d) => days[d]?.exerciseCompleted).length;
          const isGoalMet = completedInWeek >= week.target;

          return (
            <div
              key={week.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 bg-[#1E293B] ${
                isGoalMet
                  ? 'border-[#FF6B8B]/60 bg-pink-950/20 shadow-xs ring-1 ring-[#FF6B8B]/30'
                  : 'border-slate-800/90 hover:border-slate-700 shadow-sm'
              }`}
            >
              {/* Week Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wide text-slate-200">
                    {week.name}
                  </span>

                  {isGoalMet ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-950/80 text-pink-300 border border-pink-700/60 shadow-xs">
                      <Sparkles className="w-3 h-3 text-[#FF6B8B]" />
                      <span>Meta Batida ({completedInWeek}/{week.target})</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                      {completedInWeek}/{week.target} treinos
                    </span>
                  )}
                </div>

                {onToggleWeekExercise && (
                  <button
                    type="button"
                    id={`btn-toggle-week-${weekIdx + 1}`}
                    onClick={() => handleQuickGoalWeek(week, isGoalMet)}
                    className="text-[10px] font-semibold text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                  >
                    <CheckCheck className="w-3 h-3 text-slate-400" />
                    <span>{isGoalMet ? 'Desmarcar' : `Marcar ${week.target} treinos`}</span>
                  </button>
                )}
              </div>

              {/* Minimalist Day Bubbles Grid */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {week.days.map((dayNum) => {
                  const isDone = Boolean(days[dayNum]?.exerciseCompleted);

                  return (
                    <div key={dayNum} className="flex flex-col items-center gap-1">
                      <button
                        type="button"
                        id={`btn-exercise-day-${dayNum}`}
                        onClick={() => handleCircleClick(dayNum, week)}
                        title={`Dia ${dayNum} - ${isDone ? 'Treino Concluído' : 'Pendente'}`}
                        aria-label={`Exercício Dia ${dayNum} ${isDone ? 'concluído' : 'pendente'}`}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 select-none ${
                          isDone
                            ? 'bg-[#38BDF8] text-slate-950 shadow-md shadow-sky-500/25 scale-[1.03] ring-2 ring-sky-400/40'
                            : 'bg-[#0F172A] text-slate-400 border border-slate-700/80 hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-4 h-4 stroke-[3] text-slate-950 animate-in zoom-in-50 duration-150" />
                        ) : (
                          <span className="text-[11px] font-medium">
                            {dayNum < 10 ? `0${dayNum}` : dayNum}
                          </span>
                        )}
                      </button>

                      <span
                        className={`text-[9px] font-semibold tracking-tighter ${
                          isDone ? 'text-sky-300' : 'text-slate-500'
                        }`}
                      >
                        D{dayNum}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
