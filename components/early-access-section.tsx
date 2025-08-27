"use client"; 

import React from 'react';
import  { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const EarlyAccessSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast({
        title: "Welcome aboard! 🎉",
        description: "You'll be the first to know about new nursing opportunities in Australia.",
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 "  style={{
        background:
          "linear-gradient(160deg, rgba(255, 255, 255, 0.22) 0%, rgba(238, 174, 202, 0.14) 72%, rgba(39, 93, 245, 0.11) 100%)"
      }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="fade-in">
            <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-4xl font-bold text-black mb-6">

              Get Early Access to Nursing Jobs in Australia
            </h2>
            <p className=" lg:text-xl text-black/90 mb-10 max-w-2xl mx-auto text-balance">
              Be the first to know about new opportunities, visa updates, and exclusive job openings from top healthcare employers.
            </p>
          </div>
          
          <div className="slide-up">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-healthcare-gray h-5 w-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 pl-12 text-lg bg-white/95 backdrop-blur-sm border-white/20 focus:ring-white"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg"
                    className="h-14 px-8 bg-white text-healthcare-gray shadow-large "
                  >
                    Join Now
                  </Button>
                </div>
              </form>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto">
                <CheckCircle className="h-16 w-16 text-black mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-black mb-2">You are all set!</h3>
                <p className="text-black/90">
                  Thank you for joining! We will keep you updated on the best nursing opportunities in Australia.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 slide-up ">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">Weekly</div>
              <div className="text-black/80">Job Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">Exclusive</div>
              <div className="text-black/80">Opportunities</div>
            </div>
             <div className="text-center">
              <div className="text-2xl font-bold text-black">Join Now</div>
              <div className="text-black/80"> Free for Nurses</div>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};