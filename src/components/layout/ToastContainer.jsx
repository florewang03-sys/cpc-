import { useChurch } from "../../context/ChurchContext";
import { CheckCircle2, AlertCircle, Info, Radio, X } from "lucide-react";
const ToastContainer = () => {
  const { toasts, removeToast } = useChurch();
  if (toasts.length === 0) return null;
  return <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-3 pointer-events-none">
      {toasts.map((toast) => <div
    key={toast.id}
    className={`pointer-events-auto p-4 rounded-xl shadow-2xl border flex items-start gap-3 transform transition-all duration-300 animate-slideUp ${toast.type === "success" ? "bg-emerald-900/95 border-emerald-500/50 text-emerald-50 shadow-emerald-950/40" : toast.type === "broadcast" ? "bg-amber-950/95 border-amber-500/50 text-amber-50 shadow-amber-950/40" : toast.type === "warning" ? "bg-orange-950/95 border-orange-500/50 text-orange-50" : "bg-stone-900/95 border-stone-700 text-stone-50"}`}
  >
          <div className="shrink-0 mt-0.5">
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === "broadcast" && <Radio className="w-5 h-5 text-amber-400 animate-pulse" />}
            {toast.type === "warning" && <AlertCircle className="w-5 h-5 text-orange-400" />}
            {toast.type === "info" && <Info className="w-5 h-5 text-sky-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm leading-tight text-white mb-0.5">
              {toast.title}
            </h4>
            <p className="text-xs text-stone-200 leading-relaxed break-words">
              {toast.message}
            </p>
          </div>

          <button
    onClick={() => removeToast(toast.id)}
    className="text-stone-400 hover:text-white p-1 rounded transition shrink-0"
  >
            <X className="w-4 h-4" />
          </button>
        </div>)}
    </div>;
};
export {
  ToastContainer
};
