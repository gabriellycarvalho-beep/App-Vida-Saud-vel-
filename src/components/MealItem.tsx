import React, { useState, useId } from 'react';
import { Coffee, Apple, Utensils, Moon, Check, Edit3, Tag } from 'lucide-react';
import { DIET_OPTIONS, MEAL_CONFIGS } from '../data/mealOptions';
import { DietType, MealState, MealType } from '../types';

export interface MealItemProps {
  key?: React.Key;
  dayNumber: number;
  mealType: MealType;
  mealState: MealState;
  activeDiet: DietType;
  onUpdateMeal: (mealType: MealType, updated: Partial<MealState>) => void;
}

export function MealItem({
  dayNumber,
  mealType,
  mealState,
  activeDiet,
  onUpdateMeal,
}: MealItemProps) {
  const inputId = useId();
  const config = MEAL_CONFIGS.find((c) => c.type === mealType)!;
  const options = DIET_OPTIONS[activeDiet][mealType];

  const [isEditingCustom, setIsEditingCustom] = useState(false);

  // Check if selected option is custom
  const selectedOptionObj = options.find((opt) => opt.id === mealState.selectedOptionId);
  const isCustomOptionSelected =
    selectedOptionObj?.isCustom ||
    mealState.selectedOptionId.endsWith('_outro') ||
    Boolean(mealState.customText && !selectedOptionObj);

  const getMealIcon = () => {
    switch (config.iconName) {
      case 'Coffee':
        return <Coffee className="w-3.5 h-3.5 text-amber-500" />;
      case 'Apple':
        return <Apple className="w-3.5 h-3.5 text-rose-500" />;
      case 'Utensils':
        return <Utensils className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Moon':
        return <Moon className="w-3.5 h-3.5 text-indigo-500" />;
      default:
        return <Utensils className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const handleToggleCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateMeal(mealType, { completed: !mealState.completed });
  };

  const handleSelectOption = (optionId: string) => {
    const isCustom = optionId.endsWith('_outro');
    onUpdateMeal(mealType, {
      selectedOptionId: optionId,
      completed: true,
    });
    if (isCustom) {
      setIsEditingCustom(true);
    }
  };

  const handleCustomTextChange = (text: string) => {
    onUpdateMeal(mealType, {
      customText: text,
      completed: text.trim().length > 0 ? true : mealState.completed,
    });
  };

  return (
    <div
      className={`rounded-xl p-3 border transition-all duration-200 bg-white ${
        mealState.completed
          ? 'border-slate-200 shadow-xs'
          : 'border-slate-200/80 shadow-2xs hover:border-slate-300'
      }`}
    >
      {/* Meal Header matching Natural Tones */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
            {getMealIcon()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                {config.title}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {config.timeHint}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">{config.subtitle}</p>
          </div>
        </div>

        {/* Check Button for this Meal */}
        <button
          type="button"
          id={`btn-check-day-${dayNumber}-meal-${mealType}`}
          onClick={handleToggleCompleted}
          aria-label={`Marcar ${config.title} como concluído`}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
            mealState.completed
              ? 'bg-[#4A90E2] text-white shadow-2xs'
              : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          <div
            className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
              mealState.completed
                ? 'bg-white text-[#4A90E2] border-transparent'
                : 'border-slate-300 bg-white'
            }`}
          >
            {mealState.completed && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className="text-[11px]">{mealState.completed ? 'Feito' : 'Check'}</span>
        </button>
      </div>

      {/* Options List */}
      <div className="space-y-1 mt-1.5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Opção de Cardápio:
        </p>

        <div className="grid grid-cols-1 gap-1">
          {options.map((option, idx) => {
            const isSelected = mealState.selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                id={`btn-day-${dayNumber}-meal-${mealType}-opt-${idx}`}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-start gap-2 border ${
                  isSelected
                    ? activeDiet === 'low_carb'
                      ? 'bg-[#FFF0F3] border-[#FF8E9E] text-slate-800 font-medium'
                      : 'bg-[#E8F0FE] border-[#4A90E2]/60 text-slate-800 font-medium'
                    : 'bg-slate-50/50 border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div
                  className={`mt-0.5 w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center ${
                    isSelected
                      ? activeDiet === 'low_carb'
                        ? 'border-[#FF6B8B] bg-[#FF6B8B]'
                        : 'border-[#4A90E2] bg-[#4A90E2]'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="leading-snug text-[11px]">{option.label}</span>
                    {option.tag && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200/60">
                        <Tag className="w-2.5 h-2.5" />
                        {option.tag}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom text input if "Outro" is selected (styled matching theme) */}
        {(isCustomOptionSelected || mealState.customText) && (
          <div className="mt-2 p-2 bg-[#FFF0F3] border border-[#FF8E9E] rounded-lg">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold text-[#FF6B8B]">
              <Edit3 className="w-3 h-3" />
              <label htmlFor={inputId}>O que você comeu?</label>
            </div>
            <input
              id={inputId}
              type="text"
              value={mealState.customText || ''}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder="Ex: Iogurte com castanhas, etc..."
              className="w-full text-xs p-1.5 bg-white border border-[#FF8E9E]/60 rounded-md text-slate-700 placeholder:italic focus:outline-none focus:ring-1 focus:ring-[#FF6B8B]"
            />
            {mealState.customText && (
              <p className="text-[9px] text-emerald-600 font-semibold mt-1">
                ✓ Salvo automaticamente
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

