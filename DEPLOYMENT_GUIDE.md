# Guide de Déploiement - Portfolio 3D & IA

Ce guide vous explique comment déployer votre portfolio sur GitHub Pages et le maintenir à jour avec vos nouvelles créations.

## 🚀 Déploiement Initial sur GitHub

### 1. Créer un repository GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur "New repository" (Nouveau dépôt)
3. Nommez votre repository : `portfolio-3d-ia` (ou le nom de votre choix)
4. Cochez "Public" pour un déploiement gratuit
5. Ne cochez PAS "Initialize with README" (nous avons déjà les fichiers)
6. Cliquez sur "Create repository"

### 2. Configurer Git localement

Ouvrez un terminal dans le dossier de votre portfolio et exécutez :

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Portfolio 3D & IA"

# Ajouter l'origine GitHub (remplacez VOTRE-USERNAME par votre nom d'utilisateur)
git remote add origin https://github.com/VOTRE-USERNAME/portfolio-3d-ia.git

# Pousser vers GitHub
git push -u origin main
```

### 3. Configurer GitHub Pages

1. Allez dans votre repository sur GitHub
2. Cliquez sur "Settings" (Paramètres)
3. Descendez jusqu'à "Pages" dans le menu de gauche
4. Dans "Source", sélectionnez "GitHub Actions"
5. GitHub va automatiquement détecter votre projet React

### 4. Créer le workflow de déploiement

Créez le fichier `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 5. Configurer Vite pour GitHub Pages

Modifiez `vite.config.js` :

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio-3d-ia/', // Remplacez par le nom de votre repository
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

## 📁 Ajouter Vos Créations

### Structure des dossiers

Organisez vos fichiers dans le dossier `public` :

```
public/
├── images/
│   ├── 3d/                 # Images de vos modèles 3D
│   │   ├── model1.jpg
│   │   ├── model1-thumb.jpg
│   │   └── ...
│   └── ai/                 # Vos créations IA
│       ├── artwork1.jpg
│       ├── artwork1-thumb.jpg
│       └── ...
├── models/                 # Fichiers 3D téléchargeables
│   ├── model1.blend
│   ├── model1.step
│   └── ...
└── videos/                 # Animations et processus
    ├── animation1.mp4
    └── ...
```

### Optimisation des images

Pour de meilleures performances :

1. **Format** : Utilisez WebP quand possible, sinon JPEG
2. **Taille** : 
   - Images principales : max 1920x1080
   - Thumbnails : 400x300
   - Portraits : 800x1200
3. **Compression** : Utilisez des outils comme TinyPNG
4. **Nommage** : Utilisez des noms descriptifs sans espaces

### Ajouter un nouveau modèle 3D

1. Ajoutez vos images dans `public/images/3d/`
2. Modifiez `src/components/ModelingSection.jsx`
3. Ajoutez votre projet dans le tableau `projects` :

```javascript
{
  id: 4, // Numéro suivant
  title: "Mon Nouveau Modèle",
  category: "blender", // ou "fusion"
  software: "Blender",
  description: "Description de votre création",
  images: [
    {
      url: "/images/3d/nouveau-modele.jpg",
      thumbnail: "/images/3d/nouveau-modele-thumb.jpg",
      title: "Vue principale",
      description: "Description de l'image"
    }
  ],
  model3D: {
    title: "Modèle 3D",
    software: "Blender",
    previewImage: "/images/3d/nouveau-modele-3d.jpg",
    description: "Description du modèle 3D",
    polygons: 25000,
    vertices: 28000,
    materials: 5,
    fileSize: "8.5 MB",
    printable: true, // true si imprimable
    downloadUrl: "/models/nouveau-modele.blend"
  },
  tags: ["Tag1", "Tag2"],
  year: "2024",
  printable: true
}
```

### Ajouter un nouveau visuel IA

1. Ajoutez vos images dans `public/images/ai/`
2. Modifiez `src/components/AIArtSection.jsx`
3. Ajoutez votre création dans le tableau `artworks`

## 🔄 Mise à Jour du Site

### Workflow de mise à jour

1. **Ajoutez vos nouvelles créations** (images, modèles, etc.)
2. **Modifiez les fichiers de composants** pour inclure les nouvelles créations
3. **Testez localement** :
   ```bash
   npm run dev
   ```
4. **Commitez et poussez** :
   ```bash
   git add .
   git commit -m "Ajout de nouvelles créations [description]"
   git push
   ```
5. **GitHub Actions** se charge automatiquement du déploiement

### Commandes Git utiles

```bash
# Voir le statut des fichiers
git status

# Ajouter des fichiers spécifiques
git add src/components/ModelingSection.jsx
git add public/images/3d/nouveau-modele.jpg

# Voir l'historique
git log --oneline

# Créer une branche pour tester
git checkout -b nouvelle-fonctionnalite
git checkout main  # Retour à main
```

## 🌐 Domaine Personnalisé (Optionnel)

### Avec GitHub Pages

1. Achetez un domaine (ex: votre-nom.com)
2. Créez un fichier `public/CNAME` avec votre domaine :
   ```
   votre-nom.com
   ```
3. Configurez les DNS chez votre registrar :
   ```
   Type: CNAME
   Name: www
   Value: votre-username.github.io
   
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

## 🔧 Dépannage

### Le site ne se met pas à jour

1. Vérifiez que GitHub Actions s'exécute sans erreur
2. Attendez 5-10 minutes pour la propagation
3. Videz le cache de votre navigateur (Ctrl+F5)

### Erreurs de build

1. Vérifiez les logs dans l'onglet "Actions" de votre repository
2. Assurez-vous que tous les chemins d'images sont corrects
3. Vérifiez la syntaxe JavaScript dans vos modifications

### Images qui ne s'affichent pas

1. Vérifiez que les chemins commencent par `/` (ex: `/images/3d/model.jpg`)
2. Assurez-vous que les fichiers sont dans le dossier `public`
3. Respectez la casse des noms de fichiers

## 📊 Analytics et SEO

### Google Analytics (Optionnel)

Ajoutez dans `index.html` avant `</head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Optimisation SEO

1. **Mettez à jour les métadonnées** dans `index.html`
2. **Ajoutez des descriptions** à vos créations
3. **Utilisez des mots-clés pertinents** dans les titres et descriptions
4. **Optimisez les images** (taille et alt text)

## 🎯 Conseils pour un Portfolio Réussi

### Contenu

- **Qualité > Quantité** : Présentez vos meilleures créations
- **Variété** : Montrez différents styles et techniques
- **Progression** : Organisez par niveau de complexité
- **Contexte** : Expliquez votre processus créatif

### Maintenance

- **Mises à jour régulières** : Ajoutez vos nouvelles créations
- **Sauvegarde** : Gardez une copie locale de tous vos fichiers
- **Versions** : Utilisez Git pour suivre l'évolution
- **Feedback** : Demandez des retours et améliorez

---

**Votre portfolio est maintenant prêt à impressionner ! 🚀**

Pour toute question, consultez la documentation GitHub ou créez une issue dans votre repository.

