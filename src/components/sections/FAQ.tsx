import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { getFAQs } from '../../services/api'
import type { FAQ } from '../../types'

const fallbackFAQs: FAQ[] = [
  { id: '1', question: 'What makes Nova Studio different from other AI agencies?', answer: 'We combine deep technical expertise with creative vision. Our team includes PhD-level AI researchers and award-winning designers who work together to deliver solutions that are both technically brilliant and beautifully designed.', sort_order: 1, created_at: '', updated_at: '' },
  { id: '2', question: 'How long does a typical AI project take?', answer: 'Project timelines vary by scope. A focused solution can launch in 4-8 weeks, while comprehensive platforms may take 3-6 months. We always provide a clear timeline during the discovery phase.', sort_order: 2, created_at: '', updated_at: '' },
  { id: '3', question: 'Do you offer post-launch support?', answer: 'Absolutely. Every project includes a 90-day support period, and we offer ongoing maintenance plans. Our team monitors performance and provides regular optimization updates.', sort_order: 3, created_at: '', updated_at: '' },
  { id: '4', question: 'What industries do you work with?', answer: 'We have delivered successful projects across fintech, healthcare, retail, media, manufacturing, and SaaS. Our AI solutions are industry-agnostic and adaptable to any domain.', sort_order: 4, created_at: '', updated_at: '' },
  { id: '5', question: 'How do you handle data privacy and security?', answer: 'Security is built into every layer of our solutions. We are SOC 2 compliant, follow GDPR best practices, and can deploy on your infrastructure for complete data sovereignty.', sort_order: 5, created_at: '', updated_at: '' },
  { id: '6', question: 'Can you work with our existing tech stack?', answer: 'Yes, we design our solutions to integrate seamlessly with your current systems. We have experience with all major cloud providers, databases, and enterprise tools.', sort_order: 6, created_at: '', updated_at: '' },
]

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFAQs)
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    getFAQs()
      .then(setFaqs)
      .catch(() => setFaqs(fallbackFAQs))
  }, [])

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with Nova Studio."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className={`w-full text-left rounded-2xl transition-all duration-300 ${
                  openId === faq.id
                    ? 'glass border-nova-purple/30'
                    : 'glass-card'
                }`}
              >
                <div className="flex items-center justify-between p-6">
                  <span className="font-medium pr-4">{faq.question}</span>
                  <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    openId === faq.id ? 'bg-nova-purple/20 text-nova-purple' : 'bg-white/5 text-nova-gray'
                  }`}>
                    {openId === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </div>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-nova-gray leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
