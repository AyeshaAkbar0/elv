// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import GetData from "@/app/api/backend";
// import { 
//   Search, 
//   X, 
//   ArrowUpDown,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Loader2,
//   Eye,
//   SlidersHorizontal
// } from "lucide-react";

// const ITEMS_PER_PAGE = 9;

// export default function ShopClientView() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("popular");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

//   // Fetch data on mount
//   useEffect(() => {
//     async function loadStoreData() {
//       try {
//         const [fetchedProducts, fetchedCategories] = await GetData();
//         setProducts(fetchedProducts || []);
//         setCategories(fetchedCategories || []);
//       } catch (error) {
//         console.error("Failed to load store data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadStoreData();
//   }, []);

//   // Filter parent categories (parent === 0) and exclude "Uncategorized"
//   const parentCategories = categories.filter((cat: any) => cat.parent === 0 && cat.slug !== "uncategorized");
//   const subCategories = categories.filter((cat: any) => cat.parent !== 0);

//   // Filter and sort products
//   const filteredProducts = products.filter((product: any) => {
//     const searchWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
//     const matchesSearch = 
//       searchWords.length === 0 || 
//       searchWords.every(word => product.name?.toLowerCase().includes(word)) || 
//       product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.description?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesCategory = 
//       selectedCategory === "All" || 
//       product.categories?.some((cat: any) => cat.id?.toString() === selectedCategory || cat.parent?.toString() === selectedCategory);

//     return matchesSearch && matchesCategory;
//   }).sort((a: any, b: any) => {
//     if (sortBy === "latest") {
//       const dateA = new Date(a.created_at || 0).getTime();
//       const dateB = new Date(b.created_at || 0).getTime();
//       return dateB - dateA;
//     }
//     if (sortBy === "ascending") {
//       return (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
//     }
//     if (sortBy === "descending") {
//       return (b.name || "").toLowerCase().localeCompare((a.name || "").toLowerCase());
//     }
//     return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
//   });

//   // Pagination calculation
//   const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   // Selected Category Name Helper
//   const activeCategoryObj = categories.find((c) => c.id?.toString() === selectedCategory);

//   if (isLoading) {
//     return (
//       <div className="w-full bg-neutral-950 text-white min-h-screen flex flex-col items-center justify-center space-y-4">
//         <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
//         <p className="text-xs text-neutral-400">Loading Products ...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-neutral-950 text-white min-h-screen py-8 sm:py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

//         {/* HERO BANNER SECTION */}
//         <div className="bg-[linear-gradient(to_right,rgba(0,0,0,0.85),rgba(0,0,0,0.3)),url('/banner_shop_page.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
//           <div className="max-w-3xl space-y-2 sm:space-y-4">
//             <span className="text-[10px] sm:text-xs uppercase tracking-widest text-red-500 font-semibold">
//               All Products
//             </span>
//             <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
//               Technical Product & Hardware Supply
//             </h1>
//             <p className="text-neutral-300 text-xs sm:text-base leading-relaxed">
//               Browse low-current equipment directly from our catalog. Select any product to view technical specs.
//             </p>
//           </div>
//         </div>

//         {/* TOP SEARCH & MOBILE FILTER TOGGLE BAR */}
//         <div className="space-y-3">
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/60 p-3 sm:p-4 rounded-2xl border border-neutral-800 backdrop-blur-sm">
            
//             {/* Search Input */}
//             <div className="relative flex-1">
//               <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search store products..."
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-8 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* Controls Group: Mobile Filter Trigger + Sort Select */}
//             <div className="flex items-center gap-2">
//               {/* Mobile Filter Trigger Button (Visible on screens < lg) */}
//               <button
//                 onClick={() => setIsMobileFilterOpen(true)}
//                 className="flex lg:hidden items-center justify-center gap-2 px-4 py-2.5 bg-neutral-950 border border-neutral-800 hover:border-red-500/50 rounded-xl text-xs font-semibold text-neutral-200 transition-colors shrink-0"
//               >
//                 <SlidersHorizontal className="w-4 h-4 text-red-500" />
//                 <span>Filter</span>
//                 {selectedCategory !== "All" && (
//                   <span className="w-2 h-2 rounded-full bg-red-500" />
//                 )}
//               </button>

