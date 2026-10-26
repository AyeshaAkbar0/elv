// export default function Faq(){
//     return(
//         <div className="w-full">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

//             </div>
//         </div>
//     );
// }
"use client";

import React, { useState } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle, ShieldCheck } from "lucide-react";

interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

// FAQ Data stored in JSON format
const faqData: FaqItem[] = [
  {
    id: 1,
    category: "Compliance & Regulations",
    question: "Are your CCTV and security systems SIRA and MOI compliant in the UAE?",
    answer: "Yes, all our surveillance, access control, and ELV security systems fully comply with SIRA (Security Industry Regulatory Agency) and UAE Ministry of Interior standards for commercial and residential installations."
  },
  {
    id: 2,
    category: "Compliance & Regulations",
    question: "Do you assist with getting government security approvals for businesses in Dubai?",
    answer: "Yes, our certified engineering team provides end-to-end documentation, system schematics, and guidance required to help businesses pass local regulatory inspections seamlessly."
  },
  {
    id: 3,
    category: "Products & Warranty",
    question: "What kind of manufacturer warranty is included with your hardware?",
    answer: "All genuine hardware items—including IP cameras, NVRs, biometric terminals, and networking switches—come with a standard manufacturer warranty ranging from 2 to 5 years, backed by direct factory support."
  },
  {
    id: 4,
    category: "Products & Warranty",
    question: "Are your products 100% genuine OEM stock?",
    answer: "Yes, we are authorized distributors of premium global surveillance brands, ensuring you receive 100% authentic, uncompromised factory stock with full firmware update support."
  },
  {
    id: 5,
    category: "Services & Installation",
    question: "Do you offer on-site surveys and custom system designs?",
    answer: "Yes! We offer free professional on-site assessments across Dubai and the UAE to analyze your layout, blind spots, and cabling requirements before proposing a tailored security blueprint."
  },
  {
    id: 6,
    category: "Services & Installation",
    question: "What type of SLA and technical support do you provide after installation?",
    answer: "We offer 24/7 SLA (Service Level Agreement) packages featuring rapid on-site technician deployment, remote troubleshooting, and preventive maintenance to guarantee zero critical downtime."
  },
  {
    id: 7,
    category: "Delivery & Shipping",
    question: "How fast is delivery for orders placed within the UAE?",
    answer: "We provide express dispatch across Dubai, Abu Dhabi, Sharjah, and all northern emirates. Orders above AED 150 qualify for FREE standard delivery, while express same-day/next-day options are also available."
  },
  {
    id: 8,
    category: "Delivery & Shipping",
    question: "Can I pick up my order directly from your showroom?",
    answer: "Yes, you can select 'Local Pickup' during checkout and collect your items directly from our headquarters located at Bin Shabib Mall, Baghdad Street, Al Qusais, Dubai, UAE."
  }
];

const categories = ["All", "Compliance & Regulations", "Products & Warranty", "Services & Installation", "Delivery & Shipping"];

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  // Filter FAQs based on selected category and search query
  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-neutral-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <HelpCircle size={14} />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Find answers regarding our SIRA compliance, CCTV products, warranties, and ELV integration services in the UAE.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xl transition-all placeholder:text-neutral-600"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-6xl mx-auto pt-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl bg-neutral-900 border transition-all duration-300 overflow-hidden shadow-lg ${
                    isOpen ? "border-red-500/50 bg-neutral-900/90" : "border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="font-semibold text-base sm:text-lg text-white pr-4">
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-xl bg-neutral-800 text-neutral-300 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-red-600 text-white" : ""}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-neutral-400 text-sm sm:text-base leading-relaxed border-t border-neutral-800/60 pt-4">
                      <p>{faq.answer}</p>
                      <div className="mt-4 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-neutral-950 text-[11px] text-red-400 font-medium border border-neutral-800">
                        <ShieldCheck size={12} />
                        <span>{faq.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <p className="text-neutral-400 text-base">No matching questions found.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-center max-w-6xl mx-auto flex flex-col items-center space-y-4 shadow-2xl">
          <div className="p-3 rounded-full bg-red-600/20 text-red-500 border border-red-500/30">
            <MessageCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Still have questions?</h3>
          <p className="text-neutral-400 text-sm max-w-md">
            Can't find the answer you're looking for? Reach out to our technical support team directly.
          </p>
          <a
            href="/contact-us"
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-lg shadow-red-600/30"
          >
            Contact Our Team
          </a>
        </div>

      </div>
    </div>
  );
}