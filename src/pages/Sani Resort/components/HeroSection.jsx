import React, { useState } from 'react'
import heroVideo from '../../../assets/sanirose/01a5052d-50d5c2ae.mp4'

const HeroSection = () => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)

  // Navigation items with dropdown menus
  const navItems = [
    { 
      label: 'THE RESORT', 
      items: [
        'OVERVIEW',
        'LOCATION',
        'SUSTAINABILITY',
        'RESORT MAP',
        'STORIES'
      ] 
    },
    { 
      label: 'HOTELS', 
      items: [
        'SANI CLUB',
        'SANI BEACH',
        'SANI ASTERIAS',
        'PORTO SANI'
      ] 
    },
    { 
      label: 'FAMILIES', 
      items: [
        'FAMILY OVERVIEW',
        'KIDS CLUBS',
        'TEENS CLUB',
        'FAMILY SUITES'
      ] 
    },
    { 
      label: 'GASTRONOMY', 
      items: [
        'RESTAURANTS & BARS',
        'FINE DINING',
        'BEACH DINING',
        'CASUAL DINING'
      ] 
    },
    { 
      label: 'EXPERIENCES', 
      items: [
        'ACADEMIES',
        'FITNESS, SPORT & OUTDOOR',
        'ON THE WATER',
        'ENTERTAINMENT',
        'LOCAL'
      ] 
    },
    { 
      label: 'OFFERS', 
      items: [
        'SPECIAL OFFERS',
        'EARLY BOOKING',
        'PACKAGES',
        'LAST MINUTE'
      ] 
    },
    { 
      label: 'THE MARINA', 
      items: [
        'MARINA OVERVIEW',
        'BERTHS',
        'FACILITIES',
        'EVENTS'
      ] 
    },
    { 
      label: 'GALLERY', 
      items: [
        'PHOTOS',
        'VIDEOS',
        'VIRTUAL TOURS'
      ] 
    }
  ]

  return (
    <section className="relative w-full min-h-screen">
      {/* Top Black Bar */}
      <div className="bg-[#3D3D3D] text-white py-2 px-8 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-end items-center text-[11px]">
          <a href="tel:08009496809" className="hover:opacity-80 transition-opacity tracking-wider" style={{ fontFamily: 'sans-serif', letterSpacing: '0.1em' }}>
            CALL 0800 949 6809
          </a>
        </div>
      </div>

      {/* Header/Navigation Bar - White, Fixed & Scrollable */}
      <header className="bg-white shadow-sm fixed top-8 left-0 w-full z-50">
        <div className="w-full flex h-16 items-stretch relative justify-between">
          {/* Logo */}
          <div className="flex flex-col justify-center pl-8 select-none">
            <span className="leading-none text-[28px] font-light" style={{ color: '#C9A876', fontFamily: 'serif', letterSpacing: '0.15em' }}>
              SANI
            </span>
            <span className="leading-none text-[9px] font-light mt-[-2px]" style={{ color: '#C9A876', fontFamily: 'serif', letterSpacing: '0.35em' }}>
              RESORT
            </span>
          </div>

          {/* Nav Links with Dropdowns */}
          <nav className="flex flex-1 items-center justify-center select-none">
            <ul className="flex items-center gap-8 text-[11px] font-normal whitespace-nowrap">
              {navItems.map((item, index) => (
                <li key={index} className="relative group h-16 flex items-center static">
                  <a
                    href="#"
                    className="text-black hover:text-[#C9A876] font-normal tracking-wider transition-colors h-full flex items-center"
                    style={{ fontFamily: 'sans-serif', letterSpacing: '0.08em' }}
                  >
                    {item.label}
                  </a>
                  
                  {/* Dropdown Menu - Full Width */}
                  {item.items.length > 0 && (
                    <div className="fixed left-0 right-0 top-24 bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-16 z-40">
                      <div className="max-w-7xl mx-auto px-20 flex gap-24">
                        {/* Left Section - Menu Items */}
                        <div className="flex-1">
                          <ul className="flex flex-col gap-8">
                            {item.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a
                                  href="#"
                                  className="text-[22px] font-light text-black hover:text-[#C9A876] transition-colors block leading-tight"
                                  style={{ fontFamily: 'cosma-font-wiescher-design', letterSpacing: '0.05em' }}
                                >
                                  {subItem}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right Section - Featured Content */}
                        <div className="w-[400px] flex flex-col gap-8">
                          {/* What's on Calendar */}
                          <div className="flex gap-4 items-start">
                            <img 
                              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=150&fit=crop" 
                              alt="What's on Calendar"
                              className="w-24 h-20 object-cover flex-shrink-0"
                              loading="lazy"
                            />
                            <div>
                              <h3 className="text-[18px] font-light mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                                What's on Calendar
                              </h3>
                              <p className="text-[13px] text-gray-600 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                                From Greek nights to live DJs, discover what's going on across the resort
                              </p>
                            </div>
                          </div>

                          {/* Spas & Wellness */}
                          <div className="flex gap-4 items-start">
                            <img 
                              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&h=150&fit=crop" 
                              alt="Spas & Wellness"
                              className="w-24 h-20 object-cover flex-shrink-0"
                              loading="lazy"
                            />
                            <div>
                              <h3 className="text-[18px] font-light mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                                Spas & Wellness
                              </h3>
                              <p className="text-[13px] text-gray-600 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                                Discover the Spa's holistic beauty treatments and our varied fitness programme
                              </p>
                            </div>
                          </div>

                          {/* VIP */}
                          <div className="flex gap-4 items-start">
                            <img 
                              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop" 
                              alt="VIP"
                              className="w-24 h-20 object-cover flex-shrink-0"
                              loading="lazy"
                            />
                            <div>
                              <h3 className="text-[18px] font-light mb-2" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                                VIP
                              </h3>
                              <p className="text-[13px] text-gray-600 leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                                For spectacular excursions and unique experiences
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* EN language & Book Now button */}
          <div className="flex items-center gap-4 pr-0">
            <button 
              className="flex items-center gap-1 text-[11px] font-semibold tracking-wider px-4"
              style={{ color: "#111", fontFamily: "sans-serif", letterSpacing: '0.12em' }}
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              EN
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              className="h-full px-8 bg-[#B6A37B] text-white text-[11px] font-normal tracking-wider transition-colors hover:bg-[#967f52]"
              style={{ fontFamily: "sans-serif", borderRadius: 0, letterSpacing: '0.12em' }}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <div className="relative w-full h-screen flex flex-col overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            loading="lazy"
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src={"https://res.cloudinary.com/deilfrlsh/video/upload/v1763641695/01a5052d-50d5c2ae_rdewic.mp4"} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center pt-12">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 md:py-24">
            <div className="flex flex-col">
              {/* Main Headline - Three Lines, Left Aligned */}
              <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-7xl font-normal text-white mb-6 md:mb-8 leading-tight" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                A SANCTUARY<br />
                FULL OF STORIES<br />
                & EXPERIENCES
              </h1>
              
              {/* Descriptive Text - Left Aligned */}
              <div className="max-w-2xl">
                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed" style={{ fontFamily: 'sans-serif' }}>
                  A destination that speaks through its rich<br />
                  history, enchanting nature and endless<br />
                  beaches. Where the whispers of ancient Greek<br />
                  philosophers echo through the trees and the<br />
                  breathtaking beauty of the Aegean Sea unfolds<br />
                  before you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Thin Vertical White Line - Stuck to bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-white opacity-60"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

