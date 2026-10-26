// "use client";

// import { useState } from "react";
// import { 
//   Check, 
//   Star, 
//   MessageSquare, 
//   X,
//   Cpu,
//   Lock,
//   Radio,
//   Zap,
//   Box
// } from "lucide-react";
// import EnquiryForm from "./enquiryform";

// interface ProductPageProps {
//   productData: any;
//   slug: string;
// }

// // Helper to extract key features dynamically
// function extractKeyFeatures(description: string, fallbackHighlights: string[] = []): string[] {
//   if (fallbackHighlights && fallbackHighlights.length > 0) {
//     return fallbackHighlights;
//   }

//   if (!description) return [];

//   let processed = description
//     .replace(/<\/?(p|div|li)[^>]*>/gi, "\n")
//     .replace(/<br\s*[\/]?>/gi, "\n")
    
//     // 2. Handle degree symbols (catches ^\circ, \circ, or literal carets)
//     .replace(/[\^\\]*circ/g, '°')
    
//     // 3. Handle temperature units like \text{C} or \text{F}
//     .replace(/\\text\s*\{\s*([A-Za-z])\s*\}/g, '$1')
    
//     // 4. Handle prime/inches notations like ^{\prime\prime} or HTML &#8243;
//     .replace(/(\d+)\s*\^\{\s*\\prime\s*\\prime\s*\}/g, '$1"')
//     .replace(/&#8243;/g, '"')
//     .replace(/&#8242;/g, "'")
//     .replace(/\\prime\s*\\prime/g, '"')
//     .replace(/\\prime/g, "'")
    
//     // 5. Clean up remaining LaTeX math wrappers and symbols
//     .replace(/\$/g, '')
//     .replace(/\\times/g, '×')
//     .replace(/[*_`#]/g, '')
//     .trim();

//   processed = processed
//     .replace(/&lt;/g, "<")
//     .replace(/&gt;/g, ">")
//     .replace(/&amp;/g, "&")
//     .replace(/&quot;/g, '"')
//     .replace(/\\^\\circ/g, '°')
//     .replace(/&#039;/g, "'");

//   processed = processed.replace(/<[^>]*>?/gm, "");

//   const lines = processed
//     .split("\n")
//     .map((line) => line.trim())
//     .filter((line) => line.length > 0);

//   let foundKeyFeatures = false;
//   const features: string[] = [];

//   for (const line of lines) {
//     if (/key features/i.test(line)) {
//       foundKeyFeatures = true;
//       const remainder = line.replace(/key features/i, "").trim();
//       if (remainder) {
//         features.push(remainder);
//       }
//       continue;
//     }

//     if (foundKeyFeatures || line.includes(":")) {
//       const cleanedLine = line.replace(/^[-•*]\s*/, "").trim();
//       if (cleanedLine) {
//         features.push(cleanedLine);
//       }
//     }
//   }

//   return features.length > 0 ? features : lines;
// }

// // Helper to safely extract dimensions and weight metrics
// function extractDimensionsAndWeight(product: any) {
//   const metrics: { label: string; value: string }[] = [];

//   // Check direct WooCommerce dimensions object
//   if (product?.dimensions) {
//     const { length, width, height } = product.dimensions;
//     if (length || width || height) {
//       const formattedDim = [length, width, height].filter(Boolean).join(" × ");
//       metrics.push({ label: "Dimensions (L×W×H)", value: `${formattedDim} mm` });
//     }
//   }

//   // Check direct WooCommerce weight
//   if (product?.weight) {
//     metrics.push({ label: "Weight", value: `${product.weight} lbs` });
//   }

//   // Check custom specifications array or WooCommerce attributes
//   const specs = product?.specifications || [];
//   specs.forEach((s: { label: string; value: string }) => {
//     const labelLower = (s.label || "").toLowerCase();
//     if (labelLower.includes("dimension") || labelLower.includes("weight") || labelLower.includes("size")) {
//       if (!metrics.some((m) => m.label.toLowerCase() === labelLower)) {
//         metrics.push({ label: s.label, value: s.value });
//       }
//     }
//   });

//   return metrics;
// }

