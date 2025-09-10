import { Code, Lightbulb, Target, Zap, Printer } from 'lucide-react'

const AboutSection = () => {
  const skills = [
    {
      icon: Code,
      title: "Modélisation 3D",
      description: "Maîtrise de Blender et Fusion 360 pour créer des modèles 3D détaillés et réalistes",
      color: "text-blue-500"
    },
    {
      icon: Lightbulb,
      title: "Créativité IA",
      description: "Utilisation d'outils d'IA pour générer des visuels uniques et innovants",
      color: "text-purple-500"
    },
    {
      icon: Printer,
      title: "Impression 3D",
      description: "Challenge personnel : imprimer en 3D uniquement les pièces que j'ai moi-même modélisées",
      color: "text-orange-500"
    },
    {
      icon: Target,
      title: "Précision Technique",
      description: "Attention aux détails et respect des contraintes techniques dans chaque projet",
      color: "text-green-500"
    }
  ]

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            À Propos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionné par la création numérique, je me suis lancé en autodidacte dans l'univers fascinant de la modélisation 3D sur Fusion 360 et Blender. En parallèle, j'explore le potentiel de l'intelligence artificielle pour générer des visuels uniques et percutants. Vous découvrirez ici la vitrine de mes premières réalisations, le début d'une aventure créative en constante évolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4`}>
                  <Icon className={`${skill.color} w-8 h-8`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {skill.title}
                </h3>
                <p className="text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Mon Approche Créative
              </h3>
              <p className="text-muted-foreground mb-6">
                En tant qu'autodidacte, j'ai développé une approche unique qui mélange rigueur technique 
                et créativité débridée. Chaque projet est une opportunité d'explorer de nouvelles 
                possibilités et de repousser les limites du possible.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-foreground">Recherche et expérimentation constantes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-foreground">Fusion entre technique et artistique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-foreground">Adaptation aux nouvelles technologies</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-xl opacity-30"></div>
              <div className="absolute inset-8 bg-gradient-to-bl from-blue-300 to-purple-500 rounded-lg opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

