import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from "next/link";


export const FooterSection = () => {
  return (
    <footer className=""
    style={{
        background:
          "linear-gradient(160deg, rgba(255, 255, 255, 0.22) 0%, rgba(238, 174, 202, 0.14) 72%, rgba(39, 93, 245, 0.11) 100%)"
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-red-400 w-10 h-10 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-black">VFind</span>
            </div>
            <p className="text-black/80 text-balance">
              Be part of the change in healthcare hiring, Join Vfind today.
            </p>
            <div className="flex space-x-4 text-black">
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center transition-smooth">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
         <div className="space-y-6">
  <h3 className="text-xl font-semibold text-black">Quick Links</h3>
  <ul className="space-y-3">
    <li>
      <Link href="/about" className="text-black/80 hover:text-black transition-smooth">
        About Us
      </Link>
    </li>
    <li>
      <Link href="/jobs" className="text-black/80 hover:text-black transition-smooth">
        Find Jobs
      </Link>
    </li>
    <li>
      <Link href="/employers" className="text-black/80 hover:text-black transition-smooth">
        For Employers
      </Link>
    </li>
    <li>
      <Link href="/blogs" className="text-black/80 hover:text-black transition-smooth">
        Resources
      </Link>
    </li>
  </ul>
</div>
          
          {/* Support */}
         <div className="space-y-6">
  <h3 className="text-xl font-semibold text-black">Support</h3>
  <ul className="space-y-3">
    <li>
      <Link href="/contact" className="text-black/80 hover:text-black transition-smooth">
        Contact Us
      </Link>
    </li>
    <li>
      <Link href="/terms" className="text-black/80 hover:text-black transition-smooth">
        Terms of Service
      </Link>
    </li>
    <li>
      <Link href="/privacy" className="text-black/80 hover:text-black transition-smooth">
        Privacy Policy
      </Link>
    </li>
    <li>
      <Link href="/cookies" className="text-black/80 hover:text-black transition-smooth">
        Cookie Policy
      </Link>
    </li>
  </ul>
</div>
          
          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-black">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-black" />
                <span className="text-black/80">hello@vfind.com.au</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-black" />
                <span className="text-black/80">1800-200-300-400 NURSES</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-black" />
                <span className="text-black/80">Sydney, Australia</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/60 text-sm">
            © 2024 VFind. All rights reserved.
          </p>
          <p className="text-black/60 text-sm mt-4 md:mt-0">
            Made with <Heart className="inline h-4 w-4 text-red-400" /> for nurses in Australia
          </p>
        </div>
      </div>
    </footer>
  );
};