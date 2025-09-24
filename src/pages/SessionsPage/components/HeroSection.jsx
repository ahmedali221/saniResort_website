import React from 'react'

const HeroSection = () => {
  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--yellow-primary)' }}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bat-black)' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 0 12px var(--shadow-yellow))'}}>
              <path d="M8 12l8-8 8 8 8-8 8 8v16l-8 8-8-8-8 8-8-8V12z" fill="var(--yellow-primary)"/>
              <path d="M12 16l4-4 4 4 4-4 4 4v8l-4 4-4-4-4 4-4-4v-8z" fill="var(--yellow-secondary)"/>
              <circle cx="20" cy="20" r="3" fill="var(--bat-black)"/>
            </svg>
          </div>
        </div>
        <h1 className="text-5xl font-bold bruce-font mb-4" style={{ color: 'var(--bat-black)' }}>
          Learning Sessions
        </h1>
        <p className="text-xl mb-8" style={{ color: 'var(--bat-black)', opacity: 0.8 }}>
          Watch recorded sessions and continue your mathematical journey
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Video Lessons
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
            </svg>
            Resources
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--bat-black)', color: 'var(--yellow-primary)' }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Progress Tracking
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
