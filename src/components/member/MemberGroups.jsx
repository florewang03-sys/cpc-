import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Users,
  Clock,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  Shield,
  X,
  Send
} from "lucide-react";
const MemberGroups = () => {
  const {
    groups,
    currentUser,
    requestToJoinGroup,
    getUserGroupRequestStatus,
    joinRequests,
    showToast
  } = useChurch();
  const [selectedGroupModal, setSelectedGroupModal] = useState(null);
  const [joinModalGroup, setJoinModalGroup] = useState(null);
  const [motivationNote, setMotivationNote] = useState("");
  const handleOpenJoinModal = (group) => {
    setJoinModalGroup(group);
    setMotivationNote("");
  };
  const handleConfirmJoin = (e) => {
    e.preventDefault();
    if (!joinModalGroup) return;
    const res = requestToJoinGroup(joinModalGroup.id, motivationNote);
    if (res.success) {
      setJoinModalGroup(null);
    }
  };
  const joinedGroups = groups.filter((g) => {
    const status = getUserGroupRequestStatus(g.id);
    return status === "accepted" || currentUser.groupName && g.name && currentUser.groupName.toLowerCase().includes(g.name.toLowerCase());
  });
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Vie Communautaire & Départements</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Les 7 Groupes & Ministères de l'Église
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
          Chaque fidèle est encouragé à s'enraciner dans un département ministériel pour grandir dans sa foi, servir les autres et développer ses dons spirituels.
        </p>
      </div>

      {
    /* Section 1: Mes Groupes Actifs */
  }
      {joinedGroups.length > 0 && <div className="space-y-4">
          <h2 className="font-display font-extrabold text-lg text-stone-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Mes Départements Actifs</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {joinedGroups.map((group) => <div
    key={group.id}
    className="bg-white rounded-3xl p-6 border-2 border-amber-500/30 shadow-md flex flex-col justify-between relative overflow-hidden"
  >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
    src={group.imageUrl}
    alt={group.name}
    className="w-14 h-14 rounded-2xl object-cover border border-amber-500/30 shadow"
  />
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Membre actif ✓
                        </span>
                        <h3 className="font-display font-extrabold text-base text-stone-900 mt-1">
                          {group.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-stone-600 border-t border-stone-100">
                    <div>
                      <span className="text-stone-400 block">Rencontres :</span>
                      <strong className="text-stone-800">{group.meetingSchedule}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Horaires :</span>
                      <strong className="text-amber-800">{group.meetingTime}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Leader :</span>
                      <strong className="text-stone-800">{group.leader}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Membres :</span>
                      <strong className="text-stone-800">{group.membersCount} fidèles</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
    onClick={() => setSelectedGroupModal(group)}
    className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
  >
                    <span>Voir les activités & planning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>)}
          </div>
        </div>}

      {
    /* Section 2: Tous les 7 Groupes Disponibles */
  }
      <div className="space-y-4">
        <div>
          <h2 className="font-display font-extrabold text-xl text-stone-900">
            Explorer les 7 Groupes Ministériels
          </h2>
          <p className="text-xs text-stone-500">
            Rejoignez le groupe qui correspond à votre appel ou votre étape de vie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => {
    const status = getUserGroupRequestStatus(group.id);
    const isMember = status === "accepted" || currentUser.groupName && group.name && currentUser.groupName.toLowerCase().includes(group.name.toLowerCase());
    return <div
      key={group.id}
      className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:border-amber-400 transition flex flex-col justify-between space-y-4"
    >
                <div className="space-y-3">
                  <div className="relative h-36 rounded-2xl overflow-hidden bg-stone-900">
                    <img
      src={group.imageUrl}
      alt={group.name}
      className="w-full h-full object-cover"
    />
                    <div className="absolute top-3 right-3">
                      {isMember ? <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow">
                          Membre ✓
                        </span> : status === "pending" ? <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold shadow flex items-center gap-1">
                          <Hourglass className="w-3 h-3 animate-spin" />
                          <span>Demande en attente</span>
                        </span> : <span className="px-2.5 py-1 rounded-full bg-stone-900/80 text-amber-300 text-[10px] font-bold backdrop-blur-sm">
                          {group.membersCount} membres
                        </span>}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-stone-900">
                    {group.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {group.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-[11px] text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{group.meetingSchedule} ({group.meetingTime})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-stone-500" />
                      <span>Leader : {group.leader}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
      onClick={() => setSelectedGroupModal(group)}
      className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition cursor-pointer"
    >
                    Détails
                  </button>

                  {isMember ? <span className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                      Inscrit
                    </span> : status === "pending" ? <span className="px-3 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold text-center">
                      En attente
                    </span> : <button
      onClick={() => handleOpenJoinModal(group)}
      className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition cursor-pointer shadow"
    >
                      Rejoindre +
                    </button>}
                </div>
              </div>;
  })}
        </div>
      </div>

      {
    /* Modal: Request to Join Group Form */
  }
      {joinModalGroup && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-stone-900">
                    Rejoindre « {joinModalGroup.name} »
                  </h3>
                  <p className="text-xs text-stone-500">
                    Votre demande sera transmise au leader {joinModalGroup.leader}.
                  </p>
                </div>
              </div>
              <button
    onClick={() => setJoinModalGroup(null)}
    className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmJoin} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
                <div><strong>Demandeur :</strong> {currentUser.fullName}</div>
                <div><strong>Email :</strong> {currentUser.email}</div>
                <div><strong>Téléphone :</strong> {currentUser.phone}</div>
                <div><strong>Rendez-vous :</strong> {joinModalGroup.meetingSchedule} ({joinModalGroup.meetingTime})</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Mot de motivation ou présentation (optionnel)
                </label>
                <textarea
    value={motivationNote}
    onChange={(e) => setMotivationNote(e.target.value)}
    rows={3}
    placeholder="Expliquez brièvement pourquoi vous désirez rejoindre ce département..."
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-stone-900 bg-stone-50"
  />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
    type="button"
    onClick={() => setJoinModalGroup(null)}
    className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer transition"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition"
  >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer ma demande</span>
                </button>
              </div>
            </form>
          </div>
        </div>}

      {
    /* Modal: Group Details */
  }
      {selectedGroupModal && <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
    src={selectedGroupModal.imageUrl}
    alt={selectedGroupModal.name}
    className="w-16 h-16 rounded-2xl object-cover shadow"
  />
                <div>
                  <h3 className="font-display font-extrabold text-xl text-stone-900">
                    {selectedGroupModal.name}
                  </h3>
                  <p className="text-xs text-amber-800 font-bold">
                    {selectedGroupModal.meetingSchedule} • {selectedGroupModal.meetingTime}
                  </p>
                </div>
              </div>
              <button
    onClick={() => setSelectedGroupModal(null)}
    className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition cursor-pointer"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-stone-700">
              <p className="leading-relaxed">{selectedGroupModal.description}</p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-400 block text-[11px]">Leader Principal :</span>
                  <strong className="text-stone-900 text-xs">{selectedGroupModal.leader}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Adjoint(e) :</span>
                  <strong className="text-stone-900 text-xs">{selectedGroupModal.deputyLeader || "En cours de nomination"}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Effectif :</span>
                  <strong className="text-stone-900 text-xs">{selectedGroupModal.membersCount} fidèles inscrits</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Jour fixe :</span>
                  <strong className="text-amber-800 text-xs">{selectedGroupModal.meetingDay}</strong>
                </div>
              </div>

              {selectedGroupModal.activities && <div className="space-y-2">
                  <h4 className="font-bold text-stone-900 text-xs">
                    Activités & Projets phares :
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGroupModal.activities.map((act, i) => <span
    key={i}
    className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-medium text-[11px]"
  >
                        ✓ {act}
                      </span>)}
                  </div>
                </div>}
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
    onClick={() => setSelectedGroupModal(null)}
    className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold cursor-pointer"
  >
                Fermer
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  MemberGroups
};
