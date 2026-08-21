import { X, Sparkles, Flame, CheckCircle2, Droplets, Salad } from 'lucide-react';
import { DIET_OPTIONS, MEAL_CONFIGS } from '../data/mealOptions';

interface DietGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DietGuideModal({ isOpen, onClose }: DietGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col space-y-4 my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-[#FF6B8B]">
              <Salad className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Guia de Cardápio Oficial
              </h3>
              <p className="text-[11px] text-slate-400">
                Instruções para o Desafio de 30 Dias
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-close-guide"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto pr-1 space-y-4 text-xs">
          {/* Quick tips card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-50/70 to-blue-50/70 border border-pink-100 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span>Regras de Ouro do Desafio:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
              <li>Beba no mínimo 2 a 3 litros de água diariamente.</li>
              <li>Mantenha a consistência: faça as 4 refeições no horário.</li>
              <li>Você pode alternar entre Low Carb e High Carb conforme sua rotina de treinos!</li>
            </ul>
          </div>

          {/* Low Carb Cardápio */}
          <div className="border border-pink-200 rounded-2xl p-3.5 bg-pink-50/30 space-y-2.5">
            <div className="flex items-center gap-1.5 font-bold text-pink-700 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. Opções Baixo Carbo (Low Carb)</span>
            </div>
            {MEAL_CONFIGS.map((m) => (
              <div key={m.type} className="bg-white p-2.5 rounded-xl border border-pink-100 shadow-2xs">
                <span className="font-bold text-[11px] text-slate-800">{m.title}:</span>
                <ul className="mt-1 space-y-0.5 text-[11px] text-slate-600 pl-2">
                  {DIET_OPTIONS.low_carb[m.type].map((opt) => (
                    <li key={opt.id} className="flex items-start gap-1">
                      <span className="text-pink-400">•</span>
                      <span>{opt.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* High Carb Cardápio */}
          <div className="border border-blue-200 rounded-2xl p-3.5 bg-blue-50/30 space-y-2.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-700 text-xs">
              <Flame className="w-3.5 h-3.5" />
              <span>2. Opções Alto Carbo (High Carb)</span>
            </div>
            {MEAL_CONFIGS.map((m) => (
              <div key={m.type} className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs">
                <span className="font-bold text-[11px] text-slate-800">{m.title}:</span>
                <ul className="mt-1 space-y-0.5 text-[11px] text-slate-600 pl-2">
                  {DIET_OPTIONS.high_carb[m.type].map((opt) => (
                    <li key={opt.id} className="flex items-start gap-1">
                      <span className="text-blue-400">•</span>
                      <span>{opt.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Entendi, vamos ao Desafio!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
