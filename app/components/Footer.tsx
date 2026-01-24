export default function Footer() {
    return (
        <footer className="w-full border-t bg-gray-50">
            <div className="container mx-auto py-8 px-4 text-center sm:px-6 lg:px-8">
                <div className="mb-4">
                    <a href="/track-order" className="text-sm font-medium text-gray-900 hover:text-gray-700 hover:underline">
                        Track My Order
                    </a>
                </div>
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} ShopBD. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
