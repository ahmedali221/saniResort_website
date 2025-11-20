import React, { useState } from 'react'
import { motion } from 'framer-motion'

const FooterSection = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', formData)
    // Add your newsletter signup logic here
  }

  return (
    <footer>
      <section className="bg-black py-16 md:py-20 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            <div>
              <div className="mb-2">
                <h3 
                  className="text-white text-2xl md:text-3xl tracking-[0.35em] font-light leading-none"
                  style={{ fontFamily: 'cosma-font-wiescher-design' }}
                >
                  SANI
                </h3>
                <p className="text-white text-[10px] tracking-[0.35em] font-light mt-0.5 ml-0.5">
                  RESORT
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white text-base font-normal mb-6" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                Quick Links
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <motion.a 
                    href="#" 
                    className="text-white text-[15px] font-light block"
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.2 }}
                  >
                    Book Hotel
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Careers
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Covid-19
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Sustainability
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    News
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Awards
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Weddings
                  </motion.a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-base font-normal mb-6" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                Connect
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Our Sani App
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Sani Rewards
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Contact Us
                  </motion.a>
                </li>
                <li>
                  <motion.a href="#" className="text-white text-[15px] font-light block" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
                    Location
                  </motion.a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-base font-normal mb-6" style={{ fontFamily: 'cosma-font-wiescher-design' }}>
                Get In Touch
              </h4>
              <div className="space-y-3.5 mb-8">
                <motion.a 
                  href="mailto:infosani@saniresort.gr" 
                  className="text-white text-[15px] font-light block"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  infosani@saniresort.gr
                </motion.a>
                <motion.a 
                  href="tel:08009496809" 
                  className="text-white text-[15px] font-light block"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  0800 949 6809
                </motion.a>
              </div>

              <div className="flex gap-5 items-center">
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor"/>
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white"
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                  aria-label="YouTube"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-[#333333]">
            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-start items-center">
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                DISCLAIMER
              </motion.a>
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                ACCESSIBILITY
              </motion.a>
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                PRIVACY POLICY
              </motion.a>
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                UGC & IMAGE POLICY
              </motion.a>
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                CORPORATE GOVERNANCE
              </motion.a>
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                COOKIES POLICY
              </motion.a>
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                TERMS & CONDITIONS
              </motion.a>
              <motion.a href="#" className="text-[#999999] text-[11px] font-light tracking-[0.1em] uppercase" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.2 }}>
                MANAGE COOKIES
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default FooterSection

