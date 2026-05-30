import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSignInAlt, FaSignOutAlt, FaUsers, FaHandHoldingHeart, FaHandshake,
  FaEye, FaTrash, FaCheckCircle, FaChartBar, FaBell, FaSearch,
  FaChevronDown, FaTelegram, FaEnvelope, FaPhone, FaGlobeAfrica,
  FaCalendarAlt, FaTimes, FaEdit, FaSave
} from 'react-icons/fa'
import { api } from '../utils/api.js'

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (d) => new Date(d).toLocaleString()
const statusColors = {
  new:       { bg:'#fef3c7', color:'#92400e', label:'New' },
  contacted: { bg:'#dbeafe', color:'#1e40af', label:'Contacted' },
  completed: { bg:'#d1fae5', color:'#065f46', label:'Completed' },
  reviewing: { bg:'#ede9fe', color:'#5b21b6', label:'Reviewing' },
  active:    { bg:'#d1fae5', color:'#065f46', label:'Active' },
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, color = '#D4AF37' }) {
  return (
    <div style={{ background:'white', borderRadius:12, padding:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', borderLeft:`4px solid ${color}` }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ color:'#6b7280', fontSize:'0.75rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{label}</div>
          <div style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:900, fontSize:'2.2rem', color:'#0B1F3A' }}>{value}</div>
          {sub && <div style={{ color:'#9ca3af', fontSize:'0.72rem', marginTop:2 }}>{sub}</div>}
        </div>
        <div style={{ width:44, height:44, borderRadius:10, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', color, fontSize:'1.2rem' }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

function Badge({ status }) {
  const s = statusColors[status] || statusColors.new
  return (
    <span style={{ background:s.bg, color:s.color, fontSize:'0.68rem', fontWeight:700, padding:'3px 10px', borderRadius:100, textTransform:'uppercase', letterSpacing:'0.06em' }}>
      {s.label}
    </span>
  )
}

function DetailModal({ item, type, onClose, onUpdate, token }) {
  const [status, setStatus] = useState(item.status)
  const [notes, setNotes]   = useState(item.adminNotes || '')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    const fn = type === 'donation' ? api.updateDonation : api.updatePartner
    await fn(token, item._id, { status, adminNotes: notes, isRead: true })
    onUpdate()
    setSaving(false)
    onClose()
  }

  const fields = type === 'donation' ? [
    ['Full Name',      item.fullName],
    ['Organization',   item.organizationName || '—'],
    ['Country',        item.country],
    ['City',           item.stateCity || '—'],
    ['Email',          item.email],
    ['Phone',          item.phone],
    ['Website',        item.website || '—'],
    ['Amount Range',   item.amountRange || '—'],
    ['Custom Amount',  item.customAmount ? `$${item.customAmount}` : '—'],
    ['Contact Method', Array.isArray(item.contactMethod) ? item.contactMethod.join(', ') : '—'],
    ['Submitted',      fmtDate(item.createdAt)],
  ] : [
    ['Full Name',       item.fullName],
    ['Organization',    item.organizationName],
    ['Position',        item.position || '—'],
    ['Industry',        item.industry || '—'],
    ['Country',         item.country],
    ['City',            item.stateCity || '—'],
    ['Email',           item.email],
    ['Phone',           item.phone],
    ['Website',         item.website || '—'],
    ['Est. Value',      item.estimatedValue || '—'],
    ['Contact Method',  Array.isArray(item.contactMethod) ? item.contactMethod.join(', ') : '—'],
    ['Submitted',       fmtDate(item.createdAt)],
  ]

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:9000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9 }}
        onClick={e => e.stopPropagation()}
        style={{ background:'white', borderRadius:16, width:'100%', maxWidth:680, maxHeight:'90vh', overflow:'auto', boxShadow:'0 30px 80px rgba(0,0,0,0.25)' }}
      >
        {/* Header */}
        <div style={{ padding:'1.5rem 1.8rem', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'white', zIndex:10 }}>
          <div>
            <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.2rem', margin:0 }}>
              {item.fullName}
            </h3>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
              <Badge status={status} />
              <span style={{ color:'#9ca3af', fontSize:'0.72rem' }}>{fmtDate(item.createdAt)}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#9ca3af', fontSize:'1.2rem', padding:4 }}>
            <FaTimes />
          </button>
        </div>

        <div style={{ padding:'1.8rem' }}>
          {/* Details grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem', marginBottom:'1.5rem' }}>
            {fields.map(([label, value]) => (
              <div key={label} style={{ background:'#F5F7FA', borderRadius:8, padding:'0.8rem 1rem' }}>
                <div style={{ fontSize:'0.68rem', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:2 }}>{label}</div>
                <div style={{ fontSize:'0.88rem', color:'#0B1F3A', fontWeight:500, wordBreak:'break-word' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Arrays */}
          {type === 'donation' && item.donationTypes?.length > 0 && (
            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Donation Types</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {item.donationTypes.map(t => <span key={t} style={{ background:'#fef3c7', color:'#92400e', fontSize:'0.72rem', padding:'3px 10px', borderRadius:100 }}>{t}</span>)}
              </div>
            </div>
          )}
          {type === 'donation' && item.supportAreas?.length > 0 && (
            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Support Areas</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {item.supportAreas.map(a => <span key={a} style={{ background:'#dbeafe', color:'#1e40af', fontSize:'0.72rem', padding:'3px 10px', borderRadius:100 }}>{a}</span>)}
              </div>
            </div>
          )}
          {type === 'partner' && item.partnershipTypes?.length > 0 && (
            <div style={{ marginBottom:'1rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Partnership Types</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {item.partnershipTypes.map(t => <span key={t} style={{ background:'#ede9fe', color:'#5b21b6', fontSize:'0.72rem', padding:'3px 10px', borderRadius:100 }}>{t}</span>)}
              </div>
            </div>
          )}

          {/* Message / Proposal */}
          {(item.message || item.proposal) && (
            <div style={{ background:'#F5F7FA', borderRadius:8, padding:'1rem', marginBottom:'1.5rem' }}>
              <div style={{ fontSize:'0.72rem', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{type === 'donation' ? 'Message' : 'Proposal'}</div>
              <p style={{ fontSize:'0.88rem', color:'#374151', lineHeight:1.65, margin:0 }}>{item.message || item.proposal}</p>
            </div>
          )}

          {/* Status update */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem' }}>
            <div>
              <label style={{ display:'block', fontSize:'0.72rem', color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Update Status</label>
              <select
                value={status} onChange={e => setStatus(e.target.value)}
                style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'0.6rem 0.8rem', fontSize:'0.85rem', outline:'none' }}
              >
                {type === 'donation'
                  ? ['new','contacted','completed'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)
                  : ['new','reviewing','contacted','active'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)
                }
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.72rem', color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Quick Actions</label>
              <div style={{ display:'flex', gap:8 }}>
                <a href={`mailto:${item.email}`} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:4, background:'#0B1F3A', color:'white', borderRadius:7, padding:'0.6rem', fontSize:'0.75rem', textDecoration:'none' }}>
                  <FaEnvelope /> Email
                </a>
                <a href={`https://wa.me/${item.phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:4, background:'#25D366', color:'white', borderRadius:7, padding:'0.6rem', fontSize:'0.75rem', textDecoration:'none' }}>
                  <FaTelegram /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Admin notes */}
          <div style={{ marginBottom:'1.5rem' }}>
            <label style={{ display:'block', fontSize:'0.72rem', color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Admin Notes</label>
            <textarea
              rows={3} placeholder="Add private notes about this submission..."
              value={notes} onChange={e => setNotes(e.target.value)}
              style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'0.7rem', fontSize:'0.85rem', outline:'none', resize:'vertical', fontFamily:'Poppins,sans-serif' }}
            />
          </div>

          <button
            onClick={save} disabled={saving}
            style={{ width:'100%', background:'#D4AF37', color:'#0B1F3A', border:'none', borderRadius:8, padding:'0.9rem', fontFamily:'"League Spartan",sans-serif', fontWeight:700, fontSize:'0.95rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}
          >
            <FaSave /> {saving ? 'Saving...' : 'SAVE CHANGES'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DataTable({ data, type, token, onRefresh, search }) {
  const [selected, setSelected] = useState(null)

  const filtered = data.filter(item =>
    item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    item.email?.toLowerCase().includes(search.toLowerCase()) ||
    item.country?.toLowerCase().includes(search.toLowerCase()) ||
    item.organizationName?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this submission? This cannot be undone.')) return
    const fn = type === 'donation' ? api.deleteDonation : api.deletePartner
    await fn(token, id)
    onRefresh()
  }

  if (filtered.length === 0) {
    return (
      <div style={{ textAlign:'center', padding:'4rem', color:'#9ca3af' }}>
        <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>{type === 'donation' ? '💛' : '🤝'}</div>
        <p>No {type} submissions found{search ? ' matching your search' : ' yet'}.</p>
      </div>
    )
  }

  return (
    <>
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#F5F7FA' }}>
              {['Name', 'Country', 'Email', 'Phone', type === 'donation' ? 'Amount' : 'Partnership', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} style={{ padding:'0.8rem 1rem', textAlign:'left', fontSize:'0.72rem', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item._id} style={{ borderBottom:'1px solid #f3f4f6', background: !item.isRead ? '#fffbeb' : i % 2 === 0 ? 'white' : '#fafafa', transition:'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                onMouseLeave={e => e.currentTarget.style.background = !item.isRead ? '#fffbeb' : i % 2 === 0 ? 'white' : '#fafafa'}
              >
                <td style={{ padding:'0.9rem 1rem', whiteSpace:'nowrap' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    {!item.isRead && <span style={{ width:8, height:8, borderRadius:'50%', background:'#D4AF37', flexShrink:0 }} />}
                    <div>
                      <div style={{ fontWeight:600, color:'#0B1F3A', fontSize:'0.88rem' }}>{item.fullName}</div>
                      {item.organizationName && <div style={{ color:'#9ca3af', fontSize:'0.72rem' }}>{item.organizationName}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ padding:'0.9rem 1rem', color:'#374151', fontSize:'0.85rem' }}>{item.country}</td>
                <td style={{ padding:'0.9rem 1rem', color:'#374151', fontSize:'0.82rem' }}>
                  <a href={`mailto:${item.email}`} style={{ color:'#0B1F3A', textDecoration:'none' }}>{item.email}</a>
                </td>
                <td style={{ padding:'0.9rem 1rem', color:'#374151', fontSize:'0.82rem', whiteSpace:'nowrap' }}>{item.phone}</td>
                <td style={{ padding:'0.9rem 1rem', color:'#374151', fontSize:'0.82rem' }}>
                  {type === 'donation'
                    ? (item.amountRange || item.customAmount ? `$${item.customAmount}` : '—')
                    : (item.estimatedValue || '—')
                  }
                </td>
                <td style={{ padding:'0.9rem 1rem' }}><Badge status={item.status} /></td>
                <td style={{ padding:'0.9rem 1rem', color:'#9ca3af', fontSize:'0.75rem', whiteSpace:'nowrap' }}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding:'0.9rem 1rem' }}>
                  <div style={{ display:'flex', gap:6 }}>
                    <button
                      onClick={() => setSelected(item)}
                      style={{ background:'#0B1F3A', color:'white', border:'none', borderRadius:6, padding:'0.4rem 0.7rem', cursor:'pointer', fontSize:'0.75rem', display:'flex', alignItems:'center', gap:4 }}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      style={{ background:'#fef2f2', color:'#dc2626', border:'1px solid #fecaca', borderRadius:6, padding:'0.4rem 0.6rem', cursor:'pointer', fontSize:'0.75rem' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selected && (
          <DetailModal
            item={selected} type={type} token={token}
            onClose={() => setSelected(null)} onUpdate={onRefresh}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken]         = useState(() => localStorage.getItem('nlpi_admin_token') || '')
  const [loginForm, setLoginForm] = useState({ username:'', password:'' })
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [tab, setTab]             = useState('overview')
  const [stats, setStats]         = useState(null)
  const [donations, setDonations] = useState([])
  const [partners, setPartners]   = useState([])
  const [loading, setLoading]     = useState(false)
  const [search, setSearch]       = useState('')

  const isLoggedIn = !!token

  const loadData = async () => {
    if (!token) return
    setLoading(true)
    try {
      const [s, d, p] = await Promise.all([
        api.getStats(token),
        api.getDonations(token),
        api.getPartners(token),
      ])
      if (s.success)  setStats(s.stats)
      if (d.success)  setDonations(d.data)
      if (p.success)  setPartners(p.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => { if (isLoggedIn) loadData() }, [token])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true); setLoginError('')
    try {
      const res = await api.adminLogin(loginForm.username, loginForm.password)
      if (res.success) {
        localStorage.setItem('nlpi_admin_token', res.token)
        setToken(res.token)
      } else {
        setLoginError(res.message || 'Invalid credentials')
      }
    } catch {
      setLoginError('Cannot connect to server. Make sure the backend is running.')
    }
    setLoginLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('nlpi_admin_token')
    setToken('')
    setStats(null); setDonations([]); setPartners([])
  }

  // ── Login Screen ────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight:'100vh', background:'#0B1F3A', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
        <motion.div
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          style={{ background:'white', borderRadius:20, padding:'2.5rem', width:'100%', maxWidth:400, boxShadow:'0 30px 80px rgba(0,0,0,0.3)' }}
        >
          {/* Logo area */}
          <div style={{ textAlign:'center', marginBottom:'2rem' }}>
            <div style={{ display:'inline-block', background:'#D4AF37', color:'#0B1F3A', fontFamily:'"League Spartan",sans-serif', fontWeight:900, fontSize:'1.2rem', padding:'0.4rem 0.9rem', borderRadius:6, marginBottom:'0.8rem' }}>
              NLPI
            </div>
            <h2 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:900, color:'#0B1F3A', fontSize:'1.5rem', margin:'0 0 0.3rem' }}>
              Admin Dashboard
            </h2>
            <p style={{ color:'#9ca3af', fontSize:'0.82rem' }}>Sign in to access your control panel</p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom:'1rem' }}>
              <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'#374151', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Username</label>
              <input
                type="text" required placeholder="admin"
                value={loginForm.username}
                onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
                style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'0.8rem 1rem', fontSize:'0.9rem', outline:'none', fontFamily:'Poppins,sans-serif' }}
                onFocus={e => e.target.style.borderColor = '#D4AF37'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'#374151', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>Password</label>
              <input
                type="password" required placeholder="••••••••"
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                style={{ width:'100%', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'0.8rem 1rem', fontSize:'0.9rem', outline:'none', fontFamily:'Poppins,sans-serif' }}
                onFocus={e => e.target.style.borderColor = '#D4AF37'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {loginError && (
              <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, padding:'0.7rem 1rem', marginBottom:'1rem', color:'#dc2626', fontSize:'0.82rem' }}>
                {loginError}
              </div>
            )}

            <button
              type="submit" disabled={loginLoading}
              style={{ width:'100%', background:'#D4AF37', color:'#0B1F3A', border:'none', borderRadius:8, padding:'0.9rem', fontFamily:'"League Spartan",sans-serif', fontWeight:700, fontSize:'1rem', cursor: loginLoading ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}
            >
              <FaSignInAlt /> {loginLoading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  const TABS = [
    { id:'overview',  label:'Overview',  icon:<FaChartBar /> },
    { id:'donations', label:'Donations', icon:<FaHandHoldingHeart />, badge: stats?.newDonations },
    { id:'partners',  label:'Partners',  icon:<FaHandshake />,        badge: stats?.newPartners  },
    { id:'visitors',  label:'Visitors',  icon:<FaUsers /> },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#F5F7FA', fontFamily:'Poppins,sans-serif' }}>

      {/* Top bar */}
      <div style={{ background:'#0B1F3A', padding:'0 1.5rem', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 20px rgba(0,0,0,0.2)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <div style={{ background:'#D4AF37', color:'#0B1F3A', fontFamily:'"League Spartan",sans-serif', fontWeight:900, fontSize:'0.85rem', padding:'0.25rem 0.6rem', borderRadius:4 }}>NLPI</div>
          <span style={{ color:'white', fontFamily:'"League Spartan",sans-serif', fontWeight:700, fontSize:'0.95rem' }}>Admin Dashboard</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          {stats?.newDonations + stats?.newPartners > 0 && (
            <div style={{ background:'#D4AF37', color:'#0B1F3A', borderRadius:100, padding:'2px 10px', fontSize:'0.72rem', fontWeight:700 }}>
              {stats.newDonations + stats.newPartners} new
            </div>
          )}
          <button onClick={loadData} style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'white', borderRadius:6, padding:'0.4rem 0.8rem', cursor:'pointer', fontSize:'0.78rem' }}>
            Refresh
          </button>
          <button onClick={handleLogout} style={{ background:'rgba(255,255,255,0.1)', border:'none', color:'white', borderRadius:6, padding:'0.4rem 0.8rem', cursor:'pointer', fontSize:'0.78rem', display:'flex', alignItems:'center', gap:5 }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div style={{ display:'flex', minHeight:'calc(100vh - 60px)' }}>

        {/* Sidebar */}
        <div style={{ width:220, background:'white', borderRight:'1px solid #f3f4f6', padding:'1.5rem 0', flexShrink:0 }}>
          {TABS.map(t => (
            <button
              key={t.id} onClick={() => setTab(t.id)}
              style={{
                width:'100%', display:'flex', alignItems:'center', gap:10,
                padding:'0.85rem 1.5rem', border:'none', cursor:'pointer',
                background: tab === t.id ? '#fef3c7' : 'transparent',
                color: tab === t.id ? '#92400e' : '#6b7280',
                fontFamily:'Poppins,sans-serif', fontWeight: tab === t.id ? 600 : 400,
                fontSize:'0.88rem', textAlign:'left',
                borderLeft: tab === t.id ? '3px solid #D4AF37' : '3px solid transparent',
                transition:'all 0.2s',
              }}
            >
              <span style={{ fontSize:'0.95rem' }}>{t.icon}</span>
              {t.label}
              {t.badge > 0 && (
                <span style={{ marginLeft:'auto', background:'#D4AF37', color:'#0B1F3A', borderRadius:100, padding:'1px 8px', fontSize:'0.68rem', fontWeight:700 }}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex:1, padding:'2rem', overflowX:'auto' }}>

          {loading && (
            <div style={{ textAlign:'center', padding:'3rem', color:'#9ca3af' }}>Loading data...</div>
          )}

          {/* ── Overview Tab ── */}
          {tab === 'overview' && !loading && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <h2 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.5rem', marginBottom:'1.5rem' }}>Overview</h2>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
                <StatCard icon={<FaUsers />}            label="Total Visitors"   value={stats?.totalVisitors || 0}  color="#6366f1" />
                <StatCard icon={<FaHandHoldingHeart />} label="Donations"        value={stats?.totalDonations || 0} color="#D4AF37" sub={`${stats?.newDonations || 0} unread`} />
                <StatCard icon={<FaHandshake />}        label="Partners"         value={stats?.totalPartners || 0}  color="#10b981" sub={`${stats?.newPartners || 0} unread`} />
                <StatCard icon={<FaBell />}             label="Unread Total"     value={(stats?.newDonations || 0) + (stats?.newPartners || 0)} color="#f59e0b" />
              </div>

              {/* Recent donations preview */}
              <div style={{ background:'white', borderRadius:14, padding:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)', marginBottom:'1.5rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}>
                  <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:700, color:'#0B1F3A', fontSize:'1rem', margin:0 }}>Recent Donations</h3>
                  <button onClick={() => setTab('donations')} style={{ background:'#D4AF37', color:'#0B1F3A', border:'none', borderRadius:6, padding:'0.4rem 0.8rem', cursor:'pointer', fontSize:'0.75rem', fontWeight:600 }}>View All</button>
                </div>
                {donations.slice(0,5).map(d => (
                  <div key={d._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.7rem 0', borderBottom:'1px solid #f3f4f6' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      {!d.isRead && <span style={{ width:7, height:7, borderRadius:'50%', background:'#D4AF37', flexShrink:0 }} />}
                      <div>
                        <div style={{ fontWeight:600, color:'#0B1F3A', fontSize:'0.85rem' }}>{d.fullName}</div>
                        <div style={{ color:'#9ca3af', fontSize:'0.72rem' }}>{d.country} · {d.email}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      {d.amountRange && <span style={{ color:'#D4AF37', fontWeight:700, fontSize:'0.82rem' }}>{d.amountRange}</span>}
                      <Badge status={d.status} />
                    </div>
                  </div>
                ))}
                {donations.length === 0 && <p style={{ color:'#9ca3af', textAlign:'center', padding:'1rem', fontSize:'0.85rem' }}>No donations yet</p>}
              </div>

              {/* Recent partners preview */}
              <div style={{ background:'white', borderRadius:14, padding:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' }}>
                  <h3 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:700, color:'#0B1F3A', fontSize:'1rem', margin:0 }}>Recent Partnership Requests</h3>
                  <button onClick={() => setTab('partners')} style={{ background:'#0B1F3A', color:'white', border:'none', borderRadius:6, padding:'0.4rem 0.8rem', cursor:'pointer', fontSize:'0.75rem', fontWeight:600 }}>View All</button>
                </div>
                {partners.slice(0,5).map(p => (
                  <div key={p._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.7rem 0', borderBottom:'1px solid #f3f4f6' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      {!p.isRead && <span style={{ width:7, height:7, borderRadius:'50%', background:'#D4AF37', flexShrink:0 }} />}
                      <div>
                        <div style={{ fontWeight:600, color:'#0B1F3A', fontSize:'0.85rem' }}>{p.fullName}</div>
                        <div style={{ color:'#9ca3af', fontSize:'0.72rem' }}>{p.organizationName} · {p.country}</div>
                      </div>
                    </div>
                    <Badge status={p.status} />
                  </div>
                ))}
                {partners.length === 0 && <p style={{ color:'#9ca3af', textAlign:'center', padding:'1rem', fontSize:'0.85rem' }}>No partnership requests yet</p>}
              </div>
            </motion.div>
          )}

          {/* ── Donations Tab ── */}
          {tab === 'donations' && !loading && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
                <h2 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.5rem', margin:0 }}>
                  Donation Submissions <span style={{ color:'#D4AF37' }}>({donations.length})</span>
                </h2>
                <div style={{ position:'relative' }}>
                  <FaSearch style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#9ca3af', fontSize:'0.8rem' }} />
                  <input
                    type="text" placeholder="Search by name, email, country..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ paddingLeft:32, paddingRight:12, paddingTop:8, paddingBottom:8, border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.85rem', outline:'none', width:260 }}
                  />
                </div>
              </div>
              <div style={{ background:'white', borderRadius:14, boxShadow:'0 4px 20px rgba(0,0,0,0.06)', overflow:'hidden' }}>
                <DataTable data={donations} type="donation" token={token} onRefresh={loadData} search={search} />
              </div>
            </motion.div>
          )}

          {/* ── Partners Tab ── */}
          {tab === 'partners' && !loading && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
                <h2 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.5rem', margin:0 }}>
                  Partnership Requests <span style={{ color:'#D4AF37' }}>({partners.length})</span>
                </h2>
                <div style={{ position:'relative' }}>
                  <FaSearch style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#9ca3af', fontSize:'0.8rem' }} />
                  <input
                    type="text" placeholder="Search by name, org, country..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ paddingLeft:32, paddingRight:12, paddingTop:8, paddingBottom:8, border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.85rem', outline:'none', width:260 }}
                  />
                </div>
              </div>
              <div style={{ background:'white', borderRadius:14, boxShadow:'0 4px 20px rgba(0,0,0,0.06)', overflow:'hidden' }}>
                <DataTable data={partners} type="partner" token={token} onRefresh={loadData} search={search} />
              </div>
            </motion.div>
          )}

          {/* ── Visitors Tab ── */}
          {tab === 'visitors' && !loading && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <h2 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:800, color:'#0B1F3A', fontSize:'1.5rem', marginBottom:'1.5rem' }}>Recent Visitors</h2>
              <div style={{ background:'white', borderRadius:14, padding:'1.5rem', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
                {stats?.recentVisitors?.length > 0 ? (
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ background:'#F5F7FA' }}>
                        {['IP Address','Page','Device','Time'].map(h => (
                          <th key={h} style={{ padding:'0.8rem 1rem', textAlign:'left', fontSize:'0.72rem', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentVisitors.map((v, i) => (
                        <tr key={v._id || i} style={{ borderBottom:'1px solid #f3f4f6' }}>
                          <td style={{ padding:'0.8rem 1rem', fontSize:'0.85rem', color:'#374151' }}>{v.ip}</td>
                          <td style={{ padding:'0.8rem 1rem', fontSize:'0.85rem', color:'#374151' }}>{v.page}</td>
                          <td style={{ padding:'0.8rem 1rem', fontSize:'0.82rem', color:'#6b7280' }}>
                            {v.userAgent?.includes('Mobile') ? '📱 Mobile' : '💻 Desktop'}
                          </td>
                          <td style={{ padding:'0.8rem 1rem', fontSize:'0.78rem', color:'#9ca3af' }}>{fmtDate(v.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ textAlign:'center', color:'#9ca3af', padding:'2rem' }}>No visitor data yet. Make sure your backend is running and tracking visits.</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
