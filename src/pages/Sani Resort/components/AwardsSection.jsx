import React from 'react';
import awardBadge from '../../../assets/sanirose/world_winner.png';

const AwardsSection = () => {
  return (
    <section className="bg-[#EAE5DB] py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Content - Badge and Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
          {/* LEFT: Award Badge */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="w-40 h-40 md:w-48 md:h-48">
              <img
                src={awardBadge}
                alt="World Travel Awards Winner 2024"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="lg:col-span-9 flex flex-col space-y-2 md:space-y-3">
            {/* Winner Label */}
            <p className="text-xs md:text-md tracking-[0.5em] text-black uppercase font-bold" style={{ fontFamily: 'sans-serif', letterSpacing: '0.5em' }}>
              WINNER 2024
            </p>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
              World's Leading Family & Beach <br /> Resort
            </h2>

            {/* Description */}
           <div className="flex items-center gap-4 align-middle">
           <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl" style={{ fontFamily: 'sans-serif', lineHeight: '1.7' }}>
              Named the World's Leading Family & Beach Resort for the sixth consecutive year, Sani celebrates success at the prestigious World Travel Awards.
            </p>
            <a
              href="#"
              className="inline-block text-sm md:text-base align-middle tracking-wider font-medium relative"
              style={{ 
                fontFamily: 'sans-serif',
                borderBottom: '2px solid black',
                paddingBottom: '4px'
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Discover More</span>
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
            <style jsx>{`
              a:hover .hover-underline {
                width: 100% !important;
              }
            `}</style>
           </div>
          </div>
        </div>

        {/* Bottom CTA Link */}
        <div className="flex justify-center lg:justify-end">
     
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;

