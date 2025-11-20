import React from 'react';
import treesImage from '../../../assets/sanirose/trees.webp';
import fitVideo from '../../../assets/sanirose/fit.mp4';

const WellnessSection = () => {
  return (
    <section className="bg-[#F4F4F4] h-[100vh] flex items-center px-8 md:px-16 lg:px-12">
      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="relative flex-[5] h-full">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={treesImage}
              alt="Aerial forest view"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[55%] h-[65%] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={fitVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="flex-[4] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-0 bg-[#F5F3F0]">
          <p className="text-xs md:text-sm tracking-[0.4em] text-gray-400 uppercase font-light mb-8" style={{ fontFamily: 'sans-serif' }}>
            WELLNESS
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] mb-8" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
            A SANCTUARY<br />
            FOR THE <span className="italic font-light">SOUL</span>
          </h2>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10" style={{ fontFamily: 'sans-serif', lineHeight: '1.7' }}>
            Sani Resort is a place offering countless nature-based experiences. Explore a variety of options, including fitness, sports, and outdoor adventures. Choose from yoga, Pilates, spa treatments, meditation, forest walks, and a host of other activities. It's the perfect way to nurture both body and mind.
          </p>

          <div>
            <a
              href="#"
              className="inline-block text-sm md:text-base tracking-wider font-medium relative"
              style={{ 
                fontFamily: 'sans-serif',
                borderBottom: '2px solid black',
                paddingBottom: '4px'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Explore Activities</span>
              <span style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '0%',
                height: '2px',
                backgroundColor: 'black',
                transition: 'width 0.4s ease-in-out',
                zIndex: 2
              }} className="hover-underline"></span>
            </a>
          </div>
          <style jsx>{`
            a:hover .hover-underline {
              width: 100% !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default WellnessSection;

