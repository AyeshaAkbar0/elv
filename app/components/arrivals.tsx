// "use client";

// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { ArrowUpRight, Eye, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
// import GetData from "../api/backend";

// interface WooImage {
//   id: number;
//   src: string;
//   alt: string;
// }

// interface WooCategory {
//   id: number;
//   name: string;
//   slug: string;
//   parent: number; // 0 indicates top-level parent category
//   count: number;
// }

// interface WooProduct {
//   id: number;
//   slug:string;
//   name: string;
//   price: string;
//   regular_price: string;
//   permalink: string;
//   images: WooImage[];
//   categories: WooCategory[];
// }

// export default function NewArrivals() {
//   const [products, setProducts] = useState<WooProduct[]>([]);
//   const [allCategories, setAllCategories] = useState<WooCategory[]>([]);
//   const [parentCategories, setParentCategories] = useState<WooCategory[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const categoryScrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     async function loadData() {
//       setLoading(true);
//       try {
//         const [fetchedProducts, fetchedCategories] = await GetData();

//         const categoriesList: WooCategory[] = fetchedCategories || [];
//         const productsList: WooProduct[] = fetchedProducts || [];

//         // Save raw categories for parent-child tree mapping
//         setAllCategories(categoriesList);

//         // Filter ONLY top-level parent categories (parent === 0)
//         // Exclude "Uncategorized"
//         const onlyParents = categoriesList.filter(
//           (cat) => cat.parent === 0 && cat.slug !== "uncategorized"
//         );

//         setProducts(productsList);
//         setParentCategories(onlyParents);
//       } catch (error) {
//         console.error("Failed to load products data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadData();
//   }, []);

//   // Map each Parent Category ID to all its child category IDs
//   const parentToChildMap = useMemo(() => {
//     const map: Record<number, Set<number>> = {};

//     // Initialize map with parent IDs
//     parentCategories.forEach((parent) => {
//       map[parent.id] = new Set([parent.id]);
//     });

//     // Recursively add all child IDs belonging to parent
//     allCategories.forEach((cat) => {
//       if (cat.parent !== 0 && map[cat.parent]) {
//         map[cat.parent].add(cat.id);
//       }
//     });

//     return map;
//   }, [parentCategories, allCategories]);

//   // Filter products by selected Parent Category or any of its Subcategories
//   const filteredProducts = useMemo(() => {
//     if (!selectedCategory) return products;

//     const allowedCategoryIds = parentToChildMap[selectedCategory] || new Set([selectedCategory]);

//     return products.filter((product) =>
//       product.categories.some((cat) => allowedCategoryIds.has(cat.id))
//     );
//   }, [products, selectedCategory, parentToChildMap]);

//   // Limit products to a maximum of 8 items
//   const displayedProducts = useMemo(() => {
//     return filteredProducts.slice(0, 8);
//   }, [filteredProducts]);

//   // Scroll categories helper
//   const scrollCategories = (direction: "left" | "right") => {
//     if (categoryScrollRef.current) {
//       const scrollAmount = 250;
//       categoryScrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section className="w-full bg-neutral-950 py-16 text-white border-b border-neutral-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
//         {/* Section Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-neutral-800 gap-4">
//           <div>
//             <span className="text-red-500 font-semibold text-xs tracking-widest uppercase">
//               Products By Categories
//             </span>
//             <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
//               Latest Additions
//             </h2>
//           </div>
//           <p className="text-neutral-400 text-sm max-w-sm">
//             Discover the newest SIRA-compliant security, surveillance, and ELV products.
//           </p>
//         </div>

//         {/* Parent Category Filter Tabs with Scroll Arrows */}
//         {!loading && parentCategories.length > 0 && (
//           <div className="relative flex items-center mb-8">
//             {/* Left Scroll Arrow */}
//             <button
//               onClick={() => scrollCategories("left")}
//               aria-label="Scroll categories left"
//               className="absolute left-0 z-10 p-2 rounded-full bg-neutral-900/90 text-white border border-neutral-800 shadow-md hover:bg-neutral-800 backdrop-blur-md -ml-3 md:-ml-4 transition-all"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>

//             {/* Scrollable Container */}
//             <div
//               ref={categoryScrollRef}
//               className="flex items-center gap-2 overflow-x-auto px-6 sm:px-8 py-2 scrollbar-none w-full scroll-smooth"
//             >
//               <button
//                 onClick={() => setSelectedCategory(null)}
//                 className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
//                   selectedCategory === null
//                     ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30"
//                     : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
//                 }`}
//               >
//                 All Products 
//               </button>

