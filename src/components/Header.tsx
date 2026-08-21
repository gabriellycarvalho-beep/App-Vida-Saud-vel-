import { Heart, Trophy, Flame, RotateCcw, BookOpen, CheckCircle, Clock } from 'lucide-react';
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
    <header className="space-y-4">
      {/* Top Banner Card in Natural Tones gradient */}
      <div className="bg-gradient-to-r from-[#FF6B8B] to-[#FF8E9E] p-5 sm:p-6 pt-4 text-white text-center rounded-2xl sm:rounded-3xl shadow-sm relative overflow-hidden">
        {/* Subtle top action buttons inside header banner */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20">
            <Heart className="w-3.5 h-3.5 fill-white/30" />
            <span>Vida Saudável</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="btn-open-guide"
              onClick={onOpenGuide}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/30 transition-colors shadow-2xs"
            >
              <BookOpen className="w-3 h-3" />
              <span>Guia</span>
            </button>

            <button
              type="button"
              id="btn-reset-challenge"
              onClick={onOpenReset}
              title="Reiniciar Desafio"
              className="w-7 h-7 flex items-center justify-center text-white/80 hover:text-white bg-white/15 hover:bg-white/30 backdrop-blur-xs rounded-full border border-white/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title and Subtitle matching Natural Tones Design */}
        <h1
          id="main-app-title"
          className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-xs"
        >
          Desafio Vida Saudável
        </h1>
        <p className="text-xs opacity-90 mt-1 uppercase tracking-widest font-medium text-white/90">
          Jornada de 30 Dias
        </p>
      </div>

      {/* Diet Selector Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
        <DietToggle activeDiet={activeDiet} onChangeDiet={onChangeDiet} />

        {/* Progress bar matching theme */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-bold tracking-wider">
            <span>PROGRESSO GERAL</span>
            <span className={stats.percentage > 0 ? 'text-[#4A90E2]' : 'text-slate-400'}>
              {stats.percentage}% CONCLUÍDO
            </span>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF6B8B] to-[#4A90E2] rounded-full transition-all duration-500 shadow-2xs"
              style={{ width: `${Math.max(stats.percentage, 2)}%` }}
            />
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Dias
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                {stats.completedDaysCount}/30
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Refeições
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                {stats.totalMealsCompleted}/120
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Sequência
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#FF6B8B]">
                {stats.currentStreak} {stats.currentStreak === 1 ? 'dia' : 'dias'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

