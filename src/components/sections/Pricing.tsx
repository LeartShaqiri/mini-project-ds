import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { MagneticButton } from '../ui/MagneticButton'
import { getPricing } from '../../services/api'
import type { PricingPlan } from '../../types'

const fallbackPricing: PricingPlan[] = [
  { id: '1', name: 'Starter', price: 999, currency: 'USD', period: 'month', description: 'Perfect for startups and small teams getting started with AI.', features: ['1 AI Project', 'Basic Analytics Dashboard', '5 Team Members', 'Email Support', 'Monthly Strategy Call'], highlighted: false, cta_text: 'Start Free Trial', created_at: '', updated_at: '' },
  { id: '2', name: 'Professional', price: 2999, currency: 'USD', period: 'month', description: 'For growing companies that need comprehensive AI solutions.', features: ['3 AI Projects', 'Advanced Analytics', 'Unlimited Team Members', 'Priority Support', 'Weekly Strategy Calls', 'Custom Model Training', 'API Access'], highlighted: true, cta_text: 'Get Started', created_at: '', updated_at: '' },
  { id: '3', name: 'Enterprise', price: 9999, currency: 'USD', period: 'month', description: 'Full-scale AI transformation for large organizations.', features: ['Unlimited AI Projects', 'Enterprise Analytics Suite', 'Dedicated AI Team', '24/7 Premium Support', 'Daily Strategy Sessions', 'On-Premise Deployment', 'Custom Integrations', 'SLA Guarantee'], highlighted: false, cta_text: 'Contact Sales', created_at: '', updated_at: '' },
]

export function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(fallbackPricing)
  const [annual, setAnnual] = useState(false)

  useEffect(() => {
    getPricing()
      .then(setPlans)
      .catch(() => setPlans(fallbackPricing))
  }, [])

  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          label="Pricing"
          title="Transparent, Scalable Plans"
          description="Choose the plan that fits your ambition. Upgrade anytime as you grow."
        />

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-nova-gray'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-14 h-7 rounded-full bg-white/10 border border-white/10 transition-colors"
          >
            <motion.div
              animate={{ x: annual ? 28 : 2 }}
              className="w-5 h-5 rounded-full bg-gradient-to-r from-nova-blue to-nova-purple absolute top-0.5"
            />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-nova-gray'}`}>
            Annual <span className="text-nova-cyan text-xs">Save 20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'glass border-nova-purple/40 shadow-xl shadow-nova-purple/10 scale-[1.02] md:scale-105'
                  : 'glass-card'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-nova-blue to-nova-purple text-white text-xs font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-nova-gray text-sm mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold font-display">
                  ${annual ? Math.round(plan.price * 0.8 * 12) : plan.price}
                </span>
                <span className="text-nova-gray text-sm">/{annual ? 'year' : 'month'}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-nova-gray">
                    <Check className="w-4 h-4 text-nova-cyan shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <MagneticButton>
                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.cta_text}
                </Button>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