//               {/* Sort Selector */}
//               <div className="relative flex-1 sm:flex-none">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full sm:w-auto bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs font-semibold text-neutral-300 focus:outline-none focus:border-red-500 appearance-none cursor-pointer pr-8"
//                 >
//                   <option value="popular">Sort: Featured</option>
//                   <option value="latest">Sort: Latest</option>
//                   <option value="ascending">Sort: A to Z</option>
//                   <option value="descending">Sort: Z to A</option>
//                 </select>
//                 <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//               </div>
//             </div>

//           </div>

//           {/* ACTIVE FILTER CHIPS (Shows when a category or search query is applied) */}
//           {(selectedCategory !== "All" || searchQuery) && (
//             <div className="flex flex-wrap items-center gap-2 pt-1">
//               <span className="text-[11px] text-neutral-400 font-medium">Active Filters:</span>
              
//               {selectedCategory !== "All" && (
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
//                   {activeCategoryObj?.name || "Category"}
//                   <button onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}>
//                     <X className="w-3 h-3 hover:text-white" />
//                   </button>
//                 </span>
//               )}

//               {searchQuery && (
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium">
//                   &ldquo;{searchQuery}&rdquo;
//                   <button onClick={() => { setSearchQuery(""); setCurrentPage(1); }}>
//                     <X className="w-3 h-3 hover:text-white" />
//                   </button>
//                 </span>
//               )}

//               <button
//                 onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setCurrentPage(1); }}
//                 className="text-xs text-neutral-500 hover:text-red-400 underline ml-2"
//               >
//                 Clear all
//               </button>
//             </div>
//           )}
//         </div>

//         {/* MAIN LAYOUT: SIDEBAR + PRODUCTS GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* DESKTOP CATEGORIES SIDEBAR (Hidden on small screens) */}
//           <div className="hidden lg:block lg:col-span-3 space-y-6 bg-neutral-900/30 border border-neutral-800 p-6 rounded-3xl sticky top-32">
//             <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
//               <div className="flex items-center gap-2 font-bold text-white text-sm">
//                 <Filter className="w-4 h-4 text-red-500" />
//                 <span>Categories</span>
//               </div>
//               {selectedCategory !== "All" && (
//                 <button
//                   onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}
//                   className="text-xs text-red-500 hover:underline"
//                 >
//                   Reset
//                 </button>
//               )}
//             </div>

//             <CategoryList
//               parentCategories={parentCategories}
//               subCategories={subCategories}
//               selectedCategory={selectedCategory}
//               onSelectCategory={(catId) => {
//                 setSelectedCategory(catId);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>

//           {/* PRODUCTS GRID */}
//           <div className="lg:col-span-9 space-y-8">
//             {paginatedProducts.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
//                   {paginatedProducts.map((product: any) => {
//                     const primaryImage = product.images?.[0]?.src || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800";
//                     const categoryName = product.categories?.[0]?.name || "Hardware";

//                     return (
//                       <div key={product.id} className="border border-neutral-800 bg-neutral-900/30 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-neutral-700 transition-all group flex flex-col justify-between">
//                         <div className="space-y-3 sm:space-y-4">
//                           {/* Image Link */}
//                           <Link href={`/shop/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-neutral-950">
//                             <img 
//                               src={primaryImage} 
//                               alt={product.name} 
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
//                             />
//                             <span className="absolute top-3 left-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-white font-bold bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-800">
//                               {categoryName}
//                             </span>
//                           </Link>

//                           {/* Details */}
//                           <div className="p-4 sm:p-6 space-y-2">
//                             <Link href={`/shop/product/${product.slug}`} className="block">
//                               <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
//                                 {product.name}
//                               </h3>
//                             </Link>

//                             <div 
//                               className="text-xs text-neutral-400 leading-relaxed line-clamp-2"
//                               dangerouslySetInnerHTML={{ __html: product.short_description || product.description || "" }}
//                             />
//                           </div>
//                         </div>