//               {parentCategories.map((cat) => {
//                 const childIds = parentToChildMap[cat.id] || new Set([cat.id]);
//                 const catCount = products.filter((p) =>
//                   p.categories.some((c) => childIds.has(c.id))
//                 ).length;

//                 return (
//                   <button
//                     key={cat.id}
//                     onClick={() => setSelectedCategory(cat.id)}
//                     className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
//                       selectedCategory === cat.id
//                         ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30"
//                         : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
//                     }`}
//                   >
//                     {cat.name}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Right Scroll Arrow */}
//             <button
//               onClick={() => scrollCategories("right")}
//               aria-label="Scroll categories right"
//               className="absolute right-0 z-10 p-2 rounded-full bg-neutral-900/90 text-white border border-neutral-800 shadow-md hover:bg-neutral-800 backdrop-blur-md -mr-3 md:-mr-4 transition-all"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}

//         {/* Loading Spinner */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
//             <Loader2 className="w-8 h-8 animate-spin text-red-500" />
//             <span className="text-sm font-medium">Fetching Latset Products...</span>
//           </div>
//         ) : displayedProducts.length === 0 ? (
//           /* Empty State */
//           <div className="text-center py-16 text-neutral-400 bg-neutral-900/40 rounded-2xl border border-neutral-800">
//             No products found for this category.
//           </div>
//         ) : (
//           /* Product Grid (Max 8 Items) */
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {displayedProducts.map((product) => {
//               const mainImg =
//                 product.images?.[0]?.src ||
//                 "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=600&auto=format&fit=crop";

//               const primaryCategory =
//                 product.categories?.[0]?.name || "ELV Product";

//               return (
//                 <a
//                   key={product.id}
//                   href={`/shop/product/${product.slug}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group relative flex flex-col rounded-2xl bg-neutral-900 border border-neutral-800/80 overflow-hidden transition-all duration-300 hover:bg-neutral-800 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-950/20"
//                 >
//                   {/* Product Image Wrapper */}
//                   <div className="relative aspect-square w-full bg-neutral-950 overflow-hidden">
//                     <img
//                       src={mainImg}
//                       alt={product.name}
//                       className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//                     />

//                     {/* Hover Overlay */}
//                     <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

//                     {/* "View Product" Overlay */}
//                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                       <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-white/20 text-white text-xs font-semibold shadow-lg backdrop-blur-md hover:bg-red-600 transition-colors">
//                         <Eye className="w-3.5 h-3.5 text-red-500 group-hover:text-white transition-colors" />
//                         View Product
//                       </span>
//                     </div>
//                   </div>

//                   {/* Product Info */}
//                   <div className="relative p-5 flex flex-col flex-grow justify-between">
//                     <div>
//                       <span className="text-[11px] font-medium text-red-400/90 uppercase tracking-wider">
//                         {primaryCategory}
//                       </span>
//                       <h3 className="text-base font-bold text-white mt-1 group-hover:text-red-400 transition-colors line-clamp-2">
//                         {product.name}
//                       </h3>
//                     </div>

//                     <div className="mt-4 flex items-center justify-between">
//                       <span className="text-sm font-semibold text-neutral-200">
//                         Enquire Now
//                       </span>

//                       <div className="flex items-center space-x-1 text-xs font-semibold text-neutral-400 group-hover:text-red-500 transition-all duration-300">
//                         <div className="p-1.5 rounded-full bg-neutral-800 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
//                           <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </a>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { ArrowUpRight, Eye, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import GetData from "../api/backend";

interface WooImage {
  id: number;
  src: string;
  alt: string;
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number; // 0 indicates top-level parent category
  count: number;
}

interface WooProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  regular_price: string;
  permalink: string;
  status?: string; // e.g. "publish", "draft"
  isPublished?: boolean;
  images: WooImage[];
  categories: WooCategory[];
}

export default function NewArrivals() {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [allCategories, setAllCategories] = useState<WooCategory[]>([]);
  const [parentCategories, setParentCategories] = useState<WooCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [fetchedProducts, fetchedCategories] = await GetData();

        const categoriesList: WooCategory[] = fetchedCategories || [];
        const rawProductsList: WooProduct[] = fetchedProducts || [];

        // Save raw categories for parent-child tree mapping
        setAllCategories(categoriesList);

        // Filter ONLY top-level parent categories (parent === 0)
        // Exclude "Uncategorized"
        const onlyParents = categoriesList.filter(
          (cat) => cat.parent === 0 && cat.slug !== "uncategorized"
        );

        // Filter ONLY published products (hide drafts)
        const publishedProducts = rawProductsList.filter((product) => {
          if (product.status) return product.status === "publish";
          if (product.isPublished !== undefined) return product.isPublished === true;
          return true; // Keep by default if status field is omitted
        });

        setProducts(publishedProducts);
        setParentCategories(onlyParents);
      } catch (error) {
        console.error("Failed to load products data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Map each Parent Category ID to all its child category IDs
  const parentToChildMap = useMemo(() => {
    const map: Record<number, Set<number>> = {};

    // Initialize map with parent IDs
    parentCategories.forEach((parent) => {
      map[parent.id] = new Set([parent.id]);
    });

    // Recursively add all child IDs belonging to parent
    allCategories.forEach((cat) => {
      if (cat.parent !== 0 && map[cat.parent]) {
        map[cat.parent].add(cat.id);
      }
    });

    return map;
  }, [parentCategories, allCategories]);

  // Filter products by selected Parent Category or any of its Subcategories
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;

    const allowedCategoryIds = parentToChildMap[selectedCategory] || new Set([selectedCategory]);

    return products.filter((product) =>
      product.categories.some((cat) => allowedCategoryIds.has(cat.id))
    );
  }, [products, selectedCategory, parentToChildMap]);

  // Limit products to a maximum of 8 items
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, 8);
  }, [filteredProducts]);

  // Scroll categories helper
  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 250;
      categoryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-neutral-950 py-16 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-neutral-800 gap-4">
          <div>
            <span className="text-red-500 font-semibold text-xs tracking-widest uppercase">
              Products By Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
              Latest Additions
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-sm">
            Discover the newest SIRA-compliant security, surveillance, and ELV products.
          </p>
        </div>

        {/* Parent Category Filter Tabs with Scroll Arrows */}
        {!loading && parentCategories.length > 0 && (
          <div className="relative flex items-center mb-8">
            {/* Left Scroll Arrow */}
            <button
              onClick={() => scrollCategories("left")}
              aria-label="Scroll categories left"
              className="absolute left-0 z-10 p-2 rounded-full bg-neutral-900/90 text-white border border-neutral-800 shadow-md hover:bg-neutral-800 backdrop-blur-md -ml-3 md:-ml-4 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-2 overflow-x-auto px-6 sm:px-8 py-2 scrollbar-none w-full scroll-smooth"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === null
                    ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30"
                    : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
                }`}
              >
                All Products 
              </button>

              {parentCategories.map((cat) => {
                const childIds = parentToChildMap[cat.id] || new Set([cat.id]);
                const catCount = products.filter((p) =>
                  p.categories.some((c) => childIds.has(c.id))
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      selectedCategory === cat.id
                        ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30"
                        : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => scrollCategories("right")}
              aria-label="Scroll categories right"
              className="absolute right-0 z-10 p-2 rounded-full bg-neutral-900/90 text-white border border-neutral-800 shadow-md hover:bg-neutral-800 backdrop-blur-md -mr-3 md:-mr-4 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            <span className="text-sm font-medium">Fetching Latest Products...</span>
          </div>
        ) : displayedProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 text-neutral-400 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            No products found for this category.
          </div>
        ) : (
          /* Product Grid (Max 8 Items) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => {
              const mainImg =
                product.images?.[0]?.src ||
                "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=600&auto=format&fit=crop";

              const primaryCategory =
                product.categories?.[0]?.name || "ELV Product";

              return (
                <a
                  key={product.id}
                  href={`/shop/product/${product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col rounded-2xl bg-neutral-900 border border-neutral-800/80 overflow-hidden transition-all duration-300 hover:bg-neutral-800 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-950/20"
                >
                  {/* Product Image Wrapper */}
                  <div className="relative aspect-square w-full bg-neutral-950 overflow-hidden">
                    <img
                      src={mainImg}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

                    {/* "View Product" Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-white/20 text-white text-xs font-semibold shadow-lg backdrop-blur-md hover:bg-red-600 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-red-500 group-hover:text-white transition-colors" />
                        View Product
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="relative p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-red-400/90 uppercase tracking-wider">
                        {primaryCategory}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-red-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-200">
                        Enquire Now
                      </span>

                      <div className="flex items-center space-x-1 text-xs font-semibold text-neutral-400 group-hover:text-red-500 transition-all duration-300">
                        <div className="p-1.5 rounded-full bg-neutral-800 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}