import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import { ChurchLogo } from "../common/ChurchLogo";
import {
  LayoutDashboard,
  Heart,
  BookOpen,
  Users,
  Megaphone,
  User,
  LogOut,
  Globe,
  Shield,
  Menu,
  X,
  Lock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Send,
  Plus
} from "lucide-react";
const PastoralLayout = () => {
  const {
    currentUser,
    prayerRequests,
    incrementPrayedCount,
    sermons,
    addSermon,
    members,
    announcements,
    createAnnouncement,
    setCurrentSpace,
    setPublicPage,
    logoutUser,
    showToast
  } = useChurch();
  const [activeTab, setActiveTab] = useState("Tableau de bord");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prayerFilter, setPrayerFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSermonModal, setShowSermonModal] = useState(false);
  const [sermonTitle, setSermonTitle] = useState("");
  const [sermonPreacher, setSermonPreacher] = useState(currentUser.fullName || "Pasteur Didier Mbog");
  const [sermonDay, setSermonDay] = useState("Dimanche");
  const [sermonPassage, setSermonPassage] = useState("");
  const [sermonSeries, setSermonSeries] = useState("La Puissance du Saint-Esprit");
  const [sermonTheme, setSermonTheme] = useState("Foi & Victoire");
  const [sermonDuration, setSermonDuration] = useState("1h 20m");
  const [sermonDescription, setSermonDescription] = useState("");
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceContent, setAnnounceContent] = useState("");
  const confidentialPrayers = prayerRequests.filter(
    (p) => p.confidentiality === "CONFIDENTIEL" || p.confidentiality === "pastoral_only"
  );
  const urgentPrayers = prayerRequests.filter((p) => p.isUrgent);
  const filteredPrayers = prayerRequests.filter((p) => {
    if (prayerFilter === "pastoral_only") {
      return p.confidentiality === "CONFIDENTIEL" || p.confidentiality === "pastoral_only";
    }
    if (prayerFilter === "urgent") return p.isUrgent;
    return true;
  });
  const handleAddSermon = (e) => {
    e.preventDefault();
    if (!sermonTitle.trim() || !sermonPassage.trim()) {
      showToast("Champs requis", "Veuillez renseigner le titre et le passage biblique.", "error");
      return;
    }
    const timeMap = {
      Mercredi: "18h00 \u2013 20h00",
      Vendredi: "18h00 \u2013 20h00",
      Dimanche: "08h00 \u2013 12h00"
    };
    const serviceTypeMap = {
      Mercredi: "\xC9tude Biblique & Enseignement",
      Vendredi: "Pri\xE8re, D\xE9livrance & Nuit de Pri\xE8re",
      Dimanche: "Grand Culte Dominical"
    };
    addSermon({
      title: sermonTitle,
      preacher: sermonPreacher,
      series: sermonSeries || "Enseignements G\xE9n\xE9raux",
      theme: sermonTheme || "Foi et Victoire",
      scripture: sermonPassage,
      day: sermonDay,
      time: timeMap[sermonDay],
      serviceType: serviceTypeMap[sermonDay],
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
      duration: sermonDuration || "1h 15m",
      videoUrl: "https://www.youtube.com",
      audioUrl: "#",
      thumbnailUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600&auto=format&fit=crop&q=80"
    });
    setShowSermonModal(false);
    setSermonTitle("");
    setSermonPassage("");
    setSermonDescription("");
    showToast("Pr\xE9dication ajout\xE9e", "Le message est maintenant disponible dans la m\xE9diath\xE8que publique.", "success");
  };
  const handleCreatePastoralAnnouncement = (e) => {
    e.preventDefault();
    if (!announceTitle.trim() || !announceContent.trim()) {
      showToast("Champs requis", "Veuillez remplir le titre et le message.", "error");
      return;
    }
    createAnnouncement({
      title: announceTitle,
      content: announceContent,
      targetAudience: "all",
      priority: "urgent"
    });
    setShowAnnounceModal(false);
    setAnnounceTitle("");
    setAnnounceContent("");
    showToast("Message pastoral diffus\xE9", "Votre message a \xE9t\xE9 transmis \xE0 l'ensemble de l'assembl\xE9e.", "success");
  };
  const navItems = [
    { id: "Tableau de bord", label: "Tableau de bord", icon: LayoutDashboard },
    {
      id: "Pri\xE8res",
      label: "Demandes de pri\xE8re",
      icon: Heart,
      badge: confidentialPrayers.length > 0 ? `${confidentialPrayers.length} secr\xE8tes` : null,
      badgeColor: "bg-rose-500 text-white font-bold"
    },
    { id: "Cultes", label: "Pr\xE9dications & Cultes", icon: BookOpen },
    { id: "Fid\xE8les", label: "Suivi Spirituel & Bapt\xEAmes", icon: Users },
    { id: "Annonces", label: "Annonces Pastorales", icon: Megaphone },
    { id: "Mon profil", label: "Mon profil", icon: User }
  ];
  return <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row text-stone-900 font-sans select-none">
      {
    /* Left Sidebar */
  }
      <aside className="hidden md:flex flex-col w-72 bg-stone-950 text-stone-300 border-r border-amber-900/40 shrink-0 sticky top-0 h-screen z-30 justify-between">
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
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase tracking-wider block text-center">
                Espace Pastoral • CPC Ngangué
              </span>
            </div>
          </div>

          {
    /* Navigation items */
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
    className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500"
  />
            <div className="truncate">
              <div className="text-xs font-bold text-stone-100 truncate">{currentUser.fullName}</div>
              <div className="text-[10px] text-emerald-400 font-semibold truncate">
                Pasteur Principal
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
    /* Mobile Header */
  }
      <div className="md:hidden bg-stone-950 text-white p-4 flex items-center justify-between border-b border-amber-900/30 sticky top-0 z-40">
        <ChurchLogo size="sm" variant="dark" />
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
            Pasteur Principal
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
    /* Mobile Drawer */
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
    /* Main Content Area */
  }
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 space-y-8 max-w-6xl mx-auto w-full">
        {
    /* Tab 1: Dashboard */
  }
        {activeTab === "Tableau de bord" && <div className="space-y-8 animate-in fade-in duration-200">
            {
    /* Header banner */
  }
            <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 p-6 sm:p-8 rounded-3xl text-white border border-amber-900/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Shield className="w-4 h-4" /> Conseil Pastoral & Ministère
                </div>
                <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                  Paix et Grâce, {currentUser.fullName}
                </h1>
                <p className="text-stone-400 text-xs sm:text-sm">
                  Vision spirituelle, intercession pour les âmes et direction doctrinale de l'Église CPC Ngangué.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
    onClick={() => setShowSermonModal(true)}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition flex items-center gap-2 cursor-pointer"
  >
                  <BookOpen className="w-4 h-4" />
                  <span>Publier une prédication</span>
                </button>
              </div>
            </div>

            {
    /* Metrics cards */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Requêtes de prière</span>
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-3xl font-black text-stone-900">{prayerRequests.length}</div>
                <div className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>{confidentialPrayers.length} strictement pastorales</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Prédications en ligne</span>
                  <BookOpen className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-stone-900">{sermons.length}</div>
                <div className="text-[11px] text-stone-500">Médias audio & vidéo</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Fidèles baptisés</span>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-600">
                  {members.filter((m) => m.isBaptized).length}
                </div>
                <div className="text-[11px] text-stone-500">Sur {members.length} enregistrés</div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-stone-500 text-xs font-bold">
                  <span>Prochain culte</span>
                  <Calendar className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-base font-bold text-stone-900">Dimanche 09h00</div>
                <div className="text-[11px] text-amber-800 font-semibold">Culte d'adoration & louange</div>
              </div>
            </div>

            {
    /* Confidential Prayer Requests Alert */
  }
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
                    <Lock className="w-4 h-4" /> Secret Pastoral Garanti
                  </div>
                  <h2 className="font-display text-xl font-bold text-stone-900 mt-1">
                    Dernières requêtes soumises au pasteur
                  </h2>
                </div>
                <button
    onClick={() => setActiveTab("Pri\xE8res")}
    className="text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
  >
                  Toutes les requêtes ({prayerRequests.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {prayerRequests.slice(0, 3).map((prayer) => <div
    key={prayer.id}
    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900">{prayer.title}</span>
                        {prayer.confidentiality === "pastoral_only" && <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-extrabold flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Confidentiel Pasteur
                          </span>}
                        {prayer.isUrgent && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            Urgent
                          </span>}
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-2">{prayer.content}</p>
                      <div className="text-[11px] text-stone-400">
                        Par {prayer.isAnonymous ? "Anonyme" : prayer.authorName} • {prayer.date}
                      </div>
                    </div>

                    <button
    onClick={() => incrementPrayedCount(prayer.id)}
    className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-900 font-bold text-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer"
  >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>Prier ({prayer.prayedCount})</span>
                    </button>
                  </div>)}
              </div>
            </div>
          </div>}

        {
    /* Tab 2: Prières */
  }
        {activeTab === "Pri\xE8res" && <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">
                  Ministère d'Intercession & Prière
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Accès exclusif aux requêtes publiques, de groupes et strictement confidentielles
                </p>
              </div>

              {
    /* Filters */
  }
              <div className="flex items-center gap-2">
                <button
    onClick={() => setPrayerFilter("all")}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${prayerFilter === "all" ? "bg-amber-600 text-white" : "bg-white border border-stone-200 text-stone-700"}`}
  >
                  Toutes ({prayerRequests.length})
                </button>
                <button
    onClick={() => setPrayerFilter("pastoral_only")}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${prayerFilter === "pastoral_only" ? "bg-rose-600 text-white" : "bg-white border border-stone-200 text-stone-700"}`}
  >
                  🔒 Confidentielles ({confidentialPrayers.length})
                </button>
                <button
    onClick={() => setPrayerFilter("urgent")}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${prayerFilter === "urgent" ? "bg-amber-600 text-white" : "bg-white border border-stone-200 text-stone-700"}`}
  >
                  Urgentes ({urgentPrayers.length})
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredPrayers.map((prayer) => <div
    key={prayer.id}
    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3"
  >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-stone-900 text-sm">{prayer.title}</h3>
                      {prayer.confidentiality === "CONFIDENTIEL" || prayer.confidentiality === "pastoral_only" ? <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-extrabold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Secret Pastoral (Pasteur Principal)
                        </span> : prayer.confidentiality === "INTERCESSION" ? <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                          🛡️ Intercession
                        </span> : <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                          Publique
                        </span>}
                      {prayer.isUrgent && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                          Urgent
                        </span>}
                    </div>
                    <span className="text-[11px] text-stone-400">{prayer.date}</span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    {prayer.content}
                  </p>

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <div className="text-stone-500 text-[11px]">
                      Demandé par : <strong className="text-stone-800">{prayer.isAnonymous ? "Anonyme (Fid\xE8le)" : prayer.authorName}</strong>
                    </div>

                    <button
    onClick={() => incrementPrayedCount(prayer.id)}
    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition flex items-center gap-2 cursor-pointer"
  >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>J'ai prié ({prayer.prayedCount})</span>
                    </button>
                  </div>
                </div>)}
            </div>
          </div>}

        {
    /* Tab 3: Cultes & Prédications */
  }
        {activeTab === "Cultes" && <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">
                  Prédications & Enseignements
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Gestion des messages bibliques audios et vidéos diffusés sur le site public
                </p>
              </div>

              <button
    onClick={() => setShowSermonModal(true)}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition flex items-center gap-2 cursor-pointer"
  >
                <Plus className="w-4 h-4" />
                <span>Nouvelle prédication</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sermons.map((sermon) => <div
    key={sermon.id}
    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between"
  >
                  <div className="relative h-40 overflow-hidden bg-stone-900">
                    <img
    src={sermon.thumbnailUrl}
    alt={sermon.title}
    className="w-full h-full object-cover opacity-80"
  />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[10px] font-bold uppercase">
                        {sermon.category}
                      </span>
                      <h3 className="font-bold text-sm mt-1">{sermon.title}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Prédicateur : <strong>{sermon.preacher}</strong></span>
                      <span>{sermon.date}</span>
                    </div>
                    <div className="text-xs font-semibold text-amber-800">
                      Passage : {sermon.passage}
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-2">{sermon.description}</p>
                  </div>
                </div>)}
            </div>
          </div>}

        {
    /* Tab 4: Suivi spirituel & Baptêmes */
  }
        {activeTab === "Fid\xE8les" && <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h1 className="font-display text-2xl font-bold text-stone-900">
                Suivi Spirituel de l'Assemblée ({members.length} fidèles)
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Registre pastoral des baptêmes, départements et parcours de foi
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4 pl-6">Fidèle</th>
                      <th className="p-4">Département</th>
                      <th className="p-4">Statut Baptême</th>
                      <th className="p-4">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {members.map((m) => <tr key={m.id} className="hover:bg-stone-50 transition">
                        <td className="p-4 pl-6 flex items-center gap-3">
                          <img
    src={m.avatarUrl}
    alt={m.fullName}
    className="w-8 h-8 rounded-full object-cover border border-stone-200"
  />
                          <div>
                            <div className="font-bold text-stone-900">{m.fullName}</div>
                            <div className="text-[11px] text-stone-500">{m.email}</div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-stone-700">{m.groupName}</td>
                        <td className="p-4">
                          {m.isBaptized ? <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Baptisé(e)
                            </span> : <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-medium">
                              En préparation
                            </span>}
                        </td>
                        <td className="p-4 text-stone-600">{m.phone}</td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>}

        {
    /* Tab 5: Annonces Pastorales */
  }
        {activeTab === "Annonces" && <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-stone-900">
                  Annonces & Messages Pastoraux
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Directives et exhortations solennelles adressées à l'ensemble du peuple de Dieu
                </p>
              </div>

              <button
    onClick={() => setShowAnnounceModal(true)}
    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition flex items-center gap-2 cursor-pointer"
  >
                <Plus className="w-4 h-4" />
                <span>Publier un message pastoral</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {announcements.map((ann) => <div
    key={ann.id}
    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3"
  >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-[10px] uppercase">
                      Message Pastoral
                    </span>
                    <span className="text-[11px] text-stone-400">{ann.date}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm">{ann.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{ann.content}</p>

                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                    <span>Auteur : {ann.author}</span>
                    <span className="text-emerald-700 font-medium">Actif</span>
                  </div>
                </div>)}
            </div>
          </div>}

        {
    /* Tab 6: Mon profil */
  }
        {activeTab === "Mon profil" && <div className="space-y-6 animate-in fade-in duration-200">
            <h1 className="font-display text-2xl font-bold text-stone-900">Profil Pastoral</h1>
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6 max-w-xl">
              <div className="flex items-center gap-4">
                <img
    src={currentUser.avatarUrl}
    alt={currentUser.fullName}
    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow"
  />
                <div>
                  <h3 className="font-bold text-lg text-stone-900">{currentUser.fullName}</h3>
                  <div className="text-xs text-emerald-700 font-bold">Pasteur Principal</div>
                  <div className="text-xs text-stone-500">{currentUser.email}</div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100 text-xs">
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Téléphone :</span>
                  <span className="font-bold text-stone-800">{currentUser.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Statut ecclésial :</span>
                  <span className="font-bold text-emerald-700">Pasteur Consacré</span>
                </div>
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Paroisse :</span>
                  <span className="font-bold text-stone-800">CPC — Communauté pour Christ de Ngangué</span>
                </div>
              </div>
            </div>
          </div>}
      </main>

      {
    /* Modal: New Sermon */
  }
      {showSermonModal && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="space-y-1">
              <div className="text-amber-700 font-bold text-xs uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Chaire Pastorale
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Publier une nouvelle prédication
              </h3>
            </div>

            <form onSubmit={handleAddSermon} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Titre de la prédication</label>
                <input
    type="text"
    value={sermonTitle}
    onChange={(e) => setSermonTitle(e.target.value)}
    placeholder="Ex : La puissance de la foi inébranlable"
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Prédicateur</label>
                  <input
    type="text"
    value={sermonPreacher}
    onChange={(e) => setSermonPreacher(e.target.value)}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Passage biblique</label>
                  <input
    type="text"
    value={sermonPassage}
    onChange={(e) => setSermonPassage(e.target.value)}
    placeholder="Ex : Hébreux 11:1-6"
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Jour du Culte</label>
                  <select
    value={sermonDay}
    onChange={(e) => setSermonDay(e.target.value)}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
  >
                    <option value="Mercredi">Mercredi (18h-20h) • Enseignement</option>
                    <option value="Vendredi">Vendredi (18h-20h) • Prière & Délivrance</option>
                    <option value="Dimanche">Dimanche (08h-12h) • Grand Culte</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Durée estimée</label>
                  <input
    type="text"
    value={sermonDuration}
    onChange={(e) => setSermonDuration(e.target.value)}
    placeholder="Ex: 1h 20m"
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Série d'enseignements</label>
                  <input
    type="text"
    value={sermonSeries}
    onChange={(e) => setSermonSeries(e.target.value)}
    placeholder="Ex: La Puissance du Saint-Esprit"
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Thème Doctrinal</label>
                  <input
    type="text"
    value={sermonTheme}
    onChange={(e) => setSermonTheme(e.target.value)}
    placeholder="Ex: Foi, Victoire & Sanctification"
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Résumé / Description</label>
                <textarea
    value={sermonDescription}
    onChange={(e) => setSermonDescription(e.target.value)}
    rows={3}
    placeholder="Points clés de la prédication..."
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
  />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
    type="button"
    onClick={() => setShowSermonModal(false)}
    className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition cursor-pointer"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
  >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publier</span>
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* Modal: Pastoral Announcement */
  }
      {showAnnounceModal && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="space-y-1">
              <div className="text-emerald-700 font-bold text-xs uppercase flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5" /> Communication Pastorale
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900">
                Diffuser un message à l'assemblée
              </h3>
            </div>

            <form onSubmit={handleCreatePastoralAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Titre de l'annonce</label>
                <input
    type="text"
    value={announceTitle}
    onChange={(e) => setAnnounceTitle(e.target.value)}
    placeholder="Ex : Exhortation pastorale du mois"
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
  />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Message</label>
                <textarea
    value={announceContent}
    onChange={(e) => setAnnounceContent(e.target.value)}
    rows={4}
    placeholder="Texte du message pastoral..."
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
  />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
    type="button"
    onClick={() => setShowAnnounceModal(false)}
    className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition cursor-pointer"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
  >
                  <Send className="w-3.5 h-3.5" />
                  <span>Diffuser</span>
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  PastoralLayout
};
