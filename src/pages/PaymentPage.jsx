import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBitcoin, FaCreditCard, FaUniversity, FaMoneyBillWave, FaTelegram, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import SectionWrapper, { Reveal } from '../components/SectionWrapper.jsx'

const TELEGRAM_USERNAME = 'marvellous5252' // ← Replace with your Telegram username

const PAYMENT_METHODS = [
  {
    id: 'paypal',
    icon: <FaCreditCard style={{ fontSize:'2rem' }} />,
    name: 'PayPal',
    desc: 'Pay securely with PayPal or credit/debit card',
    color: '#003087',
    bg: '#e8f0fe',
    instructions: 'You will be connected to our team on Telegram to receive the PayPal payment link.',
    telegramMsg: (amount, name, id) =>
      `Hello NLPI Team! I would like to complete my donation via PayPal.\n\n👤 Name: ${name}\n💰 Amount: ${amount}\n🆔 Submission ID: ${id}\n\nPlease send me the PayPal payment link.`,
  },
  {
    id: 'crypto',
    icon: <FaBitcoin style={{ fontSize:'2rem' }} />,
    name: 'Cryptocurrency',
    desc: 'Pay with USDT, BTC, ETH or other crypto',
    color: '#F7931A',
    bg: '#fff7ed',
    instructions: 'You will be connected to our team on Telegram to receive the crypto wallet address.',
    telegramMsg: (amount, name, id) =>
      `Hello NLPI Team! I would like to complete my donation via Cryptocurrency.\n\n👤 Name: ${name}\n💰 Amount: ${amount}\n🆔 Submission ID: ${id}\n\nPlease send me the crypto wallet address.`,
  },
  {
    id: 'bank',
    icon: <FaUniversity style={{ fontSize:'2rem' }} />,
    name: 'Bank Transfer',
    desc: 'Direct bank transfer / wire transfer',
    color: '#0B1F3A',
    bg: '#f0f4ff',
    instructions: 'You will be connected to our team on Telegram to receive bank account details.',
    telegramMsg: (amount, name, id) =>
      `Hello NLPI Team! I would like to complete my donation via Bank Transfer.\n\n👤 Name: ${name}\n💰 Amount: ${amount}\n🆔 Submission ID: ${id}\n\nPlease send me the bank account details.`,
  },
  {
    id: 'western',
    icon: <FaMoneyBillWave style={{ fontSize:'2rem' }} />,
    name: 'Western Union / MoneyGram',
    desc: 'International money transfer',
    color: '#FFD700',
    bg: '#fffbeb',
    instructions: 'You will be connected to our team on Telegram to receive the transfer details.',
    telegramMsg: (amount, name, id) =>
      `Hello NLPI Team! I would like to complete my donation via Western Union / MoneyGram.\n\n👤 Name: ${name}\n💰 Amount: ${amount}\n🆔 Submission ID: ${id}\n\nPlease send me the transfer details.`,
  },
]

