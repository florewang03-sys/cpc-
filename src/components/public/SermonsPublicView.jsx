import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Video,
  Volume2,
  Search,
  BookOpen,
  Calendar,
  Sparkles,
  Flame,
  Radio,
  BarChart2,
  Clock,
  Eye,
  Headphones,
  User,
  Layers,
  CheckCircle2,
  X,
  Download
} from "lucide-react";
const SermonsPublicView = () => {
  const { sermons, showToast } = useChurch();
  const [activeMediaSection, setActiveMediaSection] = useState("video");
  const [activeDaySection, setActiveDaySection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatsSermon, setSelectedStatsSermon] = useState(null);
  const daysList = [
    {
      id: "Mercredi",
      title: "Mercredi \u2014 \xC9tude Biblique & Enseignement",
      subtitle: "Approfondissement doctrinal, explication syst\xE9matique des \xC9critures et \xE9dification.",
      time: "18h00 \u2013 20h00",
      icon: BookOpen
    },
    {
      id: "Vendredi",
      title: "Vendredi \u2014 Pri\xE8re Fervente & D\xE9livrance",
      subtitle: "Combat spirituel, intercession proph\xE9tique, brisement de jougs et d\xE9livrance.",
      time: "18h00 \u2013 20h00",
      icon: Flame
    },
    {
      id: "Dimanche",
      title: "Dimanche \u2014 Grand Culte Dominical",
      subtitle: "Adoration solennelle, c\xE9l\xE9bration de la sainte pr\xE9sence de Dieu et pr\xE9dication de vie.",
      time: "08h00 \u2013 12h00",
      icon: Radio
    }
  ];
  const filteredSermons = sermons.filter((s) => {
    const q = (searchTerm || "").trim().toLowerCase();
    const matchSearch = !q || s.title && s.title.toLowerCase().includes(q) || s.scripture && s.scripture.toLowerCase().includes(q) || s.preacher && s.preacher.toLowerCase().includes(q) || s.theme && s.theme.toLowerCase().includes(q) || s.series && s.series.toLowerCase().includes(q);
    const matchDay = activeDaySection === "all" || s.day === activeDaySection;
    return matchSearch && matchDay;
  });
  const getSermonsForDay = (day) => {
    return filteredSermons.filter((s) => s.day === day);
  };
  const totalViews = sermons.reduce((acc, s) => acc + (s.viewsCount || 0), 0);
  const totalListens = sermons.reduce((acc, s) => acc + (s.listenCount || (s.viewsCount ? Math.round(s.viewsCount * 0.7) : 0)), 0);
  const handleDownloadPlan = (sermon) => {
    showToast(
      "Plan d'\xE9tude",
      `Le plan d'enseignement d\xE9taill\xE9 pour \xAB ${sermon.title} \xBB est pr\xEAt.`,
      "info"
    );
  };
  return <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 select-none">
      {
    /* Header Banner */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Prédications • Audios & Vidéos
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-stone-900">
          Médiathèque des Prédications
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Consultez l'ensemble des enseignements et prédications de l'église, organisés distinctement en parties <strong>Audio</strong> et <strong>Vidéo</strong>, et classés par jours de culte : <strong>Mercredi (18h-20h)</strong>, <strong>Vendredi (18h-20h)</strong> et <strong>Dimanche (08h-12h)</strong>.
        </p>

        {
    /* Global Statistics Bar */
  }
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Total Messages</span>
            <div className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">{sermons.length}</div>
            <span className="text-[10px] text-amber-800 font-semibold">Mercredi, Vendredi & Dimanche</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Vues Vidéos</span>
            <div className="text-xl sm:text-2xl font-black text-red-600 mt-0.5">{totalViews.toLocaleString()}</div>
            <span className="text-[10px] text-stone-500 font-semibold">Statistiques globales</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Écoutes Audios</span>
            <div className="text-xl sm:text-2xl font-black text-amber-700 mt-0.5">{totalListens.toLocaleString()}</div>
            <span className="text-[10px] text-stone-500 font-semibold">Fidèles édifiés</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Disponibilité</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5">100%</div>
            <span className="text-[10px] text-stone-500 font-semibold">Accès illimité</span>
          </div>
        </div>
      </div>

      {
    /* PRIMARY SECTION SELECTOR: PARTIE VIDÉO vs PARTIE AUDIO */
  }
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500">Choisir la Partie :</span>
            <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl">
              <button
    onClick={() => setActiveMediaSection("video")}
    className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-2 cursor-pointer ${activeMediaSection === "video" ? "bg-red-600 text-white shadow-md" : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/60"}`}
  >
                <Video className="w-4 h-4" />
                <span>Partie Vidéo ({sermons.length})</span>
              </button>

              <button
    onClick={() => setActiveMediaSection("audio")}
    className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center gap-2 cursor-pointer ${activeMediaSection === "audio" ? "bg-amber-600 text-white shadow-md" : "text-stone-700 hover:text-stone-950 hover:bg-stone-200/60"}`}
  >
                <Volume2 className="w-4 h-4" />
                <span>Partie Audio ({sermons.length})</span>
              </button>
            </div>
          </div>

          {
    /* Day Quick Filters */
  }
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-stone-500 mr-1">Filtrer jour :</span>
            <button
    onClick={() => setActiveDaySection("all")}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${activeDaySection === "all" ? "bg-stone-900 text-amber-300 shadow" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
  >
              Tous
            </button>
            <button
    onClick={() => setActiveDaySection("Mercredi")}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${activeDaySection === "Mercredi" ? "bg-amber-500 text-stone-950 shadow font-extrabold" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
  >
              Mercredi (18h-20h)
            </button>
            <button
    onClick={() => setActiveDaySection("Vendredi")}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${activeDaySection === "Vendredi" ? "bg-amber-500 text-stone-950 shadow font-extrabold" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
  >
              Vendredi (18h-20h)
            </button>
            <button
    onClick={() => setActiveDaySection("Dimanche")}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${activeDaySection === "Dimanche" ? "bg-amber-500 text-stone-950 shadow font-extrabold" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
  >
              Dimanche (08h-12h)
            </button>
          </div>
        </div>

        {
    /* Search Bar */
  }
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Rechercher par titre, orateur (Pasteur Didier Mbog, Rév. Anne Mbog...), passage biblique ou thème..."
    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
  />
        </div>
      </div>

      {
    /* SECTION DISPLAY ORGANIZED BY WORSHIP DAY (MERCREDI, VENDREDI, DIMANCHE) */
  }
      <div className="space-y-12">
        {daysList.filter((d) => activeDaySection === "all" || activeDaySection === d.id).map((dayGroup) => {
    const daySermons = getSermonsForDay(dayGroup.id);
    const DayIcon = dayGroup.icon;
    return <div key={dayGroup.id} className="space-y-6">
                {
      /* Day Header Banner */
    }
                <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 shadow-md">
                      <DayIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                          {dayGroup.title}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[11px] font-extrabold">
                          {dayGroup.time}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        {dayGroup.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl self-start sm:self-center">
                    {daySermons.length} message{daySermons.length > 1 ? "s" : ""} ({activeMediaSection === "video" ? "Vid\xE9os" : "Audios"})
                  </span>
                </div>

                {
      /* Sermons / Media Cards Grid for this day */
    }
                {daySermons.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {daySermons.map((sermon) => {
      const listenCount = sermon.listenCount || (sermon.viewsCount ? Math.round(sermon.viewsCount * 0.72) : 180);
      return <div
        key={sermon.id}
        className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
      >
                          <div>
                            {
        /* Card Visual Header with Direct Statistical Overlay */
      }
                            <div className="relative h-48 overflow-hidden bg-stone-950">
                              <img
        src={sermon.thumbnailUrl}
        alt={sermon.title}
        className="w-full h-full object-cover opacity-85"
        referrerPolicy="no-referrer"
      />
                              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                              {
        /* Format Badge */
      }
                              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                {activeMediaSection === "video" ? <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-extrabold text-[10px] flex items-center gap-1 shadow">
                                    <Video className="w-3 h-3" />
                                    <span>Replay Vidéo</span>
                                  </span> : <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-extrabold text-[10px] flex items-center gap-1 shadow">
                                    <Volume2 className="w-3 h-3" />
                                    <span>Message Audio MP3</span>
                                  </span>}
                                <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 text-stone-200 text-[10px] font-medium border border-stone-700">
                                  {sermon.date}
                                </span>
                              </div>

                              {
        /* Duration Badge */
      }
                              <div className="absolute top-3 right-3">
                                <span className="px-2.5 py-1 rounded-lg bg-stone-950/90 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                                  ⏱ {sermon.duration}
                                </span>
                              </div>

                              {
        /* Key Statistics Display on the Card */
      }
                              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center gap-1 text-amber-300 font-bold text-[11px] bg-stone-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                                    <Eye className="w-3 h-3" />
                                    <span>{(sermon.viewsCount || 240).toLocaleString()} vues</span>
                                  </span>
                                  <span className="flex items-center gap-1 text-amber-200 font-semibold text-[11px] bg-stone-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                                    <Headphones className="w-3 h-3" />
                                    <span>{listenCount.toLocaleString()} écoutes</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {
        /* Sermon Details & Meta */
      }
                            <div className="p-5 space-y-3">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                                Série : {sermon.series}
                              </span>

                              <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 leading-snug">
                                « {sermon.title} »
                              </h3>

                              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                                <p className="flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                  <span><strong className="text-stone-900">Orateur :</strong> {sermon.preacher}</span>
                                </p>
                                <p className="flex items-center gap-1.5">
                                  <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                  <span><strong className="text-stone-900">Passage :</strong> <span className="text-amber-800 font-semibold">{sermon.scripture}</span></span>
                                </p>
                                <p className="flex items-center gap-1.5">
                                  <Layers className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                  <span><strong className="text-stone-900">Thème :</strong> {sermon.theme}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {
        /* Statistics Action View (No unclosable external links) */
      }
                          <div className="p-5 pt-0">
                            <button
        onClick={() => setSelectedStatsSermon(sermon)}
        className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-amber-600 text-amber-300 hover:text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
      >
                              <BarChart2 className="w-4 h-4" />
                              <span>Consulter la fiche & statistiques</span>
                            </button>
                          </div>
                        </div>;
    })}
                  </div> : <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 text-xs text-stone-500">
                    Aucun message trouvé pour ce filtre.
                  </div>}
              </div>;
  })}
      </div>

      {
    /* STATISTICAL INFORMATION MODAL (CLEAN INTERNAL STATS & OVERVIEW) */
  }
      {selectedStatsSermon && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-stone-100">
            {
    /* Modal Header */
  }
            <div className="p-5 sm:p-6 border-b border-stone-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-wider">
                    {selectedStatsSermon.day} ({selectedStatsSermon.time})
                  </span>
                  <span className="text-xs text-amber-400 font-semibold">
                    {selectedStatsSermon.serviceType}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1.5">
                  « {selectedStatsSermon.title} »
                </h3>
              </div>
              <button
    onClick={() => setSelectedStatsSermon(null)}
    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            {
    /* Statistics Matrix */
  }
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700 text-center">
                  <Eye className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Vues Totales</span>
                  <strong className="text-white text-base">{(selectedStatsSermon.viewsCount || 280).toLocaleString()}</strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700 text-center">
                  <Headphones className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Écoutes Audio</span>
                  <strong className="text-white text-base">{(selectedStatsSermon.listenCount || 210).toLocaleString()}</strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700 text-center">
                  <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Durée</span>
                  <strong className="text-white text-base">{selectedStatsSermon.duration}</strong>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700 text-center">
                  <Calendar className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Date de Culte</span>
                  <strong className="text-white text-xs">{selectedStatsSermon.date}</strong>
                </div>
              </div>

              {
    /* Detailed Breakdown */
  }
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Prédicateur :</span>
                  <strong className="text-white">{selectedStatsSermon.preacher}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Passage biblique :</span>
                  <strong className="text-amber-300 font-bold">{selectedStatsSermon.scripture}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Thème doctrinal :</span>
                  <strong className="text-stone-200">{selectedStatsSermon.theme}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Série pastorale :</span>
                  <strong className="text-stone-200">{selectedStatsSermon.series}</strong>
                </div>
              </div>

              {
    /* Internal Actions */
  }
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
    onClick={() => handleDownloadPlan(selectedStatsSermon)}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
  >
                  <Download className="w-4 h-4" />
                  <span>Télécharger les notes bibliques (PDF)</span>
                </button>

                <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sanctuaire CPC Ngangue • Plain-pied</span>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  SermonsPublicView
};
