"use client";

import React from "react";
import { ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MidPageBanner() {
  return (
    <section className="w-full bg-neutral-950 py-16">
      {/* Container aligned with the rest of the page (max-w-7xl mx-auto + standard responsive horizontal padding) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
          
          {/* Background Image with Dark & Red Radial Gradient Overlays */}
          <div className="absolute inset-0 z-0">
            <img
              src="/midsection.png"
              alt="CCTV & Security Background"
              className="w-full h-full object-cover object-center  scale-105"
            />
            {/* Ambient Red Glows & Gradient Masking */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/90 to-neutral-950/70" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Content Grid Container */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
            
            {/* Left Text & CTA Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Tag Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                <ShieldAlert size={14} className="text-red-500" />
                <span>SIRA & MOI Compliant Solutions</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Upgrade Your Facility with Next-Gen <span className="text-red-500">AI Surveillance</span>
              </h2>

              {/* Subheading */}
              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl">
                From high-definition thermal cameras to biometric access control and turnkey ELV integration — secure your premises with 24/7 reliability.
              </p>

              {/* Value Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-red-500 shrink-0" />
                  <span>Free On-Site Assessment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-red-500 shrink-0" />
                  <span>24/7 Certified Technical SLA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-red-500 shrink-0" />
                  <span>OEM Manufacturer Warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-neutral-200">
                  <CheckCircle2 size={16} className="text-red-500 shrink-0" />
                  <span>Full UAE Express Delivery</span>
                </div>
              </div>
            
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}