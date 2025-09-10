import { useState, useRef, useEffect } from 'react'
import { X, RotateCw, ZoomIn, ZoomOut, Home, Download, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Model3DViewer = ({ model, isOpen, onClose }) => {
  const viewerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'r':
          resetView()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case 'i':
          setShowInfo(!showInfo)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, showInfo])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMouse.x
    const deltaY = e.clientY - lastMouse.y

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }))

    setLastMouse({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom(prev => Math.max(0.1, Math.min(5, prev * delta)))
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1))
  }

  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setZoom(1)
  }

  const handleDownload = () => {
    if (model.downloadUrl) {
      const link = document.createElement('a')
      link.href = model.downloadUrl
      link.download = model.filename || 'model.obj'
      link.click()
    }
  }

  if (!isOpen || !model) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold">{model.title}</h3>
            <p className="text-sm text-gray-300">{model.software}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="text-white hover:bg-white/20"
            >
              <ZoomOut size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="text-white hover:bg-white/20"
            >
              <ZoomIn size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetView}
              className="text-white hover:bg-white/20"
            >
              <Home size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className="text-white hover:bg-white/20"
            >
              <Info size={20} />
            </Button>
            {model.downloadUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="text-white hover:bg-white/20"
              >
                <Download size={20} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Viewer */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Placeholder for 3D model - In a real implementation, you would use Three.js or similar */}
        <div
          ref={viewerRef}
          className="relative w-4/5 h-4/5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600 cursor-grab active:cursor-grabbing overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* 3D Model Container */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            {/* Placeholder 3D object */}
            <div className="relative">
              {model.previewImage ? (
                <img
                  src={model.previewImage}
                  alt={model.title}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))'
                  }}
                />
              ) : (
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-6xl">
                  🎨
                </div>
              )}
              
              {/* 3D effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-lg pointer-events-none"></div>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                <p>Chargement du modèle 3D...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <p className="text-red-400 mb-2">Erreur de chargement</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls info */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/50 text-white p-3 rounded text-sm">
        <div className="space-y-1">
          <p><strong>Contrôles:</strong></p>
          <p>• Glisser: Rotation</p>
          <p>• Molette: Zoom</p>
          <p>• R: Réinitialiser</p>
          <p>• I: Infos</p>
        </div>
      </div>

      {/* Model info panel */}
      {showInfo && (
        <div className="absolute top-20 right-4 z-10 bg-black/80 text-white p-4 rounded-lg max-w-sm">
          <h4 className="font-semibold mb-2">Informations du modèle</h4>
          <div className="space-y-2 text-sm">
            <p><strong>Titre:</strong> {model.title}</p>
            <p><strong>Logiciel:</strong> {model.software}</p>
            {model.description && <p><strong>Description:</strong> {model.description}</p>}
            {model.polygons && <p><strong>Polygones:</strong> {model.polygons.toLocaleString()}</p>}
            {model.vertices && <p><strong>Vertices:</strong> {model.vertices.toLocaleString()}</p>}
            {model.materials && <p><strong>Matériaux:</strong> {model.materials}</p>}
            {model.fileSize && <p><strong>Taille:</strong> {model.fileSize}</p>}
            {model.year && <p><strong>Année:</strong> {model.year}</p>}
            {model.printable && (
              <p className="text-green-400"><strong>✓ Imprimable en 3D</strong></p>
            )}
          </div>
        </div>
      )}

      {/* Zoom indicator */}
      {zoom !== 1 && (
        <div className="absolute top-20 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded text-sm">
          Zoom: {Math.round(zoom * 100)}%
        </div>
      )}
    </div>
  )
}

export default Model3DViewer

