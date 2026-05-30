import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import StoryCard from '../components/StoryCard.jsx'
import Button from '../components/Button.jsx'
import { STORIES } from '../data/index.js'

export default function RecipientStoriesSection() {
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(STORIES.length / perPage)
  const visible = STORIES.slice(page * perPage, page * perPage + perPage)

  return (
    <SectionWrapper bg="white">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '1rem' }}>
        <Reveal>
          <SectionHeading
            tag="Recipient Stories"
            title="REAL PEOPLE. REAL STORIES. REAL TRANSFORMATION."
            subtitle="Every prosthetic is a story of resilience. Meet the people whose lives NLPI has helped restore."
          />
        </Reveal>
        <Reveal delay={0.2}>
          <Button to="/recipients" variant="gold" size="sm">VIEW ALL STORIES</Button>
        </Reveal>
      </div>

      {/* Story cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
      }}>
        {visible.map((s, i) => (
          <StoryCard key={s.id} story={s} index={i} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Reveal delay={0.3}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2.5rem' }}>
            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                width: 42, height: 42, borderRadius: '50%', border: '1.5px solid #D4AF37',
                background: page === 0 ? 'transparent' : '#D4AF37',
                color: page === 0 ? '#D4AF37' : '#0B1F3A',
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: page === 0 ? 0.4 : 1,
              }}
            >
              <FaArrowLeft style={{ fontSize: '0.8rem' }} />
            </motion.button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                style={{
                  width: 10, height: 10, borderRadius: '50%', border: 'none',
                  background: page === i ? '#D4AF37' : '#e5e7eb',
                  cursor: 'pointer', transition: 'all 0.2s',
                  transform: page === i ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}

            <motion.button
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{
                width: 42, height: 42, borderRadius: '50%', border: '1.5px solid #D4AF37',
                background: page === totalPages - 1 ? 'transparent' : '#D4AF37',
                color: page === totalPages - 1 ? '#D4AF37' : '#0B1F3A',
                cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: page === totalPages - 1 ? 0.4 : 1,
              }}
            >
              <FaArrowRight style={{ fontSize: '0.8rem' }} />
            </motion.button>
          </div>
        </Reveal>
      )}
    </SectionWrapper>
  )
}
