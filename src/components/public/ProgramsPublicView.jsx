import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Flame,
  BookOpen,
  Radio,
  CheckCircle2
} from "lucide-react";
const ProgramsPublicView = () => {
  const { programs, setPublicPage, navigateTo } = useChurch();
  const [selectedDayFilter, setSelectedDayFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const daysOfWeek = ["Mercredi", "Vendredi", "Samedi", "Dimanche"];
  const filteredPrograms = programs.filter((p) => {
    const matchDay = selectedDayFilter === "all" || p.day === selectedDayFilter;
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchDay && matchCat;
  });
  return <div className="space-y-14 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header Banner */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-emerald-700" /> Calendrier des Cultes & Réunions
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Programmes Hebdomadaires
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Venez adorer, prier et étudier la Parole de Dieu. Tous nos cultes principaux sont ouverts à tous sans inscription préalable.
        </p>
      </div>

      {
    /* Filter Tabs */
  }
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-stone-500 mr-1">Filtrer par jour :</span>
          <button
    onClick={() => setSelectedDayFilter("all")}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${selectedDayFilter === "all" ? "bg-emerald-800 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
  >
            Tous les jours
          </button>
          {daysOfWeek.map((day) => <button
    key={day}
    onClick={() => setSelectedDayFilter(day)}
    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${selectedDayFilter === day ? "bg-emerald-800 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
  >
              {day}
            </button>)}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-stone-500">Catégorie :</span>
          <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="p-2 rounded-xl border border-stone-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  >
            <option value="all">Toutes les catégories</option>
            <option value="Culte principal">Culte principal</option>
            <option value="Étude & Enseignement">Étude & Enseignement</option>
            <option value="Prière & Intercession">Prière & Intercession</option>
            <option value="Groupe & Département">Groupe & Département</option>
          </select>
        </div>
      </div>

      {
    /* Programs List */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((prog) => <div
    key={prog.id}
    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
  >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs">
                  {prog.day}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300/80 px-3 py-1 rounded-xl">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>{prog.startTime} – {prog.endTime}</span>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {prog.category}
                </span>
                <h3 className="font-display text-xl font-bold text-stone-900 leading-snug mt-0.5">
                  {prog.title}
                </h3>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mt-2 line-clamp-3">
                {prog.description}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-medium text-stone-800">{prog.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Prédicateur / Dirigeant : <strong>{prog.leader}</strong></span>
                </div>
                {prog.groupAffiliation && <div className="flex items-center gap-2 text-amber-800">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Département affilié : <strong>{prog.groupAffiliation}</strong></span>
                  </div>}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Accès libre & Gratuit
              </span>

              <button
    onClick={() => setPublicPage("Localisation")}
    className="font-bold text-emerald-800 hover:text-emerald-950 underline"
  >
                Plan d'accès →
              </button>
            </div>
          </div>)}
      </div>

      {
    /* 3 Pillars Summary Box */
  }
      <div className="bg-stone-900 rounded-3xl p-8 text-stone-100 border border-stone-800">
        <h3 className="font-display font-bold text-2xl text-white mb-4 text-center">
          Les 3 Rendez-vous Clés de la Semaine
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Mercredi soir (18h00 – 20h00)
            </div>
            <p className="font-bold text-white text-base">Étude Biblique Approfondie</p>
            <p className="text-stone-300 leading-relaxed">
              Pour s'enraciner dans les Saintes Écritures, comprendre les doctrines chrétiennes et grandir en discernement.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Vendredi soir (18h00 – 20h00)
            </div>
            <p className="font-bold text-white text-base">Prière Fervente & Délivrance</p>
            <p className="text-stone-300 leading-relaxed">
              Intercession pour les familles, brisement des liens, guérison des malades et requêtes de prière de la communauté.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 space-y-2">
            <div className="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
              <Radio className="w-4 h-4" /> Dimanche matin (08h00 – 12h00)
            </div>
            <p className="font-bold text-white text-base">Grand Culte de Célébration</p>
            <p className="text-stone-300 leading-relaxed">
              Grande louange avec les Rythmes Célestes, prédication inspirée, sainte cène et accueil chaleureux des visiteurs.
            </p>
          </div>
        </div>
      </div>

      {
    /* Calendrier Annuel des Grands Rendez-vous Spéciaux */
  }
      <div className="bg-gradient-to-br from-amber-500/10 via-white to-stone-50 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
            Calendrier Annuel • Rendez-vous Fixes & Spéciaux
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
            Veillées, Jeûnes & Grandes Campagnes de l'Année
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Consultez les dates solennelles inscrites au calendrier ecclésiastique de la Communauté pour Christ de Ngangue (Maison Blanche).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {
    /* 1. Tous les derniers vendredis du mois */
  }
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-[10px]">
                  RÉCURRENT MENSUEL
                </span>
                <span className="text-xs font-bold text-purple-700">21h00 – 05h00</span>
              </div>
              <h4 className="font-display font-bold text-lg text-stone-900">
                Jeûne & Grande Nuit de Prière
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Tous les derniers vendredis du mois :</strong> Nuit entière de louange, d'intercession prophétique, d'autorité spirituelle et de délivrance communautaire au Sanctuaire.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between font-semibold">
              <span>📍 Sanctuaire Principal</span>
              <span className="text-purple-700">Tous les mois</span>
            </div>
          </div>

          {
    /* 2. Chaque 1er Mai */
  }
          <div className="p-5 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px]">
                  ANNUEL FIXE
                </span>
                <span className="text-xs font-bold text-amber-700">08h00 – 16h00</span>
              </div>
              <h4 className="font-display font-bold text-lg text-stone-900">
                Jeûne & Prières pour Examens & Projets
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                <strong>Chaque 1er Mai :</strong> Journée spéciale de consécration, d'onction de sagesse et de prière pour la réussite aux examens, concours nationaux, recherche d'emploi et bénédiction des projets professionnels.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between font-semibold">
              <span>📍 Tous élèves & travailleurs</span>
              <span className="text-amber-800 font-bold">1er Mai</span>
            </div>
          </div>

          {
    /* 3. Campagne d'Évangélisation */
  }
          <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-extrabold text-[10px]">
                  GRAND ÉVÉNEMENT
                </span>
                <span className="text-xs font-bold text-amber-300">17h00 – 21h00</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                Campagne d'Évangélisation
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                <strong>Du 18 au 22 Novembre :</strong> Grande mission de salut en plein air au quartier Ngangué. Prédication de l'Évangile, prière pour les malades et distribution gratuite de Bibles.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-800 text-[11px] text-amber-300 flex items-center justify-between font-semibold">
              <span>📍 Esplanade Ngangué</span>
              <span className="text-white font-bold">18-22 Nov.</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export {
  ProgramsPublicView
};
