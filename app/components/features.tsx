import { ShieldCheck, Truck, Headphones, Lock,Cpu,Award } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features : Feature[]= [
  {
    icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
    title: "SIRA & MOI Compliant",
    description: "Fully certified security solutions meeting UAE regulatory standards.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-red-500" />,
    title: "End-to-End ELV Integration",
    description: "Turnkey design, supply, and installation for CCTV, Access Control & Cabling.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-red-500" />,
    title: "Dedicated Support",
    description: "Dedicated technical team with rapid response for critical systems.",
  },
  {
    icon: <Award className="w-6 h-6 text-red-500" />,
    title: "Genuine Products",
    description: "100% genuine hardware backed by full manufacturer warranties.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-neutral-950 py-12 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex items-start space-x-4 p-6 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-red-500/50 transition-all duration-300 shadow-lg"
            >
              {/* Icon Container */}
              <div className="p-3 rounded-xl bg-red-600/10 border border-red-500/20 group-hover:bg-white group-hover:text-white transition-colors duration-300 shrink-0">
                {/* Clone icon to handle hover color transition if needed */}
                <div className="group-hover:text-white text-red-500 transition-colors">
                  {feature.icon}
                </div>
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}