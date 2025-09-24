import React from 'react';
import { FaCalculator, FaRulerCombined, FaChartArea, FaChartLine, FaChartBar, FaBalanceScale } from 'react-icons/fa';

const SubjectsSection = () => {
  const subjects = [
    {
      id: 'algebra',
      title: 'Algebra',
      description: 'Solve equations and master variables like decoding secret messages',
      icon: <FaCalculator className="text-3xl" />,
      isPopular: false
    },
    {
      id: 'geometry',
      title: 'Geometry',
      description: 'Explore shapes and spatial relationships with visual precision',
      icon: <FaRulerCombined className="text-3xl" />,
      isPopular: true
    },
    {
      id: 'integration',
      title: 'Integration',
      description: 'Calculate areas and accumulate knowledge step by step',
      icon: <FaChartArea className="text-3xl" />,
      isPopular: false
    },
    {
      id: 'differentiation',
      title: 'Differentiation',
      description: 'Master the art of finding rates of change and slopes',
      icon: <FaChartLine className="text-3xl" />,
      isPopular: false
    },
    {
      id: 'statistics',
      title: 'Statistics',
      description: 'Analyze data and make informed decisions with confidence',
      icon: <FaChartBar className="text-3xl" />,
      isPopular: false
    },
    {
      id: 'statics',
      title: 'Statics',
      description: 'Study forces and equilibrium in engineering applications',
      icon: <FaBalanceScale className="text-3xl" />,
      isPopular: false
    }
  ];

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bruce-font" style={{ color: 'var(--bat-black)' }}>
            Choose your mathematical superpower
          </h2>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {subjects.map((subject, index) => (
            <div
              key={subject.id}
              className="relative p-8 border-2 border-black transition-all duration-300 hover:bg-black hover:scale-105 cursor-pointer flex flex-col items-center group"
            >
              {/* Most Popular Badge */}
              {subject.isPopular && (
                <div 
                  className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: 'var(--bat-black)',
                    color: 'var(--text-primary)',
                    zIndex: 10 // Ensure badge is above overlay
                  }}
                >
                  Most Popular
                </div>
              )}

            
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-black group-hover:text-white transition-colors duration-300 relative z-10"
              >
                {subject.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 text-center text-black group-hover:text-white transition-colors duration-300 relative z-10">
                {subject.title}
              </h3>

              {/* Description */}
              <p 
                className="text-base text-black text-center group-hover:text-white transition-colors duration-300 relative z-10"
              >
                {subject.description}
              </p>

              {/* Hover effect overlay */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-50"
                style={{ 
                  backgroundColor: 'var(--shadow-yellow-hover)',
                  pointerEvents: 'none',
                  zIndex: 0 // Ensure overlay is below content
                }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;




