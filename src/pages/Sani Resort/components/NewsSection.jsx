import React, { useRef, useEffect, useState } from 'react'

const NewsSection = () => {
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const animationFrameRef = useRef(null)

  const newsItems = [
    {
      category: 'UPDATES',
      title: "Sani Asterias' Elegant New Residences",
      description: 'Boasting a luxurious look and feel, in 2025 guests can enjoy the very ultimate in sophistication staying in Sani Asterias\' newly renovated chic and homely residences, some of which come with private pools.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    },
    {
      category: 'MUSIC',
      title: 'Sani, a Sanctuary for Inspiration',
      description: 'Discover an extraordinary creative retreat where six remarkable artists found inspiration -turning the rhythm of the sea, the whispers of the pines and the warmth of connection into unforgettable melodies.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800'
    },
    {
      category: 'FESTIVALS',
      title: 'Sani Festival and Sani Gourmet: The Ultimate Experience',
      description: 'Raising the bar higher every season, this year\'s Sani Festival will feature an exciting lineup of globally renowned artists, while Sani Gourmet\'s acclaimed chefs are set to thrill the most discerning palates. Stay tuned.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'
    },
    {
      category: 'NEW AT SANI',
      title: 'Sani Elixirium Wellness Journey',
      description: 'Introducing Sani Elixirium — a new immersive sanctuary blending ancient wisdom and modern mindfulness. A space to reconnect, reflect and remember what it means to feel whole.',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800'
    },
    {
      category: 'UPDATES',
      title: 'Sani Magazine 2025',
      description: 'Discover the latest from Sani Resort through the new Sani Magazine 2025, featuring exclusive insights and exciting updates on all things Sani.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
    },
    {
      category: 'UPDATES',
      title: 'Embracing Tranquility: The Renovated Sani Club',
      description: 'In 2025, discover the transformed Sani Club, where newly renovated rooms harmonize with nature\'s beauty, and enjoy a scenic, walkable promenade connecting to the rest of Sani Resort, accessible also by club cars.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    }
  ]

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

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    // Handle dragging
    if (isDragging && scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2 // Multiply for faster scroll
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsDragging(false)
  }

  const handleMouseDown = (e) => {
    if (scrollContainerRef.current) {
      setIsDragging(true)
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
      setScrollLeft(scrollContainerRef.current.scrollLeft)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="max-w-[1600px] mx-auto px-16 md:px-20 lg:px-32">
        {/* Header - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Heading */}
          <div>
            <h2 
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
              style={{ fontFamily: 'cosma-font-wiescher-design' }}
            >
              NEWS
            </h2>
          </div>
          
          {/* Right Side - Description and Link */}
          <div className="flex flex-col justify-end">
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              Stay informed of Sani Resort's latest initiatives and accomplishments.
            </p>
            <a 
              href="#all-news" 
              className="inline-block text-sm font-light tracking-[0.2em] uppercase w-fit relative"
              style={{
                borderBottom: '1px solid black',
                paddingBottom: '4px'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>All news</span>
              <span style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '0%',
                height: '1px',
                backgroundColor: 'black',
                transition: 'width 0.4s ease-in-out',
                zIndex: 2
              }} className="underline-animation"></span>
            </a>
          </div>
        </div>

        {/* Draggable News Carousel */}
        <div 
          ref={containerRef}
          className="relative -mx-16 md:-mx-20 lg:-mx-32 px-16 md:px-20 lg:px-32"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        >
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-8 transition-all duration-300"
            style={{ 
              scrollBehavior: isDragging ? 'auto' : 'smooth',
              userSelect: 'none',
              gap: isDragging ? '48px' : '32px'
            }}
          >
            {newsItems.map((item, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[380px] bg-white transition-all duration-300"
                style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
              >
                {/* Image */}
                <div 
                  className="relative overflow-hidden mb-6 transition-all duration-300"
                  style={{ height: isDragging ? '430px' : '480px' }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    draggable="false"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="px-6">
                  <p className="text-[9px] font-normal tracking-[0.25em] uppercase text-gray-500 mb-5">
                    {item.category}
                  </p>
                  <h3 
                    className="text-[22px] leading-[1.2] mb-6 font-normal"
                    style={{ fontFamily: 'cosma-font-wiescher-design' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-gray-700 leading-[1.6] mb-8">
                    {item.description}
                  </p>
                  <a 
                    href="#"
                    className="inline-block text-[11px] font-normal tracking-[0.15em] uppercase relative"
                    style={{
                      borderBottom: '1px solid black',
                      paddingBottom: '4px'
                    }}
                    onClick={(e) => {
                      if (isDragging) e.preventDefault()
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>Discover More</span>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '0%',
                      height: '1px',
                      backgroundColor: 'black',
                      transition: 'width 0.4s ease-in-out',
                      zIndex: 2
                    }} className="underline-animation"></span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Trailing Circle - Drag Indicator */}
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
              <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-2 border-white flex items-center justify-center bg-black">
                {/* Drag Text */}
                <p className="text-white text-[10px] md:text-xs font-light tracking-[0.15em] uppercase">
                  {isDragging ? 'DRAGGING' : 'DRAG'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        a:hover .underline-animation {
          width: 100% !important;
        }
      `}</style>
    </section>
  )
}
export default NewsSection;