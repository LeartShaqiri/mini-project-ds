import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles, User, LogOut, Shield } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
]

function UserMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    setOpen(false)
    await logout()
    navigate('/')
  }

  const initial = user?.full_name?.[0] || user?.email?.[0] || '?'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 group"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nova-blue to-nova-purple flex items-center justify-center text-sm font-bold group-hover:shadow-md group-hover:shadow-nova-purple/20 transition-all">
          {initial.toUpperCase()}
        </div>
        <span className="hidden md:block text-sm text-nova-gray group-hover:text-white transition-colors">
          {user?.full_name || 'Profile'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] as const }}
            className="absolute right-0 top-full mt-2 w-56 glass rounded-xl p-1.5 shadow-xl"
          >
            <div className="px-3 py-2.5 border-b border-white/5 mb-1">
              <p className="text-sm font-medium truncate">{user?.full_name || 'User'}</p>
              <p className="text-xs text-nova-gray truncate">{user?.email}</p>
            </div>
            <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-nova-gray hover:text-white hover:bg-white/5 transition-all">
              <User className="w-4 h-4" /> My Profile
            </Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-nova-gray hover:text-white hover:bg-white/5 transition-all">
                <Shield className="w-4 h-4" /> Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-nova-gray hover:text-red-400 hover:bg-red-400/5 transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-blur py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-blue to-nova-purple flex items-center justify-center group-hover:shadow-lg group-hover:shadow-nova-purple/30 transition-all duration-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight">
            Nova<span className="text-nova-purple">Studio</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-nova-gray hover:text-white rounded-lg hover:bg-white/5 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA / User */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <a href="#contact">
                <Button size="sm" icon={<Sparkles className="w-4 h-4" />}>
                  Start Project
                </Button>
              </a>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-white hover:text-nova-purple transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] as const }}
            className="lg:hidden nav-blur overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-nova-gray hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-2 border-t border-white/5">
                {user ? (
                  <>
                    <Link to="/profile" className="block px-4 py-3 text-nova-gray hover:text-white hover:bg-white/5 rounded-lg">
                      My Profile
                    </Link>
                    <Link to="/admin" className="block px-4 py-3 text-nova-gray hover:text-white hover:bg-white/5 rounded-lg">
                      Admin Panel
                    </Link>
                  </>
                ) : (
                  <>
                    <a href="#contact" className="block">
                      <Button className="w-full">Start Project</Button>
                    </a>
                    <Link to="/login" className="block">
                      <Button variant="secondary" className="w-full">Sign In</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
