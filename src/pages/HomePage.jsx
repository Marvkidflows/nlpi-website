import React from 'react'
import HeroSection           from '../sections/HeroSection.jsx'
import ImpactSection         from '../sections/ImpactSection.jsx'
import WhyMattersSection     from '../sections/WhyMattersSection.jsx'
import GlobalReachSection    from '../sections/GlobalReachSection.jsx'
import RecipientStoriesSection from '../sections/RecipientStoriesSection.jsx'
import HowHelpSection        from '../sections/HowHelpSection.jsx'
import TransparencySection   from '../sections/TransparencySection.jsx'
import { FounderSection, FinalCTASection } from '../sections/FounderSection.jsx'
import NewsSection           from '../sections/NewsSection.jsx'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <WhyMattersSection />
      <GlobalReachSection />
      <RecipientStoriesSection />
      <HowHelpSection />
      <TransparencySection />
      <FounderSection />
      <NewsSection />
      <FinalCTASection />
    </>
  )
}
