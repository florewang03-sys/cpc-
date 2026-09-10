import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import { ChurchLogo } from "../common/ChurchLogo";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Bell,
  Megaphone,
  User,
  LogOut,
  Globe,
  Shield,
  Menu,
  X,
  Search,
  CheckCircle2,
  Send,
  Plus,
  ArrowRight,
  UserCheck
} from "lucide-react";
const LeaderLayout = () => {
  const {
    currentUser,
    activeRole,
    groups,
    joinRequests,
    respondToJoinRequest,
    members,
    announcements,
    createAnnouncement,
    notifications,
    unreadNotificationsCount,
    setCurrentSpace,
    setPublicPage,
    logoutUser,
    showToast
  } = useChurch();
  const [activeTab, setActiveTab] = useState("Tableau de bord");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchMember, setSearchMember] = useState("");
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [announcementPriority, setAnnouncementPriority] = useState("normal");
  const leaderGroupName = (currentUser.groupName || "Jeunesse").toLowerCase();
  const myGroup = groups.find(
    (g) => g.name && g.name.toLowerCase() === leaderGroupName || g.slug && g.slug.toLowerCase().includes("youth")
  ) || groups[0];
  const pendingRequests = joinRequests.filter(
    (r) => r.groupId === myGroup?.id && r.status === "pending"
  );
  const groupMembers = members.filter(
    (m) => {
      if (!m.groupName) return false;
      const mGrp = m.groupName.toLowerCase();
      const myName = (myGroup?.name || "").toLowerCase();
      const mySlug = (myGroup?.slug || "").toLowerCase();
      return mGrp === myName || mGrp === mySlug || mGrp.includes("youth") || mGrp.includes("jeunesse");
    }
  );
  const filteredGroupMembers = groupMembers.filter((m) => {
    const q = (searchMember || "").trim().toLowerCase();
    return !q || m.fullName && m.fullName.toLowerCase().includes(q) || m.email && m.email.toLowerCase().includes(q) || m.phone && m.phone.includes(q);
  });
  const handleCreateGroupAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementContent.trim()) {
      showToast("Champs requis", "Veuillez renseigner le titre et le contenu.", "error");
      return;
    }
    createAnnouncement({
      title: announcementTitle,
      content: announcementContent,
      targetAudience: "group_members",
      targetGroupName: myGroup.name,
      priority: announcementPriority
    });
    setShowNewAnnouncementModal(false);
    setAnnouncementTitle("");
    setAnnouncementContent("");
    showToast(
      "Annonce diffus\xE9e",
      `Votre message a \xE9t\xE9 envoy\xE9 aux membres du groupe ${myGroup.name}.`,
      "success"
    );
  };
  const navItems = [
    { id: "Tableau de bord", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "Mon groupe", label: `Mon groupe (${myGroup.name})`, icon: Users },
    {
      id: "Demandes",
      label: "Demandes d'adh\xE9sion",
      icon: UserCheck,
      badge: pendingRequests.length > 0 ? `${pendingRequests.length}` : null,
      badgeColor: "bg-amber-500 text-stone-950 font-bold"
    },
    { id: "Membres", label: "Membres du groupe", icon: Users },
    { id: "Annonces", label: "Annonces du groupe", icon: Megaphone },
    {
      id: "Notifications",
      label: "Notifications",
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? `${unreadNotificationsCount}` : null,
      badgeColor: "bg-stone-700 text-amber-300"
    },
    { id: "Mon profil", label: "Mon profil", icon: User }
  ];
  return <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-stone-900 font-sans select-none">
      {
    /* =========================================================================
       LEFT SIDEBAR (LEADER PORTAL)
      ========================================================================= */
  }
      <aside className="hidden md:flex flex-col w-72 bg-stone-950 text-stone-300 border-r border-amber-900/30 shrink-0 sticky top-0 h-screen z-30 justify-between">
        <div className="p-5 space-y-6 overflow-y-auto no-scrollbar">
          {
    /* Brand */
  }
          <div className="space-y-2">
            <div
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="cursor-pointer group flex items-center"
  >
              <ChurchLogo size="sm" variant="dark" />
            </div>
            <div className="px-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-wider block text-center">
                Portail Leader • {myGroup.name}
              </span>
            </div>
          </div>

          {
    /* Navigation Links */
  }
          <nav className="space-y-1">
            {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      onClick={() => {
        setActiveTab(item.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition cursor-pointer ${isActive ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20" : "text-stone-300 hover:text-white hover:bg-stone-900"}`}
    >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-stone-950" : "text-amber-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className={`px-2 py-0.5 rounded-full text-[10px] ${item.badgeColor}`}>
                      {item.badge}
                    </span>}
                </button>;
  })}
          </nav>
        </div>

        {
    /* Sidebar Footer */
  }
        <div className="p-4 border-t border-stone-900 space-y-3 bg-stone-950">
          <div className="flex items-center gap-3 px-2 py-1">
            <img
    src={currentUser.avatarUrl}
    alt={currentUser.fullName}
    className="w-9 h-9 rounded-full object-cover border-2 border-amber-500"
  />
            <div className="truncate">
              <div className="text-xs font-bold text-stone-100 truncate">{currentUser.fullName}</div>
              <div className="text-[10px] text-amber-400 font-semibold truncate">
                Leader {myGroup.name}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-900 text-xs">
            <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-[11px] font-medium transition cursor-pointer"
  >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Site public</span>
            </button>
            <button
    onClick={logoutUser}
    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-[11px] font-medium transition cursor-pointer"
  >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {
    /* =========================================================================
       MOBILE HEADER
      ========================================================================= */
  }
      <div className="md:hidden bg-stone-950 text-white p-4 flex items-center justify-between border-b border-amber-900/30 sticky top-0 z-40">
        <ChurchLogo size="sm" variant="dark" />
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
            Leader {myGroup.name}
          </span>
          <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="p-2 rounded-xl bg-stone-900 text-stone-200"
  >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {
    /* Mobile Drawer Menu */
  }
      {sidebarOpen && <div className="md:hidden fixed inset-0 z-50 bg-stone-950/95 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <ChurchLogo size="sm" variant="dark" />
              <button
    onClick={() => setSidebarOpen(false)}
    className="p-2 rounded-xl bg-stone-900 text-stone-300"
  >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      onClick={() => {
        setActiveTab(item.id);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-bold ${isActive ? "bg-amber-500 text-stone-950" : "text-stone-300 bg-stone-900"}`}
    >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && <span className="px-2 py-0.5 rounded-full text-xs bg-amber-400 text-stone-950 font-bold">
                        {item.badge}
                      </span>}
                  </button>;
  })}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-stone-800">
            <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className="w-full py-3 rounded-2xl bg-stone-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-2"
  >
              <Globe className="w-4 h-4" />
              <span>Retour au site public</span>
            </button>
            <button
    onClick={logoutUser}
    className="w-full py-3 rounded-2xl bg-rose-950 text-rose-300 font-bold text-xs flex items-center justify-center gap-2"
  >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>}

      {
    /* =========================================================================
       MAIN CONTENT AREA
      ========================================================================= */
  }
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 space-y-8 max-w-6xl mx-auto w-full">
        {
    /* Tab 1: Tableau de bord */
  }
        {activeTab === "Tableau de bord" && <div className="space-y-8 animate-in fade-in duration-200">
            {
    /* Header banner */
  }
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 p-6 sm:p-8 rounded-3xl text-white border border-amber-900/30 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Shield className="w-4 h-4" /> Espace Responsable
                </div>
                <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                  Bonjour, {currentUser.fullName}
                </h1>
                <p className="text-stone-400 text-xs sm:text-sm">
                  Supervision du département <strong className="text-amber-300">{myGroup.name}</strong> • Réunion : {myGroup.meetingSchedule} ({myGroup.meetingTime}).
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
    onClick={() => setShowNewAnnouncementModal(true)}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
  >
                  <Megaphone className="w-4 h-4" />
                  <span>Publier une annonce</span>
                </button>
              </div>
            </div>

            {
    /* Metrics cards */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Membres du groupe</span>
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-stone-900">{myGroup.membersCount}</div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span>+4 ce mois-ci</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Demandes en attente</span>
                  <UserCheck className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-amber-600">{pendingRequests.length}</div>
                <div className="text-[11px] text-stone-500">
                  {pendingRequests.length > 0 ? "Validation requise" : "Aucune en attente"}
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Prochaine réunion</span>
                  <Calendar className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-lg font-bold text-stone-900 truncate">
                  {myGroup.meetingDay || "Samedi"}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold truncate">
                  {myGroup.meetingTime}
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Adjoint au leader</span>
                  <Shield className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-sm font-bold text-stone-900 truncate">
                  {myGroup.deputyLeader || "Non d\xE9sign\xE9"}
                </div>
                <div className="text-[11px] text-stone-500">Soutien & coordination</div>
              </div>
            </div>

            {
    /* Pending Requests Alert */
  }
            {pendingRequests.length > 0 && <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <UserCheck className="w-5 h-5 text-amber-700" />
                    <span>{pendingRequests.length} nouvelle(s) demande(s) d'intégration pour {myGroup.name}</span>
                  </div>
                  <button
    onClick={() => setActiveTab("Demandes")}
    className="text-xs font-bold text-amber-900 hover:text-amber-700 underline cursor-pointer"
  >
                    Tout examiner →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {pendingRequests.map((req) => <div
    key={req.id}
    className="bg-white p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
  >
                      <div>
                        <div className="text-xs font-bold text-stone-900">{req.userName}</div>
                        <div className="text-[11px] text-stone-500">{req.userEmail} • {req.date}</div>
                        {req.note && <div className="text-xs text-stone-600 italic mt-1 bg-stone-50 p-2 rounded-xl">
                            « {req.note} »
                          </div>}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
    onClick={() => respondToJoinRequest(req.id, false)}
    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition cursor-pointer"
  >
                          Refuser
                        </button>
                        <button
    onClick={() => respondToJoinRequest(req.id, true)}
    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition cursor-pointer"
  >
                          Accepter dans le groupe
                        </button>
                      </div>
                    </div>)}
                </div>
              </div>}

            {
    /* Group Overview card */
  }
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-stone-900">
                  Fiche du Département {myGroup.name}
                </h2>
                <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("GroupeDetail");
    }}
    className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
  >
                  <span>Voir la page publique</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-xs text-stone-600 leading-relaxed">
                    {myGroup.description}
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-700">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-600" />
                      <span>Leader : <strong className="text-stone-900">{myGroup.leader}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-stone-500" />
                      <span>Adjoint : <strong className="text-stone-900">{myGroup.deputyLeader}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>Horaires : <strong className="text-stone-900">{myGroup.meetingTime}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-stone-700 uppercase">Pôles et activités :</div>
                  <div className="flex flex-wrap gap-2">
                    {myGroup.activities.map((act, i) => <span
    key={i}
    className="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200"
  >
                        {act}
                      </span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>}

        {
    /* Tab 2: Mon groupe */
  }
        {activeTab === "Mon groupe" && <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-2xl font-bold text-stone-900">
                    Département {myGroup.name}
                  </h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Gestion des paramètres et informations publiques du groupe
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nom du groupe
                    </label>
                    <input
    type="text"
    disabled
    value={myGroup.name}
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-300 text-xs text-stone-800 font-semibold"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Leader officiel
                    </label>
                    <input
    type="text"
    disabled
    value={myGroup.leader}
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-300 text-xs text-stone-800"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Adjoint(e) désigné(e)
                    </label>
                    <input
    type="text"
    disabled
    value={myGroup.deputyLeader}
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-300 text-xs text-stone-800"
  />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Jour et heure de réunion
                    </label>
                    <input
    type="text"
    disabled
    value={myGroup.meetingTime}
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-300 text-xs text-stone-800 font-bold text-amber-800"
  />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nombre de membres enregistrés
                    </label>
                    <input
    type="text"
    disabled
    value={`${myGroup.membersCount} membres`}
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-100 border border-stone-300 text-xs text-stone-800"
  />
                  </div>
                </div>
              </div>
            </div>
          </div>}

        {
    /* Tab 3: Demandes d'adhésion */
  }
        {activeTab === "Demandes" && <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">
                  Demandes d'adhésion au groupe
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Validez ou refusez les demandes des fidèles souhaitant intégrer le département {myGroup.name}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6 space-y-4">
              {joinRequests.filter((r) => r.groupId === myGroup.id).length === 0 ? <div className="text-center py-12 text-stone-500 text-xs">
                  Aucune demande enregistrée pour ce groupe.
                </div> : <div className="space-y-3">
                  {joinRequests.filter((r) => r.groupId === myGroup.id).map((req) => <div
    key={req.id}
    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-stone-900">{req.userName}</span>
                            <span
    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${req.status === "accepted" ? "bg-emerald-100 text-emerald-800" : req.status === "rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"}`}
  >
                              {req.status === "accepted" ? "Accept\xE9" : req.status === "rejected" ? "Refus\xE9" : "En attente"}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {req.userEmail} • Demande envoyée le {req.date}
                          </div>
                          {req.note && <p className="text-xs text-stone-700 italic bg-white p-2 rounded-xl border border-stone-200 mt-1">
                              « {req.note} »
                            </p>}
                        </div>

                        {req.status === "pending" && <div className="flex items-center gap-2 shrink-0">
                            <button
    onClick={() => respondToJoinRequest(req.id, false)}
    className="px-3.5 py-2 rounded-xl bg-stone-200 hover:bg-rose-100 hover:text-rose-700 text-stone-700 text-xs font-semibold transition cursor-pointer"
  >
                              Refuser
                            </button>
                            <button
    onClick={() => respondToJoinRequest(req.id, true)}
    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition cursor-pointer"
  >
                              Valider l'adhésion
                            </button>
                          </div>}
                      </div>)}
                </div>}
            </div>
          </div>}

        {
    /* Tab 4: Membres du groupe */
  }
        {activeTab === "Membres" && <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">
                  Membres du Département ({groupMembers.length})
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Registre nominatif confidentiel accessible uniquement à l'encadrement du groupe
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
    type="text"
    value={searchMember}
    onChange={(e) => setSearchMember(e.target.value)}
    placeholder="Rechercher un membre..."
    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4 pl-6">Fidèle</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Statut Baptême</th>
                      <th className="p-4">Membre depuis</th>
                      <th className="p-4 text-right pr-6">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredGroupMembers.map((member) => <tr key={member.id} className="hover:bg-stone-50/80 transition">
                        <td className="p-4 pl-6 flex items-center gap-3">
                          <img
    src={member.avatarUrl}
    alt={member.fullName}
    className="w-8 h-8 rounded-full object-cover border border-stone-200"
  />
                          <div>
                            <div className="font-bold text-stone-900">{member.fullName}</div>
                            <div className="text-[11px] text-stone-500">{member.email}</div>
                          </div>
                        </td>
                        <td className="p-4 text-stone-600">{member.phone}</td>
                        <td className="p-4">
                          {member.isBaptized ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Baptisé(e)
                            </span> : <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-medium">
                              En préparation
                            </span>}
                        </td>
                        <td className="p-4 text-stone-500">{member.joinDate}</td>
                        <td className="p-4 text-right pr-6">
                          <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-semibold text-[11px]">
                            Actif
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}

        {
    /* Tab 5: Annonces du groupe */
  }
        {activeTab === "Annonces" && <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">
                  Annonces du Département
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Diffusez des communications ciblées aux membres de {myGroup.name}
                </p>
              </div>

              <button
    onClick={() => setShowNewAnnouncementModal(true)}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition flex items-center gap-2 cursor-pointer"
  >
                <Plus className="w-4 h-4" />
                <span>Créer une annonce</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements.filter(
    (a) => a.targetAudience === "all" || a.targetGroupName && myGroup?.name && a.targetGroupName.toLowerCase() === myGroup.name.toLowerCase()
  ).map((ann) => <div
    key={ann.id}
    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3"
  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                        {ann.targetAudience === "all" ? "Toute l'\xE9glise" : myGroup.name}
                      </span>
                      <span className="text-[11px] text-stone-400">{ann.date}</span>
                    </div>

                    <h3 className="font-bold text-stone-900 text-sm">{ann.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{ann.content}</p>

                    <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                      <span>Par {ann.author}</span>
                      <span className="text-amber-700 font-medium">Diffusé</span>
                    </div>
                  </div>)}
            </div>
          </div>}

        {
    /* Tab 6: Notifications */
  }
        {activeTab === "Notifications" && <div className="space-y-6 animate-in fade-in duration-200">
            <h1 className="font-display text-2xl font-bold text-stone-900">
              Notifications & Activité
            </h1>
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-3 shadow-sm">
              {notifications.map((notif) => <div
    key={notif.id}
    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3.5"
  >
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-xs text-stone-900">{notif.title}</div>
                    <p className="text-xs text-stone-600">{notif.message}</p>
                    <div className="text-[10px] text-stone-400">{notif.timeAgo}</div>
                  </div>
                </div>)}
            </div>
          </div>}

        {
    /* Tab 7: Mon profil */
  }
        {activeTab === "Mon profil" && <div className="space-y-6 animate-in fade-in duration-200">
            <h1 className="font-display text-2xl font-bold text-stone-900">Profil Responsable</h1>
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6 max-w-xl">
              <div className="flex items-center gap-4">
                <img
    src={currentUser.avatarUrl}
    alt={currentUser.fullName}
    className="w-16 h-16 rounded-full object-cover border-2 border-amber-500 shadow"
  />
                <div>
                  <h3 className="font-bold text-lg text-stone-900">{currentUser.fullName}</h3>
                  <div className="text-xs text-amber-700 font-bold">Leader • {myGroup.name}</div>
                  <div className="text-xs text-stone-500">{currentUser.email}</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100 text-xs">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Téléphone :</span>
                  <span className="font-bold text-stone-800">{currentUser.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Rôle système :</span>
                  <span className="font-bold text-amber-700">{currentUser.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Département affilié :</span>
                  <span className="font-bold text-stone-800">{myGroup.name}</span>
                </div>
              </div>
            </div>
          </div>}
      </main>

      {
    /* Modal: New Announcement */
  }
      {showNewAnnouncementModal && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="space-y-1">
              <div className="text-amber-700 font-bold text-xs uppercase flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5" /> Annonce Départementale
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Diffuser une annonce pour {myGroup.name}
              </h3>
            </div>

            <form onSubmit={handleCreateGroupAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Titre de l'annonce
                </label>
                <input
    type="text"
    value={announcementTitle}
    onChange={(e) => setAnnouncementTitle(e.target.value)}
    placeholder="Ex : Répétition générale ce samedi"
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Message / Détails
                </label>
                <textarea
    value={announcementContent}
    onChange={(e) => setAnnouncementContent(e.target.value)}
    placeholder="Contenu détaillé de la communication..."
    rows={4}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
  />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
    type="button"
    onClick={() => setShowNewAnnouncementModal(false)}
    className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition cursor-pointer"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
  >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publier l'annonce</span>
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  LeaderLayout
};
