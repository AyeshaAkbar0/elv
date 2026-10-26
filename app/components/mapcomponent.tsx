"use client";

import React from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";

export default function Mapcomponent() {
  return (
    <section className="w-full bg-neutral-950 text-white py-16 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="mb-10 text-left">
          <span className="text-red-500 font-semibold text-xs tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            Reach Out To Us
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-lg">
            Have a question about our CCTV & ELV security solutions? Visit our showroom or drop us a message.
          </p>
        </div>

        {/* Main Content Grid: Map + Contact Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-stretch">
          
          {/* Left Side: Responsive Google Map Embed */}
          <div className="lg:col-span-7 w-full h-[400px] lg:h-auto min-h-[350px] rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.7019860917353!2d55.37809467593953!3d25.2806086283161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c475ed7622b%3A0xd9e461a20a362c59!2sBin%20Shabib%20Mall!5e0!3m2!1sen!2sae!4v1791810654656!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
              title="Afra Location Map"
            />
            
          </div>
          
        </div>
        <div className="pt-4 border-t border-neutral-800">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-red-600/20"
              >
                <span>Get Directions on Google Maps</span>
                <Send size={16} />
              </a>
            </div>
      </div>
    </section>
  );
}