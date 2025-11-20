import React from 'react';
import familyImage from '../../../assets/sanirose/family.webp';

const FamiliesSection = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-8 lg:px-16 h-[100vh]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT: Text Content */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            {/* Section Label - Light Gray */}
            <p className="text-xs md:text-sm tracking-[0.4em] text-gray-400 uppercase font-light" style={{ fontFamily: 'sans-serif' }}>
              FAMILIES
            </p>

            {/* Main Heading - Serif, Split across two lines */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-tight" style={{ fontFamily: 'cosma-font-wiescher-design', fontWeight: 200 }}>
              CREATING<br />
              <span className="font-light italic" style={{ fontWeight: 300 }}>
                STORIES
              </span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed tracking-wide max-w-xl" style={{ fontFamily: 'sans-serif', lineHeight: '1.6' }}>
              Family time. It's precious. The moments we spend together, and those we spend comfortably apart. That's why at Sani we offer uncompromising experiences for all ages, where children and adults can come together as one. Or find the private moments we all need from time-to-time.
            </p>

            {/* CTA - Underlined */}
            <div className="pt-2">
              <a
                href="#"
                className="inline-block text-sm md:text-base tracking-widest font-medium relative"
                style={{ 
                  fontFamily: 'sans-serif',
                  borderBottom: '2px solid black',
                  paddingBottom: '4px'
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Explore Family Experiences</span>
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

          {/* RIGHT: Image */}
          <div className="  overflow-hidden">
            <img
              src={familyImage}
              alt="Family moment - child listening to seashell"
              className="w-full h-[70vh] object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamiliesSection;

