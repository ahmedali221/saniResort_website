import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-20 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-6xl font-bold mb-6 bruce-font" style={{ color: 'var(--text-primary)' }}>
          Math Quizzes
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Test your mathematical knowledge with our comprehensive quiz collection. 
          Challenge yourself and track your progress as you master different math concepts.
        </p>
        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--yellow-primary)' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;




