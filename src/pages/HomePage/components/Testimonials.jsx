import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "BatMath transformed my understanding of calculus. The interactive lessons made complex concepts click!",
      author: "Emma Rodriguez",
      grade: "1st Secondary",
      improvement: "+19% in test scores",
      rating: 4.5
    },
    {
      id: 2,
      quote: "The gamification kept me engaged. I actually look forward to math homework now!",
      author: "Sarah Chen",
      grade: "2nd Secondary",
      improvement: "+43% in test scores",
      rating: 4.8
    },
    {
      id: 3,
      quote: "Perfect for exam prep. The practice problems mirror exactly what appears on tests.",
      author: "Marcus Johnson",
      grade: "2nd Secondary",
      improvement: "+27% in test scores",
      rating: 4.5
    }
  ];

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center justify-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <span key={index} className="text-yellow-400 text-xl">★</span>;
          } else if (index === fullStars && hasHalfStar) {
            return <span key={index} className="text-yellow-400 text-xl">☆</span>;
          } else {
            return <span key={index} className="text-gray-300 text-xl">☆</span>;
          }
        })}
      </div>
    );
  };

  return (
    <section className="py-20 px-8 relative" style={{ backgroundColor: 'var(--bat-black)' }}>
      {/* Yellow Banner */}
      <div className="absolute top-0 left-0 w-full h-40 bg-yellow-500 clip-path-polygon" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}></div>

      {/* Bat Logo Placeholder */}
      <div className="relative z-10 flex justify-center mb-16">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-black text-2xl">🐾</span> {/* Placeholder for bat logo */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bruce-font" style={{ color: 'var(--text-primary)' }}>
            What Our Students Say
          </h2>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Real stories from real students achieving real results
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="rounded-2xl p-8 border-2 border-white bg-transparent text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              {/* Quote */}
              <div className="mb-6">
                <p className="text-lg leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Author Info */}
              <div className="mb-4">
                 <h4 className="text-lg font-bold mb-1 text-white bruce-font">
                   {testimonial.author}
                 </h4>
                <p className="text-sm text-gray-400">
                  ({testimonial.grade})
                </p>
              </div>

              {/* Improvement Badge */}
              <div className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-green-500 text-white">
                {testimonial.improvement}
              </div>
            </div>
          ))}
        </div>

        {/* Start Learning Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-3 rounded-xl font-bold text-lg bg-yellow-500 text-black hover:bg-yellow-600 transition-colors"
            style={{ boxShadow: '0 4px 15px rgba(255, 215, 0, 0.5)' }}
          >
            Start learning now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;




