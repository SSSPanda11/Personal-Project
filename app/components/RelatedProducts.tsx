import Link from 'next/link';
import Image from 'next/image';
import { Product, PRODUCTS } from '../data/products';

interface RelatedProductsProps {
    currentProductId: string;
    category: string;
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
    // filter products by same category, excluding current one, limit to 4
    const relatedProducts = PRODUCTS
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 4);

    if (relatedProducts.length === 0) return null;

    return (
        <section aria-labelledby="related-heading" className="mt-16 border-t border-gray-200 pt-10">
            <h2 id="related-heading" className="text-xl font-bold tracking-tight text-gray-900">
                You might also like
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {relatedProducts.map((product) => (
                    <div key={product.id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <Link href={`/product/${product.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">৳{product.price.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
