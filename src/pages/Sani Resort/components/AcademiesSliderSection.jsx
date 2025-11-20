import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      setSlideDirection('next');
      setCurrentSlide(prev => Math.min(prev + 1, academiesImages.length - 1));
    } else if (hoverSide === 'left' && !isFirstSlide) {
      setSlideDirection('prev');
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }
  };

  const currentData = academiesData[currentSlide];
  const previousData = currentSlide > 0 ? academiesData[currentSlide - 1] : null;
  const nextData = currentSlide < academiesImages.length - 1 ? academiesData[currentSlide + 1] : null;
  
  const showNextIndicator = hoverSide === 'right' && !isLastSlide;
  const showPreviousIndicator = hoverSide === 'left' && !isFirstSlide;
  const showIndicator = isHovering && (showNextIndicator || showPreviousIndicator);

  return (
    <section className="w-full h-screen relative overflow-hidden">
        <div
        ref={containerRef}
        className="relative w-full h-full cursor-pointer"
        onClick={handleSliderClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 overflow-hidden">
          {academiesImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={false}
              animate={{
                x: index === currentSlide ? '0%' : index < currentSlide ? '-100%' : '100%',
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 0.95
              }}
              transition={{
                duration: 1.8,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <img
                src={image}
                alt={academiesData[index].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {academiesImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setSlideDirection(index > currentSlide ? 'next' : 'prev');
                setCurrentSlide(index);
              }}
              className="rounded-full border-2"
              animate={{
                width: index === currentSlide ? 16 : 12,
                height: index === currentSlide ? 16 : 12,
                borderColor: index === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                backgroundColor: index === currentSlide ? '#ffffff' : 'transparent'
              }}
              whileHover={{
                borderColor: '#ffffff'
              }}
              transition={{ duration: 0.3 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {previousData && (
          <motion.div 
            className="absolute -left-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pl-16 md:pl-24 lg:pl-32 text-center" 
            style={{ width: '45%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.2 }}
          >
            <div>
              {currentSlide === 1 && (
                <>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                    TENNIS
                  </h2>
                  <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase opacity-90 mb-6">
                    ACADEMY
                  </p>
                  <motion.a
                    href="#"
                    className="inline-block text-xs md:text-sm tracking-wider font-medium border-b-2 border-white pb-1"
                    style={{ fontFamily: 'sans-serif' }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.4 }}
                  >
                    Discover More
                  </motion.a>
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
                  <motion.a
                    href="#"
                    className="inline-block text-xs md:text-sm tracking-wider font-medium border-b-2 border-white pb-1"
                    style={{ fontFamily: 'sans-serif' }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  >
                    Discover More
                  </motion.a>
                </>
              )}
            </div>
          </motion.div>
        )}

        {nextData && (
          <motion.div 
            className="absolute -right-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pr-16 md:pr-24 lg:pr-32 text-center" 
            style={{ width: '45%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.2 }}
          >
            <div>
              {currentSlide === 0 && (
                <>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                    CHELSEA FC
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase opacity-90 mb-6">
                    FOOTBALL ACADEMY
                  </p>
                  <motion.a
                    href="#"
                    className="inline-block text-xs md:text-sm tracking-wider font-medium border-b-2 border-white pb-1"
                    style={{ fontFamily: 'sans-serif' }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.4 }}
                  >
                    Discover More
                  </motion.a>
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
                  <motion.a
                    href="#"
                    className="inline-block text-xs md:text-sm tracking-wider font-medium border-b-2 border-white pb-1"
                    style={{ fontFamily: 'sans-serif' }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.4 }}
                  >
                    Discover More
                  </motion.a>
                </>
              )}
            </div>
          </motion.div>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-8">
          <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div 
              key="slide-0"
              className="text-center"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                TENNIS
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] uppercase opacity-90 mb-8">
                ACADEMY
              </p>
              <div className="flex justify-center">
                <motion.a
                  href="#"
                  className="inline-block text-sm md:text-base tracking-wider font-medium border-b-2 border-white pb-1"
                  style={{ fontFamily: 'sans-serif' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  Discover More
                </motion.a>
              </div>
            </motion.div>
          )}
          {currentSlide === 1 && (
            <motion.div 
              key="slide-1"
              className="text-center"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                CHELSEA FC
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] uppercase opacity-90 mb-8">
                FOOTBALL ACADEMY
              </p>
              <div className="flex justify-center">
                <motion.a
                  href="#"
                  className="inline-block text-sm md:text-base tracking-wider font-medium border-b-2 border-white pb-1"
                  style={{ fontFamily: 'sans-serif' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  Discover More
                </motion.a>
              </div>
            </motion.div>
          )}
          {currentSlide === 2 && (
            <motion.div 
              key="slide-2"
              className="text-center"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                REEL
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] uppercase opacity-90 mb-8">
                CINEMAS
              </p>
              <div className="flex justify-center">
                <motion.a
                  href="#"
                  className="inline-block text-sm md:text-base tracking-wider font-medium border-b-2 border-white pb-1"
                  style={{ fontFamily: 'sans-serif' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  Discover More
                </motion.a>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

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
              <p className="text-white text-xs md:text-sm font-light tracking-[0.2em] uppercase">
                {showPreviousIndicator ? 'PREVIOUS' : 'NEXT'}
              </p>
            </div>
          </div>
        )}
        </div>
      </section>
  );
};

export default AcademiesSliderSection;

