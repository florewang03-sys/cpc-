import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
  Sparkles,
  Flame,
  ArrowRight,
  X
} from "lucide-react";
const EventsPublicView = () => {
  const { events, registerForEvent, currentUser } = useChurch();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [regName, setRegName] = useState(currentUser.fullName);
  const [regEmail, setRegEmail] = useState(currentUser.email);
  const [regPhone, setRegPhone] = useState(currentUser.phone);
  const [regConfirmed, setRegConfirmed] = useState(false);
  const filteredEvents = events.filter((e) => {
    const q = (searchTerm || "").trim().toLowerCase();
    const matchSearch = !q || e.title && e.title.toLowerCase().includes(q) || e.description && e.description.toLowerCase().includes(q) || e.speaker && e.speaker.toLowerCase().includes(q);
    const matchCat = categoryFilter === "all" || e.category === categoryFilter;
    return matchSearch && matchCat && e.isPublished;
  });
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!selectedEventForModal) return;
    registerForEvent(selectedEventForModal.id, regName, regEmail);
    setRegConfirmed(true);
  };
  const closeModal = () => {
    setSelectedEventForModal(null);
    setRegConfirmed(false);
  };
  return <div className="space-y-14 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {
    /* Header Banner */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-amber-700" /> Grands Rendez-vous & Campagnes
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-stone-900">
          Événements
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Campagnes d'évangélisation en plein air, nuits de prière et de délivrance, journées de jeûne pour les examens et actions sociales à New Bell Ngangué.
        </p>
      </div>

      {
    /* Filter and Search Bar */
  }
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Rechercher un événement, date, orateur..."
    className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
  />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-stone-500">Filtrer :</span>
          <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="p-2 rounded-xl border border-stone-300 bg-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none text-stone-800"
  >
            <option value="all">Tous les événements</option>
            <option value="Campagne d'évangélisation">Campagnes d'Évangélisation</option>
            <option value="Jeûne & Prière">Jeûne & Prières</option>
            <option value="Social & Orphelins">Social & Orphelins</option>
            <option value="Retraite">Retraites Spirituelles</option>
            <option value="Jeunesse">Jeunesse & Camps</option>
          </select>
        </div>
      </div>

      {
    /* Events Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => <div
    key={evt.id}
    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
  >
            <div>
              <div className="relative h-60 overflow-hidden bg-stone-900">
                <img
    src={evt.imageUrl}
    alt={evt.title}
    className="w-full h-full object-cover"
    referrerPolicy="no-referrer"
  />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-extrabold text-xs shadow-md">
                    {evt.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5" /> {evt.displayDate}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
                    {evt.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-stone-600 leading-relaxed">
                  {evt.description}
                </p>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span><strong>Horaires :</strong> {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span><strong>Lieu :</strong> {evt.location}</span>
                  </div>
                  {evt.speaker && <div className="flex items-center gap-2 text-stone-800">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span><strong>Orateurs :</strong> {evt.speaker}</span>
                    </div>}
                </div>

                {
    /* Capacity & Progress */
  }
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-stone-500 text-[11px]">
                    <span>Inscriptions :</span>
                    <strong className="text-stone-900">{evt.registeredCount} / {evt.maxCapacity} places</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
    className="h-full bg-emerald-600 rounded-full"
    style={{ width: `${Math.min(100, evt.registeredCount / evt.maxCapacity * 100)}%` }}
  />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                Entrée Libre
              </span>

              <button
    onClick={() => {
      setSelectedEventForModal(evt);
      setRegConfirmed(false);
    }}
    className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
  >
                <span>S'inscrire à l'événement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>)}
      </div>

      {
    /* Registration Modal */
  }
      {selectedEventForModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Réservation de Pass Gratuit
                </span>
                <h3 className="font-display font-bold text-xl text-stone-900 mt-0.5">
                  {selectedEventForModal.title}
                </h3>
              </div>
              <button
    onClick={closeModal}
    className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!regConfirmed ? <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1">
                  <p><strong>Date :</strong> {selectedEventForModal.displayDate} ({selectedEventForModal.time})</p>
                  <p><strong>Lieu :</strong> {selectedEventForModal.location}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <input
    type="text"
    required
    value={regName}
    onChange={(e) => setRegName(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Adresse e-mail (pour recevoir votre e-billet) *
                  </label>
                  <input
    type="email"
    required
    value={regEmail}
    onChange={(e) => setRegEmail(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Téléphone portable (SMS de rappel)
                  </label>
                  <input
    type="tel"
    value={regPhone}
    onChange={(e) => setRegPhone(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
    type="button"
    onClick={closeModal}
    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
  >
                    Annuler
                  </button>
                  <button
    type="submit"
    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-lg"
  >
                    Confirmer l'inscription
                  </button>
                </div>
              </form> : (
    /* Success / Ticket View */
    <div className="space-y-4 text-center py-2 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-2xl text-emerald-900">
                  Inscription Validée avec Succès !
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Votre place pour <strong>{selectedEventForModal.title}</strong> a été enregistrée au nom de <strong>{regName}</strong>.
                </p>

                {
      /* Digital Simulated Ticket */
    }
                <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 border border-amber-500/40 text-left relative overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
                    <span className="font-cinzel font-bold text-amber-400 text-sm">CPC CONNECT PASS</span>
                    <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded text-white font-bold">CONFIRMÉ</span>
                  </div>
                  <p className="font-display font-bold text-base text-white">{selectedEventForModal.title}</p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-300 mt-2">
                    <div>
                      <span className="text-stone-500 block text-[10px]">Participant</span>
                      <strong>{regName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Date & Heure</span>
                      <strong>{selectedEventForModal.displayDate}</strong>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] text-amber-300/80 flex items-center justify-between">
                    <span>Pass n° #CPC-{Math.floor(1e5 + Math.random() * 9e5)}</span>
                    <span>Présentez ce pass à l'accueil</span>
                  </div>
                </div>

                <div className="pt-3 flex justify-center">
                  <button
      onClick={closeModal}
      className="px-6 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
    >
                    Fermer
                  </button>
                </div>
              </div>
  )}
          </div>
        </div>}
    </div>;
};
export {
  EventsPublicView
};
