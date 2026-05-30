import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MdAccessible, MdPublic, MdFlag, MdFavorite } from 'react-icons/md'

const ICON_MAP = {
  wheelchair: <MdAccessible style={{ fontSize: '2rem', color: '#D4AF37' }} />,
  globe:      <MdPublic     style={{ fontSize: '2rem', color: '#D4AF37' }} />,
  flag:       <MdFlag       style={{ fontSize: '2rem', color: '#D4AF37' }} />,
  heart:      <MdFavorite   style={{ fontSize: '2rem', color: '#D4AF37' }} />,
}

function useCountUp(target, duration = 2200, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    function step(ts) {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(target * eased))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, started])
  return count
}

export default function AnimatedCounter({ num, suffix = '', label, iconKey, delay = 0 }) {
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setStarted(true), delay * 1000)
      return () => clearTimeout(t)
    }
  }, [inView, delay])

  const count = useCountUp(num, 2200, started)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
      style={{
        background: 'white', borderRadius: 12, padding: '2rem 1.5rem',
        textAlign: 'center', boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
        borderTop: '3px solid #D4AF37', cursor: 'default',
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>{ICON_MAP[iconKey]}</div>
      <div style={{
        fontFamily: '"League Spartan",sans-serif', fontWeight: 900,
        fontSize: '3rem', color: '#0B1F3A', lineHeight: 1,
      }}>
        {count.toLocaleString()}
        <span style={{ color: '#D4AF37' }}>{suffix}</span>
      </div>
      <div style={{ color: '#9ca3af', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 500 }}>
        {label}
      </div>
    </motion.div>
  )
}
