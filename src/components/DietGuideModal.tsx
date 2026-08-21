import { X, Sparkles, Flame, CheckCircle2, Droplets, Salad, ChefHat } from 'lucide-react';
import { COLUMNS_MEAL_DATA, DIET_OPTIONS, MEAL_CONFIGS } from '../data/mealOptions';

interface DietGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DietGuideModal({ isOpen, onClose }: DietGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-[#1E293B] w-full max-w-lg max-h-[92vh] rounded-3xl p-5 shadow-2xl border border-slate-700/80 text-slate-100 flex flex-col space-y-4 my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#831843]/30 border border-[#FF6B8B]/40 flex items-center justify-center text-[#FF6B8B]">
              <Salad className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Guia Nutricional & Receitas
              </h3>
              <p className="text-[11px] text-slate-400">
                Tabelas de porções, 3 colunas e orientações
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-close-guide"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto pr-1 space-y-4 text-xs">
          {/* Quick tips card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#831843]/25 to-[#1E3A8A]/25 border border-slate-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-200 text-xs">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              <span>Regras de Ouro do Desafio:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
              <li>Beba no mínimo 2 a 3 litros de água diariamente (use o contador de hidratação).</li>
              <li>Mantenha a consistência: faça as 4 refeições diárias no horário indicado.</li>
              <li>Você pode alternar livremente entre <strong>Carbo Baixo</strong> e <strong>Carbo Alto</strong> conforme sua rotina de treinos!</li>
            </ul>
          </div>

          {/* Low Carb Cardápio */}
          <div className="border border-pink-500/40 rounded-2xl p-3.5 bg-[#831843]/15 space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-pink-300 text-sm">
              <Sparkles className="w-4 h-4 text-[#FF6B8B]" />
              <span>A) Cardápio de Carbo Baixo (Low Carb)</span>
            </div>

            {MEAL_CONFIGS.map((m) => {
              const isColMeal = m.type === 'almoco' || m.type === 'jantar';
              const colData = COLUMNS_MEAL_DATA.low_carb;

              return (
                <div key={m.type} className="bg-[#0F172A] p-3 rounded-xl border border-slate-800 shadow-xs space-y-2">
                  <span className="font-bold text-xs text-slate-200 uppercase tracking-tight block">
                    {m.title} ({m.timeHint}):
                  </span>

                  {isColMeal ? (
                    <div className="space-y-1.5">
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Layout em 3 Colunas (Monte seu prato):
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[10px]">
                        <div className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80">
                          <span className="font-bold text-amber-300 block mb-1 text-[11px]">
                            {colData.col1Carb.title}:
                          </span>
                          <ul className="space-y-0.5 text-slate-300">
                            {colData.col1Carb.items.map((it, i) => (
                              <li key={i}>• {it}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80">
                          <span className="font-bold text-pink-300 block mb-1 text-[11px]">
                            {colData.col2Protein.title}:
                          </span>
                          <ul className="space-y-0.5 text-slate-300">
                            {colData.col2Protein.items.map((it, i) => (
                              <li key={i}>• {it}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80">
                          <span className="font-bold text-emerald-300 block mb-1 text-[11px]">
                            {colData.col3Extra.title}:
                          </span>
                          <ul className="space-y-0.5 text-slate-300">
                            {colData.col3Extra.items.map((it, i) => (
                              <li key={i}>✓ {it}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 pl-1 text-[11px] text-slate-300">
                      {DIET_OPTIONS.low_carb[m.type].map((opt) => (
                        <div key={opt.id} className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80 space-y-1">
                          <div className="font-semibold text-slate-200 flex items-center gap-1">
                            <ChefHat className="w-3 h-3 text-[#FF6B8B]" />
                            <span>{opt.title || opt.label}</span>
                          </div>
                          {opt.ingredients && (
                            <ul className="pl-4 list-disc space-y-0.5 text-slate-300 text-[10px]">
                              {opt.ingredients.map((ing, i) => (
                                <li key={i}>{ing}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* High Carb Cardápio */}
          <div className="border border-blue-500/40 rounded-2xl p-3.5 bg-[#1E3A8A]/15 space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-sky-300 text-sm">
              <Flame className="w-4 h-4 text-[#38BDF8]" />
              <span>B) Cardápio de Carbo Alto (High Carb)</span>
            </div>

            {MEAL_CONFIGS.map((m) => {
              const isColMeal = m.type === 'almoco' || m.type === 'jantar';
              const colData = COLUMNS_MEAL_DATA.high_carb;

              return (
                <div key={m.type} className="bg-[#0F172A] p-3 rounded-xl border border-slate-800 shadow-xs space-y-2">
                  <span className="font-bold text-xs text-slate-200 uppercase tracking-tight block">
                    {m.title} ({m.timeHint}):
                  </span>

                  {isColMeal ? (
                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 font-semibold">
                        Layout em 3 Colunas + Sobremesa:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[10px]">
                        <div className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80">
                          <span className="font-bold text-amber-300 block mb-1 text-[11px]">
                            {colData.col1Carb.title}:
                          </span>
                          <ul className="space-y-0.5 text-slate-300">
                            {colData.col1Carb.items.map((it, i) => (
                              <li key={i}>• {it}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80">
                          <span className="font-bold text-sky-300 block mb-1 text-[11px]">
                            {colData.col2Protein.title}:
                          </span>
                          <ul className="space-y-0.5 text-slate-300">
                            {colData.col2Protein.items.map((it, i) => (
                              <li key={i}>• {it}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80">
                          <span className="font-bold text-emerald-300 block mb-1 text-[11px]">
                            {colData.col3Extra.title}:
                          </span>
                          <ul className="space-y-0.5 text-slate-300">
                            {colData.col3Extra.items.map((it, i) => (
                              <li key={i}>✓ {it}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {colData.substitution && (
                        <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-700/80 text-[10px] text-amber-200">
                          <span className="font-bold block text-amber-300">
                            {colData.substitution.title}:
                          </span>
                          <span>{colData.substitution.description}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 pl-1 text-[11px] text-slate-300">
                      {DIET_OPTIONS.high_carb[m.type].map((opt) => (
                        <div key={opt.id} className="p-2 rounded-lg bg-[#1E293B] border border-slate-700/80 space-y-1">
                          <div className="font-semibold text-slate-200 flex items-center gap-1">
                            <ChefHat className="w-3 h-3 text-[#38BDF8]" />
                            <span>{opt.title || opt.label}</span>
                          </div>
                          {opt.ingredients && (
                            <ul className="pl-4 list-disc space-y-0.5 text-slate-300 text-[10px]">
                              {opt.ingredients.map((ing, i) => (
                                <li key={i}>{ing}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-slate-800 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Fechar e Continuar Desafio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
