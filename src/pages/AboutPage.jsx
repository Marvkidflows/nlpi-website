import React from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaBullseye, FaHeart, FaRocket, FaArrowRight } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import Button from '../components/Button.jsx'
import { FinalCTASection } from '../sections/FounderSection.jsx'
import { getImage } from '../assets/images.js'

const TIMELINE = [
  { year: '2022', event: 'NLPI founded with a mission to restore mobility.' },
  { year: '2023', event: 'Reached 300+ recipients across 15 countries.' },
  { year: '2024', event: 'Launched microprocessor knee programme at 100+ clinics.' },
  { year: '2025', event: 'Targeting 1,000 recipients across 50+ countries.' },
]

const VALUES = [
  { icon: <FaEye />,     title: 'Our Vision',  text: 'A world where every amputee can walk with dignity.' },
  { icon: <FaBullseye />,title: 'Our Mission', text: 'Supply advanced prosthetics and life-changing support.' },
  { icon: <FaHeart />,   title: 'Our Values',  text: 'Compassion, integrity, innovation, equality, excellence.' },
  { icon: <FaRocket />,  title: 'Our Goal',    text: 'Help 1,000 people walk again and transform lives.' },
]

export default function AboutPage() {
  return (
    <>
      <section style={{ background: '#0B1F3A', paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Home › About Us</p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.5rem,6vw,4rem)', marginBottom: '1rem' }}>
            ABOUT NLPI
          </motion.h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: 520 }}>
            A global humanitarian initiative committed to restoring mobility, independence, and empowerment through advanced prosthetic technology.
          </p>
        </div>
      </section>

      {/* Values */}
      <SectionWrapper bg="white">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div style={{ textAlign: 'center', padding: '2rem 1.5rem', background: '#F5F7FA', borderRadius: 12, transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)'; e.currentTarget.style.background = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = '#F5F7FA' }}>
                <div style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '0.8rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.84rem', lineHeight: 1.65 }}>{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', aspectRatio: '16/10' }}>
              <img src={getImage('leg4')} alt="NLPI team at work" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <SectionHeading tag="Our Journey" title="WE BELIEVE MOBILITY IS A RIGHT, NOT A PRIVILEGE." />
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.75, margin: '1.2rem 0 1.8rem' }}>
                NLPI was born from a simple yet powerful belief: that every person, regardless of where they live or how much they earn, deserves the chance to walk. We work with hospitals, NGOs, clinicians, and donors worldwide to make that belief a reality — one step at a time.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Button to="/mission" variant="gold">LEARN MORE ABOUT OUR MISSION <FaArrowRight style={{ fontSize: '0.8rem' }} /></Button>
            </Reveal>
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper bg="gray">
        <Reveal><SectionHeading tag="Our Journey" title="HOW WE GOT HERE" center /></Reveal>
        <div style={{ position: 'relative', maxWidth: 640, margin: '3rem auto 0' }}>
          <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: 'rgba(212,175,55,0.2)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.12}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: '#D4AF37', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, zIndex: 1, boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
                  }}>
                    <span style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: '#0B1F3A', fontSize: '0.78rem' }}>{t.year}</span>
                  </div>
                  <div style={{ paddingTop: '0.9rem' }}>
                    <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.65 }}>{t.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <FinalCTASection />
    </>
  )
}
