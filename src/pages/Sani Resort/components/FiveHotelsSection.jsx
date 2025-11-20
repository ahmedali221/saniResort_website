import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import leftImage1 from '../../../assets/sanirose/sani-bousoulas-2-copy.webp'
import leftImage2 from '../../../assets/sanirose/sani-resort-_-aerial-1-copy.webp'
import rightImage1 from '../../../assets/sanirose/trees.webp'
import rightImage2 from '../../../assets/sanirose/_dsc7751.webp'

const ImageCarousel = ({ images, currentIndex, className = '' }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          initial={false}
          animate={{
            opacity: index === currentIndex ? 1 : 0
          }}
          transition={{
            duration: 2,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
      ))}
    </div>
  )
}

const FiveHotelsSection = () => {
  const leftImages = [leftImage1, leftImage2]
  const rightImages = [rightImage1, rightImage2]
  
  const [leftIndex, setLeftIndex] = useState(0)
  const [rightIndex, setRightIndex] = useState(0)
  const isLeftTurnRef = useRef(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLeftTurnRef.current) {
        setLeftIndex((prevIndex) => (prevIndex + 1) % leftImages.length)
        isLeftTurnRef.current = false
      } else {
        setRightIndex((prevIndex) => (prevIndex + 1) % rightImages.length)
        isLeftTurnRef.current = true
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [leftImages.length, rightImages.length])

  return (
    <section className="w-full bg-white h-screen mt-12 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="px-12 pt-8 pb-4 flex-shrink-0">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1"></div>
            
            <div className="flex-1 flex justify-center">
              <p className="text-gray-400 uppercase text-center" style={{ fontFamily: 'sans-serif' }}>
                THE RESORT
              </p>
            </div>
            
            <div className="flex-1"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-1 px-12 pb-4 min-h-0">
          <div className="flex-1 h-[85%]  w-[90%] overflow-hidden">
            <ImageCarousel images={leftImages} currentIndex={leftIndex} />
          </div>

          <div className="flex-1 bg-white flex flex-col justify-center lg:px-16 pb-20">
            <h2 className="text-7xl text-center mb-6 md:mb-8" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
              <span className="text-black">FIVE</span>
              <br />
              <span className="text-black">HOTELS</span>
              <br />
              <span className="text-[#D4A574]">ONE</span>
              <br />
              <span className="text-[#D4A574]">RESORT</span>
            </h2>

            <div className="space-y-4 mt-8 max-w-3xl mx-auto w-full leading-relaxed">
              <p
                className="text-gray-700 text-md font-light text-center leading-relaxed"
                style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}
              >
                Set at the heart of three natural worlds, Sani Resort is an enchanting paradise with a captivating spirit.
              </p>
              <p
                className="text-gray-600 text-md font-light text-center leading-relaxed"
                style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}
              >
                Where the visions of five unique hotels intertwine to create an award winning 5* resort like no other.
              </p>
            </div>

        <div className="flex justify-center mt-8">
          <a
            href="#"
            className="text-black text-xs md:text-sm inline-block relative"
            style={{ 
              fontFamily: 'sans-serif',
              borderBottom: '1px solid black',
              paddingBottom: '4px'
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Choose Yours</span>
            <span style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '0%',
              height: '1px',
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

          <div className="flex-1 h-[85%] w-[90%] overflow-hidden">
            <ImageCarousel images={rightImages} currentIndex={rightIndex} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FiveHotelsSection

