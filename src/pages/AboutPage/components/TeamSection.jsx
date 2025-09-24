import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Chief Education Officer",
      expertise: "Mathematics & Curriculum Design",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Former MIT professor with 15+ years in educational technology"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      expertise: "Interactive Learning Systems",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Full-stack developer passionate about gamified learning experiences"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "UX/UI Designer",
      expertise: "Student Experience Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Award-winning designer focused on making math accessible and fun"
    }
  ];

  return (
    <section className="py-20 px-8" style={{ backgroundColor: 'var(--bat-black)' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bruce-font" style={{ color: 'var(--text-primary)' }}>
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {member.name}
              </h3>
              <p className="text-lg mb-2" style={{ color: 'var(--yellow-primary)' }}>
                {member.role}
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                {member.expertise}
              </p>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;