export default function PaymentPage() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const submissionId = state?.submissionId || 'N/A'
  const type         = state?.type || 'donation'
  const name         = state?.name || 'Donor'
  const amount       = state?.amount || 'your selected amount'

  const handleProceed = () => {
    if (!selected) return
    const method = PAYMENT_METHODS.find(m => m.id === selected)
    const msg    = encodeURIComponent(method.telegramMsg(amount, name, submissionId))
    const url    = `https://t.me/${TELEGRAM_USERNAME}?text=${msg}`
    window.open(url, '_blank')
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div style={{ minHeight:'100vh', background:'#0B1F3A', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
        <motion.div
          initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
          style={{ background:'white', borderRadius:20, padding:'3rem', maxWidth:480, width:'100%', textAlign:'center' }}
        >
          <motion.div animate={{ scale:[1,1.2,1] }} transition={{ duration:0.5 }}>
            <FaCheckCircle style={{ fontSize:'4rem', color:'#D4AF37', marginBottom:'1rem' }} />
          </motion.div>
          <h2 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:900, color:'#0B1F3A', fontSize:'1.8rem', marginBottom:'0.8rem' }}>
            You're Connected!
          </h2>
          <p style={{ color:'#6b7280', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
            Our team has been notified. Please complete your payment on Telegram and we will confirm your donation and send your receipt.
          </p>
          <div style={{ background:'#F5F7FA', borderRadius:10, padding:'1rem', marginBottom:'1.5rem' }}>
            <div style={{ fontSize:'0.72rem', color:'#9ca3af', marginBottom:4 }}>SUBMISSION ID</div>
            <div style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:700, color:'#0B1F3A' }}>{submissionId}</div>
          </div>
          <button
            onClick={() => navigate('/')}
            style={{ background:'#D4AF37', color:'#0B1F3A', border:'none', borderRadius:8, padding:'0.9rem 2rem', fontFamily:'"League Spartan",sans-serif', fontWeight:700, cursor:'pointer', fontSize:'0.9rem' }}
          >
            BACK TO HOME
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <section style={{ background:'#0B1F3A', paddingTop:'8rem', paddingBottom:'4rem', paddingLeft:'1.5rem', paddingRight:'1.5rem' }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <h1 style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:900, color:'white', fontSize:'clamp(2rem,5vw,3.5rem)', marginBottom:'1rem' }}>
            SELECT PAYMENT METHOD
          </h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', lineHeight:1.7 }}>
            Choose how you would like to complete your {type === 'donation' ? 'donation' : 'partnership contribution'}.
            You will be connected to our team on Telegram to finalize the payment.
          </p>
          {/* Submission badge */}
          <div style={{ display:'inline-block', background:'rgba(212,175,55,0.15)', border:'1px solid rgba(212,175,55,0.3)', borderRadius:8, padding:'0.5rem 1.2rem', marginTop:'1.2rem' }}>
            <span style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.72rem' }}>Submission ID: </span>
            <span style={{ color:'#D4AF37', fontWeight:600, fontSize:'0.8rem' }}>{submissionId}</span>
          </div>
        </div>
      </section>

      <SectionWrapper bg="gray">
        <div style={{ maxWidth:760, margin:'0 auto' }}>

          {/* Payment method cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.2rem', marginBottom:'2rem' }}>
            {PAYMENT_METHODS.map((method, i) => (
              <Reveal key={method.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y:-4 }}
                  onClick={() => setSelected(method.id)}
                  style={{
                    background:'white', borderRadius:14, padding:'1.8rem',
                    cursor:'pointer', transition:'all 0.2s',
                    border: selected === method.id ? `2px solid ${method.color}` : '2px solid transparent',
                    boxShadow: selected === method.id ? `0 8px 30px rgba(0,0,0,0.12)` : '0 4px 20px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.8rem' }}>
                    <div style={{ width:56, height:56, borderRadius:12, background:method.bg, display:'flex', alignItems:'center', justifyContent:'center', color:method.color, flexShrink:0 }}>
                      {method.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily:'"League Spartan",sans-serif', fontWeight:700, color:'#0B1F3A', fontSize:'1.1rem' }}>{method.name}</div>
                      <div style={{ color:'#6b7280', fontSize:'0.78rem' }}>{method.desc}</div>
                    </div>
                    {selected === method.id && (
                      <FaCheckCircle style={{ color:method.color, fontSize:'1.2rem', marginLeft:'auto' }} />
                    )}
                  </div>
                  {selected === method.id && (
                    <motion.div
                      initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
                      style={{ background:method.bg, borderRadius:8, padding:'0.8rem', marginTop:'0.8rem' }}
                    >
                      <p style={{ color:'#374151', fontSize:'0.82rem', lineHeight:1.6, display:'flex', alignItems:'flex-start', gap:8 }}>
                        <FaTelegram style={{ color:'#0088cc', flexShrink:0, marginTop:2 }} />
                        {method.instructions}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Proceed button */}
          <Reveal delay={0.4}>
            <motion.button
              whileHover={{ scale: selected ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProceed}
              disabled={!selected}
              style={{
                width:'100%', background: selected ? '#D4AF37' : '#e5e7eb',
                color: selected ? '#0B1F3A' : '#9ca3af',
                fontFamily:'"League Spartan",sans-serif', fontWeight:900,
                fontSize:'1.1rem', padding:'1.2rem',
                borderRadius:10, border:'none',
                cursor: selected ? 'pointer' : 'not-allowed',
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                transition:'all 0.2s',
              }}
            >
              <FaTelegram style={{ fontSize:'1.2rem' }} />
              PROCEED & CONNECT ON TELEGRAM
              <FaArrowRight />
            </motion.button>

            <div style={{ textAlign:'center', marginTop:'1rem', color:'#9ca3af', fontSize:'0.78rem' }}>
              Clicking the button will open Telegram with a pre-filled message to our team.
            </div>
          </Reveal>
        </div>
      </SectionWrapper>
    </>
  )
}
