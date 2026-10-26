// "use client";

// import { useState, useMemo, useEffect } from "react";
// import {
//   SlidersHorizontal,
//   ChevronDown,
//   ChevronRight,
//   ChevronLeft,
//   Search,
//   Grid3X3,
//   List,
//   X,
//   Eye,
//   Filter
// } from "lucide-react";

// // --- Types ---
// export interface Product {
//   id: string | number;
//   name: string;
//   slug: string;
//   subtitle?: string;
//   tag?: string;
//   price?: number;
//   image?: string;
//   rating?: number;
//   reviewsCount?: number;
//   subCategorySlug?: string;
//   inStock?: boolean;
//   description?: string;
//   date?: string;
// }

// export interface SubCategory {
//   id: string | number;
//   name: string;
//   slug: string;
//   count?: number;
// }

// export interface CategoryData {
//   name: string;
//   slug: string;
//   description?: string;
//   subCategories?: SubCategory[];
//   products: Product[];
// }

// interface CategoryPageProps {
//   categoryData: CategoryData;
//   slug: string;
// }

// interface FilterSidebarProps {
//   searchQuery: string;
//   setSearchQuery: (val: string) => void;
//   subCategories: SubCategory[];
//   selectedSubCategory: string;
//   setSelectedSubCategory: (val: string) => void;
//   onlyInStock: boolean;
//   setOnlyInStock: (val: boolean) => void;
//   productsCount: number;
//   sortBy: string;
//   setSortBy: (val: string) => void;
// }

// const ITEMS_PER_PAGE = 9; // Adjust items per page as needed

// // --- Filter Sidebar Component ---
// function FilterSidebar({
//   searchQuery,
//   setSearchQuery,
//   subCategories,
//   selectedSubCategory,
//   setSelectedSubCategory,
//   onlyInStock,
//   setOnlyInStock,
//   productsCount,
//   sortBy,
//   setSortBy,
// }: FilterSidebarProps) {
//   return (
//     <div className="space-y-8">
//       {/* Search Input */}
//       <div className="space-y-2">
//         <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
//           Search Category
//         </label>
//         <div className="relative">
//           <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search products..."
//             className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
//           />
//         </div>
//       </div>

//       {/* Order By / Sorting Filter */}
//       <div className="space-y-2">
//         <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
//           Order By
//         </label>
//         <div className="relative">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="w-full appearance-none bg-neutral-900 border border-neutral-800 text-xs text-white rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
//           >
//             <option value="featured">Featured</option>
//             <option value="Latest">Latest</option>
//             <option value="name-desc">Name: Z-A</option>
//             <option value="name-asc">Name: A-Z</option>
//             <option value="price-desc">Price: High to Low</option>
//             <option value="price-asc">Price: Low to High</option>
//           </select>
//           <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
//         </div>
//       </div>

//       {/* Subcategories List */}
//       {subCategories.length > 0 && (
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
//               Subcategories
//             </span>
//             {selectedSubCategory !== "all" && (
//               <button
//                 onClick={() => setSelectedSubCategory("all")}
//                 className="text-xs text-red-500 hover:underline"
//               >
//                 Clear
//               </button>
//             )}
//           </div>

//           <div className="space-y-1">
//             <button
//               onClick={() => setSelectedSubCategory("all")}
//               className={`w-full flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl transition-all ${
//                 selectedSubCategory === "all"
//                   ? "bg-red-500/10 border border-red-500/30 text-white font-semibold"
//                   : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
//               }`}
//             >
//               <span>All Products</span>
//               <span className="text-neutral-500 text-[10px] bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
//                 {productsCount}
//               </span>
//             </button>

