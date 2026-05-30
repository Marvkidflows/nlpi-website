import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckSquare, FaSquare, FaHandshake, FaLock, FaArrowRight, FaUpload } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { api } from '../utils/api.js'
import { FinalCTASection } from '../sections/FounderSection.jsx'

const PARTNERSHIP_TYPES = [
  'Financial Sponsorship','Medical Partnership','Prosthetic Manufacturing Support',
  'NGO / Humanitarian Collaboration','Corporate Social Responsibility (CSR)',
  'Fundraising Partnership','Media & Awareness Partnership','Volunteer Partnership',
  'Technology & Innovation Support','Event Sponsorship','Other',
]
const CONTRIBUTIONS = [
  'Financial Contribution','Equipment Donation','Medical Resources','Prosthetic Components',
  'Technical Expertise','Logistics & Distribution','Awareness Campaigns','Training & Education','Other',
]
const ESTIMATED_VALUES = ['$500 – $5,000','$5,000 – $20,000','$20,000 – $100,000','$100,000+','Prefer Private Discussion']
const CONTACT_METHODS = ['Email','Phone Call','WhatsApp','Zoom / Virtual Meeting','Physical Meeting']

function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer', fontSize:'0.88rem', color:'#374151', marginBottom:7 }}>
      <span onClick={onChange} style={{ color: checked ? '#D4AF37' : '#d1d5db', fontSize:'1.1rem', flexShrink:0, marginTop:1 }}>
        {checked ? <FaCheckSquare /> : <FaSquare />}
      </span>
      {label}
    </label>
  )
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom:'1.2rem' }}>
      <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'#374151', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>
        {label}{required && <span style={{ color:'#D4AF37' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8,
  padding:'0.75rem 1rem', fontSize:'0.9rem', outline:'none',
  fontFamily:'Poppins,sans-serif', transition:'border-color 0.2s', background:'white',
}

const cardStyle = {
  background:'white', borderRadius:16, padding:'2rem',
  marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)',
}

const sectionTitle = {
  fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A',
  fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem',
  borderBottom:'2px solid #D4AF37',
}

export default function PartnersPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [activeTab, setActiveTab] = useState('form') // 'form' | 'partners'

  const [form, setForm] = useState({
    fullName:'', organizationName:'', position:'', industry:'', country:'',
    stateCity:'', email:'', phone:'', website:'',
    partnershipTypes:[], contributions:[], estimatedValue:'',
    proposal:'', contactMethod:[],
    consentAccurate:false, consentContact:false,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleArr = (k, v) => setForm(f => ({
    ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v]
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consentAccurate || !form.consentContact) {
      setError('Please accept both consent checkboxes to continue.'); return
    }
    setLoading(true); setError('')
    try {
      const res = await api.submitPartner(form)
      if (res.success) {
        navigate('/payment', { state: { submissionId: res.id, type: 'partner', name: form.fullName } })
      } else {
        setError(res.message || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    }
    setLoading(false)
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background:'#0B1F3A', paddingTop:'8rem', paddingBottom:'4rem', paddingLeft:'1.5rem', paddingRight:'1.5rem' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.75rem', marginBottom:'0.5rem' }}>Home › Partners</p>
          <h1 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:900, color:'white', fontSize:'clamp(2.5rem,6vw,4rem)', marginBottom:'1rem' }}>
            OUR PARTNERS
          </h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', maxWidth:600, lineHeight:1.75 }}>
            Building Global Impact Together. The New Life Prosthetic Initiative welcomes partnerships with organizations, medical institutions, philanthropists, brands, and NGOs.
          </p>

          {/* Tab toggle */}
          <div style={{ display:'flex', gap:'1rem', marginTop:'2rem' }}>
            {[{ id:'form', label:'Apply as Partner' },{ id:'partners', label:'View Partners' }].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding:'0.6rem 1.4rem', borderRadius:6, border:'none', cursor:'pointer',
                fontFamily:'"League Spartan",sans-serif', fontWeight:700, fontSize:'0.85rem',
                background: activeTab === t.id ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                color: activeTab === t.id ? '#0B1F3A' : 'white',
                transition:'all 0.2s',
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </section>

      {activeTab === 'partners' ? (
        /* Existing partners display */
        <SectionWrapper bg="gray">
          <Reveal>
            <SectionHeading tag="Global Network" title="TRUSTED PARTNERS WORLDWIDE" center />
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1.2rem', marginTop:'2rem' }}>
            {['Ottobock','Össur','Red Cross','Hanger Clinic','Rotary International','CBM Global'].map((name, i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div style={{ background:'white', borderRadius:12, padding:'1.5rem', textAlign:'center', boxShadow:'0 2px 15px rgba(0,0,0,0.06)', border:'1px solid #f3f4f6' }}>
                  <div style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:700, color:'#0B1F3A', fontSize:'1rem' }}>{name}</div>
                  <div style={{ color:'#9ca3af', fontSize:'0.72rem', marginTop:4 }}>Partner Organization</div>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionWrapper>
      ) : (
        /* Partnership Form */
        <SectionWrapper bg="gray">
          <div style={{ maxWidth:860, margin:'0 auto' }}>
            <form onSubmit={handleSubmit}>

              {/* Section 1 */}
              <Reveal>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>1. Partner Information</h3>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'0 1.5rem' }}>
                    {[
                      { k:'fullName',         label:'Full Name',            required:true  },
                      { k:'organizationName', label:'Organization / Company Name', required:true  },
                      { k:'position',         label:'Position / Title',     required:false },
                      { k:'industry',         label:'Industry / Sector',    required:false },
                      { k:'country',          label:'Country',              required:true  },
                      { k:'stateCity',        label:'State / City',         required:false },
                      { k:'email',            label:'Email Address',        required:true  },
                      { k:'phone',            label:'Phone / WhatsApp',     required:true  },
                      { k:'website',          label:'Company Website',      required:false },
                    ].map(({ k, label, required }) => (
                      <Field key={k} label={label} required={required}>
                        <input
                          type={k === 'email' ? 'email' : 'text'} required={required}
                          placeholder={label} value={form[k]}
                          onChange={e => set(k, e.target.value)}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = '#D4AF37'}
                          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                        />
                      </Field>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Section 2 */}
              <Reveal delay={0.1}>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>2. Type of Partnership Interest</h3>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'0.2rem 2rem' }}>
                    {PARTNERSHIP_TYPES.map(t => (
                      <Checkbox key={t} label={t} checked={form.partnershipTypes.includes(t)} onChange={() => toggleArr('partnershipTypes', t)} />
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Section 3 */}
              <Reveal delay={0.15}>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>3. Partnership Contribution — How Would You Like To Support?</h3>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'0.2rem 2rem' }}>
                    {CONTRIBUTIONS.map(c => (
                      <Checkbox key={c} label={c} checked={form.contributions.includes(c)} onChange={() => toggleArr('contributions', c)} />
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Section 4 */}
              <Reveal delay={0.2}>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>4. Estimated Partnership Value (Optional)</h3>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'0.8rem' }}>
                    {ESTIMATED_VALUES.map(v => (
                      <motion.button
                        key={v} type="button" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                        onClick={() => set('estimatedValue', v)}
                        style={{
                          padding:'0.8rem', borderRadius:8, border:'2px solid',
                          borderColor: form.estimatedValue === v ? '#D4AF37' : '#e5e7eb',
                          background: form.estimatedValue === v ? '#D4AF37' : 'white',
                          color: form.estimatedValue === v ? '#0B1F3A' : '#6b7280',
                          fontFamily:'"League Spartan",sans-serif', fontWeight:700,
                          fontSize:'0.82rem', cursor:'pointer', transition:'all 0.2s',
                        }}
                      >{v}</motion.button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Section 5 */}
              <Reveal delay={0.25}>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>5. Partnership Goals / Proposal</h3>
                  <Field label="Describe your partnership interest or proposed collaboration">
                    <textarea
                      rows={5} placeholder="Tell us about your partnership goals and how you envision working with NLPI..."
                      value={form.proposal} onChange={e => set('proposal', e.target.value)}
                      style={{ ...inputStyle, resize:'vertical' }}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </Field>
                </div>
              </Reveal>

              {/* Section 6 */}
              <Reveal delay={0.3}>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>6. Preferred Communication Method</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem 2rem' }}>
                    {CONTACT_METHODS.map(m => (
                      <Checkbox key={m} label={m} checked={form.contactMethod.includes(m)} onChange={() => toggleArr('contactMethod', m)} />
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Section 7: Documents */}
              <Reveal delay={0.32}>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>7. Supporting Documents (Optional)</h3>
                  <div style={{
                    border:'2px dashed #e5e7eb', borderRadius:10, padding:'2rem',
                    textAlign:'center', cursor:'pointer',
                    transition:'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                  >
                    <FaUpload style={{ fontSize:'2rem', color:'#D4AF37', marginBottom:'0.8rem' }} />
                    <p style={{ color:'#6b7280', fontSize:'0.85rem', marginBottom:'0.3rem' }}>Click or drag to upload documents</p>
                    <p style={{ color:'#9ca3af', fontSize:'0.72rem' }}>Company Profile, Proposal, Sponsorship Letter, Partnership Deck</p>
                    <p style={{ color:'#9ca3af', fontSize:'0.7rem', marginTop:4 }}>PDF, DOC, PNG — max 10MB</p>
                  </div>
                </div>
              </Reveal>

              {/* Section 8: Consent */}
              <Reveal delay={0.35}>
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>8. Consent & Agreement</h3>
                  <Checkbox
                    label="I confirm that the information provided is accurate."
                    checked={form.consentAccurate} onChange={() => set('consentAccurate', !form.consentAccurate)}
                  />
                  <Checkbox
                    label="I agree to be contacted by the New Life Prosthetic Initiative regarding partnership opportunities."
                    checked={form.consentContact} onChange={() => set('consentContact', !form.consentContact)}
                  />
                </div>
              </Reveal>

              {error && (
                <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, padding:'0.8rem 1rem', marginBottom:'1rem', color:'#dc2626', fontSize:'0.85rem' }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <Reveal delay={0.4}>
                <motion.button
                  type="submit" disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale:0.98 }}
                  style={{
                    width:'100%', background: loading ? '#9ca3af' : '#D4AF37',
                    color:'#0B1F3A', fontFamily:'"League Spartan",sans-serif',
                    fontWeight:900, fontSize:'1.1rem', padding:'1.2rem',
                    borderRadius:10, border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                  }}
                >
                  {loading ? 'Submitting...' : <><FaHandshake /> SUBMIT PARTNERSHIP REQUEST <FaArrowRight /></>}
                </motion.button>
                <p style={{ textAlign:'center', color:'#6b7280', fontSize:'0.78rem', marginTop:'0.8rem', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                  <FaLock style={{ color:'#D4AF37' }} />
                  Together, we can restore movement and dignity to amputees across the world.
                </p>
              </Reveal>
            </form>
          </div>
        </SectionWrapper>
      )}

      <FinalCTASection />
    </>
  )
}
