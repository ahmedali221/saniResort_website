import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold mb-4 bruce-font" style={{ color: 'var(--yellow-primary)' }}>
              BatMath
            </h3>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Empowering students to master mathematics through interactive, gamified learning experiences.
            </p>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-lg font-semibold mb-4 bruce-font" style={{ color: 'var(--text-primary)' }}>
              Subjects
            </h4>
            <ul className="space-y-2">
              {['Algebra', 'Geometry', 'Calculus', 'Physics'].map((subject) => (
                <li key={subject}>
                  <a 
                    href="#" 
                    className="text-base transition-colors duration-300 hover:text-yellow-400"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {subject}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 bruce-font" style={{ color: 'var(--text-primary)' }}>
              Support
            </h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-base transition-colors duration-300 hover:text-yellow-400"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 bruce-font" style={{ color: 'var(--text-primary)' }}>
              Company
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-base transition-colors duration-300 hover:text-yellow-400"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              © 2025 BatMath. All rights reserved.
            </p>
            
            {/* Additional Navigation */}
            <div className="flex gap-6 mt-4 md:mt-0">
              {['Subjects', 'Grades', 'Quizzes', 'About'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-sm transition-colors duration-300 hover:text-yellow-400"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

