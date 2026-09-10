import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Search,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Edit2,
  X
} from "lucide-react";
const MembersModule = () => {
  const { members, addMember, updateMember, groups, showToast } = useChurch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Membre");
  const [groupName, setGroupName] = useState("Assembl\xE9e G\xE9n\xE9rale");
  const [isBaptized, setIsBaptized] = useState(true);
  const [status, setStatus] = useState("Actif");
  const filteredMembers = members.filter((m) => {
    const q = (searchTerm || "").trim().toLowerCase();
    const matchSearch = !q || m.fullName && m.fullName.toLowerCase().includes(q) || m.email && m.email.toLowerCase().includes(q) || m.phone && m.phone.includes(q);
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    const matchGroup = groupFilter === "all" || m.groupName === groupFilter;
    return matchSearch && matchStatus && matchGroup;
  });
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email) return;
    addMember({
      fullName,
      email,
      phone: phone || "+237 600 00 00 00",
      role,
      groupName,
      isBaptized,
      status,
      joinedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      address: "New Bell Ngangu\xE9, Douala"
    });
    setShowAddModal(false);
    setFullName("");
    setEmail("");
    setPhone("");
  };
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Nom,Email,T\xE9l\xE9phone,R\xF4le,D\xE9partement,Statut,Baptis\xE9\n" + filteredMembers.map(
      (m) => `"${m.fullName}","${m.email}","${m.phone}","${m.role}","${m.groupName}","${m.status}","${m.isBaptized ? "Oui" : "Non"}"`
    ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `membres_cpcn_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Export CSV R\xE9ussi", `${filteredMembers.length} membres export\xE9s.`, "success");
  };
  return <div className="space-y-6 animate-fadeIn">
      {
    /* Header with Stats & Export */
  }
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-stone-900">
            Annuaire & Gestion des Membres ({members.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Suivi spirituel, statut de baptême, intégration dans les 7 groupes et coordonnées.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
    onClick={handleExportCSV}
    className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
  >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter CSV</span>
          </button>
          <button
    onClick={() => setShowAddModal(true)}
    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
            <Plus className="w-4 h-4" />
            <span>Nouveau Membre</span>
          </button>
        </div>
      </div>

      {
    /* Filter & Search Bar */
  }
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Rechercher par nom, email, téléphone..."
    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
        </div>

        <div className="sm:col-span-3">
          <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="w-full p-2 rounded-xl border border-stone-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  >
            <option value="all">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="Visiteur">Visiteur</option>
            <option value="En attente">En intégration</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
    value={groupFilter}
    onChange={(e) => setGroupFilter(e.target.value)}
    className="w-full p-2 rounded-xl border border-stone-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  >
            <option value="all">Tous les départements</option>
            {groups.map((g) => <option key={g.id} value={g.name}>{g.name}</option>)}
          </select>
        </div>
      </div>

      {
    /* Members Table */
  }
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Membre</th>
                <th className="py-3.5 px-4">Coordonnées</th>
                <th className="py-3.5 px-4">Rôle / Fonction</th>
                <th className="py-3.5 px-4">Département</th>
                <th className="py-3.5 px-4">Statut Baptême</th>
                <th className="py-3.5 px-4">État</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMembers.map((member) => <tr key={member.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
    src={member.avatarUrl}
    alt={member.fullName}
    className="w-8 h-8 rounded-full object-cover shrink-0 border border-stone-200"
  />
                      <div>
                        <strong className="text-stone-900 font-semibold block text-sm">
                          {member.fullName}
                        </strong>
                        <span className="text-[10px] text-stone-400">Adhésion : {member.joinedDate}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="flex items-center gap-1 text-stone-700">
                        <Mail className="w-3 h-3 text-stone-400" /> {member.email}
                      </span>
                      <span className="flex items-center gap-1 text-stone-500">
                        <Phone className="w-3 h-3 text-stone-400" /> {member.phone}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-stone-800">{member.role}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-medium border border-stone-200">
                      {member.groupName}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {member.isBaptized ? <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Baptisé(e)
                      </span> : <span className="inline-flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                        <Clock className="w-3.5 h-3.5" /> Non baptisé
                      </span>}
                  </td>

                  <td className="py-3 px-4">
                    <span
    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${member.status === "Actif" ? "bg-emerald-100 text-emerald-900" : member.status === "Visiteur" ? "bg-blue-100 text-blue-900" : "bg-stone-200 text-stone-700"}`}
  >
                      {member.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
    onClick={() => updateMember({
      ...member,
      status: member.status === "Actif" ? "Visiteur" : "Actif"
    })}
    title="Basculer Statut Actif / Visiteur"
    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
  >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {
    /* Add Member Modal */
  }
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Enregistrement Pastoral
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  Nouveau Membre de l'Assemblée
                </h3>
              </div>
              <button
    onClick={() => setShowAddModal(false)}
    className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Nom et Prénom *</label>
                <input
    type="text"
    required
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    placeholder="Ex : Samuel Diallo"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Email *</label>
                  <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Téléphone</label>
                  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Rôle / Ministère</label>
                  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="Membre">Membre</option>
                    <option value="Leader de groupe">Leader de groupe</option>
                    <option value="Adjoint de groupe">Adjoint de groupe</option>
                    <option value="Leader principal">Leader principal</option>
                    <option value="Pasteur">Pasteur</option>
                    <option value="Administrateur">Administrateur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Département</label>
                  <select
    value={groupName}
    onChange={(e) => setGroupName(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="Assemblée Générale">Assemblée Générale</option>
                    {groups.map((g) => <option key={g.id} value={g.name}>{g.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Statut Baptême</label>
                  <select
    value={isBaptized ? "yes" : "no"}
    onChange={(e) => setIsBaptized(e.target.value === "yes")}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="yes">Baptisé(e) par immersion</option>
                    <option value="no">Non baptisé(e)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">État</label>
                  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="Actif">Actif</option>
                    <option value="Visiteur">Visiteur</option>
                    <option value="En attente">En attente</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
    type="button"
    onClick={() => setShowAddModal(false)}
    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
  >
                  Annuler
                </button>
                <button
    type="submit"
    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-lg"
  >
                  Enregistrer le Membre
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  MembersModule
};
