import React from 'react';

const QuizResults = ({ user }) => {
  // Get quiz results from user data
  const quizResults = user?.quizResults || [];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    if (score >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 80) return 'bg-yellow-100'
    if (score >= 70) return 'bg-orange-100'
    return 'bg-red-100'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--text-primary)' }}>
          Recent Quiz Results
        </h2>
        
        {quizResults.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              No Quiz Results Yet
            </h3>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Start taking quizzes to see your results here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizResults.slice(0, 6).map((quiz, index) => (
              <div
                key={quiz._id || index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl"
              >
                {/* Quiz Title */}
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--bat-black)' }}>
                  {quiz.quizTitle || `Quiz ${index + 1}`}
                </h3>

                {/* Score Display */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-4 py-2 rounded-full text-lg font-bold ${getScoreBgColor(quiz.percentage || 0)} ${getScoreColor(quiz.percentage || 0)}`}>
                    {quiz.percentage || 0}%
                  </div>
                  <div className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    {formatDate(quiz.completedAt || quiz.createdAt)}
                  </div>
                </div>

                {/* Quiz Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Correct Answers:
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                      {quiz.correctAnswers || 0}/{quiz.totalQuestions || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Time Spent:
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                      {quiz.timeSpent ? `${Math.floor(quiz.timeSpent / 60)}:${(quiz.timeSpent % 60).toString().padStart(2, '0')}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Total Score:
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                      {quiz.totalScore || 0} pts
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: (quiz.percentage || 0) >= 90 ? '#10B981' : (quiz.percentage || 0) >= 80 ? '#F59E0B' : (quiz.percentage || 0) >= 70 ? '#F97316' : '#EF4444',
                      width: `${quiz.percentage || 0}%`
                    }}
                  ></div>
                </div>

                {/* Performance Message */}
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                    {(quiz.percentage || 0) >= 90 ? 'Excellent!' : (quiz.percentage || 0) >= 80 ? 'Great job!' : (quiz.percentage || 0) >= 70 ? 'Good work!' : 'Keep practicing!'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            View All Results
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;

