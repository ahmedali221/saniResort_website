import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, ArrowRight } from 'lucide-react'

const ResortMapSection = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="w-full bg-[#3D4540] py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <a
          href="#resort-map"
          className="group flex items-center justify-center gap-4 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Map Icon - moves left and bounces back */}
          <motion.div
            animate={{
              x: isHovered ? [-40, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.68, -0.55, 0.265, 1.55]
            }}
          >
            <Map 
              size={32} 
              strokeWidth={1.5} 
              className="text-white md:w-10 md:h-10"
            />
          </motion.div>

          {/* Resort Map Text - disappears on hover */}
          <AnimatePresence>
            {!isHovered && (
              <motion.span
                className="text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-wide"
                style={{ fontFamily: 'cosma-font-wiescher-design' }}
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: { 
                    duration: 0.3,
                    ease: 'easeOut'
                  } 
                }}
              >
                Resort Map
              </motion.span>
            )}
          </AnimatePresence>

          {/* Right Arrow Icon - moves right and bounces back */}
          <motion.div
            animate={{
              x: isHovered ? [40, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.68, -0.55, 0.265, 1.55]
            }}
          >
            <ArrowRight 
              size={32} 
              strokeWidth={1.5} 
              className="text-white md:w-10 md:h-10"
            />
          </motion.div>
        </a>
      </div>
    </section>
  )
}

export default ResortMapSection