// export default function ProductPage({ productData, slug }: ProductPageProps) {
//   const product = productData || {};

//   // Safely extract images
//   const imageList: string[] = (product.images || []).map((img: any) =>
//     typeof img === "string" ? img : img?.src || ""
//   ).filter(Boolean);

//   const defaultImage = imageList[0] || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1000";

//   // Safely extract attributes
//   const colors = product.colors || product.attributes?.find((a: any) => a.name.toLowerCase() === "color")?.options || [];
//   const lenses = product.lenses || product.attributes?.find((a: any) => a.name.toLowerCase() === "lens")?.options || [];
//   const specifications = product.specifications || [];

//   // EXTRACT KEY FEATURES AND DIMENSIONS/WEIGHT
//   const keyFeatures = extractKeyFeatures(product.description || "", product.highlights || []);
//   const dimensionsAndWeight = extractDimensionsAndWeight(product);

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState(
//     typeof colors[0] === "object" ? colors[0]?.name : colors[0] || ""
//   );
//   const [selectedLens, setSelectedLens] = useState(lenses[0] || "");
//   const [isEnquireOpen, setIsEnquireOpen] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const handleEnquirySubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormSubmitted(true);
//     setTimeout(() => {
//       setFormSubmitted(false);
//       setIsEnquireOpen(false);
//     }, 2500);
//   };

//   // REMOVE KEY FEATURES SECTION FROM MAIN DESCRIPTION PARAGRAPH
//   const cleanDescription = (product.description || "")
//     .replace(/<[^>]*>?/gm, "")
//     .replace(/key features[\s\S]*/i, "")
//     .replace(/\$/g, '')
//     .replace(/\\times/g, '×')
//     .replace(/\n{3,}/g, '\n\n')
//     // Replace the double prime HTML entity with a standard double quote or inch symbol
//     .replace(/&#8243;/g, '"')
//     // (Optional) Replace single prime entity &#8242; if present
//     .replace(/&#8242;/g, "'")
//     .replace(/\$\s*(-?\d+)\s*\^\s*\\circ\s*\\text\s*\{\s*([CF])\s*\}\s*\$/g, '$1°$2')
    
//     // 2. Replace partial snippets like ^\circ\text{C}$ with °C
//     .replace(/\^\s*\\circ\s*\\text\s*\{\s*([A-Za-z]+)\s*\}\s*\$/g, '°$1')
//     .replace(/\\^circ/g, '°')
//     .replace(/(\d+)\s*\^\{\s*\\prime\s*\\prime\s*\}/g, '$1"')
//     // Replaces single prime like 7^{\prime} with 7'
//     .replace(/(\d+)\s*\^\{\s*\\prime\s*\}/g, '$1\'')
//     // Cleans up any remaining standalone \prime symbols
//     .replace(/\\prime\s*\\prime/g, '"')
//     .replace(/\\prime/g, '\'')
//     .trim();

//   return (
//     <div className="w-full bg-neutral-950 text-white min-h-screen py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

//         {/* MAIN PRODUCT SECTION */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
//           {/* Left Column: Gallery */}
//           <div className="lg:col-span-7 space-y-4">
//             <div className="relative border border-neutral-800 bg-neutral-900/40 rounded-3xl overflow-hidden aspect-1 shadow-2xl">
//               <img
//                 src={imageList[selectedImage] || defaultImage}
//                 alt={product.name || "Product Image"}
//                 className="w-full h-full object-cover transition-all duration-300"
//               />
//               {product.tag && (
//                 <span className="absolute top-6 left-6 text-xs uppercase tracking-widest text-red-500 font-semibold bg-neutral-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800">
//                   {product.tag}
//                 </span>
//               )}
//             </div>

//             {/* Thumbnail Row */}
//             {imageList.length > 1 && (
//               <div className="grid grid-cols-4 gap-4">
//                 {imageList.map((img: string, idx: number) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`relative aspect-1 rounded-2xl overflow-hidden border transition-all ${
//                       selectedImage === idx
//                         ? "border-red-500 ring-2 ring-red-500/30 scale-[0.98]"
//                         : "border-neutral-800 hover:border-neutral-700 opacity-60 hover:opacity-100"
//                     }`}
//                   >
//                     <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Right Column: Product Details & Action */}
//           <div className="lg:col-span-5 space-y-8">
//             <div className="space-y-3">
//               {product.subtitle && (
//                 <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
//                   {product.subtitle}
//                 </span>
//               )}
//               <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
//                 {product.name}
//               </h1>

//               {/* Rating */}
//               {(product.rating || product.average_rating) && (
//                 <div className="flex items-center gap-3 pt-1">
//                   <div className="flex items-center text-amber-400">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="w-4 h-4 fill-amber-400" />
//                     ))}
//                   </div>
//                   <span className="text-xs text-neutral-400">
//                     {product.rating || product.average_rating} ({product.reviewsCount || product.rating_count || 0} verified reviews)
//                   </span>
//                 </div>
//               )}
//             </div>

//             <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
//               {cleanDescription}
//             </p>

//             {/* Color / Finish Selector */}
//             {colors.length > 0 && (
//               <div className="space-y-3">
//                 <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
//                   Casing Finish: <span className="text-white">{selectedColor}</span>
//                 </label>
//                 <div className="flex items-center gap-3">
//                   {colors.map((c: any) => {
//                     const colorName = typeof c === "string" ? c : c.name;
//                     const colorHex = typeof c === "object" && c.hex ? c.hex : "#262626";
//                     return (
//                       <button
//                         key={colorName}
//                         onClick={() => setSelectedColor(colorName)}
//                         className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
//                           selectedColor === colorName
//                             ? "border-red-500 scale-110"
//                             : "border-neutral-800 hover:border-neutral-700"
//                         }`}
//                         style={{ backgroundColor: colorHex }}
//                       >
//                         {selectedColor === colorName && (
//                           <Check className={`w-4 h-4 ${colorHex === "#f1f5f9" ? "text-neutral-950" : "text-white"} drop-shadow`} />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Lens Option Selector */}
//             {lenses.length > 0 && (
//               <div className="space-y-3">
//                 <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
//                   Optical Lens: <span className="text-white">{selectedLens}</span>
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {lenses.map((lens: string) => (
//                     <button
//                       key={lens}
//                       onClick={() => setSelectedLens(lens)}
//                       className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
//                         selectedLens === lens
//                           ? "border-red-500 bg-red-500/10 text-white"
//                           : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-white"
//                       }`}
//                     >
//                       {lens}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ENQUIRE NOW BUTTON */}
//             <div className="pt-2 space-y-4">
//               <button
//                 onClick={() => setIsEnquireOpen(true)}
//                 className="w-full bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-all duration-200 shadow-xl shadow-red-600/10 active:scale-95 flex items-center justify-center gap-3 group"
//               >
//                 <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                 <span>Enquire Now</span>
//               </button>

//               <p className="text-center text-xs text-neutral-500">
//                 Bulk site surveys, NVR compatibility, and installation quotes available upon request.
//               </p>
//             </div>

//           </div>
//         </div>

//         {/* FULL WIDTH KEY FEATURES SECTION */}
//         {keyFeatures.length > 0 && (
//           <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
//                 <Zap className="w-4 h-4" />
//               </div>
//               <h2 className="text-xl sm:text-2xl font-extrabold text-white">
//                 Key Features & Capabilities
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {keyFeatures.map((feature: string, idx: number) => (
//                 <div 
//                   key={idx} 
//                   className="flex items-start gap-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800/80 hover:border-neutral-700 transition-all"
//                 >
//                   <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
//                   <span>{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* DIMENSIONS & WEIGHT SECTION (RENDERED BENEATH KEY FEATURES IF AVAILABLE) */}
//         {dimensionsAndWeight.length > 0 && (
//           <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
//                 <Box className="w-4 h-4" />
//               </div>
//               <h2 className="text-xl sm:text-2xl font-extrabold text-white">
//                 Dimensions & Weight
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {dimensionsAndWeight.map((item, idx) => (
//                 <div key={idx} className="border border-neutral-800 bg-neutral-900/50 p-6 rounded-2xl space-y-1">
//                   <p className="text-xs text-neutral-500 uppercase tracking-wider">{item.label}</p>
//                   <p className="text-sm font-bold text-white">{item.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* TECHNICAL SPECIFICATIONS */}
//         {specifications.length > 0 && (
//           <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-8">
//             <div className="space-y-2">
//               <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
//                 Technical Datasheet
//               </span>
//               <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
//                 Specifications
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {specifications.map((spec: { label: string; value: string }, idx: number) => (
//                 <div key={idx} className="border border-neutral-800 bg-neutral-900/50 p-6 rounded-2xl space-y-1">
//                   <p className="text-xs text-neutral-500 uppercase tracking-wider">{spec.label}</p>
//                   <p className="text-sm font-bold text-white">{spec.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* PERKS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3">
//             <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
//               <Cpu className="w-5 h-5" />
//             </div>
//             <h3 className="text-lg font-semibold text-white">Edge AI Processing</h3>
//             <p className="text-neutral-400 text-sm leading-relaxed">
//               Onboard neural algorithms filter out false alerts caused by weather and shadows.
//             </p>
//           </div>
//           <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3">
//             <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
//               <Lock className="w-5 h-5" />
//             </div>
//             <h3 className="text-lg font-semibold text-white">Encrypted Streams</h3>
//             <p className="text-neutral-400 text-sm leading-relaxed">
//               AES-256 encrypted feeds ensuring end-to-end network surveillance privacy.
//             </p>
//           </div>
//           <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3">
//             <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
//               <Radio className="w-5 h-5" />
//             </div>
//             <h3 className="text-lg font-semibold text-white">24/7 Tech Support</h3>
//             <p className="text-neutral-400 text-sm leading-relaxed">
//               Dedicated engineering assistance for system integrators and site installations.
//             </p>
//           </div>
//         </div>

//         {/* MODAL: ENQUIRE NOW FORM */}
//         {isEnquireOpen && (
//           <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
//             <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6">
              
//               <button
//                 onClick={() => setIsEnquireOpen(false)}
//                 className="absolute top-6 right-6 text-neutral-400 hover:text-white"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="space-y-2">
//                 <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
//                   Hardware Quotation Enquiry
//                 </span>
//                 <h3 className="text-2xl font-extrabold text-white">
//                   {product.name}
//                 </h3>
//                 <p className="text-xs text-neutral-400">
//                   Selected Config: {selectedColor && <span className="text-white">{selectedColor}</span>} {selectedLens && `/ ${selectedLens}`}
//                 </p>
//               </div>

//               {formSubmitted ? (
//                 <div className="py-12 text-center space-y-3">
//                   <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
//                     <Check className="w-6 h-6" />
//                   </div>
//                   <h4 className="text-lg font-bold text-white">Enquiry Received!</h4>
//                   <p className="text-xs text-neutral-400 max-w-xs mx-auto">
//                     Thank you. Our security team will review your request and send a detailed quotation.
//                   </p>
//                 </div>
//               ) : (
//                 <EnquiryForm />
//               )}

//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { 
  Check, 
  Star, 
  MessageSquare, 
  Cpu,
  Lock,
  Radio,
  Zap,
  Box
} from "lucide-react";
import EnquiryForm from "./enquiryform";

interface ProductPageProps {
  productData: any;
  slug: string;
}

// Helper to extract key features dynamically
function extractKeyFeatures(description: string, fallbackHighlights: string[] = []): string[] {
  if (fallbackHighlights && fallbackHighlights.length > 0) {
    return fallbackHighlights;
  }

  if (!description) return [];

  let processed = description
    .replace(/<\/?(p|div|li)[^>]*>/gi, "\n")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/[\^\\]*circ/g, '°')
    .replace(/\\text\s*\{\s*([A-Za-z])\s*\}/g, '$1')
    .replace(/(\d+)\s*\^\{\s*\\prime\s*\\prime\s*\}/g, '$1"')
    .replace(/&#8243;/g, '"')
    .replace(/&#8242;/g, "'")
    .replace(/\\prime\s*\\prime/g, '"')
    .replace(/\\prime/g, "'")
    .replace(/\$/g, '')
    .replace(/\\times/g, '×')
    .replace(/[*_`#]/g, '')
    .trim();

  processed = processed
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\\^\\circ/g, '°')
    .replace(/&#039;/g, "'");

  processed = processed.replace(/<[^>]*>?/gm, "");

  const lines = processed
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let foundKeyFeatures = false;
  const features: string[] = [];

  for (const line of lines) {
    if (/key features/i.test(line)) {
      foundKeyFeatures = true;
      const remainder = line.replace(/key features/i, "").trim();
      if (remainder) {
        features.push(remainder);
      }
      continue;
    }

    if (foundKeyFeatures || line.includes(":")) {
      const cleanedLine = line.replace(/^[-•*]\s*/, "").trim();
      if (cleanedLine) {
        features.push(cleanedLine);
      }
    }
  }

  return features.length > 0 ? features : lines;
}

// Helper to safely extract dimensions and weight metrics
function extractDimensionsAndWeight(product: any) {
  const metrics: { label: string; value: string }[] = [];

  if (product?.dimensions) {
    const { length, width, height } = product.dimensions;
    if (length || width || height) {
      const formattedDim = [length, width, height].filter(Boolean).join(" × ");
      metrics.push({ label: "Dimensions (L×W×H)", value: `${formattedDim} mm` });
    }
  }

  if (product?.weight) {
    metrics.push({ label: "Weight", value: `${product.weight} lbs` });
  }

  const specs = product?.specifications || [];
  specs.forEach((s: { label: string; value: string }) => {
    const labelLower = (s.label || "").toLowerCase();
    if (labelLower.includes("dimension") || labelLower.includes("weight") || labelLower.includes("size")) {
      if (!metrics.some((m) => m.label.toLowerCase() === labelLower)) {
        metrics.push({ label: s.label, value: s.value });
      }
    }
  });

  return metrics;
}

export default function ProductPage({ productData, slug }: ProductPageProps) {
  const product = productData || {};

  const imageList: string[] = (product.images || []).map((img: any) =>
    typeof img === "string" ? img : img?.src || ""
  ).filter(Boolean);

  const defaultImage = imageList[0] || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1000";

  const colors = product.colors || product.attributes?.find((a: any) => a.name.toLowerCase() === "color")?.options || [];
  const lenses = product.lenses || product.attributes?.find((a: any) => a.name.toLowerCase() === "lens")?.options || [];
  const specifications = product.specifications || [];

  const keyFeatures = extractKeyFeatures(product.description || "", product.highlights || []);
  const dimensionsAndWeight = extractDimensionsAndWeight(product);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    typeof colors[0] === "object" ? colors[0]?.name : colors[0] || ""
  );
  const [selectedLens, setSelectedLens] = useState(lenses[0] || "");
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  const cleanDescription = (product.description || "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/key features[\s\S]*/i, "")
    .replace(/\$/g, '')
    .replace(/\\times/g, '×')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/&#8243;/g, '"')
    .replace(/&#8242;/g, "'")
    .replace(/\$\s*(-?\d+)\s*\^\s*\\circ\s*\\text\s*\{\s*([CF])\s*\}\s*\$/g, '$1°$2')
    .replace(/\^\s*\\circ\s*\\text\s*\{\s*([A-Za-z]+)\s*\}\s*\$/g, '°$1')
    .replace(/\\^circ/g, '°')
    .replace(/(\d+)\s*\^\{\s*\\prime\s*\\prime\s*\}/g, '$1"')
    .replace(/(\d+)\s*\^\{\s*\\prime\s*\}/g, '$1\'')
    .replace(/\\prime\s*\\prime/g, '"')
    .replace(/\\prime/g, '\'')
    .trim();

  return (
    <div className="w-full bg-neutral-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative border border-neutral-800 bg-neutral-900/40 rounded-3xl overflow-hidden aspect-1 shadow-2xl">
              <img
                src={imageList[selectedImage] || defaultImage}
                alt={product.name || "Product Image"}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.tag && (
                <span className="absolute top-6 left-6 text-xs uppercase tracking-widest text-red-500 font-semibold bg-neutral-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800">
                  {product.tag}
                </span>
              )}
            </div>

            {imageList.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {imageList.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-1 rounded-2xl overflow-hidden border transition-all ${
                      selectedImage === idx
                        ? "border-red-500 ring-2 ring-red-500/30 scale-[0.98]"
                        : "border-neutral-800 hover:border-neutral-700 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Action */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              {product.subtitle && (
                <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                  {product.subtitle}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {product.name}
              </h1>
                  {/* product rating */}
              {/* {(product.rating || product.average_rating) && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">
                    {product.rating || product.average_rating} ({product.reviewsCount || product.rating_count || 0} verified reviews)
                  </span>
                </div>
              )} */}
            </div>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              {cleanDescription}
            </p>

            {colors.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Casing Finish: <span className="text-white">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {colors.map((c: any) => {
                    const colorName = typeof c === "string" ? c : c.name;
                    const colorHex = typeof c === "object" && c.hex ? c.hex : "#262626";
                    return (
                      <button
                        key={colorName}
                        onClick={() => setSelectedColor(colorName)}
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedColor === colorName
                            ? "border-red-500 scale-110"
                            : "border-neutral-800 hover:border-neutral-700"
                        }`}
                        style={{ backgroundColor: colorHex }}
                      >
                        {selectedColor === colorName && (
                          <Check className={`w-4 h-4 ${colorHex === "#f1f5f9" ? "text-neutral-950" : "text-white"} drop-shadow`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {lenses.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Optical Lens: <span className="text-white">{selectedLens}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {lenses.map((lens: string) => (
                    <button
                      key={lens}
                      onClick={() => setSelectedLens(lens)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedLens === lens
                          ? "border-red-500 bg-red-500/10 text-white"
                          : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-white"
                      }`}
                    >
                      {lens}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ENQUIRE NOW BUTTON */}
            <div className="pt-2 space-y-4">
              <button
                onClick={() => setIsEnquireOpen(true)}
                className="w-full bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-all duration-200 shadow-xl shadow-red-600/10 active:scale-95 flex items-center justify-center gap-3 group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Enquire Now</span>
              </button>

              <p className="text-center text-xs text-neutral-500">
                Bulk site surveys, NVR compatibility, and installation quotes available upon request.
              </p>
            </div>

          </div>
        </div>

        {/* FULL WIDTH KEY FEATURES SECTION */}
        {keyFeatures.length > 0 && (
          <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                <Zap className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Key Features & Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyFeatures.map((feature: string, idx: number) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3.5 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800/80 hover:border-neutral-700 transition-all"
                >
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIMENSIONS & WEIGHT SECTION */}
        {dimensionsAndWeight.length > 0 && (
          <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                <Box className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Dimensions & Weight
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dimensionsAndWeight.map((item, idx) => (
                <div key={idx} className="border border-neutral-800 bg-neutral-900/50 p-6 rounded-2xl space-y-1">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TECHNICAL SPECIFICATIONS */}
        {specifications.length > 0 && (
          <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
                Technical Datasheet
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specifications.map((spec: { label: string; value: string }, idx: number) => (
                <div key={idx} className="border border-neutral-800 bg-neutral-900/50 p-6 rounded-2xl space-y-1">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">{spec.label}</p>
                  <p className="text-sm font-bold text-white">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PERKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Edge AI Processing</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Onboard neural algorithms filter out false alerts caused by weather and shadows.
            </p>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Encrypted Streams</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              AES-256 encrypted feeds ensuring end-to-end network surveillance privacy.
            </p>
          </div>
          <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">24/7 Tech Support</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Dedicated engineering assistance for system integrators and site installations.
            </p>
          </div>
        </div>

        {/* ENQUIRE NOW MODAL */}
        <EnquiryForm
          isOpen={isEnquireOpen}
          onClose={() => setIsEnquireOpen(false)}
          productName={product.name}
          selectedConfig={`${selectedColor ? `Color: ${selectedColor}` : ''} ${selectedLens ? `/ Lens: ${selectedLens}` : ''}`.trim()}
        />

      </div>
    </div>
  );
}