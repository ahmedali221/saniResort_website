import React from 'react';

const ValuesSection = () => {
  const values = [
    {
      icon: "🎯",
      title: "Student-Centered Learning",
      description: "Every feature is designed with student success in mind, making complex math concepts accessible and engaging."
    },
    {
      icon: "🚀",
      title: "Innovation in Education",
      description: "We leverage cutting-edge technology to create immersive learning experiences that traditional methods can't match."
    },
    {
      icon: "🤝",
      title: "Collaborative Community",
      description: "Building a supportive ecosystem where students, teachers, and parents work together for academic success."
    },
    {
      icon: "📈",
      title: "Measurable Results",
      description: "Our platform provides real-time analytics to track progress and ensure continuous improvement."
    }
  ];

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--bat-black)' }}>
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--bat-black)' }}>
                {value.title}
              </h3>
              <p className="text-base" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;




