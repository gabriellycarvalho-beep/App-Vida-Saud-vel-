import React, { useState, useId } from 'react';
import {
  Coffee,
  Apple,
  Utensils,
  Moon,
  Check,
  Edit3,
  Tag,
  ChevronDown,
  Info,
  ChefHat,
  Sparkles,
  Flame,
} from 'lucide-react';
import { COLUMNS_MEAL_DATA, DIET_OPTIONS, MEAL_CONFIGS } from '../data/mealOptions';
import { DietType, MealOption, MealState, MealType } from '../types';

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
  const isColumnsMeal = mealType === 'almoco' || mealType === 'jantar';

  const [expandedOptionId, setExpandedOptionId] = useState<string | null>(null);
  const [showColumnsDetails, setShowColumnsDetails] = useState<boolean>(false);

  const getMealIcon = () => {
    switch (config.iconName) {
      case 'Coffee':
        return <Coffee className="w-3.5 h-3.5 text-amber-400" />;
      case 'Apple':
        return <Apple className="w-3.5 h-3.5 text-rose-400" />;
      case 'Utensils':
        return <Utensils className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Moon':
        return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Utensils className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const handleToggleCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateMeal(mealType, { completed: !mealState.completed });
  };

  const handleSelectOption = (option: MealOption) => {
    onUpdateMeal(mealType, {
      selectedOptionId: option.id,
      completed: true,
    });
    if (option.ingredients) {
      setExpandedOptionId((prev) => (prev === option.id ? null : option.id));
    }
  };

  const handleCustomTextChange = (text: string) => {
    onUpdateMeal(mealType, {
      customText: text,
      completed: text.trim().length > 0 ? true : mealState.completed,
    });
  };

  const handleSelectCarb = (carb: string) => {
    onUpdateMeal(mealType, {
      selectedCarb: mealState.selectedCarb === carb ? undefined : carb,
      completed: true,
    });
  };

  const handleSelectProtein = (protein: string) => {
    onUpdateMeal(mealType, {
      selectedProtein: mealState.selectedProtein === protein ? undefined : protein,
      completed: true,
    });
  };

  // Render for ALMOÇO and JANTAR (3-Column Layout in Night Theme)
  if (isColumnsMeal) {
    const colData = COLUMNS_MEAL_DATA[activeDiet];

    return (
      <div
        className={`rounded-xl p-3 border transition-all duration-200 bg-[#1E293B] ${
          mealState.completed
            ? 'border-[#4A90E2]/60 ring-1 ring-[#4A90E2]/40 shadow-sm shadow-blue-500/10'
            : 'border-slate-800 shadow-sm hover:border-slate-700'
        }`}
      >
        {/* Meal Header with Single Check Button */}
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#0F172A] border border-slate-700/80 flex items-center justify-center flex-shrink-0">
              {getMealIcon()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-slate-100 uppercase tracking-tight truncate">
                  {config.title}
                </span>
                <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {config.timeHint}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">{config.subtitle}</p>
            </div>
          </div>

          {/* ÚNICO botão de Check da refeição */}
          <button
            type="button"
            id={`btn-check-day-${dayNumber}-meal-${mealType}`}
            onClick={handleToggleCompleted}
            aria-label={`Marcar ${config.title} como ${mealState.completed ? 'incompleto' : 'concluído'}`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex-shrink-0 ${
              mealState.completed
                ? 'bg-[#4A90E2] text-white shadow-md shadow-blue-500/20'
                : 'bg-[#0F172A] text-slate-300 border border-slate-700 hover:bg-[#4A90E2]/20 hover:text-[#38BDF8] hover:border-[#4A90E2]/60'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                mealState.completed
                  ? 'bg-white text-[#4A90E2] border-transparent'
                  : 'border-slate-600 bg-slate-900'
              }`}
            >
              {mealState.completed && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="text-[11px]">{mealState.completed ? 'Feito' : 'Check'}</span>
          </button>
        </div>

        {/* 3 Columns Layout */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#38BDF8]" />
              <span>Monte o seu prato (3 Colunas):</span>
            </span>
            <button
              type="button"
              onClick={() => setShowColumnsDetails(!showColumnsDetails)}
              className="text-[9px] text-[#38BDF8] hover:underline font-semibold flex items-center gap-0.5"
            >
              <Info className="w-2.5 h-2.5" />
              <span>{showColumnsDetails ? 'Ocultar Dicas' : 'Ver Dicas'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Coluna 1: Carboidratos */}
            <div className="p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 flex flex-col justify-between space-y-1.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {colData.col1Carb.title}
                  </span>
                  {colData.col1Carb.badge && (
                    <span className="text-[8px] font-bold px-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                      {colData.col1Carb.badge}
                    </span>
                  )}
                </div>
                <p className="text-[9px] text-slate-400 mb-1">{colData.col1Carb.subtitle}</p>
                <div className="space-y-1">
                  {colData.col1Carb.items.map((item, i) => {
                    const isSelected = mealState.selectedCarb === item;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectCarb(item)}
                        className={`w-full text-left p-1.5 rounded-lg text-[10px] leading-tight transition-all border ${
                          isSelected
                            ? 'bg-[#2563EB] text-white font-bold border-sky-400 shadow-xs'
                            : 'bg-[#1E293B] text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Coluna 2: Proteínas */}
            <div className="p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 flex flex-col justify-between space-y-1.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B]" />
                    {colData.col2Protein.title}
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 mb-1">{colData.col2Protein.subtitle}</p>
                <div className="space-y-1">
                  {colData.col2Protein.items.map((item, i) => {
                    const isSelected = mealState.selectedProtein === item;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectProtein(item)}
                        className={`w-full text-left p-1.5 rounded-lg text-[10px] leading-tight transition-all border ${
                          isSelected
                            ? 'bg-[#E11D48] text-white font-bold border-pink-400 shadow-xs'
                            : 'bg-[#1E293B] text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Coluna 3: Salada e Bebida / Sobremesa */}
            <div className="p-2.5 rounded-xl bg-[#0F172A] border border-slate-800 flex flex-col justify-between space-y-1.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {colData.col3Extra.title}
                  </span>
                  {colData.col3Extra.badge && (
                    <span className="text-[8px] font-bold px-1 rounded bg-pink-950/80 text-pink-300 border border-pink-800">
                      {colData.col3Extra.badge}
                    </span>
                  )}
                </div>
                <p className="text-[9px] text-slate-400 mb-1">{colData.col3Extra.subtitle}</p>
                <div className="space-y-1">
                  {colData.col3Extra.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-1.5 rounded-lg text-[10px] leading-tight bg-[#1E293B] border border-slate-700/80 text-slate-300 flex items-start gap-1"
                    >
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Substituição Hambúrguer Caseiro Fit (High Carb) */}
          {colData.substitution && (
            <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-700/60 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-300 text-[10px] uppercase">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>{colData.substitution.title}</span>
              </div>
              <p className="text-[10px] text-amber-200/90 mt-0.5 leading-snug">
                {colData.substitution.description}
              </p>
            </div>
          )}

          {/* Opção "Outro" com Campo de Texto Livre */}
          <div className="mt-2 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-semibold text-slate-300">
              <Edit3 className="w-3 h-3 text-[#FF6B8B]" />
              <label htmlFor={`input-other-${dayNumber}-${mealType}`}>
                Outro (digite o que você comeu caso diferente):
              </label>
            </div>
            <input
              id={`input-other-${dayNumber}-${mealType}`}
              type="text"
              value={mealState.customText || ''}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder="Ex: Arroz integral + salmão grelhado + legumes..."
              className="w-full text-xs p-2 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 placeholder:italic focus:outline-none focus:bg-[#0B0F19] focus:border-[#4A90E2] focus:ring-1 focus:ring-[#4A90E2]"
            />
          </div>
        </div>
      </div>
    );
  }

  // Render for CAFÉ DA MANHÃ and LANCHE DA TARDE (List in Night Theme)
  const options = DIET_OPTIONS[activeDiet][mealType] || [];
  const selectedOptionObj = options.find((opt) => opt.id === mealState.selectedOptionId);
  const isCustomSelected =
    selectedOptionObj?.isCustom ||
    mealState.selectedOptionId.endsWith('_outro') ||
    Boolean(mealState.customText && !selectedOptionObj);

  return (
    <div
      className={`rounded-xl p-3 border transition-all duration-200 bg-[#1E293B] ${
        mealState.completed
          ? 'border-[#FF6B8B]/60 ring-1 ring-[#FF6B8B]/40 shadow-sm shadow-pink-500/10'
          : 'border-slate-800 shadow-sm hover:border-slate-700'
      }`}
    >
      {/* Meal Header with Single Check Button */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#0F172A] border border-slate-700/80 flex items-center justify-center flex-shrink-0">
            {getMealIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-100 uppercase tracking-tight truncate">
                {config.title}
              </span>
              <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {config.timeHint}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">{config.subtitle}</p>
          </div>
        </div>

        {/* ÚNICO botão de Check da refeição */}
        <button
          type="button"
          id={`btn-check-day-${dayNumber}-meal-${mealType}`}
          onClick={handleToggleCompleted}
          aria-label={`Marcar ${config.title} como ${mealState.completed ? 'incompleto' : 'concluído'}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex-shrink-0 ${
            mealState.completed
              ? 'bg-[#FF6B8B] text-white shadow-md shadow-pink-500/20'
              : 'bg-[#0F172A] text-slate-300 border border-slate-700 hover:bg-[#FF6B8B]/20 hover:text-pink-300 hover:border-[#FF8E9E]/60'
          }`}
        >
          <div
            className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
              mealState.completed
                ? 'bg-white text-[#FF6B8B] border-transparent'
                : 'border-slate-600 bg-slate-900'
            }`}
          >
            {mealState.completed && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span className="text-[11px]">{mealState.completed ? 'Feito' : 'Check'}</span>
        </button>
      </div>

      {/* Options List */}
      <div className="space-y-1.5 mt-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Escolha sua opção:
          </p>
          <span className="text-[9px] text-[#FF8E9E] font-semibold flex items-center gap-0.5">
            <Info className="w-2.5 h-2.5" />
            Clique para ver a receita
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {options.map((option, idx) => {
            const isSelected = mealState.selectedOptionId === option.id;
            const isDetailOpen =
              expandedOptionId === option.id || (isSelected && Boolean(option.ingredients));

            return (
              <div
                key={option.id}
                className={`rounded-lg border transition-all overflow-hidden ${
                  isSelected
                    ? 'bg-[#831843]/25 border-[#FF6B8B]/80'
                    : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Option Click Button */}
                <button
                  type="button"
                  id={`btn-day-${dayNumber}-meal-${mealType}-opt-${idx}`}
                  onClick={() => handleSelectOption(option)}
                  className="w-full text-left p-2 text-xs flex items-start gap-2 select-none"
                >
                  <div
                    className={`mt-0.5 w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#FF6B8B] bg-[#FF6B8B]'
                        : 'border-slate-600 bg-[#1E293B]'
                    }`}
                  >
                    {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="leading-snug text-[11px] font-medium text-slate-200">
                        {option.label}
                      </span>
                      {option.tag && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                          <Tag className="w-2.5 h-2.5" />
                          {option.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  {option.ingredients && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedOptionId((prev) => (prev === option.id ? null : option.id));
                      }}
                      className="text-slate-400 hover:text-slate-200 p-0.5"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDetailOpen ? 'rotate-180 text-pink-400' : ''
                        }`}
                      />
                    </div>
                  )}
                </button>

                {/* Recipe details and preparation */}
                {isDetailOpen && option.ingredients && (
                  <div className="px-2.5 pb-2.5 pt-1 text-[11px] space-y-1.5 border-t border-slate-800 bg-[#0B0F19]/80">
                    <div className="flex items-center gap-1 font-bold text-[10px] text-slate-300 uppercase tracking-wide">
                      <ChefHat className="w-3 h-3 text-[#FF6B8B]" />
                      <span>Ingredientes e Quantidades:</span>
                    </div>
                    <ul className="space-y-0.5 pl-1.5">
                      {option.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-300 leading-snug">
                          <span className="text-[#FF6B8B] font-bold">•</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                    {option.instructions && (
                      <div className="mt-1 p-1.5 rounded bg-[#1E293B] border border-slate-800 text-[10px] text-slate-300">
                        <span className="font-semibold text-pink-300">Preparo: </span>
                        {option.instructions}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Free text input if "Outro" is selected */}
        {(isCustomSelected || mealState.customText) && (
          <div className="mt-2 p-2.5 bg-[#831843]/20 border border-[#FF6B8B]/60 rounded-lg animate-in fade-in">
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-semibold text-pink-300">
              <Edit3 className="w-3 h-3" />
              <label htmlFor={inputId}>O que você comeu?</label>
            </div>
            <input
              id={inputId}
              type="text"
              value={mealState.customText || ''}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder="Digite o que comeu (ex: Iogurte com chia e morangos)..."
              className="w-full text-xs p-1.5 bg-[#0F172A] border border-[#FF6B8B]/50 rounded-md text-slate-100 placeholder:text-slate-500 placeholder:italic focus:outline-none focus:ring-1 focus:ring-[#FF6B8B]"
            />
            {mealState.customText && (
              <p className="text-[9px] text-emerald-400 font-semibold mt-1">
                ✓ Salvo automaticamente
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
