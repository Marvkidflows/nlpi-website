import React from 'react'
import SectionWrapper from '../components/SectionWrapper.jsx'
import AnimatedCounter from '../components/AnimatedCounter.jsx'
import { STATS } from '../data/index.js'

export default function ImpactSection() {
  return (
    <SectionWrapper bg="white" style={{ padding: '64px 24px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
      }}>
        {STATS.map((s, i) => (
          <AnimatedCounter key={s.label} {...s} delay={i * 0.12} />
        ))}
      </div>
    </SectionWrapper>
  )
}
