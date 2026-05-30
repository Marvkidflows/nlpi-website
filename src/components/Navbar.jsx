import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaHeart } from 'react-icons/fa'
import { NAV_LINKS } from '../data/index.js'
import { logoSrc } from '../assets/images.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '0.6rem 2rem' : '1rem 2rem',
        background: scrolled ? 'rgba(11,31,58,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src={logoSrc}
            alt="New Life Prosthetic Initiative"
            style={{
              height: 52, width: 'auto', objectFit: 'contain',
              mixBlendMode: 'lighten',
              filter: 'brightness(1.1)',
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: '1.8rem',
          listStyle: 'none', margin: 0, padding: 0,
        }} className="hide-mobile">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} style={{
                color: pathname === link.to ? '#D4AF37' : 'rgba(255,255,255,0.82)',
                textDecoration: 'none', fontSize: '0.75rem',
                letterSpacing: '0.06em', fontWeight: 500,
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#D4AF37'}
              onMouseLeave={e => e.target.style.color = pathname === link.to ? '#D4AF37' : 'rgba(255,255,255,0.82)'}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hide-mobile">
          <Link to="/apply" style={{
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: '0.75rem', letterSpacing: '0.05em',
            transition: 'color 0.2s',
          }}>
            Apply for Support
          </Link>
          <Link to="/donate" style={{
            background: '#D4AF37', color: '#0B1F3A',
            fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
            fontSize: '0.82rem', padding: '0.6rem 1.4rem',
            borderRadius: 5, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 6,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#B8941F'; e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <FaHeart style={{ fontSize: "0.75rem" }} /> DONATE NOW
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'white', fontSize: '1.3rem', padding: 6,
            display: 'none',
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: 300,
                background: '#0B1F3A', zIndex: 50,
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{
                padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <img src={logoSrc} alt="NLPI" style={{ height: 40, mixBlendMode: 'lighten' }} />
                <button onClick={() => setMenuOpen(false)} style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
                  fontSize: '1.2rem', cursor: 'pointer',
                }}>
                  <FaTimes />
                </button>
              </div>

              <nav style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link to={link.to} style={{
                      display: 'block', padding: '0.8rem 1rem', borderRadius: 6,
                      textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                      color: pathname === link.to ? '#D4AF37' : 'rgba(255,255,255,0.8)',
                      background: pathname === link.to ? 'rgba(212,175,55,0.1)' : 'transparent',
                      transition: 'all 0.2s',
                    }}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link to="/apply" style={{
                    display: 'block', textAlign: 'center', padding: '0.8rem',
                    border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6,
                    color: 'white', textDecoration: 'none', fontSize: '0.85rem',
                  }}>
                    Apply for Support
                  </Link>
                  <Link to="/donate" style={{
                    display: 'block', textAlign: 'center', padding: '0.8rem',
                    background: '#D4AF37', color: '#0B1F3A',
                    fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
                    borderRadius: 6, textDecoration: 'none', fontSize: '0.9rem',
                  }}>
                    DONATE NOW
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
