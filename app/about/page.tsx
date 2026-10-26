'use client';
import { 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Users, 
  Award, 
  Heart, 
  ArrowRight, 
  CheckCircle2, 
  Globe 
} from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Aboutus() {
  const router = useRouter();
  const stats = [
    { label: "Satisfied Customers", value: "50K+" },
    { label: "Curated Products", value: "1,200+" },
    { label: "Global Destinations", value: "45+" },
    { label: "Customer Satisfaction", value: "99.8%" },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Premium Craftsmanship",
      description: "Every AFRA product is built with meticulous attention to detail and high-grade materials to ensure long-lasting quality.",
    },
    {
      icon: ShieldCheck,
      title: "Guaranteed Authenticity",
      description: "We work directly with certified global manufacturers, guaranteeing 100% genuine and ethically sourced products.",
    },
    {
      icon: Truck,
      title: "Fast Global Shipping",
      description: "Seamless door-to-door delivery with real-time tracking so your favorite pieces reach you safely and quickly.",
    },
    {
      icon: Heart,
      title: "Customer First Service",
      description: "Our dedicated support team is available around the clock to assist you with inquiries, returns, and orders.",
    },
  ];
 

  return (
    <div className="w-full bg-neutral-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        
        

        {/* Brand Overview Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 py-4">
          <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
            Who We Are
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            AFRA
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            AFRA Systems is a premier provider of enterprise security and low-current hardware solutions. We specialize in supplying high-performance gate barriers, biometric time attendance systems, fiber optic networking, IP surveillance, and server rack infrastructure.
            <br/>
            <br/>
            We bridge the gap between global manufacturing excellence and local project requirements, serving system integrators, MEP contractors, and corporate security managers.
          </p>
        </div>

        {/* Mission, Vision, Promise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3 hover:border-red-500/50  transition-colors">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 font-bold">01</div>
            <h3 className="text-lg font-semibold text-white">Uncompromised Reliability</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
             Every camera, barrier arm, and switch in our catalogue meets strict international quality.
            </p>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3 hover:border-red-500/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 font-bold">02</div>
            <h3 className="text-lg font-semibold text-white">Human-Centric Engineering</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Our access control terminals and intercoms are built for intuitive daily operation with seamless software integration.
            </p>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3 hover:border-red-500/50  transition-colors">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 font-bold">03</div>
            <h3 className="text-lg font-semibold text-white">End-to-End Connectivity</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              From long-distance optical fiber backbones to high-wattage PoE distribution switches, we ensure complete network synergy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual/Card Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-neutral-900/80   overflow-hidden backdrop-blur-sm shadow-2xl">
              
              {/* Image Banner / Featured Graphic */}
              <div className="relative h-80 sm:h-80 w-full  overflow-hidden mb-6 bg-neutral-950">
                <img
                  src="/company.jpeg"
                  alt="Enterprise Security Monitoring Center"
                  className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                
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
            
          </div>

        </div>

        {/* NEW SECTION 1: Stats Counter Banner */}
        <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
            {stats.map((stat, idx) => (
              <div key={idx} className={`text-center ${idx > 0 ? "pt-6 lg:pt-0" : ""}`}>
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-neutral-400 mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* NEW SECTION 2: Why Choose AFRA */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
              The Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Choose AFRA
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              We focus on standard-setting craftsmanship and unmatched reliability in every piece we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="border border-neutral-800 bg-neutral-900/20 p-6 rounded-2xl hover:border-neutral-700 transition-all hover:bg-neutral-900/40 group"
                >
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* NEW SECTION 4: Join the Community CTA */}
        <div className=" bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900  p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Become Part of the AFRA Journey
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Explore our latest arrivals or subscribe to receive exclusive access to limited-edition drops and special offers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto pt-2">
            <button className="w-full sm:w-auto bg-white text-neutral-950 font-semibold px-8 py-3.5 rounded-xl hover:bg-neutral-200 transition-all text-sm" onClick={() => router.push('/shop')}>
              Explore Collections
            </button>
            <button className="w-full sm:w-auto border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm" onClick={() => router.push('/contact-us')}>
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}