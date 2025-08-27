import React from 'react';
import { UserPlus, FileText, Briefcase } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign Up',
    description: 'Create your profile and upload your nursing credentials and experience.'
  },
  {
    number: '02',
    icon: FileText,
    title: 'Apply',
    description: 'Browse and apply to nursing positions that match your skills and preferences.'
  },
  {
    number: '03',
    icon: Briefcase,
    title: 'Get Hired',
    description: 'Connect with employers, complete interviews, and start your nursing career in Australia.'
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-4xl font-bold text-black mb-6 text-healthcare-navy ">
            How It Works
          </h2>
          <p className="lg:text-xl max-w-2xl mx-auto text-balancetext-healthcare-gray max-w-2xl mx-auto text-balance">
            Start your working journey in Australia with our simple three-step process.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
  {/* Line behind all steps */}
  <div className="hidden lg:block absolute top-8 left-8 right-8 h-0.5 bg-blue-600 z-0"></div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-8 lg:gap-12 relative z-10">
    {steps.map((step, index) => (
      <div key={index} className="text-center slide-up">
        {/* Step Number */}
        <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-medium">
          <span className="text-2xl font-bold text-white">{step.number}</span>
        </div>

        {/* Icon */}
        <div className="bg-healthcare-blue-400 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <step.icon className="h-10 w-10 text-blue-400 " />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-semibold text-healthcare-navy mb-4">
          {step.title}
        </h3>
        <p className="text-healthcare-gray text-balance max-w-sm mx-auto">
          {step.description}
        </p>
      </div>
    ))}
  </div>
</div>

      </div>
    </section>
  );
};