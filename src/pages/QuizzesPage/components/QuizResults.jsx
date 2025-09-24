import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaClock, FaTrophy, FaRedo } from 'react-icons/fa';
import api from '../../../services/api';

const QuizResults = ({ quiz, results, onBackToDetail, onRetakeQuiz }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions for detailed review
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await api.getQuizQuestions(quiz._id);
        setQuestions(data.items || []);
      } catch (err) {
        setError('Error loading questions for review');
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quiz._id]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 70) return 'bg-yellow-100';
    if (percentage >= 50) return 'bg-orange-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-white">Loading quiz review...</div>
        </div>
      </section>
    );
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
    );
  }

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bruce-font mb-4" style={{ color: 'var(--yellow-primary)' }}>
            Quiz Results
          </h1>
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            {quiz.title}
          </h2>
        </div>

        {/* Score Summary */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
              <FaTrophy className="text-4xl mx-auto mb-4" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                Score
              </p>
              <p className={`text-3xl font-bold ${getScoreColor(results.percentage)}`}>
                {results.percentage}%
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
              <FaCheck className="text-4xl mx-auto mb-4" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                Correct
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {results.correctAnswers}/{results.totalQuestions}
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
              <FaClock className="text-4xl mx-auto mb-4" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                Time Spent
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {formatTime(results.timeSpent || 0)}
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'var(--bat-black)' }}>
              <FaTrophy className="text-4xl mx-auto mb-4" style={{ color: 'var(--yellow-primary)' }} />
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                Total Points
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {results.totalScore || (results.correctAnswers * quiz.marksPerQuestion)}
              </p>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center">
            {results.percentage >= 90 && (
              <div className="inline-block px-8 py-4 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                  🎉 Outstanding Performance! You're a Math Superhero!
                </p>
              </div>
            )}
            {results.percentage >= 70 && results.percentage < 90 && (
              <div className="inline-block px-8 py-4 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                  👍 Excellent Work! You're Doing Great!
                </p>
              </div>
            )}
            {results.percentage >= 50 && results.percentage < 70 && (
              <div className="inline-block px-8 py-4 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                  📚 Good Effort! Keep Practicing to Improve!
                </p>
              </div>
            )}
            {results.percentage < 50 && (
              <div className="inline-block px-8 py-4 rounded-xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
                  💪 Don't Give Up! Review and Try Again!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h3 className="text-2xl font-bold bruce-font mb-6" style={{ color: 'var(--bat-black)' }}>
            Answer Review
          </h3>
          
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = results.answers?.[question._id];
              const correctAnswer = question.options?.[question.correctOptionIndex];
              const isCorrect = userAnswer === correctAnswer;
              
              return (
                <div key={question._id} className="p-6 rounded-xl border-2" style={{ 
                  borderColor: isCorrect ? '#10b981' : '#ef4444',
                  backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2'
                }}>
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                      Question {index + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <FaCheck className="text-green-600 text-xl" />
                      ) : (
                        <FaTimes className="text-red-600 text-xl" />
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-lg mb-4" style={{ color: 'var(--bat-black)' }}>
                    {question.text}
                  </p>
                  
                  {question.options && question.options.length > 0 && (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                          Your Answer:
                        </p>
                        <p className={`p-3 rounded-lg ${
                          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {userAnswer || 'No answer provided'}
                        </p>
                      </div>
                      
                      {!isCorrect && correctAnswer && (
                        <div>
                          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                            Correct Answer:
                          </p>
                          <p className="p-3 rounded-lg bg-green-100 text-green-800">
                            {correctAnswer}
                          </p>
                        </div>
                      )}
                      
                      {question.explanation && (
                        <div>
                          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                            Explanation:
                          </p>
                          <p className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bat-light-gray)', color: 'var(--bat-black)' }}>
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBackToDetail}
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            Back to Quiz Details
          </button>
          <button
            onClick={onRetakeQuiz}
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
          >
            <FaRedo />
            Retake Quiz
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;
