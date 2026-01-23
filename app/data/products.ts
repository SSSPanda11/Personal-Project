export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 3500,
        description: 'High-quality wireless headphones with noise cancellation.',
        image: 'https://placehold.co/600x400/png?text=Headphones',
        category: 'Audio',
    },
    {
        id: '2',
        name: 'Smart Watch Series 5',
        price: 4500,
        description: 'Track your fitness and stay connected with this smart watch.',
        image: 'https://placehold.co/600x400/png?text=Smart+Watch',
        category: 'Wearables',
    },
    {
        id: '3',
        name: 'Ergonomic Office Chair',
        price: 12000,
        description: 'Comfortable office chair with lumbar support.',
        image: 'https://placehold.co/600x400/png?text=Office+Chair',
        category: 'Furniture',
    },
    {
        id: '4',
        name: 'Gaming Keyboard RGB',
        price: 2800,
        description: 'Mechanical gaming keyboard with customizable RGB lighting.',
        image: 'https://placehold.co/600x400/png?text=Keyboard',
        category: 'Accessories',
    },
    {
        id: '5',
        name: 'USB-C Hub Multiport',
        price: 1500,
        description: 'Expand your connectivity with this 7-in-1 USB-C hub.',
        image: 'https://placehold.co/600x400/png?text=USB+Hub',
        category: 'Accessories',
    },
    {
        id: '6',
        name: 'Portable Power Bank',
        price: 2200,
        description: '20000mAh high-capacity power bank for your devices.',
        image: 'https://placehold.co/600x400/png?text=Power+Bank',
        category: 'Accessories',
    },
];
