import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-96 flex items-center justify-center text-center" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="relative z-10">
        <h1 className="text-6xl font-bold bruce-font" style={{ color: 'var(--yellow-primary)' }}>
          Book Store
        </h1>
        <p className="text-xl mt-4" style={{ color: 'var(--text-primary)' }}>
          Discover our collection of mathematical books and resources.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;




