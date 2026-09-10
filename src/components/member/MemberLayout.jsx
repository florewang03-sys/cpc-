import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import { ChurchLogo } from "../common/ChurchLogo";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Sparkles,
  Bell,
  Heart,
  Video,
  User,
  LogOut,
  Globe,
  Shield,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { MemberDashboard } from "./MemberDashboard";
import { MemberGroups } from "./MemberGroups";
import { MemberPrograms } from "./MemberPrograms";
import { MemberEvents } from "./MemberEvents";
import { MemberAnnouncements } from "./MemberAnnouncements";
import { MemberPrayers } from "./MemberPrayers";
import { MemberSermons } from "./MemberSermons";
import { MemberNotifications } from "./MemberNotifications";
import { MemberProfile } from "./MemberProfile";
const MemberLayout = () => {
  const {
    currentUser,
    activeRole,
    unreadNotificationsCount,
    setCurrentSpace,
    setPublicPage,
    setErpTab,
    logoutUser,
    showToast
  } = useChurch();
  const [activeTab, setActiveTab] = useState("Tableau de bord");
  const [selectedItemId, setSelectedItemId] = useState(void 0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = [
    { name: "Tableau de bord", icon: LayoutDashboard, route: "/app/dashboard" },
    { name: "Mes groupes", icon: Users, route: "/app/groups" },
    { name: "Programmes", icon: Calendar, route: "/app/programs" },
    { name: "\xC9v\xE9nements", icon: Sparkles, route: "/app/events" },
    { name: "Annonces", icon: Bell, route: "/app/announcements" },
    { name: "Demandes de pri\xE8re", icon: Heart, route: "/app/prayers" },
    { name: "Pr\xE9dications", icon: Video, route: "/app/sermons" },
    {
      name: "Notifications",
      icon: Bell,
      route: "/app/notifications",
      badge: unreadNotificationsCount
    },
    { name: "Mon profil", icon: User, route: "/app/profile" }
  ];
  const handleNavigateTab = (tab, itemId) => {
    setActiveTab(tab);
    setSelectedItemId(itemId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleLogout = () => {
    logoutUser();
    setCurrentSpace("public");
    setPublicPage("Accueil");
  };
  const currentNavItem = navItems.find((n) => n.name === activeTab) || navItems[0];
  const renderContent = () => {
    switch (activeTab) {
      case "Tableau de bord":
        return <MemberDashboard onNavigateTab={handleNavigateTab} />;
      case "Mes groupes":
        return <MemberGroups />;
      case "Programmes":
        return <MemberPrograms />;
      case "\xC9v\xE9nements":
        return <MemberEvents />;
      case "Annonces":
        return <MemberAnnouncements />;
      case "Demandes de pri\xE8re":
        return <MemberPrayers />;
      case "Pr\xE9dications":
        return <MemberSermons />;
      case "Notifications":
        return <MemberNotifications onNavigateTab={handleNavigateTab} />;
      case "Mon profil":
        return <MemberProfile />;
      default:
        return <MemberDashboard onNavigateTab={handleNavigateTab} />;
    }
  };
  return <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-stone-900 font-sans">
      {
    /* =========================================================================
       LEFT SIDEBAR (MEMBER SAAS)
      ========================================================================= */
  }
      {
    /* Desktop Sidebar */
  }
      <aside className="hidden md:flex flex-col w-72 bg-stone-950 text-stone-300 border-r border-amber-900/30 shrink-0 sticky top-[41px] h-[calc(100vh-41px)] z-30 justify-between">
        <div className="p-5 space-y-6 overflow-y-auto no-scrollbar">
          {
    /* Logo & Portal Brand */
  }
          <div className="space-y-1">
            <div
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="cursor-pointer group flex items-center"
  >
              <ChurchLogo size="sm" variant="dark" />
            </div>
            <div className="px-2 pt-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                Espace Fidèle & Ministères
              </span>
            </div>
          </div>

          {
    /* Navigation Links */
  }
          <nav className="space-y-1">
            {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.name;
    return <button
      key={item.name}
      onClick={() => handleNavigateTab(item.name)}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition cursor-pointer ${isActive ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20" : "text-stone-300 hover:text-white hover:bg-stone-900"}`}
    >
                  <div className="flex items-center gap-3">
                    <Icon
      className={`w-4 h-4 ${isActive ? "text-stone-950" : "text-amber-400"}`}
    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && item.badge > 0 ? <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isActive ? "bg-stone-950 text-amber-400" : "bg-amber-500 text-stone-950"}`}
    >
                      {item.badge}
                    </span> : null}
                </button>;
  })}
          </nav>
        </div>

        {
    /* Sidebar Footer: User Info & Space Switch */
  }
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 space-y-3">
          {
    /* User Profile Summary */
  }
          <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
    src={currentUser.avatarUrl}
    alt={currentUser.fullName}
    className="w-9 h-9 rounded-xl object-cover border border-amber-500/40 shrink-0"
  />
              <div className="min-w-0">
                <div className="font-bold text-xs text-stone-100 truncate">
                  {currentUser.fullName}
                </div>
                <div className="text-[10px] text-amber-400 font-semibold truncate">
                  {activeRole}
                </div>
              </div>
            </div>
            <button
    onClick={handleLogout}
    className="p-1.5 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-red-400 transition cursor-pointer"
    title="Déconnexion"
  >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {
    /* Quick Access to ERP if permitted */
  }
          {(activeRole === "Pasteur" || activeRole === "Pasteur principal" || activeRole === "Administrateur" || activeRole === "Leader principal") && <button
    onClick={() => {
      setCurrentSpace("erp");
      setErpTab("Tableau de bord");
    }}
    className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
  >
              <Shield className="w-3.5 h-3.5" />
              <span>Accéder au Back-Office ERP →</span>
            </button>}

          {
    /* Back to Public Site */
  }
          <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
  >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Voir le Site Public Vitrine</span>
          </button>
        </div>
      </aside>

      {
    /* Mobile Header for Member App */
  }
      <div className="md:hidden bg-stone-950 text-white border-b border-stone-800 p-4 sticky top-[41px] z-30 flex items-center justify-between">
        <ChurchLogo size="sm" variant="dark" />
        <div className="flex items-center gap-2">
          <button
    onClick={() => handleNavigateTab("Notifications")}
    className="p-2 rounded-xl bg-stone-900 text-amber-400 relative"
  >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[9px] font-bold flex items-center justify-center">
                {unreadNotificationsCount}
              </span>}
          </button>
          <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-2 rounded-xl bg-stone-900 text-stone-200"
  >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {
    /* Mobile Drawer */
  }
      {sidebarOpen && <div className="md:hidden fixed inset-0 top-[96px] z-40 bg-stone-950/95 p-6 overflow-y-auto space-y-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.name;
    return <button
      key={item.name}
      onClick={() => handleNavigateTab(item.name)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold ${isActive ? "bg-amber-500 text-stone-950 font-bold" : "text-stone-300"}`}
    >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && item.badge > 0 ? <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold">
                      {item.badge}
                    </span> : null}
                </button>;
  })}
          </nav>

          <div className="pt-4 border-t border-stone-800 space-y-2">
            <button
    onClick={handleLogout}
    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-950/60 border border-rose-800/40 text-rose-300 hover:text-white text-xs font-bold transition"
  >
              <LogOut className="w-4 h-4" />
              <span>Se déconnecter</span>
            </button>

            <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 text-stone-300 text-xs font-semibold"
  >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Retour au Site Public</span>
            </button>
          </div>
        </div>}

      {
    /* =========================================================================
       MAIN CONTENT AREA
      ========================================================================= */
  }
      <div className="flex-1 flex flex-col min-w-0">
        {
    /* Member Top Bar */
  }
        <header className="bg-white border-b border-stone-200 px-6 py-3.5 sticky top-[41px] z-20 hidden md:flex items-center justify-between gap-4">
          {
    /* Breadcrumbs & Route Path */
  }
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-stone-400">Espace Membre</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-extrabold text-stone-900">{activeTab}</span>
            <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-500 font-mono text-[10px] border border-stone-200">
              {currentNavItem.route}
            </span>
          </div>

          {
    /* Quick Actions & Notification Bell */
  }
          <div className="flex items-center gap-3">
            <button
    onClick={() => handleNavigateTab("Notifications")}
    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer relative"
    title="Notifications"
  >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[9px] font-extrabold flex items-center justify-center shadow">
                  {unreadNotificationsCount}
                </span>}
            </button>

            <button
    onClick={() => handleNavigateTab("Demandes de pri\xE8re")}
    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow flex items-center gap-1.5 transition cursor-pointer"
  >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Prière Rapide</span>
            </button>

            <button
    onClick={handleLogout}
    className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
    title="Déconnexion de l'espace membre"
  >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </header>

        {
    /* Render View Container */
  }
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
          {renderContent()}
        </main>
      </div>
    </div>;
};
export {
  MemberLayout
};
