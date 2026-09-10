import { useChurch } from "../../context/ChurchContext";
import { Sparkles, Target, Compass, HeartHandshake, Lightbulb, Users } from "lucide-react";
const VisionMissionView = () => {
  const { setPublicPage } = useChurch();
  return <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider">
          <Target className="w-3.5 h-3.5 text-amber-700" /> Direction Stratégique
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Vision & Mission <span className="text-amber-700">CPC</span>
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          « Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit. » — Matthieu 28:19
        </p>
      </div>

      {
    /* Vision & Mission Cards */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-900 text-white border border-emerald-700/50 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Notre Vision 2030</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Bâtir une génération de croyants épanouis, affermis et influents
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Être une église de référence spirituelle, dynamique et missionnaire, qui rayonne par l'amour pratique de Christ dans notre ville, sur le continent et auprès de toutes les nations.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-stone-800 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Notre Mission Quotidienne</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Évangéliser, Discipuler, Équiper & Servir
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Accompagner chaque individu depuis la découverte de la foi jusqu'à la pleine maturité spirituelle, en activant les dons de chacun pour le service de l'humanité et la gloire de Dieu.
          </p>
        </div>
      </div>

      {
    /* 4 Piliers d'Action */
  }
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Piliers Opérationnels</span>
          <h2 className="font-display text-3xl font-bold text-stone-900 mt-1">Les 4 Piliers de l'Église CPC</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
    {
      num: "01",
      title: "C\xE9l\xE9bration & Adoration",
      desc: "Des cultes vivants et inspir\xE9s, centr\xE9s sur la saine doctrine biblique et la louange en esprit et en v\xE9rit\xE9.",
      icon: Sparkles
    },
    {
      num: "02",
      title: "Communion & Fraternit\xE9",
      desc: "Une int\xE9gration bienveillante au travers de nos 7 groupes de vie pour ne laisser personne isol\xE9.",
      icon: Users
    },
    {
      num: "03",
      title: "Discipulat & Formation",
      desc: "Des parcours d'enseignement biblique rigoureux, cours de bapt\xEAme, mentorat et \xE9cole du ciel pour les enfants.",
      icon: Lightbulb
    },
    {
      num: "04",
      title: "Action Sociale & Missions",
      desc: "Des actions concr\xE8tes de secours, distribution alimentaire, aide aux familles et soutien aux \xE9glises pionni\xE8res.",
      icon: HeartHandshake
    }
  ].map((pillar) => {
    const Icon = pillar.icon;
    return <div key={pillar.num} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-cinzel font-bold text-2xl text-stone-300">{pillar.num}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900">{pillar.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
              </div>;
  })}
        </div>
      </div>

      <div className="text-center pt-4">
        <button
    onClick={() => setPublicPage("Groupes")}
    className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition"
  >
          Découvrir les Groupes et s'engager →
        </button>
      </div>
    </div>;
};
export {
  VisionMissionView
};
