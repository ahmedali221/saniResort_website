import React from 'react';

const FeaturedCourses = () => {
  const courses = [
    {
      id: 'algebra-essentials',
      title: 'Algebra Essentials',
      description: 'Master equations and problem-solving',
      image: 'https://images.unsplash.com/photo-1509228627929-09f72a8b2de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Algebra'
    },
    {
      id: 'physics-dynamics',
      title: 'Physics Dynamics',
      description: 'Motion, forces, and energy in action',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Physics'
    },
    {
      id: 'advance-statics',
      title: 'Advance Statics',
      description: 'Advanced geometric proofs and constructions',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Geometry'
    },
    {
      id: 'geometry-masterclass',
      title: 'Geometry Masterclass',
      description: 'Advanced geometric proofs and constructions',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Geometry'
    },
    {
      id: 'calculus-fundamentals',
      title: 'Calculus Fundamentals',
      description: 'Integration and differentiation made simple',
      image: 'https://images.unsplash.com/photo-1509228627929-09f72a8b2de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Calculus'
    },
    {
      id: 'dynamics-2nd-class',
      title: 'Dynamics for 2nd class',
      description: 'Advanced geometric proofs and constructions',
      image: 'https://images.unsplash.com/photo-1635070666073-250f0d6e62e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      category: 'Physics'
    }
  ];

  return (
    <section className="py-20 px-20" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bruce-font" style={{ color: 'var(--text-primary)' }}>
            Featured learning experiences
          </h2>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Choose your mathematical superpower
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative bg-transparent rounded-2xl p-8 border-2 border-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              {/* Course Image/Icon */}
              <div className=" rounded-xl flex items-center justify-center text-4xl mb-6" style={{ backgroundColor: 'var(--bat-black)' }}>
                <img src={course.image} alt={course.title} className="w-full h-full object-cover rounded-xl" />
              </div>

              {/* Course Title */}
               <h3 className="text-2xl font-bold mb-4 text-white" >
                 {course.title}
               </h3>

              {/* Course Description */}
              <p className="text-base leading-relaxed mb-4 text-white">
                {course.description}
              </p>

              {/* Course Category */}
              <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                {course.category}
              </div>

              {/* Hover effect overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-50"
                style={{ backgroundColor: 'orange', zIndex: 10 }}
              />
            </div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center">
          <button className="border-none px-8 py-4 rounded-xl font-bold text-lg cursor-pointer transition-all duration-300 flex items-center gap-2 relative overflow-hidden min-w-[200px] hover:min-w-[220px] group mx-auto" style={{background: 'var(--yellow-primary)', color: '#000', boxShadow: '0 4px 15px var(--shadow-yellow)'}} onMouseEnter={(e) => {e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px var(--shadow-yellow-hover)';}} onMouseLeave={(e) => {e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px var(--shadow-yellow)';}}>
            <span className="transition-all duration-300">View all courses</span>
            <span className="text-xl font-black opacity-0 -translate-x-2.5 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;




