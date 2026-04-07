# Backlog — LibreLingo Reboot
> Stack cible : Expo (React Native) + Expo Web (PWA) | Supabase | Python Core (inchangé)
> Dépôt frontend : repo séparé à créer (`librelingo-app`)

---

## Légende

| Symbole | Sens |
|---------|------|
| `P0` | Bloquant — doit être fait avant toute autre chose |
| `P1` | Priorité haute — nécessaire pour la v1 |
| `P2` | Priorité normale — v1 mais non bloquant |
| `P3` | Post-v1 / v2 |
| `[BACKEND]` | Travail sur ce repo (Cerveau Python) |
| `[FRONTEND]` | Travail sur le nouveau repo `librelingo-app` |
| `[INFRA]` | CI/CD, déploiement, outillage |

---

## EPIC 1 — Nettoyage du repo LibreLingo `P0`

> Objectif : Ne garder dans ce repo que le Cerveau Python. Supprimer tout ce qui est Frontend ou inutile.

### Tickets

**CLEAN-01** `P0` `[BACKEND]`
Supprimer le dossier `apps/librelingo-web/` en entier
- Supprime : Next.js, React, Tailwind, Radix UI, shadcn, tout le code TypeScript Frontend
- Vérifier avant suppression qu'aucun module Python n'importe depuis ce dossier

**CLEAN-02** `P0` `[BACKEND]`
Supprimer les tests e2e liés à l'UI web
- Supprimer `e2e-tests/` (tests Playwright liés au Frontend Next.js)
- Supprimer `playwright.config.ts` à la racine

**CLEAN-03** `P0` `[BACKEND]`
Nettoyer `package.json` racine
- Retirer les scripts et dépendances liés à l'app Next.js
- Garder uniquement ce qui sert au monorepo Python (si pertinent) ou supprimer complètement

**CLEAN-04** `P0` `[BACKEND]`
Nettoyer le `Makefile` et les scripts
- Auditer `scripts/` : garder `exportYamlCourse.sh`, retirer tout ce qui référence le Frontend web
- Mettre à jour les targets du `Makefile` en cohérence

**CLEAN-05** `P1` `[BACKEND]`
Mettre à jour `README.md`
- Retirer toutes les références au Frontend Next.js
- Documenter clairement le rôle du repo : "Python toolkit — YAML parser + JSON exporter"
- Ajouter un lien vers `dev-docs/segmentation_report.md`

**CLEAN-06** `P1` `[BACKEND]`
Mettre à jour `mkdocs.yml` et `docs/`
- Retirer les pages de doc liées au Frontend
- Garder/mettre à jour la doc des packages Python

---

## EPIC 2 — Réduction de la dette technique Python `P0`

> Objectif : Stabiliser le Cerveau avant de construire dessus.

### Tickets

**DEBT-01** `P0` `[BACKEND]`
Contraindre la version Python dans l'environnement
- Ajouter un fichier `.python-version` à la racine (valeur : `3.10`)
- Documenter dans le README l'obligation d'utiliser Python 3.8–3.10 (3.11+ casse la compatibilité)

**DEBT-02** `P1` `[BACKEND]`
Ajouter un endpoint de validation de schéma en standalone
- Créer `src/librelingo_yaml_loader/validate.py` exposant `validate_course(path) -> List[ValidationError]`
- Permet de valider un cours YAML sans faire un export complet
- Utilisable comme hook pre-commit ou dans un futur store communautaire

**DEBT-03** `P1` `[BACKEND]`
Résoudre le problème des distracteurs manquants pour le type `options`
- **Contexte** : Le JSON généré pour les challenges `options` (QCM) ne contient que la bonne réponse. Les distracteurs doivent être trouvés par le Frontend parmi d'autres challenges — couplage implicite non documenté.
- **Action** : Modifier `src/librelingo_json_export/challenge_types.py` → `get_options_challenge()` pour inclure un champ `distractors: []` dans le JSON, peuplé avec N phrases aléatoires du même skill/module
- Paramètre configurable : nombre de distracteurs (défaut : 3)

