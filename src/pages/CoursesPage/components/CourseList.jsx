import React from 'react';

const CourseList = ({ courses, onCourseSelect, filters, onFilterChange }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'published' ? 'text-green-600' : 'text-yellow-600';
  };

  const getStatusBgColor = (status) => {
    return status === 'published' ? 'bg-green-100' : 'bg-yellow-100';
  };

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--bat-black)' }}>
          Available Courses
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            style={{ backgroundColor: 'white' }}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
          
          <select
            value={filters.year}
            onChange={(e) => onFilterChange({ year: e.target.value })}
            className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none"
            style={{ backgroundColor: 'white' }}
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl" style={{ color: 'var(--bat-black)' }}>
              No courses available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => onCourseSelect(course)}
              >
                {/* Course Thumbnail */}
                {course.thumbnailUrl && (
                  <div className="mb-6">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.courseName}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Course Title */}
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--bat-black)' }}>
                  {course.courseName}
                </h3>

                {/* Course Description */}
                {course.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                )}

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Year
                    </span>
                    <span className="text-lg font-bold" style={{ color: 'var(--bat-black)' }}>
                      {course.year}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Status
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(course.status)} ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Sessions
                    </span>
                    <span className="text-lg font-bold" style={{ color: 'var(--bat-black)' }}>
                      {course.sessions?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Course Created Date */}
                <div className="mb-6">
                  <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.6 }}>
                    Created: {formatDate(course.createdAt)}
                  </p>
                </div>

                {/* View Course Button */}
                <button
                  className="w-full px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCourseSelect(course);
                  }}
                >
                  View Course
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseList;




