import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckSquare, FaSquare, FaHandHoldingHeart, FaLock, FaArrowRight } from 'react-icons/fa'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import { api } from '../utils/api.js'

const DONATION_TYPES = [
  'Make a One-Time Donation','Become a Monthly Donor','Sponsor a Prosthetic Limb',
  'Partner as an Organization','Support Fundraising Campaigns','Volunteer Support',
  'Corporate Sponsorship','Other',
]
const AMOUNT_RANGES = ['$50 – $100','$100 – $500','$500 – $1,000','$1,000 – $5,000','$5,000+']
const SUPPORT_AREAS = [
  'Prosthetic Knee Manufacturing','Amputee Rehabilitation Support','Mobility Assistance Programs',
  'Medical Outreach Programs','Children & Youth Support','Emergency Prosthetic Assistance',
  'Global Awareness Campaigns','General Support Fund',
]
const CONTACT_METHODS = ['Email','Phone Call','WhatsApp','Zoom / Virtual Meeting']

function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontSize:'0.88rem', color:'#374151', marginBottom:6 }}>
      <span onClick={onChange} style={{ color: checked ? '#D4AF37' : '#d1d5db', fontSize:'1.1rem', flexShrink:0 }}>
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
  fontFamily:'Poppins,sans-serif', transition:'border-color 0.2s',
  background:'white',
}

