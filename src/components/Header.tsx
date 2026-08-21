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
}

export function Header({
  activeDiet,
  onChangeDiet,
  stats,
}: HeaderProps) {
  return (
    <header className="space-y-3">
      {/* Diet Selector & Metrics Bar */}
      <div className="bg-[#1E293B] rounded-2xl p-3.5 border border-slate-800 shadow-md">
        <DietToggle activeDiet={activeDiet} onChangeDiet={onChangeDiet} />

        {/* Progress bar matching dark theme */}
        <div className="mt-3.5 pt-3 border-t border-slate-800">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1.5 font-bold tracking-wider">
            <span>PROGRESSO DA ALIMENTAÇÃO</span>
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
