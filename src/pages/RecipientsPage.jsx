import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import StoryCard from '../components/StoryCard.jsx'
import Button from '../components/Button.jsx'
import { STORIES } from '../data/index.js'
import { FinalCTASection } from '../sections/FounderSection.jsx'

const FILTERS = ['All', 'Africa', 'Asia', 'South America', 'Europe']

export default function RecipientsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const REGION_MAP = {
    Africa:        ['Nigeria', 'Kenya'],
    Asia:          ['India', 'Vietnam', 'Philippines'],
    'South America': ['Colombia'],
    Europe:        [],
  }

  const filtered = activeFilter === 'All'
    ? STORIES
    : STORIES.filter((s) => (REGION_MAP[activeFilter] || []).includes(s.country))

  return (
    <>
      <section className="bg-navy pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-white/40 text-xs mb-2">Home › Recipients</p>
          <h1 className="font-spartan font-black text-white text-5xl md:text-6xl mb-4">RECIPIENTS</h1>
          <p className="text-white/60 text-base max-w-xl">
            Real people. Real stories. Real transformation.
          </p>
        </div>
      </section>

      <SectionWrapper bg="white">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-spartan cursor-pointer border transition-all ${
                activeFilter === f
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-navy hover:text-navy'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)
          ) : (
            <p className="text-gray-400 col-span-3 text-center py-12">No recipients in this region yet.</p>
          )}
        </div>

        {/* CTA below */}
        <Reveal>
          <div className="mt-16 bg-navy rounded-2xl p-10 text-center">
            <h3 className="font-spartan font-black text-white text-3xl mb-3">
              YOU CAN BE THE REASON SOMEONE WALKS AGAIN.
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
              Every donation directly funds a prosthetic fitting and changes a life forever.
            </p>
            <Button to="/donate" variant="gold" size="lg">DONATE NOW</Button>
          </div>
        </Reveal>
      </SectionWrapper>

      <FinalCTASection />
    </>
  )
}
