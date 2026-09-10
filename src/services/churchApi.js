import {
  INITIAL_USERS,
  INITIAL_PROGRAMS,
  INITIAL_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SERMONS,
  INITIAL_GROUPS,
  INITIAL_JOIN_REQUESTS,
  INITIAL_PRAYER_REQUESTS,
  INITIAL_CAMPAIGNS
} from "../data/mockData";
const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const STORAGE_PREFIX = "cpc_connect_v3";
const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(`${STORAGE_PREFIX}_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn(`Erreur lors de la lecture de ${key} depuis le stockage local`, err);
    return fallback;
  }
};
const setStored = (key, value) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Erreur lors de l'enregistrement de ${key} dans le stockage local`, err);
  }
};
const programsApi = {
  async getAll() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/programs`);
      return res.json();
    }
    return getStored("programs", INITIAL_PROGRAMS);
  },
  async create(program) {
    const newProg = { ...program, id: `prg-${Date.now()}` };
    const all = getStored("programs", INITIAL_PROGRAMS);
    setStored("programs", [newProg, ...all]);
    return newProg;
  },
  async update(program) {
    const all = getStored("programs", INITIAL_PROGRAMS);
    const updated = all.map((p) => p.id === program.id ? program : p);
    setStored("programs", updated);
    return program;
  },
  async delete(id) {
    const all = getStored("programs", INITIAL_PROGRAMS);
    setStored("programs", all.filter((p) => p.id !== id));
  }
};
const eventsApi = {
  async getAll() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/events`);
      return res.json();
    }
    return getStored("events", INITIAL_EVENTS);
  },
  async create(event) {
    const newEvt = { ...event, id: `evt-${Date.now()}`, registeredCount: 0 };
    const all = getStored("events", INITIAL_EVENTS);
    setStored("events", [newEvt, ...all]);
    return newEvt;
  },
  async update(event) {
    const all = getStored("events", INITIAL_EVENTS);
    setStored("events", all.map((e) => e.id === event.id ? event : e));
    return event;
  },
  async delete(id) {
    const all = getStored("events", INITIAL_EVENTS);
    setStored("events", all.filter((e) => e.id !== id));
  }
};
const groupsApi = {
  async getAll() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/groups`);
      return res.json();
    }
    return getStored("groups", INITIAL_GROUPS);
  },
  async getBySlug(slug) {
    const groups = await this.getAll();
    return groups.find((g) => g.slug === slug || g.id === slug);
  },
  async getJoinRequests() {
    return getStored("join_requests", INITIAL_JOIN_REQUESTS);
  },
  async submitJoinRequest(req) {
    const newReq = {
      ...req,
      id: `req-${Date.now()}`,
      requestDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: "pending"
    };
    const all = getStored("join_requests", INITIAL_JOIN_REQUESTS);
    setStored("join_requests", [newReq, ...all]);
    return newReq;
  },
  async respondJoinRequest(requestId, status) {
    const all = getStored("join_requests", INITIAL_JOIN_REQUESTS);
    setStored("join_requests", all.map((r) => r.id === requestId ? { ...r, status } : r));
  }
};
const prayersApi = {
  async getAllVisible(activeRole) {
    const all = getStored("prayers", INITIAL_PRAYER_REQUESTS);
    return all.filter((p) => {
      if (p.confidentiality === "CONFIDENTIEL" || p.confidentiality === "pastoral_only") {
        return activeRole === "Pasteur principal";
      }
      if (p.confidentiality === "INTERCESSION") {
        return activeRole === "Pasteur principal" || activeRole === "Pasteur" || activeRole === "Administrateur" || activeRole === "Leader de groupe" || activeRole === "Leader principal";
      }
      return true;
    });
  },
  async create(prayer) {
    const newPrayer = {
      ...prayer,
      id: `pry-${Date.now()}`,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      status: "active",
      prayedCount: 1
    };
    const all = getStored("prayers", INITIAL_PRAYER_REQUESTS);
    setStored("prayers", [newPrayer, ...all]);
    return newPrayer;
  }
};
const announcementsApi = {
  async getAll() {
    return getStored("announcements", INITIAL_ANNOUNCEMENTS);
  },
  async create(announcement) {
    const newAnn = {
      ...announcement,
      id: `ann-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      notificationSentCount: 0
    };
    const all = getStored("announcements", INITIAL_ANNOUNCEMENTS);
    setStored("announcements", [newAnn, ...all]);
    return newAnn;
  }
};
const sermonsApi = {
  async getAll() {
    return getStored("sermons", INITIAL_SERMONS);
  }
};
const donationsApi = {
  async getCampaigns() {
    return getStored("campaigns", INITIAL_CAMPAIGNS);
  }
};
const authApi = {
  async getUsers() {
    return INITIAL_USERS;
  },
  async findUserByCredential(input) {
    const clean = input.trim().toLowerCase();
    const users = await this.getUsers();
    return users.find(
      (u) => u.email.toLowerCase() === clean || clean === "pasteur@cpcn.test" && (u.id === "usr-pasteur" || u.role === "Pasteur principal") || u.phone.replace(/\s+/g, "") === clean.replace(/\s+/g, "") || u.id.toLowerCase() === clean
    );
  }
};
export {
  announcementsApi,
  authApi,
  donationsApi,
  eventsApi,
  groupsApi,
  prayersApi,
  programsApi,
  sermonsApi
};