//             {subCategories.map((sub) => {
//               const isActive = selectedSubCategory === sub.slug;
//               return (
//                 <button
//                   key={sub.id}
//                   onClick={() => setSelectedSubCategory(sub.slug)}
//                   className={`w-full flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl transition-all ${
//                     isActive
//                       ? "bg-red-500/10 border border-red-500/30 text-white font-semibold"
//                       : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
//                   }`}
//                 >
//                   <span className="truncate pr-2">{sub.name}</span>
//                   {sub.count !== undefined && (
//                     <span className="text-neutral-500 text-[10px] bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800 shrink-0">
//                       {sub.count}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Availability Filter */}
//       <div className="space-y-3">
//         <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
//           Availability
//         </span>
//         <label className="flex items-center gap-3 cursor-pointer group text-xs text-neutral-300">
//           <input
//             type="checkbox"
//             checked={onlyInStock}
//             onChange={(e) => setOnlyInStock(e.target.checked)}
//             className="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-red-600 focus:ring-red-500 focus:ring-offset-neutral-950"
//           />
//           <span className="group-hover:text-white transition-colors">In Stock Only</span>
//         </label>
//       </div>
//     </div>
//   );
// }

// export default function CategoryPage({ categoryData, slug }: CategoryPageProps) {
//   const category = categoryData || { name: "Category", slug, products: [] };
//   const subCategories = category.subCategories || [];
//   const products = category.products || [];

//   // --- States ---
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
//   const [sortBy, setSortBy] = useState<string>("featured");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   // Reset to page 1 whenever filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedSubCategory, searchQuery, onlyInStock, sortBy]);

//   // --- Filter and Sort Logic ---
//   const filteredProducts = useMemo(() => {
//     let result = [...products];

//     // Subcategory Filter
//     if (selectedSubCategory !== "all") {
//       result = result.filter(
//         (p) => p.subCategorySlug === selectedSubCategory
//       );
//     }

//     // Stock Filter
//     if (onlyInStock) {
//       result = result.filter((p) => p.inStock !== false);
//     }

//     // Search Filter
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.subtitle?.toLowerCase().includes(q) ||
//           p.description?.toLowerCase().includes(q)
//       );
//     }

//     // Sorting
//     switch (sortBy) {
//       case "Latest":
//         result.sort((a, b) => {
//           const timeA = a.date ? new Date(a.date).getTime() : Number(a.id) || 0;
//           const timeB = b.date ? new Date(b.date).getTime() : Number(b.id) || 0;
//           return timeB - timeA;
//         });
//         break;
//       case "price-desc":
//         result.sort((a, b) => (b.price || 0) - (a.price || 0));
//         break;
//       case "price-asc":
//         result.sort((a, b) => (a.price || 0) - (b.price || 0));
//         break;
//       case "name-desc":
//         result.sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       case "name-asc":
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       default:
//         break;
//     }

//     return result;
//   }, [products, selectedSubCategory, onlyInStock, searchQuery, sortBy]);

//   // --- Pagination Logic ---
//   const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 300, behavior: "smooth" });
//   };

//   return (
//     <div className="w-full bg-neutral-950 text-white min-h-screen py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

//         {/* PAGE HEADER / HERO */}
//         <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-4 shadow-xl">
//           <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-500 font-semibold">
//             <span>Category</span>
//             <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
//             <span className="text-neutral-400">{category.name}</span>
//           </div>

//           <div className="space-y-2">
//             <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
//               {category.name}
//             </h1>
//             {category.description && (
//               <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
//                 {category.description}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* MAIN LAYOUT GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

//           {/* LEFT COLUMN: DESKTOP FILTERS */}
//           <aside className="hidden lg:block lg:col-span-3 border border-neutral-800 bg-neutral-900/40 rounded-3xl p-6 shadow-xl sticky top-35">
//             <div className="flex items-center gap-2 pb-6 border-b border-neutral-800 mb-6">
//               <SlidersHorizontal className="w-4 h-4 text-red-500" />
//               <h2 className="text-sm font-bold uppercase tracking-wider text-white">Filters</h2>
//             </div>
//             <FilterSidebar
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               subCategories={subCategories}
//               selectedSubCategory={selectedSubCategory}
//               setSelectedSubCategory={setSelectedSubCategory}
//               onlyInStock={onlyInStock}
//               setOnlyInStock={setOnlyInStock}
//               productsCount={products.length}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//             />
//           </aside>

