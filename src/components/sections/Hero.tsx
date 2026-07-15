import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { MagneticButton } from '../ui/MagneticButton'
import { useParallax } from '../../hooks/useParallax'

export function Hero() {
  const orbRef = useParallax(0.05)
  const gridRef = useParallax(0.02)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as const } }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora orbs */}
      <div ref={orbRef} className="absolute inset-0 pointer-events-none">
        <div className="aurora-orb w-[600px] h-[600px] bg-nova-purple -top-40 -left-40 animate-float-1" />
        <div className="aurora-orb w-[500px] h-[500px] bg-nova-blue top-1/3 -right-40 animate-float-2" />
        <div className="aurora-orb w-[400px] h-[400px] bg-nova-cyan bottom-20 left-1/2 animate-float-3" />
      </div>

      {/* Grid overlay */}
      <div ref={gridRef} className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-nova-purple/10 border border-nova-purple/20 text-nova-purple text-sm font-medium">
              <Zap className="w-4 h-4" />
              AI-Powered Creative Studio
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.05] mb-6 max-w-5xl mx-auto"
          >
            We Build the{' '}
            <span className="gradient-text">Future</span>
            <br />
            of Intelligence
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-nova-gray max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Nova Studio crafts cutting-edge AI solutions — from strategy to deployment. 
            We transform bold ideas into intelligent systems that redefine industries.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Start Your Project
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button variant="secondary" size="lg" icon={<Sparkles className="w-5 h-5" />} iconPosition="left">
                View Our Work
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '12x', label: 'Avg. ROI' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold font-display gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-nova-gray mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nova-deep to-transparent pointer-events-none" />
    </section>
  )
}
