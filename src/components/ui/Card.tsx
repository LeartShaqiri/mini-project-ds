import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className, hover = true, glow = false, padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6 lg:p-8',
    lg: 'p-8 lg:p-10',
  }

  return (
    <motion.div
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'glass-card',
        paddingClasses[padding],
        glow && 'glow-border',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
