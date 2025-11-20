import React from 'react'
import HeroSection from './components/HeroSection'
import FiveHotelsSection from './components/FiveHotelsSection'
import AdventuresSection from './components/AdventuresSection'
import ResortMapSection from './components/ResortMapSection'
import ExperiencesSection from './components/ExperiencesSection'
import FamiliesSection from './components/FamiliesSection'
import WellnessSection from './components/WellnessSection'
import AwardsSection from './components/AwardsSection'
import RelaxingEscapesSection from './components/RelaxingEscapesSection'
import OffersSliderSection from './components/OffersSliderSection'
import GastronomySection from './components/GastronomySection'
import GastronomyImageSection from './components/GastronomyImageSection'
import SustainabilitySection from './components/SustainabilitySection'
import AcademiesSliderSection from './components/AcademiesSliderSection'
import NewsSection from './components/NewsSection'
import FooterSection from './components/FooterSection'

const LandingPage = () => {
  return (
    <main className="w-full">
      <HeroSection />
      <FiveHotelsSection />
      <AdventuresSection />
      <ResortMapSection />
      <ExperiencesSection />
      <FamiliesSection />
      <WellnessSection />
      <AwardsSection />
      <RelaxingEscapesSection />
      <OffersSliderSection />
      <GastronomySection />
      <GastronomyImageSection />
      <SustainabilitySection />
   <AcademiesSliderSection />
   <NewsSection />
   <FooterSection />
    </main>
  )
}

export default LandingPage

