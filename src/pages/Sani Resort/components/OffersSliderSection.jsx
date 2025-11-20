import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import beach1 from '../../../assets/sanirose/beach1.jpg';
import sunUmbrellas from '../../../assets/sanirose/sund_umbrellas.jpg';
import beach from '../../../assets/sanirose/beach.jpg';
import motherChild from '../../../assets/sanirose/mother_child.jpg';

const slides = [
  {
    image: beach1,
    title: 'FREE FULL BOARD',
    subtitle: 'A complimentary upgrade at Sani Beach and Sani Club',
    cta: 'Free Full Board'
  },
  {
    image: sunUmbrellas,
    title: 'SPECIAL OFFERS',
    subtitle: 'Enjoy unique benefits when you book ahead of time',
    cta: 'Discover More'
  },
  {
    image: beach,
    title: 'FREE TRANSFERS',
    subtitle: 'For stays of 5 nights or more',
    cta: 'Discover More'
  },
  {
    image: motherChild,
    title: 'CHILDREN STAY FREE',
    subtitle: 'We welcome little ones to experience the magical kingdom of Sani and its surrounding nature',
    cta: 'Discover More'
  }
];

const OffersSliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverSide, setHoverSide] = useState('right');
  const [slideDirection, setSlideDirection] = useState('next');
  const containerRef = useRef(null);

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const centerX = rect.width / 2;
      setHoverSide(x > centerX ? 'right' : 'left');
    }
  };

  const handleSliderClick = () => {
    if (hoverSide === 'right' && !isLastSlide) {
      setSlideDirection('next');
      setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
    } else if (hoverSide === 'left' && !isFirstSlide) {
      setSlideDirection('prev');
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index) => {
    setSlideDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  const previousSlide = currentSlide > 0 ? slides[currentSlide - 1] : null;
  const nextSlide = currentSlide < slides.length - 1 ? slides[currentSlide + 1] : null;

  return (
    <section className="w-full h-screen relative overflow-hidden">
        <div
          ref={containerRef}
          className="relative w-full h-full cursor-pointer"
          onClick={handleSliderClick}
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0 overflow-hidden">
            {slides.map((slide, index) => (
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
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
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

          {previousSlide && (
            <motion.div 
              className="absolute -left-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pl-16 md:pl-24 lg:pl-32 text-center" 
              style={{ width: '45%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.2 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2 whitespace-pre-line" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                  {previousSlide.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg font-light opacity-90 mb-4 px-4">
                  {previousSlide.subtitle}
                </p>
                <motion.a
                  href="#"
                  className="inline-block text-xs md:text-sm tracking-wider font-medium border-b-2 border-white pb-1"
                  style={{ fontFamily: 'sans-serif' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  {previousSlide.cta}
                </motion.a>
              </div>
            </motion.div>
          )}

          {nextSlide && (
            <motion.div 
              className="absolute -right-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pr-16 md:pr-24 lg:pr-32 text-center" 
              style={{ width: '45%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.2 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2 whitespace-pre-line" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                  {nextSlide.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg font-light opacity-90 mb-4 px-4">
                  {nextSlide.subtitle}
                </p>
                <motion.a
                  href="#"
                  className="inline-block text-xs md:text-sm tracking-wider font-medium border-b-2 border-white pb-1"
                  style={{ fontFamily: 'sans-serif' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  {nextSlide.cta}
                </motion.a>
              </div>
            </motion.div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide}
                className="text-center"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider mb-4 whitespace-pre-line" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                  {slides[currentSlide].title}
                </h2>
                <p className="text-base md:text-lg lg:text-xl max-w-2xl font-light opacity-90 mb-8 leading-relaxed">
                  {slides[currentSlide].subtitle}
                </p>
                <div className="flex justify-center">
                  <motion.a
                    href="#"
                    className="inline-block text-sm md:text-base tracking-wider font-medium border-b-2 border-white pb-1"
                    style={{ fontFamily: 'sans-serif' }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.4 }}
                  >
                    {slides[currentSlide].cta}
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
  );
};

export default OffersSliderSection;

