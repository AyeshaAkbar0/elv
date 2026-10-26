"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, Eye, FileText, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

interface PolicySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections: PolicySection[] = [
    {
      id: "overview",
      title: "1. Overview & Commitment",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            At <strong className="text-white">Afra</strong> ("we," "our," or "us"), we are committed to safeguarding the privacy and security of your personal data. As a provider of CCTV surveillance, security hardware, and Extra Low Voltage (ELV) solutions operating in the United Arab Emirates, we adhere strictly to UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL) as well as SIRA (Security Industry Regulatory Agency) guidelines.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website, purchase our products, or engage our technical installation and consultancy services.
          </p>
        </div>
      ),
    },
    {
      id: "collection",
      title: "2. Information We Collect",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>We collect information to provide better services to our clients, process transactions, and satisfy legal and regulatory mandates:</p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>
              <strong className="text-white">Personal Identifiers:</strong> Name, business email address, phone number, company name, and physical installation address provided when submitting inquiry forms, requesting site surveys, or making purchases.
            </li>
            <li>
              <strong className="text-white">Commercial Data:</strong> Records of products purchased, service requests, quote estimates, and billing history.
            </li>
            <li>
              <strong className="text-white">Technical & Usage Data:</strong> IP address, browser type, device details, and site navigation patterns collected via cookies for site optimization and security logging.
            </li>
            <li>
              <strong className="text-white">Regulatory Documentation:</strong> In certain commercial CCTV/ELV contracts requiring government approval (SIRA/MOI), we may collect necessary trade license copies or authorized contact details as required by UAE law.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>Your information is processed strictly for legitimate business and regulatory purposes, including:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">Service Delivery</h4>
              <p className="text-neutral-400 text-xs">Fulfilling product orders, executing site surveys, and delivering 24/7 technical SLA support.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">Legal Compliance</h4>
              <p className="text-neutral-400 text-xs">Meeting UAE SIRA and Ministry of Interior regulatory reporting and compliance standards.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">Communication</h4>
              <p className="text-neutral-400 text-xs">Sending order confirmations, technical updates, hardware warranty alerts, and responses to quotes.</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80">
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-1">Security & Integrity</h4>
              <p className="text-neutral-400 text-xs">Protecting our platform and clients from fraudulent activities, unauthorized access, and cyber threats.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "4. Information Sharing & Disclosure",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            We do <strong className="text-white">never sell or rent</strong> your personal information to third parties. We only share information under the following controlled circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>
              <strong className="text-white">Authorized Service Providers:</strong> Logistics and courier partners within the UAE to deliver physical hardware to your designated address.
            </li>
            <li>
              <strong className="text-white">Regulatory & Government Authorities:</strong> When required by law or official directives issued by UAE regulatory entities (such as SIRA or UAE Law Enforcement) to comply with statutory obligations.
            </li>
            <li>
              <strong className="text-white">OEM Manufacturer Partners:</strong> Necessary details provided solely for activating software licenses or official hardware warranties with manufacturers.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "security",
      title: "5. Data Security & Storage",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>
            We deploy enterprise-grade physical, technical, and organizational security measures to prevent unauthorized access, alteration, or destruction of your data:
          </p>
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center space-x-2 text-red-500 font-semibold text-xs uppercase">
              <Lock size={14} />
              <span>Security Protocols</span>
            </div>
            <p className="text-neutral-400 text-xs">
              All website data transmissions are encrypted using 256-bit SSL/TLS protocols. Access to customer records is restricted to authorized personnel under strict non-disclosure obligations.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "rights",
      title: "6. Your Rights Under UAE Data Law",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>Under the UAE Data Protection Law, you reserve the right to:</p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction or updating of inaccurate or incomplete information.</li>
            <li>Request deletion of your data when it is no longer required for regulatory or contractual purposes.</li>
            <li>Opt-out of promotional communications at any time.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "contact-privacy",
      title: "7. Contact Our Privacy Officer",
      content: (
        <div className="space-y-4 text-neutral-300 text-sm leading-relaxed">
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please reach out to us:</p>
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
            <ShieldCheck size={14} />
            <span>Legal & Security</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Privacy <span className="text-red-500">Policy</span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Your trust is our highest priority. Learn how Afra collects, protects, and handles your data in accordance with UAE Federal Data Laws.
          </p>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs">
            <FileText size={12} className="text-red-500" />
            <span>Last Updated: October 2026</span>
          </div>
        </div>

        {/* Content Layout: Sticky Navigation + Main Document Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Quick Jump Sidebar */}
          <aside className="lg:col-span-4 sticky top-40 space-y-2 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl hidden lg:block">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 block">
              Document Contents
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
                    <Eye size={18} />
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