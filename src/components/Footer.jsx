import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn, FaChevronRight } from 'react-icons/fa'
import { logoSrc } from '../assets/images.js'

const FOOTER_LINKS = {
  'Quick Links':  ['Home', 'About Us', 'Mission', 'Recipients', 'Partners', 'Media', 'News', 'Contact'],
  'Get Involved': ['Donate', 'Volunteer', 'Partner With Us', 'Apply for Support', 'Fundraise'],
  'Resources':    ['Transparency', 'Impact Reports', 'FAQ', 'Privacy Policy', 'Terms & Conditions'],
}

const SOCIALS = [
  { icon: <FaTwitter />,   label: 'Twitter',  href: '#' },
  { icon: <FaFacebookF />, label: 'Facebook', href: '#' },
  { icon: <FaYoutube />,   label: 'YouTube',  href: '#' },
  { icon: <FaLinkedinIn />,label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0B1F3A', color: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div>
            <img
              src={logoSrc}
              alt="NLPI"
              style={{ height: 64, marginBottom: '1.2rem', mixBlendMode: 'lighten', filter: 'brightness(1.1)' }}
            />
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '1.2rem', maxWidth: 260 }}>
              Restoring Mobility. Restoring Lives.<br />
              Building a better future for amputees worldwide.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
                fontSize: '0.85rem', color: 'white',
                marginBottom: '1.2rem', letterSpacing: '0.08em',
              }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((l) => (
                  <li key={l}>
                    <Link to="#" style={{
                      color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                      fontSize: '0.83rem', display: 'flex', alignItems: 'center', gap: 6,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                    >
                      <FaChevronRight style={{ fontSize: '0.55rem', color: '#D4AF37' }} />
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 10,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            © 2025 New Life Prosthetic Initiative (NLPI). All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            Restoring dignity. Restoring hope. Restoring lives.
          </p>
        </div>
      </div>
    </footer>
  )
}
