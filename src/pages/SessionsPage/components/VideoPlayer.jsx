import React, { useRef, useState, useEffect } from 'react'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa'

const VideoPlayer = ({ src, poster, onPlay, onPause }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }
    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [onPlay, onPause])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    video.currentTime = newTime
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(showControls)
    setTimeout(() => setShowControls(false), 3000)
  }

  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <FaPlay className="text-6xl mx-auto mb-4 opacity-50" />
          <p className="text-xl">Video not available</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full h-full bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />

      {/* Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Top Controls */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
          >
            {isFullscreen ? <FaCompress className="text-lg" /> : <FaExpand className="text-lg" />}
          </button>
        </div>

          {/* Center Play Button */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-2xl"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <FaPlay className="text-3xl text-white ml-1" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer hover:h-2 transition-all duration-200"
            onClick={handleSeek}
          >
            <div 
              className="h-full rounded-full transition-all duration-200"
              style={{ 
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                backgroundColor: 'var(--yellow-primary)'
              }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
              >
                {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
              >
                {isMuted ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
              </button>

              <div className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white text-sm">
                {isFullscreen ? 'Press ESC to exit fullscreen' : 'Click to play/pause'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
