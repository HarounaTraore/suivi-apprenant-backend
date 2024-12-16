# API de Gestion de Suivi des Formations

## Description

Cette API permet de gérer les suivis des formations destinée à l'administration d'une structure de formation. Elle est construite avec **Express.js** et utilise **PostgreSQL** pour la gestion de la base de données via l'ORM **Prisma**.

L'API permet de gérer les apprenants, les modules de formation, les inscriptions, et les paiements.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** : (version 18.x LTS ou supérieure)
- **PostgreSQL** : (version 13.x ou supérieure)
- **Postman** (pour tester l'API)
- **Git** : Pour cloner le dépôt et gérer les versions du code.

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

### **Clonez le repository :**

```bash
git clone https://github.com/HarounaTraore/suivi-apprenant-backend.git

```

### **Accédez au dossier du projet :**

```bash
cd suivi-apprenant-backend
```

### **Installez les dépendances :**

```bash
npm install
```

## Configuration de la base de données

### 1. **Créez une base de données PostgreSQL**

- Connectez-vous au serveur PostgreSQL en utilisant la commande ci-dessous (remplacez `user_name` par votre nom d'utilisateur) :

  ```bash
  psql -U user_name
  ```

- Une fois connecté, créez votre base de données (remplacez `db_name` par le nom de votre base) :

  ```bash
  CREATE DATABASE db_name;
  ```

### 2. **Configurez le fichier `.env` :**

Renommez le fichier .env.example en .env, puis remplissez-le avec vos informations de connexion :

Exemple de fichier `.env` :

```bash
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/DATABASE_NAME"

```

### 3. **Migrations Prisma :**

Déployez les migrations pour initialiser la base de données :

```bash
npx prisma migrate deploy
```

## Utilisation

Pour démarrer l'application :

```bash
npm start
```

## Documentation et Collection Postman

Vous pouvez consulter la documentation des endpoints et tester les différents points d'accès de l'API grâce à la collection Postman fournie dans ce projet : `Student_management.postman_collection.json`. Importez ce fichier dans **[Postman](https://www.postman.com/)** pour faciliter les tests et accéder rapidement à tous les points d'accès.

## Auteur

[Harouna Traoré](https://github.com/HarounaTraore)