**DEBT-04** `P2` `[BACKEND]`
Ajouter la normalisation Unicode dans l'export
- Dans `src/librelingo_utils/utils.py`, ajouter `normalize_answer(text: str) -> str` : `strip + lower + NFC normalization`
- Appliquer cette normalisation sur les champs `formInTargetLanguage`, `answer`, et `solutions` au moment de l'export
- Évite d'avoir à réimplémenter cette logique dans chaque Frontend

**DEBT-05** `P2` `[BACKEND]`
Documenter le contrat de l'interface JSON
- Créer `dev-docs/json_contract.md` décrivant précisément les structures `courseData.json` et `challenges/*.json`
- Inclure les types de chaque champ, les valeurs possibles pour `type`, les règles de naming des slugs
- Ce document est le contrat entre le Cerveau et n'importe quel Frontend

**DEBT-06** `P3` `[BACKEND]`
Mettre à jour la contrainte Python vers 3.12+
- Implique de migrer les `namedtuple` vers `dataclasses` ou `pydantic` pour une meilleure compatibilité
- Reporter en v2 — ne pas bloquer la v1 sur ce chantier

---

## EPIC 3 — Bootstrap du nouveau repo Frontend `P0`

> Objectif : Créer `librelingo-app` avec les fondations techniques correctes dès le départ.

### Tickets

**BOOT-01** `P0` `[FRONTEND]`
Créer le repo `librelingo-app`
- Initialiser avec `create-expo-app` en TypeScript strict
- Configurer Expo Router (file-based routing, équivalent Next.js App Router)
- Activer le support Web PWA (`expo-web`)
- Configurer `app.json` : bundleIdentifier, scheme, icônes placeholder

**BOOT-02** `P0` `[FRONTEND]`
Configurer le design system de base
- Installer React Native Reanimated + Gesture Handler (animations fluides)
- Installer React Native Skia (rendu custom pour les éléments gamifiés)
- Définir le design token system : couleurs, typographie, espacement (fichiers `theme/`)
- Pas de bibliothèque de composants tierces — tout sera custom

**BOOT-03** `P0` `[FRONTEND]`
Configurer la couche de données locale (offline-first)
- Installer et configurer `WatermelonDB` ou `expo-sqlite` pour le stockage local
- Définir le schéma de base : `Course`, `Skill`, `Challenge`, `UserProgress`, `UserStats`
- La progression utilisateur ne quitte jamais l'appareil en v1

**BOOT-04** `P0` `[FRONTEND]`
Pipeline d'ingestion des cours JSON
- Créer `scripts/ingest-course.ts` : copie les JSON générés par le Cerveau Python vers `assets/courses/`
- Créer `src/services/courseLoader.ts` : lit les JSON depuis les assets et les insère en base locale au premier lancement
- Gérer la mise à jour des cours (versioning par hash)

**BOOT-05** `P1` `[INFRA]`
Configurer GitHub Actions pour le nouveau repo
- Workflow `ci.yml` : lint + type-check + tests unitaires sur push
- Workflow `eas-build.yml` : build Android APK sur tag (`v*`) via EAS Build (free tier)
- Workflow `web-deploy.yml` : build PWA + deploy sur GitHub Pages ou Cloudflare Pages (gratuit)

**BOOT-06** `P1` `[FRONTEND]`
Configurer ESLint + Prettier + TypeScript strict
- Config ESLint adaptée Expo/React Native
- Prettier avec les mêmes règles que le repo Python (cohérence projet)
- `tsconfig.json` en strict mode

---

## EPIC 4 — Navigation & Structure de l'app `P1`

> Objectif : Implémenter le squelette de navigation avant les écrans de contenu.

### Tickets

**NAV-01** `P1` `[FRONTEND]`
Implémenter la structure de navigation principale
- Tab bar : Apprendre / Profil / Store (placeholder)
- Stack navigator pour la progression dans un cours : Module → Skill → Session d'exercices

