import { useChurch } from "../../context/ChurchContext";
import { Shield, Sparkles } from "lucide-react";
const LeadershipView = () => {
  const { setPublicPage } = useChurch();
  const leaders = [
    {
      name: "Pasteur Didier Mbog",
      role: "Pasteur Principal & Visionnaire",
      bio: "Serviteur de Dieu d\xE9vou\xE9 \xE0 l'\xE9dification de l'\xC9glise du Seigneur, \xE0 la proclamation de l'\xC9vangile de gr\xE2ce et \xE0 la conduite spirituelle du Sanctuaire de Ngangue.",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&auto=format&fit=crop&q=80",
      email: "pasteur.didier@cpcn-ngangue.org"
    },
    {
      name: "R\xE9v. Doc. Anne Mbog",
      role: "Pasteure & Corps Pastoral",
      bio: "Engag\xE9e dans l'enseignement biblique approfondi, l'affermissement des familles, le r\xE9veil spirituel et l'accompagnement des femmes de foi.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
      email: "rev.anne@cpcn-ngangue.org"
    },
    {
      name: "Pasteur Andr\xE9 Kon\xE9",
      role: "Pasteur Enseignant & \xC9tudes Bibliques",
      bio: "Docteur en th\xE9ologie biblique, superviseur des cours de bapt\xEAme, des enseignements du mercredi et de la formation des disciples.",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=500&auto=format&fit=crop&q=80",
      email: "andre.kone@cpcn-ngangue.org"
    },
    {
      name: "Proph\xE8te \xC9lie Zadi",
      role: "Responsable de l'Intercession & Pri\xE8re",
      bio: "Sentinelle spirituelle sur les murailles de Sion, superviseur des veill\xE9es de d\xE9livrance, des cha\xEEnes de je\xFBne et du combat spirituel.",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=500&auto=format&fit=crop&q=80",
      email: "elie.zadi@cpcn-ngangue.org"
    },
    {
      name: "Marc-Antoine Traor\xE9",
      role: "Leader Principal & Minist\xE8re des Hommes",
      bio: "B\xE2tisseur de foyers chr\xE9tiens solides, animateur du r\xE9seau d'entraide et d'entrepreneuriat des Hommes d'Impact.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=80",
      email: "marc.traore@cpcn-ngangue.org"
    },
    {
      name: "Sarah N'Dri",
      role: "Pr\xE9sidente des Perles Pr\xE9cieuses",
      bio: "Femme de pri\xE8re et de vision, animatrice des ateliers d'autonomie f\xE9minine, des \u0153uvres caritatives et de l'entraide fraternelle.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80",
      email: "sarah.ndri@cpcn-ngangue.org"
    }
  ];
  return <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold text-xs uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-amber-700" /> Les Bergers & Conducteurs
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
          Notre Corps Pastoral & Leadership
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Des serviteurs et servantes de Dieu consacrés, appelés et qualifiés selon les Saintes Écritures pour paître le troupeau avec sagesse, amour et intégrité au Sanctuaire de Ngangue.
        </p>
      </div>

      {
    /* Grid of Leaders */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, idx) => <div
    key={idx}
    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
  >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
    src={leader.image}
    alt={leader.name}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    referrerPolicy="no-referrer"
  />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-stone-900/80 px-2.5 py-1 rounded-md">
                    {leader.role}
                  </span>
                  <h3 className="font-display text-xl font-bold mt-1 text-white">
                    {leader.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="text-amber-700 font-semibold">{leader.email}</span>
            </div>
          </div>)}
      </div>

      {
    /* Pastoral Contact Banner */
  }
      <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-12 text-center space-y-4">
        <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="font-display text-2xl sm:text-3xl font-bold">
          Besoin d'un Entretien Pastoral ou d'une Prière Spéciale ?
        </h3>
        <p className="text-stone-300 text-sm max-w-xl mx-auto">
          Nos pasteurs et conducteurs spirituels sont disponibles pour vous écouter, vous conseiller à la lumière de la Parole de Dieu et prier avec vous en toute confidentialité.
        </p>
        <div className="pt-2">
          <button
    onClick={() => {
      setPublicPage("Contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition cursor-pointer"
  >
            Prendre Rendez-vous Pastoral
          </button>
        </div>
      </div>
    </div>;
};
export {
  LeadershipView
};
