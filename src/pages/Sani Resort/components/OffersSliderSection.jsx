import React, { useState, useRef } from 'react';
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
        .animated-underline-white {
          position: relative;
          display: inline-block;
          border-bottom: 2px solid white;
          padding-bottom: 4px;
        }
        .animated-underline-white::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background-color: white;
          transition: width 0.4s ease-in-out;
        }
        .animated-underline-white:hover::after {
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
        >
          {/* Background Images with Sliding Transition */}
          <div className="absolute inset-0 overflow-hidden">
            {slides.map((slide, index) => (
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
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-[1800ms] ease-in-out"
                  loading="lazy"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            ))}
          </div>

          {/* Slide Indicators - Bottom Center */}
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
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

          {/* Left Side Text - Previous Slide Info */}
          {previousSlide && (
            <div className="absolute -left-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pl-16 md:pl-24 lg:pl-32 text-center transition-all duration-[1500ms] ease-in-out" style={{ width: '45%' }}>
              <div className="opacity-60 transition-opacity duration-[1200ms]">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2 whitespace-pre-line" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                  {previousSlide.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg font-light opacity-90 mb-4 px-4">
                  {previousSlide.subtitle}
                </p>
                <a
                  href="#"
                  className="animated-underline-white text-xs md:text-sm tracking-wider font-medium"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {previousSlide.cta}
                </a>
              </div>
            </div>
          )}

          {/* Right Side Text - Next Slide Info */}
          {nextSlide && (
            <div className="absolute -right-110 top-1/2 -translate-y-1/2 text-white z-10 overflow-hidden pr-16 md:pr-24 lg:pr-32 text-center transition-all duration-[1500ms] ease-in-out" style={{ width: '45%' }}>
              <div className="opacity-60 transition-opacity duration-[1200ms]">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wider mb-2 whitespace-pre-line" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                  {nextSlide.title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg font-light opacity-90 mb-4 px-4">
                  {nextSlide.subtitle}
                </p>
                <a
                  href="#"
                  className="animated-underline-white text-xs md:text-sm tracking-wider font-medium"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {nextSlide.cta}
                </a>
              </div>
            </div>
          )}

          {/* Center Text - Current Slide */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-8">
            <div key={currentSlide} className="animate-fadeInScale text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider mb-4 whitespace-pre-line" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                {slides[currentSlide].title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl max-w-2xl font-light opacity-90 mb-8 leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex justify-center">
                <a
                  href="#"
                  className="animated-underline-white text-sm md:text-base tracking-wider font-medium"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  {slides[currentSlide].cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OffersSliderSection;

