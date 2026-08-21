import { Heart, RotateCcw, BookOpen } from 'lucide-react';
import { DietType } from '../types';
import { DietToggle } from './DietToggle';

interface HeaderProps {
  activeDiet: DietType;
  onChangeDiet: (diet: DietType) => void;
  stats: {
    completedDaysCount: number;
    totalMealsCompleted: number;
    percentage: number;
    mealsPercentage: number;
    currentStreak: number;
  };
  onOpenGuide: () => void;
  onOpenReset: () => void;
}

export function Header({
  activeDiet,
  onChangeDiet,
  stats,
  onOpenGuide,
  onOpenReset,
}: HeaderProps) {
  return (
    <header className="space-y-3">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-200 bg-[#FF6B8B]/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#FF6B8B]/40 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-[#FF6B8B] text-[#FF6B8B]" />
          <span>30 Dias</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="btn-open-guide"
            onClick={onOpenGuide}
            className="flex items-center gap-1 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white px-3 py-1.5 rounded-full border border-slate-700 transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Guia</span>
          </button>

          <button
            type="button"
            id="btn-reset-challenge"
            onClick={onOpenReset}
            title="Reiniciar Desafio"
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-300 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Diet Selector & Metrics Bar */}
      <div className="bg-[#1E293B] rounded-2xl p-3.5 border border-slate-800 shadow-md">
        <DietToggle activeDiet={activeDiet} onChangeDiet={onChangeDiet} />

        {/* Progress bar matching dark theme */}
        <div className="mt-3.5 pt-3 border-t border-slate-800">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-bold tracking-wider">
            <span>PROGRESSO GERAL</span>
            <span className={stats.percentage > 0 ? 'text-[#38BDF8]' : 'text-slate-400'}>
              {stats.percentage}% CONCLUÍDO
            </span>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#FF6B8B] via-[#818CF8] to-[#38BDF8] rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${Math.max(stats.percentage, 2)}%` }}
            />
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="p-2 rounded-xl bg-[#0F172A] border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Dias
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-100">
                {stats.completedDaysCount}/30
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#0F172A] border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Refeições
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-100">
                {stats.totalMealsCompleted}/120
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#0F172A] border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Sequência
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#FF8E9E]">
                {stats.currentStreak} {stats.currentStreak === 1 ? 'dia' : 'dias'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
