import { Suspense } from "react";
import CategoryPage, { CategoryData, Product, SubCategory } from "@/app/components/categorypage";
import GetData  from "@/app/api/backend";

async function getWooCategoryData(slug: string): Promise<CategoryData | null> {
  const [allProducts, allCategories] = await GetData();

  if (!Array.isArray(allCategories) || !Array.isArray(allProducts)) {
    return null;
  }

  const currentCategory = allCategories.find((cat: any) => cat.slug === slug);
  if (!currentCategory) {
    return null;
  }

  const subCategories: SubCategory[] = allCategories
    .filter((cat: any) => cat.parent === currentCategory.id)
    .map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.count,
    }));

  const validCategoryIds = new Set([
    currentCategory.id,
    ...subCategories.map((sub) => sub.id),
  ]);

  const matchedProducts = allProducts.filter((product: any) =>
    product.categories?.some((cat: any) => validCategoryIds.has(cat.id))
  );

  const mappedProducts: Product[] = matchedProducts.map((product: any) => {
    const productSubCat = product.categories?.find((cat: any) =>
      subCategories.some((sub) => sub.id === cat.id)
    );

    const cleanSubtitle = product.short_description
      ? product.short_description.replace(/<[^>]*>?/gm, "").substring(0, 60) + "..."
      : "";

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      subtitle: cleanSubtitle,
      tag: product.featured ? "Featured" : undefined,
      price: parseFloat(product.price) || 0,
      image: product.images?.[0]?.src || "",
      rating: parseFloat(product.average_rating) || 0,
      reviewsCount: product.rating_count || 0,
      subCategorySlug: productSubCat ? productSubCat.slug : undefined,
      inStock: product.stock_status === "instock",
      description: product.short_description || product.description || "",
      date: product.date_created,
    };
  });

  const cleanDescription = currentCategory.description
    ? currentCategory.description.replace(/<[^>]*>?/gm, "")
    : "";

  return {
    name: currentCategory.name,
    slug: currentCategory.slug,
    description: cleanDescription,
    subCategories: subCategories,
    products: mappedProducts,
  };
}

// --- Async Data Fetching Component ---
async function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryData = await getWooCategoryData(slug);

  if (!categoryData) {
    return (
      <div className="w-full bg-neutral-950 text-white min-h-screen py-32 text-center space-y-4">
        <h1 className="text-3xl font-extrabold">Category Not Found</h1>
        <p className="text-neutral-400 text-sm">
          The category you are looking for does not exist or contains no products.
        </p>
      </div>
    );
  }

  return <CategoryPage categoryData={categoryData} slug={slug} />;
}


// --- Main Page Component ---
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="w-full bg-neutral-950 text-white min-h-screen flex items-center justify-center">
          <p className="text-neutral-400 text-sm animate-pulse">Loading Product Categories...</p>
        </div>
      }>
      <CategoryContent params={params} />
    </Suspense>
  );
}