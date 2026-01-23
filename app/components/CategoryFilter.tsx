"use client";

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'All';

    // Hardcoded categories based on data
    const categories = ['All', 'Audio', 'Wearables', 'Furniture', 'Accessories'];

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === 'All') {
            params.delete('category');
        } else {
            params.set('category', category);
        }
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2 py-4">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${currentCategory === category || (category === 'All' && !currentCategory)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
