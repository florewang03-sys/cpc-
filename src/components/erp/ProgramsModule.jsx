import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  ExternalLink,
  X
} from "lucide-react";
const ProgramsModule = () => {
  const { programs, addProgram, updateProgram, deleteProgram, navigateTo } = useChurch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("Mercredi");
  const [startTime, setStartTime] = useState("18h00");
  const [endTime, setEndTime] = useState("20h00");
  const [room, setRoom] = useState("Sanctuaire Principal");
  const [leader, setLeader] = useState("Pasteur Jean-Marc Kouam\xE9");
  const [category, setCategory] = useState("\xC9tude & Enseignement");
  const [description, setDescription] = useState("");
  const [groupAffiliation, setGroupAffiliation] = useState("");
  const openCreateModal = () => {
    setEditingProgram(null);
    setTitle("");
    setDay("Mercredi");
    setStartTime("18h00");
    setEndTime("20h00");
    setRoom("Sanctuaire Principal");
    setLeader("Pasteur Jean-Marc Kouam\xE9");
    setCategory("\xC9tude & Enseignement");
    setDescription("");
    setGroupAffiliation("");
    setShowAddModal(true);
  };
  const openEditModal = (prog) => {
    setEditingProgram(prog);
    setTitle(prog.title);
    setDay(prog.day);
    setStartTime(prog.startTime);
    setEndTime(prog.endTime);
    setRoom(prog.room);
    setLeader(prog.leader);
    setCategory(prog.category);
    setDescription(prog.description);
    setGroupAffiliation(prog.groupAffiliation || "");
    setShowAddModal(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    if (editingProgram) {
      updateProgram({
        ...editingProgram,
        title,
        day,
        startTime,
        endTime,
        room,
        leader,
        category,
        description,
        groupAffiliation: groupAffiliation || void 0
      });
    } else {
      addProgram({
        title,
        day,
        startTime,
        endTime,
        room,
        leader,
        category,
        description,
        groupAffiliation: groupAffiliation || void 0,
        isRecurring: true
      });
    }
    setShowAddModal(false);
  };
  return <div className="space-y-6 animate-fadeIn">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-stone-900">
            Gestion des Programmes & Cultes ({programs.length})
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Planning officiel des réunions. Les modifications se répercutent en direct sur le site vitrine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
    onClick={() => navigateTo("public", "Programmes")}
    className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-sm"
  >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            <span>Voir sur le Site Public</span>
          </button>
          <button
    onClick={openCreateModal}
    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
  >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Culte / Programme</span>
          </button>
        </div>
      </div>

      {
    /* Real-time Alert */
  }
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>
            <strong>Synchronisation Bidirectionnelle Active :</strong> modifiez un horaire ou un titre ci-dessous pour tester l'impact instantané sur la page publique des programmes.
          </span>
        </div>
      </div>

      {
    /* Programs List Table */
  }
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Jour & Horaires</th>
                <th className="py-3.5 px-4">Titre du Programme</th>
                <th className="py-3.5 px-4">Catégorie</th>
                <th className="py-3.5 px-4">Lieu / Salle</th>
                <th className="py-3.5 px-4">Responsable</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {programs.map((prog) => <tr key={prog.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        {prog.day}
                      </span>
                      <p className="font-bold text-stone-800 text-xs mt-1">
                        {prog.startTime} – {prog.endTime}
                      </p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <strong className="text-stone-900 text-sm block">{prog.title}</strong>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{prog.description}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold border border-stone-200">
                      {prog.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-stone-700 font-medium">{prog.room}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-stone-800 font-medium">{prog.leader}</span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
    onClick={() => openEditModal(prog)}
    title="Modifier"
    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
  >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
    onClick={() => deleteProgram(prog.id)}
    title="Supprimer"
    className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-100 text-rose-700"
  >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {
    /* Modal Add / Edit */
  }
      {showAddModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Planning des Cultes
                </span>
                <h3 className="font-display font-bold text-2xl text-stone-900 mt-0.5">
                  {editingProgram ? "Modifier le Culte" : "Programmer un Nouveau Culte"}
                </h3>
              </div>
              <button
    onClick={() => setShowAddModal(false)}
    className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Titre du Programme *</label>
                <input
    type="text"
    required
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex : Grande Célébration Dominicale"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Jour *</label>
                  <select
    value={day}
    onChange={(e) => setDay(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  >
                    <option value="Mercredi">Mercredi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                    <option value="Dimanche">Dimanche</option>
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Jeudi">Jeudi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Heure début *</label>
                  <input
    type="text"
    required
    value={startTime}
    onChange={(e) => setStartTime(e.target.value)}
    placeholder="18h00"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Heure fin *</label>
                  <input
    type="text"
    required
    value={endTime}
    onChange={(e) => setEndTime(e.target.value)}
    placeholder="20h00"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Salle / Lieu *</label>
                  <input
    type="text"
    required
    value={room}
    onChange={(e) => setRoom(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Prédicateur / Dirigeant</label>
                  <input
    type="text"
    value={leader}
    onChange={(e) => setLeader(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description / Objectif</label>
                <textarea
    rows={3}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Détails sur le déroulement..."
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs"
  />
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
                  {editingProgram ? "Enregistrer les Modifications" : "Cr\xE9er et Publier"}
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  ProgramsModule
};
