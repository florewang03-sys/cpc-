import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Settings,
  Shield,
  RotateCcw,
  Save
} from "lucide-react";
import { ROLES_CONFIG } from "../../types";
const SettingsModule = () => {
  const { showToast } = useChurch();
  const [churchName, setChurchName] = useState("Communaut\xE9 pour Christ (CPC)");
  const [tagline, setTagline] = useState("Une \xE9glise vivante au c\u0153ur des nations");
  const [address, setAddress] = useState("Quartier New Bell Ngangu\xE9, Douala, Cameroun");
  const [phone, setPhone] = useState("+237 699 00 00 00");
  const [email, setEmail] = useState("contact@cpc-connect.org");
  const [currency, setCurrency] = useState("XAF (FCFA)");
  const [taxExemption, setTaxExemption] = useState(true);
  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast("Param\xE8tres Enregistr\xE9s", "Les informations globales de l'\xE9glise ont \xE9t\xE9 mises \xE0 jour.", "success");
  };
  const handleResetData = () => {
    if (window.confirm("Voulez-vous r\xE9initialiser toutes les donn\xE9es de d\xE9monstration de CPC Connect aux valeurs d'origine ?")) {
      localStorage.clear();
      window.location.reload();
    }
  };
  return <div className="space-y-8 animate-fadeIn">
      {
    /* Header */
  }
      <div>
        <h2 className="font-display font-bold text-2xl text-stone-900">
          Paramètres Généraux & Matrice de Sécurité (RBAC)
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Configuration de la paroisse, personnalisation institutionnelle et droits d'accès.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {
    /* Left Form (7 cols) */
  }
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Settings className="w-5 h-5 text-emerald-800" />
            <h3 className="font-display font-bold text-lg text-stone-900">
              Identité de l'Assemblée
            </h3>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Nom officiel de l'église *</label>
              <input
    type="text"
    required
    value={churchName}
    onChange={(e) => setChurchName(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Slogan / Devise spirituelle</label>
              <input
    type="text"
    value={tagline}
    onChange={(e) => setTagline(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Téléphone officiel</label>
                <input
    type="text"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Email de contact</label>
                <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Adresse du Sanctuaire Principal</label>
              <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Devise financière</label>
                <select
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold"
  >
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="XOF (FCFA)">XOF (FCFA) - Franc CFA</option>
                  <option value="USD ($)">USD ($) - Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Défiscalisation (66%)</label>
                <select
    value={taxExemption ? "yes" : "no"}
    onChange={(e) => setTaxExemption(e.target.value === "yes")}
    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold"
  >
                  <option value="yes">Activée (Reçu Cerfa n°11580)</option>
                  <option value="no">Désactivée</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
    type="submit"
    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
  >
                <Save className="w-4 h-4" />
                <span>Enregistrer les Paramètres</span>
              </button>
            </div>
          </form>
        </div>

        {
    /* Right RBAC Permissions Matrix & Reset Tool (5 cols) */
  }
        <div className="lg:col-span-5 space-y-6">
          {
    /* RBAC Matrix */
  }
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Shield className="w-5 h-5 text-amber-700" />
              <h3 className="font-display font-bold text-lg text-stone-900">
                Matrice des Rôles & Habilitations
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {Object.keys(ROLES_CONFIG).map((rKey) => {
    const conf = ROLES_CONFIG[rKey];
    return <div key={rKey} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${conf.badgeColor}`}>
                        {conf.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{conf.description}</p>
                  </div>;
  })}
            </div>
          </div>

          {
    /* Reset Demo Data Card */
  }
          <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <RotateCcw className="w-4 h-4 text-rose-700" />
              <span>Zone Développeur / Démo</span>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              Pour réinitialiser toutes les modifications (nouveaux membres créés, cultes ajoutés, dons simulés) et restaurer les données initiales de démonstration :
            </p>
            <button
    onClick={handleResetData}
    className="w-full py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition"
  >
              Réinitialiser les données de la démo
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export {
  SettingsModule
};
