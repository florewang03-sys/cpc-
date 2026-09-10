import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import { ChurchLogo } from "../common/ChurchLogo";
import { ROLES_CONFIG } from "../../types";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Calendar,
  Sparkles,
  Megaphone,
  HeartHandshake,
  Video,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Globe,
  ArrowLeft
} from "lucide-react";
const ErpLayout = ({ children }) => {
  const {
    activeRole,
    erpTab,
    setErpTab,
    navigateTo,
    currentUser,
    joinRequests,
    prayerRequests,
    announcements,
    setCurrentSpace,
    setPublicPage,
    switchUser,
    allUsers
  } = useChurch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const pendingGroupRequestsCount = joinRequests.filter((r) => r.status === "pending").length;
  const activePrayerCount = prayerRequests.filter((p) => p.status === "active").length;
  const roleConfig = ROLES_CONFIG[activeRole];
  const getPortalInfo = () => {
    switch (activeRole) {
      case "Membre":
        return {
          title: "Espace Fid\xE8le & Vie de l'\xC9glise",
          roleBadge: "Membre Fid\xE8le",
          badgeStyle: "bg-stone-800 text-amber-300 border-amber-500/30"
        };
      case "Leader de groupe":
      case "Adjoint de groupe":
      case "Leader principal":
        return {
          title: `Portail Responsable \u2022 ${currentUser.groupName || "D\xE9partement"}`,
          roleBadge: "Leader de Groupe",
          badgeStyle: "bg-amber-950 text-amber-300 border-amber-600/50"
        };
      case "Pasteur":
      case "Pasteur principal":
        return {
          title: "Portail Pastoral & Spirituel",
          roleBadge: "Corps Pastoral",
          badgeStyle: "bg-amber-900 text-amber-200 border-amber-500"
        };
      case "Administrateur":
        return {
          title: "Portail d'Administration Globale",
          roleBadge: "Super Administrateur",
          badgeStyle: "bg-stone-900 text-amber-400 border-amber-500"
        };
      default:
        return {
          title: "Portail CPC Connect",
          roleBadge: activeRole,
          badgeStyle: "bg-stone-800 text-stone-200 border-stone-700"
        };
    }
  };
  const portalInfo = getPortalInfo();
  const getMenuItemsForRole = () => {
    if (activeRole === "Membre") {
      return [
        { id: "Tableau de bord", label: "Mon Espace Fid\xE8le", icon: LayoutDashboard },
        { id: "Groupes", label: `Mon Groupe (${currentUser.groupName || "Precious pearls"})`, icon: FolderKanban },
        { id: "Demandes de pri\xE8re", label: "Mes Requ\xEAtes de Pri\xE8re", icon: HeartHandshake, badge: `${activePrayerCount}`, badgeColor: "bg-amber-500 text-stone-950" },
        { id: "Dons", label: "Mes Dons & Re\xE7us Fiscaux", icon: DollarSign },
        { id: "\xC9v\xE9nements", label: "Calendrier & Inscriptions", icon: Sparkles },
        { id: "Annonces", label: "Annonces de l'\xC9glise", icon: Megaphone },
        { id: "Param\xE8tres", label: "Mon Profil & Coordonn\xE9es", icon: Settings }
      ];
    }
    if (activeRole === "Leader de groupe" || activeRole === "Adjoint de groupe") {
      return [
        { id: "Tableau de bord", label: "Tableau de bord Groupe", icon: LayoutDashboard },
        { id: "Groupes", label: `Gestion ${currentUser.groupName || "du Groupe"}`, icon: FolderKanban, badge: pendingGroupRequestsCount > 0 ? `${pendingGroupRequestsCount} en attente` : null, badgeColor: "bg-amber-500 text-stone-950" },
        { id: "Membres", label: "Membres de mon Groupe", icon: Users },
        { id: "Programmes", label: "R\xE9unions & Calendrier", icon: Calendar },
        { id: "Annonces", label: "Diffuser une Annonce", icon: Megaphone },
        { id: "Demandes de pri\xE8re", label: "Pri\xE8res du Groupe", icon: HeartHandshake }
      ];
    }
    if (activeRole === "Pasteur") {
      return [
        { id: "Tableau de bord", label: "Tableau de Bord Pastoral", icon: LayoutDashboard },
        { id: "Demandes de pri\xE8re", label: "Suivi Spirituel & Pri\xE8res", icon: HeartHandshake, badge: `${activePrayerCount} actives`, badgeColor: "bg-amber-500 text-stone-950" },
        { id: "M\xE9dias", label: "Pr\xE9dications & S\xE9ries", icon: Video },
        { id: "Membres", label: "Annuaire Pastoral des \xC2mes", icon: Users },
        { id: "Groupes", label: "Supervision des 6 Groupes", icon: FolderKanban },
        { id: "Programmes", label: "Planning des Cultes", icon: Calendar },
        { id: "Annonces", label: "Messages Pastoraux", icon: Megaphone }
      ];
    }
    return [
      { id: "Tableau de bord", label: "Tableau de Bord G\xE9n\xE9ral", icon: LayoutDashboard },
      { id: "Membres", label: "Base Membres Globale", icon: Users },
      { id: "Groupes", label: "Les 6 D\xE9partements", icon: FolderKanban, badge: pendingGroupRequestsCount > 0 ? `${pendingGroupRequestsCount} new` : null, badgeColor: "bg-amber-500 text-stone-950" },
      { id: "Programmes", label: "Programmes & Cultes", icon: Calendar },
      { id: "\xC9v\xE9nements", label: "\xC9v\xE9nements & Billetterie", icon: Sparkles },
      { id: "Annonces", label: "Diffusion d'Annonces", icon: Megaphone },
      { id: "Demandes de pri\xE8re", label: "Requ\xEAtes de Pri\xE8re", icon: HeartHandshake },
      { id: "M\xE9dias", label: "Pr\xE9dications & Replays", icon: Video },
      { id: "Dons", label: "Campagnes & Finances", icon: DollarSign },
      { id: "Rapports", label: "Rapports & Statistiques", icon: BarChart3 },
      { id: "Param\xE8tres", label: "Param\xE8tres & R\xF4les", icon: Settings }
    ];
  };
  const menuItems = getMenuItemsForRole();
  if (currentUser.id === "usr-visitor") {
    return <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4">
        <div className="bg-stone-950 border border-amber-900/40 rounded-3xl p-8 max-w-lg w-full text-center space-y-6 shadow-2xl">
          <ChurchLogo size="lg" variant="dark" className="justify-center" />
          
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-stone-100">
              Espace Membre & Administration
            </h2>
            <p className="text-xs text-stone-400 leading-relaxed">
              Vous êtes actuellement en mode <strong>Visiteur</strong>. Pour explorer l'application web avec les différents privilèges, sélectionnez l'un des profils de démonstration ci-dessous :
            </p>
          </div>

          <div className="space-y-2 text-left">
            <button
      onClick={() => {
        const user = allUsers.find((u) => u.id === "usr-4") || allUsers[0];
        switchUser(user);
      }}
      className="w-full p-3 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 hover:text-white transition flex items-center justify-between cursor-pointer"
    >
              <div className="flex items-center gap-3">
                <img src={allUsers.find((u) => u.id === "usr-4")?.avatarUrl} alt="Sarah" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold">Sarah N'Dri</div>
                  <div className="text-[10px] text-amber-400">Profil Membre (Precious pearls)</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button
      onClick={() => {
        const user = allUsers.find((u) => u.id === "usr-3") || allUsers[0];
        switchUser(user);
      }}
      className="w-full p-3 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 hover:text-white transition flex items-center justify-between cursor-pointer"
    >
              <div className="flex items-center gap-3">
                <img src={allUsers.find((u) => u.id === "usr-3")?.avatarUrl} alt="Samuel" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold">Samuel Diallo</div>
                  <div className="text-[10px] text-amber-400">Profil Leader (Youth)</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button
      onClick={() => {
        const user = allUsers.find((u) => u.id === "usr-2") || allUsers[0];
        switchUser(user);
      }}
      className="w-full p-3 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 hover:text-white transition flex items-center justify-between cursor-pointer"
    >
              <div className="flex items-center gap-3">
                <img src={allUsers.find((u) => u.id === "usr-2")?.avatarUrl} alt="Pasteur André" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold">Pasteur André Koné</div>
                  <div className="text-[10px] text-amber-400">Profil Pasteur (Suivi & Prédications)</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>

            <button
      onClick={() => {
        const user = allUsers.find((u) => u.id === "usr-6") || allUsers[0];
        switchUser(user);
      }}
      className="w-full p-3 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 hover:text-white transition flex items-center justify-between cursor-pointer"
    >
              <div className="flex items-center gap-3">
                <img src={allUsers.find((u) => u.id === "usr-6")?.avatarUrl} alt="Admin" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold">Alexandre Touré</div>
                  <div className="text-[10px] text-amber-400">Profil Administrateur Général</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </button>
          </div>

          <div className="pt-2">
            <button
      onClick={() => {
        setCurrentSpace("public");
        setPublicPage("Accueil");
      }}
      className="text-xs text-stone-400 hover:text-amber-400 transition flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
    >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retourner au Site Vitrine Public</span>
            </button>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col md:flex-row font-sans selection:bg-amber-500 selection:text-stone-950">
      {
    /* Mobile Portal Topbar */
  }
      <div className="md:hidden bg-stone-950 border-b border-stone-800 px-4 py-3 flex items-center justify-between sticky top-[41px] z-30">
        <ChurchLogo size="sm" variant="dark" />
        <button
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white"
  >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {
    /* Sidebar Navigation */
  }
      <aside
    className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-stone-950 border-r border-amber-900/30 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
        {
    /* Top Church Brand & Portal Banner */
  }
        <div className="p-5 border-b border-stone-800/80 space-y-4">
          <div
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="cursor-pointer group flex items-center"
    title="Cliquez pour voir le site web public"
  >
            <ChurchLogo size="md" variant="dark" />
          </div>

          {
    /* Current Portal Type Badge */
  }
          <div className="bg-stone-900/90 rounded-2xl p-3 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${portalInfo.badgeStyle}`}>
                {portalInfo.roleBadge}
              </span>
              <span className="text-[10px] text-stone-400">En ligne</span>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <img
    src={currentUser.avatarUrl}
    alt={currentUser.fullName}
    className="w-9 h-9 rounded-xl object-cover border border-amber-500/40"
  />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-stone-100 truncate">
                  {currentUser.fullName}
                </div>
                <div className="text-[10px] text-amber-400 truncate">
                  {currentUser.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {
    /* Dynamic Navigation Menu */
  }
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
            Navigation Dédiée
          </div>

          {menuItems.map((item) => {
    const Icon = item.icon;
    const isActive = erpTab === item.id;
    return <button
      key={item.id}
      onClick={() => {
        setErpTab(item.id);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${isActive ? "bg-amber-500 text-stone-950 font-bold shadow-md" : "text-stone-300 hover:text-white hover:bg-stone-900/80"}`}
    >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-stone-950" : "text-amber-400"}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${item.badgeColor || "bg-stone-800 text-stone-200"}`}>
                    {item.badge}
                  </span>}
              </button>;
  })}
        </div>

        {
    /* Sidebar Footer: Return to Public Site & Switch */
  }
        <div className="p-4 border-t border-stone-800/80 space-y-2 bg-stone-950">
          <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
  >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>← Revenir au Site Web</span>
          </button>

          <button
    onClick={() => {
      const visitor = allUsers.find((u) => u.id === "usr-visitor") || allUsers[0];
      switchUser(visitor);
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="w-full py-2 px-3 rounded-xl text-stone-400 hover:text-stone-200 text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer"
  >
            <LogOut className="w-3 h-3" />
            <span>Se déconnecter (Mode Visiteur)</span>
          </button>
        </div>
      </aside>

      {
    /* Main Workspace Area */
  }
      <main className="flex-1 flex flex-col min-w-0 bg-stone-100 text-stone-900">
        {
    /* App Topbar Header */
  }
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm sticky top-[41px] z-20">
          <div className="space-y-0.5">
            <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wide">
              {portalInfo.title}
            </div>
            <h1 className="font-display text-2xl font-extrabold text-stone-900">
              {erpTab}
            </h1>
          </div>

          {
    /* Quick Context Tools */
  }
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-stone-500">
              Connecté en tant que <strong className="text-stone-900 ml-1">{currentUser.fullName}</strong>
            </span>

            <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
  >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Voir le Site Public</span>
            </button>
          </div>
        </header>

        {
    /* Body Content */
  }
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>;
};
export {
  ErpLayout
};
