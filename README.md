# Application de Gestion de Produits

Une application full-stack de gestion de produits avec une API RESTful robuste et une interface utilisateur moderne.

## 🚀 Fonctionnalités

### Backend

- CRUD complet pour les produits
- Validation des données avec Zod
- Gestion des erreurs centralisée
- Logging des opérations
- Gestion des prix en centimes (stockage) avec conversion en euros (API)
- Architecture en couches

### Frontend

- Interface utilisateur moderne avec Shadcn/ui et Tailwind CSS
- Gestion d'état côté client avec React Query
- Pagination des produits
- Formulaires avec validation
- Gestion des erreurs
- Feedback utilisateur avec toasts
- Navigation fluide avec Next.js App Router

## 🛠 Technologies

### Backend

- Node.js & TypeScript
- Express.js
- PostgreSQL
- Drizzle ORM
- Zod

### Frontend

- Next.js 15
- React 19
- React Query (TanStack Query)
- Tailwind CSS
- Shadcn/ui
- TypeScript


## 📦 Installation

### 1. Prérequis

- Node.js 18+
- PostgreSQL 15+
- pnpm (recommandé) ou npm


### 2. Cloner le repository

```bash
git clone https://github.com/elizzaz/elyamaje_project.git
cd elyamaje_project
```

### 3. Installation des dépendances:

```bash
pnpm multi install
```

### 4. Configurer la base de données:

```bash
cd back
touch .env
```

Ajouter l'url postgres dans le fichier .env:

Concernant la base de données, plusieurs solutions sont possibles:
- Utiliser une base de données locale (PostgreSQL)
- Utiliser une base de données distante (Neon, Supabase, etc…) (recommandé)
- Utiliser une base de données dans un conteneur Docker (PostgreSQL)

Un fichier docker-compose.yml est disponible pour lancer une base de données PostgreSQL localement via Docker via la commande: 

```bash
docker-compose up -d
```

L'url de la base de données sera alors:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/main
PORT=3000
```


Quel que soit la solution choisie, il faut ajouter l'url de la base de données dans le fichier .env:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/db_name
PORT=3000
```

Puis lancer la commande pour initialiser la base de données:

```bash
cd back && pnpm migrate && pnpm seed
```

### 5. Configurer l'url d'api côté frontend :


```bash
cd client
touch .env
```

Ajouter l'url d'api dans le fichier .env:

```bash 
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 6. Lancer le projet en dev:

À la racine du projet lancer la commande:

```bash 
pnpm multi run dev
```

Le serveur backend sera lancé sur le port 3000 et le frontend sur le port 3001: 
•⁠  ⁠http://localhost:3000 # backend
•⁠  ⁠http://localhost:3001 # frontend

## 🚀 Scripts Disponibles

### Backend

```bash
pnpm dev # Lance le serveur de développement
pnpm build # Compile le TypeScript
pnpm start # Lance le serveur de production
pnpm migrate # Applique les migrations
```

### Frontend

```bash 
pnpm dev # Lance le serveur Next.js
pnpm build # Compile l'application
pnpm start # Lance le client
pnpm lint # Vérifie le code
```

## 📝 API Endpoints

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/products` | Liste paginée des produits |
| GET | `/products/:id` | Récupère un produit |
| POST | `/products` | Crée un produit |
| PUT | `/products/:id` | Met à jour un produit |
| DELETE | `/products/:id` | Supprime un produit |

La collection postman pour les endpoints est disponible dans le fichier `postman_collection.json`.

### Format des données attendues

#### Création/Mise à jour de Produit

```json
{
  "name": "string (2-255 caractères)",
  "description": "string (min 10 caractères, optionnel)",
  "price": "number (> 0, max 999999.99)",
  "stock": "number (>= 0)",
  "image":  "string (URL, optionnel)"
}
```


## 🏗 Structure du projet

```
├── back/ # Backend Express.js
│ ├── src/
│ │ ├── controllers/ # Contrôleurs
│ │ ├── services/ # Services
│ │ ├── validation/ # Schémas Zod
│ │ └── routes/ # Routes API
│ └── prisma/ # Schémas et migrations
└── client/ # Frontend Next.js
│ ├── src/
│ │ ├── app/ # Pages et routes
│ │ ├── components/ # Composants React
│ │ ├── hooks/ # Hooks personnalisés
│ │ └── lib/ # Utilitaires
│ └── public/ # Assets statiques
└── postman_collection.json # Collection Postman
└── docker-compose.yml # Docker Compose Optionnel pour Postgres
└── README.md # Documentation
```



## 💡 Axes d'améliorations possibles

- Ajout de tests unitaires
- Messages d'erreurs par champs dans les formulaires
- Ajout d'un système d'authentification
- Logging — utiliser un service comme posthog pour un suivi approfondi des logs
- Internationalisation (i18n) pour gérer plusieurs langues et améliorer l’accessibilité
- ...
