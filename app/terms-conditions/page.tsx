"use client";

import React, { useState } from "react";
import { FileText, Scale, ShieldCheck, AlertCircle, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

interface TermsSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections: TermsSection[] = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            Welcome to <strong className="text-white">Afra</strong> ("we," "our," or "us"). By accessing or using our website, purchasing our CCTV surveillance equipment, requesting quotes, or engaging our Extra Low Voltage (ELV) installation and maintenance services, you agree to be bound by these Terms and Conditions.
          </p>
          <p>
            If you do not agree with any part of these terms, you must refrain from using our services or purchasing products through this platform. These terms apply to all visitors, commercial clients, contractors, and customers across the United Arab Emirates.
          </p>
        </div>
      ),
    },
    {
      id: "products-orders",
      title: "2. Product Specs, Orders & Pricing",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            All product specifications, images, and technical details listed on our website are provided for informational and ordering purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>
              <strong className="text-white">Price Currency & Tax:</strong> All prices listed are in United Arab Emirates Dirhams (AED) and are subject to 5% UAE Value Added Tax (VAT) in accordance with Federal Decree-Law No. 8 of 2017.
            </li>
            <li>
              <strong className="text-white">Stock Availability:</strong> All orders are subject to stock availability and confirmation. We reserve the right to modify prices or discontinue hardware items without prior notice.
            </li>
            <li>
              <strong className="text-white">Order Approval:</strong> An order confirmation email does not signify our final acceptance. We reserve the right to decline orders due to stock constraints, pricing errors, or regulatory compliance verification.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "sira-compliance",
      title: "3. SIRA & Regulatory Compliance",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            As a provider of security equipment in the UAE, compliance with local law enforcement and regulatory bodies is mandatory:
          </p>
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center space-x-2 text-red-500 font-semibold text-xs uppercase">
              <ShieldCheck size={14} />
              <span>SIRA & MOI Guidelines</span>
            </div>
            <p className="text-neutral-400 text-xs">
              Clients are responsible for ensuring that their security layouts comply with SIRA (Security Industry Regulatory Agency) and Ministry of Interior standards. While Afra provides certified SIRA-compliant hardware and consultancy, final operational usage must adhere to local municipal laws.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "delivery-installation",
      title: "4. Delivery, Shipping & On-Site Installation",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>We deliver physical security hardware across all seven emirates in the UAE:</p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>
              <strong className="text-white">Free Delivery Threshold:</strong> Orders exceeding AED 150 qualify for standard free delivery across the UAE.
            </li>
            <li>
              <strong className="text-white">Delivery Timelines:</strong> Dispatch times are estimates. We are not liable for courier delays caused by force majeure, severe weather, or restricted zone access.
            </li>
            <li>
              <strong className="text-white">Site Readiness for Installation:</strong> For turnkey ELV installation contracts, the client must ensure site readiness (civil works, power access, and network racks) prior to the arrival of our installation engineers.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "warranty-returns",
      title: "5. Warranty & Return Policy",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>We offer full OEM manufacturer warranty backing on all our genuine hardware items:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">OEM Hardware Warranty</h4>
              <p className="text-neutral-400 text-xs">
                Cameras, NVRs, and switches carry a 2 to 5-year hardware warranty covering factory defects.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">Exclusions</h4>
              <p className="text-neutral-400 text-xs">
                Warranty is void in cases of physical damage, power surges, water ingress outside IP ratings, or third-party tampering.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "limitation-liability",
      title: "6. Limitation of Liability",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            To the maximum extent permitted by UAE law, Afra, its directors, and employees shall not be held liable for indirect, incidental, or consequential damages resulting from hardware failure, loss of video footage, network downtime, or unauthorized site intrusion.
          </p>
          <p className="text-neutral-400">
            Clients are advised to maintain redundant backups and sign appropriate maintenance SLA packages to safeguard against unexpected hardware downtime.
          </p>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Jurisdiction",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            These Terms and Conditions are governed by and construed in accordance with the federal laws of the United Arab Emirates and the local laws of the Emirate of Dubai.
          </p>
          <p className="text-neutral-400">
            Any legal dispute, controversy, or claim arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the Courts of Dubai, UAE.
          </p>
        </div>
      ),
    },
    {
      id: "contact-legal",
      title: "8. Legal Inquiries & Support",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>For official legal correspondence, contractual inquiries, or terms clarification, please contact our administrative desk:</p>
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center space-x-3 text-xs text-neutral-300">
              <Mail size={16} className="text-red-500 shrink-0" />
              <span><strong>Email:</strong> marketplace@afraeurope.com</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-neutral-300">
              <Phone size={16} className="text-red-500 shrink-0" />
              <span><strong>Phone:</strong> +971 58 501 5393</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-neutral-300">
              <MapPin size={16} className="text-red-500 shrink-0" />
              <span><strong>Address:</strong> Bin Shabib Mall, Baghdad Street, Al Qusais, Dubai, UAE</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-neutral-950 text-white min-h-screen py-16  font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Scale size={14} />
            <span>Legal Framework</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Terms & <span className="text-red-500">Conditions</span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Please read these terms carefully before utilizing our CCTV hardware, ELV engineering, or web services in the UAE.
          </p>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs">
            <FileText size={12} className="text-red-500" />
            <span>Effective Date: October 2026</span>
          </div>
        </div>

        {/* Content Layout: Sticky Navigation + Main Document Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Quick Jump Sidebar */}
          <aside className="lg:col-span-4 sticky top-40 space-y-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl hidden lg:block">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 block">
              Terms Navigation
            </span>
            <nav className="space-y-1">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === sec.id
                      ? "bg-red-600 text-white font-semibold shadow-md shadow-red-600/20"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <ChevronRight size={14} className="opacity-70 shrink-0" />
                </a>
              ))}
            </nav>
          </aside>

          {/* Policy Text Content */}
          <main className="lg:col-span-8 space-y-8">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800/80 shadow-xl space-y-4 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center space-x-3 pb-3 border-b border-neutral-800">
                  <div className="p-2 rounded-lg bg-red-600/10 text-red-500 border border-red-500/20">
                    <AlertCircle size={18} />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </section>
            ))}
          </main>

        </div>

      </div>
    </div>
  );
}