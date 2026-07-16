import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { UserProfile } from '../types'

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const sb = supabase
    if (!sb) { setLoading(false); return }

    const getSession = async () => {
      try {
        const { data: { session } } = await sb.auth.getSession()
        if (session?.user) {
          const { data: profile } = await sb
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            setUser(profile as UserProfile)
            setIsAdmin(profile.role === 'admin')
          }
        }
      } catch {
        // Not authenticated
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = sb.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await sb
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setUser(profile as UserProfile)
          setIsAdmin(profile.role === 'admin')
        }
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    if (!supabase) throw new Error('Backend not available')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const register = async (email: string, password: string, fullName: string) => {
    if (!supabase) throw new Error('Backend not available')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    })
    if (error) throw error
  }

  const logout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  return { user, loading, isAdmin, login, register, logout }
}
