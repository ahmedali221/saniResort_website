import React, { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import QuizList from './components/QuizList'
import QuizDetail from './components/QuizDetail'
import QuizTaking from './components/QuizTaking'
import QuizResults from './components/QuizResults'
import api from '../../services/api'

const QuizzesPage = () => {
  const [currentView, setCurrentView] = useState('list') // 'list', 'detail', 'taking', 'results'
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch quizzes from backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const data = await api.getQuizzes()
        setQuizzes(data.items)
      } catch (err) {
        setError('Error connecting to server')
        console.error('Error fetching quizzes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz)
    setCurrentView('detail')
  }

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz)
    setCurrentView('taking')
  }

  const handleQuizComplete = (results) => {
    setQuizResults(results)
    setCurrentView('results')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedQuiz(null)
    setQuizResults(null)
  }

  const handleBackToDetail = () => {
    setCurrentView('detail')
    setQuizResults(null)
  }

  const handleRetakeQuiz = () => {
    setQuizResults(null)
    setCurrentView('taking')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bat-black)' }}>
      <HeroSection />
      
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="text-2xl text-white">Loading quizzes...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-20">
          <div className="text-2xl text-red-500">Error: {error}</div>
        </div>
      )}

      {!loading && !error && currentView === 'list' && (
        <QuizList 
          quizzes={quizzes} 
          onQuizSelect={handleQuizSelect}
        />
      )}

      {!loading && !error && currentView === 'detail' && selectedQuiz && (
        <QuizDetail 
          quiz={selectedQuiz}
          onStartQuiz={handleStartQuiz}
          onBackToList={handleBackToList}
        />
      )}

      {!loading && !error && currentView === 'taking' && selectedQuiz && (
        <QuizTaking 
          quiz={selectedQuiz}
          onBackToDetail={handleBackToDetail}
          onBackToList={handleBackToList}
          onQuizComplete={handleQuizComplete}
        />
      )}

      {!loading && !error && currentView === 'results' && selectedQuiz && quizResults && (
        <QuizResults 
          quiz={selectedQuiz}
          results={quizResults}
          onBackToDetail={handleBackToDetail}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}
    </div>
  )
}

export default QuizzesPage
