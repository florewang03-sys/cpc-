import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Check,
  Tag
} from "lucide-react";
const MemberEvents = () => {
  const { events, currentUser, registerForEvent, showToast } = useChurch();
  const [registeredMap, setRegisteredMap] = useState({});
  const handleRegister = (eventId, title) => {
    registerForEvent(eventId, currentUser.fullName, currentUser.email);
    setRegisteredMap((prev) => ({ ...prev, [eventId]: true }));
    showToast(
      "Inscription confirm\xE9e \u{1F389}",
      `Votre place pour l'\xE9v\xE9nement \xAB ${title} \xBB est enregistr\xE9e. Un pass num\xE9rique vous a \xE9t\xE9 r\xE9serv\xE9.`,
      "success"
    );
  };
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Événements & Conférences</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Grandes Célébrations & Séminaires
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
          Inscrivez-vous directement aux conventions spirituelles, retraites de jeûne, galas chrétiens et ateliers de croissance organisés par l'Église CPC.
        </p>
      </div>

      {
    /* Events Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((evt) => {
    const isRegistered = registeredMap[evt.id];
    return <div
      key={evt.id}
      className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:border-amber-400 transition flex flex-col justify-between"
    >
              <div>
                <div className="relative h-48 sm:h-56 bg-stone-900 overflow-hidden">
                  <img
      src={evt.imageUrl}
      alt={evt.title}
      className="w-full h-full object-cover"
    />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-extrabold text-xs shadow-lg">
                      {evt.displayDate}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-stone-950/80 text-amber-300 text-xs font-bold backdrop-blur-sm">
                      {evt.registeredCount} inscrits
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{evt.category}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-stone-900">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 pt-3 text-xs text-stone-600 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-700" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-700" />
                      <span>{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-stone-500" />
                      <span>Orateur / Responsable : <strong>{evt.speaker}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between gap-3 mt-4">
                {isRegistered ? <div className="w-full py-3 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Vous êtes inscrit à cet événement</span>
                  </div> : <button
      onClick={() => handleRegister(evt.id, evt.title)}
      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-xs shadow-lg transition hover:scale-[1.01] active:scale-99 flex items-center justify-center gap-2 cursor-pointer"
    >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmer ma Présence (Gratuit)</span>
                  </button>}
              </div>
            </div>;
  })}
      </div>
    </div>;
};
export {
  MemberEvents
};
