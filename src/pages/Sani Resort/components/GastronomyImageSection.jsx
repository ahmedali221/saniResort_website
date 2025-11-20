import React, { useRef, useEffect, useState } from 'react'
import foodImage from '../../../assets/sanirose/sani-club-_-ouzerie-restaurant-_-family-dining-copy.webp'

const GastronomyImageSection = () => {
  const videoRef = useRef(null)
  const modalVideoRef = useRef(null)
  const containerRef = useRef(null)
  const [hasError, setHasError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error)
        setHasError(true)
      })
    }
  }, [])

  useEffect(() => {
    // Handle modal video playback
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play()
    }
  }, [isModalOpen])

  // Smooth trailing animation for the circle
  useEffect(() => {
    const animateCircle = () => {
      setCirclePosition(prev => {
        const dx = mousePosition.x - prev.x
        const dy = mousePosition.y - prev.y
        
        // Easing factor - higher = slower follow (0.1 = smooth trailing effect)
        const ease = 0.15
        
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        }
      })
      
      animationFrameRef.current = requestAnimationFrame(animateCircle)
    }
    
    if (isHovering) {
      animationFrameRef.current = requestAnimationFrame(animateCircle)
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePosition, isHovering])

  const handleError = (e) => {
    console.error("Video failed to load:", e)
    setHasError(true)
  }

  const openModal = () => {
    setIsModalOpen(true)
    // Pause background video when modal opens
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Resume background video when modal closes
    if (videoRef.current) {
      videoRef.current.play()
    }
    // Pause modal video
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
    }
  }

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <>
      <section className="w-full">
        {/* Full Width Food Video/Image */}
        <div 
          ref={containerRef}
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden cursor-pointer"
          onClick={openModal}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fallback Image if video fails */}
          {hasError ? (
            <img 
              src={foodImage} 
              alt="Exquisite dining at Sani Resort" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={handleError}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
              poster={foodImage}
            >
              <source src="/src/assets/sanirose/food.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Trailing Circle - Watch Film that follows mouse with delay */}
          {isHovering && (
            <div 
              className="absolute pointer-events-none z-10"
              style={{
                left: `${circlePosition.x}px`,
                top: `${circlePosition.y}px`,
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.3s ease'
              }}
            >
              <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-2 border-white flex flex-col items-center justify-center">
                {/* Play Icon */}
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-white mb-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                {/* Watch Film Text */}
                <p className="text-white text-[10px] md:text-xs font-light tracking-[0.15em] uppercase">
                  WATCH FILM
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Player Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4" onClick={closeModal} style={{ cursor: 'auto' }}>
          <div className="relative w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                ref={modalVideoRef}
                controls
                playsInline
                preload="metadata"
                autoPlay
                loop
                className="w-full h-full"
                poster={foodImage}
              >
                <source src="/src/assets/sanirose/food.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GastronomyImageSection

