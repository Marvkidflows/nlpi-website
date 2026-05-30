import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaLock, FaGlobeAfrica, FaClipboardList } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import Button from '../components/Button.jsx'

const BREAKDOWN = [
  { label: 'Prosthetic Procurement & Fitting', pct: 85 },
  { label: 'Logistics & Operations',           pct: 10 },
  { label: 'Administration & Reporting',       pct: 5  },
]

const IMPACT_AMOUNTS = [
  { amount: '$100',   desc: 'Covers a prosthetic evaluation' },
  { amount: '$250',   desc: 'Supports one patient for a month' },
  { amount: '$500',   desc: 'Funds custom prosthetic fitting' },
  { amount: '$5,000', desc: 'Funds one advanced prosthetic knee' },
]

const TRUST_BADGES = [
  { icon: <FaCheckCircle />, label: 'Registered Foundation' },
  { icon: <FaLock />,        label: 'Secure Donations' },
  { icon: <FaGlobeAfrica />, label: 'International NGO' },
  { icon: <FaClipboardList />,label: 'Audited Annually' },
]

export default function TransparencySection() {
  return (
    <SectionWrapper bg="navy">
      {/* Trust badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
        {TRUST_BADGES.map((b) => (
          <div key={b.label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 8, padding: '0.6rem 1.2rem',
            color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem',
          }}>
            <span style={{ color: '#D4AF37', fontSize: '0.9rem' }}>{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        {/* Left */}
        <div>
          <Reveal>
            <SectionHeading tag="Transparency Hub" title="WHERE YOUR MONEY GOES" subtitle="We believe every donor deserves to know exactly how their contribution makes an impact." light />
          </Reveal>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {BREAKDOWN.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.12}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                    <span>{b.label}</span>
                    <span style={{ color: '#D4AF37', fontWeight: 600 }}>{b.pct}%</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.1 }}
                      style={{ height: '100%', background: 'linear-gradient(90deg,#D4AF37,#f0cd6a)', borderRadius: 100 }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Button to="/transparency" variant="gold">VIEW FULL REPORTS</Button>
              <Button to="/donate"       variant="outline">DONATE NOW</Button>
            </div>
          </Reveal>
        </div>

        {/* Right — impact calculator */}
        <div>
          <Reveal delay={0.2}>
            <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: 'white', fontSize: '1.2rem', marginBottom: '1.2rem' }}>
              YOUR IMPACT
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.2rem' }}>
              {IMPACT_AMOUNTS.map((item, i) => (
                <motion.div
                  key={item.amount}
                  whileHover={{ scale: 1.04 }}
                  style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, padding: '1.2rem', textAlign: 'center', cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#D4AF37', marginBottom: 4 }}>{item.amount}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', lineHeight: 1.5 }}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, padding: '1.2rem' }}>
              <div style={{ color: '#D4AF37', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', marginBottom: '0.6rem' }}>CAMPAIGN PROGRESS</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', marginBottom: '0.6rem' }}>
                <span>$1,234,560 raised</span><span>Goal: $3,000,000</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: '41%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.6 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg,#D4AF37,#f0cd6a)', borderRadius: 100 }}
                />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', marginTop: 6 }}>41% of goal · 2,543 donors</div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  )
}
