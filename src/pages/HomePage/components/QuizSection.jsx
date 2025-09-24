import React, { useState } from 'react';

const QuizSection = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const quizData = {
    question: "Solve for x: 2x + 8 = 16",
    options: [
      { id: 'a', text: 'x = 4', isCorrect: true },
      { id: 'b', text: 'x = 8', isCorrect: false },
      { id: 'c', text: 'x = 6', isCorrect: false },
      { id: 'd', text: 'x = 2', isCorrect: false }
    ]
  };

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold mb-2 bruce-font" style={{ color: 'var(--bat-black)' }}>
            Test your knowledge
          </h2>
          <p className="text-xl" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
            Try a quick problem to see how our interactive learning works
          </p>
        </div>

        {/* Quiz Card */}
        <div className=" p-12 shadow-2xl max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 bruce-font" style={{ color: 'var(--bat-black)' }}>
            Algebra Challenge
          </h3>
          
          <p className="text-2xl font-semibold mb-8" style={{ color: 'var(--bat-black)' }}>
            {quizData.question}
          </p>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {quizData.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.isCorrect;
              const isWrong = isSelected && !isCorrect;
              const isRight = isSelected && isCorrect;

              let buttonStyle = {
                backgroundColor: 'var(--bat-black)',
                color: 'var(--yellow-primary)',
                border: '2px solid var(--bat-black)'
              };

              if (showResult) {
                if (isRight) {
                  buttonStyle = {
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: '2px solid #10B981'
                  };
                } else if (isWrong) {
                  buttonStyle = {
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: '2px solid #EF4444'
                  };
                } else if (isCorrect) {
                  buttonStyle = {
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: '2px solid #10B981'
                  };
                }
              } else if (isSelected) {
                buttonStyle = {
                  backgroundColor: 'var(--yellow-primary)',
                  color: 'var(--bat-black)',
                  border: '2px solid var(--bat-black)'
                };
              }

              return (
                <button
                  key={option.id}
                  className="px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  style={buttonStyle}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showResult}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className="mb-6">
              {selectedAnswer && quizData.options.find(opt => opt.id === selectedAnswer)?.isCorrect ? (
                <div className="text-2xl font-bold text-green-600 mb-4">
                  🎉 Correct! Great job!
                </div>
              ) : (
                <div className="text-2xl font-bold text-red-600 mb-4">
                  ❌ Not quite right. The correct answer is x = 4
                </div>
              )}
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
              >
                Try Another Problem
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;




