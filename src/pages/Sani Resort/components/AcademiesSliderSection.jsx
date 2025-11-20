import React, { useState, useRef, useEffect } from 'react';
import tennisImage from '../../../assets/sanirose/tennis.jpg';
import chelseaImage from '../../../assets/sanirose/chealse.jpg';
import cinemaImage from '../../../assets/sanirose/cinema.jpg';

const academiesImages = [
  tennisImage,
  chelseaImage,
  cinemaImage
];

const academiesData = [
  {
    title: "TENNIS ACADEMY",
    subtitle: "Master Your Game",
    description: "Professional tennis coaching with world-class facilities and expert instructors."
  },
  {
    title: "FOOTBALL ACADEMY",
    subtitle: "Train Like Champions",
    description: "Experience elite football training with the Chelsea FC Foundation."
  },
  {
    title: "WATER SPORTS",
    subtitle: "Ride The Waves",
    description: "Exciting water sports activities for all ages and skill levels."
  }
];

const AcademiesSliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverSide, setHoverSide] = useState('right'); // 'left' or 'right'
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' or 'prev'
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === academiesImages.length - 1;

  // Smooth trailing animation for the circle
  useEffect(() => {
    const animateCircle = () => {
      setCirclePosition(prev => {
        const dx = mousePosition.x - prev.x;
        const dy = mousePosition.y - prev.y;
        
        const ease = 0.15;
        
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      
      animationFrameRef.current = requestAnimationFrame(animateCircle);
    };
    
    if (isHovering) {
      animationFrameRef.current = requestAnimationFrame(animateCircle);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isHovering]);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      // Determine which side of the screen the mouse is on
      const centerX = rect.width / 2;
      setHoverSide(x > centerX ? 'right' : 'left');
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleSliderClick = () => {
    if (hoverSide === 'right' && !isLastSlide) {
      // Go to next slide
      setSlideDirection('next');
      setCurrentSlide(prev => Math.min(prev + 1, academiesImages.length - 1));
    } else if (hoverSide === 'left' && !isFirstSlide) {
      // Go to previous slide
      setSlideDirection('prev');
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }
  };

  const currentData = academiesData[currentSlide];
  const previousData = currentSlide > 0 ? academiesData[currentSlide - 1] : null;
  const nextData = currentSlide < academiesImages.length - 1 ? academiesData[currentSlide + 1] : null;
  
  // Determine if we should show the indicator
  const showNextIndicator = hoverSide === 'right' && !isLastSlide;
  const showPreviousIndicator = hoverSide === 'left' && !isFirstSlide;
  const showIndicator = isHovering && (showNextIndicator || showPreviousIndicator);

  return (
    <>
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 1500ms ease-out forwards;
        }
        .animated-underline {
          position: relative;
          display: inline-block;
          border-bottom: 2px solid white;
          padding-bottom: 4px;
        }
        .animated-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background-color: white;
          transition: width 0.4s ease-in-out;
        }
        .animated-underline:hover::after {
          width: 100%;
        }
      `}</style>
      <section className="w-full h-screen relative overflow-hidden">
        {/* Image Slider */}
        <div
        ref={containerRef}
        className="relative w-full h-full cursor-pointer"
        onClick={handleSliderClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Images with Sliding Transition */}
        <div className="absolute inset-0 overflow-hidden">
          {academiesImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[1800ms] ease-in-out ${
                index === currentSlide
                  ? 'translate-x-0 opacity-100 scale-100'
                  : index < currentSlide
                  ? '-translate-x-full opacity-0 scale-95'
                  : 'translate-x-full opacity-0 scale-95'
              }`}
            >
              <img
                src={image}
                alt={academiesData[index].title}
                className="w-full h-full object-cover transition-transform duration-[1800ms] ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Slide Indicators - Bottom Center */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {academiesImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setSlideDirection(index > currentSlide ? 'next' : 'prev');
                setCurrentSlide(index);
              }}
              className={`rounded-full transition-all duration-300 border-2 ${
                index === currentSlide 
                  ? 'w-4 h-4 border-white bg-white' 
                  : 'w-3 h-3 border-white border-opacity-50 bg-transparent hover:border-opacity-100'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Left Side Text - Previous Slide Info (Half Visible) */}
        {previousData && (
          <div className="absolute -left-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pl-16 md:pl-24 lg:pl-32 text-center transition-all duration-[1500ms] ease-in-out" style={{ width: '45%' }}>
            <div className="opacity-60 transition-opacity duration-[1200ms]">
              {currentSlide === 1 && (
                <>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                    TENNIS
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase opacity-90 mb-6">
                    ACADEMY
                  </p>
                  <a
                    href="#"
                    className="animated-underline text-xs md:text-sm tracking-wider font-medium"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    Discover More
                  </a>
                </>
              )}
              {currentSlide === 2 && (
                <>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2" style={{ fontFamily: 'serif' }}>
                    CHELSEA FC
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase opacity-90 mb-6">
                    FOOTBALL ACADEMY
                  </p>
                  <a
                    href="#"
                    className="inline-block text-xs md:text-sm tracking-wider font-medium border-b-2 border-white pb-1 hover:border-opacity-70 transition-all duration-300"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    Discover More
                  </a>
                </>
              )}
            </div>
          </div>
        )}

        {/* Right Side Text - Next Slide Info (Half Visible) */}
        {nextData && (
          <div className="absolute -right-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pr-16 md:pr-24 lg:pr-32 text-center transition-all duration-[1500ms] ease-in-out" style={{ width: '45%' }}>
            <div className="opacity-60 transition-opacity duration-[1200ms]">
              {currentSlide === 0 && (
                <>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                    CHELSEA FC
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase opacity-90 mb-6">
                    FOOTBALL ACADEMY
                  </p>
                  <a
                    href="#"
                    className="animated-underline text-xs md:text-sm tracking-wider font-medium"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    Discover More
                  </a>
                </>
              )}
              {currentSlide === 1 && (
                <>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                    REEL
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase opacity-90 mb-6">
                    CINEMAS
                  </p>
                  <a
                    href="#"
                    className="animated-underline text-xs md:text-sm tracking-wider font-medium"
                    style={{ fontFamily: 'sans-serif' }}
                  >
                    Discover More
                  </a>
                </>
              )}
            </div>
          </div>
        )}

        {/* Center Text - Current Slide */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-8">
          {currentSlide === 0 && (
            <div className="animate-fadeInScale text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                TENNIS
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] uppercase opacity-90 mb-8">
                ACADEMY
              </p>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="animated-underline text-sm md:text-base tracking-wider font-medium"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  Discover More
                </a>
              </div>
            </div>
          )}
          {currentSlide === 1 && (
            <div className="animate-fadeInScale text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                CHELSEA FC
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase opacity-90 mb-8">
                FOOTBALL ACADEMY
              </p>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="animated-underline text-sm md:text-base tracking-wider font-medium"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  Discover More
                </a>
              </div>
            </div>
          )}
          {currentSlide === 2 && (
            <div className="animate-fadeInScale text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                REEL
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] uppercase opacity-90 mb-8">
                CINEMAS
              </p>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="animated-underline text-sm md:text-base tracking-wider font-medium"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  Discover More
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Trailing Circle - NEXT or PREVIOUS */}
        {showIndicator && (
          <div 
            className="absolute pointer-events-none z-20"
            style={{
              left: `${circlePosition.x}px`,
              top: `${circlePosition.y}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.3s ease'
            }}
          >
            <div className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm">
              {/* Text Only - No Arrow */}
              <p className="text-white text-xs md:text-sm font-light tracking-[0.2em] uppercase">
                {showPreviousIndicator ? 'PREVIOUS' : 'NEXT'}
              </p>
            </div>
          </div>
        )}
        </div>
      </section>
    </>
  );
};

export default AcademiesSliderSection;

