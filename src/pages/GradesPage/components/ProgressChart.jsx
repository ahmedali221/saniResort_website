import React from 'react';

const ProgressChart = ({ user }) => {
  // Mock progress data for the last 7 days
  const progressData = [
    { day: 'Mon', score: 85, quizzes: 2 },
    { day: 'Tue', score: 92, quizzes: 3 },
    { day: 'Wed', score: 78, quizzes: 1 },
    { day: 'Thu', score: 95, quizzes: 4 },
    { day: 'Fri', score: 88, quizzes: 2 },
    { day: 'Sat', score: 91, quizzes: 3 },
    { day: 'Sun', score: 87, quizzes: 2 }
  ]

  const maxScore = Math.max(...progressData.map(d => d.score))
  const maxQuizzes = Math.max(...progressData.map(d => d.quizzes))

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--bat-black)' }}>
          Weekly Progress
        </h2>
        
        <div className="bg-white rounded-2xl p-8">
          {/* Chart Header */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--bat-black)' }}>
              Last 7 Days Performance
            </h3>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--bat-black)' }}></div>
                <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                  Average Score
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'var(--yellow-primary)' }}></div>
                <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                  Quizzes Taken
                </span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 flex items-end justify-between gap-4">
            {progressData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                {/* Score Bar */}
                <div className="w-full flex flex-col items-center mb-2">
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--bat-black)',
                      height: `${(data.score / maxScore) * 200}px`,
                      minHeight: '20px'
                    }}
                  ></div>
                  <div className="text-xs font-semibold mt-1" style={{ color: 'var(--bat-black)' }}>
                    {data.score}%
                  </div>
                </div>

                {/* Quiz Count Bar */}
                <div className="w-full flex flex-col items-center">
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--yellow-primary)',
                      height: `${(data.quizzes / maxQuizzes) * 100}px`,
                      minHeight: '10px'
                    }}
                  ></div>
                  <div className="text-xs font-semibold mt-1" style={{ color: 'var(--bat-black)' }}>
                    {data.quizzes}
                  </div>
                </div>

                {/* Day Label */}
                <div className="text-sm font-semibold mt-2" style={{ color: 'var(--bat-black)' }}>
                  {data.day}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
                {Math.round(progressData.reduce((sum, d) => sum + d.score, 0) / progressData.length)}%
              </div>
              <div className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                Average Score
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
                {progressData.reduce((sum, d) => sum + d.quizzes, 0)}
              </div>
              <div className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                Total Quizzes
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--bat-black)' }}>
                {Math.max(...progressData.map(d => d.score))}%
              </div>
              <div className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                Best Score
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressChart;




