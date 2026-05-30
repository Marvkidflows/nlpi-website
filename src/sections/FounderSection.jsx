import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaQuoteLeft, FaHandHoldingHeart, FaUsers, FaGlobeAfrica } from 'react-icons/fa'
import SectionWrapper, { Reveal } from '../components/SectionWrapper.jsx'
import Button from '../components/Button.jsx'
import { getImage } from '../assets/images.js'

// ── Founder Section — simple portrait + text layout ──────────────────────────
export function FounderSection() {
  return (
    <SectionWrapper bg="white">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
      }}>

        {/* LEFT — Portrait photo */}
        <Reveal>
          <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto' }}>

            {/* Main portrait */}
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              aspectRatio: '3/4',
              boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
            }}>
              <img
                src={getImage('founder')}
                alt="Agent Lan Frank — Founder of NLPI"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              {/* Subtle bottom gradient */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(11,31,58,0.55), transparent)',
                borderRadius: '0 0 16px 16px',
              }} />
            </div>

            {/* Gold accent ring behind portrait */}
            <div style={{
              position: 'absolute', top: -12, left: -12,
              width: 120, height: 120, borderRadius: '50%',
              border: '2px solid rgba(212,175,55,0.2)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -16, right: -16,
              width: 100, height: 100, borderRadius: '50%',
              background: 'rgba(212,175,55,0.07)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }} />
          </div>
        </Reveal>

        {/* RIGHT — Text content */}
        <div>
          <Reveal delay={0.1}>
            <span style={{
              display: 'block', color: '#D4AF37',
              fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Our Founder
            </span>
            <h2 style={{
              fontFamily: '"League Spartan", sans-serif',
              fontWeight: 900, color: '#0B1F3A',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              lineHeight: 1.05, marginBottom: '0.4rem',
            }}>
              Agent Lan Frank
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.82rem', letterSpacing: '0.1em', marginBottom: '1.8rem' }}>
              Philanthropist · Founder · Visionary
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote style={{
              borderLeft: '4px solid #D4AF37',
              paddingLeft: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              <FaQuoteLeft style={{ color: '#D4AF37', fontSize: '1.1rem', marginBottom: '0.6rem', display: 'block' }} />
              <p style={{
                fontFamily: '"League Spartan", sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.05rem, 2vw, 1.4rem)',
                color: '#0B1F3A',
                lineHeight: 1.45,
                fontStyle: 'italic',
              }}>
                "Mobility should never be a privilege. It is a right — and we will fight
                until every amputee who needs help, gets it."
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.3}>
            <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.78, marginBottom: '1.8rem' }}>
              Agent Lan Frank founded the New Life Prosthetic Initiative after witnessing
              firsthand the devastating impact of limb loss on communities in West Africa
              and South-East Asia. His mission: use technology and global partnerships to
              restore what was taken — mobility, dignity, and hope.
            </p>
          </Reveal>

          {/* Mini stats row */}
          <Reveal delay={0.35}>
            <div style={{
              display: 'flex', gap: '2rem', flexWrap: 'wrap',
              padding: '1.2rem 1.4rem',
              background: '#F5F7FA', borderRadius: 12,
              marginBottom: '2rem',
            }}>
              {[
                { icon: <FaHandHoldingHeart />, val: '1,000+', label: 'Recipients Goal' },
                { icon: <FaGlobeAfrica />,      val: '50+',    label: 'Countries' },
                { icon: <FaUsers />,            val: '300+',   label: 'Partners' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#D4AF37', fontSize: '1.1rem' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#0B1F3A' }}>
                      {s.val}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <Button to="/about" variant="gold">READ FULL STORY</Button>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  )
}

// ── Final CTA Section ─────────────────────────────────────────────────────────
export function FinalCTASection() {
  return (
    <section style={{ position: 'relative', padding: '8rem 1.5rem', overflow: 'hidden' }}>
      {/* Real prosthetic image as background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${getImage('leg2')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,31,58,0.88)' }} />
      {/* Gold glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: 'rgba(212,175,55,0.08)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: 'block', color: '#D4AF37', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '1.2rem' }}
        >
          Take Action Today
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05, marginBottom: '1.2rem' }}
        >
          HELP SOMEONE TAKE THEIR{' '}
          <em style={{ fontStyle: 'normal', color: '#D4AF37' }}>FIRST STEP</em> AGAIN
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}
        >
          Your support today restores someone's ability to walk, work, and live with dignity.
          Every step forward begins with you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}
        >
          {[
            { to: '/donate',    label: 'DONATE NOW',      primary: true  },
            { to: '/volunteer', label: 'VOLUNTEER',        primary: false },
            { to: '/partners',  label: 'PARTNER WITH US', primary: false },
          ].map((btn) => (
            <Link
              key={btn.to}
              to={btn.to}
              style={{
                fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
                fontSize: '0.9rem', padding: '1rem 2.2rem',
                borderRadius: 6, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
                background: btn.primary ? '#D4AF37' : 'transparent',
                color: btn.primary ? '#0B1F3A' : 'white',
                border: btn.primary ? 'none' : '1.5px solid rgba(255,255,255,0.35)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {btn.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
