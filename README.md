# API de Gestion de Produits

Une API RESTful robuste pour la gestion de produits, construite avec des technologies modernes et des pratiques de développement solides.

## 🚀 Fonctionnalités

- CRUD complet pour les produits
- Validation des données avec Zod
- Gestion des erreurs centralisée
- Logging des opérations
- Gestion des prix en centimes (stockage) avec conversion en dollars (API)
- Architecture en couches (Controllers, Services, Database)
- Typage fort avec TypeScript

## 🛠 Technologies

- **Node.js** - Environnement d'exécution
- **TypeScript** - Superset JavaScript typé
- **Express.js** - Framework web
- **PostgreSQL** - Base de données relationnelle
- **Drizzle ORM** - ORM moderne pour TypeScript
- **Zod** - Validation des données
- **cors** - Gestion des CORS

## 📦 Installation

1. **Cloner le repository**
bash
git clone [url-du-repo]
cd back

2. **Installer les dépendances**
bash
npm install

3. **Configurer l'environnement**
bash
cp .env.example .env

4. **Configurer la base de données**
bash
npm run migrate
npm run seed

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

DATABASE_URL=postgres://user:password@localhost:5432/db_name
PORT=3000

## 🚀 Scripts Disponibles

```bash
# Développement
npm run dev         # Lance le serveur de développement

# Production
npm run build      # Compile le TypeScript
npm start         # Lance le serveur de production

# Base de données
npm run migrate   # Applique les migrations
npm run generate  # Génère les migrations
npm run seed      # Peuple la base de données
```

## 📝 API Endpoints

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/products` | Liste tous les produits |
| GET | `/products/:id` | Récupère un produit spécifique |
| POST | `/products` | Crée un nouveau produit |
| PUT | `/products/:id` | Met à jour un produit |
| DELETE | `/products/:id` | Supprime un produit |

### Format des Données

#### Création de Produit (POST)
```json
{
  "name": "string (2-255 caractères)",
  "description": "string (min 10 caractères, optionnel)",
  "price": "number (> 0, max 999999.99)",
  "stock": "number (>= 0)",
  "image": "string (URL, optionnel)"
}
```

#### Réponse Produit
```json
{
  "id": "number",
  "name": "string",
  "description": "string?",
  "price": "number (en dollars)",
  "stock": "number",
  "image": "string?"
}
```

## 💡 Architecture

```
src/
├── controllers/    # Gestion des requêtes HTTP
├── services/      # Logique métier
├── db/            # Configuration et schémas DB
├── validation/    # Schémas de validation
├── utils/         # Utilitaires
└── routes/        # Définition des routes
```

## 🔐 Gestion des Prix

- Les prix sont exposés en dollars dans l'API
- Stockés en centimes dans la base de données
- Conversion automatique via les utilitaires `toCents` et `toDollars`

## ⚠️ Gestion des Erreurs

L'API utilise un système centralisé de gestion des erreurs avec des codes HTTP appropriés :

- `400` - Requête invalide
- `404` - Ressource non trouvée
- `500` - Erreur serveur

## 📊 Logging

Logging automatique des opérations importantes :
- Création de produits
- Modifications
- Erreurs
- Requêtes importantes


## 🔍 Validation

La validation des données est effectuée au niveau du service avec Zod :
- Validation des types
- Contraintes sur les champs
- Messages d'erreur personnalisés

## 📚 Bonnes Pratiques

- Architecture en couches
- Validation centralisée
- Gestion cohérente des erreurs
- Typage fort
- Logging structuré
- Conversion des prix centralisée