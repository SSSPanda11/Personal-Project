"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

type PaymentMethod = 'COD' | 'bKash' | 'Nagad' | 'Rocket';

export default function CheckoutPage() {
    const { items, clearCart } = useCart();
    const router = useRouter();
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        paymentMethod: 'COD' as PaymentMethod,
        mfsNumber: '',
        trxId: '',
    });

    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        else if (!/^01[3-9]\d{8}$/.test(formData.phone)) newErrors.phone = 'Invalid BD phone number';
        if (!formData.address) newErrors.address = 'Address is required';

        if (formData.paymentMethod !== 'COD') {
            if (!formData.mfsNumber) newErrors.mfsNumber = 'MFS Number is required';
            if (!formData.trxId) newErrors.trxId = 'Transaction ID is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const orderData = {
            ...formData,
            items: items,
            total: subtotal,
            date: new Date().toISOString(),
        };

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                clearCart();
                router.push('/success');
            } else {
                alert(`Failed to place order: ${result.message}`);
            }
        } catch (error) {
            console.error('Submit Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex h-96 flex-col items-center justify-center space-y-4 rounded-lg bg-gray-50 p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <Link href="/" className="text-indigo-600 hover:text-indigo-500">Go back to shopping</Link>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Order Summary (Right side on desktop) */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                            <ul role="list" className="divide-y divide-gray-200">
                                {items.map((item) => (
                                    <li key={item.id} className="flex py-6 px-4 sm:px-6">
                                        <div className="shrink-0">
                                            {/* Use a smaller image/placeholder if needed, keeping it simple for summary */}
                                            <div className="h-20 w-20 rounded-md bg-gray-100 object-cover object-center" />
                                        </div>
                                        <div className="ml-6 flex flex-1 flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm">
                                                        <span className="font-medium text-gray-700 hover:text-gray-800">
                                                            {item.name}
                                                        </span>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between pt-2">
                                                <p className="mt-1 text-sm font-medium text-gray-900">৳{item.price.toLocaleString()}</p>
                                                <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900">Total</dt>
                                    <dd className="text-base font-medium text-gray-900">৳{subtotal.toLocaleString()}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Checkout Form (Left side) */}
                    <div className="mt-10 lg:col-start-1 lg:row-start-1 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                {/* Name */}
                                <div className="sm:col-span-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.name ? 'border-red-500' : ''}`}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="sm:col-span-3">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <div className="mt-1">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 01712345678"
                                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.phone ? 'border-red-500' : ''}`}
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="your@email.com (optional)"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="sm:col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                                    <div className="mt-1">
                                        <textarea
                                            id="address"
                                            name="address"
                                            rows={3}
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter your detailed delivery address"
                                            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.address ? 'border-red-500' : ''}`}
                                        />
                                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="sm:col-span-6 border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                                    <div className="mt-4 space-y-4">
                                        {['COD', 'bKash', 'Nagad', 'Rocket'].map((method) => (
                                            <div key={method} className="flex items-center">
                                                <input
                                                    id={method}
                                                    name="paymentMethod"
                                                    type="radio"
                                                    value={method}
                                                    checked={formData.paymentMethod === method}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                                                />
                                                <label htmlFor={method} className="ml-3 block text-sm font-medium text-gray-700">
                                                    {method === 'COD' ? 'Cash on Delivery' : method}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* MFS Details (Conditional) */}
                                {formData.paymentMethod !== 'COD' && (
                                    <div className="sm:col-span-6 bg-gray-50 p-4 rounded-md border border-gray-200 mt-2">
                                        <p className="text-sm text-gray-500 mb-4">Please send money to our {formData.paymentMethod} Personal Number: <strong>01XXXXXXXXX</strong> and enter the details below.</p>
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="mfsNumber" className="block text-sm font-medium text-gray-700">{formData.paymentMethod} Number</label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="mfsNumber"
                                                        id="mfsNumber"
                                                        value={formData.mfsNumber}
                                                        onChange={handleInputChange}
                                                        placeholder="Your mobile number"
                                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.mfsNumber ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.mfsNumber && <p className="mt-1 text-sm text-red-600">{errors.mfsNumber}</p>}
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="trxId" className="block text-sm font-medium text-gray-700">Transaction ID</label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="trxId"
                                                        id="trxId"
                                                        value={formData.trxId}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter the Transaction ID"
                                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.trxId ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors.trxId && <p className="mt-1 text-sm text-red-600">{errors.trxId}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400"
                                >
                                    {isSubmitting ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
