import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaLock, FaGlobeAfrica, FaClipboardList, FaChartBar, FaChartLine, FaDownload } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { FinalCTASection } from '../sections/FounderSection.jsx'

const BREAKDOWN = [
  { label: 'Prosthetic Procurement & Fitting', pct: 85, color: '#D4AF37' },
  { label: 'Logistics & Operations',           pct: 10, color: '#4A90D9' },
  { label: 'Administration & Reporting',       pct: 5,  color: '#7ED321' },
]

const REPORTS = [
  { year: '2024', label: 'Annual Impact Report', size: '2.4 MB', icon: <FaChartBar style={{ fontSize: '1.4rem', color: '#D4AF37' }} /> },
  { year: '2024', label: 'Q4 Financial Report',  size: '1.1 MB', icon: <FaChartLine style={{ fontSize: '1.4rem', color: '#D4AF37' }} /> },
  { year: '2024', label: 'Q3 Financial Report',  size: '980 KB', icon: <FaChartLine style={{ fontSize: '1.4rem', color: '#D4AF37' }} /> },
  { year: '2023', label: 'Annual Impact Report', size: '2.1 MB', icon: <FaChartBar style={{ fontSize: '1.4rem', color: '#D4AF37' }} /> },
]

const BADGES = [
  { icon: <FaCheckCircle  style={{ fontSize: '1.2rem', color: '#D4AF37' }} />, label: 'Registered Foundation' },
  { icon: <FaLock         style={{ fontSize: '1.2rem', color: '#D4AF37' }} />, label: 'Secure Donation Processing' },
  { icon: <FaGlobeAfrica  style={{ fontSize: '1.2rem', color: '#D4AF37' }} />, label: 'International NGO Status' },
  { icon: <FaClipboardList style={{ fontSize: '1.2rem', color: '#D4AF37' }} />, label: 'Audited Annually' },
]

export default function TransparencyPage() {
  const pct = ((1234560 / 3000000) * 100).toFixed(1)

  return (
    <>
      <section style={{ background: '#0B1F3A', paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Home › Transparency Hub</p>
          <h1 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.5rem,6vw,4rem)', marginBottom: '1rem' }}>TRANSPARENCY HUB</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: 500 }}>
            We believe in full accountability. Every dollar tracked. Every impact reported.
          </p>
        </div>
      </section>

      {/* Trust badges */}
      <SectionWrapper bg="white" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {BADGES.map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#F5F7FA', borderRadius: 10, padding: '1rem 1.2rem',
                border: '1px solid rgba(212,175,55,0.15)',
              }}>
                {b.icon}
                <span style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 600, color: '#0B1F3A', fontSize: '0.85rem' }}>{b.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Fund breakdown */}
      <SectionWrapper bg="gray">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal>
            <SectionHeading tag="Fund Breakdown" title="WHERE YOUR MONEY GOES" subtitle="Every donation is allocated with precision and full transparency." />
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {BREAKDOWN.map((b, i) => (
                <div key={b.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4b5563', marginBottom: '0.5rem' }}>
                    <span>{b.label}</span>
                    <span style={{ fontWeight: 700, color: b.color }}>{b.pct}%</span>
                  </div>
                  <div style={{ height: 10, background: '#e5e7eb', borderRadius: 100, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }} viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.15 }}
                      style={{ height: '100%', borderRadius: 100, background: b.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {BREAKDOWN.map((b) => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#6b7280' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: b.color }} />
                  {b.pct}% — {b.label.split(' ')[0]}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ background: '#0B1F3A', borderRadius: 20, padding: '2rem', color: 'white' }}>
              <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.2rem' }}>CAMPAIGN PROGRESS</h3>
              <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, fontSize: '2.5rem', color: '#D4AF37', marginBottom: '0.3rem' }}>$1,234,560</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginBottom: '1rem' }}>raised of $3,000,000 goal</div>
              <div style={{ height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden', marginBottom: '0.5rem' }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg,#D4AF37,#f0cd6a)', borderRadius: 100 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginBottom: '1.5rem' }}>
                <span>{pct}% funded</span><span>2,543 donors worldwide</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[{ label:'Recipients Fitted', value:'543' }, { label:'Countries Active', value:'50+' }, { label:'Partner Clinics', value:'200+' }, { label:'Avg Cost / Knee', value:'$5,000' }].map((s) => (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '0.875rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: '#D4AF37', fontSize: '1.3rem' }}>{s.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      {/* Reports */}
      <SectionWrapper bg="white">
        <Reveal>
          <SectionHeading tag="Downloads" title="IMPACT REPORTS & FINANCIALS" />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          {REPORTS.map((r, i) => (
            <Reveal key={r.label + r.year} delay={i * 0.08}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.2rem 1.4rem', background: '#F5F7FA', borderRadius: 12,
                border: '1px solid #f3f4f6', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {r.icon}
                  <div>
                    <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', fontSize: '0.9rem' }}>{r.year} {r.label}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.72rem' }}>{r.size}</div>
                  </div>
                </div>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.75rem', fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
                  color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)',
                  padding: '0.5rem 1rem', borderRadius: 6, cursor: 'pointer', background: 'white',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#0B1F3A' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#D4AF37' }}
                >
                  <FaDownload style={{ fontSize: '0.7rem' }} /> DOWNLOAD
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      <FinalCTASection />
    </>
  )
}
