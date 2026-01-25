"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

type PaymentMethod = 'COD' | 'bKash' | 'Nagad' | 'Rocket';

export default function CheckoutPage() {
    const { items, clearCart } = useCart();
    const router = useRouter();
    const [deliveryFee, setDeliveryFee] = useState(60); // Default Dhaka: 60

    // Recalculate fee when district changes
    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrict = e.target.value;
        setFormData(prev => ({ ...prev, district: selectedDistrict }));
        setDeliveryFee(selectedDistrict === 'Dhaka' ? 60 : 120);
    };

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = subtotal + (items.length > 0 ? deliveryFee : 0);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        district: 'Dhaka', // Default, or use '' to force selection
        address: '',
        receiverName: '',
        receiverPhone: '',
        paymentMethod: 'COD' as PaymentMethod,
        mfsNumber: '',
        trxId: '',
    });

    const [sameAsCustomer, setSameAsCustomer] = useState(true);
    const [errors, setErrors] = useState<Partial<typeof formData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const newData = { ...prev, [name]: value };

            // If sameAsCustomer is true and we're editing customer fields, sync to receiver fields
            if (sameAsCustomer) {
                if (name === 'name') newData.receiverName = value;
                if (name === 'phone') newData.receiverPhone = value;
            }

            return newData;
        });

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSameAsCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setSameAsCustomer(checked);
        if (checked) {
            setFormData(prev => ({
                ...prev,
                receiverName: prev.name,
                receiverPhone: prev.phone
            }));
        }
    };

    const validate = () => {
        const newErrors: Partial<typeof formData> = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        else if (!/^01\d{9}$/.test(formData.phone)) newErrors.phone = 'Phone number must be exactly 11 digits';
        if (!formData.address) newErrors.address = 'Address is required';

        if (!formData.receiverName) newErrors.receiverName = 'Receiver name is required';
        if (!formData.receiverPhone) newErrors.receiverPhone = 'Receiver phone is required';
        else if (!/^01\d{9}$/.test(formData.receiverPhone)) newErrors.receiverPhone = 'Phone number must be exactly 11 digits';

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
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            receiverName: formData.receiverName,
            receiverPhone: formData.receiverPhone,
            paymentMethod: formData.paymentMethod === 'COD' ? 'COD' : 'MFS',
            mfsProvider: formData.paymentMethod === 'COD' ? undefined : formData.paymentMethod,
            mfsNumber: formData.mfsNumber,
            trxId: formData.trxId,
            items: items,
            total: total, // Updated dynamic total
            deliveryFee: deliveryFee,
            district: formData.district,
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
                                    <dt className="text-sm text-gray-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">৳{subtotal.toLocaleString()}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Delivery ({formData.district})</dt>
                                    <dd className="text-sm font-medium text-gray-900">৳{deliveryFee.toLocaleString()}</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">৳{total.toLocaleString()}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Checkout Form (Left side) */}
                    <div className="mt-10 lg:col-start-1 lg:row-start-1 lg:mt-0">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
                                            placeholder="your@email.com"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-lg font-medium text-gray-900 mt-10">Delivery Information</h2>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                {/* District Selection */}
                                <div className="sm:col-span-6">
                                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">District / City</label>
                                    <div className="mt-1">
                                        <select
                                            id="district"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleDistrictChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900"
                                        >
                                            <option value="Dhaka">Dhaka (৳60)</option>
                                            <option value="Outside Dhaka">Outside Dhaka (৳120)</option>
                                            {/* Can expand to full 64 districts list later if needed */}
                                        </select>
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

                                {/* Same as customer checkbox */}
                                <div className="sm:col-span-6 flex items-center">
                                    <input
                                        id="sameAsCustomer"
                                        name="sameAsCustomer"
                                        type="checkbox"
                                        checked={sameAsCustomer}
                                        onChange={handleSameAsCustomerChange}
                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                    />
                                    <label htmlFor="sameAsCustomer" className="ml-2 block text-sm text-gray-700">
                                        Receiver is same as customer
                                    </label>
                                </div>

                                {!sameAsCustomer && (
                                    <>
                                        {/* Receiver Name */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700">Receiver Name</label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="receiverName"
                                                    id="receiverName"
                                                    value={formData.receiverName}
                                                    onChange={handleInputChange}
                                                    placeholder="Receiver's name"
                                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.receiverName ? 'border-red-500' : ''}`}
                                                />
                                                {errors.receiverName && <p className="mt-1 text-sm text-red-600">{errors.receiverName}</p>}
                                            </div>
                                        </div>

                                        {/* Receiver Phone */}
                                        <div className="sm:col-span-3">
                                            <label htmlFor="receiverPhone" className="block text-sm font-medium text-gray-700">Receiver Phone</label>
                                            <div className="mt-1">
                                                <input
                                                    type="tel"
                                                    name="receiverPhone"
                                                    id="receiverPhone"
                                                    value={formData.receiverPhone}
                                                    onChange={handleInputChange}
                                                    placeholder="Receiver's phone"
                                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.receiverPhone ? 'border-red-500' : ''}`}
                                                />
                                                {errors.receiverPhone && <p className="mt-1 text-sm text-red-600">{errors.receiverPhone}</p>}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <h2 className="text-lg font-medium text-gray-900 mt-10">Payment Method</h2>
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
                                            {method === 'COD' ? 'Cash on Delivery (COD)' : method}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* MFS Details (Conditional) */}
                            {formData.paymentMethod !== 'COD' && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                                    <p className="text-sm text-gray-500 mb-4">Please send money to our {formData.paymentMethod} Personal Number: <strong>01700000000</strong> and enter transaction details.</p>
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
                                                    placeholder="Your MFS Wallet number"
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
                                                    placeholder="e.g. 7X8Y9Z..."
                                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm text-gray-900 placeholder-gray-500 ${errors.trxId ? 'border-red-500' : ''}`}
                                                />
                                                {errors.trxId && <p className="mt-1 text-sm text-red-600">{errors.trxId}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-10 border-t border-gray-200 pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-md border border-transparent bg-black px-4 py-4 text-lg font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400 transition-colors"
                                >
                                    {isSubmitting ? 'Processing Order...' : 'Confirm Order'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
