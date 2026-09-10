import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Heart,
  Smartphone,
  Building,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MapPin,
  Flame,
  HandHeart
} from "lucide-react";
const DonationsPublicView = () => {
  const { currentUser, showToast } = useChurch();
  const [donationCategory, setDonationCategory] = useState("orphelins");
  const [frequency, setFrequency] = useState("once");
  const [paymentMethod, setPaymentMethod] = useState("mobile_money");
  const [donorName, setDonorName] = useState(currentUser?.fullName || "");
  const [donorEmail, setDonorEmail] = useState(currentUser?.email || "");
  const [donorPhone, setDonorPhone] = useState(currentUser?.phone || "");
  const [prayerNote, setPrayerNote] = useState("");
  const [completedDonation, setCompletedDonation] = useState(null);
  const categories = [
    {
      id: "orphelins",
      title: "Soutien aux Orphelins & \u0152uvres Sociales",
      desc: "Kits scolaires, vivres, aide alimentaire et assistance aux enfants orphelins et veuves de Ngangu\xE9.",
      icon: HandHeart
    },
    {
      id: "evangelisation",
      title: "Campagnes d'\xC9vang\xE9lisation",
      desc: "Proclamation de l'\xC9vangile en plein air, sonorisation, logistique et moisson des \xE2mes.",
      icon: Flame
    },
    {
      id: "dime",
      title: "D\xEEme & Cons\xE9cration",
      desc: "Fid\xE9lit\xE9 et cons\xE9cration selon la Parole de Dieu pour l'avancement du Royaume.",
      icon: Heart
    },
    {
      id: "offrande",
      title: "Offrande de Culte & Actions de Gr\xE2ce",
      desc: "Offrande volontaire en reconnaissance des bont\xE9s et bienfaits du Seigneur.",
      icon: Sparkles
    },
    {
      id: "sanctuaire",
      title: "Am\xE9nagement & Travaux du Sanctuaire",
      desc: "Entretien, \xE9quipements et rayonnement du lieu de culte \xE0 New Bell Ngangu\xE9.",
      icon: Building
    }
  ];
  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const selectedCat = categories.find((c) => c.id === donationCategory);
    const methodLabels = {
      mobile_money: "Mobile Money (Orange Money / MTN MoMo)",
      transfer: "Virement bancaire",
      church_office: "D\xE9p\xF4t direct au Secr\xE9tariat (New Bell Ngangu\xE9)"
    };
    const ref = `DON-CPC-${Math.floor(1e5 + Math.random() * 9e5)}`;
    setCompletedDonation({
      reference: ref,
      categoryTitle: selectedCat?.title || "Don g\xE9n\xE9ral",
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }),
      methodLabel: methodLabels[paymentMethod] || "Mobile Money"
    });
    showToast(
      "Don enregistr\xE9",
      "Votre intention de don a \xE9t\xE9 transmise avec succ\xE8s. Que Dieu vous b\xE9nisse !",
      "success"
    );
  };
  return <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-in fade-in duration-200">
      {
    /* Header Banner */
  }
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 font-bold text-xs uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-amber-700 fill-current" /> Soutenir l'œuvre de Dieu
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-stone-900">
          Don
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie. » — 2 Corinthiens 9:7
        </p>
      </div>

      {
    /* Main Container */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Left Column: Information on impact and transparency */
  }
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-amber-900/40 shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Vocation & Affectation des Dons
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              Une semence féconde pour le Royaume
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Vos dons soutiennent concrètement la mission pastorale, les orphelins et veuves de Ngangué, les campagnes d'évangélisation en plein air et la vie spirituelle de la communauté.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700 flex items-start gap-3">
                <HandHeart className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Œuvres Sociales & Orphelins</strong>
                  <span className="text-stone-400">Assistance directe aux familles et enfants défavorisés du quartier.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700 flex items-start gap-3">
                <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Évangélisation & Salut</strong>
                  <span className="text-stone-400">Organisation des grandes campagnes publiques et diffusion de l'Évangile.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-800/90 border border-stone-700 flex items-start gap-3">
                <Building className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Sanctuaire & Culte</strong>
                  <span className="text-stone-400">Lieu de recueillement, de délivrance et de prière ouvert à tous.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center gap-2 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Gestion transparente & traçabilité par le Diaconat</span>
            </div>
          </div>

          {
    /* Location note */
  }
          <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-2 text-xs text-stone-600">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Dépôt physique & Secrétariat</span>
            </div>
            <p>
              Vous pouvez également déposer vos dîmes et dons directement au bureau pastoral de l'église : <strong>Sanctuaire Central CPC, New Bell Ngangué (Lieu-dit Maison Blanche), Douala.</strong>
            </p>
          </div>
        </div>

        {
    /* Right Column: Donation Form without visible amounts */
  }
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl space-y-6">
            {!completedDonation ? <form onSubmit={handleDonateSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-2xl text-stone-900">
                    Faire un Don
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Sélectionnez la destination de votre don et le canal souhaité.
                  </p>
                </div>

                {
    /* 1. Affectation */
  }
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2.5">
                    1. Destination de votre don :
                  </label>
                  <div className="space-y-2.5">
                    {categories.map((cat) => {
    const Icon = cat.icon;
    const isSelected = donationCategory === cat.id;
    return <div
      key={cat.id}
      onClick={() => setDonationCategory(cat.id)}
      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${isSelected ? "bg-amber-50/80 border-amber-500 shadow-sm ring-1 ring-amber-400" : "bg-stone-50/70 border-stone-200 hover:border-amber-300 hover:bg-stone-50"}`}
    >
                          <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-amber-600 text-white" : "bg-white text-stone-600 border border-stone-200"}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-xs">
                            <h4 className={`font-bold ${isSelected ? "text-amber-950" : "text-stone-900"}`}>
                              {cat.title}
                            </h4>
                            <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">
                              {cat.desc}
                            </p>
                          </div>
                        </div>;
  })}
                  </div>
                </div>

                {
    /* 2. Frequency */
  }
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    2. Fréquence :
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
    type="button"
    onClick={() => setFrequency("once")}
    className={`p-3 rounded-2xl text-xs font-bold border transition cursor-pointer ${frequency === "once" ? "bg-stone-900 text-amber-300 border-stone-950 shadow" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                      Don ponctuel
                    </button>
                    <button
    type="button"
    onClick={() => setFrequency("regular")}
    className={`p-3 rounded-2xl text-xs font-bold border transition cursor-pointer ${frequency === "regular" ? "bg-stone-900 text-amber-300 border-stone-950 shadow" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                      Don régulier (Mensuel)
                    </button>
                  </div>
                </div>

                {
    /* 3. Payment Method */
  }
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    3. Mode de versement :
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-semibold">
                    <button
    type="button"
    onClick={() => setPaymentMethod("mobile_money")}
    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer text-center ${paymentMethod === "mobile_money" ? "bg-stone-900 text-white border-stone-950 shadow-md" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                      <Smartphone className="w-5 h-5 text-amber-400" />
                      <span>Mobile Money</span>
                      <span className="text-[10px] opacity-75 font-normal">Orange / MTN MoMo</span>
                    </button>

                    <button
    type="button"
    onClick={() => setPaymentMethod("transfer")}
    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer text-center ${paymentMethod === "transfer" ? "bg-stone-900 text-white border-stone-950 shadow-md" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                      <Building className="w-5 h-5 text-amber-400" />
                      <span>Virement Bancaire</span>
                      <span className="text-[10px] opacity-75 font-normal">Compte église</span>
                    </button>

                    <button
    type="button"
    onClick={() => setPaymentMethod("church_office")}
    className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer text-center ${paymentMethod === "church_office" ? "bg-stone-900 text-white border-stone-950 shadow-md" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"}`}
  >
                      <MapPin className="w-5 h-5 text-amber-400" />
                      <span>Secrétariat</span>
                      <span className="text-[10px] opacity-75 font-normal">New Bell Ngangué</span>
                    </button>
                  </div>
                </div>

                {
    /* 4. Donor Identity */
  }
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <label className="block text-xs font-bold text-stone-700">
                    4. Vos coordonnées & Intention :
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
    type="text"
    required
    value={donorName}
    onChange={(e) => setDonorName(e.target.value)}
    placeholder="Nom complet"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
  />
                    </div>
                    <div>
                      <input
    type="email"
    value={donorEmail}
    onChange={(e) => setDonorEmail(e.target.value)}
    placeholder="Adresse e-mail (optionnelle)"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
  />
                    </div>
                  </div>

                  <div>
                    <input
    type="tel"
    value={donorPhone}
    onChange={(e) => setDonorPhone(e.target.value)}
    placeholder="Numéro de téléphone (Mobile Money / WhatsApp)"
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
  />
                  </div>

                  <div>
                    <textarea
    rows={2}
    value={prayerNote}
    onChange={(e) => setPrayerNote(e.target.value)}
    placeholder="Mot d'accompagnement ou sujet de prière (facultatif)..."
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-stone-50"
  />
                  </div>
                </div>

                {
    /* Submit button */
  }
                <div className="pt-2">
                  <button
    type="submit"
    className="w-full py-4 rounded-2xl bg-stone-900 hover:bg-amber-600 text-amber-300 hover:text-white font-bold text-sm tracking-wide shadow-xl transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Valider mon Don</span>
                  </button>
                  <p className="text-center text-[11px] text-stone-500 mt-2.5">
                    Un reçu et un message de confirmation vous seront délivrés.
                  </p>
                </div>
              </form> : (
    /* Confirmation Screen */
    <div className="space-y-6 text-center py-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Don Enregistré
                  </span>
                  <h3 className="font-display font-bold text-3xl text-stone-900 mt-1">
                    Merci pour votre générosité !
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 max-w-md mx-auto leading-relaxed">
                    Que le Seigneur Jésus-Christ vous bénisse richement, protège votre foyer et multiplie vos semences pour Sa gloire.
                  </p>
                </div>

                {
      /* Confirmation Card */
    }
                <div className="p-6 rounded-3xl bg-stone-900 text-stone-100 border border-stone-700 text-left space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div>
                      <span className="font-bold text-amber-400 text-base">CPC NGANGUÉ</span>
                      <p className="text-[10px] text-stone-400">Attestation de Don & Bénédiction</p>
                    </div>
                    <span className="text-xs bg-emerald-800 text-white font-bold px-2.5 py-1 rounded-md">
                      CONFIRMÉ ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Référence</span>
                      <strong className="text-white font-mono">{completedDonation.reference}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Date</span>
                      <strong className="text-white">{completedDonation.date}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Donateur</span>
                      <strong className="text-white">{donorName || "Anonyme"}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Canal</span>
                      <strong className="text-amber-300">{completedDonation.methodLabel}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300">
                    <p><strong>Affectation :</strong> {completedDonation.categoryTitle}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Sanctuaire Central de New Bell Ngangué (Lieu-dit Maison Blanche), Douala.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
      onClick={() => setCompletedDonation(null)}
      className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md cursor-pointer"
    >
                    Faire un autre don
                  </button>
                </div>
              </div>
  )}
          </div>
        </div>
      </div>
    </div>;
};
export {
  DonationsPublicView
};
