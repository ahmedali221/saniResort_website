import React, { useState } from 'react'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaDownload, FaArrowLeft, FaCalendarAlt, FaClock, FaBook } from 'react-icons/fa'
import VideoPlayer from './VideoPlayer'

const SessionDetail = ({ session, onBack }) => {
  const [activeTab, setActiveTab] = useState('video') // 'video', 'resources', 'info'
  const [isPlaying, setIsPlaying] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getVideoUrl = (videoData) => {
    if (!videoData || !videoData.public_id) return null
    return `https://res.cloudinary.com/demo/video/upload/${videoData.public_id}.mp4`
  }

  const getResourceUrl = (resource) => {
    if (!resource || !resource.public_id) return null
    return `https://res.cloudinary.com/demo/raw/upload/${resource.public_id}`
  }

  const getThumbnailUrl = (thumbnailData) => {
    if (!thumbnailData || !thumbnailData.public_id) return null
    return `https://res.cloudinary.com/demo/image/upload/w_800,h_450,c_fill/${thumbnailData.public_id}`
  }

  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
        >
          <FaArrowLeft className="text-sm" />
          Back to Sessions
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 border-2" style={{ borderColor: 'var(--yellow-primary)' }}>
              <div className="aspect-video bg-black">
                {session.sessionVideo ? (
                  <VideoPlayer
                    src={getVideoUrl(session.sessionVideo)}
                    poster={getThumbnailUrl(session.thumbnail)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <FaPlay className="text-6xl mx-auto mb-4" style={{ color: 'var(--yellow-primary)' }} />
                      <p className="text-xl text-white">Video not available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: 'var(--bat-light-gray)' }}>
              <h1 className="text-3xl font-bold bruce-font mb-4" style={{ color: 'var(--bat-black)' }}>
                {session.description || `Session ${session.year}`}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-sm" style={{ color: 'var(--yellow-primary)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    {formatDate(session.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-sm" style={{ color: 'var(--yellow-primary)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                    Year {session.year}
                  </span>
                </div>
                {session.course && (
                  <div className="flex items-center gap-2">
                    <FaBook className="text-sm" style={{ color: 'var(--yellow-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                      {session.course.courseName}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                  session.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {session.status}
                </span>
                {session.sessionOpenDays > 0 && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold shadow-sm" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                    Open for {session.sessionOpenDays} days
                  </span>
                )}
                {session.notifyUsers && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold shadow-sm" style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}>
                    Notifications Enabled
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: 'var(--bat-light-gray)' }}>
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-300 ${
                    activeTab === 'video' ? 'border-b-2 text-yellow-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  style={{ borderBottomColor: activeTab === 'video' ? 'var(--yellow-primary)' : 'transparent' }}
                  onClick={() => setActiveTab('video')}
                >
                  Video
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-300 ${
                    activeTab === 'resources' ? 'border-b-2 text-yellow-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  style={{ borderBottomColor: activeTab === 'resources' ? 'var(--yellow-primary)' : 'transparent' }}
                  onClick={() => setActiveTab('resources')}
                >
                  Resources
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-semibold transition-colors duration-300 ${
                    activeTab === 'info' ? 'border-b-2 text-yellow-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                  style={{ borderBottomColor: activeTab === 'info' ? 'var(--yellow-primary)' : 'transparent' }}
                  onClick={() => setActiveTab('info')}
                >
                  Info
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'video' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold bruce-font" style={{ color: 'var(--bat-black)' }}>
                      Video Options
                    </h3>
                    
                    {session.trailer && (
                      <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--bat-light-gray)', borderColor: 'var(--yellow-primary)' }}>
                        <h4 className="font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                          Trailer
                        </h4>
                        <p className="text-sm mb-3" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                          Watch the session trailer
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg" style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}>
                          <FaPlay className="text-xs" />
                          Play Trailer
                        </button>
                      </div>
                    )}

                    <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--bat-light-gray)', borderColor: 'var(--bat-black)' }}>
                      <h4 className="font-semibold mb-2" style={{ color: 'var(--bat-black)' }}>
                        Main Session
                      </h4>
                      <p className="text-sm mb-3" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                        Full session video
                      </p>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
                          <FaPlay className="text-xs" />
                          Play
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 border-2 shadow-lg" style={{ borderColor: 'var(--bat-black)', color: 'var(--bat-black)', backgroundColor: 'white' }}>
                          <FaExpand className="text-xs" />
                          Fullscreen
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold bruce-font" style={{ color: 'var(--bat-black)' }}>
                      Resources
                    </h3>
                    
                    {session.resources && session.resources.length > 0 ? (
                      <div className="space-y-3">
                        {session.resources.map((resource, index) => (
                          <div key={index} className="p-4 rounded-lg border-2 hover:border-yellow-400 transition-colors duration-300 shadow-sm" style={{ borderColor: 'var(--bat-light-gray)', backgroundColor: 'white' }}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold" style={{ color: 'var(--bat-black)' }}>
                                  {resource.originalName || `Resource ${index + 1}`}
                                </h4>
                                <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                                  {resource.resourceType || 'PDF'}
                                </p>
                              </div>
                              <a
                                href={getResourceUrl(resource)}
                                download
                                className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                                style={{ backgroundColor: 'var(--yellow-primary)', color: 'var(--bat-black)' }}
                              >
                                <FaDownload className="text-xs" />
                                Download
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FaBook className="text-4xl mx-auto mb-4" style={{ color: 'var(--bat-black)', opacity: 0.3 }} />
                        <p className="text-lg" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                          No resources available for this session
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'info' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold bruce-font" style={{ color: 'var(--bat-black)' }}>
                      Session Information
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                        <label className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                          Session Date
                        </label>
                        <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                          {formatDate(session.date)}
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                        <label className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                          Year
                        </label>
                        <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                          {session.year}
                        </p>
                      </div>
                      
                      {session.course && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                          <label className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                            Course
                          </label>
                          <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                            {session.course.courseName}
                          </p>
                        </div>
                      )}
                      
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                        <label className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                          Status
                        </label>
                        <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                          {session.status}
                        </p>
                      </div>
                      
                      {session.sessionOpenDays > 0 && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                          <label className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                            Open Days
                          </label>
                          <p className="text-sm" style={{ color: 'var(--bat-black)', opacity: 0.7 }}>
                            {session.sessionOpenDays} days
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SessionDetail
