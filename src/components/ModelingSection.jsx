import { useState } from 'react'
import { Filter, ExternalLink, Play, Download, Eye, Box, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ImageViewer from './ImageViewer'
import Model3DViewer from './Model3DViewer'
import VideoViewer from './VideoViewer'

const ModelingSection = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [modelViewerOpen, setModelViewerOpen] = useState(false)
  const [videoViewerOpen, setVideoViewerOpen] = useState(false)

  const projects = [
    // ... (ton tableau tel quel)
  ]

  const filters = [
    { id: 'all', label: 'Tous les projets', count: projects.length },
    { id: 'blender', label: 'Blender', count: projects.filter(p => p.category === 'blender').length },
    { id: 'fusion', label: 'Fusion 360', count: projects.filter(p => p.category === 'fusion').length },
    { id: 'printable', label: 'Imprimables 3D', count: projects.filter(p => p.printable).length }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'printable'
    ? projects.filter(project => project.printable)
    : projects.filter(project => project.category === activeFilter)

  const openImageViewer = (project, imageIndex = 0) => {
    setSelectedImages(project.images)
    setImageViewerOpen(true)
  }

  const openModelViewer = (project) => {
    setSelectedModel(project.model3D)
    setModelViewerOpen(true)
  }

  const openVideoViewer = (project) => {
    setSelectedVideo(project.video)
    setVideoViewerOpen(true)
  }

  return (
    <section id="modeling" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Modélisation 3D
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes créations 3D réalisées avec Blender et Fusion 360, 
            alliant créativité artistique et précision technique. Challenge personnel : 
            je n'imprime que les pièces que j'ai moi-même modélisées !
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className="flex items-center space-x-2"
            >
              <Filter size={16} />
              <span>{filter.label}</span>
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs">
                {filter.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image principale */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🎨</div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.category === 'blender' 
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {project.software}
                  </span>
                  {project.printable && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Imprimable 3D
                    </span>
                  )}
                </div>

                {/* Actions overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-10 w-10 p-0"
                      onClick={() => openImageViewer(project)}
                      title="Voir les images"
                    >
                      <Eye size={16} />
                    </Button>
                    {project.model3D && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-10 w-10 p-0"
                        onClick={() => openModelViewer(project)}
                        title="Voir le modèle 3D"
                      >
                        <Box size={16} />
                      </Button>
                    )}
                    {project.video && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-10 w-10 p-0"
                        onClick={() => openVideoViewer(project)}
                        title="Voir la vidéo"
                      >
                        <Video size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => openImageViewer(project)}
                  >
                    <Eye size={14} className="mr-1" />
                    Voir
                  </Button>
                  {project.model3D?.downloadUrl && (
                    <Button size="sm" variant="outline">
                      <Download size={14} />
                    </Button>
                  )}
                </div>

                {/* Indicateurs de contenu */}
                <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Eye size={12} />
                    <span>{project.images.length} image{project.images.length > 1 ? 's' : ''}</span>
                  </div>
                  {project.model3D && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Box size={12} />
                      <span>Modèle 3D</span>
                    </div>
                  )}
                  {project.video && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Video size={12} />
                      <span>Vidéo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Intéressé par mes créations 3D ?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Je peux créer des modèles 3D personnalisés pour vos projets, 
              que ce soit pour l'architecture, l'industrie ou l'art numérique. 
              Spécialité : pièces optimisées pour l'impression 3D !
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Discutons de votre projet
            </Button>
          </div>
        </div>
      </div>

      {/* Visionneuses */}
      <ImageViewer
        images={selectedImages}
        isOpen={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
      />
      
      <Model3DViewer
        model={selectedModel}
        isOpen={modelViewerOpen}
        onClose={() => setModelViewerOpen(false)}
      />
      
      <VideoViewer
        video={selectedVideo}
        isOpen={videoViewerOpen}
        onClose={() => setVideoViewerOpen(false)}
      />
    </section>
  )
}

export default ModelingSection
