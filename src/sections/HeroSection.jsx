import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHandHoldingHeart, FaHandshake, FaPlay } from 'react-icons/fa'
import { heroVideoSrc } from '../assets/images.js'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function HeroSection() {
  const [donated, setDonated] = useState(1234560)

  useEffect(() => {
    const t = setInterval(() => {
      setDonated((d) => d + Math.floor(Math.random() * 50 + 10))
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const pct = Math.min((donated / 3000000) * 100, 100).toFixed(1)

  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', background: '#0B1F3A',
    }}>
      {/* ── Real video background ── */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.38, zIndex: 0,
        }}
      >
        <source src={heroVideoSrc} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(11,31,58,0.97) 45%, rgba(11,31,58,0.4) 100%)',
      }} />

      {/* Gold glow orbs */}
      <div style={{ position: 'absolute', top: 80, right: '35%', width: 260, height: 260, borderRadius: '50%', background: 'rgba(212,175,55,0.06)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 80, right: '20%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(212,175,55,0.05)', filter: 'blur(80px)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1280, margin: '0 auto',
        padding: '120px 24px 60px', width: '100%',
      }}>
        <motion.span {...fadeUp(0.3)} style={{
          display: 'block', color: '#D4AF37',
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '1.2rem',
        }}>
          Restoring Mobility · Restoring Lives
        </motion.span>

        <motion.h1 {...fadeUp(0.5)} style={{
          fontFamily: '"League Spartan",sans-serif', fontWeight: 900,
          color: 'white', lineHeight: 1, marginBottom: '1.4rem',
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
        }}>
          HELP 1,000<br />
          <em style={{ fontStyle: 'normal', color: '#D4AF37' }}>PEOPLE WALK</em><br />
          AGAIN
        </motion.h1>

        <motion.p {...fadeUp(0.7)} style={{
          color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
          lineHeight: 1.78, maxWidth: 520, marginBottom: '2rem',
        }}>
          Providing advanced microprocessor-controlled prosthetic knees to restore
          independence, dignity, and mobility worldwide.
        </motion.p>

        <motion.div {...fadeUp(0.9)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2.5rem' }}>
          <Link to="/donate" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#D4AF37', color: '#0B1F3A',
            fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '0.9rem',
            padding: '1rem 2rem', borderRadius: 6, textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#B8941F'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <FaHandHoldingHeart /> DONATE NOW
          </Link>

          <Link to="/partners" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: 'white',
            border: '1.5px solid rgba(255,255,255,0.4)',
            fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '0.9rem',
            padding: '1rem 2rem', borderRadius: 6, textDecoration: 'none', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent' }}
          >
            <FaHandshake /> BECOME A PARTNER
          </Link>

          <Link to="/media" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: 'rgba(255,255,255,0.65)',
            fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '0.9rem',
            padding: '1rem 1.4rem', borderRadius: 6, textDecoration: 'none', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'white'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
          >
            <FaPlay style={{ fontSize: '0.8rem' }} /> WATCH THE STORY
          </Link>
        </motion.div>

        {/* Live progress */}
        <motion.div {...fadeUp(1.1)} style={{ maxWidth: 420 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', marginBottom: '0.5rem' }}>
            <span>RAISED SO FAR: <strong style={{ color: '#D4AF37' }}>${donated.toLocaleString()}</strong></span>
            <span>GOAL: $3,000,000</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 2, delay: 1.5, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg,#D4AF37,#f0cd6a)', borderRadius: 100 }}
            />
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>{pct}%</span> funded · 2,543 people donated
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          style={{
            width: 22, height: 36, borderRadius: 100,
            border: '1.5px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6,
          }}
        >
          <div style={{ width: 4, height: 8, background: '#D4AF37', borderRadius: 100 }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
