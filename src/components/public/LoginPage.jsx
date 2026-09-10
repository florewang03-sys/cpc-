import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import { ChurchLogo } from "../common/ChurchLogo";
import {
  LogIn,
  Lock,
  Mail,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound
} from "lucide-react";
const LoginPage = ({
  isAdminMode = false,
  onBackToPublic
}) => {
  const {
    loginUser,
    showToast
  } = useChurch();
  const [activeTab, setActiveTab] = useState("login");
  const [emailOrPhone, setEmailOrPhone] = useState(isAdminMode ? "admin@cpcn.test" : "");
  const [password, setPassword] = useState(isAdminMode ? "123456" : "");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const demoAccounts = [
    {
      role: "Membre",
      label: "Fid\xE8le & Visiteur",
      email: "membre@cpc-connect.test",
      pass: "123456",
      desc: "Tableau de bord membre, mes groupes, mes requ\xEAtes de pri\xE8re",
      badge: "bg-stone-100 text-stone-900 border-stone-300"
    },
    {
      role: "Leader",
      label: "Leader de groupe (Jeunesse)",
      email: "leader@cpc-connect.test",
      pass: "123456",
      desc: "Gestion des membres du groupe, validation des demandes d'adh\xE9sion",
      badge: "bg-amber-100 text-amber-900 border-amber-300"
    },
    {
      role: "Pasteur",
      label: "Pasteur Principal",
      email: "pasteur@cpc-connect.test",
      pass: "123456",
      desc: "Pri\xE8res confidentielles, cultes, vision spirituelle",
      badge: "bg-emerald-100 text-emerald-900 border-emerald-300"
    },
    {
      role: "Administrateur",
      label: "Super Admin ERP",
      email: "admin@cpc-connect.test",
      pass: "123456",
      desc: "Acc\xE8s complet au back-office, membres, finances, groupes",
      badge: "bg-purple-100 text-purple-900 border-purple-300"
    }
  ];
  const handleQuickFill = (email, pass) => {
    setEmailOrPhone(email);
    setPassword(pass);
    setErrorMsg("");
  };
  const handleQuickLogin = (email, pass) => {
    setEmailOrPhone(email);
    setPassword(pass);
    setLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setLoading(false);
      const success = loginUser(email);
      if (!success) {
        setErrorMsg("Identifiants incorrects.");
      }
    }, 300);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrorMsg("Veuillez saisir votre adresse e-mail ou num\xE9ro de t\xE9l\xE9phone.");
      return;
    }
    if (!password) {
      setErrorMsg("Veuillez renseigner votre mot de passe.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setLoading(false);
      const success = loginUser(emailOrPhone);
      if (!success) {
        setErrorMsg("Identifiants incorrects ou compte introuvable.");
      }
    }, 400);
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerName.trim() || !registerEmail.trim()) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser(registerEmail);
      showToast("Compte cr\xE9\xE9", `Bienvenue ${registerName} au sein de CPC Connect !`, "success");
    }, 400);
  };
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    showToast(
      "R\xE9initialisation envoy\xE9e",
      "Un lien de r\xE9initialisation a \xE9t\xE9 envoy\xE9 \xE0 votre adresse e-mail.",
      "info"
    );
    setActiveTab("login");
  };
  return <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between select-none">
      {
    /* Top Header Bar */
  }
      <div className="p-4 sm:p-6 border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
    onClick={onBackToPublic}
    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:bg-stone-800 text-xs font-semibold transition cursor-pointer"
  >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au site public</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Système sécurisé CPC Connect v2.5</span>
          </div>
        </div>
      </div>

      {
    /* Main Container */
  }
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 my-4">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {
    /* Left Column: Form Box (7 cols) */
  }
          <div className="lg:col-span-7 bg-stone-900/90 border border-amber-900/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            {
    /* Church Logo & Brand */
  }
            <div className="text-center space-y-2">
              <div className="inline-block">
                <ChurchLogo size="md" variant="dark" />
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-100">
                {isAdminMode ? "Portail d'Administration" : "Bienvenue sur votre espace"}
              </h1>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                {isAdminMode ? "Acc\xE8s s\xE9curis\xE9 r\xE9serv\xE9 aux pasteurs, administrateurs et responsables de l'\xE9glise." : "Connectez-vous pour acc\xE9der \xE0 vos groupes, requ\xEAtes de pri\xE8re et agenda personnel."}
              </p>
            </div>

            {
    /* Error Message */
  }
            {errorMsg && <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>}

            {
    /* Tabs (Connexion / Inscription / Oublié) */
  }
            {!isAdminMode && <div className="flex rounded-2xl bg-stone-950/80 p-1 border border-stone-800 text-xs">
                <button
    onClick={() => {
      setActiveTab("login");
      setErrorMsg("");
    }}
    className={`flex-1 py-2 rounded-xl font-bold transition cursor-pointer ${activeTab === "login" ? "bg-amber-500 text-stone-950 shadow" : "text-stone-400 hover:text-stone-200"}`}
  >
                  Se connecter
                </button>
                <button
    onClick={() => {
      setActiveTab("register");
      setErrorMsg("");
    }}
    className={`flex-1 py-2 rounded-xl font-bold transition cursor-pointer ${activeTab === "register" ? "bg-amber-500 text-stone-950 shadow" : "text-stone-400 hover:text-stone-200"}`}
  >
                  Créer un compte
                </button>
              </div>}

            {
    /* Tab 1: Login Form */
  }
            {activeTab === "login" && <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    Adresse e-mail ou téléphone
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
    type="text"
    value={emailOrPhone}
    onChange={(e) => setEmailOrPhone(e.target.value)}
    placeholder="Ex : membre@cpcn.test ou +237..."
    className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition placeholder:text-stone-600"
  />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-stone-300">
                      Mot de passe
                    </label>
                    <button
    type="button"
    onClick={() => setActiveTab("forgot")}
    className="text-[11px] text-amber-400 hover:text-amber-300 transition cursor-pointer"
  >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="••••••••"
    className="w-full pl-10 pr-10 py-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition placeholder:text-stone-600"
  />
                    <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3.5 top-3.5 text-stone-500 hover:text-stone-300 transition cursor-pointer"
  >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
    className="rounded border-stone-700 bg-stone-950 text-amber-500 focus:ring-amber-500"
  />
                    <span>Se souvenir de moi</span>
                  </label>
                </div>

                <button
    type="submit"
    disabled={loading}
    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs tracking-wide shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
  >
                  {loading ? <span className="animate-pulse">Connexion en cours...</span> : <>
                      <LogIn className="w-4 h-4" />
                      <span>{isAdminMode ? "Acc\xE9der \xE0 l'Administration" : "Se connecter"}</span>
                    </>}
                </button>
              </form>}

            {
    /* Tab 2: Register Form */
  }
            {activeTab === "register" && <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Nom complet
                  </label>
                  <input
    type="text"
    value={registerName}
    onChange={(e) => setRegisterName(e.target.value)}
    placeholder="Ex : Samuel Eto'o"
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-600"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Adresse e-mail
                  </label>
                  <input
    type="email"
    value={registerEmail}
    onChange={(e) => setRegisterEmail(e.target.value)}
    placeholder="Ex : fidele@cpcn.test"
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-600"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Numéro de téléphone
                  </label>
                  <input
    type="tel"
    value={registerPhone}
    onChange={(e) => setRegisterPhone(e.target.value)}
    placeholder="+237 600 00 00 00"
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-600"
  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Mot de passe
                  </label>
                  <input
    type="password"
    value={registerPassword}
    onChange={(e) => setRegisterPassword(e.target.value)}
    placeholder="Au moins 6 caractères"
    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-600"
  />
                </div>

                <button
    type="submit"
    disabled={loading}
    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs tracking-wide shadow transition flex items-center justify-center gap-2 cursor-pointer mt-2"
  >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finaliser mon inscription</span>
                </button>
              </form>}

            {
    /* Tab 3: Forgot Password */
  }
            {activeTab === "forgot" && <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-200">
                    Réinitialiser votre mot de passe
                  </h3>
                  <p className="text-xs text-stone-400">
                    Saisissez votre e-mail pour recevoir les instructions de réinitialisation.
                  </p>
                </div>

                <div>
                  <input
    type="email"
    value={emailOrPhone}
    onChange={(e) => setEmailOrPhone(e.target.value)}
    placeholder="votre.email@exemple.com"
    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-600"
  />
                </div>

                <div className="flex items-center gap-3">
                  <button
    type="button"
    onClick={() => setActiveTab("login")}
    className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition cursor-pointer"
  >
                    Retour
                  </button>
                  <button
    type="submit"
    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition cursor-pointer"
  >
                    Envoyer le lien
                  </button>
                </div>
              </form>}
          </div>

          {
    /* Right Column: Demo Accounts Box (5 cols) */
  }
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-stone-900/60 border border-amber-900/40 space-y-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-400">
                <KeyRound className="w-4 h-4" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider">
                  Comptes de Démonstration
                </h3>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Cliquez directement sur l'un des profils ci-dessous pour tester l'application avec les permissions associées :
              </p>

              <div className="space-y-2.5">
                {demoAccounts.map((account) => <div
    key={account.role}
    className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 hover:border-amber-500/50 transition flex flex-col gap-2 group"
  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-stone-100 group-hover:text-amber-300 transition">
                          {account.role}
                        </div>
                        <div className="text-[10px] text-stone-400">{account.label}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] font-mono text-amber-400 border border-stone-700">
                        {account.email}
                      </span>
                    </div>

                    <p className="text-[10px] text-stone-500 leading-snug">
                      {account.desc}
                    </p>

                    <div className="flex items-center gap-2 pt-1 border-t border-stone-800/60">
                      <button
    type="button"
    onClick={() => handleQuickFill(account.email, account.pass)}
    className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-semibold transition cursor-pointer"
  >
                        Remplir
                      </button>
                      <button
    type="button"
    onClick={() => handleQuickLogin(account.email, account.pass)}
    className="flex-1 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
  >
                        <LogIn className="w-3 h-3" />
                        <span>Tester</span>
                      </button>
                    </div>
                  </div>)}
              </div>

              <div className="p-3 rounded-xl bg-stone-950/50 border border-stone-800/50 text-[10px] text-stone-500 flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>Mot de passe commun pour tous les comptes : <strong className="text-amber-400 font-mono">123456</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* Footer Info */
  }
      <div className="p-4 text-center text-xs text-stone-600 border-t border-stone-900">
        © {(/* @__PURE__ */ new Date()).getFullYear()} Communauté pour Christ (CPC) • CPC Connect
      </div>
    </div>;
};
export {
  LoginPage
};
