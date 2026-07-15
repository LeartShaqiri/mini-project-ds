import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { getPortfolio } from '../../services/api'
import type { PortfolioItem } from '../../types'

const fallbackPortfolio: PortfolioItem[] = [
  { id: '1', title: 'NeuroStyle — AI Fashion', description: 'AI platform that generates fashion designs from mood boards and trends.', category: 'AI Platform', image_url: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80', created_at: '', updated_at: '' },
  { id: '2', title: 'DataVault Analytics', description: 'Real-time analytics dashboard with AI-powered insights for enterprise data.', category: 'Analytics', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', created_at: '', updated_at: '' },
  { id: '3', title: 'ConversAI Chatbot', description: 'Multilingual AI chatbot handling 50,000+ daily interactions.', category: 'Chatbot', image_url: 'https://images.unsplash.com/photo-1531746790098-59b29520ff3c?w=800&q=80', created_at: '', updated_at: '' },
  { id: '4', title: 'SmartRetail Inventory', description: 'Predictive inventory management reducing waste by 40%.', category: 'ML System', image_url: 'https://images.unsplash.com/photo-1553729459-afe8d8d5c071?w=800&q=80', created_at: '', updated_at: '' },
  { id: '5', title: 'EchoVision Editor', description: 'Automatic video editing with scene detection and AI color grading.', category: 'Creative AI', image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', created_at: '', updated_at: '' },
  { id: '6', title: 'CloudMind DevOps', description: 'AI-powered DevOps predicting and resolving infrastructure issues.', category: 'DevOps', image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', created_at: '', updated_at: '' },
]

const categories = ['All', 'AI Platform', 'Analytics', 'Chatbot', 'ML System', 'Creative AI', 'DevOps']

export function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>(fallbackPortfolio)
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    getPortfolio()
      .then(setItems)
      .catch(() => setItems(fallbackPortfolio))
  }, [])

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory)

  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          label="Portfolio"
          title="Work That Speaks"
          description="Explore our latest AI projects — each one a testament to our commitment to excellence."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-nova-blue to-nova-purple text-white shadow-md shadow-nova-purple/20'
                  : 'bg-white/5 text-nova-gray hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative rounded-2xl overflow-hidden bg-nova-dark border border-white/5 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <AnimatePresence>
                {hoveredId === item.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-nova-deep via-nova-deep/60 to-transparent flex flex-col justify-end p-6"
                  >
                    <span className="text-xs text-nova-purple font-medium mb-1">{item.category}</span>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-nova-gray mb-3">{item.description}</p>
                    <a href={item.link_url || '#'} className="flex items-center gap-1 text-sm text-nova-cyan hover:underline">
                      View Project <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
