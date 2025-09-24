import React from 'react';

const QuizList = ({ quizzes, onQuizSelect }) => {
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
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--bat-black)' }}>
          Available Quizzes
        </h2>
        
        {quizzes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl" style={{ color: 'var(--bat-black)' }}>
              No quizzes available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => onQuizSelect(quiz)}
              >
                {/* Quiz Title */}
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--bat-black)' }}>
                  {quiz.title}
                </h3>

                {/* Session Info */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    Session
                  </p>
                  <p className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
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
                    </div>
                  )}
                </div>

                {/* Quiz Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Questions
                    </p>
                    <p className="text-lg font-bold" style={{ color: 'var(--bat-black)' }}>
                      {quiz.numberOfQuestions}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Points per Question
                    </p>
                    <p className="text-lg font-bold" style={{ color: 'var(--bat-black)' }}>
                      {quiz.marksPerQuestion}
                    </p>
                  </div>
                </div>

                {/* Total Points */}
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    Total Points
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--yellow-primary)' }}>
                    {quiz.numberOfQuestions * quiz.marksPerQuestion}
                  </p>
                </div>

                {/* Date */}
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    Created
                  </p>
                  <p className="text-base" style={{ color: 'var(--bat-black)' }}>
                    {formatDate(quiz.date)}
                  </p>
                </div>

                {/* Resources Available */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {quiz.answersPdfUrl && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                      PDF Answers
                    </span>
                  )}
                  {quiz.modelAnswersVideoUrl && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                      Video Solutions
                    </span>
                  )}
                </div>

                {/* Start Quiz Button */}
                <button
                  className="w-full px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuizSelect(quiz);
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizList;
