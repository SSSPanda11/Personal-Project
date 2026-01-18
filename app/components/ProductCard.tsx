"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-medium text-gray-900">
                    <Link href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex flex-1 items-end justify-between">
                    <p className="text-base font-bold text-gray-900">৳{product.price.toLocaleString()}</p>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigating to detail page if clicking button
                            addToCart(product);
                        }}
                        className="z-10 rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
