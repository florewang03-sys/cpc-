import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  User,
  CheckCircle2,
  Save
} from "lucide-react";
const MemberProfile = () => {
  const { currentUser, activeRole, showToast } = useChurch();
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address || "Douala, Quartier Ngangue");
  const [spiritualGifts, setSpiritualGifts] = useState(
    currentUser.spiritualGifts?.join(", ") || "Intercession, Enseignement, Accueil"
  );
  const handleSave = (e) => {
    e.preventDefault();
    showToast(
      "Profil mis \xE0 jour \u2705",
      "Vos informations personnelles et spirituelles ont \xE9t\xE9 enregistr\xE9es avec succ\xE8s.",
      "success"
    );
  };
  return <div className="space-y-8 select-none">
      {
    /* Header */
  }
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
          <User className="w-3.5 h-3.5" />
          <span>Fiche Spirituelle & Personnelle</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Mon Profil Fidèle
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
          Gérez vos coordonnées, consultez votre statut de baptême, votre département d'attache et vos préférences de communication.
        </p>
      </div>

      {
    /* Form Grid */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left Column (4 cols): User badge & status */
  }
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-amber-500/30 shadow-lg">
              <img
    src={currentUser.avatarUrl}
    alt={currentUser.fullName}
    className="w-full h-full object-cover"
  />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-lg text-stone-900">
                {currentUser.fullName}
              </h3>
              <span className="px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-bold inline-block mt-1">
                {activeRole}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-stone-500">Membre depuis :</span>
                <strong className="text-stone-800">{currentUser.memberSince || "2021"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Baptême par immersion :</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Oui</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Département :</span>
                <strong className="text-amber-800">{currentUser.groupName || "Jeunesse"}</strong>
              </div>
            </div>
          </div>
        </div>

        {
    /* Right Column (8 cols): Edit form */
  }
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <h3 className="font-display font-bold text-lg text-stone-900 mb-5">
              Informations Personnelles
            </h3>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Nom & Prénom *
                  </label>
                  <input
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
    required
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Adresse Email *
                  </label>
                  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
    required
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Numéro de Téléphone / WhatsApp *
                  </label>
                  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
    required
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">
                    Ville & Quartier
                  </label>
                  <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">
                  Dons spirituels & Domaines de service
                </label>
                <input
    type="text"
    value={spiritualGifts}
    onChange={(e) => setSpiritualGifts(e.target.value)}
    placeholder="Ex : Chant, Intercession, Enseignement..."
    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-stone-50"
  />
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
    type="submit"
    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition hover:scale-105"
  >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer mes modifications</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export {
  MemberProfile
};
