import React from 'react';

const GradeOverview = ({ user }) => {
  // Calculate stats from user data
  const quizResults = user?.quizResults || [];
  const sessionAccess = user?.sessionAccess || [];
  const watchHistory = user?.watchHistory || [];
  
  const totalQuizzes = quizResults.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(quizResults.reduce((sum, result) => sum + (result.percentage || 0), 0) / totalQuizzes)
    : 0;
  const highestScore = totalQuizzes > 0 
    ? Math.max(...quizResults.map(result => result.percentage || 0))
    : 0;
  const totalPoints = quizResults.reduce((sum, result) => sum + (result.totalScore || 0), 0);
  const completedSessions = watchHistory.length;
  const totalSessions = sessionAccess.length;

  const progressPercentage = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--bat-black)' }}>
          Your Progress Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Total Quizzes */}
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
              {totalQuizzes}
            </h3>
            <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
              Quizzes Taken
            </p>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
              {averageScore}%
            </h3>
            <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
              Average Score
            </p>
          </div>

          {/* Highest Score */}
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
              {highestScore}%
            </h3>
            <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
              Highest Score
            </p>
          </div>

          {/* Total Points */}
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
              {totalPoints}
            </h3>
            <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
              Total Points
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
              Course Progress
            </h3>
            <span className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="h-4 rounded-full transition-all duration-500"
              style={{
                backgroundColor: 'var(--bat-black)',
                width: `${progressPercentage}%`
              }}
            ></div>
          </div>
          <p className="text-lg mt-4" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
            {completedSessions} of {totalSessions} sessions completed
          </p>
        </div>
      </div>
    </section>
  );
};

export default GradeOverview;