//           {/* RIGHT COLUMN: CONTROLS & PRODUCT LIST */}
//           <main className="lg:col-span-9 space-y-6">

//             {/* TOP BAR: MOBILE FILTER TRIGGER & VIEW SWITCHER */}
//             <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              
//               <div className="flex items-center justify-between w-full sm:w-auto gap-4">
//                 <button
//                   onClick={() => setIsMobileFilterOpen(true)}
//                   className="lg:hidden flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold hover:border-neutral-700 transition-all"
//                 >
//                   <Filter className="w-4 h-4 text-red-500" />
//                   <span>Filters</span>
//                 </button>

//                 <p className="text-xs text-neutral-400">
//                   Showing{" "}
//                   <span className="text-white font-bold">
//                     {filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}
//                   </span>{" "}
//                   to{" "}
//                   <span className="text-white font-bold">
//                     {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
//                   </span>{" "}
//                   of <span className="text-white font-bold">{filteredProducts.length}</span> products
//                 </p>
//               </div>

//               {/* View Mode Switcher */}
//               <div className="hidden sm:flex border border-neutral-800 rounded-xl bg-neutral-950 p-1 gap-1">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-1.5 rounded-lg transition-colors ${
//                     viewMode === "grid" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
//                   }`}
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-1.5 rounded-lg transition-colors ${
//                     viewMode === "list" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* PRODUCT GRID / LIST */}
//             {filteredProducts.length === 0 ? (
//               <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-16 text-center space-y-4">
//                 <p className="text-neutral-400 text-sm">No products found matching your current filter selection.</p>
//                 <button
//                   onClick={() => {
//                     setSelectedSubCategory("all");
//                     setSearchQuery("");
//                     setOnlyInStock(false);
//                   }}
//                   className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all"
//                 >
//                   Reset All Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-8">
//                 <div
//                   className={
//                     viewMode === "grid"
//                       ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
//                       : "space-y-4"
//                   }
//                 >
//                   {paginatedProducts.map((p) => {
//                     const defaultImg =
//                       p.image ||
//                       "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1000";

//                     if (viewMode === "list") {
//                       return (
//                         <div
//                           key={p.id}
//                           className="border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 rounded-2xl p-4 transition-all duration-200 flex flex-col sm:flex-row gap-6 items-center group"
//                         >
//                           <div className="relative w-full sm:w-48 aspect-square rounded-xl overflow-hidden border border-neutral-800 shrink-0">
//                             <a href={`/shop/product/${p.slug}`}>
//                               <img
//                                 src={defaultImg}
//                                 alt={p.name}
//                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                               />
//                             </a>
//                             {p.tag && (
//                               <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-red-500 font-semibold bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-800">
//                                 {p.tag}
//                               </span>
//                             )}
//                           </div>

//                           <div className="flex-1 space-y-2">
//                             {p.subtitle && (
//                               <span className="text-[10px] uppercase tracking-widest text-red-500 font-semibold">
//                                 {p.subtitle}
//                               </span>
//                             )}
//                             <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">
//                               <a href={`/shop/product/${p.slug}`}>{p.name}</a>
//                             </h3>
//                             {p.description && (
//                               <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
//                                 {p.description}
//                               </p>
//                             )}
//                           </div>

//                           <div className="w-full sm:w-auto flex flex-col items-end gap-3 sm:border-l sm:border-neutral-800 sm:pl-6">
//                             <a
//                               href={`/shop/product/${p.slug}`}
//                               className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-600/10"
//                             >
//                               <Eye className="w-4 h-4" />
//                               <span>View Product</span>
//                             </a>
//                           </div>
//                         </div>
//                       );
//                     }

//                     // Grid View Card
//                     return (
//                       <div
//                         key={p.id}
//                         className="border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-200 flex flex-col h-full group shadow-xl"
//                       >
//                         {/* Image Frame */}
//                         <div className="relative aspect-square border-b border-neutral-800 overflow-hidden bg-neutral-900/25 shrink-0">
//                           <a href={`/shop/product/${p.slug}`}>
//                             <img
//                               src={defaultImg}
//                               alt={p.name}
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                             />
//                           </a>
//                           {p.tag && (
//                             <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-red-500 font-semibold bg-neutral-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
//                               {p.tag}
//                             </span>
//                           )}
//                         </div>

//                         {/* Content */}
//                         <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
//                           <div className="space-y-2">
//                             {p.subtitle && (
//                               <span className="text-[10px] uppercase tracking-widest text-red-500 font-semibold block">
//                                 {p.subtitle}
//                               </span>
//                             )}
//                             <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2">
//                               <a href={`/shop/product/${p.slug}`}>{p.name}</a>
//                             </h3>
//                           </div>

//                           {/* Action */}
//                           <div className="pt-2 border-neutral-800/80 flex items-center justify-end">
//                             <a
//                               href={`/shop/product/${p.slug}`}
//                               className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all text-xs flex items-center justify-center gap-2 shadow-md"
//                             >
//                               <Eye className="w-4 h-4" />
//                               <span>View Product</span>
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* PAGINATION CONTROLS */}
//                 {totalPages > 1 && (
//                   <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
//                     <p className="text-xs text-neutral-400">Page <span className="text-white font-semibold">{currentPage}</span> of <span className="text-white font-semibold">{totalPages}</span></p>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                         disabled={currentPage === 1}
//                         className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                         disabled={currentPage === totalPages}
//                         className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
//                       >
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </main>
//         </div>

