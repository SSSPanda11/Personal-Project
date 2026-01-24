export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    images?: string[]; // Optional for backward compatibility, but we will fill it
    category: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 3500,
        description: 'High-quality wireless headphones with noise cancellation.',
        image: 'https://placehold.co/600x400/png?text=Headphones',
        images: [
            'https://placehold.co/600x400/png?text=Headphones+Front',
            'https://placehold.co/600x400/png?text=Headphones+Side',
            'https://placehold.co/600x400/png?text=Headphones+Case'
        ],
        category: 'Audio',
    },
    {
        id: '2',
        name: 'Smart Watch Series 5',
        price: 4500,
        description: 'Track your fitness and stay connected with this smart watch.',
        image: 'https://placehold.co/600x400/png?text=Smart+Watch',
        images: [
            'https://placehold.co/600x400/png?text=Watch+Face',
            'https://placehold.co/600x400/png?text=Watch+Strap',
            'https://placehold.co/600x400/png?text=Watch+Health'
        ],
        category: 'Wearables',
    },
    {
        id: '3',
        name: 'Ergonomic Office Chair',
        price: 12000,
        description: 'Comfortable office chair with lumbar support.',
        image: 'https://placehold.co/600x400/png?text=Office+Chair',
        images: [
            'https://placehold.co/600x400/png?text=Chair+Front',
            'https://placehold.co/600x400/png?text=Chair+Side',
            'https://placehold.co/600x400/png?text=Chair+Back'
        ],
        category: 'Furniture',
    },
    {
        id: '4',
        name: 'Gaming Keyboard RGB',
        price: 2800,
        description: 'Mechanical gaming keyboard with customizable RGB lighting.',
        image: 'https://placehold.co/600x400/png?text=Keyboard',
        images: [
            'https://placehold.co/600x400/png?text=Keyboard+Top',
            'https://placehold.co/600x400/png?text=Keyboard+Lighting',
            'https://placehold.co/600x400/png?text=Keyboard+Detail'
        ],
        category: 'Accessories',
    },
    {
        id: '5',
        name: 'USB-C Hub Multiport',
        price: 1500,
        description: 'Expand your connectivity with this 7-in-1 USB-C hub.',
        image: 'https://placehold.co/600x400/png?text=USB+Hub',
        images: [
            'https://placehold.co/600x400/png?text=Hub+Top',
            'https://placehold.co/600x400/png?text=Hub+Ports',
            'https://placehold.co/600x400/png?text=Hub+Usage'
        ],
        category: 'Accessories',
    },
    {
        id: '6',
        name: 'Portable Power Bank',
        price: 2200,
        description: '20000mAh high-capacity power bank for your devices.',
        image: 'https://placehold.co/600x400/png?text=Power+Bank',
        images: [
            'https://placehold.co/600x400/png?text=Powerbank+Front',
            'https://placehold.co/600x400/png?text=Powerbank+Ports',
            'https://placehold.co/600x400/png?text=Powerbank+Charging'
        ],
        category: 'Accessories',
    },
];
