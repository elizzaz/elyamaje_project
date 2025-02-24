# Application de Gestion de Produits

Une application full-stack de gestion de produits avec une API RESTful robuste et une interface utilisateur moderne.

## 🚀 Fonctionnalités

### Backend

- CRUD complet pour les produits
- Validation des données avec Zod
- Gestion des erreurs centralisée
- Logging des opérations
- Gestion des prix en centimes (stockage) avec conversion en dollars (API)
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
- Next.js 14
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
git clone <url-du-repo>
cd <nom-du-projet>
```

### 3. Installation des dépendances:

```bash
pnpm install-all
```

### 4. Configurer la base de données:

```bash
cd back
touch .env
```

Ajouter l'url postgres dans le fichier .env:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/db_name
PORT=3000
```

Puis lancer la commande pour initialiser la base de données:

```bash
pnpm init-db
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

La collection postman pour les endpoints est disponible dans le fichier `postman.collection.json`.

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
└── package.json # Scripts globaux
└── README.md
```



## 💡 Axes d'améliorations possibles

- Ajout de tests unitaires
- Messages d'erreurs par champs dans les formulaires
- Ajout d'un système d'authentification
- ...