**NAV-02** `P1` `[FRONTEND]`
Écran d'accueil — liste des cours disponibles
- Affiche les cours embarqués (depuis les assets)
- `CourseCard` : nom de la langue, progression globale, image
- Lancer un cours = naviguer vers la vue des modules

**NAV-03** `P1` `[FRONTEND]`
Écran de cours — arbre des modules et skills
- Affiche la structure Module → Skills
- État visuel par skill : verrouillé / disponible / complété
- Règle de déverrouillage v1 : séquentiel (skill N+1 déverrouillé quand skill N ≥ 1 niveau complété)

---

## EPIC 5 — Moteur d'exercices `P1`

> Objectif : Implémenter les 5 types de challenges définis par le Cerveau Python.

### Tickets

**EX-01** `P1` `[FRONTEND]`
Implémenter le moteur de session
- Charger N challenges depuis le JSON du skill sélectionné
- Ordre de présentation : trier par `priority` (0 → 1 → 2), puis shuffle au sein de chaque niveau
- Gérer l'état de session : challenge courant, score, vie restantes (v1 : 3 vies)
- Transition entre challenges avec animation

**EX-02** `P1` `[FRONTEND]`
Implémenter le validateur de réponses (service partagé)
- Créer `src/services/answerValidator.ts`
- Logique : `normalize(input) === normalize(acceptedAnswer)` pour chaque élément de `formInTargetLanguage` / `solutions`
- `normalize()` : trim + lowercase + NFC Unicode
- Exposer `validateAnswer(challenge, userInput): { correct: boolean, correctAnswer: string }`

**EX-03** `P1` `[FRONTEND]`
Challenge type `cards` (reconnaissance visuelle)
- Afficher image + mot source
- Générer les distracteurs côté Front (depuis le JSON `distractors` — cf. DEBT-03)
- Feedback animé : correct (vert + bounce) / incorrect (rouge + shake)

**EX-04** `P1` `[FRONTEND]`
Challenge type `shortInput` (saisie libre)
- Afficher image + définition source
- Input texte avec les `specialCharacters` du cours en raccourcis
- Tolérance aux fautes de frappe : Levenshtein distance ≤ 1 sur les mots courts (< 5 chars), optionnel sur les longs

**EX-05** `P1` `[FRONTEND]`
Challenge type `chips` (construction de phrase)
- Afficher la phrase source comme prompt
- Chips draggables / tappables pour construire la réponse
- Valider contre le tableau `solutions` (plusieurs ordres acceptés)
- Animation de placement des chips

**EX-06** `P1` `[FRONTEND]`
Challenge type `options` (QCM phrase)
- Utiliser le champ `distractors` (cf. DEBT-03)
- 4 options maximum, layout en grille
- Feedback immédiat sur sélection

**EX-07** `P2` `[FRONTEND]`
Challenge type `listeningExercise` (audio)
- Conditionnel : uniquement si le cours a `Audio.Enabled: True`
- Mapper le hash `audio` vers un fichier `.mp3` embarqué ou URL CDN
- Bouton de réécoute, input identique à `shortInput`

---

## EPIC 6 — Gamification `P1`

> Objectif : Boucle de rétroaction satisfaisante sans SRS complexe.

### Tickets

**GAME-01** `P1` `[FRONTEND]`
Système de niveaux par skill
- Reprendre le calcul du Cerveau : `levels = 1 + (nwords/7) + (nphrases/5)`
- Chaque niveau = une session complète du skill
- Stocker `{ skillId, levelCompleted, xpEarned }` en base locale

**GAME-02** `P1` `[FRONTEND]`
Écran de fin de session (résultats)
- Score / précision / temps
- Animation de célébration (Skia ou Lottie)
- XP gagnés avec animation de compteur
- Bouton : Continuer / Revoir les erreurs

**GAME-03** `P1` `[FRONTEND]`
Barre de progression en session
- Barre de progression en haut (N challenges restants)
- Indicateur de vies (coeurs)
- Feedback sonore léger (optionnel, configurable)

