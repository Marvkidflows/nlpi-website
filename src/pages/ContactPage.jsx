import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn, FaCheckCircle, FaMap, FaPaperPlane } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { FAQ } from '../data/index.js'

export default function ContactPage() {
  const [sent, setSent]       = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const CONTACT_INFO = [
    { icon: <FaEnvelope />,      label: 'Email',   value: 'info@nlpi.org',                    href: 'mailto:info@nlpi.org' },
    { icon: <FaPhone />,         label: 'Phone',   value: '+1 (562) 123-4567',                href: 'tel:+15621234567' },
    { icon: <FaMapMarkerAlt />,  label: 'Address', value: '123 Hope Street, New York, NY 10001', href: null },
  ]

  const SOCIALS = [
    { icon: <FaTwitter />,    label: 'Twitter'  },
    { icon: <FaFacebookF />,  label: 'Facebook' },
    { icon: <FaYoutube />,    label: 'YouTube'  },
    { icon: <FaLinkedinIn />, label: 'LinkedIn' },
  ]

  return (
    <>
      <section style={{ background: '#0B1F3A', paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Home › Contact</p>
          <h1 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.5rem,6vw,4rem)', marginBottom: '1rem' }}>CONTACT US</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: 500 }}>Stay updated with us. Get in touch with our team.</p>
        </div>
      </section>

      <SectionWrapper bg="white">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          {/* Left info */}
          <div>
            <Reveal>
              <SectionHeading tag="Get In Touch" title="WE'D LOVE TO HEAR FROM YOU" subtitle="Whether you want to donate, partner, volunteer, or simply learn more — reach out." />
            </Reveal>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {CONTACT_INFO.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.1}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontSize: '1rem', flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{c.label}</p>
                      {c.href
                        ? <a href={c.href} style={{ color: '#0B1F3A', fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none' }}>{c.value}</a>
                        : <p style={{ color: '#0B1F3A', fontWeight: 500, fontSize: '0.9rem' }}>{c.value}</p>
                      }
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div style={{ marginTop: '2rem' }}>
                <p style={{ fontSize: '0.75rem', fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>FOLLOW US</p>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {SOCIALS.map((s) => (
                    <a key={s.label} href="#" aria-label={s.label} style={{
                      width: 38, height: 38, borderRadius: '50%',
                      border: '1px solid #e5e7eb',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#9ca3af', textDecoration: 'none', fontSize: '0.85rem', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#9ca3af' }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Map placeholder */}
            <Reveal delay={0.5}>
              <div style={{ marginTop: '2rem', height: 180, borderRadius: 12, background: '#F5F7FA', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <FaMap style={{ fontSize: '2.5rem', color: '#d1d5db' }} />
                <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Interactive map loads here</p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: '#F5F7FA', borderRadius: 16, padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                <FaCheckCircle style={{ fontSize: '3.5rem', color: '#D4AF37', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: '#0B1F3A', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ background: '#F5F7FA', borderRadius: 16, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Send a Message</h3>
                {[
                  { key: 'name',    label: 'Your Name',  type: 'text',  ph: 'Full name' },
                  { key: 'email',   label: 'Your Email', type: 'email', ph: 'you@email.com' },
                  { key: 'subject', label: 'Subject',    type: 'text',  ph: 'What is this about?' },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} required value={form[f.key]} onChange={(e) => update(f.key, e.target.value)}
                      style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none', background: 'white', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Your Message</label>
                  <textarea rows={4} placeholder="Write your message..." required value={form.message} onChange={(e) => update('message', e.target.value)}
                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none', resize: 'none', background: 'white', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#D4AF37'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <button type="submit" style={{
                  background: '#D4AF37', color: '#0B1F3A', border: 'none',
                  fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '0.9rem',
                  padding: '0.9rem', borderRadius: 8, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#B8941F'}
                onMouseLeave={e => e.currentTarget.style.background = '#D4AF37'}
                >
                  <FaPaperPlane /> SEND MESSAGE
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper bg="gray">
        <Reveal><SectionHeading tag="FAQ" title="FREQUENTLY ASKED QUESTIONS" center /></Reveal>
        <div style={{ maxWidth: 680, margin: '2.5rem auto 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAQ.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ background: 'white', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}>
                  <span style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', fontSize: '0.9rem' }}>{item.q}</span>
                  <span style={{ color: '#D4AF37', fontSize: '1.3rem', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                    <p style={{ padding: '0 1.25rem 1rem', color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.a}</p>
                  </motion.div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
