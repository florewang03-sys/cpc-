import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Users,
  Calendar,
  Clock,
  Shield,
  UserCheck,
  Flame,
  BookOpen,
  Music,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowRight
} from "lucide-react";
const GroupsPublicView = () => {
  const { groups, openGroupDetail } = useChurch();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expandedAnnualGroupIds, setExpandedAnnualGroupIds] = useState({});
  const toggleAnnualProgram = (groupId) => {
    setExpandedAnnualGroupIds((prev) => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  const filteredGroups = selectedFilter === "all" ? groups : groups.filter((g) => g.id === selectedFilter);
  const getGroupIcon = (slug) => {
    switch (slug) {
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
  return <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-in fade-in duration-200">
      {
    /* Header Banner */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-amber-700" /> Les Départements Ministériels
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-stone-900">
          Les Départements
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Présentation des départements ministériels de l'Église CPC de Ngangué, leurs responsables, horaires de rencontre et vocations spirituelles.
        </p>

        {
    /* Confidentiality notice */
  }
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-100 border border-stone-200 text-stone-600 text-xs text-left max-w-2xl mt-2">
          <Lock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Note de confidentialité :</strong> Les échanges, enseignements spécifiques et activités internes de la jeunesse et des autres départements restent strictement confidentiels au sein de chaque groupe.
          </span>
        </div>
      </div>

      {
    /* Filter Tabs */
  }
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
    onClick={() => setSelectedFilter("all")}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${selectedFilter === "all" ? "bg-stone-900 text-amber-300 shadow-md" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"}`}
  >
          Tous les départements ({groups.length})
        </button>
        {groups.map((g) => <button
    key={g.id}
    onClick={() => setSelectedFilter(g.id)}
    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${selectedFilter === g.id ? "bg-amber-600 text-white shadow-md" : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"}`}
  >
            {g.name}
          </button>)}
      </div>

      {
    /* Groups Grid: Strictly Informational without action/join buttons */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGroups.map((group) => {
    const GroupIcon = getGroupIcon(group.slug);
    return <div
      key={group.id}
      className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
              <div>
                {
      /* Image Header */
    }
                <div className="relative h-48 overflow-hidden bg-stone-900">
                  <img
      src={group.imageUrl}
      alt={group.name}
      className="w-full h-full object-cover"
    />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center gap-1.5 shadow">
                      <GroupIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{group.name}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-amber-300">
                      <Users className="w-4 h-4" />
                      <span>{group.membersCount} membres actifs</span>
                    </span>
                    <span className="text-[11px] text-stone-300 font-medium">
                      CPC Ngangue
                    </span>
                  </div>
                </div>

                {
      /* Content */
    }
                <div className="p-6 space-y-4">
                  {
      /* Name & Description */
    }
                  <div>
                    <h3 className="font-display text-xl font-bold text-stone-900">
                      {group.name}
                    </h3>
                    {group.subtitle && <p className="text-xs font-semibold text-amber-800 mt-1 italic">
                        « {group.subtitle} »
                      </p>}
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {
      /* Direct Details Box: Leaders, Meeting day & time */
    }
                  <div className="bg-stone-50 rounded-2xl p-4 space-y-2.5 text-xs border border-stone-200/80">
                    {
      /* Leader */
    }
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-stone-600">
                        <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="text-stone-500">Leader :</span>
                      </div>
                      <span className="font-bold text-stone-900 text-right truncate">
                        {group.leader}
                      </span>
                    </div>

                    {
      /* Deputy Leader */
    }
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-stone-600">
                        <UserCheck className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span className="text-stone-500">Adjoint :</span>
                      </div>
                      <span className="font-semibold text-stone-800 text-right truncate">
                        {group.deputyLeader || "Non assign\xE9"}
                      </span>
                    </div>

                    {
      /* Meeting Day & Time */
    }
                    <div className="pt-2 border-t border-stone-200/70 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-stone-600">
                          <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="text-stone-500">Jour de rencontre :</span>
                        </div>
                        <span className="font-semibold text-stone-900">
                          {group.meetingDay || group.meetingSchedule}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-stone-600">
                          <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="text-stone-500">Heure :</span>
                        </div>
                        <span className="font-bold text-amber-800">
                          {group.meetingTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {
      /* Activities tags */
    }
                  {group.activities && group.activities.length > 0 && <div className="pt-1">
                      <span className="text-[11px] font-bold text-stone-500 block mb-1.5">
                        Missions & Activités du département :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.activities.map((act, idx) => <span
      key={idx}
      className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200"
    >
                            • {act}
                          </span>)}
                      </div>
                    </div>}

                  {
      /* Annual Program Accordion on each card */
    }
                  {group.annualProgram && group.annualProgram.length > 0 && <div className="pt-2 border-t border-stone-200/70">
                      <button
      onClick={() => toggleAnnualProgram(group.id)}
      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/70 text-amber-950 text-xs font-bold transition border border-amber-200/60"
    >
                        <span className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-700" />
                          <span>Programme Annuel ({group.annualProgram.length} trimestres)</span>
                        </span>
                        {expandedAnnualGroupIds[group.id] ? <ChevronUp className="w-4 h-4 text-amber-800" /> : <ChevronDown className="w-4 h-4 text-amber-800" />}
                      </button>

                      {expandedAnnualGroupIds[group.id] && <div className="mt-2.5 space-y-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs animate-in fade-in duration-200">
                          {group.annualProgram.map((item, idx) => <div key={idx} className="border-b border-stone-200/60 pb-2 last:border-b-0 last:pb-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-stone-900 text-[11px]">{item.period}</span>
                                <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">Objectif</span>
                              </div>
                              <div className="font-semibold text-stone-800 text-[11px] mt-0.5">{item.title}</div>
                              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">{item.description}</p>
                              <div className="text-[10px] text-stone-500 italic mt-0.5">🎯 {item.target}</div>
                            </div>)}
                        </div>}
                    </div>}
                </div>
              </div>

              {
      /* Bottom footer button */
    }
              <div className="p-6 pt-0 space-y-2">
                <button
      onClick={() => openGroupDetail(group.slug)}
      className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 hover:text-amber-200 text-xs font-bold text-center transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
    >
                  <span>Consulter la feuille de route complète</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="py-1 px-2 text-stone-400 text-[10px] text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Sanctuaire de New Bell Ngangué</span>
                </div>
              </div>
            </div>;
  })}
      </div>
    </div>;
};
export {
  GroupsPublicView
};
