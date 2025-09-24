import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
            Ready to Become a Math Hero?
          </h2>
          <p className="text-xl" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
            Join thousands of students who are already mastering mathematics with BatMath
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="border-none px-8 py-4 rounded-xl font-bold text-lg cursor-pointer transition-all duration-300 flex items-center gap-2 relative overflow-hidden min-w-[200px] hover:min-w-[220px] group" style={{background: 'var(--bat-black)', color: 'var(--yellow-primary)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'}} onMouseEnter={(e) => {e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';}} onMouseLeave={(e) => {e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';}}>
            <span className="transition-all duration-300">Start learning</span>
            <span className="text-xl font-black opacity-0 -translate-x-2.5 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
          </button>

          <button className="bg-transparent border-2 px-8 py-4 rounded-xl font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105" style={{borderColor: 'var(--bat-black)', color: 'var(--bat-black)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-black)'; e.target.style.color = 'var(--yellow-primary)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--bat-black)';}}>
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;




