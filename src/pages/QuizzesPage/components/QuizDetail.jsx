import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const QuizDetail = ({ quiz, onStartQuiz, onBackToList }) => {
  const [questions, setQuestions] = useState([])
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSessionName = (session) => {
    if (!session) return 'Unknown Session';
    return session.description || `Year ${session.year} Session` || `Session ${session._id}`;
  };

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBackToList}
          className="mb-8 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
        >
          ← Back to Quizzes
        </button>

        {/* Quiz Header */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
            {quiz.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Session
              </h3>
              <p className="text-xl font-semibold" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                {getSessionName(quiz.session)}
              </p>
              {quiz.session && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.6 }}>
                    Year {quiz.session.year}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.6 }}>
                    Status: {quiz.session.status}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.6 }}>
                    Session Date: {formatDate(quiz.session.date)}
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Quiz Created
              </h3>
              <p className="text-xl" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                {formatDate(quiz.date)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                Number of Questions
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {quiz.numberOfQuestions}
              </p>
            </div>
            
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                Points per Question
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {quiz.marksPerQuestion}
              </p>
            </div>
            
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                Total Points
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {quiz.numberOfQuestions * quiz.marksPerQuestion}
              </p>
            </div>
          </div>

          {/* Resources */}
          {(quiz.answersPdfUrl || quiz.modelAnswersVideoUrl) && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                Available Resources
              </h3>
              <div className="flex flex-wrap gap-4">
                {quiz.answersPdfUrl && (
                  <a
                    href={quiz.answersPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
                  >
                    📄 Download PDF Answers
                  </a>
                )}
                {quiz.modelAnswersVideoUrl && (
                  <a
                    href={quiz.modelAnswersVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
                  >
                    🎥 Watch Video Solutions
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Questions Preview */}
          {loading && (
            <div className="text-center py-8">
              <p className="text-lg" style={{ color: 'var(--bat-black)' }}>
                Loading questions...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-lg text-red-600">
                Error loading questions: {error}
              </p>
            </div>
          )}

          {!loading && !error && questions.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--bat-black)' }}>
                Questions Preview ({questions.length} questions)
              </h3>
              <div className="space-y-4">
                {questions.slice(0, 3).map((question, index) => (
                  <div key={question._id} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                      Question {index + 1}
                    </p>
                    <p className="text-base" style={{ color: 'var(--text-primary)' }}>
                      {question.text}
                    </p>
                  </div>
                ))}
                {questions.length > 3 && (
                  <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    ... and {questions.length - 3} more questions
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => onStartQuiz(quiz)}
              className="px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
            >
              Start Quiz Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizDetail;
