import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  glow?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  icon,
  iconPosition = 'right',
  glow = false,
  ...props
}: ButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 cursor-pointer overflow-hidden'

  const variantClasses = {
    primary: 'bg-gradient-to-r from-nova-blue via-nova-purple to-nova-cyan text-white shadow-lg shadow-nova-purple/25 hover:shadow-xl hover:shadow-nova-purple/40 hover:scale-[1.02]',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-nova-purple/30',
    ghost: 'text-nova-gray hover:text-white hover:bg-white/5',
    outline: 'border border-nova-purple/30 text-nova-white hover:bg-nova-purple/10 hover:border-nova-purple/60',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], glow && 'animate-glow-pulse', className)}
      {...(props as any)}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      )}
    </motion.button>
  )
}
