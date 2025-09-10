# Portfolio 3D & IA

Portfolio moderne présentant mes créations en modélisation 3D (Blender & Fusion 360) et mes visuels générés par intelligence artificielle.

## 🎯 Fonctionnalités

- **Visionneuses interactives** : Images, modèles 3D et vidéos avec contrôles avancés
- **Design responsive** : Optimisé pour tous les appareils
- **SEO optimisé** : Métadonnées complètes pour un bon référencement
- **Animations fluides** : Transitions et micro-interactions modernes
- **Filtres dynamiques** : Tri par logiciel et type de création
- **Challenge impression 3D** : Mise en avant des pièces imprimables

## 🛠️ Technologies utilisées

- **React 18** avec Vite
- **Tailwind CSS** pour le styling
- **Shadcn/UI** pour les composants
- **Lucide React** pour les icônes
- **Framer Motion** pour les animations

## 🚀 Installation et développement

### Prérequis
- Node.js 18+ 
- pnpm (recommandé) ou npm

### Installation
```bash
# Cloner le repository
git clone https://github.com/votre-username/portfolio-3d-ia.git
cd portfolio-3d-ia

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 📁 Structure du projet

```
src/
├── components/           # Composants React
│   ├── ui/              # Composants UI de base (shadcn)
│   ├── Navigation.jsx   # Navigation principale
│   ├── HeroSection.jsx  # Section d'accueil
│   ├── AboutSection.jsx # Section à propos
│   ├── ModelingSection.jsx # Portfolio 3D
│   ├── AIArtSection.jsx # Portfolio IA
│   ├── ServicesSection.jsx # Services proposés
│   ├── ContactSection.jsx # Formulaire de contact
│   ├── Footer.jsx       # Pied de page
│   ├── ImageViewer.jsx  # Visionneuse d'images
│   ├── Model3DViewer.jsx # Visionneuse 3D
│   └── VideoViewer.jsx  # Visionneuse vidéo
├── assets/              # Assets statiques
├── App.jsx             # Composant principal
├── App.css             # Styles personnalisés
└── main.jsx            # Point d'entrée
```

## 🎨 Ajout de nouvelles créations

### Modèles 3D

1. Ajouter les images dans `public/images/3d/`
2. Ajouter les modèles 3D dans `public/models/`
3. Ajouter les vidéos dans `public/videos/`
4. Mettre à jour le tableau `projects` dans `ModelingSection.jsx`

Exemple d'ajout :
```javascript
{
  id: 4,
  title: "Nouveau Modèle",
  category: "blender", // ou "fusion"
  software: "Blender",
  description: "Description du modèle",
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
    printable: true, // true si imprimable en 3D
    downloadUrl: "/models/nouveau-modele.blend"
  },
  video: { // Optionnel
    title: "Animation",
    url: "/videos/nouveau-modele-animation.mp4",
    thumbnail: "/images/3d/nouveau-modele-video-thumb.jpg",
    description: "Description de la vidéo",
    duration: "1:30",
    software: "Blender"
  },
  tags: ["Tag1", "Tag2"],
  year: "2024",
  printable: true
}
```

### Visuels IA

1. Ajouter les images dans `public/images/ai/`
2. Mettre à jour le tableau `artworks` dans `AIArtSection.jsx`

Exemple d'ajout :
```javascript
{
  id: 7,
  title: "Nouveau Visuel IA",
  category: "portraits", // portraits, landscapes, concepts, creatures, abstract
  style: "Style artistique",
  prompt: "Prompt utilisé pour générer l'image",
  images: [
    {
      url: "/images/ai/nouveau-visuel.jpg",
      thumbnail: "/images/ai/nouveau-visuel-thumb.jpg",
      title: "Nouveau Visuel IA",
      description: "Description du visuel",
      software: "Midjourney", // Midjourney, DALL-E, Stable Diffusion
      year: "2024"
    }
  ],
  likes: 0,
  tool: "Midjourney",
  year: "2024"
}
```

## 🚀 Déploiement

### Build de production
```bash
pnpm run build
```

### Déploiement sur GitHub Pages
1. Créer un repository sur GitHub
2. Pousser le code :
```bash
git add .
git commit -m "Ajout de nouvelles créations"
git push origin main
```

3. Configurer GitHub Pages dans les paramètres du repository
4. Le site sera accessible sur `https://votre-username.github.io/portfolio-3d-ia`

### Déploiement sur Netlify/Vercel
1. Connecter le repository GitHub
2. Configurer la commande de build : `pnpm run build`
3. Dossier de publication : `dist`

## 📝 Personnalisation

### Couleurs et thème
Modifier les variables CSS dans `src/App.css` :
```css
:root {
  --primary: /* Couleur principale */
  --secondary: /* Couleur secondaire */
  --accent: /* Couleur d'accent */
}
```

### Métadonnées SEO
Mettre à jour `index.html` :
- Titre de la page
- Description
- Mots-clés
- URLs Open Graph et Twitter

### Informations de contact
Modifier `ContactSection.jsx` :
- Email
- Téléphone
- Réseaux sociaux
- Disponibilité

## 🔧 Maintenance

### Mise à jour régulière
1. Ajouter de nouvelles créations
2. Mettre à jour les informations de contact
3. Optimiser les images (WebP recommandé)
4. Vérifier les liens et téléchargements

### Performance
- Optimiser les images (compression, formats modernes)
- Utiliser le lazy loading pour les médias
- Minifier les assets en production

## 📱 Responsive Design

Le site est optimisé pour :
- **Mobile** : 320px - 768px
- **Tablette** : 768px - 1024px  
- **Desktop** : 1024px+
- **Large Desktop** : 1440px+

## 🎯 SEO et Accessibilité

- Métadonnées complètes
- Structure sémantique HTML5
- Alt text pour toutes les images
- Navigation au clavier
- Contrastes respectés (WCAG 2.1)
- Sitemap automatique

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les suggestions et améliorations sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Challenge personnel** : Je n'imprime en 3D que les pièces que j'ai moi-même modélisées ! 🎯

