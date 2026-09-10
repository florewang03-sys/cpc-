import { useChurch } from "../../context/ChurchContext";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  ChevronRight,
  Sparkles,
  Lock
} from "lucide-react";
const PublicFooter = () => {
  const {
    setPublicPage,
    setCurrentSpace
  } = useChurch();
  const handleNav = (page) => {
    setPublicPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <footer className="bg-stone-950 text-stone-300 border-t border-amber-900/30 select-none">
      {
    /* Top Pre-Footer Call to Action banner */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border-b border-amber-900/40 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" /> Vous visitez pour la première fois ?
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-100">
              Vous avez une place de choix au sein de notre famille spirituelle.
            </h3>
            <p className="text-stone-400 text-sm mt-1 max-w-2xl">
              Rejoignez-nous ce dimanche à 08h00 pour un culte d'adoration, d'édification et de bénédiction dans la présence de Dieu au Sanctuaire de Ngangue.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
    onClick={() => handleNav("Localisation")}
    className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 font-semibold text-xs transition cursor-pointer"
  >
              Plan d'accès & Itinéraire
            </button>
            <button
    onClick={() => handleNav("Dons")}
    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg transition flex items-center gap-1.5 cursor-pointer"
  >
              <Heart className="w-4 h-4 fill-current" />
              Soutenir l'œuvre de Dieu
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {
    /* Col 1: Navigation du Site */
  }
          <div>
            <h4 className="font-bold text-stone-100 text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Navigation du Site
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
    { label: "Accueil", page: "Accueil" },
    { label: "\xC0 propos de l'\xE9glise", page: "\xC0 propos" },
    { label: "Vision & Mission 2026", page: "Vision et mission" },
    { label: "Corps Pastoral & Leadership", page: "Leadership" },
    { label: "D\xE9partements minist\xE9riels", page: "Groupes" },
    { label: "Horaires des cultes & pri\xE8res", page: "Programmes" },
    { label: "\xC9v\xE9nements", page: "\xC9v\xE9nements" },
    { label: "Pr\xE9dications & Archives Vid\xE9o", page: "Pr\xE9dications" }
  ].map((item) => <li key={item.page}>
                  <button
    onClick={() => handleNav(item.page)}
    className="hover:text-amber-300 transition flex items-center gap-1.5 text-stone-400 group cursor-pointer"
  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition" />
                    <span>{item.label}</span>
                  </button>
                </li>)}
            </ul>
          </div>

          {
    /* Col 2: Sanctuaire & Contact + Liens sociaux */
  }
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-stone-100 text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                Sanctuaire & Contact
              </h4>
              <div className="space-y-3.5 text-xs text-stone-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-100">Sanctuaire Central de Ngangue</div>
                    <div className="text-stone-300 font-medium">New Bell Ngangué, lieu-dit Maison Blanche</div>
                    <div className="text-stone-400 text-[11px]">Douala, Cameroun</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-stone-300">+237 690 00 00 00 / +237 670 00 00 00</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-stone-300">contact@cpc-connect.org</span>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-stone-800">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-100">Grand Culte Dominical</div>
                    <div className="text-amber-400 font-bold">Chaque Dimanche : 08h00 – 12h00</div>
                  </div>
                </div>
              </div>
            </div>

            {
    /* Social Media Links: Facebook, TikTok, YouTube */
  }
            <div className="pt-2">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">Suivez-nous en direct</div>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
    href="https://www.youtube.com/@CommunautepourChrist"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow"
    title="Chaîne YouTube Officielle"
  >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </a>

                <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow"
    title="Page Facebook"
  >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
    href="https://tiktok.com"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white border border-stone-700 text-xs font-bold transition shadow"
    title="Compte TikTok"
  >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {
    /* Copyright, Legal, and Discreet Admin Access */
  }
        <div className="mt-12 pt-6 border-t border-stone-900 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© {(/* @__PURE__ */ new Date()).getFullYear()} Communauté pour Christ (CPC).</span>
            <span className="text-amber-400/90 font-serif italic">« Amour, Espérance et Foi »</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span>Confidentialité</span>
            <span>•</span>
            <button
    onClick={() => setCurrentSpace("admin-login")}
    className="text-stone-500 hover:text-amber-400 transition flex items-center gap-1 cursor-pointer"
  >
              <Lock className="w-3 h-3" />
              <span>Accès Administration & Pastoral</span>
            </button>
            <span>•</span>
            <span className="text-amber-400 font-medium">CPC Connect v2.5</span>
          </div>
        </div>
      </div>
    </footer>;
};
export {
  PublicFooter
};
