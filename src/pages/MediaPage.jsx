import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaExpand } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { getImage, heroVideoSrc, boyVideoSrc } from '../assets/images.js'

const MEDIA_TABS = ['All', 'Videos', 'Photos', 'Rehabilitation']

const MEDIA_ITEMS = [
  { type: 'video', tag: 'Videos',        title: 'First Steps Again',         videoSrc: 'hero',    imgKey: 'leg3' },
  { type: 'video', tag: 'Videos',        title: 'Walking With New Purpose',  videoSrc: 'boy',     imgKey: 'leg1' },
  { type: 'photo', tag: 'Rehabilitation',title: 'Advanced Microprocessor Knee', imgKey: 'leg2' },
  { type: 'photo', tag: 'Photos',        title: 'Technology in Action',      imgKey: 'leg4' },
  { type: 'photo', tag: 'Rehabilitation',title: 'Fitting Session',           imgKey: 'leg5' },
  { type: 'photo', tag: 'Photos',        title: 'Prosthetic Workshop',       imgKey: 'leg8' },
  { type: 'photo', tag: 'Photos',        title: 'Carbon Fibre Prosthetics',  imgKey: 'leg2' },
  { type: 'photo', tag: 'Rehabilitation',title: 'Standing Strong',           imgKey: 'leg6' },
  { type: 'photo', tag: 'Photos',        title: 'Ready to Walk Again',       imgKey: 'leg1' },
]

const VIDEO_SRC_MAP = {
  hero: heroVideoSrc,
  boy:  boyVideoSrc,
}

function MediaCard({ item, index }) {
  const [playing, setPlaying] = useState(false)

  return (
    <Reveal delay={index * 0.07}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        style={{
          position: 'relative', borderRadius: 10, overflow: 'hidden',
          aspectRatio: '16/10', cursor: 'pointer', background: '#111',
        }}
        onClick={() => item.type === 'video' && setPlaying(!playing)}
      >
        {playing && item.type === 'video' ? (
          <video
            autoPlay controls
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={VIDEO_SRC_MAP[item.videoSrc]} type="video/mp4" />
          </video>
        ) : (
          <>
            <img
              src={getImage(item.imgKey)}
              alt={item.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%)' }} />

            {/* Play button for videos */}
            {item.type === 'video' && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'rgba(212,175,55,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#0B1F3A', fontSize: '1rem',
                    boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
                  }}
                >
                  <FaPlay />
                </motion.div>
              </div>
            )}

            {/* Photo expand icon */}
            {item.type === 'photo' && (
              <div style={{
                position: 'absolute', top: 10, right: 10,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '0.75rem', opacity: 0,
                transition: 'opacity 0.2s',
              }}
              className="expand-icon"
              >
                <FaExpand />
              </div>
            )}

            {/* Label */}
            <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
              <span style={{
                display: 'inline-block', background: item.type === 'video' ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                color: item.type === 'video' ? '#0B1F3A' : 'white',
                fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                marginBottom: 4, letterSpacing: '0.08em',
              }}>
                {item.type === 'video' ? '▶  VIDEO' : item.tag.toUpperCase()}
              </span>
              <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>
                {item.title}
              </div>
            </div>
          </>
        )}
      </motion.div>
      <style>{`.expand-icon { opacity: 0; } div:hover .expand-icon { opacity: 1; }`}</style>
    </Reveal>
  )
}

export default function MediaPage() {
  const [tab, setTab] = useState('All')

  const filtered = tab === 'All' ? MEDIA_ITEMS : MEDIA_ITEMS.filter((m) => m.tag === tab || (tab === 'Videos' && m.type === 'video') || (tab === 'Photos' && m.type === 'photo'))

  return (
    <>
      <section style={{ background: '#0B1F3A', paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Home › Media</p>
          <h1 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.5rem,6vw,4rem)', marginBottom: '1rem' }}>
            MEDIA GALLERY
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: 500 }}>
            Stories of hope, transformation, and new beginnings — captured in every frame.
          </p>
        </div>
      </section>

      <SectionWrapper bg="dark" style={{ background: '#111', padding: '4rem 1.5rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {MEDIA_TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.2rem', borderRadius: 100, fontSize: '0.78rem',
              fontFamily: '"League Spartan",sans-serif', fontWeight: 700, cursor: 'pointer',
              border: t === tab ? 'none' : '1px solid rgba(255,255,255,0.2)',
              background: t === tab ? '#D4AF37' : 'transparent',
              color: t === tab ? '#0B1F3A' : 'rgba(255,255,255,0.55)',
              transition: 'all 0.2s',
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filtered.map((item, i) => (
            <MediaCard key={item.title + i} item={item} index={i} />
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
