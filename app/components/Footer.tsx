export default function Footer() {
    return (
        <footer className="w-full border-t bg-gray-50">
            <div className="container mx-auto py-8 px-4 text-center sm:px-6 lg:px-8">
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} ShopBD. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
