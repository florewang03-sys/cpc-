import { useChurch } from "../../context/ChurchContext";
import {
  Users,
  Calendar,
  Clock,
  Shield,
  Sparkles,
  ArrowLeft,
  Flame,
  BookOpen,
  Music,
  UserCheck,
  MapPin,
  Target,
  Award,
  CheckCircle2
} from "lucide-react";
const GroupDetailView = ({
  slug: propSlug,
  onBack: propOnBack
}) => {
  const { groups, selectedGroupSlug, setPublicPage, openGroupDetail } = useChurch();
  const targetSlug = (propSlug || selectedGroupSlug || "predication-enseignement").toLowerCase();
  const onBack = propOnBack || (() => setPublicPage("Groupes"));
  const group = groups.find(
    (g) => g.slug && g.slug.toLowerCase() === targetSlug || g.id && g.id.toLowerCase() === targetSlug || g.name && g.name.toLowerCase().includes(targetSlug)
  ) || groups[0];
  const getGroupIcon = (groupSlug) => {
    const s = (groupSlug || "").toLowerCase();
    switch (s) {
      case "jeunesse":
      case "youth":
        return Users;
      case "perles-precieuses":
      case "precious-pearls":
        return Sparkles;
      case "hommes":
      case "mens-ministry":
        return Users;
      case "rythmes-celestes":
        return Music;
      case "intercession":
      case "intercession-group":
        return Flame;
      case "service-entretien":
      case "service-nettoyage":
      case "service-de-nettoyage":
      case "cleaning-group":
        return Sparkles;
      case "diaconat":
        return Shield;
      case "predication-enseignement":
        return BookOpen;
      case "evangelisation":
        return Flame;
      case "ecole-du-ciel":
      case "school-of-heaven":
        return BookOpen;
      default:
        return Users;
    }
  };
  const GroupIcon = getGroupIcon(group?.slug);
  return <div className="min-h-[80vh] pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8 animate-in fade-in duration-200">
      {
    /* Top Breadcrumbs & Back button */
  }
      <div className="flex items-center justify-between">
        <button
    onClick={onBack}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-950 hover:bg-stone-50 text-xs font-bold transition shadow-sm cursor-pointer"
  >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à tous les départements</span>
        </button>

        <div className="text-xs text-stone-400 font-medium hidden sm:block">
          <span>Accueil</span> &gt; <span>Départements Ministériels</span> &gt;{" "}
          <span className="text-stone-900 font-bold">{group.name}</span>
        </div>
      </div>

      {
    /* Hero Banner Card */
  }
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-900/20 bg-stone-900 text-white">
        <div className="h-64 sm:h-80 w-full relative">
          <img
    src={group.imageUrl}
    alt={group.name}
    className="w-full h-full object-cover opacity-60"
  />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <GroupIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Département Officiel CPC Ngangue</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              {group.name}
            </h1>
            {group.subtitle && <p className="text-amber-300 font-serif italic text-base sm:text-lg">
                « {group.subtitle} »
              </p>}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {group.description}
            </p>
          </div>

          <div className="shrink-0 bg-stone-900/90 backdrop-blur-md border border-stone-700/80 p-4 rounded-2xl text-center min-w-[140px]">
            <div className="text-3xl font-black text-amber-400">{group.membersCount}</div>
            <div className="text-[11px] text-stone-300 uppercase font-bold tracking-wider mt-0.5">
              Membres actifs
            </div>
            <div className="text-[10px] text-stone-400 mt-1">CPC Ngangue</div>
          </div>
        </div>
      </div>

      {
    /* Main Grid */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left Column (8 cols): Info + Programme Annuel */
  }
        <div className="lg:col-span-8 space-y-8">
          {
    /* Key Info Cards */
  }
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Informations Générales & Encadrement</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {
    /* Leader */
  }
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Leader du département
                  </div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{group.leader}</div>
                  <div className="text-xs text-stone-500">Responsable principal</div>
                </div>
              </div>

              {
    /* Adjoint */
  }
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-stone-200 text-stone-700 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Adjoint au leader
                  </div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    {group.deputyLeader || "En cours de d\xE9signation"}
                  </div>
                  <div className="text-xs text-stone-500">Coordination & soutien</div>
                </div>
              </div>

              {
    /* Jour de réunion */
  }
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Jour de réunion
                  </div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">
                    {group.meetingDay || group.meetingSchedule}
                  </div>
                  <div className="text-xs text-stone-500">{group.meetingSchedule}</div>
                </div>
              </div>

              {
    /* Heure de réunion */
  }
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-stone-200 text-stone-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Heure & Fréquence
                  </div>
                  <div className="font-bold text-stone-900 text-sm mt-0.5">{group.meetingTime}</div>
                  <div className="text-xs text-stone-500">Sanctuaire de Ngangué</div>
                </div>
              </div>
            </div>

            {
    /* Activities */
  }
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-stone-900 text-sm">
                Activités régulières & Missions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.activities.map((activity, idx) => <div
    key={idx}
    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs font-medium text-stone-800"
  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{activity}</span>
                  </div>)}
              </div>
            </div>
          </div>

          {
    /* PROGRAMME ANNUEL (ANNUAL PROGRAM) SECTION */
  }
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  Feuille de route ecclésiale
                </span>
                <h2 className="font-display text-2xl font-bold text-stone-900 flex items-center gap-2 mt-1">
                  <Award className="w-6 h-6 text-amber-600" />
                  <span>Programme Annuel du Département</span>
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                Année en cours
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Découvrez les grandes orientations stratégiques, les retraites, les projets et les actions d'impact programmés tout au long de l'année pour le département <strong>{group.name}</strong>.
            </p>

            {
    /* Timeline of Annual Activities */
  }
            <div className="space-y-4">
              {group.annualProgram && group.annualProgram.length > 0 ? group.annualProgram.map((prog, idx) => <div
    key={idx}
    className="p-5 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2.5 transition hover:border-amber-400 hover:bg-amber-50/30"
  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-lg bg-stone-900 text-amber-300 font-bold text-[11px] uppercase tracking-wider">
                        {prog.period}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-amber-600" />
                        <span>Objectif : {prog.target}</span>
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-stone-900 text-base">
                      {prog.title}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>) : <div className="p-6 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl">
                  Programme annuel en cours de validation pastorale.
                </div>}
            </div>
          </div>
        </div>

        {
    /* Right Column (4 cols): Information & Localisation Card (Purely Informative) */
  }
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 sticky top-24">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" /> Informations Pratiques
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Participer aux Rencontres
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Les réunions et partages du département sont ouverts à tous les membres et visiteurs de l'assemblée.
              </p>
            </div>

            <div className="space-y-3.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Lieu des réunions</span>
                <p className="font-bold text-stone-900">Sanctuaire CPC Ngangue</p>
                <p className="text-[11px] text-stone-500">New Bell Ngangué (Lieu-dit Maison Blanche), Douala</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase">Horaires réguliers</span>
                <p className="font-bold text-amber-800">{group.meetingSchedule}</p>
                <p className="text-[11px] text-stone-600">{group.meetingTime}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-amber-950">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Renseignements & Contact</span>
                <p className="font-bold text-stone-900">Secrétariat Pastoral & Leaders</p>
                <p className="text-[11px] text-stone-600">Pour tout renseignement, adressez-vous au service d'accueil lors des cultes ou au responsable {group.leader}.</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-stone-900 text-stone-200 text-xs space-y-1.5 text-center">
                <p className="font-bold text-amber-300">« Servez l'Éternel avec joie »</p>
                <p className="text-[11px] text-stone-400">Psaume 100:2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* Other Departments Quick Navigation */
  }
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Explorer les autres départements ministériels
            </h3>
            <p className="text-xs text-stone-500">
              Découvrez la vision et les activités de nos {groups.length} départements ministériels
            </p>
          </div>
          <button
    onClick={onBack}
    className="text-xs font-bold text-amber-900 hover:text-amber-950 underline cursor-pointer self-start sm:self-auto"
  >
            Voir tous les départements ({groups.length})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {groups.map((g) => {
    const isCurrent = g.slug === group.slug;
    const OtherIcon = getGroupIcon(g.slug);
    return <button
      key={g.id}
      onClick={() => openGroupDetail(g.slug)}
      className={`p-3.5 rounded-2xl text-left border transition flex flex-col justify-between gap-2 cursor-pointer ${isCurrent ? "bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-sm ring-1 ring-amber-400" : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"}`}
    >
                <div className="flex items-center gap-2">
                  <OtherIcon className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="text-xs font-bold truncate">{g.name}</span>
                </div>
                {g.subtitle && <span className="text-[10px] text-stone-500 line-clamp-1 italic">
                    « {g.subtitle} »
                  </span>}
              </button>;
  })}
        </div>
      </div>
    </div>;
};
export {
  GroupDetailView
};
