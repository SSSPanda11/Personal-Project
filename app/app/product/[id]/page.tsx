import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { fetchProductsFromSheets } from '@/lib/inventory';
import AddToCartButton from '@/components/AddToCartButton';
import ImageGallery from '@/components/ImageGallery';
import RelatedProducts from '@/components/RelatedProducts';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch dynamic products
    const dynamicProducts = await fetchProductsFromSheets();
    const allProducts = dynamicProducts && dynamicProducts.length > 0 ? dynamicProducts : PRODUCTS;

    const product = allProducts.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const productImages = product.images && product.images.length > 0
        ? product.images
        : [product.image];

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Product Image Gallery */}
                <div className="lg:max-w-lg lg:self-end">
                    <ImageGallery images={productImages} name={product.name} />
                </div>

                {/* Product Info */}
                <div className="mt-10 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:self-center">
                    <div className="mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        >
                            <svg className="mr-2 -ml-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Back to Products
                        </Link>
                    </div>

                    <div className="mt-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                    </div>

                    <section aria-labelledby="information-heading" className="mt-4">
                        <h2 id="information-heading" className="sr-only">
                            Product information
                        </h2>

                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">৳{product.price.toLocaleString()}</p>
                        </div>

                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">{product.description}</p>
                        </div>
                    </section>

                    <section aria-labelledby="options-heading" className="mt-10">
                        <AddToCartButton product={product} />

                        <div className="mt-4">
                            <a
                                href={`https://wa.me/8801700000000?text=${encodeURIComponent(`Hi, I want to buy: ${product.name}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.135.882 3.322.882 3.18 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.767-5.771v.006zm9.07 13.343a6.475 6.475 0 01-3.33 4.92c-.22.12-.48.2-.74.24a7.02 7.02 0 01-1.35.13c-1.39 0-2.8-.39-4.05-1.12l-5.6 1.47 1.49-5.46a7.41 7.41 0 01-1.15-4.07c0-4.08 3.32-7.4 7.4-7.4s7.4 3.32 7.4 7.4c0 1.57-.48 3.03-1.31 4.25l1.24.64zm-14.9-18.06a8.55 8.55 0 00-6.15 2.51 8.54 8.54 0 00-2.5 6.14c0 1.83.58 3.53 1.57 4.96l-1.67 6.1 6.27-1.64a8.53 8.53 0 004.48 1.27 8.56 8.56 0 008.56-8.56 8.55 8.55 0 00-8.56-8.56l-.01-.001z" />
                                </svg>
                                Order on WhatsApp
                            </a>
                            <p className="mt-2 text-center text-xs text-gray-500">
                                Need help? Chat with us directly on WhatsApp.
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Related Products Section (Full Width) */}
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pb-16">
                <RelatedProducts currentProductId={product.id} category={product.category} allProducts={allProducts} />
            </div>
        </div>
    );
}
