import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Sparkles, Zap, BarChart3, ArrowRight, Check } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { getServices } from '../../services/api'
import type { Service } from '../../types'

const iconMap: Record<string, any> = { Brain, Sparkles, Zap, BarChart3 }

const fallbackServices: Service[] = [
  { id: '1', title: 'AI Strategy Consulting', description: 'Leverage cutting-edge AI to transform your business strategy. We analyze your data and create intelligent roadmaps.', icon: 'Brain', features: ['AI Readiness Assessment', 'Strategic Roadmap', 'ROI Analysis', 'Implementation Plan'], created_at: '', updated_at: '' },
  { id: '2', title: 'Generative AI Solutions', description: 'Custom generative AI models for content creation, design, and automation tailored to your brand.', icon: 'Sparkles', features: ['Custom Model Training', 'Content Generation', 'Design Automation', 'Brand Voice AI'], created_at: '', updated_at: '' },
  { id: '3', title: 'Intelligent Automation', description: 'Streamline operations with AI-powered automation that reduces costs and increases efficiency.', icon: 'Zap', features: ['Process Mining', 'Workflow Automation', 'Integration Setup', 'Performance Monitoring'], created_at: '', updated_at: '' },
  { id: '4', title: 'AI-Powered Analytics', description: 'Turn raw data into actionable insights with advanced machine learning and predictive analytics.', icon: 'BarChart3', features: ['Predictive Modeling', 'Real-time Dashboards', 'Anomaly Detection', 'Custom Reports'], created_at: '', updated_at: '' },
]

export function Services() {
  const [services, setServices] = useState<Service[]>(fallbackServices)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => setServices(fallbackServices))
  }, [])

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          label="Services"
          title="AI Solutions That Deliver"
          description="From strategy to deployment, we offer end-to-end AI services that create measurable business impact."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              >
                <Card className="cursor-pointer group h-full" padding="lg">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nova-blue/20 to-nova-purple/20 border border-nova-purple/20 flex items-center justify-center shrink-0 group-hover:shadow-md group-hover:shadow-nova-purple/15 transition-all duration-300">
                      <Icon className="w-6 h-6 text-nova-purple" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-nova-gray text-sm leading-relaxed mb-4">{service.description}</p>
                      <AnimatePresence>
                        {activeIndex === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <ul className="space-y-2 mb-4">
                              {service.features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-sm text-nova-gray">
                                  <Check className="w-4 h-4 text-nova-cyan shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <button className="flex items-center gap-1 text-sm text-nova-purple hover:gap-2 transition-all group">
                        {activeIndex === i ? 'Show less' : 'Learn more'} 
                        <ArrowRight className={`w-4 h-4 transition-transform ${activeIndex === i ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
