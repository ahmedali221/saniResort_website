import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const HeroSection = () => {
  const [selectedGrade, setSelectedGrade] = useState('3rd');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const gradeOptions = [
    { id: '1st', label: '1st Secondary' },
    { id: '2nd', label: '2nd Secondary' },
    { id: '3rd', label: '3rd Secondary' }
  ];

  return (
    <section className="max-h-screen flex items-center relative overflow-hidden" >
      <div className="max-w-8xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
        {/* Left Content */}
        <div className="flex flex-col gap-25 z-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold m-0 leading-tight bruce-font" style={{color: 'var(--text-primary)'}}>
              Master Math Like a
            </h1>
            <h2 className="text-9xl font-black text-transparent m-0 leading-none bruce-font" style={{
              WebkitTextStroke: '3px var(--yellow-primary)',
              textStroke: '3px var(--yellow-primary)',
              textShadow: '0 0 20px var(--shadow-yellow)'
            }}>
              BATMATH
            </h2>
            <p className="text-xl leading-relaxed m-0 max-w-lg" style={{color: 'var(--text-secondary)'}}>
            Let's save the gotham's students.

            </p>
          </div>

    <div className="flex flex-col gap-6">
            {/* Grade Level Selection */}
            <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-semibold m-0 bruce-font" style={{color: 'var(--text-primary)'}}>Choose Your Grade Level:</h3>
            <div className="flex gap-4 flex-wrap">
              {gradeOptions.map((grade) => (
                <button
                  key={grade.id}
                  className="bg-transparent border-2 px-8 py-4 rounded-xl text-lg font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col items-center hover:scale-105"
                  style={{
                    borderColor: selectedGrade === grade.id ? 'var(--yellow-primary)' : 'var(--border-gray-light)',
                    color: selectedGrade === grade.id ? 'var(--yellow-primary)' : 'var(--text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedGrade !== grade.id) {
                      e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedGrade !== grade.id) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => setSelectedGrade(grade.id)}
                >
                  <span className="text-2xl font-bold">{grade.id}</span>
                  <span>{grade.label.replace(`${grade.id} `, '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button - show only when not authenticated */}
          {!isAuthenticated && (
            <div className="flex justify-start">
              <button className="border-none px-8 py-4 rounded-xl font-bold text-lg cursor-pointer transition-all duration-300 flex items-center gap-2 relative overflow-hidden min-w-[200px] hover:min-w-[220px] group" style={{background: 'var(--yellow-primary)', color: '#000', boxShadow: '0 4px 15px var(--shadow-yellow)'}} onMouseEnter={(e) => {e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 20px var(--shadow-yellow-hover)';}} onMouseLeave={(e) => {e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px var(--shadow-yellow)';}} onClick={() => navigate('/login')}>
                <span className="transition-all duration-300">Login</span>
                <span className="text-xl font-black opacity-0 -translate-x-2.5 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
              </button>
            </div>
          )}
    </div>
        </div>

        {/* Right Content - Batman Illustration */}
        <div className="flex justify-center items-center relative">
          <div className="relative flex justify-center items-center">
            <img 
              src="/src/assets/headerImg.png" 
              alt="Batman Illustration" 
                className="max-w-full h-auto max-h-[600px] z-10"
                style={{filter: 'drop-shadow(0 0 120px var(--shadow-yellow))'}}

            />

            {/* Enhanced Mathematical Symbols */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Integral - floating above left shoulder */}
              <span
                className="absolute"
                style={{
                  top: '18%',
                  left: '10%',
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: 'var(--yellow-primary)',
                  opacity: 0.7,
                  textShadow: '0 2px 16px var(--shadow-yellow)',
                  transform: 'rotate(-18deg) scale(1.1)'
                }}
              >
                ∫
              </span>
              {/* Pi - floating above right ear */}
              <span
                className="absolute"
                style={{
                  top: '13%',
                  right: '15%',
                  fontSize: '3.2rem',
                  fontWeight: 700,
                  color: 'var(--yellow-primary)',
                  opacity: 0.7,
                  textShadow: '0 2px 16px var(--shadow-yellow)',
                  transform: 'rotate(12deg) scale(1.05)'
                }}
              >
                π
              </span>
              {/* Delta - near left hand */}
              <span
                className="absolute"
                style={{
                  bottom: '18%',
                  left: '17%',
                  fontSize: '2.8rem',
                  fontWeight: 700,
                  color: 'var(--yellow-primary)',
                  opacity: 0.65,
                  textShadow: '0 2px 16px var(--shadow-yellow)',
                  transform: 'rotate(-8deg) scale(1.08)'
                }}
              >
                ∆
              </span>
              {/* Sigma - near right hand */}
              <span
                className="absolute"
                style={{
                  bottom: '15%',
                  right: '5%',
                  fontSize: '3.1rem',
                  fontWeight: 700,
                  color: 'var(--yellow-primary)',
                  opacity: 0.68,
                  textShadow: '0 2px 16px var(--shadow-yellow)',
                  transform: 'rotate(7deg) scale(1.12)'
                }}
              >
                ∑
              </span>
              {/* Plus - floating above head */}
              <span
                className="absolute"
                style={{
                  top: '-6%',
                  left: '48%',
                  fontSize: '2.8rem',
                  fontWeight: 700,
                  color: 'var(--yellow-primary)',
                  opacity: 0.5,
                  textShadow: '0 2px 12px var(--shadow-yellow)',
                  transform: 'rotate(-6deg) scale(1.1)'
                }}
              >
                +
              </span>
              {/* Square root - near cape */}
              <span
                className="absolute"
                style={{
                  bottom: '-2%',
                  right: '41%',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--yellow-primary)',
                  opacity: 0.55,
                  textShadow: '0 2px 12px var(--shadow-yellow)',
                  transform: 'rotate(14deg) scale(1.05)'
                }}
              >
                √
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;




