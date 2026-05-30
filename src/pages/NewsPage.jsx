import React, { useState } from 'react'
import { FaSearch, FaNewspaper } from "react-icons/fa"
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import NewsCard from '../components/NewsCard.jsx'
import { NEWS } from '../data/index.js'
import { FinalCTASection } from '../sections/FounderSection.jsx'

const CATEGORIES = ['All', 'Story', 'News', 'Event', 'Impact']

// Duplicate news for a fuller page
const ALL_NEWS = [
  ...NEWS,
  {
    date: 'Mar 5, 2025',
    title: 'NLPI Partners with Ottobock for 2025',
    category: 'News',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    excerpt: 'A landmark partnership signed with global prosthetics leader Ottobock to expand recipient access worldwide.',
  },
  {
    date: 'Feb 18, 2025',
    title: 'First Steps: Documentary Screening',
    category: 'Event',
    img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80',
    excerpt: 'Our short documentary screened at the Global Health Forum to a standing ovation from delegates.',
  },
  {
    date: 'Jan 30, 2025',
    title: "Ravi's Journey Back to the Fields",
    category: 'Story',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    excerpt: 'An Indian farmer who lost his leg in an accident returns to work six months after his NLPI fitting.',
  },
  {
    date: 'Jan 10, 2025',
    title: 'Year in Review: 2024 Impact Report',
    category: 'Impact',
    img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80',
    excerpt: 'Our 2024 annual report highlights 500+ recipients fitted, 30 new country partnerships, and more.',
  },
]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = ALL_NEWS.filter((n) => {
    const matchCat  = activeCategory === 'All' || n.category === activeCategory
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                        n.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      {/* Page Hero */}
      <section className="bg-navy pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs mb-2">Home › News & Updates</p>
          <h1 className="font-spartan font-black text-white text-5xl md:text-6xl mb-4">NEWS & UPDATES</h1>
          <p className="text-white/60 text-base max-w-lg">
            The latest stories, milestones, events, and impact from the NLPI global mission.
          </p>
        </div>
      </section>

      <SectionWrapper bg="gray">
        {/* Search + Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-spartan font-bold cursor-pointer border transition-all ${
                  activeCategory === c
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-navy hover:text-navy'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            
            <input
              type="text"
              placeholder="Search articles..." style={{ paddingLeft: '2.5rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-gold bg-white w-60 transition-all"
            />
          </div>
        </div>

        {/* Featured article (first) */}
        {filtered.length > 0 && activeCategory === 'All' && !search && (
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg mb-8 bg-white border border-gray-100">
              <div className="overflow-hidden h-64 lg:h-auto">
                <img
                  src={filtered[0].img}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                    {filtered[0].category}
                  </span>
                  <span className="text-xs text-gray-400">{filtered[0].date}</span>
                </div>
                <h2 className="font-spartan font-black text-navy text-3xl leading-tight mb-3">
                  {filtered[0].title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{filtered[0].excerpt}</p>
                <span className="text-gold text-sm font-semibold flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
                  Read Full Story →
                </span>
              </div>
            </div>
          </Reveal>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeCategory === 'All' && !search ? filtered.slice(1) : filtered).map((article, i) => (
              <NewsCard key={article.title + i} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div style={{ fontSize: "3rem", color: "#D4AF37", marginBottom: "1rem", display: "flex", justifyContent: "center" }}><FaNewspaper /></div>
            <p className="text-gray-400 text-sm">No articles found matching your search.</p>
          </div>
        )}

        {/* Newsletter signup */}
        <Reveal delay={0.3}>
          <div className="mt-16 bg-navy rounded-2xl p-10 text-center">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase block mb-3">Stay Informed</span>
            <h3 className="font-spartan font-black text-white text-3xl mb-3">
              GET NLPI UPDATES IN YOUR INBOX
            </h3>
            <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
              Monthly stories, impact reports, and mission updates — straight to you.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-5 py-3 rounded-lg text-sm outline-none border-none w-64 focus:ring-2 focus:ring-gold/30"
              />
              <button className="bg-gold text-navy font-spartan font-bold text-sm px-6 py-3 rounded-lg cursor-pointer border-none hover:bg-gold-dark transition-all">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </Reveal>
      </SectionWrapper>

      <FinalCTASection />
    </>
  )
}
