import React, { useState } from 'react';
import { ChevronDown, Check, CheckCircle2, Circle, Sparkles, Droplets, CheckCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayState, DietType, MealState, MealType } from '../types';
import { MealItem } from './MealItem';

export interface DayCardProps {
  key?: React.Key;
  day: DayState;
  activeDiet: DietType;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleDayCompleted: (dayNumber: number, forceState?: boolean) => void;
  onUpdateMeal: (dayNumber: number, mealType: MealType, updated: Partial<MealState>) => void;
  onUpdateWater?: (dayNumber: number, count: number) => void;
}

export function DayCard({
  day,
  activeDiet,
  isExpanded,
  onToggleExpand,
  onToggleDayCompleted,
  onUpdateMeal,
  onUpdateWater,
}: DayCardProps) {
  const [, setJustCelebrated] = useState(false);

  const mealTypes: MealType[] = ['cafe', 'lanche', 'almoco', 'jantar'];
  const completedMealsCount = mealTypes.filter((m) => day.meals[m]?.completed).length;
  const isFullyCompleted = day.completed || completedMealsCount === 4;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF6B8B', '#FF8E9E', '#4A90E2', '#2563EB', '#10B981'],
      });
    } catch {
      // ignore
    }
    setJustCelebrated(true);
    setTimeout(() => setJustCelebrated(false), 2000);
  };

  const handleMainCheckClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isFullyCompleted;
    if (nextState) {
      triggerCelebration();
    }
    onToggleDayCompleted(day.dayNumber, nextState);
  };

  const handleMarkAllMeals = (e: React.MouseEvent) => {
    e.stopPropagation();
    mealTypes.forEach((m) => {
      onUpdateMeal(day.dayNumber, m, { completed: true });
    });
    triggerCelebration();
  };

  const dayWater = day.waterCups || 0;

  // Card classes based on "Natural Tones" design specifications
  const getCardClasses = () => {
    if (isFullyCompleted) {
      return 'border border-emerald-200/90 bg-emerald-50/50 rounded-2xl shadow-xs';
    }
    if (isExpanded) {
      return 'border-2 border-[#FF6B8B] rounded-2xl bg-white shadow-sm';
    }
    return 'border border-slate-200/80 bg-slate-50/50 rounded-2xl opacity-90 hover:opacity-100 hover:bg-white hover:border-slate-300 transition-all';
  };

  return (
    <div
      id={`card-day-${day.dayNumber}`}
      className={`transition-all duration-200 overflow-hidden ${getCardClasses()}`}
    >
      {/* Accordion Header */}
      <div
        onClick={onToggleExpand}
        className="w-full flex items-center justify-between p-3.5 sm:p-4 cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleExpand();
          }
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Natural Tones Number Badge */}
          {isFullyCompleted ? (
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-xs">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          ) : isExpanded ? (
            <div className="w-8 h-8 rounded-full border-2 border-[#FF6B8B] flex items-center justify-center text-[#FF6B8B] font-bold text-xs flex-shrink-0 bg-white shadow-xs">
              {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0">
              {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
            </div>
          )}

          {/* Title and indicators */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-700 tracking-tight">
                Dia {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
              </h3>

              {isFullyCompleted ? (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-700">
                  <Sparkles className="w-2.5 h-2.5" />
                  Concluído
                </span>
              ) : isExpanded ? (
                <span className="text-[10px] font-semibold text-[#FF6B8B]">
                  Em andamento ({completedMealsCount}/4)
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-medium">
                  {completedMealsCount}/4 refeições
                </span>
              )}
            </div>

            {/* Subtitle dots */}
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex gap-1 items-center">
                {mealTypes.map((m, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      day.meals[m]?.completed
                        ? isFullyCompleted
                          ? 'bg-emerald-500'
                          : 'bg-[#FF6B8B]'
                        : 'bg-slate-300'
                    }`}
                    title={m}
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400">
                {isFullyCompleted
                  ? 'Todas as refeições concluídas'
                  : `${4 - completedMealsCount} pendente(s)`}
              </span>
            </div>
          </div>
        </div>

        {/* Right side check & expand arrow */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            id={`btn-main-check-day-${day.dayNumber}`}
            onClick={handleMainCheckClick}
            aria-label={`Marcar Dia ${day.dayNumber} como ${isFullyCompleted ? 'incompleto' : 'concluído'}`}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              isFullyCompleted
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300 hover:text-slate-600'
            }`}
          >
            {isFullyCompleted ? (
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Circle className="w-4 h-4 stroke-[1.5]" />
            )}
          </button>

          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-slate-700' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Expanded Accordion Body with Natural Tones dashed tree connector */}
      {isExpanded && (
        <div className="border-t border-slate-100 p-3.5 sm:p-4 bg-white space-y-3">
          {/* Quick Actions & Header inside Day */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Refeições do Dia {day.dayNumber}:
            </p>
            <button
              type="button"
              id={`btn-mark-all-day-${day.dayNumber}`}
              onClick={handleMarkAllMeals}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2 py-0.8 rounded-lg border border-slate-200 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Marcar 4 refeições</span>
            </button>
          </div>

          {/* 4 Meals with Left Dashed Tree Guide */}
          <div className="space-y-3 ml-1 border-l-2 border-dashed border-slate-200 pl-3 sm:pl-3.5">
            {mealTypes.map((mealType) => (
              <MealItem
                key={mealType}
                dayNumber={day.dayNumber}
                mealType={mealType}
                mealState={day.meals[mealType]}
                activeDiet={activeDiet}
                onUpdateMeal={(mType, updated) => onUpdateMeal(day.dayNumber, mType, updated)}
              />
            ))}
          </div>

          {/* Water Tracker for this Day */}
          {onUpdateWater && (
            <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Droplets className="w-3.5 h-3.5 text-[#4A90E2]" />
                  <span>Hidratação do Dia</span>
                </div>
                <span className="text-[10px] font-bold text-[#4A90E2]">
                  {dayWater * 250}ml / 2000ml ({dayWater}/8 copos)
                </span>
              </div>
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const isDrunk = idx < dayWater;
                  return (
                    <button
                      key={idx}
                      type="button"
                      id={`btn-water-day-${day.dayNumber}-cup-${idx + 1}`}
                      onClick={() => onUpdateWater(day.dayNumber, isDrunk ? idx : idx + 1)}
                      title={`Copo ${idx + 1} (250ml)`}
                      className={`h-7 rounded-md flex items-center justify-center text-xs font-bold transition-all ${
                        isDrunk
                          ? 'bg-[#4A90E2] text-white shadow-2xs'
                          : 'bg-white text-slate-400 border border-slate-200 hover:bg-sky-50 hover:text-sky-600'
                      }`}
                    >
                      💧
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

