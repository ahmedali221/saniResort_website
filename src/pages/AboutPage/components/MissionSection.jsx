import React from 'react';

const MissionSection = () => {
  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
              Our Mission
            </h2>
            <p className="text-lg mb-6" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
              To democratize mathematics education by making complex concepts accessible, 
              engaging, and fun for students worldwide. We believe every student has the 
              potential to excel in math when given the right tools and support.
            </p>
            <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
              Through gamification, interactive content, and personalized learning paths, 
              we're building the future of mathematics education.
            </p>
          </div>
          <div className="relative">
            <div className="w-full h-96 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1509228627929-09f72a8b2de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Math Education"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;




