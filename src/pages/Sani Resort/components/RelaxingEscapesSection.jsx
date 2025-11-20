import React from 'react';
import coupleImage from '../../../assets/sanirose/_dsc7751.webp';

const RelaxingEscapesSection = () => {
  return (
    <section className="bg-white h-[100vh] flex items-center px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center w-full h-full">
          {/* LEFT: Image - Takes 2/3 of space */}
          <div className="flex-2 h-[60vh] lg:h-[65vh] overflow-hidden">
            <img
              src={coupleImage}
              alt="Couple relaxing on boat with ocean view"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* RIGHT: Text Content - Takes 1/3 of space */}
          <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-3 lg:space-y-4">
            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
              RELAXING<br />
              <span className="italic font-light">ESCAPES</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed tracking-wide" style={{ fontFamily: 'sans-serif', lineHeight: '1.7' }}>
              At Sani, we understand the need for a little peace and calm. We believe in providing you the opportunity to indulge in an uninterrupted dinner and to swim lengths without being splashed. That's why a number of locations, from our soothing spas to serene beachfront spots, certain restaurants and crystal-clear pools are designated as adult-only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelaxingEscapesSection;

