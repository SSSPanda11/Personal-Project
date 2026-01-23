import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Hero from "../components/Hero";
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "ShopBD | Featured Products",
  description: "Browse our curated selection of premium products in Bangladesh.",
};

export default async function Home(props: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query?.toLowerCase() || '';
  const category = searchParams.category;

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    const matchesCategory = category ? product.category === category : true;
    return matchesQuery && matchesCategory;
  });

  const isFiltering = query || category;

  return (
    <div className="bg-white">
      {/* Show Hero only when not filtering */}
      {!isFiltering && <Hero />}

      <div id="products" className="bg-gray-50 pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {query ? `Results for "${searchParams.query}"` : 'Marketplace'}
            </h2>
            {/* Category Filter */}
            <Suspense fallback={<div className="h-10 w-full bg-gray-100 animate-pulse rounded-full" />}>
              <CategoryFilter />
            </Suspense>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-20 text-center">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