//       </div>

//       {/* MOBILE FILTER MODAL */}
//       {isMobileFilterOpen && (
//         <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex justify-end">
//           <div className="bg-neutral-900 border-l border-neutral-800 w-full max-w-xs h-full p-6 space-y-6 overflow-y-auto">
//             <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
//               <div className="flex items-center gap-2">
//                 <SlidersHorizontal className="w-4 h-4 text-red-500" />
//                 <h3 className="text-sm font-bold uppercase tracking-wider text-white">Filters</h3>
//               </div>
//               <button
//                 onClick={() => setIsMobileFilterOpen(false)}
//                 className="text-neutral-400 hover:text-white"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <FilterSidebar
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               subCategories={subCategories}
//               selectedSubCategory={selectedSubCategory}
//               setSelectedSubCategory={setSelectedSubCategory}
//               onlyInStock={onlyInStock}
//               setOnlyInStock={setOnlyInStock}
//               productsCount={products.length}
//               sortBy={sortBy}
//               setSortBy={setSortBy}
//             />

//             <button
//               onClick={() => setIsMobileFilterOpen(false)}
//               className="w-full bg-red-600 text-white font-bold py-3 rounded-xl text-xs"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState, useMemo, useEffect } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Grid3X3,
  List,
  X,
  Eye,
  Filter
} from "lucide-react";

// --- Types ---
export interface Product {
  id: string | number;
  name: string;
  slug: string;
  subtitle?: string;
  tag?: string;
  price?: number;
  image?: string;
  rating?: number;
  reviewsCount?: number;
  subCategorySlug?: string;
  inStock?: boolean;
  status?: string; // e.g., 'publish', 'draft'
  isPublished?: boolean;
  description?: string;
  date?: string;
}

export interface SubCategory {
  id: string | number;
  name: string;
  slug: string;
  count?: number;
}

export interface CategoryData {
  name: string;
  slug: string;
  description?: string;
  subCategories?: SubCategory[];
  products: Product[];
}

interface CategoryPageProps {
  categoryData: CategoryData;
  slug: string;
}

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  subCategories: SubCategory[];
  selectedSubCategory: string;
  setSelectedSubCategory: (val: string) => void;
  onlyInStock: boolean;
  setOnlyInStock: (val: boolean) => void;
  productsCount: number;
  sortBy: string;
  setSortBy: (val: string) => void;
}

const ITEMS_PER_PAGE = 9;

