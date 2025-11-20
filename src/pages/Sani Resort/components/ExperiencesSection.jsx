import React from 'react';
import webpImage from '../../../assets/sanirose/exp1.webp'

const ExperiencesSection = () => {
  return (
    <section className="bg-[#EAE5DB] h-[100vh] flex items-center py-30 px-8 md:px-16 lg:px-28">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className=" flex-3 flex-shrink-0 relative h-[100vh] md:h-[80vh] lg:h-[80vh]">
            <div className="absolute bottom-15  w-[54%] h-[48%] lg:w-[55%] lg:h-[40%]  overflow-hidden  z-20">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200"
                alt="Sani wetlands aerial"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-8 right-0 w-[90%] h-[50%] lg:h-[65%]  overflow-hidden ">
              <img
                src={webpImage}
                alt="Treetop adventure"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-2 flex flex-col justify-center lg:ml-8 space-y-8">
            <p className="text-xs md:text-sm tracking-[0.4em] text-gray-500 uppercase font-light">
              EXPERIENCES
            </p>

            <h2 className="text-4xl leading-[0.95] font-normal" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
              A SANCTUARY OF ADVENTURES
            </h2>

            <p className="text-base text-gray-700 leading-relaxed tracking-wide "style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
              Discover a resort where possibilities are endless. Whether it's scuba diving, beekeeping, bird watching, waterskiing – inspiration is found at every turn. Hone your game at world-class facilities; including the Rafa Nadal Tennis Center, Bear Grylls Survival Academy, Chelsea Football FC Academy or Sani Treetop Adventure. Or if you want space, explore Sani Resort's 1,000 acres of unspoilt wilderness by bike.
            </p>

            <div className="pt-4">
              <a
                href="#"
                className="inline-block text-sm tracking-widest font-medium relative"
                style={{
                  borderBottom: '2px solid black',
                  paddingBottom: '4px'
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Explore More</span>
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
      </div>
    </section>
  );
};

export default ExperiencesSection;