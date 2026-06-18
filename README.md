# Journal Info Plus

Site du **Journal Info Plus** (Bellegarde, depuis 1985) — futur domaine **journal-infoplus.fr**.

Construit avec **Next.js** (le site) + **Sanity** (l'espace rédaction gratuit où la
personne écrit ses articles, ajoute une image et publie).

---

## 🧩 Comment ça marche (en 1 phrase)

La personne va sur **`/studio`**, se connecte, écrit son article avec une image,
clique sur **Publier** → l'article apparaît tout seul sur le site (~1 minute après).

---

## 🚀 Démarrer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir : http://localhost:3000

- Le site : http://localhost:3000
- L'espace rédaction (back-office) : http://localhost:3000/studio

> Tant que Sanity n'est pas configuré (étape ci-dessous), le site s'affiche mais
> sans articles. C'est normal.

---

## ⚙️ Configurer Sanity (à faire UNE seule fois, gratuit)

1. Créer un compte gratuit sur https://www.sanity.io (connexion avec Google possible).
2. Dans un terminal, à la racine du projet :

   ```bash
   npx sanity@latest init --env
   ```

   - Choisir **« Create new project »**
   - Nom du projet : `Journal Info Plus`
   - Dataset : **production** (valeur par défaut)
   - Cela remplit automatiquement le fichier `.env.local` avec vos identifiants.

   > Alternative manuelle : récupérez le **Project ID** sur https://www.sanity.io/manage
   > et collez-le dans `.env.local` à la ligne `NEXT_PUBLIC_SANITY_PROJECT_ID=`.

3. Relancer `npm run dev`. C'est prêt ✅

### Donner l'accès à la personne qui publie

Sur https://www.sanity.io/manage → votre projet → **Members** → **Invite**,
ajoutez l'adresse e-mail de la personne. Elle pourra se connecter sur `/studio`.

---

## ✍️ Publier un article (guide pour le rédacteur)

1. Aller sur `…/studio` et se connecter.
2. Cliquer sur **Articles** → **+** (nouveau).
3. Remplir :
   - **Titre**
   - **Identifiant (URL)** → cliquer sur **Generate**
   - **Image principale** (glisser-déposer une photo)
   - **Rubrique** (Sport, Local, Culture… à créer dans « Rubriques »)
   - **Chapô / résumé** (court texte d'accroche, optionnel)
   - **Date de publication**
   - **Contenu de l'article** (le texte, avec titres, listes, citations, images)
4. Cliquer sur **Publish**.

L'article apparaît sur le site automatiquement.

---

## 🎨 Personnaliser

- **Logo / nom** : le titre « Journal Info Plus » est en haut dans
  `src/components/Header.tsx`. Pour utiliser une image de logo, déposez-la dans
  `public/logo.png` (je peux l'intégrer sur demande).
- **Couleur d'accent** (rouge) : variable `--accent` dans `src/app/globals.css`.
- **Coordonnées / pied de page** : `src/components/Footer.tsx`.

---

## 🌐 Mise en ligne (plus tard)

- Hébergement gratuit recommandé : **Vercel** (https://vercel.com).
- Brancher le domaine **journal-infoplus.fr** dans Vercel (DNS chez votre registrar).
- Penser à recopier les variables de `.env.local` dans les réglages Vercel.

---

## 🗂️ Structure du projet

```
src/
  app/
    page.tsx                 → page d'accueil (Une + grille d'articles)
    article/[slug]/page.tsx  → page d'un article
    studio/[[...tool]]/      → espace rédaction Sanity (/studio)
  components/                → Header, Footer, cartes article, rendu du texte
  sanity/
    schemaTypes/             → définition des champs (article, rubrique)
    lib/                     → connexion Sanity, requêtes, images
sanity.config.ts             → configuration du Studio
```
