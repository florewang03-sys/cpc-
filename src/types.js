const ROLES_CONFIG = {
  "Pasteur principal": {
    label: "Pasteur Principal",
    description: "Vision pastorale globale, acc\xE8s illimit\xE9 \xE0 tous les modules et sujets confidentiels.",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    accessLevel: "full"
  },
  "Administrateur": {
    label: "Super Administrateur",
    description: "Gestion compl\xE8te du syst\xE8me ERP, finances, exports, configuration et s\xE9curit\xE9.",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    accessLevel: "full"
  },
  "Pasteur": {
    label: "Pasteur Associ\xE9",
    description: "Gestion pastorale, pr\xE9dications, accompagnement spirituel et intercession.",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
    accessLevel: "pastoral"
  },
  "Leader principal": {
    label: "Leader Principal P\xF4le",
    description: "Supervision des 7 d\xE9partements, gestion des programmes et diffusion de messages.",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    accessLevel: "leadership"
  },
  "Leader de groupe": {
    label: "Responsable de D\xE9partement",
    description: "Gestion des membres du groupe affili\xE9 et validation des demandes d'adh\xE9sion.",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    accessLevel: "leadership"
  },
  "Adjoint de groupe": {
    label: "Adjoint de D\xE9partement",
    description: "Soutien au responsable de d\xE9partement pour le suivi des fid\xE8les.",
    badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
    accessLevel: "leadership"
  },
  "Membre": {
    label: "Membre Fid\xE8le / Visiteur",
    description: "Acc\xE8s aux programmes, demandes de pri\xE8re, historique personnel et vie de l'\xE9glise.",
    badgeColor: "bg-stone-100 text-stone-900 border-stone-300",
    accessLevel: "member"
  }
};
export {
  ROLES_CONFIG
};
