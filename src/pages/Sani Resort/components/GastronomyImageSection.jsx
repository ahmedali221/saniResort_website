import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error)
        setHasError(true)
      })
    }
  }, [])

  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.play()
    }
  }, [isModalOpen])

  useEffect(() => {
    const animateCircle = () => {
      setCirclePosition(prev => {
        const dx = mousePosition.x - prev.x
        const dy = mousePosition.y - prev.y
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
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    if (videoRef.current) {
      videoRef.current.play()
    }
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
        <div 
          ref={containerRef}
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden cursor-pointer"
          onClick={openModal}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
              loading="lazy"
              preload="metadata"
              onError={handleError}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
              poster={foodImage}
            >
              <source src="https://res.cloudinary.com/deilfrlsh/video/upload/v1763641640/food_nu4zsz.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

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
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-white mb-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-white text-[10px] md:text-xs font-light tracking-[0.15em] uppercase">
                  WATCH FILM
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4" 
          onClick={closeModal} 
          style={{ cursor: 'auto' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <motion.button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white z-10"
              whileHover={{ color: '#d1d5db' }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

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
        </motion.div>
      )}
    </>
  )
}

export default GastronomyImageSection

