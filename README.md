# CPC Connect — Communauté pour Christ

> **Plateforme web unifiée pour l'Église CPC Connect (Sanctuaire de New Bell Ngangué, Douala, Cameroun)**  
> Regroupe le site vitrine public, les espaces membres et responsables, et le module ERP de gestion ecclésiale.

---

## 📋 Table des Matières

1. [Présentation du Projet & Architecture](#-présentation-du-projet--architecture)
2. [Distinction des 3 Pôles Principaux](#-distinction-des-3-pôles-principaux)
3. [Rôles & Contrôle d'Accès (RBAC)](#-rôles--contrôle-daccès-rbac)
4. [Structure Complète des Dossiers et Fichiers](#-structure-complète-des-dossiers-et-fichiers)
5. [Guide de Démarrage en Local](#-guide-de-démarrage-en-local)
6. [Commandes du Projet](#-commandes-du-projet)
7. [Variables d'Environnement](#-variables-denvironnement)
8. [Déploiement sur GitHub & Vercel](#-déploiement-sur-github--vercel)
9. [Architecture : Frontend SPA ou Full-Stack ?](#-architecture--frontend-spa-ou-full-stack-)
10. [Raccordement à une Base de Données / API](#-raccordement-à-une-base-de-données--api)

---

## 🏛️ Présentation du Projet & Architecture

L'application **CPC Connect** a été conçue pour répondre à l'ensemble des besoins numériques de la communauté :
- **Site vitrine public** : Présentation de l'église, géolocalisation à New Bell Ngangué, cultes en direct, prédications multimédias, feuille de route annuelle des départements et dons en ligne.
- **Portails privés dédiés** : Espaces personnalisés pour les fidèles, les responsables de départements et le corps pastoral.
- **ERP de gestion ecclésiale centralisée** : Gestion administrative, financière, suivi des membres et statistiques.

---

## 🔍 Distinction des 3 Pôles Principaux

### 1. Le Frontend Public (Accès Libre sans Authentification)
- **Accueil** : Message pastoral, verset du mois, cultes en direct et prochains rassemblements.
- **À propos, Vision & Mission, Leadership** : Identité doctrinale et présentation des pasteurs.
- **Groupes & Départements** : Présentation des départements (Intercession & Prière, Rythmes Célestes, Jeunesse, Hommes d'Impact, Perles Précieuses, École du Ciel, Service d'entretien pour un environnement sain et convivial, Service de prédication et enseignement, Service d'évangélisation, Diaconat, etc.). **Chaque département intègre sa feuille de route et son programme annuel découpé en 4 trimestres.**
- **Programmes & Cultes** : Horaires détaillés des cultes dominicaux, études bibliques du mercredi et nuits de prière du vendredi.
- **Événements & Campagnes** : Suivi des grands rendez-vous (notamment la Campagne d'Évangélisation du 18 au 22 Novembre à Ngangué).
- **Prédications & Multimédia** : Archives audio/vidéo avec filtres par prédicateur, thème et plateforme.
- **Témoignages & Actions de grâce** : Mur d'édification communautaire.
- **Dons Publics** : **Accessible à 100% sans aucune connexion requise.** Formulaire de soutien aux orphelins, évangélisation, dîmes et offrandes avec reçu d'intention et références de versement (Mobile Money, Virement, Dépôt).
- **Localisation & Contact** : Coordonnées du sanctuaire à New Bell Ngangué et formulaire de contact direct.

### 2. L'Application Privée de Gestion (Accès Sécurisé par Rôle)
- **Espace Membre** : Profil du fidèle, historique de présence, mes groupes affiliés, soumission de requêtes de prière (avec notes vocales), annonces ciblées.
- **Espace Leader de Groupe** : Tableau de bord du département, validation ou refus des demandes d'adhésion des membres, diffusion de messages aux fidèles du département.
- **Espace Pastoral (Pasteur & Pasteur Principal)** : Vision spirituelle globale, programmes d'intercession, préparation des cultes.
  - **Règle absolue de confidentialité** : Les requêtes marquées `CONFIDENTIEL` (Secret Pastoral) sont **strictement réservées au Pasteur Principal** et sont invisibles pour tout autre rôle (membres, leaders et administrateurs).
- **Espace ERP / Back-Office (Administrateur)** : Module centralisé complet avec tableaux de bord, gestion des effectifs de fidèles, départements, annonces globales, suivi des dons, rapports statistiques et paramètres système.

### 3. La Couche de Données et Abstraction API
- Les données dynamiques ne sont **pas codées en dur** dans les vues.
- Le service `src/services/churchApi.ts` encapsule toutes les opérations CRUD.
- En local, les données sont stockées et synchronisées dans `localStorage` avec un jeu de données initial riche (`src/data/mockData.ts`).
- Lorsqu'une API distante ou une base de données (PostgreSQL, Supabase, Firebase) est configurée via `VITE_API_URL`, la bascule s'effectue sans impacter les composants.

---

## 👥 Rôles & Contrôle d'Accès (RBAC)

Cinq rôles clairement définis sont intégrés avec des comptes de démonstration prêts à l'emploi :

| Rôle | Identifiant de test | Mot de passe | Espace accessible | Droits spécifiques |
| :--- | :--- | :--- | :--- | :--- |
| **Membre** | `membre@cpcn.test` | `123456` | Portail Membre | Profil, ses requêtes de prière, annonces publiques & de groupe |
| **Leader de groupe** | `leader@cpcn.test` | `123456` | Portail Leader | Gestion des membres du groupe (ex: Jeunesse), validation des demandes |
| **Pasteur** | `andre.kone@cpcn-ngangue.org` | `123456` | Portail Pastoral | Suivi pastoral, prédications, prières communautaires & d'intercession |
| **Pasteur principal** | `pasteur.didier@cpcn-ngangue.org` (ou `pasteur@cpcn.test`) | `123456` | Portail Pastoral | **Accès exclusif aux requêtes sous Secret Pastoral (CONFIDENTIEL)** |
| **Administrateur** | `admin@cpcn.test` | `123456` | ERP Central | Administration complète des modules, effectifs, finances et rapports |

---

## 📁 Structure Complète des Dossiers et Fichiers

```text
cpcn-connect/
├── index.html                   # Point d'entrée HTML avec métadonnées et typographies
├── package.json                 # Dépendances (React 19, Vite, Tailwind v4, Lucide, Motion)
├── tsconfig.json                # Configuration TypeScript
├── vite.config.ts               # Configuration du bundler Vite
├── vercel.json                  # Règles de routage SPA et cache pour Vercel
├── .env.example                 # Modèle des variables d'environnement
├── .gitignore                   # Fichiers exclus de Git (node_modules, dist, .env)
├── metadata.json                # Métadonnées de l'application
├── README.md                    # Documentation complète du projet
├── public/                      # Fichiers statiques servis directement
│   ├── favicon.svg              # Favicon avec la croix et la bannière
│   └── robots.txt               # Règles d'indexation SEO
└── src/
    ├── main.tsx                 # Montage de l'application React
    ├── App.tsx                  # Routage principal unifié (Public, Portails, ERP)
    ├── index.css                # Styles globaux avec directive @import "tailwindcss"
    ├── types.ts                 # Interfaces TypeScript globales (Groupes, Membres, Prières, etc.)
    ├── services/
    │   └── churchApi.ts         # Couche d'abstraction API (CRUD programmes, dons, prières, etc.)
    ├── context/
    │   └── ChurchContext.tsx    # État global réactif, authentification RBAC, persistance
    ├── data/
    │   └── mockData.ts          # Données initiales réalistes (Sanctuaire de Ngangué, Douala)
    ├── pages/                   # Entrées modulaires des pages
    │   ├── index.ts             # Barrel export des pages publiques et privées
    │   └── public/              # Wrappers des pages publiques
    │       ├── HomePage.tsx
    │       ├── GroupsPage.tsx
    │       └── DonationsPage.tsx
    └── components/              # Composants découpés par domaine
        ├── common/
        │   └── ChurchLogo.tsx   # Logo emblème officiel de la bannière
        ├── layout/
        │   ├── PublicHeader.tsx # En-tête public responsive avec navigation et connexion
        │   ├── PublicFooter.tsx # Pied de page avec horaires, adresse et réseaux
        │   ├── DemoBar.tsx      # Sélecteur de profil et rôle pour tests rapides
        │   └── ToastContainer.tsx # Notifications d'action toast
        ├── public/              # Composants du site vitrine public
        │   ├── HomeView.tsx
        │   ├── AboutView.tsx
        │   ├── VisionMissionView.tsx
        │   ├── LeadershipView.tsx
        │   ├── GroupsPublicView.tsx     # 7 départements avec accordéon du programme annuel
        │   ├── GroupDetailView.tsx      # Page détaillée du département avec feuille de route
        │   ├── ProgramsPublicView.tsx   # Grille des cultes et réunions
        │   ├── EventsPublicView.tsx     # Campagne d'évangélisation et événements
        │   ├── SermonsPublicView.tsx    # Médiathèque vidéo/audio
        │   ├── TestimoniesPublicView.tsx
        │   ├── ThanksgivingsPublicView.tsx
        │   ├── DonationsPublicView.tsx  # Formulaire de don sans connexion requise
        │   ├── LocationPublicView.tsx   # Carte et repères à New Bell Ngangué
        │   ├── ContactPublicView.tsx
        │   └── LoginPage.tsx            # Authentification sécurisée multi-rôles
        ├── member/              # Espace privé Membre
        │   ├── MemberLayout.tsx
        │   ├── MemberDashboard.tsx
        │   ├── MemberPrayers.tsx        # Dépôt de prières et notes vocales
        │   ├── MemberGroups.tsx
        │   ├── MemberPrograms.tsx
        │   ├── MemberEvents.tsx
        │   ├── MemberSermons.tsx
        │   ├── MemberAnnouncements.tsx
        │   ├── MemberNotifications.tsx
        │   └── MemberProfile.tsx
        ├── leader/              # Espace privé Leader de Groupe
        │   └── LeaderLayout.tsx         # Gestion des membres et demandes d'adhésion
        ├── pastoral/            # Espace privé Pastoral
        │   └── PastoralLayout.tsx       # Gestion des cultes et Secret Pastoral exclusif
        └── erp/                 # ERP Centralisé (Administrateur)
            ├── ErpLayout.tsx
            ├── DashboardView.tsx
            ├── MembersModule.tsx
            ├── GroupsModule.tsx
            ├── ProgramsModule.tsx
            ├── EventsModule.tsx
            ├── AnnouncementsModule.tsx
            ├── NotificationsModule.tsx
            ├── PrayerRequestsModule.tsx
            ├── MediaModule.tsx
            ├── DonationsModule.tsx
            ├── ReportsModule.tsx
            └── SettingsModule.tsx
```

---

## 🚀 Guide de Démarrage en Local

Suivez ces étapes pour installer et exécuter l'application sur votre machine locale :

### 1. Téléchargement et Décompression
1. Téléchargez le projet (format ZIP).
2. Décompressez l'archive dans un dossier de votre choix (ex: `cpcn-connect`).
3. Ouvrez le dossier avec votre éditeur de code (**VS Code** recommandé) :
   ```bash
   code cpcn-connect
   ```

### 2. Prérequis
- **Node.js** version 18 ou supérieure installée ([Télécharger Node.js](https://nodejs.org/)).
- **npm** (inclus avec Node.js).

### 3. Installation des Dépendances
Dans le terminal à la racine du projet, exécutez :
```bash
npm install
```

### 4. Configuration Locale
Copiez le fichier d'exemple des variables d'environnement :
```bash
cp .env.example .env
```
*(Pour une exécution locale de démonstration, aucune variable secrète n'est obligatoire)*.

### 5. Lancement du Serveur de Développement
Lancez le serveur Vite :
```bash
npm run dev
```
Ouvrez ensuite votre navigateur à l'adresse indiquée (généralement `http://localhost:3000` ou `http://localhost:5173`).

---

## 🛠️ Commandes du Projet

| Commande | Description |
| :--- | :--- |
| `npm run dev` | Démarre le serveur local de développement Vite |
| `npm run build` | Compile l'application TypeScript et génère le bundle de production dans `dist/` |
| `npm run preview` | Prévisualise localement le build de production généré dans `dist/` |
| `npm run lint` | Vérifie les types TypeScript (`tsc --noEmit`) sans générer de fichiers |
| `npm run clean` | Supprime le dossier `dist/` pour une recompilation propre |

---

## ⚙️ Variables d'Environnement

Le fichier `.env.example` documente les clés configurables :

```env
# URL d'une API backend distante (ex: https://api.cpcn-ngangue.org)
# Laisser vide pour utiliser le stockage persistant LocalStorage
VITE_API_URL=

# Nom officiel de la communauté
VITE_CHURCH_NAME="Communauté pour Christ — CPC Connect"

# Environnement
VITE_APP_ENV="development"

# Clé API Google Gemini (uniquement pour assistance IA pastorale côté serveur)
GEMINI_API_KEY=""

# URL publique de l'application
APP_URL=""
```

---

## 🌐 Déploiement sur GitHub & Vercel

### Étape A : Pousser le Projet sur GitHub

1. Créez un nouveau dépôt vide sur votre compte [GitHub](https://github.com/new) (ex: `cpc-connect`).
2. Dans le terminal de votre projet local, initialisez le dépôt Git et poussez votre code :
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit CPC Connect complet"
   git branch -M main
   git remote add origin https://github.com/<votre-nom-utilisateur>/cpc-connect.git
   git push -u origin main
   ```

### Étape B : Connecter GitHub à Vercel

1. Connectez-vous sur [Vercel](https://vercel.com) avec votre compte GitHub.
2. Cliquez sur **"Add New..."** > **"Project"**.
3. Importez votre dépôt `cpc-connect`.
4. Vercel détecte automatiquement la configuration **Vite** :
   - **Framework Preset** : `Vite`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
5. Le fichier `vercel.json` inclus à la racine configure automatiquement la réécriture d'URL pour que les routes SPA fonctionnent sans erreur 404 lors des rechargements de page :
   ```json
   {
     "framework": "vite",
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
6. Cliquez sur **Deploy**. Votre site est en ligne en moins de deux minutes avec certificat SSL automatique !

---

## 🏗️ Architecture : Frontend SPA ou Full-Stack ?

> **Le projet généré est un Frontend SPA (Single Page Application) autonome, ultra-performant et prêt pour la production.**

- **Moteur technique** : React 19 + TypeScript + Vite + Tailwind CSS v4.
- **Avantages** :
  - Déploiement instantané sur tout hébergeur statique moderne (**Vercel**, Netlify, Cloudflare Pages, GitHub Pages, Firebase Hosting, AWS S3).
  - Temps de chargement quasi-instantané, navigation sans rechargement de page et animations fluides.
  - Zéro coût d'infrastructure serveur pour le site vitrine et la démonstration.
  - Sauvegarde locale automatique (`localStorage`) qui conserve les inscriptions, requêtes de prière et dons enregistrés lors de votre session.

---

## 🔌 Raccordement à une Base de Données / API

Pour connecter cette application à une véritable base de données de production :
1. Créez votre backend (ex: Node.js/Express, Supabase, PostgreSQL via Prisma, ou Firebase).
2. Renseignez la variable d'environnement sur Vercel :
   ```env
   VITE_API_URL=https://votre-backend-api.com
   ```
3. Le fichier `src/services/churchApi.ts` est déjà structuré avec les méthodes correspondantes (`programsApi`, `eventsApi`, `groupsApi`, `prayersApi`, `donationsApi`, `authApi`) pour basculer automatiquement des données locales vers vos endpoints REST ou GraphQL.

---

*Développé avec excellence pour l'Église CPC Connect — Sanctuaire de New Bell Ngangué, Douala.*
