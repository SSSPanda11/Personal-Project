"use client";

import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-green-100 p-3">
                        <svg
                            className="h-12 w-12 text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                    Order Placed Successfully!
                </h1>
                <p className="text-lg text-gray-500 mb-8">
                    Thank you for shopping with ShopBD. Your order has been recorded and is being processed.
                    We will contact you shortly if any further information is needed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/"
                        className="rounded-md bg-white border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        View Order History
                    </Link>
                </div>
            </div>
        </div>
    );
}
