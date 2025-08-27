import React from 'react';
import { Stethoscope, Building2, Globe } from 'lucide-react';

const benefits = [
  {
    icon: Stethoscope,
    title: 'For Nurses',
    description: 'Free access to jobs tailored to your skills and location.'
  },
 
  {
    icon: Building2,
    title: 'For Employers',
    description: 'Faster hiring with verified candidate profiles.'
  },
  {
    icon: Globe,
    title: 'For Everyone',
    description: 'Privacy-first platform where contact details are protected.'
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-healthcare-gray-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-4xl font-bold text-black text-healthcare-navy  mb-6">
            Why Choose VFind ?
          </h2>
          <p className="text-xl text-healthcare-gray max-w-3xl mx-auto text-balance">
            We are committed to helping nurses build successful careers in Australia thriving healthcare system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-smooth "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-blue-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-healthcare-navy mb-4">
                {benefit.title}
              </h3>
              <p className="text-healthcare-gray text-balance">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};