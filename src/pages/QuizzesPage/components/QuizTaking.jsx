import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const QuizTaking = ({ quiz, onBackToDetail, onBackToList, onQuizComplete }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch questions for this quiz
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const data = await api.getQuizQuestions(quiz._id)
        setQuestions(data.items || [])
      } catch (err) {
        setError('Error connecting to server')
        console.error('Error fetching questions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [quiz._id])

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isSubmitted])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    try {
      setLoading(true)
      
      // Submit quiz to backend
      const result = await api.submitQuiz(quiz._id, answers)
      
      // Set score from backend response
      const scoreData = {
        totalQuestions: result.totalQuestions,
        answeredQuestions: result.answeredQuestions,
        correctAnswers: result.correctAnswers,
        percentage: result.percentage,
        totalScore: result.totalScore,
        timeSpent: result.timeSpent,
        answers: answers
      }
      
      setScore(scoreData)
      setIsSubmitted(true)
      
      // Call the completion callback with results
      if (onQuizComplete) {
        onQuizComplete(scoreData)
      }
    } catch (err) {
      console.error('Error submitting quiz:', err)
      setError('Failed to submit quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getQuestionNumber = (index) => {
    return index + 1
  }

  if (loading) {
    return (
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-white">Loading quiz questions...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-red-500">Error: {error}</div>
          <button
            onClick={onBackToDetail}
            className="mt-4 px-6 py-3 rounded-xl font-semibold text-lg"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            Go Back
          </button>
        </div>
      </section>
    )
  }

  if (questions.length === 0) {
    return (
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-white">No questions available for this quiz.</div>
          <button
            onClick={onBackToDetail}
            className="mt-4 px-6 py-3 rounded-xl font-semibold text-lg"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            Go Back
          </button>
        </div>
      </section>
    )
  }

  if (isSubmitted) {
    return (
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 bruce-font" style={{ color: 'var(--bat-black)' }}>
            Quiz Completed!
          </h1>
          
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--bat-black)' }}>
              Your Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                  Correct Answers
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {score.correctAnswers}/{score.totalQuestions}
                </p>
              </div>
              
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                  Percentage
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {score.percentage}%
                </p>
              </div>
              
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                  Total Score
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {score.totalScore || (score.correctAnswers * quiz.marksPerQuestion)}
                </p>
              </div>

              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                  Time Spent
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {score.timeSpent ? formatTime(score.timeSpent) : formatTime(30 * 60 - timeLeft)}
                </p>
              </div>
            </div>

            {/* Performance Message */}
            <div className="text-center mb-8">
              {score.percentage >= 90 && (
                <div className="inline-block px-6 py-3 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                  <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                    🎉 Excellent Work! Outstanding Performance!
                  </p>
                </div>
              )}
              {score.percentage >= 70 && score.percentage < 90 && (
                <div className="inline-block px-6 py-3 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                  <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                    👍 Great Job! Well Done!
                  </p>
                </div>
              )}
              {score.percentage >= 50 && score.percentage < 70 && (
                <div className="inline-block px-6 py-3 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                  <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                    📚 Good Effort! Keep Practicing!
                  </p>
                </div>
              )}
              {score.percentage < 50 && (
                <div className="inline-block px-6 py-3 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                  <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                    💪 Don't Give Up! Review and Try Again!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBackToDetail}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
            >
              View Quiz Details
            </button>
            <button
              onClick={onBackToList}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
            >
              Back to All Quizzes
            </button>
          </div>
        </div>
      </section>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBackToDetail}
            className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            ← Back to Details
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold bruce-font" style={{ color: 'var(--text-primary)' }}>
              {quiz.title}
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Question {getQuestionNumber(currentQuestionIndex)} of {questions.length}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: 'var(--yellow-primary)' }}>
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Time Remaining
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--yellow-primary)',
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--bat-black)' }}>
            {currentQuestion.text}
          </h2>
          
          {currentQuestion.options && currentQuestion.options.length > 0 && (
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:bg-gray-50"
                  style={{
                    borderColor: answers[currentQuestion._id] === option ? 'var(--yellow-primary)' : '#e5e7eb',
                    backgroundColor: answers[currentQuestion._id] === option ? 'rgba(255, 215, 0, 0.1)' : 'transparent'
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value={option}
                    checked={answers[currentQuestion._id] === option}
                    onChange={() => handleAnswerChange(currentQuestion._id, option)}
                    className="mr-4"
                  />
                  <span className="text-lg" style={{ color: 'var(--bat-black)' }}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
          
          {(!currentQuestion.options || currentQuestion.options.length === 0) && (
            <textarea
              value={answers[currentQuestion._id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
              placeholder="Enter your answer here..."
              className="w-full p-4 rounded-xl border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
              rows={4}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            ← Previous
          </button>
          
          <div className="flex gap-4">
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300"
                style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizTaking;
