import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  FolderKanban,
  Users,
  Clock,
  Search,
  Edit2,
  Check,
  X,
  Trash2,
  UserCheck,
  Phone,
  Mail,
  UserPlus,
  Info
} from "lucide-react";
const GroupsModule = () => {
  const {
    groups,
    updateGroup,
    joinRequests,
    respondToJoinRequest,
    members,
    addMemberToGroup,
    removeMemberFromGroup
  } = useChurch();
  const [activeTab, setActiveTab] = useState("groups");
  const [selectedGroupForRoster, setSelectedGroupForRoster] = useState(null);
  const [selectedGroupForAddMember, setSelectedGroupForAddMember] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMemberForm, setNewMemberForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Membre",
    isBaptized: true,
    status: "Actif",
    joinedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    address: "Ngangue, Sanctuaire Central"
  });
  const pendingRequests = joinRequests.filter((r) => r.status === "pending");
  const filteredGroups = groups.filter(
    (g) => {
      const q = (searchQuery || "").trim().toLowerCase();
      return !q || g.name && g.name.toLowerCase().includes(q) || g.leader && g.leader.toLowerCase().includes(q) || g.description && g.description.toLowerCase().includes(q);
    }
  );
  const getGroupMembers = (groupName) => {
    if (!groupName) return [];
    const target = groupName.trim().toLowerCase();
    return members.filter(
      (m) => m.groupName && m.groupName.trim().toLowerCase() === target
    );
  };
  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!selectedGroupForAddMember || !newMemberForm.fullName) return;
    addMemberToGroup(selectedGroupForAddMember.name, newMemberForm);
    setSelectedGroupForAddMember(null);
    setNewMemberForm({
      fullName: "",
      email: "",
      phone: "",
      role: "Membre",
      isBaptized: true,
      status: "Actif",
      joinedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      address: "Ngangue, Sanctuaire Central"
    });
  };
  const handleEditGroupSubmit = (e) => {
    e.preventDefault();
    if (!editingGroup) return;
    updateGroup(editingGroup);
    setEditingGroup(null);
  };
  return <div className="space-y-6 animate-fadeIn">
      {
    /* Header & Controls */
  }
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs">
              Module Gestion
            </span>
            <h2 className="font-display font-bold text-2xl text-stone-900">
              Les 6 Départements Ministériels
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Supervisez les effectifs, inscrivez des fidèles, gérez les rosters et traitez les demandes d'adhésion en direct.
          </p>
        </div>

        {
    /* Tab switch */
  }
        <div className="flex items-center gap-1 bg-stone-200 p-1 rounded-2xl text-xs font-bold shadow-inner">
          <button
    onClick={() => setActiveTab("groups")}
    className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${activeTab === "groups" ? "bg-white shadow-sm text-stone-950 font-extrabold" : "text-stone-600 hover:text-stone-900"}`}
  >
            <FolderKanban className="w-3.5 h-3.5 text-amber-600" />
            <span>Les 6 Départements ({groups.length})</span>
          </button>

          <button
    onClick={() => setActiveTab("requests")}
    className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${activeTab === "requests" ? "bg-white shadow-sm text-stone-950 font-extrabold" : "text-stone-600 hover:text-stone-900"}`}
  >
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Demandes d'adhésion</span>
            {pendingRequests.length > 0 && <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-black animate-pulse">
                {pendingRequests.length}
              </span>}
          </button>
        </div>
      </div>

      {
    /* Main Tab Views */
  }
      {activeTab === "groups" ? <div className="space-y-6">
          {
    /* Search bar */
  }
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
    type="text"
    placeholder="Rechercher un département ou un leader..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Info className="w-4 h-4 text-amber-500" />
              <span>Cliquez sur « Roster » pour voir ou retirer les membres, ou « + Inscrire » pour ajouter un fidèle.</span>
            </div>
          </div>

          {
    /* Groups Grid */
  }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => {
    const groupMembers = getGroupMembers(group.name);
    const groupReqs = joinRequests.filter(
      (r) => r.groupId === group.id && r.status === "pending"
    );
    return <div
      key={group.id}
      className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-5"
    >
                  <div className="space-y-4">
                    {
      /* Card Header */
    }
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                          Département Officiel
                        </span>
                        <h3 className="font-display font-bold text-xl text-stone-900 mt-0.5">
                          {group.name}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-950 text-xs font-black border border-amber-200 shadow-xs">
                        👥 {group.membersCount} fidèles
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {group.description}
                    </p>

                    {
      /* Leaders info card */
    }
                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">Leader principal :</span>
                        <strong className="text-stone-900 font-bold">{group.leader}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">Leader adjoint :</span>
                        <strong className="text-stone-800">{group.deputyLeader}</strong>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-stone-200/80 text-[11px]">
                        <span className="text-stone-500">Rencontre :</span>
                        <strong className="text-amber-800 font-bold">
                          {group.meetingDay} ({group.meetingTime})
                        </strong>
                      </div>
                    </div>

                    {
      /* Member Avatars Preview */
    }
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
                        <span className="font-semibold">Fidèles enregistrés ({groupMembers.length})</span>
                        {groupReqs.length > 0 && <span className="text-amber-700 font-bold text-[10px]">
                            {groupReqs.length} demande(s) en attente
                          </span>}
                      </div>
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        {groupMembers.slice(0, 5).map((m) => <img
      key={m.id}
      src={m.avatarUrl}
      alt={m.fullName}
      title={`${m.fullName} (${m.role})`}
      className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-xs"
    />)}
                        {groupMembers.length > 5 && <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-700 font-bold text-[10px] flex items-center justify-center border-2 border-white">
                            +{groupMembers.length - 5}
                          </div>}
                        {groupMembers.length === 0 && <span className="text-[11px] text-stone-400 italic">Aucun membre assigné</span>}
                      </div>
                    </div>
                  </div>

                  {
      /* Actions Bar */
    }
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
      onClick={() => setSelectedGroupForRoster(group)}
      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition flex items-center gap-1 cursor-pointer"
      title="Voir la liste complète des membres"
    >
                        <Users className="w-3.5 h-3.5 text-amber-700" />
                        <span>Roster ({groupMembers.length})</span>
                      </button>

                      <button
      onClick={() => setSelectedGroupForAddMember(group)}
      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition flex items-center gap-1 shadow-sm cursor-pointer"
      title="Inscrire un membre"
    >
                        <UserPlus className="w-3.5 h-3.5 text-amber-100" />
                        <span>+ Inscrire</span>
                      </button>
                    </div>

                    <button
      onClick={() => setEditingGroup(group)}
      className="p-1.5 rounded-xl text-stone-400 hover:text-amber-700 hover:bg-stone-100 transition cursor-pointer"
      title="Modifier les horaires et responsables"
    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>;
  })}
          </div>
        </div> : (
    /* Requests Management Tab */
    <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-display font-bold text-lg text-stone-900">
                Demandes d'Adhésion aux Groupes ({joinRequests.length})
              </h3>
              <p className="text-xs text-stone-500">
                Approuvez ou refusez les demandes soumises depuis le Site Vitrine Public.
              </p>
            </div>
            <span className="text-xs text-stone-500 font-medium">Synchronisation en direct</span>
          </div>

          <div className="space-y-3">
            {joinRequests.map((req) => <div
      key={req.id}
      className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-stone-900 font-bold">{req.userName}</strong>
                    <span className="text-xs text-stone-400">•</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px]">
                      Groupe ciblé : {req.groupName}
                    </span>
                    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${req.status === "accepted" ? "bg-emerald-100 text-emerald-800" : req.status === "rejected" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800 animate-pulse"}`}
    >
                      {req.status === "pending" ? "En attente de validation" : req.status === "accepted" ? "Accept\xE9e" : "D\xE9clin\xE9e"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      {req.userEmail}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      {req.userPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      Date : {req.requestDate}
                    </span>
                  </div>

                  {req.motivationNote && <p className="text-xs text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200 italic">
                      « {req.motivationNote} »
                    </p>}
                </div>

                {req.status === "pending" ? <div className="flex items-center gap-2 shrink-0">
                    <button
      onClick={() => respondToJoinRequest(req.id, false)}
      className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-rose-100 text-stone-700 hover:text-rose-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
    >
                      <X className="w-3.5 h-3.5" />
                      <span>Refuser</span>
                    </button>
                    <button
      onClick={() => respondToJoinRequest(req.id, true)}
      className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-sm cursor-pointer"
    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accepter & Intégrer</span>
                    </button>
                  </div> : <span className="text-xs text-stone-400 font-semibold italic">
                    Dossier traité
                  </span>}
              </div>)}

            {joinRequests.length === 0 && <div className="text-center py-10 text-stone-400 text-xs italic">
                Aucune demande d'adhésion pour le moment.
              </div>}
          </div>
        </div>
  )}

      {
    /* Modal: View Group Roster */
  }
      {selectedGroupForRoster && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[85vh] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    Roster : {selectedGroupForRoster.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Leader : {selectedGroupForRoster.leader} • {getGroupMembers(selectedGroupForRoster.name).length} fidèles inscrits
                  </p>
                </div>
              </div>
              <button
    onClick={() => setSelectedGroupForRoster(null)}
    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            {
    /* Members list */
  }
            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              {getGroupMembers(selectedGroupForRoster.name).map((m) => <div
    key={m.id}
    className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between hover:bg-stone-100 transition"
  >
                  <div className="flex items-center gap-3">
                    <img
    src={m.avatarUrl}
    alt={m.fullName}
    className="w-10 h-10 rounded-xl object-cover border border-stone-200 shadow-xs"
  />
                    <div>
                      <div className="font-bold text-xs text-stone-900 flex items-center gap-2">
                        <span>{m.fullName}</span>
                        <span className="px-2 py-0.2 rounded-full bg-stone-200 text-stone-700 text-[10px] font-semibold">
                          {m.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-3 mt-0.5">
                        <span>{m.phone}</span>
                        <span>•</span>
                        <span>{m.email}</span>
                      </div>
                    </div>
                  </div>

                  <button
    onClick={() => {
      if (window.confirm(`Retirer ${m.fullName} du groupe ${selectedGroupForRoster.name} ?`)) {
        removeMemberFromGroup(m.id);
      }
    }}
    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
    title="Retirer du groupe"
  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>)}

              {getGroupMembers(selectedGroupForRoster.name).length === 0 && <div className="text-center py-8 text-xs text-stone-400 italic">
                  Aucun fidèle n'est encore rattaché à ce pôle.
                </div>}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
    onClick={() => {
      const grp = selectedGroupForRoster;
      setSelectedGroupForRoster(null);
      setSelectedGroupForAddMember(grp);
    }}
    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
  >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Inscrire un nouveau fidèle</span>
              </button>

              <button
    onClick={() => setSelectedGroupForRoster(null)}
    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
  >
                Fermer
              </button>
            </div>
          </div>
        </div>}

      {
    /* Modal: Add Member Directly to Group */
  }
      {selectedGroupForAddMember && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    Inscrire un fidèle dans {selectedGroupForAddMember.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Ajout immédiat dans l'annuaire et le pôle
                  </p>
                </div>
              </div>
              <button
    onClick={() => setSelectedGroupForAddMember(null)}
    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Nom et Prénoms *</label>
                <input
    type="text"
    required
    placeholder="ex: Paul Koffi"
    value={newMemberForm.fullName}
    onChange={(e) => setNewMemberForm({ ...newMemberForm, fullName: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Email</label>
                  <input
    type="email"
    placeholder="email@example.com"
    value={newMemberForm.email}
    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Téléphone</label>
                  <input
    type="tel"
    placeholder="+237 690..."
    value={newMemberForm.phone}
    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Rôle</label>
                  <select
    value={newMemberForm.role}
    onChange={(e) => setNewMemberForm({ ...newMemberForm, role: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  >
                    <option value="Membre">Membre</option>
                    <option value="Adjoint de groupe">Adjoint de groupe</option>
                    <option value="Leader de groupe">Leader de groupe</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Baptisé</label>
                  <select
    value={newMemberForm.isBaptized ? "yes" : "no"}
    onChange={(e) => setNewMemberForm({ ...newMemberForm, isBaptized: e.target.value === "yes" })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  >
                    <option value="yes">Oui, baptisé par immersion</option>
                    <option value="no">Non baptisé / En préparation</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
    type="button"
    onClick={() => setSelectedGroupForAddMember(null)}
    className="px-4 py-2.5 rounded-xl font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow transition cursor-pointer"
  >
                  Enregistrer et intégrer
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* Modal: Edit Group Details */
  }
      {editingGroup && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">
                    Modifier {editingGroup.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Mise à jour des responsables et plannings
                  </p>
                </div>
              </div>
              <button
    onClick={() => setEditingGroup(null)}
    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditGroupSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
    rows={3}
    value={editingGroup.description}
    onChange={(e) => setEditingGroup({ ...editingGroup, description: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Leader principal</label>
                  <input
    type="text"
    value={editingGroup.leader}
    onChange={(e) => setEditingGroup({ ...editingGroup, leader: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Leader adjoint</label>
                  <input
    type="text"
    value={editingGroup.deputyLeader}
    onChange={(e) => setEditingGroup({ ...editingGroup, deputyLeader: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Fréquence de rencontre</label>
                  <input
    type="text"
    value={editingGroup.meetingSchedule}
    onChange={(e) => setEditingGroup({ ...editingGroup, meetingSchedule: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Horaires</label>
                  <input
    type="text"
    value={editingGroup.meetingTime}
    onChange={(e) => setEditingGroup({ ...editingGroup, meetingTime: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
    type="button"
    onClick={() => setEditingGroup(null)}
    className="px-4 py-2.5 rounded-xl font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow transition cursor-pointer"
  >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  GroupsModule
};
