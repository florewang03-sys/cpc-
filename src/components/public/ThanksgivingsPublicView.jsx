import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import { Heart, Plus, X, MessageCircleHeart } from "lucide-react";
const ThanksgivingsPublicView = () => {
  const { thanksgivings, addThanksgiving, incrementAmen, currentUser } = useChurch();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    addThanksgiving(message.trim());
    setMessage("");
    setShowModal(false);
  };
  return <div className="space-y-14 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-900 font-bold text-xs uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-pink-700 fill-current" /> Louanges & Reconnaissance
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Actions de Grâce
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          « Rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus-Christ. » — 1 Thessaloniciens 5:18
        </p>

        <div className="pt-2">
          <button
    onClick={() => setShowModal(true)}
    className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-lg transition flex items-center gap-2 mx-auto"
  >
            <Plus className="w-4 h-4" />
            <span>Déposer une Action de Grâce</span>
          </button>
        </div>
      </div>

      {
    /* Grid of Thanksgivings */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {thanksgivings.map((item) => <div
    key={item.id}
    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
  >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-bold text-stone-900 flex items-center gap-1.5">
                  <MessageCircleHeart className="w-4 h-4 text-pink-500" />
                  {item.author}
                </span>
                <span>{item.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                « {item.message} »
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
    onClick={() => incrementAmen(item.id)}
    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition active:scale-95 cursor-pointer"
  >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Amen ! ({item.amenCount})</span>
              </button>

              <span className="text-[11px] text-stone-400">CPC Famille</span>
            </div>
          </div>)}
      </div>

      {
    /* Modal */
  }
      {showModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                  Dire merci au Seigneur
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Action de Grâce
                </h3>
              </div>
              <button
    onClick={() => setShowModal(false)}
    className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Votre message de louange *
                </label>
                <textarea
    required
    rows={4}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Ex : Je rends grâce à Dieu pour une année de plus, pour un diplôme obtenu, pour la paix dans ma maison..."
    className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-pink-500 focus:outline-none"
  />
              </div>

              <p className="text-[11px] text-stone-500">
                Publié au nom de : <strong>{currentUser.fullName}</strong>
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
    type="button"
    onClick={() => setShowModal(false)}
    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-lg"
  >
                  Publier sur le mur
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  ThanksgivingsPublicView
};
