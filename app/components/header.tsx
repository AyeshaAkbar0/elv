'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, Search, X, ChevronRight, Layers, Tag, Package } from "lucide-react";
import GetData from "../api/backend";

export function UAEFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 600"
      className={`inline-block rounded-sm overflow-hidden shadow-sm ${className}`}
    >
      <rect width="1200" height="200" fill="#00732f" />
      <rect y="200" width="1200" height="200" fill="#ffffff" />
      <rect y="400" width="1200" height="200" fill="#000000" />
      <rect width="300" height="600" fill="#ff0000" />
    </svg>
  );
} 

interface CategoryItem {
  id?: number;
  title: string;
  link: string;
  parent?: number;
  children?: CategoryItem[];
}

interface ProductImage {
  src?: string;
  url?: string;
}

interface ProductItem {
  id: number;
  name?: string;
  title?: string;
  slug?: string;
  description?: string;
  short_description?: string;
  images?: ProductImage[];
  image?: string;
}

const FALLBACK_CATEGORIES: CategoryItem[] = [
  {
    id: 1,
    title: "Access Control & Time Attendance",
    link: "/shop?category=access-control-time-attendance",
    parent: 0,
    children: [
      { title: "Biometric Readers", link: "/shop?category=biometric-readers" },
      { title: "RFID Card Readers", link: "/shop?category=rfid-card-readers" },
      { title: "Time Attendance Terminals", link: "/shop?category=time-attendance" }
    ]
  },
  {
    id: 2,
    title: "Surveillance & CCTV",
    link: "/shop?category=surveillance-cctv",
    parent: 0,
    children: [
      { title: "IP & PTZ Surveillance Cameras", link: "/shop?category=ip-ptz-surveillance-cameras" },
      { title: "Network Video Recorders (NVR)", link: "/shop?category=network-video-recorders-nvr" },
      { title: "Wireless & WiFi CCTV", link: "/shop?category=wireless-wifi-cctv" }
    ]
  },
  {
    id: 3,
    title: "Security & Barriers",
    link: "/shop?category=security-barriers",
    parent: 0,
    children: [
      { title: "Gate Barrier Systems", link: "/shop?category=gate-barrier-systems" },
      { title: "Video & Audio Intercom", link: "/shop?category=video-audio-intercom" }
    ]
  },
  {
    id: 4,
    title: "Networking & Infrastructure",
    link: "/shop?category=networking-infrastructure",
    parent: 0,
    children: [
      { title: "PoE Switches & Networking", link: "/shop?category=poe-switches-networking" },
      { title: "Fibre Optic Solutions", link: "/shop?category=fibre-optic-solutions" },
      { title: "Server Racks & Cabinets", link: "/shop?category=server-racks-cabinets" }
    ]
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<number | null>(null);
  const [productCategories, setProductCategories] = useState<CategoryItem[]>(FALLBACK_CATEGORIES);
  const [rawProducts, setRawProducts] = useState<ProductItem[]>([]);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const searchButtonRef = useRef<HTMLButtonElement>(null);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // FETCH CATEGORIES AND PRODUCTS DYNAMICALLY
  useEffect(() => {
    async function fetchData() {
      try {
        const [productdata, catdata] = await GetData();
        
        // Process Raw Products
        if (Array.isArray(productdata)) {
          setRawProducts(productdata);
        }

        // Process Categories
        const categories = catdata;
        if (Array.isArray(categories) && categories.length > 0) {
          const categoryMap = new Map();
          
          categories.forEach((cat: any) => {
            categoryMap.set(cat.id, {
              id: cat.id,
              title: cat.name,
              link: `/shop/product-category/${cat.slug}`,
              parent: cat.parent || 0,
              children: []
            });
          });

          const rootCategories: CategoryItem[] = [];
          categoryMap.forEach((cat) => {
            if (cat.parent === 0) {
              rootCategories.push(cat);
            } else {
              const parentCat = categoryMap.get(cat.parent);
              if (parentCat) {
                parentCat.children.push(cat);
              } else {
                rootCategories.push(cat);
              }
            }
          });

          if (rootCategories.length > 0) {
            setProductCategories(rootCategories);
          }
        }
      } catch (error) {
        // Fall back to static hierarchical list if endpoint fails
      }
    }

    fetchData();
  }, []);

  // CLOSE SEARCH ON CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  // Comprehensive multi-entity search algorithm
  const searchResults = searchQuery.trim() === "" ? [] : (() => {
    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    // 1. Search in Categories & Subcategories
    productCategories.forEach((parent) => {
      if (parent.title.toLowerCase().includes(query)) {
        results.push({ type: 'Category', title: parent.title, link: parent.link });
      }
      if (parent.children) {
        parent.children.forEach((sub) => {
          if (sub.title.toLowerCase().includes(query)) {
            results.push({ 
              type: 'Subcategory', 
              title: sub.title, 
              link: sub.link, 
              parentTitle: parent.title 
            });
          }
        });
      }
    });

    // 2. Search in Products
    rawProducts.forEach((prod) => {
      const name = prod.name || prod.title || "";
      const desc = prod.description || prod.short_description || "";
      const cleanDesc = desc.replace(/<[^>]*>?/gm, '');

      const imageUrl = prod.images?.[0]?.src || prod.images?.[0]?.url || prod.image || null;

      if (name.toLowerCase().includes(query) || cleanDesc.toLowerCase().includes(query)) {
        const isDescMatch = !name.toLowerCase().includes(query) && cleanDesc.toLowerCase().includes(query);
        results.push({
          type: 'Product',
          title: name,
          link: `/shop/product/${prod.slug || prod.id}`,
          image: imageUrl,
          snippet: isDescMatch ? cleanDesc.slice(0, 70) + "..." : null
        });
      }
    });

    return results;
  })();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const Megamenu = [
    { title: "Home", link: "/", submenu: [] },
    { title: "About Us", link: "/about", submenu: [] },
    { title: "Our Products", link: "/shop", icon: "chevron-down", submenu: productCategories },
    { title: "Contact", link: "/contact-us", submenu: [] },
  ];

  const activeParent = productCategories[activeCategoryIndex] || productCategories[0];

  return (
    <header className="w-full bg-neutral-950/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-neutral-800/80 shadow-2xl flex flex-col">
      {/* Top Announcement Bar */}
      <div className="w-full py-1.5 bg-neutral-900/90 text-red-500 text-center text-xs font-semibold max-md:hidden border-b border-neutral-800/80 tracking-wide flex items-center justify-center space-x-2 order-1">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span>Future-Ready Low-Current Systems & Integrated ELV Solutions</span>
      </div>

      {/* Main Navbar - Matched max-w-7xl and px-4 sm:px-6 lg:px-12 with Footer */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3.5 order-2 w-full">
        {/* Mobile Hamburger Trigger */}
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="md:hidden text-neutral-300 hover:text-red-500 p-2 rounded-lg bg-neutral-900 border border-neutral-800 transition-colors focus:outline-none"
          aria-label="Open Menu"
        >
          <Menu size={20} />
        </button>

        {/* Brand Logo */}
        <a href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90 brightness-0 invert shrink-0">
          <img src="/afra-logo-transparent.webp" alt="Afra Security Logo" className="h-9 w-auto object-contain" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-neutral-900/60 border border-neutral-800/80 rounded-full px-6 py-1.5 backdrop-blur-md shadow-inner z-50">
          <ul className="flex items-center space-x-1 text-sm font-medium">
            {Megamenu.map((item, index) => (
              <li key={index} className="relative group py-1">
                <a 
                  href={item.link} 
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-neutral-300 group-hover:text-white group-hover:bg-neutral-800/80 transition-all duration-200"
                >
                  <span className="tracking-wide">{item.title}</span>
                  {item.icon === "chevron-down" && (
                    <ChevronDown size={14} className="text-neutral-400 group-hover:text-red-500 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </a>

                {/* MEGA MENU DROPDOWN */}
                {item.submenu.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[85vw] max-w-7xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-neutral-900/95 border border-neutral-800/90 shadow-2xl rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden grid grid-cols-12 gap-6">
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />
                      
                      {/* Left Side: Parent Categories */}
                      <div className="col-span-7">
                        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 px-2 flex items-center gap-1.5">
                          <Layers size={14} className="text-red-500" />
                          Product Categories
                        </div>
                        <div className="grid grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
                          {item.submenu.map((parentCat, pIndex) => (
                            <a
                              key={pIndex}
                              href={parentCat.link}
                              onMouseEnter={() => setActiveCategoryIndex(pIndex)}
                              className={`group/parent flex items-center justify-between p-3 rounded-xl text-xs font-medium transition-all border ${
                                activeCategoryIndex === pIndex
                                  ? 'bg-neutral-800/90 text-white border-red-500/50 shadow-md'
                                  : 'bg-neutral-950/40 text-neutral-300 border-neutral-800/60 hover:bg-neutral-800/50 hover:text-white'
                              }`}
                            >
                              <span className="line-clamp-2">{parentCat.title}</span>
                              <ChevronRight size={14} className={`shrink-0 transition-transform ${activeCategoryIndex === pIndex ? 'text-red-500 translate-x-0.5' : 'text-neutral-600 group-hover/parent:text-neutral-400'}`} />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Subcategories */}
                      <div className="col-span-5 bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
                            <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Subcategories</span>
                            <a href={activeParent?.link} className="text-[11px] text-neutral-400 hover:text-white underline transition-colors">
                              View All →
                            </a>
                          </div>
                          <h4 className="text-sm font-semibold text-white mb-3">{activeParent?.title}</h4>
                          
                          {activeParent?.children && activeParent.children.length > 0 ? (
                            <ul className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                              {activeParent.children.map((sub, sIndex) => (
                                <li key={sIndex}>
                                  <a
                                    href={sub.link}
                                    className="group/sub flex items-center justify-between px-3 py-2 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-xl transition-all"
                                  >
                                    <span>{sub.title}</span>
                                    <ChevronRight size={12} className="text-neutral-500 group-hover/sub:text-red-500 group-hover/sub:translate-x-0.5 transition-transform" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-neutral-500 italic py-4">No subcategories available.</p>
                          )}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex items-center justify-between">
                          <span>Need custom security solution?</span>
                          <a href="/contact-us" className="text-red-500 font-semibold hover:underline">Contact Expert</a>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Utility Bar */}
        <div className="flex items-center space-x-3 shrink-0">
          <button 
            ref={searchButtonRef}
            onClick={() => setIsSearchOpen(!isSearchOpen)} 
            aria-label="Search" 
            className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-red-500 hover:border-red-500/40 transition-all"
          >
            <Search size={18} />
          </button>
          
          <div className="flex items-center pl-2 border-l border-neutral-800">
            <UAEFlag className="w-8 h-5 rounded shadow-sm" />
          </div>
        </div>
      </nav>

      {/* Expandable Search Input Bar */}
      {isSearchOpen && (
        <div ref={searchRef} className="border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-xl py-4 px-4 transition-all relative order-3">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center shadow-2xl">
              <div className="relative w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, descriptions, categories, subcategories..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-l-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-neutral-500"
                  autoFocus
                />
              </div>
              <button 
                type="submit" 
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-r-xl transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            {/* Instant Suggestions Dropdown */}
            {searchQuery.trim() !== "" && (
              <div className="absolute left-4 right-4 sm:left-auto sm:right-auto sm:w-[calc(100%-2rem)] max-w-3xl mt-2 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                <div className="p-3 bg-neutral-900/80 border-b border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Search Results</span>
                  <span className="text-red-500">{searchResults.length} matches</span>
                </div>
                
                {searchResults.length > 0 ? (
                  <ul className="max-h-80 overflow-y-auto p-2 space-y-1">
                    {searchResults.map((res, index) => (
                      <li key={index}>
                        <a
                          href={res.link}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-900 transition-colors group"
                        >
                          <div className="flex items-center space-x-3">
                            {res.type === 'Product' ? (
                              res.image ? (
                                <img
                                  src={res.image}
                                  alt={res.title}
                                  className="w-10 h-10 object-cover rounded-lg border border-neutral-800 bg-neutral-900 shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0 text-red-500">
                                  <Package size={20} />
                                </div>
                              )
                            ) : (
                              <div className="w-10 h-10 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0 text-neutral-400">
                                <Tag size={18} />
                              </div>
                            )}

                            <div>
                              <p className="text-xs text-white font-medium group-hover:text-red-400 transition-colors line-clamp-1">
                                {res.title}
                              </p>
                              {res.parentTitle && (
                                <p className="text-[10px] text-neutral-500">
                                  in <span className="text-neutral-400">{res.parentTitle}</span>
                                </p>
                              )}
                              {res.snippet && (
                                <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                                  {res.snippet}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 border ml-2 ${
                            res.type === 'Product' 
                              ? 'bg-red-500/10 text-red-400 border-red-500/30' 
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                          }`}>
                            {res.type}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-xs text-neutral-400 mb-2">
                      No exact matches found for &quot;<span className="text-white">{searchQuery}</span>&quot;
                    </p>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="inline-block text-xs font-semibold text-red-500 hover:underline"
                    >
                      Search all catalog items for &quot;{searchQuery}&quot; →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex ">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          
          <div className="relative w-4/5 max-w-sm h-screen bg-neutral-950 text-white shadow-2xl p-6 flex flex-col z-50 overflow-y-auto border-r border-neutral-800">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <img src="/afra-logo-transparent.webp" alt="Afra Logo" className="h-8 w-auto object-contain" />
              <button 
                onClick={() => setIsMenuOpen(false)} 
                aria-label="Close menu" 
                className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="py-6 space-y-3">
              {Megamenu.map((item, index) => (
                <li key={index} className="border-b border-neutral-900 pb-3">
                  <div className="flex items-center justify-between">
                    <a 
                      href={item.link} 
                      onClick={() => item.submenu.length === 0 && setIsMenuOpen(false)}
                      className="block text-sm font-semibold text-neutral-200 hover:text-red-500 transition-colors"
                    >
                      {item.title}
                    </a>
                    {item.submenu.length > 0 && (
                      <button 
                        onClick={() => setOpenMobileSubmenu(openMobileSubmenu === index ? null : index)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openMobileSubmenu === index ? 'rotate-180 text-red-500' : ''}`} />
                      </button>
                    )}
                  </div>
                  {item.submenu.length > 0 && openMobileSubmenu === index && (
                    <div className="mt-3 space-y-3 pl-2 border-l border-neutral-800 max-h-72 overflow-y-auto">
                      {item.submenu.map((parentCat, pIdx) => (
                        <div key={pIdx} className="space-y-1">
                          <a
                            href={parentCat.link}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-xs font-bold text-red-400 hover:underline"
                          >
                            {parentCat.title}
                          </a>
                          {parentCat.children && parentCat.children.length > 0 && (
                            <ul className="pl-3 space-y-1 border-l border-neutral-800/50">
                              {parentCat.children.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <a
                                    href={sub.link}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-1 text-[11px] text-neutral-400 hover:text-white"
                                  >
                                    {sub.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}