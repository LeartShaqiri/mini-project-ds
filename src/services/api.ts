import { supabase } from '../lib/supabase'
import type { Service, PortfolioItem, Testimonial, PricingPlan, FAQ, ContactMessage, NewsletterSubscriber } from '../types'

const noBackend = () => { throw new Error('Supabase not configured') }

// Public read operations
export async function getServices() {
  if (!supabase) return noBackend()
  const { data, error } = await supabase.from('services').select('*').eq('is_active', true).order('sort_order')
  if (error) throw error
  return data as Service[]
}

export async function getPortfolio() {
  if (!supabase) return noBackend()
  const { data, error } = await supabase.from('portfolio').select('*').eq('is_active', true).order('sort_order')
  if (error) throw error
  return data as PortfolioItem[]
}

export async function getTestimonials() {
  if (!supabase) return noBackend()
  const { data, error } = await supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order')
  if (error) throw error
  return data as Testimonial[]
}

export async function getPricing() {
  if (!supabase) return noBackend()
  const { data, error } = await supabase.from('pricing').select('*').eq('is_active', true).order('sort_order')
  if (error) throw error
  return data as PricingPlan[]
}

export async function getFAQs() {
  if (!supabase) return noBackend()
  const { data, error } = await supabase.from('faq').select('*').eq('is_active', true).order('sort_order')
  if (error) throw error
  return data as FAQ[]
}

// Write operations
export async function submitContact(data: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>) {
  if (!supabase) throw new Error('Backend not available')
  const { error } = await supabase.from('contact_messages').insert(data)
  if (error) throw error
}

export async function subscribeNewsletter(email: string) {
  if (!supabase) throw new Error('Backend not available')
  const { error } = await supabase.from('newsletter').insert({ email })
  if (error) {
    if (error.code === '23505') throw new Error('Already subscribed')
    throw error
  }
}

// Admin operations
export async function getContactMessages() {
  if (!supabase) return []
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as ContactMessage[]
}

export async function getNewsletterSubscribers() {
  if (!supabase) return []
  const { data, error } = await supabase.from('newsletter').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as NewsletterSubscriber[]
}

export async function markContactRead(id: string) {
  if (!supabase) return
  const { error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', id)
  if (error) throw error
}
