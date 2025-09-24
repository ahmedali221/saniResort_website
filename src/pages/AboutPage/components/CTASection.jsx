import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
          Ready to Join Our Mission?
        </h2>
        <p className="text-xl mb-8" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
          Be part of the revolution in mathematics education. Start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
            Start Learning Now
          </button>
          <button className="px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 hover:scale-105" style={{ borderColor: 'var(--bat-black)', color: 'var(--bat-black)' }}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;




