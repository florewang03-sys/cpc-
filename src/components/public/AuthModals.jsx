import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  ROLES_CONFIG
} from "../../types";
import {
  Lock,
  Mail,
  User,
  Phone,
  Shield,
  Sparkles,
  X,
  ArrowRight
} from "lucide-react";
const AuthModals = ({ mode, onClose }) => {
  const { switchUserRole, loginUser, navigateTo, showToast } = useChurch();
  const [currentMode, setCurrentMode] = useState(mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const handleRoleQuickLogin = (role) => {
    switchUserRole(role);
    showToast(
      "Connexion R\xE9ussie",
      `Vous \xEAtes maintenant connect\xE9 avec le profil : ${ROLES_CONFIG[role].label}`,
      "success"
    );
    onClose();
    navigateTo("erp", "Tableau de bord");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentMode === "login") {
      loginUser(email || "membre@cpc-connect.test");
      showToast("Connexion R\xE9ussie", "Bienvenue sur votre espace CPC Connect !", "success");
      onClose();
      navigateTo("erp", "Tableau de bord");
    } else {
      loginUser(email || "nouveau@cpc-connect.test");
      showToast(
        "Compte Cr\xE9\xE9 avec Succ\xE8s !",
        `Bienvenue ${fullName || "Fr\xE8re/S\u0153ur"} ! Votre espace membre est activ\xE9.`,
        "success"
      );
      onClose();
      navigateTo("erp", "Tableau de bord");
    }
  };
  const roleList = [
    "Pasteur principal",
    "Administrateur",
    "Pasteur",
    "Leader principal",
    "Leader de groupe",
    "Membre"
  ];
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px] uppercase tracking-wider mb-2">
              <Shield className="w-3 h-3 text-emerald-700" /> Authentification Démo Sécurisée
            </div>
            <h3 className="font-display font-bold text-2xl text-stone-900">
              {currentMode === "login" ? "Connexion Espace Membres & ERP" : "Rejoindre la Communaut\xE9 CPC"}
            </h3>
          </div>
          <button
    onClick={onClose}
    className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* 1-Click Fast Role Selector for Instant Demo Evaluation */
  }
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Test Instantané par Rôle :
            </span>
            <span className="text-[10px] text-amber-800 font-bold">1 clic pour switcher</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {roleList.map((roleKey) => {
    const conf = ROLES_CONFIG[roleKey];
    return <button
      key={roleKey}
      type="button"
      onClick={() => handleRoleQuickLogin(roleKey)}
      className="p-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-stone-200 text-left transition flex items-center justify-between group shadow-sm"
    >
                  <div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${conf.badgeColor} block w-fit mb-0.5`}>
                      {conf.label}
                    </span>
                    <p className="text-[10px] text-stone-600 line-clamp-1">{conf.description}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition shrink-0 ml-1" />
                </button>;
  })}
          </div>
        </div>

        {
    /* Traditional Form Option */
  }
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2 border-t border-stone-200">
          <div className="text-center">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Ou par identifiants classiques
            </span>
          </div>

          {currentMode === "register" && <>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Nom complet *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
    type="text"
    required
    placeholder="Frère Marc..."
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Téléphone portable</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
    type="tel"
    placeholder="+33 6 ..."
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
                </div>
              </div>
            </>}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Adresse e-mail *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
    type="email"
    required
    placeholder="nom@exemple.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Mot de passe *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
    type="password"
    required
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
  />
            </div>
          </div>

          <div className="pt-2">
            <button
    type="submit"
    className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-lg transition"
  >
              {currentMode === "login" ? "Se connecter \xE0 l'Espace D\xE9mo" : "Cr\xE9er mon compte membre"}
            </button>
          </div>

          <div className="text-center pt-2">
            {currentMode === "login" ? <button
    type="button"
    onClick={() => setCurrentMode("register")}
    className="text-xs text-emerald-800 hover:underline font-semibold"
  >
                Pas encore de compte ? S'inscrire gratuitement →
              </button> : <button
    type="button"
    onClick={() => setCurrentMode("login")}
    className="text-xs text-emerald-800 hover:underline font-semibold"
  >
                Déjà inscrit ? Se connecter →
              </button>}
          </div>
        </form>
      </div>
    </div>;
};
export {
  AuthModals
};
