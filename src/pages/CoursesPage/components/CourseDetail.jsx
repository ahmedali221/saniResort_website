import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const CourseDetail = ({ course, onBackToList }) => {
  const [courseDetails, setCourseDetails] = useState(course);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch detailed course information
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await api.getCourse(course._id);
        setCourseDetails(data.course);
      } catch (err) {
        setError('Error loading course details');
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [course._id]);

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

  if (loading) {
    return (
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-white">Loading course details...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl text-red-500">Error: {error}</div>
          <button
            onClick={onBackToList}
            className="mt-4 px-6 py-3 rounded-xl font-semibold text-lg"
            style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBackToList}
          className="mb-8 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
        >
          ← Back to Courses
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Thumbnail */}
            <div>
              {courseDetails.thumbnailUrl ? (
                <img
                  src={courseDetails.thumbnailUrl}
                  alt={courseDetails.courseName}
                  className="w-full h-64 object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div>
              <h1 className="text-4xl font-bold mb-6 bruce-font" style={{ color: 'var(--bat-black)' }}>
                {courseDetails.courseName}
              </h1>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                    Year
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>
                    {courseDetails.year}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                    Status
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBgColor(courseDetails.status)} ${getStatusColor(courseDetails.status)}`}>
                    {courseDetails.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                    Sessions
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--bat-black)' }}>
                    {courseDetails.sessions?.length || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold" style={{ color: 'var(--bat-black)' }}>
                    Created
                  </span>
                  <span className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                    {formatDate(courseDetails.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Description */}
          {courseDetails.description && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--bat-black)' }}>
                Description
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
                {courseDetails.description}
              </p>
            </div>
          )}
        </div>

        {/* Sessions Section */}
        <div className="bg-white rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bruce-font" style={{ color: 'var(--bat-black)' }}>
              Course Sessions ({courseDetails.sessions?.length || 0})
            </h2>
            <button
              onClick={() => navigate(`/sessions?course=${courseDetails._id}`)}
              className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
            >
              View All Sessions
            </button>
          </div>
          
          {courseDetails.sessions && courseDetails.sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseDetails.sessions.slice(0, 6).map((session, index) => (
                <div
                  key={session._id}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`/sessions?session=${session._id}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold" style={{ color: 'var(--bat-black)' }}>
                      Session {index + 1}
                    </h4>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                      Year {session.year}
                    </span>
                  </div>
                  
                  <p className="text-sm mb-4" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    {session.description || 'No description available'}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--bat-black)', opacity: 0.6 }}>Date:</span>
                      <span style={{ color: 'var(--bat-black)' }}>
                        {formatDate(session.date)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--bat-black)', opacity: 0.6 }}>Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBgColor(session.status)} ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--bat-black)', opacity: 0.6 }}>Open Days:</span>
                      <span style={{ color: 'var(--bat-black)' }}>
                        {session.sessionOpenDays} days
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                        Click to view details
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--yellow-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--bat-black)' }}>
                No Sessions Available
              </h3>
              <p className="text-lg mb-6" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                This course doesn't have any sessions yet.
              </p>
              <button
                onClick={() => navigate('/sessions')}
                className="px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}
              >
                Browse All Sessions
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;

