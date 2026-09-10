import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Bell,
  Pin
} from "lucide-react";
const MemberAnnouncements = () => {
  const { announcements } = useChurch();
  const [selectedAudience, setSelectedAudience] = useState("ALL");
  const filteredAnnouncements = announcements.filter((a) => {
    if (selectedAudience === "ALL") return true;
    return a.targetAudience === selectedAudience;
  });
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <Bell className="w-3.5 h-3.5" />
          <span>Tableau d'Affichage Numérique</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Annonces & Communiqués Officiels
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
          Toutes les communications officielles diffusées par le secrétariat général, le corps pastoral et les départements.
        </p>
      </div>

      {
    /* Filter tabs */
  }
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
    onClick={() => setSelectedAudience("ALL")}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${selectedAudience === "ALL" ? "bg-amber-500 text-stone-950 shadow" : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"}`}
  >
          Toutes les annonces ({announcements.length})
        </button>
        <button
    onClick={() => setSelectedAudience("ALL_CHURCH")}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${selectedAudience === "ALL_CHURCH" ? "bg-amber-500 text-stone-950 shadow" : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"}`}
  >
          Toute l'Église
        </button>
        <button
    onClick={() => setSelectedAudience("GROUP")}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${selectedAudience === "GROUP" ? "bg-amber-500 text-stone-950 shadow" : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"}`}
  >
          Par Groupes Spécifiques
        </button>
      </div>

      {
    /* Announcements List */
  }
      <div className="space-y-4">
        {filteredAnnouncements.map((item) => <div
    key={item.id}
    className={`p-6 sm:p-7 rounded-3xl border transition shadow-sm ${item.isPinned ? "bg-amber-50/50 border-amber-300 ring-1 ring-amber-400/30" : "bg-white border-stone-200 hover:border-amber-300"}`}
  >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {item.isPinned && <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                    <Pin className="w-3 h-3 fill-current" />
                    <span>Épinglée</span>
                  </span>}

                <span className="px-2.5 py-0.5 rounded-full bg-stone-900 text-amber-300 text-[10px] font-bold">
                  {item.targetAudience === "ALL_CHURCH" ? "Toute l'\xC9glise" : item.targetGroupName || "Groupe sp\xE9cifique"}
                </span>

                <span className="text-xs text-stone-400">
                  {item.createdAt}
                </span>
              </div>

              <div className="text-[11px] text-stone-500 font-medium">
                Émis par : <strong className="text-stone-800">{item.author}</strong>
              </div>
            </div>

            <h3 className="font-display font-bold text-lg text-stone-900 mb-2">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed">
              {item.content}
            </p>
          </div>)}
      </div>
    </div>;
};
export {
  MemberAnnouncements
};
