import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "50,000+", label: "Students Helped" },
    { number: "95%", label: "Success Rate" },
    { number: "25+", label: "Countries" },
    { number: "4.8/5", label: "Average Rating" }
  ];

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--text-primary)' }}>
          Our Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: 'var(--yellow-primary)' }}>
                {stat.number}
              </div>
              <div className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;