**GAME-04** `P2` `[FRONTEND]`
Système de streak quotidien
- Enregistrer `lastPracticeDate` en local
- Afficher le streak sur l'écran de profil
- Notification locale de rappel si streak à risque (expo-notifications)

**GAME-05** `P2` `[FRONTEND]`
Écran de profil (stats locales)
- XP total, streak, nombre de skills complétés
- Graphique simple de progression hebdomadaire
- Entièrement offline en v1

**GAME-06** `P3` `[FRONTEND]`
Algorithme SRS (Spaced Repetition)
- Remplacer le système de niveaux simples par SM-2 ou FSRS
- Reporter en v2

---

## EPIC 7 — Auth & Architecture de synchronisation `P2`

> Objectif : Préparer l'architecture no-trust pour une sync future sans la déployer en v1.

### Tickets

**AUTH-01** `P2` `[INFRA]`
Setup Supabase (projet)
- Créer le projet Supabase (free tier)
- Définir les tables : `users`, `user_progress`, `user_stats`
- Row Level Security : chaque utilisateur ne peut lire/écrire que ses propres données
- Garder inactif en v1 — juste avoir la structure prête

**AUTH-02** `P2` `[FRONTEND]`
Implémenter l'auth (optionnelle en v1)
- Login email/magic link via Supabase Auth
- L'app fonctionne à 100% sans compte (offline-first)
- Créer un compte = "déverrouille" la sync et le leaderboard futur

**AUTH-03** `P2` `[FRONTEND]`
Couche de synchronisation no-trust
- Créer `src/services/syncService.ts`
- Stratégie : "local wins" par défaut, serveur comme backup
- Sync déclenchée manuellement ou au login (pas de sync temps réel en v1)
- Les données locales ne sont jamais écrasées sans confirmation utilisateur

---

## EPIC 8 — Store communautaire v1 `P2`

> Objectif : Afficher les cours disponibles et permettre l'ajout rapide d'une nouvelle langue.

### Tickets

**STORE-01** `P2` `[BACKEND]`
Créer un registre de cours publics
- Définir `courses/registry.json` : liste des cours officiels avec metadata (nom, langues, version, URL de téléchargement des JSON)
- Hébergé sur GitHub (raw.githubusercontent.com) — zéro infrastructure serveur

**STORE-02** `P2` `[FRONTEND]`
Écran Store — explorer les cours disponibles
- Fetcher `registry.json` au démarrage (avec cache local)
- Afficher les cours disponibles avec note moyenne (upvotes/downvotes)
- Bouton "Installer" : télécharge le JSON du cours et l'insère en base locale

**STORE-03** `P2` `[FRONTEND]`
Système de notation communautaire
- Upvote / downvote par cours (stocké en Supabase, anonyme possible)
- Afficher le score net sur chaque carte de cours

**STORE-04** `P3` `[BACKEND]`
Endpoint d'upload de cours YAML
- Créer une API FastAPI minimale
- `POST /courses/validate` : valide un YAML uploadé (librelingo_yaml_loader)
- `POST /courses/publish` : valide + exporte + publie dans le registre
- Pipeline de CI automatique : commit YAML → export JSON → update registry

---

## Récapitulatif par phase

### Phase 0 — Fondations (avant toute ligne de code Frontend)
`CLEAN-01` → `CLEAN-04` | `DEBT-01` → `DEBT-03` | `BOOT-01` → `BOOT-04`

### Phase 1 — MVP jouable
`NAV-01` → `NAV-03` | `EX-01` → `EX-06` | `GAME-01` → `GAME-03` | `BOOT-05` → `BOOT-06`

### Phase 2 — App complète v1
`GAME-04` → `GAME-05` | `AUTH-01` → `AUTH-03` | `STORE-01` → `STORE-03` | `DEBT-04` → `DEBT-05`

### Phase 3 — v2
`DEBT-06` | `GAME-06` | `EX-07` | `STORE-04`
