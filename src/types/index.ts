export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  created_at: string
  updated_at: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  link_url?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar_url?: string
  rating: number
  created_at: string
  updated_at: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  currency: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
  cta_text: string
  created_at: string
  updated_at: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  is_active: boolean
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface NavLink {
  label: string
  href: string
}
