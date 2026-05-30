import React, { useState } from 'react'
import { FaHospital, FaCamera, FaLaptopCode, FaGlobeAfrica, FaBullhorn, FaGraduationCap, FaCheckCircle } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { FinalCTASection } from '../sections/FounderSection.jsx'

const ROLES = [
  { icon: <FaHospital />,    title: 'Medical Professional',    desc: 'Prosthetists, physiotherapists, surgeons, and nurses joining our clinical network.' },
  { icon: <FaCamera />,      title: 'Storyteller / Filmmaker', desc: 'Photographers and filmmakers documenting recipient journeys worldwide.' },
  { icon: <FaLaptopCode />,  title: 'Tech & Digital Volunteer',desc: 'Web developers, designers, and data analysts supporting NLPI operations.' },
  { icon: <FaGlobeAfrica />, title: 'Field Coordinator',       desc: 'On-the-ground logistics support in partner countries and regions.' },
  { icon: <FaBullhorn />,    title: 'Brand Ambassador',        desc: "Spread NLPI's mission through your network and social platforms." },
  { icon: <FaGraduationCap />,title: 'Research & Policy',      desc: 'Researchers and advocates helping shape our evidence-based approach.' },
]

export default function VolunteerPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' })
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <>
      <section style={{ background: '#0B1F3A', paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Home › Volunteer</p>
          <h1 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.5rem,6vw,4rem)', marginBottom: '1rem' }}>VOLUNTEER</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: 500 }}>
            Lend your skills to restore someone's mobility. Every volunteer makes a difference.
          </p>
        </div>
      </section>

      <SectionWrapper bg="white">
        <Reveal><SectionHeading tag="Get Involved" title="HOW YOU CAN VOLUNTEER" center /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div style={{
                background: '#F5F7FA', borderRadius: 12, padding: '2rem',
                border: '1px solid transparent', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F5F7FA'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '0.8rem' }}>{r.icon}</div>
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#0B1F3A', marginBottom: '0.5rem' }}>{r.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.84rem', lineHeight: 1.65 }}>{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper bg="gray">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Reveal><SectionHeading tag="Apply Now" title="JOIN OUR VOLUNTEER NETWORK" center /></Reveal>
          {sent ? (
            <Reveal delay={0.1}>
              <div style={{ marginTop: '2rem', background: 'white', borderRadius: 16, padding: '3rem', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                <FaCheckCircle style={{ fontSize: '3rem', color: '#D4AF37', marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: '#0B1F3A', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Thank You!</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>We've received your application and will be in touch within 5 business days.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}
                style={{ marginTop: '2rem', background: 'white', borderRadius: 16, padding: '2.5rem', boxShadow: '0 4px 30px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[{ key: 'name', label: 'Full Name', type: 'text', ph: 'Your full name' }, { key: 'email', label: 'Email Address', type: 'email', ph: 'your@email.com' }].map((f) => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.ph} value={form[f.key]} onChange={(e) => update(f.key, e.target.value)}
                      style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role of Interest</label>
                  <select required value={form.role} onChange={(e) => update('role', e.target.value)}
                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.9rem', outline: 'none', background: 'white' }}>
                    <option value="">Select a role</option>
                    {ROLES.map((r) => <option key={r.title}>{r.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tell Us About Yourself</label>
                  <textarea rows={4} placeholder="Your background, skills, and why you want to volunteer..." value={form.message} onChange={(e) => update('message', e.target.value)}
                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.9rem', outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <button type="submit" style={{
                  background: '#D4AF37', color: '#0B1F3A', border: 'none', borderRadius: 8,
                  padding: '1rem', fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
                  fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#B8941F'}
                onMouseLeave={e => e.currentTarget.style.background = '#D4AF37'}>
                  SUBMIT VOLUNTEER APPLICATION
                </button>
              </form>
            </Reveal>
          )}
        </div>
      </SectionWrapper>
      <FinalCTASection />
    </>
  )
}
