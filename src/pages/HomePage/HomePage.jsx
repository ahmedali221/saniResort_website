import React from 'react'
import HeroSection from './components/HeroSection'
import SubjectsSection from './components/SubjectsSection'
import FeaturedCourses from './components/FeaturedCourses'
import QuizSection from './components/QuizSection'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <SubjectsSection />
      <FeaturedCourses />
      <QuizSection />
      <Testimonials />
      <CTASection />
    </main>
  )
}

export default HomePage




