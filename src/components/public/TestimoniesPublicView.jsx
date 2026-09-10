import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Sparkles,
  Plus,
  Quote,
  CheckCircle2,
  X
} from "lucide-react";
const TestimoniesPublicView = () => {
  const { testimonies, addTestimony, currentUser } = useChurch();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Gu\xE9rison");
  const filteredTestimonies = selectedCategory === "all" ? testimonies : testimonies.filter((t) => t.category === selectedCategory);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    addTestimony(title, content, category);
    setShowSubmitModal(false);
    setTitle("");
    setContent("");
  };
  return <div className="space-y-14 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Les Œuvres du Seigneur
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Témoignages & Miracles
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          « Ils l'ont vaincu à cause du sang de l'Agneau et à cause de la parole de leur témoignage. » — Apocalypse 12:11
        </p>

        <div className="pt-2">
          <button
    onClick={() => setShowSubmitModal(true)}
    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg transition flex items-center gap-2 mx-auto"
  >
            <Plus className="w-4 h-4" />
            <span>Partager un Témoignage</span>
          </button>
        </div>
      </div>

      {
    /* Category Tabs */
  }
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
    onClick={() => setSelectedCategory("all")}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${selectedCategory === "all" ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"}`}
  >
          Tous ({testimonies.length})
        </button>
        {["Gu\xE9rison", "Provision", "D\xE9livrance", "Foi", "Famille"].map((cat) => <button
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${selectedCategory === cat ? "bg-amber-600 text-white shadow-sm" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"}`}
  >
            {cat}
          </button>)}
      </div>

      {
    /* Testimonies Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTestimonies.map((test) => <div
    key={test.id}
    className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
  >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs">
                  {test.category}
                </span>
                <span className="text-xs text-stone-400">{test.date}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-stone-900 mb-3 leading-snug">
                « {test.title} »
              </h3>

              <div className="relative">
                <Quote className="w-6 h-6 text-stone-200 absolute -top-2 -left-2 -z-0" />
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic relative z-10">
                  « {test.content} »
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800">
                — {test.author}
              </span>
              <span className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Vérifié & Publié
              </span>
            </div>
          </div>)}
      </div>

      {
    /* Submission Modal */
  }
      {showSubmitModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Raconter la fidélité de Dieu
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Déposer mon Témoignage
                </h3>
              </div>
              <button
    onClick={() => setShowSubmitModal(false)}
    className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Catégorie du témoignage *
                </label>
                <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600"
  >
                  <option value="Guérison">Guérison miraculeuse</option>
                  <option value="Provision">Provision & Travail</option>
                  <option value="Délivrance">Délivrance spirituelle</option>
                  <option value="Foi">Persévérance & Foi</option>
                  <option value="Famille">Restauration familiale</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Titre du témoignage *
                </label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : Guérison divine après un diagnostic difficile"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Récit détaillé de ce que Dieu a fait *
                </label>
                <textarea
    required
    rows={5}
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Décrivez la situation initiale, comment vous avez prié, et le dénouement miraculeux..."
    className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <p className="text-[11px] text-stone-500">
                Publié au nom de <strong>{currentUser.fullName}</strong>.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
    type="button"
    onClick={() => setShowSubmitModal(false)}
    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-lg"
  >
                  Publier mon témoignage
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  TestimoniesPublicView
};
