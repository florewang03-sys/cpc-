import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Calendar,
  Clock,
  MapPin,
  Play,
  Heart,
  ChevronRight,
  Sparkles,
  Users,
  Radio,
  ArrowRight,
  Quote,
  BookOpen,
  X
} from "lucide-react";
const HomeView = () => {
  const {
    programs,
    events,
    announcements,
    sermons,
    groups,
    campaigns,
    testimonies,
    setPublicPage,
    openGroupDetail,
    navigateTo,
    setCurrentSpace,
    setErpTab
  } = useChurch();
  const [activeSermonModal, setActiveSermonModal] = useState(null);
  const nextPrograms = programs.slice(0, 3);
  const featuredEvent = events.find((e) => e.isFeatured) || events[0];
  const latestSermon = sermons[0];
  const urgentAnnouncement = announcements.find((a) => a.priority === "urgent") || announcements[0];
  const featuredCampaign = campaigns.find((c) => c.isFeatured) || campaigns[0];
  return <div className="space-y-16 pb-20 select-none">
      {
    /* =========================================================================
       HERO SECTION (ELEGANT, GOLDEN EMBLEM PALETTE, SPIRITUAL & WARM)
      ========================================================================= */
  }
      <section className="relative overflow-hidden bg-stone-950 text-white pt-12 pb-24 border-b border-amber-900/30">
        {
    /* Warm subtle background glow */
  }
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(180,83,9,0.35),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {
    /* Top pill badge */
  }
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Communauté pour Christ • Amour, Espérance et Foi</span>
            </div>

            {
    /* Bible Verse Header */
  }
            <div className="bg-stone-900/80 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
              <Quote className="w-6 h-6 text-amber-400 mx-auto mb-2 opacity-80" />
              <p className="font-serif italic text-base sm:text-lg text-amber-100/95 leading-relaxed">
                « De même que nous avons plusieurs membres dans un seul corps, et que tous les membres n'ont pas la même fonction, ainsi, nous qui sommes plusieurs, nous formons un seul corps en Christ. »
              </p>
              <div className="font-sans font-bold text-xs uppercase tracking-widest text-amber-400 mt-2">
                — Romains 12:4-5
              </div>
            </div>

            {
    /* Main Headline */
  }
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Une église vivante pour <span className="text-amber-400 italic">transformer des vies</span> et bâtir la communauté.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Que vous cherchiez un lieu d'adoration, une famille chrétienne chaleureuse ou un accompagnement spirituel à Ngangue, vous êtes les bienvenus.
            </p>
          </div>
        </div>
      </section>

      {
    /* =========================================================================
       SECTION 1 : PROCHAINS RENDEZ-VOUS SPIRITUELS & CULTES
      ========================================================================= */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
              <Clock className="w-4 h-4 text-amber-600" /> Vie liturgique & Horaires
            </div>
            <h2 className="font-display text-3xl font-extrabold text-stone-900 mt-1">
              Rendez-vous de la Semaine
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Participez à nos rassemblements au Sanctuaire Central de Ngangue.
            </p>
          </div>

          <button
    onClick={() => setPublicPage("Programmes")}
    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-4 py-2 rounded-xl transition cursor-pointer"
  >
            <span>Voir tout le calendrier</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextPrograms.map((prog) => <div
    key={prog.id}
    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
  >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-bold">
                    {prog.day}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{prog.time || `${prog.startTime} \u2013 ${prog.endTime}`}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-stone-900 group-hover:text-amber-700 transition leading-snug">
                  {prog.title}
                </h3>

                <p className="text-stone-600 text-xs mt-2.5 line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 space-y-1 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span className="text-stone-700 font-medium">{prog.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Responsable : {prog.leader}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  {prog.recurrence}
                </span>
                <button
    onClick={() => setPublicPage("Programmes")}
    className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 group-hover:translate-x-1 transition cursor-pointer"
  >
                  <span>Détails & Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>)}
        </div>
      </section>

      {
    /* =========================================================================
       SECTION 2 : LES DÉPARTEMENTS MINISTÉRIELS
      ========================================================================= */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
              <Users className="w-4 h-4 text-amber-600" /> Vie de communauté & Départements
            </div>
            <h2 className="font-display text-3xl font-extrabold text-stone-900 mt-1">
              Les Départements Ministériels
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Découvrez nos {groups.length} départements ministériels, leurs vocations spirituelles et leurs programmes d'activités à Ngangue.
            </p>
          </div>

          <button
    onClick={() => setPublicPage("Groupes")}
    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-4 py-2 rounded-xl transition cursor-pointer"
  >
            <span>Explorer tous les {groups.length} départements</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((grp) => {
    return <div
      key={grp.id}
      className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
    >
                <div>
                  <div className="relative h-40 overflow-hidden bg-stone-900">
                    <img
      src={grp.imageUrl}
      alt={grp.name}
      className="w-full h-full object-cover"
    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-900/90 text-amber-300 text-[11px] font-bold border border-amber-500/40">
                        {grp.name}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-xs text-amber-300 font-semibold">
                        👥 {grp.membersCount} membres
                      </span>
                      <span className="text-[10px] text-stone-300 font-medium">
                        CPC Ngangue
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <h3 className="font-display font-bold text-lg text-stone-900">
                      {grp.name}
                    </h3>
                    {grp.subtitle && <p className="text-[11px] font-semibold text-amber-800 italic">
                        « {grp.subtitle} »
                      </p>}
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {grp.description}
                    </p>

                    <div className="text-[11px] space-y-1 text-stone-500 pt-2 border-t border-stone-100">
                      <p><strong className="text-stone-700">Responsable :</strong> {grp.leader}</p>
                      <p><strong className="text-stone-700">Réunion :</strong> {grp.meetingSchedule} ({grp.meetingTime})</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
      onClick={() => openGroupDetail(grp.slug)}
      className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs text-center border border-amber-200 transition cursor-pointer"
    >
                    Découvrir le département →
                  </button>
                </div>
              </div>;
  })}
        </div>
      </section>

      {
    /* =========================================================================
       SECTION 3 : ÉVÉNEMENTS & CAMPAGNES D'ÉVANGÉLISATION
      ========================================================================= */
  }
      {featuredEvent && <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-widest">
              <Calendar className="w-4 h-4 text-amber-600" /> Grands Rendez-vous
            </div>
            <h2 className="font-display text-3xl font-extrabold text-stone-900 mt-1">
              Événements
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Campagnes d'évangélisation en plein air et rassemblements spirituels à New Bell Ngangué.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white border border-amber-900/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {
    /* Event Image */
  }
              <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[320px]">
                <img
    src={featuredEvent.imageUrl}
    alt={featuredEvent.title}
    className="w-full h-full object-cover"
  />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-extrabold text-xs uppercase tracking-wider shadow-lg">
                    Campagne d'Évangélisation
                  </span>
                </div>
              </div>

              {
    /* Event Content & CTA */
  }
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-amber-300 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      {featuredEvent.displayDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-amber-400" />
                      {featuredEvent.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      {featuredEvent.location}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {featuredEvent.title}
                  </h3>

                  <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {featuredEvent.description}
                  </p>

                  {featuredEvent.speaker && <p className="text-xs text-amber-200 mt-2 font-medium">
                      🎤 Orateurs : {featuredEvent.speaker}
                    </p>}

                  {
    /* Attendance gauge */
  }
                  <div className="mt-5 p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-400">Lieu du rassemblement :</span>
                      <strong className="text-white ml-2">
                        Esplanade New Bell Ngangué
                      </strong>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                      Entrée 100% libre & gratuite
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
    onClick={() => setPublicPage("\xC9v\xE9nements")}
    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
  >
                    Consulter tous les événements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>}

      {
    /* =========================================================================
       SECTION 4 : DERNIÈRE PRÉDICATION
      ========================================================================= */
  }
      {latestSermon && <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 border border-amber-900/30 text-stone-100 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {
    /* Left video preview card */
  }
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer border border-stone-700 shadow-2xl">
                  <img
    src={latestSermon.thumbnailUrl}
    alt={latestSermon.title}
    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
  />
                  <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition flex items-center justify-center">
                    <button
    onClick={() => setActiveSermonModal(latestSermon)}
    className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition cursor-pointer"
    title="Regarder la prédication"
  >
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-sm text-xs font-bold text-amber-300">
                    {latestSermon.duration}
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" /> Replay Vidéo
                  </div>
                </div>
              </div>

              {
    /* Right sermon info */
  }
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  <span>Dernière Prédication Dominicale</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                  « {latestSermon.title} »
                </h3>

                <div className="space-y-1.5 text-xs text-stone-300">
                  <p>
                    <strong className="text-amber-300">Prédicateur :</strong> {latestSermon.preacher}
                  </p>
                  <p>
                    <strong className="text-amber-300">Passage clé :</strong> {latestSermon.scripture}
                  </p>
                  <p>
                    <strong className="text-amber-300">Série :</strong> {latestSermon.series}
                  </p>
                  <p className="text-stone-400 text-[11px]">Enregistré le {latestSermon.date}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
    onClick={() => setActiveSermonModal(latestSermon)}
    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer"
  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Visionner la prédication</span>
                  </button>

                  <button
    onClick={() => setPublicPage("Pr\xE9dications")}
    className="px-4 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-xs transition cursor-pointer"
  >
                    Toutes les prédications ({sermons.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>}

      {
    /* =========================================================================
       SECTION 5 : DON
      ========================================================================= */
  }
      {featuredCampaign && <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-10 border border-amber-900/40 text-stone-100 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Soutien & Bénédictions</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Don
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Votre don soutient directement les orphelins et veuves de Ngangué, les grandes campagnes d'évangélisation en plein air et l'aménagement du Sanctuaire de la CPC.
                </p>

                <div className="space-y-2 pt-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Soutien aux orphelins & enfants scolarisés de New Bell</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Campagnes d'évangélisation & proclamation du salut</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Dîmes, offrandes et entretien du lieu de culte</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-stone-900/90 p-6 rounded-2xl border border-stone-800 text-center space-y-4">
                <h4 className="font-bold text-white text-base">Participer à l'œuvre de Dieu</h4>
                <p className="text-xs text-stone-400">
                  Don ponctuel ou régulier via Mobile Money (Orange / MTN), virement ou directement au secrétariat de l'église.
                </p>
                <button
    onClick={() => setPublicPage("Dons")}
    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm shadow-xl transition cursor-pointer"
  >
                  Faire un Don
                </button>
              </div>
            </div>
          </div>
        </section>}

      {
    /* Modal: Video Player */
  }
      {activeSermonModal && <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-stone-800 text-white animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="font-bold text-lg text-white">« {activeSermonModal.title} »</h3>
              <button
    onClick={() => setActiveSermonModal(null)}
    className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video mt-4 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <iframe
    src={activeSermonModal.videoUrl}
    title={activeSermonModal.title}
    className="w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
            </div>
            <div className="mt-4 text-xs text-stone-400 flex items-center justify-between">
              <span>Prédicateur : {activeSermonModal.preacher}</span>
              <span>Passage : {activeSermonModal.scripture}</span>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  HomeView
};
