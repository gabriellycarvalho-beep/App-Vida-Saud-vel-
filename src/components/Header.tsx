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
    <header className="space-y-3.5">
      {/* Top Banner Card in Night Theme with luminous Rose/Cyan accents */}
      <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E1B4B] p-5 sm:p-6 pt-4 text-white text-center rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-lg relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF6B8B]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#4A90E2]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Subtle top action buttons inside header banner */}
        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-200 bg-[#FF6B8B]/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#FF6B8B]/40 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-[#FF6B8B] text-[#FF6B8B]" />
            <span>Desafio 30 Dias</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="btn-open-guide"
              onClick={onOpenGuide}
              className="flex items-center gap-1 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 hover:text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 transition-colors shadow-xs"
            >
              <BookOpen className="w-3 h-3 text-[#38BDF8]" />
              <span>Guia</span>
            </button>

            <button
              type="button"
              id="btn-reset-challenge"
              onClick={onOpenReset}
              title="Reiniciar Desafio"
              className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-rose-300 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md rounded-full border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title and Subtitle in high contrast */}
        <h1
          id="main-app-title"
          className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md relative z-10"
        >
          Desafio Vida Saudável
        </h1>
        <p className="text-xs text-slate-300 mt-1 uppercase tracking-widest font-semibold relative z-10 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B]" />
          <span>Cardápio & Acompanhamento</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
        </p>
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
