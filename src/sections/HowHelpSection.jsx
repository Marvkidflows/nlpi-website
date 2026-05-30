import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHandHoldingHeart, FaUserCheck, FaHospital, FaShareAlt } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { HELP_OPTIONS } from '../data/index.js'

const ICON_MAP = {
  donate:  <FaHandHoldingHeart style={{ fontSize: '1.6rem' }} />,
  sponsor: <FaUserCheck        style={{ fontSize: '1.6rem' }} />,
  partner: <FaHospital         style={{ fontSize: '1.6rem' }} />,
  share:   <FaShareAlt         style={{ fontSize: '1.6rem' }} />,
}

export default function HowHelpSection() {
  return (
    <SectionWrapper bg="gray">
      <Reveal>
        <SectionHeading
          tag="How You Can Help"
          title="HOW YOU CAN HELP"
          subtitle="Every action creates a ripple of change. Choose how you want to make a difference today."
          center
        />
      </Reveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem', marginTop: '3rem',
      }}>
        {HELP_OPTIONS.map((opt, i) => (
          <Reveal key={opt.title} delay={i * 0.1}>
            <Link to={opt.link} style={{ textDecoration: 'none', display: 'block' }}>
              <motion.div
                whileHover={{ y: -8 }}
                style={{
                  background: 'white', borderRadius: 12, padding: '2rem 1.5rem',
                  textAlign: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                  border: '1px solid transparent', transition: 'all 0.3s', height: '100%',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)' }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(11,31,58,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.2rem',
                  color: '#0B1F3A', transition: 'all 0.3s',
                }}
                className="help-icon"
                >
                  {ICON_MAP[opt.iconKey]}
                </div>
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#0B1F3A', marginBottom: '0.5rem' }}>
                  {opt.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.83rem', lineHeight: 1.65, marginBottom: '1.2rem' }}>{opt.desc}</p>
                <span style={{
                  display: 'inline-block', color: '#D4AF37', fontSize: '0.82rem',
                  fontWeight: 600, borderBottom: '1px solid rgba(212,175,55,0.4)', paddingBottom: 2,
                }}>
                  {opt.cta} →
                </span>
              </motion.div>
            </Link>
          </Reveal>
        ))}
      </div>

      <style>{`
        .help-icon:hover, a:hover .help-icon {
          background: #D4AF37 !important;
          color: white !important;
          transform: scale(1.1);
        }
      `}</style>
    </SectionWrapper>
  )
}
