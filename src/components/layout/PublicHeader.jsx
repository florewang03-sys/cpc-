import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import { ChurchLogo } from "../common/ChurchLogo";
import {
  Heart,
  Users,
  Sparkles,
  MapPin,
  ChevronDown,
  Menu,
  X,
  User,
  Shield,
  BookOpen,
  Flame,
  Clock,
  LogIn,
  LogOut,
  Music
} from "lucide-react";
const PublicHeader = () => {
  const {
    publicPage,
    setPublicPage,
    currentUser,
    activeRole,
    isAuthenticated,
    setCurrentSpace,
    logoutUser,
    openGroupDetail,
    groups
  } = useChurch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const handleNavClick = (page) => {
    setPublicPage(page);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleGoToUserSpace = () => {
    if (activeRole === "Membre") {
      setCurrentSpace("member");
    } else if (activeRole === "Leader de groupe" || activeRole === "Adjoint de groupe" || activeRole === "Leader principal") {
      setCurrentSpace("leader");
    } else if (activeRole === "Pasteur" || activeRole === "Pasteur principal") {
      setCurrentSpace("pastoral");
    } else if (activeRole === "Administrateur") {
      setCurrentSpace("erp");
    } else {
      setCurrentSpace("member");
    }
  };
  const getHeaderGroupIcon = (slug) => {
    switch (slug) {
      case "predication-enseignement":
        return { icon: BookOpen, color: "text-amber-400" };
      case "evangelisation":
        return { icon: Flame, color: "text-orange-400" };
      case "service-entretien":
        return { icon: Sparkles, color: "text-amber-300" };
      case "diaconat":
        return { icon: Shield, color: "text-emerald-400" };
      case "intercession":
        return { icon: Flame, color: "text-amber-500" };
      case "rythmes-celestes":
        return { icon: Music, color: "text-amber-300" };
      case "youth":
        return { icon: Users, color: "text-amber-500" };
      case "mens-ministry":
        return { icon: Users, color: "text-stone-300" };
      case "precious-pearls":
        return { icon: Sparkles, color: "text-amber-400" };
      case "school-of-heaven":
        return { icon: BookOpen, color: "text-amber-400" };
      default:
        return { icon: Users, color: "text-amber-400" };
    }
  };
  const groupItems = groups.map((g) => {
    const meta = getHeaderGroupIcon(g.slug);
    return {
      name: g.name,
      desc: g.subtitle || g.description,
      slug: g.slug,
      icon: meta.icon,
      color: meta.color
    };
  });
  return <header className="sticky top-0 z-40 bg-stone-950 text-stone-100 border-b border-amber-900/30 shadow-xl select-none">
      {
    /* Top Welcome & Church Banner */
  }
      <div className="bg-stone-900/95 border-b border-stone-800 text-[11px] text-stone-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-amber-300 font-serif italic font-semibold tracking-wide">
              ✦ Amour, Espérance et Foi
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Prochain Culte : Dimanche 08h00 – 12h00</span>
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>Sanctuaire Central de Ngangue</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <a
    href="https://www.youtube.com/@CommunautepourChrist"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-600/80 hover:bg-red-600 text-white text-[10px] font-bold transition"
    title="Chaîne YouTube Officielle"
  >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>YouTube</span>
              </a>
              <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="p-1 rounded bg-blue-600/80 hover:bg-blue-600 text-white text-[10px] font-bold transition"
    title="Page Facebook"
  >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
    href="https://tiktok.com"
    target="_blank"
    rel="noopener noreferrer"
    className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-white text-[10px] font-bold transition"
    title="Compte TikTok"
  >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
            <span className="text-stone-600">•</span>
            <button
    onClick={() => handleNavClick("Programmes")}
    className="text-stone-300 hover:text-amber-300 transition cursor-pointer"
  >
              Horaires des cultes
            </button>
            <span className="text-stone-600">•</span>
            <button
    onClick={() => handleNavClick("Contact")}
    className="text-stone-300 hover:text-amber-300 transition cursor-pointer"
  >
              Assistance Pastorale
            </button>
          </div>
        </div>
      </div>

      {
    /* Main Navigation Bar */
  }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {
    /* Logo & Identity */
  }
          <div
    onClick={() => handleNavClick("Accueil")}
    className="cursor-pointer group flex items-center py-2"
  >
            <ChurchLogo size="md" variant="dark" />
          </div>

          {
    /* Desktop Navigation Links */
  }
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-300">
            <button
    onClick={() => handleNavClick("Accueil")}
    className={`px-3 py-2 rounded-xl transition cursor-pointer ${publicPage === "Accueil" ? "text-amber-400 bg-stone-900 font-bold shadow-inner" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
              Accueil
            </button>

            {
    /* Dropdown: L'Église */
  }
            <div
    className="relative"
    onMouseEnter={() => setActiveDropdown("eglise")}
    onMouseLeave={() => setActiveDropdown(null)}
  >
              <button
    className={`flex items-center gap-1 px-3 py-2 rounded-xl transition cursor-pointer ${["\xC0 propos", "Vision et mission", "Leadership", "Localisation"].includes(publicPage) ? "text-amber-400 bg-stone-900 font-bold" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
                <span>L'Église</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === "eglise" && <div className="absolute top-full left-0 w-64 bg-stone-900 border border-amber-900/40 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
    onClick={() => handleNavClick("\xC0 propos")}
    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-stone-800 text-stone-200 hover:text-amber-300 transition flex items-center gap-2.5 cursor-pointer"
  >
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-stone-100">À propos de l'Église CPC</div>
                      <p className="text-[10px] text-stone-400">Histoire, fondements & valeurs</p>
                    </div>
                  </button>
                  <button
    onClick={() => handleNavClick("Vision et mission")}
    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-stone-800 text-stone-200 hover:text-amber-300 transition flex items-center gap-2.5 cursor-pointer"
  >
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-stone-100">Vision & Mission</div>
                      <p className="text-[10px] text-stone-400">Notre mandat spirituel</p>
                    </div>
                  </button>
                  <button
    onClick={() => handleNavClick("Leadership")}
    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-stone-800 text-stone-200 hover:text-amber-300 transition flex items-center gap-2.5 cursor-pointer"
  >
                    <Users className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-bold text-stone-100">Corps Pastoral & Anciens</div>
                      <p className="text-[10px] text-stone-400">Nos pasteurs et ministères</p>
                    </div>
                  </button>
                  <button
    onClick={() => handleNavClick("Localisation")}
    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-stone-800 text-stone-200 hover:text-amber-300 transition flex items-center gap-2.5 border-t border-stone-800/80 mt-1 pt-2 cursor-pointer"
  >
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="font-bold text-stone-100">Sanctuaire & Plan d'accès</div>
                      <p className="text-[10px] text-stone-400">Ngangue • Itinéraire & Transports</p>
                    </div>
                  </button>
                </div>}
            </div>

            {
    /* Dropdown: Départements */
  }
            <div
    className="relative"
    onMouseEnter={() => setActiveDropdown("groupes")}
    onMouseLeave={() => setActiveDropdown(null)}
  >
              <button
    onClick={() => handleNavClick("Groupes")}
    className={`flex items-center gap-1 px-3 py-2 rounded-xl transition cursor-pointer ${["Groupes", "GroupeDetail"].includes(publicPage) ? "text-amber-400 bg-stone-900 font-bold" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
                <span>Départements ({groupItems.length})</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === "groupes" && <div className="absolute top-full left-0 w-80 bg-stone-900 border border-amber-900/40 rounded-2xl shadow-2xl p-3 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-400/90 border-b border-stone-800 mb-1 flex items-center justify-between">
                    <span>Départements Ministériels</span>
                    <span className="text-[10px] text-amber-400 font-bold">CPC CONNECT</span>
                  </div>
                  <div className="space-y-1">
                    {groupItems.map((grp) => {
    const Icon = grp.icon;
    return <button
      key={grp.slug}
      onClick={() => openGroupDetail(grp.slug)}
      className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-800 text-stone-200 hover:text-amber-300 transition flex items-center justify-between group cursor-pointer"
    >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${grp.color}`} />
                            <div>
                              <div className="font-bold text-stone-100 group-hover:text-amber-400 transition">
                                {grp.name}
                              </div>
                              <p className="text-[10px] text-stone-400">{grp.desc}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-amber-500 opacity-0 group-hover:opacity-100 transition">
                            Voir →
                          </span>
                        </button>;
  })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-800">
                    <button
    onClick={() => handleNavClick("Groupes")}
    className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-center text-xs transition cursor-pointer"
  >
                      Explorer tous les {groupItems.length} départements →
                    </button>
                  </div>
                </div>}
            </div>

            <button
    onClick={() => handleNavClick("Programmes")}
    className={`px-3 py-2 rounded-xl transition cursor-pointer ${publicPage === "Programmes" ? "text-amber-400 bg-stone-900 font-bold" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
              Programmes & Cultes
            </button>

            <button
    onClick={() => handleNavClick("Pr\xE9dications")}
    className={`px-3 py-2 rounded-xl transition cursor-pointer ${publicPage === "Pr\xE9dications" ? "text-amber-400 bg-stone-900 font-bold" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
              Prédications
            </button>

            <button
    onClick={() => handleNavClick("\xC9v\xE9nements")}
    className={`px-3 py-2 rounded-xl transition cursor-pointer ${publicPage === "\xC9v\xE9nements" ? "text-amber-400 bg-stone-900 font-bold" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
              Événements
            </button>

            <button
    onClick={() => handleNavClick("T\xE9moignages")}
    className={`px-3 py-2 rounded-xl transition cursor-pointer ${publicPage === "T\xE9moignages" ? "text-amber-400 bg-stone-900 font-bold" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
              Témoignages
            </button>

            <button
    onClick={() => handleNavClick("Dons")}
    className={`px-3 py-2 rounded-xl transition font-bold flex items-center gap-1.5 cursor-pointer ${publicPage === "Dons" ? "text-amber-400 bg-stone-900" : "text-amber-300 hover:text-amber-200 hover:bg-stone-900/60"}`}
  >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Don</span>
            </button>

            <button
    onClick={() => handleNavClick("Contact")}
    className={`px-3 py-2 rounded-xl transition cursor-pointer ${publicPage === "Contact" ? "text-amber-400 bg-stone-900 font-bold" : "hover:text-amber-300 hover:bg-stone-900/60"}`}
  >
              Contact
            </button>
          </nav>

          {
    /* Right Action: Member Access / Login Button */
  }
          <div className="hidden sm:flex items-center gap-3">
            <button
    onClick={() => handleNavClick("Dons")}
    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
  >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Don</span>
            </button>

            {!isAuthenticated ? <button
    onClick={() => setCurrentSpace("connexion")}
    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-2 shadow transition cursor-pointer"
  >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Connexion</span>
              </button> : <div className="flex items-center gap-2">
                <button
    onClick={handleGoToUserSpace}
    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-extrabold flex items-center gap-2 shadow-md transition cursor-pointer"
  >
                  <img
    src={currentUser.avatarUrl}
    alt={currentUser.fullName}
    className="w-5 h-5 rounded-full object-cover border border-stone-950"
  />
                  <span>Mon Espace ({activeRole.split(" ")[0]}) →</span>
                </button>
                <button
    onClick={logoutUser}
    title="Déconnexion"
    className="p-2 rounded-xl bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-300 border border-stone-800 transition cursor-pointer"
  >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>}
          </div>

          {
    /* Mobile menu trigger */
  }
          <div className="flex lg:hidden items-center gap-2">
            {!isAuthenticated ? <button
    onClick={() => setCurrentSpace("connexion")}
    className="px-3 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1"
  >
                <LogIn className="w-3.5 h-3.5" />
                <span>Connexion</span>
              </button> : <button
    onClick={handleGoToUserSpace}
    className="p-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
  >
                <User className="w-4 h-4" />
              </button>}

            <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 transition cursor-pointer"
  >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {
    /* Mobile Drawer Menu */
  }
      {mobileMenuOpen && <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto text-sm space-y-3">
          <div className="space-y-1">
            <button
    onClick={() => handleNavClick("Accueil")}
    className={`w-full text-left px-3 py-2 rounded-xl font-semibold cursor-pointer ${publicPage === "Accueil" ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-300"}`}
  >
              Accueil
            </button>

            <div className="py-2 border-t border-b border-stone-800 my-2 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-3 block mb-1">
                L'Église CPC
              </span>
              <button
    onClick={() => handleNavClick("\xC0 propos")}
    className="w-full text-left px-3 py-1.5 text-stone-300 hover:text-white cursor-pointer"
  >
                À propos
              </button>
              <button
    onClick={() => handleNavClick("Vision et mission")}
    className="w-full text-left px-3 py-1.5 text-stone-300 hover:text-white cursor-pointer"
  >
                Vision & Mission
              </button>
              <button
    onClick={() => handleNavClick("Leadership")}
    className="w-full text-left px-3 py-1.5 text-stone-300 hover:text-white cursor-pointer"
  >
                Corps Pastoral & Leadership
              </button>
              <button
    onClick={() => handleNavClick("Localisation")}
    className="w-full text-left px-3 py-1.5 text-stone-300 hover:text-white cursor-pointer"
  >
                Localisation à Ngangue
              </button>
            </div>

            <div className="py-2 border-b border-stone-800 my-2 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-3 block mb-1">
                Départements Ministériels
              </span>
              {groupItems.map((grp) => <button
    key={grp.slug}
    onClick={() => {
      openGroupDetail(grp.slug);
      setMobileMenuOpen(false);
    }}
    className="w-full text-left px-3 py-1.5 text-stone-300 hover:text-white flex items-center justify-between cursor-pointer"
  >
                  <span>{grp.name}</span>
                  <span className="text-[10px] text-amber-400">{grp.desc}</span>
                </button>)}
            </div>

            <button
    onClick={() => handleNavClick("Programmes")}
    className="w-full text-left px-3 py-2 text-stone-300 hover:text-white cursor-pointer"
  >
              Programmes & Cultes
            </button>
            <button
    onClick={() => handleNavClick("Pr\xE9dications")}
    className="w-full text-left px-3 py-2 text-stone-300 hover:text-white cursor-pointer"
  >
              Prédications
            </button>
            <button
    onClick={() => handleNavClick("\xC9v\xE9nements")}
    className="w-full text-left px-3 py-2 text-stone-300 hover:text-white cursor-pointer"
  >
              Événements
            </button>
            <button
    onClick={() => handleNavClick("T\xE9moignages")}
    className="w-full text-left px-3 py-2 text-stone-300 hover:text-white cursor-pointer"
  >
              Témoignages
            </button>
            <button
    onClick={() => handleNavClick("Dons")}
    className="w-full text-left px-3 py-2 text-amber-300 font-bold hover:text-amber-200 cursor-pointer"
  >
              Don
            </button>
            <button
    onClick={() => handleNavClick("Contact")}
    className="w-full text-left px-3 py-2 text-stone-300 hover:text-white cursor-pointer"
  >
              Contact & Secrétariat
            </button>
          </div>

          <div className="pt-3 border-t border-stone-800 space-y-2">
            {!isAuthenticated ? <button
    onClick={() => {
      setCurrentSpace("connexion");
      setMobileMenuOpen(false);
    }}
    className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2"
  >
                <LogIn className="w-4 h-4" />
                <span>Se connecter à mon espace</span>
              </button> : <div className="space-y-2">
                <button
    onClick={() => {
      handleGoToUserSpace();
      setMobileMenuOpen(false);
    }}
    className="w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2"
  >
                  <User className="w-4 h-4" />
                  <span>Mon Espace ({activeRole})</span>
                </button>
                <button
    onClick={() => {
      logoutUser();
      setMobileMenuOpen(false);
    }}
    className="w-full py-2.5 rounded-xl bg-rose-950 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5"
  >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Déconnexion</span>
                </button>
              </div>}
          </div>
        </div>}
    </header>;
};
export {
  PublicHeader
};
