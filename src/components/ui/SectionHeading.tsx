import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ label, title, description, align = 'center' }: SectionHeadingProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-nova-purple/10 border border-nova-purple/20 text-nova-purple text-sm font-medium mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {description && (
        <p className="text-nova-gray text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}