export default function DonatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const [form, setForm] = useState({
    fullName:'', organizationName:'', position:'', country:'', stateCity:'',
    email:'', phone:'', website:'',
    donationTypes:[], amountRange:'', customAmount:'',
    supportAreas:[], message:'', contactMethod:[],
    consentContact: false, consentPrivacy: false,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleArr = (k, v) => setForm(f => ({
    ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v]
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consentContact || !form.consentPrivacy) {
      setError('Please accept both consent checkboxes to continue.'); return
    }
    setLoading(true); setError('')
    try {
      const res = await api.submitDonation(form)
      if (res.success) {
        navigate('/payment', { state: { submissionId: res.id, type: 'donation', name: form.fullName } })
      } else {
        setError(res.message || 'Submission failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection.')
    }
    setLoading(false)
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background:'#0B1F3A', paddingTop:'8rem', paddingBottom:'4rem', paddingLeft:'1.5rem', paddingRight:'1.5rem' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.75rem', marginBottom:'0.5rem' }}>Home › Donate</p>
          <h1 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:900, color:'white', fontSize:'clamp(2.5rem,6vw,4rem)', marginBottom:'1rem' }}>
            DONOR SUPPORT FORM
          </h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', maxWidth:600, lineHeight:1.75 }}>
            Together, We Can Help Amputees Walk Again. Complete the form below to explore donation and partnership opportunities.
          </p>
        </div>
      </section>

      <SectionWrapper bg="gray">
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <form onSubmit={handleSubmit}>

            {/* ── Section 1: Personal Info ── */}
            <Reveal>
              <div style={{ background:'white', borderRadius:16, padding:'2rem', marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'2px solid #D4AF37' }}>
                  1. Personal / Organization Information
                </h3>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'0 1.5rem' }}>
                  {[
                    { k:'fullName',         label:'Full Name',                    required:true  },
                    { k:'organizationName', label:'Organization / Company Name',  required:false },
                    { k:'position',         label:'Position / Title',             required:false },
                    { k:'country',          label:'Country',                      required:true  },
                    { k:'stateCity',        label:'State / City',                 required:false },
                    { k:'email',            label:'Email Address',                required:true  },
                    { k:'phone',            label:'Phone Number / WhatsApp',      required:true  },
                    { k:'website',          label:'Website or Social Media',      required:false },
                  ].map(({ k, label, required }) => (
                    <Field key={k} label={label} required={required}>
                      <input
                        type={k === 'email' ? 'email' : 'text'}
                        required={required}
                        placeholder={label}
                        value={form[k]}
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

            {/* ── Section 2: Donation Interest ── */}
            <Reveal delay={0.1}>
              <div style={{ background:'white', borderRadius:16, padding:'2rem', marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'2px solid #D4AF37' }}>
                  2. Donation Interest — I Would Like To:
                </h3>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'0.2rem 2rem' }}>
                  {DONATION_TYPES.map(t => (
                    <Checkbox key={t} label={t} checked={form.donationTypes.includes(t)} onChange={() => toggleArr('donationTypes', t)} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Section 3: Donation Amount ── */}
            <Reveal delay={0.15}>
              <div style={{ background:'white', borderRadius:16, padding:'2rem', marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'2px solid #D4AF37' }}>
                  3. Preferred Donation Amount
                </h3>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'0.8rem', marginBottom:'1.2rem' }}>
                  {AMOUNT_RANGES.map(r => (
                    <motion.button
                      key={r} type="button" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                      onClick={() => set('amountRange', r)}
                      style={{
                        padding:'0.8rem', borderRadius:8, border:'2px solid',
                        borderColor: form.amountRange === r ? '#D4AF37' : '#e5e7eb',
                        background: form.amountRange === r ? '#D4AF37' : 'white',
                        color: form.amountRange === r ? '#0B1F3A' : '#6b7280',
                        fontFamily:'"League Spartan",sans-serif', fontWeight:700,
                        fontSize:'0.85rem', cursor:'pointer', transition:'all 0.2s',
                      }}
                    >{r}</motion.button>
                  ))}
                </div>
                <Field label="Custom Amount ($)">
                  <input
                    type="number" placeholder="Enter custom amount in USD"
                    value={form.customAmount} onChange={e => set('customAmount', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#D4AF37'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </Field>
              </div>
            </Reveal>

            {/* ── Section 4: Support Areas ── */}
            <Reveal delay={0.2}>
              <div style={{ background:'white', borderRadius:16, padding:'2rem', marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'2px solid #D4AF37' }}>
                  4. Areas You Would Like To Support
                </h3>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'0.2rem 2rem' }}>
                  {SUPPORT_AREAS.map(a => (
                    <Checkbox key={a} label={a} checked={form.supportAreas.includes(a)} onChange={() => toggleArr('supportAreas', a)} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Section 5: Message ── */}
            <Reveal delay={0.25}>
              <div style={{ background:'white', borderRadius:16, padding:'2rem', marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'2px solid #D4AF37' }}>
                  5. Message / Partnership Interest
                </h3>
                <Field label="Please share why you would like to support or partner with NLPI">
                  <textarea
                    rows={5} placeholder="Tell us about your motivation to support this mission..."
                    value={form.message} onChange={e => set('message', e.target.value)}
                    style={{ ...inputStyle, resize:'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#D4AF37'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </Field>
              </div>
            </Reveal>

            {/* ── Section 6: Contact Method ── */}
            <Reveal delay={0.3}>
              <div style={{ background:'white', borderRadius:16, padding:'2rem', marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'2px solid #D4AF37' }}>
                  6. Preferred Contact Method
                </h3>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem 2rem' }}>
                  {CONTACT_METHODS.map(m => (
                    <Checkbox key={m} label={m} checked={form.contactMethod.includes(m)} onChange={() => toggleArr('contactMethod', m)} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Section 7: Consent ── */}
            <Reveal delay={0.35}>
              <div style={{ background:'white', borderRadius:16, padding:'2rem', marginBottom:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'2px solid #D4AF37' }}>
                  7. Consent & Agreement
                </h3>
                <Checkbox
                  label="I agree to be contacted by the New Life Prosthetic Initiative regarding donation and partnership opportunities."
                  checked={form.consentContact}
                  onChange={() => set('consentContact', !form.consentContact)}
                />
                <Checkbox
                  label="I understand that my information will remain confidential and used solely for communication related to humanitarian support initiatives."
                  checked={form.consentPrivacy}
                  onChange={() => set('consentPrivacy', !form.consentPrivacy)}
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
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width:'100%', background: loading ? '#9ca3af' : '#D4AF37',
                  color:'#0B1F3A', fontFamily:'"League Spartan",sans-serif',
                  fontWeight:900, fontSize:'1.1rem', padding:'1.2rem',
                  borderRadius:10, border:'none', cursor: loading ? 'not-allowed' : 'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                  transition:'all 0.2s',
                }}
              >
                {loading ? (
                  <>Submitting...</>
                ) : (
                  <><FaHandHoldingHeart /> SUBMIT DONATION INTEREST <FaArrowRight /></>
                )}
              </motion.button>
              <p style={{ textAlign:'center', color:'#6b7280', fontSize:'0.78rem', marginTop:'0.8rem', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <FaLock style={{ color:'#D4AF37' }} />
                Every donation helps restore movement, dignity, and hope to amputees around the world.
              </p>
            </Reveal>
          </form>
        </div>
      </SectionWrapper>
    </>
  )
}
