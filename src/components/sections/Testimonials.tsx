import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { getTestimonials } from '../../services/api'
import type { Testimonial } from '../../types'

const fallbackTestimonials: Testimonial[] = [
  { id: '1', name: 'Sarah Chen', role: 'CTO', company: 'TechVista Inc.', content: 'Nova Studio transformed our entire AI infrastructure. The predictive analytics dashboard they built saves us 20 hours of manual work every week. Truly world-class work.', rating: 5, created_at: '', updated_at: '' },
  { id: '2', name: 'Marcus Rodriguez', role: 'VP of Product', company: 'NeuralPath', content: 'We went from concept to production with their generative AI solution in under 3 months. The ROI has been incredible — our content team is now 3x more productive.', rating: 5, created_at: '', updated_at: '' },
  { id: '3', name: 'Emily Watson', role: 'Head of Innovation', company: 'QuantumLeap', content: 'Working with Nova Studio felt like partnering with a team from the future. They understood our vision instantly and delivered beyond expectations.', rating: 5, created_at: '', updated_at: '' },
  { id: '4', name: 'David Park', role: 'CEO', company: 'SwiftScale AI', content: 'The automation workflows Nova built eliminated 80% of our manual processes. Our team can now focus on what truly matters — building great products.', rating: 5, created_at: '', updated_at: '' },
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    getTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials(fallbackTestimonials))
  }, [])

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]
  if (!t) return null

  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          label="Testimonials"
          title="Trusted by Industry Leaders"
          description="Hear from the companies that partner with us to build the future."
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] as const }}
          >
            <Card padding="lg" className="text-center">
              <Quote className="w-10 h-10 text-nova-purple/30 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-nova-gray leading-relaxed mb-8">
                "{t.content}"
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-nova-purple text-nova-purple" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nova-blue to-nova-purple flex items-center justify-center text-lg font-bold">
                  {t.name[0]}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-nova-gray">{t.role}, {t.company}</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="p-3 rounded-xl bg-white/5 border border-white/10 text-nova-gray hover:text-white hover:border-nova-purple/30 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-nova-purple w-6' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-3 rounded-xl bg-white/5 border border-white/10 text-nova-gray hover:text-white hover:border-nova-purple/30 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
