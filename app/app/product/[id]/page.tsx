import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import AddToCartButton from '@/components/AddToCartButton';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Product Image */}
                <div className="lg:max-w-lg lg:self-end">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover object-center"
                            priority
                        />
                    </div>
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
                    </section>
                </div>
            </div>
        </div>
    );
}
