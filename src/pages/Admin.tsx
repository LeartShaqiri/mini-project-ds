import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard, MessageSquare, Users, Briefcase, Image as ImageIcon,
  Star, CreditCard, LogOut, Sparkles
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getContactMessages, getNewsletterSubscribers, markContactRead } from '../services/api'
import type { ContactMessage, NewsletterSubscriber } from '../types'

const sidebarLinks = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'newsletter', label: 'Newsletter', icon: Users },
]

export default function Admin() {
  const { user, isAdmin, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleMarkRead = async (id: string) => {
    await markContactRead(id)
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)))
  }

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (!isAdmin) return
    if (activeTab === 'messages') {
      setDataLoading(true)
      getContactMessages()
        .then(setMessages)
        .finally(() => setDataLoading(false))
    } else if (activeTab === 'newsletter') {
      setDataLoading(true)
      getNewsletterSubscribers()
        .then(setSubscribers)
        .finally(() => setDataLoading(false))
    }
  }, [activeTab, isAdmin])

  if (loading) {
    return (
      <div className="min-h-screen bg-nova-deep flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-nova-purple border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-nova-deep flex flex-col items-center justify-center p-6">
        <Sparkles className="w-16 h-16 text-nova-purple mb-6" />
        <h1 className="text-2xl font-bold font-display mb-2">Access Denied</h1>
        <p className="text-nova-gray mb-6 text-center max-w-md">
          Admin access required. Contact your administrator to promote your account.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-nova-gray hover:text-white hover:border-nova-purple/30 transition-all"
        >
          Sign Out
        </button>
      </div>
    )
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  return (
    <div className="min-h-screen bg-nova-deep flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen glass border-r border-white/5 flex flex-col p-4 shrink-0 hidden md:flex">
        <Link to="/" className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nova-blue to-nova-purple flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold font-display">Nova<span className="text-nova-purple">Admin</span></span>
        </Link>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === link.id
                  ? 'bg-nova-purple/10 border border-nova-purple/20 text-white'
                  : 'text-nova-gray hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
              {link.id === 'messages' && unreadCount > 0 && (
                <span className="ml-auto bg-nova-purple text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nova-blue to-nova-purple flex items-center justify-center text-xs font-bold">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.full_name || user.email}</p>
              <p className="text-xs text-nova-gray">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-nova-gray hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden glass border-b border-white/5 p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-nova-purple" />
            <span className="font-bold font-display text-sm">Admin</span>
          </Link>
          <button onClick={handleLogout} className="text-nova-gray text-sm">Sign Out</button>
        </div>

        <div className="p-6 md:p-10">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">Dashboard</h1>
                <p className="text-nova-gray">Welcome back, {user.full_name || 'Admin'}.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'New Messages', value: messages.length, icon: MessageSquare, color: 'from-nova-blue to-nova-cyan' },
                  { label: 'Subscribers', value: subscribers.length, icon: Users, color: 'from-nova-purple to-pink-500' },
                  { label: 'Active Services', value: '4', icon: Briefcase, color: 'from-nova-cyan to-emerald-400' },
                ].map((card) => (
                  <div key={card.label} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-nova-gray text-sm">{card.label}</span>
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold font-display">{dataLoading ? '...' : card.value}</div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Services', icon: Briefcase },
                    { label: 'Portfolio', icon: ImageIcon },
                    { label: 'Testimonials', icon: Star },
                    { label: 'Pricing', icon: CreditCard },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="glass-card p-4 text-center hover:border-nova-purple/30 transition-all group"
                    >
                      <action.icon className="w-6 h-6 text-nova-gray group-hover:text-nova-purple mx-auto mb-2 transition-colors" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Messages */}
          {activeTab === 'messages' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">Messages</h1>
                <p className="text-nova-gray">{messages.length} messages received</p>
              </div>
              {dataLoading ? (
                <div className="text-center py-20 text-nova-gray">Loading...</div>
              ) : messages.length === 0 ? (
                <div className="text-center py-20 text-nova-gray">No messages yet.</div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`glass-card p-6 ${!msg.is_read ? 'border-nova-purple/20' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{msg.name}</span>
                            {!msg.is_read && <span className="w-2 h-2 rounded-full bg-nova-purple" />}
                          </div>
                          <span className="text-xs text-nova-gray">{msg.email} — {new Date(msg.created_at).toLocaleDateString()}</span>
                        </div>
                        {!msg.is_read && (
                          <button
                            onClick={() => handleMarkRead(msg.id)}
                            className="text-xs text-nova-purple hover:underline"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                      <h4 className="font-medium text-sm mb-1">{msg.subject}</h4>
                      <p className="text-sm text-nova-gray">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Newsletter */}
          {activeTab === 'newsletter' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">Newsletter Subscribers</h1>
                <p className="text-nova-gray">{subscribers.length} subscribers</p>
              </div>
              {dataLoading ? (
                <div className="text-center py-20 text-nova-gray">Loading...</div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-20 text-nova-gray">No subscribers yet.</div>
              ) : (
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left p-4 text-sm text-nova-gray font-medium">Email</th>
                          <th className="text-left p-4 text-sm text-nova-gray font-medium">Status</th>
                          <th className="text-left p-4 text-sm text-nova-gray font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((sub) => (
                          <tr key={sub.id} className="border-b border-white/5">
                            <td className="p-4 text-sm">{sub.email}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${sub.is_active ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                                {sub.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="p-4 text-sm text-nova-gray">{new Date(sub.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Mobile nav */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 flex p-2">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs transition-all ${
                  activeTab === link.id ? 'text-nova-purple' : 'text-nova-gray'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </button>
            ))}
          </div>
          {/* Spacer for mobile nav */}
          <div className="md:hidden h-20" />
        </div>
      </main>
    </div>
  )
}
