import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Plus,
  Download,
  TrendingUp,
  CheckCircle2,
  X
} from "lucide-react";
const DonationsModule = () => {
  const { campaigns, addCampaign, navigateTo, showToast } = useChurch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState(25e3);
  const [category, setCategory] = useState("Projet Sp\xE9cial");
  const [deadline, setDeadline] = useState("D\xE9cembre 2026");
  const [description, setDescription] = useState("");
  const totalCollected = campaigns.reduce((acc, c) => acc + c.collectedAmount, 0);
  const totalTarget = campaigns.reduce((acc, c) => acc + c.targetAmount, 0);
  const totalDonors = campaigns.reduce((acc, c) => acc + c.donorsCount, 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || targetAmount <= 0) return;
    addCampaign({
      title,
      targetAmount,
      collectedAmount: 0,
      category,
      deadline,
      description,
      donorsCount: 0,
      isActive: true
    });
    setShowAddModal(false);
    setTitle("");
  };
  const handleExportLedger = () => {
    showToast("Export Comptable T\xE9l\xE9charg\xE9", "Le grand livre des offrandes et d\xEEmes 2026 (CSV) a \xE9t\xE9 g\xE9n\xE9r\xE9.", "success");
  };
  return <div className="space-y-8 animate-fadeIn">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-stone-900">
            Gestion Financière, Dîmes & Campagnes
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Suivi des collectes, transparence des fonds et délivrance des attestations fiscales.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
    onClick={handleExportLedger}
    className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
  >
            <Download className="w-3.5 h-3.5" />
            <span>Grand Livre (CSV)</span>
          </button>
          <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Campagne</span>
          </button>
        </div>
      </div>

      {
    /* Financial KPIs */
  }
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Récolté en 2026</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-emerald-800">
              {totalCollected.toLocaleString("fr-FR")} €
            </span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +18%
            </span>
          </div>
          <p className="text-[11px] text-stone-500">Dîmes, offrandes et projets réunis</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Objectif Global Projets</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-stone-900">
              {totalTarget.toLocaleString("fr-FR")} €
            </span>
            <span className="text-xs font-bold text-amber-700">
              {Math.round(totalCollected / totalTarget * 100)}% financé
            </span>
          </div>
          <p className="text-[11px] text-stone-500">Sur 3 campagnes de construction et mission</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Donateurs Enregistrés</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-stone-900">{totalDonors}</span>
            <span className="text-xs text-stone-500">Membres et partenaires</span>
          </div>
          <p className="text-[11px] text-stone-500">Reçus fiscaux générés instantanément</p>
        </div>
      </div>

      {
    /* Active Campaigns Management Grid */
  }
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-stone-900">
          Campagnes de Levée de Fonds Actives ({campaigns.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
    const percentage = Math.min(
      100,
      Math.round(camp.collectedAmount / camp.targetAmount * 100)
    );
    return <div
      key={camp.id}
      className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
    >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      {camp.category}
                    </span>
                    <span className="text-[10px] text-stone-400">Échéance : {camp.deadline}</span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-stone-900">
                    {camp.title}
                  </h4>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {camp.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-800">
                        {camp.collectedAmount.toLocaleString("fr-FR")} €
                      </span>
                      <span className="text-stone-500">
                        / {camp.targetAmount.toLocaleString("fr-FR")} €
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
                      <div
      className="h-full bg-emerald-600 rounded-full"
      style={{ width: `${percentage}%` }}
    />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-stone-500">
                      <span>{percentage}% financé</span>
                      <span>{camp.donorsCount} donateur(s)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> En ligne public
                  </span>
                  <button
      onClick={() => navigateTo("public", "Dons")}
      className="text-stone-700 hover:text-stone-950 font-bold"
    >
                    Tester le don →
                  </button>
                </div>
              </div>;
  })}
        </div>
      </div>

      {
    /* Modal Add Campaign */
  }
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Finances & Projets
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Lancer une Nouvelle Campagne
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
                <label className="block text-xs font-bold text-stone-700 mb-1">Nom du projet *</label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : Achat de nouveau matériel vidéo 4K"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Objectif (€) *</label>
                  <input
    type="number"
    required
    value={targetAmount}
    onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 1e3)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Catégorie</label>
                  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="Projet Spécial">Projet Spécial</option>
                    <option value="Mission">Mission & Évangélisation</option>
                    <option value="Social">Fonds Social / Entraide</option>
                    <option value="Dîme">Dîme</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Date d'échéance</label>
                <input
    type="text"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    placeholder="Ex : 31 Décembre 2026"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
    rows={3}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Objectif spirituel et logistique du projet..."
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
                  Publier la Campagne
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  DonationsModule
};
