import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaFileAlt, FaCloudUploadAlt, FaHeart, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { MdAccessible } from 'react-icons/md'
import SectionWrapper, { Reveal } from '../components/SectionWrapper.jsx'
import Button from '../components/Button.jsx'

const STEPS = ['Personal Info', 'Medical Background', 'Documents', 'Review']
const COUNTRIES = ['Nigeria','Kenya','India','Vietnam','Colombia','Philippines','Brazil','Ghana','Uganda','Ethiopia','Bangladesh','Pakistan','Other']

export default function ApplyPage() {
  const [step, setStep]       = useState(0)
  const [success, setSuccess] = useState(false)
  const [form, setForm]       = useState({ fullName:'', country:'', age:'', email:'', condition:'', limbHistory:'', hospital:'', notes:'' })
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) { setStep((s) => s + 1); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'white', borderRadius: 20, padding: '4rem 3rem', maxWidth: 440, width: '100%', textAlign: 'center' }}
        >
          <MdAccessible style={{ fontSize: '4rem', color: '#D4AF37', marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: '#0B1F3A', fontSize: '2rem', marginBottom: '0.75rem' }}>Application Received!</h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Thank you, <strong>{form.fullName || 'Applicant'}</strong>. We will review your application within 4–6 weeks and contact you for next steps.
          </p>
          <Button to="/" variant="gold">BACK TO HOME</Button>
        </motion.div>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 8,
    padding: '0.75rem 1rem', fontSize: '0.87rem', outline: 'none',
    transition: 'border-color 0.2s', fontFamily: 'Poppins, sans-serif',
  }

  return (
    <>
      <section style={{ background: '#0B1F3A', paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Home › Apply for Support</p>
          <h1 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 900, color: 'white', fontSize: 'clamp(2.5rem,6vw,4rem)', marginBottom: '1rem' }}>APPLY FOR SUPPORT</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: 500 }}>
            If you or someone you know needs prosthetic support, please fill out the form below.
          </p>
        </div>
      </section>

      <SectionWrapper bg="gray">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>
          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <Reveal>
              <div>
                <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', fontSize: '1.2rem', marginBottom: '0.75rem' }}>Who can apply?</h3>
                <p style={{ color: '#6b7280', fontSize: '0.87rem', lineHeight: 1.7 }}>
                  Individuals with limb loss who need prosthetic support and cannot afford advanced prosthetics are eligible to apply.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ background: 'white', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
                <h4 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Our Process</h4>
                <ol style={{ paddingLeft: '1.2rem', color: '#6b7280', fontSize: '0.85rem', lineHeight: 2 }}>
                  <li>Submit your application</li>
                  <li>Medical review (4–6 weeks)</li>
                  <li>Matched with partner clinic</li>
                  <li>Fitting & rehabilitation</li>
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 12, padding: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <FaHeart style={{ color: '#D4AF37', fontSize: '1rem', flexShrink: 0, marginTop: 2 }} />
                <p style={{ color: '#92400e', fontSize: '0.83rem', lineHeight: 1.65 }}>
                  All applications are reviewed individually and treated with full confidentiality.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <div style={{ background: 'white', borderRadius: 20, padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
              {/* Step progress */}
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem' }}>
                {STEPS.map((s, i) => (
                  <div key={s} style={{ flex: 1 }}>
                    <div style={{ height: 4, borderRadius: 100, background: i <= step ? '#D4AF37' : '#f3f4f6', transition: 'background 0.3s' }} />
                    <p style={{ fontSize: '0.65rem', marginTop: 6, color: i === step ? '#D4AF37' : '#d1d5db', fontWeight: i === step ? 600 : 400 }}>{s}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[{ k:'fullName', label:'Full Name', type:'text', ph:'Your full name' }, { k:'email', label:'Email Address', type:'email', ph:'your@email.com' }].map((f) => (
                      <div key={f.k}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>{f.label}</label>
                        <input type={f.type} required placeholder={f.ph} value={form[f.k]} onChange={(e) => update(f.k, e.target.value)}
                          style={inputStyle} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                      </div>
                    ))}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Country</label>
                        <select required value={form.country} onChange={(e) => update('country', e.target.value)} style={inputStyle}>
                          <option value="">Select country</option>
                          {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Age</label>
                        <input type="number" required min={1} max={120} placeholder="Age" value={form.age} onChange={(e) => update('age', e.target.value)}
                          style={inputStyle} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { k:'condition',   label:'Medical Condition',  ph:'Briefly describe your condition' },
                      { k:'limbHistory', label:'Limb Loss History',  ph:'How and when did you lose the limb?' },
                      { k:'hospital',    label:'Hospital / Clinic',  ph:'Name of treating hospital or clinic' },
                    ].map((f) => (
                      <div key={f.k}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>{f.label}</label>
                        <textarea rows={3} placeholder={f.ph} value={form[f.k]} onChange={(e) => update(f.k, e.target.value)}
                          style={{ ...inputStyle, resize: 'none' }} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                      </div>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Upload Documents</label>
                      <div style={{
                        border: '2px dashed #e5e7eb', borderRadius: 12, padding: '2.5rem', textAlign: 'center',
                        cursor: 'pointer', transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                      >
                        <FaCloudUploadAlt style={{ fontSize: '2.5rem', color: '#D4AF37', marginBottom: '0.75rem' }} />
                        <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Click or drag to upload medical documents</p>
                        <p style={{ color: '#d1d5db', fontSize: '0.72rem', marginTop: 4 }}>PDF, JPG, PNG — max 10MB</p>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Additional Notes</label>
                      <textarea rows={4} placeholder="Any additional information..." value={form.notes} onChange={(e) => update('notes', e.target.value)}
                        style={{ ...inputStyle, resize: 'none' }} onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 style={{ fontFamily: '"League Spartan",sans-serif', fontWeight: 700, color: '#0B1F3A', fontSize: '1.1rem', marginBottom: '1rem' }}>Review Your Application</h3>
                    {[['Full Name', form.fullName], ['Country', form.country], ['Age', form.age], ['Email', form.email]].map(([label, val]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #f3f4f6', fontSize: '0.87rem' }}>
                        <span style={{ color: '#9ca3af' }}>{label}</span>
                        <span style={{ fontWeight: 500, color: '#0B1F3A' }}>{val || '—'}</span>
                      </div>
                    ))}
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '1rem' }}>
                      By submitting you agree to our privacy policy and consent to NLPI using your information for support evaluation.
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  {step > 0 && (
                    <button type="button" onClick={() => setStep((s) => s - 1)} style={{
                      flex: 1, padding: '0.875rem', border: '1.5px solid #e5e7eb', borderRadius: 8,
                      background: 'white', color: '#6b7280', fontSize: '0.87rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      fontFamily: '"League Spartan",sans-serif', fontWeight: 600,
                    }}>
                      <FaArrowLeft style={{ fontSize: '0.75rem' }} /> Back
                    </button>
                  )}
                  <button type="submit" style={{
                    flex: 1, padding: '0.875rem', borderRadius: 8, border: 'none',
                    background: '#D4AF37', color: '#0B1F3A', fontSize: '0.9rem',
                    cursor: 'pointer', fontFamily: '"League Spartan",sans-serif', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#B8941F'}
                  onMouseLeave={e => e.currentTarget.style.background = '#D4AF37'}
                  >
                    {step < 3 ? <>Continue <FaArrowRight style={{ fontSize: '0.75rem' }} /></> : 'SUBMIT APPLICATION'}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </SectionWrapper>
    </>
  )
}
