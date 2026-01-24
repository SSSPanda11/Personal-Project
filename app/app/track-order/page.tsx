"use client";

import { useState } from 'react';

export default function TrackOrderPage() {
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [orderData, setOrderData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');
        setOrderData(null);

        try {
            const res = await fetch(`/api/track-order?phone=${phone}`);
            const data = await res.json();

            if (data.success) {
                setOrderData(data.order);
                setStatus('success');
            } else {
                setErrorMessage(data.message || 'Order not found');
                setStatus('error');
            }
        } catch (err) {
            setErrorMessage('Failed to track order');
            setStatus('error');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Track Your Order</h2>

                    <form onSubmit={handleTrack} className="space-y-6">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="Enter your 11-digit phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400"
                            >
                                {status === 'loading' ? 'Searching...' : 'Track Order'}
                            </button>
                        </div>
                    </form>

                    {status === 'error' && (
                        <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm text-center">
                            {errorMessage}
                        </div>
                    )}

                    {status === 'success' && orderData && (
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900">Latest Order Status</h3>
                            <dl className="mt-4 space-y-4">
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-500">Order ID:</dt>
                                    <dd className="text-sm font-medium text-gray-900">{orderData.orderId}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-500">Date:</dt>
                                    <dd className="text-sm font-medium text-gray-900">{orderData.date}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-500">Items:</dt>
                                    <dd className="text-sm font-medium text-gray-900 text-right max-w-[200px]">{orderData.items}</dd>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-100">
                                    <dt className="text-sm font-bold text-gray-900">Current Status:</dt>
                                    <dd className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {orderData.status}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
