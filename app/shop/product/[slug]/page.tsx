import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductPage from "@/app/components/productpage";

// Local fallback database containing your products (including the requested slug)
const FALLBACK_PRODUCTS: Record<string, any> = {
  "the-afra-af-gbrf3-p-4-button-wireless-remote-control": {
    name: "AFRA AF-GBRF3-P 4-Button Wireless Remote Control",
    subtitle: "Automated Access & Security Control",
    slug: "the-afra-af-gbrf3-p-4-button-wireless-remote-control",
    tag: "Trusted Brand",
    rating: 4.9,
    reviewsCount: 45,
    description: "Manufactured for AFRA UK and inspired by Japanese innovation, the AFRA AF-GBRF3-P Remote Control delivers reliable wireless transmission for automated security and access control setups.",
    highlights: [
      "Operating on a 12V working voltage with low power consumption ($\le$12mA working current)",
      "Equipped with a secure Rolling Code HC301 chip operating at 433.92MHz",
      "Effective transmission range of 50 to 100 meters in open areas",
      "Backed by a 1-year warranty",
    ],
    colors: [
      { name: "Red Finish", hex: "#dc2626" },
      { name: "Matte Black", hex: "#0f0f0f" },
    ],
    lenses: ["Standard 4-Button"],
    images: [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1000",
    ],
    specifications: [
      { label: "Working Voltage", value: "12V" },
      { label: "Working Current", value: "$\le$ 12mA" },
      { label: "Frequency", value: "433.92MHz" },
      { label: "Chip Type", value: "Rolling Code HC301" },
      { label: "Transmission Distance", value: "50–100m (open area)" },
    ],
  },
  "4k-ai-bullet-camera": {
    name: "AFRA 4K AI Ultra Bullet Camera",
    subtitle: "Professional Perimeter Surveillance",
    slug: "4k-ai-bullet-camera",
    tag: "Enterprise Grade",
    rating: 4.9,
    reviewsCount: 84,
    description:
      "Engineered for high-security exterior environments, the AFRA 4K AI Bullet Camera features advanced human/vehicle classification, ultra-low light color night vision, and an IP67 weatherproof housing built to withstand extreme temperatures.",
    highlights: [
      "True 4K Ultra-HD resolution at 30fps with Sony Starvis sensor",
      "Deep-learning AI false-alarm reduction (Person/Vehicle classification)",
      "Starlight technology for full-color clarity in near-darkness",
      "IP67 weatherproof and IK10 vandal-resistant metallic enclosure",
    ],
    colors: [
      { name: "Matte Black", hex: "#0f0f0f" },
      { name: "Titanium White", hex: "#f1f5f9" },
    ],
    lenses: ["2.8mm (Wide 108°)", "4mm (Standard 84°)", "8mm (Long Range 40°)"],
    images: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=1000",
    ],
    specifications: [
      { label: "Resolution", value: "8 Megapixel (3840 × 2160)" },
      { label: "Night Vision", value: "Smart IR up to 50 Meters" },
      { label: "Power Supply", value: "PoE (802.3af) / 12V DC" },
      { label: "Storage Support", value: "MicroSD up to 256GB Built-in" },
    ],
  },
};

// Safe fetch function that tries your API, but falls back to local data if it fails
async function getProduct(slug: string) {
  console.log("Fetching product for slug:", slug); // <-- Add this

  try {
    const res = await fetch(`https://elv.afraeurope.co.uk/wp-json/wc/store/v1/products?slug=${slug}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      console.log("WooCommerce response:", data); // <-- Add this
      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }
    } else {
      console.log("WooCommerce fetch failed with status:", res.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  console.log("Falling back to local dictionary for slug:", slug);
  return FALLBACK_PRODUCTS[slug] || null;
}
// GUARANTEED to return at least one result, fixing the Next.js prerender error
export async function generateStaticParams() {
  try {
    const res = await fetch("https://elv.afraeurope.co.uk/wp-json/wc/store/v1/products");
    const contentType = res.headers.get("content-type");
    
    if (res.ok && contentType?.includes("application/json")) {
      const products = await res.json();
      if (Array.isArray(products) && products.length > 0) {
        return products.map((product: { slug: string }) => ({
          slug: product.slug,
        }));
      }
    }
  } catch (error) {
    // Fall back if external fetch fails
  }

  // Fallback list ensuring Next.js always finds valid static parameters
  return Object.keys(FALLBACK_PRODUCTS).map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ProductContent({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPage productData={product} slug={slug} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full bg-neutral-950 text-white min-h-screen flex items-center justify-center">
          <p className="text-neutral-400 text-sm animate-pulse">Loading product details...</p>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}