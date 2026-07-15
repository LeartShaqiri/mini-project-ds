import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { submitContact } from '../../services/api'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitContact(form)
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Amazing"
          description="Have a project in mind? Reach out and we'll get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6 mb-10">
              {[
                { icon: Mail, title: 'Email', value: 'hello@novastudio.ai' },
                { icon: MapPin, title: 'Location', value: 'San Francisco, CA' },
                { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nova-purple/10 border border-nova-purple/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-nova-purple" />
                  </div>
                  <div>
                    <h4 className="text-sm text-nova-gray mb-1">{item.title}</h4>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6">
              <h4 className="font-semibold mb-3">Office Hours</h4>
              <div className="space-y-2 text-sm text-nova-gray">
                <p>Monday – Friday: 9:00 AM – 7:00 PM PST</p>
                <p>Saturday: 10:00 AM – 4:00 PM PST</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-nova-gray mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-nova-gray focus:outline-none focus:border-nova-purple/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-nova-gray mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-nova-gray focus:outline-none focus:border-nova-purple/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-nova-gray mb-2">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-nova-gray focus:outline-none focus:border-nova-purple/50 transition-colors"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label className="block text-sm text-nova-gray mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-nova-gray focus:outline-none focus:border-nova-purple/50 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              icon={status === 'sent' ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              disabled={status === 'sending' || status === 'sent'}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : status === 'error' ? 'Error — Try Again' : 'Send Message'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
