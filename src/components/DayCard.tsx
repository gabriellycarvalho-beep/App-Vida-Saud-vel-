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

  const mealTypes: MealType[] = ['cafe', 'almoco', 'lanche', 'jantar'];
  const completedMealsCount = mealTypes.filter((m) => day.meals[m]?.completed).length;
  const isFullyCompleted = day.completed || completedMealsCount === 4;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF6B8B', '#FF8E9E', '#4A90E2', '#38BDF8', '#10B981'],
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

  // Card classes for Night Theme
  const getCardClasses = () => {
    if (isFullyCompleted) {
      return 'border border-emerald-500/40 bg-emerald-950/20 rounded-2xl shadow-xs';
    }
    if (isExpanded) {
      return 'border-2 border-[#FF6B8B]/80 rounded-2xl bg-[#1E293B] shadow-md shadow-pink-500/5';
    }
    return 'border border-slate-800 bg-[#1E293B]/70 rounded-2xl hover:border-slate-700 hover:bg-[#1E293B] transition-all';
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
          {/* Night Theme Number Badge */}
          {isFullyCompleted ? (
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-xs">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          ) : isExpanded ? (
            <div className="w-8 h-8 rounded-full border-2 border-[#FF6B8B] flex items-center justify-center text-[#FF8E9E] font-bold text-xs flex-shrink-0 bg-[#0F172A] shadow-xs">
              {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-xs flex-shrink-0">
              {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
            </div>
          )}

          {/* Title and indicators */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">
                Dia {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
              </h3>

              {isFullyCompleted ? (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  <Sparkles className="w-2.5 h-2.5" />
                  Concluído
                </span>
              ) : isExpanded ? (
                <span className="text-[10px] font-semibold text-[#FF8E9E]">
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
                          ? 'bg-emerald-400'
                          : 'bg-[#FF6B8B]'
                        : 'bg-slate-700'
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
                : 'bg-[#0F172A] text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-slate-200'
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
              isExpanded ? 'rotate-180 text-pink-400' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div className="border-t border-slate-800 p-3.5 sm:p-4 bg-[#0F172A]/70 space-y-3">
          {/* Quick Actions & Header inside Day */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Refeições do Dia {day.dayNumber}:
            </p>
            <button
              type="button"
              id={`btn-mark-all-day-${day.dayNumber}`}
              onClick={handleMarkAllMeals}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-[#1E293B] hover:bg-slate-700 px-2 py-0.8 rounded-lg border border-slate-700 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Marcar 4 refeições</span>
            </button>
          </div>

          {/* 4 Meals with Left Dashed Tree Guide */}
          <div className="space-y-3 ml-1 border-l-2 border-dashed border-slate-700 pl-3 sm:pl-3.5">
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
            <div className="mt-3 p-2.5 rounded-xl bg-[#1E293B] border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Hidratação do Dia</span>
                </div>
                <span className="text-[10px] font-bold text-[#38BDF8]">
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
                          ? 'bg-[#38BDF8] text-slate-950 shadow-xs'
                          : 'bg-[#0F172A] text-slate-500 border border-slate-700 hover:bg-slate-800 hover:text-slate-300'
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
