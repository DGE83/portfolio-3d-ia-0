import { useEffect } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ModelingSection from './components/ModelingSection'
import AIArtSection from './components/AIArtSection'
import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ModelingSection />
        <AIArtSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
