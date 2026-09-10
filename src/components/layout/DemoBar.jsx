import { useState } from "react";
import { useChurch } from "../../context/ChurchContext";
import {
  Eye,
  User,
  Users,
  Cross,
  Shield,
  RotateCcw,
  Sparkles,
  Globe,
  Lock,
  Download,
  Copy,
  ExternalLink,
  Check,
  FileArchive
} from "lucide-react";
const DemoBar = () => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const zipUrl = `${window.location.origin}/cpc-connect.zip`;
  const {
    currentSpace,
    setCurrentSpace,
    currentUser,
    switchUserRole,
    allUsers,
    switchUser,
    activeRole,
    setPublicPage,
    setErpTab,
    setMemberTab,
    resetDemoData,
    showToast
  } = useChurch();
  const perspectives = [
    {
      id: "visitor",
      label: "Visiteur (Site Vitrine)",
      subtext: "D\xE9couverte de l'\xE9glise, cultes, pr\xE9dications, dons",
      role: "Membre",
      space: "public",
      icon: Eye,
      user: allUsers.find((u) => u.id === "usr-visitor") || allUsers[0]
    },
    {
      id: "member",
      label: "Fid\xE8le (Espace Membre)",
      subtext: "Portail fid\xE8le : mes groupes, requ\xEAtes de pri\xE8re avec audio, cultes",
      role: "Membre",
      space: "member",
      icon: User,
      user: allUsers.find((u) => u.id === "usr-4") || allUsers[0]
      // Sarah N'Dri
    },
    {
      id: "leader",
      label: "Leader de Groupe",
      subtext: "Responsable d\xE9partement (Jeunesse) : gestion effectif & r\xE9unions",
      role: "Leader de groupe",
      space: "erp",
      icon: Users,
      user: allUsers.find((u) => u.id === "usr-3") || allUsers[0]
      // Samuel Diallo
    },
    {
      id: "pastor-main",
      label: "Pasteur Principal \u{1F512}",
      subtext: "Directeur spirituel : acc\xE8s exclusif aux pri\xE8res confidentielles \u{1F512}",
      role: "Pasteur principal",
      space: "erp",
      icon: Lock,
      user: allUsers.find((u) => u.id === "usr-1") || allUsers[0]
      // Pasteur Jean-Marc
    },
    {
      id: "pastor",
      label: "Corps Pastoral",
      subtext: "Pasteurs : pr\xE9dications, culte, accompagnement",
      role: "Pasteur",
      space: "erp",
      icon: Cross,
      user: allUsers.find((u) => u.id === "usr-2") || allUsers[0]
      // Pasteur André Koné
    },
    {
      id: "admin",
      label: "Administrateur",
      subtext: "Super-Admin : base membres, 7 groupes, programmes, finances",
      role: "Administrateur",
      space: "erp",
      icon: Shield,
      user: allUsers.find((u) => u.id === "usr-6") || allUsers[0]
      // Alexandre Touré
    }
  ];
  const handleSelectPerspective = (p) => {
    switchUser(p.user);
    setCurrentSpace(p.space);
    if (p.space === "public") {
      setPublicPage("Accueil");
    } else if (p.space === "member") {
      setMemberTab("Tableau de bord");
    } else {
      setErpTab("Tableau de bord");
    }
    showToast(
      "Perspective chang\xE9e",
      `Vous \xEAtes d\xE9sormais en mode ${p.label}`,
      "info"
    );
  };
  return <div className="bg-stone-950 text-stone-200 border-b border-amber-900/40 text-xs sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        {
    /* Left: Perspective Switcher Pills */
  }
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-stone-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Perspectives Démo :</span>
          </span>

          <div className="flex items-center gap-1.5 bg-stone-900/90 p-1 rounded-xl border border-stone-800 shrink-0">
            {perspectives.map((p) => {
    const Icon = p.icon;
    const isSelected = p.id === "visitor" && currentSpace === "public" || p.id === "member" && currentSpace === "member" || p.space === "erp" && currentSpace === "erp" && activeRole === p.role;
    return <button
      key={p.id}
      onClick={() => handleSelectPerspective(p)}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${isSelected ? "bg-amber-500 text-stone-950 font-bold shadow" : "text-stone-300 hover:text-white hover:bg-stone-800/80"}`}
      title={p.subtext}
    >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.label.split(" (")[0]}</span>
                </button>;
  })}
          </div>
        </div>

        {
    /* Right: 3 Direct Space Switchers & Reset Button */
  }
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-stone-900 p-0.5 rounded-xl border border-stone-800">
            <button
    onClick={() => {
      setCurrentSpace("public");
      setPublicPage("Accueil");
    }}
    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${currentSpace === "public" ? "bg-amber-500 text-stone-950 shadow" : "text-stone-300 hover:text-white"}`}
    title="Site Vitrine Public"
  >
              <Globe className="w-3 h-3" />
              <span>Site Public</span>
            </button>

            <button
    onClick={() => {
      setCurrentSpace("member");
      setMemberTab("Tableau de bord");
    }}
    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${currentSpace === "member" ? "bg-amber-500 text-stone-950 shadow" : "text-stone-300 hover:text-white"}`}
    title="Application Membre"
  >
              <User className="w-3 h-3" />
              <span>App Membre</span>
            </button>

            <button
    onClick={() => {
      setCurrentSpace("erp");
      setErpTab("Tableau de bord");
    }}
    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${currentSpace === "erp" ? "bg-amber-500 text-stone-950 shadow" : "text-stone-300 hover:text-white"}`}
    title="Back-Office ERP"
  >
              <Shield className="w-3 h-3" />
              <span>ERP Gestion</span>
            </button>
          </div>

          {
    /* Download Project ZIP Button */
  }
          <button
    onClick={() => setShowDownloadModal(true)}
    className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-[11px] transition flex items-center gap-1.5 cursor-pointer shadow"
    title="Télécharger l'archive ZIP du projet"
  >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Télécharger ZIP</span>
          </button>

          {
    /* Reset Demo Data Button */
  }
          <button
    onClick={() => {
      if (window.confirm("Voulez-vous r\xE9initialiser toutes les donn\xE9es de d\xE9monstration ?")) {
        resetDemoData();
      }
    }}
    className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition cursor-pointer"
    title="Réinitialiser les données de démo"
  >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {
    /* Download ZIP Modal */
  }
      {showDownloadModal && <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-stone-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
                  <FileArchive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Téléchargement du Projet (ZIP)</h3>
                  <p className="text-xs text-stone-400">Archive complète : cpc-connect.zip</p>
                </div>
              </div>
              <button
    onClick={() => setShowDownloadModal(false)}
    className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition"
  >
                ✕
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <Download className="w-4 h-4" /> Option 1 : Téléchargement direct
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                    87 Ko
                  </span>
                </div>
                <p className="text-stone-300">
                  Cliquez ci-dessous pour déclencher le téléchargement direct du fichier ZIP dans votre navigateur :
                </p>
                <div className="pt-1 flex gap-2">
                  <a
    href="/cpc-connect.zip"
    download="cpc-connect.zip"
    className="w-full text-center py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg transition flex items-center justify-center gap-2 shadow"
  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger maintenant (cpc-connect.zip)</span>
                  </a>
                </div>
              </div>

              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2">
                <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-amber-400" /> Option 2 : Si votre navigateur bloque le téléchargement dans l'aperçu
                </span>
                <p className="text-stone-400 leading-relaxed">
                  L'aperçu tourne dans un cadre sécurisé (iframe). Vous pouvez copier ce lien direct et le coller dans la barre d'adresse d'un nouvel onglet de votre navigateur :
                </p>
                <div className="flex items-center gap-2 bg-stone-900 p-2 rounded-lg border border-stone-800">
                  <code className="text-[11px] text-amber-300 font-mono truncate flex-1 select-all">
                    {zipUrl}
                  </code>
                  <button
    onClick={() => {
      navigator.clipboard.writeText(zipUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }}
    className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded font-semibold text-[11px] flex items-center gap-1 shrink-0 transition"
  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copi\xE9 !" : "Copier"}</span>
                  </button>
                </div>
              </div>

              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-1.5">
                <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Option 3 : Bouton natif AI Studio
                </span>
                <p className="text-stone-400 leading-relaxed">
                  En haut à droite de l'écran AI Studio, cliquez sur le menu <strong>(3 petits points ••• ou Paramètres)</strong> puis sélectionnez <strong>Export to ZIP</strong>.
                </p>
              </div>

              <div className="border-t border-stone-800 pt-3 text-stone-400 space-y-1">
                <p className="font-semibold text-stone-300">Une fois extrait sur votre PC :</p>
                <p className="font-mono text-[11px] bg-stone-950 px-2 py-1 rounded text-stone-300">
                  npm install && npm run dev
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
    onClick={() => setShowDownloadModal(false)}
    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-lg transition"
  >
                Fermer
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export {
  DemoBar
};
