import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Plus,
  AlertTriangle,
  X,
  ExternalLink
} from "lucide-react";
const AnnouncementsModule = () => {
  const { announcements, createAnnouncement, navigateTo } = useChurch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");
  const [priority, setPriority] = useState("normal");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    createAnnouncement({
      title,
      content,
      targetAudience,
      priority
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
            Annonces Officielles & Flash ({announcements.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Publiez des communications instantanées visibles sur le bandeau d'accueil et le site public.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
    onClick={() => navigateTo("public", "Accueil")}
    className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
  >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            <span>Voir sur l'Accueil Public</span>
          </button>
          <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Annonce</span>
          </button>
        </div>
      </div>

      {
    /* Announcements List */
  }
      <div className="space-y-3">
        {announcements.map((ann) => <div
    key={ann.id}
    className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${ann.priority === "urgent" ? "bg-amber-50/60 border-amber-300" : "bg-white border-stone-200 shadow-sm"}`}
  >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {ann.priority === "urgent" && <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> URGENT
                  </span>}
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold text-[10px] border border-stone-200">
                  Audience : {ann.targetAudience === "all" ? "Toute l'\xE9glise" : ann.targetAudience}
                </span>
                <span className="text-[10px] text-stone-400">Date : {ann.createdAt}</span>
                <span className="text-[10px] text-emerald-800 font-semibold">• Par : {ann.author} ({ann.authorRole})</span>
              </div>

              <h4 className="font-display font-bold text-base text-stone-900">
                {ann.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                {ann.content}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-900">
                Diffusée à {ann.notificationSentCount} membres ✓
              </span>
            </div>
          </div>)}
      </div>

      {
    /* Modal Add Announcement */
  }
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Communication
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Publier une Nouvelle Annonce
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
                <label className="block text-xs font-bold text-stone-700 mb-1">Titre de l'annonce *</label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : Réunion extraordinaire des responsables"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Public Cible</label>
                  <select
    value={targetAudience}
    onChange={(e) => setTargetAudience(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="all">Toute l'assemblée (Général)</option>
                    <option value="leaders">Corps des Leaders</option>
                    <option value="pastors">Collège Pastoral</option>
                    <option value="group">Département spécifique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Priorité</label>
                  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="normal">Normale</option>
                    <option value="urgent">Urgente (Alerte rouge)</option>
                    <option value="info">Information</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Texte complet de l'annonce *</label>
                <textarea
    required
    rows={4}
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Détails, consignes..."
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
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
                  Publier et Diffuser
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  AnnouncementsModule
};
