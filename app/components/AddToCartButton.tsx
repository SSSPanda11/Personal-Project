"use client";

import { useCart } from '../context/CartContext';
import { Product } from '../data/products';

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50"
        >
            Add to Cart
        </button>
    );
}
