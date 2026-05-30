import React from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaMapMarkerAlt } from 'react-icons/fa'
import { getImage } from '../assets/images.js'

export default function StoryCard({ story, index = 0 }) {
  const { name, country, flag, imgKey, story: text, progress } = story

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      style={{
        background: 'white', borderRadius: 12, overflow: 'hidden',
        boxShadow: '0 6px 40px rgba(0,0,0,0.08)', cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 240 }}>
        <img
          src={getImage(imgKey)}
          alt={`${name} from ${country}`}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,31,58,0.7) 0%, transparent 60%)' }} />

        {/* Country badge */}
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: '1.2rem' }}>{flag}</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}>
            <FaMapMarkerAlt style={{ fontSize: '0.65rem', color: '#D4AF37' }} /> {country}
          </span>
        </div>

        {/* Play icon */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(212,175,55,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0B1F3A', fontSize: '0.8rem',
          opacity: 0, transition: 'opacity 0.2s',
        }}
        className="story-play"
        >
          <FaPlay />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.4rem' }}>
        <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#0B1F3A', marginBottom: '0.4rem' }}>
          {name}
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.84rem', lineHeight: 1.65, marginBottom: '1rem' }}>{text}</p>

        {/* Progress bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#9ca3af', marginBottom: 6 }}>
            <span>Recovery Progress</span>
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>{progress}%</span>
          </div>
          <div style={{ height: 5, background: '#f3f4f6', borderRadius: 100, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{ height: '100%', background: 'linear-gradient(90deg,#D4AF37,#f0cd6a)', borderRadius: 100 }}
            />
          </div>
        </div>
      </div>

      <style>{`.story-play { opacity: 0; } article:hover .story-play { opacity: 1; }`}</style>
    </motion.article>
  )
}
