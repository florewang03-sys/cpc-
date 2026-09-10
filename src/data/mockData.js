const INITIAL_USERS = [
  {
    id: "usr-visitor",
    fullName: "Visiteur D\xE9couverte",
    email: "visiteur@cpcn.test",
    phone: "+237 600 00 00 00",
    role: "Membre",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    memberSince: "2026",
    isBaptized: false
  },
  {
    id: "usr-member",
    fullName: "Jean Fid\xE8le",
    email: "membre@cpcn.test",
    phone: "+237 678 89 90 01",
    role: "Membre",
    groupName: "Jeunesse",
    avatarUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&auto=format&fit=crop&q=80",
    memberSince: "2022",
    isBaptized: true
  },
  {
    id: "usr-leader",
    fullName: "Jean Dupont",
    email: "leader@cpcn.test",
    phone: "+237 674 51 28 96",
    role: "Leader de groupe",
    groupName: "Jeunesse",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    memberSince: "2020",
    isBaptized: true
  },
  {
    id: "usr-pasteur",
    fullName: "Pasteur Didier Mbog",
    email: "pasteur.didier@cpcn-ngangue.org",
    phone: "+237 690 12 34 56",
    role: "Pasteur principal",
    avatarUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80",
    memberSince: "2015",
    isBaptized: true
  },
  {
    id: "usr-pasteure-anne",
    fullName: "R\xE9v. Doc. Anne Mbog",
    email: "rev.anne@cpcn-ngangue.org",
    phone: "+237 690 98 76 54",
    role: "Pasteur",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    memberSince: "2015",
    isBaptized: true
  },
  {
    id: "usr-admin",
    fullName: "Alexandre Tour\xE9",
    email: "admin@cpcn.test",
    phone: "+237 660 01 12 23",
    role: "Administrateur",
    avatarUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&auto=format&fit=crop&q=80",
    memberSince: "2017",
    isBaptized: true
  },
  {
    id: "usr-2",
    fullName: "Pasteur Andr\xE9 Kon\xE9",
    email: "andre.kone@cpcn-ngangue.org",
    phone: "+237 698 76 54 32",
    role: "Pasteur",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    memberSince: "2018",
    isBaptized: true
  },
  {
    id: "usr-5",
    fullName: "Marc-Antoine Traor\xE9",
    email: "marc.traore@cpcn-ngangue.org",
    phone: "+237 664 45 56 67",
    role: "Leader de groupe",
    groupName: "Hommes",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    memberSince: "2016",
    isBaptized: true
  },
  {
    id: "usr-sarah",
    fullName: "Sarah N'Dri",
    email: "sarah.ndri@cpcn-ngangue.org",
    phone: "+237 678 89 90 01",
    role: "Leader de groupe",
    groupName: "Perles pr\xE9cieuses",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    memberSince: "2019",
    isBaptized: true
  }
];
const INITIAL_GROUPS = [
  {
    id: "grp-predication-enseignement",
    name: "Pr\xE9dications et Enseignements",
    slug: "predication-enseignement",
    subtitle: "Pour une connaissance de la parole de Dieu, de l'\u0153uvre et la personne du Seigneur J\xE9sus-Christ",
    description: "Pour une connaissance de la parole de Dieu, de l'\u0153uvre et la personne du Seigneur J\xE9sus-Christ. Minist\xE8re de proclamation vivante de l'\xC9vangile, \xE9tude m\xE9thodique des Saintes \xC9critures, affermissement doctrinal des nouveaux croyants, cours de bapt\xEAme et formation des disciples.",
    leader: "Pasteur Andr\xE9 Kon\xE9",
    deputyLeader: "Docteur Paul Ebou\xE9",
    membersCount: 24,
    meetingSchedule: "Mercredi & Vendredi soir",
    meetingDay: "Mercredi",
    meetingTime: "17h30 \u2013 19h30",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-600/20 text-amber-950 border-amber-500",
    activities: ["\xC9tudes bibliques doctrinales & s\xE9minaires th\xE9ologiques", "Affermissement des nouveaux convertis & classes de bapt\xEAme", "Formation continue des pr\xE9dicateurs et encadreurs"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Cycle Fondamental \xAB Les 7 Piliers de la Foi Vivante \xBB",
        description: "S\xE9rie de 12 enseignements approfondis sur la gr\xE2ce, la sanctification et l'autorit\xE9 du croyant.",
        target: "Enracinement doctrinal de toute l'assembl\xE9e"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "S\xE9minaire Sp\xE9cial d'Homil\xE9tique & Ex\xE9g\xE8se Biblique",
        description: "Ateliers pratiques pour pr\xE9dicateurs la\xEFcs, mod\xE9rateurs et animateurs de cellules de maison.",
        target: "Formation de 30 conducteurs de cellules"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "\xC9cole Biblique Intensive de Vacances (Discipolat)",
        description: "Modules intensifs le samedi matin sur l'histoire de l'\xC9glise et la d\xE9fense de la foi.",
        target: "Formation th\xE9ologique pratique de 50 disciples"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Conf\xE9rence Doctrinale Annuelle & C\xE9l\xE9bration des Dipl\xF4m\xE9s",
        description: "Grande semaine biblique d'\xE9dification et remise des attestations du cours de bapt\xEAme.",
        target: "Bapt\xEAme par immersion de 40 nouveaux convertis"
      }
    ]
  },
  {
    id: "grp-evangelisation",
    name: "\xC9vang\xE9lisation",
    slug: "evangelisation",
    subtitle: "Porteur de la parole divine de pr\xE8s comme de loin",
    description: "Porteur de la parole divine de pr\xE8s comme de loin. D\xE9partement missionnaire consacr\xE9 au gain des \xE2mes pour Christ : croisades en plein air, campagnes de proximit\xE9 dans les quartiers, \xE9vang\xE9lisation de rue et suivi assidu des nouveaux convertis.",
    leader: "\xC9vang\xE9liste Paulin Koffi",
    deputyLeader: "S\u0153ur Brigitte Tour\xE9",
    membersCount: 50,
    meetingSchedule: "Jeudi soir & Samedi matin",
    meetingDay: "Samedi",
    meetingTime: "08h00 \u2013 11h30",
    imageUrl: "/images/evangelisation.jpg",
    badgeColor: "bg-orange-600/20 text-orange-950 border-orange-500",
    activities: ["Croisades de plein air & campagnes d'impact", "\xC9vang\xE9lisation porte-\xE0-porte & distribution de trait\xE9s", "Suivi t\xE9l\xE9phonique, visitation fraternelle et int\xE9gration des \xE2mes"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Op\xE9ration Moisson \xAB Un Chr\xE9tien, Une \xC2me \xBB",
        description: "Sensibilisation de l'\xE9glise locale et distribution de 5000 trait\xE9s bibliques dans le quartier.",
        target: "Gain et enregistrement de 80 \xE2mes pour Christ"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Mission d'Impact de P\xE2ques & Projections du Film J\xE9sus",
        description: "Projections de films chr\xE9tiens en plein air sur les places publiques et appels au salut.",
        target: "Mobilisation de plus de 600 auditeurs"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Croisade Jeunesse & Caravane Missionnaire de Proximit\xE9",
        description: "\xC9vang\xE9lisation interactive aupr\xE8s des jeunes des carrefours et march\xE9s.",
        target: "100 nouveaux jeunes int\xE9gr\xE9s aux cellules de pri\xE8re"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Grande Campagne d'\xC9vang\xE9lisation & de D\xE9livrance de Novembre",
        description: "5 jours d'assaut spirituel en plein air (18-22 Nov.) avec pr\xE9dications, miracles et bapt\xEAmes.",
        target: "Plus de 300 conversions et d\xE9cisions pour le Seigneur"
      }
    ]
  },
  {
    id: "grp-entretien",
    name: "Service d'Entretien",
    slug: "service-entretien",
    subtitle: "Pour un environnement sain et convivial",
    description: "Pour un environnement sain et convivial. Assurer la propret\xE9 irr\xE9prochable, l'assainissement, l'embellissement et l'a\xE9ration bienveillante du sanctuaire saint pour chaque c\xE9l\xE9bration.",
    leader: "Jean-Baptiste Yao",
    deputyLeader: "Marthe Konan",
    membersCount: 28,
    meetingSchedule: "Samedi matin & Dimanche apr\xE8s-culte",
    meetingDay: "Samedi",
    meetingTime: "07h30 \u2013 10h00",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-400/20 text-stone-900 border-amber-400",
    activities: ["Entretien soign\xE9 du sanctuaire", "Assainissement pour un cadre sain et convivial", "Logistique et embellissement des espaces de c\xE9l\xE9bration"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Grand Entretien de Rentr\xE9e & Am\xE9nagement Convivial",
        description: "Lessivage \xE9cologique, vernissage des bancs, purification de l'air et agencement optimal du sanctuaire.",
        target: "Sanctuaire sain et resplendissant pour l'adoration"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Am\xE9nagement de l'Espace Convivial Ext\xE9rieur",
        description: "Installation des ombrages, rafra\xEEchissement des all\xE9es et cadre verdoyant pour les fid\xE8les.",
        target: "Environnement convivial et accueillant"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Atelier Hygi\xE8ne, S\xE9curit\xE9 & \xC9co-Responsabilit\xE9",
        description: "Formation sur les protocoles sanitaires, gestion des d\xE9chets et s\xE9curit\xE9 des installations.",
        target: "Excellence environnementale de la communaut\xE9"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Logistique Sanitaire pour la Grande Campagne de Fin d'Ann\xE9e",
        description: "Pr\xE9paration et assainissement complet des sites de rassemblement pour les cultes et croisades.",
        target: "Cadre impeccable pour 1500 fid\xE8les et visiteurs"
      }
    ]
  },
  {
    id: "grp-diaconat",
    name: "Diaconat",
    slug: "diaconat",
    subtitle: "Service d'accueil et d'encadrement",
    description: "Service d'accueil et d'encadrement. Veiller \xE0 l'assistance mat\xE9rielle, \xE0 l'organisation pratique des cultes, \xE0 l'accueil chaleureux et au soutien des fid\xE8les vuln\xE9rables.",
    leader: "Diacre Samuel N'Goran",
    deputyLeader: "Diaconesse Esther B\xE9k\xE9",
    membersCount: 38,
    meetingSchedule: "1er et 3e Dimanche apr\xE8s culte",
    meetingDay: "Dimanche",
    meetingTime: "12h30 \u2013 14h00",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-emerald-500/15 text-emerald-950 border-emerald-400",
    activities: ["Service solennel de la sainte c\xE8ne & offrandes", "Assistance aux veuves, orphelins et n\xE9cessiteux", "Intendance, ordre et accueil pratique du sanctuaire"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Recensement & Soutien Diaconal des Foyers Vuln\xE9rables",
        description: "Visites de solidarit\xE9 et organisation des aides de secours d'urgence fraternelle.",
        target: "Accompagnement de 40 familles de la communaut\xE9"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "S\xE9minaire de Perfectionnement de l'Ordre du Culte",
        description: "Protocole eccl\xE9siastique, coordination avec les huissiers et fluidit\xE9 des rassemblements.",
        target: "Harmonie et excellence lors de chaque r\xE9union"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Journ\xE9e d'Entraide Fraternelle & Partage de Vivres",
        description: "Distribution de vivres et secours mat\xE9riel aux personnes \xE2g\xE9es et \xE9tudiants d\xE9munis.",
        target: "T\xE9moignage concret de la charit\xE9 chr\xE9tienne"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Banquet de No\xEBl de la Compassion",
        description: "Grand repas fraternel et colis de f\xEAte offerts aux n\xE9cessiteux et orphelins du quartier.",
        target: "Partage de la joie de No\xEBl avec 100 familles"
      }
    ]
  },
  {
    id: "grp-intercession",
    name: "Intercession & Pri\xE8re",
    slug: "intercession",
    subtitle: "Sentinelles sur les murailles & pri\xE8re continue",
    description: "Les sentinelles sur les murailles. Soutenir les pasteurs, le sanctuaire, les familles et les nations dans le je\xFBne et la pri\xE8re fervente sans rel\xE2che.",
    leader: "Proph\xE8te \xC9lie Zadi",
    deputyLeader: "Anna Gbagbo",
    membersCount: 34,
    meetingSchedule: "Mardi & Vendredi",
    meetingDay: "Vendredi",
    meetingTime: "17h00 \u2013 18h30",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-700/15 text-amber-950 border-amber-600",
    activities: ["Cha\xEEnes de pri\xE8re 24h/24", "Nuits de veille proph\xE9tique", "Intercession pour les malades et requ\xEAtes d'urgence"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "21 Jours de Je\xFBne & Cons\xE9cration Spirituelle",
        description: "Pri\xE8re matinale et du soir pour consacrer l'ann\xE9e de l'assembl\xE9e et poser les fondements d'autorit\xE9.",
        target: "Cons\xE9cration de tous les minist\xE8res & familles"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Journ\xE9e Sp\xE9ciale 1er Mai & Veill\xE9e de Pentec\xF4te",
        description: "Intercession intensive pour les examens scolaires, concours, emplois et effusion du Saint-Esprit.",
        target: "R\xE9ussite de la jeunesse & onction de sagesse"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Retraite de Montagne des Sentinelles",
        description: "S\xE9minaire intensif sur le combat spirituel strat\xE9gique et le brisement des liens g\xE9n\xE9rationnels.",
        target: "Formation de 20 nouveaux intercesseurs"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Assaut d'Intercession pour la Grande Campagne de Novembre",
        description: "Cha\xEEne ininterrompue de je\xFBne et veill\xE9es continues pour la moisson des \xE2mes du 18 au 22 Novembre.",
        target: "Couverture spirituelle de la mission en plein air"
      }
    ]
  },
  {
    id: "grp-rythmes",
    name: "Rythmes C\xE9lestes",
    slug: "rythmes-celestes",
    subtitle: "Chorale & louange proph\xE9tique",
    description: "Le minist\xE8re de louange, de chorale et d'adoration proph\xE9tique. Conduire l'assembl\xE9e dans la sainte pr\xE9sence de Dieu par le chant sacr\xE9 et l'excellence instrumentale.",
    leader: "David Kouassi",
    deputyLeader: "Priscille Koffi",
    membersCount: 42,
    meetingSchedule: "Mercredi & Samedi apr\xE8s-midi",
    meetingDay: "Samedi",
    meetingTime: "14h30 \u2013 17h00",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-500/20 text-stone-900 border-amber-400",
    activities: ["R\xE9p\xE9titions vocales & instrumentales", "Concerts d'adoration", "Formation des chantres", "Composition de cantiques"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Atelier d'Excellence Vocale & Solf\xE8ge",
        description: "Session intensive de perfectionnement vocal et technique pour les chantres et choristes.",
        target: "Enrichissement du r\xE9pertoire d'adoration"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Concert Nocturne de C\xE9l\xE9bration Pascale",
        description: "Grande soir\xE9e d'adoration communautaire avec cantiques spirituels et chorale mixte.",
        target: "\xC9dification et c\xE9l\xE9bration de la r\xE9surrection"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Masterclass des Instrumentistes & Claviers",
        description: "Formation pratique sur la sonorisation, l'harmonie et l'accompagnement des cultes.",
        target: "Mise \xE0 niveau des musiciens de l'\xE9glise"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Animation Chant\xE9e de la Campagne d'\xC9vang\xE9lisation",
        description: "Chants d'impact en plein air (18-22 Nov.) et pr\xE9paration du concert solennel de No\xEBl.",
        target: "Conduire 1000 \xE2mes dans la louange"
      }
    ]
  },
  {
    id: "grp-youth",
    name: "Jeunesse (J-CPC)",
    slug: "youth",
    subtitle: "Une jeunesse consacr\xE9e & dynamique pour Christ",
    description: "Une jeunesse consacr\xE9e, dynamique et passionn\xE9e pour Christ. Louange vivante, partages bibliques interactifs, mentorat et actions citoyennes pour la gloire de Dieu.",
    leader: "Jean Dupont",
    deputyLeader: "Marie Dupont",
    membersCount: 75,
    meetingSchedule: "Chaque Samedi",
    meetingDay: "Samedi",
    meetingTime: "15h00 \u2013 17h30",
    imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-500/15 text-amber-900 border-amber-400",
    activities: ["Impact Jeunesse", "Retraites \xE9tudiantes", "\xC9vang\xE9lisation campus", "Soir\xE9es louange & cin\xE9ma chr\xE9tien"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Lancement du Forum Orientation & Mentorat Chr\xE9tien",
        description: "Ateliers sur l'excellence acad\xE9mique, choix de fili\xE8res et t\xE9moignage chr\xE9tien en milieu scolaire.",
        target: "Accompagnement de 60 coll\xE9giens et \xE9tudiants"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Grande Journ\xE9e Sp\xE9ciale 1er Mai pour les Examens",
        description: "Pri\xE8re de perc\xE9e pour le BEPC, Probatoire, BAC et concours universitaires.",
        target: "100% de r\xE9ussite pour les \xE9l\xE8ves de l'\xE9glise"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Camp Biblique & Retraite Annuelle de Jeunesse",
        description: "3 jours en immersion : enseignements sur la sanctification, tournoi sportif et feu de camp fraternel.",
        target: "Cons\xE9cration et bapt\xEAmes d'eau des jeunes"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Mobilisation Missionnaire & \xC9vang\xE9lisation de Rue",
        description: "Distribution de trait\xE9s bibliques et animation de la campagne d'\xE9vang\xE9lisation de Ngangu\xE9.",
        target: "Gain de 150 jeunes pour Christ"
      }
    ]
  },
  {
    id: "grp-hommes",
    name: "Hommes d'Impact",
    slug: "mens-ministry",
    subtitle: "Minist\xE8re des hommes d'honneur",
    description: "B\xE2tir des hommes d'honneur, des p\xE8res responsables et des leaders spirituels int\xE8gres selon la Parole de Dieu pour impacter les familles et la soci\xE9t\xE9.",
    leader: "Marc-Antoine Traor\xE9",
    deputyLeader: "David Bamba",
    membersCount: 68,
    meetingSchedule: "2e et 4e Samedi du mois",
    meetingDay: "Samedi",
    meetingTime: "08h30 \u2013 11h00",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-stone-800/15 text-stone-900 border-stone-400",
    activities: ["Petits d\xE9jeuners fraternels", "Conf\xE9rence Hommes de Valeur", "Entraide professionnelle & entrepreneuriat chr\xE9tien"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "S\xE9minaire sur l'Int\xE9grit\xE9 et les Finances du Foyer",
        description: "Gestion biblique des ressources familiales, investissements et mod\xE8le de paternit\xE9 chr\xE9tienne.",
        target: "Fortifier 50 p\xE8res et jeunes fianc\xE9s"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Retraite Spirituelle des P\xE8res \xAB B\xE2tisseurs de Destin \xBB",
        description: "Enseignements doctrinaux, pri\xE8re d'autorit\xE9 pour les enfants et fraternit\xE9 masculine.",
        target: "Restauration des autels de pri\xE8re familiaux"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Journ\xE9e d'Entraide & Travaux au Sanctuaire",
        description: "Travaux pratiques d'am\xE9nagement et soutien logistique pour les installations du sanctuaire.",
        target: "Embellissement et maintenance du b\xE2timent"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Banquet Annuel des Hommes d'Honneur & Bilan",
        description: "Partage de t\xE9moignages d'affaires, actions de gr\xE2ce et soutien aux veuves pour No\xEBl.",
        target: "Solidarit\xE9 fraternelle et dons caritatifs"
      }
    ]
  },
  {
    id: "grp-perles",
    name: "Perles Pr\xE9cieuses",
    slug: "precious-pearls",
    subtitle: "Femmes de foi, pri\xE8re & vertu",
    description: "Le d\xE9partement des femmes d'impact de l'\xE9glise. \xC9panouissement personnel, foi in\xE9branlable, entraide fraternelle, pri\xE8re strat\xE9gique et leadership vertueux.",
    leader: "Sarah N'Dri",
    deputyLeader: "Grace Kamara",
    membersCount: 94,
    meetingSchedule: "1er et 3e Samedi du mois",
    meetingDay: "Samedi",
    meetingTime: "10h00 \u2013 12h30",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-600/15 text-amber-950 border-amber-500",
    activities: ["Ateliers comp\xE9tences & famille", "Je\xFBne des sentinelles f\xE9minines", "Gala de la femme vertueuse", "Accompagnement des veuves et m\xE8res"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Grande Conf\xE9rence de la Femme Vertueuse (Proverbes 31)",
        description: "Enseignements sur la pri\xE8re d'une m\xE8re, la tenue du foyer et le leadership f\xE9minin en Christ.",
        target: "Mobilisation de 120 femmes du quartier"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Atelier Pratique d'Autonomie & M\xE9tiers Pratiques",
        description: "Formations pratiques (couture, p\xE2tisserie, gestion de micro-activit\xE9s g\xE9n\xE9ratrices de revenus).",
        target: "Autonomisation financi\xE8re des s\u0153urs"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Campagne de Solidarit\xE9 \xAB Paniers d'Amour pour Orphelins \xBB",
        description: "Collecte et distribution de vivres, kits scolaires et v\xEAtements pour les familles d\xE9munies de Ngangu\xE9.",
        target: "Distribution de 100 kits scolaires"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "Nuit de Pri\xE8re des M\xE8res pour la Fin d'Ann\xE9e",
        description: "Pri\xE8re fervente de d\xE9livrance et de protection divine sur tous les enfants et foyers de l'\xE9glise.",
        target: "Protection spirituelle de toutes les familles"
      }
    ]
  },
  {
    id: "grp-ecole-du-ciel",
    name: "\xC9cole du Ciel (\xC9coDim)",
    slug: "school-of-heaven",
    subtitle: "Minist\xE8re des enfants & \xE9cole du dimanche",
    description: "Le minist\xE8re des enfants et de l'\xE9cole du dimanche. Enseigner les fondements de la Bible aux tout-petits avec tendresse, cr\xE9ativit\xE9 et joie c\xE9leste.",
    leader: "Rebecca Sawadogo",
    deputyLeader: "Ruth Soro",
    membersCount: 52,
    meetingSchedule: "Chaque Dimanche pendant le grand culte",
    meetingDay: "Dimanche",
    meetingTime: "08h30 \u2013 11h30",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-500/20 text-amber-950 border-amber-500",
    activities: ["Classes d'\xE2ge (3-6, 7-10, 11-14 ans)", "Com\xE9dies musicales bibliques", "Colonies de vacances chr\xE9tiennes"],
    annualProgram: [
      {
        period: "1er Trimestre (Janvier \u2013 Mars)",
        title: "Parcours Biblique \xAB J\xE9sus mon Ami Fid\xE8le \xBB",
        description: "M\xE9morisation des versets cl\xE9s, r\xE9cits bibliques illustr\xE9s et chants gestu\xE9s pour enfants.",
        target: "Apprentissage ludique des 10 commandements"
      },
      {
        period: "2e Trimestre (Avril \u2013 Juin)",
        title: "Spectacle de P\xE2ques Pr\xE9sent\xE9 par les Enfants",
        description: "Sc\xE8ne th\xE9\xE2trale et r\xE9citation de po\xE8mes bibliques devant toute l'assembl\xE9e r\xE9unie.",
        target: "Expression artistique chr\xE9tienne des petits"
      },
      {
        period: "3e Trimestre (Juillet \u2013 Septembre)",
        title: "Colonie Biblique de Vacances (Vacances Utiles)",
        description: "Jeux de soci\xE9t\xE9 chr\xE9tiens, travaux manuels, sorties p\xE9dagogiques et go\xFBters fraternels.",
        target: "Encadrement sain pendant les vacances"
      },
      {
        period: "4e Trimestre (Octobre \u2013 D\xE9cembre)",
        title: "C\xE9l\xE9bration de l'Arbre de No\xEBl des Enfants",
        description: "Distribution de cadeaux, go\xFBter g\xE9ant et com\xE9die musicale pour la naissance du Sauveur.",
        target: "Joie partag\xE9e avec les enfants d\xE9favoris\xE9s"
      }
    ]
  }
];
const INITIAL_PROGRAMS = [
  {
    id: "prog-1",
    title: "\xC9tude biblique & Enseignement des doctrines",
    day: "Mercredi",
    startTime: "18h00",
    endTime: "20h00",
    category: "\xC9tude & Enseignement",
    leader: "Pasteur Andr\xE9 Kon\xE9",
    room: "Temple Principal \u2014 New Bell Ngangu\xE9 & Direct YouTube / Facebook",
    description: "Exploration m\xE9thodique des Saintes \xC9critures, approfondissement doctrinal, questions-r\xE9ponses et \xE9dification des disciples.",
    isPublic: true,
    recurrence: "Chaque Mercredi de 18h00 \xE0 20h00",
    updatedAt: "2026-08-15"
  },
  {
    id: "prog-2",
    title: "R\xE9union de pri\xE8re, D\xE9livrance & Perc\xE9e spirituelle",
    day: "Vendredi",
    startTime: "18h00",
    endTime: "20h00",
    category: "Pri\xE8re & Intercession",
    leader: "Proph\xE8te \xC9lie Zadi & D\xE9partement Intercession",
    room: "Sanctuaire Central (Lieu-dit Maison Blanche)",
    description: "Intercession communautaire puissante, brisement des liens, pri\xE8re pour les malades et proclamation de la victoire en J\xE9sus-Christ.",
    isPublic: true,
    recurrence: "Chaque Vendredi de 18h00 \xE0 20h00",
    updatedAt: "2026-08-10"
  },
  {
    id: "prog-night-prayer",
    title: "Grand Je\xFBne et Nuit de Pri\xE8re Mensuelle",
    day: "Vendredi",
    startTime: "21h00",
    endTime: "05h00",
    category: "Je\xFBne & Nuit de pri\xE8re",
    leader: "Corps Pastoral & \xC9quipe d'Intercession",
    room: "Grand Sanctuaire de New Bell Ngangu\xE9",
    description: "Veill\xE9e sainte de combat spirituel, louange proph\xE9tique non-stop, d\xE9clarations bibliques et pri\xE8re fervente jusqu'\xE0 l'aurore.",
    isPublic: true,
    recurrence: "Tous les derniers vendredis du mois (21h00 \u2013 05h00)",
    updatedAt: "2026-08-18"
  },
  {
    id: "prog-exam-prayer",
    title: "Je\xFBne et Pri\xE8res Sp\xE9ciales pour les Examens & Concours",
    day: "Vendredi",
    startTime: "08h00",
    endTime: "16h00",
    category: "Pri\xE8re & Intercession",
    leader: "Pasteur Didier Mbog, R\xE9v. Doc. Anne & D\xE9partement Jeunesse",
    room: "Sanctuaire Central & Pavillon des \xC9tudiants (Maison Blanche)",
    description: "Rassemblement annuel de cons\xE9cration et d'onction pour les \xE9l\xE8ves, \xE9tudiants, candidats aux concours officiels et projets de carri\xE8re.",
    isPublic: true,
    recurrence: "Chaque 1er Mai de chaque ann\xE9e (08h00 \u2013 16h00)",
    updatedAt: "2026-08-18"
  },
  {
    id: "prog-3",
    title: "Grand Culte Dominical d'Adoration & de B\xE9n\xE9diction",
    day: "Dimanche",
    startTime: "08h00",
    endTime: "12h00",
    category: "Culte principal",
    leader: "Pasteur Principal Didier Mbog & R\xE9v. Doc. Anne Mbog",
    room: "Sanctuaire Central de Ngangu\xE9 (Lieu-dit Maison Blanche)",
    description: "C\xE9l\xE9bration festive de l'assembl\xE9e : louange vivante avec Rythmes C\xE9lestes, sainte c\xE8ne, pr\xE9dication apostolique et b\xE9n\xE9diction pastorale.",
    isPublic: true,
    recurrence: "Chaque Dimanche de 08h00 \xE0 12h00",
    updatedAt: "2026-08-18"
  },
  {
    id: "prog-4",
    title: "Rassemblement Impact Jeunesse",
    day: "Samedi",
    startTime: "15h00",
    endTime: "18h00",
    category: "Groupe & D\xE9partement",
    leader: "Jean Dupont & Marie Dupont",
    room: "Espace Polyvalent Jeunesse",
    description: "Louange vivante, d\xE9bats d'actualit\xE9 \xE0 la lumi\xE8re de la Bible, communion fraternelle et mentorat pour jeunes.",
    isPublic: true,
    recurrence: "Chaque Samedi \xE0 15h00",
    groupAffiliation: "Jeunesse",
    updatedAt: "2026-08-01"
  },
  {
    id: "prog-5",
    title: "Matin\xE9e des Hommes d'Honneur",
    day: "Samedi",
    startTime: "08h30",
    endTime: "11h00",
    category: "Groupe & D\xE9partement",
    leader: "Marc-Antoine Traor\xE9",
    room: "Salle de Conf\xE9rence Fraternelle",
    description: "\xC9change franc sur les responsabilit\xE9s de l'homme chr\xE9tien dans la famille, l'\xE9glise et le milieu professionnel.",
    isPublic: true,
    recurrence: "2e et 4e Samedi du mois",
    groupAffiliation: "Hommes",
    updatedAt: "2026-08-05"
  },
  {
    id: "prog-6",
    title: "Cercle de Pri\xE8re & Foi des Perles Pr\xE9cieuses",
    day: "Samedi",
    startTime: "10h00",
    endTime: "12h30",
    category: "Groupe & D\xE9partement",
    leader: "Sarah N'Dri",
    room: "Pavillon des S\u0153urs",
    description: "Partage biblique sur la femme vertueuse, intercession pour les foyers et soutien aux m\xE8res et veuves.",
    isPublic: true,
    recurrence: "1er et 3e Samedi du mois",
    groupAffiliation: "Perles pr\xE9cieuses",
    updatedAt: "2026-08-08"
  }
];
const INITIAL_EVENTS = [
  {
    id: "evt-evangelism-mai-2026",
    title: "Campagne d'\xE9vang\xE9lisation allant de la p\xE9riode du 10 au 15 mai 2026",
    date: "2026-05-10",
    displayDate: "Du 10 au 15 Mai 2026",
    time: "17h30 \u2013 21h30 (Chaque soir)",
    location: "Esplanade de New Bell Ngangu\xE9 (Lieu-dit Maison Blanche), Douala",
    speaker: "Pasteur Didier Mbog, R\xE9v. Doc. Anne Mbog & \xC9vang\xE9listes Invit\xE9s",
    category: "Campagne d'\xE9vang\xE9lisation",
    description: "Grande semaine de proclamation de l'\xC9vangile de gr\xE2ce et de puissance, salut des \xE2mes, pri\xE8res de d\xE9livrance et de gu\xE9rison divine au c\u0153ur de Ngangu\xE9. Rassemblement de toute la communaut\xE9.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    maxCapacity: 2500,
    registeredCount: 1480,
    isPublished: true,
    isFeatured: true,
    isEvangelism: true
  },
  {
    id: "evt-evangelism-1",
    title: "Campagne d'\xC9vang\xE9lisation : \xAB J\xE9sus Sauve et Gu\xE9rit Aujourd'hui \xBB",
    date: "2026-11-18",
    displayDate: "Du 18 au 22 Novembre 2026",
    time: "17h30 \u2013 21h00 (Chaque soir)",
    location: "Esplanade de New Bell Ngangu\xE9 (Lieu-dit Maison Blanche)",
    speaker: "Pasteur Didier Mbog, R\xE9v. Doc. Anne & \xC9vang\xE9listes Invit\xE9s",
    category: "Campagne d'\xE9vang\xE9lisation",
    description: "5 grandes soir\xE9es de proclamation de l'\xC9vangile de gr\xE2ce, de salut en J\xE9sus-Christ, de pri\xE8res pour les malades et de r\xE9conciliation avec Dieu. Entr\xE9e 100% libre et gratuite.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    maxCapacity: 2e3,
    registeredCount: 1140,
    isPublished: true,
    isFeatured: false,
    isEvangelism: true
  },
  {
    id: "evt-night-monthly",
    title: "Grand Je\xFBne & Nuit de Pri\xE8re de Fin de Mois",
    date: "2026-08-28",
    displayDate: "Tous les derniers vendredis du mois (ex: 28 Ao\xFBt 2026)",
    time: "21h00 \u2013 05h00 (Nuit compl\xE8te de veille)",
    location: "Sanctuaire Central de New Bell Ngangu\xE9 (Lieu-dit Maison Blanche)",
    speaker: "Pasteur Didier Mbog, R\xE9v. Doc. Anne & \xC9quipe d'Intercession",
    category: "Je\xFBne & Pri\xE8re",
    description: "Rassemblement mensuel de toute la communaut\xE9 pour je\xFBner, interc\xE9der pour le Cameroun, les familles, les malades et proclamer les d\xE9crets divins.",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80",
    maxCapacity: 800,
    registeredCount: 520,
    isPublished: true,
    isFeatured: true
  },
  {
    id: "evt-exam-annual",
    title: "Journ\xE9e Sp\xE9ciale : Je\xFBne & Pri\xE8res pour les Examens et Concours",
    date: "2027-05-01",
    displayDate: "Chaque 1er Mai (Prochaine \xE9dition : 1er Mai 2027)",
    time: "08h00 \u2013 16h00 (Journ\xE9e continue)",
    location: "Sanctuaire Central CPC Ngangu\xE9 (Lieu-dit Maison Blanche)",
    speaker: "Pasteur Didier Mbog & R\xE9v. Doc. Anne Mbog",
    category: "Je\xFBne & Pri\xE8re",
    description: "Grand temps spirituel d\xE9di\xE9 aux candidats du BEPC, Probatoire, Baccalaur\xE9at, BTS, Licences, Masters, concours administratifs et projets professionnels.",
    imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&auto=format&fit=crop&q=80",
    maxCapacity: 600,
    registeredCount: 380,
    isPublished: true,
    isFeatured: true
  },
  {
    id: "evt-orphans-aid",
    title: "Action Sociale & Don de Kits Scolaires pour les Orphelins de Ngangu\xE9",
    date: "2026-09-05",
    displayDate: "05 Septembre 2026",
    time: "10h00 \u2013 15h00",
    location: "Pavillon Social CPC \u2014 Ngangu\xE9",
    speaker: "D\xE9partement Diaconat & Comit\xE9 Orphelins",
    category: "Social & Orphelins",
    description: "Distribution solidaire de fournitures scolaires, sacs, uniformes et aides \xE0 la scolarit\xE9 pour plus de 150 enfants orphelins et veuves du quartier.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    maxCapacity: 300,
    registeredCount: 215,
    isPublished: true,
    isFeatured: false
  },
  {
    id: "evt-2",
    title: "Retraite Spirituelle des Femmes de Foi (Perles Pr\xE9cieuses)",
    date: "2026-10-09",
    displayDate: "09 \u2013 11 Octobre 2026",
    time: "Vendredi 15h00 au Dimanche 16h00",
    location: "Centre Spirituel B\xE9thanie",
    speaker: "Sarah N'Dri & R\xE9v. Doc. Anne Mbog",
    category: "Retraite",
    description: "Un week-end de ressourcement, de je\xFBne, de restauration \xE9motionnelle et d'intimit\xE9 renouvel\xE9e avec le Seigneur.",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80",
    maxCapacity: 120,
    registeredCount: 98,
    isPublished: true,
    isFeatured: false
  },
  {
    id: "evt-3",
    title: "Camp National d'Impact Jeunesse 2026",
    date: "2026-10-24",
    displayDate: "24 \u2013 27 Octobre 2026",
    time: "4 jours / 3 nuits en immersion",
    location: "Domaine des Oliviers",
    speaker: "Jean Dupont & \xC9quipe Jeunesse",
    category: "Jeunesse",
    description: "Ateliers leadership, louange non-stop, sports, t\xE9moignages puissants et cons\xE9cration pour toute la jeunesse de la communaut\xE9.",
    imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&auto=format&fit=crop&q=80",
    maxCapacity: 250,
    registeredCount: 185,
    isPublished: true,
    isFeatured: false
  }
];
const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Campagne d'\xC9vang\xE9lisation : Du 10 au 15 Mai 2026",
    content: "Mobilisation g\xE9n\xE9rale pour notre grande campagne d'\xE9vang\xE9lisation en plein air \xE0 New Bell Ngangu\xE9 (Lieu-dit Maison Blanche). Venez avec vos voisins et amis.",
    targetAudience: "all",
    author: "Pasteur Didier Mbog",
    authorRole: "Pasteur principal",
    createdAt: "2026-08-18",
    notificationSentCount: 420,
    isPinned: true,
    priority: "urgent"
  },
  {
    id: "ann-2",
    title: "Grand Je\xFBne et Nuit de Pri\xE8re : Dernier Vendredi du mois",
    content: "Tous les fid\xE8les sont convi\xE9s ce dernier vendredi du mois de 21h00 \xE0 05h00 pour la nuit de veille, combat spirituel et d\xE9livrance au Sanctuaire.",
    targetAudience: "all",
    author: "Pasteur Didier Mbog & R\xE9v. Doc. Anne Mbog",
    authorRole: "Corps Pastoral",
    createdAt: "2026-08-16",
    notificationSentCount: 340,
    isPinned: true,
    priority: "normal"
  },
  {
    id: "ann-3",
    title: "Dons pour les Orphelins & Enfants Vuln\xE9rables de notre communaut\xE9",
    content: "Le comit\xE9 social recueille vos dons pour soutenir 150 enfants orphelins (kits scolaires, prise en charge et secours alimentaire).",
    targetAudience: "all",
    author: "Comit\xE9 Diaconat & Social",
    authorRole: "Service Social",
    createdAt: "2026-08-14",
    notificationSentCount: 290,
    isPinned: false,
    priority: "info"
  },
  {
    id: "ann-4",
    title: "Rappel : \xC9tude Biblique chaque Mercredi \xE0 18h00",
    content: "Rejoignez-nous chaque mercredi de 18h00 \xE0 20h00 pour notre parcours th\xE9ologique et approfondissement des Saintes \xC9critures.",
    targetAudience: "all",
    author: "Pasteur Andr\xE9 Kon\xE9",
    authorRole: "Pasteur Associ\xE9",
    createdAt: "2026-08-12",
    notificationSentCount: 180,
    isPinned: false,
    priority: "normal"
  }
];
const INITIAL_SERMONS = [
  // CULTE DIMANCHE (08h00 - 12h00)
  {
    id: "srm-dim-1",
    title: "Marcher par la Foi et Triompher des Temp\xEAtes de la Vie",
    preacher: "Pasteur Didier Mbog",
    series: "Les Fondements In\xE9branlables",
    theme: "Foi & Victoire Chr\xE9tienne",
    scripture: "H\xE9breux 11:1-6 & 2 Corinthiens 5:7",
    day: "Dimanche",
    time: "08h00 - 12h00",
    serviceType: "Grand Culte Dominical",
    date: "2026-08-16",
    duration: "54 min",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_evening.ogg",
    pdfNotesUrl: "#",
    thumbnailUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800&auto=format&fit=crop&q=80",
    viewsCount: 1540,
    listenCount: 920,
    platforms: { cpcn: true, youtube: true, facebook: true, tiktok: true },
    youtubeUrl: "https://www.youtube.com/@CommunautepourChrist",
    facebookUrl: "https://facebook.com/cpcn.ngangue",
    tiktokUrl: "https://tiktok.com/@cpcn.ngangue"
  },
  {
    id: "srm-dim-2",
    title: "La Transformation des Vies par le Renouvellement de l'Intelligence",
    preacher: "R\xE9v. Doc. Anne Mbog",
    series: "Vivre la Gr\xE2ce au Quotidien",
    theme: "Transformation & Croissance Spirituelle",
    scripture: "Romains 12:1-2 & Galates 5:22-23",
    day: "Dimanche",
    time: "08h00 - 12h00",
    serviceType: "Grand Culte Dominical",
    date: "2026-08-09",
    duration: "47 min",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_evening.ogg",
    pdfNotesUrl: "#",
    thumbnailUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    viewsCount: 1120,
    listenCount: 760,
    platforms: { cpcn: true, youtube: true, facebook: true, tiktok: true },
    youtubeUrl: "https://www.youtube.com/@CommunautepourChrist",
    facebookUrl: "https://facebook.com/cpcn.ngangue",
    tiktokUrl: "https://tiktok.com/@cpcn.ngangue"
  },
  // MERCREDI (18h00 - 20h00) : ÉTUDE BIBLIQUE & ENSEIGNEMENT
  {
    id: "srm-merc-1",
    title: "L'Int\xE9grit\xE9 Chr\xE9tienne et les Lois Spirituelles de la Prosp\xE9rit\xE9",
    preacher: "Pasteur Andr\xE9 Kon\xE9",
    series: "Doctrines Bibliques & Vie Pratique",
    theme: "Enseignement Th\xE9ologique",
    scripture: "Malachie 3:10 & Proverbes 3:9-10",
    day: "Mercredi",
    time: "18h00 - 20h00",
    serviceType: "\xC9tude Biblique & Enseignement",
    date: "2026-08-12",
    duration: "62 min",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_evening.ogg",
    pdfNotesUrl: "#",
    thumbnailUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=800&auto=format&fit=crop&q=80",
    viewsCount: 890,
    listenCount: 640,
    platforms: { cpcn: true, youtube: true, facebook: true, tiktok: false },
    youtubeUrl: "https://www.youtube.com/@CommunautepourChrist",
    facebookUrl: "https://facebook.com/cpcn.ngangue",
    tiktokUrl: "https://tiktok.com/@cpcn.ngangue"
  },
  {
    id: "srm-merc-2",
    title: "Comprendre l'Alliance Nouvelle scell\xE9e dans le Sang de J\xE9sus",
    preacher: "Pasteur Didier Mbog",
    series: "Doctrines Bibliques & Vie Pratique",
    theme: "Th\xE9ologie de l'Alliance",
    scripture: "H\xE9breux 8:6-13 & Luc 22:20",
    day: "Mercredi",
    time: "18h00 - 20h00",
    serviceType: "\xC9tude Biblique & Enseignement",
    date: "2026-08-05",
    duration: "58 min",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_evening.ogg",
    pdfNotesUrl: "#",
    thumbnailUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&auto=format&fit=crop&q=80",
    viewsCount: 780,
    listenCount: 510,
    platforms: { cpcn: true, youtube: true, facebook: true, tiktok: false },
    youtubeUrl: "https://www.youtube.com/@CommunautepourChrist",
    facebookUrl: "https://facebook.com/cpcn.ngangue",
    tiktokUrl: "https://tiktok.com/@cpcn.ngangue"
  },
  // VENDREDI (18h00 - 20h00 / 21h00 - 05h00) : PRIÈRE, DÉLIVRANCE & NUIT DE PRIÈRE
  {
    id: "srm-vend-1",
    title: "L'Autorit\xE9 du Croyant : Briser les Autels Mal\xE9fiques et R\xE9clamations Ancestrales",
    preacher: "Proph\xE8te \xC9lie Zadi",
    series: "Combat Spirituel & D\xE9livrance",
    theme: "Pri\xE8re Fervente & D\xE9livrance",
    scripture: "\xC9ph\xE9siens 6:10-18 & Juges 6:25-27",
    day: "Vendredi",
    time: "18h00 - 20h00",
    serviceType: "Pri\xE8re, D\xE9livrance & Nuit de Pri\xE8re",
    date: "2026-08-14",
    duration: "68 min",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_evening.ogg",
    pdfNotesUrl: "#",
    thumbnailUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&auto=format&fit=crop&q=80",
    viewsCount: 1340,
    listenCount: 1050,
    platforms: { cpcn: true, youtube: true, facebook: true, tiktok: true },
    youtubeUrl: "https://www.youtube.com/@CommunautepourChrist",
    facebookUrl: "https://facebook.com/cpcn.ngangue",
    tiktokUrl: "https://tiktok.com/@cpcn.ngangue"
  },
  {
    id: "srm-vend-night",
    title: "Nuit de Pri\xE8re de Fin de Mois : \xAB Ouvrez les Portes \xC9ternelles ! \xBB",
    preacher: "Pasteur Didier Mbog, R\xE9v. Doc. Anne & Chantres Rythmes C\xE9lestes",
    series: "Veill\xE9es d'Impact & Restauration",
    theme: "Nuit de Pri\xE8re & Proph\xE9tique",
    scripture: "Psaume 24:7-10 & Actes 16:25-26",
    day: "Vendredi",
    time: "21h00 - 05h00",
    serviceType: "Pri\xE8re, D\xE9livrance & Nuit de Pri\xE8re",
    date: "2026-07-31",
    duration: "180 min (Extrait condens\xE9)",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/outdoor_evening.ogg",
    pdfNotesUrl: "#",
    thumbnailUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop&q=80",
    viewsCount: 2450,
    listenCount: 1890,
    platforms: { cpcn: true, youtube: true, facebook: true, tiktok: true },
    youtubeUrl: "https://www.youtube.com/@CommunautepourChrist",
    facebookUrl: "https://facebook.com/cpcn.ngangue",
    tiktokUrl: "https://tiktok.com/@cpcn.ngangue"
  }
];
const INITIAL_JOIN_REQUESTS = [
  {
    id: "req-1",
    userId: "usr-4",
    userName: "Sarah N'Dri",
    userEmail: "sarah.ndri@cpcn-ngangue.org",
    userPhone: "+237 678 89 90 01",
    groupId: "grp-intercession",
    groupName: "Intercession",
    requestDate: "2026-08-17",
    status: "pending",
    motivationNote: "Je ressens un profond appel \xE0 interc\xE9der pour les pasteurs et les familles \xE9prouv\xE9es de notre communaut\xE9."
  },
  {
    id: "req-2",
    userId: "usr-visitor",
    userName: "Emmanuel Kassi",
    userEmail: "emmanuel.kassi@gmail.com",
    userPhone: "+237 655 44 33 22",
    groupId: "grp-youth",
    groupName: "Jeunesse",
    requestDate: "2026-08-16",
    status: "pending",
    motivationNote: "Nouvellement install\xE9 \xE0 New Bell Ngangu\xE9 (Maison Blanche), je souhaite servir le Seigneur avec la jeunesse."
  },
  {
    id: "req-3",
    userId: "usr-visitor",
    userName: "Chantal N'Goran",
    userEmail: "chantal.ngoran@gmail.com",
    userPhone: "+237 673 32 21 10",
    groupId: "grp-precious-pearls",
    groupName: "Perles pr\xE9cieuses",
    requestDate: "2026-08-14",
    status: "accepted",
    motivationNote: "Je d\xE9sire grandir spirituellement au sein du minist\xE8re des femmes d'impact."
  }
];
const INITIAL_PRAYER_REQUESTS = [
  {
    id: "pry-1",
    title: "Gu\xE9rison divine pour ma m\xE8re hospitalis\xE9e",
    content: "Prions pour la restauration compl\xE8te de ma m\xE8re qui souffre d'une infection pulmonaire. Que la main du Grand M\xE9decin se pose sur elle.",
    requestorName: "Sarah N'Dri",
    requestorId: "usr-4",
    date: "2026-08-18",
    confidentiality: "COMMUNAUTE",
    status: "active",
    prayedCount: 64,
    isUrgent: true
  },
  {
    id: "pry-2",
    title: "Entretien d'embauche d\xE9cisif ce jeudi",
    content: "Je sollicite la pri\xE8re des fr\xE8res et s\u0153urs pour la faveur de Dieu lors de mon entretien pour un poste de cadre financier.",
    requestorName: "Jean Dupont",
    requestorId: "usr-leader",
    date: "2026-08-17",
    confidentiality: "INTERCESSION",
    status: "active",
    prayedCount: 42,
    isUrgent: false
  },
  {
    id: "pry-3",
    title: "Pri\xE8re sp\xE9ciale pour les examens du Baccalaur\xE9at & Concours",
    content: "Je recommande au Seigneur les \xE9preuves d'admission pour l'\xE9cole d'ing\xE9nieurs. Que le Seigneur donne la sagesse divine.",
    requestorName: "Esther Kouassi",
    requestorId: "usr-esther",
    date: "2026-08-15",
    confidentiality: "COMMUNAUTE",
    status: "active",
    prayedCount: 56,
    isUrgent: false
  },
  {
    id: "pry-4",
    title: "Restauration et paix dans le foyer",
    content: "Requ\xEAte confidentielle pour le r\xE9tablissement de la paix et de la communication dans mon couple.",
    requestorName: "Fid\xE8le Anonyme",
    requestorId: "usr-anon",
    date: "2026-08-15",
    confidentiality: "CONFIDENTIEL",
    status: "active",
    prayedCount: 18,
    isUrgent: true
  },
  {
    id: "pry-5",
    title: "Admis au Concours National avec Mention !",
    content: "Remerciement au Seigneur : apr\xE8s la journ\xE9e de pri\xE8re du 1er mai, les r\xE9sultats sont tomb\xE9s et j'ai \xE9t\xE9 re\xE7u 2e au classement national ! Gloire \xE0 Dieu.",
    requestorName: "Daniel Koffi",
    requestorId: "usr-daniel",
    date: "2026-08-10",
    confidentiality: "COMMUNAUTE",
    status: "answered",
    prayedCount: 88,
    testimonyNote: "Le Seigneur a honor\xE9 nos pri\xE8res, toute gloire Lui soit rendue !"
  }
];
const INITIAL_CAMPAIGNS = [
  {
    id: "cmp-orphelins",
    title: "Dons pour les Orphelins & Enfants Vuln\xE9rables de Ngangu\xE9",
    description: "Programme de parrainage scolaire, fourniture de kits complets de rentr\xE9e, aide nutritionnelle et prise en charge m\xE9dicale des orphelins et enfants d\xE9munis.",
    targetAmount: 6e6,
    collectedAmount: 435e4,
    deadline: "2026-10-31",
    donorsCount: 198,
    category: "Fonds Social",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    isFeatured: true
  },
  {
    id: "cmp-social-food",
    title: "Paniers d'Amour & Secours Alimentaire aux Veuves et Familles",
    description: "Distribution mensuelle de denr\xE9es de premi\xE8re n\xE9cessit\xE9 (riz, huile, lait, savon) aux familles en difficult\xE9 et personnes \xE2g\xE9es du quartier Ngangu\xE9.",
    targetAmount: 4e6,
    collectedAmount: 289e4,
    deadline: "2026-12-31",
    donorsCount: 142,
    category: "Fonds Social",
    imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80",
    isFeatured: false
  },
  {
    id: "cmp-evangelisation",
    title: "Missions d'\xC9vang\xE9lisation & Campagnes de Salut en Plein Air",
    description: "Financement des Bibles distribu\xE9es gratuitement, de la sonorisation mobile, des d\xE9pliants et de la logistique de la Campagne d'\xC9vang\xE9lisation du 18 au 22 Novembre.",
    targetAmount: 8e6,
    collectedAmount: 615e4,
    deadline: "2026-11-30",
    donorsCount: 215,
    category: "Missions",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    isFeatured: false
  }
];
const INITIAL_TESTIMONIES = [
  {
    id: "tst-1",
    author: "Fr\xE8re Michel Ekra",
    title: "Gu\xE9rison miraculeuse apr\xE8s 3 ans de souffrance",
    content: "Pendant le culte de d\xE9livrance de vendredi, le pasteur a proph\xE9tis\xE9 sur des douleurs lombaires chroniques. \xC0 cet instant pr\xE9cis, une chaleur intense a travers\xE9 ma colonne. Les radios de contr\xF4le \xE0 l'h\xF4pital attestent de la gu\xE9rison totale. J\xE9sus est vivant !",
    date: "2026-08-14",
    approved: true,
    category: "Gu\xE9rison",
    likesCount: 54
  },
  {
    id: "tst-2",
    author: "S\u0153ur Gr\xE2ce Kamara",
    title: "Faveur divine et obtention inattendue d'un logement",
    content: "Apr\xE8s des mois de rejet et de pr\xE9carit\xE9, nous avons pri\xE9 avec le groupe des Precious pearls. En moins de 48 heures, un propri\xE9taire nous a contact\xE9s pour un contrat tr\xE8s avantageux. Dieu ne d\xE9laisse jamais ceux qui se confient en Lui.",
    date: "2026-08-11",
    approved: true,
    category: "Provision",
    likesCount: 39
  },
  {
    id: "tst-3",
    author: "Fr\xE8re David Bamba",
    title: "D\xE9livrance de l'alcool et r\xE9conciliation familiale",
    content: "Le Seigneur m'a lib\xE9r\xE9 d'une d\xE9pendance de 12 ans apr\xE8s avoir rejoint le Men's ministry. Ma femme et mes enfants ont retrouv\xE9 le sourire et nous servons d\xE9sormais Dieu ensemble dans le sanctuaire.",
    date: "2026-08-05",
    approved: true,
    category: "D\xE9livrance",
    likesCount: 78
  }
];
const INITIAL_THANKSGIVINGS = [
  {
    id: "thk-1",
    author: "Sarah N'Dri",
    message: "Je b\xE9nis l'\xC9ternel pour une ann\xE9e de plus de vie et pour Sa fid\xE9lit\xE9 in\xE9puisable envers ma maison !",
    date: "2026-08-18",
    amenCount: 43
  },
  {
    id: "thk-2",
    author: "Famille Kouassi",
    message: "Action de gr\xE2ce au Seigneur pour la naissance de notre petit Joshua en parfaite sant\xE9 !",
    date: "2026-08-17",
    amenCount: 62
  },
  {
    id: "thk-3",
    author: "Marc-Antoine Traor\xE9",
    message: "Merci \xE0 J\xE9sus pour la protection divine accord\xE9e lors de notre long voyage sur la route.",
    date: "2026-08-15",
    amenCount: 31
  }
];
const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Nouvelle Annonce Pastorale",
    message: "Pr\xE9paration active de la Campagne d'\xC9vang\xE9lisation du 10 au 15 Mai 2026 : \xAB J\xE9sus-Christ transforme les c\u0153urs et gu\xE9rit les nations \xBB.",
    date: "2026-08-18",
    timeAgo: "Il y a 2 heures",
    type: "announcement",
    read: false,
    targetSpace: "public",
    targetTab: "\xC9v\xE9nements"
  },
  {
    id: "notif-2",
    title: "Demande d'adh\xE9sion en attente",
    message: "Sarah N'Dri a postul\xE9 pour int\xE9grer le Groupe d'Intercession.",
    date: "2026-08-17",
    timeAgo: "Hier",
    type: "group_request",
    read: false,
    targetSpace: "erp",
    targetTab: "Groupes"
  },
  {
    id: "notif-3",
    title: "Rappel de Culte",
    message: "Rendez-vous ce soir \xE0 18h00 pour l'\xC9tude biblique et l'Enseignement des doctrines.",
    date: "2026-08-16",
    timeAgo: "Il y a 2 jours",
    type: "program",
    read: true,
    targetSpace: "public",
    targetTab: "Programmes"
  }
];
const INITIAL_MEMBERS = [
  {
    id: "mbr-1",
    fullName: "Pasteur Didier Mbog",
    email: "pasteur.didier@cpcn-ngangue.org",
    phone: "+237 690 12 34 56",
    role: "Pasteur principal",
    groupName: "Corps Pastoral",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2015-01-10",
    avatarUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80",
    address: "New Bell Ngangu\xE9 (Lieu-dit Maison Blanche)"
  },
  {
    id: "mbr-anne",
    fullName: "R\xE9v. Doc. Anne Mbog",
    email: "rev.anne@cpcn-ngangue.org",
    phone: "+237 690 98 76 54",
    role: "Pasteur",
    groupName: "Corps Pastoral",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2015-01-10",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    address: "New Bell Ngangu\xE9 (Lieu-dit Maison Blanche)"
  },
  {
    id: "mbr-2",
    fullName: "Pasteur Andr\xE9 Kon\xE9",
    email: "andre.kone@cpcn-ngangue.org",
    phone: "+237 698 76 54 32",
    role: "Pasteur",
    groupName: "Intercession group",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2018-03-15",
    avatarUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&auto=format&fit=crop&q=80",
    address: "Ngangue R\xE9sidentiel"
  },
  {
    id: "mbr-3",
    fullName: "Samuel Diallo",
    email: "samuel.diallo@cpcn-ngangue.org",
    phone: "+237 674 51 28 96",
    role: "Leader de groupe",
    groupName: "Youth",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2020-06-20",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    address: "Rue de la Joie, Ngangue"
  },
  {
    id: "mbr-4",
    fullName: "Esther Kouassi",
    email: "esther.kouassi@cpcn-ngangue.org",
    phone: "+237 672 23 34 45",
    role: "Adjoint de groupe",
    groupName: "Youth",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2021-09-10",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    address: "Avenue de la Gr\xE2ce, Ngangue"
  },
  {
    id: "mbr-5",
    fullName: "Marc-Antoine Traor\xE9",
    email: "marc.traore@cpcn-ngangue.org",
    phone: "+237 664 45 56 67",
    role: "Leader de groupe",
    groupName: "Men's ministry",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2016-11-12",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    address: "Boulevard de l'Alliance, Ngangue"
  },
  {
    id: "mbr-6",
    fullName: "Sarah N'Dri",
    email: "sarah.ndri@cpcn-ngangue.org",
    phone: "+237 678 89 90 01",
    role: "Leader de groupe",
    groupName: "Precious pearls",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2019-04-18",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    address: "Cit\xE9 des Palmiers, Ngangue"
  },
  {
    id: "mbr-7",
    fullName: "David Bamba",
    email: "david.bamba@cpcn-ngangue.org",
    phone: "+237 663 34 45 56",
    role: "Adjoint de groupe",
    groupName: "Men's ministry",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2018-05-10",
    avatarUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&auto=format&fit=crop&q=80",
    address: "Rue de la Fraternit\xE9, Ngangue"
  },
  {
    id: "mbr-8",
    fullName: "Grace Kamara",
    email: "grace.kamara@gmail.com",
    phone: "+237 676 67 78 89",
    role: "Adjoint de groupe",
    groupName: "Precious pearls",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2020-11-04",
    avatarUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80",
    address: "Carrefour Esp\xE9rance, Ngangue"
  },
  {
    id: "mbr-9",
    fullName: "Rebecca Sawadogo",
    email: "rebecca.s@cpcn-ngangue.org",
    phone: "+237 679 98 87 76",
    role: "Leader de groupe",
    groupName: "School of heaven",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2019-09-12",
    avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    address: "Rue des Enfants de Gloire"
  },
  {
    id: "mbr-10",
    fullName: "Ruth Soro",
    email: "ruth.soro@cpcn-ngangue.org",
    phone: "+237 664 43 32 21",
    role: "Adjoint de groupe",
    groupName: "School of heaven",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2022-03-01",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    address: "Cit\xE9 Esp\xE9rance"
  },
  {
    id: "mbr-11",
    fullName: "Proph\xE8te \xC9lie Zadi",
    email: "elie.zadi@cpcn-ngangue.org",
    phone: "+237 665 56 67 78",
    role: "Leader de groupe",
    groupName: "Intercession group",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2017-08-20",
    avatarUrl: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150&auto=format&fit=crop&q=80",
    address: "Montagne de Pri\xE8re, Ngangue"
  },
  {
    id: "mbr-12",
    fullName: "Anna Gbagbo",
    email: "anna.g@cpcn-ngangue.org",
    phone: "+237 671 23 45 67",
    role: "Adjoint de groupe",
    groupName: "Intercession group",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2018-04-18",
    avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    address: "Rue de la R\xE9conciliation"
  },
  {
    id: "mbr-13",
    fullName: "Jean-Baptiste Yao",
    email: "jb.yao@cpcn-ngangue.org",
    phone: "+237 668 89 91 12",
    role: "Leader de groupe",
    groupName: "Service d'Entretien",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2016-10-05",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    address: "Rue du Service Fid\xE8le"
  },
  {
    id: "mbr-14",
    fullName: "Marthe Konan",
    email: "marthe.konan@cpcn-ngangue.org",
    phone: "+237 677 78 89 90",
    role: "Adjoint de groupe",
    groupName: "Service d'Entretien",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2020-02-17",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    address: "All\xE9e de la Paix"
  },
  {
    id: "mbr-15",
    fullName: "Clarisse Mendy",
    email: "clarisse.mendy@email.com",
    phone: "+237 671 12 23 34",
    role: "Membre",
    groupName: "Precious pearls",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2023-01-20",
    avatarUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80",
    address: "Ngangue Centre"
  },
  {
    id: "mbr-16",
    fullName: "Martial N'Guessan",
    email: "martial.ng@email.com",
    phone: "+237 668 87 76 65",
    role: "Membre",
    groupName: "Men's ministry",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2023-05-14",
    avatarUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&auto=format&fit=crop&q=80",
    address: "Rue de la Victoire"
  },
  {
    id: "mbr-17",
    fullName: "Daniel Koffi",
    email: "daniel.koffi@gmail.com",
    phone: "+237 662 23 34 45",
    role: "Membre",
    groupName: "Youth",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2021-08-30",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    address: "Carrefour de la Jeunesse"
  },
  {
    id: "mbr-18",
    fullName: "Alexandre Tour\xE9",
    email: "admin@cpcn-ngangue.org",
    phone: "+237 660 01 12 23",
    role: "Administrateur",
    groupName: "Intercession group",
    isBaptized: true,
    status: "Actif",
    joinedDate: "2017-02-10",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    address: "Secr\xE9tariat G\xE9n\xE9ral CPC"
  }
];
export {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_EVENTS,
  INITIAL_GROUPS,
  INITIAL_JOIN_REQUESTS,
  INITIAL_MEMBERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PRAYER_REQUESTS,
  INITIAL_PROGRAMS,
  INITIAL_SERMONS,
  INITIAL_TESTIMONIES,
  INITIAL_THANKSGIVINGS,
  INITIAL_USERS
};
