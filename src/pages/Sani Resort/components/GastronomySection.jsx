import React from 'react'

const GastronomySection = () => {
  return (
    <section className="py-24 px-4 md:px-8 ">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-6">
          <p className="text-sm tracking-[0.3em] text-gray-500 uppercase ">
            GASTRONOMY
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#b89968] leading-tight" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
            FOR EVERY<br />
            <span className="italic">PALATE</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
            Home to 26 restaurants, we pride ourselves on world-class cuisines to suit every palate. From 
            authentic Greek fare to timeless Italian favourites or the freshest sushi; with exclusive 
            menus expertly crafted by Michelin-starred chefs and kitchens run with passion, choice is abundant at Sani Resort.
          </p>
        </div>

        <div className="text-center">
          <a 
            href="#" 
            className="inline-block text-sm tracking-wide text-gray-700 relative"
            style={{
              borderBottom: '1px solid #374151',
              paddingBottom: '4px'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Explore the tastes of Sani</span>
            <span style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '0%',
              height: '1px',
              backgroundColor: '#374151',
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
    </section>
  )
}

export default GastronomySection

