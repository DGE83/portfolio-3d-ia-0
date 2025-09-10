import { Box, Palette, Zap, Clock, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ServicesSection = () => {
  const services = [
    {
      icon: Box,
      title: "Modélisation 3D",
      description: "Création de modèles 3D détaillés pour l'architecture, l'industrie et l'art numérique",
      features: [
        "Modélisation architecturale",
        "Pièces industrielles (CAO)",
        "Personnages et créatures",
        "Environnements et scènes",
        "Rendu photoréaliste"
      ],
      price: "À partir de 150€",
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      icon: Palette,
      title: "Visuels IA",
      description: "Génération de visuels créatifs et uniques avec les dernières technologies d'IA",
      features: [
        "Illustrations personnalisées",
        "Concepts artistiques",
        "Visuels marketing",
        "Portraits stylisés",
        "Post-traitement professionnel"
      ],
      price: "À partir de 80€",
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      icon: Zap,
      title: "Projets Hybrides",
      description: "Combinaison de modélisation 3D et d'IA pour des créations innovantes",
      features: [
        "Intégration 3D + IA",
        "Concepts futuristes",
        "Prototypage visuel",
        "Animations créatives",
        "Solutions sur mesure"
      ],
      price: "Sur devis",
      color: "from-orange-500 to-red-500",
      popular: false
    }
  ]

  const process = [
    {
      step: "01",
      title: "Consultation",
      description: "Discussion de vos besoins et définition du projet"
    },
    {
      step: "02",
      title: "Concept",
      description: "Création des premières ébauches et validation"
    },
    {
      step: "03",
      title: "Développement",
      description: "Réalisation du projet selon les spécifications"
    },
    {
      step: "04",
      title: "Livraison",
      description: "Finalisation et remise des fichiers finaux"
    }
  ]

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Mes Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions créatives personnalisées pour donner vie à vos projets, 
            que ce soit en 3D traditionnel ou avec l'intelligence artificielle
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index}
                className={`relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  service.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star size={14} className="mr-1" />
                      Populaire
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6 flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-foreground">
                      {service.price}
                    </span>
                  </div>
                  <Button 
                    className="w-full"
                    variant={service.popular ? "default" : "outline"}
                  >
                    Discuter du projet
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Processus de travail */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-950/20 dark:to-blue-950/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Mon Processus de Travail
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une approche structurée pour garantir la qualité et respecter vos délais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="text-muted-foreground mx-auto" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Garanties */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Délais Respectés
            </h4>
            <p className="text-muted-foreground text-sm">
              Livraison dans les temps convenus
            </p>
          </div>
          <div className="text-center p-6">
            <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Qualité Premium
            </h4>
            <p className="text-muted-foreground text-sm">
              Attention aux détails et finitions soignées
            </p>
          </div>
          <div className="text-center p-6">
            <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Support Continu
            </h4>
            <p className="text-muted-foreground text-sm">
              Accompagnement et révisions incluses
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

