import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export const SearchBar = () => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-large p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-healthcare-navy">Job Title</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-healthcare-gray h-4 w-4" />
            <Input 
              placeholder="e.g. Registered Nurse" 
              className="pl-10 h-12 border-healthcare-blue-light focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-healthcare-navy">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-healthcare-gray h-4 w-4" />
            <Select>
              <SelectTrigger className="pl-10 h-12 border-healthcare-blue-light">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sydney">Sydney, NSW</SelectItem>
                <SelectItem value="melbourne">Melbourne, VIC</SelectItem>
                <SelectItem value="brisbane">Brisbane, QLD</SelectItem>
                <SelectItem value="perth">Perth, WA</SelectItem>
                <SelectItem value="adelaide">Adelaide, SA</SelectItem>
                <SelectItem value="canberra">Canberra, ACT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-healthcare-navy">Experience</label>
          <Select>
            <SelectTrigger className="h-12 border-healthcare-blue-light">
              <SelectValue placeholder="Any level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Starting</SelectItem>

              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
              <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
              <SelectItem value="expert">Expert Level (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          size="lg" 
          className="h-12 bg-[#33A1E0] hover:scale-105 transition-bounce shadow-medium"
        >
          <Search className="mr-2 h-4 w-4" />
          Search Jobs
        </Button>
      </div>
    </div>
  );
};