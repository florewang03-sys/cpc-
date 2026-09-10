import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Plus,
  X,
  ExternalLink
} from "lucide-react";
const MediaModule = () => {
  const { sermons, addSermon, navigateTo } = useChurch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("Pasteur Jean-Marc Kouam\xE9");
  const [date, setDate] = useState("2026-08-16");
  const [duration, setDuration] = useState("52 min");
  const [scripture, setScripture] = useState("Jean 15:1-8");
  const [theme, setTheme] = useState("La vie f\xE9conde en Christ");
  const [series, setSeries] = useState("Demeurer en Lui");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [thumbnailUrl, setThumbnailUrl] = useState("https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800&auto=format&fit=crop&q=80");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addSermon({
      title,
      preacher,
      date,
      duration,
      scripture,
      theme,
      series,
      videoUrl,
      thumbnailUrl,
      viewsCount: 1
    });
    setShowAddModal(false);
    setTitle("");
  };
  return <div className="space-y-6 animate-fadeIn">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-stone-900">
            Gestion de la Médiathèque & Prédications ({sermons.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Publiez et organisez les enseignements dominicaux et séries thématiques en vidéo/audio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
    onClick={() => navigateTo("public", "Pr\xE9dications")}
    className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
  >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            <span>Médiathèque Publique</span>
          </button>
          <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
            <Plus className="w-4 h-4" />
            <span>Ajouter une Prédication</span>
          </button>
        </div>
      </div>

      {
    /* Sermons Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermons.map((sermon) => <div
    key={sermon.id}
    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between"
  >
            <div>
              <div className="relative h-44 overflow-hidden bg-stone-900">
                <img
    src={sermon.thumbnailUrl}
    alt={sermon.title}
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-stone-950/80 text-stone-200 text-[10px]">
                  {sermon.date}
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-stone-950/80 text-amber-300 font-bold text-[10px]">
                  {sermon.duration}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {sermon.series}
                </span>
                <h4 className="font-display font-bold text-base text-stone-900 line-clamp-1">
                  {sermon.title}
                </h4>
                <div className="text-xs text-stone-600 space-y-0.5">
                  <p><strong>Orateur :</strong> {sermon.preacher}</p>
                  <p><strong>Passage :</strong> <span className="text-amber-800 font-semibold">{sermon.scripture}</span></p>
                  <p><strong>Vues estimées :</strong> {sermon.viewsCount} écoutes</p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-emerald-800 font-bold">En ligne ✓</span>
              <button
    onClick={() => navigateTo("public", "Pr\xE9dications")}
    className="text-stone-700 hover:text-stone-950 font-bold"
  >
                Visionner →
              </button>
            </div>
          </div>)}
      </div>

      {
    /* Modal Add Sermon */
  }
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Médiathèque
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Ajouter un Enseignement
                </h3>
              </div>
              <button
    onClick={() => setShowAddModal(false)}
    className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Titre de la prédication *</label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : La puissance du pardon"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Prédicateur *</label>
                  <input
    type="text"
    required
    value={preacher}
    onChange={(e) => setPreacher(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Passage Biblique</label>
                  <input
    type="text"
    value={scripture}
    onChange={(e) => setScripture(e.target.value)}
    placeholder="Ex : Romains 8:28"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Série / Thème</label>
                  <input
    type="text"
    value={series}
    onChange={(e) => setSeries(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Durée</label>
                  <input
    type="text"
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
    placeholder="45 min"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
    type="button"
    onClick={() => setShowAddModal(false)}
    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-lg"
  >
                  Enregistrer et Publier
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  MediaModule
};
