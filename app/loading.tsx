export default function Loading() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Hero Skeleton */}
                <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200 mb-10"></div>

                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="h-8 w-48 animate-pulse rounded bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="group relative">
                            {/* Image Skeleton */}
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-200 animate-pulse lg:aspect-auto lg:h-80"></div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    {/* Title Skeleton */}
                                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                                    <div className="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                                </div>
                                {/* Price Skeleton */}
                                <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
