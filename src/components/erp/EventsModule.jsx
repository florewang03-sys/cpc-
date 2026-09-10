import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Plus,
  CheckCircle2,
  X,
  ExternalLink
} from "lucide-react";
const EventsModule = () => {
  const { events, addEvent, navigateTo } = useChurch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Conf\xE9rence");
  const [displayDate, setDisplayDate] = useState("15 - 18 Ao\xFBt 2026");
  const [time, setTime] = useState("09h00 \u2013 18h00");
  const [location, setLocation] = useState("Sanctuaire Central de New Bell Ngangu\xE9 (Lieu-dit Maison Blanche), Douala");
  const [maxCapacity, setMaxCapacity] = useState(500);
  const [speaker, setSpeaker] = useState("Pasteur Didier Mbog & R\xE9v. Doc. Anne Mbog");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addEvent({
      title,
      category,
      displayDate,
      time,
      location,
      maxCapacity,
      registeredCount: 0,
      speaker,
      description,
      imageUrl,
      isPublished: true
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
            Gestion des Événements & Billetterie ({events.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Conventions, séminaires, concerts et suivi des réservations de pass gratuits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
    onClick={() => navigateTo("public", "\xC9v\xE9nements")}
    className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
  >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            <span>Voir sur le Site Public</span>
          </button>
          <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
            <Plus className="w-4 h-4" />
            <span>Créer un Événement</span>
          </button>
        </div>
      </div>

      {
    /* Events Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => <div
    key={evt.id}
    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between"
  >
            <div>
              <div className="relative h-40 overflow-hidden bg-stone-900">
                <img
    src={evt.imageUrl}
    alt={evt.title}
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-extrabold text-[10px]">
                    {evt.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[10px] text-amber-300 font-bold block">{evt.displayDate}</span>
                  <h4 className="font-display font-bold text-base text-white truncate">{evt.title}</h4>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2">{evt.description}</p>
                <div className="text-[11px] text-stone-600 space-y-1">
                  <p><strong>Lieu :</strong> {evt.location}</p>
                  <p><strong>Orateur :</strong> {evt.speaker}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-stone-500 text-[11px]">
                    <span>Inscriptions :</span>
                    <strong className="text-stone-900">{evt.registeredCount} / {evt.maxCapacity} pass</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
    className="h-full bg-emerald-600 rounded-full"
    style={{ width: `${Math.min(100, evt.registeredCount / evt.maxCapacity * 100)}%` }}
  />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Publié ✓
              </span>
              <button
    onClick={() => navigateTo("public", "\xC9v\xE9nements")}
    className="text-stone-700 hover:text-stone-950 font-bold"
  >
                Page d'inscription →
              </button>
            </div>
          </div>)}
      </div>

      {
    /* Modal Add Event */
  }
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Planification
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Nouvel Événement / Conférence
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
                <label className="block text-xs font-bold text-stone-700 mb-1">Titre de l'événement *</label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : Grande Retraite Spirituelle de Pâques"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Catégorie</label>
                  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="Conférence">Conférence</option>
                    <option value="Retraite">Retraite</option>
                    <option value="Célébration">Célébration / Concert</option>
                    <option value="Social & Évangélisation">Social & Évangélisation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Capacité max</label>
                  <input
    type="number"
    value={maxCapacity}
    onChange={(e) => setMaxCapacity(parseInt(e.target.value) || 100)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Date affichée *</label>
                  <input
    type="text"
    value={displayDate}
    onChange={(e) => setDisplayDate(e.target.value)}
    placeholder="Ex : 20 - 22 Octobre 2026"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Horaires</label>
                  <input
    type="text"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    placeholder="09h00 – 18h00"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Lieu</label>
                  <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Orateur(s)</label>
                  <input
    type="text"
    value={speaker}
    onChange={(e) => setSpeaker(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
    rows={3}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
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
                  Créer et Publier
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  EventsModule
};
