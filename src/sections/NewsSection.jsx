import React from 'react'
import SectionWrapper, { Reveal, SectionHeading } from '../components/SectionWrapper.jsx'
import NewsCard from '../components/NewsCard.jsx'
import Button from '../components/Button.jsx'
import { NEWS } from '../data/index.js'

export default function NewsSection() {
  return (
    <SectionWrapper bg="gray">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <Reveal>
          <SectionHeading
            tag="News & Updates"
            title="LATEST FROM NLPI"
            subtitle="Stay informed with the stories, milestones, and events shaping our global mission."
          />
        </Reveal>
        <Reveal delay={0.2}>
          <Button to="/news" variant="gold" size="sm">ALL NEWS →</Button>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {NEWS.map((article, i) => (
          <NewsCard key={article.title} article={article} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
