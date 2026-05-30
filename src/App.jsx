import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navbar          from './components/Navbar.jsx'
import Footer          from './components/Footer.jsx'
import LoadingScreen   from './components/LoadingScreen.jsx'
import { api }         from './utils/api.js'

import HomePage         from './pages/HomePage.jsx'
import AboutPage        from './pages/AboutPage.jsx'
import MissionPage      from './pages/MissionPage.jsx'
import RecipientsPage   from './pages/RecipientsPage.jsx'
import DonatePage       from './pages/DonatePage.jsx'
import PartnersPage     from './pages/PartnersPage.jsx'
import ApplyPage        from './pages/ApplyPage.jsx'
import MediaPage        from './pages/MediaPage.jsx'
import NewsPage         from './pages/NewsPage.jsx'
import VolunteerPage    from './pages/VolunteerPage.jsx'
import TransparencyPage from './pages/TransparencyPage.jsx'
import ContactPage      from './pages/ContactPage.jsx'
import PaymentPage      from './pages/PaymentPage.jsx'
import AdminPage        from './pages/AdminPage.jsx'

// Scroll to top + track visitor on every page change
function ScrollAndTrack() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    api.trackVisit(pathname) // notify Telegram on every page visit
  }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <Navbar />
      <main style={{ flex:1 }}>{children}</main>
      <Footer />
    </div>
  )
}

// Admin has its own full-page layout (no Navbar/Footer)
function AdminLayout({ children }) {
  return <>{children}</>
}

function NotFoundPage() {
  return (
    <div style={{ minHeight:'100vh', background:'#0B1F3A', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px 40px' }}>
      <div style={{ fontSize:'5rem', marginBottom:'1.5rem' }}>🦿</div>
      <h1 style={{ fontFamily:'"League Spartan",sans-serif', color:'white', fontSize:'4rem', marginBottom:'1rem' }}>404</h1>
      <p style={{ color:'rgba(255,255,255,0.55)', marginBottom:'2rem', maxWidth:340 }}>
        This page doesn't exist — but our mission does.
      </p>
      <a href="/" style={{ background:'#D4AF37', color:'#0B1F3A', fontFamily:'"League Spartan",sans-serif', fontWeight:700, padding:'1rem 2.5rem', borderRadius:6, textDecoration:'none' }}>
        BACK TO HOME
      </a>
    </div>
  )
}

export default function App() {
  return (
    <>
      <LoadingScreen />
      <BrowserRouter future={{ v7_startTransition:true, v7_relativeSplatPath:true }}>
        <ScrollAndTrack />
        <Routes>
          {/* Admin — standalone layout */}
          <Route path="/nlpi-admin" element={<AdminLayout><AdminPage /></AdminLayout>} />

          {/* Payment — standalone (no nav clutter) */}
          <Route path="/payment" element={<Layout><PaymentPage /></Layout>} />

          {/* All public pages with Navbar + Footer */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/about"        element={<Layout><AboutPage /></Layout>} />
          <Route path="/mission"      element={<Layout><MissionPage /></Layout>} />
          <Route path="/recipients"   element={<Layout><RecipientsPage /></Layout>} />
          <Route path="/donate"       element={<Layout><DonatePage /></Layout>} />
          <Route path="/partners"     element={<Layout><PartnersPage /></Layout>} />
          <Route path="/apply"        element={<Layout><ApplyPage /></Layout>} />
          <Route path="/media"        element={<Layout><MediaPage /></Layout>} />
          <Route path="/news"         element={<Layout><NewsPage /></Layout>} />
          <Route path="/volunteer"    element={<Layout><VolunteerPage /></Layout>} />
          <Route path="/transparency" element={<Layout><TransparencyPage /></Layout>} />
          <Route path="/contact"      element={<Layout><ContactPage /></Layout>} />
          <Route path="*"             element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
