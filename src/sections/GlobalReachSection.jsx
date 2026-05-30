import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { MAP_MARKERS } from '../data/index.js'

const MAP_STATS = [
  { num: '50+',  label: 'Countries Served' },
  { num: '200+', label: 'Partner Clinics' },
  { num: '150+', label: 'Hospital Partners' },
  { num: '300+', label: 'NGO Collaborators' },
]

function LeafletMap() {
  const mapRef      = useRef(null)
  const instanceRef = useRef(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        const Lmod = await import('leaflet')
        const L = Lmod.default || Lmod
        if (!mounted || !mapRef.current || instanceRef.current) return

        instanceRef.current = L.map(mapRef.current, {
          center: [15, 20],
          zoom: 2,
          zoomControl: false,
          scrollWheelZoom: false,
          attributionControl: false,
          dragging: true,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 10 })
          .addTo(instanceRef.current)

        MAP_MARKERS.forEach(({ lat, lng, country, recipients }) => {
          const icon = L.divIcon({
            html: `<div style="width:12px;height:12px;background:#D4AF37;border-radius:50%;border:2.5px solid #fff;box-shadow:0 0 0 5px rgba(212,175,55,0.25);"></div>`,
            iconSize: [12, 12],
            className: '',
          })
          L.marker([lat, lng], { icon })
            .addTo(instanceRef.current)
            .bindPopup(
              `<b style="color:#0B1F3A;font-family:Poppins,sans-serif;font-size:13px">${country}</b><br/><span style="color:#888;font-size:12px">${recipients} Recipients</span>`,
              { maxWidth: 160 }
            )
        })
      } catch (e) {
        console.warn('Leaflet error:', e)
        if (mounted) setError(true)
      }
    }

    init()
    return () => {
      mounted = false
      if (instanceRef.current) {
        try { instanceRef.current.remove() } catch (_) {}
        instanceRef.current = null
      }
    }
  }, [])

  if (error) {
    return (
      <div style={{
        height: 380, borderRadius: 12,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(212,175,55,0.2)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 16, padding: 24,
      }}>
        <span style={{ fontSize: '2.5rem', color: '#D4AF37' }}><svg viewBox='0 0 24 24' fill='currentColor' width='40' height='40'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg></span>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Global coverage across 50+ countries</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {MAP_MARKERS.map((m) => (
            <span key={m.country} style={{
              background: 'rgba(212,175,55,0.1)', color: '#D4AF37',
              fontSize: '0.68rem', padding: '3px 10px', borderRadius: 100,
            }}>
              {m.country} · {m.recipients}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={mapRef}
      style={{
        height: 380, width: '100%',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        background: '#0d2744',
      }}
    />
  )
}

export default function GlobalReachSection() {
  return (
    <SectionWrapper bg="navy">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '3rem',
        alignItems: 'start',
      }}>
        {/* Left */}
        <div>
          <Reveal>
            <SectionHeading
              tag="Global Outreach"
              title="OUR GLOBAL REACH"
              subtitle="From Nigeria to Vietnam, Colombia to Australia — NLPI is building a world where no amputee is left behind."
              light
            />
          </Reveal>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '1rem', marginTop: '2rem',
          }}>
            {MAP_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 10, padding: '1rem', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#D4AF37' }}>
                    {s.num}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginTop: '1.5rem' }}>
              Click any marker on the map to see country details.
            </p>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.2}>
          <LeafletMap />
        </Reveal>
      </div>
    </SectionWrapper>
  )
}
