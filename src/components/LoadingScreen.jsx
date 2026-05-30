import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(t)
  }, [])

  // Once hidden, render nothing at all so it can't block anything
  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#0B1F3A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'all',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-block',
            background: '#D4AF37', color: '#0B1F3A',
            fontFamily: '"League Spartan",sans-serif', fontWeight: 900,
            fontSize: '1.6rem', padding: '0.4rem 1rem', borderRadius: 6,
            marginBottom: '1.2rem',
          }}>
            NLPI
          </div>
          <h1 style={{
            color: 'white', fontFamily: '"League Spartan",sans-serif',
            fontWeight: 900, fontSize: '1.3rem', letterSpacing: '0.18em',
            marginBottom: '0.4rem',
          }}>
            NEW LIFE PROSTHETIC INITIATIVE
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Restoring Mobility Worldwide
          </p>
        </motion.div>

        {/* Progress bar */}
        <div style={{ marginTop: '3rem', width: 240, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{ height: '100%', background: '#D4AF37', borderRadius: 100 }}
          />
        </div>

        {/* Dots */}
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: 10 }}>
          {[0,1,2,3,4].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37' }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
