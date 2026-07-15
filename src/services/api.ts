import { supabase } from '../lib/supabase'
import type { Service, PortfolioItem, Testimonial, PricingPlan, FAQ, ContactMessage, NewsletterSubscriber } from '../types'

// Public read operations
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data as Service[]
}

export async function getPortfolio() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data as PortfolioItem[]
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data as Testimonial[]
}

export async function getPricing() {
  const { data, error } = await supabase
    .from('pricing')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data as PricingPlan[]
}

export async function getFAQs() {
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data as FAQ[]
}

// Write operations
export async function submitContact(data: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>) {
  const { error } = await supabase.from('contact_messages').insert(data)
  if (error) throw error
}

export async function subscribeNewsletter(email: string) {
  const { error } = await supabase.from('newsletter').insert({ email })
  if (error) {
    if (error.code === '23505') throw new Error('Already subscribed')
    throw error
  }
}

// Admin operations
export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as ContactMessage[]
}

export async function getNewsletterSubscribers() {
  const { data, error } = await supabase
    .from('newsletter')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as NewsletterSubscriber[]
}

export async function markContactRead(id: string) {
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id)
  if (error) throw error
}

export async function adminGetServices() {
  const { data, error } = await supabase.from('services').select('*').order('sort_order')
  if (error) throw error
  return data as Service[]
}

export async function adminUpsertService(record: Partial<Service>) {
  const { error } = await supabase.from('services').upsert(record)
  if (error) throw error
}

export async function adminDeleteService(id: string) {
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
}

export async function adminGetPortfolio() {
  const { data, error } = await supabase.from('portfolio').select('*').order('sort_order')
  if (error) throw error
  return data as PortfolioItem[]
}

export async function adminUpsertPortfolio(record: Partial<PortfolioItem>) {
  const { error } = await supabase.from('portfolio').upsert(record)
  if (error) throw error
}

export async function adminDeletePortfolio(id: string) {
  const { error } = await supabase.from('portfolio').delete().eq('id', id)
  if (error) throw error
}

export async function adminGetTestimonials() {
  const { data, error } = await supabase.from('testimonials').select('*').order('sort_order')
  if (error) throw error
  return data as Testimonial[]
}

export async function adminUpsertTestimonial(record: Partial<Testimonial>) {
  const { error } = await supabase.from('testimonials').upsert(record)
  if (error) throw error
}

export async function adminDeleteTestimonial(id: string) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}

export async function adminGetPricing() {
  const { data, error } = await supabase.from('pricing').select('*').order('sort_order')
  if (error) throw error
  return data as PricingPlan[]
}

export async function adminUpsertPricing(record: Partial<PricingPlan>) {
  const { error } = await supabase.from('pricing').upsert(record)
  if (error) throw error
}

export async function adminDeletePricing(id: string) {
  const { error } = await supabase.from('pricing').delete().eq('id', id)
  if (error) throw error
}

export async function adminGetFAQs() {
  const { data, error } = await supabase.from('faq').select('*').order('sort_order')
  if (error) throw error
  return data as FAQ[]
}

export async function adminUpsertFAQ(record: Partial<FAQ>) {
  const { error } = await supabase.from('faq').upsert(record)
  if (error) throw error
}

export async function adminDeleteFAQ(id: string) {
  const { error } = await supabase.from('faq').delete().eq('id', id)
  if (error) throw error
}
