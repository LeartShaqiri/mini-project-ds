import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: 'M+', label: 'Data Points Processed' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 35, suffix: '', label: 'AI Experts' },
]

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollReveal(0.3)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-bold font-display gradient-text">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base text-nova-gray mt-2">{stats.find(s => s.value === value)?.label}</div>
    </div>
  )
}

export function Stats() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-nova-purple/5 via-transparent to-nova-blue/5" />
      <div className="section-container relative">
        <div className="glass rounded-3xl p-10 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
