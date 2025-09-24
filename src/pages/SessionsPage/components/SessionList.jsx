import React from 'react'
import { FaPlay, FaCalendarAlt, FaClock, FaBook, FaFilter } from 'react-icons/fa'

const SessionList = ({ sessions, onSessionSelect, filters, onFilterChange }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'unpublished':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border-2" style={{ borderColor: 'var(--yellow-primary)' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--yellow-primary)' }}>
              <FaFilter className="text-xl" style={{ color: 'var(--bat-black)' }} />
            </div>
            <h3 className="text-xl font-bold bruce-font" style={{ color: 'var(--bat-black)' }}>
              Filter Sessions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Course
              </label>
                <select
                  value={filters.course}
                  onChange={(e) => onFilterChange({ course: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                  style={{ borderColor: 'var(--bat-light-gray)' }}
                >
                <option value="">All Courses</option>
                {/* Course options would be populated from API */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => onFilterChange({ status: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                style={{ borderColor: 'var(--bat-light-gray)' }}
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                Year
              </label>
              <select
                value={filters.year}
                onChange={(e) => onFilterChange({ year: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors"
                style={{ borderColor: 'var(--bat-light-gray)' }}
              >
                <option value="">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        {sessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
              <FaBook className="text-4xl" style={{ color: 'var(--bat-black)', opacity: 0.5 }} />
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              No Sessions Found
            </h3>
            <p className="text-lg" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
              Try adjusting your filters or check back later for new sessions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-yellow-400"
                onClick={() => onSessionSelect(session)}
              >
                {/* Session Thumbnail */}
                <div className="relative h-48 bg-gray-200">
                  {session.thumbnail ? (
                    <img
                      src={`https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/${session.thumbnail.public_id}`}
                      alt={session.description || 'Session thumbnail'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                      <FaPlay className="text-4xl" style={{ color: 'var(--bat-black)', opacity: 0.5 }} />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                      <FaPlay className="text-2xl ml-1" style={{ color: 'var(--bat-black)' }} />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                </div>

                {/* Session Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCalendarAlt className="text-sm" style={{ color: 'var(--yellow-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      {formatDate(session.date)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 bruce-font" style={{ color: 'var(--bat-black)' }}>
                    {session.description || `Session ${session.year}`}
                  </h3>

                  {session.course && (
                    <p className="text-sm mb-4" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      Course: {session.course.courseName}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        <span>Year {session.year}</span>
                      </div>
                      {session.sessionOpenDays > 0 && (
                        <div className="flex items-center gap-1">
                          <span>{session.sessionOpenDays} days</span>
                        </div>
                      )}
                    </div>
                    
                  <div className="flex items-center gap-2">
                    {session.trailer && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm" style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}>
                        Trailer
                      </span>
                    )}
                    {session.resources && session.resources.length > 0 && (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold shadow-sm" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                        {session.resources.length} Resources
                      </span>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SessionList
