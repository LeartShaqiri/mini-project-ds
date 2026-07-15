import { Link } from 'react-router-dom'
import { Sparkles, Globe, Heart, ArrowUpRight, Mail } from 'lucide-react'

const footerLinks = {
  Product: ['Services', 'Portfolio', 'Pricing', 'FAQ'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-nova-deep">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <Sparkles className="w-8 h-8 text-nova-purple mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold font-display mb-3">
            Stay ahead with <span className="gradient-text">Nova</span>
          </h3>
          <p className="text-nova-gray mb-6">
            Get weekly insights on AI trends and exclusive studio updates.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-nova-gray focus:outline-none focus:border-nova-purple/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-nova-blue to-nova-purple text-white font-medium hover:shadow-lg hover:shadow-nova-purple/25 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nova-blue to-nova-purple flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold font-display">Nova<span className="text-nova-purple">Studio</span></span>
          </Link>
          <p className="text-nova-gray text-sm mb-4">
            Building the future with AI. Creating intelligent solutions that transform businesses.
          </p>
          <div className="flex gap-3">
            {[Globe, Heart, Globe].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-nova-gray hover:text-white hover:border-nova-purple/30 hover:bg-nova-purple/10 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-nova-gray hover:text-white transition-colors flex items-center gap-1 group">
                    {link}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-nova-gray">
          <p>&copy; {new Date().getFullYear()} Nova Studio. All rights reserved.</p>
          <p>Designed with precision. Built with intelligence.</p>
        </div>
      </div>
    </footer>
  )
}
