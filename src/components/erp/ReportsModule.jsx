import { useChurch } from "../../context/ChurchContext";
import {
  TrendingUp,
  Download
} from "lucide-react";
const ReportsModule = () => {
  const { members, groups, campaigns, prayerRequests, showToast } = useChurch();
  const handleExportFullReport = () => {
    showToast("Rapport Annuel G\xE9n\xE9r\xE9", "Le rapport pastoral & financier 2026 complet (PDF) a \xE9t\xE9 pr\xE9par\xE9.", "success");
  };
  const attendanceData = [
    { month: "Janvier", attendance: 340, tithes: 11200 },
    { month: "F\xE9vrier", attendance: 365, tithes: 12400 },
    { month: "Mars", attendance: 380, tithes: 13100 },
    { month: "Avril", attendance: 410, tithes: 14800 },
    { month: "Mai", attendance: 395, tithes: 13900 },
    { month: "Juin", attendance: 425, tithes: 15600 },
    { month: "Juillet", attendance: 440, tithes: 16800 },
    { month: "Ao\xFBt", attendance: 460, tithes: 17200 }
  ];
  return <div className="space-y-8 animate-fadeIn">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-stone-900">
            Rapports, Statistiques & Croissance de l'Assemblée
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Analytique des cultes, progression démographique des fidèles et indicateurs financiers.
          </p>
        </div>

        <button
    onClick={handleExportFullReport}
    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
          <Download className="w-4 h-4" />
          <span>Exporter le Bilan Annuel</span>
        </button>
      </div>

      {
    /* High-level Summary Cards */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Moyenne Présence Culte</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-stone-900">460</span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +24% vs 2025
            </span>
          </div>
          <p className="text-[11px] text-stone-500">Capacité sanctuaire : 85% occupée</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Baptêmes Célébrés</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-emerald-800">38</span>
            <span className="text-xs text-stone-500">en 2026</span>
          </div>
          <p className="text-[11px] text-stone-500">+ 14 candidats en formation</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Taux d'Engagement</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-amber-700">76%</span>
            <span className="text-xs text-stone-500">dans un pôle</span>
          </div>
          <p className="text-[11px] text-stone-500">Sur les 7 départements actifs</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Requêtes Exaucées</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-rose-800">42</span>
            <span className="text-xs text-stone-500">témoignages</span>
          </div>
          <p className="text-[11px] text-stone-500">Gloire soit rendue à Dieu !</p>
        </div>
      </div>

      {
    /* Visual Chart Bars (Attendance & Finances Evolution) */
  }
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Évolution de l'Assistance aux Cultes Dominicaux (2026)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Affluence mesurée à chaque culte principal de 08h00 à 12h00
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
            Croissance Régulière ✓
          </span>
        </div>

        {
    /* Visual Bar Graph */
  }
        <div className="space-y-3 pt-2">
          {attendanceData.map((item, idx) => {
    const widthPct = Math.round(item.attendance / 500 * 100);
    return <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700 w-20">{item.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-stone-500">{item.attendance} fidèles</span>
                    <strong className="text-emerald-800 w-24 text-right">
                      {item.tithes.toLocaleString("fr-FR")} €
                    </strong>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden flex">
                  <div
      className="h-full bg-gradient-to-r from-emerald-700 to-amber-500 rounded-full transition-all duration-500"
      style={{ width: `${widthPct}%` }}
    />
                </div>
              </div>;
  })}
        </div>
      </div>

      {
    /* Department Breakdown Grid */
  }
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-stone-900">
          Répartition des Membres par Département
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {groups.map((group) => <div key={group.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1">
              <strong className="text-stone-900 text-sm block truncate">{group.name}</strong>
              <p className="text-emerald-800 font-bold">{group.membersCount} membres</p>
              <p className="text-[10px] text-stone-400">Responsable : {group.leader}</p>
            </div>)}
        </div>
      </div>
    </div>;
};
export {
  ReportsModule
};
