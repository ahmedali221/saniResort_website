import React from 'react'
import { Quote } from 'lucide-react'
import aerialImage from '../../../assets/sanirose/sani-resort-_-aerial-1-copy.webp'

const AdventuresSection = () => {
  return (
    <section className="w-full h-[85vh] bg-[#E8E4DD] flex items-center justify-center px-4 md:px-12 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full h-[75vh] max-w-7xl mx-auto rounded-xl  overflow-hidden">
        <div className="flex flex-1 relative justify-center items-center px-6 md:px-12 lg:px-20 py-8 md:py-0 bg-[#E8E4DD]">
          <div className="absolute top-4 left-4 md:top-10 md:left-10 text-[#D8D3C8] rotate-180">
            <Quote size={42} strokeWidth={1.4} className="md:w-[48px] md:h-[60px]" />
          </div>

          <div className="max-w-xl w-full relative z-10 flex flex-col items-center justify-center">
            <p 
              className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
              style={{ fontFamily: 'cosma-font-wiescher-design', lineHeight: '2' }}
            >
              With me, you'll experience moments straight out of a dream. Can you hear them? The whispers of Greek philosophers echoing through this ancient forest. Stories from people around the world come alive on this endless beach. Here, the sea and sky unite to frame the most mythical mountain of all – Mount Olympus. And the entire Aegean unfolds its flavours before you. No, I'm not a dream. I am Sani – a sanctuary full of stories and experiences.
            </p>
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 text-[#D8D3C8]">
            <Quote size={42} strokeWidth={1.4} className="md:w-[48px] md:h-[60px]" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-[#E8E4DD]">
          <div 
            className="w-full  max-h-[50vh] md:h-[50vw] bg-cover bg-center "
            style={{
              backgroundImage: `url(${aerialImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default AdventuresSection

