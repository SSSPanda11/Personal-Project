"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo / Brand */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="ShopBD Logo"
                        width={120}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Search Bar (Center) */}
                <div className="flex flex-1 items-center justify-center px-6 lg:px-12">
                    <SearchBar />
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4">
                    <Link href="/cart" className="group flex items-center p-2 text-gray-700 hover:text-black">
                        <span className="sr-only">Cart</span>
                        {/* Simple Cart SVG Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span className="ml-2 text-sm font-medium">{cartCount}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