//                         {/* View Product Button */}
//                         <div className="p-4 sm:p-6 pt-0 mt-2">
//                           <Link
//                             href={`/shop/product/${product.slug}`}
//                             className="w-full bg-red-600 text-white font-bold py-2.5 sm:py-3 rounded-xl hover:bg-red-700 transition-all text-xs flex items-center justify-center gap-2 shadow-md"
//                           >
//                             <Eye className="w-4 h-4" />
//                             View Product
//                           </Link>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* PAGINATION */}
//                 {totalPages > 1 && (
//                   <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
//                     <p className="text-xs text-neutral-400">
//                       Page <span className="text-white font-semibold">{currentPage}</span> of <span className="text-white font-semibold">{totalPages}</span>
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                         className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
//                       >
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="text-center py-16 sm:py-20 border border-neutral-800 bg-neutral-900/20 rounded-3xl space-y-4 px-4">
//                 <p className="text-base sm:text-lg font-semibold text-neutral-300">No products found matching your filter criteria.</p>
//                 <button
//                   onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setCurrentPage(1); }}
//                   className="bg-white text-neutral-950 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-neutral-200 transition-colors"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>

//       {/* MOBILE SLIDE-OVER FILTER DRAWER */}
//       {isMobileFilterOpen && (
//         <div className="fixed inset-0 z-50 flex lg:hidden">
//           {/* Backdrop */}
//           <div 
//             className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
//             onClick={() => setIsMobileFilterOpen(false)} 
//           />

//           {/* Drawer Sheet */}
//           <div className="relative w-[85%] max-w-xs h-full bg-neutral-950 text-white shadow-2xl p-6 flex flex-col z-10 overflow-y-auto border-r border-neutral-800">
//             <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
//               <div className="flex items-center gap-2 font-bold text-sm">
//                 <Filter className="w-4 h-4 text-red-500" />
//                 <span>Filter Categories</span>
//               </div>
//               <button
//                 onClick={() => setIsMobileFilterOpen(false)}
//                 className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="py-6 flex-grow">
//               <CategoryList
//                 parentCategories={parentCategories}
//                 subCategories={subCategories}
//                 selectedCategory={selectedCategory}
//                 onSelectCategory={(catId) => {
//                   setSelectedCategory(catId);
//                   setCurrentPage(1);
//                   setIsMobileFilterOpen(false);
//                 }}
//               />
//             </div>

//             <div className="pt-4 border-t border-neutral-800 space-y-2">
//               <button
//                 onClick={() => {
//                   setSelectedCategory("All");
//                   setCurrentPage(1);
//                   setIsMobileFilterOpen(false);
//                 }}
//                 className="w-full py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white"
//               >
//                 Reset Filter
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Reusable Category Navigation Component
// function CategoryList({
//   parentCategories,
//   subCategories,
//   selectedCategory,
//   onSelectCategory,
// }: {
//   parentCategories: any[];
//   subCategories: any[];
//   selectedCategory: string;
//   onSelectCategory: (catId: string) => void;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <button
//         onClick={() => onSelectCategory("All")}
//         className={`text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
//           selectedCategory === "All"
//             ? "bg-red-500/10 border border-red-500/30 text-white font-bold"
//             : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
//         }`}
//       >
//         All Products
//       </button>

//       {parentCategories.map((parent: any) => {
//         const children = subCategories.filter((sub: any) => sub.parent === parent.id);
//         const isParentSelected = selectedCategory === parent.id.toString();

//         return (
//           <div key={parent.id} className="space-y-1">
//             <button
//               onClick={() => onSelectCategory(parent.id.toString())}
//               className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
//                 isParentSelected
//                   ? "bg-red-500/10 border border-red-500/30 text-white font-bold"
//                   : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
//               }`}
//             >
//               <span className="line-clamp-1">{parent.name}</span>
//               <span className="text-[10px] text-neutral-500 shrink-0 ml-2">({parent.count})</span>
//             </button>

