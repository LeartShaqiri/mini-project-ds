import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Camera, Save, ArrowLeft, User, Mail, Shield, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/Button'

export default function Profile() {
  const { user, isAdmin, loading, logout } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [fullName, setFullName] = useState(user?.full_name || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen bg-nova-deep flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-nova-purple border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !supabase) return

    setUploading(true)
    try {
      const path = `${user.id}/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id)

      if (updateError) throw updateError
      setMessage('Avatar updated!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      setMessage(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSaveName = async () => {
    if (!supabase || !fullName.trim()) return
    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName.trim() })
        .eq('id', user.id)

      if (error) throw error
      setMessage('Profile updated!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      setMessage(err.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const initial = user.full_name?.[0] || user.email?.[0] || '?'

  return (
    <div className="min-h-screen bg-nova-deep">
      {/* Aurora bg */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="aurora-orb w-[500px] h-[500px] bg-nova-purple -top-40 -right-40 opacity-10" />
        <div className="aurora-orb w-[400px] h-[400px] bg-nova-blue -bottom-40 -left-40 opacity-10" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-nova-gray hover:text-white mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
        >
          {/* Header */}
          <div className="flex items-center gap-6 mb-10">
            {/* Avatar */}
            <div className="relative group">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-nova-purple/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-nova-blue to-nova-purple flex items-center justify-center text-3xl font-bold ring-2 ring-nova-purple/30">
                  {initial.toUpperCase()}
                </div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading || !supabase}
                className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-6 h-6" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display mb-1">
                {user.full_name || 'Your Profile'}
              </h1>
              <div className="flex items-center gap-2 text-nova-gray text-sm">
                <Mail className="w-3.5 h-3.5" />
                {user.email}
              </div>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-nova-purple/10 border border-nova-purple/20 text-nova-purple text-xs font-medium">
                  <Shield className="w-3 h-3" /> Admin
                </span>
              )}
            </div>
          </div>

          {/* Uploading indicator */}
          {uploading && (
            <div className="glass-card p-4 mb-6 text-center text-sm text-nova-cyan">
              Uploading avatar...
            </div>
          )}

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-xl text-sm mb-6 ${message.includes('failed') ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-nova-cyan/10 border border-nova-cyan/20 text-nova-cyan'}`}>
              {message}
            </div>
          )}

          {/* Edit name */}
          <div className="glass-card p-6 mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-nova-purple" /> Edit Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-nova-gray mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-nova-purple/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <Button onClick={handleSaveName} disabled={saving} icon={<Save className="w-4 h-4" />}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isAdmin && (
              <Link to="/admin">
                <div className="glass-card p-5 group cursor-pointer">
                  <Shield className="w-5 h-5 text-nova-purple mb-2" />
                  <h4 className="font-medium mb-1">Admin Dashboard</h4>
                  <p className="text-sm text-nova-gray">Manage content, messages, and subscribers</p>
                </div>
              </Link>
            )}
            <button onClick={handleLogout}>
              <div className="glass-card p-5 group cursor-pointer text-left w-full">
                <LogOut className="w-5 h-5 text-red-400 mb-2" />
                <h4 className="font-medium mb-1">Sign Out</h4>
                <p className="text-sm text-nova-gray">Log out of your account</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
