import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import SessionList from './components/SessionList'
import SessionDetail from './components/SessionDetail'
import api from '../../services/api'

const SessionsPage = () => {
  const [currentView, setCurrentView] = useState('list') // 'list', 'detail'
  const [selectedSession, setSelectedSession] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    course: searchParams.get('course') || '',
    status: '',
    year: ''
  })

  // Fetch sessions from backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true)
        const data = await api.getSessions(filters)
        setSessions(data.sessions || [])
      } catch (err) {
        setError('Error connecting to server')
        console.error('Error fetching sessions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [filters])

  const handleSessionSelect = (session) => {
    setSelectedSession(session)
    setCurrentView('detail')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedSession(null)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bat-black)' }}>
      <HeroSection />
      
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--yellow-primary)' }}></div>
            <div className="text-2xl text-white">Loading sessions...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20">
          <div className="text-2xl text-red-500">Error: {error}</div>
        </div>
      )}

      {!loading && !error && currentView === 'list' && (
        <SessionList 
          sessions={sessions}
          onSessionSelect={handleSessionSelect}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      {!loading && !error && currentView === 'detail' && selectedSession && (
        <SessionDetail 
          session={selectedSession}
          onBack={handleBackToList}
        />
      )}
    </div>
  )
}

export default SessionsPage
