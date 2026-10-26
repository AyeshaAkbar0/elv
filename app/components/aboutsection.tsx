"use client";

import React from "react";
import { ShieldCheck, Cpu, Building2, Award, ArrowRight, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "SIRA Compliant Systems", value: "100%" },
  { label: "ELV & Security Experts", value: "15+ Yrs" },
  { label: "Technical Support", value: "Active" },
];

const highlights = [
  "SIRA & Dubai Police Certified Security Solutions",
  "End-to-End ELV, CCTV & Access Control Infrastructure",
  "Enterprise-Grade AI Analytics & Smart Automation",
  "Dedicated System Design, Installation & Maintenance",
];

export default function AboutSection() {
  return (
    <section className="relative w-full bg-neutral-950 py-20 text-white overflow-hidden border-b border-neutral-800">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual/Card Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8 overflow-hidden backdrop-blur-sm shadow-2xl">
              
              {/* Image Banner / Featured Graphic */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden mb-6 bg-neutral-950">
                <img
                  src="/company.jpeg"
                  alt="Enterprise Security Monitoring Center"
                  className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                
              </div>

              {/* Grid Mini Features */}
              <div className="grid grid-cols-2 gap-4 max-md:hidden">
                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">CCTV Surveillance</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Real-time Monitoring</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">ELV Engineering</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Commercial infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-red-500 font-semibold text-xs tracking-widest uppercase inline-flex items-center gap-2">
                <Award className="w-4 h-4" /> About Our Company
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-2 text-white leading-tight">
                Pioneering Intelligent <span className="text-red-500">Security</span> & ELV Infrastructure
              </h2>
            </div>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              We engineer, deploy, and maintain advanced extra-low voltage (ELV) networks, IP CCTV surveillance, biometric access control, and smart security systems across the UAE. Designed for maximum reliability and strict regulatory compliance.
            </p>

            {/* Feature Checklist */}
            <ul className="space-y-3 pt-2">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-neutral-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95"
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/contact-us"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-semibold text-sm transition-all"
              >
                Request Consultation
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-16 pt-10 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-3 gap-6 text-center max-md:hidden">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/50">
              <span className="block text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="block text-xs sm:text-sm font-medium text-neutral-400 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}