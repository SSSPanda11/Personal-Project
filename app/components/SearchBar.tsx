"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function SearchBarContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const query = searchParams.get('query');
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/?query=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/');
        }
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-lg">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-black focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    placeholder="Search products..."
                />
            </div>
        </form>
    );
}

export default function SearchBar() {
    return (
        <Suspense fallback={<div className="w-full max-w-lg h-9 bg-gray-100 rounded-md animate-pulse" />}>
            <SearchBarContent />
        </Suspense>
    );
}
