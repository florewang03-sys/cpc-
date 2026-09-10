import { useChurch } from "../../context/ChurchContext";
import { BookOpen, Heart, Sparkles, Globe } from "lucide-react";
const AboutView = () => {
  const { setPublicPage } = useChurch();
  return <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header Banner */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" /> Qui sommes-nous ?
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          À Propos de <span className="text-amber-800">CPC Ngangue</span>
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          La Communauté pour Christ de Ngangue est une assemblée évangélique vivante, fervente et engagée dans l'annonce de l'Évangile intégral de Jésus-Christ et la transformation des vies.
        </p>
      </div>

      {
    /* Section 1 : Notre Histoire */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">Fondation & Racines</span>
          <h2 className="font-display text-3xl font-bold text-stone-900">
            Une vision née de la prière et de la persévérance
          </h2>
          <p className="text-stone-700 text-sm leading-relaxed">
            Établie au cœur de New Bell Ngangué (lieu-dit Maison Blanche) à Douala, sous la conduite pastorale du Pasteur Didier Mbog assisté de la Rév. Doc. Anne Mbog, l'assemblée CPC est un sanctuaire de prière, de délivrance et de renouveau spirituel.
          </p>
          <p className="text-stone-700 text-sm leading-relaxed">
            Au fil des années, par la grâce divine, l'assemblée rassemble une communauté unie et engagée dans la louange, l'entraide fraternelle, l'évangélisation et l'édification de chaque génération.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
              <div className="font-display text-3xl font-bold text-amber-700">11+</div>
              <div className="text-[11px] text-stone-500 font-medium">Années de ministère</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
              <div className="font-display text-3xl font-bold text-stone-900">420+</div>
              <div className="text-[11px] text-stone-500 font-medium">Fidèles engagés</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
              <div className="font-display text-3xl font-bold text-amber-700">10</div>
              <div className="text-[11px] text-stone-500 font-medium">Départements actifs</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 aspect-[4/3] relative">
            <img
    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80"
    alt="Assemblée CPC en louange"
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
          </div>
        </div>
      </div>

      {
    /* Section 2 : Nos 4 Valeurs Fondamentales */
  }
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">L'ADN Spirituel</span>
          <h2 className="font-display text-3xl font-bold text-stone-900 mt-1">Nos Valeurs Clés</h2>
          <p className="text-stone-600 text-sm mt-1">Les principes immuables qui guident chacune de nos actions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
    {
      icon: BookOpen,
      title: "L'Autorit\xE9 des \xC9critures",
      desc: "La Sainte Bible comme seule et unique boussole pour notre foi, notre conduite et nos enseignements.",
      color: "text-amber-800 bg-amber-50"
    },
    {
      icon: Heart,
      title: "L'Amour Fraternel Inconditionnel",
      desc: "Accueillir chaque \xEAtre humain avec la dignit\xE9, la compassion et la bienveillance de Christ.",
      color: "text-rose-700 bg-rose-50"
    },
    {
      icon: Sparkles,
      title: "L'Onction & La Pri\xE8re",
      desc: "Rechercher constamment la pr\xE9sence manifeste et la puissance transformatrice du Saint-Esprit.",
      color: "text-amber-700 bg-amber-50"
    },
    {
      icon: Globe,
      title: "L'Excellence & L'Int\xE9grit\xE9",
      desc: "Servir Dieu et notre soci\xE9t\xE9 avec un standard \xE9lev\xE9 de transparence, de moralit\xE9 et de rigueur.",
      color: "text-stone-800 bg-stone-100"
    }
  ].map((val, idx) => {
    const Icon = val.icon;
    return <div
      key={idx}
      className="p-6 rounded-2xl bg-stone-50 border border-stone-100 space-y-3 hover:border-amber-300 transition-colors"
    >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${val.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">{val.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{val.desc}</p>
              </div>;
  })}
        </div>
      </div>

      {
    /* Section 3 : Notre Confession de Foi */
  }
      <div className="bg-stone-950 text-stone-100 rounded-3xl p-8 sm:p-12 border border-amber-900/30 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Doctrines & Croyances</span>
          <h2 className="font-display text-3xl font-bold mt-1 text-white">Ce que nous croyons</h2>
          <p className="text-stone-300 text-sm mt-1">Nos fondements doctrinaux bibliques.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-300">
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-base">Dieu Unique & Trinité Sainte</h4>
            <p className="text-xs leading-relaxed text-stone-400">
              Nous croyons en un seul Dieu éternellement existant en trois personnes : le Père, le Fils et le Saint-Esprit, Créateur de toutes choses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-base">Jésus-Christ Sauveur</h4>
            <p className="text-xs leading-relaxed text-stone-400">
              Nous croyons en la divinité de notre Seigneur Jésus-Christ, à Sa naissance virginale, à Sa mort expiatoire sur la croix, à Sa résurrection corporelle et à Son retour glorieux.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-base">Le Salut par la Grâce par la Foi</h4>
            <p className="text-xs leading-relaxed text-stone-400">
              Le salut est un don gratuit de Dieu, reçu uniquement par la repentance et la foi personnelle en l'œuvre rédemptrice de Jésus-Christ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
            <h4 className="font-bold text-amber-300 text-base">L'Action du Saint-Esprit</h4>
            <p className="text-xs leading-relaxed text-stone-400">
              Le Saint-Esprit régénère, sanctifie, console et accorde des dons spirituels aux croyants pour l'édification de l'Église et le témoignage dans le monde.
            </p>
          </div>
        </div>
      </div>

      {
    /* Call to Action */
  }
      <div className="text-center space-y-4 pt-4">
        <h3 className="font-display text-2xl font-bold text-stone-900">
          Rejoignez la grande famille de la foi à Ngangué
        </h3>
        <p className="text-stone-600 text-sm max-w-lg mx-auto">
          Venez vivre une expérience fraternelle et spirituelle profonde chaque dimanche à 08h00.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
    onClick={() => {
      setPublicPage("Programmes");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
  >
            Découvrir nos Cultes & Prières
          </button>
        </div>
      </div>
    </div>;
};
export {
  AboutView
};
