
# MovieScope

MovieScope est une application web React permettant de parcourir, filtrer et consulter des informations sur une collection de films.

## Fonctionnalités
- Affichage d'une liste de films avec affichage par carte
- Recherche de films par titre
- Filtrage par genre
- Détail d'un film (description, genre, année, etc.)
- Navigation entre les pages (Accueil, Tous les films, À propos)

## Installation

1. **Cloner le dépôt**

```bash
git clone <url-du-repo>
cd moviescope
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer l'application**

```bash
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Structure du projet

```
moviescope/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Utilisation

- **Accueil** : Affiche les films en vedette et permet la recherche rapide.
- **Tous les films** : Liste complète des films avec filtres.
- **Détail d'un film** : Cliquez sur une carte pour voir les détails.
- **À propos** : Informations sur l'application.

## Dépendances principales
- React
- react-router-dom
- styled-components

## Auteur
Ce projet a été réalisé dans le cadre d'une formation Simplon.

---
N'hésitez pas à contribuer ou à signaler des bugs !
