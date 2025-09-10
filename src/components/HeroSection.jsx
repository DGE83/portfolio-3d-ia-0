import { useEffect, useRef } from 'react'
import { ArrowDown, Sparkles, Box, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="block">Créateur</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              3D & IA
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Autodidacte passionné par la modélisation 3D et la création de visuels avec l'intelligence artificielle
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center space-x-2 text-gray-300">
              <Box className="text-blue-400" size={24} />
              <span>Blender & Fusion 360</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Sparkles className="text-purple-400" size={24} />
              <span>Visuels IA Créatifs</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              onClick={() => document.querySelector('#modeling')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Box className="mr-2" size={20} />
              Voir mes créations 3D
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3"
              onClick={() => document.querySelector('#ai-art')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Palette className="mr-2" size={20} />
              Découvrir mes visuels IA
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToNext}
          className="animate-bounce text-white hover:text-purple-400 transition-colors duration-300"
        >
          <ArrowDown size={32} />
        </button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-5"></div>
    </section>
  )
}

export default HeroSection

