import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCalendarAlt, FaTag } from 'react-icons/fa'
import { getImage } from '../assets/images.js'

const CATEGORY_STYLES = {
  Story:  { bg: '#eff6ff', color: '#1d4ed8' },
  News:   { bg: '#f0fdf4', color: '#15803d' },
  Event:  { bg: '#faf5ff', color: '#7e22ce' },
  Impact: { bg: '#fefce8', color: '#a16207' },
}

export default function NewsCard({ article, index = 0 }) {
  const { date, title, category, imgKey, excerpt } = article
  const catStyle = CATEGORY_STYLES[category] || { bg: '#f3f4f6', color: '#374151' }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: 'white', borderRadius: 12, overflow: 'hidden',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        border: '1px solid #f3f4f6', cursor: 'pointer',
        transition: 'all 0.3s',
      }}
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
    >
      <div style={{ overflow: 'hidden', height: 180 }}>
        <img
          src={getImage(imgKey)}
          alt={title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 600, padding: '3px 10px',
            borderRadius: 100, background: catStyle.bg, color: catStyle.color,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <FaTag style={{ fontSize: '0.55rem' }} /> {category}
          </span>
          <span style={{ fontSize: '0.68rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4 }}>
            <FaCalendarAlt style={{ fontSize: '0.6rem' }} /> {date}
          </span>
        </div>
        <h3 style={{
          fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
          fontSize: '1rem', color: '#0B1F3A', marginBottom: '0.5rem', lineHeight: 1.3,
        }}>
          {title}
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '1rem' }}>{excerpt}</p>
        <span style={{
          color: '#D4AF37', fontSize: '0.8rem', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          Read More <FaArrowRight style={{ fontSize: '0.7rem' }} />
        </span>
      </div>
    </motion.article>
  )
}
