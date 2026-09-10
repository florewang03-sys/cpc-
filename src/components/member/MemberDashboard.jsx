import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Calendar,
  Clock,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  Play,
  Bell,
  ChevronRight,
  Plus
} from "lucide-react";
const MemberDashboard = ({ onNavigateTab }) => {
  const {
    currentUser,
    programs,
    events,
    announcements,
    sermons,
    groups,
    prayerRequests,
    notifications,
    unreadNotificationsCount,
    getUserGroupRequestStatus,
    incrementPrayedCount
  } = useChurch();
  const [activeSermonModal, setActiveSermonModal] = useState(null);
  const nextPrograms = programs.slice(0, 3);
  const nextEvents = events.slice(0, 2);
  const recentSermon = sermons[0];
  const recentAnnouncement = announcements[0];
  const userPrayers = prayerRequests.slice(0, 3);
  const userGroups = groups.filter((g) => {
    const status = getUserGroupRequestStatus(g.id);
    return status === "accepted" || currentUser.groupName && g.name && currentUser.groupName.toLowerCase().includes(g.name.toLowerCase());
  });
  const availableGroups = groups.filter((g) => !userGroups.some((ug) => ug.id === g.id)).slice(0, 3);
  return <div className="space-y-8 select-none">
      {
    /* =========================================================================
       GREETING & HERO WELCOME
      ========================================================================= */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Espace Fidèle • CPC Connect</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Bonjour, <span className="text-amber-400">{currentUser.fullName}</span> 👋
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Heureux de vous retrouver dans la présence du Seigneur. Voici un aperçu de vos activités, rendez-vous liturgiques et engagements fraternels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
    onClick={() => onNavigateTab("Demandes de pri\xE8re")}
    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer"
  >
              <Heart className="w-4 h-4 fill-current" />
              <span>Déposer une Prière</span>
            </button>

            <button
    onClick={() => onNavigateTab("Programmes")}
    className="px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
  >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Horaires des Cultes</span>
            </button>
          </div>
        </div>

        {
    /* Notifications Callout */
  }
        {unreadNotificationsCount > 0 && <div className="mt-6 pt-5 border-t border-stone-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-300">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <span>
                Vous avez <strong>{unreadNotificationsCount} nouvelle(s) notification(s)</strong> non lue(s).
              </span>
            </div>
            <button
    onClick={() => onNavigateTab("Notifications")}
    className="font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
  >
              <span>Consulter mes alertes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>}
      </div>

      {
    /* =========================================================================
       MAIN 2-COLUMN DASHBOARD GRID
      ========================================================================= */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left Column (8 cols): Programs, Announcements, Prayers, Sermons */
  }
        <div className="lg:col-span-8 space-y-8">
          {
    /* Section: Prochains rendez-vous de la semaine */
  }
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Liturgie & Rassemblements
                </span>
                <h3 className="font-display font-extrabold text-lg text-stone-900">
                  Prochains Cultes & Programmes
                </h3>
              </div>
              <button
    onClick={() => onNavigateTab("Programmes")}
    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
  >
                <span>Tout le calendrier</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextPrograms.map((prog) => <div
    key={prog.id}
    className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 hover:border-amber-400 transition flex flex-col justify-between"
  >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900 text-amber-300 text-[10px] font-bold">
                        {prog.day}
                      </span>
                      <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {prog.startTime}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-stone-900 line-clamp-2 leading-snug">
                      {prog.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      {prog.room}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-200/60 text-[10px] text-stone-500 flex items-center justify-between">
                    <span>{prog.leader}</span>
                  </div>
                </div>)}
            </div>
          </div>

          {
    /* Section: Dernière Annonce Officielle */
  }
          {recentAnnouncement && <div className="bg-stone-900 rounded-3xl p-6 border border-amber-900/40 text-stone-100 shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                    Communiqué de l'Église
                  </div>
                  <h3 className="font-bold text-base text-white">
                    {recentAnnouncement.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {recentAnnouncement.content}
                  </p>
                  <div className="pt-2 text-[11px] text-stone-400 flex items-center gap-4">
                    <span>Publié par : {recentAnnouncement.author}</span>
                    <span>•</span>
                    <span>{recentAnnouncement.createdAt}</span>
                  </div>
                </div>
                <button
    onClick={() => onNavigateTab("Annonces")}
    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 cursor-pointer transition shadow"
  >
                  Lire tout →
                </button>
              </div>
            </div>}

          {
    /* Section: Demandes de Prière & Intercession Récentes */
  }
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Soutien Fraternel
                </span>
                <h3 className="font-display font-extrabold text-lg text-stone-900">
                  Demandes de Prière de la Communauté
                </h3>
              </div>
              <button
    onClick={() => onNavigateTab("Demandes de pri\xE8re")}
    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
  >
                <Plus className="w-3.5 h-3.5" />
                <span>Déposer ma requête</span>
              </button>
            </div>

            <div className="space-y-3">
              {userPrayers.map((prayer) => <div
    key={prayer.id}
    className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
  >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
    className={`px-2 py-0.5 rounded text-[10px] font-bold ${prayer.confidentiality === "CONFIDENTIEL" ? "bg-red-100 text-red-800 border border-red-200" : prayer.confidentiality === "INTERCESSION" ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-stone-200 text-stone-800"}`}
  >
                        {prayer.confidentiality === "CONFIDENTIEL" && "\u{1F512} "}
                        {prayer.confidentiality}
                      </span>
                      {prayer.isUrgent && <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                          Urgent
                        </span>}
                      <span className="text-[11px] text-stone-500">
                        {prayer.requestorName} • {prayer.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-stone-900">
                      {prayer.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {prayer.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
    onClick={() => incrementPrayedCount(prayer.id)}
    className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
    title="J'ai prié pour ce sujet"
  >
                      <Heart className="w-3.5 h-3.5 fill-current text-amber-700" />
                      <span>{prayer.prayedCount} Amen</span>
                    </button>
                  </div>
                </div>)}
            </div>
          </div>

          {
    /* Section: Dernière Prédication Dominicale */
  }
          {recentSermon && <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-full sm:w-56 h-36 rounded-2xl overflow-hidden shrink-0 bg-stone-900">
                <img
    src={recentSermon.thumbnailUrl}
    alt={recentSermon.title}
    className="w-full h-full object-cover"
  />
                <button
    onClick={() => onNavigateTab("Pr\xE9dications", recentSermon.id)}
    className="absolute inset-0 bg-stone-950/40 hover:bg-stone-950/20 transition flex items-center justify-center cursor-pointer group"
  >
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </button>
              </div>

              <div className="space-y-2 flex-1">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  Dernier Enseignement
                </div>
                <h4 className="font-display font-bold text-base text-stone-900">
                  « {recentSermon.title} »
                </h4>
                <p className="text-xs text-stone-600">
                  Prédicateur : <strong>{recentSermon.preacher}</strong> • {recentSermon.scripture}
                </p>
                <div className="pt-2">
                  <button
    onClick={() => onNavigateTab("Pr\xE9dications", recentSermon.id)}
    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Visionner la vidéo complète</span>
                  </button>
                </div>
              </div>
            </div>}
        </div>

        {
    /* Right Column (4 cols): My Groups & Quick Shortcuts */
  }
        <div className="lg:col-span-4 space-y-6">
          {
    /* Card: Mes Groupes Actifs */
  }
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-stone-900">
                Mes Groupes
              </h3>
              <button
    onClick={() => onNavigateTab("Mes groupes")}
    className="text-xs font-bold text-amber-800 hover:underline cursor-pointer"
  >
                Gérer →
              </button>
            </div>

            {userGroups.length > 0 ? <div className="space-y-3">
                {userGroups.map((g) => <div
    key={g.id}
    className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between"
  >
                    <div>
                      <h4 className="font-bold text-xs text-stone-900">{g.name}</h4>
                      <p className="text-[11px] text-stone-600">
                        {g.meetingSchedule} • {g.meetingTime}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold text-[10px]">
                      Membre
                    </span>
                  </div>)}
              </div> : <div className="p-4 rounded-2xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-2">
                <Users className="w-6 h-6 text-stone-400 mx-auto" />
                <p className="text-xs text-stone-600">
                  Vous n'avez pas encore rejoint de département.
                </p>
                <button
    onClick={() => onNavigateTab("Mes groupes")}
    className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer shadow"
  >
                  Découvrir les 7 groupes
                </button>
              </div>}

            {
    /* Other Available Groups shortcut */
  }
            {availableGroups.length > 0 && <div className="pt-3 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Groupes disponibles :
                </span>
                <div className="space-y-1.5">
                  {availableGroups.map((grp) => {
    const status = getUserGroupRequestStatus(grp.id);
    return <div
      key={grp.id}
      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl hover:bg-stone-50 transition"
    >
                        <span className="font-semibold text-stone-800">{grp.name}</span>
                        {status === "pending" ? <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            En attente
                          </span> : <button
      onClick={() => onNavigateTab("Mes groupes")}
      className="text-[11px] font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
    >
                            Rejoindre +
                          </button>}
                      </div>;
  })}
                </div>
              </div>}
          </div>

          {
    /* Card: Événements à venir */
  }
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-stone-900">
                Événements à Venir
              </h3>
              <button
    onClick={() => onNavigateTab("\xC9v\xE9nements")}
    className="text-xs font-bold text-amber-800 hover:underline cursor-pointer"
  >
                Tous →
              </button>
            </div>

            <div className="space-y-3">
              {nextEvents.map((evt) => <div
    key={evt.id}
    className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5"
  >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-800">
                    <Calendar className="w-3 h-3" />
                    <span>{evt.displayDate}</span>
                  </div>
                  <h4 className="font-bold text-xs text-stone-900 leading-snug">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-stone-500">{evt.location}</p>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export {
  MemberDashboard
};
