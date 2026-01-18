"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CartContent() {
    const { items, removeFromCart, updateQuantity, cartCount } = useCart();

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="flex h-96 flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center">
                <div className="text-gray-400">
                    {/* Simple Empty Cart Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="text-gray-500">Looks like you haven&apos;t added anything to your cart yet.</p>
                <Link
                    href="/"
                    className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex py-6 sm:py-10">
                                    <div className="shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={200}
                                            height={200}
                                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <Link href={`/product/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">৳{item.price.toLocaleString()}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label htmlFor={`quantity-${item.id}`} className="sr-only">
                                                    Quantity, {item.name}
                                                </label>
                                                <select
                                                    id={`quantity-${item.id}`}
                                                    name={`quantity-${item.id}`}
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>
                                                    <option value={7}>7</option>
                                                    <option value={8}>8</option>
                                                </select>

                                                <div className="absolute top-0 right-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order Summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">৳{subtotal.toLocaleString()}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">৳{subtotal.toLocaleString()}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Link
                                href="/checkout"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    );
}
