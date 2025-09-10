import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici vous pourriez ajouter la logique d'envoi du formulaire
    console.log('Formulaire soumis:', formData)
    alert('Message envoyé ! Je vous répondrai dans les plus brefs délais.')
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@portfolio3d-ia.com",
      description: "Réponse sous 24h",
      color: "text-blue-500"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 6 XX XX XX XX",
      description: "Lun-Ven 9h-18h",
      color: "text-green-500"
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: "France",
      description: "Projets à distance",
      color: "text-purple-500"
    }
  ]

  const projectTypes = [
    "Modélisation 3D",
    "Visuels IA",
    "Projet hybride",
    "Consultation",
    "Autre"
  ]

  const socialLinks = [
    { name: "LinkedIn", url: "#", icon: "💼" },
    { name: "Behance", url: "#", icon: "🎨" },
    { name: "Instagram", url: "#", icon: "📸" },
    { name: "GitHub", url: "#", icon: "💻" }
  ]

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Contactez-moi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prêt à donner vie à votre projet ? Discutons de vos idées et 
            créons quelque chose d'extraordinaire ensemble
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Restons en contact
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-accent rounded-lg flex items-center justify-center`}>
                      <Icon className={`${info.color} w-6 h-6`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {info.title}
                      </h4>
                      <p className="text-foreground font-medium">
                        {info.value}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Réseaux sociaux */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Suivez-moi
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-accent hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <span className="text-xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="text-green-500" size={24} />
                <h4 className="text-lg font-semibold text-foreground">
                  Disponibilité
                </h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Actuellement disponible pour de nouveaux projets. 
                Délai moyen de réponse : 24h.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Disponible maintenant
                </span>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
                  Type de projet
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Sélectionnez un type</option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Décrivez votre projet en détail..."
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="mr-2" size={20} />
                Envoyer le message
              </Button>
            </form>

            {/* Alternatives de contact */}
            <div className="mt-8 p-6 bg-muted/50 rounded-xl">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Autres moyens de me contacter
              </h4>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>Discussion en direct (WhatsApp)</span>
                  <ExternalLink size={16} />
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Calendar size={20} />
                  <span>Planifier un appel (Calendly)</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="mt-20 bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-950/20 dark:to-purple-950/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Questions Fréquentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Quels sont vos délais de livraison ?
              </h4>
              <p className="text-muted-foreground text-sm">
                Les délais varient selon la complexité : 3-7 jours pour les visuels IA, 
                1-3 semaines pour la modélisation 3D complexe.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Proposez-vous des révisions ?
              </h4>
              <p className="text-muted-foreground text-sm">
                Oui, 2-3 révisions sont incluses dans chaque projet pour garantir 
                votre satisfaction complète.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Travaillez-vous à l'international ?
              </h4>
              <p className="text-muted-foreground text-sm">
                Absolument ! Je travaille avec des clients du monde entier, 
                principalement en français et en anglais.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Comment se déroule le paiement ?
              </h4>
              <p className="text-muted-foreground text-sm">
                50% à la commande, 50% à la livraison. Paiement sécurisé par 
                virement ou PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

