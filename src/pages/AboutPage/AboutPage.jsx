import React from 'react'
import HeroSection from './components/HeroSection'
import MissionSection from './components/MissionSection'
import StatsSection from './components/StatsSection'
import ValuesSection from './components/ValuesSection'
import TeamSection from './components/TeamSection'
import CTASection from './components/CTASection'

const AboutPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bat-black)' }}>
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </div>
  )
}

export default AboutPage




