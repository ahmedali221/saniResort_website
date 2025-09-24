import React, { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import CourseList from './components/CourseList'
import CourseDetail from './components/CourseDetail'
import api from '../../services/api'

const CoursesPage = () => {
  const [currentView, setCurrentView] = useState('list') // 'list', 'detail'
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
    year: ''
  })

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await api.getCourses(filters)
        setCourses(data.courses)
      } catch (err) {
        setError('Error connecting to server')
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [filters])

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setCurrentView('detail')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedCourse(null)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bat-black)' }}>
      <HeroSection />
      
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-2xl text-white">Loading courses...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20">
          <div className="text-2xl text-red-500">Error: {error}</div>
        </div>
      )}

      {!loading && !error && currentView === 'list' && (
        <CourseList 
          courses={courses} 
          onCourseSelect={handleCourseSelect}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      {!loading && !error && currentView === 'detail' && selectedCourse && (
        <CourseDetail 
          course={selectedCourse}
          onBackToList={handleBackToList}
        />
      )}
    </div>
  )
}

export default CoursesPage