// --- Filter Sidebar Component ---
function FilterSidebar({
  searchQuery,
  setSearchQuery,
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
  onlyInStock,
  setOnlyInStock,
  productsCount,
  sortBy,
  setSortBy,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
          Search Category
        </label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      {/* Order By / Sorting Filter */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
          Order By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none bg-neutral-900 border border-neutral-800 text-xs text-white rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="Latest">Latest</option>
            <option value="name-desc">Name: Z-A</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Subcategories List */}
      {subCategories.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Subcategories
            </span>
            {selectedSubCategory !== "all" && (
              <button
                onClick={() => setSelectedSubCategory("all")}
                className="text-xs text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setSelectedSubCategory("all")}
              className={`w-full flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl transition-all ${
                selectedSubCategory === "all"
                  ? "bg-red-500/10 border border-red-500/30 text-white font-semibold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
              }`}
            >
              <span>All Products</span>
              <span className="text-neutral-500 text-[10px] bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800">
                {productsCount}
              </span>
            </button>

            {subCategories.map((sub) => {
              const isActive = selectedSubCategory === sub.slug;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubCategory(sub.slug)}
                  className={`w-full flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-red-500/10 border border-red-500/30 text-white font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                  }`}
                >
                  <span className="truncate pr-2">{sub.name}</span>
                  {sub.count !== undefined && (
                    <span className="text-neutral-500 text-[10px] bg-neutral-900 px-2 py-0.5 rounded-full border border-neutral-800 shrink-0">
                      {sub.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Availability Filter */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
          Availability
        </span>
        <label className="flex items-center gap-3 cursor-pointer group text-xs text-neutral-300">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-800 bg-neutral-900 text-red-600 focus:ring-red-500 focus:ring-offset-neutral-950"
          />
          <span className="group-hover:text-white transition-colors">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}

export default function CategoryPage({ categoryData, slug }: CategoryPageProps) {
  const category = categoryData || { name: "Category", slug, products: [] };
  const subCategories = category.subCategories || [];
  const products = category.products || [];

  // --- States ---
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategory, searchQuery, onlyInStock, sortBy]);

  // --- Filter and Sort Logic ---
  const filteredProducts = useMemo(() => {
    // Automatically filter out drafts and only keep published items
    let result = products.filter((p) => {
      const rawStatus = p.status;
      if (rawStatus !== undefined && rawStatus !== null && rawStatus !== "") {
        // Must strictly equal 'publish' (case-insensitive)
        return String(rawStatus).trim().toLowerCase() === "publish";
      }
      if (p.isPublished !== undefined) {
        return p.isPublished === true;
      }
      return true; // Default to keep if no status fields are explicitly defined
    });

    // Subcategory Filter
    if (selectedSubCategory !== "all") {
      result = result.filter(
        (p) => p.subCategorySlug === selectedSubCategory
      );
    }

    // Stock Filter
    if (onlyInStock) {
      result = result.filter((p) => p.inStock !== false);
    }

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case "Latest":
        result.sort((a, b) => {
          const timeA = a.date ? new Date(a.date).getTime() : Number(a.id) || 0;
          const timeB = b.date ? new Date(b.date).getTime() : Number(b.id) || 0;
          return timeB - timeA;
        });
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedSubCategory, onlyInStock, searchQuery, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full bg-neutral-950 text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* PAGE HEADER / HERO */}
        <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-8 sm:p-12 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-500 font-semibold">
            <span>Category</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-400">{category.name}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: DESKTOP FILTERS */}
          <aside className="hidden lg:block lg:col-span-3 border border-neutral-800 bg-neutral-900/40 rounded-3xl p-6 shadow-xl sticky top-35">
            <div className="flex items-center gap-2 pb-6 border-b border-neutral-800 mb-6">
              <SlidersHorizontal className="w-4 h-4 text-red-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">Filters</h2>
            </div>
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              subCategories={subCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              onlyInStock={onlyInStock}
              setOnlyInStock={setOnlyInStock}
              productsCount={products.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </aside>

          {/* RIGHT COLUMN: CONTROLS & PRODUCT LIST */}
          <main className="lg:col-span-9 space-y-6">

            {/* TOP BAR: MOBILE FILTER TRIGGER & VIEW SWITCHER */}
            <div className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold hover:border-neutral-700 transition-all"
                >
                  <Filter className="w-4 h-4 text-red-500" />
                  <span>Filters</span>
                </button>

                <p className="text-xs text-neutral-400">
                  Showing{" "}
                  <span className="text-white font-bold">
                    {filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}
                  </span>{" "}
                  to{" "}
                  <span className="text-white font-bold">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                  </span>{" "}
                  of <span className="text-white font-bold">{filteredProducts.length}</span> products
                </p>
              </div>

              {/* View Mode Switcher */}
              <div className="hidden sm:flex border border-neutral-800 rounded-xl bg-neutral-950 p-1 gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PRODUCT GRID / LIST */}
            {filteredProducts.length === 0 ? (
              <div className="border border-neutral-800 bg-neutral-900/30 rounded-3xl p-16 text-center space-y-4">
                <p className="text-neutral-400 text-sm">No products found matching your current filter selection.</p>
                <button
                  onClick={() => {
                    setSelectedSubCategory("all");
                    setSearchQuery("");
                    setOnlyInStock(false);
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                      : "space-y-4"
                  }
                >
                  {paginatedProducts.map((p) => {
                    const defaultImg =
                      p.image ||
                      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1000";

                    if (viewMode === "list") {
                      return (
                        <div
                          key={p.id}
                          className="border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 rounded-2xl p-4 transition-all duration-200 flex flex-col sm:flex-row gap-6 items-center group"
                        >
                          <div className="relative w-full sm:w-48 aspect-square rounded-xl overflow-hidden border border-neutral-800 shrink-0">
                            <a href={`/shop/product/${p.slug}`}>
                              <img
                                src={defaultImg}
                                alt={p.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </a>
                            {p.tag && (
                              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-red-500 font-semibold bg-neutral-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-800">
                                {p.tag}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 space-y-2">
                            {p.subtitle && (
                              <span className="text-[10px] uppercase tracking-widest text-red-500 font-semibold">
                                {p.subtitle}
                              </span>
                            )}
                            <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">
                              <a href={`/shop/product/${p.slug}`}>{p.name}</a>
                            </h3>
                            {p.description && (
                              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                                {p.description}
                              </p>
                            )}
                          </div>

                          <div className="w-full sm:w-auto flex flex-col items-end gap-3 sm:border-l sm:border-neutral-800 sm:pl-6">
                            <a
                              href={`/shop/product/${p.slug}`}
                              className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-600/10"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Product</span>
                            </a>
                          </div>
                        </div>
                      );
                    }

                    // Grid View Card
                    return (
                      <div
                        key={p.id}
                        className="border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 rounded-3xl overflow-hidden transition-all duration-200 flex flex-col h-full group shadow-xl"
                      >
                        {/* Image Frame */}
                        <div className="relative aspect-square border-b border-neutral-800 overflow-hidden bg-neutral-900/25 shrink-0">
                          <a href={`/shop/product/${p.slug}`}>
                            <img
                              src={defaultImg}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </a>
                          {p.tag && (
                            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-red-500 font-semibold bg-neutral-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-800">
                              {p.tag}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            {p.subtitle && (
                              <span className="text-[10px] uppercase tracking-widest text-red-500 font-semibold block">
                                {p.subtitle}
                              </span>
                            )}
                            <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2">
                              <a href={`/shop/product/${p.slug}`}>{p.name}</a>
                            </h3>
                          </div>

                          {/* Action */}
                          <div className="pt-2 border-neutral-800/80 flex items-center justify-end">
                            <a
                              href={`/shop/product/${p.slug}`}
                              className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all text-xs flex items-center justify-center gap-2 shadow-md"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Product</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                    <p className="text-xs text-neutral-400">Page <span className="text-white font-semibold">{currentPage}</span> of <span className="text-white font-semibold">{totalPages}</span></p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-xs font-semibold text-white disabled:opacity-40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>

      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex justify-end">
          <div className="bg-neutral-900 border-l border-neutral-800 w-full max-w-xs h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Filters</h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              subCategories={subCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              onlyInStock={onlyInStock}
              setOnlyInStock={setOnlyInStock}
              productsCount={products.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-xl text-xs"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}