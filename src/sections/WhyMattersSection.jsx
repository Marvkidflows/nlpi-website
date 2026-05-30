import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaMicrochip, FaArrowRight } from 'react-icons/fa'
import { MdAccessibility } from 'react-icons/md'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import Button from '../components/Button.jsx'
import { getImage } from '../assets/images.js'

const FEATURES = [
  'Restored mobility & independence',
  'Renewed dignity and self-worth',
  'Return to employment',
  'Hope for entire families',
  'Access to advanced technology',
]

// Your real images used as before/after pairs
const GALLERY = [
  { key: 'leg3', caption: 'Microprocessor Knee — Side View' },
  { key: 'leg4', caption: 'Advanced Carbon Fibre Build' },
  { key: 'leg5', caption: 'Full Prosthetic Assembly' },
  { key: 'leg6', caption: 'Patient Wearing Prosthetic' },
]

export default function WhyMattersSection() {
  const [activeImg, setActiveImg] = useState(0)

  return (
    <SectionWrapper bg="gray">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem', alignItems: 'center',
      }}>

        {/* ── Left: Real image showcase ── */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Main image */}
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              height: 380, position: 'relative',
              boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
            }}>
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={getImage(GALLERY[activeImg].key)}
                alt={GALLERY[activeImg].caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Caption bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(11,31,58,0.9), transparent)',
                padding: '1.5rem 1.2rem 1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaMicrochip style={{ color: '#D4AF37', fontSize: '0.85rem' }} />
                  <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600 }}>
                    {GALLERY[activeImg].caption}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
              {GALLERY.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveImg(i)}
                  style={{
                    borderRadius: 8, overflow: 'hidden', height: 72, cursor: 'pointer',
                    border: activeImg === i ? '2.5px solid #D4AF37' : '2.5px solid transparent',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <img src={getImage(item.key)} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              ))}
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{
                background: '#0B1F3A', borderRadius: 12,
                padding: '1rem 1.4rem', display: 'flex',
                alignItems: 'center', gap: '1rem',
                boxShadow: '0 10px 40px rgba(11,31,58,0.2)',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(212,175,55,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MdAccessibility style={{ color: '#D4AF37', fontSize: '1.4rem' }} />
              </div>
              <div>
                <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#D4AF37' }}>$5,000</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>Funds one advanced prosthetic knee</div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* ── Right: Text content ── */}
        <div>
          <Reveal delay={0.1}>
            <SectionHeading
              tag="Why This Matters"
              title="MILLIONS ARE LEFT BEHIND. TOGETHER, WE CHANGE THAT."
              subtitle="Millions of people living with limb loss cannot afford advanced prosthetics. NLPI exists to restore mobility, confidence, independence, and the chance to live life without limits."
            />
          </Reveal>

          <Reveal delay={0.2}>
            <ul style={{ margin: '1.8rem 0 2rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {FEATURES.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: '#4b5563' }}>
                  <FaCheckCircle style={{ color: '#D4AF37', fontSize: '1rem', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Technology highlight */}
          <Reveal delay={0.25}>
            <div style={{
              background: 'white', borderRadius: 12, padding: '1.2rem 1.4rem',
              borderLeft: '4px solid #D4AF37', marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.4rem' }}>
                <FaMicrochip style={{ color: '#D4AF37' }} />
                <span style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#0B1F3A' }}>
                  ADVANCED MICROPROCESSOR TECHNOLOGY
                </span>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.65 }}>
                Our prosthetic knees use computer-controlled microprocessors that adapt to every step — giving recipients natural, confident movement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button to="/mission" variant="gold">OUR MISSION <FaArrowRight style={{ fontSize: '0.75rem' }} /></Button>
              <Button to="/apply" variant="ghost" className="text-navy border-navy/20 border">APPLY FOR SUPPORT</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  )
}