//             {children.length > 0 && (
//               <div className="pl-3 space-y-1 border-l border-neutral-800 ml-3 mt-1">
//                 {children.map((sub: any) => {
//                   const isSubSelected = selectedCategory === sub.id.toString();
//                   return (
//                     <button
//                       key={sub.id}
//                       onClick={() => onSelectCategory(sub.id.toString())}
//                       className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
//                         isSubSelected
//                           ? "text-red-400 font-bold bg-neutral-900/80"
//                           : "text-neutral-400 hover:text-white"
//                       }`}
//                     >
//                       <span className="line-clamp-1">{sub.name}</span>
//                       <span className="text-[9px] text-neutral-600 shrink-0 ml-1">({sub.count})</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GetData from "@/app/api/backend";
import { 
  Search, 
  X, 
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Eye,
  SlidersHorizontal
} from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function ShopClientView() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    async function loadStoreData() {
      try {
        const [fetchedProducts, fetchedCategories] = await GetData();
        setProducts(fetchedProducts || []);
        setCategories(fetchedCategories || []);
      } catch (error) {
        console.error("Failed to load store data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStoreData();
  }, []);

  // Filter parent categories (parent === 0) and exclude "Uncategorized"
  const parentCategories = categories.filter((cat: any) => cat.parent === 0 && cat.slug !== "uncategorized");
  const subCategories = categories.filter((cat: any) => cat.parent !== 0);

  // Filter and sort products (Only published products are included)
  const filteredProducts = products
    .filter((product: any) => {
      // 1. Check published status
      if (product.status && product.status !== "publish") return false;
      if (product.isPublished !== undefined && !product.isPublished) return false;

      // 2. Check search query match
      const searchWords = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const matchesSearch = 
        searchWords.length === 0 || 
        searchWords.every(word => product.name?.toLowerCase().includes(word)) || 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // 3. Check category match
      const matchesCategory = 
        selectedCategory === "All" || 
        product.categories?.some((cat: any) => cat.id?.toString() === selectedCategory || cat.parent?.toString() === selectedCategory);

      return matchesSearch && matchesCategory;
    })
    .sort((a: any, b: any) => {
      if (sortBy === "latest") {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      }
      if (sortBy === "ascending") {
        return (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
      }
      if (sortBy === "descending") {
        return (b.name || "").toLowerCase().localeCompare((a.name || "").toLowerCase());
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Selected Category Name Helper
  const activeCategoryObj = categories.find((c) => c.id?.toString() === selectedCategory);

  if (isLoading) {
    return (
      <div className="w-full bg-neutral-950 text-white min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-xs text-neutral-400">Loading Products ...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-950 text-white min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

        {/* HERO BANNER SECTION */}
        <div className="bg-[linear-gradient(to_right,rgba(0,0,0,0.85),rgba(0,0,0,0.3)),url('/banner_shop_page.jpeg')] bg-cover bg-center bg-no-repeat rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-2 sm:space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-red-500 font-semibold">
              All Products
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Technical Product & Hardware Supply
            </h1>
            <p className="text-neutral-300 text-xs sm:text-base leading-relaxed">
              Browse low-current equipment directly from our catalog. Select any product to view technical specs.
            </p>
          </div>
        </div>

        {/* TOP SEARCH & MOBILE FILTER TOGGLE BAR */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/60 p-3 sm:p-4 rounded-2xl border border-neutral-800 backdrop-blur-sm">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search store products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-8 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Controls Group: Mobile Filter Trigger + Sort Select */}
            <div className="flex items-center gap-2">
              {/* Mobile Filter Trigger Button (Visible on screens < lg) */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex lg:hidden items-center justify-center gap-2 px-4 py-2.5 bg-neutral-950 border border-neutral-800 hover:border-red-500/50 rounded-xl text-xs font-semibold text-neutral-200 transition-colors shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-red-500" />
                <span>Filter</span>
                {selectedCategory !== "All" && (
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>

              {/* Sort Selector */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-xs font-semibold text-neutral-300 focus:outline-none focus:border-red-500 appearance-none cursor-pointer pr-8"
                >
                  <option value="popular">Sort: Featured</option>
                  <option value="latest">Sort: Latest</option>
                  <option value="ascending">Sort: A to Z</option>
                  <option value="descending">Sort: Z to A</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* ACTIVE FILTER CHIPS */}
          {(selectedCategory !== "All" || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] text-neutral-400 font-medium">Active Filters:</span>
              
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
                  {activeCategoryObj?.name || "Category"}
                  <button onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => { setSearchQuery(""); setCurrentPage(1); }}>
                    <X className="w-3 h-3 hover:text-white" />
                  </button>
                </span>
              )}

              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setCurrentPage(1); }}
                className="text-xs text-neutral-500 hover:text-red-400 underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* MAIN LAYOUT: SIDEBAR + PRODUCTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP CATEGORIES SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 bg-neutral-900/30 border border-neutral-800 p-6 rounded-3xl sticky top-32">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Filter className="w-4 h-4 text-red-500" />
                <span>Categories</span>
              </div>
              {selectedCategory !== "All" && (
                <button
                  onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <CategoryList
              parentCategories={parentCategories}
              subCategories={subCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-9 space-y-8">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map((product: any) => {
                    const primaryImage = product.images?.[0]?.src || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800";
                    const categoryName = product.categories?.[0]?.name || "Hardware";

                    return (
                      <div key={product.id} className="border border-neutral-800 bg-neutral-900/30 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-neutral-700 transition-all group flex flex-col justify-between">
                        <div className="space-y-3 sm:space-y-4">
                          {/* Image Link */}
                          <Link href={`/shop/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-neutral-950">
                            <img 
                              src={primaryImage} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <span className="absolute top-3 left-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-white font-bold bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-800">
                              {categoryName}
                            </span>
                          </Link>

                          {/* Details */}
                          <div className="p-4 sm:p-6 space-y-2">
                            <Link href={`/shop/product/${product.slug}`} className="block">
                              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                                {product.name}
                              </h3>
                            </Link>

                            <div 
                              className="text-xs text-neutral-400 leading-relaxed line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: product.short_description || product.description || "" }}
                            />
                          </div>
                        </div>

                        {/* View Product Button */}
                        <div className="p-4 sm:p-6 pt-0 mt-2">
                          <Link
                            href={`/shop/product/${product.slug}`}
                            className="w-full bg-red-600 text-white font-bold py-2.5 sm:py-3 rounded-xl hover:bg-red-700 transition-all text-xs flex items-center justify-center gap-2 shadow-md"
                          >
                            <Eye className="w-4 h-4" />
                            View Product
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                    <p className="text-xs text-neutral-400">
                      Page <span className="text-white font-semibold">{currentPage}</span> of <span className="text-white font-semibold">{totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 sm:py-20 border border-neutral-800 bg-neutral-900/20 rounded-3xl space-y-4 px-4">
                <p className="text-base sm:text-lg font-semibold text-neutral-300">No products found matching your filter criteria.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setCurrentPage(1); }}
                  className="bg-white text-neutral-950 text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MOBILE SLIDE-OVER FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileFilterOpen(false)} 
          />

          {/* Drawer Sheet */}
          <div className="relative w-[85%] max-w-xs h-full bg-neutral-950 text-white shadow-2xl p-6 flex flex-col z-10 overflow-y-auto border-r border-neutral-800">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Filter className="w-4 h-4 text-red-500" />
                <span>Filter Categories</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 flex-grow">
              <CategoryList
                parentCategories={parentCategories}
                subCategories={subCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={(catId) => {
                  setSelectedCategory(catId);
                  setCurrentPage(1);
                  setIsMobileFilterOpen(false);
                }}
              />
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setCurrentPage(1);
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Category Navigation Component
function CategoryList({
  parentCategories,
  subCategories,
  selectedCategory,
  onSelectCategory,
}: {
  parentCategories: any[];
  subCategories: any[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <button
        onClick={() => onSelectCategory("All")}
        className={`text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
          selectedCategory === "All"
            ? "bg-red-500/10 border border-red-500/30 text-white font-bold"
            : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
        }`}
      >
        All Products
      </button>

      {parentCategories.map((parent: any) => {
        const children = subCategories.filter((sub: any) => sub.parent === parent.id);
        const isParentSelected = selectedCategory === parent.id.toString();

        return (
          <div key={parent.id} className="space-y-1">
            <button
              onClick={() => onSelectCategory(parent.id.toString())}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                isParentSelected
                  ? "bg-red-500/10 border border-red-500/30 text-white font-bold"
                  : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <span className="line-clamp-1">{parent.name}</span>
              <span className="text-[10px] text-neutral-500 shrink-0 ml-2">({parent.count})</span>
            </button>

            {children.length > 0 && (
              <div className="pl-3 space-y-1 border-l border-neutral-800 ml-3 mt-1">
                {children.map((sub: any) => {
                  const isSubSelected = selectedCategory === sub.id.toString();
                  return (
                    <button
                      key={sub.id}
                      onClick={() => onSelectCategory(sub.id.toString())}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-center justify-between ${
                        isSubSelected
                          ? "text-red-400 font-bold bg-neutral-900/80"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span className="line-clamp-1">{sub.name}</span>
                      <span className="text-[9px] text-neutral-600 shrink-0 ml-1">({sub.count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}