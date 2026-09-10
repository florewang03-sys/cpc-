import { useChurch } from "../../context/ChurchContext";
import {
  Users,
  Calendar,
  HeartHandshake,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  FolderKanban
} from "lucide-react";
const DashboardView = () => {
  const {
    members,
    groups,
    programs,
    events,
    prayerRequests,
    campaigns,
    joinRequests,
    setErpTab,
    navigateTo,
    activeRole
  } = useChurch();
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "Actif").length;
  const pendingRequests = joinRequests.filter((r) => r.status === "pending");
  const activePrayers = prayerRequests.filter((p) => p.status === "active");
  const totalCollected = campaigns.reduce((acc, c) => acc + c.collectedAmount, 0);
  const totalTarget = campaigns.reduce((acc, c) => acc + c.targetAmount, 0);
  return <div className="space-y-8 animate-fadeIn">
      {
    /* Welcome Banner */
  }
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white border border-stone-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
            ✝ Plateforme Intégrée CPC Connect
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Tableau de Bord Administratif & Pastoral
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Pilotez l'ensemble des départements, synchronisez les cultes en direct avec le site public et gérez les requêtes pastorales.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
    onClick={() => navigateTo("public", "Accueil")}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition"
  >
            Tester le Site Public →
          </button>
        </div>
      </div>

      {
    /* KPI Cards Grid */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {
    /* Metric 1 : Membres */
  }
        <div
    onClick={() => setErpTab("Membres")}
    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer space-y-3"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Membres Actifs</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-stone-900">{totalMembers}</span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12% ce mois
            </span>
          </div>
          <p className="text-[11px] text-stone-500">{activeMembers} fidèles enregistrés actifs</p>
        </div>

        {
    /* Metric 2 : Groupes & Demandes */
  }
        <div
    onClick={() => setErpTab("Groupes")}
    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer space-y-3"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Pôles & Groupes</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-stone-900">{groups.length}</span>
            {pendingRequests.length > 0 ? <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                {pendingRequests.length} adhésion(s) en attente
              </span> : <span className="text-xs text-stone-400">À jour</span>}
          </div>
          <p className="text-[11px] text-stone-500">7 ministères et départements</p>
        </div>

        {
    /* Metric 3 : Sujets de Prière */
  }
        <div
    onClick={() => setErpTab("Demandes de pri\xE8re")}
    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer space-y-3"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Intercession</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-3xl text-stone-900">{prayerRequests.length}</span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
              {activePrayers.length} en cours
            </span>
          </div>
          <p className="text-[11px] text-stone-500">Filtre de confidentialité actif</p>
        </div>

        {
    /* Metric 4 : Finances / Dons */
  }
        <div
    onClick={() => setErpTab("Dons")}
    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition cursor-pointer space-y-3"
  >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Fonds Collectés</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-bold text-2xl text-emerald-800">
              {totalCollected.toLocaleString("fr-FR")} €
            </span>
            <span className="text-xs text-stone-500">/ {totalTarget.toLocaleString("fr-FR")} €</span>
          </div>
          <p className="text-[11px] text-stone-500">Sur 3 campagnes actives en 2026</p>
        </div>
      </div>

      {
    /* Two Column Layout : Group Join Requests & Upcoming Cultes Live */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left : Demandes d'adhésion aux groupes en attente (6 cols) */
  }
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-amber-700" />
              <h3 className="font-display font-bold text-lg text-stone-900">
                Demandes d'Adhésion aux Groupes
              </h3>
            </div>
            <button
    onClick={() => setErpTab("Groupes")}
    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold"
  >
              Gérer tout ({joinRequests.length}) →
            </button>
          </div>

          {pendingRequests.length === 0 ? <div className="p-8 text-center text-stone-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs">Toutes les demandes ont été traitées !</p>
            </div> : <div className="space-y-3">
              {pendingRequests.slice(0, 3).map((req) => <div
    key={req.id}
    className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start justify-between gap-3 text-xs"
  >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-stone-900 text-sm">{req.userName}</strong>
                      <span className="px-2 py-0.5 rounded bg-amber-200/70 text-amber-950 font-bold text-[10px]">
                        Demande pour {req.groupName}
                      </span>
                    </div>
                    {req.motivationNote && <p className="text-stone-600 text-[11px] italic">« {req.motivationNote} »</p>}
                    <span className="text-[10px] text-stone-400">Date : {req.requestDate}</span>
                  </div>

                  <button
    onClick={() => setErpTab("Groupes")}
    className="shrink-0 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-emerald-800 text-white font-bold text-xs transition"
  >
                    Examiner
                  </button>
                </div>)}
            </div>}
        </div>

        {
    /* Right : Programmes Hebdo Synchronisés (6 cols) */
  }
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <h3 className="font-display font-bold text-lg text-stone-900">
                Cultes Hebdomadaires en Direct
              </h3>
            </div>
            <button
    onClick={() => setErpTab("Programmes")}
    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold"
  >
              Modifier / Ajouter →
            </button>
          </div>

          <div className="space-y-2.5">
            {programs.slice(0, 4).map((prog) => <div
    key={prog.id}
    className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
  >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                      {prog.day}
                    </span>
                    <strong className="text-stone-900">{prog.title}</strong>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {prog.startTime} – {prog.endTime} • {prog.room} ({prog.leader})
                  </p>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  Visible Public ✓
                </span>
              </div>)}
          </div>
        </div>
      </div>

      {
    /* Quick Shortcuts Bar */
  }
      <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 space-y-3">
        <h4 className="font-display font-bold text-sm text-stone-900">
          Raccourcis & Actions Rapides
        </h4>
        <div className="flex flex-wrap gap-3">
          <button
    onClick={() => setErpTab("Membres")}
    className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-800 shadow-sm"
  >
            + Ajouter un Nouveau Membre
          </button>
          <button
    onClick={() => setErpTab("Programmes")}
    className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-800 shadow-sm"
  >
            + Programmer un Culte / Réunion
          </button>
          <button
    onClick={() => setErpTab("Annonces")}
    className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-800 shadow-sm"
  >
            + Publier une Annonce Flash
          </button>
          <button
    onClick={() => setErpTab("Notifications")}
    className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-800 shadow-sm"
  >
            ✉ Diffuser une Campagne SMS / Mail
          </button>
        </div>
      </div>
    </div>;
};
export {
  DashboardView
};
