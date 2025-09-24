import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import HeroSection from './components/HeroSection'
import GradeOverview from './components/GradeOverview'
import QuizResults from './components/QuizResults'
import ProgressChart from './components/ProgressChart'

const GradesPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--yellow-primary)' }}></div>
          <p className="text-xl" style={{ color: 'var(--text-primary)' }}>Loading your grades...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bat-black)' }}>
      <HeroSection user={user} />
      <GradeOverview user={user} />
      <QuizResults user={user} />
      <ProgressChart user={user} />
    </div>
  )
}

export default GradesPage




