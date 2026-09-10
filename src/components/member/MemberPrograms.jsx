import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Bell,
  Users
} from "lucide-react";
const MemberPrograms = () => {
  const { programs, showToast } = useChurch();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [reminderSetMap, setReminderSetMap] = useState({});
  const categories = ["ALL", "Culte principal", "\xC9tude & Enseignement", "Intercession", "Jeunesse", "D\xE9partement"];
  const filteredPrograms = programs.filter((p) => {
    const q = (searchQuery || "").trim().toLowerCase();
    const matchCat = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchSearch = !q || p.title && p.title.toLowerCase().includes(q) || p.day && p.day.toLowerCase().includes(q) || p.leader && p.leader.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
  const handleToggleReminder = (progId, title) => {
    const nextState = !reminderSetMap[progId];
    setReminderSetMap((prev) => ({ ...prev, [progId]: nextState }));
    if (nextState) {
      showToast(
        "Rappel activ\xE9 \u23F0",
        `Vous recevrez une notification 30 minutes avant le d\xE9but de \xAB ${title} \xBB.`,
        "success"
      );
    } else {
      showToast("Rappel d\xE9sactiv\xE9", `Le rappel pour \xAB ${title} \xBB a \xE9t\xE9 retir\xE9.`, "info");
    }
  };
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Liturgie & Assemblées</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Programmes des Cultes & Rassemblements
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
          Retrouvez tous les rendez-vous réguliers de la semaine, les cultes dominicaux, les études bibliques et les réunions de départements synchronisés en direct.
        </p>
      </div>

      {
    /* Filters & Search */
  }
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {
    /* Categories */
  }
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => <button
    key={cat}
    onClick={() => setSelectedCategory(cat)}
    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${selectedCategory === cat ? "bg-amber-500 text-stone-950 shadow" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
  >
                {cat === "ALL" ? "Tous les programmes" : cat}
              </button>)}
          </div>

          {
    /* Search Bar */
  }
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Rechercher par jour, titre, pasteur..."
    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
  />
          </div>
        </div>

        {
    /* Programs Grid */
  }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredPrograms.map((prog) => {
    const hasReminder = reminderSetMap[prog.id];
    return <div
      key={prog.id}
      className="bg-stone-50 rounded-3xl p-6 border border-stone-200/90 hover:border-amber-400 transition flex flex-col justify-between space-y-4"
    >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-extrabold shadow">
                      {prog.day}
                    </span>
                    <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{prog.startTime} – {prog.endTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-stone-900 leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="space-y-1.5 pt-2 text-[11px] text-stone-500 border-t border-stone-200/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>{prog.room}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-500" />
                      <span>Conduit par : <strong>{prog.leader}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-stone-400">
                    Mis à jour : {prog.updatedAt}
                  </span>

                  <button
      onClick={() => handleToggleReminder(prog.id, prog.title)}
      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${hasReminder ? "bg-amber-500 text-stone-950 shadow" : "bg-stone-200 hover:bg-stone-300 text-stone-800"}`}
    >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{hasReminder ? "Rappel activ\xE9 \u2713" : "M'alerter"}</span>
                  </button>
                </div>
              </div>;
  })}
        </div>
      </div>
    </div>;
};
export {
  MemberPrograms
};
