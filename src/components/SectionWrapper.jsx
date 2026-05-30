import React from 'react'
import { motion } from 'framer-motion'

const BG = {
  white: { background: '#ffffff' },
  gray:  { background: '#F5F7FA' },
  navy:  { background: '#0B1F3A' },
  dark:  { background: '#111111' },
}

/**
 * SectionWrapper — consistent section padding + background
 */
export default function SectionWrapper({ children, bg = 'white', className = '', id, style = {} }) {
  return (
    <section
      id={id}
      className={className}
      style={{
        padding: '96px 24px',
        ...BG[bg],
        ...style,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

/** Animated reveal — fades + slides up on scroll into view */
export function Reveal({ children, delay = 0, className = '', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/** Reusable section heading block */
export function SectionHeading({ tag, title, subtitle, light = false, center = false }) {
  const textAlign = center ? 'center' : 'left'
  return (
    <div style={{ textAlign }}>
      {tag && (
        <span style={{
          display: 'block', color: '#D4AF37',
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          marginBottom: '0.8rem',
        }}>
          {tag}
        </span>
      )}
      <h2 style={{
        fontFamily: '"League Spartan", sans-serif',
        fontWeight: 900,
        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
        color: light ? '#ffffff' : '#0B1F3A',
        lineHeight: 1.1,
        marginBottom: '1rem',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: '0.95rem',
          lineHeight: 1.75,
          color: light ? 'rgba(255,255,255,0.6)' : '#6b7280',
          maxWidth: 540,
          margin: center ? '0 auto' : undefined,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
