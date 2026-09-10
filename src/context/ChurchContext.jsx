import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_USERS,
  INITIAL_GROUPS,
  INITIAL_PROGRAMS,
  INITIAL_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SERMONS,
  INITIAL_PRAYER_REQUESTS,
  INITIAL_CAMPAIGNS,
  INITIAL_TESTIMONIES,
  INITIAL_THANKSGIVINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_JOIN_REQUESTS,
  INITIAL_MEMBERS
} from "../data/mockData";
const STORAGE_KEY = "cpc_connect_platform_v4";
const ChurchContext = createContext(null);
const ChurchProvider = ({ children }) => {
  const [currentSpaceState, setCurrentSpaceState] = useState("public");
  const [publicPage, setPublicPage] = useState("Accueil");
  const [selectedGroupSlug, setSelectedGroupSlug] = useState("predication-enseignement");
  const [erpTab, setErpTab] = useState("Tableau de bord");
  const [memberTab, setMemberTab] = useState("Tableau de bord");
  const [selectedItemId, setSelectedItemId] = useState(void 0);
  const setCurrentSpace = (space) => {
    if (space === "app" || space === "member") {
      setCurrentSpaceState("member");
    } else if (space === "admin" || space === "erp") {
      setCurrentSpaceState("erp");
    } else if (space === "leader") {
      setCurrentSpaceState("leader");
    } else if (space === "pastoral") {
      setCurrentSpaceState("pastoral");
    } else if (space === "connexion") {
      setCurrentSpaceState("connexion");
    } else if (space === "admin-login") {
      setCurrentSpaceState("admin-login");
    } else {
      setCurrentSpaceState("public");
    }
  };
  const currentSpace = currentSpaceState;
  const openGroupDetail = (slug) => {
    setSelectedGroupSlug(slug);
    setCurrentSpaceState("public");
    setPublicPage("GroupeDetail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [allUsers] = useState(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const [activeRole, setActiveRole] = useState(INITIAL_USERS[0].role);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_programs`);
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_announcements`);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });
  const [sermons, setSermons] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_sermons`);
    return saved ? JSON.parse(saved) : INITIAL_SERMONS;
  });
  const [groups, setGroups] = useState(() => {
    try {
      ["cpcn_connect_state_v1", "cpcn_connect_state_v2", "cpc_connect_state_v1", "cpc_connect_state_v2", "cpc_connect_platform_v3"].forEach((legacyKey) => {
        try {
          localStorage.removeItem(`${legacyKey}_groups`);
        } catch {
        }
      });
      const saved = localStorage.getItem(`${STORAGE_KEY}_groups`);
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasPredication = parsed.some((g) => g.slug === "predication-enseignement");
        const hasEvangelisation = parsed.some((g) => g.slug === "evangelisation");
        const hasEntretien = parsed.some((g) => g.slug === "service-entretien");
        const hasDiaconat = parsed.some((g) => g.slug === "diaconat");
        const hasLegacyCombinedNettoyage = parsed.some(
          (g) => g.name.toLowerCase().includes("nettoyage") || g.slug === "service-de-nettoyage"
        );
        if (hasPredication && hasEvangelisation && hasEntretien && hasDiaconat && !hasLegacyCombinedNettoyage && parsed.length === INITIAL_GROUPS.length) {
          return parsed;
        }
      }
    } catch {
    }
    try {
      localStorage.setItem(`${STORAGE_KEY}_groups`, JSON.stringify(INITIAL_GROUPS));
    } catch {
    }
    return INITIAL_GROUPS;
  });
  const [joinRequests, setJoinRequests] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_join_requests`);
    return saved ? JSON.parse(saved) : INITIAL_JOIN_REQUESTS;
  });
  const [prayerRequests, setPrayerRequests] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_prayers`);
    return saved ? JSON.parse(saved) : INITIAL_PRAYER_REQUESTS;
  });
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });
  const [testimonies, setTestimonies] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_testimonies`);
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIES;
  });
  const [thanksgivings, setThanksgivings] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_thanksgivings`);
    return saved ? JSON.parse(saved) : INITIAL_THANKSGIVINGS;
  });
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_members`);
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_programs`, JSON.stringify(programs));
  }, [programs]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_announcements`, JSON.stringify(announcements));
  }, [announcements]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_sermons`, JSON.stringify(sermons));
  }, [sermons]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_groups`, JSON.stringify(groups));
  }, [groups]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_join_requests`, JSON.stringify(joinRequests));
  }, [joinRequests]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_prayers`, JSON.stringify(prayerRequests));
  }, [prayerRequests]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_testimonies`, JSON.stringify(testimonies));
  }, [testimonies]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_thanksgivings`, JSON.stringify(thanksgivings));
  }, [thanksgivings]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_members`, JSON.stringify(members));
  }, [members]);
  const showToast = (title, message, type = "info") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type, timestamp: Date.now() }]);
    setTimeout(() => {
      removeToast(id);
    }, 5e3);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  const switchUserRole = (role) => {
    setActiveRole(role);
    const matchingUser = allUsers.find((u) => u.role === role);
    if (matchingUser) {
      setCurrentUser(matchingUser);
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        role
      }));
    }
    showToast("R\xF4le modifi\xE9", `Vous naviguez maintenant avec les permissions de : ${role}`, "info");
  };
  const switchUser = (user) => {
    setCurrentUser(user);
    setActiveRole(user.role);
    setIsAuthenticated(true);
    showToast("Profil chang\xE9", `Connect\xE9 en tant que ${user.fullName} (${user.role})`, "success");
  };
  const loginUser = (emailOrPhone) => {
    const cleanInput = emailOrPhone.trim().toLowerCase();
    const user = allUsers.find(
      (u) => u.email.toLowerCase() === cleanInput || u.email.toLowerCase().replace("@cpc-connect.test", "@cpcn.test") === cleanInput || u.email.toLowerCase().replace("@cpcn.test", "@cpc-connect.test") === cleanInput || cleanInput.includes("pasteur") && (u.id === "usr-pasteur" || u.role === "Pasteur principal") || cleanInput.includes("leader") && u.role === "Leader de groupe" || cleanInput.includes("admin") && u.role === "Administrateur" || cleanInput.includes("membre") && u.role === "Membre" || u.phone.replace(/\s+/g, "") === cleanInput.replace(/\s+/g, "") || u.id.toLowerCase() === cleanInput
    );
    if (user) {
      setCurrentUser(user);
      setActiveRole(user.role);
      setIsAuthenticated(true);
      if (user.role === "Membre") {
        setCurrentSpaceState("member");
        setMemberTab("Tableau de bord");
      } else if (user.role === "Leader de groupe" || user.role === "Adjoint de groupe" || user.role === "Leader principal") {
        setCurrentSpaceState("leader");
      } else if (user.role === "Pasteur" || user.role === "Pasteur principal") {
        setCurrentSpaceState("pastoral");
      } else if (user.role === "Administrateur") {
        setCurrentSpaceState("erp");
        setErpTab("Tableau de bord");
      } else {
        setCurrentSpaceState("member");
      }
      showToast(
        "Connexion r\xE9ussie",
        `Bienvenue, ${user.fullName} (${user.role}) !`,
        "success"
      );
      return true;
    } else {
      const newUser = {
        id: `usr-${Date.now()}`,
        fullName: emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : "Nouveau Fid\xE8le",
        email: emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@cpcn.test`,
        phone: emailOrPhone.includes("@") ? "+237 600 00 00 00" : emailOrPhone,
        role: "Membre",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        memberSince: "2026",
        isBaptized: false
      };
      setCurrentUser(newUser);
      setActiveRole("Membre");
      setIsAuthenticated(true);
      setCurrentSpaceState("member");
      setMemberTab("Tableau de bord");
      showToast("Bienvenue", `Compte cr\xE9\xE9 pour ${newUser.fullName}.`, "success");
      return true;
    }
  };
  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(INITIAL_USERS[0]);
    setActiveRole("Membre");
    setCurrentSpaceState("public");
    setPublicPage("Accueil");
    showToast("D\xE9connexion", "Vous \xEAtes maintenant d\xE9connect\xE9.", "info");
  };
  const navigateTo = (space, view, itemId) => {
    setCurrentSpace(space);
    if (space === "public") {
      setPublicPage(view);
    } else if (space === "member" || space === "app") {
      setMemberTab(view);
    } else if (space === "erp" || space === "admin") {
      setErpTab(view);
    }
    if (itemId) {
      setSelectedItemId(itemId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const updateProgram = (updated) => {
    setPrograms(
      (prev) => prev.map((p) => p.id === updated.id ? { ...updated, updatedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] } : p)
    );
    showToast(
      "Programme synchronis\xE9 !",
      `\xAB ${updated.title} \xBB (${updated.day} ${updated.startTime} - ${updated.endTime}) est maintenant \xE0 jour en direct sur le site public.`,
      "success"
    );
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Mise \xE0 jour du calendrier des cultes",
      message: `Le programme \xAB ${updated.title} \xBB a \xE9t\xE9 modifi\xE9 : ${updated.day} ${updated.startTime} \xE0 ${updated.endTime}.`,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      timeAgo: "\xC0 l'instant",
      type: "program",
      read: false,
      targetSpace: "public",
      targetTab: "Programmes"
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };
  const addProgram = (progData) => {
    const newProg = {
      ...progData,
      id: `prog-${Date.now()}`,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    setPrograms((prev) => [...prev, newProg]);
    showToast("Nouveau programme publi\xE9", `\xAB ${newProg.title} \xBB a \xE9t\xE9 ajout\xE9 \xE0 la grille des programmes publics.`, "success");
  };
  const deleteProgram = (id) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    showToast("Programme supprim\xE9", "Le programme a \xE9t\xE9 retir\xE9 de l'affichage.", "info");
  };
  const updateEvent = (updated) => {
    setEvents((prev) => prev.map((e) => e.id === updated.id ? updated : e));
    showToast("\xC9v\xE9nement synchronis\xE9 !", `\xAB ${updated.title} \xBB a \xE9t\xE9 mis \xE0 jour sur le site public.`, "success");
  };
  const addEvent = (evtData) => {
    const newEvt = {
      ...evtData,
      id: `evt-${Date.now()}`
    };
    setEvents((prev) => [newEvt, ...prev]);
    showToast("\xC9v\xE9nement publi\xE9 en ligne !", `\xAB ${newEvt.title} \xBB est disponible pour les inscriptions.`, "success");
  };
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast("\xC9v\xE9nement supprim\xE9", "L'\xE9v\xE9nement a \xE9t\xE9 retir\xE9 du catalogue.", "info");
  };
  const registerForEvent = (eventId, name, email) => {
    setEvents(
      (prev) => prev.map((e) => {
        if (e.id === eventId) {
          return { ...e, registeredCount: Math.min(e.maxCapacity, e.registeredCount + 1) };
        }
        return e;
      })
    );
    showToast(
      "Inscription confirm\xE9e ! \u{1F389}",
      `Merci ${name}, votre place a \xE9t\xE9 r\xE9serv\xE9e. Un e-mail de confirmation avec votre pass a \xE9t\xE9 simul\xE9 vers ${email}.`,
      "success"
    );
    return true;
  };
  const createAnnouncement = (data) => {
    let recipientCount = 327;
    if (data.targetAudience === "leaders") recipientCount = 28;
    else if (data.targetAudience === "pastors") recipientCount = 7;
    else if (data.targetAudience === "group") recipientCount = 65;
    const newAnn = {
      id: `ann-${Date.now()}`,
      title: data.title,
      content: data.content,
      targetAudience: data.targetAudience,
      targetGroupName: data.targetGroupName,
      author: currentUser.fullName,
      authorRole: currentUser.role,
      createdAt: "\xC0 l'instant",
      notificationSentCount: recipientCount,
      isPinned: data.priority === "urgent",
      priority: data.priority || "normal"
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    const notif = {
      id: `notif-${Date.now()}`,
      title: `Nouvelle annonce : ${data.title}`,
      message: data.content.length > 100 ? data.content.substring(0, 100) + "..." : data.content,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      timeAgo: "\xC0 l'instant",
      type: "announcement",
      read: false,
      targetSpace: "public",
      targetTab: "Accueil"
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(
      "Annonce publi\xE9e avec succ\xE8s ! \u{1F4E2}",
      `Notification push & e-mail simul\xE9e et envoy\xE9e \xE0 ${recipientCount} membres (${data.targetAudience === "all" ? "Toute l'\xE9glise" : data.targetAudience === "leaders" ? "Corps des leaders" : data.targetAudience === "pastors" ? "Coll\xE8ge pastoral" : data.targetGroupName || "Groupe cible"}).`,
      "broadcast"
    );
    return newAnn;
  };
  const addSermon = (sermonData) => {
    const newSermon = {
      ...sermonData,
      id: `srm-${Date.now()}`,
      viewsCount: 1
    };
    setSermons((prev) => [newSermon, ...prev]);
    const activePlatforms = [];
    if (newSermon.platforms.cpcn) activePlatforms.push("CPC Connect \u2713");
    if (newSermon.platforms.youtube) activePlatforms.push("YouTube \u2713");
    if (newSermon.platforms.facebook) activePlatforms.push("Facebook \u2713");
    if (newSermon.platforms.tiktok) activePlatforms.push("TikTok \u2713");
    showToast(
      "Pr\xE9dication publi\xE9e ! \u{1F3A5}",
      `Diffusion multi-canal activ\xE9e : ${activePlatforms.join(" \u2014 ")}. La vid\xE9o est maintenant visionnable en direct sur le site public !`,
      "broadcast"
    );
  };
  const requestToJoinGroup = (groupId, note) => {
    const targetGroup = groups.find((g) => g.id === groupId);
    if (!targetGroup) return { success: false, message: "Groupe introuvable" };
    const existing = joinRequests.find(
      (r) => r.groupId === groupId && (r.userId === currentUser.id || r.userEmail === currentUser.email)
    );
    if (existing && existing.status === "pending") {
      return { success: false, message: "Votre demande pour ce groupe est d\xE9j\xE0 en attente d'approbation." };
    }
    const newReq = {
      id: `req-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName || "Visiteur / Membre",
      userEmail: currentUser.email,
      userPhone: currentUser.phone,
      groupId: targetGroup.id,
      groupName: targetGroup.name,
      requestDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: "pending",
      motivationNote: note || "D\xE9sire rejoindre ce d\xE9partement pour s'investir dans la vie de l'\xE9glise."
    };
    setJoinRequests((prev) => [newReq, ...prev]);
    const notif = {
      id: `notif-${Date.now()}`,
      title: "Nouvelle demande d'int\xE9gration",
      message: `${currentUser.fullName} a demand\xE9 \xE0 rejoindre le d\xE9partement \xAB ${targetGroup.name} \xBB.`,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      timeAgo: "\xC0 l'instant",
      type: "group_request",
      read: false,
      targetSpace: "erp",
      targetTab: "Groupes"
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(
      "Demande envoy\xE9e ! \u{1F4E9}",
      `Votre demande d'int\xE9gration pour \xAB ${targetGroup.name} \xBB a \xE9t\xE9 transmise \xE0 ${targetGroup.leader}. Statut actuel : Demande en attente.`,
      "info"
    );
    return { success: true, message: "Demande envoy\xE9e" };
  };
  const getUserGroupRequestStatus = (groupId) => {
    const match = joinRequests.find(
      (r) => r.groupId === groupId && (r.userId === currentUser.id || r.userEmail === currentUser.email)
    );
    return match ? match.status : "none";
  };
  const respondToJoinRequest = (requestId, accept) => {
    setJoinRequests(
      (prev) => prev.map((r) => {
        if (r.id === requestId) {
          const newStatus = accept ? "accepted" : "rejected";
          return { ...r, status: newStatus };
        }
        return r;
      })
    );
    const req = joinRequests.find((r) => r.id === requestId);
    if (req) {
      if (accept) {
        setGroups(
          (prev) => prev.map((g) => g.id === req.groupId ? { ...g, membersCount: g.membersCount + 1 } : g)
        );
        showToast(
          "Demande accept\xE9e ! \u2705",
          `${req.userName} est d\xE9sormais membre officiel du d\xE9partement ${req.groupName}.`,
          "success"
        );
      } else {
        showToast("Demande refus\xE9e", `La demande de ${req.userName} a \xE9t\xE9 d\xE9clin\xE9e.`, "info");
      }
    }
  };
  const canViewConfidentialPrayers = activeRole === "Pasteur principal";
  const canViewIntercessionPrayers = canViewConfidentialPrayers || activeRole === "Pasteur" || activeRole === "Leader principal" || activeRole === "Leader de groupe" && currentUser.groupName === "Intercession";
  const visiblePrayerRequests = prayerRequests.filter((p) => {
    if (p.confidentiality === "CONFIDENTIEL") {
      return canViewConfidentialPrayers;
    }
    if (p.confidentiality === "INTERCESSION") {
      return canViewIntercessionPrayers;
    }
    return true;
  });
  const createPrayerRequest = (data) => {
    const newPrayer = {
      id: `pray-${Date.now()}`,
      title: data.title,
      content: data.content,
      requestorName: currentUser.fullName,
      requestorId: currentUser.id,
      date: "\xC0 l'instant",
      confidentiality: data.confidentiality,
      status: "active",
      prayedCount: 1,
      isUrgent: data.isUrgent
    };
    setPrayerRequests((prev) => [newPrayer, ...prev]);
    const targetDesc = data.confidentiality === "CONFIDENTIEL" ? "\u{1F512} Pasteur Principal uniquement" : data.confidentiality === "INTERCESSION" ? "\u{1F6E1}\uFE0F Pasteur & Groupe d'Intercession" : "\u{1F465} Toute la Communaut\xE9";
    showToast(
      "Sujet de pri\xE8re enregistr\xE9 \u{1F64F}",
      `Votre requ\xEAte a \xE9t\xE9 transmise avec le niveau de confidentialit\xE9 : ${targetDesc}.`,
      "success"
    );
  };
  const incrementPrayedCount = (prayerId) => {
    setPrayerRequests(
      (prev) => prev.map((p) => p.id === prayerId ? { ...p, prayedCount: p.prayedCount + 1 } : p)
    );
    showToast("Pri\xE8re port\xE9e ! \u2728", "Vous avez rejoint l'intercession pour ce sujet.", "success");
  };
  const processDonation = (campaignId, amount, donorName, paymentMethod) => {
    const receiptNumber = `CPC-DON-${Math.floor(1e5 + Math.random() * 9e5)}`;
    setCampaigns(
      (prev) => prev.map((c) => {
        if (c.id === campaignId) {
          return {
            ...c,
            collectedAmount: c.collectedAmount + amount,
            donorsCount: c.donorsCount + 1
          };
        }
        return c;
      })
    );
    const targetCampaign = campaigns.find((c) => c.id === campaignId);
    showToast(
      "Don enregistr\xE9 avec succ\xE8s ! \u{1F54A}\uFE0F",
      `Merci pour votre g\xE9n\xE9rosit\xE9 de ${amount.toLocaleString("fr-FR")} \u20AC (${paymentMethod}) envers \xAB ${targetCampaign?.title || "l'\xC9glise"} \xBB. Re\xE7u fiscal n\xB0 ${receiptNumber}.`,
      "success"
    );
    return { receiptNumber, success: true };
  };
  const addTestimony = (title, content, category) => {
    const newTest = {
      id: `test-${Date.now()}`,
      author: currentUser.fullName,
      title,
      content,
      date: "Aujourd'hui",
      approved: true,
      // auto-approved for rich demo experience
      category,
      likesCount: 1
    };
    setTestimonies((prev) => [newTest, ...prev]);
    showToast("T\xE9moignage partag\xE9 ! \u{1F389}", "Votre t\xE9moignage est maintenant en ligne pour \xE9difier l'assembl\xE9e.", "success");
  };
  const addThanksgiving = (message) => {
    const newThx = {
      id: `thx-${Date.now()}`,
      author: currentUser.fullName,
      message,
      date: "\xC0 l'instant",
      amenCount: 1
    };
    setThanksgivings((prev) => [newThx, ...prev]);
    showToast("Action de gr\xE2ce d\xE9pos\xE9e ! \u{1F31F}", "Votre louange a \xE9t\xE9 ajout\xE9e au mur des b\xE9n\xE9dictions.", "success");
  };
  const incrementAmen = (id) => {
    setThanksgivings(
      (prev) => prev.map((t) => t.id === id ? { ...t, amenCount: t.amenCount + 1 } : t)
    );
  };
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const markNotificationAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("Notifications lues", "Toutes les notifications ont \xE9t\xE9 marqu\xE9es comme lues.", "info");
  };
  const updateGroup = (updated) => {
    setGroups((prev) => prev.map((g) => g.id === updated.id ? updated : g));
    showToast("D\xE9partement mis \xE0 jour", `Les informations du groupe \xAB ${updated.name} \xBB ont \xE9t\xE9 actualis\xE9es.`, "success");
  };
  const addMemberToGroup = (groupName, memberData) => {
    const newMbr = {
      ...memberData,
      groupName,
      id: `mbr-${Date.now()}`
    };
    setMembers((prev) => [newMbr, ...prev]);
    setGroups(
      (prev) => prev.map((g) => g.name.toLowerCase() === groupName.toLowerCase() ? { ...g, membersCount: g.membersCount + 1 } : g)
    );
    showToast(
      "Membre ajout\xE9 au groupe ! \u{1F389}",
      `${newMbr.fullName} a \xE9t\xE9 int\xE9gr\xE9(e) avec succ\xE8s au d\xE9partement \xAB ${groupName} \xBB.`,
      "success"
    );
  };
  const removeMemberFromGroup = (memberId) => {
    const targetMember = members.find((m) => m.id === memberId);
    if (targetMember) {
      setMembers(
        (prev) => prev.map((m) => m.id === memberId ? { ...m, groupName: "Aucun" } : m)
      );
      setGroups(
        (prev) => prev.map(
          (g) => g.name === targetMember.groupName ? { ...g, membersCount: Math.max(0, g.membersCount - 1) } : g
        )
      );
      showToast("Membre retir\xE9 du groupe", `${targetMember.fullName} n'est plus assign\xE9(e) \xE0 \xAB ${targetMember.groupName} \xBB.`, "info");
    }
  };
  const addMember = (memberData) => {
    const newMbr = {
      ...memberData,
      id: `mbr-${Date.now()}`
    };
    setMembers((prev) => [newMbr, ...prev]);
    if (newMbr.groupName && newMbr.groupName !== "Aucun") {
      setGroups(
        (prev) => prev.map((g) => g.name.toLowerCase() === newMbr.groupName.toLowerCase() ? { ...g, membersCount: g.membersCount + 1 } : g)
      );
    }
    showToast("Nouveau membre enregistr\xE9", `${newMbr.fullName} a \xE9t\xE9 ajout\xE9 au r\xE9pertoire CRM.`, "success");
  };
  const updateMember = (updated) => {
    setMembers((prev) => prev.map((m) => m.id === updated.id ? updated : m));
    showToast("Profil membre mis \xE0 jour", `La fiche de ${updated.fullName} a \xE9t\xE9 modifi\xE9e.`, "success");
  };
  const deleteMember = (id) => {
    const target = members.find((m) => m.id === id);
    if (target) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      if (target.groupName && target.groupName !== "Aucun") {
        setGroups(
          (prev) => prev.map((g) => g.name === target.groupName ? { ...g, membersCount: Math.max(0, g.membersCount - 1) } : g)
        );
      }
      showToast("Membre supprim\xE9", `Le dossier de ${target.fullName} a \xE9t\xE9 retir\xE9.`, "info");
    }
  };
  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_programs`);
    localStorage.removeItem(`${STORAGE_KEY}_events`);
    localStorage.removeItem(`${STORAGE_KEY}_announcements`);
    localStorage.removeItem(`${STORAGE_KEY}_sermons`);
    localStorage.removeItem(`${STORAGE_KEY}_groups`);
    localStorage.removeItem(`${STORAGE_KEY}_join_requests`);
    localStorage.removeItem(`${STORAGE_KEY}_prayers`);
    localStorage.removeItem(`${STORAGE_KEY}_campaigns`);
    localStorage.removeItem(`${STORAGE_KEY}_testimonies`);
    localStorage.removeItem(`${STORAGE_KEY}_thanksgivings`);
    localStorage.removeItem(`${STORAGE_KEY}_notifications`);
    localStorage.removeItem(`${STORAGE_KEY}_members`);
    localStorage.removeItem(`${STORAGE_KEY}_groups`);
    setPrograms(INITIAL_PROGRAMS);
    setEvents(INITIAL_EVENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setSermons(INITIAL_SERMONS);
    setGroups(INITIAL_GROUPS);
    setJoinRequests(INITIAL_JOIN_REQUESTS);
    setPrayerRequests(INITIAL_PRAYER_REQUESTS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setTestimonies(INITIAL_TESTIMONIES);
    setThanksgivings(INITIAL_THANKSGIVINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setMembers(INITIAL_MEMBERS);
    setCurrentUser(INITIAL_USERS[0]);
    setActiveRole(INITIAL_USERS[0].role);
    showToast("Donn\xE9es r\xE9initialis\xE9es", "Toutes les donn\xE9es de d\xE9monstration d'origine ont \xE9t\xE9 restaur\xE9es.", "info");
  };
  return <ChurchContext.Provider
    value={{
      currentSpace,
      setCurrentSpace,
      publicPage,
      setPublicPage,
      activePublicPage: publicPage,
      selectedGroupSlug,
      setSelectedGroupSlug,
      openGroupDetail,
      erpTab,
      setErpTab,
      activeErpTab: erpTab,
      memberTab,
      setMemberTab,
      activeMemberTab: memberTab,
      navigateTo,
      currentUser,
      activeRole,
      allUsers,
      switchUserRole,
      switchUser,
      isAuthenticated,
      loginUser,
      logoutUser,
      programs,
      updateProgram,
      addProgram,
      deleteProgram,
      events,
      updateEvent,
      addEvent,
      deleteEvent,
      registerForEvent,
      announcements,
      createAnnouncement,
      sermons,
      addSermon,
      groups,
      updateGroup,
      joinRequests,
      requestToJoinGroup,
      getUserGroupRequestStatus,
      respondToJoinRequest,
      addMemberToGroup,
      removeMemberFromGroup,
      prayerRequests,
      visiblePrayerRequests,
      createPrayerRequest,
      incrementPrayedCount,
      campaigns,
      processDonation,
      testimonies,
      addTestimony,
      thanksgivings,
      addThanksgiving,
      incrementAmen,
      notifications,
      unreadNotificationsCount,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      members,
      addMember,
      updateMember,
      deleteMember,
      toasts,
      removeToast,
      showToast,
      resetDemoData,
      selectedItemId,
      setSelectedItemId
    }}
  >
      {children}
    </ChurchContext.Provider>;
};
const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error("useChurch must be used within a ChurchProvider");
  }
  return context;
};
export {
  ChurchProvider,
  useChurch
};
