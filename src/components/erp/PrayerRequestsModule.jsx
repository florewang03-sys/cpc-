import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Lock,
  Globe,
  Sparkles,
  Search,
  Plus,
  X
} from "lucide-react";
const PrayerRequestsModule = () => {
  const { visiblePrayerRequests, createPrayerRequest, incrementPrayedCount, activeRole, currentUser } = useChurch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confidentiality, setConfidentiality] = useState("COMMUNAUTE");
  const [isUrgent, setIsUrgent] = useState(false);
  const filteredRequests = visiblePrayerRequests.filter((p) => {
    const q = (searchTerm || "").trim().toLowerCase();
    const matchSearch = !q || p.title && p.title.toLowerCase().includes(q) || p.content && p.content.toLowerCase().includes(q) || p.requestorName && p.requestorName.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    createPrayerRequest({
      title,
      content,
      confidentiality,
      isUrgent
    });
    setShowAddModal(false);
    setTitle("");
    setContent("");
  };
  return <div className="space-y-6 animate-fadeIn">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-stone-900">
            Sujets de Prière & Intercession ({visiblePrayerRequests.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Suivi pastoral confidentiel des requêtes de la communauté et assignation aux sentinelles.
          </p>
        </div>

        <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
          <Plus className="w-4 h-4" />
          <span>Déposer une Requête</span>
        </button>
      </div>

      {
    /* Role Confidentiality Filter Info */
  }
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          <strong>Confidentialité Active :</strong> En tant que <strong>{activeRole}</strong>, vous visualisez uniquement les requêtes conformes à vos habilitations spirituelles (les requêtes pastorales privées sont réservées aux pasteurs et administrateurs).
        </span>
      </div>

      {
    /* Filter and Search Bar */
  }
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Rechercher par titre, auteur, mots clés..."
    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-600 focus:outline-none"
  />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-stone-500">Statut :</span>
          <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="p-2 rounded-xl border border-stone-300 bg-white text-xs font-medium focus:ring-2 focus:ring-rose-600 focus:outline-none"
  >
            <option value="all">Tous les statuts</option>
            <option value="active">En cours de prière</option>
            <option value="answered">Exaucée ✓</option>
          </select>
        </div>
      </div>

      {
    /* Requests Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((prayer) => <div
    key={prayer.id}
    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
  >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-bold">
                  {prayer.confidentiality === "COMMUNAUTE" ? <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Communauté
                    </span> : prayer.confidentiality === "INTERCESSION" ? <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Sentinelles / Intercession
                    </span> : <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Pastorale Privée (Secret)
                    </span>}
                </div>

                <span className="text-[10px] text-stone-400">{prayer.date}</span>
              </div>

              <h4 className="font-display font-bold text-lg text-stone-900 leading-snug">
                {prayer.title}
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed">
                {prayer.content}
              </p>

              <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                <p>Demandeur : <strong className="text-stone-800">{prayer.requestorName}</strong></p>
                <p className="text-emerald-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Portée par {prayer.prayedCount} intercesseur(s)
                </p>
              </div>
            </div>

            {
    /* Actions for interceding */
  }
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span
    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${prayer.status === "answered" ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}
  >
                {prayer.status === "answered" ? "Exauc\xE9e \u2713" : "En intercession"}
              </span>

              <button
    onClick={() => incrementPrayedCount(prayer.id)}
    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-[11px] flex items-center gap-1 shadow-sm"
  >
                <span>Je prie pour ce sujet 🙏</span>
              </button>
            </div>
          </div>)}
      </div>

      {
    /* Modal Add Prayer */
  }
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  Intercession
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Déposer une Demande de Prière
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
                <label className="block text-xs font-bold text-stone-700 mb-1">Titre du sujet *</label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : Prière pour la guérison de ma mère"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-600 focus:outline-none"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Niveau de Confidentialité *</label>
                <select
    value={confidentiality}
    onChange={(e) => setConfidentiality(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900"
  >
                  <option value="COMMUNAUTE">Communauté (Visible par tous les membres)</option>
                  <option value="INTERCESSION">Sentinelles (Groupe d'Intercession uniquement)</option>
                  <option value="CONFIDENTIEL">Pastorale Seule (Strictement Secret & Confidentiel)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Détails de la requête *</label>
                <textarea
    required
    rows={4}
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Expliquez votre situation avec vos mots..."
    className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-rose-600 focus:outline-none"
  />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
                <input
    type="checkbox"
    id="urgentPrayCheck"
    checked={isUrgent}
    onChange={(e) => setIsUrgent(e.target.checked)}
    className="rounded text-rose-600 focus:ring-rose-500"
  />
                <label htmlFor="urgentPrayCheck" className="text-xs font-bold text-rose-950 cursor-pointer">
                  Urgence spirituelle / Hospitalisation
                </label>
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
    className="px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-lg"
  >
                  Transmettre la Requête
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  PrayerRequestsModule
};
