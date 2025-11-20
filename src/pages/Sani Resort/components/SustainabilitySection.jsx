import React from 'react';
import ducksImage from '../../../assets/sanirose/ducks.webp';
import duckVideo from '../../../assets/sanirose/ducksvid.mp4';

const SustainabilitySection = () => {
  return (
    <section className="bg-[#F4F4F4] h-[100vh] flex items-center px-8 md:px-16 lg:px-12">
      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="flex-[4] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-0 bg-[#F5F3F0]">
          <p className="text-xs md:text-sm tracking-[0.4em] text-gray-400 uppercase font-light mb-8" style={{ fontFamily: 'sans-serif' }}>
            SUSTAINABILITY
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] mb-8" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
            LEAVE NOTHING<br />
            BUT <span className="italic font-light">FOOTPRINTS</span>
          </h2>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10" style={{ fontFamily: 'sans-serif', lineHeight: '1.7' }}>
            Home to untamed wildlife and sprawling wilderness, Sani is a resort that's committed to sustainability. Already the recipient of 10 Blue Flags, since 2020 - when Sani Resort became the first carbon neutral resort in Greece - Sani has continually won the World's Leading Luxury Green Resort at the World's Travel Awards, giving the resort five consecutive wins in 2024.
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
          </div>
          <style jsx>{`
            a:hover .hover-underline {
              width: 100% !important;
            }
          `}</style>
        </div>

        <div className="relative flex-[5] h-full">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={"https://res.cloudinary.com/deilfrlsh/image/upload/v1763641938/ducks_abifhy.webp"}
              alt="Wildlife landscape view"
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
                <source src={"https://res.cloudinary.com/deilfrlsh/video/upload/v1763641649/ducksvid_dgu3p5.mp4"} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
