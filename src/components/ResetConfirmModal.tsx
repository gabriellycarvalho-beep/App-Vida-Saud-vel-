import { AlertTriangle, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export function ResetConfirmModal({
  isOpen,
  onClose,
  onConfirmReset,
}: ResetConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#1E293B] w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-slate-100">
            Reiniciar Desafio?
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Esta ação irá desmarcar todos os 30 dias, refeições e anotações
            personalizadas salvas no seu navegador.
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            id="btn-cancel-reset"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            id="btn-confirm-reset"
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/30 transition-colors"
          >
            Sim, Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}
