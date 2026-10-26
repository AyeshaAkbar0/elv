"use client";

import React, { useState } from "react";
import { Send, User, Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call or EmailJS)
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-neutral-950 text-white py-16 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="mb-10 text-left">
          <span className="text-red-500 font-semibold text-xs tracking-widest uppercase">
            Send A Message
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            Request a Quote or Consultation
          </h2>
          <p className="text-neutral-400 text-sm mt-2 max-w-lg">
            Fill out the form below and our CCTV and ELV security experts will get back to you within 24 hours.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="max-w-6xl mx-auto p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl relative overflow-hidden">
          
          {/* Subtle Red Ambient Background Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            /* Success State */
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-full bg-red-600/20 border border-red-500/30 text-red-500">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-neutral-400 text-sm max-w-md">
                Thank you for reaching out to Afra. Our team has received your request and wilin l contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Form Fields */
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-400 flex items-center space-x-1.5">
                    <User size={14} className="text-red-500" />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-neutral-600"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-400 flex items-center space-x-1.5">
                    <Mail size={14} className="text-red-500" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marketplace@afraeurope.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-neutral-600"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-400 flex items-center space-x-1.5">
                    <Phone size={14} className="text-red-500" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 58 501 5393"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-neutral-600"
                  />
                </div>

                {/* Subject / Inquiry Type */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-neutral-400 flex items-center space-x-1.5">
                    <MessageSquare size={14} className="text-red-500" />
                    <span>Subject / Service</span>
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  >
                    <option value="" disabled>Select inquiry type</option>
                    <option value="access control">Access Control And Time Attendance</option>
                    <option value="CAT 6">CAT 6 Connectivity</option>
                    <option value="Faceplates">Faceplates And Modules</option>
                    <option value="Optic Fiber">Fiber Optic Solutions</option>
                    <option value="Gate Barrier">Gate Barrier and Accesories</option>
                    <option value="Intercom">Intercom</option>
                    <option value="Ip and Tz Cameras">Ip and Tz Cameras</option>
                    <option value="Network Video Recorders">Network Video Recorders</option>
                    <option value="Patch Panels">Patch Panels</option>
                    <option value="POE Switches">POE Switches</option>
                    <option value="Racks and Cabinet">Racks and Cabinet</option>
                    <option value="Wifi cctv">Wifi cctv</option>
                    <option value="other">General Inquiry / Support</option>
                  </select>
                </div>

              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-neutral-400 flex items-center space-x-1.5">
                  <MessageSquare size={14} className="text-red-500" />
                  <span>Your Message</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your project or security requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-neutral-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
                >
                  <span>Send Message</span>
                  <Send size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}