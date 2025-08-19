'use client'

import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', institution: '', message: '' })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">¡Mensaje enviado!</h3>
        <p className="text-slate-200">Nos pondremos en contacto contigo en las próximas 24 horas.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm 
                     focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                     transition-all duration-200 placeholder-slate-400"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm 
                     focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                     transition-all duration-200 placeholder-slate-400"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="institution" className="block text-sm font-medium text-white mb-2">
          Institución educativa
        </label>
        <input
          type="text"
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm 
                   focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                   transition-all duration-200 placeholder-slate-400"
          placeholder="Universidad, colegio, instituto..."
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm 
                   focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                   transition-all duration-200 placeholder-slate-400 resize-none"
          placeholder="Cuéntanos sobre tus necesidades educativas o agenda una demostración..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary btn-large justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Solicitar Demostración
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      <p className="text-sm text-slate-300 text-center">
        Al enviar este formulario, aceptas que nos pongamos en contacto contigo para programar una demostración personalizada.
      </p>
    </form>
  )
}

export default ContactForm