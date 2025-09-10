import { useState } from 'react'
import { Sparkles, Eye, Heart, Share2, Zap, Palette, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImageViewer from './ImageViewer'

const AIArtSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewerOpen, setImageViewerOpen] = useState(false)

  const artworks = [
    {
      id: 1,
      title: "Portrait Cyberpunk",
      category: "portraits",
      style: "Cyberpunk",
      prompt: "Portrait futuriste avec éléments néon et technologiques",
      images: [
        {
          url: "/api/placeholder/800/1200",
          thumbnail: "/api/placeholder/400/600",
          title: "Portrait Cyberpunk",
          description: "Portrait futuriste avec éléments néon et technologiques",
          software: "Midjourney",
          year: "2024"
        }
      ],
      likes: 127,
      tool: "Midjourney",
      year: "2024"
    },
    {
      id: 2,
      title: "Paysage Alien",
      category: "landscapes",
      style: "Sci-Fi",
      prompt: "Planète extraterrestre avec végétation bioluminescente",
      images: [
        {
          url: "/api/placeholder/1200/800",
          thumbnail: "/api/placeholder/600/400",
          title: "Paysage Alien",
          description: "Planète extraterrestre avec végétation bioluminescente",
          software: "DALL-E",
          year: "2024"
        }
      ],
      likes: 89,
      tool: "DALL-E",
      year: "2024"
    },
    {
      id: 3,
      title: "Architecture Organique",
      category: "concepts",
      style: "Architectural",
      prompt: "Bâtiment aux formes organiques inspiré de la nature",
      images: [
        {
          url: "/api/placeholder/1000/1400",
          thumbnail: "/api/placeholder/500/700",
          title: "Architecture Organique",
          description: "Bâtiment aux formes organiques inspiré de la nature",
          software: "Stable Diffusion",
          year: "2023"
        }
      ],
      likes: 156,
      tool: "Stable Diffusion",
      year: "2023"
    },
    {
      id: 4,
      title: "Créature Fantastique",
      category: "creatures",
      style: "Fantasy",
      prompt: "Dragon cristallin dans un environnement magique",
      images: [
        {
          url: "/api/placeholder/1200/1000",
          thumbnail: "/api/placeholder/600/500",
          title: "Créature Fantastique",
          description: "Dragon cristallin dans un environnement magique",
          software: "Midjourney",
          year: "2024"
        }
      ],
      likes: 203,
      tool: "Midjourney",
      year: "2024"
    },
    {
      id: 5,
      title: "Art Abstrait",
      category: "abstract",
      style: "Abstrait",
      prompt: "Composition abstraite avec formes géométriques fluides",
      images: [
        {
          url: "/api/placeholder/1000/1000",
          thumbnail: "/api/placeholder/500/500",
          title: "Art Abstrait",
          description: "Composition abstraite avec formes géométriques fluides",
          software: "DALL-E",
          year: "2023"
        }
      ],
      likes: 74,
      tool: "DALL-E",
      year: "2023"
    },
    {
      id: 6,
      title: "Portrait Artistique",
      category: "portraits",
      style: "Artistique",
      prompt: "Portrait expressif dans le style des maîtres classiques",
      images: [
        {
          url: "/api/placeholder/800/1200",
          thumbnail: "/api/placeholder/400/600",
          title: "Portrait Artistique",
          description: "Portrait expressif dans le style des maîtres classiques",
          software: "Stable Diffusion",
          year: "2024"
        }
      ],
      likes: 142,
      tool: "Stable Diffusion",
      year: "2024"
    }
  ]

  const categories = [
    { id: 'all', label: 'Toutes les créations', icon: Sparkles },
    { id: 'portraits', label: 'Portraits', icon: Camera },
    { id: 'landscapes', label: 'Paysages', icon: Eye },
    { id: 'concepts', label: 'Concepts', icon: Zap },
    { id: 'creatures', label: 'Créatures', icon: Heart },
    { id: 'abstract', label: 'Abstrait', icon: Palette }
  ]

  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory)

  const openImageViewer = (artwork, imageIndex = 0) => {
    setSelectedImages(artwork.images)
    setImageViewerOpen(true)
  }

  const tools = [
    { name: "Midjourney", color: "bg-purple-500", count: artworks.filter(a => a.tool === "Midjourney").length },
    { name: "DALL-E", color: "bg-green-500", count: artworks.filter(a => a.tool === "DALL-E").length },
    { name: "Stable Diffusion", color: "bg-blue-500", count: artworks.filter(a => a.tool === "Stable Diffusion").length }
  ]

  return (
    <section id="ai-art" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Visuels IA
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorez ma galerie de créations artistiques générées par intelligence artificielle, 
            où technologie et créativité se rencontrent pour donner vie à l'imaginaire
          </p>
        </div>

        {/* Statistiques des outils */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => (
            <div key={index} className="bg-card rounded-lg p-6 text-center">
              <div className={`w-12 h-12 ${tool.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <Sparkles className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{tool.name}</h3>
              <p className="text-2xl font-bold text-primary">{tool.count}</p>
              <p className="text-sm text-muted-foreground">créations</p>
            </div>
          ))}
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon size={16} />
                <span>{category.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Galerie en mosaïque */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredArtworks.map((artwork) => (
            <div 
              key={artwork.id}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => openImageViewer(artwork)}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 aspect-[4/5]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">🎨</div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Overlay avec actions */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart size={14} />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Badge outil */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      {artwork.tool}
                    </span>
                  </div>
                </div>

                {/* Informations */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Style: {artwork.style}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {artwork.prompt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Heart size={12} />
                      <span className="text-xs">{artwork.likes}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {artwork.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section processus créatif */}
        <div className="mt-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Mon Processus Créatif IA
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment je transforme des idées en visuels époustouflants grâce à l'intelligence artificielle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Inspiration</h4>
              <p className="text-muted-foreground text-sm">
                Recherche d'inspiration et définition du concept artistique
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Palette className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Création</h4>
              <p className="text-muted-foreground text-sm">
                Génération et itération avec les outils d'IA les plus avancés
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Raffinement</h4>
              <p className="text-muted-foreground text-sm">
                Post-traitement et optimisation pour un résultat parfait
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Besoin de visuels IA personnalisés ?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Je peux créer des visuels uniques pour vos projets marketing, 
              artistiques ou commerciaux en utilisant les dernières technologies d'IA.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Créons ensemble
            </Button>
          </div>
        </div>
      </div>

      {/* Visionneuse d'images */}
      <ImageViewer
        images={selectedImages}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
      />
    </section>
  )
}

export default AIArtSection

