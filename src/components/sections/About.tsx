import { motion } from 'framer-motion'
import { Sparkles, Target, Users, Rocket } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'

const highlights = [
  { icon: Sparkles, title: 'AI Native', desc: 'Built from the ground up with artificial intelligence at our core. Every solution is intelligent by design.' },
  { icon: Target, title: 'Precision Focused', desc: 'We target measurable outcomes — not vanity metrics. Every project ties to your bottom line.' },
  { icon: Users, title: 'Human Centered', desc: 'Technology serves people. Our AI solutions enhance human capability, never replace it.' },
  { icon: Rocket, title: 'Future Ready', desc: 'Architectures built for tomorrow. Scalable, adaptable, and always at the cutting edge.' },
]

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          label="About Us"
          title="Pioneering the AI Frontier"
          description="We are a team of AI researchers, engineers, and designers united by a singular mission — making advanced AI accessible and impactful."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
              className="glass-card p-6 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-nova-blue/20 to-nova-purple/20 border border-nova-purple/20 flex items-center justify-center mx-auto mb-5 group-hover:shadow-lg group-hover:shadow-nova-purple/10 transition-all duration-300">
                <item.icon className="w-6 h-6 text-nova-purple" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-nova-gray text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
