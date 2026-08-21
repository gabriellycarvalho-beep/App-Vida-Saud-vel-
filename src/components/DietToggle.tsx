import { Flame, Sparkles } from 'lucide-react';
import { DietType } from '../types';

interface DietToggleProps {
  activeDiet: DietType;
  onChangeDiet: (diet: DietType) => void;
}

export function DietToggle({ activeDiet, onChangeDiet }: DietToggleProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between bg-slate-50 p-1 rounded-full border border-slate-200 shadow-inner">
        <button
          type="button"
          id="btn-diet-low-carb"
          onClick={() => onChangeDiet('low_carb')}
          className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeDiet === 'low_carb'
              ? 'bg-[#FF6B8B] text-white shadow-sm scale-[1.01]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BAIXO CARBO</span>
        </button>

        <button
          type="button"
          id="btn-diet-high-carb"
          onClick={() => onChangeDiet('high_carb')}
          className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeDiet === 'high_carb'
              ? 'bg-[#4A90E2] text-white shadow-sm scale-[1.01]'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>ALTO CARBO</span>
        </button>
      </div>

      <div className="text-center px-1">
        <p className="text-[11px] font-medium text-slate-500">
          {activeDiet === 'low_carb' ? (
            <span className="text-[#FF6B8B] font-semibold">
              ✨ Estratégia Low Carb: Queima de gordura e saciedade
            </span>
          ) : (
            <span className="text-[#4A90E2] font-semibold">
              ⚡ Estratégia High Carb: Energia para treinos e rendimento
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

