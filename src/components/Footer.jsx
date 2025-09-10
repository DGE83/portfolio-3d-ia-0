import { Heart, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    portfolio: [
      { name: "Modélisation 3D", href: "#modeling" },
      { name: "Visuels IA", href: "#ai-art" },
      { name: "À propos", href: "#about" },
      { name: "Services", href: "#services" }
    ],
    services: [
      { name: "Blender", href: "#modeling" },
      { name: "Fusion 360", href: "#modeling" },
      { name: "Midjourney", href: "#ai-art" },
      { name: "DALL-E", href: "#ai-art" }
    ],
    contact: [
      { name: "Email", href: "mailto:contact@portfolio3d-ia.com" },
      { name: "LinkedIn", href: "#" },
      { name: "Behance", href: "#" },
      { name: "Instagram", href: "#" }
    ]
  }

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
      
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Portfolio 3D & IA
              </h3>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Créateur passionné spécialisé dans la modélisation 3D et la génération 
                de visuels avec l'intelligence artificielle. Transformons vos idées en réalité numérique.
              </p>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Fait avec</span>
                <Heart className="text-red-400 w-4 h-4" />
                <span>et beaucoup de créativité</span>
              </div>
            </div>

            {/* Portfolio links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Portfolio
              </h4>
              <ul className="space-y-3">
                {footerLinks.portfolio.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Outils & Technologies
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Contact & Réseaux
              </h4>
              <ul className="space-y-3">
                {footerLinks.contact.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Newsletter signup */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-white mb-2">
                  Newsletter
                </h5>
                <p className="text-gray-400 text-xs mb-3">
                  Recevez mes dernières créations
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  <Button 
                    size="sm" 
                    className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Portfolio 3D & IA. Tous droits réservés.
              </div>
              
              <div className="flex items-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Mentions légales
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Confidentialité
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowUp size={16} className="mr-1" />
                  Haut de page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  )
}

export default Footer

