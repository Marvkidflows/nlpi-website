import React from 'react'
import { motion } from 'framer-motion'
import { FaMicrochip, FaGlobeAfrica, FaHeart, FaSearch, FaArrowRight } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import Button from '../components/Button.jsx'
import { FinalCTASection } from '../sections/FounderSection.jsx'
import { getImage } from '../assets/images.js'

const PILLARS = [
  { icon: <FaMicrochip />,   title: 'Advanced Technology',  desc: 'We supply microprocessor-controlled prosthetic knees — the gold standard in mobility restoration — to people who could never otherwise afford them.' },
  { icon: <FaGlobeAfrica />, title: 'Global Reach',         desc: 'Operating across 50+ countries on 6 continents, NLPI builds local partnerships with hospitals, NGOs, and clinics to deliver care where it matters most.' },
  { icon: <FaHeart />,       title: 'Human-First Care',     desc: 'Beyond the prosthetic, we provide evaluation, fitting, rehabilitation support, and follow-up care — treating every recipient as a whole person.' },
  { icon: <FaSearch />,      title: 'Full Transparency',    desc: 'We publish impact reports, donation breakdowns, and partner updates so every donor knows exactly how their contribution is being used.' },
]

const COMMITMENTS = [
  'Restore mobility to 1,000 recipients by end of 2025',
  'Expand to 60+ countries within 3 years',
  'Establish 200+ certified fitting clinics globally',
  'Fund microprocessor knees for 100% of eligible applicants',
  'Publish quarterly transparency and impact reports',
]

export default function MissionPage() {
  return (
    <>
      <section style={{ position: 'relative', background: '#0B1F3A', paddingTop: '8rem', paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${getImage('leg5')}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,31,58,0.95), #0B1F3A)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '1rem' }}>Home › Mission & Vision</p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.5rem,7vw,5rem)', lineHeight: 1, marginBottom: '1.5rem' }}>
            OUR MISSION &<br /><em style={{ fontStyle: 'normal', color: '#D4AF37' }}>VISION</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
            Restore mobility, dignity, independence, and hope — for every amputee, everywhere.
          </motion.p>
        </div>
      </section>

      <SectionWrapper bg="white">
        <Reveal>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <span style={{ display: 'block', color: '#D4AF37', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Our Belief</span>
            <h2 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: '#0B1F3A', fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              MOBILITY IS A RIGHT, NOT A PRIVILEGE.
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              More than 57 million people worldwide live with limb loss. The vast majority — in low- and middle-income countries — have no access to the life-changing prosthetic technology that exists today.
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.8 }}>
              NLPI exists to close that gap. Through technology, partnerships, and compassion, we make that belief real — one recipient at a time.
            </p>
          </div>
        </Reveal>
      </SectionWrapper>

      {/* Four pillars */}
      <SectionWrapper bg="gray">
        <Reveal><SectionHeading tag="How We Do It" title="THE FOUR PILLARS OF NLPI" center /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div style={{ background: 'white', borderRadius: 16, padding: '2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '1.8rem', color: '#D4AF37', marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#0B1F3A', marginBottom: '0.6rem' }}>{p.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>

      {/* Commitments */}
      <SectionWrapper bg="navy">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal>
            <SectionHeading tag="Our Commitments" title="WHAT WE PROMISE TO DELIVER" subtitle="Our goals are bold, measurable, and public. We hold ourselves accountable to each one." light />
            <ol style={{ marginTop: '2rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {COMMITMENTS.map((c, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>
                  <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#D4AF37', color: '#0B1F3A', fontWeight: 900, fontFamily: '"League Spartan",sans-serif', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  {c}
                </motion.li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', position: 'relative' }}>
              <img src={getImage('founder')} alt="NLPI mission" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,31,58,0.7) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: '1.3rem', marginBottom: '0.3rem' }}>"Every step is a victory."</div>
                <div style={{ color: '#D4AF37', fontSize: '0.82rem' }}>— Agent Lan Frank, Founder</div>
              </div>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="white">
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <SectionHeading tag="Join The Mission" title="BE PART OF THE CHANGE" subtitle="Every donation, every partnership, every shared story brings us closer to a world where no amputee is left behind." center />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Button to="/donate"   variant="gold" size="lg">DONATE NOW</Button>
              <Button to="/partners" variant="navy" size="lg">PARTNER WITH US</Button>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>

      <FinalCTASection />
    </>
  )
}
