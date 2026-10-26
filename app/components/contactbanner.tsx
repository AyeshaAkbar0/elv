"use client";

import React from "react";
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function ContactUsBanner() {
  return (
    <section className="w-full bg-neutral-950 py-12">
      {/* Centered container aligned with the rest of the site layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-2xl">
          {/* Dark Metallic Background & Ambient Glow Effects */}
          <div className="absolute inset-0 z-0">
            <img
              src="/contactbanner.png"
              alt="CCTV Background"
              className="w-full h-full object-cover object-center filter brightness-[1] scale-105"
            />
            {/* Radial Red Light Sweeps */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/70" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Grid Content Container */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              {/* SIRA / Compliance Pill */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                <ShieldCheck size={14} />
                <span>SIRA & MOI Approved Security Team</span>
              </div>

              {/* Main Title */}
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                Connect With <br />
                <span className="text-red-500">Afra Support</span>
              </h2>

              {/* Subtitle */}
              <p className="text-neutral-300 text-sm sm:text-base max-w-xl leading-relaxed">
                24/7 CCTV & ELV Security Experts in Dubai. Get instant
                assistance with SIRA compliance, site surveys, and enterprise
                system maintenance.
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
