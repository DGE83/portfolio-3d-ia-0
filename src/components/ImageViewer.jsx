import { useState, useEffect } from 'react'
import { X, ZoomIn, ZoomOut, RotateCw, Download, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ImageViewer = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)

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
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
        case 'r':
          handleRotate()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, currentIndex])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    resetTransform()
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    resetTransform()
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const resetTransform = () => {
    setZoom(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = images[currentIndex].url
    link.download = images[currentIndex].title || 'image'
    link.click()
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (!isOpen || !images.length) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="text-lg font-semibold">{currentImage.title}</h3>
            <p className="text-sm text-gray-300">
              {currentIndex + 1} / {images.length}
            </p>
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
              onClick={handleRotate}
              className="text-white hover:bg-white/20"
            >
              <RotateCw size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize2 size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-white hover:bg-white/20"
            >
              <Download size={20} />
            </Button>
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

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="lg"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 h-16 w-16"
          >
            <ChevronLeft size={32} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20 h-16 w-16"
          >
            <ChevronRight size={32} />
          </Button>
        </>
      )}

      {/* Image */}
      <div
        className="relative max-w-full max-h-full overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="max-w-none transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-4">
        <div className="text-center text-white">
          {currentImage.description && (
            <p className="text-sm text-gray-300 mb-2">{currentImage.description}</p>
          )}
          <div className="flex justify-center space-x-4 text-xs text-gray-400">
            {currentImage.software && <span>Logiciel: {currentImage.software}</span>}
            {currentImage.year && <span>Année: {currentImage.year}</span>}
            {currentImage.category && <span>Catégorie: {currentImage.category}</span>}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-2 bg-black/50 rounded-lg p-2 max-w-md overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  resetTransform()
                }}
                className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? 'border-white' : 'border-transparent'
                }`}
              >
                <img
                  src={image.thumbnail || image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom indicator */}
      {zoom !== 1 && (
        <div className="absolute top-20 right-4 z-10 bg-black/50 text-white px-3 py-1 rounded text-sm">
          {Math.round(zoom * 100)}%
        </div>
      )}
    </div>
  )
}

export default ImageViewer

