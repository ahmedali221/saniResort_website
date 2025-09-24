import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from './auth/Login';
import Signup from './auth/Signup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md" style={{background: 'var(--gradient-bat)'}}>
      <div className="max-w-8xl mx-auto px-8 py-4 flex items-center justify-between gap-8">
        {/* Batman Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 bg-transparent rounded-full transition-transform duration-300 hover:scale-110">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0 0 8px var(--shadow-yellow))'}}>
              <path d="M20 2C20 2 8 8 8 20C8 28 12 32 20 32C28 32 32 28 32 20C32 8 20 2 20 2Z" fill="var(--yellow-primary)"/>
              <path d="M20 6C20 6 12 10 12 20C12 26 15 28 20 28C25 28 28 26 28 20C28 10 20 6 20 6Z" fill="var(--yellow-secondary)"/>
              <path d="M20 10C20 10 16 12 16 20C16 24 17 25 20 25C23 25 24 24 24 20C24 12 20 10 20 10Z" fill="var(--yellow-primary)"/>
              <path d="M18 18L20 20L22 18L20 16L18 18Z" fill="#000"/>
              <path d="M16 22L20 26L24 22L20 18L16 22Z" fill="#000"/>
            </svg>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center">
          <ul className="flex list-none m-0 p-0 gap-8">
            {/*
            <li className="relative">
              <a href="#subjects" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1" style={{color: 'var(--text-primary)'}}>
                Subjects
              </a>
            </li>
            <li className="relative">
              <Link to="/courses" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1" style={{color: 'var(--text-primary)'}}>
                Courses
              </Link>
            </li>
            <li className="relative">
              <Link to="/books" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1" style={{color: 'var(--text-primary)'}}>
                Books
              </Link>
            </li>
            <li className="relative">
              <Link to="/grades" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1" style={{color: 'var(--text-primary)'}}>
                Grades
              </Link>
            </li>
            */}
            <li className="relative">
              <button type="button" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1 bg-transparent border-0 cursor-pointer" style={{color: 'var(--text-primary)'}}>
                Homework
              </button>
            </li>
            <li className="relative">
              <button type="button" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1 bg-transparent border-0 cursor-pointer" style={{color: 'var(--text-primary)'}}>
                Sessions
              </button>
            </li>
            <li className="relative">
              <Link to="/friends" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1" style={{color: 'var(--text-primary)'}}>
                My Friends
              </Link>
            </li>
            <li className="relative">
              <Link to="/community" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1" style={{color: 'var(--text-primary)'}}>
                Community
              </Link>
            </li>
            <li className="relative">
              <button type="button" className="nav-link no-underline font-medium text-base py-2 transition-all duration-300 relative hover:-translate-y-1 bg-transparent border-0 cursor-pointer" style={{color: 'var(--text-primary)'}}>
                Our Story
              </button>
            </li>
          </ul>
        </nav>

        {/* CTA Button / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Icon Button */}
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 border-2"
                style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                  <span className="text-sm font-bold" style={{ color: 'var(--bat-black)' }}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <span>{user?.name}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold" style={{ color: 'var(--bat-black)' }}>
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200"
                      style={{ color: 'var(--bat-black)' }}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200"
                      style={{ color: 'var(--bat-black)' }}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm hover:bg-red-50 transition-colors duration-200"
                      style={{ color: '#dc2626' }}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogin}
                className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{ color: 'var(--text-primary)' }}
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="group border-none px-6 py-3 rounded-lg font-bold text-base cursor-pointer flex items-center gap-2 relative overflow-hidden min-w-[180px] transition-all duration-500 ease-out
                    hover:scale-110 hover:shadow-xl hover:min-w-[210px] active:scale-100"
                style={{
                    background: 'var(--yellow-primary)',
                    color: '#000',
                    boxShadow: '0 4px 15px var(--shadow-yellow)',
                    transition: 'background 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1), min-width 0.5s cubic-bezier(.4,0,.2,1)'
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, var(--yellow-primary) 60%, var(--yellow-hover) 100%)';
                    e.currentTarget.style.boxShadow = '0 12px 32px var(--shadow-yellow-hover)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--yellow-primary)';
                    e.currentTarget.style.boxShadow = '0 4px 15px var(--shadow-yellow)';
                }}
                onMouseDown={e => {
                    e.currentTarget.style.transform = 'scale(0.97)';
                    e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow-yellow)';
                }}
                onMouseUp={e => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '0 12px 32px var(--shadow-yellow-hover)';
                }}
              >
                <span className="transition-all duration-500 ease-out group-hover:tracking-wider group-hover:text-black">
                    Sign Up
                </span>
                <span className="text-xl font-black opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-black">
                    →
                </span>
                {/* Animated underline */}
                <span className="absolute left-6 bottom-2 w-0 h-1 bg-yellow-400 rounded-full transition-all duration-500 group-hover:w-2/3"></span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden flex flex-col justify-around w-8 h-8 bg-transparent border-none cursor-pointer p-0 z-50 ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-full h-1 bg-white rounded-sm transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45' : ''}`}></span>
          <span className={`w-full h-1 bg-white rounded-sm transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-1 bg-white rounded-sm transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={toggleMenu}>
          <div className="absolute top-0 right-0 w-80 h-screen p-8 flex flex-col justify-center items-center gap-8 animate-[slideIn_0.3s_ease-out]" style={{background: 'var(--gradient-bat)'}} onClick={(e) => e.stopPropagation()}>
            <nav className="flex flex-col">
              <ul className="flex flex-col list-none m-0 p-0 gap-8 text-center">
                {/*
                <li>
                  <a href="#subjects" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}} onClick={toggleMenu}>
                    Subjects
                  </a>
                </li>
                <li>
                  <Link to="/courses" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}} onClick={toggleMenu}>
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/books" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}} onClick={toggleMenu}>
                    Books
                  </Link>
                </li>
                <li>
                  <Link to="/grades" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}} onClick={toggleMenu}>
                    Grades
                  </Link>
                </li>
                */}
                <li>
                  <button type="button" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg bg-transparent border-0 cursor-pointer" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}}>
                    Homework
                  </button>
                </li>
                <li>
                  <button type="button" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg bg-transparent border-0 cursor-pointer" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}}>
                    Sessions
                  </button>
                </li>
                <li>
                  <Link to="/friends" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}} onClick={toggleMenu}>
                    My Friends
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}} onClick={toggleMenu}>
                    Community
                  </Link>
                </li>
                <li>
                  <button type="button" className="no-underline text-xl font-medium p-4 block transition-all duration-300 rounded-lg bg-transparent border-0 cursor-pointer" style={{color: 'var(--text-primary)'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--bat-light-gray)'; e.target.style.color = 'var(--math-blue)';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-primary)';}}>
                    Our Story
                  </button>
                </li>
              </ul>
              
              {/* Mobile Auth Buttons */}
              {isAuthenticated ? (
                <div className="w-full space-y-4">
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--bat-light-gray)' }}>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--yellow-primary)' }}>
                        <span className="text-sm font-bold" style={{ color: 'var(--bat-black)' }}>
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="w-full border-2 px-6 py-4 rounded-lg font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105 block text-center flex items-center justify-center gap-3"
                    style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
                    onClick={toggleMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="w-full border-2 px-6 py-4 rounded-lg font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105 block text-center flex items-center justify-center gap-3"
                    style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
                    onClick={toggleMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full border-2 px-6 py-4 rounded-lg font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    style={{ borderColor: '#dc2626', color: '#dc2626' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  <button
                    onClick={handleLogin}
                    className="w-full border-2 px-6 py-4 rounded-lg font-bold text-lg cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{ borderColor: 'var(--yellow-primary)', color: 'var(--yellow-primary)' }}
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="w-full border-none px-6 py-4 rounded-lg font-bold text-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden hover:scale-105"
                    style={{ background: 'var(--yellow-primary)', color: '#000', boxShadow: '0 4px 15px var(--shadow-yellow)' }}
                  >
                    <span className="transition-all duration-300">Sign Up</span>
                    <span className="text-xl font-black opacity-0 -translate-x-2.5 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
      
      {/* Auth Modals */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onSwitchToSignup={handleSignup}
        />
      )}
      {showSignup && (
        <Signup 
          onClose={() => setShowSignup(false)} 
          onSwitchToLogin={handleLogin}
        />
      )}
    </header>
  );
};

export default Header;